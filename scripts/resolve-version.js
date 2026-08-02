#!/usr/bin/env node
/**
 * resolve-version.js
 *
 * The single source of truth for "what version is this build," shared by
 * generate-docs.js and generate-allure-report.js. They used to each compute
 * this themselves, and drifted: generate-docs.js read it from the git tag,
 * generate-allure-report.js read it from package.json directly. Both resolve
 * to the same "v0" today only by coincidence (the whole 0.x.x line has never
 * left major 0) — the moment a major ships, package.json's frozen value and
 * the real tag disagree, generate-allure-report.js writes to the wrong
 * docs/vN/allure-report, and sync-ui-docs.yml's `test -f
 * "$src/$major/allure-report/index.html"` fails against the directory
 * generate-docs.js actually built. One resolver, imported by both, makes
 * that impossible instead of just unlikely.
 */

'use strict';

const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

// The released version, which is deliberately NOT package.json's.
//
// Releases are cut by semantic-release, and this project does not run
// @semantic-release/git -- main's ruleset rejects the commit it would push back
// (see release.config.js). So nothing ever writes the new version into
// package.json, and the value committed here is frozen at whatever was last
// recorded by hand. Building from it would pin every build to that version
// forever: every beta would publish claiming the old number, and the first
// major would build into docs/v0 while generate-docs.js's own step 5 deleted
// the tree it had just written.
//
// The git tag is the real record -- semantic-release creates it on the released
// commit through the GitHub API, which is the one part of the release the
// branch ruleset does not block. So read that, and fall back only when it is
// unavailable.
//
// Order matters: an explicit override wins, so a caller building for a
// specific version does not have to fake a tag. Then the tag. Then
// package.json, which covers a plain local run in a tree with no tags fetched
// -- a shallow CI checkout without tags lands here too, which is why the sync
// workflow in contentveda-docs fetches them.
function resolveVersion() {
  if (process.env.CV_DOCS_VERSION) return process.env.CV_DOCS_VERSION.replace(/^v/, '');

  try {
    const tag = execFileSync('git', ['describe', '--tags', '--abbrev=0'], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore']
    }).toString().trim();
    if (/^v?\d+\.\d+\.\d+/.test(tag)) return tag.replace(/^v/, '');
  } catch {
    // No git, no tags, or a shallow clone with none reachable. Fall through.
  }

  return require(path.join(ROOT, 'package.json')).version;
}

module.exports = { resolveVersion, ROOT };
