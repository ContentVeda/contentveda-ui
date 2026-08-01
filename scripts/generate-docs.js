#!/usr/bin/env node
/**
 * generate-docs.js
 *
 * Auto-generates docs/v{major}/components/<slug>.html and docs/v{major}/index.html.
 * Data sources:
 *  - scripts/docs-manifest.json  → descriptions, examples, preview HTML/CSS, notes, api metadata
 *  - src/components/*.lite.tsx   → prop names, types, required/optional from the
 *                                  `export interface <Name>Props { … }` block
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

// ── Paths ──────────────────────────────────────────────────────────────────
const ROOT          = path.resolve(__dirname, '..');
const SRC_DIR       = path.join(ROOT, 'src', 'components');
const MANIFEST      = require('./docs-manifest.json');
const PROPS_DB      = require('./docs-props.json');   // prop descriptions live here, NOT in .lite.tsx
// The org, not a user — these repos moved under ContentVeda. github.com paths
// are case-insensitive, so the casing here is cosmetic; the github.io hostname
// used for the Pages mirror is not, and is always lowercase.
const GITHUB_OWNER  = 'ContentVeda';
const REPO          = 'contentveda-ui';
const GITHUB_URL    = `https://github.com/${GITHUB_OWNER}/${REPO}`;
const PACKAGE_JSON  = require('../package.json');

// The released version, which is deliberately NOT package.json's.
//
// Releases are cut by semantic-release, and this project does not run
// @semantic-release/git -- main's ruleset rejects the commit it would push back
// (see release.config.js). So nothing ever writes the new version into
// package.json, and the value committed here is frozen at whatever was last
// recorded by hand. Building the docs from it would pin them to that version
// forever: every beta would publish claiming the old number, and the first
// major would build into docs/v0 while step 5 below deleted the tree it had
// just written.
//
// The git tag is the real record -- semantic-release creates it on the released
// commit through the GitHub API, which is the one part of the release the
// branch ruleset does not block. So read that, and fall back only when it is
// unavailable.
//
// Order matters: an explicit override wins, so a caller building docs for a
// specific version does not have to fake a tag. Then the tag. Then
// package.json, which covers a plain local `npm run docs` in a tree with no
// tags fetched -- a shallow CI checkout without tags lands here too, which is
// why the sync workflow in contentveda-docs fetches them.
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

  return PACKAGE_JSON.version;
}

const VERSION       = resolveVersion();
const MAJOR_VERSION = `v${VERSION.split('.')[0]}`; // e.g. "v1"
// Shown in the sidebar version picker. Before the first release package.json
// carries semantic-release's 0.0.0-development placeholder, and printing that
// as "v0.x.x (Latest)" would advertise a version that does not exist.
const IS_UNRELEASED = /^0\.0\.0/.test(VERSION);
// A prerelease (0.0.2-beta.1) shares the major tree with the stable line, so
// only the label distinguishes them. Naming it exactly rather than as
// "v0.x.x (Latest)" matters here, because beta releases publish to the same
// site: without this the site would call beta docs the latest stable ones.
const PRERELEASE    = /^\d+\.\d+\.\d+-(\w+)/.exec(VERSION);
const VERSION_LABEL = IS_UNRELEASED
  ? 'Unreleased (main)'
  : PRERELEASE
    ? `v${VERSION} (${PRERELEASE[1].charAt(0).toUpperCase()}${PRERELEASE[1].slice(1)})`
    : `v${MAJOR_VERSION.slice(1)}.x.x (Latest)`;

const DOCS_DIR      = path.join(ROOT, 'docs');
const VERSION_DIR   = path.join(DOCS_DIR, MAJOR_VERSION);
const COMPONENTS_DIR = path.join(VERSION_DIR, 'components');

// This same generated tree is published twice: by this repo's own Pages deploy
// at GITHUB_URL's pages domain, and under /ui/ on the docs site, which sparse-
// checks-out docs/. Two URLs serving identical pages splits their search
// ranking, so every page declares the docs-site copy as canonical.
const CANONICAL_BASE = process.env.DOCS_CANONICAL_BASE ?? 'https://docs.contentveda.com/ui';

// ── Favicon ────────────────────────────────────────────────────────────────
// The ContentVeda mark, shared with the docs site. The SVG is listed first so
// modern browsers take it; the .ico and 32px PNG are there for the ones that
// still will not, and the 180px PNG for iOS home screens. `prefix` is the hop
// back to the version root ('' from index.html, '../' from components/).
const FAVICON_TAGS = (prefix) => `<link rel="icon" href="${prefix}assets/brand/favicon.svg" type="image/svg+xml" />
  <link rel="icon" href="${prefix}assets/brand/favicon-32.png" sizes="32x32" type="image/png" />
  <link rel="alternate icon" href="${prefix}assets/brand/favicon.ico" sizes="32x32" />
  <link rel="apple-touch-icon" href="${prefix}assets/brand/apple-touch-icon.png" sizes="180x180" />`;

// ── Recursive Copy Helper ──────────────────────────────────────────────────
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// ── Default Interactive Web Component Elements ─────────────────────────────
const DEFAULT_WC_ELEMENTS = {
  'banner': `<cv-banner id="interactive-preview" title="Experience Vibrant Colors &amp; Premium Innovation" subtitle="Explore our premium collection of responsive components. Zero dependencies, ultra lightweight." cta-text="Explore Collection" media='{"type":"image","url":"../assets/img/placeholder-01.svg"}' hotspots='[{"id":"hs-jacket","altText":"Quilted jacket","label":"Quilted jacket · $189","shape":"rect","coords":{"x":9,"y":20,"width":16,"height":30},"action":{"type":"link","url":"/products/quilted-jacket"},"showTooltip":true,"pulse":true},{"id":"hs-tote","altText":"Leather tote","label":"Leather tote · $240","shape":"oval","coords":{"x":44,"y":28,"width":13,"height":18},"action":{"type":"link","url":"/products/leather-tote"},"showTooltip":true,"pulse":true},{"id":"hs-boots","altText":"Chelsea boots","label":"Chelsea boots · $150","shape":"polygon","coords":{"x":66,"y":55,"width":22,"height":26},"points":[{"x":66,"y":60},{"x":80,"y":55},{"x":88,"y":72},{"x":70,"y":81}],"action":{"type":"deeplink","url":"/products/chelsea-boots","deeplink":"contentveda://products/chelsea-boots"},"showTooltip":true,"pulse":true}]' config='{"align":"center","padding":"lg","bgPosition":"center","hotspotMinTargetSize":24,"backgroundEffect":"particles"}'></cv-banner>`,
  
  'announcement-bar': `<cv-announcement-bar id="interactive-preview" message="🚀 Free shipping on orders over $75 — Shop the sale →" background-color="#245066" text-color="#ffffff" map-links='[{"url":"#"}]'></cv-announcement-bar>`,
  
  'grid-banner': `<cv-grid-banner id="interactive-preview" columns="3" items='[{"id":"1","title":"Women\\\'s Collection","media":{"type":"image","url":"../assets/img/placeholder-02.svg"}},{"id":"2","title":"Men\\\'s Essentials","media":{"type":"image","url":"../assets/img/placeholder-03.svg"}},{"id":"3","title":"Trending Footwear","media":{"type":"image","url":"../assets/img/placeholder-04.svg"}}]'></cv-grid-banner>`,
  
  'media-grid': `<cv-media-grid id="interactive-preview" primary-media='{"id":"p1","media":{"type":"image","url":"../assets/img/placeholder-05.svg"},"altText":"Primary Accent Banner"}' secondary-media='[{"id":"s1","media":{"type":"image","url":"../assets/img/placeholder-06.svg"}},{"id":"s2","media":{"type":"image","url":"../assets/img/placeholder-07.svg"}}]'></cv-media-grid>`,
  
  'row-scrollable': `<cv-row-scrollable id="interactive-preview" title="Vibrant Modern Accents" items='[{"id":"1","title":"Neon Abstract","subtitle":"Vibrant Colors","media":{"type":"image","url":"../assets/img/placeholder-06.svg"}},{"id":"2","title":"Cyberpunk Glow","subtitle":"Tech Vibes","media":{"type":"image","url":"../assets/img/placeholder-07.svg"}},{"id":"3","title":"Pastel Gradient","subtitle":"Soft Warmth","media":{"type":"image","url":"../assets/img/placeholder-08.svg"}},{"id":"4","title":"Ocean Waves","subtitle":"Cool Tones","media":{"type":"image","url":"../assets/img/placeholder-09.svg"}}]'></cv-row-scrollable>`,
  
  'sliding-banner': `<cv-sliding-banner id="interactive-preview" items='[{"id":"1","title":"Slide 1: Summer Collection","subtitle":"Refresh your look with light layers.","media":{"type":"image","url":"../assets/img/placeholder-10.svg"}},{"id":"2","title":"Slide 2: Minimalist Living","subtitle":"Design your space for peace.","media":{"type":"image","url":"../assets/img/placeholder-11.svg"}},{"id":"3","title":"Slide 3: Urban Explorer","subtitle":"Ready for any adventure.","media":{"type":"image","url":"../assets/img/placeholder-12.svg"}},{"id":"4","title":"Slide 4: Modern Workspace","subtitle":"Tools to elevate your focus.","media":{"type":"image","url":"../assets/img/placeholder-13.svg"}},{"id":"5","title":"Slide 5: Weekend Escape","subtitle":"Travel style curated for you.","media":{"type":"image","url":"../assets/img/placeholder-14.svg"}},{"id":"6","title":"Slide 6: Evening Lounge","subtitle":"Unwind in comfort.","media":{"type":"image","url":"../assets/img/placeholder-01.svg"}}]' config='{"autoStart":true,"rotateAgain":true,"showDots":true,"showArrows":true,"animationEffect":"fade","backgroundEffect":"waves"}'></cv-sliding-banner>`,
  
  'alternating-slider': `<cv-alternating-slider id="interactive-preview" items='[{"id":"1","title":"Slide 1: Summer Collection","subtitle":"Refresh your look with light layers.","media":{"type":"image","url":"../assets/img/placeholder-02.svg"}},{"id":"2","title":"Slide 2: Minimalist Living","subtitle":"Design your space for peace.","media":{"type":"image","url":"../assets/img/placeholder-03.svg"}},{"id":"3","title":"Slide 3: Urban Explorer","subtitle":"Ready for any adventure.","media":{"type":"image","url":"../assets/img/placeholder-04.svg"}},{"id":"4","title":"Slide 4: Modern Workspace","subtitle":"Tools to elevate your focus.","media":{"type":"image","url":"../assets/img/placeholder-05.svg"}},{"id":"5","title":"Slide 5: Weekend Escape","subtitle":"Travel style curated for you.","media":{"type":"image","url":"../assets/img/placeholder-06.svg"}},{"id":"6","title":"Slide 6: Evening Lounge","subtitle":"Unwind in comfort.","media":{"type":"image","url":"../assets/img/placeholder-07.svg"}}]' config='{"columns":2,"autoStart":true,"showDots":true}'></cv-alternating-slider>`,
  
  'timer-widget': `<cv-timer-widget id="interactive-preview" title="Special Sale Ends In:" target-date="2027-12-31T23:59:59Z" variant="dark" background-image-url="../assets/images/summer_sale.png" background-position="center" overlay="rgba(0, 0, 0, 0.45)" background-effect="rain" expired-text="This offer has expired" width="auto" height="auto"></cv-timer-widget>`,
  
  'wysiwyg-renderer': `<cv-wysiwyg-renderer id="interactive-preview" html-content="<h2>Premium Editorial Layout</h2><p>This component safely renders HTML content and processes external media embeds in real-time:</p><h3>YouTube Media Integration</h3><div class='cv-social-embed' data-platform='youtube' data-url='https://www.youtube.com/watch?v=dQw4w9WgXcQ'></div><h3>Social X / Twitter Post</h3><div class='cv-social-embed' data-platform='x' data-url='https://x.com/NASA/status/1684947936109961216'></div><p>All scripts and scoped layouts load dynamically and securely.</p>"></cv-wysiwyg-renderer>`,
  
  'rich-text-editor': `<cv-rich-text-editor id="interactive-preview" initial-content="<p>Welcome to <strong>ContentVeda Editor Playground</strong>! Configure the toolbar options on the right in real-time to customize my controls.</p>" config='{"toolbar":["fullscreen","source","bold","italic","underline","strikeThrough","code","quote","clear","headings","foreColor","backColor","justifyLeft","justifyCenter","justifyRight","image","link","table","unorderedList","orderedList","horizontalRule","video","social","insertButton","addWidget","save","classInput"]}'></cv-rich-text-editor>`
};

// ── Site header (shared across every page) ─────────────────────────────────
// A hand-written copy of the docs site's DocsNav: same 60px sticky bar, same
// lockup (mark + live-text wordmark, never the outlined lettering from the
// artwork), same link set, same Sign in button. Landing on /ui/ from the docs
// site should not feel like landing on a different site.
//
// Links are absolute rather than root-relative. The original reason was a
// GitHub Pages mirror at contentveda.github.io, where /cms/api/ resolved to
// nothing; that mirror is gone, and on docs.contentveda.com a root-relative
// link would now resolve fine. They stay absolute anyway: this tree is served
// under /ui/, so anything pointing at a sibling product has to leave that
// subtree, and an absolute URL is unambiguous wherever the tree is mounted.
//
// One addition the docs site does not have: a text-size control. These pages
// carry long prop tables and code samples, which is exactly the reading a
// reader may want larger.
const SITE_BASE = CANONICAL_BASE.replace(/\/ui\/?$/, '');
const APP_URL   = 'https://app.contentveda.com';

// Theme and text size have to be on the element before the first paint, or the
// page renders light and snaps to dark (and at the default size and jumps).
// That rules out docs.js, which runs after paint, so this goes inline in the
// head of every page. Same key and same fallback as the docs site's app.html.
const PREFERENCES_SCRIPT = `<script>
    try {
      var t = localStorage.getItem('contentveda-theme');
      var dark = t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
      var f = localStorage.getItem('contentveda-font-scale');
      if (f && f !== 'md') document.documentElement.setAttribute('data-font', f);
    } catch (e) {}
  </script>`;

// The mark, inlined from the artwork rather than linked as <img>. Two things
// come out of that: it costs no request and cannot flash, and — the reason it
// matters here — the fills become custom properties, so one copy serves both
// themes. That is necessary, not decorative: the C is near-black and the V's
// darkest facet measures about 1.9:1 on the dark background, so a single set
// of fills cannot work on both. Same approach, same values, as the docs site's
// Logo component.
const BRAND_MARK = fs
  .readFileSync(path.join(DOCS_DIR, 'assets', 'brand', 'logo-mark.svg'), 'utf8')
  .replace(/fill="#(?:010101|010201|020202)"/gi, 'fill="var(--m-ink)"')
  .replace(/fill="#164F69"/gi, 'fill="var(--m-v)"')
  .replace(/fill="#0[EF]374E"/gi, 'fill="var(--m-vd)"')
  // The wordmark beside it is live text, so the mark is decoration to a screen
  // reader — drop the artwork's own role/label rather than announce the name twice.
  .replace(/\s+role="img"|\s+aria-label="[^"]*"/g, '')
  .replace(/<svg /, '<svg class="cv-brand-mark" width="49" height="30" aria-hidden="true" focusable="false" ')
  .trim();

function buildHeader(prefix, actionHtml) {
  return `
    <header class="cv-nav">
      <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle navigation">☰</button>
      <a class="cv-brand" href="${prefix}index.html">
        ${BRAND_MARK}
        <span class="cv-brand-word">Content<b>Veda</b></span>
        <span class="cv-brand-sub">UI</span>
      </a>
      <nav class="cv-links">
        <a href="${SITE_BASE}/cms/api/">Content API</a>
        <a href="${SITE_BASE}/cms/graphql/">GraphQL</a>
        <a href="${prefix}index.html" class="active">Components</a>
      </nav>
      <div class="cv-actions">
        <div class="cv-fontsize" role="group" aria-label="Text size">
          <button type="button" id="font-dec" aria-label="Decrease text size" title="Decrease text size">A−</button>
          <button type="button" id="font-inc" aria-label="Increase text size" title="Increase text size">A+</button>
        </div>
        <button type="button" class="cv-theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">☾</button>
        ${actionHtml}
        <a class="cv-signin" href="${APP_URL}">Sign in</a>
      </div>
    </header>`;
}

// ── Sidebar HTML (shared across every page) ────────────────────────────────
function buildSidebar(activeSlug, isLandingPage) {
  const prefix = isLandingPage ? '' : '../';
  const compPrefix = isLandingPage ? 'components/' : '';

  const links = MANIFEST.map(c => {
    const active = c.slug === activeSlug ? ' active' : '';
    return `<a href="${compPrefix}${c.slug}.html" class="sidebar-link${active}"><span class="sidebar-link-icon">${c.icon}</span> ${c.name}</a>`;
  }).join('\n      ');

  return `
    <aside class="docs-sidebar">
      <div class="sidebar-version-picker" style="padding: 0.75rem 1.25rem; border-bottom: 1px solid var(--border);">
        <select class="control-select version-select" style="width: 100%; font-size: 0.8rem; background: var(--bg-elevated); border: 1px solid var(--border); color: var(--text-secondary); padding: 6px 10px; border-radius: var(--radius-sm); outline: none; cursor: pointer;" onchange="window.location.href = this.value">
          <option value="${prefix}index.html" selected>${VERSION_LABEL}</option>
        </select>
      </div>
      <nav class="sidebar-nav">
        <div class="sidebar-section-label">Getting Started</div>
        <a href="${prefix}index.html" class="sidebar-link"><span class="sidebar-link-icon">🏠</span> Home</a>
        <div class="sidebar-section-label" style="margin-top:1rem">Components</div>
        ${links}
        <div class="sidebar-section-label" style="margin-top:1rem">Resources</div>
        <a href="${GITHUB_URL}" target="_blank" rel="noopener" class="sidebar-link"><span class="sidebar-link-icon">⭐</span> GitHub</a>
        <a href="https://www.npmjs.com/package/@contentveda/ui" target="_blank" rel="noopener" class="sidebar-link"><span class="sidebar-link-icon">📦</span> npm</a>
        <a href="${GITHUB_URL}/tree/main/examples" target="_blank" rel="noopener" class="sidebar-link"><span class="sidebar-link-icon">🧩</span> Example Apps</a>
        <a href="${prefix}dist/" target="_blank" class="sidebar-link"><span class="sidebar-link-icon">📁</span> Compiled Dist</a>
        <a href="${prefix}allure-report/" target="_blank" class="sidebar-link"><span class="sidebar-link-icon">✅</span> Test Report</a>
      </nav>
    </aside>`;
}

// ── Prop lookup (from docs-props.json) ────────────────────────────────────
function getProps(componentName) {
  const key = componentName.replace(/\s+/g, '');
  return PROPS_DB[key] || [];
}

// ── Code block renderer ────────────────────────────────────────────────────
function highlight(code, lang) {
  let s = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  s = s.replace(/(`[^`]*`|'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*")/g,
    '\x00STR\x00$1\x00/STR\x00');

  s = s.replace(/(\/\/[^\n]*)/g,
    '\x00CM\x00$1\x00/CM\x00');

  s = s.replace(/\b(import|from|export|default|const|let|var|return|function|async|await|true|false|null|undefined)\b/g,
    '\x00KW\x00$1\x00/KW\x00');

  s = s.replace(/(&lt;\/?)([\w-]+)/g,
    '$1\x00TAG\x00$2\x00/TAG\x00');

  s = s
    .replace(/\x00STR\x00([\s\S]*?)\x00\/STR\x00/g, '<span class="str">$1</span>')
    .replace(/\x00CM\x00([\s\S]*?)\x00\/CM\x00/g,   '<span class="cm">$1</span>')
    .replace(/\x00KW\x00([\s\S]*?)\x00\/KW\x00/g,   '<span class="kw">$1</span>')
    .replace(/\x00TAG\x00([\s\S]*?)\x00\/TAG\x00/g, '<span class="tag">$1</span>');

  return s;
}

function codeBlock(code, lang) {
  const highlighted = highlight(code, lang);
  return `
    <div class="code-block">
      <button class="copy-btn">Copy</button>
      <pre><code>${highlighted}</code></pre>
    </div>`;
}

function buildNotes(notes) {
  if (!notes || notes.length === 0) return '';
  return notes.map(n => `<div class="alert alert-${n.type}">${n.text}</div>`).join('\n');
}

function buildPropsTable(props) {
  if (!props.length) return '<p style="color:var(--text-muted);font-size:.85rem">No props parsed.</p>';

  const rows = props.map(p => {
    const req = p.required
      ? `<span class="prop-required">required</span>`
      : '';
    return `
      <tr>
        <td><span class="prop-name">${p.name}</span> ${req}</td>
        <td><span class="prop-type">${p.type.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</span></td>
        <td><span class="prop-default">${p.required ? '—' : 'undefined'}</span></td>
        <td>${p.description || '—'}</td>
      </tr>`;
  }).join('');

  return `
    <div class="props-table-wrap">
      <table class="props-table">
        <thead>
          <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

// ── Build Interactive Controls Form ────────────────────────────────────────
function buildControlsForm(component) {
  const api = component.api || [];
  if (api.length === 0) {
    if (component.slug === 'rich-text-editor') {
      return `
        <div class="control-group">
          <label class="control-label">Initial HTML Content</label>
          <textarea name="initialContent" class="control-input" style="height:80px;"><p>Welcome to <strong>ContentVeda Editor Playground</strong>! Configure the toolbar options on the right in real-time to customize my controls.</p></textarea>
        </div>
        <div class="control-group">
          <label class="control-label">Available Classes (JSON Array)</label>
          <textarea name="availableClasses" class="control-input json-textarea" style="height:60px;">["text-pink-500", "font-bold", "tracking-wider"]</textarea>
          <span class="json-error-msg">❌ Invalid JSON Array</span>
        </div>
        <div class="control-group">
          <label class="control-label">Toolbar Config (JSON Object)</label>
          <textarea name="config" class="control-input json-textarea" style="height:120px;">{"toolbar":["fullscreen","source","bold","italic","underline","strikeThrough","code","quote","clear","headings","foreColor","backColor","justifyLeft","justifyCenter","justifyRight","image","link","table","unorderedList","orderedList","horizontalRule","video","social","insertButton","addWidget","save","classInput"]}</textarea>
          <span class="json-error-msg">❌ Invalid JSON Object</span>
        </div>
      `;
    }
    if (component.slug === 'wysiwyg-renderer') {
      return `
        <div class="control-group">
          <label class="control-label">content <span class="control-type-badge">string</span></label>
          <textarea name="content" class="control-input" style="height:140px;"><h2>Premium Editorial Layout</h2><p>This component safely renders HTML content and processes external media embeds in real-time:</p><h3>YouTube Media Integration</h3><div class="cv-social-embed" data-platform="youtube" data-url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"></div><h3>Social X / Twitter Post</h3><div class="cv-social-embed" data-platform="x" data-url="https://x.com/NASA/status/1684947936109961216"></div><p>All scripts and scoped layouts load dynamically and securely.</p></textarea>
        </div>
      `;
    }
  }

  const filteredApi = api.filter(item => {
    if (item.prop === 'config') {
      return !api.some(x => x.prop.startsWith('config.'));
    }
    // backgroundEffectPlugin is a { start, stop } function pair — it isn't
    // representable as a form control, and a generic text-input fallback
    // would serialize its literal placeholder string into the live
    // preview's config, breaking the plugin resolution (a truthy string
    // isn't `{ start, stop }`) and silently killing every background
    // effect. It stays documented in the API table, just not interactive.
    if (item.prop === 'backgroundEffectPlugin' || item.prop === 'config.backgroundEffectPlugin') {
      return false;
    }
    return true;
  });

  return filteredApi.map(item => {
    const propName = item.prop;
    const type = item.type;
    const defaultValue = item.default;
    const desc = item.desc;
    
    let attrName = propName;
    if (propName.startsWith('config.')) {
      // Keep it config.*
    } else {
      attrName = propName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    }

    let inputHtml = '';
    
    if (type === 'boolean') {
      const checked = defaultValue === 'true' ? 'checked' : '';
      inputHtml = `
        <label class="control-checkbox-label">
          <input type="checkbox" name="${propName}" ${checked}>
          <span class="control-checkbox-custom"></span>
          Enable ${propName.replace('config.', '')}
        </label>
      `;
    } else if (type === 'number' || (type === 'number | string' && propName === 'columns')) {
      let min = 1, max = 10, step = 1;
      if (propName === 'columns') { min = 1; max = 6; }
      if (propName === 'config.columns') { min = 1; max = 4; }
      if (propName.includes('delay') || propName.includes('Delay')) { min = 1000; max = 10000; step = 500; }
      
      const defaultNum = parseFloat(defaultValue) || min;

      inputHtml = `
        <div class="control-slider-wrap">
          <input type="range" name="${propName}" min="${min}" max="${max}" step="${step}" value="${defaultNum}" class="control-slider">
          <span class="control-slider-val">${defaultNum}</span>
        </div>
      `;
    } else if (type === 'string' && propName.toLowerCase().includes('color')) {
      // Colour props whose documented default is a token rather than a literal
      // (e.g. "var(--cv-color-primary, #245066)") have nothing a native colour
      // input can show, so the picker opens on the brand primary.
      const hex = defaultValue && defaultValue.startsWith('"#') ? defaultValue.replace(/"/g, '') : '#245066';
      inputHtml = `
        <div class="control-color-wrap">
          <input type="color" name="${attrName}" value="${hex}" class="control-color-picker">
          <input type="text" value="${hex}" class="control-input color-text-sync" style="width:120px;flex-shrink:0;">
        </div>
      `;
    } else if (type === 'string' && propName === 'textAlignment') {
      inputHtml = `
        <select name="${attrName}" class="control-select">
          <option value="left">left</option>
          <option value="center" selected>center</option>
          <option value="right">right</option>
        </select>
      `;
    } else if (type === 'string' && propName === 'config.animationEffect') {
      const animOptions = ['slide', 'fade', 'zoom', 'flip', 'push-horizontal', 'push-vertical', 'wipe', 'cube', 'door', 'fall', 'crush', 'peel-off', 'curtain'];
      inputHtml = `
        <select name="${propName}" class="control-select">
          ${animOptions.map(opt => `<option value="${opt}"${opt === 'fade' ? ' selected' : ''}>${opt}</option>`).join('\n          ')}
        </select>
      `;
    } else if (type === 'string' && propName === 'variant') {
      inputHtml = `
        <select name="${attrName}" class="control-select">
          <option value="dark" selected>dark</option>
          <option value="neon">neon</option>
          <option value="gray">gray</option>
        </select>
      `;
    } else if (type === 'string' && propName === 'config.animationQuality') {
      inputHtml = `
        <select name="${propName}" class="control-select">
          <option value="light">light</option>
          <option value="detailed" selected>detailed</option>
        </select>
      `;
    } else if (type === 'string' && (propName === 'config.backgroundEffect' || propName === 'backgroundEffect')) {
      const isConfig = propName.startsWith('config.');
      const selectedEffect = isConfig ? 'waves' : 'rain';
      const effectOptions = ['none', 'particles', 'waves', 'rain', 'thunderstorm', 'sunrise', 'sunset', 'fog', 'autumn', 'festival', 'santa', 'sea'];
      inputHtml = `
        <select name="${isConfig ? propName : attrName}" class="control-select">
          ${effectOptions.map(opt => `<option value="${opt}"${opt === selectedEffect ? ' selected' : ''}>${opt}</option>`).join('\n          ')}
        </select>
      `;
    } else if (type === 'array' || type === 'object') {
      let val = '';
      if (propName === 'items' && component.slug === 'grid-banner') {
        val = `[\n  {"id":"1","title":"Women's Collection","media":{"type":"image","url":"../assets/img/placeholder-08.svg"}},\n  {"id":"2","title":"Men's Essentials","media":{"type":"image","url":"../assets/img/placeholder-09.svg"}},\n  {"id":"3","title":"Trending Footwear","media":{"type":"image","url":"../assets/img/placeholder-10.svg"}}\n]`;
      } else if (propName === 'items' && component.slug === 'row-scrollable') {
        val = `[\n  {"id":"1","title":"Neon Abstract","subtitle":"Vibrant Colors","media":{"type":"image","url":"../assets/img/placeholder-11.svg"}},\n  {"id":"2","title":"Cyberpunk Glow","subtitle":"Tech Vibes","media":{"type":"image","url":"../assets/img/placeholder-12.svg"}},\n  {"id":"3","title":"Pastel Gradient","subtitle":"Soft Warmth","media":{"type":"image","url":"../assets/img/placeholder-13.svg"}},\n  {"id":"4","title":"Ocean Waves","subtitle":"Cool Tones","media":{"type":"image","url":"../assets/img/placeholder-14.svg"}}\n]`;
      } else if (propName === 'items' && component.slug === 'sliding-banner') {
        val = `[\n  {"id":"1","title":"Slide 1: Summer Collection","subtitle":"Refresh your look with light layers.","media":{"type":"image","url":"../assets/img/placeholder-01.svg"}},\n  {"id":"2","title":"Slide 2: Minimalist Living","subtitle":"Design your space for peace.","media":{"type":"image","url":"../assets/img/placeholder-02.svg"}},\n  {"id":"3","title":"Slide 3: Urban Explorer","subtitle":"Ready for any adventure.","media":{"type":"image","url":"../assets/img/placeholder-03.svg"}},\n  {"id":"4","title":"Slide 4: Modern Workspace","subtitle":"Tools to elevate your focus.","media":{"type":"image","url":"../assets/img/placeholder-04.svg"}},\n  {"id":"5","title":"Slide 5: Weekend Escape","subtitle":"Travel style curated for you.","media":{"type":"image","url":"../assets/img/placeholder-05.svg"}},\n  {"id":"6","title":"Slide 6: Evening Lounge","subtitle":"Unwind in comfort.","media":{"type":"image","url":"../assets/img/placeholder-06.svg"}}\n]`;
      } else if (propName === 'items' && component.slug === 'alternating-slider') {
        val = `[\n  {"id":"1","title":"Slide 1: Summer Collection","subtitle":"Refresh your look with light layers.","media":{"type":"image","url":"../assets/img/placeholder-07.svg"}},\n  {"id":"2","title":"Slide 2: Minimalist Living","subtitle":"Design your space for peace.","media":{"type":"image","url":"../assets/img/placeholder-08.svg"}},\n  {"id":"3","title":"Slide 3: Urban Explorer","subtitle":"Ready for any adventure.","media":{"type":"image","url":"../assets/img/placeholder-09.svg"}},\n  {"id":"4","title":"Slide 4: Modern Workspace","subtitle":"Tools to elevate your focus.","media":{"type":"image","url":"../assets/img/placeholder-10.svg"}},\n  {"id":"5","title":"Slide 5: Weekend Escape","subtitle":"Travel style curated for you.","media":{"type":"image","url":"../assets/img/placeholder-11.svg"}},\n  {"id":"6","title":"Slide 6: Evening Lounge","subtitle":"Unwind in comfort.","media":{"type":"image","url":"../assets/img/placeholder-12.svg"}}\n]`;
      } else if (propName === 'primaryMedia') {
        val = `{"id":"p1","media":{"type":"image","url":"../assets/img/placeholder-13.svg"},"altText":"Primary Accent Banner"}`;
      } else if (propName === 'secondaryMedia') {
        val = `[\n  {"id":"s1","media":{"type":"image","url":"../assets/img/placeholder-11.svg"}},\n  {"id":"s2","media":{"type":"image","url":"../assets/img/placeholder-12.svg"}}\n]`;
      } else if (propName === 'media' && component.slug === 'banner') {
        val = `{"type":"image","url":"../assets/img/placeholder-14.svg"}`;
      } else if (propName === 'hotspots') {
        // Seeded, not left blank: updatePreview removes the attribute for an
        // empty JSON control, so an unseeded hotspots box silently strips the
        // hotspots off the element it is previewing. One of each shape.
        val = `[\n  {"id":"hs-jacket","altText":"Quilted jacket","label":"Quilted jacket · $189","shape":"rect","coords":{"x":9,"y":20,"width":16,"height":30},"action":{"type":"link","url":"/products/quilted-jacket"},"showTooltip":true,"pulse":true},\n  {"id":"hs-tote","altText":"Leather tote","label":"Leather tote · $240","shape":"oval","coords":{"x":44,"y":28,"width":13,"height":18},"action":{"type":"link","url":"/products/leather-tote"},"showTooltip":true,"pulse":true},\n  {"id":"hs-boots","altText":"Chelsea boots","label":"Chelsea boots · $150","shape":"polygon","coords":{"x":66,"y":55,"width":22,"height":26},"points":[{"x":66,"y":60},{"x":80,"y":55},{"x":88,"y":72},{"x":70,"y":81}],"action":{"type":"deeplink","url":"/products/chelsea-boots","deeplink":"contentveda://products/chelsea-boots"},"showTooltip":true,"pulse":true}\n]`;
      } else if (propName === 'mapLinks') {
        val = `[{"url":"#"}]`;
      } else if (propName === 'config') {
        val = `{}`;
      }

      inputHtml = `
        <textarea name="${propName}" class="control-input json-textarea">${val}</textarea>
        <span class="json-error-msg">❌ Invalid JSON Formatting</span>
      `;
    } else {
      const defaultText = defaultValue && defaultValue !== 'undefined' ? defaultValue.replace(/"/g, '') : '';
      inputHtml = `
        <input type="text" name="${attrName}" value="${defaultText}" class="control-input">
      `;
    }

    return `
      <div class="control-group">
        <label class="control-label">${propName} <span class="control-type-badge">${type}</span></label>
        ${inputHtml}
        <div class="control-desc">${desc || ''}</div>
      </div>
    `;
  }).join('');
}

// ── Full page template ──────────────────────────────────────────────────────
function buildPage(component) {
  const { name, slug, icon, examples, notes, previewLabel, previewCss, extra } = component;

  const pascalName = name.replace(/\s+(\w)/g, (_, c) => c.toUpperCase()).replace(/^\w/, c => c.toUpperCase());
  const tagName = `cv-${slug}`;
  
  const props = getProps(name);
  const sidebar = buildSidebar(slug, false);

  const previewBodyClass = (slug === 'sliding-banner' || slug === 'alternating-slider')
    ? 'preview-body-flush'
    : 'preview-body';

  const liveElementHtml = DEFAULT_WC_ELEMENTS[slug] || `<${tagName} id="interactive-preview"></${tagName}>`;
  const controlsHtml = buildControlsForm(component);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name} — ContentVeda UI</title>
  <meta name="description" content="${component.cardDesc}" />
  <link rel="canonical" href="${CANONICAL_BASE}/${MAJOR_VERSION}/components/${slug}.html" />
  ${FAVICON_TAGS('../')}
  ${PREFERENCES_SCRIPT}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="stylesheet" href="../css/docs.css" />
  <link rel="stylesheet" href="../styles/theme.css" />
  <link rel="stylesheet" href="../styles/components/${pascalName}.css" />
  ${previewCss ? `<style>${previewCss}</style>` : ''}
</head>
<body>
${buildHeader('../', `<a href="${GITHUB_URL}/blob/main/src/components/${pascalName.replace(/\s/g,'')}.lite.tsx"
           target="_blank" rel="noopener" class="btn-github">View Source</a>`)}
<div class="docs-shell">
  ${sidebar}

  <main class="docs-main">
    <div class="docs-content">
      <!-- Page Header -->
      <div class="page-header">
        <div class="page-badge">${icon} Component</div>
        <h1 class="page-title">${name}</h1>
        <p class="page-description">${component.cardDesc}</p>
      </div>

      <!-- Install -->
      <div class="install-banner">
        <code>npm install @contentveda/ui</code>
        <button class="copy-btn install-copy" style="position:static;flex-shrink:0">⎘ Copy</button>
      </div>

      ${extra ? extra : ''}

      <!-- Interactive Playground -->
      <h2 class="section-heading">Interactive Demo Playground</h2>
      <div class="playground-container">
        <div class="preview-column">
          <div class="preview-card">
            <div class="preview-toolbar">
              <span class="preview-dot red"></span>
              <span class="preview-dot amber"></span>
              <span class="preview-dot green"></span>
              <span class="preview-url">&lt;${tagName}&gt; Playground</span>
            </div>
            <div class="${previewBodyClass}" id="preview-container">
              ${liveElementHtml}
            </div>
          </div>
        </div>

        <div class="controls-column">
          <div class="controls-card">
            <div class="controls-header">
              <span class="controls-icon">⚙️</span>
              <span class="controls-title">Configure Properties</span>
            </div>
            <div class="controls-body">
              <form id="playground-form" onsubmit="event.preventDefault();">
                ${controlsHtml}
              </form>
            </div>
          </div>
        </div>
      </div>


      <!-- Code Tabs -->
      <h2 class="section-heading" style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem;">
        Usage Code Generator
        <span style="display:flex; gap:8px;">
          <button class="jsfiddle-btn" id="jsfiddle-btn" style="background:var(--accent); color:#fff; border:none; padding:6px 12px; border-radius:6px; cursor:pointer; font-size:0.85rem; font-weight:600; display:flex; align-items:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            Play in JSFiddle
          </button>
          <button class="codesandbox-btn" id="codesandbox-btn" style="background:#151515; color:#fff; border:1px solid #333; padding:6px 12px; border-radius:6px; cursor:pointer; font-size:0.85rem; font-weight:600; display:flex; align-items:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            Open in CodeSandbox
          </button>
        </span>
      </h2>
      <div class="tab-group">
        <div class="tabs-bar">
          <button class="tab-btn active" data-tab="react">React</button>
          <button class="tab-btn" data-tab="svelte">Svelte</button>
          <button class="tab-btn" data-tab="wc">Web Component</button>
        </div>
        <div class="tab-panel active" data-panel="react">
          ${codeBlock(examples.react, 'tsx')}
        </div>
        <div class="tab-panel" data-panel="svelte">
          ${codeBlock(examples.svelte, 'svelte')}
        </div>
        <div class="tab-panel" data-panel="wc">
          ${codeBlock(examples.wc, 'html')}
        </div>
      </div>

      <!-- Props Table -->
      <h2 class="section-heading">Props API Reference</h2>
      ${buildPropsTable(props)}

      <!-- Notes -->
      ${buildNotes(notes)}
    </div>
  </main>
</div>
<script src="../js/docs.js"></script>
<script type="module" src="../dist/webcomponent/dist/index.js"></script>

<script>
// ── Syntax Highlighter (Client-side mirror of server highlight) ────────────
function clientHighlight(code, lang) {
  let s = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  s = s.replace(/(\`[^\`]*\`|'[^'\\']*(?:\\.[^'\\']*)*'|"[^"\\"]*(?:\\.[^"\\"]*)*")/g, '\\x00STR\\x00$1\\x00/STR\\x00');
  s = s.replace(/(\\x2f\\x2f[^\\n]*)/g, '\\x00CM\\x00$1\\x00/CM\\x00');
  s = s.replace(/\\b(import|from|export|default|const|let|var|return|function|async|await|true|false|null|undefined)\\b/g, '\\x00KW\\x00$1\\x00/KW\\x00');
  s = s.replace(/(&lt;\\/?)([\\w-]+)/g, '$1\\x00TAG\\x00$2\\x00/TAG\\x00');

  s = s
    .replace(/\\x00STR\\x00([\\s\\S]*?)\\x00\\/STR\\x00/g, '<span class="str">$1</span>')
    .replace(/\\x00CM\\x00([\\s\\S]*?)\\x00\\/CM\\x00/g,   '<span class="cm">$1</span>')
    .replace(/\\x00KW\\x00([\\s\\S]*?)\\x00\\/KW\\x00/g,   '<span class="kw">$1</span>')
    .replace(/\\x00TAG\\x00([\\s\\S]*?)\\x00\\/TAG\\x00/g, '<span class="tag">$1</span>');

  return s;
}

document.addEventListener('DOMContentLoaded', () => {
  const preview = document.getElementById('interactive-preview');
  const form = document.getElementById('playground-form');
  if (!preview || !form) return;

  const inputs = form.querySelectorAll('input, select, textarea');

  // Slider val displays
  inputs.forEach(input => {
    if (input.type === 'range') {
      const valLabel = input.nextElementSibling;
      input.addEventListener('input', () => {
        valLabel.textContent = input.value;
      });
    }
  });

  // Color picker sync
  inputs.forEach(input => {
    if (input.classList.contains('control-color-picker')) {
      const textSync = input.nextElementSibling;
      input.addEventListener('input', () => {
        textSync.value = input.value;
        updatePreview();
      });
      textSync.addEventListener('input', () => {
        if (/^#[0-9A-F]{6}$/i.test(textSync.value)) {
          input.value = textSync.value;
          updatePreview();
        }
      });
    }
  });

  function updatePreview() {
    let configObj = {};
    let hasConfig = false;
    const directProps = {};

    // First collect all config.*
    inputs.forEach(input => {
      const name = input.name;
      if (!name) return;
      if (name.startsWith('config.')) {
        hasConfig = true;
        const key = name.split('.')[1];
        let val;
        if (input.type === 'checkbox') {
          val = input.checked;
        } else if (input.type === 'range') {
          val = Number(input.value);
        } else {
          val = input.value;
        }
        configObj[key] = val;
      }
    });

    if (hasConfig) {
      const configJson = JSON.stringify(configObj);
      // Always set props.config directly to bypass oldValue===newValue guard
      if (preview.props) {
        preview.props.config = configObj;
      }
      preview.setAttribute('config', configJson);
      directProps.config = configObj;
    }

    // Now update other attributes
    inputs.forEach(input => {
      const name = input.name;
      // Not every control in the form maps to a prop. The colour controls pair
      // a picker with a text field that mirrors it, and that field carries no
      // name — without this guard it reached setAttribute('') below, which
      // throws InvalidCharacterError. The throw escaped forEach and abandoned
      // the rest of the loop, so every control *after* a colour one silently
      // stopped updating the preview.
      if (!name) return;
      if (name.startsWith('config.')) return;

      if (input.type === 'checkbox') {
        if (input.checked) {
          preview.setAttribute(name, 'true');
          directProps[camelCase(name)] = true;
        } else {
          preview.removeAttribute(name);
          directProps[camelCase(name)] = false;
        }
      } else if (input.tagName === 'TEXTAREA' && input.classList.contains('json-textarea')) {
        try {
          const raw = input.value.trim();
          if (raw) {
            const parsed = JSON.parse(raw);
            input.classList.remove('invalid');
            // Assign as property and setAttribute
            preview[camelCase(name)] = parsed;
            preview.setAttribute(name, raw);
          } else {
            preview.removeAttribute(name);
          }
        } catch (e) {
          input.classList.add('invalid');
        }
      } else {
        preview.setAttribute(name, input.value);
      }
    });

    // Update code blocks
    updateCodeBlocks();
  }

  function camelCase(str) {
    return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
  }

  function kebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  function updateCodeBlocks() {
    // Collect attributes
    const attrs = [];
    for (let i = 0; i < preview.attributes.length; i++) {
      const a = preview.attributes[i];
      if (['id', 'class', 'style'].includes(a.name)) continue;
      attrs.push({ name: a.name, value: a.value });
    }

    // React prop string generator
    const reactProps = attrs.map(a => {
      const camelName = camelCase(a.name);
      const isJson = a.value.trim().startsWith('{') || a.value.trim().startsWith('[');
      const isBoolean = a.value === 'true';
      if (isBoolean) return camelName;
      if (isJson) return \`\${camelName}={\${a.value}}\`;
      return \`\${camelName}="\${a.value.replace(/"/g, '\\\\"')}"\`;
    });

    const pascalName = "${pascalName}";
    const wcTagName = "${tagName}";

    const reactCode = \`import \${pascalName} from '@contentveda/ui/react/\${pascalName}';
import '@contentveda/ui/theme.css';

<\${pascalName}
  \${reactProps.join('\\n  ')}
/>\`;

    const svelteProps = attrs.map(a => {
      const camelName = camelCase(a.name);
      const isJson = a.value.trim().startsWith('{') || a.value.trim().startsWith('[');
      const isBoolean = a.value === 'true';
      if (isBoolean) return camelName;
      if (isJson) return \`\${camelName}={\${a.value}}\`;
      return \`\${camelName}="\${a.value.replace(/"/g, '\\\\"')}"\`;
    });

    const svelteCode = \`<script lang="ts">
  import \${pascalName} from '@contentveda/ui/svelte/\${pascalName}.svelte';
<\\/script>

<\${pascalName}
  \${svelteProps.join('\\n  ')}
/>\`;

    const wcAttrs = attrs.map(a => {
      const isJson = a.value.trim().startsWith('{') || a.value.trim().startsWith('[');
      if (isJson) {
        return \`\${a.name}='\${a.value}'\`;
      }
      return \`\${a.name}="\${a.value.replace(/"/g, '\\\\"')}"\`;
    });

    const wcCode = \`<\` + \`script type="module" src="node_modules/@contentveda/ui/webcomponents/\${pascalName}.js"></\` + \`script>

<\${wcTagName}
  \${wcAttrs.join('\\n  ')}
></\${wcTagName}>\`;

    // Highlight and set
    const reactPanel = document.querySelector('[data-panel="react"] pre code');
    if (reactPanel) reactPanel.innerHTML = clientHighlight(reactCode, 'tsx');

    const sveltePanel = document.querySelector('[data-panel="svelte"] pre code');
    if (sveltePanel) sveltePanel.innerHTML = clientHighlight(svelteCode, 'svelte');

    const wcPanel = document.querySelector('[data-panel="wc"] pre code');
    if (wcPanel) wcPanel.innerHTML = clientHighlight(wcCode, 'html');
  }

  form.addEventListener('input', updatePreview);
  form.addEventListener('change', updatePreview);

  // Initial update
  setTimeout(updatePreview, 100);
});
</script>

</body>
</html>`;
}

// ── Build Landing Page HTML ────────────────────────────────────────────────
function buildLandingPage() {
  const cards = MANIFEST.map(c => `
        <a href="components/${c.slug}.html" class="component-card">
          <div class="card-preview" style="background:${c.cardGradient}">
            <div class="card-preview-icon">${c.icon}</div>
          </div>
          <div class="card-body">
            <div class="card-name">${c.name}</div>
            <p class="card-desc">${c.cardDesc}</p>
          </div>
          <div class="card-footer">
            <span class="card-tag tag-react">React</span>
            <span class="card-tag tag-svelte">Svelte</span>
            <span class="card-tag tag-wc">WC</span>
          </div>
        </a>`).join('\n');

  const sidebar = buildSidebar('', true);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ContentVeda UI — Universal Component Library</title>
  <link rel="canonical" href="${CANONICAL_BASE}/${MAJOR_VERSION}/" />
  <script>
    if (window.location.pathname.endsWith('/' + '${MAJOR_VERSION}')) {
      window.location.replace(window.location.pathname + '/' + window.location.search + window.location.hash);
    }
  </script>
  <meta name="description" content="A universal, framework-agnostic UI component library. Write once in Mitosis and compile to React, Svelte, and Web Components." />
  ${FAVICON_TAGS('')}
  ${PREFERENCES_SCRIPT}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="stylesheet" href="css/docs.css" />
  <style>
    .gradient-mesh {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }
    .gradient-mesh span {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.12;
    }
    .g1 { width: 600px; height: 600px; background: #7fc4de; top: -200px; left: -100px; }
    .g2 { width: 500px; height: 500px; background: #4d8ba6; top: 100px; right: -100px; }
    .g3 { width: 400px; height: 400px; background: #2c6480; bottom: 0; left: 40%; }
    .docs-main { position: relative; z-index: 1; }
  </style>
</head>
<body>
  <div class="gradient-mesh" aria-hidden="true">
    <span class="g1"></span>
    <span class="g2"></span>
    <span class="g3"></span>
  </div>

  ${buildHeader('', `<a href="${GITHUB_URL}" target="_blank" rel="noopener" class="btn-github">Star on GitHub</a>`)}

  <div class="docs-shell">
    ${sidebar}

    <main class="docs-main">
      <!-- Hero -->
      <section class="landing-hero">
        <div class="hero-eyebrow">
          <span>⚡</span> Open Source · MIT License
        </div>
        <h1 class="hero-title">
          A modern UI kit library to<br>
          <span class="hero-gradient">create beautiful pages</span>
        </h1>
        <p class="hero-subtitle">
          A universal, premium component library to build stunning web experiences
          natively in React, Svelte, and Web Components.
        </p>
        <div class="hero-actions">
          <a href="components/banner.html" class="btn-primary">
            Browse Components →
          </a>
          <a href="${GITHUB_URL}" target="_blank" rel="noopener" class="btn-secondary">
            View on GitHub
          </a>
        </div>
        <div class="feature-pills">
          <span class="feature-pill"><span class="dot dot-react"></span> React / Next.js</span>
          <span class="feature-pill"><span class="dot dot-svelte"></span> Svelte / SvelteKit</span>
          <span class="feature-pill"><span class="dot dot-wc"></span> Web Components</span>
          <span class="feature-pill"><span class="dot dot-ts"></span> TypeScript</span>
          <span class="feature-pill"><span class="dot dot-css"></span> CSS Variables</span>
        </div>

        <!-- Install -->
        <div class="install-banner" style="text-align:left;max-width:480px;margin:0 auto 1.5rem;">
          <code>npm install @contentveda/ui</code>
          <button class="copy-btn install-copy" style="position:static;flex-shrink:0">⎘ Copy</button>
        </div>

        <!-- Runnable example apps, one per compiled target -->
        <div class="example-apps" style="max-width:640px;margin:0 auto 3rem;">
          <p style="font-size:0.8rem;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin:0 0 0.75rem;">
            Runnable example apps
          </p>
          <div style="display:flex;gap:0.6rem;flex-wrap:wrap;justify-content:center;">
            <a href="${GITHUB_URL}/tree/main/examples/react-demo" target="_blank" rel="noopener" class="feature-pill" style="text-decoration:none">
              <span class="dot dot-react"></span> React demo
            </a>
            <a href="${GITHUB_URL}/tree/main/examples/svelte-demo" target="_blank" rel="noopener" class="feature-pill" style="text-decoration:none">
              <span class="dot dot-svelte"></span> Svelte demo
            </a>
            <a href="${GITHUB_URL}/tree/main/examples/wc-demo" target="_blank" rel="noopener" class="feature-pill" style="text-decoration:none">
              <span class="dot dot-wc"></span> Web Component demo
            </a>
            <a href="${GITHUB_URL}/tree/main/examples" target="_blank" rel="noopener" class="feature-pill" style="text-decoration:none">
              📁 All examples
            </a>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <div class="stats-bar">
        <div class="stat-item">
          <div class="stat-value">${MANIFEST.length}</div>
          <div class="stat-label">Components</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">3</div>
          <div class="stat-label">Frameworks</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">13</div>
          <div class="stat-label">Slide Effects</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">0</div>
          <div class="stat-label">Runtime Deps</div>
        </div>
      </div>

      <!-- Component Grid -->
      <h2 style="text-align:center;font-size:1.5rem;font-weight:700;letter-spacing:-0.03em;margin-bottom:2rem;color:var(--text-secondary)">
        All Components
      </h2>
      <div class="component-grid">
        ${cards}
      </div>
    </main>
  </div>

  <script src="js/docs.js"></script>
</body>
</html>`;
}

// ── Main ────────────────────────────────────────────────────────────────────
function main() {
  // Ensure output directories exist
  if (!fs.existsSync(VERSION_DIR)) {
    fs.mkdirSync(VERSION_DIR, { recursive: true });
  }
  if (!fs.existsSync(COMPONENTS_DIR)) {
    fs.mkdirSync(COMPONENTS_DIR, { recursive: true });
  }

  console.log(`\n📖  Generating ContentVeda UI docs for ${MAJOR_VERSION}...\n`);

  // 1. Copy static assets, css, and js to versioned folder
  copyDir(path.join(DOCS_DIR, 'css'), path.join(VERSION_DIR, 'css'));
  copyDir(path.join(DOCS_DIR, 'js'), path.join(VERSION_DIR, 'js'));
  copyDir(path.join(DOCS_DIR, 'assets'), path.join(VERSION_DIR, 'assets'));
  copyDir(path.join(ROOT, 'dist'), path.join(VERSION_DIR, 'dist'));
  copyDir(path.join(ROOT, 'src', 'styles'), path.join(VERSION_DIR, 'styles'));

  // 2. Generate component pages
  for (const component of MANIFEST) {
    const html = buildPage(component);
    const outPath = path.join(COMPONENTS_DIR, `${component.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    console.log(`  ✓  docs/${MAJOR_VERSION}/components/${component.slug}.html`);
  }

  // 3. Generate version landing page docs/<major>/index.html
  const landingHtml = buildLandingPage();
  fs.writeFileSync(path.join(VERSION_DIR, 'index.html'), landingHtml, 'utf8');
  console.log(`  ✓  docs/${MAJOR_VERSION}/index.html landing page generated`);

  // 4. Generate root redirect docs/index.html
  const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Redirecting to latest docs...</title>
  <link rel="canonical" href="${CANONICAL_BASE}/${MAJOR_VERSION}/">
  <meta http-equiv="refresh" content="0; url=${MAJOR_VERSION}/index.html">
  <script>
    window.location.replace("${MAJOR_VERSION}/index.html");
  </script>
</head>
<body style="background:#0b1120; color:#e2e8f0; font-family:sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; margin:0;">
  <div style="text-align:center;">
    <p style="margin-bottom:1rem; font-size:1.2rem;">Redirecting to ContentVeda UI documentation (${MAJOR_VERSION})...</p>
    <p><a href="${MAJOR_VERSION}/index.html" style="color:#7fc4de; text-decoration:underline;">Click here if you are not redirected automatically</a></p>
  </div>
</body>
</html>`;
  fs.writeFileSync(path.join(DOCS_DIR, 'index.html'), redirectHtml, 'utf8');
  console.log(`  ✓  docs/index.html redirect set up targeting ${MAJOR_VERSION}`);

  // 4b. Record what was built, for whoever publishes it.
  //
  // sync-ui-docs.yml in contentveda-docs has to know which vN tree to validate
  // and where to put the Allure report. It used to work that out by reading
  // this package's package.json and taking the major -- the same stale value
  // this script stopped trusting above. Left alone the two would disagree the
  // moment a major shipped: this script would write docs/v1 while the sync
  // looked for docs/v0 and failed the release.
  //
  // Publishing the resolved version alongside the tree removes the guesswork:
  // the tree states what it is, and the consumer reads it instead of
  // recomputing it from a different source and hoping they match.
  const versionManifest = { version: VERSION, major: MAJOR_VERSION, label: VERSION_LABEL };
  fs.writeFileSync(
    path.join(DOCS_DIR, 'version.json'),
    JSON.stringify(versionManifest, null, 2) + '\n',
    'utf8'
  );
  console.log(`  ✓  docs/version.json records ${VERSION} (${MAJOR_VERSION})`);

  // 5. Drop the pre-release docs tree once a real version exists.
  //
  // The tree is named after the major version, so while package.json carries
  // semantic-release's 0.0.0-development placeholder the docs build to
  // docs/v0. The moment the first release stamps a real version they build to
  // docs/v1 instead — and docs/v0 would be left behind. That matters because
  // the sync workflow replaces the docs site's static/ui wholesale with a copy
  // of docs/: a stale v0 would stay published forever, declaring itself
  // canonical at /ui/v0/ and competing with the real pages in search.
  //
  // Only the placeholder tree is removed, and only after confirming it is the
  // placeholder's — released majors are kept on purpose, since the version
  // picker is meant to keep serving older docs once v2 ships.
  if (!IS_UNRELEASED) {
    const placeholderDir = path.join(DOCS_DIR, 'v0');
    const placeholderIndex = path.join(placeholderDir, 'index.html');
    if (
      fs.existsSync(placeholderIndex) &&
      fs.readFileSync(placeholderIndex, 'utf8').includes('Unreleased (main)')
    ) {
      fs.rmSync(placeholderDir, { recursive: true, force: true });
      console.log('  ✓  removed docs/v0 — the pre-release tree, superseded by ' + MAJOR_VERSION);
    }
  }

  console.log(`\n✅  Generated ${MANIFEST.length} component pages.\n`);
}

main();
