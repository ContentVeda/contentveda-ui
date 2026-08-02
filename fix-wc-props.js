const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'dist', 'webcomponent', 'src', 'components');

if (fs.existsSync(srcDir)) {
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const filePath = path.join(srcDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Mitosis extracts HTML attributes as raw strings. We want to automatically parse
    // them into objects if they are JSON, so arrays/objects work in Web Components.
    const searchStr = 'const attrValue = this.getAttribute(attr);';
    const replaceStr = `let attrValue: any = this.getAttribute(attr);
          try {
            if (attrValue && (attrValue.trim().startsWith('{') || attrValue.trim().startsWith('['))) {
              attrValue = JSON.parse(attrValue);
            }
          } catch (e) {}`;

    if (content.includes(searchStr)) {
      content = content.replace(searchStr, replaceStr);
    }

    // Mitosis matches an attribute to a prop with an *unanchored* regex:
    //
    //   const regexp = new RegExp(jsVar, "i");
    //   if (regexp.test(prop)) { ... }
    //
    // which is a substring test, so an attribute whose name is a prefix of
    // another prop sets both. `columns="4"` on <cv-grid-banner> matched
    // `columns`, `columnsTablet` and `columnsMobile` and assigned 4 to all
    // three — the per-breakpoint props could then never fall back to their
    // automatic behaviour, because they were always populated.
    //
    // Anchor it so an attribute maps to exactly the prop it names, and escape
    // the value so an attribute containing regex metacharacters cannot throw.
    const looseMatch = 'const regexp = new RegExp(jsVar, "i");';
    const exactMatch =
      'const regexp = new RegExp("^" + jsVar.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&") + "$", "i");';

    if (content.includes(looseMatch)) {
      // Function replacer, and split on the literal rather than String.replace
      // with a pattern: the replacement contains `$&`, which replace() would
      // otherwise expand to the matched text instead of emitting it literally.
      // Splitting also catches every occurrence, where replace() with a string
      // only ever substitutes the first.
      content = content.split(looseMatch).join(exactMatch);
    }

    // Mitosis applies inline styles with `Object.assign(el.style, {...})`.
    // That works for ordinary CSS properties but is a silent no-op for CSS
    // custom properties: `style['--x'] = '3'` sets a plain JS expando on the
    // CSSStyleDeclaration and never reaches the element. Only setProperty()
    // does. GridBanner passes its per-breakpoint column counts as --cv-grid-*
    // properties, so without this they never arrived and the component always
    // rendered its automatic breakpoints.
    // Scoped to `Object.assign(<something>.style, ` so that Object.assign
    // calls on props/state elsewhere in the file are left alone. The second
    // argument is not required to be an object literal — Banner passes the
    // result of a call — so the match stops at the comma.
    const styleAssign = /Object\.assign\(\s*([A-Za-z_$][\w$.?![\]]*\.style)\s*,\s*/g;

    if (styleAssign.test(content)) {
      styleAssign.lastIndex = 0;
      content = content.replace(styleAssign, (_m, target) => `__cvAssignStyle(${target}, `);

      const helper = `
/**
 * Object.assign for inline styles that also handles CSS custom properties.
 * Injected by fix-wc-props.js — see the note there.
 */
function __cvAssignStyle(style: any, obj: any) {
  if (!style || !obj) return style;
  for (const key in obj) {
    const value = obj[key];
    if (key.charCodeAt(0) === 45 && key.charCodeAt(1) === 45) {
      // Custom property. Removing on empty keeps var() fallbacks working,
      // since a property set to the empty value substitutes nothing rather
      // than falling back.
      if (value === '' || value === null || value === undefined) {
        style.removeProperty(key);
      } else {
        style.setProperty(key, String(value));
      }
    } else {
      style[key] = value;
    }
  }
  return style;
}
`;
      // Appended, not spliced in near the top: a function declaration is
      // hoisted to module scope, so it is callable from the class above it,
      // and appending cannot land in the middle of a multi-line import.
      content = content + '\n' + helper;
    }

    // Fix missing componentProps initialization in constructor
    if (content.includes('this.componentProps') && !content.includes('this.componentProps =')) {
      const interfaceMatch = content.match(/interface\s+\w+Props\s*\{([\s\S]*?)\}/);
      if (interfaceMatch) {
        const propsBlock = interfaceMatch[1];
        const propNames = [];
        const lines = propsBlock.split('\n');
        for (const line of lines) {
          const propMatch = line.match(/^\s*([a-zA-Z0-9_]+)\s*\??\s*:/);
          if (propMatch) {
            propNames.push(propMatch[1]);
          }
        }
        console.log(`Injecting componentProps for ${file}:`, propNames);
        const constructorStr = 'constructor() {';
        const injectStr = `constructor() {
    this.componentProps = ${JSON.stringify(propNames)};`;
        content = content.replace(constructorStr, injectStr);
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
  }
  console.log('Patched Web Component output to support JSON parsing of attributes.');
}
