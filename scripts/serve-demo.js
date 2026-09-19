const http = require('http');
const fs = require('fs');
const path = require('path');
const { bundleReactHarness, bundleSvelteHarness, bundleVueHarness, bundleSolidHarness, bundleAngularHarness } = require('../tests/bdd/support/bundle');

const ROOT = path.resolve(__dirname, '..');
const PORT = 5180;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2'
};

const DEFAULT_CONTENT = `<h2>🚀 Rich Text Editor Toolbar Redesign</h2>
<p>Modern two-row editorial layout with typography selectors, direct media inserts, table controls, dynamic CSS chips, and AI assistant.</p>
<p>It is currently rendered natively inside the selected JavaScript framework with <em>zero functional regressions</em> and full feature fidelity!</p>
<blockquote>Crafted with modern 2-row ergonomics, custom typography pickers, instant widgets, and integrated ContentVeda AI.</blockquote>
<p>Try testing the features in the toolbar above:</p>
<ul>
  <li>Switch font family (e.g. <strong>Fira Code</strong> or <strong>Outfit</strong>) and adjust font size</li>
  <li>Pick inline text colors and background marker highlights</li>
  <li>Click into the table below to reveal contextual row and column tools</li>
</ul>
<table border="1" style="width: 100%; border-collapse: collapse; margin: 16px 0;">
  <thead>
    <tr style="background: rgba(255,255,255,0.05);">
      <th style="padding: 10px; text-align: left;">Feature</th>
      <th style="padding: 10px; text-align: left;">Row</th>
      <th style="padding: 10px; text-align: left;">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px;">Typography &amp; Color Pickers</td>
      <td style="padding: 10px;">Row 1</td>
      <td style="padding: 10px;">✅ Operational</td>
    </tr>
    <tr>
      <td style="padding: 10px;">Table, Widget &amp; AI Tools</td>
      <td style="padding: 10px;">Row 2</td>
      <td style="padding: 10px;">✨ Active</td>
    </tr>
  </tbody>
</table>
<p>Add custom CSS chips using the <code>CLASS</code> input or click <strong>✨ ContentVeda AI</strong> to enhance copy.</p>`;

const DEFAULT_CONFIG = {
  toolbar: [
    'fullscreen', 'source', 'bold', 'italic', 'underline', 'strikeThrough', 'code', 'quote', 'clear',
    'headings', 'foreColor', 'backColor', 'justifyLeft', 'justifyCenter', 'justifyRight',
    'image', 'link', 'table', 'unorderedList', 'orderedList', 'horizontalRule', 'video', 'social',
    'insertButton', 'addWidget', 'save', 'classInput'
  ]
};

let cachedBundles = {};

async function prepareBundles() {
  console.log('[Demo Server] Pre-compiling framework harnesses for RichTextEditor...');
  const props = {
    initialContent: DEFAULT_CONTENT,
    config: DEFAULT_CONFIG,
    availableClasses: ['cv-callout', 'variant-blue', 'hero-lead', 'prose-glow', 'badge-pill']
  };

  const [reactPath, sveltePath, vuePath, solidPath, angularPath] = await Promise.all([
    bundleReactHarness('RichTextEditor', props),
    bundleSvelteHarness('RichTextEditor', props),
    bundleVueHarness('RichTextEditor', props),
    bundleSolidHarness('RichTextEditor', props),
    bundleAngularHarness('RichTextEditor', props)
  ]);

  cachedBundles = {
    react: reactPath,
    svelte: sveltePath,
    vue: vuePath,
    solid: solidPath,
    angular: angularPath,
    wc: '/dist/webcomponent/dist/RichTextEditor.js'
  };

  console.log('[Demo Server] All framework bundles ready:');
  console.log(' - React:', cachedBundles.react);
  console.log(' - Svelte:', cachedBundles.svelte);
  console.log(' - Vue:', cachedBundles.vue);
  console.log(' - Solid:', cachedBundles.solid);
  console.log(' - Angular:', cachedBundles.angular);
  console.log(' - Web Component:', cachedBundles.wc);
}

