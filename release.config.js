module.exports = {
  // main publishes prereleases: 0.0.1-beta.1, 0.0.1-beta.2, and so on, under
  // npm's `beta` dist-tag rather than `latest`. `npm i @contentveda/ui` keeps
  // resolving to nothing until a stable release is cut, which is the point —
  // the API is not frozen yet, and nobody should land on it by default.
  //
  // Going stable later is a one-line change: drop `prerelease` and the next
  // release from main becomes a normal version on `latest`.
  branches: [{ name: 'main', prerelease: 'beta' }],
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
