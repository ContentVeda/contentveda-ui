"use client";
import * as React from "react";
import { useState, useRef, useEffect } from "react";

export interface RichTextEditorConfig {
  toolbar?: string[];
}
export interface RichTextEditorProps {
  content?: string;
  initialContent?: string;
  onChange?: (content: string) => void;
  onMediaRequest?: (type: "image" | "video" | "audio") => Promise<string>;
  availableClasses?: string[];
  className?: string;
  config?: RichTextEditorConfig;
}

function RichTextEditor(props: RichTextEditorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<any>(null);
  const [mode, setMode] = useState(() => "visual");

  const [isFullscreen, setIsFullscreen] = useState(() => false);

  const [internalContent, setInternalContent] = useState(
    () => props.content || props.initialContent || ""
  );

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

  const [activeFormats, setActiveFormats] = useState(() => ({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
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
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        let node = sel.getRangeAt(0).startContainer as any;
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
      setActiveFormats({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strikeThrough: document.queryCommandState("strikeThrough"),
        justifyLeft: document.queryCommandState("justifyLeft"),
        justifyCenter: document.queryCommandState("justifyCenter"),
        justifyRight: document.queryCommandState("justifyRight"),
        unorderedList: document.queryCommandState("insertUnorderedList"),
        orderedList: document.queryCommandState("insertOrderedList"),
        quote: isQuote,
        code: isCode,
        inTable: inTable,
      });
      const formatBlock = document.queryCommandValue("formatBlock");
      if (formatBlock) {
        if (formatBlock.includes("1")) setHeadingFormat("H1");
        else if (formatBlock.includes("2")) setHeadingFormat("H2");
        else if (formatBlock.includes("3")) setHeadingFormat("H3");
        else if (formatBlock.includes("4")) setHeadingFormat("H4");
        else if (formatBlock.toLowerCase().includes("blockquote")) {
          activeFormats.quote = true;
          setHeadingFormat("P");
        } else if (formatBlock.toLowerCase().includes("pre")) {
          activeFormats.code = true;
          setHeadingFormat("P");
        } else if (formatBlock.includes("p")) setHeadingFormat("P");
        else if (formatBlock.includes("div")) setHeadingFormat("P");
      }
    }
  }

  function saveSelection() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0);
    }
  }

  function restoreSelection() {
    if (savedRangeRef.current && editorRef.current) {
      editorRef.current.focus();
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedRangeRef.current);
      }
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
    document.execCommand(cmd, false, val);
    syncContent();
    checkFormats();
  }

  function formatHeading(level: string) {
    document.execCommand("formatBlock", false, level);
    syncContent();
    checkFormats();
  }

  function insertMedia(type: string) {
    saveSelection();
    if (props.onMediaRequest) {
      props.onMediaRequest(type as any).then((url: string) => {
        if (url) {
          restoreSelection();
          let html = "";
          if (type === "image")
            html = `<img src="${url}" style="max-width:100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);" />`;
          else if (type === "video")
            html = `<video src="${url}" controls style="max-width:100%; border-radius: 8px;"></video>`;
          else if (type === "audio")
            html = `<audio src="${url}" controls></audio>`;
          document.execCommand("insertHTML", false, html);
          syncContent();
        }
      });
    } else {
      const url = prompt(`Enter ${type} URL:`);
      if (url) {
        restoreSelection();
        let html = "";
        if (type === "image")
          html = `<img src="${url}" style="max-width:100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);" />`;
        else if (type === "video")
          html = `<video src="${url}" controls style="max-width:100%; border-radius: 8px;"></video>`;
        else if (type === "audio")
          html = `<audio src="${url}" controls></audio>`;
        document.execCommand("insertHTML", false, html);
        syncContent();
      }
    }
  }

  function clearAllFormatting() {
    // Native clear format for inline styles (bold, italic, etc.)
    document.execCommand("removeFormat", false, undefined);
    // Reset block formatting (removes headings, blockquotes, pre)
    document.execCommand("formatBlock", false, "P");
    // If we have custom class spans, a quick trick to strip them without losing lines
    // is usually sufficient with removeFormat and formatBlock, but to be sure we also run:
    document.execCommand("unlink", false, undefined);
    syncContent();
    checkFormats();
  }

  function toggleBlock(type: string) {
    checkFormats();
    const isActive = type === "PRE" ? activeFormats.code : activeFormats.quote;
    if (isActive) {
      document.execCommand("formatBlock", false, "P");
    } else {
      document.execCommand("formatBlock", false, type);
    }
    syncContent();
    checkFormats();
  }

  function applyClass(className: string) {
    if (!className) return;
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
      if (editorRef.current) {
        editorRef.current.focus();
      }
      restoreSelection();
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
      const url = btnUrl || "#";
      const html = `<a href="${url}" class="cv-btn" style="${styleStr}">${btnText}</a>&nbsp;`;
      const success = document.execCommand("insertHTML", false, html);
      if (!success) {
        if (savedRangeRef.current && savedRangeRef.current.insertNode) {
          const template = document.createElement("template");
          template.innerHTML = html.trim();
          const frag = template.content;
          savedRangeRef.current.deleteContents();
          savedRangeRef.current.insertNode(frag);
          savedRangeRef.current.collapse(false);
        } else {
          editorRef.current.innerHTML += html;
        }
      }
      syncContent();
    }
  }

  function syncContent() {
    if (editorRef.current) {
      setInternalContent(editorRef.current.innerHTML);
      if (props.onChange) {
        props.onChange(internalContent);
      }
    }
  }

  function handleInput() {
    syncContent();
  }

  function handleSourceInput(e: any) {
    setInternalContent(e.target.value);
    if (props.onChange) {
      props.onChange(internalContent);
    }
    if (editorRef.current) {
      editorRef.current.innerHTML = internalContent;
    }
  }

  function openTableModal() {
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
      restoreSelection();
      let table =
        '<table border="1" style="width:100%; border-collapse: collapse; min-width: 50px;">';
      if (tableHasHeader) {
        table +=
          '<thead style="background-color: var(--cv-color-hover, rgba(255,255,255,0.05));"><tr>';
        for (let j = 0; j < cols; j++) {
          table +=
            '<th style="padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);">Header</th>';
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
      document.execCommand("insertHTML", false, table);
      syncContent();
    }
  }

  function closeTableModal() {
    setShowTableModal(false);
  }

  function modifyTable(
    action: "addRow" | "removeRow" | "addCol" | "removeCol"
  ) {
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
        newCell.style.cssText =
          row.parentNode.nodeName === "THEAD"
            ? "padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);"
            : "padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);";
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
    saveSelection();
    setShowLinkModal(true);
    setLinkUrl("");
  }

  function confirmLink() {
    setShowLinkModal(false);
    if (linkUrl) {
      restoreSelection();
      document.execCommand("createLink", false, linkUrl);
      syncContent();
    }
  }

  function closeLinkModal() {
    setShowLinkModal(false);
  }

  function openWidgetModal() {
    saveSelection();
    setShowWidgetModal(true);
  }

  function confirmWidget() {
    setShowWidgetModal(false);
    restoreSelection();
    let html = `<div class="cv-widget" data-widget="${selectedWidget}" style="padding: 24px; border: 2px dashed var(--cv-color-primary, #7fc4de); background: var(--cv-color-accent-tint, rgba(127,196,222,0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-link, #7fc4de); font-weight: 600;">[ContentVeda Widget: ${selectedWidget.toUpperCase()}]</div><p><br></p>`;
    document.execCommand("insertHTML", false, html);
    syncContent();
  }

  function closeWidgetModal() {
    setShowWidgetModal(false);
  }

  function openSocialModal() {
    saveSelection();
    setShowSocialModal(true);
    setSocialUrl("");
    setSocialPlatform("x");
  }

  function confirmSocial() {
    setShowSocialModal(false);
    if (socialUrl) {
      restoreSelection();
      let embedHtml = `<div class="social-embed-placeholder" data-platform="${socialPlatform}" data-url="${socialUrl}" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded ${socialPlatform.toUpperCase()} Post: ${socialUrl}]</div><p><br></p>`;
      document.execCommand("insertHTML", false, embedHtml);
      syncContent();
    }
  }

  function closeSocialModal() {
    setShowSocialModal(false);
  }

  function toggleMode() {
    if (mode === "visual") {
      setInternalContent(formatHTML(internalContent));
      setMode("source");
    } else {
      setMode("visual");
      if (editorRef.current) {
        editorRef.current.innerHTML = internalContent;
      }
    }
  }

  function toggleFullScreen() {
    setIsFullscreen(!isFullscreen);
    if (typeof document !== "undefined") {
      if (isFullscreen) {
        if (rootRef.current && rootRef.current.requestFullscreen) {
          rootRef.current
            .requestFullscreen()
            .catch((err) => console.warn("Fullscreen denied", err));
        }
      } else {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  }

  function showToolbarOption(option: string) {
    if (!props.config || !props.config.toolbar) {
      return true;
    }
    let name = option;
    if (option === "alignLeft") name = "justifyLeft";
    if (option === "alignCenter") name = "justifyCenter";
    if (option === "alignRight") name = "justifyRight";
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

  useEffect(() => {
    if (!internalContent) {
      setInternalContent(props.content || props.initialContent || "");
    }
    if (editorRef.current) {
      editorRef.current.innerHTML = internalContent;
    }
    if (typeof document !== "undefined") {
      const styleId = "cv-editor-styles";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML =
          ".wysiwyg-content blockquote { border-left: 4px solid var(--cv-color-quote-accent, #7fc4de) !important; background: linear-gradient(90deg, var(--cv-color-accent-tint, rgba(127, 196, 222, 0.1)) 0%, transparent 100%) !important; padding: 20px 24px !important; margin: 24px 0 !important; border-radius: 0 16px 16px 0 !important; font-style: italic !important; color: var(--cv-color-text-main, #e2e8f0) !important; font-size: 1.1em !important; line-height: 1.8 !important; position: relative; box-shadow: inset 2px 0 0px var(--cv-color-border, rgba(255,255,255,0.1)); } .wysiwyg-content pre { background: var(--cv-color-code-bg, #0f172a) !important; border: 1px solid var(--cv-color-code-border, rgba(255,255,255,0.1)) !important; border-radius: 12px !important; padding: 20px !important; color: var(--cv-color-code-text, #38bdf8) !important; font-family: 'Fira Code', monospace !important; overflow-x: auto !important; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5) !important; } .wysiwyg-content ul { list-style-type: disc !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content ol { list-style-type: decimal !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content li { margin-bottom: 0.5em !important; display: list-item !important; } .wysiwyg-content a:not(.cv-btn) { color: var(--cv-color-link, #7fc4de) !important; text-decoration: underline !important; text-underline-offset: 3px !important; }";
        document.head.appendChild(style);
      }
      const fsHandler = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };
      document.addEventListener("fullscreenchange", fsHandler);
      return () => {
        document.removeEventListener("fullscreenchange", fsHandler);
      };
    }
  }, []);

  return (
    <div
      ref={rootRef}
      className={`cv-rich-text-editor flex flex-col rounded-xl overflow-hidden relative ${
        isFullscreen
          ? "fixed inset-0 z-[9999] w-screen h-screen rounded-none"
          : "w-full"
      } ${props.className || ""}`}
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
        className="editor-toolbar flex flex-wrap gap-x-4 gap-y-3 px-6 py-4 select-none sticky top-0 z-10 w-full backdrop-blur-md"
        style={{
          background: "var(--cv-color-surface, rgba(15, 23, 42, 0.85))",
          borderBottom:
            "1px solid var(--cv-color-border, rgba(255,255,255,0.08))",
          alignItems: "center",
          padding: "16px 24px",
        }}
      >
        {showToolbarOption("fullscreen") ? (
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200"
            title="Full Screen"
            style={{
              background:
                "var(--cv-color-accent-tint, rgba(127, 196, 222, 0.15))",
              color: "var(--cv-color-primary-hover, #a8d8ea)",
              border: "none",
            }}
            onClick={(event) => toggleFullScreen()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
            {isFullscreen ? <>Exit Full Screen</> : <>Full Screen</>}
          </button>
        ) : null}
        {showToolbarOption("source") ? (
          <button
            type="button"
            title="Source Code"
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${
              mode === "source"
                ? "cv-rte-tint cv-rte-accent"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
            onClick={(event) => toggleMode()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            Source Code
          </button>
        ) : null}
        {showToolbarOption("bold") ||
        showToolbarOption("italic") ||
        showToolbarOption("underline") ||
        showToolbarOption("strikeThrough") ? (
          <div className="flex items-center gap-2 text-slate-300">
            {showToolbarOption("bold") ? (
              <button
                type="button"
                title="Bold"
                className={`font-bold text-sm w-9 h-9 flex items-center justify-center rounded transition-colors ${
                  activeFormats.bold
                    ? "bg-white/20 text-white shadow-inner"
                    : "hover:bg-white/10 hover:text-white"
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("bold")}
              >
                B
              </button>
            ) : null}
            {showToolbarOption("italic") ? (
              <button
                type="button"
                title="Italic"
                className={`italic text-sm w-9 h-9 flex items-center justify-center rounded transition-colors font-serif ${
                  activeFormats.italic
                    ? "bg-white/20 text-white shadow-inner"
                    : "hover:bg-white/10 hover:text-white"
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("italic")}
              >
                I
              </button>
            ) : null}
            {showToolbarOption("underline") ? (
              <button
                type="button"
                title="Underline"
                className={`underline text-sm w-9 h-9 flex items-center justify-center rounded transition-colors ${
                  activeFormats.underline
                    ? "bg-white/20 text-white shadow-inner"
                    : "hover:bg-white/10 hover:text-white"
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("underline")}
              >
                U
              </button>
            ) : null}
            {showToolbarOption("strikeThrough") ? (
              <button
                type="button"
                title="Strikethrough"
                className={`line-through text-sm w-9 h-9 flex items-center justify-center rounded transition-colors ${
                  activeFormats.strikeThrough
                    ? "bg-white/20 text-white shadow-inner"
                    : "hover:bg-white/10 hover:text-white"
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("strikeThrough")}
              >
                T
              </button>
            ) : null}
          </div>
        ) : null}
        {showSeparator(0) ? <div className="w-px h-6 bg-white/10" /> : null}
        {showToolbarOption("code") ||
        showToolbarOption("quote") ||
        showToolbarOption("clear") ? (
          <div className="flex items-center gap-2 text-slate-300">
            {showToolbarOption("code") ? (
              <button
                type="button"
                title="Code Block"
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                  activeFormats.code
                    ? "bg-white/20 text-white shadow-inner"
                    : "hover:bg-white/10 hover:text-white"
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => toggleBlock("PRE")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
            {showToolbarOption("quote") ? (
              <button
                type="button"
                title="Blockquote"
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                  activeFormats.quote
                    ? "bg-white/20 text-white shadow-inner"
                    : "hover:bg-white/10 hover:text-white"
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => toggleBlock("BLOCKQUOTE")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </button>
            ) : null}
            {showToolbarOption("clear") ? (
              <button
                type="button"
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Clear Formatting"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => clearAllFormatting()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M4 12h8" />
                  <path d="M4 18V6a2 2 0 0 1 2-2h4" />
                  <path d="M15 9l5 5" />
                  <path d="M20 9l-5 5" />
                </svg>
              </button>
            ) : null}
          </div>
        ) : null}
        {showSeparator(1) ? <div className="w-px h-6 bg-white/10" /> : null}
        {showToolbarOption("headings") ? (
          <select
            className="bg-black/20 border border-white/10 text-slate-300 font-semibold text-sm rounded-lg px-3 py-1.5 outline-none focus:cv-rte-accent-border transition-colors cursor-pointer"
            value={headingFormat}
            onMouseDown={(e) => {
              saveSelection();
            }}
            onChange={(e) => {
              restoreSelection();
              formatHeading(e.target.value);
              editorRef.current.focus();
            }}
          >
            <option
              value="P"
              className="cv-rte-surface"
              style={{
                fontSize: "14px",
                fontWeight: "normal",
              }}
            >
              Paragraph
            </option>
            <option
              value="H1"
              className="cv-rte-surface"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Heading 1
            </option>
            <option
              value="H2"
              className="cv-rte-surface"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Heading 2
            </option>
            <option
              value="H3"
              className="cv-rte-surface"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Heading 3
            </option>
          </select>
        ) : null}
        {showSeparator(2) ? <div className="w-px h-6 bg-white/10" /> : null}
        {showToolbarOption("foreColor") || showToolbarOption("backColor") ? (
          <div className="flex items-center gap-1 text-slate-300">
            {showToolbarOption("foreColor") ? (
              <label
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer relative"
                title="Text Color"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M4 20h16" />
                  <path d="m6 16 6-12 6 12" />
                  <path d="M8 12h8" />
                </svg>
                <input
                  type="color"
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  onMouseDown={(event) => saveSelection()}
                  onChange={(e) => {
                    restoreSelection();
                    document.execCommand(
                      "foreColor",
                      false,
                      (e.target as HTMLInputElement).value
                    );
                    syncContent();
                  }}
                />
              </label>
            ) : null}
            {showToolbarOption("backColor") ? (
              <label
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer relative"
                title="Highlight Color"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m12 19 7-7 3 3-7 7-3-3z" />
                  <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="m2 2 7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
                <input
                  type="color"
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  onMouseDown={(event) => saveSelection()}
                  onChange={(e) => {
                    restoreSelection();
                    document.execCommand(
                      "hiliteColor",
                      false,
                      (e.target as HTMLInputElement).value
                    );
                    document.execCommand(
                      "backColor",
                      false,
                      (e.target as HTMLInputElement).value
                    );
                    syncContent();
                  }}
                />
              </label>
            ) : null}
          </div>
        ) : null}
        {showSeparator(3) ? <div className="w-px h-6 bg-white/10" /> : null}
        {showToolbarOption("justifyLeft") ||
        showToolbarOption("justifyCenter") ||
        showToolbarOption("justifyRight") ? (
          <div className="flex items-center gap-2 text-slate-300">
            {showToolbarOption("justifyLeft") ? (
              <button
                type="button"
                title="Align Left"
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                  activeFormats.justifyLeft
                    ? "bg-white/20 text-white shadow-inner"
                    : "hover:bg-white/10 hover:text-white"
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("justifyLeft")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                  activeFormats.justifyCenter
                    ? "bg-white/20 text-white shadow-inner"
                    : "hover:bg-white/10 hover:text-white"
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("justifyCenter")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                  activeFormats.justifyRight
                    ? "bg-white/20 text-white shadow-inner"
                    : "hover:bg-white/10 hover:text-white"
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("justifyRight")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
          </div>
        ) : null}
        {showSeparator(4) ? <div className="w-px h-6 bg-white/10" /> : null}
        {showToolbarOption("image") ||
        showToolbarOption("link") ||
        showToolbarOption("table") ||
        showToolbarOption("unorderedList") ||
        showToolbarOption("orderedList") ||
        showToolbarOption("horizontalRule") ||
        showToolbarOption("video") ||
        showToolbarOption("social") ? (
          <div className="flex items-center gap-2 text-slate-300">
            {showToolbarOption("image") ? (
              <button
                type="button"
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Image"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => insertMedia("image")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Link"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => openLinkModal()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
            {showToolbarOption("table") ? (
              <button
                type="button"
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Table"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => openTableModal()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
              </button>
            ) : null}
            {activeFormats.inTable && showToolbarOption("table") ? (
              <div className="flex items-center cv-rte-tint rounded-lg p-0.5 border cv-rte-accent-border ml-1 mr-1 shadow-inner">
                <button
                  type="button"
                  className="w-7 h-7 flex items-center justify-center rounded hover:cv-rte-tint-strong cv-rte-accent transition-colors"
                  title="Add Row Below"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => modifyTable("addRow")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  <span className="text-[10px] font-bold ml-0.5">R</span>
                </button>
                <button
                  type="button"
                  className="w-7 h-7 flex items-center justify-center rounded hover:bg-rose-500/40 text-rose-300 transition-colors"
                  title="Delete Row"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => modifyTable("removeRow")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14" />
                  </svg>
                  <span className="text-[10px] font-bold ml-0.5">R</span>
                </button>
                <div className="w-px h-4 cv-rte-tint-strong mx-0.5" />
                <button
                  type="button"
                  className="w-7 h-7 flex items-center justify-center rounded hover:cv-rte-tint-strong cv-rte-accent transition-colors"
                  title="Add Column Right"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => modifyTable("addCol")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  <span className="text-[10px] font-bold ml-0.5">C</span>
                </button>
                <button
                  type="button"
                  className="w-7 h-7 flex items-center justify-center rounded hover:bg-rose-500/40 text-rose-300 transition-colors"
                  title="Delete Column"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(event) => modifyTable("removeCol")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14" />
                  </svg>
                  <span className="text-[10px] font-bold ml-0.5">C</span>
                </button>
              </div>
            ) : null}
            {showToolbarOption("unorderedList") ? (
              <button
                type="button"
                title="Bullet List"
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                  activeFormats.unorderedList
                    ? "bg-white/20 text-white shadow-inner"
                    : "hover:bg-white/10 hover:text-white"
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("insertUnorderedList")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                  activeFormats.orderedList
                    ? "bg-white/20 text-white shadow-inner"
                    : "hover:bg-white/10 hover:text-white"
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("insertOrderedList")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
            {showToolbarOption("horizontalRule") ? (
              <button
                type="button"
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Horizontal Line"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => format("insertHorizontalRule")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            ) : null}
            {showToolbarOption("video") ? (
              <button
                type="button"
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Video"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => insertMedia("video")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <line x1="2" y1="7" x2="7" y2="7" />
                  <line x1="2" y1="17" x2="7" y2="17" />
                  <line x1="17" y1="17" x2="22" y2="17" />
                  <line x1="17" y1="7" x2="22" y2="7" />
                </svg>
              </button>
            ) : null}
            {showToolbarOption("social") ? (
              <button
                type="button"
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Social Media Embed"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => openSocialModal()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </button>
            ) : null}
          </div>
        ) : null}
        {showSeparator(5) ? <div className="w-px h-6 bg-white/10" /> : null}
        {showToolbarOption("insertButton") || showToolbarOption("addWidget") ? (
          <div className="flex items-center gap-2">
            {showToolbarOption("insertButton") ? (
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 border-none text-slate-300 hover:bg-white/10 hover:text-white"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => openButtonModal()}
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
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Insert Button
              </button>
            ) : null}
            {showToolbarOption("addWidget") ? (
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 cv-rte-tint cv-rte-accent border-none hover:cv-rte-tint"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(event) => openWidgetModal()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
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
                Add Widget
              </button>
            ) : null}
          </div>
        ) : null}
        {showSeparator(6) ? <div className="w-px h-6 bg-white/10" /> : null}
        {showToolbarOption("save") ? (
          <div className="flex items-center gap-1 text-slate-400">
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
              title="Save"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(event) => syncContent()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
          </div>
        ) : null}
        {showToolbarOption("classInput") ? (
          <div className="ml-auto flex items-center bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 shadow-inner focus-within:cv-rte-accent-border focus-within:ring-1 focus-within:ring-violet-500 transition-all">
            <span className="text-[10px] font-bold text-slate-500 tracking-wider mr-2">
              CLASS
            </span>
            <input
              type="text"
              list="editor-class-list"
              placeholder="e.g. my-callout"
              className="text-xs outline-none w-32 text-slate-200 placeholder-slate-600 bg-transparent"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyClass((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
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
      </div>
      <div
        className="editor-content flex-1 overflow-y-auto relative min-h-[350px]"
        style={{
          display: mode === "visual" ? "block" : "none",
          padding: "2rem 3rem",
          color: "var(--cv-color-text-main, #f1f5f9)",
        }}
      >
        <div
          contentEditable="true"
          className="wysiwyg-content outline-none prose prose-invert max-w-none"
          ref={editorRef}
          onInput={(event) => {
            handleInput();
            checkFormats();
          }}
          onBlur={(event) => handleInput()}
          onKeyUp={(event) => checkFormats()}
          onMouseUp={(event) => checkFormats()}
          style={{
            minHeight: "350px",
            fontFamily: "Inter, sans-serif",
            lineHeight: "1.7",
            fontSize: "15px",
          }}
        />
        {showTableModal ||
        showLinkModal ||
        showWidgetModal ||
        showSocialModal ||
        showButtonModal ? (
          <div
            className="fixed inset-0 flex items-center justify-center z-[100] backdrop-blur-md"
            style={{
              background: "rgba(0, 0, 0, 0.6)",
            }}
          >
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
                      color: "var(--cv-color-link, #7fc4de)",
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
                      Button Text
                    </label>
                    <input
                      type="text"
                      placeholder="Click Here"
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
                      Link URL
                    </label>
                    <input
                      type="url"
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
                  Insert Table
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
                      justifyContent: "space-between",
                      alignItems: "center",
                      background:
                        "var(--cv-color-surface-sunken, rgba(0,0,0,0.2))",
                      padding: "12px",
                      borderRadius: "8px",
                      border:
                        "1px solid var(--cv-color-hover, rgba(255,255,255,0.05))",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "var(--cv-color-text-secondary, #cbd5e1)",
                      }}
                    >
                      Rows
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      style={{
                        background: "transparent",
                        border: "none",
                        textAlign: "right",
                        color: "var(--cv-color-text-main, #fff)",
                        fontWeight: "bold",
                        width: "64px",
                        fontSize: "14px",
                        outline: "none",
                      }}
                      value={tableRows}
                      onInput={(e) => setTableRows(e.target.value)}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background:
                        "var(--cv-color-surface-sunken, rgba(0,0,0,0.2))",
                      padding: "12px",
                      borderRadius: "8px",
                      border:
                        "1px solid var(--cv-color-hover, rgba(255,255,255,0.05))",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "var(--cv-color-text-secondary, #cbd5e1)",
                      }}
                    >
                      Columns
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      style={{
                        background: "transparent",
                        border: "none",
                        textAlign: "right",
                        color: "var(--cv-color-text-main, #fff)",
                        fontWeight: "bold",
                        width: "64px",
                        fontSize: "14px",
                        outline: "none",
                      }}
                      value={tableCols}
                      onInput={(e) => setTableCols(e.target.value)}
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
                      color: "var(--cv-color-info, #0ea5e9)",
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
                    Destination URL
                  </label>
                  <input
                    type="url"
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
        className="editor-source flex-1 overflow-y-auto bg-[var(--cv-color-background, #020617)] min-h-[350px]"
        style={{
          display: mode === "source" ? "block" : "none",
        }}
      >
        <textarea
          className="w-full h-full p-6 bg-transparent cv-rte-ok font-mono text-[14px] leading-loose outline-none resize-none"
          value={internalContent}
          onInput={(e) => handleSourceInput(e)}
          style={{
            whiteSpace: "pre-wrap",
          }}
          spellCheck={false}
        />
      </div>
    </div>
  );
}

export default RichTextEditor;
