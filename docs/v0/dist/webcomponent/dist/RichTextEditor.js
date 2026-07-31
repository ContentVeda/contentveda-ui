class m extends HTMLElement{static get observedAttributes(){return["content","initial-content","on-media-request","on-change","config","class-name","available-classes"]}attributeChangedCallback(o,t,e){const i=this,c=o.replace(/-/g,""),s=new RegExp("^"+c+"$","i");this.componentProps&&(this.componentProps.forEach(n=>{if(s.test(n)){let h=e;try{h&&(h.trim().startsWith("{")||h.trim().startsWith("["))&&(h=JSON.parse(h))}catch{}this.props[n]=h}}),this.update())}forceUpdate(o){const t=this;o&&typeof o=="object"&&Object.assign(this.props,o),typeof this.update=="function"&&this.update()}get _rootRef(){return this.__rootRef||this._root.querySelector("[data-ref='RichTextEditor-rootRef']")}set _rootRef(o){this.__rootRef=o}get _editorRef(){return this.__editorRef||this._root.querySelector("[data-ref='RichTextEditor-editorRef']")}set _editorRef(o){this.__editorRef=o}get _root(){return this.shadowRoot||this}constructor(){super();const o=this;this.props||(this.props={}),this.state={mode:"visual",isFullscreen:!1,internalContent:o.props.content||o.props.initialContent||"",showTableModal:!1,tableRows:"3",tableCols:"3",tableHasHeader:!0,showLinkModal:!1,linkUrl:"",showWidgetModal:!1,selectedWidget:"banner",showSocialModal:!1,socialUrl:"",socialPlatform:"x",showButtonModal:!1,btnText:"Click Here",btnUrl:"",btnStyle:"primary",activeFormats:{bold:!1,italic:!1,underline:!1,strikeThrough:!1,justifyLeft:!1,justifyCenter:!1,justifyRight:!1,quote:!1,code:!1,unorderedList:!1,orderedList:!1,inTable:!1},headingFormat:"P",checkFormats(){if(typeof window<"u"&&typeof document<"u"){let t=!1,e=!1,i=!1;const c=window.getSelection();if(c&&c.rangeCount>0){let n=c.getRangeAt(0).startContainer;for(;n&&n.nodeName!=="DIV"&&n.className!=="wysiwyg-content";)n.nodeName==="BLOCKQUOTE"&&(t=!0),(n.nodeName==="PRE"||n.nodeName==="CODE")&&(e=!0),(n.nodeName==="TD"||n.nodeName==="TH")&&(i=!0),n=n.parentNode}o.state.activeFormats={bold:document.queryCommandState("bold"),italic:document.queryCommandState("italic"),underline:document.queryCommandState("underline"),strikeThrough:document.queryCommandState("strikeThrough"),justifyLeft:document.queryCommandState("justifyLeft"),justifyCenter:document.queryCommandState("justifyCenter"),justifyRight:document.queryCommandState("justifyRight"),unorderedList:document.queryCommandState("insertUnorderedList"),orderedList:document.queryCommandState("insertOrderedList"),quote:t,code:e,inTable:i},o.update();const s=document.queryCommandValue("formatBlock");s&&(s.includes("1")?(o.state.headingFormat="H1",o.update(),o.update()):s.includes("2")?(o.state.headingFormat="H2",o.update(),o.update()):s.includes("3")?(o.state.headingFormat="H3",o.update(),o.update()):s.includes("4")?(o.state.headingFormat="H4",o.update(),o.update()):s.toLowerCase().includes("blockquote")?(o.state.activeFormats.quote=!0,o.state.headingFormat="P",o.update()):s.toLowerCase().includes("pre")?(o.state.activeFormats.code=!0,o.state.headingFormat="P",o.update()):(s.includes("p")||s.includes("div"))&&(o.state.headingFormat="P",o.update(),o.update()))}},saveSelection(){const t=window.getSelection();t&&t.rangeCount>0&&(o._savedRangeRef=t.getRangeAt(0))},restoreSelection(){if(o._savedRangeRef&&o._editorRef){o._editorRef.focus();const t=window.getSelection();t&&(t.removeAllRanges(),t.addRange(o._savedRangeRef))}},formatHTML(t){if(!t)return"";let e="",i="";const c="  ";return t.split(/>\s*</).forEach(function(s){s.match(/^\/\w/)&&(i=i.substring(c.length)),e+=i+"<"+s+`>
`,s.match(/^<?\w[^>]*[^\/]$/)&&!s.startsWith("input")&&!s.startsWith("img")&&!s.startsWith("br")&&!s.startsWith("hr")&&(i+=c)}),e.length>3?e.substring(1,e.length-2):t},format(t,e){document.execCommand(t,!1,e),o.state.syncContent(),o.state.checkFormats()},formatHeading(t){document.execCommand("formatBlock",!1,t),o.state.syncContent(),o.state.checkFormats()},insertMedia(t){if(o.state.saveSelection(),o.props.onMediaRequest)o.props.onMediaRequest(t).then(e=>{if(e){o.state.restoreSelection();let i="";t==="image"?i=`<img src="${e}" style="max-width:100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);" />`:t==="video"?i=`<video src="${e}" controls style="max-width:100%; border-radius: 8px;"></video>`:t==="audio"&&(i=`<audio src="${e}" controls></audio>`),document.execCommand("insertHTML",!1,i),o.state.syncContent()}});else{const e=prompt(`Enter ${t} URL:`);if(e){o.state.restoreSelection();let i="";t==="image"?i=`<img src="${e}" style="max-width:100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);" />`:t==="video"?i=`<video src="${e}" controls style="max-width:100%; border-radius: 8px;"></video>`:t==="audio"&&(i=`<audio src="${e}" controls></audio>`),document.execCommand("insertHTML",!1,i),o.state.syncContent()}}},clearAllFormatting(){document.execCommand("removeFormat",!1,void 0),document.execCommand("formatBlock",!1,"P"),document.execCommand("unlink",!1,void 0),o.state.syncContent(),o.state.checkFormats()},toggleBlock(t){o.state.checkFormats(),(t==="PRE"?o.state.activeFormats.code:o.state.activeFormats.quote)?document.execCommand("formatBlock",!1,"P"):document.execCommand("formatBlock",!1,t),o.state.syncContent(),o.state.checkFormats()},applyClass(t){if(!t)return;const e=window.getSelection();if(e&&e.rangeCount>0){const i=e.getRangeAt(0),c=document.createElement("span");c.className=t,c.appendChild(i.extractContents()),i.insertNode(c),o.state.syncContent()}},openButtonModal(){o.state.saveSelection(),o.state.showButtonModal=!0,o.update(),o.state.btnText="Click Here",o.update(),o.state.btnUrl="",o.update(),o.state.btnStyle="primary",o.update()},closeButtonModal(){o.state.showButtonModal=!1,o.update()},confirmButton(){if(o.state.showButtonModal=!1,o.update(),o.state.btnText){o._editorRef&&o._editorRef.focus(),o.state.restoreSelection();let t="padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; display: inline-block; text-decoration: none; transition: all 0.2s;";o.state.btnStyle==="primary"?t+=" background: var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480)); color: white; border: none; box-shadow: 0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.3));":o.state.btnStyle==="secondary"?t+=" background: var(--cv-color-surface-raised, #1e293b); color: var(--cv-color-text-main, #fff); border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1));":o.state.btnStyle==="outline"&&(t+=" background: transparent; color: var(--cv-color-primary-fill, #245066); border: 2px solid var(--cv-color-primary-fill, #245066);");const i=`<a href="${o.state.btnUrl||"#"}" class="cv-btn" style="${t}">${o.state.btnText}</a>&nbsp;`;if(!document.execCommand("insertHTML",!1,i))if(o._savedRangeRef&&o._savedRangeRef.insertNode){const s=document.createElement("template");s.innerHTML=i.trim();const n=s.content;o._savedRangeRef.deleteContents(),o._savedRangeRef.insertNode(n),o._savedRangeRef.collapse(!1)}else o._editorRef.innerHTML+=i;o.state.syncContent()}},syncContent(){o._editorRef&&(o.state.internalContent=o._editorRef.innerHTML,o.update(),o.props.onChange&&o.props.onChange(o.state.internalContent))},handleInput(){o.state.syncContent()},handleSourceInput(t){o.state.internalContent=t.target.value,o.update(),o.props.onChange&&o.props.onChange(o.state.internalContent),o._editorRef&&(o._editorRef.innerHTML=o.state.internalContent)},openTableModal(){o.state.saveSelection(),o.state.showTableModal=!0,o.update(),o.state.tableRows="3",o.update(),o.state.tableCols="3",o.update(),o.state.tableHasHeader=!0,o.update()},confirmTable(){o.state.showTableModal=!1,o.update();const t=parseInt(o.state.tableRows,10),e=parseInt(o.state.tableCols,10);if(t>0&&e>0){o.state.restoreSelection();let i='<table border="1" style="width:100%; border-collapse: collapse; min-width: 50px;">';if(o.state.tableHasHeader){i+='<thead style="background-color: var(--cv-color-hover, rgba(255,255,255,0.05));"><tr>';for(let c=0;c<e;c++)i+='<th style="padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);">Header</th>';i+="</tr></thead>"}i+="<tbody>";for(let c=0;c<t;c++){i+="<tr>";for(let s=0;s<e;s++)i+='<td style="padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);">Cell</td>';i+="</tr>"}i+="</tbody></table><p><br></p>",document.execCommand("insertHTML",!1,i),o.state.syncContent()}},closeTableModal(){o.state.showTableModal=!1,o.update()},modifyTable(t){const e=window.getSelection();if(!e||e.rangeCount===0)return;let i=e.getRangeAt(0).startContainer,c=null,s=null,n=null;for(;i&&i.nodeName!=="DIV"&&i.className!=="wysiwyg-content";)(i.nodeName==="TD"||i.nodeName==="TH")&&(c=i),i.nodeName==="TR"&&(s=i),i.nodeName==="TABLE"&&(n=i),i=i.parentNode;if(!n||!s||!c)return;const h=Array.from(s.children).indexOf(c);if(t==="addRow"){const l=document.createElement("tr"),d=s.children.length;for(let r=0;r<d;r++){const p=document.createElement("td");p.style.cssText="padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);",p.innerHTML="Cell",l.appendChild(p)}s.parentNode.insertBefore(l,s.nextSibling)}else if(t==="removeRow")s.parentNode.children.length>1?s.parentNode.removeChild(s):n.parentNode.removeChild(n);else if(t==="addCol")n.querySelectorAll("tr").forEach(d=>{const r=document.createElement(d.parentNode.nodeName==="THEAD"?"th":"td");r.style.cssText=d.parentNode.nodeName==="THEAD"?"padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);":"padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);",r.innerHTML=d.parentNode.nodeName==="THEAD"?"Header":"Cell";const p=d.children[h];d.insertBefore(r,p?p.nextSibling:null)});else if(t==="removeCol"){const l=n.querySelectorAll("tr");s.children.length>1?l.forEach(d=>{d.children[h]&&d.removeChild(d.children[h])}):n.parentNode.removeChild(n)}o.state.syncContent()},openLinkModal(){o.state.saveSelection(),o.state.showLinkModal=!0,o.update(),o.state.linkUrl="",o.update()},confirmLink(){o.state.showLinkModal=!1,o.update(),o.state.linkUrl&&(o.state.restoreSelection(),document.execCommand("createLink",!1,o.state.linkUrl),o.state.syncContent())},closeLinkModal(){o.state.showLinkModal=!1,o.update()},openWidgetModal(){o.state.saveSelection(),o.state.showWidgetModal=!0,o.update()},confirmWidget(){o.state.showWidgetModal=!1,o.update(),o.state.restoreSelection();let t=`<div class="cv-widget" data-widget="${o.state.selectedWidget}" style="padding: 24px; border: 2px dashed var(--cv-color-primary, #7fc4de); background: var(--cv-color-accent-tint, rgba(127,196,222,0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-link, #7fc4de); font-weight: 600;">[ContentVeda Widget: ${o.state.selectedWidget.toUpperCase()}]</div><p><br></p>`;document.execCommand("insertHTML",!1,t),o.state.syncContent()},closeWidgetModal(){o.state.showWidgetModal=!1,o.update()},openSocialModal(){o.state.saveSelection(),o.state.showSocialModal=!0,o.update(),o.state.socialUrl="",o.update(),o.state.socialPlatform="x",o.update()},confirmSocial(){if(o.state.showSocialModal=!1,o.update(),o.state.socialUrl){o.state.restoreSelection();let t=`<div class="social-embed-placeholder" data-platform="${o.state.socialPlatform}" data-url="${o.state.socialUrl}" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded ${o.state.socialPlatform.toUpperCase()} Post: ${o.state.socialUrl}]</div><p><br></p>`;document.execCommand("insertHTML",!1,t),o.state.syncContent()}},closeSocialModal(){o.state.showSocialModal=!1,o.update()},toggleMode(){o.state.mode==="visual"?(o.state.internalContent=o.state.formatHTML(o.state.internalContent),o.update(),o.state.mode="source",o.update()):(o.state.mode="visual",o.update(),o._editorRef&&(o._editorRef.innerHTML=o.state.internalContent))},toggleFullScreen(){o.state.isFullscreen=!o.state.isFullscreen,o.update(),typeof document<"u"&&(o.state.isFullscreen?o._rootRef&&o._rootRef.requestFullscreen&&o._rootRef.requestFullscreen().catch(t=>console.warn("Fullscreen denied",t)):document.fullscreenElement&&document.exitFullscreen&&document.exitFullscreen())},showToolbarOption(t){if(!o.props.config||!o.props.config.toolbar)return!0;let e=t;return t==="alignLeft"&&(e="justifyLeft"),t==="alignCenter"&&(e="justifyCenter"),t==="alignRight"&&(e="justifyRight"),o.props.config.toolbar.includes(t)||o.props.config.toolbar.includes(e)},showSeparator(t){const e=[["fullscreen","source","bold","italic","underline","strikeThrough"],["code","quote","clear"],["headings"],["foreColor","backColor"],["alignLeft","justifyLeft","alignCenter","justifyCenter","alignRight","justifyRight"],["image","link","table","unorderedList","orderedList","horizontalRule","video","social"],["insertButton","addWidget"],["save"],["classInput"]],i=e.slice(0,t+1).some(s=>s.some(n=>o.state.showToolbarOption(n))),c=e[t+1]&&e[t+1].some(s=>o.state.showToolbarOption(s));return i&&c}},this.props||(this.props={}),this.componentProps=["content","initialContent","onMediaRequest","onChange","config","className","availableClasses"],this.nodesToDestroy=[],this.pendingUpdate=!1,this.onButtonRichTextEditor1Click=t=>{this.state.toggleFullScreen()},this.onButtonRichTextEditor2Click=t=>{this.state.toggleMode()},this.onButtonRichTextEditor3Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor3Click=t=>{this.state.format("bold")},this.onButtonRichTextEditor4Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor4Click=t=>{this.state.format("italic")},this.onButtonRichTextEditor5Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor5Click=t=>{this.state.format("underline")},this.onButtonRichTextEditor6Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor6Click=t=>{this.state.format("strikeThrough")},this.onButtonRichTextEditor7Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor7Click=t=>{this.state.toggleBlock("PRE")},this.onButtonRichTextEditor8Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor8Click=t=>{this.state.toggleBlock("BLOCKQUOTE")},this.onButtonRichTextEditor9Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor9Click=t=>{this.state.clearAllFormatting()},this.onSelectRichTextEditor1Mousedown=t=>{this.state.saveSelection()},this.onSelectRichTextEditor1Change=t=>{this.state.restoreSelection(),this.state.formatHeading(t.target.value),o._editorRef.focus()},this.onInputRichTextEditor1Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor1Change=t=>{this.state.restoreSelection(),document.execCommand("foreColor",!1,t.target.value),this.state.syncContent()},this.onInputRichTextEditor2Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor2Change=t=>{this.state.restoreSelection(),document.execCommand("hiliteColor",!1,t.target.value),document.execCommand("backColor",!1,t.target.value),this.state.syncContent()},this.onButtonRichTextEditor10Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor10Click=t=>{this.state.format("justifyLeft")},this.onButtonRichTextEditor11Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor11Click=t=>{this.state.format("justifyCenter")},this.onButtonRichTextEditor12Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor12Click=t=>{this.state.format("justifyRight")},this.onButtonRichTextEditor13Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor13Click=t=>{this.state.insertMedia("image")},this.onButtonRichTextEditor14Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor14Click=t=>{this.state.openLinkModal()},this.onButtonRichTextEditor15Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor15Click=t=>{this.state.openTableModal()},this.onButtonRichTextEditor16Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor16Click=t=>{this.state.modifyTable("addRow")},this.onButtonRichTextEditor17Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor17Click=t=>{this.state.modifyTable("removeRow")},this.onButtonRichTextEditor18Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor18Click=t=>{this.state.modifyTable("addCol")},this.onButtonRichTextEditor19Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor19Click=t=>{this.state.modifyTable("removeCol")},this.onButtonRichTextEditor20Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor20Click=t=>{this.state.format("insertUnorderedList")},this.onButtonRichTextEditor21Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor21Click=t=>{this.state.format("insertOrderedList")},this.onButtonRichTextEditor22Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor22Click=t=>{this.state.format("insertHorizontalRule")},this.onButtonRichTextEditor23Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor23Click=t=>{this.state.insertMedia("video")},this.onButtonRichTextEditor24Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor24Click=t=>{this.state.openSocialModal()},this.onButtonRichTextEditor25Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor25Click=t=>{this.state.openButtonModal()},this.onButtonRichTextEditor26Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor26Click=t=>{this.state.openWidgetModal()},this.onButtonRichTextEditor27Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor27Click=t=>{this.state.syncContent()},this.onInputRichTextEditor3Keydown=t=>{t.key==="Enter"&&(t.preventDefault(),this.state.applyClass(t.target.value),t.target.value="")},this.onDivRichTextEditor5Input=t=>{this.state.handleInput(),this.state.checkFormats()},this.onDivRichTextEditor5Blur=t=>{this.state.handleInput()},this.onDivRichTextEditor5Keyup=t=>{this.state.checkFormats()},this.onDivRichTextEditor5Mouseup=t=>{this.state.checkFormats()},this.onSelectRichTextEditor2Change=t=>{this.state.btnStyle=t.target.value,this.update()},this.onInputRichTextEditor4Input=t=>{this.state.btnText=t.target.value,this.update()},this.onInputRichTextEditor5Input=t=>{this.state.btnUrl=t.target.value,this.update()},this.onButtonRichTextEditor28Click=t=>{this.state.closeButtonModal()},this.onButtonRichTextEditor29Click=t=>{this.state.confirmButton()},this.onInputRichTextEditor6Input=t=>{this.state.tableRows=t.target.value,this.update()},this.onInputRichTextEditor7Input=t=>{this.state.tableCols=t.target.value,this.update()},this.onButtonRichTextEditor30Click=t=>{this.state.closeTableModal()},this.onButtonRichTextEditor31Click=t=>{this.state.confirmTable()},this.onInputRichTextEditor8Input=t=>{this.state.linkUrl=t.target.value,this.update()},this.onButtonRichTextEditor32Click=t=>{this.state.closeLinkModal()},this.onButtonRichTextEditor33Click=t=>{this.state.confirmLink()},this.onSelectRichTextEditor3Change=t=>{this.state.selectedWidget=t.target.value,this.update()},this.onButtonRichTextEditor34Click=t=>{this.state.closeWidgetModal()},this.onButtonRichTextEditor35Click=t=>{this.state.confirmWidget()},this.onSelectRichTextEditor4Change=t=>{this.state.socialPlatform=t.target.value,this.update()},this.onInputRichTextEditor9Input=t=>{this.state.socialUrl=t.target.value,this.update()},this.onButtonRichTextEditor36Click=t=>{this.state.closeSocialModal()},this.onButtonRichTextEditor37Click=t=>{this.state.confirmSocial()},this.onTextareaRichTextEditor1Input=t=>{this.state.handleSourceInput(t)},this._savedRangeRef=null}destroyAnyNodes(){const o=this;this.nodesToDestroy.forEach(t=>{t.__persistent||t.remove()}),this.nodesToDestroy=this.nodesToDestroy.filter(t=>t.__persistent)}connectedCallback(){const o=this;this.getAttributeNames().forEach(t=>{const e=t.replace(/-/g,""),i=new RegExp("^"+e+"$","i");this.componentProps.forEach(c=>{if(i.test(c)){let s=this.getAttribute(t);try{s&&(s.trim().startsWith("{")||s.trim().startsWith("["))&&(s=JSON.parse(s))}catch{}this.props[c]!==s&&(this.props[c]=s)}})}),this._root.innerHTML=`
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
              class="bg-black/20 border border-white/10 text-slate-300 font-semibold text-sm rounded-lg px-3 py-1.5 outline-none focus:cv-rte-accent-border transition-colors cursor-pointer"
              data-el="select-rich-text-editor-1"
              data-dom-state="RichTextEditor-select-rich-text-editor-1"
            >
              <option
                value="P"
                class="cv-rte-surface"
                data-el="option-rich-text-editor-1"
              >
                Paragraph
              </option>
              <option
                value="H1"
                class="cv-rte-surface"
                data-el="option-rich-text-editor-2"
              >
                Heading 1
              </option>
              <option
                value="H2"
                class="cv-rte-surface"
                data-el="option-rich-text-editor-3"
              >
                Heading 2
              </option>
              <option
                value="H3"
                class="cv-rte-surface"
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
                  class="flex items-center cv-rte-tint rounded-lg p-0.5 border cv-rte-accent-border ml-1 mr-1 shadow-inner"
                >
                  <button
                    type="button"
                    class="w-7 h-7 flex items-center justify-center rounded hover:cv-rte-tint-strong cv-rte-accent transition-colors"
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
                  <div class="w-px h-4 cv-rte-tint-strong mx-0.5"></div>
                  <button
                    type="button"
                    class="w-7 h-7 flex items-center justify-center rounded hover:cv-rte-tint-strong cv-rte-accent transition-colors"
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
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 cv-rte-tint cv-rte-accent border-none hover:cv-rte-tint"
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
              class="ml-auto flex items-center bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 shadow-inner focus-within:cv-rte-accent-border focus-within:ring-1 focus-within:ring-violet-500 transition-all"
            >
              <span class="text-[10px] font-bold text-slate-500 tracking-wider mr-2">
                CLASS
              </span>
              <input
                type="text"
                list="editor-class-list"
                placeholder="e.g. my-callout"
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
          class="editor-source flex-1 overflow-y-auto bg-[var(--cv-color-background, #020617)] min-h-[350px]"
          data-el="div-rich-text-editor-29"
        >
          <textarea
            class="w-full h-full p-6 bg-transparent cv-rte-ok font-mono text-[14px] leading-loose outline-none resize-none"
            data-el="textarea-rich-text-editor-1"
            data-dom-state="RichTextEditor-textarea-rich-text-editor-1"
          ></textarea>
        </div>
      </div>`,this.pendingUpdate=!0,this.render(),this.onMount(),this.pendingUpdate=!1,this.update()}showContent(o,t){const e=this;if(t){if(o.__renderedNodes)return;const i=o.content.cloneNode(!0),c=Array.from(i.childNodes);o.__renderedNodes=c,c.forEach(s=>{o?.scope&&(s.scope=o.scope),o?.context&&(s.context=o.context),s.__persistent=!0,this.nodesToDestroy.push(s)}),o.after(i)}else o.__renderedNodes&&(o.__renderedNodes.forEach(i=>{i.remove();const c=this.nodesToDestroy.indexOf(i);c!==-1&&this.nodesToDestroy.splice(c,1)}),o.__renderedNodes=null)}onMount(){const o=this;if(this.state.internalContent||(this.state.internalContent=this.props.content||this.props.initialContent||"",this.update()),o._editorRef&&(o._editorRef.innerHTML=this.state.internalContent),typeof document<"u"){const t="cv-editor-styles";if(!document.getElementById(t)){const i=document.createElement("style");i.id=t,i.innerHTML=".wysiwyg-content blockquote { border-left: 4px solid var(--cv-color-quote-accent, #7fc4de) !important; background: linear-gradient(90deg, var(--cv-color-accent-tint, rgba(127, 196, 222, 0.1)) 0%, transparent 100%) !important; padding: 20px 24px !important; margin: 24px 0 !important; border-radius: 0 16px 16px 0 !important; font-style: italic !important; color: var(--cv-color-text-main, #e2e8f0) !important; font-size: 1.1em !important; line-height: 1.8 !important; position: relative; box-shadow: inset 2px 0 0px var(--cv-color-border, rgba(255,255,255,0.1)); } .wysiwyg-content pre { background: var(--cv-color-code-bg, #0f172a) !important; border: 1px solid var(--cv-color-code-border, rgba(255,255,255,0.1)) !important; border-radius: 12px !important; padding: 20px !important; color: var(--cv-color-code-text, #38bdf8) !important; font-family: 'Fira Code', monospace !important; overflow-x: auto !important; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5) !important; } .wysiwyg-content ul { list-style-type: disc !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content ol { list-style-type: decimal !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content li { margin-bottom: 0.5em !important; display: list-item !important; } .wysiwyg-content a:not(.cv-btn) { color: var(--cv-color-link, #7fc4de) !important; text-decoration: underline !important; text-underline-offset: 3px !important; }",document.head.appendChild(i)}const e=()=>{this.state.isFullscreen=!!document.fullscreenElement,this.update()};return document.addEventListener("fullscreenchange",e),()=>{document.removeEventListener("fullscreenchange",e)}}}onUpdate(){const o=this}update(){const o=this;this.pendingUpdate!==!0&&(this.pendingUpdate=!0,this.render(),this.onUpdate(),this.pendingUpdate=!1)}render(){const o=this,t=this.getStateful(this._root),e=this.prepareHydrate(t);if(this.destroyAnyNodes(),this.updateBindings(),e.length){const i=this.getStateful(this._root);this.hydrateDom(e,i)}}getStateful(o){const t=this,e=o.querySelectorAll("[data-dom-state]");return e?Array.from(e):[]}prepareHydrate(o){const t=this;return o.map(e=>({id:e.dataset.domState,value:e.value,active:document.activeElement===e,selectionStart:e.selectionStart}))}hydrateDom(o,t){const e=this;return t.map((i,c)=>{const s=o.find(n=>i.dataset.domState===n.id);s&&s.active&&(i.value=s.value,i.focus(),i.selectionStart=s.selectionStart)})}updateBindings(){const o=this;this._root.querySelectorAll("[data-el='div-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-rich-text-editor flex flex-col rounded-xl overflow-hidden relative ${this.state.isFullscreen?"fixed inset-0 z-[9999] w-screen h-screen rounded-none":"w-full"} ${this.props.className||""}`,Object.assign(t.style,{boxSizing:"border-box",background:"var(--cv-color-surface-sunken, #0f172a)",border:this.state.isFullscreen?"none":"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",boxShadow:"var(--cv-shadow-overlay, 0 8px 32px rgba(0,0,0,0.4))"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface, rgba(15, 23, 42, 0.85))",borderBottom:"1px solid var(--cv-color-border, rgba(255,255,255,0.08))",alignItems:"center",padding:"16px 24px"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("fullscreen");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-accent-tint, rgba(127, 196, 222, 0.15))",color:"var(--cv-color-primary-hover, #a8d8ea)",border:"none"}),t.removeEventListener("click",this.onButtonRichTextEditor1Click),t.addEventListener("click",this.onButtonRichTextEditor1Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.isFullscreen;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("source");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${this.state.mode==="source"?"cv-rte-tint cv-rte-accent":"text-slate-400 hover:text-slate-200 hover:bg-white/5"}`,t.removeEventListener("click",this.onButtonRichTextEditor2Click),t.addEventListener("click",this.onButtonRichTextEditor2Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("bold")||this.state.showToolbarOption("italic")||this.state.showToolbarOption("underline")||this.state.showToolbarOption("strikeThrough");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("bold");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`font-bold text-sm w-9 h-9 flex items-center justify-center rounded transition-colors ${this.state.activeFormats.bold?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor3Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor3Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor3Click),t.addEventListener("click",this.onButtonRichTextEditor3Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("italic");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`italic text-sm w-9 h-9 flex items-center justify-center rounded transition-colors font-serif ${this.state.activeFormats.italic?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor4Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor4Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor4Click),t.addEventListener("click",this.onButtonRichTextEditor4Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("underline");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`underline text-sm w-9 h-9 flex items-center justify-center rounded transition-colors ${this.state.activeFormats.underline?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor5Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor5Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor5Click),t.addEventListener("click",this.onButtonRichTextEditor5Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("strikeThrough");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`line-through text-sm w-9 h-9 flex items-center justify-center rounded transition-colors ${this.state.activeFormats.strikeThrough?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor6Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor6Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor6Click),t.addEventListener("click",this.onButtonRichTextEditor6Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSeparator(0);this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("code")||this.state.showToolbarOption("quote")||this.state.showToolbarOption("clear");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("code");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.code?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor7Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor7Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor7Click),t.addEventListener("click",this.onButtonRichTextEditor7Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("quote");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.quote?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor8Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor8Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor8Click),t.addEventListener("click",this.onButtonRichTextEditor8Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("clear");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor9Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor9Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor9Click),t.addEventListener("click",this.onButtonRichTextEditor9Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSeparator(1);this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("headings");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.headingFormat,t.removeEventListener("mousedown",this.onSelectRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onSelectRichTextEditor1Mousedown),t.removeEventListener("change",this.onSelectRichTextEditor1Change),t.addEventListener("change",this.onSelectRichTextEditor1Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"14px",fontWeight:"normal"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"24px",fontWeight:"bold"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"20px",fontWeight:"bold"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"18px",fontWeight:"bold"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSeparator(2);this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("foreColor")||this.state.showToolbarOption("backColor");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("foreColor");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onInputRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onInputRichTextEditor1Mousedown),t.removeEventListener("change",this.onInputRichTextEditor1Change),t.addEventListener("change",this.onInputRichTextEditor1Change)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("backColor");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onInputRichTextEditor2Mousedown),t.addEventListener("mousedown",this.onInputRichTextEditor2Mousedown),t.removeEventListener("change",this.onInputRichTextEditor2Change),t.addEventListener("change",this.onInputRichTextEditor2Change)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSeparator(3);this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("justifyLeft")||this.state.showToolbarOption("justifyCenter")||this.state.showToolbarOption("justifyRight");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("justifyLeft");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.justifyLeft?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor10Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor10Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor10Click),t.addEventListener("click",this.onButtonRichTextEditor10Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("justifyCenter");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.justifyCenter?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor11Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor11Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor11Click),t.addEventListener("click",this.onButtonRichTextEditor11Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("justifyRight");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.justifyRight?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor12Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor12Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor12Click),t.addEventListener("click",this.onButtonRichTextEditor12Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSeparator(4);this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("image")||this.state.showToolbarOption("link")||this.state.showToolbarOption("table")||this.state.showToolbarOption("unorderedList")||this.state.showToolbarOption("orderedList")||this.state.showToolbarOption("horizontalRule")||this.state.showToolbarOption("video")||this.state.showToolbarOption("social");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("image");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor13Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor13Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor13Click),t.addEventListener("click",this.onButtonRichTextEditor13Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("link");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor14Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor14Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor14Click),t.addEventListener("click",this.onButtonRichTextEditor14Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("table");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor15Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor15Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor15Click),t.addEventListener("click",this.onButtonRichTextEditor15Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-30']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.activeFormats.inTable&&this.state.showToolbarOption("table");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor16Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor16Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor16Click),t.addEventListener("click",this.onButtonRichTextEditor16Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor17Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor17Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor17Click),t.addEventListener("click",this.onButtonRichTextEditor17Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor18Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor18Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor18Click),t.addEventListener("click",this.onButtonRichTextEditor18Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor19Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor19Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor19Click),t.addEventListener("click",this.onButtonRichTextEditor19Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-31']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("unorderedList");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.unorderedList?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor20Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor20Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor20Click),t.addEventListener("click",this.onButtonRichTextEditor20Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-32']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("orderedList");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.orderedList?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor21Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor21Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor21Click),t.addEventListener("click",this.onButtonRichTextEditor21Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-33']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("horizontalRule");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor22Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor22Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor22Click),t.addEventListener("click",this.onButtonRichTextEditor22Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-34']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("video");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor23Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor23Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor23Click),t.addEventListener("click",this.onButtonRichTextEditor23Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-35']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("social");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor24Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor24Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor24Click),t.addEventListener("click",this.onButtonRichTextEditor24Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-36']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSeparator(5);this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-37']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("insertButton")||this.state.showToolbarOption("addWidget");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-38']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("insertButton");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor25Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor25Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor25Click),t.addEventListener("click",this.onButtonRichTextEditor25Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-39']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("addWidget");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor26Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor26Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor26Click),t.addEventListener("click",this.onButtonRichTextEditor26Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-40']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSeparator(6);this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-41']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("save");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor27Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor27Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor27Click),t.addEventListener("click",this.onButtonRichTextEditor27Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-42']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("classInput");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("keydown",this.onInputRichTextEditor3Keydown),t.addEventListener("keydown",this.onInputRichTextEditor3Keydown)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-43']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.props.availableClasses&&this.props.availableClasses.length>0;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='for-rich-text-editor']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null,r=this.props.availableClasses;this.renderLoop(t,r,"cls")}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.value=d}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;this.renderTextNode(t,d)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:this.state.mode==="visual"?"block":"none",padding:"2rem 3rem",color:"var(--cv-color-text-main, #f1f5f9)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("input",this.onDivRichTextEditor5Input),t.addEventListener("input",this.onDivRichTextEditor5Input),t.removeEventListener("blur",this.onDivRichTextEditor5Blur),t.addEventListener("blur",this.onDivRichTextEditor5Blur),t.removeEventListener("keyup",this.onDivRichTextEditor5Keyup),t.addEventListener("keyup",this.onDivRichTextEditor5Keyup),t.removeEventListener("mouseup",this.onDivRichTextEditor5Mouseup),t.addEventListener("mouseup",this.onDivRichTextEditor5Mouseup),Object.assign(t.style,{minHeight:"350px",fontFamily:"Inter, sans-serif",lineHeight:"1.7",fontSize:"15px"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-44']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showTableModal||this.state.showLinkModal||this.state.showWidgetModal||this.state.showSocialModal||this.state.showButtonModal;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"rgba(0, 0, 0, 0.6)"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-45']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showButtonModal;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{color:"var(--cv-color-link, #7fc4de)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none"}),t.value=this.state.btnStyle,t.removeEventListener("change",this.onSelectRichTextEditor2Change),t.addEventListener("change",this.onSelectRichTextEditor2Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none"}),t.value=this.state.btnText,t.removeEventListener("input",this.onInputRichTextEditor4Input),t.addEventListener("input",this.onInputRichTextEditor4Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none"}),t.value=this.state.btnUrl,t.removeEventListener("input",this.onInputRichTextEditor5Input),t.addEventListener("input",this.onInputRichTextEditor5Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor28Click),t.addEventListener("click",this.onButtonRichTextEditor28Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.2))"}),t.removeEventListener("click",this.onButtonRichTextEditor29Click),t.addEventListener("click",this.onButtonRichTextEditor29Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-46']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showTableModal;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"340px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{color:"var(--cv-color-link, #7fc4de)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.2))",padding:"12px",borderRadius:"8px",border:"1px solid var(--cv-color-hover, rgba(255,255,255,0.05))"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"14px",fontWeight:"500",color:"var(--cv-color-text-secondary, #cbd5e1)"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"transparent",border:"none",textAlign:"right",color:"var(--cv-color-text-main, #fff)",fontWeight:"bold",width:"64px",fontSize:"14px",outline:"none"}),t.value=this.state.tableRows,t.removeEventListener("input",this.onInputRichTextEditor6Input),t.addEventListener("input",this.onInputRichTextEditor6Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.2))",padding:"12px",borderRadius:"8px",border:"1px solid var(--cv-color-hover, rgba(255,255,255,0.05))"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"14px",fontWeight:"500",color:"var(--cv-color-text-secondary, #cbd5e1)"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"transparent",border:"none",textAlign:"right",color:"var(--cv-color-text-main, #fff)",fontWeight:"bold",width:"64px",fontSize:"14px",outline:"none"}),t.value=this.state.tableCols,t.removeEventListener("input",this.onInputRichTextEditor7Input),t.addEventListener("input",this.onInputRichTextEditor7Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-30']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor30Click),t.addEventListener("click",this.onButtonRichTextEditor30Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-31']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor31Click),t.addEventListener("click",this.onButtonRichTextEditor31Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-47']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showLinkModal;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{color:"var(--cv-color-info, #0ea5e9)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.linkUrl,t.removeEventListener("input",this.onInputRichTextEditor8Input),t.addEventListener("input",this.onInputRichTextEditor8Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-32']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor32Click),t.addEventListener("click",this.onButtonRichTextEditor32Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-33']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-color-info-fill, #075985)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor33Click),t.addEventListener("click",this.onButtonRichTextEditor33Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-48']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showWidgetModal;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{color:"var(--cv-color-secondary, #5eb3d6)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.selectedWidget,t.removeEventListener("change",this.onSelectRichTextEditor3Change),t.addEventListener("change",this.onSelectRichTextEditor3Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-34']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor34Click),t.addEventListener("click",this.onButtonRichTextEditor34Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-35']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor35Click),t.addEventListener("click",this.onButtonRichTextEditor35Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-49']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSocialModal;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{color:"var(--cv-color-info, #0ea5e9)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.socialPlatform,t.removeEventListener("change",this.onSelectRichTextEditor4Change),t.addEventListener("change",this.onSelectRichTextEditor4Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.socialUrl,t.removeEventListener("input",this.onInputRichTextEditor9Input),t.addEventListener("input",this.onInputRichTextEditor9Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-36']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor36Click),t.addEventListener("click",this.onButtonRichTextEditor36Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-37']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-color-info-fill, #075985)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor37Click),t.addEventListener("click",this.onButtonRichTextEditor37Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:this.state.mode==="source"?"block":"none"})}catch{}}),this._root.querySelectorAll("[data-el='textarea-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.internalContent,t.removeEventListener("input",this.onTextareaRichTextEditor1Input),t.addEventListener("input",this.onTextareaRichTextEditor1Input),Object.assign(t.style,{whiteSpace:"pre-wrap"}),t.setAttribute("spellcheck",!1)}catch{}})}renderTextNode(o,t){const e=this,i=document.createTextNode(t);o?.scope&&(i.scope=o.scope),o?.context&&(i.context=o.context),o.after(i),this.nodesToDestroy.push(o.nextSibling)}getScope(o,t){const e=this;do{let i=o?.scope?.[t];if(i!==void 0)return i}while(o=o.parentNode)}renderLoop(o,t,e,i,c){const s=this;t||(t=[]);const n=o.__renderedArray&&o.__renderedArray.length===t.length&&t.every((d,r)=>o.__renderedArray[r]===d);if(console.log("[WC Debug] renderLoop template:",o.getAttribute("data-el"),"isSameArray:",n),n)return;console.log("[WC Debug] renderLoop recreating nodes for template:",o.getAttribute("data-el")),o.__renderedNodes&&o.__renderedNodes.forEach(d=>{d.remove();const r=this.nodesToDestroy.indexOf(d);r!==-1&&this.nodesToDestroy.splice(r,1)});const h=[],l=[];for(let[d,r]of t.entries()){const p=o.content.cloneNode(!0),w=Array.from(p.childNodes),u={};let g=u;if(o?.scope){const a={get(S,x,v){return x in S?S[x]:x in o.scope?o.scope[x]:S[x]}};g=new Proxy(u,a)}w.forEach(a=>{e!==void 0&&(g[e]=r),i!==void 0&&(g[i]=d),c!==void 0&&(g[c]=t),a.scope=g,o.context&&(a.context=o.context),a.__persistent=!0,this.nodesToDestroy.push(a),h.unshift(a),l.push(a)})}h.forEach(d=>o.after(d)),o.__renderedArray=[...t],o.__renderedNodes=l}}customElements.define("cv-rich-text-editor",m);export{};
