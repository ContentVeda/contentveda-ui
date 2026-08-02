#!/usr/bin/env node
/**
 * generate-allure-report.js
 *
 * Generates the Allure HTML report from tests/bdd/.allure-results (produced by
 * `npm run test:bdd`) into docs/v{major}/allure-report/, so it publishes
 * alongside the versioned component docs on docs.contentveda.com -- one report
 * per major version, same as docs/v1, docs/v2, etc.
 *
 * The publishing is done by sync-ui-docs.yml in contentveda-docs, which runs
 * this script itself and serves the result at /ui/v{major}/allure-report/.
 */

'use strict';

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { resolveVersion, ROOT } = require('./resolve-version');

const RESULTS_DIR = path.join(ROOT, 'tests', 'bdd', '.allure-results');
// Resolved the same way generate-docs.js resolves it (git tag, not
// package.json — see resolve-version.js) so the report always lands in the
// same docs/vN directory the rest of the docs build to. Reading
// package.json's version directly here used to be able to disagree with
// that the moment a major version shipped, since package.json's version
// field is frozen (this project doesn't run @semantic-release/git) while
// generate-docs.js reads the real released version from the git tag.
const VERSION = resolveVersion();
const MAJOR_VERSION = `v${VERSION.split('.')[0]}`;
const REPORT_DIR = path.join(ROOT, 'docs', MAJOR_VERSION, 'allure-report');

if (!fs.existsSync(RESULTS_DIR) || fs.readdirSync(RESULTS_DIR).length === 0) {
  console.log(`No Allure results found at ${RESULTS_DIR} -- run "npm run test:bdd" first. Skipping report generation.`);
  process.exit(0);
}

// Invoke allure-commandline's own bin script directly via `node`, rather than
// node_modules/.bin/allure (a .cmd shim on Windows that isn't itself
// executable via spawn without a shell -- and shelling out means unescaped
// argument concatenation).
const allureBin = require.resolve('allure-commandline/bin/allure');

console.log(`\n📊  Generating Allure report for ${MAJOR_VERSION}...\n`);

execFileSync(process.execPath, [allureBin, 'generate', RESULTS_DIR, '--clean', '-o', REPORT_DIR], {
  stdio: 'inherit',
  cwd: ROOT
});

console.log(`  ✓  docs/${MAJOR_VERSION}/allure-report/index.html`);
