class m extends HTMLElement{static get observedAttributes(){return["content","initial-content","on-media-request","on-change","config","class-name","available-classes"]}attributeChangedCallback(i,t,e){const o=this,c=i.replace(/-/g,""),s=new RegExp("^"+c+"$","i");this.componentProps&&(this.componentProps.forEach(n=>{if(s.test(n)){let h=e;try{h&&(h.trim().startsWith("{")||h.trim().startsWith("["))&&(h=JSON.parse(h))}catch{}this.props[n]=h}}),this.update())}forceUpdate(i){const t=this;i&&typeof i=="object"&&Object.assign(this.props,i),typeof this.update=="function"&&this.update()}get _rootRef(){return this.__rootRef||this._root.querySelector("[data-ref='RichTextEditor-rootRef']")}set _rootRef(i){this.__rootRef=i}get _editorRef(){return this.__editorRef||this._root.querySelector("[data-ref='RichTextEditor-editorRef']")}set _editorRef(i){this.__editorRef=i}get _root(){return this.shadowRoot||this}constructor(){super();const i=this;this.props||(this.props={}),this.state={mode:"visual",isFullscreen:!1,internalContent:i.props.content||i.props.initialContent||"",showTableModal:!1,tableRows:"3",tableCols:"3",tableHasHeader:!0,showLinkModal:!1,linkUrl:"",showWidgetModal:!1,selectedWidget:"banner",showSocialModal:!1,socialUrl:"",socialPlatform:"x",showButtonModal:!1,btnText:"Click Here",btnUrl:"",btnStyle:"primary",activeFormats:{bold:!1,italic:!1,underline:!1,strikeThrough:!1,justifyLeft:!1,justifyCenter:!1,justifyRight:!1,quote:!1,code:!1,unorderedList:!1,orderedList:!1,inTable:!1},headingFormat:"P",checkFormats(){if(typeof window<"u"&&typeof document<"u"){let t=!1,e=!1,o=!1;const c=window.getSelection();if(c&&c.rangeCount>0){let n=c.getRangeAt(0).startContainer;for(;n&&n.nodeName!=="DIV"&&n.className!=="wysiwyg-content";)n.nodeName==="BLOCKQUOTE"&&(t=!0),(n.nodeName==="PRE"||n.nodeName==="CODE")&&(e=!0),(n.nodeName==="TD"||n.nodeName==="TH")&&(o=!0),n=n.parentNode}i.state.activeFormats={bold:document.queryCommandState("bold"),italic:document.queryCommandState("italic"),underline:document.queryCommandState("underline"),strikeThrough:document.queryCommandState("strikeThrough"),justifyLeft:document.queryCommandState("justifyLeft"),justifyCenter:document.queryCommandState("justifyCenter"),justifyRight:document.queryCommandState("justifyRight"),unorderedList:document.queryCommandState("insertUnorderedList"),orderedList:document.queryCommandState("insertOrderedList"),quote:t,code:e,inTable:o},i.update();const s=document.queryCommandValue("formatBlock");s&&(s.includes("1")?(i.state.headingFormat="H1",i.update(),i.update()):s.includes("2")?(i.state.headingFormat="H2",i.update(),i.update()):s.includes("3")?(i.state.headingFormat="H3",i.update(),i.update()):s.includes("4")?(i.state.headingFormat="H4",i.update(),i.update()):s.toLowerCase().includes("blockquote")?(i.state.activeFormats.quote=!0,i.state.headingFormat="P",i.update()):s.toLowerCase().includes("pre")?(i.state.activeFormats.code=!0,i.state.headingFormat="P",i.update()):(s.includes("p")||s.includes("div"))&&(i.state.headingFormat="P",i.update(),i.update()))}},saveSelection(){const t=window.getSelection();t&&t.rangeCount>0&&(i._savedRangeRef=t.getRangeAt(0))},restoreSelection(){if(i._savedRangeRef&&i._editorRef){i._editorRef.focus();const t=window.getSelection();t&&(t.removeAllRanges(),t.addRange(i._savedRangeRef))}},formatHTML(t){if(!t)return"";let e="",o="";const c="  ";return t.split(/>\s*</).forEach(function(s){s.match(/^\/\w/)&&(o=o.substring(c.length)),e+=o+"<"+s+`>
`,s.match(/^<?\w[^>]*[^\/]$/)&&!s.startsWith("input")&&!s.startsWith("img")&&!s.startsWith("br")&&!s.startsWith("hr")&&(o+=c)}),e.length>3?e.substring(1,e.length-2):t},format(t,e){document.execCommand(t,!1,e),i.state.syncContent(),i.state.checkFormats()},formatHeading(t){document.execCommand("formatBlock",!1,t),i.state.syncContent(),i.state.checkFormats()},insertMedia(t){if(i.state.saveSelection(),i.props.onMediaRequest)i.props.onMediaRequest(t).then(e=>{if(e){i.state.restoreSelection();let o="";t==="image"?o=`<img src="${e}" style="max-width:100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);" />`:t==="video"?o=`<video src="${e}" controls style="max-width:100%; border-radius: 8px;"></video>`:t==="audio"&&(o=`<audio src="${e}" controls></audio>`),document.execCommand("insertHTML",!1,o),i.state.syncContent()}});else{const e=prompt(`Enter ${t} URL:`);if(e){i.state.restoreSelection();let o="";t==="image"?o=`<img src="${e}" style="max-width:100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);" />`:t==="video"?o=`<video src="${e}" controls style="max-width:100%; border-radius: 8px;"></video>`:t==="audio"&&(o=`<audio src="${e}" controls></audio>`),document.execCommand("insertHTML",!1,o),i.state.syncContent()}}},clearAllFormatting(){document.execCommand("removeFormat",!1,void 0),document.execCommand("formatBlock",!1,"P"),document.execCommand("unlink",!1,void 0),i.state.syncContent(),i.state.checkFormats()},toggleBlock(t){i.state.checkFormats(),(t==="PRE"?i.state.activeFormats.code:i.state.activeFormats.quote)?document.execCommand("formatBlock",!1,"P"):document.execCommand("formatBlock",!1,t),i.state.syncContent(),i.state.checkFormats()},applyClass(t){if(!t)return;const e=window.getSelection();if(e&&e.rangeCount>0){const o=e.getRangeAt(0),c=document.createElement("span");c.className=t,c.appendChild(o.extractContents()),o.insertNode(c),i.state.syncContent()}},openButtonModal(){i.state.saveSelection(),i.state.showButtonModal=!0,i.update(),i.state.btnText="Click Here",i.update(),i.state.btnUrl="",i.update(),i.state.btnStyle="primary",i.update()},closeButtonModal(){i.state.showButtonModal=!1,i.update()},confirmButton(){if(i.state.showButtonModal=!1,i.update(),i.state.btnText){i._editorRef&&i._editorRef.focus(),i.state.restoreSelection();let t="padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; display: inline-block; text-decoration: none; transition: all 0.2s;";i.state.btnStyle==="primary"?t+=" background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; border: none; box-shadow: 0 4px 14px rgba(139,92,246,0.3);":i.state.btnStyle==="secondary"?t+=" background: #1e293b; color: white; border: 1px solid rgba(255,255,255,0.1);":i.state.btnStyle==="outline"&&(t+=" background: transparent; color: #8b5cf6; border: 2px solid #8b5cf6;");const o=`<a href="${i.state.btnUrl||"#"}" class="cv-btn" style="${t}">${i.state.btnText}</a>&nbsp;`;if(!document.execCommand("insertHTML",!1,o))if(i._savedRangeRef&&i._savedRangeRef.insertNode){const s=document.createElement("template");s.innerHTML=o.trim();const n=s.content;i._savedRangeRef.deleteContents(),i._savedRangeRef.insertNode(n),i._savedRangeRef.collapse(!1)}else i._editorRef.innerHTML+=o;i.state.syncContent()}},syncContent(){i._editorRef&&(i.state.internalContent=i._editorRef.innerHTML,i.update(),i.props.onChange&&i.props.onChange(i.state.internalContent))},handleInput(){i.state.syncContent()},handleSourceInput(t){i.state.internalContent=t.target.value,i.update(),i.props.onChange&&i.props.onChange(i.state.internalContent),i._editorRef&&(i._editorRef.innerHTML=i.state.internalContent)},openTableModal(){i.state.saveSelection(),i.state.showTableModal=!0,i.update(),i.state.tableRows="3",i.update(),i.state.tableCols="3",i.update(),i.state.tableHasHeader=!0,i.update()},confirmTable(){i.state.showTableModal=!1,i.update();const t=parseInt(i.state.tableRows,10),e=parseInt(i.state.tableCols,10);if(t>0&&e>0){i.state.restoreSelection();let o='<table border="1" style="width:100%; border-collapse: collapse; min-width: 50px;">';if(i.state.tableHasHeader){o+='<thead style="background-color: rgba(255,255,255,0.05);"><tr>';for(let c=0;c<e;c++)o+='<th style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); text-align: left; color: #a78bfa;">Header</th>';o+="</tr></thead>"}o+="<tbody>";for(let c=0;c<t;c++){o+="<tr>";for(let s=0;s<e;s++)o+='<td style="padding: 10px; border: 1px solid rgba(255,255,255,0.1); color: #f1f5f9;">Cell</td>';o+="</tr>"}o+="</tbody></table><p><br></p>",document.execCommand("insertHTML",!1,o),i.state.syncContent()}},closeTableModal(){i.state.showTableModal=!1,i.update()},modifyTable(t){const e=window.getSelection();if(!e||e.rangeCount===0)return;let o=e.getRangeAt(0).startContainer,c=null,s=null,n=null;for(;o&&o.nodeName!=="DIV"&&o.className!=="wysiwyg-content";)(o.nodeName==="TD"||o.nodeName==="TH")&&(c=o),o.nodeName==="TR"&&(s=o),o.nodeName==="TABLE"&&(n=o),o=o.parentNode;if(!n||!s||!c)return;const h=Array.from(s.children).indexOf(c);if(t==="addRow"){const l=document.createElement("tr"),d=s.children.length;for(let r=0;r<d;r++){const p=document.createElement("td");p.style.cssText="padding: 10px; border: 1px solid rgba(255,255,255,0.1); color: #f1f5f9;",p.innerHTML="Cell",l.appendChild(p)}s.parentNode.insertBefore(l,s.nextSibling)}else if(t==="removeRow")s.parentNode.children.length>1?s.parentNode.removeChild(s):n.parentNode.removeChild(n);else if(t==="addCol")n.querySelectorAll("tr").forEach(d=>{const r=document.createElement(d.parentNode.nodeName==="THEAD"?"th":"td");r.style.cssText=d.parentNode.nodeName==="THEAD"?"padding: 12px; border: 1px solid rgba(255,255,255,0.1); text-align: left; color: #a78bfa;":"padding: 10px; border: 1px solid rgba(255,255,255,0.1); color: #f1f5f9;",r.innerHTML=d.parentNode.nodeName==="THEAD"?"Header":"Cell";const p=d.children[h];d.insertBefore(r,p?p.nextSibling:null)});else if(t==="removeCol"){const l=n.querySelectorAll("tr");s.children.length>1?l.forEach(d=>{d.children[h]&&d.removeChild(d.children[h])}):n.parentNode.removeChild(n)}i.state.syncContent()},openLinkModal(){i.state.saveSelection(),i.state.showLinkModal=!0,i.update(),i.state.linkUrl="",i.update()},confirmLink(){i.state.showLinkModal=!1,i.update(),i.state.linkUrl&&(i.state.restoreSelection(),document.execCommand("createLink",!1,i.state.linkUrl),i.state.syncContent())},closeLinkModal(){i.state.showLinkModal=!1,i.update()},openWidgetModal(){i.state.saveSelection(),i.state.showWidgetModal=!0,i.update()},confirmWidget(){i.state.showWidgetModal=!1,i.update(),i.state.restoreSelection();let t=`<div class="cv-widget" data-widget="${i.state.selectedWidget}" style="padding: 24px; border: 2px dashed rgba(139,92,246,0.5); background: rgba(139,92,246,0.05); text-align: center; border-radius: 12px; margin: 16px 0; color: #a78bfa; font-weight: 600;">[ContentVeda Widget: ${i.state.selectedWidget.toUpperCase()}]</div><p><br></p>`;document.execCommand("insertHTML",!1,t),i.state.syncContent()},closeWidgetModal(){i.state.showWidgetModal=!1,i.update()},openSocialModal(){i.state.saveSelection(),i.state.showSocialModal=!0,i.update(),i.state.socialUrl="",i.update(),i.state.socialPlatform="x",i.update()},confirmSocial(){if(i.state.showSocialModal=!1,i.update(),i.state.socialUrl){i.state.restoreSelection();let t=`<div class="social-embed-placeholder" data-platform="${i.state.socialPlatform}" data-url="${i.state.socialUrl}" style="padding: 24px; border: 2px dashed rgba(14, 165, 233, 0.5); background: rgba(14, 165, 233, 0.05); text-align: center; border-radius: 12px; margin: 16px 0; color: #38bdf8; font-weight: 600;">[Embedded ${i.state.socialPlatform.toUpperCase()} Post: ${i.state.socialUrl}]</div><p><br></p>`;document.execCommand("insertHTML",!1,t),i.state.syncContent()}},closeSocialModal(){i.state.showSocialModal=!1,i.update()},toggleMode(){i.state.mode==="visual"?(i.state.internalContent=i.state.formatHTML(i.state.internalContent),i.update(),i.state.mode="source",i.update()):(i.state.mode="visual",i.update(),i._editorRef&&(i._editorRef.innerHTML=i.state.internalContent))},toggleFullScreen(){i.state.isFullscreen=!i.state.isFullscreen,i.update(),typeof document<"u"&&(i.state.isFullscreen?i._rootRef&&i._rootRef.requestFullscreen&&i._rootRef.requestFullscreen().catch(t=>console.warn("Fullscreen denied",t)):document.fullscreenElement&&document.exitFullscreen&&document.exitFullscreen())},showToolbarOption(t){if(!i.props.config||!i.props.config.toolbar)return!0;let e=t;return t==="alignLeft"&&(e="justifyLeft"),t==="alignCenter"&&(e="justifyCenter"),t==="alignRight"&&(e="justifyRight"),i.props.config.toolbar.includes(t)||i.props.config.toolbar.includes(e)},showSeparator(t){const e=[["fullscreen","source","bold","italic","underline","strikeThrough"],["code","quote","clear"],["headings"],["foreColor","backColor"],["alignLeft","justifyLeft","alignCenter","justifyCenter","alignRight","justifyRight"],["image","link","table","unorderedList","orderedList","horizontalRule","video","social"],["insertButton","addWidget"],["save"],["classInput"]],o=e.slice(0,t+1).some(s=>s.some(n=>i.state.showToolbarOption(n))),c=e[t+1]&&e[t+1].some(s=>i.state.showToolbarOption(s));return o&&c}},this.props||(this.props={}),this.componentProps=["content","initialContent","onMediaRequest","onChange","config","className","availableClasses"],this.nodesToDestroy=[],this.pendingUpdate=!1,this.onButtonRichTextEditor1Click=t=>{this.state.toggleFullScreen()},this.onButtonRichTextEditor2Click=t=>{this.state.toggleMode()},this.onButtonRichTextEditor3Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor3Click=t=>{this.state.format("bold")},this.onButtonRichTextEditor4Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor4Click=t=>{this.state.format("italic")},this.onButtonRichTextEditor5Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor5Click=t=>{this.state.format("underline")},this.onButtonRichTextEditor6Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor6Click=t=>{this.state.format("strikeThrough")},this.onButtonRichTextEditor7Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor7Click=t=>{this.state.toggleBlock("PRE")},this.onButtonRichTextEditor8Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor8Click=t=>{this.state.toggleBlock("BLOCKQUOTE")},this.onButtonRichTextEditor9Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor9Click=t=>{this.state.clearAllFormatting()},this.onSelectRichTextEditor1Mousedown=t=>{this.state.saveSelection()},this.onSelectRichTextEditor1Change=t=>{this.state.restoreSelection(),this.state.formatHeading(t.target.value),i._editorRef.focus()},this.onInputRichTextEditor1Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor1Change=t=>{this.state.restoreSelection(),document.execCommand("foreColor",!1,t.target.value),this.state.syncContent()},this.onInputRichTextEditor2Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor2Change=t=>{this.state.restoreSelection(),document.execCommand("hiliteColor",!1,t.target.value),document.execCommand("backColor",!1,t.target.value),this.state.syncContent()},this.onButtonRichTextEditor10Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor10Click=t=>{this.state.format("justifyLeft")},this.onButtonRichTextEditor11Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor11Click=t=>{this.state.format("justifyCenter")},this.onButtonRichTextEditor12Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor12Click=t=>{this.state.format("justifyRight")},this.onButtonRichTextEditor13Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor13Click=t=>{this.state.insertMedia("image")},this.onButtonRichTextEditor14Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor14Click=t=>{this.state.openLinkModal()},this.onButtonRichTextEditor15Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor15Click=t=>{this.state.openTableModal()},this.onButtonRichTextEditor16Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor16Click=t=>{this.state.modifyTable("addRow")},this.onButtonRichTextEditor17Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor17Click=t=>{this.state.modifyTable("removeRow")},this.onButtonRichTextEditor18Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor18Click=t=>{this.state.modifyTable("addCol")},this.onButtonRichTextEditor19Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor19Click=t=>{this.state.modifyTable("removeCol")},this.onButtonRichTextEditor20Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor20Click=t=>{this.state.format("insertUnorderedList")},this.onButtonRichTextEditor21Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor21Click=t=>{this.state.format("insertOrderedList")},this.onButtonRichTextEditor22Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor22Click=t=>{this.state.format("insertHorizontalRule")},this.onButtonRichTextEditor23Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor23Click=t=>{this.state.insertMedia("video")},this.onButtonRichTextEditor24Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor24Click=t=>{this.state.openSocialModal()},this.onButtonRichTextEditor25Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor25Click=t=>{this.state.openButtonModal()},this.onButtonRichTextEditor26Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor26Click=t=>{this.state.openWidgetModal()},this.onButtonRichTextEditor27Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor27Click=t=>{this.state.syncContent()},this.onInputRichTextEditor3Keydown=t=>{t.key==="Enter"&&(t.preventDefault(),this.state.applyClass(t.target.value),t.target.value="")},this.onDivRichTextEditor5Input=t=>{this.state.handleInput(),this.state.checkFormats()},this.onDivRichTextEditor5Blur=t=>{this.state.handleInput()},this.onDivRichTextEditor5Keyup=t=>{this.state.checkFormats()},this.onDivRichTextEditor5Mouseup=t=>{this.state.checkFormats()},this.onSelectRichTextEditor2Change=t=>{this.state.btnStyle=t.target.value,this.update()},this.onInputRichTextEditor4Input=t=>{this.state.btnText=t.target.value,this.update()},this.onInputRichTextEditor5Input=t=>{this.state.btnUrl=t.target.value,this.update()},this.onButtonRichTextEditor28Click=t=>{this.state.closeButtonModal()},this.onButtonRichTextEditor29Click=t=>{this.state.confirmButton()},this.onInputRichTextEditor6Input=t=>{this.state.tableRows=t.target.value,this.update()},this.onInputRichTextEditor7Input=t=>{this.state.tableCols=t.target.value,this.update()},this.onButtonRichTextEditor30Click=t=>{this.state.closeTableModal()},this.onButtonRichTextEditor31Click=t=>{this.state.confirmTable()},this.onInputRichTextEditor8Input=t=>{this.state.linkUrl=t.target.value,this.update()},this.onButtonRichTextEditor32Click=t=>{this.state.closeLinkModal()},this.onButtonRichTextEditor33Click=t=>{this.state.confirmLink()},this.onSelectRichTextEditor3Change=t=>{this.state.selectedWidget=t.target.value,this.update()},this.onButtonRichTextEditor34Click=t=>{this.state.closeWidgetModal()},this.onButtonRichTextEditor35Click=t=>{this.state.confirmWidget()},this.onSelectRichTextEditor4Change=t=>{this.state.socialPlatform=t.target.value,this.update()},this.onInputRichTextEditor9Input=t=>{this.state.socialUrl=t.target.value,this.update()},this.onButtonRichTextEditor36Click=t=>{this.state.closeSocialModal()},this.onButtonRichTextEditor37Click=t=>{this.state.confirmSocial()},this.onTextareaRichTextEditor1Input=t=>{this.state.handleSourceInput(t)},this._savedRangeRef=null}destroyAnyNodes(){const i=this;this.nodesToDestroy.forEach(t=>{t.__persistent||t.remove()}),this.nodesToDestroy=this.nodesToDestroy.filter(t=>t.__persistent)}connectedCallback(){const i=this;this.getAttributeNames().forEach(t=>{const e=t.replace(/-/g,""),o=new RegExp("^"+e+"$","i");this.componentProps.forEach(c=>{if(o.test(c)){let s=this.getAttribute(t);try{s&&(s.trim().startsWith("{")||s.trim().startsWith("["))&&(s=JSON.parse(s))}catch{}this.props[c]!==s&&(this.props[c]=s)}})}),this._root.innerHTML=`
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
      </div>`,this.pendingUpdate=!0,this.render(),this.onMount(),this.pendingUpdate=!1,this.update()}showContent(i,t){const e=this;if(t){if(i.__renderedNodes)return;const o=i.content.cloneNode(!0),c=Array.from(o.childNodes);i.__renderedNodes=c,c.forEach(s=>{i?.scope&&(s.scope=i.scope),i?.context&&(s.context=i.context),s.__persistent=!0,this.nodesToDestroy.push(s)}),i.after(o)}else i.__renderedNodes&&(i.__renderedNodes.forEach(o=>{o.remove();const c=this.nodesToDestroy.indexOf(o);c!==-1&&this.nodesToDestroy.splice(c,1)}),i.__renderedNodes=null)}onMount(){const i=this;if(this.state.internalContent||(this.state.internalContent=this.props.content||this.props.initialContent||"",this.update()),i._editorRef&&(i._editorRef.innerHTML=this.state.internalContent),typeof document<"u"){const t="cv-editor-styles";if(!document.getElementById(t)){const o=document.createElement("style");o.id=t,o.innerHTML=".wysiwyg-content blockquote { border-left: 4px solid #8b5cf6 !important; background: linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.02) 100%) !important; padding: 20px 24px !important; margin: 24px 0 !important; border-radius: 0 16px 16px 0 !important; font-style: italic !important; color: #e2e8f0 !important; font-size: 1.1em !important; line-height: 1.8 !important; position: relative; box-shadow: inset 2px 0 0px rgba(255,255,255,0.1); } .wysiwyg-content pre { background: #0f172a !important; border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 12px !important; padding: 20px !important; color: #38bdf8 !important; font-family: 'Fira Code', monospace !important; overflow-x: auto !important; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5) !important; } .wysiwyg-content ul { list-style-type: disc !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content ol { list-style-type: decimal !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content li { margin-bottom: 0.5em !important; display: list-item !important; } .wysiwyg-content a:not(.cv-btn) { color: #8b5cf6 !important; text-decoration: underline !important; text-underline-offset: 3px !important; }",document.head.appendChild(o)}const e=()=>{this.state.isFullscreen=!!document.fullscreenElement,this.update()};return document.addEventListener("fullscreenchange",e),()=>{document.removeEventListener("fullscreenchange",e)}}}onUpdate(){const i=this}update(){const i=this;this.pendingUpdate!==!0&&(this.pendingUpdate=!0,this.render(),this.onUpdate(),this.pendingUpdate=!1)}render(){const i=this,t=this.getStateful(this._root),e=this.prepareHydrate(t);if(this.destroyAnyNodes(),this.updateBindings(),e.length){const o=this.getStateful(this._root);this.hydrateDom(e,o)}}getStateful(i){const t=this,e=i.querySelectorAll("[data-dom-state]");return e?Array.from(e):[]}prepareHydrate(i){const t=this;return i.map(e=>({id:e.dataset.domState,value:e.value,active:document.activeElement===e,selectionStart:e.selectionStart}))}hydrateDom(i,t){const e=this;return t.map((o,c)=>{const s=i.find(n=>o.dataset.domState===n.id);s&&s.active&&(o.value=s.value,o.focus(),o.selectionStart=s.selectionStart)})}updateBindings(){const i=this;this._root.querySelectorAll("[data-el='div-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-rich-text-editor flex flex-col rounded-xl overflow-hidden relative ${this.state.isFullscreen?"fixed inset-0 z-[9999] w-screen h-screen rounded-none":"w-full"} ${this.props.className||""}`,Object.assign(t.style,{boxSizing:"border-box",background:"#0f172a",border:this.state.isFullscreen?"none":"1px solid rgba(255,255,255,0.1)",boxShadow:"0 8px 32px rgba(0,0,0,0.4)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"rgba(15, 23, 42, 0.85)",borderBottom:"1px solid rgba(255,255,255,0.08)",alignItems:"center",padding:"16px 24px"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("fullscreen");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"rgba(139, 92, 246, 0.15)",color:"#c4b5fd",border:"none"}),t.removeEventListener("click",this.onButtonRichTextEditor1Click),t.addEventListener("click",this.onButtonRichTextEditor1Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.isFullscreen;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("source");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${this.state.mode==="source"?"bg-indigo-500/20 text-indigo-300":"text-slate-400 hover:text-slate-200 hover:bg-white/5"}`,t.removeEventListener("click",this.onButtonRichTextEditor2Click),t.addEventListener("click",this.onButtonRichTextEditor2Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("bold")||this.state.showToolbarOption("italic")||this.state.showToolbarOption("underline")||this.state.showToolbarOption("strikeThrough");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("bold");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`font-bold text-sm w-9 h-9 flex items-center justify-center rounded transition-colors ${this.state.activeFormats.bold?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor3Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor3Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor3Click),t.addEventListener("click",this.onButtonRichTextEditor3Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("italic");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`italic text-sm w-9 h-9 flex items-center justify-center rounded transition-colors font-serif ${this.state.activeFormats.italic?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor4Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor4Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor4Click),t.addEventListener("click",this.onButtonRichTextEditor4Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("underline");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`underline text-sm w-9 h-9 flex items-center justify-center rounded transition-colors ${this.state.activeFormats.underline?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor5Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor5Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor5Click),t.addEventListener("click",this.onButtonRichTextEditor5Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("strikeThrough");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`line-through text-sm w-9 h-9 flex items-center justify-center rounded transition-colors ${this.state.activeFormats.strikeThrough?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor6Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor6Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor6Click),t.addEventListener("click",this.onButtonRichTextEditor6Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSeparator(0);this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("code")||this.state.showToolbarOption("quote")||this.state.showToolbarOption("clear");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("code");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.code?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor7Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor7Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor7Click),t.addEventListener("click",this.onButtonRichTextEditor7Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("quote");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.quote?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor8Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor8Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor8Click),t.addEventListener("click",this.onButtonRichTextEditor8Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("clear");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor9Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor9Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor9Click),t.addEventListener("click",this.onButtonRichTextEditor9Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSeparator(1);this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("headings");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.headingFormat,t.removeEventListener("mousedown",this.onSelectRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onSelectRichTextEditor1Mousedown),t.removeEventListener("change",this.onSelectRichTextEditor1Change),t.addEventListener("change",this.onSelectRichTextEditor1Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"14px",fontWeight:"normal"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"24px",fontWeight:"bold"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"20px",fontWeight:"bold"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"18px",fontWeight:"bold"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSeparator(2);this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("foreColor")||this.state.showToolbarOption("backColor");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("foreColor");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onInputRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onInputRichTextEditor1Mousedown),t.removeEventListener("change",this.onInputRichTextEditor1Change),t.addEventListener("change",this.onInputRichTextEditor1Change)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("backColor");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onInputRichTextEditor2Mousedown),t.addEventListener("mousedown",this.onInputRichTextEditor2Mousedown),t.removeEventListener("change",this.onInputRichTextEditor2Change),t.addEventListener("change",this.onInputRichTextEditor2Change)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSeparator(3);this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("justifyLeft")||this.state.showToolbarOption("justifyCenter")||this.state.showToolbarOption("justifyRight");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("justifyLeft");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.justifyLeft?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor10Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor10Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor10Click),t.addEventListener("click",this.onButtonRichTextEditor10Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("justifyCenter");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.justifyCenter?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor11Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor11Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor11Click),t.addEventListener("click",this.onButtonRichTextEditor11Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("justifyRight");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.justifyRight?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor12Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor12Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor12Click),t.addEventListener("click",this.onButtonRichTextEditor12Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSeparator(4);this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("image")||this.state.showToolbarOption("link")||this.state.showToolbarOption("table")||this.state.showToolbarOption("unorderedList")||this.state.showToolbarOption("orderedList")||this.state.showToolbarOption("horizontalRule")||this.state.showToolbarOption("video")||this.state.showToolbarOption("social");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("image");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor13Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor13Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor13Click),t.addEventListener("click",this.onButtonRichTextEditor13Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("link");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor14Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor14Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor14Click),t.addEventListener("click",this.onButtonRichTextEditor14Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("table");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor15Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor15Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor15Click),t.addEventListener("click",this.onButtonRichTextEditor15Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-30']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.activeFormats.inTable&&this.state.showToolbarOption("table");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor16Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor16Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor16Click),t.addEventListener("click",this.onButtonRichTextEditor16Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor17Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor17Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor17Click),t.addEventListener("click",this.onButtonRichTextEditor17Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor18Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor18Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor18Click),t.addEventListener("click",this.onButtonRichTextEditor18Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor19Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor19Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor19Click),t.addEventListener("click",this.onButtonRichTextEditor19Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-31']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("unorderedList");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.unorderedList?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor20Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor20Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor20Click),t.addEventListener("click",this.onButtonRichTextEditor20Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-32']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("orderedList");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.orderedList?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor21Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor21Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor21Click),t.addEventListener("click",this.onButtonRichTextEditor21Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-33']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("horizontalRule");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor22Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor22Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor22Click),t.addEventListener("click",this.onButtonRichTextEditor22Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-34']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("video");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor23Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor23Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor23Click),t.addEventListener("click",this.onButtonRichTextEditor23Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-35']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("social");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor24Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor24Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor24Click),t.addEventListener("click",this.onButtonRichTextEditor24Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-36']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSeparator(5);this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-37']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("insertButton")||this.state.showToolbarOption("addWidget");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-38']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("insertButton");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor25Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor25Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor25Click),t.addEventListener("click",this.onButtonRichTextEditor25Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-39']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("addWidget");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor26Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor26Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor26Click),t.addEventListener("click",this.onButtonRichTextEditor26Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-40']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSeparator(6);this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-41']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("save");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor27Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor27Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor27Click),t.addEventListener("click",this.onButtonRichTextEditor27Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-42']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showToolbarOption("classInput");this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("keydown",this.onInputRichTextEditor3Keydown),t.addEventListener("keydown",this.onInputRichTextEditor3Keydown)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-43']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.props.availableClasses&&this.props.availableClasses.length>0;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='for-rich-text-editor']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null,r=this.props.availableClasses;this.renderLoop(t,r,"cls")}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.value=d}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;this.renderTextNode(t,d)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:this.state.mode==="visual"?"block":"none",padding:"2rem 3rem",color:"#f1f5f9"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("input",this.onDivRichTextEditor5Input),t.addEventListener("input",this.onDivRichTextEditor5Input),t.removeEventListener("blur",this.onDivRichTextEditor5Blur),t.addEventListener("blur",this.onDivRichTextEditor5Blur),t.removeEventListener("keyup",this.onDivRichTextEditor5Keyup),t.addEventListener("keyup",this.onDivRichTextEditor5Keyup),t.removeEventListener("mouseup",this.onDivRichTextEditor5Mouseup),t.addEventListener("mouseup",this.onDivRichTextEditor5Mouseup),Object.assign(t.style,{minHeight:"350px",fontFamily:"Inter, sans-serif",lineHeight:"1.7",fontSize:"15px"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-44']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showTableModal||this.state.showLinkModal||this.state.showWidgetModal||this.state.showSocialModal||this.state.showButtonModal;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"rgba(0, 0, 0, 0.6)"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-45']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showButtonModal;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"12px",fontWeight:"600",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"white",outline:"none"}),t.value=this.state.btnStyle,t.removeEventListener("change",this.onSelectRichTextEditor2Change),t.addEventListener("change",this.onSelectRichTextEditor2Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"12px",fontWeight:"600",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"white",outline:"none"}),t.value=this.state.btnText,t.removeEventListener("input",this.onInputRichTextEditor4Input),t.addEventListener("input",this.onInputRichTextEditor4Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"12px",fontWeight:"600",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"white",outline:"none"}),t.value=this.state.btnUrl,t.removeEventListener("input",this.onInputRichTextEditor5Input),t.addEventListener("input",this.onInputRichTextEditor5Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"#cbd5e1",background:"rgba(255,255,255,0.05)",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor28Click),t.addEventListener("click",this.onButtonRichTextEditor28Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"white",background:"linear-gradient(135deg, #8b5cf6, #ec4899)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(139,92,246,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor29Click),t.addEventListener("click",this.onButtonRichTextEditor29Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-46']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showTableModal;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"16px",padding:"24px",width:"340px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(0,0,0,0.2)",padding:"12px",borderRadius:"8px",border:"1px solid rgba(255,255,255,0.05)"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"14px",fontWeight:"500",color:"#cbd5e1"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"transparent",border:"none",textAlign:"right",color:"white",fontWeight:"bold",width:"64px",fontSize:"14px",outline:"none"}),t.value=this.state.tableRows,t.removeEventListener("input",this.onInputRichTextEditor6Input),t.addEventListener("input",this.onInputRichTextEditor6Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(0,0,0,0.2)",padding:"12px",borderRadius:"8px",border:"1px solid rgba(255,255,255,0.05)"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"14px",fontWeight:"500",color:"#cbd5e1"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"transparent",border:"none",textAlign:"right",color:"white",fontWeight:"bold",width:"64px",fontSize:"14px",outline:"none"}),t.value=this.state.tableCols,t.removeEventListener("input",this.onInputRichTextEditor7Input),t.addEventListener("input",this.onInputRichTextEditor7Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-30']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"#cbd5e1",background:"rgba(255,255,255,0.05)",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor30Click),t.addEventListener("click",this.onButtonRichTextEditor30Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-31']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"white",background:"linear-gradient(135deg, #8b5cf6, #d946ef)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor31Click),t.addEventListener("click",this.onButtonRichTextEditor31Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-47']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showLinkModal;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"12px",fontWeight:"600",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"white",outline:"none",boxSizing:"border-box"}),t.value=this.state.linkUrl,t.removeEventListener("input",this.onInputRichTextEditor8Input),t.addEventListener("input",this.onInputRichTextEditor8Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-32']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"#cbd5e1",background:"rgba(255,255,255,0.05)",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor32Click),t.addEventListener("click",this.onButtonRichTextEditor32Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-33']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"white",background:"linear-gradient(135deg, #0ea5e9, #3b82f6)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor33Click),t.addEventListener("click",this.onButtonRichTextEditor33Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-48']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showWidgetModal;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"12px",fontWeight:"600",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"white",outline:"none",boxSizing:"border-box"}),t.value=this.state.selectedWidget,t.removeEventListener("change",this.onSelectRichTextEditor3Change),t.addEventListener("change",this.onSelectRichTextEditor3Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-34']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"#cbd5e1",background:"rgba(255,255,255,0.05)",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor34Click),t.addEventListener("click",this.onButtonRichTextEditor34Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-35']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"white",background:"linear-gradient(135deg, #ec4899, #f43f5e)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor35Click),t.addEventListener("click",this.onButtonRichTextEditor35Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-49']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;const r=this.state.showSocialModal;this.showContent(t,!!r)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"12px",fontWeight:"600",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"white",outline:"none",boxSizing:"border-box"}),t.value=this.state.socialPlatform,t.removeEventListener("change",this.onSelectRichTextEditor4Change),t.addEventListener("change",this.onSelectRichTextEditor4Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"#1e293b"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{fontSize:"12px",fontWeight:"600",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"white",outline:"none",boxSizing:"border-box"}),t.value=this.state.socialUrl,t.removeEventListener("input",this.onInputRichTextEditor9Input),t.addEventListener("input",this.onInputRichTextEditor9Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-36']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"#cbd5e1",background:"rgba(255,255,255,0.05)",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor36Click),t.addEventListener("click",this.onButtonRichTextEditor36Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-37']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{padding:"10px 20px",fontSize:"14px",color:"white",background:"linear-gradient(135deg, #0ea5e9, #3b82f6)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor37Click),t.addEventListener("click",this.onButtonRichTextEditor37Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;Object.assign(t.style,{display:this.state.mode==="source"?"block":"none"})}catch{}}),this._root.querySelectorAll("[data-el='textarea-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,o=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,s=this.getScope?this.getScope(t,"index"):0,n=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,l=this.getScope?this.getScope(t,"item"):null,d=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.internalContent,t.removeEventListener("input",this.onTextareaRichTextEditor1Input),t.addEventListener("input",this.onTextareaRichTextEditor1Input),Object.assign(t.style,{whiteSpace:"pre-wrap"}),t.setAttribute("spellcheck",!1)}catch{}})}renderTextNode(i,t){const e=this,o=document.createTextNode(t);i?.scope&&(o.scope=i.scope),i?.context&&(o.context=i.context),i.after(o),this.nodesToDestroy.push(i.nextSibling)}getScope(i,t){const e=this;do{let o=i?.scope?.[t];if(o!==void 0)return o}while(i=i.parentNode)}renderLoop(i,t,e,o,c){const s=this;t||(t=[]);const n=i.__renderedArray&&i.__renderedArray.length===t.length&&t.every((d,r)=>i.__renderedArray[r]===d);if(console.log("[WC Debug] renderLoop template:",i.getAttribute("data-el"),"isSameArray:",n),n)return;console.log("[WC Debug] renderLoop recreating nodes for template:",i.getAttribute("data-el")),i.__renderedNodes&&i.__renderedNodes.forEach(d=>{d.remove();const r=this.nodesToDestroy.indexOf(d);r!==-1&&this.nodesToDestroy.splice(r,1)});const h=[],l=[];for(let[d,r]of t.entries()){const p=i.content.cloneNode(!0),w=Array.from(p.childNodes),u={};let g=u;if(i?.scope){const a={get(S,x,f){return x in S?S[x]:x in i.scope?i.scope[x]:S[x]}};g=new Proxy(u,a)}w.forEach(a=>{e!==void 0&&(g[e]=r),o!==void 0&&(g[o]=d),c!==void 0&&(g[c]=t),a.scope=g,i.context&&(a.context=i.context),a.__persistent=!0,this.nodesToDestroy.push(a),h.unshift(a),l.push(a)})}h.forEach(d=>i.after(d)),i.__renderedArray=[...t],i.__renderedNodes=l}}customElements.define("cv-rich-text-editor",m);export{};