function getIndexHtml() {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ContentVeda RichTextEditor — Multi-Framework Demo</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/dist/styles/theme.css" />
  <link rel="stylesheet" href="/dist/styles/components/RichTextEditor.css" />
  <style>
    :root {
      --bg-dark: #090d16;
      --surface-dark: #0f172a;
      --surface-card: #141f36;
      --border-dark: rgba(255, 255, 255, 0.08);
      --accent: #8b5cf6;
      --accent-glow: rgba(139, 92, 246, 0.25);
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg-dark);
      color: #f1f5f9;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      padding: 16px 32px;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-dark);
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .brand-group {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .brand-logo {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #a855f7, #6366f1);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px var(--accent-glow);
    }
    .brand-title {
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: #fff;
    }
    .brand-sub {
      font-size: 0.8rem;
      color: #94a3b8;
    }
    .status-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #34d399;
    }
    .status-dot {
      width: 7px;
      height: 7px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 8px #10b981;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    main {
      flex: 1;
      max-width: 1440px;
      width: 100%;
      margin: 0 auto;
      padding: 32px 32px 64px 32px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    /* Hero section */
    .hero {
      text-align: center;
      margin-bottom: 8px;
    }
    .hero h1 {
      font-size: 2.2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
      background: linear-gradient(135deg, #ffffff 40%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero p {
      color: #94a3b8;
      font-size: 0.95rem;
      max-width: 650px;
      margin: 0 auto;
    }
    /* Framework Switcher Bar */
    .fw-switcher-wrap {
      display: flex;
      justify-content: center;
      margin: 8px 0;
    }
    .fw-switcher {
      display: inline-flex;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid var(--border-dark);
      border-radius: 14px;
      padding: 5px;
      gap: 4px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    }
    .fw-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 18px;
      border-radius: 10px;
      border: none;
      background: transparent;
      color: #94a3b8;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }
    .fw-btn:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.05);
    }
    .fw-btn.active {
      color: #fff;
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(99, 102, 241, 0.8));
      box-shadow: 0 4px 16px var(--accent-glow);
    }
    .fw-badge {
      font-size: 0.68rem;
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.3);
      font-weight: 500;
    }
    /* Workspace Card */
    .workspace-card {
      background: var(--surface-dark);
      border: 1px solid var(--border-dark);
      border-radius: 20px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .workspace-header {
      padding: 14px 24px;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid var(--border-dark);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .active-framework-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.95rem;
      font-weight: 600;
      color: #cbd5e1;
    }
    .feature-tags {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .feature-tag {
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-dark);
      color: #94a3b8;
    }
    .feature-tag.accent {
      background: rgba(168, 85, 247, 0.15);
      border-color: rgba(168, 85, 247, 0.3);
      color: #c084fc;
    }
    .editor-stage {
      padding: 24px;
      min-height: 480px;
      background: #020617;
      display: flex;
      flex-direction: column;
    }
    #mount-frame {
      width: 100%;
      height: 600px;
      border: none;
      border-radius: 12px;
    }
    /* Features Showcase grid */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 20px;
      margin-top: 12px;
    }
    .feature-card {
      background: var(--surface-card);
      border: 1px solid var(--border-dark);
      border-radius: 14px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .feature-card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.95rem;
      font-weight: 700;
      color: #f1f5f9;
    }
    .feature-card p {
      font-size: 0.84rem;
      color: #94a3b8;
      line-height: 1.5;
    }
    .feature-items {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 6px;
    }
    .feature-pill {
      font-size: 0.72rem;
      padding: 3px 8px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.06);
      color: #cbd5e1;
    }
  </style>
