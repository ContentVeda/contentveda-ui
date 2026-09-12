const fs = require('fs');
const path = require('path');

const utilsSrcDir = path.join(__dirname, 'src', 'utils');

const ts = require('typescript');

if (fs.existsSync(utilsSrcDir)) {
  const frameworks = ['svelte', 'vue', 'solid', 'angular'];
  
  frameworks.forEach(fw => {
    const utilsDistDir = path.join(__dirname, 'dist', fw, 'src', 'utils');
    fs.mkdirSync(utilsDistDir, { recursive: true });
    
    for (const utilFile of fs.readdirSync(utilsSrcDir).filter((f) => f.endsWith('.ts'))) {
      const srcCode = fs.readFileSync(path.join(utilsSrcDir, utilFile), 'utf8');
      fs.writeFileSync(path.join(utilsDistDir, utilFile), srcCode);
      const res = ts.transpileModule(srcCode, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.CommonJS,
          esModuleInterop: true
        }
      });
      fs.writeFileSync(path.join(utilsDistDir, utilFile.replace('.ts', '.js')), res.outputText);
    }
    console.log(`Copied and compiled src/utils/*.ts into dist/${fw}/src/utils/.`);
  });
}
