# Releasing

How a change gets from a branch to npm, and the two rules that keep it working.

## Branches

```
feat/*  fix/*  ──PR──►  beta  ──PR──►  main
                         │              │
                         ▼              ▼
              0.0.2-beta.1         0.0.2
              npm @beta            npm @latest
```

| Branch     | Publishes            | dist-tag  | Ruleset            |
| ---------- | -------------------- | --------- | ------------------ |
| `main`     | `X.Y.Z`              | `latest`  | PR + CodeQL + review |
| `beta`     | `X.Y.Z-beta.N`       | `beta`    | none               |
| `release/*`| nothing              | —         | none               |
| `feat/*`, `fix/*` | nothing       | —         | none               |

Branch from **`beta`**, not `main`. `main` only ever receives merges from `beta`.

`release/*` is a place to assemble a release before promoting it — it runs the
checks but publishes nothing, because nothing in `release.config.js` matches it.

## Rule 1 — rebase short-lived branches, merge long-lived ones

**Rebase `feat/*` and `fix/*` freely.** They carry no tags, so nothing breaks,
and you get the clean history.

**Never rebase `beta` or `main`.** Merge instead.

This is not style. A rebase rewrites commits, so any prerelease tag cut since
the last promotion ends up pointing at a commit that is no longer on the branch:

```
rebase beta onto main:   v0.0.2-beta.1 -> orphaned,  git describe -> v0.0.1
merge main into beta:    v0.0.2-beta.1 -> reachable, git describe -> v0.0.2-beta.1
```

semantic-release works out the next version from the last *reachable* tag. Orphan
the prerelease tags and it concludes no prerelease ever happened, then computes
`0.0.2-beta.1` a second time — a version already on npm, which npm will refuse
to republish. The release fails, and if it did not, it would be worse.

Tags from *earlier* promotions survive a rebase, because they are already in
`main`'s history. It is precisely the unpromoted ones that vanish, which is the
state `beta` is in whenever you are about to open the PR.

You should not need to do this by hand anyway — see below.

## Keeping beta on top of main

Promotion is one direction (`beta` → `main`), so without a return path `beta`
would drift: it would never contain the commit recording the released version,
and each promotion PR would carry a larger diff of things `main` already has.

So `main` is merged back into `beta` after every push to `main`. This is
automatic — the `Bring beta level with main` step in `release.yml` — and the
full cycle is:

```
1.  fix: lands on beta            -> publishes 0.0.2-beta.1 to @beta
2.  beta merged to main (PR)      -> publishes 0.0.2 to @latest, tags v0.0.2
3.  main opens a PR recording 0.0.2 in package.json
4.  that PR merges                -> main now carries 0.0.2
5.  main merged back into beta    -> beta carries 0.0.2 too
6.  next fix: on beta             -> publishes 0.0.3-beta.1
```

Two details that look like mistakes and are not:

**It runs on every push to `main`, not only ones that publish.** The version
arrives through a pull request (step 3), so the commit carrying it lands on a
*later* push than the release itself. A step that only fired on releases would
leave `beta` permanently one commit short of the number it is meant to match —
step 5 above would never happen.

**It merges rather than fast-forwards, and it never rebases.** `beta` normally
holds work `main` has not seen, so this is a real merge. Rebasing to achieve the
same tidiness is the one thing that breaks the release — see Rule 1.

**The back-merge does not start a release of its own.** Its commit carries
`[skip ci]`, so the push to `beta` runs nothing. That is why it is forced to
create a merge commit (`--no-ff`): a fast-forward makes no commit, the message
is discarded, and `beta`'s head becomes `main`'s commit — whose message decides
whether the workflows run. Fast-forward is the common case right after a
promotion, precisely when `beta` has nothing `main` lacks.

Nothing would be published even if it did run — the commits it brings across
are `chore:` and merges, so semantic-release finds no releasable change. The
skip is about not spending a BDD run and a CodeQL wait to publish nothing.

If the merge conflicts, the step aborts and warns rather than guessing. `beta`
carrying unpromoted work is the normal state and resolving that blind risks
discarding it, so merge it by hand:

```bash
git checkout beta
git merge origin/main      # not rebase
git push origin beta
```

## Rule 2 — the version is decided by commit messages

You cannot pick a version. semantic-release derives it:

| Commit prefix                        | Effect              |
| ------------------------------------ | ------------------- |
| `fix:`                               | patch — `0.0.1` → `0.0.2` |
| `feat:`                              | minor — `0.0.1` → `0.1.0` |
| `BREAKING CHANGE:` in the body       | major — `0.0.1` → `1.0.0` |
| `chore:` `ci:` `docs:` `test:` `refactor:` | no release    |

A pull request made entirely of `chore:` commits publishes nothing. That is not
a failure — the release job succeeds having done nothing.

To see the number before merging, open the PR and read the **Next Version**
check. It reports "merging this would publish X" on every PR into `main`,
`beta`, or `release/*`.

## How a beta version relates to main

Prereleases are built on top of the version `main` will get next, not on top of
the version it has now:

```
main is at 0.0.1
  fix: on beta          -> 0.0.2-beta.1   (npm @beta)
  fix: on beta          -> 0.0.2-beta.2   (npm @beta)
  beta merged to main   -> 0.0.2          (npm @latest)
```

So `0.0.2-beta.N` is a preview of `0.0.2`. Add a `feat:` to beta and the whole
line moves to `0.1.0-beta.N`, previewing `0.1.0`. The prerelease counter resets
whenever the target version changes.

## The version in package.json

`package.json` carries **the last version released from `main`**, and only
`main` ever writes it. `beta` deliberately does not record its own prerelease
number.

That is a deliberate constraint, not an oversight. `beta` is ahead of `main` by
definition, so the two could never show the same number — and both branches
writing the same line from a shared ancestor would collide on every merge. Held
to main's stable version, the field agrees on both branches and merges cleanly.

The prerelease identity lives where semantic-release actually reads it from: the
git tag and npm's `beta` dist-tag. Nothing in the build depends on this field —
the docs generator resolves the version from the tag, and the published tarball
always carries the right version because semantic-release sets it before packing.

It is written by a pull request rather than a push, because `main`'s ruleset
requires one and requires CodeQL results a just-created commit cannot have. That
is the same wall `@semantic-release/git` hits, which is why that plugin is not
in the plugin list.

## What runs when

| Event                     | Runs                                                    |
| ------------------------- | ------------------------------------------------------- |
| PR into `main`/`beta`/`release/*` | Playwright checks, CodeQL, **Next Version** preview |
| Push to `beta`            | BDD suite → CodeQL gate → publish `X.Y.Z-beta.N` to `@beta` |
| Push to `main`            | BDD suite → CodeQL gate → publish `X.Y.Z` to `@latest`, record version PR, merge back into `beta` |
| After a release           | `notify-docs` tells `contentveda-docs` to rebuild the site |

Publishing is gated on both the 101-scenario BDD suite and CodeQL completing
successfully for that exact commit. An npm version cannot be taken back, so
neither gate is advisory.

## Troubleshooting

**"Release succeeded but nothing was published."** No releasable commits since
the last tag, or the commit was already released — a re-run on an
already-published commit is a no-op by design.

**"Publishing an existing version."** Something rebased a tagged branch. See
Rule 1.

**A release fails partway.** semantic-release publishes in `prepare` → `publish`
order, so a failure in `prepare` leaves nothing published and nothing tagged.
Fix the cause and re-run; the same commit will be computed the same way.
