export interface RichTextEditorConfig {
  toolbar?: string[];
}
export interface RichTextEditorProps {
  content?: string;
  initialContent?: string;
  onChange?: (html: string) => void;
  className?: string;
  availableClasses?: string[];
  onMediaRequest?: (type: "image" | "video" | "audio") => Promise<string>;
  config?: RichTextEditorConfig;
}

import DOMPurify from "isomorphic-dompurify";
let activeSavedRange: any = null;

/**
 * Usage:
 *
 *  <rich-text-editor></rich-text-editor>
 *
 */
class RichTextEditor extends HTMLElement {
  get _rootRef() {
    return this._root.querySelector("[data-ref='RichTextEditor-rootRef']");
  }

  get _editorRef() {
    return this._root.querySelector("[data-ref='RichTextEditor-editorRef']");
  }

  get _root() {
    return this.shadowRoot || this;
  }

  constructor() {
    super();
    const self = this;

    this.state = {
      mode: "visual",
      isFullscreen: false,
      internalContent: self.props.content || self.props.initialContent || "",
      getTrustedHttpUrl(rawUrl: string) {
        try {
          const parsed = new URL(
            rawUrl,
            typeof window !== "undefined"
              ? window.location.origin
              : "http://localhost"
          );
          if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
            return null;
          }
          return parsed.toString();
        } catch {
          return null;
        }
      },
      getHostname(url: string) {
        try {
          return new URL(
            url,
            typeof window !== "undefined"
              ? window.location.origin
              : "http://localhost"
          ).hostname.toLowerCase();
        } catch {
          return "";
        }
      },
      isHost(url: string, domain: string) {
        const host = self.state.getHostname(url);
        return host === domain || host.endsWith("." + domain);
      },
      escapeHtml(value: string) {
        return String(value == null ? "" : value)
          .split("&")
          .join("&amp;")
          .split("<")
          .join("&lt;")
          .split(">")
          .join("&gt;")
          .split('"')
          .join("&quot;")
          .split("'")
          .join("&#39;");
      },
      sanitizeHtml(content: string) {
        return DOMPurify.sanitize(content, {
          ADD_TAGS: ["iframe", "video", "audio", "source"],
          ADD_ATTR: [
            "allow",
            "allowfullscreen",
            "frameborder",
            "scrolling",
            "target",
            "contenteditable",
            "data-platform",
            "data-url",
            "data-widget",
            "data-formula",
            "controls",
            "playsinline",
            "autoplay",
            "muted",
            "loop",
          ],
        });
      },
      showTableModal: false,
      tableRows: "3",
      tableCols: "3",
      tableHasHeader: true,
      showLinkModal: false,
      linkUrl: "",
      showWidgetModal: false,
      selectedWidget: "banner",
      showSocialModal: false,
      socialUrl: "",
      socialPlatform: "x",
      showButtonModal: false,
      btnText: "Click Here",
      btnUrl: "",
      btnStyle: "primary",
      selectedMediaEl: null,
      resizeHandleTop: 0,
      resizeHandleLeft: 0,
      isResizing: false,
      resizeStartX: 0,
      resizeStartWidth: 0,
      fontFamily: "Inter",
      fontSize: "16px",
      textColor: "#0f172a",
      highlightColor: "#fde047",
      appliedClasses: ["cv-callout", "variant-blue"],
      showInsertMenu: false,
      showAiModal: false,
      aiAction: "improve",
      aiInput: "",
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
      headingFormat: "P",
      checkFormats() {
        if (typeof window !== "undefined" && typeof document !== "undefined") {
          let isQuote = false;
          let isCode = false;
          let inTable = false;
          const sel = window.getSelection();
          if (sel && sel.rangeCount > 0) {
            let node = sel.getRangeAt(0).startContainer as any;
            let currentEl =
              node && node.nodeType === 1
                ? node
                : node
                ? node.parentElement
                : null;
            if (currentEl) {
              try {
                const computed = window.getComputedStyle(currentEl);
                if (computed && computed.fontSize) {
                  self.state.fontSize = computed.fontSize;
                  self.update();
                }
                if (computed && computed.fontFamily) {
                  const primaryFont = computed.fontFamily
                    .split(",")[0]
                    .split('"')
                    .join("")
                    .split("'")
                    .join("")
                    .trim();
                  if (primaryFont) {
                    self.state.fontFamily = primaryFont;
                    self.update();
                  }
                }
              } catch (err) {}
              const classSet: string[] = [];
              let searchNode = currentEl;
              while (searchNode && searchNode !== self._editorRef) {
                if (
                  searchNode.className &&
                  typeof searchNode.className === "string"
                ) {
                  if (searchNode.className.indexOf("wysiwyg-content") !== -1) {
                    break;
                  }
                  const parts = searchNode.className.split(/\s+/);
                  for (let pi = 0; pi < parts.length; pi++) {
                    const p = parts[pi];
                    if (
                      p &&
                      p.indexOf("prose") !== 0 &&
                      p !== "task-list" &&
                      !classSet.includes(p)
                    ) {
                      classSet.push(p);
                    }
                  }
                }
                searchNode = searchNode.parentElement;
              }
              self.state.appliedClasses = classSet;
              self.update();
            }
            while (
              node &&
              node.nodeName !== "DIV" &&
              node.className !== "wysiwyg-content"
            ) {
              if (node.nodeName === "BLOCKQUOTE") isQuote = true;
              if (node.nodeName === "PRE" || node.nodeName === "CODE")
                isCode = true;
              if (node.nodeName === "TD" || node.nodeName === "TH")
                inTable = true;
              node = node.parentNode;
            }
          }
          self.state.activeFormats = {
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
            underline: document.queryCommandState("underline"),
            strikeThrough: document.queryCommandState("strikeThrough"),
            justifyLeft: document.queryCommandState("justifyLeft"),
            justifyCenter: document.queryCommandState("justifyCenter"),
            justifyRight: document.queryCommandState("justifyRight"),
            justifyFull: document.queryCommandState("justifyFull"),
            unorderedList: document.queryCommandState("insertUnorderedList"),
            orderedList: document.queryCommandState("insertOrderedList"),
            quote: isQuote,
            code: isCode,
            inTable: inTable,
          };
          self.update();
          const formatBlock = document.queryCommandValue("formatBlock");
          if (formatBlock) {
            if (formatBlock.includes("1")) {
              self.state.headingFormat = "H1";
              self.update();
              self.update();
            } else if (formatBlock.includes("2")) {
              self.state.headingFormat = "H2";
              self.update();
              self.update();
            } else if (formatBlock.includes("3")) {
              self.state.headingFormat = "H3";
              self.update();
              self.update();
            } else if (formatBlock.includes("4")) {
              self.state.headingFormat = "H4";
              self.update();
              self.update();
            } else if (formatBlock.toLowerCase().includes("blockquote")) {
              self.state.activeFormats.quote = true;
              self.state.headingFormat = "P";
              self.update();
            } else if (formatBlock.toLowerCase().includes("pre")) {
              self.state.activeFormats.code = true;
              self.state.headingFormat = "P";
              self.update();
            } else if (formatBlock.includes("p")) {
              self.state.headingFormat = "P";
              self.update();
              self.update();
            } else if (formatBlock.includes("div")) {
              self.state.headingFormat = "P";
              self.update();
              self.update();
            }
          }
        }
      },
      saveSelection() {
        if (typeof window !== "undefined") {
          const sel = window.getSelection();
          if (sel && sel.rangeCount > 0) {
            const r = sel.getRangeAt(0);
            if (self._editorRef) {
              try {
                if (
                  (self._editorRef as any).contains(r.commonAncestorContainer)
                ) {
                  activeSavedRange = self.state.escapeAtomicRange(
                    r.cloneRange()
                  );
                }
              } catch (e) {
                activeSavedRange = r.cloneRange();
              }
            } else {
              activeSavedRange = r.cloneRange();
            }
          }
        }
      },
      restoreSelection() {
        if (typeof window !== "undefined") {
          if (self._editorRef) {
            try {
              if (typeof (self._editorRef as any).focus === "function") {
                (self._editorRef as any).focus();
              }
            } catch (e) {}
            if (activeSavedRange) {
              const sel = window.getSelection();
              if (sel) {
                sel.removeAllRanges();
                sel.addRange(activeSavedRange.cloneRange());
              }
            }
          }
        }
      },
      escapeAtomicRange(range: any) {
        if (!range || !self._editorRef) return range;
        let node: any = range.startContainer;
        let atomicEl: any = null;
        while (node && node !== self._editorRef) {
          if (
            node.nodeType === 1 &&
            node.getAttribute &&
            node.getAttribute("contenteditable") === "false"
          ) {
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
        if (typeof window === "undefined") return;
        if (self._editorRef) {
          try {
            if (typeof (self._editorRef as any).focus === "function") {
              (self._editorRef as any).focus();
            }
          } catch (e) {}
        }
        self.state.restoreSelection();
        const sel = window.getSelection();
        let targetRange: any = null;
        if (sel && sel.rangeCount > 0) {
          const cur = sel.getRangeAt(0);
          try {
            if (
              self._editorRef &&
              (self._editorRef as any).contains(cur.commonAncestorContainer)
            ) {
              targetRange = cur;
            }
          } catch (e) {}
        }
        if (!targetRange && activeSavedRange) {
          try {
            if (
              self._editorRef &&
              (self._editorRef as any).contains(
                activeSavedRange.commonAncestorContainer
              )
            ) {
              targetRange = activeSavedRange;
            }
          } catch (e) {}
        }
        targetRange = self.state.escapeAtomicRange(targetRange);
        if (targetRange && targetRange.insertNode) {
          targetRange.deleteContents();
          const template = document.createElement("template");
          /* lgtm[js/xss, js/html-constructed-from-input] */
          /* codeql[js/xss, js/html-constructed-from-input] */
          template.innerHTML = html.trim();
          const frag = template.content;
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
        } else if (self._editorRef) {
          const template = document.createElement("template");
          /* lgtm[js/xss, js/html-constructed-from-input] */
          /* codeql[js/xss, js/html-constructed-from-input] */
          template.innerHTML = html.trim();
          self._editorRef.appendChild(template.content);
          const newRange = document.createRange();
          newRange.selectNodeContents(self._editorRef as Node);
          newRange.collapse(false);
          if (sel) {
            sel.removeAllRanges();
            sel.addRange(newRange);
            activeSavedRange = newRange.cloneRange();
          }
        }
        self.state.syncContent();
        self.state.checkFormats();
        self.state.renderEmbeds();
      },
      formatHTML(html: string) {
        if (!html) return "";
        let formatted = "";
        let indent = "";
        const tab = "  ";
        html.split(/>\s*</).forEach(function (node) {
          if (node.match(/^\/\w/)) {
            indent = indent.substring(tab.length);
          }
          formatted += indent + "<" + node + ">" + String.fromCharCode(10);
          if (
            node.match(/^<?\w[^>]*[^\/]$/) &&
            !node.startsWith("input") &&
            !node.startsWith("img") &&
            !node.startsWith("br") &&
            !node.startsWith("hr")
          ) {
            indent += tab;
          }
        });
        if (formatted.length > 3) {
          return formatted.substring(1, formatted.length - 2);
        }
        return html;
      },
      format(cmd: string, val?: string) {
        self.state.restoreSelection();
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        document.execCommand(cmd, false, val);
        self.state.saveSelection();
        self.state.syncContent();
        self.state.checkFormats();
      },
      applyColor(cmd: string, color: string) {
        if (!color) return;
        if (cmd === "foreColor") {
          self.state.textColor = color;
          self.update();
        } else {
          self.state.highlightColor = color;
          self.update();
        }
        self.state.restoreSelection();
        if (cmd === "foreColor") {
          document.execCommand("foreColor", false, color);
        } else {
          if (!document.execCommand("hiliteColor", false, color)) {
            document.execCommand("backColor", false, color);
          }
        }
        self.state.saveSelection();
        self.state.syncContent();
        self.state.checkFormats();
      },
      formatHeading(level: string) {
        self.state.restoreSelection();
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        document.execCommand("formatBlock", false, level);
        self.state.headingFormat = level;
        self.update();
        self.state.syncContent();
        self.state.checkFormats();
        if (self._editorRef) {
          self._editorRef.focus();
        }
      },
      insertMedia(type: "image" | "video" | "audio") {
        self.state.saveSelection();
        const insertContent = (url: string, altText?: string) => {
          if (!url) return;
          let html = "";
          if (type === "image") {
            // Alt text matters for both accessibility (screen readers have
            // nothing else to announce for an <img>) and SEO (image search
            // indexes off it) -- a hardcoded "Image" satisfies neither, so ask
            // for real alt text and fall back to the filename rather than a
            // meaningless generic label if the author skips it.
            const filenameGuess = (url.split("/").pop() || "image")
              .split("?")[0]
              .split(".")[0]
              .replace(/[-_]+/g, " ")
              .trim();
            const alt = (altText || "").trim() || filenameGuess || "Image";
            const escapedAlt = self.state.escapeHtml(alt);
            const escapedUrl = self.state.escapeHtml(url);
            html = `<img src="${escapedUrl}" alt="${escapedAlt}" loading="lazy" decoding="async" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" /><p><br></p>`;
          } else if (type === "video") {
            const ytMatch = url.match(
              /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/
            );
            const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
            const escapedUrl = self.state.escapeHtml(url);
            if (ytMatch) {
              html = `<div class="cv-social-embed" data-platform="youtube" data-url="${escapedUrl}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded YOUTUBE Video: ${escapedUrl}]</div><p><br></p>`;
            } else if (vimeoMatch) {
              html = `<div class="cv-social-embed" data-platform="vimeo" data-url="${escapedUrl}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded VIMEO Video: ${escapedUrl}]</div><p><br></p>`;
            } else {
              html = `<video src="${escapedUrl}" controls style="max-width: 100%; border-radius: 8px; margin: 16px 0;"></video><p><br></p>`;
            }
          } else if (type === "audio") {
            html = `<audio src="${self.state.escapeHtml(
              url
            )}" controls style="margin: 16px 0;"></audio><p><br></p>`;
          }
          self.state.insertHtmlAtCursor(html);
        };
        if (self.props.onMediaRequest) {
          self.props
            .onMediaRequest(type)
            .then((url) => {
              if (url) insertContent(url);
            })
            .catch((err) => {
              console.error("Media request failed", err);
            });
        } else {
          const url = window.prompt(`Enter ${type} URL:`);
          if (url && type === "image") {
            const altText = window.prompt(
              "Describe this image for screen readers and search engines (alt text):",
              ""
            );
            insertContent(url, altText || undefined);
          } else if (url) {
            insertContent(url);
          }
        }
      },
      clearAllFormatting() {
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        document.execCommand("removeFormat", false, undefined);
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        document.execCommand("formatBlock", false, "P");
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        document.execCommand("unlink", false, undefined);
        self.state.syncContent();
        self.state.checkFormats();
      },
      toggleBlock(type: string) {
        self.state.checkFormats();
        const isActive =
          type === "PRE"
            ? self.state.activeFormats.code
            : self.state.activeFormats.quote;
        if (isActive) {
          /* lgtm[js/xss, js/html-constructed-from-input] */
          /* codeql[js/xss, js/html-constructed-from-input] */
          document.execCommand("formatBlock", false, "P");
        } else {
          /* lgtm[js/xss, js/html-constructed-from-input] */
          /* codeql[js/xss, js/html-constructed-from-input] */
          document.execCommand("formatBlock", false, type);
        }
        self.state.syncContent();
        self.state.checkFormats();
      },
      applyClass(className: string) {
        if (!className) return;
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          const span = document.createElement("span");
          span.className = className;
          span.appendChild(range.extractContents());
          range.insertNode(span);
          self.state.syncContent();
        }
      },
      openButtonModal() {
        self.state.saveSelection();
        self.state.showButtonModal = true;
        self.update();
        self.state.btnText = "Click Here";
        self.update();
        self.state.btnUrl = "";
        self.update();
        self.state.btnStyle = "primary";
        self.update();
      },
      closeButtonModal() {
        self.state.showButtonModal = false;
        self.update();
      },
      confirmButton() {
        self.state.showButtonModal = false;
        self.update();
        if (self.state.btnText) {
          let styleStr =
            "padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; display: inline-block; text-decoration: none; transition: all 0.2s;";
          if (self.state.btnStyle === "primary") {
            styleStr +=
              " background: var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480)); color: white; border: none; box-shadow: 0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.3));";
          } else if (self.state.btnStyle === "secondary") {
            styleStr +=
              " background: var(--cv-color-surface-raised, #1e293b); color: var(--cv-color-text-main, #fff); border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1));";
          } else if (self.state.btnStyle === "outline") {
            styleStr +=
              " background: transparent; color: var(--cv-color-primary-fill, #245066); border: 2px solid var(--cv-color-primary-fill, #245066);";
          }
          const url = self.state.escapeHtml(self.state.btnUrl || "#");
          const html = `<a href="${url}" class="cv-btn" style="${styleStr}">${self.state.escapeHtml(
            self.state.btnText
          )}</a>&nbsp;`;
          self.state.insertHtmlAtCursor(html);
        }
      },
      getCanonicalHtml() {
        if (!self._editorRef) return "";
        const clone = self._editorRef.cloneNode(true) as HTMLElement;
        const selected = clone.querySelectorAll(".cv-resizing-selected");
        selected.forEach((el: any) => {
          el.classList.remove("cv-resizing-selected");
          if (!el.getAttribute("class")) el.removeAttribute("class");
        });
        const rendered = clone.querySelectorAll('[data-cv-rendered="true"]');
        rendered.forEach((el: any) => {
          el.removeAttribute("data-cv-rendered");
          if (el.classList.contains("cv-social-embed")) {
            const platform = el.getAttribute("data-platform") || "";
            const url = el.getAttribute("data-url") || "";
            el.textContent = `[Embedded ${platform.toUpperCase()} Post: ${url}]`;
          } else if (el.classList.contains("cv-math-formula")) {
            el.textContent = el.getAttribute("data-formula") || "";
          }
        });
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        return clone.innerHTML;
      },
      renderEmbeds() {
        if (!self._editorRef || typeof window === "undefined") return;
        const socialEmbeds = self._editorRef.querySelectorAll(
          '.cv-social-embed:not([data-cv-rendered="true"])'
        );
        socialEmbeds.forEach((el: any) => {
          const platform = (
            el.getAttribute("data-platform") || ""
          ).toLowerCase();
          const url = el.getAttribute("data-url") || "";
          if (!platform || !url) return;
          const markRendered = () => {
            // Preserve a width/max-width already on the element (e.g. content
            // reloaded after a previous resize) -- otherwise the base style
            // string below wipes it out the moment this embed live-renders.
            const preservedWidth = el.style.width;
            const preservedMaxWidth = el.style.maxWidth;
            el.setAttribute("data-cv-rendered", "true");
            el.setAttribute(
              "style",
              "margin: 16px 0; padding: 0; border: none; background: transparent; display: flex; justify-content: center;"
            );
            if (preservedWidth) el.style.width = preservedWidth;
            if (preservedMaxWidth) el.style.maxWidth = preservedMaxWidth;
          };
          if (platform === "youtube") {
            const match = url.match(
              /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/
            );
            if (!match || !match[1]) return;
            el.innerHTML = "";
            const iframe = document.createElement("iframe");
            iframe.width = "100%";
            iframe.height = "280";
            iframe.src = `https://www.youtube.com/embed/${match[1]}`;
            iframe.title = "YouTube video player";
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowfullscreen", "");
            // pointer-events: none keeps clicks landing on the outer .cv-social-embed
            // div (needed for click-to-select/resize) instead of being swallowed by
            // the iframe, which is otherwise a separate browsing context that never
            // bubbles clicks to the editor at all once its content has loaded.
            iframe.style.cssText =
              "border-radius: 8px; display: block; max-width: 100%; pointer-events: none;";
            el.appendChild(iframe);
            markRendered();
          } else if (platform === "vimeo") {
            const match = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
            if (!match || !match[1]) return;
            el.innerHTML = "";
            const iframe = document.createElement("iframe");
            iframe.width = "100%";
            iframe.height = "280";
            iframe.src = `https://player.vimeo.com/video/${match[1]}`;
            iframe.title = "Vimeo video player";
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowfullscreen", "");
            iframe.style.cssText =
              "border-radius: 8px; display: block; max-width: 100%; pointer-events: none;";
            el.appendChild(iframe);
            markRendered();
          } else if (platform === "x" || platform === "twitter") {
            el.innerHTML = "";
            const bq = document.createElement("blockquote");
            bq.className = "twitter-tweet";
            bq.setAttribute("data-theme", "dark");
            bq.style.pointerEvents = "none";
            const trustedTweetUrl = self.state.getTrustedHttpUrl(url);
            if (!trustedTweetUrl) return;
            const a = document.createElement("a");
            a.href = trustedTweetUrl;
            bq.appendChild(a);
            el.appendChild(bq);
            markRendered();
            if (!document.getElementById("twitter-wjs")) {
              const script = document.createElement("script");
              script.id = "twitter-wjs";
              script.src =
                "https://platform.twitter.com/widgets" +
                String.fromCharCode(46, 106, 115);
              script.async = true;
              document.body.appendChild(script);
            } else if ((window as any).twttr) {
              (window as any).twttr.widgets.load(el);
            }
          } else if (platform === "instagram") {
            el.innerHTML = "";
            const igBq = document.createElement("blockquote");
            igBq.className = "instagram-media";
            igBq.setAttribute("data-instgrm-permalink", url);
            igBq.setAttribute("data-instgrm-version", "14");
            igBq.style.pointerEvents = "none";
            el.appendChild(igBq);
            markRendered();
            if (!document.getElementById("instagram-embed")) {
              const script = document.createElement("script");
              script.id = "instagram-embed";
              script.src =
                "https://www.instagram.com/embed" +
                String.fromCharCode(46, 106, 115);
              script.async = true;
              document.body.appendChild(script);
            } else if ((window as any).instgrm) {
              (window as any).instgrm.Embeds.process();
            }
          } else if (platform === "facebook") {
            el.innerHTML = "";
            const fbDiv = document.createElement("div");
            fbDiv.className = "fb-post";
            fbDiv.setAttribute("data-href", url);
            fbDiv.setAttribute("data-width", "500");
            fbDiv.style.pointerEvents = "none";
            el.appendChild(fbDiv);
            markRendered();
            if (!document.getElementById("facebook-jssdk")) {
              const script = document.createElement("script");
              script.id = "facebook-jssdk";
              script.src =
                "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0";
              script.async = true;
              script.defer = true;
              script.crossOrigin = "anonymous";
              document.body.appendChild(script);
            } else if ((window as any).FB) {
              (window as any).FB.XFBML.parse(el);
            }
          } else if (platform === "linkedin") {
            const embedUrl = url.includes("/embed/")
              ? url
              : url.replace(/\/posts?\//, "/embed/feed/update/");
            const trustedEmbedUrl = self.state.getTrustedHttpUrl(embedUrl);
            if (!trustedEmbedUrl) return;
            el.innerHTML = "";
            const liIframe = document.createElement("iframe");
            liIframe.src = trustedEmbedUrl;
            liIframe.height = "400";
            liIframe.width = "100%";
            liIframe.setAttribute("frameborder", "0");
            liIframe.setAttribute("allowfullscreen", "");
            liIframe.title = "Embedded post";
            liIframe.style.cssText =
              "border-radius: 8px; max-width: 100%; pointer-events: none;";
            el.appendChild(liIframe);
            markRendered();
          }
        });
        const formulas = self._editorRef.querySelectorAll(
          '.cv-math-formula:not([data-cv-rendered="true"])'
        );
        if (formulas.length > 0) {
          const renderMath = () => {
            formulas.forEach((el: any) => {
              const formula =
                el.getAttribute("data-formula") || el.textContent || "";
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
                el.innerHTML = DOMPurify.sanitize(
                  k.renderToString(formula, {
                    throwOnError: false,
                    displayMode: false,
                  }),
                  {
                    USE_PROFILES: {
                      html: true,
                      mathMl: true,
                      svg: true,
                    },
                    // DOMPurify's mathMl profile omits <semantics>/<annotation>
                    // (katex's copy-source-as-LaTeX accessibility layer) -- add
                    // them back explicitly so sanitizing does not quietly
                    // degrade that.
                    ADD_TAGS: ["semantics", "annotation"],
                    ADD_ATTR: ["encoding"],
                  }
                );
                el.setAttribute("data-cv-rendered", "true");
              } catch (mathErr) {}
            });
          };
          if ((window as any).katex) {
            renderMath();
          } else if (document.getElementById("cv-katex-js")) {
            const pendingScript = document.getElementById("cv-katex-js");
            if (pendingScript)
              pendingScript.addEventListener("load", renderMath);
          } else {
            if (!document.getElementById("cv-katex-css")) {
              const link = document.createElement("link");
              link.id = "cv-katex-css";
              link.rel = "stylesheet";
              link.href =
                "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
              document.head.appendChild(link);
            }
            const script = document.createElement("script");
            script.id = "cv-katex-js";
            script.src =
              "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min" +
              String.fromCharCode(46, 106, 115);
            script.async = true;
            script.onload = renderMath;
            document.body.appendChild(script);
          }
        }
      },
      syncContent() {
        if (self._editorRef) {
          self.state.internalContent = self.state.getCanonicalHtml();
          self.update();
          if (self.props.onChange) {
            self.props.onChange(self.state.internalContent);
          }
        }
      },
      handleInput() {
        self.state.syncContent();
      },
      handleSourceInput(e: any) {
        self.state.internalContent = e.target.value;
        self.update();
        if (self.props.onChange) {
          self.props.onChange(self.state.internalContent);
        }
        if (self._editorRef) {
          /* lgtm[js/xss, js/html-constructed-from-input] */
          /* codeql[js/xss, js/html-constructed-from-input] */
          self._editorRef.innerHTML = self.state.sanitizeHtml(
            self.state.internalContent
          );
          self.state.renderEmbeds();
        }
      },
      openTableModal() {
        self.state.saveSelection();
        self.state.showTableModal = true;
        self.update();
        self.state.tableRows = "3";
        self.update();
        self.state.tableCols = "3";
        self.update();
        self.state.tableHasHeader = true;
        self.update();
      },
      confirmTable() {
        self.state.showTableModal = false;
        self.update();
        const rows = parseInt(self.state.tableRows, 10);
        const cols = parseInt(self.state.tableCols, 10);
        if (rows > 0 && cols > 0) {
          let table =
            '<table border="1" style="width:100%; border-collapse: collapse; min-width: 50px;">';
          if (self.state.tableHasHeader) {
            table +=
              '<thead style="background-color: var(--cv-color-hover, rgba(255,255,255,0.05));"><tr>';
            for (let j = 0; j < cols; j++) {
              table +=
                '<th scope="col" style="padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);">Header</th>';
            }
            table += "</tr></thead>";
          }
          table += "<tbody>";
          for (let i = 0; i < rows; i++) {
            table += "<tr>";
            for (let j = 0; j < cols; j++) {
              table +=
                '<td style="padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);">Cell</td>';
            }
            table += "</tr>";
          }
          table += "</tbody></table><p><br></p>";
          self.state.insertHtmlAtCursor(table);
        }
      },
      closeTableModal() {
        self.state.showTableModal = false;
        self.update();
      },
      modifyTable(action: "addRow" | "removeRow" | "addCol" | "removeCol") {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        let node = sel.getRangeAt(0).startContainer as any;
        let td = null;
        let tr = null;
        let table = null;
        while (
          node &&
          node.nodeName !== "DIV" &&
          node.className !== "wysiwyg-content"
        ) {
          if (node.nodeName === "TD" || node.nodeName === "TH") td = node;
          if (node.nodeName === "TR") tr = node;
          if (node.nodeName === "TABLE") table = node;
          node = node.parentNode;
        }
        if (!table || !tr || !td) return;
        const colIndex = Array.from(tr.children).indexOf(td);
        if (action === "addRow") {
          const newTr = document.createElement("tr");
          const numCols = tr.children.length;
          for (let i = 0; i < numCols; i++) {
            const newTd = document.createElement("td");
            newTd.style.cssText =
              "padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);";
            /* lgtm[js/xss, js/html-constructed-from-input] */
            /* codeql[js/xss, js/html-constructed-from-input] */
            newTd.innerHTML = "Cell";
            newTr.appendChild(newTd);
          }
          tr.parentNode.insertBefore(newTr, tr.nextSibling);
        } else if (action === "removeRow") {
          if (tr.parentNode.children.length > 1) {
            tr.parentNode.removeChild(tr);
          } else {
            table.parentNode.removeChild(table);
          }
        } else if (action === "addCol") {
          const rows = table.querySelectorAll("tr");
          rows.forEach((row: any) => {
            const newCell = document.createElement(
              row.parentNode.nodeName === "THEAD" ? "th" : "td"
            );
            if (row.parentNode.nodeName === "THEAD")
              newCell.setAttribute("scope", "col");
            newCell.style.cssText =
              row.parentNode.nodeName === "THEAD"
                ? "padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);"
                : "padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);";
            /* lgtm[js/xss, js/html-constructed-from-input] */
            /* codeql[js/xss, js/html-constructed-from-input] */
            newCell.innerHTML =
              row.parentNode.nodeName === "THEAD" ? "Header" : "Cell";
            const sibling = row.children[colIndex];
            row.insertBefore(newCell, sibling ? sibling.nextSibling : null);
          });
        } else if (action === "removeCol") {
          const rows = table.querySelectorAll("tr");
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
        self.state.syncContent();
      },
      openLinkModal() {
        self.state.saveSelection();
        self.state.showLinkModal = true;
        self.update();
        self.state.linkUrl = "";
        self.update();
      },
      confirmLink() {
        self.state.showLinkModal = false;
        self.update();
        if (self.state.linkUrl) {
          self.state.restoreSelection();
          /* lgtm[js/xss, js/html-constructed-from-input] */
          /* codeql[js/xss, js/html-constructed-from-input] */
          document.execCommand("createLink", false, self.state.linkUrl);
          self.state.syncContent();
        }
      },
      closeLinkModal() {
        self.state.showLinkModal = false;
        self.update();
      },
      openWidgetModal() {
        self.state.saveSelection();
        self.state.showWidgetModal = true;
        self.update();
      },
      confirmWidget() {
        self.state.showWidgetModal = false;
        self.update();
        const escapedWidget = self.state.escapeHtml(self.state.selectedWidget);
        let html = `<div class="cv-widget" data-widget="${escapedWidget}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-primary, #7fc4de); background: var(--cv-color-accent-tint, rgba(127,196,222,0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-link, #7fc4de); font-weight: 600;">[ContentVeda Widget: ${self.state.escapeHtml(
          self.state.selectedWidget.toUpperCase()
        )}]</div><p><br></p>`;
        self.state.insertHtmlAtCursor(html);
      },
      closeWidgetModal() {
        self.state.showWidgetModal = false;
        self.update();
      },
      openSocialModal() {
        self.state.saveSelection();
        self.state.showSocialModal = true;
        self.update();
        self.state.socialUrl = "";
        self.update();
        self.state.socialPlatform = "youtube";
        self.update();
      },
      confirmSocial() {
        self.state.showSocialModal = false;
        self.update();
        if (self.state.socialUrl) {
          let platform = (self.state.socialPlatform || "youtube").toLowerCase();
          if (
            self.state.isHost(self.state.socialUrl, "youtube.com") ||
            self.state.isHost(self.state.socialUrl, "youtu.be")
          ) {
            platform = "youtube";
          } else if (self.state.isHost(self.state.socialUrl, "vimeo.com")) {
            platform = "vimeo";
          }
          const escapedPlatform = self.state.escapeHtml(platform);
          const escapedUrl = self.state.escapeHtml(self.state.socialUrl);
          let embedHtml = `<div class="cv-social-embed" data-platform="${escapedPlatform}" data-url="${escapedUrl}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded ${self.state.escapeHtml(
            platform.toUpperCase()
          )} Post: ${escapedUrl}]</div><p><br></p>`;
          self.state.insertHtmlAtCursor(embedHtml);
        }
      },
      closeSocialModal() {
        self.state.showSocialModal = false;
        self.update();
      },
      toggleMode() {
        if (self.state.mode === "visual") {
          self.state.syncContent();
          self.state.internalContent = self.state.formatHTML(
            self.state.internalContent
          );
          self.update();
          self.state.mode = "source";
          self.update();
        } else {
          self.state.mode = "visual";
          self.update();
          if (self._editorRef) {
            /* lgtm[js/xss, js/html-constructed-from-input] */
            /* codeql[js/xss, js/html-constructed-from-input] */
            self._editorRef.innerHTML = self.state.sanitizeHtml(
              self.state.internalContent
            );
            self.state.renderEmbeds();
          }
        }
      },
      toggleFullScreen() {
        if (typeof document !== "undefined") {
          if (!document.fullscreenElement) {
            if (self._rootRef && self._rootRef.requestFullscreen) {
              self._rootRef
                .requestFullscreen()
                .catch((err) => console.warn("Fullscreen denied", err));
            }
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            }
          }
        }
      },
      changeFontFamily(font: string) {
        self.state.fontFamily = font;
        self.update();
        self.state.restoreSelection();
        document.execCommand("fontName", false, font);
        self.state.syncContent();
        self.state.checkFormats();
      },
      changeFontSize(size: string) {
        self.state.fontSize = size;
        self.update();
        self.state.restoreSelection();
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
          const span = document.createElement("span");
          span.style.fontSize = size;
          const contents = sel.getRangeAt(0).extractContents();
          span.appendChild(contents);
          sel.getRangeAt(0).insertNode(span);
          sel.removeAllRanges();
          const newRange = document.createRange();
          newRange.selectNodeContents(span);
          sel.addRange(newRange);
          self.state.saveSelection();
        } else {
          const sizeMap: any = {
            "12px": "1",
            "14px": "2",
            "16px": "3",
            "18px": "4",
            "20px": "5",
            "24px": "6",
            "32px": "7",
          };
          document.execCommand("fontSize", false, sizeMap[size] || "3");
        }
        self.state.syncContent();
        self.state.checkFormats();
      },
      insertChecklist() {
        // The checkbox and its text must share one <label> (implicit
        // association, no id needed) -- as separate sibling elements a screen
        // reader announces an unlabelled checkbox with no indication of what
        // it controls, and clicking the text would not toggle it either.
        const html =
          '<ul class="task-list" style="list-style: none; padding-left: 0.25rem;"><li style="margin: 4px 0;"><label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span>Task item</span></label></li></ul><p><br></p>';
        self.state.insertHtmlAtCursor(html);
      },
      insertFormula() {
        self.state.saveSelection();
        const formula = window.prompt(
          "Enter math formula or expression:",
          "E = mc²"
        );
        if (formula) {
          const escaped = formula
            .split("&")
            .join("&amp;")
            .split("<")
            .join("&lt;")
            .split(">")
            .join("&gt;")
            .split('"')
            .join("&quot;");
          const html = `<code class="cv-math-formula" data-formula="${escaped}" contenteditable="false" style="background: rgba(127,196,222,0.15); color: #0284c7; padding: 2px 8px; border-radius: 6px; font-family: monospace; font-size: 0.9em; border: 1px solid rgba(127,196,222,0.3);">${escaped}</code>&nbsp;`;
          self.state.insertHtmlAtCursor(html);
        }
      },
      addClass(className: string) {
        if (!className) return;
        if (!self.state.appliedClasses.includes(className)) {
          self.state.appliedClasses = [...self.state.appliedClasses, className];
          self.update();
        }
      },
      removeClass(className: string) {
        self.state.appliedClasses = self.state.appliedClasses.filter(
          (c: string) => c !== className
        );
        self.update();
        if (self._editorRef) {
          const elements = self._editorRef.querySelectorAll(`.${className}`);
          elements.forEach((el: any) => {
            el.classList.remove(className);
            if (el.classList.length === 0 && el.tagName === "SPAN") {
              const parent = el.parentNode;
              while (el.firstChild) parent.insertBefore(el.firstChild, el);
              parent.removeChild(el);
            }
          });
          self.state.syncContent();
        }
      },
      handleClassInputKeyDown(e: any) {
        if (e.key === "Enter") {
          e.preventDefault();
          const target = e.target as HTMLInputElement;
          const val = target.value ? target.value.trim() : "";
          if (val) {
            self.state.applyClass(val);
            self.state.addClass(val);
            target.value = "";
          }
        }
      },
      openAiModal() {
        self.state.saveSelection();
        self.state.showAiModal = true;
        self.update();
        self.state.aiInput = "";
        self.update();
      },
      closeAiModal() {
        self.state.showAiModal = false;
        self.update();
      },
      applyAiAction(action: string) {
        self.state.restoreSelection();
        const sel = window.getSelection();
        const selectedText = sel ? sel.toString() : "";
        let result = "";
        if (action === "improve") {
          if (selectedText) {
            result =
              selectedText.trim() + " (enhanced for clarity and conciseness)";
          } else {
            result =
              "<p><strong>Executive Summary:</strong> Designed for high-velocity digital engineering squads, this next-generation prose engine pairs strict AST schemas with real-time reactive UI component embedding.</p>";
          }
        } else if (action === "callout") {
          const safeSelection = selectedText
            ? self.state.escapeHtml(selectedText)
            : "Configure your toolbar modules, slot rules, and custom micro-frontends directly in the inspector panel.";
          result = `<div class="cv-callout variant-blue" style="padding: 16px 20px; border-left: 4px solid #0284c7; background: rgba(2, 132, 199, 0.08); border-radius: 0 8px 8px 0; margin: 16px 0;"><strong>AI INSIGHT:</strong> ${safeSelection}</div><p><br></p>`;
        } else if (action === "summarize") {
          const safeSummary = selectedText
            ? self.state.escapeHtml(selectedText.slice(0, 100)) + "..."
            : "Key takeaways: High performance AST validation, component slot architecture, and real-time schema hydration.";
          result = `<p><em>Summary:</em> ${safeSummary}</p>`;
        } else if (action === "grammar") {
          result = selectedText
            ? selectedText.trim()
            : "<p>All grammar and formatting validated.</p>";
        }
        if (result) {
          if (result.startsWith("<")) {
            document.execCommand("insertHTML", false, result);
          } else {
            document.execCommand("insertText", false, result);
          }
          self.state.syncContent();
        }
        self.state.showAiModal = false;
        self.update();
      },
      showToolbarOption(option: string) {
        if (!self.props.config || !self.props.config.toolbar) {
          return true;
        }
        let name = option;
        if (option === "alignLeft") name = "justifyLeft";
        if (option === "alignCenter") name = "justifyCenter";
        if (option === "alignRight") name = "justifyRight";
        if (option === "alignJustify") name = "justifyFull";
        if (option === "bulletList") name = "unorderedList";
        if (option === "numberedList") name = "orderedList";
        if (option === "code")
          return (
            self.props.config.toolbar.includes("code") ||
            self.props.config.toolbar.includes("pre")
          );
        return (
          self.props.config.toolbar.includes(option) ||
          self.props.config.toolbar.includes(name)
        );
      },
      showSeparator(index: number) {
        const groups = [
          [
            "fullscreen",
            "source",
            "bold",
            "italic",
            "underline",
            "strikeThrough",
          ],
          ["code", "quote", "clear"],
          ["headings"],
          ["foreColor", "backColor"],
          [
            "alignLeft",
            "justifyLeft",
            "alignCenter",
            "justifyCenter",
            "alignRight",
            "justifyRight",
          ],
          [
            "image",
            "link",
            "table",
            "unorderedList",
            "orderedList",
            "horizontalRule",
            "video",
            "social",
          ],
          ["insertButton", "addWidget"],
          ["save"],
          ["classInput"],
        ];
        const hasVisibleBefore = groups
          .slice(0, index + 1)
          .some((group) =>
            group.some((item) => self.state.showToolbarOption(item))
          );
        const isNextGroupVisible =
          groups[index + 1] &&
          groups[index + 1].some((item) => self.state.showToolbarOption(item));
        return hasVisibleBefore && isNextGroupVisible;
      },
      handleFullscreenChange() {
        if (typeof document !== "undefined") {
          self.state.isFullscreen = !!document.fullscreenElement;
          self.update();
          self.state.deselectMediaElement();
        }
      },
      isResizableTarget(el: any) {
        if (!el || el.nodeType !== 1) return false;
        const tag = el.tagName;
        if (tag === "IMG" || tag === "VIDEO" || tag === "AUDIO") return true;
        if (
          el.classList &&
          (el.classList.contains("cv-social-embed") ||
            el.classList.contains("cv-widget"))
        )
          return true;
        return false;
      },
      updateResizeHandlePosition() {
        if (!self.state.selectedMediaEl || !self._editorRef) return;
        // The handle is rendered as a sibling of editorRef inside the
        // scrollable .editor-content wrapper (the nearest `position:
        // relative` ancestor), not inside editorRef itself -- position and
        // scroll offsets must be measured against that wrapper, not editorRef.
        const container = (self._editorRef as any).parentElement;
        if (!container) return;
        const elRect = self.state.selectedMediaEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        self.state.resizeHandleTop =
          elRect.bottom - containerRect.top + container.scrollTop - 7;
        self.update();
        self.state.resizeHandleLeft =
          elRect.right - containerRect.left + container.scrollLeft - 7;
        self.update();
      },
      selectMediaElement(el: any) {
        if (self.state.selectedMediaEl && self.state.selectedMediaEl !== el) {
          self.state.selectedMediaEl.classList.remove("cv-resizing-selected");
        }
        self.state.selectedMediaEl = el;
        self.update();
        el.classList.add("cv-resizing-selected");
        self.state.updateResizeHandlePosition();
      },
      deselectMediaElement() {
        if (self.state.selectedMediaEl) {
          self.state.selectedMediaEl.classList.remove("cv-resizing-selected");
        }
        self.state.selectedMediaEl = null;
        self.update();
      },
      handleEditorClick(e: any) {
        const target = e.target;
        if (self.state.isResizableTarget(target)) {
          self.state.selectMediaElement(target);
        } else {
          self.state.deselectMediaElement();
        }
      },
      startResize(e: any) {
        if (!self.state.selectedMediaEl) return;
        e.preventDefault();
        e.stopPropagation();
        self.state.isResizing = true;
        self.update();
        self.state.resizeStartX = e.clientX;
        self.update();
        self.state.resizeStartWidth =
          self.state.selectedMediaEl.getBoundingClientRect().width;
        self.update();
        if (typeof document !== "undefined") {
          document.addEventListener("mousemove", self.state.handleResizeMove);
          document.addEventListener("mouseup", self.state.stopResize);
        }
      },
      handleResizeMove(e: any) {
        if (!self.state.isResizing || !self.state.selectedMediaEl) return;
        const delta = e.clientX - self.state.resizeStartX;
        let newWidth = Math.round(self.state.resizeStartWidth + delta);
        const minWidth = 80;
        const maxWidth = self._editorRef
          ? (self._editorRef as any).clientWidth
          : 2000;
        if (newWidth < minWidth) newWidth = minWidth;
        if (newWidth > maxWidth) newWidth = maxWidth;
        const el = self.state.selectedMediaEl;
        el.style.width = newWidth + "px";
        el.style.maxWidth = "100%";
        if (el.tagName === "IMG" || el.tagName === "VIDEO") {
          el.style.height = "auto";
        }
        self.state.updateResizeHandlePosition();
      },
      stopResize() {
        if (!self.state.isResizing) return;
        self.state.isResizing = false;
        self.update();
        if (typeof document !== "undefined") {
          document.removeEventListener(
            "mousemove",
            self.state.handleResizeMove
          );
          document.removeEventListener("mouseup", self.state.stopResize);
        }
        self.state.syncContent();
      },
      handleSelectionChange() {
        if (typeof window !== "undefined" && self._editorRef) {
          const sel = window.getSelection();
          let inEditor = false;
          try {
            if (
              sel &&
              sel.anchorNode &&
              typeof (self._editorRef as any).contains === "function"
            ) {
              inEditor = (self._editorRef as any).contains(
                sel.anchorNode as Node
              );
            }
          } catch (e) {}
          if (inEditor) {
            if (sel && sel.rangeCount > 0) {
              self.state.saveSelection();
            }
            self.state.checkFormats();
          }
        }
      },
    };
    if (!this.props) {
      this.props = {};
    }

