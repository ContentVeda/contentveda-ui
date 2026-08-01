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

You should not need to do this by hand anyway: `release.yml` merges `main` into
`beta` automatically after every push to `main`.

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
