const customCommitPartial = `*{{#if scope}} **{{scope}}:**
{{~/if}} {{#if subject}}
  {{~subject}}
{{~else}}
  {{~header}}
{{~/if}}
{{~#if hash}} {{#if @root.linkReferences~}}
  ([{{shortHash}}]({{commitUrlFormat}}))
{{~else}}
  {{~shortHash}}
{{~/if}}{{~/if}}
{{~#if references~}}
  {{~#each references}} {{#if @root.linkReferences~}}
    [{{this.prefix}}{{this.issue}}]({{issueUrlFormat}})
  {{~else}}
    {{this.prefix}}{{this.issue}}
  {{~/if}}{{/each}}
{{~/if}}
{{~#if bodySummary}}

{{#if isLongSummary}}
  <details>
  <summary>📋 <em>Pull Request Summary & Sub-commits</em></summary>

{{{bodySummary}}}

  </details>
{{else}}
{{{bodySummary}}}
{{/if}}
{{~/if}}

`;

const typeMap = {
  feat: '🚀 Features',
  fix: '🐛 Bug Fixes',
  perf: '⚡ Performance Improvements',
  revert: '⏪ Reverts',
  docs: '📚 Documentation',
  style: '💄 Styles',
  refactor: '♻️ Code Refactoring',
  test: '🧪 Tests',
  build: '📦 Build System',
  ci: '⚙️ Continuous Integration',
  chore: '🔧 Miscellaneous Chores'
};

const commitGroupsOrder = [
  '🚀 Features',
  '🐛 Bug Fixes',
  '⚡ Performance Improvements',
  '♻️ Code Refactoring',
  '📚 Documentation',
  '💄 Styles',
  '🧪 Tests',
  '📦 Build System',
  '⚙️ Continuous Integration',
  '🔧 Miscellaneous Chores',
  '⏪ Reverts',
  '🔀 Pull Requests & Merges',
  '🔍 Other Changes'
];

module.exports = {
  branches: [
    'main',
    { name: 'beta', prerelease: true }
  ],
  plugins: [
    // Determine the version bump (major/minor/patch) from Conventional Commit
    // messages since the last release tag.
    ['@semantic-release/commit-analyzer', {
      preset: 'conventionalcommits',
      releaseRules: [
        { type: 'feat', release: 'minor' },
        { type: 'fix', release: 'patch' },
        { type: 'perf', release: 'patch' },
        { type: 'refactor', release: 'patch' }
      ]
    }],
    // Build the release notes body from all commits, including all commit types
    // (docs, chore, refactor, ci, test) and Pull Request summaries / sub-commits.
    ['@semantic-release/release-notes-generator', {
      preset: 'conventionalcommits',
      presetConfig: {
        types: [
          { type: 'feat', section: '🚀 Features' },
          { type: 'fix', section: '🐛 Bug Fixes' },
          { type: 'perf', section: '⚡ Performance Improvements' },
          { type: 'revert', section: '⏪ Reverts' },
          { type: 'docs', section: '📚 Documentation' },
          { type: 'style', section: '💄 Styles' },
          { type: 'refactor', section: '♻️ Code Refactoring' },
          { type: 'test', section: '🧪 Tests' },
          { type: 'build', section: '📦 Build System' },
          { type: 'ci', section: '⚙️ Continuous Integration' },
          { type: 'chore', section: '🔧 Miscellaneous Chores' }
        ]
      },
      writerOpts: {
        commitPartial: customCommitPartial,
        transform: (commit, context) => {
          let type = commit.type;

          if (!type) {
            const lowerHeader = (commit.header || '').toLowerCase();
            if (lowerHeader.startsWith('merge pull request') || lowerHeader.startsWith('merge branch')) {
              type = '🔀 Pull Requests & Merges';
            } else {
              type = '🔍 Other Changes';
            }
          } else {
            type = typeMap[commit.type.toLowerCase()] || commit.type;
          }

          const scope = commit.scope === '*' ? '' : commit.scope;
          const shortHash = typeof commit.hash === 'string'
            ? commit.hash.substring(0, 7)
            : commit.shortHash;
          let subject = (commit.subject || commit.header || '')
            .replace(/claude(\s+sonnet(\s+\d+)?)?/gi, '')
            .replace(/anthropic/gi, '')
            .replace(/\s{2,}/g, ' ')
            .trim();

          // Deduplicate issues already referenced in subject line (e.g. #44)
          const issuesInSubject = [];
          const issueMatch = subject.match(/#(\d+)/g);
          if (issueMatch) {
            issueMatch.forEach(m => issuesInSubject.push(m.replace('#', '')));
          }
          const references = (commit.references || []).filter(r => !issuesInSubject.includes(String(r.issue)));

          let bodySummary = '';
          let isLongSummary = false;

          if (commit.body) {
            // Filter out git metadata, trailers, co-authors, and any AI/claude references
            const lines = commit.body.split('\n');
            const cleanLines = [];
            for (const line of lines) {
              const trimmed = line.trim();
              if (/^co-authored-by:/i.test(trimmed)) continue;
              if (/^signed-off-by:/i.test(trimmed)) continue;
              if (/claude/i.test(trimmed)) continue;
              if (/anthropic/i.test(trimmed)) continue;
              if (/^-{3,}$/.test(trimmed)) continue;
              cleanLines.push(line);
            }

            const cleaned = cleanLines.join('\n').trim();
            if (cleaned) {
              const nonBlankLines = cleaned.split('\n').filter(l => l.trim());
              isLongSummary = nonBlankLines.length > 3 || cleaned.includes('\n* ') || cleaned.includes('\n- ');

              if (isLongSummary) {
                // Indent markdown block inside <details>
                bodySummary = cleaned.split('\n').map(l => '    ' + l).join('\n');
              } else {
                bodySummary = cleaned.split('\n').map(l => '  > ' + l).join('\n');
              }
            }
          }

          const notes = (commit.notes || []).map(note => ({
            ...note,
            title: 'BREAKING CHANGES'
          }));

          return {
            notes,
            type,
            scope,
            shortHash,
            subject,
            references,
            bodySummary,
            isLongSummary
          };
        },
        groupBy: 'type',
        commitGroupsSort: (a, b) => {
          const rankA = commitGroupsOrder.indexOf(a.title);
          const rankB = commitGroupsOrder.indexOf(b.title);
          if (rankA === -1 && rankB === -1) return a.title.localeCompare(b.title);
          if (rankA === -1) return 1;
          if (rankB === -1) return -1;
          return rankA - rankB;
        }
      }
    }],
    // Prepend the generated notes into CHANGELOG.md.
    '@semantic-release/changelog',
    // Bump package.json's version and `npm publish` (build runs first via
    // this repo's own "prepublishOnly" script).
    '@semantic-release/npm',
    // Create the GitHub Release for the new tag, with the generated notes
    // attached, at the same time the tag itself is created.
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
