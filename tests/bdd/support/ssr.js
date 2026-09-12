const path = require('path');
const fs = require('fs');
const esbuild = require('esbuild');
const svelteCompiler = require('svelte/compiler');
const ts = require('typescript');
const { solidPlugin } = require('esbuild-plugin-solid');
const vuePlugin = require('esbuild-plugin-vue3');

const ROOT = path.join(__dirname, '..', '..', '..');
const TMP_DIR = path.join(ROOT, 'tests', 'bdd', '.tmp');

if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

let counter = 0;
function tmpFile(ext) {
  counter += 1;
  return path.join(TMP_DIR, `ssr-${process.pid}-${counter}.${ext}`);
}

async function bundleForNode(entryCode, plugins = []) {
  const outFile = tmpFile('js');
  await esbuild.build({
    stdin: {
      contents: entryCode,
      resolveDir: ROOT,
      loader: 'js'
    },
    bundle: true,
    format: 'cjs',
    platform: 'node',
    target: 'node18',
    outfile: outFile,
    logLevel: 'silent',
    plugins,
    external: ['react', 'react-dom/server', 'vue', 'vue/server-renderer', 'solid-js', 'solid-js/web']
  });
  return outFile;
}

async function renderReactSsr(pascalName, props) {
  const React = require('react');
  const ReactDOMServer = require('react-dom/server');
  
  const componentPath = path.join(ROOT, 'dist', 'react', 'src', 'components', `${pascalName}.js`);
  const Component = require(componentPath).default || require(componentPath);
  
  const element = React.createElement(Component, props);
  return ReactDOMServer.renderToString(element);
}

function stripScriptTypes(source) {
  return source.replace(
    /(<script[^>]*\blang=["']ts["'][^>]*>)([\s\S]*?)(<\/script>)/g,
    (_match, openTag, code, closeTag) => {
      const { outputText } = ts.transpileModule(code, {
        compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext }
      });
      const openTagWithoutLang = openTag.replace(/\s+lang=["']ts["']/, '');
      return `${openTagWithoutLang}${outputText}${closeTag}`;
    }
  );
}

async function renderSvelteSsr(pascalName, props) {
  const svelteSrcPath = path.join(ROOT, 'dist', 'svelte', 'src', 'components', `${pascalName}.svelte`);
  const source = fs.readFileSync(svelteSrcPath, 'utf8');
  const withoutRunesOption = source.replace(/<svelte:options\s+runes=\{false\}\s*\/>\n?/, '');
  const plainJsSource = stripScriptTypes(withoutRunesOption);

  const { js } = svelteCompiler.compile(plainJsSource, {
    generate: 'ssr',
    format: 'cjs',
    filename: `${pascalName}.svelte`
  });

  const outFile = svelteSrcPath.replace('.svelte', '.ssr.js');
  fs.writeFileSync(outFile, js.code);

  let htmlString = '';
  try {
    const Component = require(outFile).default || require(outFile);
    const { html } = Component.render(props);
    htmlString = html;
  } finally {
    fs.unlinkSync(outFile);
  }
  return htmlString;
}

async function renderVueSsr(pascalName, props) {
  const { createSSRApp, h } = require('vue');
  const { renderToString } = require('vue/server-renderer');

  const entry = `
    const Component = require('${path.join(ROOT, 'dist', 'vue', 'src', 'components', `${pascalName}.vue`).replace(/\\/g, '/')}').default;
    module.exports = Component;
  `;
  
  const outFile = await bundleForNode(entry, [vuePlugin()]);
  
  try {
    const Component = require(outFile).default || require(outFile);
    const app = createSSRApp({
      render() {
        return h(Component, props);
      }
    });
    return await renderToString(app);
  } finally {
    fs.unlinkSync(outFile);
  }
}

async function renderSolidSsr(pascalName, props) {
  const entry = `
    const { renderToString } = require('solid-js/web');
    const { createComponent } = require('solid-js');
    const Component = require('${path.join(ROOT, 'dist', 'solid', 'src', 'components', `${pascalName}.tsx`).replace(/\\/g, '/')}').default;
    
    module.exports = function render(props) {
      return renderToString(() => createComponent(Component, props));
    };
  `;
  
  const outFile = await bundleForNode(entry, [solidPlugin({ solid: { generate: 'ssr', hydratable: true } })]);
  
  try {
    const renderFn = require(outFile).default || require(outFile);
    return renderFn(props);
  } finally {
    fs.unlinkSync(outFile);
  }
}

async function renderAngularSsr(pascalName, props) {
  // Angular SSR via generic node script is skipped due to AOT ServerModule requirements
  return '<div>Angular SSR Skipped</div>';
}

async function renderSsrString(framework, pascalName, props) {
  framework = framework.toLowerCase();
  switch (framework) {
    case 'react': return renderReactSsr(pascalName, props);
    case 'svelte': return renderSvelteSsr(pascalName, props);
    case 'vue': return renderVueSsr(pascalName, props);
    case 'solid': return renderSolidSsr(pascalName, props);
    case 'angular': return renderAngularSsr(pascalName, props);
    default: throw new Error(`Unsupported SSR framework: ${framework}`);
  }
}

module.exports = { renderSsrString };
