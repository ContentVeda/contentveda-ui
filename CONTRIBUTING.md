# Contributing to ContentVeda UI

Thank you for your interest in contributing! This document outlines the process for submitting changes.

## Development Setup

```bash
git clone https://github.com/ContentVeda/contentveda-ui.git
cd contentveda-ui
npm install
```

## Project Structure

```
src/
  components/   # Mitosis source files (.lite.tsx)
  styles/       # Global theme CSS variables
dist/           # Compiled output (auto-generated, not committed)
docs/           # Generated docs, synced to docs.contentveda.com
```

## Making Changes

### Adding or Modifying a Component

1. Edit or create a file in `src/components/` using Mitosis JSX syntax (`.lite.tsx`).
2. Add or update corresponding styles in `src/styles/theme.css` using the `--cv-*` CSS variable naming convention.
3. Run `npm run build` to compile to all targets and verify the output.
4. Update the component's documentation page in `docs/components/`.

### Mitosis Constraints

Mitosis imposes some limitations compared to standard React:
- No default exports of non-component values
- State must use `useStore()`; no raw `useState`
- Lifecycle hooks: `onMount`, `onUnMount` (not `useEffect`)
- Avoid complex TypeScript generics in component props

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(banner): add isLoading shimmer prop
fix(timer): clear interval on unmount
docs(readme): add svelte usage example
chore: bump mitosis to 0.14.0
```

The prefix decides the next version, so it is not cosmetic: `fix:` is a patch,
`feat:` a minor, and `BREAKING CHANGE:` in the body a major. `chore:`, `ci:`,
`docs:`, `test:` and `refactor:` release nothing. See [RELEASING.md](RELEASING.md).

## Pull Request Process

1. Create a branch from `beta` — that is where changes land first. `main` only
   receives merges from `beta`.
2. Make your changes and ensure `npm run build` succeeds.
3. Open a Pull Request against `beta` with a clear description of the change.
4. Check the **Next Version** run on the PR: it reports the version merging
   would publish, so a wrong commit prefix is visible before it is merged.

Do not edit `CHANGELOG.md` by hand — semantic-release generates it from commit
messages.

Rebase your own `feat/*` or `fix/*` branch as much as you like. Never rebase
`beta` or `main`: it orphans the release tags and makes semantic-release try to
republish a version that already exists. [RELEASING.md](RELEASING.md) explains why.

## Releasing (Maintainers Only)

Releases are automatic. Merging to `beta` publishes a `X.Y.Z-beta.N` prerelease
to npm's `beta` tag; merging `beta` to `main` publishes `X.Y.Z` to `latest`.
Versions are computed from commit messages, never set by hand.

The full process, including why `package.json` carries main's version and not
beta's, is in [RELEASING.md](RELEASING.md).
