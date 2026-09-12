const fs = require('fs');
const path = require('path');

function convertTemplateLiteralToConcat(raw) {
  let content = raw;
  if (content.startsWith('\\`')) content = content.slice(2);
  else if (content.startsWith('`')) content = content.slice(1);
  if (content.endsWith('\\`')) content = content.slice(0, -2);
  else if (content.endsWith('`')) content = content.slice(0, -1);

  const parts = [];
  let currentLiteral = '';
  let i = 0;

  while (i < content.length) {
    let isExprStart = false;
    let skipCount = 0;
    if (content[i] === '\\' && content[i + 1] === '$' && content[i + 2] === '{') {
      isExprStart = true;
      skipCount = 3;
    } else if (content[i] === '$' && content[i + 1] === '{') {
      isExprStart = true;
      skipCount = 2;
    }

    if (isExprStart) {
      if (currentLiteral.length > 0) {
        parts.push("'" + currentLiteral.replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'");
        currentLiteral = '';
      }
      i += skipCount;
      let depth = 1;
      let expr = '';
      let inSingleQuote = false;
      let inDoubleQuote = false;
      while (i < content.length && depth > 0) {
        const char = content[i];
        if (char === "'" && !inDoubleQuote && content[i - 1] !== '\\') {
          inSingleQuote = !inSingleQuote;
        } else if (char === '"' && !inSingleQuote && content[i - 1] !== '\\') {
          inDoubleQuote = !inDoubleQuote;
        } else if (!inSingleQuote && !inDoubleQuote) {
          if (char === '{') depth++;
          else if (char === '}') depth--;
        }
        if (depth > 0) {
          expr += char;
        }
        i++;
      }
      parts.push(`(${expr.trim()})`);
    } else {
      currentLiteral += content[i];
      i++;
    }
  }

  if (currentLiteral.length > 0) {
    parts.push("'" + currentLiteral.replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'");
  }

  if (parts.length === 0) return "''";
  return parts.join(' + ');
}

function fixAngularFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const marker = 'template: `';
  const startIdx = code.indexOf(marker);
  if (startIdx === -1) return;
  const tmplStart = startIdx + marker.length;

  let i = tmplStart;
  while (i < code.length) {
    if (code[i] === '`' && code[i - 1] !== '\\') {
      break;
    }
    i++;
  }

  const templateHtml = code.substring(tmplStart, i);
  let newTemplateHtml = '';
  let j = 0;
  while (j < templateHtml.length) {
    if (templateHtml[j] === '\\' && templateHtml[j + 1] === '`') {
      const litStart = j;
      j += 2;
      while (j < templateHtml.length) {
        if (templateHtml[j] === '\\' && templateHtml[j + 1] === '`') {
          j += 2;
          break;
        }
        j++;
      }
      const rawTemplateLiteral = templateHtml.substring(litStart, j);
      newTemplateHtml += convertTemplateLiteralToConcat(rawTemplateLiteral);
    } else {
      newTemplateHtml += templateHtml[j];
      j++;
    }
  }

  // 1. Remove single-line JS comments (// ...) only if on their own line (never strip http://)
  newTemplateHtml = newTemplateHtml.replace(/^\s*\/\/[^\n]*\n?/gm, '');

  // 2. Fix optional index access (?.[0]) which is unsupported in Angular 14 templates
  newTemplateHtml = newTemplateHtml.replace(/\?\.\[/g, '[');

  // 3. Fix safe access on MediaGrid mapLinks in template
  if (fileName === 'MediaGrid.ts') {
    newTemplateHtml = newTemplateHtml.replace(/primaryMedia\.mapLinks\[0\]/g, '(primaryMedia.mapLinks ? primaryMedia.mapLinks[0] : null)');
    newTemplateHtml = newTemplateHtml.replace(/m\.mapLinks\[0\]/g, '(m.mapLinks ? m.mapLinks[0] : null)');
  }

  code = code.substring(0, tmplStart) + newTemplateHtml + code.substring(i);

  // 4. In Angular, @ViewChild refs (rootRef, canvasRef, editorRef) are NOT populated in ngOnInit.
  // Add ngAfterViewInit to run lifecycle initializations once DOM elements are bound.
  if (code.includes('@ViewChild') && code.includes('ngOnInit(') && !code.includes('ngAfterViewInit(')) {
    code = code.replace(/ngOnInit\(\)\s*\{/, `ngAfterViewInit() {
    setTimeout(() => {
      this.ngOnInit();
    });
  }

  ngOnInit() {`);
  }

  // 5. In WysiwygRenderer, fix Angular DI runtime error NG0202 on constructor(DomSanitizer)
  if (fileName === 'WysiwygRenderer.ts') {
    if (!code.includes('inject,')) {
      code = code.replace(/import\s*\{\s*Component,/, 'import {\n  inject,\n  Component,');
    }
    code = code.replace(/constructor\s*\(\s*(?:protected|public|private)?\s*sanitizer\s*:\s*DomSanitizer\s*\)\s*\{\s*\}/, 'sanitizer = inject(DomSanitizer);\n  constructor() {}');
  }

  // 6. In AlternatingSlider, expose Array and columns input for template evaluation
  if (fileName === 'AlternatingSlider.ts') {
    if (!code.includes('Array = Array;')) {
      code = code.replace(/export default class AlternatingSlider\s*\{/, `export default class AlternatingSlider {
  Array = Array;
  @Input() set columns(val: any) {
    if (val !== undefined && val !== null) {
      if (!this.config) this.config = {} as any;
      this.config.columns = Number(val);
    }
  }`);
    }
  }

  // 7. In RichTextEditor, fix type assertions and statement blocks in Angular template event handlers
  if (fileName === 'RichTextEditor.ts') {
    // Remove ($event.target as HTMLInputElement).value
    code = code.replace(/\(\$event\.target\s+as\s+HTMLInputElement\)\.value/g, '$event.target.value');
    // Replace multiline if ($event.key === 'Enter') block with component method call
    code = code.replace(/\(keydown\)="\s*if\s*\(\$event\.key\s*===\s*'Enter'\)[\s\S]*?;\s*\}\s*"/g, '(keydown)="onClassInputKeydown($event)"');
    if (!code.includes('onClassInputKeydown(')) {
      code = code.replace(/export default class RichTextEditor\s*\{/, `export default class RichTextEditor {
  onClassInputKeydown($event: any) {
    if ($event.key === 'Enter') {
      $event.preventDefault();
      this.applyClass($event.target.value);
      $event.target.value = '';
    }
  }`);
    }
  }

  fs.writeFileSync(filePath, code, 'utf8');
}

const dir = path.join(__dirname, 'dist', 'angular', 'src', 'components');
if (fs.existsSync(dir)) {
  fs.readdirSync(dir).filter(f => f.endsWith('.ts')).forEach(f => {
    fixAngularFile(path.join(dir, f));
  });
  console.log('Fixed Angular template expressions and components.');
}