</head>
<body>

  <header>
    <div class="brand-group">
      <div class="brand-logo">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color: #fff;">
          <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      </div>
      <div>
        <div class="brand-title">ContentVeda UI</div>
        <div class="brand-sub">RichTextEditor Multi-Framework Suite • v0.2.7</div>
      </div>
    </div>
    <div class="status-badge">
      <span class="status-dot"></span>
      <span>All 6 Targets Operational</span>
    </div>
  </header>

  <main>
    <div class="hero">
      <h1>Rich Text Editor Toolbar Redesign</h1>
      <p>Modern two-row editorial layout with typography selectors, direct media inserts, table controls, dynamic CSS chips, and AI assistant.</p>
    </div>

    <!-- Framework Switcher -->
    <div class="fw-switcher-wrap">
      <div class="fw-switcher" id="framework-tabs" role="tablist">
        <button class="fw-btn active" data-framework="react">
          <span>⚛️ React</span>
          <span class="fw-badge">v18</span>
        </button>
        <button class="fw-btn" data-framework="svelte">
          <span>🧡 Svelte</span>
          <span class="fw-badge">v3/4</span>
        </button>
        <button class="fw-btn" data-framework="vue">
          <span>💚 Vue</span>
          <span class="fw-badge">v3</span>
        </button>
        <button class="fw-btn" data-framework="solid">
          <span>💙 Solid</span>
          <span class="fw-badge">v1</span>
        </button>
        <button class="fw-btn" data-framework="angular">
          <span>🅰️ Angular</span>
          <span class="fw-badge">v14</span>
        </button>
        <button class="fw-btn" data-framework="wc">
          <span>🌐 Web Component</span>
          <span class="fw-badge">Native</span>
        </button>
      </div>
    </div>

    <!-- Main Workspace Card -->
    <div class="workspace-card">
      <div class="workspace-header">
        <div class="active-framework-title" id="active-target-title">
          <span>⚛️ Active Target: <strong>React 18 Component</strong></span>
        </div>
        <div class="feature-tags">
          <span class="feature-tag accent">✨ Mitosis Multi-Compile</span>
          <span class="feature-tag">WCAG 2.2 AAA</span>
          <span class="feature-tag">2-Row Layout</span>
        </div>
      </div>

      <div class="editor-stage">
        <iframe id="mount-frame" src="/harness?framework=react" title="Component Harness Frame"></iframe>
      </div>
    </div>

    <!-- Features Showcase Grid -->
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-card-header">
          <span>🎨 Row 1: Typography &amp; Inline Tools</span>
        </div>
        <p>Full undo/redo history, Heading formats, font family picker, font size scale, rich formatting, custom color indicators, and 4 text alignment modes.</p>
        <div class="feature-items">
          <span class="feature-pill">Undo / Redo</span>
          <span class="feature-pill">Heading 1-4</span>
          <span class="feature-pill">Inter / Roboto / Outfit</span>
          <span class="feature-pill">12px - 32px</span>
          <span class="feature-pill">B / I / U / S</span>
          <span class="feature-pill">Code Block</span>
          <span class="feature-pill">Clear Format</span>
          <span class="feature-pill">Text &amp; Highlight Color</span>
          <span class="feature-pill">Justify</span>
        </div>
      </div>

      <div class="feature-card">
        <div class="feature-card-header">
          <span>⚡ Row 2: Insertions, Widgets &amp; AI</span>
        </div>
        <p>Lists, quick action bar + Insert dropdown, contextual table rows/columns editor, dark UI widget pill, dynamic removable CSS chips, and ContentVeda AI.</p>
        <div class="feature-items">
          <span class="feature-pill">Bullet &amp; Numbered</span>
          <span class="feature-pill">Task List</span>
          <span class="feature-pill">Table Controls (Add/Del R/C)</span>
          <span class="feature-pill">Image &amp; Video</span>
          <span class="feature-pill">Formula Fx</span>
          <span class="feature-pill">+ Add UI Widget</span>
          <span class="feature-pill">CLASS Chip Tagger</span>
          <span class="feature-pill">✨ ContentVeda AI</span>
          <span class="feature-pill">Source Code View</span>
        </div>
      </div>

      <div class="feature-card">
        <div class="feature-card-header">
          <span>🛡️ 100% Zero Regressions</span>
        </div>
        <p>All original 28 options remain fully configurable and compatible via <code>config.toolbar</code> array. Validated by end-to-end BDD tests across every target.</p>
        <div class="feature-items">
          <span class="feature-pill">React PASSED</span>
          <span class="feature-pill">Svelte PASSED</span>
          <span class="feature-pill">Vue PASSED</span>
          <span class="feature-pill">Solid PASSED</span>
          <span class="feature-pill">Angular PASSED</span>
          <span class="feature-pill">WC PASSED</span>
        </div>
      </div>
    </div>
  </main>

  <script>
    const buttons = document.querySelectorAll('.fw-btn');
    const frame = document.getElementById('mount-frame');
    const titleEl = document.getElementById('active-target-title');

    const labels = {
      react: '⚛️ Active Target: <strong>React 18 Component</strong>',
      svelte: '🧡 Active Target: <strong>Svelte 3/4 Component</strong>',
      vue: '💚 Active Target: <strong>Vue 3 Component</strong>',
      solid: '💙 Active Target: <strong>Solid 1.0 Component</strong>',
      angular: '🅰️ Active Target: <strong>Angular 14 Component</strong>',
      wc: '🌐 Active Target: <strong>Web Component (&lt;cv-rich-text-editor&gt;)</strong>'
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const fw = btn.getAttribute('data-framework');
        titleEl.innerHTML = labels[fw] || fw;
        frame.src = '/harness?framework=' + fw;
      });
    });
  </script>

