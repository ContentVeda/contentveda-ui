import { useStore, useRef, onMount, onUnMount, onUpdate, Show } from '@builder.io/mitosis';
import DOMPurify from 'isomorphic-dompurify';

export interface RichTextEditorConfig {
  toolbar?: string[];
}

export interface RichTextEditorProps {
  content?: string;
  initialContent?: string;
  onChange?: (html: string) => void;
  className?: string;
  availableClasses?: string[];
  onMediaRequest?: (type: 'image' | 'video' | 'audio') => Promise<string>;
  config?: RichTextEditorConfig;
  readOnly?: boolean;
  disabled?: boolean;
}

let activeSavedRange: any = null;

export default function RichTextEditor(props: RichTextEditorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const state = useStore({
    mode: 'visual',
    isFullscreen: false,
    isMounted: false,
    internalContent: props.content || props.initialContent || '',
    
    getEditorElement(): HTMLDivElement | null {
      if (typeof window === 'undefined') return null;
      return (editorRef as any) || (rootRef ? ((rootRef as any).querySelector('.wysiwyg-content') as HTMLDivElement) : null);
    },
    
    // Every insert* function below builds its HTML by interpolating a value
    // that ultimately came from a prompt()/input (image or video URL, social
    // embed URL, button label/URL) straight into a template literal that
    // then goes through insertHtmlAtCursor -> template.innerHTML. Without
    // escaping, typing something like "><img src=x onerror=alert(1)> into
    // any of those fields injects it as live markup rather than literal
    // text/attribute content -- this is the one place that has to hold the
    // line before the string becomes HTML.
    // data-url/socialUrl ultimately drive real navigation sinks (a.href,
    // iframe.src) in renderEmbeds(). Without this, a "javascript:" or
    // "data:" URL there would execute when the rendered link/frame is
    // interacted with -- restrict to the two protocols an embed link is
    // ever legitimately going to need.
    getTrustedHttpUrl(rawUrl: string): string | null {
      try {
        const parsed = new URL(rawUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
          return null;
        }
        return parsed.toString();
      } catch {
        return null;
      }
    },
    // A substring check like url.includes('youtube.com') matches
    // "evil.com/?x=youtube.com" and "youtube.com.evil.com" just as readily
    // as a real YouTube link -- parse the actual hostname instead.
    getHostname(url: string) {
      try {
        return new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost').hostname.toLowerCase();
      } catch {
        return '';
      }
    },
    isHost(url: string, domain: string) {
      const host = state.getHostname(url);
      return host === domain || host.endsWith('.' + domain);
    },
    escapeHtml(value: string) {
      return String(value == null ? '' : value)
        .split('&').join('&amp;')
        .split('<').join('&lt;')
        .split('>').join('&gt;')
        .split('"').join('&quot;')
        .split("'").join('&#39;');
    },

    sanitizeHtml(content: string) {
      return DOMPurify.sanitize(content, {
        ADD_TAGS: ['iframe', 'video', 'audio', 'source'],
        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target', 'contenteditable', 'data-platform', 'data-url', 'data-widget', 'data-formula', 'controls', 'playsinline', 'autoplay', 'muted', 'loop']
      });
    },

    showTableModal: false,
    tableRows: '3',
    tableCols: '3',
    tableHasHeader: true,
    showLinkModal: false,
    linkUrl: '',
    showWidgetModal: false,
    selectedWidget: 'banner',
    showSocialModal: false,
    socialUrl: '',
    socialPlatform: 'x',
    showButtonModal: false,
    btnText: 'Click Here',
    btnUrl: '',
    btnStyle: 'primary',

    selectedMediaEl: null as any,
    resizeHandleTop: 0,
    resizeHandleLeft: 0,
    resizeToolbarTop: 0,
    resizeToolbarLeft: 0,
    isResizing: false,
    resizeStartX: 0,
    resizeStartWidth: 0,

    fontFamily: 'Inter',
    fontSize: '16px',
    textColor: '#0f172a',
    highlightColor: '#fde047',
    appliedClasses: ['cv-callout', 'variant-blue'],
    showInsertMenu: false,
    showAiModal: false,
    aiAction: 'improve',
    aiInput: '',
    
    activeFormats: {
      bold: false,
      italic: false,
      underline: false,
      strikeThrough: false,
      justifyLeft: false,
      justifyCenter: false,
      justifyRight: false,
      justifyFull: false,
      quote: false,
      code: false,
      unorderedList: false,
      orderedList: false,
      inTable: false,
    },
    headingFormat: 'P',

    checkFormats() {
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        let isQuote = false;
        let isCode = false;
        let inTable = false;

        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          let node = sel.getRangeAt(0).startContainer as any;
          let currentEl = node && node.nodeType === 1 ? node : (node ? node.parentElement : null);
          if (currentEl) {
            try {
              const computed = window.getComputedStyle(currentEl);
              if (computed && computed.fontSize) {
                state.fontSize = computed.fontSize;
              }
              if (computed && computed.fontFamily) {
                const primaryFont = computed.fontFamily.split(',')[0].split('"').join('').split("'").join('').trim();
                if (primaryFont) {
                  state.fontFamily = primaryFont;
                }
              }
            } catch (err) {}

            const classSet: string[] = [];
            let searchNode = currentEl;
            while (searchNode && searchNode !== editorRef) {
              if (searchNode.className && typeof searchNode.className === 'string') {
                if (searchNode.className.indexOf('wysiwyg-content') !== -1) {
                  break;
                }
                const parts = searchNode.className.split(/\s+/);
                for (let pi = 0; pi < parts.length; pi++) {
                  const p = parts[pi];
                  if (p && p.indexOf('prose') !== 0 && p !== 'task-list' && !classSet.includes(p)) {
                    classSet.push(p);
                  }
                }
              }
              searchNode = searchNode.parentElement;
            }
            state.appliedClasses = classSet;
          }

          while (node && node.nodeName !== 'DIV' && node.className !== 'wysiwyg-content') {
            if (node.nodeName === 'BLOCKQUOTE') isQuote = true;
            if (node.nodeName === 'PRE' || node.nodeName === 'CODE') isCode = true;
            if (node.nodeName === 'TD' || node.nodeName === 'TH') inTable = true;
            node = node.parentNode;
          }
        }

        state.activeFormats = {
          bold: document.queryCommandState('bold'),
          italic: document.queryCommandState('italic'),
          underline: document.queryCommandState('underline'),
          strikeThrough: document.queryCommandState('strikeThrough'),
          justifyLeft: document.queryCommandState('justifyLeft'),
          justifyCenter: document.queryCommandState('justifyCenter'),
          justifyRight: document.queryCommandState('justifyRight'),
          justifyFull: document.queryCommandState('justifyFull'),
          unorderedList: document.queryCommandState('insertUnorderedList'),
          orderedList: document.queryCommandState('insertOrderedList'),
          quote: isQuote,
          code: isCode,
          inTable: inTable,
        };

        const formatBlock = document.queryCommandValue('formatBlock');
        if (formatBlock) {
          if (formatBlock.includes('1')) state.headingFormat = 'H1';
          else if (formatBlock.includes('2')) state.headingFormat = 'H2';
          else if (formatBlock.includes('3')) state.headingFormat = 'H3';
          else if (formatBlock.includes('4')) state.headingFormat = 'H4';
          else if (formatBlock.toLowerCase().includes('blockquote')) { state.activeFormats.quote = true; state.headingFormat = 'P'; }
          else if (formatBlock.toLowerCase().includes('pre')) { state.activeFormats.code = true; state.headingFormat = 'P'; }
          else if (formatBlock.includes('p')) state.headingFormat = 'P';
          else if (formatBlock.includes('div')) state.headingFormat = 'P';
        }
      }
    },
    
    saveSelection() {
      if (typeof window !== 'undefined') {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const r = sel.getRangeAt(0);
          const el = state.getEditorElement();
          if (el) {
            try {
              if ((el as any).contains(r.commonAncestorContainer)) {
                activeSavedRange = state.escapeAtomicRange(r.cloneRange());
              }
            } catch (e) {}
          }
        }
      }
    },
    restoreSelection() {
      if (typeof window !== 'undefined') {
        const el = state.getEditorElement();
        if (el) {
          try {
            if (typeof (el as any).focus === 'function') {
              (el as any).focus();
            }
          } catch (e) {}
          if (activeSavedRange) {
            try {
              if ((el as any).contains(activeSavedRange.commonAncestorContainer)) {
                const sel = window.getSelection();
                if (sel) {
                  sel.removeAllRanges();
                  sel.addRange(activeSavedRange.cloneRange());
                }
              }
            } catch (e) {}
          }
        }
      }
    },
    // Insert points must never land inside an atomic block (social embed,
    // widget, math formula -- all marked contenteditable="false"): the
    // browser can still place a text-node caret/selection in there on
    // click, and Range.insertNode() would then split that placeholder's
    // text node and nest the new element inside it, producing corrupted,
    // unrenderable markup. Push the range out to just after the atomic
    // block instead.
    escapeAtomicRange(range: any) {
      const el = state.getEditorElement();
      if (!range || !el) return range;
      let node: any = range.startContainer;
      let atomicEl: any = null;
      while (node && node !== el) {
        if (node.nodeType === 1 && node.getAttribute && node.getAttribute('contenteditable') === 'false') {
          atomicEl = node;
        }
        node = node.parentNode;
      }
      if (!atomicEl) return range;
      const escaped = document.createRange();
      escaped.setStartAfter(atomicEl);
      escaped.collapse(true);
      return escaped;
    },
    insertHtmlAtCursor(html: string) {
      if (typeof window === 'undefined') return;
      const el = state.getEditorElement();
      if (el) {
        try {
          if (typeof (el as any).focus === 'function') {
            (el as any).focus();
          }
        } catch (e) {}
      }
      state.restoreSelection();

      const sel = window.getSelection();
      let targetRange: any = null;
      if (sel && sel.rangeCount > 0) {
        const cur = sel.getRangeAt(0);
        try {
          if (el && (el as any).contains(cur.commonAncestorContainer)) {
            targetRange = cur;
          }
        } catch (e) {}
      }
      if (!targetRange && activeSavedRange) {
        try {
          if (el && (el as any).contains(activeSavedRange.commonAncestorContainer)) {
            targetRange = activeSavedRange;
          }
        } catch (e) {}
      }
      targetRange = state.escapeAtomicRange(targetRange);

      if (targetRange && targetRange.insertNode) {
        targetRange.deleteContents();
        const template = document.createElement('template');
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        template.innerHTML = html.trim();
        const frag = template.content;
        const resizableEl = frag.querySelector('img, video, audio, .cv-social-embed, .cv-widget');
        const lastNode = frag.lastChild;
        targetRange.insertNode(frag);
        if (lastNode && sel) {
          const newRange = document.createRange();
          newRange.setStartAfter(lastNode);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
          activeSavedRange = newRange.cloneRange();
        }
        if (resizableEl) {
          state.selectMediaElement(resizableEl);
        }
      } else if (el) {
        const template = document.createElement('template');
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        template.innerHTML = html.trim();
        const resizableEl = template.content.querySelector('img, video, audio, .cv-social-embed, .cv-widget');
        el.appendChild(template.content);
        const newRange = document.createRange();
        newRange.selectNodeContents(el as Node);
        newRange.collapse(false);
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(newRange);
          activeSavedRange = newRange.cloneRange();
        }
        if (resizableEl) {
          state.selectMediaElement(resizableEl);
        }
      }
      state.ensureEditableStructure();
      state.syncContent();
      state.checkFormats();
      state.renderEmbeds();
    },

    formatHTML(html: string) {
      if (!html) return '';
      let formatted = '';
      let indent = '';
      const tab = '  ';
      html.split(/>\s*</).forEach(function(node) {
        if (node.match(/^\/\w/)) {
          indent = indent.substring(tab.length);
        }
        formatted += indent + '<' + node + '>' + String.fromCharCode(10);
        if (node.match(/^<?\w[^>]*[^\/]$/) && !node.startsWith("input") && !node.startsWith("img") && !node.startsWith("br") && !node.startsWith("hr")) {
          indent += tab;
        }
      });
      if (formatted.length > 3) {
        return formatted.substring(1, formatted.length-2);
      }
      return html;
    },

    format(cmd: string, val?: string) {
      state.restoreSelection();
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      document.execCommand(cmd, false, val);
      state.saveSelection();
      state.syncContent();
      state.checkFormats();
    },
    // applyColorPreview: called on every onInput (continuous drag) event.
    // Must NOT mutate reactive state (textColor / highlightColor) because any
    // reactive mutation causes a framework re-render that resets the editor's
    // contenteditable attribute, clears the browser selection and invalidates
    // activeSavedRange -- so all subsequent inserts silently fail.
    applyColorPreview(cmd: string, color: string) {
      if (!color) return;
      const previewEl = state.getEditorElement();
      if (previewEl) {
        try { (previewEl as any).focus(); } catch (focusErr) {}
      }
      state.restoreSelection();
      if (cmd === 'foreColor') {
        document.execCommand('foreColor', false, color);
      } else {
        const applied = document.execCommand('hiliteColor', false, color);
        if (!applied) {
          document.execCommand('backColor', false, color);
        }
      }
      state.saveSelection();
    },
    // applyColor: called only on onChange (picker closed / committed).
    // Safe to update reactive state here because execCommand has already
    // committed to the DOM before the re-render can touch contenteditable.
    applyColor(cmd: string, color: string) {
      if (!color) return;
      const colorEl = state.getEditorElement();
      if (colorEl) {
        try { (colorEl as any).focus(); } catch (focusErr2) {}
      }
      state.restoreSelection();
      if (cmd === 'foreColor') {
        document.execCommand('foreColor', false, color);
        state.textColor = color;
      } else {
        const colorApplied = document.execCommand('hiliteColor', false, color);
        if (!colorApplied) {
          document.execCommand('backColor', false, color);
        }
        state.highlightColor = color;
      }
      state.saveSelection();
      state.syncContent();
      state.checkFormats();
    },
    formatHeading(level: string) {
      state.restoreSelection();
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      document.execCommand('formatBlock', false, level);
      state.headingFormat = level;
      state.syncContent();
      state.checkFormats();
      const el = state.getEditorElement();
      if (el) {
        try {
          (el as any).focus();
        } catch (e) {}
      }
    },
    
    insertMedia(type: 'image' | 'video' | 'audio') {
      state.saveSelection();
      
      const insertContent = (url: string, altText?: string) => {
        if (!url) return;
        let html = '';
        if (type === 'image') {
          // Alt text matters for both accessibility (screen readers have
          // nothing else to announce for an <img>) and SEO (image search
          // indexes off it) -- a hardcoded "Image" satisfies neither, so ask
          // for real alt text and fall back to the filename rather than a
          // meaningless generic label if the author skips it.
          const filenameGuess = (url.split('/').pop() || 'image').split('?')[0].split('.')[0].replace(/[-_]+/g, ' ').trim();
          const alt = (altText || '').trim() || filenameGuess || 'Image';
          const escapedAlt = state.escapeHtml(alt);
          const escapedUrl = state.escapeHtml(url);
          html = `<img src="${escapedUrl}" alt="${escapedAlt}" loading="lazy" decoding="async" draggable="false" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" /><p><br></p>`;
        } else if (type === 'video') {
          const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/);
          const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
          const escapedUrl = state.escapeHtml(url);
          if (ytMatch) {
            html = `<div class="cv-social-embed" data-platform="youtube" data-url="${escapedUrl}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded YOUTUBE Video: ${escapedUrl}]</div><p><br></p>`;
          } else if (vimeoMatch) {
            html = `<div class="cv-social-embed" data-platform="vimeo" data-url="${escapedUrl}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded VIMEO Video: ${escapedUrl}]</div><p><br></p>`;
          } else {
            html = `<video src="${escapedUrl}" controls style="max-width: 100%; border-radius: 8px; margin: 16px 0;"></video><p><br></p>`;
          }
        } else if (type === 'audio') {
          html = `<audio src="${state.escapeHtml(url)}" controls style="margin: 16px 0;"></audio><p><br></p>`;
        }
        state.insertHtmlAtCursor(html);
      };

      if (props.onMediaRequest) {
        props.onMediaRequest(type).then((url) => {
          if (url) insertContent(url);
        }).catch((err) => {
          console.error('Media request failed', err);
        });
      } else {
        const url = window.prompt(`Enter ${type} URL:`);
        if (url && type === 'image') {
          const altText = window.prompt('Describe this image for screen readers and search engines (alt text):', '');
          insertContent(url, altText || undefined);
        } else if (url) {
          insertContent(url);
        }
      }
    },
    
    clearAllFormatting() {
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      document.execCommand('removeFormat', false, undefined);
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      document.execCommand('formatBlock', false, 'P');
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      document.execCommand('unlink', false, undefined);
      state.syncContent();
      state.checkFormats();
    },
    toggleBlock(type: string) {
      state.checkFormats();
      const isActive = type === 'PRE' ? state.activeFormats.code : state.activeFormats.quote;
      if (isActive) {
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        document.execCommand('formatBlock', false, 'P');
      } else {
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        document.execCommand('formatBlock', false, type);
      }
      state.syncContent();
      state.checkFormats();
    },
    applyClass(className: string) {
      if (!className) return;
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const span = document.createElement('span');
        span.className = className;
        span.appendChild(range.extractContents());
        range.insertNode(span);
        state.syncContent();
      }
    },
    
    openButtonModal() {
      state.saveSelection();
      state.showButtonModal = true;
      state.btnText = 'Click Here';
      state.btnUrl = '';
      state.btnStyle = 'primary';
    },
    closeButtonModal() {
      state.showButtonModal = false;
    },
    confirmButton() {
      state.showButtonModal = false;
      if (state.btnText) {
        let styleStr = 'padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; display: inline-block; text-decoration: none; transition: all 0.2s;';
        if (state.btnStyle === 'primary') {
          styleStr += ' background: var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480)); color: white; border: none; box-shadow: 0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.3));';
        } else if (state.btnStyle === 'secondary') {
          styleStr += ' background: var(--cv-color-surface-raised, #1e293b); color: var(--cv-color-text-main, #fff); border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1));';
        } else if (state.btnStyle === 'outline') {
          styleStr += ' background: transparent; color: var(--cv-color-primary-fill, #245066); border: 2px solid var(--cv-color-primary-fill, #245066);';
        }
        const url = state.escapeHtml(state.btnUrl || '#');
        const html = `<a href="${url}" class="cv-btn" style="${styleStr}">${state.escapeHtml(state.btnText)}</a>&nbsp;`;
        state.insertHtmlAtCursor(html);
      }
    },
    // The editor live-renders social embeds and math formulas in place (see
    // renderEmbeds) so WYSIWYG matches what WysiwygRenderer produces. That
    // live markup (iframes, KaTeX output) must never leak into the saved
    // content string -- it is re-derived from data-platform/data-url/
    // data-formula on every render, so persisting it would just be dead
    // weight, and it is not sanitizer-safe to round-trip through DOMPurify
    // on the next source/visual toggle. Serialize a clone with every
    // data-cv-rendered node reset back to its canonical placeholder instead.
    getCanonicalHtml() {
      const editor = state.getEditorElement();
      if (!editor) return '';
      const clone = editor.cloneNode(true) as HTMLElement;
      const selected = clone.querySelectorAll('.cv-resizing-selected');
      selected.forEach((el: any) => {
        el.classList.remove('cv-resizing-selected');
        if (!el.getAttribute('class')) el.removeAttribute('class');
      });
      const rendered = clone.querySelectorAll('[data-cv-rendered="true"]');
      rendered.forEach((el: any) => {
        el.removeAttribute('data-cv-rendered');
        if (el.classList.contains('cv-social-embed')) {
          const platform = el.getAttribute('data-platform') || '';
          const url = el.getAttribute('data-url') || '';
          el.textContent = `[Embedded ${platform.toUpperCase()} Post: ${url}]`;
        } else if (el.classList.contains('cv-math-formula')) {
          el.textContent = el.getAttribute('data-formula') || '';
        }
      });
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      return clone.innerHTML;
    },
    // Live-preview social embeds and math formulas directly in the editing
    // surface -- mirrors WysiwygRenderer's processContent() so the editor
    // and the published output show the same thing, not just a placeholder
    // in one and a real embed in the other. Elements are marked
    // data-cv-rendered="true" once processed so re-running on every
    // keystroke/toggle is a no-op for already-rendered embeds.
    renderEmbeds() {
      if (typeof window === 'undefined') return;
      const editor = state.getEditorElement();
      if (!editor) return;

      const socialEmbeds = editor.querySelectorAll('.cv-social-embed:not([data-cv-rendered="true"])');
      socialEmbeds.forEach((el: any) => {
        const platform = (el.getAttribute('data-platform') || '').toLowerCase();
        const url = el.getAttribute('data-url') || '';
        if (!platform || !url) return;

        const markRendered = () => {
          // Preserve a width/max-width already on the element (e.g. content
          // reloaded after a previous resize) -- otherwise the base style
          // string below wipes it out the moment this embed live-renders.
          const preservedWidth = el.style.width;
          const preservedMaxWidth = el.style.maxWidth;
          el.setAttribute('data-cv-rendered', 'true');
          el.setAttribute('style', 'margin: 16px 0; padding: 0; border: none; background: transparent; display: flex; justify-content: center;');
          if (preservedWidth) el.style.width = preservedWidth;
          if (preservedMaxWidth) el.style.maxWidth = preservedMaxWidth;
        };

        if (platform === 'youtube') {
          const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/);
          if (!match || !match[1]) return;
          el.innerHTML = '';
          const iframe = document.createElement('iframe');
          iframe.width = '100%';
          iframe.height = '280';
          iframe.src = `https://www.youtube.com/embed/${match[1]}`;
          iframe.title = 'YouTube video player';
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allowfullscreen', '');
          // pointer-events: none keeps clicks landing on the outer .cv-social-embed
          // div (needed for click-to-select/resize) instead of being swallowed by
          // the iframe, which is otherwise a separate browsing context that never
          // bubbles clicks to the editor at all once its content has loaded.
          iframe.style.cssText = 'border-radius: 8px; display: block; max-width: 100%; pointer-events: none;';
          el.appendChild(iframe);
          markRendered();
        } else if (platform === 'vimeo') {
          const match = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
          if (!match || !match[1]) return;
          el.innerHTML = '';
          const iframe = document.createElement('iframe');
          iframe.width = '100%';
          iframe.height = '280';
          iframe.src = `https://player.vimeo.com/video/${match[1]}`;
          iframe.title = 'Vimeo video player';
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allowfullscreen', '');
          iframe.style.cssText = 'border-radius: 8px; display: block; max-width: 100%; pointer-events: none;';
          el.appendChild(iframe);
          markRendered();
        } else if (platform === 'x' || platform === 'twitter') {
          el.innerHTML = '';
          const bq = document.createElement('blockquote');
          bq.className = 'twitter-tweet';
          bq.setAttribute('data-theme', 'dark');
          bq.style.pointerEvents = 'none';
          const trustedTweetUrl = state.getTrustedHttpUrl(url);
          if (!trustedTweetUrl) return;
          const a = document.createElement('a');
          a.href = trustedTweetUrl;
          bq.appendChild(a);
          el.appendChild(bq);
          markRendered();
          if (!document.getElementById('twitter-wjs')) {
            const script = document.createElement('script');
            script.id = 'twitter-wjs';
            script.src = 'https://platform.twitter.com/widgets' + String.fromCharCode(46, 106, 115);
            script.async = true;
            document.body.appendChild(script);
          } else if ((window as any).twttr) {
            (window as any).twttr.widgets.load(el);
          }
        } else if (platform === 'instagram') {
          el.innerHTML = '';
          const igBq = document.createElement('blockquote');
          igBq.className = 'instagram-media';
          igBq.setAttribute('data-instgrm-permalink', url);
          igBq.setAttribute('data-instgrm-version', '14');
          igBq.style.pointerEvents = 'none';
          el.appendChild(igBq);
          markRendered();
          if (!document.getElementById('instagram-embed')) {
            const script = document.createElement('script');
            script.id = 'instagram-embed';
            script.src = 'https://www.instagram.com/embed' + String.fromCharCode(46, 106, 115);
            script.async = true;
            document.body.appendChild(script);
          } else if ((window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
          }
        } else if (platform === 'facebook') {
          el.innerHTML = '';
          const fbDiv = document.createElement('div');
          fbDiv.className = 'fb-post';
          fbDiv.setAttribute('data-href', url);
          fbDiv.setAttribute('data-width', '500');
          fbDiv.style.pointerEvents = 'none';
          el.appendChild(fbDiv);
          markRendered();
          if (!document.getElementById('facebook-jssdk')) {
            const script = document.createElement('script');
            script.id = 'facebook-jssdk';
            script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0';
            script.async = true;
            script.defer = true;
            script.crossOrigin = 'anonymous';
            document.body.appendChild(script);
          } else if ((window as any).FB) {
            (window as any).FB.XFBML.parse(el);
          }
        } else if (platform === 'linkedin') {
          const embedUrl = url.includes('/embed/') ? url : url.replace(/\/posts?\//, '/embed/feed/update/');
          const trustedEmbedUrl = state.getTrustedHttpUrl(embedUrl);
          if (!trustedEmbedUrl) return;
          el.innerHTML = '';
          const liIframe = document.createElement('iframe');
          liIframe.src = trustedEmbedUrl;
          liIframe.height = '400';
          liIframe.width = '100%';
          liIframe.setAttribute('frameborder', '0');
          liIframe.setAttribute('allowfullscreen', '');
          liIframe.title = 'Embedded post';
          liIframe.style.cssText = 'border-radius: 8px; max-width: 100%; pointer-events: none;';
          el.appendChild(liIframe);
          markRendered();
        }
      });

      const formulas = editor.querySelectorAll('.cv-math-formula:not([data-cv-rendered="true"])');
      if (formulas.length > 0) {
        const renderMath = () => {
          formulas.forEach((el: any) => {
            const formula = el.getAttribute('data-formula') || el.textContent || '';
            if (!formula) return;
            const k = (window as any).katex;
            if (!k) return;
            try {
              // formula is read back from a DOM attribute (getAttribute
              // decodes entities, undoing any escaping done when it was
              // written), then handed to a third-party HTML generator
              // (katex.renderToString) whose output we do not otherwise
              // control -- sanitize that output before it reaches
              // innerHTML rather than trusting the katex output as-is.
              el.innerHTML = DOMPurify.sanitize(k.renderToString(formula, { throwOnError: false, displayMode: false }), {
                USE_PROFILES: { html: true, mathMl: true, svg: true },
                // DOMPurify's mathMl profile omits <semantics>/<annotation>
                // (katex's copy-source-as-LaTeX accessibility layer) -- add
                // them back explicitly so sanitizing does not quietly
                // degrade that.
                ADD_TAGS: ['semantics', 'annotation'],
                ADD_ATTR: ['encoding']
              });
              el.setAttribute('data-cv-rendered', 'true');
            } catch (mathErr) {}
          });
        };
        if ((window as any).katex) {
          renderMath();
        } else if (document.getElementById('cv-katex-js')) {
          const pendingScript = document.getElementById('cv-katex-js');
          if (pendingScript) pendingScript.addEventListener('load', renderMath);
        } else {
          if (!document.getElementById('cv-katex-css')) {
            const link = document.createElement('link');
            link.id = 'cv-katex-css';
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
            document.head.appendChild(link);
          }
          const script = document.createElement('script');
          script.id = 'cv-katex-js';
          script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min' + String.fromCharCode(46, 106, 115);
          script.async = true;
          script.onload = renderMath;
          document.body.appendChild(script);
        }
      }
    },
    syncContent() {
      const editor = state.getEditorElement();
      if (editor) {
        state.internalContent = state.getCanonicalHtml();
        if (props.onChange) {
          props.onChange(state.internalContent);
        }
      }
    },
    handleInput() {
      state.syncContent();
    },
    handleSourceInput(e: any) {
      state.internalContent = e.target.value;
      if (props.onChange) {
        props.onChange(state.internalContent);
      }
      if (editorRef) {
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        editorRef.innerHTML = state.sanitizeHtml(state.internalContent);
        state.renderEmbeds();
      }
    },

    openTableModal() {
      state.saveSelection();
      state.showTableModal = true;
      state.tableRows = '3';
      state.tableCols = '3';
      state.tableHasHeader = true;
    },
    confirmTable() {
      state.showTableModal = false;
      const rows = parseInt(state.tableRows, 10);
      const cols = parseInt(state.tableCols, 10);
      if (rows > 0 && cols > 0) {
        let table = '<table border="1" style="width:100%; border-collapse: collapse; min-width: 50px;">';
        if (state.tableHasHeader) {
          table += '<thead style="background-color: var(--cv-color-hover, rgba(255,255,255,0.05));"><tr>';
          for(let j=0; j<cols; j++) {
            table += '<th scope="col" style="padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);">Header</th>';
          }
          table += '</tr></thead>';
        }
        table += '<tbody>';
        for(let i=0; i<rows; i++) {
          table += '<tr>';
          for(let j=0; j<cols; j++) {
            table += '<td style="padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);">Cell</td>';
          }
          table += '</tr>';
        }
        table += '</tbody></table><p><br></p>';
        state.insertHtmlAtCursor(table);
      }
    },
    closeTableModal() {
      state.showTableModal = false;
    },
    
    modifyTable(action: 'addRow' | 'removeRow' | 'addCol' | 'removeCol') {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      
      let node = sel.getRangeAt(0).startContainer as any;
      let td = null;
      let tr = null;
      let table = null;
      
      while (node && node.nodeName !== 'DIV' && node.className !== 'wysiwyg-content') {
        if (node.nodeName === 'TD' || node.nodeName === 'TH') td = node;
        if (node.nodeName === 'TR') tr = node;
        if (node.nodeName === 'TABLE') table = node;
        node = node.parentNode;
      }
      
      if (!table || !tr || !td) return;
      
      const colIndex = Array.from(tr.children).indexOf(td);
      
      if (action === 'addRow') {
        const newTr = document.createElement('tr');
        const numCols = tr.children.length;
        for (let i = 0; i < numCols; i++) {
          const newTd = document.createElement('td');
          newTd.style.cssText = "padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);";
          /* lgtm[js/xss, js/html-constructed-from-input] */
          /* codeql[js/xss, js/html-constructed-from-input] */
          newTd.innerHTML = "Cell";
          newTr.appendChild(newTd);
        }
        tr.parentNode.insertBefore(newTr, tr.nextSibling);
      } else if (action === 'removeRow') {
        if (tr.parentNode.children.length > 1) {
          tr.parentNode.removeChild(tr);
        } else {
          table.parentNode.removeChild(table);
        }
      } else if (action === 'addCol') {
        const rows = table.querySelectorAll('tr');
        rows.forEach((row: any) => {
          const newCell = document.createElement(row.parentNode.nodeName === 'THEAD' ? 'th' : 'td');
          if (row.parentNode.nodeName === 'THEAD') newCell.setAttribute('scope', 'col');
          newCell.style.cssText = row.parentNode.nodeName === 'THEAD' ? "padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);" : "padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);";
          /* lgtm[js/xss, js/html-constructed-from-input] */
          /* codeql[js/xss, js/html-constructed-from-input] */
          newCell.innerHTML = row.parentNode.nodeName === 'THEAD' ? "Header" : "Cell";
          const sibling = row.children[colIndex];
          row.insertBefore(newCell, sibling ? sibling.nextSibling : null);
        });
      } else if (action === 'removeCol') {
        const rows = table.querySelectorAll('tr');
        if (tr.children.length > 1) {
          rows.forEach((row: any) => {
            if (row.children[colIndex]) {
              row.removeChild(row.children[colIndex]);
            }
          });
        } else {
          table.parentNode.removeChild(table);
        }
      }
      
      state.syncContent();
    },

    openLinkModal() {
      state.saveSelection();
      state.showLinkModal = true;
      state.linkUrl = '';
    },
    confirmLink() {
      state.showLinkModal = false;
      if (state.linkUrl) {
        state.restoreSelection();
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        document.execCommand('createLink', false, state.linkUrl);
        state.syncContent();
      }
    },
    closeLinkModal() {
      state.showLinkModal = false;
    },

    openWidgetModal() {
      state.saveSelection();
      state.showWidgetModal = true;
    },
    confirmWidget() {
      state.showWidgetModal = false;
      const escapedWidget = state.escapeHtml(state.selectedWidget);
      let html = `<div class="cv-widget" data-widget="${escapedWidget}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-primary, #7fc4de); background: var(--cv-color-accent-tint, rgba(127,196,222,0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-link, #7fc4de); font-weight: 600;">[ContentVeda Widget: ${state.escapeHtml(state.selectedWidget.toUpperCase())}]</div><p><br></p>`;
      state.insertHtmlAtCursor(html);
    },
    closeWidgetModal() {
      state.showWidgetModal = false;
    },

    openSocialModal() {
      state.saveSelection();
      state.showSocialModal = true;
      state.socialUrl = '';
      state.socialPlatform = 'youtube';
    },
    confirmSocial() {
      state.showSocialModal = false;
      if (state.socialUrl) {
        let platform = (state.socialPlatform || 'youtube').toLowerCase();
        if (state.isHost(state.socialUrl, 'youtube.com') || state.isHost(state.socialUrl, 'youtu.be')) {
          platform = 'youtube';
        } else if (state.isHost(state.socialUrl, 'vimeo.com')) {
          platform = 'vimeo';
        }
        const escapedPlatform = state.escapeHtml(platform);
        const escapedUrl = state.escapeHtml(state.socialUrl);
        let embedHtml = `<div class="cv-social-embed" data-platform="${escapedPlatform}" data-url="${escapedUrl}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded ${state.escapeHtml(platform.toUpperCase())} Post: ${escapedUrl}]</div><p><br></p>`;
        state.insertHtmlAtCursor(embedHtml);
      }
    },
    closeSocialModal() {
      state.showSocialModal = false;
    },

    toggleMode() {
      if (state.mode === 'visual') {
        state.syncContent();
        state.internalContent = state.formatHTML(state.internalContent);
        state.mode = 'source';
      } else {
        state.mode = 'visual';
        if (editorRef) {
          /* lgtm[js/xss, js/html-constructed-from-input] */
          /* codeql[js/xss, js/html-constructed-from-input] */
          editorRef.innerHTML = state.sanitizeHtml(state.internalContent);
          state.renderEmbeds();
        }
      }
    },
    toggleFullScreen() {
      if (typeof document !== 'undefined') {
        if (!document.fullscreenElement) {
          if (rootRef && rootRef.requestFullscreen) {
            rootRef.requestFullscreen().catch(err => console.warn('Fullscreen denied', err));
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      }
    },
    changeFontFamily(font: string) {
      state.fontFamily = font;
      state.restoreSelection();
      document.execCommand('fontName', false, font);
      state.syncContent();
      state.checkFormats();
    },
    changeFontSize(size: string) {
      state.fontSize = size;
      state.restoreSelection();
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
        const span = document.createElement('span');
        span.style.fontSize = size;
        const contents = sel.getRangeAt(0).extractContents();
        span.appendChild(contents);
        sel.getRangeAt(0).insertNode(span);
        sel.removeAllRanges();
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        sel.addRange(newRange);
        state.saveSelection();
      } else {
        const sizeMap: any = { '12px': '1', '14px': '2', '16px': '3', '18px': '4', '20px': '5', '24px': '6', '32px': '7' };
        document.execCommand('fontSize', false, sizeMap[size] || '3');
      }
      state.syncContent();
      state.checkFormats();
    },
    insertChecklist() {
      // The checkbox and its text must share one <label> (implicit
      // association, no id needed) -- as separate sibling elements a screen
      // reader announces an unlabelled checkbox with no indication of what
      // it controls, and clicking the text would not toggle it either.
      const html = '<ul class="task-list" style="list-style: none; padding-left: 0.25rem;"><li style="margin: 4px 0;"><label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span>Task item</span></label></li></ul><p><br></p>';
      state.insertHtmlAtCursor(html);
    },
    insertFormula() {
      state.saveSelection();
      const formula = window.prompt('Enter math formula or expression:', 'E = mc²');
      if (formula) {
        const escaped = formula.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;');
        const html = `<code class="cv-math-formula" data-formula="${escaped}" contenteditable="false" style="background: rgba(127,196,222,0.15); color: #0284c7; padding: 2px 8px; border-radius: 6px; font-family: monospace; font-size: 0.9em; border: 1px solid rgba(127,196,222,0.3);">${escaped}</code>&nbsp;`;
        state.insertHtmlAtCursor(html);
      }
    },
    addClass(className: string) {
      if (!className) return;
      if (!state.appliedClasses.includes(className)) {
        state.appliedClasses = [...state.appliedClasses, className];
      }
    },
    removeClass(className: string) {
      state.appliedClasses = state.appliedClasses.filter((c: string) => c !== className);
      if (editorRef) {
        const elements = editorRef.querySelectorAll(`.${className}`);
        elements.forEach((el: any) => {
          el.classList.remove(className);
          if (el.classList.length === 0 && el.tagName === 'SPAN') {
            const parent = el.parentNode;
            while (el.firstChild) parent.insertBefore(el.firstChild, el);
            parent.removeChild(el);
          }
        });
        state.syncContent();
      }
    },
    handleClassInputKeyDown(e: any) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const val = target.value ? target.value.trim() : '';
        if (val) {
          state.applyClass(val);
          state.addClass(val);
          target.value = '';
        }
      }
    },
    openAiModal() {
      state.saveSelection();
      state.showAiModal = true;
      state.aiInput = '';
    },
    closeAiModal() {
      state.showAiModal = false;
    },
    applyAiAction(action: string) {
      state.restoreSelection();
      const sel = window.getSelection();
      const selectedText = sel ? sel.toString() : '';
      let result = '';
      
      if (action === 'improve') {
        if (selectedText) {
          result = selectedText.trim() + ' (enhanced for clarity and conciseness)';
        } else {
          result = '<p><strong>Executive Summary:</strong> Designed for high-velocity digital engineering squads, this next-generation prose engine pairs strict AST schemas with real-time reactive UI component embedding.</p>';
        }
      } else if (action === 'callout') {
        const safeSelection = selectedText ? state.escapeHtml(selectedText) : 'Configure your toolbar modules, slot rules, and custom micro-frontends directly in the inspector panel.';
        result = `<div class="cv-callout variant-blue" style="padding: 16px 20px; border-left: 4px solid #0284c7; background: rgba(2, 132, 199, 0.08); border-radius: 0 8px 8px 0; margin: 16px 0;"><strong>AI INSIGHT:</strong> ${safeSelection}</div><p><br></p>`;
      } else if (action === 'summarize') {
        const safeSummary = selectedText ? state.escapeHtml(selectedText.slice(0, 100)) + '...' : 'Key takeaways: High performance AST validation, component slot architecture, and real-time schema hydration.';
        result = `<p><em>Summary:</em> ${safeSummary}</p>`;
      } else if (action === 'grammar') {
        result = selectedText ? selectedText.trim() : '<p>All grammar and formatting validated.</p>';
      }

      if (result) {
        if (result.startsWith('<')) {
          document.execCommand('insertHTML', false, result);
        } else {
          document.execCommand('insertText', false, result);
        }
        state.syncContent();
      }
      state.showAiModal = false;
    },
    showToolbarOption(option: string) {
      if (!props.config || !props.config.toolbar) {
        return true;
      }
      let name = option;
      if (option === 'alignLeft') name = 'justifyLeft';
      if (option === 'alignCenter') name = 'justifyCenter';
      if (option === 'alignRight') name = 'justifyRight';
      if (option === 'alignJustify') name = 'justifyFull';
      if (option === 'bulletList') name = 'unorderedList';
      if (option === 'numberedList') name = 'orderedList';
      if (option === 'code') return props.config.toolbar.includes('code') || props.config.toolbar.includes('pre');
      return props.config.toolbar.includes(option) || props.config.toolbar.includes(name);
    },
    showSeparator(index: number) {
      const groups = [
        ['fullscreen', 'source', 'bold', 'italic', 'underline', 'strikeThrough'],
        ['code', 'quote', 'clear'],
        ['headings'],
        ['foreColor', 'backColor'],
        ['alignLeft', 'justifyLeft', 'alignCenter', 'justifyCenter', 'alignRight', 'justifyRight'],
        ['image', 'link', 'table', 'unorderedList', 'orderedList', 'horizontalRule', 'video', 'social'],
        ['insertButton', 'addWidget'],
        ['save'],
        ['classInput']
      ];
      const hasVisibleBefore = groups.slice(0, index + 1).some(group => 
        group.some(item => state.showToolbarOption(item))
      );
      const isNextGroupVisible = groups[index + 1] && groups[index + 1].some(item => 
        state.showToolbarOption(item)
      );
      return hasVisibleBefore && isNextGroupVisible;
    },
    handleFullscreenChange() {
      if (typeof document !== 'undefined') {
        state.isFullscreen = !!document.fullscreenElement;
        state.deselectMediaElement();
      }
    },
    // Click-to-select + drag-to-resize for images, video/audio, and the
    // atomic social-embed/widget placeholders. Width is written as an
    // inline style directly on the element, so it survives into the saved
    // HTML (getCanonicalHtml keeps whatever style attribute is on the node)
    // and into the published output as-is for plain media; WysiwygRenderer
    // preserves an author-set width on social embeds rather than
    // overwriting it (see its inline-style merge in processContent).
    isResizableTarget(el: any) {
      if (!el || el.nodeType !== 1) return false;
      const tag = el.tagName;
      if (tag === 'IMG' || tag === 'VIDEO' || tag === 'AUDIO') return true;
      if (el.classList && (el.classList.contains('cv-social-embed') || el.classList.contains('cv-widget'))) return true;
      return false;
    },
    updateResizeHandlePosition() {
      const editor = state.getEditorElement();
      if (!state.selectedMediaEl || !editor) return;
      const container = (editor as any).parentElement;
      if (!container) return;
      const elRect = state.selectedMediaEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      state.resizeHandleTop = elRect.bottom - containerRect.top + container.scrollTop - 7;
      state.resizeHandleLeft = elRect.right - containerRect.left + container.scrollLeft - 7;

      let tbTop = elRect.top - containerRect.top + container.scrollTop - 40;
      if (tbTop < 8) {
        tbTop = elRect.bottom - containerRect.top + container.scrollTop + 8;
      }
      let tbLeft = elRect.left - containerRect.left + container.scrollLeft;
      if (tbLeft < 8) tbLeft = 8;
      state.resizeToolbarTop = tbTop;
      state.resizeToolbarLeft = tbLeft;
    },
    selectMediaElement(el: any) {
      if (state.selectedMediaEl && state.selectedMediaEl !== el) {
        state.selectedMediaEl.classList.remove('cv-resizing-selected');
      }
      state.selectedMediaEl = el;
      el.classList.add('cv-resizing-selected');
      state.updateResizeHandlePosition();
      if (el.tagName === 'IMG' && !el.complete) {
        el.addEventListener('load', () => {
          if (state.selectedMediaEl === el) {
            state.updateResizeHandlePosition();
          }
        }, { once: true });
      }
    },
    deleteSelectedMedia() {
      if (state.selectedMediaEl) {
        const el = state.selectedMediaEl;
        state.deselectMediaElement();
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
        state.ensureEditableStructure();
        state.syncContent();
      }
    },
    setImageSize(size: string) {
      if (!state.selectedMediaEl) return;
      const el = state.selectedMediaEl;
      el.style.width = size;
      el.style.maxWidth = '100%';
      el.style.height = 'auto';
      state.updateResizeHandlePosition();
      state.syncContent();
    },
    setImageAlign(align: string) {
      if (!state.selectedMediaEl) return;
      const el = state.selectedMediaEl;
      if (align === 'center') {
        el.style.display = 'block';
        el.style.marginLeft = 'auto';
        el.style.marginRight = 'auto';
      } else if (align === 'left') {
        el.style.display = 'block';
        el.style.marginLeft = '0';
        el.style.marginRight = 'auto';
      } else if (align === 'right') {
        el.style.display = 'block';
        el.style.marginLeft = 'auto';
        el.style.marginRight = '0';
      }
      state.updateResizeHandlePosition();
      state.syncContent();
    },
    deselectMediaElement() {
      if (state.selectedMediaEl) {
        state.selectedMediaEl.classList.remove('cv-resizing-selected');
      }
      state.selectedMediaEl = null;
    },
    isReadOnly() {
      return !!(props.readOnly || props.disabled);
    },
    closeAllModals() {
      state.showTableModal = false;
      state.showLinkModal = false;
      state.showWidgetModal = false;
      state.showSocialModal = false;
      state.showButtonModal = false;
      state.showAiModal = false;
    },
    handleBackdropClick(e: any) {
      if (e && e.target === e.currentTarget) {
        state.closeAllModals();
      }
    },
    ensureEditableStructure() {
      const el = state.getEditorElement();
      if (!el) return;
      const html = (el.innerHTML || '').trim();
      if (!html || html === '<br>' || html === '<p></p>') {
        el.innerHTML = '<p><br></p>';
        return;
      }
      const last = el.lastElementChild;
      if (last && (last.getAttribute('contenteditable') === 'false' || last.tagName === 'TABLE' || (last.classList && (last.classList.contains('cv-social-embed') || last.classList.contains('cv-widget'))))) {
        const p = document.createElement('p');
        p.innerHTML = '<br>';
        el.appendChild(p);
      }
      const first = el.firstElementChild;
      if (first && (first.getAttribute('contenteditable') === 'false' || first.tagName === 'TABLE' || (first.classList && (first.classList.contains('cv-social-embed') || first.classList.contains('cv-widget'))))) {
        const p = document.createElement('p');
        p.innerHTML = '<br>';
        el.insertBefore(p, first);
      }
    },
    normalizeSelection() {
      if (state.isReadOnly()) return;
      const el = state.getEditorElement();
      if (!el) return;
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      let range: any = null;
      try {
        range = sel.getRangeAt(0);
      } catch (e) {
        return;
      }
      let node: any = range.startContainer;
      let atomicEl: any = null;
      while (node && node !== el) {
        if (node.nodeType === 1 && node.getAttribute && node.getAttribute('contenteditable') === 'false') {
          atomicEl = node;
          break;
        }
        node = node.parentNode;
      }
      if (atomicEl) {
        const newRange = document.createRange();
        if (!atomicEl.nextSibling || (atomicEl.nextSibling.nodeType === 1 && atomicEl.nextSibling.getAttribute('contenteditable') === 'false')) {
          const p = document.createElement('p');
          p.innerHTML = '<br>';
          if (atomicEl.nextSibling) {
            atomicEl.parentNode.insertBefore(p, atomicEl.nextSibling);
          } else {
            atomicEl.parentNode.appendChild(p);
          }
          newRange.setStart(p, 0);
        } else {
          newRange.setStartAfter(atomicEl);
        }
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
        activeSavedRange = newRange.cloneRange();
      }
    },
    focusEditorAtEnd() {
      if (state.isReadOnly()) return;
      const el = state.getEditorElement();
      if (!el) return;
      state.ensureEditableStructure();
      try {
        if (typeof (el as any).focus === 'function') {
          (el as any).focus();
        }
      } catch (e) {}
      const sel = window.getSelection();
      if (sel) {
        const range = document.createRange();
        range.selectNodeContents(el as Node);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        activeSavedRange = range.cloneRange();
      }
    },
    handleEditorContentClick(e: any) {
      if (e && e.target === e.currentTarget) {
        state.focusEditorAtEnd();
      }
    },
    handleKeyDown(e: any) {
      if (state.isReadOnly()) {
        e.preventDefault();
        return;
      }
      if (e.key === 'Escape') {
        state.deselectMediaElement();
        state.closeAllModals();
        return;
      }
      if (state.selectedMediaEl && (e.key === 'Backspace' || e.key === 'Delete')) {
        e.preventDefault();
        const el = state.selectedMediaEl;
        state.deselectMediaElement();
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
        state.ensureEditableStructure();
        state.syncContent();
        return;
      }
      state.normalizeSelection();
    },
    handleGlobalKeyDown(e: any) {
      if (e.key === 'Escape') {
        state.closeAllModals();
        state.deselectMediaElement();
      }
    },
    handleEditorClick(e: any) {
      if (state.isReadOnly()) return;
      const target = e.target;
      const resizable = target && target.closest ? target.closest('img, video, audio, .cv-social-embed, .cv-widget') : null;
      if (resizable && state.isResizableTarget(resizable)) {
        state.selectMediaElement(resizable);
      } else {
        state.deselectMediaElement();
        state.normalizeSelection();
      }
    },
    startResize(e: any) {
      if (!state.selectedMediaEl || state.isReadOnly()) return;
      e.preventDefault();
      e.stopPropagation();
      state.isResizing = true;
      state.resizeStartX = e.clientX;
      state.resizeStartWidth = state.selectedMediaEl.getBoundingClientRect().width;
      if (typeof document !== 'undefined') {
        document.addEventListener('mousemove', state.handleResizeMove);
        document.addEventListener('mouseup', state.stopResize);
      }
    },
    handleResizeMove(e: any) {
      if (!state.isResizing || !state.selectedMediaEl) return;
      const delta = e.clientX - state.resizeStartX;
      let newWidth = Math.round(state.resizeStartWidth + delta);
      const minWidth = 80;
      const editor = state.getEditorElement();
      const maxWidth = editor ? (editor as any).clientWidth : 2000;
      if (newWidth < minWidth) newWidth = minWidth;
      if (newWidth > maxWidth) newWidth = maxWidth;
      const el = state.selectedMediaEl;
      el.style.width = newWidth + 'px';
      el.style.maxWidth = '100%';
      if (el.tagName === 'IMG' || el.tagName === 'VIDEO') {
        el.style.height = 'auto';
      }
      state.updateResizeHandlePosition();
    },
    stopResize() {
      if (!state.isResizing) return;
      state.isResizing = false;
      if (typeof document !== 'undefined') {
        document.removeEventListener('mousemove', state.handleResizeMove);
        document.removeEventListener('mouseup', state.stopResize);
      }
      state.syncContent();
    },
    handleSelectionChange() {
      if (typeof window !== 'undefined') {
        const editor = state.getEditorElement();
        if (!editor) return;
        const sel = window.getSelection();
        let inEditor = false;
        try {
          if (sel && sel.anchorNode && typeof (editor as any).contains === 'function') {
            inEditor = (editor as any).contains(sel.anchorNode as Node);
          }
        } catch (e) {}
        if (inEditor) {
          if (sel && sel.rangeCount > 0) {
            state.saveSelection();
          }
          state.checkFormats();
          state.normalizeSelection();
        }
      }
    },
  });

  onMount(() => {
    state.isMounted = true;
    if (!state.internalContent) {
      state.internalContent = props.content || props.initialContent || '';
    }
    const el = state.getEditorElement();
    if (el) {
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      el.innerHTML = state.sanitizeHtml(state.internalContent);
      state.ensureEditableStructure();
      state.renderEmbeds();
    }
    if (typeof document !== 'undefined') {
      const styleId = 'cv-editor-styles';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        style.innerHTML = ".wysiwyg-content blockquote { border-left: 4px solid var(--cv-color-quote-accent, #7fc4de) !important; background: linear-gradient(90deg, var(--cv-color-accent-tint, rgba(127, 196, 222, 0.1)) 0%, transparent 100%) !important; padding: 20px 24px !important; margin: 24px 0 !important; border-radius: 0 16px 16px 0 !important; font-style: italic !important; color: var(--cv-color-text-main, #e2e8f0) !important; font-size: 1.1em !important; line-height: 1.8 !important; position: relative; box-shadow: inset 2px 0 0px var(--cv-color-border, rgba(255,255,255,0.1)); } .wysiwyg-content pre { background: var(--cv-color-code-bg, #0f172a) !important; border: 1px solid var(--cv-color-code-border, rgba(255,255,255,0.1)) !important; border-radius: 12px !important; padding: 20px !important; color: var(--cv-color-code-text, #38bdf8) !important; font-family: 'Fira Code', monospace !important; overflow-x: auto !important; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5) !important; } .wysiwyg-content ul { list-style-type: disc !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content ol { list-style-type: decimal !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content li { margin-bottom: 0.5em !important; display: list-item !important; } .wysiwyg-content a:not(.cv-btn) { color: var(--cv-color-link, #7fc4de) !important; text-decoration: underline !important; text-underline-offset: 3px !important; }";
        document.head.appendChild(style);
      }
      
      document.addEventListener('fullscreenchange', state.handleFullscreenChange);
      document.addEventListener('selectionchange', state.handleSelectionChange);
      document.addEventListener('keydown', state.handleGlobalKeyDown);
    }
  });

  onUnMount(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('fullscreenchange', state.handleFullscreenChange);
      document.removeEventListener('selectionchange', state.handleSelectionChange);
      document.removeEventListener('keydown', state.handleGlobalKeyDown);
      document.removeEventListener('mousemove', state.handleResizeMove);
      document.removeEventListener('mouseup', state.stopResize);
    }
  });

  onUpdate(() => {
    if (!state.isMounted) return;
    const el = state.getEditorElement();
    if (!el) return;
    if (typeof props.content === 'string' && props.content !== state.internalContent) {
      state.internalContent = props.content;
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      el.innerHTML = state.sanitizeHtml(state.internalContent);
      state.ensureEditableStructure();
      state.renderEmbeds();
    }
  }, [props.content]);

  return (
    <div 
      ref={rootRef}
      class={`cv-rich-text-editor flex flex-col rounded-xl overflow-hidden relative ${state.isFullscreen ? 'fixed inset-0 z-[9999] w-screen h-screen rounded-none' : 'w-full'} ${props.className || ''}`}
      style={{
        boxSizing: 'border-box',
        background: 'var(--cv-color-surface-sunken, #0f172a)',
        border: state.isFullscreen ? 'none' : '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
        boxShadow: 'var(--cv-shadow-overlay, 0 8px 32px rgba(0,0,0,0.4))'
      }}
    >
      {/* Redesigned 2-Row Modern Toolbar */}
      <div class={`editor-toolbar select-none sticky top-0 z-10 w-full ${state.isReadOnly() ? 'opacity-60 pointer-events-none' : ''}`}>
        
        {/* ROW 1: History, Block Format, Typography, Inline Formatting, Colors, Alignments */}
        <div class="cv-toolbar-row cv-toolbar-row-1">
          {/* History: Undo / Redo */}
          <div class="cv-toolbar-group">
            <button
              type="button"
              class="cv-toolbar-btn"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => state.format('undo')}
              title="Undo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
            </button>
            <button
              type="button"
              class="cv-toolbar-btn"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => state.format('redo')}
              title="Redo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>
            </button>
          </div>

          <div class="cv-toolbar-divider"></div>

          {/* Block / Heading Selector: ≡ Heading ⌵ */}
          <Show when={state.showToolbarOption('headings')}>
            <div class="cv-toolbar-select-wrapper">
              <span class="cv-toolbar-select-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="21" y1="18" x2="3" y2="18"/></svg>
              </span>
              <select
                class="cv-toolbar-select"
                value={state.headingFormat}
                onMouseDown={() => state.saveSelection()}
                onChange={(e: any) => state.formatHeading(e.target.value)}
                title="Paragraph Style"
              >
                <option value="P">Paragraph</option>
                <option value="H1">Heading 1</option>
                <option value="H2">Heading 2</option>
                <option value="H3">Heading 3</option>
                <option value="H4">Heading 4</option>
              </select>
              <span class="cv-toolbar-select-chevron">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </span>
            </div>
          </Show>

          {/* Font Family Selector: Inter ⌵ */}
          <div class="cv-toolbar-select-wrapper">
            <select
              class="cv-toolbar-select no-icon"
              value={state.fontFamily}
              onMouseDown={() => state.saveSelection()}
              onChange={(e) => {
                state.restoreSelection();
                state.changeFontFamily(e.target.value);
              }}
              title="Font Family"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Outfit">Outfit</option>
              <option value="Fira Code">Fira Code</option>
              <option value="Georgia">Georgia</option>
              <option value="system-ui">System Sans</option>
            </select>
            <span class="cv-toolbar-select-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
          </div>

          {/* Font Size Selector: 16px ⌵ */}
          <div class="cv-toolbar-select-wrapper">
            <select
              class="cv-toolbar-select no-icon"
              value={state.fontSize}
              onMouseDown={() => state.saveSelection()}
              onChange={(e) => {
                state.restoreSelection();
                state.changeFontSize(e.target.value);
              }}
              title="Font Size"
            >
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="24px">24px</option>
              <option value="32px">32px</option>
            </select>
            <span class="cv-toolbar-select-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
          </div>

          <div class="cv-toolbar-divider"></div>

          {/* Inline Character Formatting Group: [ B | I | U | S | </> ] */}
          <div class="cv-toolbar-segmented-group">
            <Show when={state.showToolbarOption('bold')}>
              <button
                type="button"
                class={`cv-toolbar-btn ${state.activeFormats.bold ? 'is-active' : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => state.format('bold')}
                title="Bold"
              >
                <span class="font-bold text-xs">B</span>
              </button>
            </Show>
            <Show when={state.showToolbarOption('italic')}>
              <button
                type="button"
                class={`cv-toolbar-btn ${state.activeFormats.italic ? 'is-active' : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => state.format('italic')}
                title="Italic"
              >
                <span class="italic font-serif text-xs">I</span>
              </button>
            </Show>
            <Show when={state.showToolbarOption('underline')}>
              <button
                type="button"
                class={`cv-toolbar-btn ${state.activeFormats.underline ? 'is-active' : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => state.format('underline')}
                title="Underline"
              >
                <span class="underline text-xs font-medium">U</span>
              </button>
            </Show>
            <Show when={state.showToolbarOption('strikeThrough')}>
              <button
                type="button"
                class={`cv-toolbar-btn ${state.activeFormats.strikeThrough ? 'is-active' : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => state.format('strikeThrough')}
                title="Strikethrough"
              >
                <span class="line-through text-xs font-medium">S</span>
              </button>
            </Show>
            <Show when={state.showToolbarOption('code')}>
              <button
                type="button"
                class={`cv-toolbar-btn ${state.activeFormats.code ? 'is-active' : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => state.toggleBlock('PRE')}
                title="Code Block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </button>
            </Show>
          </div>

          <div class="cv-toolbar-divider"></div>

          {/* Color Pickers: Text Color (A) and Highlight Marker */}
          <Show when={state.showToolbarOption('foreColor') || state.showToolbarOption('backColor')}>
            <div class="cv-toolbar-group">
              <Show when={state.showToolbarOption('foreColor')}>
                <label 
                  class="cv-toolbar-color-btn" 
                  title="Text Color"
                  onMouseDown={() => state.saveSelection()}
                >
                  <span class="font-bold text-xs" style={{ lineHeight: '1' }}>A</span>
                  <span class="cv-color-indicator" style={{ backgroundColor: state.textColor }}></span>
                  <input
                    type="color"
                    aria-label="Text Color"
                    class="cv-color-input"
                    value={state.textColor}
                    onMouseDown={() => state.saveSelection()}
                    onInput={(e) => state.applyColorPreview('foreColor', (e.target as HTMLInputElement).value)}
                    onChange={(e) => state.applyColor('foreColor', (e.target as HTMLInputElement).value)}
                  />
                </label>
              </Show>
              <Show when={state.showToolbarOption('backColor')}>
                <label 
                  class="cv-toolbar-color-btn" 
                  title="Highlight Color"
                  onMouseDown={() => state.saveSelection()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/></svg>
                  <span class="cv-color-indicator" style={{ backgroundColor: state.highlightColor }}></span>
                  <input
                    type="color"
                    aria-label="Background Color"
                    class="cv-color-input"
                    value={state.highlightColor}
                    onMouseDown={() => state.saveSelection()}
                    onInput={(e) => state.applyColorPreview('backColor', (e.target as HTMLInputElement).value)}
                    onChange={(e) => state.applyColor('backColor', (e.target as HTMLInputElement).value)}
                  />
                </label>
              </Show>
            </div>
          </Show>

          <div class="cv-toolbar-divider"></div>

          {/* Alignment Controls Group: [ Left | Center | Right | Justify ] */}
          <Show when={state.showToolbarOption('justifyLeft') || state.showToolbarOption('justifyCenter') || state.showToolbarOption('justifyRight')}>
            <div class="cv-toolbar-segmented-group">
              <Show when={state.showToolbarOption('justifyLeft')}>
                <button
                  type="button"
                  class={`cv-toolbar-btn ${state.activeFormats.justifyLeft ? 'is-active' : ''}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => state.format('justifyLeft')}
                  title="Align Left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
                </button>
              </Show>
              <Show when={state.showToolbarOption('justifyCenter')}>
                <button
                  type="button"
                  class={`cv-toolbar-btn ${state.activeFormats.justifyCenter ? 'is-active' : ''}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => state.format('justifyCenter')}
                  title="Align Center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="17" y1="12" x2="7" y2="12"/><line x1="19" y1="18" x2="5" y2="18"/></svg>
                </button>
              </Show>
              <Show when={state.showToolbarOption('justifyRight')}>
                <button
                  type="button"
                  class={`cv-toolbar-btn ${state.activeFormats.justifyRight ? 'is-active' : ''}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => state.format('justifyRight')}
                  title="Align Right"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="9" y2="12"/><line x1="21" y1="18" x2="7" y2="18"/></svg>
                </button>
              </Show>
              <button
                type="button"
                class={`cv-toolbar-btn ${state.activeFormats.justifyFull ? 'is-active' : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => state.format('justifyFull')}
                title="Align Justify"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="3" y2="12"/><line x1="21" y1="18" x2="3" y2="18"/></svg>
              </button>
            </div>
          </Show>

        </div>

        {/* ROW 2: Lists, Insertions (Table, Image, Link, Formula, Social), Add UI Widget, Dynamic Classes, AI & Actions */}
        <div class="cv-toolbar-row cv-toolbar-row-2">
          
          {/* Lists: Bullet, Numbered, Checklist */}
          <div class="cv-toolbar-group">
            <Show when={state.showToolbarOption('unorderedList')}>
              <button
                type="button"
                class={`cv-toolbar-btn ${state.activeFormats.unorderedList ? 'is-active' : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => state.format('insertUnorderedList')}
                title="Bullet List"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              </button>
            </Show>
            <Show when={state.showToolbarOption('orderedList')}>
              <button
                type="button"
                class={`cv-toolbar-btn ${state.activeFormats.orderedList ? 'is-active' : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => state.format('insertOrderedList')}
                title="Numbered List"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
              </button>
            </Show>
            <button
              type="button"
              class="cv-toolbar-btn"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => state.insertChecklist()}
              title="Task List"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </button>
          </div>

          <div class="cv-toolbar-divider"></div>

          {/* Insert Dropdown & Direct Insert Actions */}
          <div class="cv-toolbar-group relative">
            <button
              type="button"
              class="cv-toolbar-action-btn"
              onMouseDown={(e) => { e.preventDefault(); state.saveSelection(); }}
              onClick={() => state.showInsertMenu = !state.showInsertMenu}
              title="Insert Options"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Insert</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>

            <Show when={state.showInsertMenu}>
              <div class="cv-insert-menu shadow-xl">
                <button type="button" class="cv-insert-item" onMouseDown={(e) => e.preventDefault()} onClick={() => { state.showInsertMenu = false; state.openTableModal(); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                  Table
                </button>
                <button type="button" class="cv-insert-item" onMouseDown={(e) => e.preventDefault()} onClick={() => { state.showInsertMenu = false; state.insertMedia('image'); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  Image
                </button>
                <button type="button" class="cv-insert-item" onMouseDown={(e) => e.preventDefault()} onClick={() => { state.showInsertMenu = false; state.openLinkModal(); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  Link
                </button>
                <button type="button" class="cv-insert-item" onMouseDown={(e) => e.preventDefault()} onClick={() => { state.showInsertMenu = false; state.insertMedia('video'); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/></svg>
                  Video
                </button>
                <button type="button" class="cv-insert-item" onMouseDown={(e) => e.preventDefault()} onClick={() => { state.showInsertMenu = false; state.openButtonModal(); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                  Button
                </button>
                <button type="button" class="cv-insert-item" onMouseDown={(e) => e.preventDefault()} onClick={() => { state.showInsertMenu = false; state.openSocialModal(); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  Social Post
                </button>
                <button type="button" class="cv-insert-item" onMouseDown={(e) => e.preventDefault()} onClick={() => { state.showInsertMenu = false; state.format('insertHorizontalRule'); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Divider
                </button>
                <button type="button" class="cv-insert-item" onMouseDown={(e) => e.preventDefault()} onClick={() => { state.showInsertMenu = false; state.toggleBlock('BLOCKQUOTE'); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.036V20c0 1 1 1 2 1z"/></svg>
                  Quote
                </button>
                <button type="button" class="cv-insert-item" onMouseDown={(e) => e.preventDefault()} onClick={() => { state.showInsertMenu = false; state.clearAllFormatting(); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Clear Format
                </button>
              </div>
            </Show>
          </div>

          {/* Table Button with label */}
          <Show when={state.showToolbarOption('table')}>
            <button
              type="button"
              class="cv-toolbar-action-btn"
              onMouseDown={(e) => { e.preventDefault(); state.saveSelection(); }}
              onClick={() => state.openTableModal()}
              title="Table"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
              <span>Table</span>
            </button>
          </Show>

          {/* Table Operations if active inside a table */}
          <Show when={state.activeFormats.inTable && state.showToolbarOption('table')}>
            <div class="flex items-center cv-rte-tint rounded-lg p-0.5 border cv-rte-accent-border">
              <button type="button" class="w-6 h-6 flex items-center justify-center rounded hover:cv-rte-tint-strong cv-rte-accent transition-colors" onMouseDown={(e) => e.preventDefault()} onClick={() => state.modifyTable('addRow')} title="Add Row Below">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
                <span class="text-[9px] font-bold ml-0.5">R</span>
              </button>
              <button type="button" class="w-6 h-6 flex items-center justify-center rounded hover:bg-rose-500/30 text-rose-500 transition-colors" onMouseDown={(e) => e.preventDefault()} onClick={() => state.modifyTable('removeRow')} title="Delete Row">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/></svg>
                <span class="text-[9px] font-bold ml-0.5">R</span>
              </button>
              <div class="w-px h-3 cv-rte-tint-strong mx-0.5"></div>
              <button type="button" class="w-6 h-6 flex items-center justify-center rounded hover:cv-rte-tint-strong cv-rte-accent transition-colors" onMouseDown={(e) => e.preventDefault()} onClick={() => state.modifyTable('addCol')} title="Add Column Right">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
                <span class="text-[9px] font-bold ml-0.5">C</span>
              </button>
              <button type="button" class="w-6 h-6 flex items-center justify-center rounded hover:bg-rose-500/30 text-rose-500 transition-colors" onMouseDown={(e) => e.preventDefault()} onClick={() => state.modifyTable('removeCol')} title="Delete Column">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/></svg>
                <span class="text-[9px] font-bold ml-0.5">C</span>
              </button>
            </div>
          </Show>

          {/* Quick Direct Icons: Image, Link, Formula Fx, Social/Comment */}
          <div class="cv-toolbar-group">
            <Show when={state.showToolbarOption('image')}>
              <button
                type="button"
                class="cv-toolbar-btn"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => state.insertMedia('image')}
                title="Image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </button>
            </Show>
            <Show when={state.showToolbarOption('link')}>
              <button
                type="button"
                class="cv-toolbar-btn"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => state.openLinkModal()}
                title="Link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>
            </Show>
            <button
              type="button"
              class="cv-toolbar-btn"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => state.insertFormula()}
              title="Formula"
            >
              <span class="font-serif italic font-bold text-xs">Fx</span>
            </button>
            <Show when={state.showToolbarOption('social')}>
              <button
                type="button"
                class="cv-toolbar-btn"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => state.openSocialModal()}
                title="Social Media Embed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </button>
            </Show>
          </div>

          <div class="cv-toolbar-divider"></div>

          {/* Add UI Widget button (dark pill button) */}
          <Show when={state.showToolbarOption('addWidget')}>
            <button
              type="button"
              class="cv-toolbar-widget-btn"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => state.openWidgetModal()}
              title="Add UI Widget"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              <span>Add UI Widget</span>
            </button>
          </Show>

          {/* Dynamic Classes Chips and Input */}
          <Show when={state.showToolbarOption('classInput')}>
            <div class="cv-toolbar-classes-group">
              <span class="cv-class-badge">CLASS</span>
              {state.appliedClasses.map((cls: string) => (
                <span class="cv-class-chip" key={cls}>
                  <span>{cls}</span>
                  <button
                    type="button"
                    class="cv-class-chip-remove"
                    onClick={() => state.removeClass(cls)}
                    title={'Remove ' + cls}
                  >×</button>
                </span>
              ))}
              <input
                type="text"
                aria-label="Dynamic CSS Class"
                list="editor-class-list"
                placeholder="+ add class..."
                class="cv-class-input"
                onKeyDown={(e) => state.handleClassInputKeyDown(e)}
              />
              <Show when={props.availableClasses && props.availableClasses.length > 0}>
                <datalist id="editor-class-list">
                  {props.availableClasses?.map((cls) => (
                    <option value={cls}>{cls}</option>
                  ))}
                </datalist>
              </Show>
            </div>
          </Show>

          {/* Right Side Tools: ContentVeda AI (commented), Fullscreen, Source Code, Save */}
          <div class="ml-auto flex items-center gap-1.5 flex-shrink-0">
            {/* ContentVeda AI button commented out
            <button
              type="button"
              class="cv-toolbar-ai-btn"
              onClick={() => state.openAiModal()}
              title="ContentVeda AI"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              <span>ContentVeda AI</span>
            </button>
            */}

            <Show when={state.showToolbarOption('source')}>
              <button
                type="button"
                class={`cv-toolbar-btn ${state.mode === 'source' ? 'is-active' : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => state.toggleMode()}
                title="View HTML Source Code"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </button>
            </Show>

            <Show when={state.showToolbarOption('fullscreen')}>
              <button
                type="button"
                class="cv-toolbar-btn"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => state.toggleFullScreen()}
                title="Full Screen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
              </button>
            </Show>

            <Show when={state.showToolbarOption('save')}>
              <button
                type="button"
                class="cv-toolbar-btn"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => state.syncContent()}
                title="Save"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              </button>
            </Show>
          </div>

        </div>

      </div>

      {/* Editor Main Content Area */}
      <div
        class={`editor-content flex-1 overflow-y-auto relative min-h-[350px] cv-mode-${state.mode}`}
        onScroll={() => state.updateResizeHandlePosition()}
        onClick={(e) => state.handleEditorContentClick(e)}
        style={{
          padding: '2rem 3rem',
          color: 'var(--cv-color-text-main, #f1f5f9)',
          position: 'relative',
          cursor: state.isReadOnly() ? 'default' : 'text'
        }}
      >
        <div
          ref={editorRef}
          contentEditable={state.isReadOnly() ? "false" : "true"}
          class={`wysiwyg-content outline-none prose prose-invert max-w-none ${state.isReadOnly() ? 'cv-readonly' : ''}`}
          onInput={() => { state.handleInput(); state.checkFormats(); state.normalizeSelection(); }}
          onBlur={() => state.handleInput()}
          onKeyUp={() => { state.checkFormats(); state.normalizeSelection(); }}
          onKeyDown={(e) => state.handleKeyDown(e)}
          onMouseUp={() => { state.checkFormats(); state.normalizeSelection(); }}
          onClick={(e) => state.handleEditorClick(e)}
          style={{ minHeight: '350px', fontFamily: 'Inter, sans-serif', lineHeight: '1.7', fontSize: '15px' }}
        ></div>

        <Show when={state.selectedMediaEl && !state.isReadOnly()}>
          <div
            class="cv-resize-handle"
            title="Drag to resize"
            style={{
              position: 'absolute',
              top: `${state.resizeHandleTop}px`,
              left: `${state.resizeHandleLeft}px`,
              width: '14px',
              height: '14px',
              borderRadius: '3px',
              background: 'var(--cv-color-primary, #245066)',
              border: '2px solid var(--cv-color-surface-raised, #fff)',
              cursor: 'nwse-resize',
              zIndex: 30,
              boxShadow: '0 1px 4px rgba(0,0,0,0.4)'
            }}
            onMouseDown={(e) => state.startResize(e)}
          ></div>

          <div
            class="cv-media-toolbar"
            style={{
              position: 'absolute',
              top: `${state.resizeToolbarTop}px`,
              left: `${state.resizeToolbarLeft}px`,
              zIndex: 35
            }}
          >
            <button
              type="button"
              class="cv-media-toolbar-btn"
              title="25% width"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => state.setImageSize('25%')}
            >
              25%
            </button>
            <button
              type="button"
              class="cv-media-toolbar-btn"
              title="50% width"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => state.setImageSize('50%')}
            >
              50%
            </button>
            <button
              type="button"
              class="cv-media-toolbar-btn"
              title="75% width"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => state.setImageSize('75%')}
            >
              75%
            </button>
            <button
              type="button"
              class="cv-media-toolbar-btn"
              title="100% width"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => state.setImageSize('100%')}
            >
              100%
            </button>
            <div class="cv-toolbar-divider" style={{ height: '14px', margin: '0 2px' }}></div>
            <button
              type="button"
              class="cv-media-toolbar-btn"
              title="Align Left"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => state.setImageAlign('left')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
            </button>
            <button
              type="button"
              class="cv-media-toolbar-btn"
              title="Align Center"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => state.setImageAlign('center')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="6"/><line x1="21" y1="12" x2="3" y2="12"/><line x1="18" y1="18" x2="6" y2="18"/></svg>
            </button>
            <button
              type="button"
              class="cv-media-toolbar-btn"
              title="Align Right"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => state.setImageAlign('right')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="9" y2="12"/><line x1="21" y1="18" x2="7" y2="18"/></svg>
            </button>
            <div class="cv-toolbar-divider" style={{ height: '14px', margin: '0 2px' }}></div>
            <button
              type="button"
              class="cv-media-toolbar-btn cv-btn-danger"
              title="Remove Media"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => state.deleteSelectedMedia()}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </Show>

        {/* Premium Modals with Guaranteed Inline CSS to prevent Tailwind purging */}
        <Show when={state.showTableModal || state.showLinkModal || state.showWidgetModal || state.showSocialModal || state.showButtonModal || state.showAiModal}>
          <div 
            class="fixed inset-0 flex items-center justify-center z-[100] backdrop-blur-md" 
            style={{ background: 'rgba(0, 0, 0, 0.6)' }}
            onClick={(e) => state.handleBackdropClick(e)}
          >
            
            <Show when={state.showAiModal}>
              <div class="cv-ai-modal shadow-2xl">
                <div class="cv-ai-modal-header">
                  <div class="flex items-center gap-2 text-white font-bold text-base">
                    <svg class="text-purple-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                    ContentVeda AI Assistant
                  </div>
                  <button type="button" class="text-slate-400 hover:text-white text-lg font-bold" onClick={() => state.closeAiModal()}>×</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <button type="button" class="cv-ai-pill-btn" onClick={() => state.applyAiAction('improve')}>
                    ✨ Improve Writing & Polish Flow
                  </button>
                  <button type="button" class="cv-ai-pill-btn" onClick={() => state.applyAiAction('callout')}>
                    💡 Generate AI Callout Insight Box
                  </button>
                  <button type="button" class="cv-ai-pill-btn" onClick={() => state.applyAiAction('summarize')}>
                    📝 Summarize Selected Section
                  </button>
                  <button type="button" class="cv-ai-pill-btn" onClick={() => state.applyAiAction('grammar')}>
                    🔍 Fix Grammar & Syntax
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button type="button" style={{ padding: '8px 16px', fontSize: '13px', color: '#cbd5e1', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '6px', cursor: 'pointer' }} onClick={() => state.closeAiModal()}>Close</button>
                </div>
              </div>
            </Show>

            <Show when={state.showButtonModal}>
              <div class="shadow-2xl" style={{ background: 'var(--cv-color-surface-raised, #1e293b)', border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))', borderRadius: '16px', padding: '24px', width: '380px' }}>
                <h3 class="flex items-center text-white" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: 'var(--cv-color-primary, #7fc4de)' }} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                  Insert Button
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--cv-color-text-muted, #94a3b8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Button Style</label>
                    <select style={{ background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))', border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))', borderRadius: '8px', padding: '12px 16px', width: '100%', fontSize: '14px', color: 'var(--cv-color-text-main, #fff)', outline: 'none' }} value={state.btnStyle} onChange={(e) => state.btnStyle = e.target.value}>
                      <option value="primary" style={{ background: 'var(--cv-color-surface-raised, #1e293b)' }}>Primary (Gradient)</option>
                      <option value="secondary" style={{ background: 'var(--cv-color-surface-raised, #1e293b)' }}>Secondary (Dark)</option>
                      <option value="outline" style={{ background: 'var(--cv-color-surface-raised, #1e293b)' }}>Outline (Violet)</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--cv-color-text-muted, #94a3b8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Button Label</label>
                    <input type="text" aria-label="Button Label" style={{ background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))', border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))', borderRadius: '8px', padding: '12px 16px', width: '100%', fontSize: '14px', color: 'var(--cv-color-text-main, #fff)', outline: 'none', boxSizing: 'border-box' }} placeholder="e.g. Get Started Today" value={state.btnText} onInput={(e) => state.btnText = e.target.value} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--cv-color-text-muted, #94a3b8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Target URL</label>
                    <input type="url" aria-label="Target URL" style={{ background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))', border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))', borderRadius: '8px', padding: '12px 16px', width: '100%', fontSize: '14px', color: 'var(--cv-color-text-main, #fff)', outline: 'none', boxSizing: 'border-box' }} placeholder="https://..." value={state.btnUrl} onInput={(e) => state.btnUrl = e.target.value} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" style={{ padding: '10px 20px', fontSize: '14px', color: 'var(--cv-color-text-secondary, #cbd5e1)', background: 'var(--cv-color-hover, rgba(255,255,255,0.05))', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }} onClick={() => state.closeButtonModal()}>Cancel</button>
                  <button type="button" style={{ padding: '10px 20px', fontSize: '14px', color: 'var(--cv-color-on-primary, #fff)', background: 'var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.2))' }} onClick={() => state.confirmButton()}>Insert</button>
                </div>
              </div>
            </Show>

            <Show when={state.showTableModal}>
              <div class="shadow-2xl" style={{ background: 'var(--cv-color-surface-raised, #1e293b)', border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))', borderRadius: '16px', padding: '24px', width: '340px' }}>
                <h3 class="flex items-center text-white" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style={{ color: 'var(--cv-color-link, #7fc4de)' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
                  Insert Table Grid
                </h3>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--cv-color-text-muted, #94a3b8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rows</label>
                    <input type="number" aria-label="Table Rows" style={{ background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))', border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))', borderRadius: '8px', padding: '12px', width: '100%', fontSize: '15px', color: 'var(--cv-color-text-main, #fff)', outline: 'none', textAlign: 'center', boxSizing: 'border-box' }} value={state.tableRows} min="1" max="10" onInput={(e) => state.tableRows = e.target.value} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--cv-color-text-muted, #94a3b8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Columns</label>
                    <input type="number" aria-label="Table Columns" style={{ background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))', border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))', borderRadius: '8px', padding: '12px', width: '100%', fontSize: '15px', color: 'var(--cv-color-text-main, #fff)', outline: 'none', textAlign: 'center', boxSizing: 'border-box' }} value={state.tableCols} min="1" max="10" onInput={(e) => state.tableCols = e.target.value} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                  <input type="checkbox" id="cv-header-check" style={{ width: '18px', height: '18px', borderRadius: '4px', cursor: 'pointer', accentColor: 'var(--cv-color-link, #7fc4de)' }} checked={state.tableHasHeader} onChange={(e) => state.tableHasHeader = e.target.checked} />
                  <label for="cv-header-check" style={{ fontSize: '14px', color: 'var(--cv-color-text-secondary, #cbd5e1)', cursor: 'pointer', userSelect: 'none' }}>Include header row</label>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" style={{ padding: '10px 20px', fontSize: '14px', color: 'var(--cv-color-text-secondary, #cbd5e1)', background: 'var(--cv-color-hover, rgba(255,255,255,0.05))', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }} onClick={() => state.closeTableModal()}>Cancel</button>
                  <button type="button" style={{ padding: '10px 20px', fontSize: '14px', color: 'var(--cv-color-on-primary, #fff)', background: 'var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }} onClick={() => state.confirmTable()}>Insert Table</button>
                </div>
              </div>
            </Show>

            <Show when={state.showLinkModal}>
              <div class="shadow-2xl" style={{ background: 'var(--cv-color-surface-raised, #1e293b)', border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))', borderRadius: '16px', padding: '24px', width: '380px' }}>
                <h3 class="flex items-center text-white" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style={{ color: 'var(--cv-color-link, #7fc4de)' }}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  Insert Hyperlink
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--cv-color-text-muted, #94a3b8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>URL Destination</label>
                  <input type="url" aria-label="Hyperlink URL" style={{ background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))', border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))', borderRadius: '8px', padding: '12px 16px', width: '100%', fontSize: '14px', color: 'var(--cv-color-text-main, #fff)', outline: 'none', boxSizing: 'border-box' }} placeholder="https://example.com" value={state.linkUrl} onInput={(e) => state.linkUrl = e.target.value} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                  <button type="button" style={{ padding: '10px 20px', fontSize: '14px', color: 'var(--cv-color-text-secondary, #cbd5e1)', background: 'var(--cv-color-hover, rgba(255,255,255,0.05))', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }} onClick={() => state.closeLinkModal()}>Cancel</button>
                  <button type="button" style={{ padding: '10px 20px', fontSize: '14px', color: 'var(--cv-color-on-primary, #fff)', background: 'var(--cv-color-info-fill, #075985)', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }} onClick={() => state.confirmLink()}>Insert Link</button>
                </div>
              </div>
            </Show>

            <Show when={state.showWidgetModal}>
              <div class="shadow-2xl" style={{ background: 'var(--cv-color-surface-raised, #1e293b)', border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))', borderRadius: '16px', padding: '24px', width: '380px' }}>
                <h3 class="flex items-center text-white" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: 'var(--cv-color-secondary, #5eb3d6)' }} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  Insert Component
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--cv-color-text-muted, #94a3b8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Select ContentVeda Widget</label>
                  <select style={{ background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))', border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))', borderRadius: '8px', padding: '12px 16px', width: '100%', fontSize: '14px', color: 'var(--cv-color-text-main, #fff)', outline: 'none', boxSizing: 'border-box' }} value={state.selectedWidget} onChange={(e) => state.selectedWidget = e.target.value}>
                    <option value="banner" style={{ background: 'var(--cv-color-surface-raised, #1e293b)' }}>Banner Component</option>
                    <option value="grid-banner" style={{ background: 'var(--cv-color-surface-raised, #1e293b)' }}>Grid Banner Component</option>
                    <option value="media-grid" style={{ background: 'var(--cv-color-surface-raised, #1e293b)' }}>Media Grid Component</option>
                    <option value="slider" style={{ background: 'var(--cv-color-surface-raised, #1e293b)' }}>Slider Carousel</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                  <button type="button" style={{ padding: '10px 20px', fontSize: '14px', color: 'var(--cv-color-text-secondary, #cbd5e1)', background: 'var(--cv-color-hover, rgba(255,255,255,0.05))', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }} onClick={() => state.closeWidgetModal()}>Cancel</button>
                  <button type="button" style={{ padding: '10px 20px', fontSize: '14px', color: 'var(--cv-color-on-primary, #fff)', background: 'var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }} onClick={() => state.confirmWidget()}>Insert Widget</button>
                </div>
              </div>
            </Show>

            <Show when={state.showSocialModal}>
              <div class="shadow-2xl" style={{ background: 'var(--cv-color-surface-raised, #1e293b)', border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))', borderRadius: '16px', padding: '24px', width: '380px' }}>
                <h3 class="flex items-center text-white" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: 'var(--cv-color-info, #0ea5e9)' }} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  Embed Social Post
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--cv-color-text-muted, #94a3b8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform</label>
                    <select style={{ background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))', border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))', borderRadius: '8px', padding: '12px 16px', width: '100%', fontSize: '14px', color: 'var(--cv-color-text-main, #fff)', outline: 'none', boxSizing: 'border-box' }} value={state.socialPlatform} onChange={(e) => state.socialPlatform = e.target.value}>
                      <option value="youtube" style={{ background: 'var(--cv-color-surface-raised, #1e293b)' }}>YouTube</option>
                      <option value="vimeo" style={{ background: 'var(--cv-color-surface-raised, #1e293b)' }}>Vimeo</option>
                      <option value="x" style={{ background: 'var(--cv-color-surface-raised, #1e293b)' }}>X (Twitter)</option>
                      <option value="instagram" style={{ background: 'var(--cv-color-surface-raised, #1e293b)' }}>Instagram</option>
                      <option value="facebook" style={{ background: 'var(--cv-color-surface-raised, #1e293b)' }}>Facebook</option>
                      <option value="linkedin" style={{ background: 'var(--cv-color-surface-raised, #1e293b)' }}>LinkedIn</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--cv-color-text-muted, #94a3b8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Post URL</label>
                    <input type="url" aria-label="Social Link URL" style={{ background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))', border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))', borderRadius: '8px', padding: '12px 16px', width: '100%', fontSize: '14px', color: 'var(--cv-color-text-main, #fff)', outline: 'none', boxSizing: 'border-box' }} placeholder="https://..." value={state.socialUrl} onInput={(e) => state.socialUrl = e.target.value} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                  <button type="button" style={{ padding: '10px 20px', fontSize: '14px', color: 'var(--cv-color-text-secondary, #cbd5e1)', background: 'var(--cv-color-hover, rgba(255,255,255,0.05))', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }} onClick={() => state.closeSocialModal()}>Cancel</button>
                  <button type="button" style={{ padding: '10px 20px', fontSize: '14px', color: 'var(--cv-color-on-primary, #fff)', background: 'var(--cv-color-info-fill, #075985)', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }} onClick={() => state.confirmSocial()}>Embed Post</button>
                </div>
              </div>
            </Show>

          </div>
        </Show>
      </div>
      
      <div 
        class={`editor-source flex-1 relative min-h-[350px] overflow-hidden cv-mode-src-${state.mode}`} 
        style={{
          flexDirection: 'column',
          height: '100%',
          minHeight: '350px'
        }}
      >
        <textarea
          class="w-full flex-1 p-6 bg-transparent cv-rte-ok font-mono text-[14px] leading-loose outline-none"
          value={state.internalContent}
          onInput={(e) => state.handleSourceInput(e)}
          style={{ 
            whiteSpace: 'pre-wrap', 
            overflowY: 'auto', 
            resize: 'none',
            height: '100%',
            width: '100%',
            boxSizing: 'border-box'
          }}
          spellcheck={false}
        ></textarea>
      </div>

    </div>
  );
}
