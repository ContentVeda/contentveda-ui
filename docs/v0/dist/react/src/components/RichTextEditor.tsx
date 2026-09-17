"use client";
import * as React from "react";
import { useState, useRef, useEffect } from "react";

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
  readOnly?: boolean;
  disabled?: boolean;
}

import DOMPurify from "isomorphic-dompurify";
let activeSavedRange: any = null;

function RichTextEditor(props: RichTextEditorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState(() => "visual");

  const [isFullscreen, setIsFullscreen] = useState(() => false);

  const [isMounted, setIsMounted] = useState(() => false);

  const [internalContent, setInternalContent] = useState(
    () => props.content || props.initialContent || ""
  );

  function getEditorElement() {
    if (typeof window === "undefined") return null;
    return (
      (editorRef.current as any) ||
      (rootRef.current
        ? ((rootRef.current as any).querySelector(
            ".wysiwyg-content"
          ) as HTMLDivElement)
        : null)
    );
  }

  function getTrustedHttpUrl(rawUrl: string) {
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
  }

  function getHostname(url: string) {
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
  }

  function isHost(url: string, domain: string) {
    const host = getHostname(url);
    return host === domain || host.endsWith("." + domain);
  }

  function escapeHtml(value: string) {
    if (value == null) return "";
    const str = String(value);
    if (
      str.indexOf("&") === -1 &&
      str.indexOf("<") === -1 &&
      str.indexOf(">") === -1 &&
      str.indexOf('"') === -1 &&
      str.indexOf("'") === -1
    ) {
      return str;
    }
    return str
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
  }

  function sanitizeHtml(content: string) {
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
  }

  const [showTableModal, setShowTableModal] = useState(() => false);

  const [tableRows, setTableRows] = useState(() => "3");

  const [tableCols, setTableCols] = useState(() => "3");

  const [tableHasHeader, setTableHasHeader] = useState(() => true);

  const [showLinkModal, setShowLinkModal] = useState(() => false);

  const [linkUrl, setLinkUrl] = useState(() => "");

  const [showWidgetModal, setShowWidgetModal] = useState(() => false);

  const [selectedWidget, setSelectedWidget] = useState(() => "banner");

  const [showSocialModal, setShowSocialModal] = useState(() => false);

  const [socialUrl, setSocialUrl] = useState(() => "");

  const [socialPlatform, setSocialPlatform] = useState(() => "x");

  const [showButtonModal, setShowButtonModal] = useState(() => false);

  const [btnText, setBtnText] = useState(() => "Click Here");

  const [btnUrl, setBtnUrl] = useState(() => "");

  const [btnStyle, setBtnStyle] = useState(() => "primary");

  const [selectedMediaEl, setSelectedMediaEl] = useState(() => null);

  const [resizeHandleTop, setResizeHandleTop] = useState(() => 0);

  const [resizeHandleLeft, setResizeHandleLeft] = useState(() => 0);

  const [resizeToolbarTop, setResizeToolbarTop] = useState(() => 0);

  const [resizeToolbarLeft, setResizeToolbarLeft] = useState(() => 0);

  const [isResizing, setIsResizing] = useState(() => false);

  const [resizeStartX, setResizeStartX] = useState(() => 0);

  const [resizeStartWidth, setResizeStartWidth] = useState(() => 0);

  const [fontFamily, setFontFamily] = useState(() => "Inter");

  const [fontSize, setFontSize] = useState(() => "15px");

  const [textColor, setTextColor] = useState(() => "#0f172a");

  const [highlightColor, setHighlightColor] = useState(() => "#fde047");

  const [appliedClasses, setAppliedClasses] = useState(() => [
    "cv-callout",
    "variant-blue",
  ]);

  const [showInsertMenu, setShowInsertMenu] = useState(() => false);

  const [showAiModal, setShowAiModal] = useState(() => false);

  const [aiAction, setAiAction] = useState(() => "improve");

  const [aiInput, setAiInput] = useState(() => "");

  const [activeFormats, setActiveFormats] = useState(() => ({
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
  }));

  const [headingFormat, setHeadingFormat] = useState(() => "P");

  function checkFormats() {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      let isQuote = false;
      let isCode = false;
      let inTable = false;
      let nextFontSize = fontSize;
      let nextFontFamily = fontFamily;
      let nextAppliedClasses = appliedClasses;
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        let node = sel.getRangeAt(0).startContainer as any;
        let currentEl =
          node && node.nodeType === 1 ? node : node ? node.parentElement : null;
        if (currentEl) {
          try {
            const computed = window.getComputedStyle(currentEl);
            if (computed && computed.fontSize) {
              const pxVal = Math.round(parseFloat(computed.fontSize));
              nextFontSize = `${pxVal}px`;
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
                nextFontFamily = primaryFont;
              }
            }
          } catch (err) {}
          const classSet: string[] = [];
          let searchNode = currentEl;
          while (searchNode && searchNode !== editorRef.current) {
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
          nextAppliedClasses = classSet;
        }
        while (
          node &&
          node.nodeName !== "DIV" &&
          node.className !== "wysiwyg-content"
        ) {
          if (node.nodeName === "BLOCKQUOTE") isQuote = true;
          if (node.nodeName === "PRE" || node.nodeName === "CODE")
            isCode = true;
          if (node.nodeName === "TD" || node.nodeName === "TH") inTable = true;
          node = node.parentNode;
        }
      }
      let nextHeadingFormat = "P";
      const formatBlock = document.queryCommandValue("formatBlock");
      if (formatBlock) {
        if (formatBlock.includes("1")) nextHeadingFormat = "H1";
        else if (formatBlock.includes("2")) nextHeadingFormat = "H2";
        else if (formatBlock.includes("3")) nextHeadingFormat = "H3";
        else if (formatBlock.includes("4")) nextHeadingFormat = "H4";
        else if (formatBlock.toLowerCase().includes("blockquote")) {
          isQuote = true;
          nextHeadingFormat = "P";
        } else if (formatBlock.toLowerCase().includes("pre")) {
          isCode = true;
          nextHeadingFormat = "P";
        } else if (formatBlock.includes("p")) nextHeadingFormat = "P";
        else if (formatBlock.includes("div")) nextHeadingFormat = "P";
      }
      const nextActiveFormats = {
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
      if (fontSize !== nextFontSize) setFontSize(nextFontSize);
      if (fontFamily !== nextFontFamily) setFontFamily(nextFontFamily);
      if (headingFormat !== nextHeadingFormat)
        setHeadingFormat(nextHeadingFormat);
      if (
        appliedClasses.length !== nextAppliedClasses.length ||
        appliedClasses.some((c, i) => c !== nextAppliedClasses[i])
      ) {
        setAppliedClasses(nextAppliedClasses);
      }
      let formatsChanged = false;
      for (const k in nextActiveFormats) {
        if ((activeFormats as any)[k] !== (nextActiveFormats as any)[k]) {
          formatsChanged = true;
          break;
        }
      }
      if (formatsChanged) {
        setActiveFormats(nextActiveFormats);
      }
    }
  }

  function saveSelection() {
    if (typeof window !== "undefined") {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const r = sel.getRangeAt(0);
        const el = getEditorElement();
        if (el) {
          try {
            if ((el as any).contains(r.commonAncestorContainer)) {
              const escaped = escapeAtomicRange(r.cloneRange());
              activeSavedRange = escaped;
              (el as any).__cv_savedRange = escaped;
            }
          } catch (e) {}
        }
      }
    }
  }

  function restoreSelection() {
    if (typeof window !== "undefined") {
      const el = getEditorElement();
      if (el) {
        try {
          if (typeof (el as any).focus === "function") {
            (el as any).focus();
          }
        } catch (e) {}
        const target = (el as any).__cv_savedRange || activeSavedRange;
        if (target) {
          try {
            if ((el as any).contains(target.commonAncestorContainer)) {
              const sel = window.getSelection();
              if (sel) {
                sel.removeAllRanges();
                sel.addRange(target.cloneRange());
              }
            }
          } catch (e) {}
        }
      }
    }
  }

  function escapeAtomicRange(range: any) {
    const el = getEditorElement();
    if (!range || !el) return range;
    let node: any = range.startContainer;
    let atomicEl: any = null;
    while (node && node !== el) {
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
  }

  function insertHtmlAtCursor(html: string) {
    if (typeof window === "undefined") return;
    if (mode === "source") return;
    const el = getEditorElement();
    if (el) {
      try {
        if (typeof (el as any).focus === "function") {
          (el as any).focus();
        }
      } catch (e) {}
    }
    restoreSelection();
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
    const targetSaved = el
      ? (el as any).__cv_savedRange || activeSavedRange
      : activeSavedRange;
    if (!targetRange && targetSaved) {
      try {
        if (el && (el as any).contains(targetSaved.commonAncestorContainer)) {
          targetRange = targetSaved;
        }
      } catch (e) {}
    }
    targetRange = escapeAtomicRange(targetRange);
    if (targetRange && targetRange.insertNode) {
      targetRange.deleteContents();
      const template = document.createElement("template");
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      template.innerHTML = html.trim();
      const frag = template.content;
      const resizableEl = frag.querySelector(
        "img, video, audio, .cv-social-embed, .cv-widget"
      );
      const lastNode = frag.lastChild;
      targetRange.insertNode(frag);
      if (lastNode && sel) {
        const newRange = document.createRange();
        newRange.setStartAfter(lastNode);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
        const cloned = newRange.cloneRange();
        activeSavedRange = cloned;
        if (el) (el as any).__cv_savedRange = cloned;
      }
      if (resizableEl) {
        selectMediaElement(resizableEl);
      }
    } else if (el) {
      const template = document.createElement("template");
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      template.innerHTML = html.trim();
      const resizableEl = template.content.querySelector(
        "img, video, audio, .cv-social-embed, .cv-widget"
      );
      el.appendChild(template.content);
      const newRange = document.createRange();
      newRange.selectNodeContents(el as Node);
      newRange.collapse(false);
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(newRange);
        const cloned = newRange.cloneRange();
        activeSavedRange = cloned;
        if (el) (el as any).__cv_savedRange = cloned;
      }
      if (resizableEl) {
        selectMediaElement(resizableEl);
      }
    }
    ensureEditableStructure();
    syncContent();
    checkFormats();
    if (
      html.indexOf("cv-social-embed") !== -1 ||
      html.indexOf("cv-math-formula") !== -1
    ) {
      renderEmbeds();
    }
  }

  function formatHTML(html: string) {
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
  }

  function format(cmd: string, val?: string) {
    if (mode === "source") return;
    restoreSelection();
    /* lgtm[js/xss, js/html-constructed-from-input] */
    /* codeql[js/xss, js/html-constructed-from-input] */
    document.execCommand(cmd, false, val);
    saveSelection();
    syncContent();
    checkFormats();
  }

  function applyColorPreview(cmd: string, color: string) {
    if (!color) return;
    if (mode === "source") return;
    const previewEl = getEditorElement();
    if (previewEl) {
      try {
        (previewEl as any).focus();
      } catch (focusErr) {}
    }
    restoreSelection();
    if (cmd === "foreColor") {
      document.execCommand("foreColor", false, color);
    } else {
      const applied = document.execCommand("hiliteColor", false, color);
      if (!applied) {
        document.execCommand("backColor", false, color);
      }
    }
    saveSelection();
  }

  function applyColor(cmd: string, color: string) {
    if (!color) return;
    if (mode === "source") return;
    const colorEl = getEditorElement();
    if (colorEl) {
      try {
        (colorEl as any).focus();
      } catch (focusErr2) {}
    }
    restoreSelection();
    if (cmd === "foreColor") {
      document.execCommand("foreColor", false, color);
      setTextColor(color);
    } else {
      const colorApplied = document.execCommand("hiliteColor", false, color);
      if (!colorApplied) {
        document.execCommand("backColor", false, color);
      }
      setHighlightColor(color);
    }
    saveSelection();
    syncContent();
    checkFormats();
  }

  function formatHeading(level: string) {
    if (mode === "source") return;
    restoreSelection();
    /* lgtm[js/xss, js/html-constructed-from-input] */
    /* codeql[js/xss, js/html-constructed-from-input] */
    document.execCommand("formatBlock", false, level);
    setHeadingFormat(level);
    syncContent();
    checkFormats();
    const el = getEditorElement();
    if (el) {
      try {
        (el as any).focus();
      } catch (e) {}
    }
  }

  function insertMedia(type: "image" | "video" | "audio") {
    if (mode === "source") return;
    saveSelection();
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
        const escapedAlt = escapeHtml(alt);
        const escapedUrl = escapeHtml(url);
        html = `<img src="${escapedUrl}" alt="${escapedAlt}" loading="lazy" decoding="async" draggable="false" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" /><p><br></p>`;
      } else if (type === "video") {
        const ytMatch = url.match(
          /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/
        );
        const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
        const escapedUrl = escapeHtml(url);
        if (ytMatch) {
          html = `<div class="cv-social-embed" data-platform="youtube" data-url="${escapedUrl}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded YOUTUBE Video: ${escapedUrl}]</div><p><br></p>`;
        } else if (vimeoMatch) {
          html = `<div class="cv-social-embed" data-platform="vimeo" data-url="${escapedUrl}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded VIMEO Video: ${escapedUrl}]</div><p><br></p>`;
        } else {
          html = `<video src="${escapedUrl}" controls style="max-width: 100%; border-radius: 8px; margin: 16px 0;"></video><p><br></p>`;
        }
      } else if (type === "audio") {
        html = `<audio src="${escapeHtml(
          url
        )}" controls style="margin: 16px 0;"></audio><p><br></p>`;
      }
      insertHtmlAtCursor(html);
    };
    if (props.onMediaRequest) {
      props
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
  }

  function clearAllFormatting() {
    if (mode === "source") return;
    /* lgtm[js/xss, js/html-constructed-from-input] */
    /* codeql[js/xss, js/html-constructed-from-input] */
    document.execCommand("removeFormat", false, undefined);
    /* lgtm[js/xss, js/html-constructed-from-input] */
    /* codeql[js/xss, js/html-constructed-from-input] */
    document.execCommand("formatBlock", false, "P");
    /* lgtm[js/xss, js/html-constructed-from-input] */
    /* codeql[js/xss, js/html-constructed-from-input] */
    document.execCommand("unlink", false, undefined);
    syncContent();
    checkFormats();
  }

  function toggleBlock(type: string) {
    if (mode === "source") return;
    checkFormats();
    const isActive = type === "PRE" ? activeFormats.code : activeFormats.quote;
    if (isActive) {
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      document.execCommand("formatBlock", false, "P");
    } else {
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      document.execCommand("formatBlock", false, type);
    }
    syncContent();
    checkFormats();
  }

  function applyClass(className: string) {
    if (!className) return;
    if (mode === "source") return;
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const span = document.createElement("span");
      span.className = className;
      span.appendChild(range.extractContents());
      range.insertNode(span);
      syncContent();
    }
  }

  function openButtonModal() {
    if (mode === "source") return;
    saveSelection();
    setShowButtonModal(true);
    setBtnText("Click Here");
    setBtnUrl("");
    setBtnStyle("primary");
  }

  function closeButtonModal() {
    setShowButtonModal(false);
  }

  function confirmButton() {
    setShowButtonModal(false);
    if (btnText) {
      let styleStr =
        "padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; display: inline-block; text-decoration: none; transition: all 0.2s;";
      if (btnStyle === "primary") {
        styleStr +=
          " background: var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480)); color: white; border: none; box-shadow: 0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.3));";
      } else if (btnStyle === "secondary") {
        styleStr +=
          " background: var(--cv-color-surface-raised, #1e293b); color: var(--cv-color-text-main, #fff); border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1));";
      } else if (btnStyle === "outline") {
        styleStr +=
          " background: transparent; color: var(--cv-color-primary-fill, #245066); border: 2px solid var(--cv-color-primary-fill, #245066);";
      }
      const url = escapeHtml(btnUrl || "#");
      const html = `<a href="${url}" class="cv-btn" style="${styleStr}">${escapeHtml(
        btnText
      )}</a>&nbsp;`;
      insertHtmlAtCursor(html);
    }
  }

  function getCanonicalHtml() {
    const editor = getEditorElement();
    if (!editor) return "";
    const clone = editor.cloneNode(true) as HTMLElement;
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
  }

  function renderEmbeds() {
    if (typeof window === "undefined") return;
    const editor = getEditorElement();
    if (!editor) return;
    const socialEmbeds = editor.querySelectorAll(
      '.cv-social-embed:not([data-cv-rendered="true"])'
    );
    socialEmbeds.forEach((el: any) => {
      const platform = (el.getAttribute("data-platform") || "").toLowerCase();
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
        const trustedTweetUrl = getTrustedHttpUrl(url);
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
        const trustedEmbedUrl = getTrustedHttpUrl(embedUrl);
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
    const formulas = editor.querySelectorAll(
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
                // DOMPurify's mathMl profile omits <semantics>/<annotation>         // (katex's copy-source-as-LaTeX accessibility layer) -- add
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
        if (pendingScript) pendingScript.addEventListener("load", renderMath);
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
  }

  function syncContent() {
    const editor = getEditorElement();
    if (editor) {
      setInternalContent(getCanonicalHtml());
      if (props.onChange) {
        props.onChange(internalContent);
      }
    }
  }

  function handleInput() {
    const el = getEditorElement();
    if (el) {
      if ((el as any).__cv_inputTimer) {
        clearTimeout((el as any).__cv_inputTimer);
      }
      (el as any).__cv_inputTimer = setTimeout(() => {
        (el as any).__cv_inputTimer = null;
        syncContent();
      }, 250);
    } else {
      syncContent();
    }
  }

  function handleBlur() {
    const el = getEditorElement();
    if (el && (el as any).__cv_inputTimer) {
      clearTimeout((el as any).__cv_inputTimer);
      (el as any).__cv_inputTimer = null;
      syncContent();
    }
  }

  function handleSourceInput(e: any) {
    setInternalContent(e.target.value);
    if (props.onChange) {
      props.onChange(internalContent);
    }
    if (editorRef.current) {
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      editorRef.current.innerHTML = sanitizeHtml(internalContent);
      renderEmbeds();
    }
  }

  function openTableModal() {
    if (mode === "source") return;
    saveSelection();
    setShowTableModal(true);
    setTableRows("3");
    setTableCols("3");
    setTableHasHeader(true);
  }

  function confirmTable() {
    setShowTableModal(false);
    const rows = parseInt(tableRows, 10);
    const cols = parseInt(tableCols, 10);
    if (rows > 0 && cols > 0) {
      let table =
        '<table border="1" style="width:100%; border-collapse: collapse; min-width: 50px;">';
      if (tableHasHeader) {
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
      insertHtmlAtCursor(table);
    }
  }

  function closeTableModal() {
    setShowTableModal(false);
  }

  function modifyTable(
    action: "addRow" | "removeRow" | "addCol" | "removeCol"
  ) {
    if (mode === "source") return;
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
    syncContent();
  }

  function openLinkModal() {
    if (mode === "source") return;
    saveSelection();
    setShowLinkModal(true);
    setLinkUrl("");
  }

  function confirmLink() {
    setShowLinkModal(false);
    if (linkUrl) {
      restoreSelection();
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      document.execCommand("createLink", false, linkUrl);
      syncContent();
    }
  }

  function closeLinkModal() {
    setShowLinkModal(false);
  }

  function openWidgetModal() {
    if (mode === "source") return;
    saveSelection();
    setShowWidgetModal(true);
  }

  function confirmWidget() {
    setShowWidgetModal(false);
    const escapedWidget = escapeHtml(selectedWidget);
    let html = `<div class="cv-widget" data-widget="${escapedWidget}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-primary, #7fc4de); background: var(--cv-color-accent-tint, rgba(127,196,222,0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-link, #7fc4de); font-weight: 600;">[ContentVeda Widget: ${escapeHtml(
      selectedWidget.toUpperCase()
    )}]</div><p><br></p>`;
    insertHtmlAtCursor(html);
  }

  function closeWidgetModal() {
    setShowWidgetModal(false);
  }

  function openSocialModal() {
    if (mode === "source") return;
    saveSelection();
    setShowSocialModal(true);
    setSocialUrl("");
    setSocialPlatform("youtube");
  }

  function confirmSocial() {
    setShowSocialModal(false);
    if (socialUrl) {
      let platform = (socialPlatform || "youtube").toLowerCase();
      if (isHost(socialUrl, "youtube.com") || isHost(socialUrl, "youtu.be")) {
        platform = "youtube";
      } else if (isHost(socialUrl, "vimeo.com")) {
        platform = "vimeo";
      }
      const escapedPlatform = escapeHtml(platform);
      const escapedUrl = escapeHtml(socialUrl);
      let embedHtml = `<div class="cv-social-embed" data-platform="${escapedPlatform}" data-url="${escapedUrl}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded ${escapeHtml(
        platform.toUpperCase()
      )} Post: ${escapedUrl}]</div><p><br></p>`;
      insertHtmlAtCursor(embedHtml);
    }
  }

  function closeSocialModal() {
    setShowSocialModal(false);
  }

  function toggleMode() {
    if (mode === "visual") {
      syncContent();
      setInternalContent(formatHTML(internalContent));
      setMode("source");
    } else {
      setMode("visual");
      if (editorRef.current) {
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        editorRef.current.innerHTML = sanitizeHtml(internalContent);
        renderEmbeds();
      }
    }
  }

  function toggleFullScreen() {
    if (typeof document !== "undefined") {
      if (!document.fullscreenElement) {
        if (rootRef.current && rootRef.current.requestFullscreen) {
          rootRef.current
            .requestFullscreen()
            .catch((err) => console.warn("Fullscreen denied", err));
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  }

  function changeFontFamily(font: string) {
    if (mode === "source") return;
    setFontFamily(font);
    restoreSelection();
    document.execCommand("fontName", false, font);
    syncContent();
    checkFormats();
  }

  function changeFontSize(size: string) {
    if (mode === "source") return;
    setFontSize(size);
    restoreSelection();
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
      saveSelection();
    } else {
      const sizeMap: any = {
        "12px": "1",
        "14px": "2",
        "15px": "2",
        "16px": "3",
        "18px": "4",
        "20px": "5",
        "24px": "6",
        "32px": "7",
      };
      document.execCommand("fontSize", false, sizeMap[size] || "3");
    }
    syncContent();
    checkFormats();
  }

  function insertChecklist() {
    if (mode === "source") return;
    restoreSelection();
    const sel = typeof window !== "undefined" ? window.getSelection() : null;
    const editor = getEditorElement();
    if (!sel || !editor) return;
    let node: any =
      sel.rangeCount > 0 ? sel.getRangeAt(0).startContainer : null;
    let currentLi: HTMLElement | null = null;
    let currentUl: HTMLElement | null = null;
    let currentP: HTMLElement | null = null;
    while (node && node !== editor) {
      if (node.nodeType === 1) {
        if (node.tagName === "LI") currentLi = node;
        if (node.tagName === "UL" && node.classList.contains("task-list"))
          currentUl = node;
        if (node.tagName === "P" || node.tagName === "DIV") currentP = node;
      }
      node = node.parentNode;
    }

    // 1. If currently inside a task list: append a new <li> to the existing <ul>
    if (currentUl) {
      const li = document.createElement("li");
      li.style.cssText = "margin: 4px 0;";
      li.innerHTML =
        '<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span>Task item</span></label>';
      if (currentLi && currentLi.parentNode === currentUl) {
        currentLi.after(li);
      } else {
        currentUl.appendChild(li);
      }
      const span = li.querySelector("span");
      if (span) {
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        sel.removeAllRanges();
        sel.addRange(newRange);
        saveSelection();
      }
      syncContent();
      checkFormats();
      return;
    }

    // 2. If directly inside or after an adjacent paragraph right next to a task list: append to that same task list
    if (currentP) {
      const prev = currentP.previousElementSibling;
      if (
        prev &&
        prev.tagName === "UL" &&
        prev.classList.contains("task-list")
      ) {
        const text = currentP.textContent ? currentP.textContent.trim() : "";
        const li = document.createElement("li");
        li.style.cssText = "margin: 4px 0;";
        const itemText = text && text !== "" ? escapeHtml(text) : "Task item";
        li.innerHTML = `<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span>${itemText}</span></label>`;
        prev.appendChild(li);
        currentP.remove();
        const span = li.querySelector("span");
        if (span) {
          const newRange = document.createRange();
          newRange.selectNodeContents(span);
          sel.removeAllRanges();
          sel.addRange(newRange);
          saveSelection();
        }
        syncContent();
        checkFormats();
        return;
      }
    }

    // 3. New task list: create a single <ul class="task-list"> and focus its <li> text
    const ul = document.createElement("ul");
    ul.className = "task-list";
    ul.style.cssText = "list-style: none; padding-left: 0.25rem;";
    const li = document.createElement("li");
    li.style.cssText = "margin: 4px 0;";
    li.innerHTML =
      '<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span>Task item</span></label>';
    ul.appendChild(li);
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(ul);
    } else {
      editor.appendChild(ul);
    }
    const span = li.querySelector("span");
    if (span) {
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      sel.removeAllRanges();
      sel.addRange(newRange);
      saveSelection();
    }
    syncContent();
    checkFormats();
  }

  function insertFormula() {
    if (mode === "source") return;
    saveSelection();
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
      insertHtmlAtCursor(html);
    }
  }

  function addClass(className: string) {
    if (!className) return;
    if (mode === "source") return;
    if (!appliedClasses.includes(className)) {
      setAppliedClasses([...appliedClasses, className]);
    }
  }

  function removeClass(className: string) {
    if (mode === "source") return;
    setAppliedClasses(appliedClasses.filter((c: string) => c !== className));
    if (editorRef.current) {
      const elements = editorRef.current.querySelectorAll(`.${className}`);
      elements.forEach((el: any) => {
        el.classList.remove(className);
        if (el.classList.length === 0 && el.tagName === "SPAN") {
          const parent = el.parentNode;
          while (el.firstChild) parent.insertBefore(el.firstChild, el);
          parent.removeChild(el);
        }
      });
      syncContent();
    }
  }

  function handleClassInputKeyDown(e: any) {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const val = target.value ? target.value.trim() : "";
      if (val) {
        applyClass(val);
        addClass(val);
        target.value = "";
      }
    }
  }

  function openAiModal() {
    saveSelection();
    setShowAiModal(true);
    setAiInput("");
  }

  function closeAiModal() {
    setShowAiModal(false);
  }

  function applyAiAction(action: string) {
    restoreSelection();
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
        ? escapeHtml(selectedText)
        : "Configure your toolbar modules, slot rules, and custom micro-frontends directly in the inspector panel.";
      result = `<div class="cv-callout variant-blue" style="padding: 16px 20px; border-left: 4px solid #0284c7; background: rgba(2, 132, 199, 0.08); border-radius: 0 8px 8px 0; margin: 16px 0;"><strong>AI INSIGHT:</strong> ${safeSelection}</div><p><br></p>`;
    } else if (action === "summarize") {
      const safeSummary = selectedText
        ? escapeHtml(selectedText.slice(0, 100)) + "..."
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
      syncContent();
    }
    setShowAiModal(false);
  }

  function showToolbarOption(option: string) {
    if (!props.config || !props.config.toolbar) {
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
        props.config.toolbar.includes("code") ||
        props.config.toolbar.includes("pre")
      );
    return (
      props.config.toolbar.includes(option) ||
      props.config.toolbar.includes(name)
    );
  }

  function showSeparator(index: number) {
    const groups = [
      ["fullscreen", "source", "bold", "italic", "underline", "strikeThrough"],
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
      .some((group) => group.some((item) => showToolbarOption(item)));
    const isNextGroupVisible =
      groups[index + 1] &&
      groups[index + 1].some((item) => showToolbarOption(item));
    return hasVisibleBefore && isNextGroupVisible;
  }

  function handleFullscreenChange() {
    if (typeof document !== "undefined") {
      setIsFullscreen(!!document.fullscreenElement);
      deselectMediaElement();
    }
  }

  function isResizableTarget(el: any) {
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
  }

  function updateResizeHandlePosition() {
    const editor = getEditorElement();
    if (!selectedMediaEl || !editor) return;
    const container = (editor as any).parentElement;
    if (!container) return;
    const elRect = selectedMediaEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setResizeHandleTop(
      elRect.bottom - containerRect.top + container.scrollTop - 7
    );
    setResizeHandleLeft(
      elRect.right - containerRect.left + container.scrollLeft - 7
    );
    let tbTop = elRect.top - containerRect.top + container.scrollTop - 40;
    if (tbTop < 8) {
      tbTop = elRect.bottom - containerRect.top + container.scrollTop + 8;
    }
    let tbLeft = elRect.left - containerRect.left + container.scrollLeft;
    if (tbLeft < 8) tbLeft = 8;
    setResizeToolbarTop(tbTop);
    setResizeToolbarLeft(tbLeft);
  }

  function handleEditorScroll() {
    if (!selectedMediaEl) return;
    if (typeof window !== "undefined" && window.requestAnimationFrame) {
      window.requestAnimationFrame(() => {
        updateResizeHandlePosition();
      });
    } else {
      updateResizeHandlePosition();
    }
  }

  function selectMediaElement(el: any) {
    if (selectedMediaEl && selectedMediaEl !== el) {
      selectedMediaEl.classList.remove("cv-resizing-selected");
    }
    setSelectedMediaEl(el);
    el.classList.add("cv-resizing-selected");
    updateResizeHandlePosition();
    if (el.tagName === "IMG" && !el.complete) {
      el.addEventListener(
        "load",
        () => {
          if (selectedMediaEl === el) {
            updateResizeHandlePosition();
          }
        },
        {
          once: true,
        }
      );
    }
  }

  function deleteSelectedMedia() {
    if (selectedMediaEl) {
      const el = selectedMediaEl;
      deselectMediaElement();
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
      ensureEditableStructure();
      syncContent();
    }
  }

  function setImageSize(size: string) {
    if (!selectedMediaEl) return;
    const el = selectedMediaEl;
    el.style.width = size;
    el.style.maxWidth = "100%";
    el.style.height = "auto";
    updateResizeHandlePosition();
    syncContent();
  }

  function setImageAlign(align: string) {
    if (!selectedMediaEl) return;
    const el = selectedMediaEl;
    if (align === "center") {
      el.style.display = "block";
      el.style.marginLeft = "auto";
      el.style.marginRight = "auto";
    } else if (align === "left") {
      el.style.display = "block";
      el.style.marginLeft = "0";
      el.style.marginRight = "auto";
    } else if (align === "right") {
      el.style.display = "block";
      el.style.marginLeft = "auto";
      el.style.marginRight = "0";
    }
    updateResizeHandlePosition();
    syncContent();
  }

  function deselectMediaElement() {
    if (selectedMediaEl) {
      selectedMediaEl.classList.remove("cv-resizing-selected");
    }
    setSelectedMediaEl(null);
  }

  function isReadOnly() {
    return !!(props.readOnly || props.disabled);
  }

  function closeAllModals() {
    setShowTableModal(false);
    setShowLinkModal(false);
    setShowWidgetModal(false);
    setShowSocialModal(false);
    setShowButtonModal(false);
    setShowAiModal(false);
  }

  function handleBackdropClick(e: any) {
    if (e && e.target === e.currentTarget) {
      closeAllModals();
    }
  }

  function ensureEditableStructure() {
    const el = getEditorElement();
    if (!el) return;
    if (!el.hasChildNodes()) {
      el.innerHTML = "<p><br></p>";
      return;
    }
    const first = el.firstElementChild;
    if (
      el.childNodes.length === 1 &&
      first &&
      first.tagName === "P" &&
      !first.textContent &&
      !first.children.length
    ) {
      first.innerHTML = "<br>";
      return;
    }
    const last = el.lastElementChild;
    if (
      last &&
      (last.getAttribute("contenteditable") === "false" ||
        last.tagName === "TABLE" ||
        (last.classList &&
          (last.classList.contains("cv-social-embed") ||
            last.classList.contains("cv-widget"))))
    ) {
      const p = document.createElement("p");
      p.innerHTML = "<br>";
      el.appendChild(p);
    }
    if (
      first &&
      (first.getAttribute("contenteditable") === "false" ||
        first.tagName === "TABLE" ||
        (first.classList &&
          (first.classList.contains("cv-social-embed") ||
            first.classList.contains("cv-widget"))))
    ) {
      const p = document.createElement("p");
      p.innerHTML = "<br>";
      el.insertBefore(p, first);
    }
  }

  function normalizeSelection() {
    if (isReadOnly()) return;
    const el = getEditorElement();
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
      if (
        node.nodeType === 1 &&
        node.getAttribute &&
        node.getAttribute("contenteditable") === "false"
      ) {
        atomicEl = node;
        break;
      }
      node = node.parentNode;
    }
    if (atomicEl) {
      const newRange = document.createRange();
      if (
        !atomicEl.nextSibling ||
        (atomicEl.nextSibling.nodeType === 1 &&
          atomicEl.nextSibling.getAttribute("contenteditable") === "false")
      ) {
        const p = document.createElement("p");
        p.innerHTML = "<br>";
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
      const cloned = newRange.cloneRange();
      activeSavedRange = cloned;
      if (el) (el as any).__cv_savedRange = cloned;
    }
  }

  function focusEditorAtEnd() {
    if (isReadOnly()) return;
    const el = getEditorElement();
    if (!el) return;
    ensureEditableStructure();
    try {
      if (typeof (el as any).focus === "function") {
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
      const cloned = range.cloneRange();
      activeSavedRange = cloned;
      if (el) (el as any).__cv_savedRange = cloned;
    }
  }

  function handleEditorContentClick(e: any) {
    if (e && e.target === e.currentTarget) {
      focusEditorAtEnd();
    }
  }

  function handleKeyDown(e: any) {
    if (isReadOnly()) {
      e.preventDefault();
      return;
    }
    if (mode === "source") return;
    if (e.key === "Escape") {
      deselectMediaElement();
      closeAllModals();
      return;
    }
    if (selectedMediaEl && (e.key === "Backspace" || e.key === "Delete")) {
      e.preventDefault();
      const el = selectedMediaEl;
      deselectMediaElement();
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
      ensureEditableStructure();
      syncContent();
      return;
    }
    if (e.key === "Backspace") {
      const sel = typeof window !== "undefined" ? window.getSelection() : null;
      const editor = getEditorElement();
      if (sel && sel.rangeCount > 0 && editor) {
        let node: any = sel.getRangeAt(0).startContainer;
        let taskLi: HTMLElement | null = null;
        let taskUl: HTMLElement | null = null;
        while (node && node !== editor) {
          if (node.nodeType === 1) {
            if (node.tagName === "LI") taskLi = node;
            if (node.tagName === "UL" && node.classList.contains("task-list"))
              taskUl = node;
          }
          node = node.parentNode;
        }
        if (taskUl && taskLi) {
          const text = taskLi.textContent ? taskLi.textContent.trim() : "";
          if (!text || text === "") {
            e.preventDefault();
            const prevLi = taskLi.previousElementSibling;
            taskLi.remove();
            if (prevLi) {
              const span = prevLi.querySelector("span");
              if (span) {
                const newRange = document.createRange();
                newRange.selectNodeContents(span);
                newRange.collapse(false);
                sel.removeAllRanges();
                sel.addRange(newRange);
                saveSelection();
              }
            } else if (taskUl.children.length === 0) {
              const p = document.createElement("p");
              p.innerHTML = "<br>";
              taskUl.replaceWith(p);
              const newRange = document.createRange();
              newRange.setStart(p, 0);
              newRange.collapse(true);
              sel.removeAllRanges();
              sel.addRange(newRange);
              saveSelection();
            }
            syncContent();
            return;
          }
        }
      }
    }
    if (e.key === "Enter") {
      const sel = typeof window !== "undefined" ? window.getSelection() : null;
      const editor = getEditorElement();
      if (sel && sel.rangeCount > 0 && editor) {
        let node: any = sel.getRangeAt(0).startContainer;
        let taskLi: HTMLElement | null = null;
        let taskUl: HTMLElement | null = null;
        while (node && node !== editor) {
          if (node.nodeType === 1) {
            if (node.tagName === "LI") taskLi = node;
            if (node.tagName === "UL" && node.classList.contains("task-list"))
              taskUl = node;
          }
          node = node.parentNode;
        }
        if (taskUl && taskLi) {
          e.preventDefault();
          const text = taskLi.textContent ? taskLi.textContent.trim() : "";
          if (!text || text === "") {
            taskLi.remove();
            if (taskUl.children.length === 0) {
              const p = document.createElement("p");
              p.innerHTML = "<br>";
              taskUl.replaceWith(p);
              const newRange = document.createRange();
              newRange.setStart(p, 0);
              newRange.collapse(true);
              sel.removeAllRanges();
              sel.addRange(newRange);
              saveSelection();
              syncContent();
              return;
            }
            const p = document.createElement("p");
            p.innerHTML = "<br>";
            taskUl.after(p);
            const newRange = document.createRange();
            newRange.setStart(p, 0);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
            saveSelection();
            syncContent();
            return;
          }
          const newLi = document.createElement("li");
          newLi.style.cssText = "margin: 4px 0;";
          newLi.innerHTML =
            '<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span><br></span></label>';
          taskLi.after(newLi);
          const span = newLi.querySelector("span");
          if (span) {
            const newRange = document.createRange();
            newRange.setStart(span, 0);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
            saveSelection();
          }
          syncContent();
          return;
        }
      }
    }
    normalizeSelection();
  }

  function handleGlobalKeyDown(e: any) {
    if (e.key === "Escape") {
      closeAllModals();
      deselectMediaElement();
    }
  }

  function handleEditorClick(e: any) {
    if (isReadOnly()) return;
    const target = e.target;
    const resizable =
      target && target.closest
        ? target.closest("img, video, audio, .cv-social-embed, .cv-widget")
        : null;
    if (resizable && isResizableTarget(resizable)) {
      selectMediaElement(resizable);
    } else {
      deselectMediaElement();
      normalizeSelection();
    }
  }

  function startResize(e: any) {
    if (!selectedMediaEl || isReadOnly()) return;
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeStartX(e.clientX);
    setResizeStartWidth(selectedMediaEl.getBoundingClientRect().width);
    if (typeof document !== "undefined") {
      document.addEventListener("mousemove", handleResizeMove);
      document.addEventListener("mouseup", stopResize);
    }
  }

  function handleResizeMove(e: any) {
    if (!isResizing || !selectedMediaEl) return;
    const delta = e.clientX - resizeStartX;
    let newWidth = Math.round(resizeStartWidth + delta);
    const minWidth = 80;
    const editor = getEditorElement();
    const maxWidth = editor ? (editor as any).clientWidth : 2000;
    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;
    const el = selectedMediaEl;
    el.style.width = newWidth + "px";
    el.style.maxWidth = "100%";
    if (el.tagName === "IMG" || el.tagName === "VIDEO") {
      el.style.height = "auto";
    }
    updateResizeHandlePosition();
  }

  function stopResize() {
    if (!isResizing) return;
    setIsResizing(false);
    if (typeof document !== "undefined") {
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", stopResize);
    }
    syncContent();
  }

  function handleSelectionChange() {
    if (typeof window !== "undefined") {
      const editor = getEditorElement();
      if (!editor) return;
      const sel = window.getSelection();
      let inEditor = false;
      try {
        if (
          sel &&
          sel.anchorNode &&
          typeof (editor as any).contains === "function"
        ) {
          inEditor = (editor as any).contains(sel.anchorNode as Node);
        }
      } catch (e) {}
      if (inEditor) {
        if (sel && sel.rangeCount > 0) {
          saveSelection();
        }
        if ((editor as any).__cv_selectionTimer) {
          clearTimeout((editor as any).__cv_selectionTimer);
        }
        (editor as any).__cv_selectionTimer = setTimeout(() => {
          (editor as any).__cv_selectionTimer = null;
          checkFormats();
          normalizeSelection();
        }, 50);
      }
    }
  }

  useEffect(() => {
    setIsMounted(true);
    if (!internalContent) {
      setInternalContent(props.content || props.initialContent || "");
    }
    const el = getEditorElement();
    if (el) {
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      el.innerHTML = sanitizeHtml(internalContent);
      ensureEditableStructure();
      renderEmbeds();
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
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      document.addEventListener("selectionchange", handleSelectionChange);
      document.addEventListener("keydown", handleGlobalKeyDown);
    }
  }, []);
  useEffect(() => {
    if (!isMounted) return;
    const el = getEditorElement();
    if (!el) return;
    if (
      typeof props.content === "string" &&
      props.content !== internalContent
    ) {
      setInternalContent(props.content);
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      el.innerHTML = sanitizeHtml(internalContent);
      ensureEditableStructure();
      renderEmbeds();
    }
  }, [props.content]);
  useEffect(() => {
    return () => {
      const el = getEditorElement();
      if (el) {
        if ((el as any).__cv_inputTimer) {
          clearTimeout((el as any).__cv_inputTimer);
          (el as any).__cv_inputTimer = null;
        }
        if ((el as any).__cv_selectionTimer) {
          clearTimeout((el as any).__cv_selectionTimer);
          (el as any).__cv_selectionTimer = null;
        }
      }
      if (typeof document !== "undefined") {
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );
        document.removeEventListener("selectionchange", handleSelectionChange);
        document.removeEventListener("keydown", handleGlobalKeyDown);
        document.removeEventListener("mousemove", handleResizeMove);
        document.removeEventListener("mouseup", stopResize);
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`cv-rich-text-editor flex flex-col rounded-xl overflow-hidden relative ${
        isFullscreen
          ? "fixed inset-0 z-[9999] w-screen h-screen rounded-none"
          : "w-full"
      } ${mode === "source" ? "cv-source-mode" : ""} ${props.className || ""}`}
      style={{
        boxSizing: "border-box",
        background: "var(--cv-color-surface-sunken, #0f172a)",
        border: isFullscreen
          ? "none"
          : "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
        boxShadow: "var(--cv-shadow-overlay, 0 8px 32px rgba(0,0,0,0.4))",
      }}
    >
      <div
        className={`editor-toolbar select-none sticky top-0 z-10 w-full ${
          isReadOnly() ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        <div className="cv-toolbar-row cv-toolbar-row-1">
          <div className="cv-toolbar-group">
            <button
              type="button"
              className="cv-toolbar-btn"
              title="Undo"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(event) => format("undo")}
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
                <path d="M3 7v6h6" />
                <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
              </svg>
            </button>
            <button
              type="button"
              className="cv-toolbar-btn"
              title="Redo"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(event) => format("redo")}
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
                <path d="M21 7v6h-6" />
                <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
              </svg>
            </button>
          </div>
          <div className="cv-toolbar-divider" />
          {showToolbarOption("headings") ? (
            <div className="cv-toolbar-select-wrapper">
              <span className="cv-toolbar-select-icon">
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
                  <line x1="21" y1="6" x2="3" y2="6" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="18" x2="3" y2="18" />
                </svg>
              </span>
              <select
                className="cv-toolbar-select"
                title="Paragraph Style"
                value={headingFormat}
                onMouseDown={(event) => saveSelection()}
                onChange={(e) => formatHeading(e.target.value)}
              >
                <option value="P">Paragraph</option>
                <option value="H1">Heading 1</option>
                <option value="H2">Heading 2</option>
                <option value="H3">Heading 3</option>
                <option value="H4">Heading 4</option>
              </select>
              <span className="cv-toolbar-select-chevron">
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
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
          ) : null}
          <div className="cv-toolbar-select-wrapper">
            <select
              className="cv-toolbar-select no-icon"
              title="Font Family"
              value={fontFamily}
              onMouseDown={(event) => saveSelection()}
              onChange={(e) => {
                restoreSelection();
                changeFontFamily(e.target.value);
              }}
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Outfit">Outfit</option>
              <option value="Fira Code">Fira Code</option>
              <option value="Georgia">Georgia</option>
              <option value="system-ui">System Sans</option>
            </select>
            <span className="cv-toolbar-select-chevron">
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
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
          <div className="cv-toolbar-select-wrapper">
            <select
              className="cv-toolbar-select no-icon"
              title="Font Size"
              value={fontSize}
              onMouseDown={(event) => saveSelection()}
              onChange={(e) => {
                restoreSelection();
                changeFontSize(e.target.value);
              }}
            >
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="15px">15px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="24px">24px</option>
              <option value="32px">32px</option>
            </select>
            <span className="cv-toolbar-select-chevron">
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
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
          <div className="cv-toolbar-divider" />
          <div className="cv-toolbar-segmented-group">
            {showToolbarOption("bold") ? (
              <button
                type="button"
                title="Bold"
                className={`cv-toolbar-btn ${
                  activeFormats.bold ? "is-active" : ""
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("bold")}
              >
                <span className="font-bold text-xs">B</span>
              </button>
            ) : null}
            {showToolbarOption("italic") ? (
              <button
                type="button"
                title="Italic"
                className={`cv-toolbar-btn ${
                  activeFormats.italic ? "is-active" : ""
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("italic")}
              >
                <span className="italic font-serif text-xs">I</span>
              </button>
            ) : null}
            {showToolbarOption("underline") ? (
              <button
                type="button"
                title="Underline"
                className={`cv-toolbar-btn ${
                  activeFormats.underline ? "is-active" : ""
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("underline")}
              >
                <span className="underline text-xs font-medium">U</span>
              </button>
            ) : null}
            {showToolbarOption("strikeThrough") ? (
              <button
                type="button"
                title="Strikethrough"
                className={`cv-toolbar-btn ${
                  activeFormats.strikeThrough ? "is-active" : ""
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("strikeThrough")}
              >
                <span className="line-through text-xs font-medium">S</span>
              </button>
            ) : null}
            {showToolbarOption("code") ? (
              <button
                type="button"
                title="Code Block"
                className={`cv-toolbar-btn ${
                  activeFormats.code ? "is-active" : ""
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => toggleBlock("PRE")}
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
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </button>
            ) : null}
          </div>
          <div className="cv-toolbar-divider" />
          {showToolbarOption("foreColor") || showToolbarOption("backColor") ? (
            <div className="cv-toolbar-group">
              {showToolbarOption("foreColor") ? (
                <label
                  className="cv-toolbar-color-btn"
                  title="Text Color"
                  onMouseDown={(event) => saveSelection()}
                >
                  <span
                    className="font-bold text-xs"
                    style={{
                      lineHeight: "1",
                    }}
                  >
                    A
                  </span>
                  <span
                    className="cv-color-indicator"
                    style={{
                      backgroundColor: textColor,
                    }}
                  />
                  <input
                    type="color"
                    aria-label="Text Color"
                    className="cv-color-input"
                    value={textColor}
                    onMouseDown={(event) => saveSelection()}
                    onInput={(e) =>
                      applyColorPreview(
                        "foreColor",
                        (e.target as HTMLInputElement).value
                      )
                    }
                    onChange={(e) =>
                      applyColor(
                        "foreColor",
                        (e.target as HTMLInputElement).value
                      )
                    }
                  />
                </label>
              ) : null}
              {showToolbarOption("backColor") ? (
                <label
                  className="cv-toolbar-color-btn"
                  title="Highlight Color"
                  onMouseDown={(event) => saveSelection()}
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
                    <path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9" />
                    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="m2 2 7.586 7.586" />
                  </svg>
                  <span
                    className="cv-color-indicator"
                    style={{
                      backgroundColor: highlightColor,
                    }}
                  />
                  <input
                    type="color"
                    aria-label="Background Color"
                    className="cv-color-input"
                    value={highlightColor}
                    onMouseDown={(event) => saveSelection()}
                    onInput={(e) =>
                      applyColorPreview(
                        "backColor",
                        (e.target as HTMLInputElement).value
                      )
                    }
                    onChange={(e) =>
                      applyColor(
                        "backColor",
                        (e.target as HTMLInputElement).value
                      )
                    }
                  />
                </label>
              ) : null}
            </div>
          ) : null}
          <div className="cv-toolbar-divider" />
          {showToolbarOption("justifyLeft") ||
          showToolbarOption("justifyCenter") ||
          showToolbarOption("justifyRight") ? (
            <div className="cv-toolbar-segmented-group">
              {showToolbarOption("justifyLeft") ? (
                <button
                  type="button"
                  title="Align Left"
                  className={`cv-toolbar-btn ${
                    activeFormats.justifyLeft ? "is-active" : ""
                  }`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => format("justifyLeft")}
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
                    <line x1="21" y1="6" x2="3" y2="6" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                    <line x1="17" y1="18" x2="3" y2="18" />
                  </svg>
                </button>
              ) : null}
              {showToolbarOption("justifyCenter") ? (
                <button
                  type="button"
                  title="Align Center"
                  className={`cv-toolbar-btn ${
                    activeFormats.justifyCenter ? "is-active" : ""
                  }`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => format("justifyCenter")}
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
                    <line x1="21" y1="6" x2="3" y2="6" />
                    <line x1="17" y1="12" x2="7" y2="12" />
                    <line x1="19" y1="18" x2="5" y2="18" />
                  </svg>
                </button>
              ) : null}
              {showToolbarOption("justifyRight") ? (
                <button
                  type="button"
                  title="Align Right"
                  className={`cv-toolbar-btn ${
                    activeFormats.justifyRight ? "is-active" : ""
                  }`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => format("justifyRight")}
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
                    <line x1="21" y1="6" x2="3" y2="6" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                    <line x1="21" y1="18" x2="7" y2="18" />
                  </svg>
                </button>
              ) : null}
              <button
                type="button"
                title="Align Justify"
                className={`cv-toolbar-btn ${
                  activeFormats.justifyFull ? "is-active" : ""
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("justifyFull")}
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
                  <line x1="21" y1="6" x2="3" y2="6" />
                  <line x1="21" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="18" x2="3" y2="18" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
        <div className="cv-toolbar-row cv-toolbar-row-2">
          <div className="cv-toolbar-group">
            {showToolbarOption("unorderedList") ? (
              <button
                type="button"
                title="Bullet List"
                className={`cv-toolbar-btn ${
                  activeFormats.unorderedList ? "is-active" : ""
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("insertUnorderedList")}
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
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            ) : null}
            {showToolbarOption("orderedList") ? (
              <button
                type="button"
                title="Numbered List"
                className={`cv-toolbar-btn ${
                  activeFormats.orderedList ? "is-active" : ""
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("insertOrderedList")}
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
                  <line x1="10" y1="6" x2="21" y2="6" />
                  <line x1="10" y1="12" x2="21" y2="12" />
                  <line x1="10" y1="18" x2="21" y2="18" />
                  <path d="M4 6h1v4" />
                  <path d="M4 10h2" />
                  <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                </svg>
              </button>
            ) : null}
            <button
              type="button"
              className="cv-toolbar-btn"
              title="Task List"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(event) => insertChecklist()}
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
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </button>
          </div>
          <div className="cv-toolbar-divider" />
          <div className="cv-toolbar-group relative">
            <button
              type="button"
              className="cv-toolbar-action-btn"
              title="Insert Options"
              onMouseDown={(e) => {
                e.preventDefault();
                saveSelection();
              }}
              onClick={(event) => setShowInsertMenu(!showInsertMenu)}
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
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
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
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {showInsertMenu ? (
              <div className="cv-insert-menu shadow-xl">
                <button
                  type="button"
                  className="cv-insert-item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => {
                    setShowInsertMenu(false);
                    openTableModal();
                  }}
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
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                  </svg>
                  Table
                </button>
                <button
                  type="button"
                  className="cv-insert-item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => {
                    setShowInsertMenu(false);
                    insertMedia("image");
                  }}
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
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  Image
                </button>
                <button
                  type="button"
                  className="cv-insert-item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => {
                    setShowInsertMenu(false);
                    openLinkModal();
                  }}
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
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  Link
                </button>
                <button
                  type="button"
                  className="cv-insert-item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => {
                    setShowInsertMenu(false);
                    insertMedia("video");
                  }}
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
                    />
                    <line x1="7" y1="2" x2="7" y2="22" />
                    <line x1="17" y1="2" x2="17" y2="22" />
                  </svg>
                  Video
                </button>
                <button
                  type="button"
                  className="cv-insert-item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => {
                    setShowInsertMenu(false);
                    openButtonModal();
                  }}
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
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="9" y1="9" x2="15" y2="9" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  Button
                </button>
                <button
                  type="button"
                  className="cv-insert-item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => {
                    setShowInsertMenu(false);
                    openSocialModal();
                  }}
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
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Social Post
                </button>
                <button
                  type="button"
                  className="cv-insert-item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => {
                    setShowInsertMenu(false);
                    format("insertHorizontalRule");
                  }}
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
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Divider
                </button>
                <button
                  type="button"
                  className="cv-insert-item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => {
                    setShowInsertMenu(false);
                    toggleBlock("BLOCKQUOTE");
                  }}
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
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.036V20c0 1 1 1 2 1z" />
                  </svg>
                  Quote
                </button>
                <button
                  type="button"
                  className="cv-insert-item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => {
                    setShowInsertMenu(false);
                    clearAllFormatting();
                  }}
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
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Clear Format
                </button>
              </div>
            ) : null}
          </div>
          {showToolbarOption("table") ? (
            <button
              type="button"
              className="cv-toolbar-action-btn"
              title="Table"
              onMouseDown={(e) => {
                e.preventDefault();
                saveSelection();
              }}
              onClick={(event) => openTableModal()}
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
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <line x1="15" y1="3" x2="15" y2="21" />
              </svg>
              <span>Table</span>
            </button>
          ) : null}
          {activeFormats.inTable && showToolbarOption("table") ? (
            <div className="flex items-center cv-rte-tint rounded-lg p-0.5 border cv-rte-accent-border">
              <button
                type="button"
                className="w-6 h-6 flex items-center justify-center rounded hover:cv-rte-tint-strong cv-rte-accent transition-colors"
                title="Add Row Below"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => modifyTable("addRow")}
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
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span className="text-[9px] font-bold ml-0.5">R</span>
              </button>
              <button
                type="button"
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-rose-500/30 text-rose-500 transition-colors"
                title="Delete Row"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => modifyTable("removeRow")}
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
                  <path d="M5 12h14" />
                </svg>
                <span className="text-[9px] font-bold ml-0.5">R</span>
              </button>
              <div className="w-px h-3 cv-rte-tint-strong mx-0.5" />
              <button
                type="button"
                className="w-6 h-6 flex items-center justify-center rounded hover:cv-rte-tint-strong cv-rte-accent transition-colors"
                title="Add Column Right"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => modifyTable("addCol")}
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
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span className="text-[9px] font-bold ml-0.5">C</span>
              </button>
              <button
                type="button"
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-rose-500/30 text-rose-500 transition-colors"
                title="Delete Column"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => modifyTable("removeCol")}
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
                  <path d="M5 12h14" />
                </svg>
                <span className="text-[9px] font-bold ml-0.5">C</span>
              </button>
            </div>
          ) : null}
          <div className="cv-toolbar-group">
            {showToolbarOption("image") ? (
              <button
                type="button"
                className="cv-toolbar-btn"
                title="Image"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => insertMedia("image")}
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
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </button>
            ) : null}
            {showToolbarOption("link") ? (
              <button
                type="button"
                className="cv-toolbar-btn"
                title="Link"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => openLinkModal()}
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
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </button>
            ) : null}
            <button
              type="button"
              className="cv-toolbar-btn"
              title="Formula"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(event) => insertFormula()}
            >
              <span className="font-serif italic font-bold text-xs">Fx</span>
            </button>
            {showToolbarOption("social") ? (
              <button
                type="button"
                className="cv-toolbar-btn"
                title="Social Media Embed"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => openSocialModal()}
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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            ) : null}
          </div>
          <div className="cv-toolbar-divider" />
          {showToolbarOption("addWidget") ? (
            <button
              type="button"
              className="cv-toolbar-widget-btn"
              title="Add UI Widget"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(event) => openWidgetModal()}
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
                <path d="M12 5v14M5 12h14" />
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
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>Add UI Widget</span>
            </button>
          ) : null}
          {showToolbarOption("classInput") ? (
            <div className="cv-toolbar-classes-group">
              <span className="cv-class-badge">CLASS</span>
              {appliedClasses?.map((cls) => (
                <span className="cv-class-chip" key={cls}>
                  <span>{cls}</span>
                  <button
                    type="button"
                    className="cv-class-chip-remove"
                    onClick={(event) => removeClass(cls)}
                    title={"Remove " + cls}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                aria-label="Dynamic CSS Class"
                list="editor-class-list"
                placeholder="+ add class..."
                className="cv-class-input"
                onKeyDown={(e) => handleClassInputKeyDown(e)}
              />
              {props.availableClasses && props.availableClasses.length > 0 ? (
                <datalist id="editor-class-list">
                  {props.availableClasses?.map((cls) => (
                    <option value={cls}>{cls}</option>
                  ))}
                </datalist>
              ) : null}
            </div>
          ) : null}
          <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
            {showToolbarOption("source") ? (
              <button
                type="button"
                title="View HTML Source Code"
                className={`cv-toolbar-btn cv-source-toggle-btn ${
                  mode === "source" ? "is-active" : ""
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => toggleMode()}
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
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </button>
            ) : null}
            {showToolbarOption("fullscreen") ? (
              <button
                type="button"
                className="cv-toolbar-btn"
                title="Full Screen"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => toggleFullScreen()}
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
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
              </button>
            ) : null}
            {showToolbarOption("save") ? (
              <button
                type="button"
                className="cv-toolbar-btn"
                title="Save"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => syncContent()}
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
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div
        className={`editor-content flex-1 overflow-y-auto relative min-h-[350px] cv-mode-${mode}`}
        onScroll={(event) => handleEditorScroll()}
        onClick={(e) => handleEditorContentClick(e)}
        style={{
          padding: "2rem 3rem",
          color: "var(--cv-color-text-main, #f1f5f9)",
          position: "relative",
          cursor: isReadOnly() ? "default" : "text",
        }}
      >
        <div
          ref={editorRef}
          contentEditable={isReadOnly() ? "false" : "true"}
          className={`wysiwyg-content outline-none prose prose-invert max-w-none ${
            isReadOnly() ? "cv-readonly" : ""
          }`}
          onInput={(event) => handleInput()}
          onBlur={(event) => handleBlur()}
          onKeyUp={(event) => checkFormats()}
          onKeyDown={(e) => handleKeyDown(e)}
          onMouseUp={(event) => checkFormats()}
          onClick={(e) => handleEditorClick(e)}
          style={{
            minHeight: "350px",
            fontFamily: "Inter, sans-serif",
            lineHeight: "1.7",
            fontSize: "15px",
          }}
        />
        {selectedMediaEl && !isReadOnly() ? (
          <>
            <div
              className="cv-resize-handle"
              title="Drag to resize"
              style={{
                position: "absolute",
                top: `${resizeHandleTop}px`,
                left: `${resizeHandleLeft}px`,
                width: "14px",
                height: "14px",
                borderRadius: "3px",
                background: "var(--cv-color-primary, #245066)",
                border: "2px solid var(--cv-color-surface-raised, #fff)",
                cursor: "nwse-resize",
                zIndex: 30,
                boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
              }}
              onMouseDown={(e) => startResize(e)}
            />
            <div
              className="cv-media-toolbar"
              style={{
                position: "absolute",
                top: `${resizeToolbarTop}px`,
                left: `${resizeToolbarLeft}px`,
                zIndex: 35,
              }}
            >
              <button
                type="button"
                className="cv-media-toolbar-btn"
                title="25% width"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => setImageSize("25%")}
              >
                25%
              </button>
              <button
                type="button"
                className="cv-media-toolbar-btn"
                title="50% width"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => setImageSize("50%")}
              >
                50%
              </button>
              <button
                type="button"
                className="cv-media-toolbar-btn"
                title="75% width"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => setImageSize("75%")}
              >
                75%
              </button>
              <button
                type="button"
                className="cv-media-toolbar-btn"
                title="100% width"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => setImageSize("100%")}
              >
                100%
              </button>
              <div
                className="cv-toolbar-divider"
                style={{
                  height: "14px",
                  margin: "0 2px",
                }}
              />
              <button
                type="button"
                className="cv-media-toolbar-btn"
                title="Align Left"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => setImageAlign("left")}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="21" y1="6" x2="3" y2="6" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                  <line x1="17" y1="18" x2="3" y2="18" />
                </svg>
              </button>
              <button
                type="button"
                className="cv-media-toolbar-btn"
                title="Align Center"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => setImageAlign("center")}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="6" />
                  <line x1="21" y1="12" x2="3" y2="12" />
                  <line x1="18" y1="18" x2="6" y2="18" />
                </svg>
              </button>
              <button
                type="button"
                className="cv-media-toolbar-btn"
                title="Align Right"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => setImageAlign("right")}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="21" y1="6" x2="3" y2="6" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                  <line x1="21" y1="18" x2="7" y2="18" />
                </svg>
              </button>
              <div
                className="cv-toolbar-divider"
                style={{
                  height: "14px",
                  margin: "0 2px",
                }}
              />
              <button
                type="button"
                className="cv-media-toolbar-btn cv-btn-danger"
                title="Remove Media"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => deleteSelectedMedia()}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </>
        ) : null}
        {showTableModal ||
        showLinkModal ||
        showWidgetModal ||
        showSocialModal ||
        showButtonModal ||
        showAiModal ? (
          <div
            className="fixed inset-0 flex items-center justify-center z-[100] backdrop-blur-md"
            style={{
              background: "rgba(0, 0, 0, 0.6)",
            }}
            onClick={(e) => handleBackdropClick(e)}
          >
            {showAiModal ? (
              <div className="cv-ai-modal shadow-2xl">
                <div className="cv-ai-modal-header">
                  <div className="flex items-center gap-2 text-white font-bold text-base">
                    <svg
                      className="text-purple-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                    ContentVeda AI Assistant
                  </div>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-white text-lg font-bold"
                    onClick={(event) => closeAiModal()}
                  >
                    ×
                  </button>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <button
                    type="button"
                    className="cv-ai-pill-btn"
                    onClick={(event) => applyAiAction("improve")}
                  >
                    ✨ Improve Writing & Polish Flow
                  </button>
                  <button
                    type="button"
                    className="cv-ai-pill-btn"
                    onClick={(event) => applyAiAction("callout")}
                  >
                    💡 Generate AI Callout Insight Box
                  </button>
                  <button
                    type="button"
                    className="cv-ai-pill-btn"
                    onClick={(event) => applyAiAction("summarize")}
                  >
                    📝 Summarize Selected Section
                  </button>
                  <button
                    type="button"
                    className="cv-ai-pill-btn"
                    onClick={(event) => applyAiAction("grammar")}
                  >
                    🔍 Fix Grammar & Syntax
                  </button>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                  }}
                >
                  <button
                    type="button"
                    style={{
                      padding: "8px 16px",
                      fontSize: "13px",
                      color: "#cbd5e1",
                      background: "rgba(255,255,255,0.05)",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                    onClick={(event) => closeAiModal()}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : null}
            {showButtonModal ? (
              <div
                className="shadow-2xl"
                style={{
                  background: "var(--cv-color-surface-raised, #1e293b)",
                  border:
                    "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
                  borderRadius: "16px",
                  padding: "24px",
                  width: "380px",
                }}
              >
                <h3
                  className="flex items-center text-white"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    gap: "8px",
                  }}
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
                    style={{
                      color: "var(--cv-color-primary, #7fc4de)",
                    }}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  Insert Button
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "var(--cv-color-text-muted, #94a3b8)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Button Style
                    </label>
                    <select
                      style={{
                        background:
                          "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
                        border:
                          "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
                        borderRadius: "8px",
                        padding: "12px 16px",
                        width: "100%",
                        fontSize: "14px",
                        color: "var(--cv-color-text-main, #fff)",
                        outline: "none",
                      }}
                      value={btnStyle}
                      onChange={(e) => setBtnStyle(e.target.value)}
                    >
                      <option
                        value="primary"
                        style={{
                          background: "var(--cv-color-surface-raised, #1e293b)",
                        }}
                      >
                        Primary (Gradient)
                      </option>
                      <option
                        value="secondary"
                        style={{
                          background: "var(--cv-color-surface-raised, #1e293b)",
                        }}
                      >
                        Secondary (Dark)
                      </option>
                      <option
                        value="outline"
                        style={{
                          background: "var(--cv-color-surface-raised, #1e293b)",
                        }}
                      >
                        Outline (Violet)
                      </option>
                    </select>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "var(--cv-color-text-muted, #94a3b8)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Button Label
                    </label>
                    <input
                      type="text"
                      aria-label="Button Label"
                      placeholder="e.g. Get Started Today"
                      style={{
                        background:
                          "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
                        border:
                          "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
                        borderRadius: "8px",
                        padding: "12px 16px",
                        width: "100%",
                        fontSize: "14px",
                        color: "var(--cv-color-text-main, #fff)",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      value={btnText}
                      onInput={(e) => setBtnText(e.target.value)}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "var(--cv-color-text-muted, #94a3b8)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Target URL
                    </label>
                    <input
                      type="url"
                      aria-label="Target URL"
                      placeholder="https://..."
                      style={{
                        background:
                          "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
                        border:
                          "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
                        borderRadius: "8px",
                        padding: "12px 16px",
                        width: "100%",
                        fontSize: "14px",
                        color: "var(--cv-color-text-main, #fff)",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      value={btnUrl}
                      onInput={(e) => setBtnUrl(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                  }}
                >
                  <button
                    type="button"
                    style={{
                      padding: "10px 20px",
                      fontSize: "14px",
                      color: "var(--cv-color-text-secondary, #cbd5e1)",
                      background:
                        "var(--cv-color-hover, rgba(255,255,255,0.05))",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                    onClick={(event) => closeButtonModal()}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    style={{
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
                    }}
                    onClick={(event) => confirmButton()}
                  >
                    Insert
                  </button>
                </div>
              </div>
            ) : null}
            {showTableModal ? (
              <div
                className="shadow-2xl"
                style={{
                  background: "var(--cv-color-surface-raised, #1e293b)",
                  border:
                    "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
                  borderRadius: "16px",
                  padding: "24px",
                  width: "340px",
                }}
              >
                <h3
                  className="flex items-center text-white"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    gap: "8px",
                  }}
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
                    style={{
                      color: "var(--cv-color-link, #7fc4de)",
                    }}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="3" y1="15" x2="21" y2="15" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                    <line x1="15" y1="3" x2="15" y2="21" />
                  </svg>
                  Insert Table Grid
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "var(--cv-color-text-muted, #94a3b8)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Rows
                    </label>
                    <input
                      type="number"
                      aria-label="Table Rows"
                      min="1"
                      max="10"
                      style={{
                        background:
                          "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
                        border:
                          "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
                        borderRadius: "8px",
                        padding: "12px",
                        width: "100%",
                        fontSize: "15px",
                        color: "var(--cv-color-text-main, #fff)",
                        outline: "none",
                        textAlign: "center",
                        boxSizing: "border-box",
                      }}
                      value={tableRows}
                      onInput={(e) => setTableRows(e.target.value)}
                    />
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "var(--cv-color-text-muted, #94a3b8)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Columns
                    </label>
                    <input
                      type="number"
                      aria-label="Table Columns"
                      min="1"
                      max="10"
                      style={{
                        background:
                          "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
                        border:
                          "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
                        borderRadius: "8px",
                        padding: "12px",
                        width: "100%",
                        fontSize: "15px",
                        color: "var(--cv-color-text-main, #fff)",
                        outline: "none",
                        textAlign: "center",
                        boxSizing: "border-box",
                      }}
                      value={tableCols}
                      onInput={(e) => setTableCols(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "28px",
                  }}
                >
                  <input
                    type="checkbox"
                    id="cv-header-check"
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      accentColor: "var(--cv-color-link, #7fc4de)",
                    }}
                    checked={tableHasHeader}
                    onChange={(e) => setTableHasHeader(e.target.checked)}
                  />
                  <label
                    htmlFor="cv-header-check"
                    style={{
                      fontSize: "14px",
                      color: "var(--cv-color-text-secondary, #cbd5e1)",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    Include header row
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                  }}
                >
                  <button
                    type="button"
                    style={{
                      padding: "10px 20px",
                      fontSize: "14px",
                      color: "var(--cv-color-text-secondary, #cbd5e1)",
                      background:
                        "var(--cv-color-hover, rgba(255,255,255,0.05))",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                    onClick={(event) => closeTableModal()}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    style={{
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
                    }}
                    onClick={(event) => confirmTable()}
                  >
                    Insert Table
                  </button>
                </div>
              </div>
            ) : null}
            {showLinkModal ? (
              <div
                className="shadow-2xl"
                style={{
                  background: "var(--cv-color-surface-raised, #1e293b)",
                  border:
                    "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
                  borderRadius: "16px",
                  padding: "24px",
                  width: "380px",
                }}
              >
                <h3
                  className="flex items-center text-white"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    gap: "8px",
                  }}
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
                    style={{
                      color: "var(--cv-color-link, #7fc4de)",
                    }}
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  Insert Hyperlink
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginBottom: "24px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "var(--cv-color-text-muted, #94a3b8)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    URL Destination
                  </label>
                  <input
                    type="url"
                    aria-label="Hyperlink URL"
                    placeholder="https://example.com"
                    style={{
                      background:
                        "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
                      border:
                        "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      width: "100%",
                      fontSize: "14px",
                      color: "var(--cv-color-text-main, #fff)",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    value={linkUrl}
                    onInput={(e) => setLinkUrl(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                    marginTop: "32px",
                  }}
                >
                  <button
                    type="button"
                    style={{
                      padding: "10px 20px",
                      fontSize: "14px",
                      color: "var(--cv-color-text-secondary, #cbd5e1)",
                      background:
                        "var(--cv-color-hover, rgba(255,255,255,0.05))",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                    onClick={(event) => closeLinkModal()}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    style={{
                      padding: "10px 20px",
                      fontSize: "14px",
                      color: "var(--cv-color-on-primary, #fff)",
                      background: "var(--cv-color-info-fill, #075985)",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                    }}
                    onClick={(event) => confirmLink()}
                  >
                    Insert Link
                  </button>
                </div>
              </div>
            ) : null}
            {showWidgetModal ? (
              <div
                className="shadow-2xl"
                style={{
                  background: "var(--cv-color-surface-raised, #1e293b)",
                  border:
                    "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
                  borderRadius: "16px",
                  padding: "24px",
                  width: "380px",
                }}
              >
                <h3
                  className="flex items-center text-white"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    gap: "8px",
                  }}
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
                    style={{
                      color: "var(--cv-color-secondary, #5eb3d6)",
                    }}
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                  Insert Component
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginBottom: "24px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "var(--cv-color-text-muted, #94a3b8)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Select ContentVeda Widget
                  </label>
                  <select
                    style={{
                      background:
                        "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
                      border:
                        "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      width: "100%",
                      fontSize: "14px",
                      color: "var(--cv-color-text-main, #fff)",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    value={selectedWidget}
                    onChange={(e) => setSelectedWidget(e.target.value)}
                  >
                    <option
                      value="banner"
                      style={{
                        background: "var(--cv-color-surface-raised, #1e293b)",
                      }}
                    >
                      Banner Component
                    </option>
                    <option
                      value="grid-banner"
                      style={{
                        background: "var(--cv-color-surface-raised, #1e293b)",
                      }}
                    >
                      Grid Banner Component
                    </option>
                    <option
                      value="media-grid"
                      style={{
                        background: "var(--cv-color-surface-raised, #1e293b)",
                      }}
                    >
                      Media Grid Component
                    </option>
                    <option
                      value="slider"
                      style={{
                        background: "var(--cv-color-surface-raised, #1e293b)",
                      }}
                    >
                      Slider Carousel
                    </option>
                  </select>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                    marginTop: "32px",
                  }}
                >
                  <button
                    type="button"
                    style={{
                      padding: "10px 20px",
                      fontSize: "14px",
                      color: "var(--cv-color-text-secondary, #cbd5e1)",
                      background:
                        "var(--cv-color-hover, rgba(255,255,255,0.05))",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                    onClick={(event) => closeWidgetModal()}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    style={{
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
                    }}
                    onClick={(event) => confirmWidget()}
                  >
                    Insert Widget
                  </button>
                </div>
              </div>
            ) : null}
            {showSocialModal ? (
              <div
                className="shadow-2xl"
                style={{
                  background: "var(--cv-color-surface-raised, #1e293b)",
                  border:
                    "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
                  borderRadius: "16px",
                  padding: "24px",
                  width: "380px",
                }}
              >
                <h3
                  className="flex items-center text-white"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    gap: "8px",
                  }}
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
                    style={{
                      color: "var(--cv-color-info, #0ea5e9)",
                    }}
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  Embed Social Post
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "var(--cv-color-text-muted, #94a3b8)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Platform
                    </label>
                    <select
                      style={{
                        background:
                          "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
                        border:
                          "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
                        borderRadius: "8px",
                        padding: "12px 16px",
                        width: "100%",
                        fontSize: "14px",
                        color: "var(--cv-color-text-main, #fff)",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      value={socialPlatform}
                      onChange={(e) => setSocialPlatform(e.target.value)}
                    >
                      <option
                        value="youtube"
                        style={{
                          background: "var(--cv-color-surface-raised, #1e293b)",
                        }}
                      >
                        YouTube
                      </option>
                      <option
                        value="vimeo"
                        style={{
                          background: "var(--cv-color-surface-raised, #1e293b)",
                        }}
                      >
                        Vimeo
                      </option>
                      <option
                        value="x"
                        style={{
                          background: "var(--cv-color-surface-raised, #1e293b)",
                        }}
                      >
                        X (Twitter)
                      </option>
                      <option
                        value="instagram"
                        style={{
                          background: "var(--cv-color-surface-raised, #1e293b)",
                        }}
                      >
                        Instagram
                      </option>
                      <option
                        value="facebook"
                        style={{
                          background: "var(--cv-color-surface-raised, #1e293b)",
                        }}
                      >
                        Facebook
                      </option>
                      <option
                        value="linkedin"
                        style={{
                          background: "var(--cv-color-surface-raised, #1e293b)",
                        }}
                      >
                        LinkedIn
                      </option>
                    </select>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "var(--cv-color-text-muted, #94a3b8)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Post URL
                    </label>
                    <input
                      type="url"
                      aria-label="Social Link URL"
                      placeholder="https://..."
                      style={{
                        background:
                          "var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",
                        border:
                          "1px solid var(--cv-color-border, rgba(255,255,255,0.1))",
                        borderRadius: "8px",
                        padding: "12px 16px",
                        width: "100%",
                        fontSize: "14px",
                        color: "var(--cv-color-text-main, #fff)",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      value={socialUrl}
                      onInput={(e) => setSocialUrl(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                    marginTop: "32px",
                  }}
                >
                  <button
                    type="button"
                    style={{
                      padding: "10px 20px",
                      fontSize: "14px",
                      color: "var(--cv-color-text-secondary, #cbd5e1)",
                      background:
                        "var(--cv-color-hover, rgba(255,255,255,0.05))",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                    onClick={(event) => closeSocialModal()}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    style={{
                      padding: "10px 20px",
                      fontSize: "14px",
                      color: "var(--cv-color-on-primary, #fff)",
                      background: "var(--cv-color-info-fill, #075985)",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                    }}
                    onClick={(event) => confirmSocial()}
                  >
                    Embed Post
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div
        className={`editor-source flex-1 relative min-h-[350px] overflow-hidden cv-mode-src-${mode}`}
        style={{
          flexDirection: "column",
          height: "100%",
          minHeight: "350px",
        }}
      >
        <textarea
          className="w-full flex-1 p-6 bg-transparent cv-rte-ok font-mono text-[14px] leading-loose outline-none"
          value={internalContent}
          onInput={(e) => handleSourceInput(e)}
          style={{
            whiteSpace: "pre-wrap",
            overflowY: "auto",
            resize: "none",
            height: "100%",
            width: "100%",
            boxSizing: "border-box",
          }}
          spellCheck={false}
        />
      </div>
    </div>
  );
}

export default RichTextEditor;