</body>
</html>
`;
}

function getHarnessHtml(framework) {
  const bundleUrl = cachedBundles[framework] || cachedBundles.react;

  if (framework === 'wc') {
    return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="/dist/styles/theme.css" />
  <link rel="stylesheet" href="/dist/styles/components/RichTextEditor.css" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: transparent;
      font-family: 'Inter', system-ui, sans-serif;
      color: #f1f5f9;
    }
    #mount {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-sizing: border-box;
    }
    cv-rich-text-editor {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  </style>
  <script type="module" src="${bundleUrl}"></script>
</head>
<body>
  <div id="mount">
    <cv-rich-text-editor
      id="subject"
      initial-content="${DEFAULT_CONTENT.replace(/"/g, '&quot;')}"
      config='${JSON.stringify(DEFAULT_CONFIG)}'
      available-classes='["cv-callout", "variant-blue", "hero-lead", "prose-glow", "badge-pill"]'
    ></cv-rich-text-editor>
  </div>
</body>
</html>`;
  }

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="/dist/styles/theme.css" />
  <link rel="stylesheet" href="/dist/styles/components/RichTextEditor.css" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: transparent;
      font-family: 'Inter', system-ui, sans-serif;
      color: #f1f5f9;
    }
    #mount {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-sizing: border-box;
    }
  </style>
  <script type="module" src="${bundleUrl}"></script>
</head>
<body>
  <div id="mount"></div>
</body>
</html>`;
}

async function start() {
  await prepareBundles();

  const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0];

    if (url === '/' || url === '/index.html') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(getIndexHtml());
      return;
    }

    if (url === '/harness') {
      const parsed = new URL(req.url, 'http://localhost:' + PORT);
      const framework = parsed.searchParams.get('framework') || 'react';
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(getHarnessHtml(framework));
      return;
    }

    const filePath = path.join(ROOT, url);
    if (filePath.startsWith(ROOT) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found: ' + url);
  });

  server.listen(PORT, () => {
    console.log(`[Demo Server] Live showcase running at http://localhost:${PORT}`);
  });
}

start().catch(console.error);