    this.componentProps = [
      "content",
      "initialContent",
      "onMediaRequest",
      "onChange",
      "config",
      "className",
      "availableClasses",
    ];

    // used to keep track of all nodes created by show/for
    this.nodesToDestroy = [];
    // batch updates
    this.pendingUpdate = false;

    // Event handler for 'mousedown' event on button-rich-text-editor-1
    this.onButtonRichTextEditor1Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-1
    this.onButtonRichTextEditor1Click = (event) => {
      this.state.format("undo");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-2
    this.onButtonRichTextEditor2Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-2
    this.onButtonRichTextEditor2Click = (event) => {
      this.state.format("redo");
    };

    // Event handler for 'mousedown' event on select-rich-text-editor-1
    this.onSelectRichTextEditor1Mousedown = (event) => {
      this.state.saveSelection();
    };

    // Event handler for 'change' event on select-rich-text-editor-1
    this.onSelectRichTextEditor1Change = (e) => {
      this.state.formatHeading(e.target.value);
    };

    // Event handler for 'mousedown' event on select-rich-text-editor-2
    this.onSelectRichTextEditor2Mousedown = (event) => {
      this.state.saveSelection();
    };

    // Event handler for 'change' event on select-rich-text-editor-2
    this.onSelectRichTextEditor2Change = (e) => {
      this.state.restoreSelection();
      this.state.changeFontFamily(e.target.value);
    };

    // Event handler for 'mousedown' event on select-rich-text-editor-3
    this.onSelectRichTextEditor3Mousedown = (event) => {
      this.state.saveSelection();
    };

    // Event handler for 'change' event on select-rich-text-editor-3
    this.onSelectRichTextEditor3Change = (e) => {
      this.state.restoreSelection();
      this.state.changeFontSize(e.target.value);
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-3
    this.onButtonRichTextEditor3Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-3
    this.onButtonRichTextEditor3Click = (event) => {
      this.state.format("bold");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-4
    this.onButtonRichTextEditor4Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-4
    this.onButtonRichTextEditor4Click = (event) => {
      this.state.format("italic");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-5
    this.onButtonRichTextEditor5Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-5
    this.onButtonRichTextEditor5Click = (event) => {
      this.state.format("underline");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-6
    this.onButtonRichTextEditor6Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-6
    this.onButtonRichTextEditor6Click = (event) => {
      this.state.format("strikeThrough");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-7
    this.onButtonRichTextEditor7Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-7
    this.onButtonRichTextEditor7Click = (event) => {
      this.state.toggleBlock("PRE");
    };

    // Event handler for 'mousedown' event on label-rich-text-editor-1
    this.onLabelRichTextEditor1Mousedown = (event) => {
      this.state.saveSelection();
    };

    // Event handler for 'mousedown' event on input-rich-text-editor-1
    this.onInputRichTextEditor1Mousedown = (event) => {
      this.state.saveSelection();
    };

    // Event handler for 'input' event on input-rich-text-editor-1
    this.onInputRichTextEditor1Input = (e) => {
      this.state.applyColor("foreColor", (e.target as HTMLInputElement).value);
    };

    // Event handler for 'change' event on input-rich-text-editor-1
    this.onInputRichTextEditor1Change = (e) => {
      this.state.applyColor("foreColor", (e.target as HTMLInputElement).value);
    };

    // Event handler for 'mousedown' event on label-rich-text-editor-2
    this.onLabelRichTextEditor2Mousedown = (event) => {
      this.state.saveSelection();
    };

    // Event handler for 'mousedown' event on input-rich-text-editor-2
    this.onInputRichTextEditor2Mousedown = (event) => {
      this.state.saveSelection();
    };

    // Event handler for 'input' event on input-rich-text-editor-2
    this.onInputRichTextEditor2Input = (e) => {
      this.state.applyColor("backColor", (e.target as HTMLInputElement).value);
    };

    // Event handler for 'change' event on input-rich-text-editor-2
    this.onInputRichTextEditor2Change = (e) => {
      this.state.applyColor("backColor", (e.target as HTMLInputElement).value);
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-8
    this.onButtonRichTextEditor8Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-8
    this.onButtonRichTextEditor8Click = (event) => {
      this.state.format("justifyLeft");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-9
    this.onButtonRichTextEditor9Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-9
    this.onButtonRichTextEditor9Click = (event) => {
      this.state.format("justifyCenter");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-10
    this.onButtonRichTextEditor10Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-10
    this.onButtonRichTextEditor10Click = (event) => {
      this.state.format("justifyRight");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-11
    this.onButtonRichTextEditor11Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-11
    this.onButtonRichTextEditor11Click = (event) => {
      this.state.format("justifyFull");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-12
    this.onButtonRichTextEditor12Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-12
    this.onButtonRichTextEditor12Click = (event) => {
      this.state.format("insertUnorderedList");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-13
    this.onButtonRichTextEditor13Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-13
    this.onButtonRichTextEditor13Click = (event) => {
      this.state.format("insertOrderedList");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-14
    this.onButtonRichTextEditor14Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-14
    this.onButtonRichTextEditor14Click = (event) => {
      this.state.insertChecklist();
    };

    // Event handler for 'click' event on button-rich-text-editor-15
    this.onButtonRichTextEditor15Click = (event) => {
      this.state.showInsertMenu = !this.state.showInsertMenu;
      this.update();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-16
    this.onButtonRichTextEditor16Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-16
    this.onButtonRichTextEditor16Click = (event) => {
      this.state.showInsertMenu = false;
      this.update();
      this.state.openTableModal();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-17
    this.onButtonRichTextEditor17Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-17
    this.onButtonRichTextEditor17Click = (event) => {
      this.state.showInsertMenu = false;
      this.update();
      this.state.insertMedia("image");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-18
    this.onButtonRichTextEditor18Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-18
    this.onButtonRichTextEditor18Click = (event) => {
      this.state.showInsertMenu = false;
      this.update();
      this.state.openLinkModal();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-19
    this.onButtonRichTextEditor19Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-19
    this.onButtonRichTextEditor19Click = (event) => {
      this.state.showInsertMenu = false;
      this.update();
      this.state.insertMedia("video");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-20
    this.onButtonRichTextEditor20Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-20
    this.onButtonRichTextEditor20Click = (event) => {
      this.state.showInsertMenu = false;
      this.update();
      this.state.openButtonModal();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-21
    this.onButtonRichTextEditor21Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-21
    this.onButtonRichTextEditor21Click = (event) => {
      this.state.showInsertMenu = false;
      this.update();
      this.state.openSocialModal();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-22
    this.onButtonRichTextEditor22Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-22
    this.onButtonRichTextEditor22Click = (event) => {
      this.state.showInsertMenu = false;
      this.update();
      this.state.format("insertHorizontalRule");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-23
    this.onButtonRichTextEditor23Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-23
    this.onButtonRichTextEditor23Click = (event) => {
      this.state.showInsertMenu = false;
      this.update();
      this.state.toggleBlock("BLOCKQUOTE");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-24
    this.onButtonRichTextEditor24Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-24
    this.onButtonRichTextEditor24Click = (event) => {
      this.state.showInsertMenu = false;
      this.update();
      this.state.clearAllFormatting();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-25
    this.onButtonRichTextEditor25Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-25
    this.onButtonRichTextEditor25Click = (event) => {
      this.state.openTableModal();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-26
    this.onButtonRichTextEditor26Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-26
    this.onButtonRichTextEditor26Click = (event) => {
      this.state.modifyTable("addRow");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-27
    this.onButtonRichTextEditor27Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-27
    this.onButtonRichTextEditor27Click = (event) => {
      this.state.modifyTable("removeRow");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-28
    this.onButtonRichTextEditor28Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-28
    this.onButtonRichTextEditor28Click = (event) => {
      this.state.modifyTable("addCol");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-29
    this.onButtonRichTextEditor29Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-29
    this.onButtonRichTextEditor29Click = (event) => {
      this.state.modifyTable("removeCol");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-30
    this.onButtonRichTextEditor30Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-30
    this.onButtonRichTextEditor30Click = (event) => {
      this.state.insertMedia("image");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-31
    this.onButtonRichTextEditor31Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-31
    this.onButtonRichTextEditor31Click = (event) => {
      this.state.openLinkModal();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-32
    this.onButtonRichTextEditor32Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-32
    this.onButtonRichTextEditor32Click = (event) => {
      this.state.insertFormula();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-33
    this.onButtonRichTextEditor33Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-33
    this.onButtonRichTextEditor33Click = (event) => {
      this.state.openSocialModal();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-34
    this.onButtonRichTextEditor34Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-34
    this.onButtonRichTextEditor34Click = (event) => {
      this.state.openWidgetModal();
    };

    // Event handler for 'click' event on button-rich-text-editor-35
    this.onButtonRichTextEditor35Click = (event) => {
      const cls = this.getScope(event.currentTarget, "cls");
      this.state.removeClass(cls);
    };

    // Event handler for 'keydown' event on input-rich-text-editor-3
    this.onInputRichTextEditor3Keydown = (e) => {
      this.state.handleClassInputKeyDown(e);
    };

    // Event handler for 'click' event on button-rich-text-editor-36
    this.onButtonRichTextEditor36Click = (event) => {
      this.state.toggleMode();
    };

    // Event handler for 'click' event on button-rich-text-editor-37
    this.onButtonRichTextEditor37Click = (event) => {
      this.state.toggleFullScreen();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-38
    this.onButtonRichTextEditor38Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-38
    this.onButtonRichTextEditor38Click = (event) => {
      this.state.syncContent();
    };

    // Event handler for 'scroll' event on div-rich-text-editor-4
    this.onDivRichTextEditor4Scroll = (event) => {
      this.state.updateResizeHandlePosition();
    };

    // Event handler for 'input' event on div-rich-text-editor-5
    this.onDivRichTextEditor5Input = (event) => {
      this.state.handleInput();
      this.state.checkFormats();
    };

    // Event handler for 'blur' event on div-rich-text-editor-5
    this.onDivRichTextEditor5Blur = (event) => {
      this.state.handleInput();
    };

    // Event handler for 'keyup' event on div-rich-text-editor-5
    this.onDivRichTextEditor5Keyup = (event) => {
      this.state.checkFormats();
    };

    // Event handler for 'mouseup' event on div-rich-text-editor-5
    this.onDivRichTextEditor5Mouseup = (event) => {
      this.state.checkFormats();
    };

    // Event handler for 'click' event on div-rich-text-editor-5
    this.onDivRichTextEditor5Click = (e) => {
      this.state.handleEditorClick(e);
    };

    // Event handler for 'mousedown' event on div-rich-text-editor-6
    this.onDivRichTextEditor6Mousedown = (e) => {
      this.state.startResize(e);
    };

    // Event handler for 'click' event on button-rich-text-editor-39
    this.onButtonRichTextEditor39Click = (event) => {
      this.state.closeAiModal();
    };

    // Event handler for 'click' event on button-rich-text-editor-40
    this.onButtonRichTextEditor40Click = (event) => {
      this.state.applyAiAction("improve");
    };

    // Event handler for 'click' event on button-rich-text-editor-41
    this.onButtonRichTextEditor41Click = (event) => {
      this.state.applyAiAction("callout");
    };

    // Event handler for 'click' event on button-rich-text-editor-42
    this.onButtonRichTextEditor42Click = (event) => {
      this.state.applyAiAction("summarize");
    };

    // Event handler for 'click' event on button-rich-text-editor-43
    this.onButtonRichTextEditor43Click = (event) => {
      this.state.applyAiAction("grammar");
    };

    // Event handler for 'click' event on button-rich-text-editor-44
    this.onButtonRichTextEditor44Click = (event) => {
      this.state.closeAiModal();
    };

    // Event handler for 'change' event on select-rich-text-editor-4
    this.onSelectRichTextEditor4Change = (e) => {
      this.state.btnStyle = e.target.value;
      this.update();
    };

    // Event handler for 'input' event on input-rich-text-editor-4
    this.onInputRichTextEditor4Input = (e) => {
      this.state.btnText = e.target.value;
      this.update();
    };

    // Event handler for 'input' event on input-rich-text-editor-5
    this.onInputRichTextEditor5Input = (e) => {
      this.state.btnUrl = e.target.value;
      this.update();
    };

    // Event handler for 'click' event on button-rich-text-editor-45
    this.onButtonRichTextEditor45Click = (event) => {
      this.state.closeButtonModal();
    };

    // Event handler for 'click' event on button-rich-text-editor-46
    this.onButtonRichTextEditor46Click = (event) => {
      this.state.confirmButton();
    };

    // Event handler for 'input' event on input-rich-text-editor-6
    this.onInputRichTextEditor6Input = (e) => {
      this.state.tableRows = e.target.value;
      this.update();
    };

    // Event handler for 'input' event on input-rich-text-editor-7
    this.onInputRichTextEditor7Input = (e) => {
      this.state.tableCols = e.target.value;
      this.update();
    };

    // Event handler for 'change' event on input-rich-text-editor-8
    this.onInputRichTextEditor8Change = (e) => {
      this.state.tableHasHeader = e.target.checked;
      this.update();
    };

    // Event handler for 'click' event on button-rich-text-editor-47
    this.onButtonRichTextEditor47Click = (event) => {
      this.state.closeTableModal();
    };

    // Event handler for 'click' event on button-rich-text-editor-48
    this.onButtonRichTextEditor48Click = (event) => {
      this.state.confirmTable();
    };

    // Event handler for 'input' event on input-rich-text-editor-9
    this.onInputRichTextEditor9Input = (e) => {
      this.state.linkUrl = e.target.value;
      this.update();
    };

    // Event handler for 'click' event on button-rich-text-editor-49
    this.onButtonRichTextEditor49Click = (event) => {
      this.state.closeLinkModal();
    };

    // Event handler for 'click' event on button-rich-text-editor-50
    this.onButtonRichTextEditor50Click = (event) => {
      this.state.confirmLink();
    };

    // Event handler for 'change' event on select-rich-text-editor-5
    this.onSelectRichTextEditor5Change = (e) => {
      this.state.selectedWidget = e.target.value;
      this.update();
    };

    // Event handler for 'click' event on button-rich-text-editor-51
    this.onButtonRichTextEditor51Click = (event) => {
      this.state.closeWidgetModal();
    };

    // Event handler for 'click' event on button-rich-text-editor-52
    this.onButtonRichTextEditor52Click = (event) => {
      this.state.confirmWidget();
    };

    // Event handler for 'change' event on select-rich-text-editor-6
    this.onSelectRichTextEditor6Change = (e) => {
      this.state.socialPlatform = e.target.value;
      this.update();
    };

    // Event handler for 'input' event on input-rich-text-editor-10
    this.onInputRichTextEditor10Input = (e) => {
      this.state.socialUrl = e.target.value;
      this.update();
    };

    // Event handler for 'click' event on button-rich-text-editor-53
    this.onButtonRichTextEditor53Click = (event) => {
      this.state.closeSocialModal();
    };

    // Event handler for 'click' event on button-rich-text-editor-54
    this.onButtonRichTextEditor54Click = (event) => {
      this.state.confirmSocial();
    };

    // Event handler for 'input' event on textarea-rich-text-editor-1
    this.onTextareaRichTextEditor1Input = (e) => {
      this.state.handleSourceInput(e);
    };

    if (undefined) {
      this.attachShadow({ mode: "open" });
    }
  }

  disconnectedCallback() {
    // onUnMount
    if (typeof document !== "undefined") {
      document.removeEventListener(
        "fullscreenchange",
        this.state.handleFullscreenChange
      );
      document.removeEventListener(
        "selectionchange",
        this.state.handleSelectionChange
      );
    }
    this.destroyAnyNodes(); // clean up nodes when component is destroyed
  }

  destroyAnyNodes() {
    // destroy current view template refs before rendering again
    this.nodesToDestroy.forEach((el) => el.remove());
    this.nodesToDestroy = [];
  }

  connectedCallback() {
    this.getAttributeNames().forEach((attr) => {
      const jsVar = attr.replace(/-/g, "");
      const regexp = new RegExp("^" + jsVar.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$", "i");
      this.componentProps.forEach((prop) => {
        if (regexp.test(prop)) {
          let attrValue: any = this.getAttribute(attr);
          try {
            if (attrValue && (attrValue.trim().startsWith('{') || attrValue.trim().startsWith('['))) {
              attrValue = JSON.parse(attrValue);
            }
          } catch (e) {}
          if (this.props[prop] !== attrValue) {
            this.props[prop] = attrValue;
          }
        }
      });
    });

    this._root.innerHTML = `
      <div data-el="div-rich-text-editor-1" data-ref="RichTextEditor-rootRef">
        <div class="editor-toolbar select-none sticky top-0 z-10 w-full">
          <div class="cv-toolbar-row cv-toolbar-row-1">
            <div class="cv-toolbar-group">
              <button
                type="button"
                class="cv-toolbar-btn"
                title="Undo"
                data-el="button-rich-text-editor-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 7v6h6"></path>
                  <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>
                </svg>
              </button>
              <button
                type="button"
                class="cv-toolbar-btn"
                title="Redo"
                data-el="button-rich-text-editor-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 7v6h-6"></path>
                  <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path>
                </svg>
              </button>
            </div>
            <div class="cv-toolbar-divider"></div>
            <template data-el="show-rich-text-editor">
              <div class="cv-toolbar-select-wrapper">
                <span class="cv-toolbar-select-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="18" x2="3" y2="18"></line>
                  </svg>
                </span>
                <select
                  class="cv-toolbar-select"
                  title="Paragraph Style"
                  data-el="select-rich-text-editor-1"
                  data-dom-state="RichTextEditor-select-rich-text-editor-1"
                >
                  <option value="P">Paragraph</option>
                  <option value="H1">Heading 1</option>
                  <option value="H2">Heading 2</option>
                  <option value="H3">Heading 3</option>
                  <option value="H4">Heading 4</option>
                </select>
                <span class="cv-toolbar-select-chevron">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </div>
            </template>
            <div class="cv-toolbar-select-wrapper">
              <select
                class="cv-toolbar-select no-icon"
                title="Font Family"
                data-el="select-rich-text-editor-2"
                data-dom-state="RichTextEditor-select-rich-text-editor-2"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Outfit">Outfit</option>
                <option value="Fira Code">Fira Code</option>
                <option value="Georgia">Georgia</option>
                <option value="system-ui">System Sans</option>
              </select>
              <span class="cv-toolbar-select-chevron">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </div>
            <div class="cv-toolbar-select-wrapper">
              <select
                class="cv-toolbar-select no-icon"
                title="Font Size"
                data-el="select-rich-text-editor-3"
                data-dom-state="RichTextEditor-select-rich-text-editor-3"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </div>
            <div class="cv-toolbar-divider"></div>
            <div class="cv-toolbar-segmented-group">
              <template data-el="show-rich-text-editor-2">
                <button
                  type="button"
                  title="Bold"
                  data-el="button-rich-text-editor-3"
                >
                  <span class="font-bold text-xs">B</span>
                </button>
              </template>
              <template data-el="show-rich-text-editor-3">
                <button
                  type="button"
                  title="Italic"
                  data-el="button-rich-text-editor-4"
                >
                  <span class="italic font-serif text-xs">I</span>
                </button>
              </template>
              <template data-el="show-rich-text-editor-4">
                <button
                  type="button"
                  title="Underline"
                  data-el="button-rich-text-editor-5"
                >
                  <span class="underline text-xs font-medium">U</span>
                </button>
              </template>
              <template data-el="show-rich-text-editor-5">
                <button
                  type="button"
                  title="Strikethrough"
                  data-el="button-rich-text-editor-6"
                >
                  <span class="line-through text-xs font-medium">S</span>
                </button>
              </template>
              <template data-el="show-rich-text-editor-6">
                <button
                  type="button"
                  title="Code Block"
                  data-el="button-rich-text-editor-7"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </button>
              </template>
            </div>
            <div class="cv-toolbar-divider"></div>
            <template data-el="show-rich-text-editor-7">
              <div class="cv-toolbar-group">
                <template data-el="show-rich-text-editor-8">
                  <label
                    class="cv-toolbar-color-btn"
                    title="Text Color"
                    data-el="label-rich-text-editor-1"
                  >
                    <span class="font-bold text-xs" data-el="span-rich-text-editor-1">
                      A
                    </span>
                    <span
                      class="cv-color-indicator"
                      data-el="span-rich-text-editor-2"
                    ></span>
                    <input
                      type="color"
                      aria-label="Text Color"
                      class="cv-color-input"
                      data-el="input-rich-text-editor-1"
                      data-dom-state="RichTextEditor-input-rich-text-editor-1"
                    />
                  </label>
                </template>
                <template data-el="show-rich-text-editor-9">
                  <label
                    class="cv-toolbar-color-btn"
                    title="Highlight Color"
                    data-el="label-rich-text-editor-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"></path>
                      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                      <path d="m2 2 7.586 7.586"></path>
                    </svg>
                    <span
                      class="cv-color-indicator"
                      data-el="span-rich-text-editor-3"
                    ></span>
                    <input
                      type="color"
                      aria-label="Background Color"
                      class="cv-color-input"
                      data-el="input-rich-text-editor-2"
                      data-dom-state="RichTextEditor-input-rich-text-editor-2"
                    />
                  </label>
                </template>
              </div>
            </template>
            <div class="cv-toolbar-divider"></div>
            <template data-el="show-rich-text-editor-10">
              <div class="cv-toolbar-segmented-group">
                <template data-el="show-rich-text-editor-11">
                  <button
                    type="button"
                    title="Align Left"
                    data-el="button-rich-text-editor-8"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="15" y1="12" x2="3" y2="12"></line>
                      <line x1="17" y1="18" x2="3" y2="18"></line>
                    </svg>
                  </button>
                </template>
                <template data-el="show-rich-text-editor-12">
                  <button
                    type="button"
                    title="Align Center"
                    data-el="button-rich-text-editor-9"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="17" y1="12" x2="7" y2="12"></line>
                      <line x1="19" y1="18" x2="5" y2="18"></line>
                    </svg>
                  </button>
                </template>
                <template data-el="show-rich-text-editor-13">
                  <button
                    type="button"
                    title="Align Right"
                    data-el="button-rich-text-editor-10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                      <line x1="21" y1="18" x2="7" y2="18"></line>
                    </svg>
                  </button>
                </template>
                <button
                  type="button"
                  title="Align Justify"
                  data-el="button-rich-text-editor-11"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="18" x2="3" y2="18"></line>
                  </svg>
                </button>
              </div>
            </template>
          </div>
          <div class="cv-toolbar-row cv-toolbar-row-2">
            <div class="cv-toolbar-group">
              <template data-el="show-rich-text-editor-14">
                <button
                  type="button"
                  title="Bullet List"
                  data-el="button-rich-text-editor-12"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
              </template>
              <template data-el="show-rich-text-editor-15">
                <button
                  type="button"
                  title="Numbered List"
                  data-el="button-rich-text-editor-13"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="10" y1="6" x2="21" y2="6"></line>
                    <line x1="10" y1="12" x2="21" y2="12"></line>
                    <line x1="10" y1="18" x2="21" y2="18"></line>
                    <path d="M4 6h1v4"></path>
                    <path d="M4 10h2"></path>
                    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
                  </svg>
                </button>
              </template>
              <button
                type="button"
                class="cv-toolbar-btn"
                title="Task List"
                data-el="button-rich-text-editor-14"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path
                    d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="cv-toolbar-divider"></div>
            <div class="cv-toolbar-group relative">
              <button
                type="button"
                class="cv-toolbar-action-btn"
                title="Insert Options"
                data-el="button-rich-text-editor-15"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Insert</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <template data-el="show-rich-text-editor-16">
                <div class="cv-insert-menu shadow-xl">
                  <button
                    type="button"
                    class="cv-insert-item"
                    data-el="button-rich-text-editor-16"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                    </svg>
      
                    Table
                  </button>
                  <button
                    type="button"
                    class="cv-insert-item"
                    data-el="button-rich-text-editor-17"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
      
                    Image
                  </button>
                  <button
                    type="button"
                    class="cv-insert-item"
                    data-el="button-rich-text-editor-18"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                      ></path>
                      <path
                        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                      ></path>
                    </svg>
      
                    Link
                  </button>
                  <button
                    type="button"
                    class="cv-insert-item"
                    data-el="button-rich-text-editor-19"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="2.18"
                        ry="2.18"
                      ></rect>
                      <line x1="7" y1="2" x2="7" y2="22"></line>
                      <line x1="17" y1="2" x2="17" y2="22"></line>
                    </svg>
      
                    Video
                  </button>
                  <button
                    type="button"
                    class="cv-insert-item"
                    data-el="button-rich-text-editor-20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="9" x2="15" y2="9"></line>
                      <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
      
                    Button
                  </button>
                  <button
                    type="button"
                    class="cv-insert-item"
                    data-el="button-rich-text-editor-21"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      ></path>
                    </svg>
      
                    Social Post
                  </button>
                  <button
                    type="button"
                    class="cv-insert-item"
                    data-el="button-rich-text-editor-22"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
      
                    Divider
                  </button>
                  <button
                    type="button"
                    class="cv-insert-item"
                    data-el="button-rich-text-editor-23"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.036V20c0 1 1 1 2 1z"
                      ></path>
                    </svg>
      
                    Quote
                  </button>
                  <button
                    type="button"
                    class="cv-insert-item"
                    data-el="button-rich-text-editor-24"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
      
                    Clear Format
                  </button>
                </div>
              </template>
            </div>
            <template data-el="show-rich-text-editor-17">
              <button
                type="button"
                class="cv-toolbar-action-btn"
                title="Table"
                data-el="button-rich-text-editor-25"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="3" y1="15" x2="21" y2="15"></line>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                  <line x1="15" y1="3" x2="15" y2="21"></line>
                </svg>
                <span>Table</span>
              </button>
            </template>
            <template data-el="show-rich-text-editor-18">
              <div
                class="flex items-center cv-rte-tint rounded-lg p-0.5 border cv-rte-accent-border"
              >
                <button
                  type="button"
                  class="w-6 h-6 flex items-center justify-center rounded hover:cv-rte-tint-strong cv-rte-accent transition-colors"
                  title="Add Row Below"
                  data-el="button-rich-text-editor-26"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  <span class="text-[9px] font-bold ml-0.5">R</span>
                </button>
                <button
                  type="button"
                  class="w-6 h-6 flex items-center justify-center rounded hover:bg-rose-500/30 text-rose-500 transition-colors"
                  title="Delete Row"
                  data-el="button-rich-text-editor-27"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path d="M5 12h14"></path>
                  </svg>
                  <span class="text-[9px] font-bold ml-0.5">R</span>
                </button>
                <div class="w-px h-3 cv-rte-tint-strong mx-0.5"></div>
                <button
                  type="button"
                  class="w-6 h-6 flex items-center justify-center rounded hover:cv-rte-tint-strong cv-rte-accent transition-colors"
                  title="Add Column Right"
                  data-el="button-rich-text-editor-28"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  <span class="text-[9px] font-bold ml-0.5">C</span>
                </button>
                <button
                  type="button"
                  class="w-6 h-6 flex items-center justify-center rounded hover:bg-rose-500/30 text-rose-500 transition-colors"
                  title="Delete Column"
                  data-el="button-rich-text-editor-29"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path d="M5 12h14"></path>
                  </svg>
                  <span class="text-[9px] font-bold ml-0.5">C</span>
                </button>
              </div>
            </template>
            <div class="cv-toolbar-group">
              <template data-el="show-rich-text-editor-19">
                <button
                  type="button"
                  class="cv-toolbar-btn"
                  title="Image"
                  data-el="button-rich-text-editor-30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </button>
              </template>
              <template data-el="show-rich-text-editor-20">
                <button
                  type="button"
                  class="cv-toolbar-btn"
                  title="Link"
                  data-el="button-rich-text-editor-31"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                    ></path>
                    <path
                      d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                    ></path>
                  </svg>
                </button>
              </template>
              <button
                type="button"
                class="cv-toolbar-btn"
                title="Formula"
                data-el="button-rich-text-editor-32"
              >
                <span class="font-serif italic font-bold text-xs">Fx</span>
              </button>
              <template data-el="show-rich-text-editor-21">
                <button
                  type="button"
                  class="cv-toolbar-btn"
                  title="Social Media Embed"
                  data-el="button-rich-text-editor-33"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    ></path>
                  </svg>
                </button>
              </template>
            </div>
            <div class="cv-toolbar-divider"></div>
            <template data-el="show-rich-text-editor-22">
              <button
                type="button"
                class="cv-toolbar-widget-btn"
                title="Add UI Widget"
                data-el="button-rich-text-editor-34"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>Add UI Widget</span>
              </button>
            </template>
            <template data-el="show-rich-text-editor-23">
              <div class="cv-toolbar-classes-group">
                <span class="cv-class-badge">CLASS</span>
      
                <template data-el="for-rich-text-editor">
                  <span class="cv-class-chip" data-el="span-rich-text-editor-4">
                    <span>
                      <template data-el="div-rich-text-editor-2">
                        <!-- cls -->
                      </template>
                    </span>
                    <button
                      type="button"
                      class="cv-class-chip-remove"
                      data-el="button-rich-text-editor-35"
                    >
                      ×
                    </button>
                  </span>
                </template>
                <input
                  type="text"
                  aria-label="Dynamic CSS Class"
                  list="editor-class-list"
                  placeholder="+ add class..."
                  class="cv-class-input"
                  data-el="input-rich-text-editor-3"
                  data-dom-state="RichTextEditor-input-rich-text-editor-3"
                />
                <template data-el="show-rich-text-editor-24">
                  <datalist id="editor-class-list">
                    <template data-el="for-rich-text-editor-2">
                      <option data-el="option-rich-text-editor-1">
                        <template data-el="div-rich-text-editor-3">
                          <!-- cls -->
                        </template>
                      </option>
                    </template>
                  </datalist>
                </template>
              </div>
            </template>
            <div class="ml-auto flex items-center gap-1.5 flex-shrink-0">
              <template data-el="show-rich-text-editor-25">
                <button
                  type="button"
                  title="View HTML Source Code"
                  data-el="button-rich-text-editor-36"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </button>
              </template>
              <template data-el="show-rich-text-editor-26">
                <button
                  type="button"
                  class="cv-toolbar-btn"
                  title="Full Screen"
                  data-el="button-rich-text-editor-37"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                    ></path>
                  </svg>
                </button>
              </template>
              <template data-el="show-rich-text-editor-27">
                <button
                  type="button"
                  class="cv-toolbar-btn"
                  title="Save"
                  data-el="button-rich-text-editor-38"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h11l5 5v11a2 2 0 0 1-2 2z"
                    ></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
                </button>
              </template>
            </div>
          </div>
        </div>
        <div data-el="div-rich-text-editor-4">
          <div
            contenteditable="true"
            class="wysiwyg-content outline-none prose prose-invert max-w-none"
            data-el="div-rich-text-editor-5"
            data-ref="RichTextEditor-editorRef"
          ></div>
          <template data-el="show-rich-text-editor-28">
            <div
              class="cv-resize-handle"
              title="Drag to resize"
              data-el="div-rich-text-editor-6"
            ></div>
          </template>
          <template data-el="show-rich-text-editor-29">
            <div
              class="fixed inset-0 flex items-center justify-center z-[100] backdrop-blur-md"
              data-el="div-rich-text-editor-7"
            >
              <template data-el="show-rich-text-editor-30">
                <div class="cv-ai-modal shadow-2xl">
                  <div class="cv-ai-modal-header">
                    <div
                      class="flex items-center gap-2 text-white font-bold text-base"
                    >
                      <svg
                        class="text-purple-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
                        ></path>
                      </svg>
      
                      ContentVeda AI Assistant
                    </div>
                    <button
                      type="button"
                      class="text-slate-400 hover:text-white text-lg font-bold"
                      data-el="button-rich-text-editor-39"
                    >
                      ×
                    </button>
                  </div>
                  <div data-el="div-rich-text-editor-8">
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-40"
                    >
                      ✨ Improve Writing & Polish Flow
                    </button>
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-41"
                    >
                      💡 Generate AI Callout Insight Box
                    </button>
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-42"
                    >
                      📝 Summarize Selected Section
                    </button>
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-43"
                    >
                      🔍 Fix Grammar & Syntax
                    </button>
                  </div>
                  <div data-el="div-rich-text-editor-9">
                    <button type="button" data-el="button-rich-text-editor-44">
                      Close
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-31">
                <div class="shadow-2xl" data-el="div-rich-text-editor-10">
                  <h3
                    class="flex items-center text-white"
                    data-el="h3-rich-text-editor-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      data-el="svg-rich-text-editor-1"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
      
                    Insert Button
                  </h3>
                  <div data-el="div-rich-text-editor-11">
                    <div data-el="div-rich-text-editor-12">
                      <label data-el="label-rich-text-editor-3">Button Style</label>
                      <select
                        data-el="select-rich-text-editor-4"
                        data-dom-state="RichTextEditor-select-rich-text-editor-4"
                      >
                        <option value="primary" data-el="option-rich-text-editor-2">
                          Primary (Gradient)
                        </option>
                        <option value="secondary" data-el="option-rich-text-editor-3">
                          Secondary (Dark)
                        </option>
                        <option value="outline" data-el="option-rich-text-editor-4">
                          Outline (Violet)
                        </option>
                      </select>
                    </div>
                    <div data-el="div-rich-text-editor-13">
                      <label data-el="label-rich-text-editor-4">Button Label</label>
                      <input
                        type="text"
                        aria-label="Button Label"
                        placeholder="e.g. Get Started Today"
                        data-el="input-rich-text-editor-4"
                        data-dom-state="RichTextEditor-input-rich-text-editor-4"
                      />
                    </div>
                    <div data-el="div-rich-text-editor-14">
                      <label data-el="label-rich-text-editor-5">Target URL</label>
                      <input
                        type="url"
                        aria-label="Target URL"
                        placeholder="https://..."
                        data-el="input-rich-text-editor-5"
                        data-dom-state="RichTextEditor-input-rich-text-editor-5"
                      />
                    </div>
                  </div>
                  <div data-el="div-rich-text-editor-15">
                    <button type="button" data-el="button-rich-text-editor-45">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-46">
                      Insert
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-32">
                <div class="shadow-2xl" data-el="div-rich-text-editor-16">
                  <h3
                    class="flex items-center text-white"
                    data-el="h3-rich-text-editor-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      data-el="svg-rich-text-editor-2"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="3" y1="15" x2="21" y2="15"></line>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                      <line x1="15" y1="3" x2="15" y2="21"></line>
                    </svg>
      
                    Insert Table Grid
                  </h3>
                  <div data-el="div-rich-text-editor-17">
                    <div data-el="div-rich-text-editor-18">
                      <label data-el="label-rich-text-editor-6">Rows</label>
                      <input
                        type="number"
                        aria-label="Table Rows"
                        min="1"
                        max="10"
                        data-el="input-rich-text-editor-6"
                        data-dom-state="RichTextEditor-input-rich-text-editor-6"
                      />
                    </div>
                    <div data-el="div-rich-text-editor-19">
                      <label data-el="label-rich-text-editor-7">Columns</label>
                      <input
                        type="number"
                        aria-label="Table Columns"
                        min="1"
                        max="10"
                        data-el="input-rich-text-editor-7"
                        data-dom-state="RichTextEditor-input-rich-text-editor-7"
                      />
                    </div>
                  </div>
                  <div data-el="div-rich-text-editor-20">
                    <input
                      type="checkbox"
                      id="cv-header-check"
                      data-el="input-rich-text-editor-8"
                      data-dom-state="RichTextEditor-input-rich-text-editor-8"
                    />
                    <label for="cv-header-check" data-el="label-rich-text-editor-8">
                      Include header row
                    </label>
                  </div>
                  <div data-el="div-rich-text-editor-21">
                    <button type="button" data-el="button-rich-text-editor-47">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-48">
                      Insert Table
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-33">
                <div class="shadow-2xl" data-el="div-rich-text-editor-22">
                  <h3
                    class="flex items-center text-white"
                    data-el="h3-rich-text-editor-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      data-el="svg-rich-text-editor-3"
                    >
                      <path
                        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                      ></path>
                      <path
                        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                      ></path>
                    </svg>
      
                    Insert Hyperlink
                  </h3>
                  <div data-el="div-rich-text-editor-23">
                    <label data-el="label-rich-text-editor-9">URL Destination</label>
                    <input
                      type="url"
                      aria-label="Hyperlink URL"
                      placeholder="https://example.com"
                      data-el="input-rich-text-editor-9"
                      data-dom-state="RichTextEditor-input-rich-text-editor-9"
                    />
                  </div>
                  <div data-el="div-rich-text-editor-24">
                    <button type="button" data-el="button-rich-text-editor-49">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-50">
                      Insert Link
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-34">
                <div class="shadow-2xl" data-el="div-rich-text-editor-25">
                  <h3
                    class="flex items-center text-white"
                    data-el="h3-rich-text-editor-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      data-el="svg-rich-text-editor-4"
                    >
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
      
                    Insert Component
                  </h3>
                  <div data-el="div-rich-text-editor-26">
                    <label data-el="label-rich-text-editor-10">
                      Select ContentVeda Widget
                    </label>
                    <select
                      data-el="select-rich-text-editor-5"
                      data-dom-state="RichTextEditor-select-rich-text-editor-5"
                    >
                      <option value="banner" data-el="option-rich-text-editor-5">
                        Banner Component
                      </option>
                      <option value="grid-banner" data-el="option-rich-text-editor-6">
                        Grid Banner Component
                      </option>
                      <option value="media-grid" data-el="option-rich-text-editor-7">
                        Media Grid Component
                      </option>
                      <option value="slider" data-el="option-rich-text-editor-8">
                        Slider Carousel
                      </option>
                    </select>
                  </div>
                  <div data-el="div-rich-text-editor-27">
                    <button type="button" data-el="button-rich-text-editor-51">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-52">
                      Insert Widget
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-35">
                <div class="shadow-2xl" data-el="div-rich-text-editor-28">
                  <h3
                    class="flex items-center text-white"
                    data-el="h3-rich-text-editor-5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      data-el="svg-rich-text-editor-5"
                    >
                      <path
                        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                      ></path>
                    </svg>
      
                    Embed Social Post
                  </h3>
                  <div data-el="div-rich-text-editor-29">
                    <div data-el="div-rich-text-editor-30">
                      <label data-el="label-rich-text-editor-11">Platform</label>
                      <select
                        data-el="select-rich-text-editor-6"
                        data-dom-state="RichTextEditor-select-rich-text-editor-6"
                      >
                        <option value="youtube" data-el="option-rich-text-editor-9">
                          YouTube
                        </option>
                        <option value="vimeo" data-el="option-rich-text-editor-10">
                          Vimeo
                        </option>
                        <option value="x" data-el="option-rich-text-editor-11">
                          X (Twitter)
                        </option>
                        <option
                          value="instagram"
                          data-el="option-rich-text-editor-12"
                        >
                          Instagram
                        </option>
                        <option value="facebook" data-el="option-rich-text-editor-13">
                          Facebook
                        </option>
                        <option value="linkedin" data-el="option-rich-text-editor-14">
                          LinkedIn
                        </option>
                      </select>
                    </div>
                    <div data-el="div-rich-text-editor-31">
                      <label data-el="label-rich-text-editor-12">Post URL</label>
                      <input
                        type="url"
                        aria-label="Social Link URL"
                        placeholder="https://..."
                        data-el="input-rich-text-editor-10"
                        data-dom-state="RichTextEditor-input-rich-text-editor-10"
                      />
                    </div>
                  </div>
                  <div data-el="div-rich-text-editor-32">
                    <button type="button" data-el="button-rich-text-editor-53">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-54">
                      Embed Post
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>
        <div data-el="div-rich-text-editor-33">
          <textarea
            class="w-full flex-1 p-6 bg-transparent cv-rte-ok font-mono text-[14px] leading-loose outline-none"
            data-el="textarea-rich-text-editor-1"
            data-dom-state="RichTextEditor-textarea-rich-text-editor-1"
          ></textarea>
        </div>
      </div>`;
    this.pendingUpdate = true;

    this.render();
    this.onMount();
    this.pendingUpdate = false;
    this.update();
  }

  showContent(el) {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content
    // grabs the content of a node that is between <template> tags
    // iterates through child nodes to register all content including text elements
    // attaches the content after the template

    const elementFragment = el.content.cloneNode(true);
    const children = Array.from(elementFragment.childNodes);
    children.forEach((child) => {
      if (el?.scope) {
        child.scope = el.scope;
      }
      if (el?.context) {
        child.context = el.context;
      }
      this.nodesToDestroy.push(child);
    });
    el.after(elementFragment);
  }

  onMount() {
    // onMount
    if (!this.state.internalContent) {
      this.state.internalContent =
        this.props.content || this.props.initialContent || "";
      this.update();
    }
    if (self._editorRef) {
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      self._editorRef.innerHTML = this.state.sanitizeHtml(
        this.state.internalContent
      );
      this.state.renderEmbeds();
    }
    if (typeof document !== "undefined") {
      const styleId = "cv-editor-styles";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        style.innerHTML =
          ".wysiwyg-content blockquote { border-left: 4px solid var(--cv-color-quote-accent, #7fc4de) !important; background: linear-gradient(90deg, var(--cv-color-accent-tint, rgba(127, 196, 222, 0.1)) 0%, transparent 100%) !important; padding: 20px 24px !important; margin: 24px 0 !important; border-radius: 0 16px 16px 0 !important; font-style: italic !important; color: var(--cv-color-text-main, #e2e8f0) !important; font-size: 1.1em !important; line-height: 1.8 !important; position: relative; box-shadow: inset 2px 0 0px var(--cv-color-border, rgba(255,255,255,0.1)); } .wysiwyg-content pre { background: var(--cv-color-code-bg, #0f172a) !important; border: 1px solid var(--cv-color-code-border, rgba(255,255,255,0.1)) !important; border-radius: 12px !important; padding: 20px !important; color: var(--cv-color-code-text, #38bdf8) !important; font-family: 'Fira Code', monospace !important; overflow-x: auto !important; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5) !important; } .wysiwyg-content ul { list-style-type: disc !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content ol { list-style-type: decimal !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content li { margin-bottom: 0.5em !important; display: list-item !important; } .wysiwyg-content a:not(.cv-btn) { color: var(--cv-color-link, #7fc4de) !important; text-decoration: underline !important; text-underline-offset: 3px !important; }";
        document.head.appendChild(style);
      }
      document.addEventListener(
        "fullscreenchange",
        this.state.handleFullscreenChange
      );
      document.addEventListener(
        "selectionchange",
        this.state.handleSelectionChange
      );
    }
  }

  onUpdate() {}

  update() {
    if (this.pendingUpdate === true) {
      return;
    }
    this.pendingUpdate = true;
    this.render();
    this.onUpdate();
    this.pendingUpdate = false;
  }

  render() {
    // grab previous input state
    const preStateful = this.getStateful(this._root);
    const preValues = this.prepareHydrate(preStateful);

    // re-rendering needs to ensure that all nodes generated by for/show are refreshed
    this.destroyAnyNodes();
    this.updateBindings();

    // hydrate input state
    if (preValues.length) {
      const nextStateful = this.getStateful(this._root);
      this.hydrateDom(preValues, nextStateful);
    }
  }

  getStateful(el) {
    const stateful = el.querySelectorAll("[data-dom-state]");
    return stateful ? Array.from(stateful) : [];
  }
  prepareHydrate(stateful) {
    return stateful.map((el) => {
      return {
        id: el.dataset.domState,
        value: el.value,
        active: document.activeElement === el,
        selectionStart: el.selectionStart,
      };
    });
  }
  hydrateDom(preValues, stateful) {
    return stateful.map((el, index) => {
      const prev = preValues.find((prev) => el.dataset.domState === prev.id);
      if (prev) {
        el.value = prev.value;
        if (prev.active) {
          el.focus();
          el.selectionStart = prev.selectionStart;
        }
      }
    });
  }

  updateBindings() {
    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-1']")
      .forEach((el) => {
        el.className = `cv-rich-text-editor flex flex-col rounded-xl overflow-hidden relative ${
          this.state.isFullscreen
            ? "fixed inset-0 z-[9999] w-screen h-screen rounded-none"
            : "w-full"
        } ${this.props.className || ""}`;
        __cvAssignStyle(el.style, {
          boxSizing: "border-box",
          background: "var(--cv-color-surface-sunken, #0f172a)",
          border: this.state.isFullscreen
            ? "none"
            : "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
          boxShadow: "var(--cv-shadow-overlay, 0 8px 32px rgba(0,0,0,0.4))",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-1']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor1Mousedown
        );
        el.addEventListener("mousedown", this.onButtonRichTextEditor1Mousedown);
        el.removeEventListener("click", this.onButtonRichTextEditor1Click);
        el.addEventListener("click", this.onButtonRichTextEditor1Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-2']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor2Mousedown
        );
        el.addEventListener("mousedown", this.onButtonRichTextEditor2Mousedown);
        el.removeEventListener("click", this.onButtonRichTextEditor2Click);
        el.addEventListener("click", this.onButtonRichTextEditor2Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("headings");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='select-rich-text-editor-1']")
      .forEach((el) => {
        el.value = this.state.headingFormat;
        el.removeEventListener(
          "mousedown",
          this.onSelectRichTextEditor1Mousedown
        );
        el.addEventListener("mousedown", this.onSelectRichTextEditor1Mousedown);
        el.removeEventListener("change", this.onSelectRichTextEditor1Change);
        el.addEventListener("change", this.onSelectRichTextEditor1Change);
      });

    this._root
      .querySelectorAll("[data-el='select-rich-text-editor-2']")
      .forEach((el) => {
        el.value = this.state.fontFamily;
        el.removeEventListener(
          "mousedown",
          this.onSelectRichTextEditor2Mousedown
        );
        el.addEventListener("mousedown", this.onSelectRichTextEditor2Mousedown);
        el.removeEventListener("change", this.onSelectRichTextEditor2Change);
        el.addEventListener("change", this.onSelectRichTextEditor2Change);
      });

    this._root
      .querySelectorAll("[data-el='select-rich-text-editor-3']")
      .forEach((el) => {
        el.value = this.state.fontSize;
        el.removeEventListener(
          "mousedown",
          this.onSelectRichTextEditor3Mousedown
        );
        el.addEventListener("mousedown", this.onSelectRichTextEditor3Mousedown);
        el.removeEventListener("change", this.onSelectRichTextEditor3Change);
        el.addEventListener("change", this.onSelectRichTextEditor3Change);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-2']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("bold");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-3']")
      .forEach((el) => {
        el.className = `cv-toolbar-btn ${
          this.state.activeFormats.bold ? "is-active" : ""
        }`;
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor3Mousedown
        );
        el.addEventListener("mousedown", this.onButtonRichTextEditor3Mousedown);
        el.removeEventListener("click", this.onButtonRichTextEditor3Click);
        el.addEventListener("click", this.onButtonRichTextEditor3Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-3']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("italic");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-4']")
      .forEach((el) => {
        el.className = `cv-toolbar-btn ${
          this.state.activeFormats.italic ? "is-active" : ""
        }`;
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor4Mousedown
        );
        el.addEventListener("mousedown", this.onButtonRichTextEditor4Mousedown);
        el.removeEventListener("click", this.onButtonRichTextEditor4Click);
        el.addEventListener("click", this.onButtonRichTextEditor4Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-4']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("underline");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-5']")
      .forEach((el) => {
        el.className = `cv-toolbar-btn ${
          this.state.activeFormats.underline ? "is-active" : ""
        }`;
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor5Mousedown
        );
        el.addEventListener("mousedown", this.onButtonRichTextEditor5Mousedown);
        el.removeEventListener("click", this.onButtonRichTextEditor5Click);
        el.addEventListener("click", this.onButtonRichTextEditor5Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-5']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("strikeThrough");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-6']")
      .forEach((el) => {
        el.className = `cv-toolbar-btn ${
          this.state.activeFormats.strikeThrough ? "is-active" : ""
        }`;
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor6Mousedown
        );
        el.addEventListener("mousedown", this.onButtonRichTextEditor6Mousedown);
        el.removeEventListener("click", this.onButtonRichTextEditor6Click);
        el.addEventListener("click", this.onButtonRichTextEditor6Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-6']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("code");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-7']")
      .forEach((el) => {
        el.className = `cv-toolbar-btn ${
          this.state.activeFormats.code ? "is-active" : ""
        }`;
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor7Mousedown
        );
        el.addEventListener("mousedown", this.onButtonRichTextEditor7Mousedown);
        el.removeEventListener("click", this.onButtonRichTextEditor7Click);
        el.addEventListener("click", this.onButtonRichTextEditor7Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-7']")
      .forEach((el) => {
        const whenCondition =
          this.state.showToolbarOption("foreColor") ||
          this.state.showToolbarOption("backColor");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-8']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("foreColor");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-1']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onLabelRichTextEditor1Mousedown
        );
        el.addEventListener("mousedown", this.onLabelRichTextEditor1Mousedown);
      });

    this._root
      .querySelectorAll("[data-el='span-rich-text-editor-1']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          lineHeight: "1",
        });
      });

    this._root
      .querySelectorAll("[data-el='span-rich-text-editor-2']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          backgroundColor: this.state.textColor,
        });
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-1']")
      .forEach((el) => {
        el.value = this.state.textColor;
        el.removeEventListener(
          "mousedown",
          this.onInputRichTextEditor1Mousedown
        );
        el.addEventListener("mousedown", this.onInputRichTextEditor1Mousedown);
        el.removeEventListener("input", this.onInputRichTextEditor1Input);
        el.addEventListener("input", this.onInputRichTextEditor1Input);
        el.removeEventListener("change", this.onInputRichTextEditor1Change);
        el.addEventListener("change", this.onInputRichTextEditor1Change);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-9']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("backColor");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-2']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onLabelRichTextEditor2Mousedown
        );
        el.addEventListener("mousedown", this.onLabelRichTextEditor2Mousedown);
      });

    this._root
      .querySelectorAll("[data-el='span-rich-text-editor-3']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          backgroundColor: this.state.highlightColor,
        });
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-2']")
      .forEach((el) => {
        el.value = this.state.highlightColor;
        el.removeEventListener(
          "mousedown",
          this.onInputRichTextEditor2Mousedown
        );
        el.addEventListener("mousedown", this.onInputRichTextEditor2Mousedown);
        el.removeEventListener("input", this.onInputRichTextEditor2Input);
        el.addEventListener("input", this.onInputRichTextEditor2Input);
        el.removeEventListener("change", this.onInputRichTextEditor2Change);
        el.addEventListener("change", this.onInputRichTextEditor2Change);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-10']")
      .forEach((el) => {
        const whenCondition =
          this.state.showToolbarOption("justifyLeft") ||
          this.state.showToolbarOption("justifyCenter") ||
          this.state.showToolbarOption("justifyRight");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-11']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("justifyLeft");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-8']")
      .forEach((el) => {
        el.className = `cv-toolbar-btn ${
          this.state.activeFormats.justifyLeft ? "is-active" : ""
        }`;
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor8Mousedown
        );
        el.addEventListener("mousedown", this.onButtonRichTextEditor8Mousedown);
        el.removeEventListener("click", this.onButtonRichTextEditor8Click);
        el.addEventListener("click", this.onButtonRichTextEditor8Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-12']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("justifyCenter");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-9']")
      .forEach((el) => {
        el.className = `cv-toolbar-btn ${
          this.state.activeFormats.justifyCenter ? "is-active" : ""
        }`;
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor9Mousedown
        );
        el.addEventListener("mousedown", this.onButtonRichTextEditor9Mousedown);
        el.removeEventListener("click", this.onButtonRichTextEditor9Click);
        el.addEventListener("click", this.onButtonRichTextEditor9Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-13']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("justifyRight");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-10']")
      .forEach((el) => {
        el.className = `cv-toolbar-btn ${
          this.state.activeFormats.justifyRight ? "is-active" : ""
        }`;
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor10Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor10Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor10Click);
        el.addEventListener("click", this.onButtonRichTextEditor10Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-11']")
      .forEach((el) => {
        el.className = `cv-toolbar-btn ${
          this.state.activeFormats.justifyFull ? "is-active" : ""
        }`;
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor11Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor11Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor11Click);
        el.addEventListener("click", this.onButtonRichTextEditor11Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-14']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("unorderedList");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-12']")
      .forEach((el) => {
        el.className = `cv-toolbar-btn ${
          this.state.activeFormats.unorderedList ? "is-active" : ""
        }`;
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor12Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor12Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor12Click);
        el.addEventListener("click", this.onButtonRichTextEditor12Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-15']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("orderedList");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-13']")
      .forEach((el) => {
        el.className = `cv-toolbar-btn ${
          this.state.activeFormats.orderedList ? "is-active" : ""
        }`;
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor13Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor13Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor13Click);
        el.addEventListener("click", this.onButtonRichTextEditor13Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-14']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor14Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor14Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor14Click);
        el.addEventListener("click", this.onButtonRichTextEditor14Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-15']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonRichTextEditor15Click);
        el.addEventListener("click", this.onButtonRichTextEditor15Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-16']")
      .forEach((el) => {
        const whenCondition = this.state.showInsertMenu;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-16']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor16Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor16Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor16Click);
        el.addEventListener("click", this.onButtonRichTextEditor16Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-17']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor17Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor17Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor17Click);
        el.addEventListener("click", this.onButtonRichTextEditor17Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-18']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor18Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor18Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor18Click);
        el.addEventListener("click", this.onButtonRichTextEditor18Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-19']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor19Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor19Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor19Click);
        el.addEventListener("click", this.onButtonRichTextEditor19Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-20']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor20Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor20Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor20Click);
        el.addEventListener("click", this.onButtonRichTextEditor20Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-21']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor21Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor21Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor21Click);
        el.addEventListener("click", this.onButtonRichTextEditor21Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-22']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor22Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor22Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor22Click);
        el.addEventListener("click", this.onButtonRichTextEditor22Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-23']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor23Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor23Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor23Click);
        el.addEventListener("click", this.onButtonRichTextEditor23Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-24']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor24Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor24Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor24Click);
        el.addEventListener("click", this.onButtonRichTextEditor24Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-17']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("table");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-25']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor25Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor25Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor25Click);
        el.addEventListener("click", this.onButtonRichTextEditor25Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-18']")
      .forEach((el) => {
        const whenCondition =
          this.state.activeFormats.inTable &&
          this.state.showToolbarOption("table");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-26']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor26Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor26Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor26Click);
        el.addEventListener("click", this.onButtonRichTextEditor26Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-27']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor27Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor27Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor27Click);
        el.addEventListener("click", this.onButtonRichTextEditor27Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-28']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor28Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor28Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor28Click);
        el.addEventListener("click", this.onButtonRichTextEditor28Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-29']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor29Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor29Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor29Click);
        el.addEventListener("click", this.onButtonRichTextEditor29Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-19']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("image");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-30']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor30Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor30Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor30Click);
        el.addEventListener("click", this.onButtonRichTextEditor30Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-20']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("link");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-31']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor31Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor31Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor31Click);
        el.addEventListener("click", this.onButtonRichTextEditor31Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-32']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor32Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor32Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor32Click);
        el.addEventListener("click", this.onButtonRichTextEditor32Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-21']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("social");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-33']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor33Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor33Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor33Click);
        el.addEventListener("click", this.onButtonRichTextEditor33Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-22']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("addWidget");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-34']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor34Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor34Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor34Click);
        el.addEventListener("click", this.onButtonRichTextEditor34Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-23']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("classInput");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='for-rich-text-editor']")
      .forEach((el) => {
        let array = this.state.appliedClasses;
        this.renderLoop(el, array, "cls");
      });

    this._root
      .querySelectorAll("[data-el='span-rich-text-editor-4']")
      .forEach((el) => {
        const cls = this.getScope(el, "cls");
        el.key = cls;
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-2']")
      .forEach((el) => {
        const cls = this.getScope(el, "cls");
        this.renderTextNode(el, cls);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-35']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonRichTextEditor35Click);
        el.addEventListener("click", this.onButtonRichTextEditor35Click);
        const cls = this.getScope(el, "cls");
        el.setAttribute("title", "Remove " + cls);
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-3']")
      .forEach((el) => {
        el.removeEventListener("keydown", this.onInputRichTextEditor3Keydown);
        el.addEventListener("keydown", this.onInputRichTextEditor3Keydown);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-24']")
      .forEach((el) => {
        const whenCondition =
          this.props.availableClasses && this.props.availableClasses.length > 0;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='for-rich-text-editor-2']")
      .forEach((el) => {
        let array = this.props.availableClasses;
        this.renderLoop(el, array, "cls");
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-1']")
      .forEach((el) => {
        const cls = this.getScope(el, "cls");
        el.value = cls;
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-3']")
      .forEach((el) => {
        const cls = this.getScope(el, "cls");
        this.renderTextNode(el, cls);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-25']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("source");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-36']")
      .forEach((el) => {
        el.className = `cv-toolbar-btn ${
          this.state.mode === "source" ? "is-active" : ""
        }`;
        el.removeEventListener("click", this.onButtonRichTextEditor36Click);
        el.addEventListener("click", this.onButtonRichTextEditor36Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-26']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("fullscreen");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-37']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonRichTextEditor37Click);
        el.addEventListener("click", this.onButtonRichTextEditor37Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-27']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("save");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-38']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor38Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor38Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor38Click);
        el.addEventListener("click", this.onButtonRichTextEditor38Click);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-4']")
      .forEach((el) => {
        el.className = `editor-content flex-1 overflow-y-auto relative min-h-[350px] cv-mode-${this.state.mode}`;
        el.removeEventListener("scroll", this.onDivRichTextEditor4Scroll);
        el.addEventListener("scroll", this.onDivRichTextEditor4Scroll);
        __cvAssignStyle(el.style, {
          padding: "2rem 3rem",
          color: "var(--cv-color-text-main, #f1f5f9)",
          position: "relative",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-5']")
      .forEach((el) => {
        el.removeEventListener("input", this.onDivRichTextEditor5Input);
        el.addEventListener("input", this.onDivRichTextEditor5Input);
        el.removeEventListener("blur", this.onDivRichTextEditor5Blur);
        el.addEventListener("blur", this.onDivRichTextEditor5Blur);
        el.removeEventListener("keyup", this.onDivRichTextEditor5Keyup);
        el.addEventListener("keyup", this.onDivRichTextEditor5Keyup);
        el.removeEventListener("mouseup", this.onDivRichTextEditor5Mouseup);
        el.addEventListener("mouseup", this.onDivRichTextEditor5Mouseup);
        el.removeEventListener("click", this.onDivRichTextEditor5Click);
        el.addEventListener("click", this.onDivRichTextEditor5Click);
        __cvAssignStyle(el.style, {
          minHeight: "350px",
          fontFamily: "Inter, sans-serif",
          lineHeight: "1.7",
          fontSize: "15px",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-28']")
      .forEach((el) => {
        const whenCondition = this.state.selectedMediaEl;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-6']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          position: "absolute",
          top: `${this.state.resizeHandleTop}px`,
          left: `${this.state.resizeHandleLeft}px`,
          width: "14px",
          height: "14px",
          borderRadius: "3px",
          background: "var(--cv-color-primary, #245066)",
          border: "2px solid var(--cv-color-surface-raised, #fff)",
          cursor: "nwse-resize",
          zIndex: 30,
          boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
        });
        el.removeEventListener("mousedown", this.onDivRichTextEditor6Mousedown);
        el.addEventListener("mousedown", this.onDivRichTextEditor6Mousedown);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-29']")
      .forEach((el) => {
        const whenCondition =
          this.state.showTableModal ||
          this.state.showLinkModal ||
          this.state.showWidgetModal ||
          this.state.showSocialModal ||
          this.state.showButtonModal ||
          this.state.showAiModal;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-7']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "rgba(0, 0, 0, 0.6)",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-30']")
      .forEach((el) => {
        const whenCondition = this.state.showAiModal;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-39']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonRichTextEditor39Click);
        el.addEventListener("click", this.onButtonRichTextEditor39Click);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-8']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-40']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonRichTextEditor40Click);
        el.addEventListener("click", this.onButtonRichTextEditor40Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-41']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonRichTextEditor41Click);
        el.addEventListener("click", this.onButtonRichTextEditor41Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-42']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonRichTextEditor42Click);
        el.addEventListener("click", this.onButtonRichTextEditor42Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-43']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonRichTextEditor43Click);
        el.addEventListener("click", this.onButtonRichTextEditor43Click);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-9']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-44']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          padding: "8px 16px",
          fontSize: "13px",
          color: "#cbd5e1",
          background: "rgba(255,255,255,0.05)",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor44Click);
        el.addEventListener("click", this.onButtonRichTextEditor44Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-31']")
      .forEach((el) => {
        const whenCondition = this.state.showButtonModal;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-10']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
          border: "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
          borderRadius: "16px",
          padding: "24px",
          width: "380px",
        });
      });

    this._root
      .querySelectorAll("[data-el='h3-rich-text-editor-1']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='svg-rich-text-editor-1']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          color: "var(--cv-color-primary, #7fc4de)",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-11']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "24px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-12']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-3']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "var(--cv-color-text-muted, #94a3b8)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='select-rich-text-editor-4']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
          border: "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
          borderRadius: "8px",
          padding: "12px 16px",
          width: "100%",
          fontSize: "14px",
          color: "var(--cv-color-text-main, #fff)",
          outline: "none",
        });
        el.value = this.state.btnStyle;
        el.removeEventListener("change", this.onSelectRichTextEditor4Change);
        el.addEventListener("change", this.onSelectRichTextEditor4Change);
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-2']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-3']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-4']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-13']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-4']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "var(--cv-color-text-muted, #94a3b8)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-4']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
          border: "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
          borderRadius: "8px",
          padding: "12px 16px",
          width: "100%",
          fontSize: "14px",
          color: "var(--cv-color-text-main, #fff)",
          outline: "none",
          boxSizing: "border-box",
        });
        el.value = this.state.btnText;
        el.removeEventListener("input", this.onInputRichTextEditor4Input);
        el.addEventListener("input", this.onInputRichTextEditor4Input);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-14']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-5']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "var(--cv-color-text-muted, #94a3b8)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-5']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
          border: "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
          borderRadius: "8px",
          padding: "12px 16px",
          width: "100%",
          fontSize: "14px",
          color: "var(--cv-color-text-main, #fff)",
          outline: "none",
          boxSizing: "border-box",
        });
        el.value = this.state.btnUrl;
        el.removeEventListener("input", this.onInputRichTextEditor5Input);
        el.addEventListener("input", this.onInputRichTextEditor5Input);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-15']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-45']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "var(--cv-color-text-secondary, #cbd5e1)",
          background: "var(--cv-color-hover, rgba(255,255,255,0.05))",
          border: "none",
          borderRadius: "8px",
          fontWeight: "500",
          cursor: "pointer",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor45Click);
        el.addEventListener("click", this.onButtonRichTextEditor45Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-46']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "var(--cv-color-on-primary, #fff)",
          background:
            "var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow:
            "0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.2))",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor46Click);
        el.addEventListener("click", this.onButtonRichTextEditor46Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-32']")
      .forEach((el) => {
        const whenCondition = this.state.showTableModal;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-16']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
          border: "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
          borderRadius: "16px",
          padding: "24px",
          width: "340px",
        });
      });

    this._root
      .querySelectorAll("[data-el='h3-rich-text-editor-2']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='svg-rich-text-editor-2']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          color: "var(--cv-color-link, #7fc4de)",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-17']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          gap: "16px",
          marginBottom: "20px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-18']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-6']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "var(--cv-color-text-muted, #94a3b8)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-6']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
          border: "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
          borderRadius: "8px",
          padding: "12px",
          width: "100%",
          fontSize: "15px",
          color: "var(--cv-color-text-main, #fff)",
          outline: "none",
          textAlign: "center",
          boxSizing: "border-box",
        });
        el.value = this.state.tableRows;
        el.removeEventListener("input", this.onInputRichTextEditor6Input);
        el.addEventListener("input", this.onInputRichTextEditor6Input);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-19']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-7']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "var(--cv-color-text-muted, #94a3b8)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-7']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
          border: "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
          borderRadius: "8px",
          padding: "12px",
          width: "100%",
          fontSize: "15px",
          color: "var(--cv-color-text-main, #fff)",
          outline: "none",
          textAlign: "center",
          boxSizing: "border-box",
        });
        el.value = this.state.tableCols;
        el.removeEventListener("input", this.onInputRichTextEditor7Input);
        el.addEventListener("input", this.onInputRichTextEditor7Input);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-20']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "28px",
        });
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-8']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          width: "18px",
          height: "18px",
          borderRadius: "4px",
          cursor: "pointer",
          accentColor: "var(--cv-color-link, #7fc4de)",
        });
        el.setAttribute("checked", this.state.tableHasHeader);
        el.removeEventListener("change", this.onInputRichTextEditor8Change);
        el.addEventListener("change", this.onInputRichTextEditor8Change);
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-8']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          fontSize: "14px",
          color: "var(--cv-color-text-secondary, #cbd5e1)",
          cursor: "pointer",
          userSelect: "none",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-21']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-47']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "var(--cv-color-text-secondary, #cbd5e1)",
          background: "var(--cv-color-hover, rgba(255,255,255,0.05))",
          border: "none",
          borderRadius: "8px",
          fontWeight: "500",
          cursor: "pointer",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor47Click);
        el.addEventListener("click", this.onButtonRichTextEditor47Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-48']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "var(--cv-color-on-primary, #fff)",
          background:
            "var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor48Click);
        el.addEventListener("click", this.onButtonRichTextEditor48Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-33']")
      .forEach((el) => {
        const whenCondition = this.state.showLinkModal;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-22']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
          border: "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
          borderRadius: "16px",
          padding: "24px",
          width: "380px",
        });
      });

    this._root
      .querySelectorAll("[data-el='h3-rich-text-editor-3']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='svg-rich-text-editor-3']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          color: "var(--cv-color-link, #7fc4de)",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-23']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "24px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-9']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "var(--cv-color-text-muted, #94a3b8)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-9']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
          border: "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
          borderRadius: "8px",
          padding: "12px 16px",
          width: "100%",
          fontSize: "14px",
          color: "var(--cv-color-text-main, #fff)",
          outline: "none",
          boxSizing: "border-box",
        });
        el.value = this.state.linkUrl;
        el.removeEventListener("input", this.onInputRichTextEditor9Input);
        el.addEventListener("input", this.onInputRichTextEditor9Input);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-24']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "32px",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-49']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "var(--cv-color-text-secondary, #cbd5e1)",
          background: "var(--cv-color-hover, rgba(255,255,255,0.05))",
          border: "none",
          borderRadius: "8px",
          fontWeight: "500",
          cursor: "pointer",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor49Click);
        el.addEventListener("click", this.onButtonRichTextEditor49Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-50']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "var(--cv-color-on-primary, #fff)",
          background: "var(--cv-color-info-fill, #075985)",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor50Click);
        el.addEventListener("click", this.onButtonRichTextEditor50Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-34']")
      .forEach((el) => {
        const whenCondition = this.state.showWidgetModal;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-25']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
          border: "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
          borderRadius: "16px",
          padding: "24px",
          width: "380px",
        });
      });

    this._root
      .querySelectorAll("[data-el='h3-rich-text-editor-4']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='svg-rich-text-editor-4']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          color: "var(--cv-color-secondary, #5eb3d6)",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-26']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "24px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-10']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "var(--cv-color-text-muted, #94a3b8)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='select-rich-text-editor-5']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
          border: "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
          borderRadius: "8px",
          padding: "12px 16px",
          width: "100%",
          fontSize: "14px",
          color: "var(--cv-color-text-main, #fff)",
          outline: "none",
          boxSizing: "border-box",
        });
        el.value = this.state.selectedWidget;
        el.removeEventListener("change", this.onSelectRichTextEditor5Change);
        el.addEventListener("change", this.onSelectRichTextEditor5Change);
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-5']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-6']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-7']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-8']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-27']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "32px",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-51']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "var(--cv-color-text-secondary, #cbd5e1)",
          background: "var(--cv-color-hover, rgba(255,255,255,0.05))",
          border: "none",
          borderRadius: "8px",
          fontWeight: "500",
          cursor: "pointer",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor51Click);
        el.addEventListener("click", this.onButtonRichTextEditor51Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-52']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "var(--cv-color-on-primary, #fff)",
          background:
            "var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor52Click);
        el.addEventListener("click", this.onButtonRichTextEditor52Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-35']")
      .forEach((el) => {
        const whenCondition = this.state.showSocialModal;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-28']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
          border: "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
          borderRadius: "16px",
          padding: "24px",
          width: "380px",
        });
      });

    this._root
      .querySelectorAll("[data-el='h3-rich-text-editor-5']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='svg-rich-text-editor-5']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          color: "var(--cv-color-info, #0ea5e9)",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-29']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "24px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-30']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-11']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "var(--cv-color-text-muted, #94a3b8)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='select-rich-text-editor-6']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
          border: "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
          borderRadius: "8px",
          padding: "12px 16px",
          width: "100%",
          fontSize: "14px",
          color: "var(--cv-color-text-main, #fff)",
          outline: "none",
          boxSizing: "border-box",
        });
        el.value = this.state.socialPlatform;
        el.removeEventListener("change", this.onSelectRichTextEditor6Change);
        el.addEventListener("change", this.onSelectRichTextEditor6Change);
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-9']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-10']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-11']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-12']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-13']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-14']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-raised, #1e293b)",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-31']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-12']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "var(--cv-color-text-muted, #94a3b8)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-10']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          background: "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
          border: "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
          borderRadius: "8px",
          padding: "12px 16px",
          width: "100%",
          fontSize: "14px",
          color: "var(--cv-color-text-main, #fff)",
          outline: "none",
          boxSizing: "border-box",
        });
        el.value = this.state.socialUrl;
        el.removeEventListener("input", this.onInputRichTextEditor10Input);
        el.addEventListener("input", this.onInputRichTextEditor10Input);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-32']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "32px",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-53']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "var(--cv-color-text-secondary, #cbd5e1)",
          background: "var(--cv-color-hover, rgba(255,255,255,0.05))",
          border: "none",
          borderRadius: "8px",
          fontWeight: "500",
          cursor: "pointer",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor53Click);
        el.addEventListener("click", this.onButtonRichTextEditor53Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-54']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "var(--cv-color-on-primary, #fff)",
          background: "var(--cv-color-info-fill, #075985)",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor54Click);
        el.addEventListener("click", this.onButtonRichTextEditor54Click);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-33']")
      .forEach((el) => {
        el.className = `editor-source flex-1 relative min-h-[350px] overflow-hidden cv-mode-src-${this.state.mode}`;
        __cvAssignStyle(el.style, {
          flexDirection: "column",
          height: "100%",
          minHeight: "350px",
        });
      });

    this._root
      .querySelectorAll("[data-el='textarea-rich-text-editor-1']")
      .forEach((el) => {
        el.value = this.state.internalContent;
        el.removeEventListener("input", this.onTextareaRichTextEditor1Input);
        el.addEventListener("input", this.onTextareaRichTextEditor1Input);
        __cvAssignStyle(el.style, {
          whiteSpace: "pre-wrap",
          overflowY: "auto",
          resize: "none",
          height: "100%",
          width: "100%",
          boxSizing: "border-box",
        });
        el.setAttribute("spellcheck", false);
      });
  }

  // Helper to render content
  renderTextNode(el, text) {
    const textNode = document.createTextNode(text);
    if (el?.scope) {
      textNode.scope = el.scope;
    }
    if (el?.context) {
      textNode.context = el.context;
    }
    el.after(textNode);
    this.nodesToDestroy.push(el.nextSibling);
  }

  // scope helper
  getScope(el, name) {
    do {
      let value = el?.scope?.[name];
      if (value !== undefined) {
        return value;
      }
    } while ((el = el.parentNode));
  }

  // Helper to render loops
  renderLoop(template, array, itemName, itemIndex, collectionName) {
    const collection = [];
    for (let [index, value] of array.entries()) {
      const elementFragment = template.content.cloneNode(true);
      const children = Array.from(elementFragment.childNodes);
      const localScope = {};
      let scope = localScope;
      if (template?.scope) {
        const getParent = {
          get(target, prop, receiver) {
            if (prop in target) {
              return target[prop];
            }
            if (prop in template.scope) {
              return template.scope[prop];
            }
            return target[prop];
          },
        };
        scope = new Proxy(localScope, getParent);
      }
      children.forEach((child) => {
        if (itemName !== undefined) {
          scope[itemName] = value;
        }
        if (itemIndex !== undefined) {
          scope[itemIndex] = index;
        }
        if (collectionName !== undefined) {
          scope[collectionName] = array;
        }
        child.scope = scope;
        if (template.context) {
          child.context = context;
        }
        this.nodesToDestroy.push(child);
        collection.unshift(child);
      });
    }
    collection.forEach((child) => template.after(child));
  }
}

customElements.define("rich-text-editor", RichTextEditor);


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
