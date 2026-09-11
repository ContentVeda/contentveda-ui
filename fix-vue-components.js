const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'dist', 'vue', 'src', 'components');
if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.vue'));
  for (const file of files) {
    const fp = path.join(dir, file);
    let code = fs.readFileSync(fp, 'utf8');

    // Mitosis puts non-DOM useRef instances into this.$refs, but they are undefined in Vue since they are not in the template.
    // Replace with a dynamic instance property.
    code = code.replace(/this\.\$refs\.animContext/g, '(this._animContext = this._animContext || { animationFrameId: null, resizeHandler: null, resizeObserver: null, intervalId: null, dimResizeHandler: null })');
    code = code.replace(/this\.\$refs\.bgEffectContext/g, '(this._bgEffectContext = this._bgEffectContext || { animationFrameId: null, resizeHandler: null, resizeObserver: null })');
    code = code.replace(/this\.\$refs\.observerBox/g, '(this._observerBox = this._observerBox || { disconnect: null, row: null })');
    code = code.replace(/this\.\$refs\.latestNext/g, '(this._latestNext = this._latestNext || { fn: () => {} })');

    fs.writeFileSync(fp, code);
  }
}
console.log('Fixed Vue components.');
