const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'dist', 'solid', 'src', 'components');
if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') || f.endsWith('.jsx'));
  for (const file of files) {
    const fp = path.join(dir, file);
    let code = fs.readFileSync(fp, 'utf8');

    // Solid plugin drops non-DOM refs. Re-inject them at the top of the component body.
    code = code.replace(/function (\w+)\(props: (\w+)\) \{/, `function $1(props: $2) {\n  let animContext = { animationFrameId: null, resizeHandler: null, resizeObserver: null, intervalId: null, dimResizeHandler: null };\n  let bgEffectContext = { animationFrameId: null, resizeHandler: null, resizeObserver: null };\n  let observerBox = { disconnect: null, row: null };\n  let latestNext = { fn: () => {} };\n`);

    fs.writeFileSync(fp, code);
  }
}
console.log('Fixed Solid components.');
