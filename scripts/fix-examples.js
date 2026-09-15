const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, 'docs-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

manifest.forEach(comp => {
  if (comp.examples) {
    // Fix React
    if (comp.examples.react && !comp.examples.react.includes('export default function')) {
      const parts = comp.examples.react.split('\n\n<');
      if (parts.length === 2) {
        comp.examples.react = `${parts[0]}\n\nexport default function Example() {\n  return (\n    <${parts[1].split('\n').join('\n    ')}\n  );\n}`;
      }
    }
    
    // Fix Solid
    if (comp.examples.solid && !comp.examples.solid.includes('export default function')) {
      const parts = comp.examples.solid.split('\n\n<');
      if (parts.length === 2) {
        comp.examples.solid = `${parts[0]}\n\nexport default function Example() {\n  return (\n    <${parts[1].split('\n').join('\n    ')}\n  );\n}`;
      }
    }
  }
});

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('Fixed docs-manifest.json');
