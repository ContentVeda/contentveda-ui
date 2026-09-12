const fs = require('fs');
const path = require('path');

const utilsSrcDir = path.join(__dirname, 'src', 'utils');

if (fs.existsSync(utilsSrcDir)) {
  const frameworks = ['svelte', 'vue', 'solid', 'angular'];
  
  frameworks.forEach(fw => {
    const utilsDistDir = path.join(__dirname, 'dist', fw, 'src', 'utils');
    fs.mkdirSync(utilsDistDir, { recursive: true });
    
    for (const utilFile of fs.readdirSync(utilsSrcDir).filter((f) => f.endsWith('.ts'))) {
      fs.copyFileSync(path.join(utilsSrcDir, utilFile), path.join(utilsDistDir, utilFile));
    }
    console.log(`Copied src/utils/*.ts into dist/${fw}/src/utils/.`);
  });
}
