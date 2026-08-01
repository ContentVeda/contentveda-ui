const fs = require('fs');
const path = require('path');

// Mitosis only builds src/components/**, so shared utils (e.g. lazyObserver,
// backgroundEffects, imported as "../utils/X" relative to
// dist/svelte/src/components/) are never emitted for the svelte target.
// Unlike the react/webcomponent targets (see fix-react.js / build-wc.js),
// Svelte consumers preprocess TypeScript themselves (e.g. vitePreprocess),
// so these are copied as-is rather than transpiled to .js.
const utilsSrcDir = path.join(__dirname, 'src', 'utils');
const utilsDistDir = path.join(__dirname, 'dist', 'svelte', 'src', 'utils');

if (fs.existsSync(utilsSrcDir)) {
  fs.mkdirSync(utilsDistDir, { recursive: true });
  for (const utilFile of fs.readdirSync(utilsSrcDir).filter((f) => f.endsWith('.ts'))) {
    fs.copyFileSync(path.join(utilsSrcDir, utilFile), path.join(utilsDistDir, utilFile));
  }
  console.log('Copied src/utils/*.ts into dist/svelte/src/utils/.');
}

// ── Expand self-closing non-void HTML elements ──────────────────────────────
// Mitosis emits `<div ... />` for empty elements. Svelte 5 rejects that:
//
//   Self-closing HTML tags for non-void elements are ambiguous —
//   use `<div ...></div>` rather than `<div ... />`
//
// It is only a warning today, but it fires once per occurrence on every
// consumer's dev server — roughly ninety lines of noise per reload in the admin
// app — and the syntax is slated to stop working. Fixing it in the generated
// output rather than by hand, because `dist/` is rewritten on every build.
//
// Deliberately an allowlist of HTML elements rather than "everything that is
// not void":
//   - Components (`<Banner />`) are capitalised and may legally self-close.
//   - SVG children (`<path />`, `<rect />`, `<ellipse />`, `<polygon />` — the
//     Banner hotspot layer is full of them) are foreign elements where
//     self-closing is valid and Svelte does not complain.
//   - Void elements (`<img />`, `<input />`, `<source />`) must stay as they are.
// An inverted list would have caught all three by accident.
const SELF_CLOSING_FIXABLE = [
  'div', 'span', 'p', 'a', 'button', 'video', 'audio', 'canvas', 'iframe',
  'section', 'article', 'header', 'footer', 'main', 'nav', 'aside',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th',
  'form', 'label', 'select', 'textarea', 'figure', 'figcaption',
  'blockquote', 'pre', 'code', 'strong', 'em', 'b', 'i', 'u', 'small',
  'picture', 'details', 'summary', 'dialog'
];

const componentsDistDir = path.join(__dirname, 'dist', 'svelte', 'src', 'components');

if (fs.existsSync(componentsDistDir)) {
  let filesChanged = 0;
  let tagsExpanded = 0;

  for (const file of fs.readdirSync(componentsDistDir).filter((f) => f.endsWith('.svelte'))) {
    const filePath = path.join(componentsDistDir, file);
    const original = fs.readFileSync(filePath, 'utf8');

    // Only the markup, never the <script>. Component source contains HTML in
    // plain strings (RichTextEditor builds widget markup that way), and
    // rewriting those would change what the component emits at runtime.
    const scriptEnd = original.lastIndexOf('</script>');
    const head = scriptEnd === -1 ? '' : original.slice(0, scriptEnd + '</script>'.length);
    let markup = scriptEnd === -1 ? original : original.slice(scriptEnd + '</script>'.length);

    for (const tag of SELF_CLOSING_FIXABLE) {
      // (?=[s/>]) is a tag-name boundary. Without it `<i` matches the start of
      // `<input ... />` and rewrites it to `<input ...></i>`, which Svelte rejects
      // with "</i> attempted to close an element that was not open". Every short
      // name in the list has the same trap: `a` in `<article>`, `b` in `<button>`,
      // `p` in `<picture>`, `u` in `<use>`.
      // [^>]*? keeps the match inside a single tag: without it, a lazy match
      // starting at a non-self-closing `<div>` would run on to the next `/>`
      // in the file and swallow everything between.
      markup = markup.replace(new RegExp(`<(${tag})(?=[\\s/>])([^>]*?)\\s*/>`, 'g'), (_m, t, attrs) => {
        tagsExpanded++;
        return `<${t}${attrs}></${t}>`;
      });
    }

    const updated = head + markup;
    if (updated !== original) {
      fs.writeFileSync(filePath, updated);
      filesChanged++;
    }
  }

  console.log(
    `Expanded ${tagsExpanded} self-closing non-void element(s) across ${filesChanged} Svelte component(s).`
  );
}
