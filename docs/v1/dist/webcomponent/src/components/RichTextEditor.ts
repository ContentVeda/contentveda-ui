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
      activeFormats: {
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
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          self._savedRangeRef = sel.getRangeAt(0);
        }
      },
      restoreSelection() {
        if (self._savedRangeRef && self._editorRef) {
          self._editorRef.focus();
          const sel = window.getSelection();
          if (sel) {
            sel.removeAllRanges();
            sel.addRange(self._savedRangeRef);
          }
        }
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
        document.execCommand(cmd, false, val);
        self.state.syncContent();
        self.state.checkFormats();
      },
      formatHeading(level: string) {
        document.execCommand("formatBlock", false, level);
        self.state.syncContent();
        self.state.checkFormats();
      },
      insertMedia(type: string) {
        self.state.saveSelection();
        if (self.props.onMediaRequest) {
          self.props.onMediaRequest(type as any).then((url: string) => {
            if (url) {
              self.state.restoreSelection();
              let html = "";
              if (type === "image")
                html = `<img src="${url}" style="max-width:100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);" />`;
              else if (type === "video")
                html = `<video src="${url}" controls style="max-width:100%; border-radius: 8px;"></video>`;
              else if (type === "audio")
                html = `<audio src="${url}" controls></audio>`;
              document.execCommand("insertHTML", false, html);
              self.state.syncContent();
            }
          });
        } else {
          const url = prompt(`Enter ${type} URL:`);
          if (url) {
            self.state.restoreSelection();
            let html = "";
            if (type === "image")
              html = `<img src="${url}" style="max-width:100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);" />`;
            else if (type === "video")
              html = `<video src="${url}" controls style="max-width:100%; border-radius: 8px;"></video>`;
            else if (type === "audio")
              html = `<audio src="${url}" controls></audio>`;
            document.execCommand("insertHTML", false, html);
            self.state.syncContent();
          }
        }
      },
      clearAllFormatting() {
        // Native clear format for inline styles (bold, italic, etc.)
        document.execCommand("removeFormat", false, undefined);
        // Reset block formatting (removes headings, blockquotes, pre)
        document.execCommand("formatBlock", false, "P");
        // If we have custom class spans, a quick trick to strip them without losing lines
        // is usually sufficient with removeFormat and formatBlock, but to be sure we also run:
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
          document.execCommand("formatBlock", false, "P");
        } else {
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
          if (self._editorRef) {
            self._editorRef.focus();
          }
          self.state.restoreSelection();
          let styleStr =
            "padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; display: inline-block; text-decoration: none; transition: all 0.2s;";
          if (self.state.btnStyle === "primary") {
            styleStr +=
              " background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; border: none; box-shadow: 0 4px 14px rgba(139,92,246,0.3);";
          } else if (self.state.btnStyle === "secondary") {
            styleStr +=
              " background: #1e293b; color: white; border: 1px solid rgba(255,255,255,0.1);";
          } else if (self.state.btnStyle === "outline") {
            styleStr +=
              " background: transparent; color: #8b5cf6; border: 2px solid #8b5cf6;";
          }
          const url = self.state.btnUrl || "#";
          const html = `<a href="${url}" class="cv-btn" style="${styleStr}">${self.state.btnText}</a>&nbsp;`;
          const success = document.execCommand("insertHTML", false, html);
          if (!success) {
            if (self._savedRangeRef && self._savedRangeRef.insertNode) {
              const template = document.createElement("template");
              template.innerHTML = html.trim();
              const frag = template.content;
              self._savedRangeRef.deleteContents();
              self._savedRangeRef.insertNode(frag);
              self._savedRangeRef.collapse(false);
            } else {
              self._editorRef.innerHTML += html;
            }
          }
          self.state.syncContent();
        }
      },
      syncContent() {
        if (self._editorRef) {
          self.state.internalContent = self._editorRef.innerHTML;
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
          self._editorRef.innerHTML = self.state.internalContent;
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
          self.state.restoreSelection();
          let table =
            '<table border="1" style="width:100%; border-collapse: collapse; min-width: 50px;">';
          if (self.state.tableHasHeader) {
            table +=
              '<thead style="background-color: rgba(255,255,255,0.05);"><tr>';
            for (let j = 0; j < cols; j++) {
              table +=
                '<th style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); text-align: left; color: #a78bfa;">Header</th>';
            }
            table += "</tr></thead>";
          }
          table += "<tbody>";
          for (let i = 0; i < rows; i++) {
            table += "<tr>";
            for (let j = 0; j < cols; j++) {
              table +=
                '<td style="padding: 10px; border: 1px solid rgba(255,255,255,0.1); color: #f1f5f9;">Cell</td>';
            }
            table += "</tr>";
          }
          table += "</tbody></table><p><br></p>";
          document.execCommand("insertHTML", false, table);
          self.state.syncContent();
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
              "padding: 10px; border: 1px solid rgba(255,255,255,0.1); color: #f1f5f9;";
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
                ? "padding: 12px; border: 1px solid rgba(255,255,255,0.1); text-align: left; color: #a78bfa;"
                : "padding: 10px; border: 1px solid rgba(255,255,255,0.1); color: #f1f5f9;";
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
        self.state.restoreSelection();
        let html = `<div class="cv-widget" data-widget="${
          self.state.selectedWidget
        }" style="padding: 24px; border: 2px dashed rgba(139,92,246,0.5); background: rgba(139,92,246,0.05); text-align: center; border-radius: 12px; margin: 16px 0; color: #a78bfa; font-weight: 600;">[ContentVeda Widget: ${self.state.selectedWidget.toUpperCase()}]</div><p><br></p>`;
        document.execCommand("insertHTML", false, html);
        self.state.syncContent();
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
        self.state.socialPlatform = "x";
        self.update();
      },
      confirmSocial() {
        self.state.showSocialModal = false;
        self.update();
        if (self.state.socialUrl) {
          self.state.restoreSelection();
          let embedHtml = `<div class="social-embed-placeholder" data-platform="${
            self.state.socialPlatform
          }" data-url="${
            self.state.socialUrl
          }" style="padding: 24px; border: 2px dashed rgba(14, 165, 233, 0.5); background: rgba(14, 165, 233, 0.05); text-align: center; border-radius: 12px; margin: 16px 0; color: #38bdf8; font-weight: 600;">[Embedded ${self.state.socialPlatform.toUpperCase()} Post: ${
            self.state.socialUrl
          }]</div><p><br></p>`;
          document.execCommand("insertHTML", false, embedHtml);
          self.state.syncContent();
        }
      },
      closeSocialModal() {
        self.state.showSocialModal = false;
        self.update();
      },
      toggleMode() {
        if (self.state.mode === "visual") {
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
            self._editorRef.innerHTML = self.state.internalContent;
          }
        }
      },
      toggleFullScreen() {
        self.state.isFullscreen = !self.state.isFullscreen;
        self.update();
        if (typeof document !== "undefined") {
          if (self.state.isFullscreen) {
            if (self._rootRef && self._rootRef.requestFullscreen) {
              self._rootRef
                .requestFullscreen()
                .catch((err) => console.warn("Fullscreen denied", err));
            }
          } else {
            if (document.fullscreenElement && document.exitFullscreen) {
              document.exitFullscreen();
            }
          }
        }
      },
      showToolbarOption(option: string) {
        if (!self.props.config || !self.props.config.toolbar) {
          return true;
        }
        let name = option;
        if (option === "alignLeft") name = "justifyLeft";
        if (option === "alignCenter") name = "justifyCenter";
        if (option === "alignRight") name = "justifyRight";
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

    // Event handler for 'click' event on button-rich-text-editor-1
    this.onButtonRichTextEditor1Click = (event) => {
      this.state.toggleFullScreen();
    };

    // Event handler for 'click' event on button-rich-text-editor-2
    this.onButtonRichTextEditor2Click = (event) => {
      this.state.toggleMode();
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

    // Event handler for 'mousedown' event on button-rich-text-editor-8
    this.onButtonRichTextEditor8Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-8
    this.onButtonRichTextEditor8Click = (event) => {
      this.state.toggleBlock("BLOCKQUOTE");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-9
    this.onButtonRichTextEditor9Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-9
    this.onButtonRichTextEditor9Click = (event) => {
      this.state.clearAllFormatting();
    };

    // Event handler for 'mousedown' event on select-rich-text-editor-1
    this.onSelectRichTextEditor1Mousedown = (e) => {
      this.state.saveSelection();
    };

    // Event handler for 'change' event on select-rich-text-editor-1
    this.onSelectRichTextEditor1Change = (e) => {
      this.state.restoreSelection();
      this.state.formatHeading(e.target.value);
      self._editorRef.focus();
    };

    // Event handler for 'mousedown' event on input-rich-text-editor-1
    this.onInputRichTextEditor1Mousedown = (event) => {
      this.state.saveSelection();
    };

    // Event handler for 'change' event on input-rich-text-editor-1
    this.onInputRichTextEditor1Change = (e) => {
      this.state.restoreSelection();
      document.execCommand(
        "foreColor",
        false,
        (e.target as HTMLInputElement).value
      );
      this.state.syncContent();
    };

    // Event handler for 'mousedown' event on input-rich-text-editor-2
    this.onInputRichTextEditor2Mousedown = (event) => {
      this.state.saveSelection();
    };

    // Event handler for 'change' event on input-rich-text-editor-2
    this.onInputRichTextEditor2Change = (e) => {
      this.state.restoreSelection();
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
      this.state.syncContent();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-10
    this.onButtonRichTextEditor10Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-10
    this.onButtonRichTextEditor10Click = (event) => {
      this.state.format("justifyLeft");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-11
    this.onButtonRichTextEditor11Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-11
    this.onButtonRichTextEditor11Click = (event) => {
      this.state.format("justifyCenter");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-12
    this.onButtonRichTextEditor12Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-12
    this.onButtonRichTextEditor12Click = (event) => {
      this.state.format("justifyRight");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-13
    this.onButtonRichTextEditor13Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-13
    this.onButtonRichTextEditor13Click = (event) => {
      this.state.insertMedia("image");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-14
    this.onButtonRichTextEditor14Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-14
    this.onButtonRichTextEditor14Click = (event) => {
      this.state.openLinkModal();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-15
    this.onButtonRichTextEditor15Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-15
    this.onButtonRichTextEditor15Click = (event) => {
      this.state.openTableModal();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-16
    this.onButtonRichTextEditor16Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-16
    this.onButtonRichTextEditor16Click = (event) => {
      this.state.modifyTable("addRow");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-17
    this.onButtonRichTextEditor17Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-17
    this.onButtonRichTextEditor17Click = (event) => {
      this.state.modifyTable("removeRow");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-18
    this.onButtonRichTextEditor18Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-18
    this.onButtonRichTextEditor18Click = (event) => {
      this.state.modifyTable("addCol");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-19
    this.onButtonRichTextEditor19Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-19
    this.onButtonRichTextEditor19Click = (event) => {
      this.state.modifyTable("removeCol");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-20
    this.onButtonRichTextEditor20Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-20
    this.onButtonRichTextEditor20Click = (event) => {
      this.state.format("insertUnorderedList");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-21
    this.onButtonRichTextEditor21Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-21
    this.onButtonRichTextEditor21Click = (event) => {
      this.state.format("insertOrderedList");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-22
    this.onButtonRichTextEditor22Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-22
    this.onButtonRichTextEditor22Click = (event) => {
      this.state.format("insertHorizontalRule");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-23
    this.onButtonRichTextEditor23Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-23
    this.onButtonRichTextEditor23Click = (event) => {
      this.state.insertMedia("video");
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-24
    this.onButtonRichTextEditor24Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-24
    this.onButtonRichTextEditor24Click = (event) => {
      this.state.openSocialModal();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-25
    this.onButtonRichTextEditor25Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-25
    this.onButtonRichTextEditor25Click = (event) => {
      this.state.openButtonModal();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-26
    this.onButtonRichTextEditor26Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-26
    this.onButtonRichTextEditor26Click = (event) => {
      this.state.openWidgetModal();
    };

    // Event handler for 'mousedown' event on button-rich-text-editor-27
    this.onButtonRichTextEditor27Mousedown = (e) => {
      e.preventDefault();
    };

    // Event handler for 'click' event on button-rich-text-editor-27
    this.onButtonRichTextEditor27Click = (event) => {
      this.state.syncContent();
    };

    // Event handler for 'keydown' event on input-rich-text-editor-3
    this.onInputRichTextEditor3Keydown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.state.applyClass((e.target as HTMLInputElement).value);
        (e.target as HTMLInputElement).value = "";
      }
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

    // Event handler for 'change' event on select-rich-text-editor-2
    this.onSelectRichTextEditor2Change = (e) => {
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

    // Event handler for 'click' event on button-rich-text-editor-28
    this.onButtonRichTextEditor28Click = (event) => {
      this.state.closeButtonModal();
    };

    // Event handler for 'click' event on button-rich-text-editor-29
    this.onButtonRichTextEditor29Click = (event) => {
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

    // Event handler for 'click' event on button-rich-text-editor-30
    this.onButtonRichTextEditor30Click = (event) => {
      this.state.closeTableModal();
    };

    // Event handler for 'click' event on button-rich-text-editor-31
    this.onButtonRichTextEditor31Click = (event) => {
      this.state.confirmTable();
    };

    // Event handler for 'input' event on input-rich-text-editor-8
    this.onInputRichTextEditor8Input = (e) => {
      this.state.linkUrl = e.target.value;
      this.update();
    };

    // Event handler for 'click' event on button-rich-text-editor-32
    this.onButtonRichTextEditor32Click = (event) => {
      this.state.closeLinkModal();
    };

    // Event handler for 'click' event on button-rich-text-editor-33
    this.onButtonRichTextEditor33Click = (event) => {
      this.state.confirmLink();
    };

    // Event handler for 'change' event on select-rich-text-editor-3
    this.onSelectRichTextEditor3Change = (e) => {
      this.state.selectedWidget = e.target.value;
      this.update();
    };

    // Event handler for 'click' event on button-rich-text-editor-34
    this.onButtonRichTextEditor34Click = (event) => {
      this.state.closeWidgetModal();
    };

    // Event handler for 'click' event on button-rich-text-editor-35
    this.onButtonRichTextEditor35Click = (event) => {
      this.state.confirmWidget();
    };

    // Event handler for 'change' event on select-rich-text-editor-4
    this.onSelectRichTextEditor4Change = (e) => {
      this.state.socialPlatform = e.target.value;
      this.update();
    };

    // Event handler for 'input' event on input-rich-text-editor-9
    this.onInputRichTextEditor9Input = (e) => {
      this.state.socialUrl = e.target.value;
      this.update();
    };

    // Event handler for 'click' event on button-rich-text-editor-36
    this.onButtonRichTextEditor36Click = (event) => {
      this.state.closeSocialModal();
    };

    // Event handler for 'click' event on button-rich-text-editor-37
    this.onButtonRichTextEditor37Click = (event) => {
      this.state.confirmSocial();
    };

    // Event handler for 'input' event on textarea-rich-text-editor-1
    this.onTextareaRichTextEditor1Input = (e) => {
      this.state.handleSourceInput(e);
    };

    this._savedRangeRef = null;

    if (undefined) {
      this.attachShadow({ mode: "open" });
    }
  }

  destroyAnyNodes() {
    // destroy current view template refs before rendering again
    this.nodesToDestroy.forEach((el) => el.remove());
    this.nodesToDestroy = [];
  }

  connectedCallback() {
    this.getAttributeNames().forEach((attr) => {
      const jsVar = attr.replace(/-/g, "");
      const regexp = new RegExp(jsVar, "i");
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
        <div
          class="editor-toolbar flex flex-wrap gap-x-4 gap-y-3 px-6 py-4 select-none sticky top-0 z-10 w-full backdrop-blur-md"
          data-el="div-rich-text-editor-2"
        >
          <template data-el="show-rich-text-editor">
            <button
              type="button"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200"
              title="Full Screen"
              data-el="button-rich-text-editor-1"
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
                <path
                  d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                ></path>
              </svg>
              <template data-el="show-rich-text-editor-2">Exit Full Screen</template>
            </button>
          </template>
          <template data-el="show-rich-text-editor-3">
            <button
              type="button"
              title="Source Code"
              data-el="button-rich-text-editor-2"
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
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
      
              Source Code
            </button>
          </template>
          <template data-el="show-rich-text-editor-4">
            <div class="flex items-center gap-2 text-slate-300">
              <template data-el="show-rich-text-editor-5">
                <button
                  type="button"
                  title="Bold"
                  data-el="button-rich-text-editor-3"
                >
                  B
                </button>
              </template>
              <template data-el="show-rich-text-editor-6">
                <button
                  type="button"
                  title="Italic"
                  data-el="button-rich-text-editor-4"
                >
                  I
                </button>
              </template>
              <template data-el="show-rich-text-editor-7">
                <button
                  type="button"
                  title="Underline"
                  data-el="button-rich-text-editor-5"
                >
                  U
                </button>
              </template>
              <template data-el="show-rich-text-editor-8">
                <button
                  type="button"
                  title="Strikethrough"
                  data-el="button-rich-text-editor-6"
                >
                  T
                </button>
              </template>
            </div>
          </template>
          <template data-el="show-rich-text-editor-9">
            <div class="w-px h-6 bg-white/10"></div>
          </template>
          <template data-el="show-rich-text-editor-10">
            <div class="flex items-center gap-2 text-slate-300">
              <template data-el="show-rich-text-editor-11">
                <button
                  type="button"
                  title="Code Block"
                  data-el="button-rich-text-editor-7"
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
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </button>
              </template>
              <template data-el="show-rich-text-editor-12">
                <button
                  type="button"
                  title="Blockquote"
                  data-el="button-rich-text-editor-8"
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
                    <path
                      d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                    ></path>
                    <path
                      d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                    ></path>
                  </svg>
                </button>
              </template>
              <template data-el="show-rich-text-editor-13">
                <button
                  type="button"
                  class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  title="Clear Formatting"
                  data-el="button-rich-text-editor-9"
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
                    <path d="M4 12h8"></path>
                    <path d="M4 18V6a2 2 0 0 1 2-2h4"></path>
                    <path d="M15 9l5 5"></path>
                    <path d="M20 9l-5 5"></path>
                  </svg>
                </button>
              </template>
            </div>
          </template>
          <template data-el="show-rich-text-editor-14">
            <div class="w-px h-6 bg-white/10"></div>
          </template>
          <template data-el="show-rich-text-editor-15">
            <select
              class="bg-black/20 border border-white/10 text-slate-300 font-semibold text-sm rounded-lg px-3 py-1.5 outline-none focus:border-violet-500 transition-colors cursor-pointer"
              data-el="select-rich-text-editor-1"
              data-dom-state="RichTextEditor-select-rich-text-editor-1"
            >
              <option
                value="P"
                class="bg-slate-800"
                data-el="option-rich-text-editor-1"
              >
                Paragraph
              </option>
              <option
                value="H1"
                class="bg-slate-800"
                data-el="option-rich-text-editor-2"
              >
                Heading 1
              </option>
              <option
                value="H2"
                class="bg-slate-800"
                data-el="option-rich-text-editor-3"
              >
                Heading 2
              </option>
              <option
                value="H3"
                class="bg-slate-800"
                data-el="option-rich-text-editor-4"
              >
                Heading 3
              </option>
            </select>
          </template>
          <template data-el="show-rich-text-editor-16">
            <div class="w-px h-6 bg-white/10"></div>
          </template>
          <template data-el="show-rich-text-editor-17">
            <div class="flex items-center gap-1 text-slate-300">
              <template data-el="show-rich-text-editor-18">
                <label
                  class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer relative"
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
                    <path d="M4 20h16"></path>
                    <path d="m6 16 6-12 6 12"></path>
                    <path d="M8 12h8"></path>
                  </svg>
                  <input
                    type="color"
                    class="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    data-el="input-rich-text-editor-1"
                    data-dom-state="RichTextEditor-input-rich-text-editor-1"
                  />
                </label>
              </template>
              <template data-el="show-rich-text-editor-19">
                <label
                  class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer relative"
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
                    <path d="m12 19 7-7 3 3-7 7-3-3z"></path>
                    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                    <path d="m2 2 7.586 7.586"></path>
                    <circle cx="11" cy="11" r="2"></circle>
                  </svg>
                  <input
                    type="color"
                    class="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    data-el="input-rich-text-editor-2"
                    data-dom-state="RichTextEditor-input-rich-text-editor-2"
                  />
                </label>
              </template>
            </div>
          </template>
          <template data-el="show-rich-text-editor-20">
            <div class="w-px h-6 bg-white/10"></div>
          </template>
          <template data-el="show-rich-text-editor-21">
            <div class="flex items-center gap-2 text-slate-300">
              <template data-el="show-rich-text-editor-22">
                <button
                  type="button"
                  title="Align Left"
                  data-el="button-rich-text-editor-10"
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
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                    <line x1="17" y1="18" x2="3" y2="18"></line>
                  </svg>
                </button>
              </template>
              <template data-el="show-rich-text-editor-23">
                <button
                  type="button"
                  title="Align Center"
                  data-el="button-rich-text-editor-11"
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
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="17" y1="12" x2="7" y2="12"></line>
                    <line x1="19" y1="18" x2="5" y2="18"></line>
                  </svg>
                </button>
              </template>
              <template data-el="show-rich-text-editor-24">
                <button
                  type="button"
                  title="Align Right"
                  data-el="button-rich-text-editor-12"
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
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                    <line x1="21" y1="18" x2="7" y2="18"></line>
                  </svg>
                </button>
              </template>
            </div>
          </template>
          <template data-el="show-rich-text-editor-25">
            <div class="w-px h-6 bg-white/10"></div>
          </template>
          <template data-el="show-rich-text-editor-26">
            <div class="flex items-center gap-2 text-slate-300">
              <template data-el="show-rich-text-editor-27">
                <button
                  type="button"
                  class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  title="Image"
                  data-el="button-rich-text-editor-13"
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
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </button>
              </template>
              <template data-el="show-rich-text-editor-28">
                <button
                  type="button"
                  class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  title="Link"
                  data-el="button-rich-text-editor-14"
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
                    <path
                      d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                    ></path>
                    <path
                      d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                    ></path>
                  </svg>
                </button>
              </template>
              <template data-el="show-rich-text-editor-29">
                <button
                  type="button"
                  class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  title="Table"
                  data-el="button-rich-text-editor-15"
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
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="3" y1="15" x2="21" y2="15"></line>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                    <line x1="15" y1="3" x2="15" y2="21"></line>
                  </svg>
                </button>
              </template>
              <template data-el="show-rich-text-editor-30">
                <div
                  class="flex items-center bg-violet-500/20 rounded-lg p-0.5 border border-violet-500/30 ml-1 mr-1 shadow-inner"
                >
                  <button
                    type="button"
                    class="w-7 h-7 flex items-center justify-center rounded hover:bg-violet-500/40 text-violet-300 transition-colors"
                    title="Add Row Below"
                    data-el="button-rich-text-editor-16"
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
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                    <span class="text-[10px] font-bold ml-0.5">R</span>
                  </button>
                  <button
                    type="button"
                    class="w-7 h-7 flex items-center justify-center rounded hover:bg-rose-500/40 text-rose-300 transition-colors"
                    title="Delete Row"
                    data-el="button-rich-text-editor-17"
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
                      <path d="M5 12h14"></path>
                    </svg>
                    <span class="text-[10px] font-bold ml-0.5">R</span>
                  </button>
                  <div class="w-px h-4 bg-violet-500/30 mx-0.5"></div>
                  <button
                    type="button"
                    class="w-7 h-7 flex items-center justify-center rounded hover:bg-violet-500/40 text-violet-300 transition-colors"
                    title="Add Column Right"
                    data-el="button-rich-text-editor-18"
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
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                    <span class="text-[10px] font-bold ml-0.5">C</span>
                  </button>
                  <button
                    type="button"
                    class="w-7 h-7 flex items-center justify-center rounded hover:bg-rose-500/40 text-rose-300 transition-colors"
                    title="Delete Column"
                    data-el="button-rich-text-editor-19"
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
                      <path d="M5 12h14"></path>
                    </svg>
                    <span class="text-[10px] font-bold ml-0.5">C</span>
                  </button>
                </div>
              </template>
              <template data-el="show-rich-text-editor-31">
                <button
                  type="button"
                  title="Bullet List"
                  data-el="button-rich-text-editor-20"
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
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
              </template>
              <template data-el="show-rich-text-editor-32">
                <button
                  type="button"
                  title="Numbered List"
                  data-el="button-rich-text-editor-21"
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
                    <line x1="10" y1="6" x2="21" y2="6"></line>
                    <line x1="10" y1="12" x2="21" y2="12"></line>
                    <line x1="10" y1="18" x2="21" y2="18"></line>
                    <path d="M4 6h1v4"></path>
                    <path d="M4 10h2"></path>
                    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
                  </svg>
                </button>
              </template>
              <template data-el="show-rich-text-editor-33">
                <button
                  type="button"
                  class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  title="Horizontal Line"
                  data-el="button-rich-text-editor-22"
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
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </template>
              <template data-el="show-rich-text-editor-34">
                <button
                  type="button"
                  class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  title="Video"
                  data-el="button-rich-text-editor-23"
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
                    ></rect>
                    <line x1="7" y1="2" x2="7" y2="22"></line>
                    <line x1="17" y1="2" x2="17" y2="22"></line>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <line x1="2" y1="7" x2="7" y2="7"></line>
                    <line x1="2" y1="17" x2="7" y2="17"></line>
                    <line x1="17" y1="17" x2="22" y2="17"></line>
                    <line x1="17" y1="7" x2="22" y2="7"></line>
                  </svg>
                </button>
              </template>
              <template data-el="show-rich-text-editor-35">
                <button
                  type="button"
                  class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  title="Social Media Embed"
                  data-el="button-rich-text-editor-24"
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
                    <path
                      d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                    ></path>
                  </svg>
                </button>
              </template>
            </div>
          </template>
          <template data-el="show-rich-text-editor-36">
            <div class="w-px h-6 bg-white/10"></div>
          </template>
          <template data-el="show-rich-text-editor-37">
            <div class="flex items-center gap-2">
              <template data-el="show-rich-text-editor-38">
                <button
                  type="button"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 border-none text-slate-300 hover:bg-white/10 hover:text-white"
                  data-el="button-rich-text-editor-25"
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
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
      
                  Insert Button
                </button>
              </template>
              <template data-el="show-rich-text-editor-39">
                <button
                  type="button"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 bg-pink-500/10 text-pink-400 border-none hover:bg-pink-500/20"
                  data-el="button-rich-text-editor-26"
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
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
      
                  Add Widget
                </button>
              </template>
            </div>
          </template>
          <template data-el="show-rich-text-editor-40">
            <div class="w-px h-6 bg-white/10"></div>
          </template>
          <template data-el="show-rich-text-editor-41">
            <div class="flex items-center gap-1 text-slate-400">
              <button
                type="button"
                class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Save"
                data-el="button-rich-text-editor-27"
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
                  <path
                    d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h11l5 5v11a2 2 0 0 1-2 2z"
                  ></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
              </button>
            </div>
          </template>
          <template data-el="show-rich-text-editor-42">
            <div
              class="ml-auto flex items-center bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 shadow-inner focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all"
            >
              <span class="text-[10px] font-bold text-slate-500 tracking-wider mr-2">
                CLASS
              </span>
              <input
                type="text"
                list="editor-class-list"
                placeholder="e.g. text-pink-500"
                class="text-xs outline-none w-32 text-slate-200 placeholder-slate-600 bg-transparent"
                data-el="input-rich-text-editor-3"
                data-dom-state="RichTextEditor-input-rich-text-editor-3"
              />
              <template data-el="show-rich-text-editor-43">
                <datalist id="editor-class-list">
                  <template data-el="for-rich-text-editor">
                    <option data-el="option-rich-text-editor-5">
                      <template data-el="div-rich-text-editor-3">
                        <!-- cls -->
                      </template>
                    </option>
                  </template>
                </datalist>
              </template>
            </div>
          </template>
        </div>
        <div
          class="editor-content flex-1 overflow-y-auto relative min-h-[350px]"
          data-el="div-rich-text-editor-4"
        >
          <div
            contenteditable="true"
            class="wysiwyg-content outline-none prose prose-invert max-w-none"
            data-el="div-rich-text-editor-5"
            data-ref="RichTextEditor-editorRef"
          ></div>
          <template data-el="show-rich-text-editor-44">
            <div
              class="fixed inset-0 flex items-center justify-center z-[100] backdrop-blur-md"
              data-el="div-rich-text-editor-6"
            >
              <template data-el="show-rich-text-editor-45">
                <div class="shadow-2xl" data-el="div-rich-text-editor-7">
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
                      stroke="#8b5cf6"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
      
                    Insert Button
                  </h3>
                  <div data-el="div-rich-text-editor-8">
                    <div data-el="div-rich-text-editor-9">
                      <label data-el="label-rich-text-editor-1">Button Style</label>
                      <select
                        data-el="select-rich-text-editor-2"
                        data-dom-state="RichTextEditor-select-rich-text-editor-2"
                      >
                        <option value="primary" data-el="option-rich-text-editor-6">
                          Primary (Gradient)
                        </option>
                        <option value="secondary" data-el="option-rich-text-editor-7">
                          Secondary (Dark)
                        </option>
                        <option value="outline" data-el="option-rich-text-editor-8">
                          Outline (Violet)
                        </option>
                      </select>
                    </div>
                    <div data-el="div-rich-text-editor-10">
                      <label data-el="label-rich-text-editor-2">Button Text</label>
                      <input
                        type="text"
                        placeholder="Click Here"
                        data-el="input-rich-text-editor-4"
                        data-dom-state="RichTextEditor-input-rich-text-editor-4"
                      />
                    </div>
                    <div data-el="div-rich-text-editor-11">
                      <label data-el="label-rich-text-editor-3">Link URL</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        data-el="input-rich-text-editor-5"
                        data-dom-state="RichTextEditor-input-rich-text-editor-5"
                      />
                    </div>
                  </div>
                  <div data-el="div-rich-text-editor-12">
                    <button type="button" data-el="button-rich-text-editor-28">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-29">
                      Insert
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-46">
                <div class="shadow-2xl" data-el="div-rich-text-editor-13">
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
                      stroke="var(--violet, #8b5cf6)"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="3" y1="15" x2="21" y2="15"></line>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                      <line x1="15" y1="3" x2="15" y2="21"></line>
                    </svg>
      
                    Insert Table
                  </h3>
                  <div data-el="div-rich-text-editor-14">
                    <div data-el="div-rich-text-editor-15">
                      <label data-el="label-rich-text-editor-4">Rows</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        data-el="input-rich-text-editor-6"
                        data-dom-state="RichTextEditor-input-rich-text-editor-6"
                      />
                    </div>
                    <div data-el="div-rich-text-editor-16">
                      <label data-el="label-rich-text-editor-5">Columns</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        data-el="input-rich-text-editor-7"
                        data-dom-state="RichTextEditor-input-rich-text-editor-7"
                      />
                    </div>
                  </div>
                  <div data-el="div-rich-text-editor-17">
                    <button type="button" data-el="button-rich-text-editor-30">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-31">
                      Insert Table
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-47">
                <div class="shadow-2xl" data-el="div-rich-text-editor-18">
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
                      stroke="var(--sky, #0ea5e9)"
                      stroke-width="2.5"
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
      
                    Insert Hyperlink
                  </h3>
                  <div data-el="div-rich-text-editor-19">
                    <label data-el="label-rich-text-editor-6">Destination URL</label>
                    <input
                      type="url"
                      placeholder="https://example.com"
                      data-el="input-rich-text-editor-8"
                      data-dom-state="RichTextEditor-input-rich-text-editor-8"
                    />
                  </div>
                  <div data-el="div-rich-text-editor-20">
                    <button type="button" data-el="button-rich-text-editor-32">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-33">
                      Insert Link
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-48">
                <div class="shadow-2xl" data-el="div-rich-text-editor-21">
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
                      stroke="var(--pink, #ec4899)"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
      
                    Insert Component
                  </h3>
                  <div data-el="div-rich-text-editor-22">
                    <label data-el="label-rich-text-editor-7">
                      Select ContentVeda Widget
                    </label>
                    <select
                      data-el="select-rich-text-editor-3"
                      data-dom-state="RichTextEditor-select-rich-text-editor-3"
                    >
                      <option value="banner" data-el="option-rich-text-editor-9">
                        Banner Component
                      </option>
                      <option
                        value="grid-banner"
                        data-el="option-rich-text-editor-10"
                      >
                        Grid Banner Component
                      </option>
                      <option value="media-grid" data-el="option-rich-text-editor-11">
                        Media Grid Component
                      </option>
                      <option value="slider" data-el="option-rich-text-editor-12">
                        Slider Carousel
                      </option>
                    </select>
                  </div>
                  <div data-el="div-rich-text-editor-23">
                    <button type="button" data-el="button-rich-text-editor-34">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-35">
                      Insert Widget
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-49">
                <div class="shadow-2xl" data-el="div-rich-text-editor-24">
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
                      stroke="var(--sky, #0ea5e9)"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                      ></path>
                    </svg>
      
                    Embed Social Post
                  </h3>
                  <div data-el="div-rich-text-editor-25">
                    <div data-el="div-rich-text-editor-26">
                      <label data-el="label-rich-text-editor-8">Platform</label>
                      <select
                        data-el="select-rich-text-editor-4"
                        data-dom-state="RichTextEditor-select-rich-text-editor-4"
                      >
                        <option value="x" data-el="option-rich-text-editor-13">
                          X (Twitter)
                        </option>
                        <option
                          value="instagram"
                          data-el="option-rich-text-editor-14"
                        >
                          Instagram
                        </option>
                        <option value="facebook" data-el="option-rich-text-editor-15">
                          Facebook
                        </option>
                        <option value="linkedin" data-el="option-rich-text-editor-16">
                          LinkedIn
                        </option>
                      </select>
                    </div>
                    <div data-el="div-rich-text-editor-27">
                      <label data-el="label-rich-text-editor-9">Post URL</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        data-el="input-rich-text-editor-9"
                        data-dom-state="RichTextEditor-input-rich-text-editor-9"
                      />
                    </div>
                  </div>
                  <div data-el="div-rich-text-editor-28">
                    <button type="button" data-el="button-rich-text-editor-36">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-37">
                      Embed Post
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>
        <div
          class="editor-source flex-1 overflow-y-auto bg-[#020617] min-h-[350px]"
          data-el="div-rich-text-editor-29"
        >
          <textarea
            class="w-full h-full p-6 bg-transparent text-emerald-400 font-mono text-[14px] leading-loose outline-none resize-none"
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
      self._editorRef.innerHTML = this.state.internalContent;
    }
    if (typeof document !== "undefined") {
      const styleId = "cv-editor-styles";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML =
          ".wysiwyg-content blockquote { border-left: 4px solid #8b5cf6 !important; background: linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.02) 100%) !important; padding: 20px 24px !important; margin: 24px 0 !important; border-radius: 0 16px 16px 0 !important; font-style: italic !important; color: #e2e8f0 !important; font-size: 1.1em !important; line-height: 1.8 !important; position: relative; box-shadow: inset 2px 0 0px rgba(255,255,255,0.1); } .wysiwyg-content pre { background: #0f172a !important; border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 12px !important; padding: 20px !important; color: #38bdf8 !important; font-family: 'Fira Code', monospace !important; overflow-x: auto !important; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5) !important; } .wysiwyg-content ul { list-style-type: disc !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content ol { list-style-type: decimal !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content li { margin-bottom: 0.5em !important; display: list-item !important; } .wysiwyg-content a:not(.cv-btn) { color: #8b5cf6 !important; text-decoration: underline !important; text-underline-offset: 3px !important; }";
        document.head.appendChild(style);
      }
      const fsHandler = () => {
        this.state.isFullscreen = !!document.fullscreenElement;
        this.update();
      };
      document.addEventListener("fullscreenchange", fsHandler);
      return () => {
        document.removeEventListener("fullscreenchange", fsHandler);
      };
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
        Object.assign(el.style, {
          boxSizing: "border-box",
          background: "#0f172a",
          border: this.state.isFullscreen
            ? "none"
            : "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-2']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "rgba(15, 23, 42, 0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          alignItems: "center",
          padding: "16px 24px",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("fullscreen");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-1']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "rgba(139, 92, 246, 0.15)",
          color: "#c4b5fd",
          border: "none",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor1Click);
        el.addEventListener("click", this.onButtonRichTextEditor1Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-2']")
      .forEach((el) => {
        const whenCondition = this.state.isFullscreen;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-3']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("source");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-2']")
      .forEach((el) => {
        el.className = `flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${
          this.state.mode === "source"
            ? "bg-indigo-500/20 text-indigo-300"
            : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
        }`;
        el.removeEventListener("click", this.onButtonRichTextEditor2Click);
        el.addEventListener("click", this.onButtonRichTextEditor2Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-4']")
      .forEach((el) => {
        const whenCondition =
          this.state.showToolbarOption("bold") ||
          this.state.showToolbarOption("italic") ||
          this.state.showToolbarOption("underline") ||
          this.state.showToolbarOption("strikeThrough");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-5']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("bold");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-3']")
      .forEach((el) => {
        el.className = `font-bold text-sm w-9 h-9 flex items-center justify-center rounded transition-colors ${
          this.state.activeFormats.bold
            ? "bg-white/20 text-white shadow-inner"
            : "hover:bg-white/10 hover:text-white"
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
      .querySelectorAll("[data-el='show-rich-text-editor-6']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("italic");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-4']")
      .forEach((el) => {
        el.className = `italic text-sm w-9 h-9 flex items-center justify-center rounded transition-colors font-serif ${
          this.state.activeFormats.italic
            ? "bg-white/20 text-white shadow-inner"
            : "hover:bg-white/10 hover:text-white"
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
      .querySelectorAll("[data-el='show-rich-text-editor-7']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("underline");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-5']")
      .forEach((el) => {
        el.className = `underline text-sm w-9 h-9 flex items-center justify-center rounded transition-colors ${
          this.state.activeFormats.underline
            ? "bg-white/20 text-white shadow-inner"
            : "hover:bg-white/10 hover:text-white"
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
      .querySelectorAll("[data-el='show-rich-text-editor-8']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("strikeThrough");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-6']")
      .forEach((el) => {
        el.className = `line-through text-sm w-9 h-9 flex items-center justify-center rounded transition-colors ${
          this.state.activeFormats.strikeThrough
            ? "bg-white/20 text-white shadow-inner"
            : "hover:bg-white/10 hover:text-white"
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
      .querySelectorAll("[data-el='show-rich-text-editor-9']")
      .forEach((el) => {
        const whenCondition = this.state.showSeparator(0);
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-10']")
      .forEach((el) => {
        const whenCondition =
          this.state.showToolbarOption("code") ||
          this.state.showToolbarOption("quote") ||
          this.state.showToolbarOption("clear");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-11']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("code");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-7']")
      .forEach((el) => {
        el.className = `w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
          this.state.activeFormats.code
            ? "bg-white/20 text-white shadow-inner"
            : "hover:bg-white/10 hover:text-white"
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
      .querySelectorAll("[data-el='show-rich-text-editor-12']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("quote");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-8']")
      .forEach((el) => {
        el.className = `w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
          this.state.activeFormats.quote
            ? "bg-white/20 text-white shadow-inner"
            : "hover:bg-white/10 hover:text-white"
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
      .querySelectorAll("[data-el='show-rich-text-editor-13']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("clear");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-9']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor9Mousedown
        );
        el.addEventListener("mousedown", this.onButtonRichTextEditor9Mousedown);
        el.removeEventListener("click", this.onButtonRichTextEditor9Click);
        el.addEventListener("click", this.onButtonRichTextEditor9Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-14']")
      .forEach((el) => {
        const whenCondition = this.state.showSeparator(1);
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-15']")
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
      .querySelectorAll("[data-el='option-rich-text-editor-1']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "14px",
          fontWeight: "normal",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-2']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "24px",
          fontWeight: "bold",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-3']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "20px",
          fontWeight: "bold",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-4']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "18px",
          fontWeight: "bold",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-16']")
      .forEach((el) => {
        const whenCondition = this.state.showSeparator(2);
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-17']")
      .forEach((el) => {
        const whenCondition =
          this.state.showToolbarOption("foreColor") ||
          this.state.showToolbarOption("backColor");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-18']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("foreColor");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-1']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onInputRichTextEditor1Mousedown
        );
        el.addEventListener("mousedown", this.onInputRichTextEditor1Mousedown);
        el.removeEventListener("change", this.onInputRichTextEditor1Change);
        el.addEventListener("change", this.onInputRichTextEditor1Change);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-19']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("backColor");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-2']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onInputRichTextEditor2Mousedown
        );
        el.addEventListener("mousedown", this.onInputRichTextEditor2Mousedown);
        el.removeEventListener("change", this.onInputRichTextEditor2Change);
        el.addEventListener("change", this.onInputRichTextEditor2Change);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-20']")
      .forEach((el) => {
        const whenCondition = this.state.showSeparator(3);
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-21']")
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
      .querySelectorAll("[data-el='show-rich-text-editor-22']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("justifyLeft");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-10']")
      .forEach((el) => {
        el.className = `w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
          this.state.activeFormats.justifyLeft
            ? "bg-white/20 text-white shadow-inner"
            : "hover:bg-white/10 hover:text-white"
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
      .querySelectorAll("[data-el='show-rich-text-editor-23']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("justifyCenter");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-11']")
      .forEach((el) => {
        el.className = `w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
          this.state.activeFormats.justifyCenter
            ? "bg-white/20 text-white shadow-inner"
            : "hover:bg-white/10 hover:text-white"
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
      .querySelectorAll("[data-el='show-rich-text-editor-24']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("justifyRight");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-12']")
      .forEach((el) => {
        el.className = `w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
          this.state.activeFormats.justifyRight
            ? "bg-white/20 text-white shadow-inner"
            : "hover:bg-white/10 hover:text-white"
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
      .querySelectorAll("[data-el='show-rich-text-editor-25']")
      .forEach((el) => {
        const whenCondition = this.state.showSeparator(4);
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-26']")
      .forEach((el) => {
        const whenCondition =
          this.state.showToolbarOption("image") ||
          this.state.showToolbarOption("link") ||
          this.state.showToolbarOption("table") ||
          this.state.showToolbarOption("unorderedList") ||
          this.state.showToolbarOption("orderedList") ||
          this.state.showToolbarOption("horizontalRule") ||
          this.state.showToolbarOption("video") ||
          this.state.showToolbarOption("social");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-27']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("image");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-13']")
      .forEach((el) => {
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
      .querySelectorAll("[data-el='show-rich-text-editor-28']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("link");
        if (whenCondition) {
          this.showContent(el);
        }
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
      .querySelectorAll("[data-el='show-rich-text-editor-29']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("table");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-15']")
      .forEach((el) => {
        el.removeEventListener(
          "mousedown",
          this.onButtonRichTextEditor15Mousedown
        );
        el.addEventListener(
          "mousedown",
          this.onButtonRichTextEditor15Mousedown
        );
        el.removeEventListener("click", this.onButtonRichTextEditor15Click);
        el.addEventListener("click", this.onButtonRichTextEditor15Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-30']")
      .forEach((el) => {
        const whenCondition =
          this.state.activeFormats.inTable &&
          this.state.showToolbarOption("table");
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
      .querySelectorAll("[data-el='show-rich-text-editor-31']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("unorderedList");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-20']")
      .forEach((el) => {
        el.className = `w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
          this.state.activeFormats.unorderedList
            ? "bg-white/20 text-white shadow-inner"
            : "hover:bg-white/10 hover:text-white"
        }`;
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
      .querySelectorAll("[data-el='show-rich-text-editor-32']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("orderedList");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-21']")
      .forEach((el) => {
        el.className = `w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
          this.state.activeFormats.orderedList
            ? "bg-white/20 text-white shadow-inner"
            : "hover:bg-white/10 hover:text-white"
        }`;
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
      .querySelectorAll("[data-el='show-rich-text-editor-33']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("horizontalRule");
        if (whenCondition) {
          this.showContent(el);
        }
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
      .querySelectorAll("[data-el='show-rich-text-editor-34']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("video");
        if (whenCondition) {
          this.showContent(el);
        }
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
      .querySelectorAll("[data-el='show-rich-text-editor-35']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("social");
        if (whenCondition) {
          this.showContent(el);
        }
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
      .querySelectorAll("[data-el='show-rich-text-editor-36']")
      .forEach((el) => {
        const whenCondition = this.state.showSeparator(5);
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-37']")
      .forEach((el) => {
        const whenCondition =
          this.state.showToolbarOption("insertButton") ||
          this.state.showToolbarOption("addWidget");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-38']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("insertButton");
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
      .querySelectorAll("[data-el='show-rich-text-editor-39']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("addWidget");
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
      .querySelectorAll("[data-el='show-rich-text-editor-40']")
      .forEach((el) => {
        const whenCondition = this.state.showSeparator(6);
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-41']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("save");
        if (whenCondition) {
          this.showContent(el);
        }
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
      .querySelectorAll("[data-el='show-rich-text-editor-42']")
      .forEach((el) => {
        const whenCondition = this.state.showToolbarOption("classInput");
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-3']")
      .forEach((el) => {
        el.removeEventListener("keydown", this.onInputRichTextEditor3Keydown);
        el.addEventListener("keydown", this.onInputRichTextEditor3Keydown);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-43']")
      .forEach((el) => {
        const whenCondition =
          this.props.availableClasses && this.props.availableClasses.length > 0;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='for-rich-text-editor']")
      .forEach((el) => {
        let array = this.props.availableClasses;
        this.renderLoop(el, array, "cls");
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-5']")
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
      .querySelectorAll("[data-el='div-rich-text-editor-4']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: this.state.mode === "visual" ? "block" : "none",
          padding: "2rem 3rem",
          color: "#f1f5f9",
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
        Object.assign(el.style, {
          minHeight: "350px",
          fontFamily: "Inter, sans-serif",
          lineHeight: "1.7",
          fontSize: "15px",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-44']")
      .forEach((el) => {
        const whenCondition =
          this.state.showTableModal ||
          this.state.showLinkModal ||
          this.state.showWidgetModal ||
          this.state.showSocialModal ||
          this.state.showButtonModal;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-6']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "rgba(0, 0, 0, 0.6)",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-45']")
      .forEach((el) => {
        const whenCondition = this.state.showButtonModal;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-7']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "24px",
          width: "380px",
        });
      });

    this._root
      .querySelectorAll("[data-el='h3-rich-text-editor-1']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-8']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "24px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-9']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-1']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='select-rich-text-editor-2']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "8px",
          padding: "12px 16px",
          width: "100%",
          fontSize: "14px",
          color: "white",
          outline: "none",
        });
        el.value = this.state.btnStyle;
        el.removeEventListener("change", this.onSelectRichTextEditor2Change);
        el.addEventListener("change", this.onSelectRichTextEditor2Change);
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-6']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-7']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-8']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-10']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-2']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-4']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "8px",
          padding: "12px 16px",
          width: "100%",
          fontSize: "14px",
          color: "white",
          outline: "none",
        });
        el.value = this.state.btnText;
        el.removeEventListener("input", this.onInputRichTextEditor4Input);
        el.addEventListener("input", this.onInputRichTextEditor4Input);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-11']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-3']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-5']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "8px",
          padding: "12px 16px",
          width: "100%",
          fontSize: "14px",
          color: "white",
          outline: "none",
        });
        el.value = this.state.btnUrl;
        el.removeEventListener("input", this.onInputRichTextEditor5Input);
        el.addEventListener("input", this.onInputRichTextEditor5Input);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-12']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "32px",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-28']")
      .forEach((el) => {
        Object.assign(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "#cbd5e1",
          background: "rgba(255,255,255,0.05)",
          border: "none",
          borderRadius: "8px",
          fontWeight: "500",
          cursor: "pointer",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor28Click);
        el.addEventListener("click", this.onButtonRichTextEditor28Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-29']")
      .forEach((el) => {
        Object.assign(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "white",
          background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(139,92,246,0.2)",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor29Click);
        el.addEventListener("click", this.onButtonRichTextEditor29Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-46']")
      .forEach((el) => {
        const whenCondition = this.state.showTableModal;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-13']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "24px",
          width: "340px",
        });
      });

    this._root
      .querySelectorAll("[data-el='h3-rich-text-editor-2']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-14']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "24px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-15']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(0,0,0,0.2)",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.05)",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-4']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "14px",
          fontWeight: "500",
          color: "#cbd5e1",
        });
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-6']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "transparent",
          border: "none",
          textAlign: "right",
          color: "white",
          fontWeight: "bold",
          width: "64px",
          fontSize: "14px",
          outline: "none",
        });
        el.value = this.state.tableRows;
        el.removeEventListener("input", this.onInputRichTextEditor6Input);
        el.addEventListener("input", this.onInputRichTextEditor6Input);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-16']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(0,0,0,0.2)",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.05)",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-5']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "14px",
          fontWeight: "500",
          color: "#cbd5e1",
        });
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-7']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "transparent",
          border: "none",
          textAlign: "right",
          color: "white",
          fontWeight: "bold",
          width: "64px",
          fontSize: "14px",
          outline: "none",
        });
        el.value = this.state.tableCols;
        el.removeEventListener("input", this.onInputRichTextEditor7Input);
        el.addEventListener("input", this.onInputRichTextEditor7Input);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-17']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "32px",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-30']")
      .forEach((el) => {
        Object.assign(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "#cbd5e1",
          background: "rgba(255,255,255,0.05)",
          border: "none",
          borderRadius: "8px",
          fontWeight: "500",
          cursor: "pointer",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor30Click);
        el.addEventListener("click", this.onButtonRichTextEditor30Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-31']")
      .forEach((el) => {
        Object.assign(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "white",
          background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor31Click);
        el.addEventListener("click", this.onButtonRichTextEditor31Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-47']")
      .forEach((el) => {
        const whenCondition = this.state.showLinkModal;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-18']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "24px",
          width: "380px",
        });
      });

    this._root
      .querySelectorAll("[data-el='h3-rich-text-editor-3']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-19']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "24px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-6']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-8']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "8px",
          padding: "12px 16px",
          width: "100%",
          fontSize: "14px",
          color: "white",
          outline: "none",
          boxSizing: "border-box",
        });
        el.value = this.state.linkUrl;
        el.removeEventListener("input", this.onInputRichTextEditor8Input);
        el.addEventListener("input", this.onInputRichTextEditor8Input);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-20']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "32px",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-32']")
      .forEach((el) => {
        Object.assign(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "#cbd5e1",
          background: "rgba(255,255,255,0.05)",
          border: "none",
          borderRadius: "8px",
          fontWeight: "500",
          cursor: "pointer",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor32Click);
        el.addEventListener("click", this.onButtonRichTextEditor32Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-33']")
      .forEach((el) => {
        Object.assign(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "white",
          background: "linear-gradient(135deg, #0ea5e9, #3b82f6)",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor33Click);
        el.addEventListener("click", this.onButtonRichTextEditor33Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-48']")
      .forEach((el) => {
        const whenCondition = this.state.showWidgetModal;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-21']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "24px",
          width: "380px",
        });
      });

    this._root
      .querySelectorAll("[data-el='h3-rich-text-editor-4']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-22']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "24px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-7']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='select-rich-text-editor-3']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "8px",
          padding: "12px 16px",
          width: "100%",
          fontSize: "14px",
          color: "white",
          outline: "none",
          boxSizing: "border-box",
        });
        el.value = this.state.selectedWidget;
        el.removeEventListener("change", this.onSelectRichTextEditor3Change);
        el.addEventListener("change", this.onSelectRichTextEditor3Change);
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-9']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-10']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-11']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-12']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-23']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "32px",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-34']")
      .forEach((el) => {
        Object.assign(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "#cbd5e1",
          background: "rgba(255,255,255,0.05)",
          border: "none",
          borderRadius: "8px",
          fontWeight: "500",
          cursor: "pointer",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor34Click);
        el.addEventListener("click", this.onButtonRichTextEditor34Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-35']")
      .forEach((el) => {
        Object.assign(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "white",
          background: "linear-gradient(135deg, #ec4899, #f43f5e)",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor35Click);
        el.addEventListener("click", this.onButtonRichTextEditor35Click);
      });

    this._root
      .querySelectorAll("[data-el='show-rich-text-editor-49']")
      .forEach((el) => {
        const whenCondition = this.state.showSocialModal;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-24']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "24px",
          width: "380px",
        });
      });

    this._root
      .querySelectorAll("[data-el='h3-rich-text-editor-5']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-25']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "24px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-26']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-8']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='select-rich-text-editor-4']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "8px",
          padding: "12px 16px",
          width: "100%",
          fontSize: "14px",
          color: "white",
          outline: "none",
          boxSizing: "border-box",
        });
        el.value = this.state.socialPlatform;
        el.removeEventListener("change", this.onSelectRichTextEditor4Change);
        el.addEventListener("change", this.onSelectRichTextEditor4Change);
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-13']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-14']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-15']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
        });
      });

    this._root
      .querySelectorAll("[data-el='option-rich-text-editor-16']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "#1e293b",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-27']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='label-rich-text-editor-9']")
      .forEach((el) => {
        Object.assign(el.style, {
          fontSize: "12px",
          fontWeight: "600",
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        });
      });

    this._root
      .querySelectorAll("[data-el='input-rich-text-editor-9']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "8px",
          padding: "12px 16px",
          width: "100%",
          fontSize: "14px",
          color: "white",
          outline: "none",
          boxSizing: "border-box",
        });
        el.value = this.state.socialUrl;
        el.removeEventListener("input", this.onInputRichTextEditor9Input);
        el.addEventListener("input", this.onInputRichTextEditor9Input);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-28']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "32px",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-36']")
      .forEach((el) => {
        Object.assign(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "#cbd5e1",
          background: "rgba(255,255,255,0.05)",
          border: "none",
          borderRadius: "8px",
          fontWeight: "500",
          cursor: "pointer",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor36Click);
        el.addEventListener("click", this.onButtonRichTextEditor36Click);
      });

    this._root
      .querySelectorAll("[data-el='button-rich-text-editor-37']")
      .forEach((el) => {
        Object.assign(el.style, {
          padding: "10px 20px",
          fontSize: "14px",
          color: "white",
          background: "linear-gradient(135deg, #0ea5e9, #3b82f6)",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        });
        el.removeEventListener("click", this.onButtonRichTextEditor37Click);
        el.addEventListener("click", this.onButtonRichTextEditor37Click);
      });

    this._root
      .querySelectorAll("[data-el='div-rich-text-editor-29']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: this.state.mode === "source" ? "block" : "none",
        });
      });

    this._root
      .querySelectorAll("[data-el='textarea-rich-text-editor-1']")
      .forEach((el) => {
        el.value = this.state.internalContent;
        el.removeEventListener("input", this.onTextareaRichTextEditor1Input);
        el.addEventListener("input", this.onTextareaRichTextEditor1Input);
        Object.assign(el.style, {
          whiteSpace: "pre-wrap",
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
