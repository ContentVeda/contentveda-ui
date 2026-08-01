module.exports = {
  // main is the release branch, publishing to npm's `beta` dist-tag instead of
  // `latest`. So `npm i @contentveda/ui` resolves to nothing and only
  // `@contentveda/ui@beta` installs anything — which is the point while the API
  // is still moving. Going stable later is one line: drop `channel`.
  //
  // Note this is `channel`, not `prerelease`. They sound interchangeable and
  // are not: `prerelease` marks a branch as a *prerelease* branch, and
  // semantic-release requires at least one ordinary release branch besides
  // those. Setting it on the only branch leaves the release-branch list empty
  // and the run dies with ERELEASEBRANCHES before it does anything.
  //
  // The trade-off is that versions are plain — 0.0.1, then 0.0.2 — rather than
  // 0.0.1-beta.1. Getting the -beta.N suffix needs a dedicated prerelease
  // branch to merge into and a release branch kept alongside it, which is more
  // branching than this project runs today. The dist-tag is what actually keeps
  // people off it by accident.
  branches: [{ name: 'main', channel: 'beta' }],
  plugins: [
    // Determine the version bump (major/minor/patch) from Conventional Commit
    // messages since the last release tag.
    ['@semantic-release/commit-analyzer', {
      preset: 'conventionalcommits'
    }],
    // Build the release notes body from those same commits.
    ['@semantic-release/release-notes-generator', {
      preset: 'conventionalcommits'
    }],
    // Prepend the generated notes into CHANGELOG.md.
    '@semantic-release/changelog',
    // Bump package.json's version and `npm publish` (build runs first via
    // this repo's own "prepublishOnly" script).
    '@semantic-release/npm',
    // Create the GitHub Release for the new tag, with the generated notes
    // attached, at the same time the tag itself is created.
    '@semantic-release/github',
    // Commit the updated package.json/package-lock.json/CHANGELOG.md back
    // to the release branch and create the git tag.
    ['@semantic-release/git', {
      assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }]
  ]
};
