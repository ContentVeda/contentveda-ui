module.exports = {
  // Channel and version suffix both follow the branch name, which is
  // semantic-release's native model:
  //
  //   feat/fix branch --PR--> beta --PR--> main
  //
  //   beta  ->  0.0.2-beta.1  published to  @contentveda/ui@beta
  //   main  ->  0.0.2         published to  @contentveda/ui@latest
  //
  // This replaces an earlier `[{ name: 'main', channel: 'beta' }]`. That form
  // existed only to dodge ERELEASEBRANCHES: `prerelease` marks a branch as a
  // *prerelease* branch, and semantic-release refuses to run unless an ordinary
  // release branch exists alongside it, which a single-branch repo could not
  // provide. Keeping main as the stable branch supplies exactly that, so the
  // workaround is no longer needed -- and the versions carry a real -beta.N
  // suffix instead of being plain numbers that merely sat on a beta dist-tag.
  //
  // One consequence worth knowing: `latest` starts advancing again. It has been
  // pinned to 0.0.1 since that version was hand-published to bootstrap trusted
  // publishing (a plain `npm publish` sets `latest` whether you mean it or
  // not), and the old config kept it frozen there. From here it moves whenever
  // beta is merged to main -- which is the point of promoting through main.
  branches: [
    'main',
    { name: 'beta', prerelease: true }
  ],
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
    // attached, at the same time the tag itself is created. This goes through
    // the Releases API and writes a tag ref, so the branch ruleset on main
    // does not apply to it -- which is what makes the setup below viable.
    // Tagging still happens here: this creates the tag and the GitHub Release
    // through the Releases API, which writes a tag ref and so is untouched by
    // the branch ruleset on main.
    '@semantic-release/github'

    // No @semantic-release/git on purpose. It pushes the CHANGELOG/version
    // commit straight to main, which the ruleset rejects (GH013) on two counts
    // -- changes must come via pull request, and CodeQL results are required
    // for a commit semantic-release created seconds earlier, which can never
    // have them. It fails in `prepare`, abandoning the release before publish.
    //
    // Cost is only that CHANGELOG.md and the version bump stop landing in git;
    // the tag and Release are the record instead. @semantic-release/changelog
    // above still earns its place, since package.json's "files" ships
    // CHANGELOG.md and it is written before the tarball is packed.
  ]
};
