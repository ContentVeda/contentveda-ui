function _arrayLikeToArray(o,t){(t==null||t>o.length)&&(t=o.length);for(var e=0,i=Array(t);e<t;e++)i[e]=o[e];return i}function _arrayWithHoles(o){if(Array.isArray(o))return o}function _iterableToArrayLimit(o,t){var e=o==null?null:typeof Symbol<"u"&&o[Symbol.iterator]||o["@@iterator"];if(e!=null){var i,s,n,c,r=[],d=!0,l=!1;try{if(n=(e=e.call(o)).next,t!==0)for(;!(d=(i=n.call(e)).done)&&(r.push(i.value),r.length!==t);d=!0);}catch(p){l=!0,s=p}finally{try{if(!d&&e.return!=null&&(c=e.return(),Object(c)!==c))return}finally{if(l)throw s}}return r}}function _nonIterableRest(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function _slicedToArray(o,t){return _arrayWithHoles(o)||_iterableToArrayLimit(o,t)||_unsupportedIterableToArray(o,t)||_nonIterableRest()}function _unsupportedIterableToArray(o,t){if(o){if(typeof o=="string")return _arrayLikeToArray(o,t);var e={}.toString.call(o).slice(8,-1);return e==="Object"&&o.constructor&&(e=o.constructor.name),e==="Map"||e==="Set"?Array.from(o):e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?_arrayLikeToArray(o,t):void 0}}var entries=Object.entries,setPrototypeOf=Object.setPrototypeOf,isFrozen=Object.isFrozen,getPrototypeOf=Object.getPrototypeOf,getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor,freeze=Object.freeze,seal=Object.seal,create=Object.create,_ref=typeof Reflect<"u"&&Reflect,apply=_ref.apply,construct=_ref.construct;freeze||(freeze=function(t){return t}),seal||(seal=function(t){return t}),apply||(apply=function(t,e){for(var i=arguments.length,s=new Array(i>2?i-2:0),n=2;n<i;n++)s[n-2]=arguments[n];return t.apply(e,s)}),construct||(construct=function(t){for(var e=arguments.length,i=new Array(e>1?e-1:0),s=1;s<e;s++)i[s-1]=arguments[s];return new t(...i)});var arrayForEach=unapply(Array.prototype.forEach),arrayLastIndexOf=unapply(Array.prototype.lastIndexOf),arrayPop=unapply(Array.prototype.pop),arrayPush=unapply(Array.prototype.push),arraySplice=unapply(Array.prototype.splice),arrayIsArray=Array.isArray,stringToLowerCase=unapply(String.prototype.toLowerCase),stringToString=unapply(String.prototype.toString),stringMatch=unapply(String.prototype.match),stringReplace=unapply(String.prototype.replace),stringIndexOf=unapply(String.prototype.indexOf),stringTrim=unapply(String.prototype.trim),numberToString=unapply(Number.prototype.toString),booleanToString=unapply(Boolean.prototype.toString),bigintToString=typeof BigInt>"u"?null:unapply(BigInt.prototype.toString),symbolToString=typeof Symbol>"u"?null:unapply(Symbol.prototype.toString),objectHasOwnProperty=unapply(Object.prototype.hasOwnProperty),objectToString=unapply(Object.prototype.toString),regExpTest=unapply(RegExp.prototype.test),typeErrorCreate=unconstruct(TypeError);function unapply(o){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var e=arguments.length,i=new Array(e>1?e-1:0),s=1;s<e;s++)i[s-1]=arguments[s];return apply(o,t,i)}}function unconstruct(o){return function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return construct(o,e)}}function addToSet(o,t){let e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:stringToLowerCase;if(setPrototypeOf&&setPrototypeOf(o,null),!arrayIsArray(t))return o;let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const n=e(s);n!==s&&(isFrozen(t)||(t[i]=n),s=n)}o[s]=!0}return o}function cleanArray(o){for(let t=0;t<o.length;t++)objectHasOwnProperty(o,t)||(o[t]=null);return o}function clone(o){const t=create(null);for(const i of entries(o)){var e=_slicedToArray(i,2);const s=e[0],n=e[1];objectHasOwnProperty(o,s)&&(arrayIsArray(n)?t[s]=cleanArray(n):n&&typeof n=="object"&&n.constructor===Object?t[s]=clone(n):t[s]=n)}return t}function stringifyValue(o){switch(typeof o){case"string":return o;case"number":return numberToString(o);case"boolean":return booleanToString(o);case"bigint":return bigintToString?bigintToString(o):"0";case"symbol":return symbolToString?symbolToString(o):"Symbol()";case"undefined":return objectToString(o);case"function":case"object":{if(o===null)return objectToString(o);const t=o,e=lookupGetter(t,"toString");if(typeof e=="function"){const i=e(t);return typeof i=="string"?i:objectToString(i)}return objectToString(o)}default:return objectToString(o)}}function lookupGetter(o,t){for(;o!==null;){const i=getOwnPropertyDescriptor(o,t);if(i){if(i.get)return unapply(i.get);if(typeof i.value=="function")return unapply(i.value)}o=getPrototypeOf(o)}function e(){return null}return e}function isRegex(o){try{return regExpTest(o,""),!0}catch{return!1}}var html$1=freeze(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),svg$1=freeze(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),svgFilters=freeze(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),svgDisallowed=freeze(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),mathMl$1=freeze(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),mathMlDisallowed=freeze(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),text=freeze(["#text"]),html=freeze(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),svg=freeze(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),mathMl=freeze(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),xml=freeze(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),MUSTACHE_EXPR=seal(/{{[\w\W]*|^[\w\W]*}}/g),ERB_EXPR=seal(/<%[\w\W]*|^[\w\W]*%>/g),TMPLIT_EXPR=seal(/\${[\w\W]*/g),DATA_ATTR=seal(/^data-[\-\w.\u00B7-\uFFFF]+$/),ARIA_ATTR=seal(/^aria-[\-\w]+$/),IS_ALLOWED_URI=seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),IS_SCRIPT_OR_DATA=seal(/^(?:\w+script|data):/i),ATTR_WHITESPACE=seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),DOCTYPE_NAME=seal(/^html$/i),CUSTOM_ELEMENT=seal(/^[a-z][.\w]*(-[.\w]+)+$/i),ELEMENT_MARKUP_PROBE=seal(/<[/\w!]/g),COMMENT_MARKUP_PROBE=seal(/<[/\w]/g),FALLBACK_TAG_CLOSE=seal(/<\/no(script|embed|frames)/i),SELF_CLOSING_TAG=seal(/\/>/i),NODE_TYPE={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},LITERAL_TEXT_ELEMENT_NAMES=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],LITERAL_TEXT_ELEMENTS=freeze(addToSet({},LITERAL_TEXT_ELEMENT_NAMES)),LITERAL_TEXT_CLOSE=(function(){const o={};return arrayForEach(LITERAL_TEXT_ELEMENT_NAMES,t=>{o[t]=seal(new RegExp("</"+t+"(?=[\\t\\n\\f\\r />])","i"))}),freeze(o)})(),getGlobal=function(){return typeof window>"u"?null:window},_createTrustedTypesPolicy=function(t,e){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";e&&e.hasAttribute(s)&&(i=e.getAttribute(s));const n="dompurify"+(i?"#"+i:"");try{return t.createPolicy(n,{createHTML(c){return c},createScriptURL(c){return c}})}catch{return console.warn("TrustedTypes policy "+n+" could not be created."),null}},_createHooksMap=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},_resolveSetOption=function(t,e,i,s){return objectHasOwnProperty(t,e)&&arrayIsArray(t[e])?addToSet(s.base?clone(s.base):{},t[e],s.transform):i},_resolveObjectOption=function(t,e,i){const s=objectHasOwnProperty(t,e)?t[e]:void 0;return s&&typeof s=="object"?clone(s):i()};function createDOMPurify(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:getGlobal();const t=u=>createDOMPurify(u);if(t.version="3.4.15",t.removed=[],!o||!o.document||o.document.nodeType!==NODE_TYPE.document||!o.Element)return t.isSupported=!1,t;let e=o.document;const i=e,s=i.currentScript;o.DocumentFragment;const n=o.HTMLTemplateElement,c=o.Node,r=o.Element,d=o.NodeFilter,l=o.NamedNodeMap;l===void 0&&(o.NamedNodeMap||o.MozNamedAttrMap),o.HTMLFormElement;const p=o.DOMParser,y=o.trustedTypes,I=r.prototype,E=lookupGetter(I,"cloneNode"),k=lookupGetter(I,"remove"),R=lookupGetter(I,"removeAttributeNode"),f=lookupGetter(I,"nextSibling"),x=lookupGetter(I,"childNodes"),v=lookupGetter(I,"parentNode"),b=lookupGetter(I,"shadowRoot"),B=lookupGetter(I,"attributes"),D=c&&c.prototype?lookupGetter(c.prototype,"nodeType"):null,H=c&&c.prototype?lookupGetter(c.prototype,"nodeName"):null,rt=c&&c.prototype?lookupGetter(c.prototype,"ownerDocument"):null,it=function(a){return D?D(a):a.nodeType},yt=function(a){return H?H(a):a.nodeName};if(typeof n=="function"){const u=e.createElement("template");u.content&&u.content.ownerDocument&&(e=u.content.ownerDocument)}let q,V="",Et,Ft=!1,st=0;const Pt=function(){if(st>0)throw typeErrorCreate('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},X=function(a){Pt(),st++;try{return q.createHTML(a)}finally{st--}},we=function(a){Pt(),st++;try{return q.createScriptURL(a)}finally{st--}},ve=function(){return Ft||(Et=_createTrustedTypesPolicy(y,s),Ft=!0),Et},dt=e,bt=dt.implementation,Ut=dt.createNodeIterator,Ie=dt.createDocumentFragment,ye=dt.getElementsByTagName,Ee=i.importNode;let C=_createHooksMap();t.isSupported=typeof entries=="function"&&typeof v=="function"&&bt&&bt.createHTMLDocument!==void 0;const be=MUSTACHE_EXPR,Re=ERB_EXPR,Te=TMPLIT_EXPR,ke=DATA_ATTR,Ce=ARIA_ATTR,Ae=IS_SCRIPT_OR_DATA,Wt=ATTR_WHITESPACE,Le=CUSTOM_ELEMENT;let jt=IS_ALLOWED_URI,A=null;const Rt=addToSet({},[...html$1,...svg$1,...svgFilters,...mathMl$1,...text]);let L=null;const Tt=addToSet({},[...html,...svg,...mathMl,...xml]);let F=Object.seal(create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),nt=null,$t=null;const W=Object.seal(create(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Vt=!0,kt=!0,Gt=!1,Kt=!0,j=!1,G=!0,K=!1,Ct=!1,at=null,ht=null,At=!1,Q=!1,pt=!1,gt=!1,Yt=!0,Xt=!1;const Qt="user-content-";let Lt=!0,_t=!1,Z={},J=null;const Zt=addToSet({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Jt=null;const te=addToSet({},["audio","video","img","source","image","track"]);let ee=null;const oe=addToSet({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ut="http://www.w3.org/1998/Math/MathML",St="http://www.w3.org/2000/svg",P="http://www.w3.org/1999/xhtml";let tt=P,Mt=!1,Bt=null;const _e=addToSet({},[ut,St,P],stringToString),ie=freeze(["mi","mo","mn","ms","mtext"]);let Dt=addToSet({},ie);const se=freeze(["annotation-xml"]);let Nt=addToSet({},se);const Me=addToSet({},["title","style","font","a","script"]);let ct=null;const Be=["application/xhtml+xml","text/html"],De="text/html";let M=null,et=null;const Ne=e.createElement("form"),ne=function(a){return a instanceof RegExp||a instanceof Function},qt=function(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(et&&et===a)return;(!a||typeof a!="object")&&(a={}),a=clone(a),ct=Be.indexOf(a.PARSER_MEDIA_TYPE)===-1?De:a.PARSER_MEDIA_TYPE,M=ct==="application/xhtml+xml"?stringToString:stringToLowerCase,A=_resolveSetOption(a,"ALLOWED_TAGS",Rt,{transform:M}),L=_resolveSetOption(a,"ALLOWED_ATTR",Tt,{transform:M}),Bt=_resolveSetOption(a,"ALLOWED_NAMESPACES",_e,{transform:stringToString}),ee=_resolveSetOption(a,"ADD_URI_SAFE_ATTR",oe,{transform:M,base:oe}),Jt=_resolveSetOption(a,"ADD_DATA_URI_TAGS",te,{transform:M,base:te}),J=_resolveSetOption(a,"FORBID_CONTENTS",Zt,{transform:M}),nt=_resolveSetOption(a,"FORBID_TAGS",clone({}),{transform:M}),$t=_resolveSetOption(a,"FORBID_ATTR",clone({}),{transform:M}),Z=objectHasOwnProperty(a,"USE_PROFILES")?a.USE_PROFILES&&typeof a.USE_PROFILES=="object"?clone(a.USE_PROFILES):a.USE_PROFILES:!1,Vt=a.ALLOW_ARIA_ATTR!==!1,kt=a.ALLOW_DATA_ATTR!==!1,Gt=a.ALLOW_UNKNOWN_PROTOCOLS||!1,Kt=a.ALLOW_SELF_CLOSE_IN_ATTR!==!1,j=a.SAFE_FOR_TEMPLATES||!1,G=a.SAFE_FOR_XML!==!1,K=a.WHOLE_DOCUMENT||!1,Q=a.RETURN_DOM||!1,pt=a.RETURN_DOM_FRAGMENT||!1,gt=a.RETURN_TRUSTED_TYPE||!1,At=a.FORCE_BODY||!1,Yt=a.SANITIZE_DOM!==!1,Xt=a.SANITIZE_NAMED_PROPS||!1,Lt=a.KEEP_CONTENT!==!1,_t=a.IN_PLACE||!1,jt=isRegex(a.ALLOWED_URI_REGEXP)?a.ALLOWED_URI_REGEXP:IS_ALLOWED_URI,tt=typeof a.NAMESPACE=="string"?a.NAMESPACE:P,Dt=_resolveObjectOption(a,"MATHML_TEXT_INTEGRATION_POINTS",()=>addToSet({},ie)),Nt=_resolveObjectOption(a,"HTML_INTEGRATION_POINTS",()=>addToSet({},se));const h=_resolveObjectOption(a,"CUSTOM_ELEMENT_HANDLING",()=>create(null));if(F=create(null),objectHasOwnProperty(h,"tagNameCheck")&&ne(h.tagNameCheck)&&(F.tagNameCheck=h.tagNameCheck),objectHasOwnProperty(h,"attributeNameCheck")&&ne(h.attributeNameCheck)&&(F.attributeNameCheck=h.attributeNameCheck),objectHasOwnProperty(h,"allowCustomizedBuiltInElements")&&typeof h.allowCustomizedBuiltInElements=="boolean"&&(F.allowCustomizedBuiltInElements=h.allowCustomizedBuiltInElements),seal(F),j&&(kt=!1),pt&&(Q=!0),Z&&(A=addToSet({},text),L=create(null),Z.html===!0&&(addToSet(A,html$1),addToSet(L,html)),Z.svg===!0&&(addToSet(A,svg$1),addToSet(L,svg),addToSet(L,xml)),Z.svgFilters===!0&&(addToSet(A,svgFilters),addToSet(L,svg),addToSet(L,xml)),Z.mathMl===!0&&(addToSet(A,mathMl$1),addToSet(L,mathMl),addToSet(L,xml))),W.tagCheck=null,W.attributeCheck=null,objectHasOwnProperty(a,"ADD_TAGS")&&(typeof a.ADD_TAGS=="function"?W.tagCheck=a.ADD_TAGS:arrayIsArray(a.ADD_TAGS)&&(A===Rt&&(A=clone(A)),addToSet(A,a.ADD_TAGS,M))),objectHasOwnProperty(a,"ADD_ATTR")&&(typeof a.ADD_ATTR=="function"?W.attributeCheck=a.ADD_ATTR:arrayIsArray(a.ADD_ATTR)&&(L===Tt&&(L=clone(L)),addToSet(L,a.ADD_ATTR,M))),objectHasOwnProperty(a,"ADD_FORBID_CONTENTS")&&arrayIsArray(a.ADD_FORBID_CONTENTS)&&(J===Zt&&(J=clone(J)),addToSet(J,a.ADD_FORBID_CONTENTS,M)),Lt&&(A["#text"]=!0),K&&addToSet(A,["html","head","body"]),A.table&&(addToSet(A,["tbody"]),delete nt.tbody),a.TRUSTED_TYPES_POLICY){if(typeof a.TRUSTED_TYPES_POLICY.createHTML!="function")throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof a.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const g=q;q=a.TRUSTED_TYPES_POLICY;try{V=X("")}catch(S){throw q=g,S}}else a.TRUSTED_TYPES_POLICY===null?(q=void 0,V=""):(q===void 0&&(q=ve()),q&&typeof V=="string"&&(V=X("")));freeze&&freeze(a),et=a},ce=addToSet({},[...svg$1,...svgFilters,...svgDisallowed]),le=addToSet({},[...mathMl$1,...mathMlDisallowed]),qe=function(a,h,g){return h.namespaceURI===P?a==="svg":h.namespaceURI===ut?a==="svg"&&(g==="annotation-xml"||Dt[g]):!!ce[a]},Oe=function(a,h,g){return h.namespaceURI===P?a==="math":h.namespaceURI===St?a==="math"&&Nt[g]:!!le[a]},ze=function(a,h,g){return h.namespaceURI===St&&!Nt[g]||h.namespaceURI===ut&&!Dt[g]?!1:!le[a]&&(Me[a]||!ce[a])},He=function(a){let h=v(a);(!h||!h.tagName)&&(h={namespaceURI:tt,tagName:"template"});const g=stringToLowerCase(a.tagName),S=stringToLowerCase(h.tagName);return Bt[a.namespaceURI]?a.namespaceURI===St?qe(g,h,S):a.namespaceURI===ut?Oe(g,h,S):a.namespaceURI===P?ze(g,h,S):!!(ct==="application/xhtml+xml"&&Bt[a.namespaceURI]):!1},$=function(a){arrayPush(t.removed,{element:a});try{v(a).removeChild(a)}catch{if(k(a),!v(a))throw typeErrorCreate("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},re=function(a,h,g){try{R(a,h)}catch{try{a.removeAttribute(g)}catch{}}},xt=function(a){mt(a);const h=x(a);if(h){const S=[];arrayForEach(h,m=>{arrayPush(S,m)}),arrayForEach(S,m=>{try{k(m)}catch{}})}const g=B(a);if(g)for(let S=g.length-1;S>=0;--S){const m=g[S],w=m&&m.name;typeof w=="string"&&re(a,m,w)}},Y=function(a,h,g){if(!g)try{g=h.getAttributeNode(a)}catch{g=null}arrayPush(t.removed,{attribute:g||null,from:h});try{g?R(h,g):h.removeAttribute(a)}catch{try{h.removeAttribute(a)}catch{}}if(a==="is")if(Q||pt)try{$(h)}catch{}else try{h.setAttribute(a,"")}catch{}},Fe=function(a){const h=B(a);if(h)for(let g=h.length-1;g>=0;--g){const S=h[g],m=S&&S.name;typeof m!="string"||L[M(m)]||re(a,S,m)}},mt=function(a){const h=[a];for(;h.length>0;){const g=h.pop();it(g)===NODE_TYPE.element&&Fe(g);const m=x(g);if(m)for(let w=m.length-1;w>=0;--w)h.push(m[w])}},de=function(a,h){return G?a==="patchsrc"?!0:a==="for"&&h!=="label"&&h!=="output":!1},Pe=function(a){if(!G)return;const h=[a];for(;h.length>0;){const g=h.pop(),S=it(g);if(S===NODE_TYPE.processingInstruction||S===NODE_TYPE.comment&&regExpTest(COMMENT_MARKUP_PROBE,g.data)){try{k(g)}catch{}continue}if(S===NODE_TYPE.element){const w=g,T=M(yt(g));try{w.hasAttribute&&w.hasAttribute("patchsrc")&&w.removeAttribute("patchsrc"),w.hasAttribute&&w.hasAttribute("for")&&de("for",T)&&w.removeAttribute("for")}catch{}}const m=x(g);if(m)for(let w=m.length-1;w>=0;--w)h.push(m[w])}},ae=function(a){let h=null,g=null;if(At)a="<remove></remove>"+a;else{const w=stringMatch(a,/^[\r\n\t ]+/);g=w&&w[0]}ct==="application/xhtml+xml"&&tt===P&&(a='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+a+"</body></html>");const S=q?X(a):a;if(tt===P)try{h=new p().parseFromString(S,ct)}catch{}if(!h||!h.documentElement){h=bt.createDocument(tt,"template",null);try{h.documentElement.innerHTML=Mt?V:S}catch{}}const m=h.body||h.documentElement;return a&&g&&m.insertBefore(e.createTextNode(g),m.childNodes[0]||null),tt===P?ye.call(h,K?"html":"body")[0]:K?h.documentElement:m},he=function(a){const h=rt?rt(a):a.ownerDocument;return Ut.call(h||a,a,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},ft=function(a){return a=stringReplace(a,be," "),a=stringReplace(a,Re," "),a=stringReplace(a,Te," "),a},Ot=function(a){var h;a.normalize();const g=rt?rt(a):a.ownerDocument,S=Ut.call(g||a,a,d.SHOW_TEXT|d.SHOW_COMMENT|d.SHOW_CDATA_SECTION|d.SHOW_PROCESSING_INSTRUCTION,null);let m=S.nextNode();for(;m;)m.data=ft(m.data),m=S.nextNode();const w=(h=a.querySelectorAll)===null||h===void 0?void 0:h.call(a,"template");w&&arrayForEach(w,T=>{ot(T.content)&&Ot(T.content)})},wt=function(a){const h=H?H(a):null;return typeof h!="string"||M(h)!=="form"?!1:typeof a.nodeName!="string"||typeof a.textContent!="string"||typeof a.removeChild!="function"||a.attributes!==B(a)||typeof a.removeAttribute!="function"||typeof a.removeAttributeNode!="function"||typeof a.getAttributeNode!="function"||typeof a.setAttribute!="function"||typeof a.namespaceURI!="string"||typeof a.insertBefore!="function"||typeof a.hasChildNodes!="function"||a.nodeType!==D(a)||a.childNodes!==x(a)},ot=function(a){if(!D||typeof a!="object"||a===null)return!1;try{return D(a)===NODE_TYPE.documentFragment}catch{return!1}},lt=function(a){if(!D||typeof a!="object"||a===null)return!1;try{return typeof D(a)=="number"}catch{return!1}};function U(u,a,h){u.length!==0&&arrayForEach(u,g=>{g.call(t,a,h,et)})}const Ue=function(a,h){return!!(G&&a.hasChildNodes()&&!lt(a.firstElementChild)&&regExpTest(ELEMENT_MARKUP_PROBE,a.textContent)&&regExpTest(ELEMENT_MARKUP_PROBE,a.innerHTML)||G&&a.namespaceURI===P&&LITERAL_TEXT_ELEMENTS[h]&&(lt(a.firstElementChild)||typeof a.textContent=="string"&&regExpTest(LITERAL_TEXT_CLOSE[h],a.textContent))||a.nodeType===NODE_TYPE.processingInstruction||G&&a.nodeType===NODE_TYPE.comment&&regExpTest(COMMENT_MARKUP_PROBE,a.data))},vt=function(a,h){if(a instanceof RegExp)return regExpTest(a,h);if(a instanceof Function){for(var g=arguments.length,S=new Array(g>2?g-2:0),m=2;m<g;m++)S[m-2]=arguments[m];return!!a(h,...S)}return!1},We=function(a,h,g){if(!nt[h]&&xe(h)&&vt(F.tagNameCheck,h))return!1;if(Lt&&!J[h]){const S=v(a),m=x(a);if(m&&S){const w=m.length;for(let T=w-1;T>=0;--T){const _=a===g?E(m[T],!0):m[T];S.insertBefore(_,f(a))}}}return $(a),!0},pe=function(a,h,g,S){return a.length===0?h:h===g||h===S?clone(h):h},ge=function(a,h){return a===h||v(a)!==null?!1:(_t&&mt(a),!0)},ue=function(a,h){if(U(C.beforeSanitizeElements,a,null),ge(a,h))return!0;if(wt(a))return $(a),!0;const g=M(yt(a));if(A=pe(C.uponSanitizeElement,A,Rt,at),U(C.uponSanitizeElement,a,{tagName:g,allowedTags:A}),ge(a,h))return!0;if(Ue(a,g))return $(a),!0;if(nt[g]||!(W.tagCheck instanceof Function&&W.tagCheck(g))&&!A[g]){const m=We(a,g,h);return m===!1&&U(C.afterSanitizeElements,a,null),m}if(it(a)===NODE_TYPE.element&&!He(a)||(g==="noscript"||g==="noembed"||g==="noframes")&&regExpTest(FALLBACK_TAG_CLOSE,a.innerHTML))return $(a),!0;if(j&&a.nodeType===NODE_TYPE.text){const m=ft(a.textContent);a.textContent!==m&&(arrayPush(t.removed,{element:a.cloneNode()}),a.textContent=m)}return U(C.afterSanitizeElements,a,null),!1},Se=function(a,h,g){if($t[h]||de(h,a)||Yt&&(h==="id"||h==="name")&&(g in e||g in Ne))return!1;const S=L[h]||W.attributeCheck instanceof Function&&W.attributeCheck(h,a);return kt&&regExpTest(ke,h)||Vt&&regExpTest(Ce,h)?!0:S?ee[h]||regExpTest(jt,stringReplace(g,Wt,""))||(h==="src"||h==="xlink:href"||h==="href")&&a!=="script"&&stringIndexOf(g,"data:")===0&&Jt[a]||Gt&&!regExpTest(Ae,stringReplace(g,Wt,""))?!0:!g:xe(a)&&vt(F.tagNameCheck,a)&&vt(F.attributeNameCheck,h,a)||h==="is"&&F.allowCustomizedBuiltInElements&&vt(F.tagNameCheck,g)},je=addToSet({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),xe=function(a){return!je[stringToLowerCase(a)]&&regExpTest(Le,a)},$e=function(a,h,g,S){if(q&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!g)switch(y.getAttributeType(a,h)){case"TrustedHTML":return X(S);case"TrustedScriptURL":return we(S)}return S},Ve=function(a,h,g,S){try{return g?a.setAttributeNS(g,h,S):a.setAttribute(h,S),wt(a)?($(a),!1):!0}catch{return Y(h,a),!1}},me=function(a){U(C.beforeSanitizeAttributes,a,null);const h=a.attributes;if(!h||wt(a))return;L=pe(C.uponSanitizeAttribute,L,Tt,ht);const g={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:L,forceKeepAttr:void 0};let S=h.length;const m=M(a.nodeName);for(;S--;){const w=h[S],T=w.name,_=w.namespaceURI,O=w.value,z=M(T),Ht=O;let N=T==="value"?Ht:stringTrim(Ht),fe=!1;if(g.attrName=z,g.attrValue=N,g.keepAttr=!0,g.forceKeepAttr=void 0,U(C.uponSanitizeAttribute,a,g),N=g.attrValue,Xt&&(z==="id"||z==="name")&&stringIndexOf(N,Qt)!==0&&(Y(T,a,w),N=Qt+N,fe=!0),G&&regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,N)){Y(T,a,w);continue}if(z==="attributename"&&stringMatch(N,"href")){Y(T,a,w);continue}if(!g.forceKeepAttr){if(!g.keepAttr){Y(T,a,w);continue}if(!Kt&&regExpTest(SELF_CLOSING_TAG,N)){Y(T,a,w);continue}if(j&&(N=ft(N)),!Se(m,z,N)){Y(T,a,w);continue}N=$e(m,z,_,N),N!==Ht&&Ve(a,T,_,N)&&fe&&arrayPop(t.removed)}}U(C.afterSanitizeAttributes,a,null)},It=function(a){let h=null;const g=he(a);for(U(C.beforeSanitizeShadowDOM,a,null);h=g.nextNode();)if(U(C.uponSanitizeShadowNode,h,null),ue(h,a),me(h),ot(h.content)&&It(h.content),it(h)===NODE_TYPE.element){const S=b(h);ot(S)&&(zt(S),It(S))}U(C.afterSanitizeShadowDOM,a,null)},zt=function(a){const h=[{node:a,shadow:null}];for(;h.length>0;){const g=h.pop();if(g.shadow){It(g.shadow);continue}const S=g.node,w=it(S)===NODE_TYPE.element,T=x(S);if(T)for(let _=T.length-1;_>=0;--_)h.push({node:T[_],shadow:null});if(w){const _=H?H(S):null;if(typeof _=="string"&&M(_)==="template"){const O=S.content;ot(O)&&h.push({node:O,shadow:null})}}if(w){const _=b(S);ot(_)&&h.push({node:null,shadow:_},{node:_,shadow:null})}}};return t.sanitize=function(u){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},h=null,g=null,S=null,m=null;if(Mt=!u,Mt&&(u="<!-->"),typeof u!="string"&&!lt(u)&&(u=stringifyValue(u),typeof u!="string"))throw typeErrorCreate("dirty is not a string, aborting");if(!t.isSupported)return u;Ct?(A=at,L=ht):qt(a),(C.uponSanitizeElement.length>0||C.uponSanitizeAttribute.length>0)&&(A=clone(A)),C.uponSanitizeAttribute.length>0&&(L=clone(L)),t.removed=[];const w=_t&&typeof u!="string"&&lt(u);if(w){Pe(u);const O=yt(u);if(typeof O=="string"){const z=M(O);if(!A[z]||nt[z])throw xt(u),typeErrorCreate("root node is forbidden and cannot be sanitized in-place")}if(wt(u))throw xt(u),typeErrorCreate("root node is clobbered and cannot be sanitized in-place");try{zt(u)}catch(z){throw xt(u),z}}else if(lt(u))h=ae("<!---->"),g=h.ownerDocument.importNode(u,!0),g.nodeType===NODE_TYPE.element&&g.nodeName==="BODY"||g.nodeName==="HTML"?h=g:h.appendChild(g),zt(h);else{if(!Q&&!j&&!K&&u.indexOf("<")===-1)return q&&gt?X(u):u;if(h=ae(u),!h)return Q?null:gt?V:""}h&&At&&$(h.firstChild);const T=w?u:h;try{const O=he(T);for(;S=O.nextNode();)ue(S,T),me(S),ot(S.content)&&It(S.content)}catch(O){throw w&&(xt(u),arrayForEach(t.removed,z=>{z.element&&mt(z.element)})),O}if(w)return arrayForEach(t.removed,O=>{O.element&&mt(O.element)}),j&&Ot(u),u;if(Q){if(j&&Ot(h),pt)for(m=Ie.call(h.ownerDocument);h.firstChild;)m.appendChild(h.firstChild);else m=h;return(L.shadowroot||L.shadowrootmode)&&(m=Ee.call(i,m,!0)),m}let _=K?h.outerHTML:h.innerHTML;return K&&A["!doctype"]&&h.ownerDocument&&h.ownerDocument.doctype&&h.ownerDocument.doctype.name&&regExpTest(DOCTYPE_NAME,h.ownerDocument.doctype.name)&&(_="<!DOCTYPE "+h.ownerDocument.doctype.name+`>
`+_),j&&(_=ft(_)),q&&gt?X(_):_},t.setConfig=function(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};qt(u),Ct=!0,at=A,ht=L},t.clearConfig=function(){et=null,Ct=!1,at=null,ht=null,q=Et,V=""},t.isValidAttribute=function(u,a,h){et||qt({});const g=M(u),S=M(a);return Se(g,S,h)},t.addHook=function(u,a){typeof a=="function"&&objectHasOwnProperty(C,u)&&arrayPush(C[u],a)},t.removeHook=function(u,a){if(objectHasOwnProperty(C,u)){if(a!==void 0){const h=arrayLastIndexOf(C[u],a);return h===-1?void 0:arraySplice(C[u],h,1)[0]}return arrayPop(C[u])}},t.removeHooks=function(u){objectHasOwnProperty(C,u)&&(C[u]=[])},t.removeAllHooks=function(){C=_createHooksMap()},t}var purify=createDOMPurify(),browser_default=purify,sanitize=purify.sanitize.bind(purify),isSupported=purify.isSupported,addHook=purify.addHook.bind(purify),removeHook=purify.removeHook.bind(purify),removeHooks=purify.removeHooks.bind(purify),removeAllHooks=purify.removeAllHooks.bind(purify),setConfig=purify.setConfig.bind(purify),clearConfig=purify.clearConfig.bind(purify),isValidAttribute=purify.isValidAttribute.bind(purify),version=purify.version,removed=purify.removed,activeSavedRange=null,RichTextEditor=class extends HTMLElement{static get observedAttributes(){return["content","initial-content","on-media-request","on-change","config","read-only","disabled","class-name","available-classes"]}attributeChangedCallback(o,t,e){const i=this,s=o.replace(/-/g,""),n=new RegExp("^"+s+"$","i");this.componentProps&&(this.componentProps.forEach(c=>{if(n.test(c)){let r=e;if(r==="true")r=!0;else if(r==="false")r=!1;else try{r&&(r.trim().startsWith("{")||r.trim().startsWith("["))&&(r=JSON.parse(r))}catch{}this.props[c]=r}}),this.update())}forceUpdate(o){const t=this;o&&typeof o=="object"&&Object.assign(this.props,o),typeof this.update=="function"&&this.update()}get _rootRef(){return this.__rootRef||this._root.querySelector("[data-ref='RichTextEditor-rootRef']")}set _rootRef(o){this.__rootRef=o}get _editorRef(){return this.__editorRef||this._root.querySelector("[data-ref='RichTextEditor-editorRef']")}set _editorRef(o){this.__editorRef=o}get _root(){return this.shadowRoot||this}constructor(){super();const o=this;this.props||(this.props={}),this.state={mode:"visual",isFullscreen:!1,isMounted:!1,internalContent:o.props.content||o.props.initialContent||"",getEditorElement(){if(typeof window>"u"||typeof document>"u")return null;if(o._editorRef){if(o._editorRef.current)return o._editorRef.current;if(o._editorRef.nodeType===1)return o._editorRef}if(o._rootRef){const t=o._rootRef.current||o._rootRef;if(t&&typeof t.querySelector=="function"){const e=t.querySelector(".wysiwyg-content");if(e)return e}}return document.querySelector(".wysiwyg-content")},getTrustedHttpUrl(t){try{const e=new URL(t,typeof window<"u"?window.location.origin:"http://localhost");return e.protocol!=="http:"&&e.protocol!=="https:"?null:e.toString()}catch{return null}},getHostname(t){try{return new URL(t,typeof window<"u"?window.location.origin:"http://localhost").hostname.toLowerCase()}catch{return""}},isHost(t,e){const i=o.state.getHostname(t);return i===e||i.endsWith("."+e)},escapeHtml(t){if(t==null)return"";const e=String(t);return e.indexOf("&")===-1&&e.indexOf("<")===-1&&e.indexOf(">")===-1&&e.indexOf('"')===-1&&e.indexOf("'")===-1?e:e.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;").split("'").join("&#39;")},sanitizeHtml(t){return browser_default.sanitize(t,{ADD_TAGS:["iframe","video","audio","source"],ADD_ATTR:["allow","allowfullscreen","frameborder","scrolling","target","contenteditable","data-platform","data-url","data-widget","data-formula","controls","playsinline","autoplay","muted","loop"]})},showTableModal:!1,tableRows:"3",tableCols:"3",tableHasHeader:!0,showLinkModal:!1,linkUrl:"",showWidgetModal:!1,selectedWidget:"banner",showSocialModal:!1,socialUrl:"",socialPlatform:"x",showButtonModal:!1,btnText:"Click Here",btnUrl:"",btnStyle:"primary",showImageModal:!1,imageUrl:"",imageAlt:"",showVideoModal:!1,videoUrl:"",showFormulaModal:!1,formulaInput:"E = mc\xB2",selectedMediaEl:null,resizeHandleTop:0,resizeHandleLeft:0,resizeToolbarTop:0,resizeToolbarLeft:0,isResizing:!1,resizeStartX:0,resizeStartWidth:0,fontFamily:"Inter",fontSize:"15px",textColor:"#0f172a",highlightColor:"#fde047",appliedClasses:[],showInsertMenu:!1,showAiModal:!1,aiAction:"improve",aiInput:"",activeFormats:{bold:!1,italic:!1,underline:!1,strikeThrough:!1,justifyLeft:!1,justifyCenter:!1,justifyRight:!1,justifyFull:!1,quote:!1,code:!1,unorderedList:!1,orderedList:!1,inTable:!1},headingFormat:"P",checkFormats(){if(typeof window<"u"&&typeof document<"u"){let t=!1,e=!1,i=!1,s=o.state.fontSize,n=o.state.fontFamily,c=o.state.appliedClasses;const r=window.getSelection();if(r&&r.rangeCount>0){let I=r.getRangeAt(0).startContainer,E=I&&I.nodeType===1?I:I?I.parentElement:null;if(E){try{const x=window.getComputedStyle(E);if(x&&x.fontSize&&(s=`${Math.round(parseFloat(x.fontSize))}px`),x&&x.fontFamily){const v=x.fontFamily.split(",")[0].split('"').join("").split("'").join("").trim();v&&(n=v)}}catch{}const k=[];let R=E;const f=o.state.getEditorElement();for(;R&&R!==f;){if(R.className&&typeof R.className=="string"){if(R.className.indexOf("wysiwyg-content")!==-1)break;const x=R.className.split(/\s+/);for(let v=0;v<x.length;v++){const b=x[v];b&&!b.startsWith("prose")&&b!=="task-list"&&b!=="cv-pending-selection"&&b!=="cv-resizing-selected"&&b!=="outline-none"&&b!=="max-w-none"&&b!=="wysiwyg-content"&&!k.includes(b)&&k.push(b)}}R=R.parentElement}c=k}for(;I&&I.nodeName!=="DIV"&&I.className!=="wysiwyg-content";)I.nodeName==="BLOCKQUOTE"&&(t=!0),(I.nodeName==="PRE"||I.nodeName==="CODE")&&(e=!0),(I.nodeName==="TD"||I.nodeName==="TH")&&(i=!0),I=I.parentNode}let d="P";const l=document.queryCommandValue("formatBlock");l&&(l.includes("1")?d="H1":l.includes("2")?d="H2":l.includes("3")?d="H3":l.includes("4")?d="H4":l.toLowerCase().includes("blockquote")?(t=!0,d="P"):l.toLowerCase().includes("pre")?(e=!0,d="P"):(l.includes("p")||l.includes("div"))&&(d="P"));const p={bold:document.queryCommandState("bold"),italic:document.queryCommandState("italic"),underline:document.queryCommandState("underline"),strikeThrough:document.queryCommandState("strikeThrough"),justifyLeft:document.queryCommandState("justifyLeft"),justifyCenter:document.queryCommandState("justifyCenter"),justifyRight:document.queryCommandState("justifyRight"),justifyFull:document.queryCommandState("justifyFull"),unorderedList:document.queryCommandState("insertUnorderedList"),orderedList:document.queryCommandState("insertOrderedList"),quote:t,code:e,inTable:i};o.state.fontSize!==s&&(o.state.fontSize=s,o.update(),o.update()),o.state.fontFamily!==n&&(o.state.fontFamily=n,o.update(),o.update()),o.state.headingFormat!==d&&(o.state.headingFormat=d,o.update(),o.update()),(o.state.appliedClasses.length!==c.length||o.state.appliedClasses.some((I,E)=>I!==c[E]))&&(o.state.appliedClasses=c,o.update());let y=!1;for(const I in p)if(o.state.activeFormats[I]!==p[I]){y=!0;break}y&&(o.state.activeFormats=p,o.update())}},saveSelection(){if(typeof window<"u"){const t=window.getSelection();if(t&&t.rangeCount>0){const e=t.getRangeAt(0),i=o.state.getEditorElement();if(i)try{if(i.contains(e.commonAncestorContainer)){const s=o.state.escapeAtomicRange(e.cloneRange());activeSavedRange=s,i.__cv_savedRange=s}}catch{}}}},restoreSelection(){if(typeof window<"u"){const t=o.state.getEditorElement();if(t){try{typeof t.focus=="function"&&t.focus()}catch{}const e=t.__cv_savedRange||activeSavedRange;if(e)try{if(t.contains(e.commonAncestorContainer)){const i=window.getSelection();i&&(i.removeAllRanges(),i.addRange(e.cloneRange()))}}catch{}}}},escapeAtomicRange(t){const e=o.state.getEditorElement();if(!t||!e)return t;let i=t.startContainer,s=null;for(;i&&i!==e;)i.nodeType===1&&i.getAttribute&&i.getAttribute("contenteditable")==="false"&&(s=i),i=i.parentNode;if(!s)return t;const n=document.createRange();return n.setStartAfter(s),n.collapse(!0),n},insertHtmlAtCursor(t){if(typeof window>"u"||o.state.mode==="source")return;const e=o.state.getEditorElement();if(e)try{typeof e.focus=="function"&&e.focus()}catch{}o.state.restoreSelection();const i=window.getSelection();let s=null;if(i&&i.rangeCount>0){const E=i.getRangeAt(0);try{e&&e.contains(E.commonAncestorContainer)&&(s=E)}catch{}}const n=e&&e.__cv_savedRange||activeSavedRange;if(!s&&n)try{e&&e.contains(n.commonAncestorContainer)&&(s=n)}catch{}s=o.state.escapeAtomicRange(s);const c=/<(div|p|ul|ol|table|blockquote|img|video|audio)/i.test(t);let r=null;if(s&&e){let E=s.startContainer;for(;E&&E!==e;){if(E.nodeType===1&&/^(P|H[1-6]|DIV|BLOCKQUOTE|LI)$/i.test(E.tagName)){r=E;break}E=E.parentNode}}const d=document.createElement("template");d.innerHTML=t.trim();const l=d.content;let p=l.querySelector("p:last-child");if(c&&!p){const E=document.createElement("p");E.innerHTML="<br>",l.appendChild(E),p=E}let y=null;if(c&&r&&r!==e&&r.parentNode)if(!r.textContent?.trim()||r.innerHTML==="<br>"){const k=r.parentNode;y=p,k.insertBefore(l,r),r.remove()}else y=p,r.after(l);else s&&s.insertNode?(s.deleteContents(),y=p,s.insertNode(l)):e&&(y=p,e.appendChild(l));const I=y||(e?e.querySelector("p:last-child"):null);if(e&&typeof e.focus=="function")try{e.focus()}catch{}if(I&&i){const E=document.createRange();E.setStart(I,0),E.collapse(!0),i.removeAllRanges(),i.addRange(E);const k=E.cloneRange();activeSavedRange=k,e&&(e.__cv_savedRange=k)}o.state.ensureEditableStructure(),o.state.syncContent(),o.state.checkFormats(),(t.indexOf("cv-social-embed")!==-1||t.indexOf("cv-math-formula")!==-1)&&o.state.renderEmbeds()},formatHTML(t){if(!t)return"";let e="",i="";const s="  ";return t.split(/>\s*</).forEach(function(n){n.match(/^\/\w/)&&(i=i.substring(s.length)),e+=i+"<"+n+`>
`,n.match(/^<?\w[^>]*[^\/]$/)&&!n.startsWith("input")&&!n.startsWith("img")&&!n.startsWith("br")&&!n.startsWith("hr")&&(i+=s)}),e.length>3?e.substring(1,e.length-2):t},format(t,e){o.state.mode!=="source"&&(o.state.restoreSelection(),document.execCommand(t,!1,e),o.state.saveSelection(),o.state.syncContent(),o.state.checkFormats())},applyColorPreview(t,e){if(!e||o.state.mode==="source")return;const i=o.state.getEditorElement();if(i)try{i.focus()}catch{}o.state.restoreSelection(),t==="foreColor"?document.execCommand("foreColor",!1,e):document.execCommand("hiliteColor",!1,e)||document.execCommand("backColor",!1,e),o.state.saveSelection()},applyColor(t,e){if(!e||o.state.mode==="source")return;const i=o.state.getEditorElement();if(i)try{i.focus()}catch{}o.state.restoreSelection(),t==="foreColor"?(document.execCommand("foreColor",!1,e),o.state.textColor=e,o.update()):(document.execCommand("hiliteColor",!1,e)||document.execCommand("backColor",!1,e),o.state.highlightColor=e,o.update()),o.state.saveSelection(),o.state.syncContent(),o.state.checkFormats()},formatHeading(t){if(o.state.mode==="source")return;o.state.restoreSelection(),document.execCommand("formatBlock",!1,t),o.state.headingFormat=t,o.update(),o.state.syncContent(),o.state.checkFormats();const e=o.state.getEditorElement();if(e)try{e.focus()}catch{}},insertMedia(t){if(o.state.mode==="source")return;o.state.saveSelection();const e=(i,s)=>{if(!i)return;let n="";if(t==="image"){const c=(i.split("/").pop()||"image").split("?")[0].split(".")[0].replace(/[-_]+/g," ").trim(),r=(s||"").trim()||c||"Image",d=o.state.escapeHtml(r);n=`<img src="${o.state.escapeHtml(i)}" alt="${d}" loading="lazy" decoding="async" draggable="false" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" /><p><br></p>`}else if(t==="video"){const c=i.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/),r=i.match(/vimeo\.com\/(?:video\/)?([0-9]+)/),d=o.state.escapeHtml(i);c?n=`<div class="cv-social-embed" data-platform="youtube" data-url="${d}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded YOUTUBE Video: ${d}]</div><p><br></p>`:r?n=`<div class="cv-social-embed" data-platform="vimeo" data-url="${d}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded VIMEO Video: ${d}]</div><p><br></p>`:n=`<video src="${d}" controls style="max-width: 100%; border-radius: 8px; margin: 16px 0;"></video><p><br></p>`}else t==="audio"&&(n=`<audio src="${o.state.escapeHtml(i)}" controls style="margin: 16px 0;"></audio><p><br></p>`);o.state.insertHtmlAtCursor(n)};if(o.props.onMediaRequest)o.props.onMediaRequest(t).then(i=>{i&&e(i)}).catch(i=>{console.error("Media request failed",i)});else if(t==="image")o.state.openImageModal();else if(t==="video")o.state.openVideoModal();else{const i=o.state.escapeHtml(t),s=`<div class="cv-media-placeholder" data-type="${i}">[${i}]</div><p><br></p>`;o.state.insertHtmlAtCursor(s)}},clearAllFormatting(){o.state.mode!=="source"&&(document.execCommand("removeFormat",!1,void 0),document.execCommand("formatBlock",!1,"P"),document.execCommand("unlink",!1,void 0),o.state.syncContent(),o.state.checkFormats())},toggleBlock(t){if(o.state.mode==="source")return;o.state.checkFormats(),(t==="PRE"?o.state.activeFormats.code:o.state.activeFormats.quote)?document.execCommand("formatBlock",!1,"P"):document.execCommand("formatBlock",!1,t),o.state.syncContent(),o.state.checkFormats()},applyClass(t){if(!t||o.state.mode==="source")return;const e=o.state.getEditorElement();if(!e)return;const i=t.trim().split(/\s+/).filter(Boolean);if(i.length===0)return;if(o.state.selectedMediaEl&&o.state.selectedMediaEl.classList){i.forEach(c=>o.state.selectedMediaEl.classList.add(c)),o.state.syncContent(),o.state.checkFormats();return}const s=typeof window<"u"?window.getSelection():null;let n=null;if(s&&s.rangeCount>0){const c=s.getRangeAt(0);e.contains(c.commonAncestorContainer)&&(n=c)}if(!n){const c=e.__cv_savedRange||activeSavedRange;c&&e.contains(c.commonAncestorContainer)&&(n=c)}if(n&&!n.collapsed&&n.toString().length>0){const c=document.createElement("span");if(i.forEach(r=>c.classList.add(r)),c.appendChild(n.extractContents()),n.insertNode(c),s){const r=document.createRange();r.selectNodeContents(c),s.removeAllRanges(),s.addRange(r),activeSavedRange=r.cloneRange(),e.__cv_savedRange=r.cloneRange()}}else if(n){let c=n.startContainer,r=null;for(;c&&c!==e;){if(c.nodeType===1&&/^(P|H[1-6]|BLOCKQUOTE|PRE|LI|TD|TH|DIV|FIGURE|TABLE)$/i.test(c.tagName)){r=c;break}c=c.parentNode}!r&&e.firstElementChild&&(r=e.firstElementChild),r&&r!==e&&i.forEach(d=>r.classList.add(d))}o.state.syncContent(),o.state.checkFormats();try{e.focus()}catch{}},openButtonModal(){o.state.mode!=="source"&&(o.state.saveSelection(),o.state.showButtonModal=!0,o.update(),o.state.btnText="Click Here",o.update(),o.state.btnUrl="",o.update(),o.state.btnStyle="primary",o.update())},closeButtonModal(){o.state.showButtonModal=!1,o.update()},confirmButton(){if(o.state.showButtonModal=!1,o.update(),o.state.btnText){let t="padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; display: inline-block; text-decoration: none; transition: all 0.2s;";o.state.btnStyle==="primary"?t+=" background: var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480)); color: white; border: none; box-shadow: 0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.3));":o.state.btnStyle==="secondary"?t+=" background: var(--cv-color-surface-raised, #1e293b); color: var(--cv-color-text-main, #fff); border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1));":o.state.btnStyle==="outline"&&(t+=" background: transparent; color: var(--cv-color-primary-fill, #245066); border: 2px solid var(--cv-color-primary-fill, #245066);");const i=`<a href="${o.state.escapeHtml(o.state.btnUrl||"#")}" class="cv-btn" style="${t}">${o.state.escapeHtml(o.state.btnText)}</a>&nbsp;`;o.state.insertHtmlAtCursor(i)}},getCanonicalHtml(){const t=o.state.getEditorElement();if(!t)return"";const e=t.cloneNode(!0);return e.querySelectorAll(".cv-resizing-selected").forEach(n=>{n.classList.remove("cv-resizing-selected"),n.getAttribute("class")||n.removeAttribute("class")}),e.querySelectorAll('[data-cv-rendered="true"]').forEach(n=>{if(n.removeAttribute("data-cv-rendered"),n.classList.contains("cv-social-embed")){const c=n.getAttribute("data-platform")||"",r=n.getAttribute("data-url")||"";n.textContent=`[Embedded ${c.toUpperCase()} Post: ${r}]`}else n.classList.contains("cv-math-formula")&&(n.textContent=n.getAttribute("data-formula")||"")}),e.innerHTML},renderEmbeds(){if(typeof window>"u")return;const t=o.state.getEditorElement();if(!t)return;t.querySelectorAll('.cv-social-embed:not([data-cv-rendered="true"])').forEach(s=>{const n=(s.getAttribute("data-platform")||"").toLowerCase(),c=s.getAttribute("data-url")||"";if(!n||!c)return;const r=()=>{const d=s.style.width,l=s.style.maxWidth;s.setAttribute("data-cv-rendered","true"),s.setAttribute("style","margin: 16px 0; padding: 0; border: none; background: transparent; display: flex; justify-content: center;"),d&&(s.style.width=d),l&&(s.style.maxWidth=l)};if(n==="youtube"){const d=c.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/);if(!d||!d[1])return;s.innerHTML="";const l=document.createElement("iframe");l.width="100%",l.height="280",l.src=`https://www.youtube.com/embed/${d[1]}`,l.title="YouTube video player",l.setAttribute("frameborder","0"),l.setAttribute("allowfullscreen",""),l.style.cssText="border-radius: 8px; display: block; max-width: 100%; pointer-events: none;",s.appendChild(l),r()}else if(n==="vimeo"){const d=c.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);if(!d||!d[1])return;s.innerHTML="";const l=document.createElement("iframe");l.width="100%",l.height="280",l.src=`https://player.vimeo.com/video/${d[1]}`,l.title="Vimeo video player",l.setAttribute("frameborder","0"),l.setAttribute("allowfullscreen",""),l.style.cssText="border-radius: 8px; display: block; max-width: 100%; pointer-events: none;",s.appendChild(l),r()}else if(n==="x"||n==="twitter"){s.innerHTML="";const d=document.createElement("blockquote");d.className="twitter-tweet",d.setAttribute("data-theme","dark"),d.style.pointerEvents="none";const l=o.state.getTrustedHttpUrl(c);if(!l)return;const p=document.createElement("a");if(p.href=l,d.appendChild(p),s.appendChild(d),r(),document.getElementById("twitter-wjs"))window.twttr&&window.twttr.widgets.load(s);else{const y=document.createElement("script");y.id="twitter-wjs",y.src="https://platform.twitter.com/widgets.js",y.async=!0,document.body.appendChild(y)}}else if(n==="instagram"){s.innerHTML="";const d=document.createElement("blockquote");if(d.className="instagram-media",d.setAttribute("data-instgrm-permalink",c),d.setAttribute("data-instgrm-version","14"),d.style.pointerEvents="none",s.appendChild(d),r(),document.getElementById("instagram-embed"))window.instgrm&&window.instgrm.Embeds.process();else{const l=document.createElement("script");l.id="instagram-embed",l.src="https://www.instagram.com/embed.js",l.async=!0,document.body.appendChild(l)}}else if(n==="facebook"){s.innerHTML="";const d=document.createElement("div");if(d.className="fb-post",d.setAttribute("data-href",c),d.setAttribute("data-width","500"),d.style.pointerEvents="none",s.appendChild(d),r(),document.getElementById("facebook-jssdk"))window.FB&&window.FB.XFBML.parse(s);else{const l=document.createElement("script");l.id="facebook-jssdk",l.src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0",l.async=!0,l.defer=!0,l.crossOrigin="anonymous",document.body.appendChild(l)}}else if(n==="linkedin"){const d=c.includes("/embed/")?c:c.replace(/\/posts?\//,"/embed/feed/update/"),l=o.state.getTrustedHttpUrl(d);if(!l)return;s.innerHTML="";const p=document.createElement("iframe");p.src=l,p.height="400",p.width="100%",p.setAttribute("frameborder","0"),p.setAttribute("allowfullscreen",""),p.title="Embedded post",p.style.cssText="border-radius: 8px; max-width: 100%; pointer-events: none;",s.appendChild(p),r()}});const i=t.querySelectorAll('.cv-math-formula:not([data-cv-rendered="true"])');if(i.length>0){const s=()=>{i.forEach(n=>{const c=n.getAttribute("data-formula")||n.textContent||"";if(!c)return;const r=window.katex;if(r)try{n.innerHTML=browser_default.sanitize(r.renderToString(c,{throwOnError:!1,displayMode:!1}),{USE_PROFILES:{html:!0,mathMl:!0,svg:!0},ADD_TAGS:["semantics","annotation"],ADD_ATTR:["encoding"]}),n.setAttribute("data-cv-rendered","true")}catch{}})};if(window.katex)s();else if(document.getElementById("cv-katex-js")){const n=document.getElementById("cv-katex-js");n&&n.addEventListener("load",s)}else{if(!document.getElementById("cv-katex-css")){const c=document.createElement("link");c.id="cv-katex-css",c.rel="stylesheet",c.href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",document.head.appendChild(c)}const n=document.createElement("script");n.id="cv-katex-js",n.src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",n.async=!0,n.onload=s,document.body.appendChild(n)}}},syncContent(){o.state.getEditorElement()&&(o.state.internalContent=o.state.getCanonicalHtml(),o.update(),o.props.onChange&&o.props.onChange(o.state.internalContent))},handleInput(){const t=o.state.getEditorElement();t?(t.__cv_inputTimer&&clearTimeout(t.__cv_inputTimer),t.__cv_inputTimer=setTimeout(()=>{t.__cv_inputTimer=null,o.state.syncContent()},250)):o.state.syncContent()},handleFocus(){if(typeof document<"u")try{document.execCommand("defaultParagraphSeparator",!1,"p")}catch{}},handleBlur(){const t=o.state.getEditorElement();t&&t.__cv_inputTimer&&(clearTimeout(t.__cv_inputTimer),t.__cv_inputTimer=null,o.state.syncContent())},handleSourceInput(t){o.state.internalContent=t.target.value,o.update(),o.props.onChange&&o.props.onChange(o.state.internalContent);const e=o.state.getEditorElement();e&&(e.innerHTML=o.state.sanitizeHtml(o.state.internalContent),o.state.renderEmbeds())},openTableModal(){o.state.mode!=="source"&&(o.state.saveSelection(),o.state.showTableModal=!0,o.update(),o.state.tableRows="3",o.update(),o.state.tableCols="3",o.update(),o.state.tableHasHeader=!0,o.update())},confirmTable(){o.state.showTableModal=!1,o.update();const t=parseInt(o.state.tableRows,10),e=parseInt(o.state.tableCols,10);if(t>0&&e>0){let i='<table border="1" style="width:100%; border-collapse: collapse; min-width: 50px;">';if(o.state.tableHasHeader){i+='<thead style="background-color: var(--cv-color-hover, rgba(255,255,255,0.05));"><tr>';for(let s=0;s<e;s++)i+='<th scope="col" style="padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);">Header</th>';i+="</tr></thead>"}i+="<tbody>";for(let s=0;s<t;s++){i+="<tr>";for(let n=0;n<e;n++)i+='<td style="padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);">Cell</td>';i+="</tr>"}i+="</tbody></table><p><br></p>",o.state.insertHtmlAtCursor(i)}},closeTableModal(){o.state.showTableModal=!1,o.update()},modifyTable(t){if(o.state.mode==="source")return;const e=window.getSelection();if(!e||e.rangeCount===0)return;let i=e.getRangeAt(0).startContainer,s=null,n=null,c=null;for(;i&&i.nodeName!=="DIV"&&i.className!=="wysiwyg-content";)(i.nodeName==="TD"||i.nodeName==="TH")&&(s=i),i.nodeName==="TR"&&(n=i),i.nodeName==="TABLE"&&(c=i),i=i.parentNode;if(!c||!n||!s)return;const r=Array.from(n.children).indexOf(s);if(t==="addRow"){const d=document.createElement("tr"),l=n.children.length;for(let p=0;p<l;p++){const y=document.createElement("td");y.style.cssText="padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);",y.innerHTML="Cell",d.appendChild(y)}n.parentNode.insertBefore(d,n.nextSibling)}else if(t==="removeRow")n.parentNode.children.length>1?n.parentNode.removeChild(n):c.parentNode.removeChild(c);else if(t==="addCol")c.querySelectorAll("tr").forEach(l=>{const p=document.createElement(l.parentNode.nodeName==="THEAD"?"th":"td");l.parentNode.nodeName==="THEAD"&&p.setAttribute("scope","col"),p.style.cssText=l.parentNode.nodeName==="THEAD"?"padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);":"padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);",p.innerHTML=l.parentNode.nodeName==="THEAD"?"Header":"Cell";const y=l.children[r];l.insertBefore(p,y?y.nextSibling:null)});else if(t==="removeCol"){const d=c.querySelectorAll("tr");n.children.length>1?d.forEach(l=>{l.children[r]&&l.removeChild(l.children[r])}):c.parentNode.removeChild(c)}o.state.syncContent()},openLinkModal(){o.state.mode!=="source"&&(o.state.saveSelection(),o.state.showLinkModal=!0,o.update(),o.state.linkUrl="",o.update())},confirmLink(){o.state.showLinkModal=!1,o.update(),o.state.linkUrl&&(o.state.restoreSelection(),document.execCommand("createLink",!1,o.state.linkUrl),o.state.syncContent())},closeLinkModal(){o.state.showLinkModal=!1,o.update()},openWidgetModal(){o.state.mode!=="source"&&(o.state.saveSelection(),o.state.showWidgetModal=!0,o.update())},confirmWidget(){o.state.showWidgetModal=!1,o.update();let e=`<div class="cv-widget" data-widget="${o.state.escapeHtml(o.state.selectedWidget)}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-primary, #7fc4de); background: var(--cv-color-accent-tint, rgba(127,196,222,0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-link, #7fc4de); font-weight: 600;">[ContentVeda Widget: ${o.state.escapeHtml(o.state.selectedWidget.toUpperCase())}]</div><p><br></p>`;o.state.insertHtmlAtCursor(e)},closeWidgetModal(){o.state.showWidgetModal=!1,o.update()},openSocialModal(){o.state.mode!=="source"&&(o.state.saveSelection(),o.state.showSocialModal=!0,o.update(),o.state.socialUrl="",o.update(),o.state.socialPlatform="youtube",o.update())},confirmSocial(){if(o.state.showSocialModal=!1,o.update(),o.state.socialUrl){let t=(o.state.socialPlatform||"youtube").toLowerCase();o.state.isHost(o.state.socialUrl,"youtube.com")||o.state.isHost(o.state.socialUrl,"youtu.be")?t="youtube":o.state.isHost(o.state.socialUrl,"vimeo.com")&&(t="vimeo");const e=o.state.escapeHtml(t),i=o.state.escapeHtml(o.state.socialUrl);let s=`<div class="cv-social-embed" data-platform="${e}" data-url="${i}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded ${o.state.escapeHtml(t.toUpperCase())} Post: ${i}]</div><p><br></p>`;o.state.insertHtmlAtCursor(s)}},closeSocialModal(){o.state.showSocialModal=!1,o.update()},openImageModal(){o.state.mode!=="source"&&(o.state.saveSelection(),o.state.showImageModal=!0,o.update(),o.state.imageUrl="",o.update(),o.state.imageAlt="",o.update())},closeImageModal(){o.state.showImageModal=!1,o.update()},confirmImage(){if(o.state.showImageModal=!1,o.update(),o.state.imageUrl){const t=o.state.imageUrl.trim(),e=(t.split("/").pop()||"image").split("?")[0].split(".")[0].replace(/[-_]+/g," ").trim(),i=(o.state.imageAlt||"").trim()||e||"Image",s=o.state.escapeHtml(i),c=`<img src="${o.state.escapeHtml(t)}" alt="${s}" loading="lazy" decoding="async" draggable="false" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" /><p><br></p>`;o.state.insertHtmlAtCursor(c)}},openVideoModal(){o.state.mode!=="source"&&(o.state.saveSelection(),o.state.showVideoModal=!0,o.update(),o.state.videoUrl="",o.update())},closeVideoModal(){o.state.showVideoModal=!1,o.update()},confirmVideo(){if(o.state.showVideoModal=!1,o.update(),o.state.videoUrl){const t=o.state.videoUrl.trim(),e=t.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/),i=t.match(/vimeo\.com\/(?:video\/)?([0-9]+)/),s=o.state.escapeHtml(t);let n="";e?n=`<div class="cv-social-embed" data-platform="youtube" data-url="${s}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded YOUTUBE Video: ${s}]</div><p><br></p>`:i?n=`<div class="cv-social-embed" data-platform="vimeo" data-url="${s}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded VIMEO Video: ${s}]</div><p><br></p>`:n=`<video src="${s}" controls style="max-width: 100%; border-radius: 8px; margin: 16px 0;"></video><p><br></p>`,o.state.insertHtmlAtCursor(n)}},toggleMode(){if(o.state.mode==="visual")o.state.syncContent(),o.state.internalContent=o.state.formatHTML(o.state.internalContent),o.update(),o.state.mode="source",o.update();else{o.state.mode="visual",o.update();const t=o.state.getEditorElement();t&&(t.innerHTML=o.state.sanitizeHtml(o.state.internalContent),o.state.renderEmbeds())}},toggleFullScreen(){typeof document<"u"&&(document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():o._rootRef&&o._rootRef.requestFullscreen&&o._rootRef.requestFullscreen().catch(t=>console.warn("Fullscreen denied",t)))},changeFontFamily(t){o.state.mode!=="source"&&(o.state.fontFamily=t,o.update(),o.state.restoreSelection(),document.execCommand("fontName",!1,t),o.state.syncContent(),o.state.checkFormats())},changeFontSize(t){if(o.state.mode==="source")return;o.state.fontSize=t,o.update(),o.state.restoreSelection();const e=window.getSelection();if(e&&e.rangeCount>0&&!e.isCollapsed){const i=document.createElement("span");i.style.fontSize=t;const s=e.getRangeAt(0).extractContents();i.appendChild(s),e.getRangeAt(0).insertNode(i),e.removeAllRanges();const n=document.createRange();n.selectNodeContents(i),e.addRange(n),o.state.saveSelection()}else{const i={"12px":"1","14px":"2","15px":"2","16px":"3","18px":"4","20px":"5","24px":"6","32px":"7"};document.execCommand("fontSize",!1,i[t]||"3")}o.state.syncContent(),o.state.checkFormats()},insertChecklist(){if(o.state.mode==="source")return;o.state.restoreSelection();const t=typeof window<"u"?window.getSelection():null,e=o.state.getEditorElement();if(!t||!e)return;let i=t.rangeCount>0?t.getRangeAt(0).startContainer:null,s=null,n=null,c=null;for(;i&&i!==e;)i.nodeType===1&&(i.tagName==="LI"&&(s=i),i.tagName==="UL"&&i.classList.contains("task-list")&&(n=i),(i.tagName==="P"||i.tagName==="DIV")&&(c=i)),i=i.parentNode;if(n){const p=document.createElement("li");p.style.cssText="margin: 4px 0;",p.innerHTML='<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span>Task item</span></label>',s&&s.parentNode===n?s.after(p):n.appendChild(p);const y=p.querySelector("span");if(y){const I=document.createRange();I.selectNodeContents(y),t.removeAllRanges(),t.addRange(I),o.state.saveSelection()}o.state.syncContent(),o.state.checkFormats();return}if(c){const p=c.previousElementSibling;if(p&&p.tagName==="UL"&&p.classList.contains("task-list")){const y=c.textContent?c.textContent.trim():"",I=document.createElement("li");I.style.cssText="margin: 4px 0;";const E=y&&y!==""?o.state.escapeHtml(y):"Task item";I.innerHTML=`<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span>${E}</span></label>`,p.appendChild(I),c.remove();const k=I.querySelector("span");if(k){const R=document.createRange();R.selectNodeContents(k),t.removeAllRanges(),t.addRange(R),o.state.saveSelection()}o.state.syncContent(),o.state.checkFormats();return}}const r=document.createElement("ul");r.className="task-list",r.style.cssText="list-style: none; padding-left: 0.25rem;";const d=document.createElement("li");if(d.style.cssText="margin: 4px 0;",d.innerHTML='<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span>Task item</span></label>',r.appendChild(d),t.rangeCount>0){const p=t.getRangeAt(0);p.deleteContents(),p.insertNode(r)}else e.appendChild(r);const l=d.querySelector("span");if(l){const p=document.createRange();p.selectNodeContents(l),t.removeAllRanges(),t.addRange(p),o.state.saveSelection()}o.state.syncContent(),o.state.checkFormats()},openFormulaModal(){o.state.mode!=="source"&&(o.state.saveSelection(),o.state.showFormulaModal=!0,o.update(),o.state.formulaInput="E = mc\xB2",o.update())},closeFormulaModal(){o.state.showFormulaModal=!1,o.update();const t=o.state.getEditorElement();t&&t.focus()},confirmFormula(){o.state.showFormulaModal=!1,o.update();const t=(o.state.formulaInput||"").trim();if(t){const i=o.state.escapeHtml(t),s=`<code class="cv-math-formula" data-formula="${i}" contenteditable="false" style="background: rgba(127,196,222,0.15); color: #0284c7; padding: 2px 8px; border-radius: 6px; font-family: monospace; font-size: 0.9em; border: 1px solid rgba(127,196,222,0.3);">${i}</code>&nbsp;`;o.state.insertHtmlAtCursor(s)}const e=o.state.getEditorElement();e&&e.focus()},insertFormula(){o.state.openFormulaModal()},addClass(t){if(!t||o.state.mode==="source")return;const e=t.trim().split(/\s+/).filter(Boolean);let i=[...o.state.appliedClasses];e.forEach(s=>{i.includes(s)||i.push(s)}),o.state.appliedClasses=i,o.update()},removeClass(t){if(o.state.mode==="source")return;o.state.appliedClasses=o.state.appliedClasses.filter(i=>i!==t),o.update();const e=o.state.getEditorElement();e&&(o.state.selectedMediaEl&&o.state.selectedMediaEl.classList&&o.state.selectedMediaEl.classList.remove(t),e.querySelectorAll(`.${t}`).forEach(s=>{if(s.classList.remove(t),s.classList.length===0&&s.tagName==="SPAN"&&!s.getAttribute("style")&&!s.getAttribute("data-platform")&&!s.getAttribute("data-widget")){const n=s.parentNode;if(n){for(;s.firstChild;)n.insertBefore(s.firstChild,s);n.removeChild(s)}}}),o.state.syncContent(),o.state.checkFormats())},applyClassFromInput(t){const e=t&&t.target&&t.target.closest?t.target.closest(".cv-toolbar-classes-group"):null,i=e?e.querySelector(".cv-class-input"):null;if(i&&i.value){const s=i.value.trim();s&&(o.state.applyClass(s),o.state.addClass(s),i.value="")}},handleClassInputKeyDown(t){if(t.key==="Enter"){t.preventDefault();const e=t.target,i=e.value?e.value.trim():"";i&&(o.state.applyClass(i),o.state.addClass(i),e.value="")}else if(t.key==="Escape"){t.preventDefault();const e=t.target;e&&(e.value="");const i=o.state.getEditorElement();if(i)try{i.focus()}catch{}}},openAiModal(){o.state.saveSelection(),o.state.showAiModal=!0,o.update(),o.state.aiInput="",o.update()},closeAiModal(){o.state.showAiModal=!1,o.update()},applyAiAction(t){o.state.restoreSelection();const e=window.getSelection(),i=e?e.toString():"";let s="";t==="improve"?i?s=i.trim()+" (enhanced for clarity and conciseness)":s="<p><strong>Executive Summary:</strong> Designed for high-velocity digital engineering squads, this next-generation prose engine pairs strict AST schemas with real-time reactive UI component embedding.</p>":t==="callout"?s=`<div class="cv-callout variant-blue" style="padding: 16px 20px; border-left: 4px solid #0284c7; background: rgba(2, 132, 199, 0.08); border-radius: 0 8px 8px 0; margin: 16px 0;"><strong>AI INSIGHT:</strong> ${i?o.state.escapeHtml(i):"Configure your toolbar modules, slot rules, and custom micro-frontends directly in the inspector panel."}</div><p><br></p>`:t==="summarize"?s=`<p><em>Summary:</em> ${i?o.state.escapeHtml(i.slice(0,100))+"...":"Key takeaways: High performance AST validation, component slot architecture, and real-time schema hydration."}</p>`:t==="grammar"&&(s=i?i.trim():"<p>All grammar and formatting validated.</p>"),s&&(s.startsWith("<")?document.execCommand("insertHTML",!1,s):document.execCommand("insertText",!1,s),o.state.syncContent()),o.state.showAiModal=!1,o.update()},showToolbarOption(t){if(!o.props.config||!o.props.config.toolbar)return!0;let e=t;return t==="alignLeft"&&(e="justifyLeft"),t==="alignCenter"&&(e="justifyCenter"),t==="alignRight"&&(e="justifyRight"),t==="alignJustify"&&(e="justifyFull"),t==="bulletList"&&(e="unorderedList"),t==="numberedList"&&(e="orderedList"),t==="code"?o.props.config.toolbar.includes("code")||o.props.config.toolbar.includes("pre"):o.props.config.toolbar.includes(t)||o.props.config.toolbar.includes(e)},showSeparator(t){const e=[["fullscreen","source","bold","italic","underline","strikeThrough"],["code","quote","clear"],["headings"],["foreColor","backColor"],["alignLeft","justifyLeft","alignCenter","justifyCenter","alignRight","justifyRight"],["image","link","formula","table","unorderedList","orderedList","horizontalRule","video","social"],["insertButton","addWidget"],["save"],["classInput"]],i=e.slice(0,t+1).some(n=>n.some(c=>o.state.showToolbarOption(c))),s=e[t+1]&&e[t+1].some(n=>o.state.showToolbarOption(n));return i&&s},handleFullscreenChange(){typeof document<"u"&&(o.state.isFullscreen=!!document.fullscreenElement,o.update(),o.state.deselectMediaElement())},isResizableTarget(t){if(!t||t.nodeType!==1)return!1;const e=t.tagName;return!!(e==="IMG"||e==="VIDEO"||e==="AUDIO"||t.classList&&(t.classList.contains("cv-social-embed")||t.classList.contains("cv-widget")))},updateResizeHandlePosition(){const t=o.state.getEditorElement();if(!o.state.selectedMediaEl||!t)return;const e=t.parentElement;if(!e)return;const i=o.state.selectedMediaEl.getBoundingClientRect(),s=e.getBoundingClientRect();o.state.resizeHandleTop=i.bottom-s.top+e.scrollTop-7,o.update(),o.state.resizeHandleLeft=i.right-s.left+e.scrollLeft-7,o.update();let n=i.top-s.top+e.scrollTop-40;n<8&&(n=i.bottom-s.top+e.scrollTop+8);let c=i.left-s.left+e.scrollLeft;c<8&&(c=8),o.state.resizeToolbarTop=n,o.update(),o.state.resizeToolbarLeft=c,o.update()},handleEditorScroll(){o.state.selectedMediaEl&&(typeof window<"u"&&window.requestAnimationFrame?window.requestAnimationFrame(()=>{o.state.updateResizeHandlePosition()}):o.state.updateResizeHandlePosition())},selectMediaElement(t){o.state.selectedMediaEl&&o.state.selectedMediaEl!==t&&o.state.selectedMediaEl.classList.remove("cv-resizing-selected"),o.state.selectedMediaEl=t,o.update(),t.classList.add("cv-resizing-selected"),o.state.updateResizeHandlePosition(),t.tagName==="IMG"&&!t.complete&&t.addEventListener("load",()=>{o.state.selectedMediaEl===t&&o.state.updateResizeHandlePosition()},{once:!0})},deleteSelectedMedia(){if(o.state.selectedMediaEl){const t=o.state.selectedMediaEl;o.state.deselectMediaElement(),t&&t.parentNode&&t.parentNode.removeChild(t),o.state.ensureEditableStructure(),o.state.syncContent()}},setImageSize(t){if(!o.state.selectedMediaEl)return;const e=o.state.selectedMediaEl;e.style.width=t,e.style.maxWidth="100%",e.style.height="auto",o.state.updateResizeHandlePosition(),o.state.syncContent()},setImageAlign(t){if(!o.state.selectedMediaEl)return;const e=o.state.selectedMediaEl;t==="center"?(e.style.display="block",e.style.marginLeft="auto",e.style.marginRight="auto"):t==="left"?(e.style.display="block",e.style.marginLeft="0",e.style.marginRight="auto"):t==="right"&&(e.style.display="block",e.style.marginLeft="auto",e.style.marginRight="0"),o.state.updateResizeHandlePosition(),o.state.syncContent()},deselectMediaElement(){o.state.selectedMediaEl&&o.state.selectedMediaEl.classList.remove("cv-resizing-selected"),o.state.selectedMediaEl=null,o.update()},isReadOnly(){return!!(o.props.readOnly||o.props.disabled)},closeAllModals(){o.state.showInsertMenu=!1,o.update(),o.state.showTableModal=!1,o.update(),o.state.showLinkModal=!1,o.update(),o.state.showWidgetModal=!1,o.update(),o.state.showSocialModal=!1,o.update(),o.state.showButtonModal=!1,o.update(),o.state.showAiModal=!1,o.update(),o.state.showImageModal=!1,o.update(),o.state.showVideoModal=!1,o.update(),o.state.showFormulaModal=!1,o.update()},handleBackdropClick(t){t&&t.target===t.currentTarget&&o.state.closeAllModals()},ensureEditableStructure(){const t=o.state.getEditorElement();if(!t)return;if(!t.hasChildNodes()||!t.innerHTML||t.innerHTML.trim()===""||t.innerHTML.trim()==="<br>"){t.innerHTML="<p><br></p>";return}const e=t.firstElementChild;if(t.childNodes.length===1&&e&&e.tagName==="P"&&!e.textContent&&!e.children.length){e.innerHTML="<br>";return}const i=[];for(let n=0;n<t.childNodes.length;n++){const c=t.childNodes[n];if(c.nodeType===3)c.textContent&&c.textContent.trim()!==""&&i.push(c);else if(c.nodeType===1){const r=c.tagName;/^(P|DIV|H[1-6]|UL|OL|LI|BLOCKQUOTE|PRE|TABLE|HR|SECTION|ARTICLE|HEADER|FOOTER)$/.test(r)||i.push(c)}}i.length>0&&i.forEach(n=>{const c=document.createElement("p");n.replaceWith(c),c.appendChild(n)});const s=t.lastElementChild;if(s&&(s.getAttribute("contenteditable")==="false"||s.tagName==="TABLE"||s.tagName==="IMG"||s.tagName==="VIDEO"||s.tagName==="AUDIO"||s.classList&&(s.classList.contains("cv-social-embed")||s.classList.contains("cv-widget")))){const n=document.createElement("p");n.innerHTML="<br>",t.appendChild(n)}if(e&&(e.getAttribute("contenteditable")==="false"||e.tagName==="TABLE"||e.tagName==="IMG"||e.tagName==="VIDEO"||e.tagName==="AUDIO"||e.classList&&(e.classList.contains("cv-social-embed")||e.classList.contains("cv-widget")))){const n=document.createElement("p");n.innerHTML="<br>",t.insertBefore(n,e)}},normalizeSelection(){if(o.state.isReadOnly())return;const t=o.state.getEditorElement();if(!t)return;const e=window.getSelection();if(!e||e.rangeCount===0)return;let i=null;try{i=e.getRangeAt(0)}catch{return}let s=i.startContainer,n=null;for(;s&&s!==t;){if(s.nodeType===1&&s.getAttribute&&s.getAttribute("contenteditable")==="false"){n=s;break}s=s.parentNode}if(n){const c=document.createRange(),r=n.nextSibling;if(!r||r.nodeType===1&&r.getAttribute("contenteditable")==="false"){const l=document.createElement("p");l.innerHTML="<br>",r?n.parentNode.insertBefore(l,r):n.parentNode.appendChild(l),c.setStart(l,0)}else r.nodeType===1?c.setStart(r,0):c.setStartAfter(n);c.collapse(!0),e.removeAllRanges(),e.addRange(c);const d=c.cloneRange();activeSavedRange=d,t&&(t.__cv_savedRange=d)}},focusEditorAtEnd(){if(o.state.isReadOnly())return;const t=o.state.getEditorElement();if(!t)return;o.state.ensureEditableStructure();try{typeof t.focus=="function"&&t.focus()}catch{}const e=window.getSelection();if(e){const i=document.createRange();i.selectNodeContents(t),i.collapse(!1),e.removeAllRanges(),e.addRange(i);const s=i.cloneRange();activeSavedRange=s,t&&(t.__cv_savedRange=s)}},handleEditorContentClick(t){t&&t.target===t.currentTarget&&o.state.focusEditorAtEnd()},handleKeyDown(t){if(o.state.isReadOnly()){t.preventDefault();return}if(o.state.mode!=="source"){if(t.key==="Escape"){o.state.deselectMediaElement(),o.state.closeAllModals();return}if(o.state.selectedMediaEl){if(t.key==="Backspace"||t.key==="Delete"){t.preventDefault();const e=o.state.selectedMediaEl;o.state.deselectMediaElement(),e&&e.parentNode&&e.parentNode.removeChild(e),o.state.ensureEditableStructure(),o.state.syncContent();return}if(t.key==="Enter"){t.preventDefault();const e=o.state.selectedMediaEl;o.state.deselectMediaElement();const i=o.state.getEditorElement();let s=e;for(;s&&s.parentNode&&s.parentNode!==i;)s=s.parentNode;let n=null;if(s&&s.nextElementSibling&&s.nextElementSibling.tagName==="P"?n=s.nextElementSibling:s&&s.parentNode&&(n=document.createElement("p"),n.innerHTML="<br>",s.after(n)),n){const c=window.getSelection();if(c){const r=document.createRange();r.setStart(n,0),r.collapse(!0),c.removeAllRanges(),c.addRange(r),o.state.saveSelection()}}o.state.ensureEditableStructure(),o.state.syncContent();return}if(t.key.length===1&&!t.ctrlKey&&!t.metaKey&&!t.altKey){const e=o.state.selectedMediaEl;o.state.deselectMediaElement();const i=o.state.getEditorElement();let s=e;for(;s&&s.parentNode&&s.parentNode!==i;)s=s.parentNode;let n=null;if(s&&s.nextElementSibling&&s.nextElementSibling.tagName==="P"?n=s.nextElementSibling:s&&s.parentNode&&(n=document.createElement("p"),n.innerHTML="<br>",s.after(n)),n){const c=window.getSelection();if(c){const r=document.createRange();r.setStart(n,0),r.collapse(!0),c.removeAllRanges(),c.addRange(r),o.state.saveSelection()}}return}}if(t.key==="Backspace"){const e=typeof window<"u"?window.getSelection():null,i=o.state.getEditorElement();if(e&&e.rangeCount>0&&i){let s=e.getRangeAt(0).startContainer,n=null,c=null;for(;s&&s!==i;)s.nodeType===1&&(s.tagName==="LI"&&(n=s),s.tagName==="UL"&&s.classList.contains("task-list")&&(c=s)),s=s.parentNode;if(c&&n){const r=n.textContent?n.textContent.trim():"";if(!r||r===""){t.preventDefault();const d=n.previousElementSibling;if(n.remove(),d){const l=d.querySelector("span");if(l){const p=document.createRange();p.selectNodeContents(l),p.collapse(!1),e.removeAllRanges(),e.addRange(p),o.state.saveSelection()}}else if(c.children.length===0){const l=document.createElement("p");l.innerHTML="<br>",c.replaceWith(l);const p=document.createRange();p.setStart(l,0),p.collapse(!0),e.removeAllRanges(),e.addRange(p),o.state.saveSelection()}o.state.syncContent();return}}}}if(t.key==="Enter"){const e=typeof window<"u"?window.getSelection():null,i=o.state.getEditorElement();if(!e||e.rangeCount===0||!i)return;const s=e.getRangeAt(0);if(t.shiftKey){t.preventDefault();try{document.execCommand("insertLineBreak")}catch{const x=document.createElement("br");s.deleteContents(),s.insertNode(x);const v=document.createRange();v.setStartAfter(x),v.collapse(!0),e.removeAllRanges(),e.addRange(v)}o.state.saveSelection(),o.state.handleInput();return}let n=s.startContainer,c=null,r=null,d=null,l=null,p=null,y=null,I=null,E=null,k=null,R=null;for(;n&&n!==i;){if(n.nodeType===1){const f=n.tagName;f==="LI"&&(n.closest&&n.closest("ul.task-list")?(c=n,r=n.closest("ul.task-list")):(d=n,l=n.parentElement)),/^H[1-6]$/.test(f)&&(p=n),f==="BLOCKQUOTE"&&(y=n),(f==="PRE"||f==="CODE")&&(I=n),(f==="TD"||f==="TH")&&(k=n),n.classList&&(n.classList.contains("cv-callout")||n.classList.contains("cv-widget"))&&(E=n),n.getAttribute&&n.getAttribute("contenteditable")==="false"&&(R=n),(f==="IMG"||f==="VIDEO"||f==="AUDIO")&&(R=n)}n=n.parentNode}if(r&&c){t.preventDefault();const f=c.textContent?c.textContent.trim():"";if(!f||f===""){if(c.remove(),r.children.length===0){const D=document.createElement("p");D.innerHTML="<br>",r.replaceWith(D);const H=document.createRange();H.setStart(D,0),H.collapse(!0),e.removeAllRanges(),e.addRange(H),o.state.saveSelection(),o.state.handleInput();return}const b=document.createElement("p");b.innerHTML="<br>",r.after(b);const B=document.createRange();B.setStart(b,0),B.collapse(!0),e.removeAllRanges(),e.addRange(B),o.state.saveSelection(),o.state.handleInput();return}const x=document.createElement("li");x.style.cssText="margin: 4px 0;",x.innerHTML='<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span><br></span></label>',c.after(x);const v=x.querySelector("span");if(v){const b=document.createRange();b.setStart(v,0),b.collapse(!0),e.removeAllRanges(),e.addRange(b),o.state.saveSelection()}o.state.handleInput();return}if(R){t.preventDefault();let f=R;for(;f&&f.parentNode&&f.parentNode!==i;)f=f.parentNode;const x=document.createElement("p");x.innerHTML="<br>",f&&f.parentNode?f.after(x):i.appendChild(x);const v=document.createRange();v.setStart(x,0),v.collapse(!0),e.removeAllRanges(),e.addRange(v),o.state.saveSelection(),o.state.handleInput();return}if(p){t.preventDefault();const f=s.cloneRange();f.selectNodeContents(p),f.setStart(s.endContainer,s.endOffset);const x=f.toString(),v=document.createElement("p");if(v.innerHTML="<br>",!x||x.trim()==="")p.after(v);else{const B=f.extractContents();v.innerHTML="",v.appendChild(B),(!v.textContent||!v.textContent.trim())&&(v.innerHTML="<br>"),p.after(v)}(!p.textContent||!p.textContent.trim())&&(p.innerHTML="<br>");const b=document.createRange();b.setStart(v,0),b.collapse(!0),e.removeAllRanges(),e.addRange(b),o.state.headingFormat="P",o.update(),o.state.saveSelection(),o.state.handleInput(),o.state.checkFormats();return}if(y){const f=y.textContent?y.textContent.trim():"",x=s.cloneRange();x.selectNodeContents(y),x.setStart(s.endContainer,s.endOffset);const v=x.toString().trim();if(!f||y.innerHTML==="<br>"||!v&&y.innerHTML.endsWith("<br>")){t.preventDefault();const b=document.createElement("p");b.innerHTML="<br>",!f||f===""?y.replaceWith(b):y.after(b);const B=document.createRange();B.setStart(b,0),B.collapse(!0),e.removeAllRanges(),e.addRange(B),o.state.saveSelection(),o.state.handleInput(),o.state.checkFormats();return}t.preventDefault();try{document.execCommand("insertLineBreak")}catch{const B=document.createElement("br");s.deleteContents(),s.insertNode(B);const D=document.createRange();D.setStartAfter(B),D.collapse(!0),e.removeAllRanges(),e.addRange(D)}o.state.saveSelection(),o.state.handleInput();return}if(I){t.preventDefault();const f=document.createTextNode(`
`);s.deleteContents(),s.insertNode(f);const x=document.createRange();x.setStartAfter(f),x.collapse(!0),e.removeAllRanges(),e.addRange(x),o.state.saveSelection(),o.state.handleInput();return}if(d&&l){const f=d.textContent?d.textContent.trim():"";if(!f||f===""){t.preventDefault(),d.remove();const x=document.createElement("p");x.innerHTML="<br>",l.children.length===0?l.replaceWith(x):l.after(x);const v=document.createRange();v.setStart(x,0),v.collapse(!0),e.removeAllRanges(),e.addRange(v),o.state.saveSelection(),o.state.handleInput(),o.state.checkFormats();return}return}if(E){t.preventDefault();const f=document.createElement("p");f.innerHTML="<br>",E.after(f);const x=document.createRange();x.setStart(f,0),x.collapse(!0),e.removeAllRanges(),e.addRange(x),o.state.saveSelection(),o.state.handleInput();return}if(k){t.preventDefault();try{document.execCommand("insertLineBreak")}catch{const x=document.createElement("br");s.deleteContents(),s.insertNode(x);const v=document.createRange();v.setStartAfter(x),v.collapse(!0),e.removeAllRanges(),e.addRange(v)}o.state.saveSelection(),o.state.handleInput();return}t.preventDefault();try{document.execCommand("defaultParagraphSeparator",!1,"p")}catch{}document.execCommand("insertParagraph"),o.state.saveSelection(),o.state.handleInput(),o.state.checkFormats();return}}},handleGlobalKeyDown(t){t.key==="Escape"&&(o.state.showInsertMenu=!1,o.update(),o.state.closeAllModals(),o.state.deselectMediaElement())},handleEditorClick(t){if(o.state.showInsertMenu=!1,o.update(),o.state.isReadOnly())return;const e=t.target,i=e&&e.closest?e.closest("img, video, audio, .cv-social-embed, .cv-widget"):null;i&&o.state.isResizableTarget(i)?o.state.selectMediaElement(i):(o.state.deselectMediaElement(),o.state.normalizeSelection())},startResize(t){!o.state.selectedMediaEl||o.state.isReadOnly()||(t.preventDefault(),t.stopPropagation(),o.state.isResizing=!0,o.update(),o.state.resizeStartX=t.clientX,o.update(),o.state.resizeStartWidth=o.state.selectedMediaEl.getBoundingClientRect().width,o.update(),typeof document<"u"&&(document.addEventListener("mousemove",o.state.handleResizeMove),document.addEventListener("mouseup",o.state.stopResize)))},handleResizeMove(t){if(!o.state.isResizing||!o.state.selectedMediaEl)return;const e=t.clientX-o.state.resizeStartX;let i=Math.round(o.state.resizeStartWidth+e);const s=80,n=o.state.getEditorElement(),c=n?n.clientWidth:2e3;i<s&&(i=s),i>c&&(i=c);const r=o.state.selectedMediaEl;r.style.width=i+"px",r.style.maxWidth="100%",(r.tagName==="IMG"||r.tagName==="VIDEO")&&(r.style.height="auto"),o.state.updateResizeHandlePosition()},stopResize(){o.state.isResizing&&(o.state.isResizing=!1,o.update(),typeof document<"u"&&(document.removeEventListener("mousemove",o.state.handleResizeMove),document.removeEventListener("mouseup",o.state.stopResize)),o.state.syncContent())},handleSelectionChange(){if(typeof window>"u"||typeof document>"u")return;const t=o._editorRef&&o._editorRef.current||(o._editorRef&&o._editorRef.nodeType===1?o._editorRef:null)||(document.querySelector?document.querySelector(".wysiwyg-content"):null);if(!t)return;const e=window.getSelection();if(!e)return;let i=!1;try{e.anchorNode&&typeof t.contains=="function"&&(i=t.contains(e.anchorNode))}catch{}if(i&&e.rangeCount>0)try{const s=e.getRangeAt(0);t.contains(s.commonAncestorContainer)&&(activeSavedRange=s.cloneRange(),t.__cv_savedRange=s.cloneRange())}catch{}}},this.props||(this.props={}),this.componentProps=["content","initialContent","onMediaRequest","onChange","config","readOnly","disabled","className","availableClasses"],this.updateDeps=[[this.props.content]],this.nodesToDestroy=[],this.pendingUpdate=!1,this.onButtonRichTextEditor1Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor1Click=t=>{this.state.format("undo")},this.onButtonRichTextEditor2Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor2Click=t=>{this.state.format("redo")},this.onSelectRichTextEditor1Mousedown=t=>{this.state.saveSelection()},this.onSelectRichTextEditor1Change=t=>{this.state.formatHeading(t.target.value)},this.onSelectRichTextEditor2Mousedown=t=>{this.state.saveSelection()},this.onSelectRichTextEditor2Change=t=>{this.state.restoreSelection(),this.state.changeFontFamily(t.target.value)},this.onSelectRichTextEditor3Mousedown=t=>{this.state.saveSelection()},this.onSelectRichTextEditor3Change=t=>{this.state.restoreSelection(),this.state.changeFontSize(t.target.value)},this.onButtonRichTextEditor3Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor3Click=t=>{this.state.format("bold")},this.onButtonRichTextEditor4Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor4Click=t=>{this.state.format("italic")},this.onButtonRichTextEditor5Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor5Click=t=>{this.state.format("underline")},this.onButtonRichTextEditor6Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor6Click=t=>{this.state.format("strikeThrough")},this.onButtonRichTextEditor7Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor7Click=t=>{this.state.toggleBlock("PRE")},this.onLabelRichTextEditor1Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor1Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor1Input=t=>{this.state.applyColorPreview("foreColor",t.target.value)},this.onInputRichTextEditor1Change=t=>{this.state.applyColor("foreColor",t.target.value)},this.onLabelRichTextEditor2Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor2Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor2Input=t=>{this.state.applyColorPreview("backColor",t.target.value)},this.onInputRichTextEditor2Change=t=>{this.state.applyColor("backColor",t.target.value)},this.onButtonRichTextEditor8Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor8Click=t=>{this.state.format("justifyLeft")},this.onButtonRichTextEditor9Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor9Click=t=>{this.state.format("justifyCenter")},this.onButtonRichTextEditor10Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor10Click=t=>{this.state.format("justifyRight")},this.onButtonRichTextEditor11Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor11Click=t=>{this.state.format("justifyFull")},this.onButtonRichTextEditor12Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor12Click=t=>{this.state.format("insertUnorderedList")},this.onButtonRichTextEditor13Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor13Click=t=>{this.state.format("insertOrderedList")},this.onButtonRichTextEditor14Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor14Click=t=>{this.state.insertChecklist()},this.onButtonRichTextEditor15Mousedown=t=>{t.preventDefault(),this.state.saveSelection()},this.onButtonRichTextEditor15Click=t=>{this.state.showInsertMenu=!this.state.showInsertMenu,this.update()},this.onButtonRichTextEditor16Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor16Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.openTableModal()},this.onButtonRichTextEditor17Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor17Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.insertMedia("image")},this.onButtonRichTextEditor18Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor18Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.openLinkModal()},this.onButtonRichTextEditor19Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor19Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.insertMedia("video")},this.onButtonRichTextEditor20Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor20Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.openButtonModal()},this.onButtonRichTextEditor21Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor21Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.openSocialModal()},this.onButtonRichTextEditor22Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor22Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.insertFormula()},this.onButtonRichTextEditor23Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor23Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.format("insertHorizontalRule")},this.onButtonRichTextEditor24Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor24Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.toggleBlock("BLOCKQUOTE")},this.onButtonRichTextEditor25Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor25Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.clearAllFormatting()},this.onButtonRichTextEditor26Mousedown=t=>{t.preventDefault(),this.state.saveSelection()},this.onButtonRichTextEditor26Click=t=>{this.state.openTableModal()},this.onButtonRichTextEditor27Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor27Click=t=>{this.state.modifyTable("addRow")},this.onButtonRichTextEditor28Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor28Click=t=>{this.state.modifyTable("removeRow")},this.onButtonRichTextEditor29Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor29Click=t=>{this.state.modifyTable("addCol")},this.onButtonRichTextEditor30Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor30Click=t=>{this.state.modifyTable("removeCol")},this.onButtonRichTextEditor31Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor31Click=t=>{this.state.insertMedia("image")},this.onButtonRichTextEditor32Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor32Click=t=>{this.state.openLinkModal()},this.onButtonRichTextEditor33Mousedown=t=>{t.preventDefault(),this.state.saveSelection()},this.onButtonRichTextEditor33Click=t=>{this.state.insertFormula()},this.onButtonRichTextEditor34Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor34Click=t=>{this.state.openSocialModal()},this.onButtonRichTextEditor35Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor35Click=t=>{this.state.openWidgetModal()},this.onButtonRichTextEditor36Click=t=>{const e=this.getScope(t.currentTarget,"cls");this.state.removeClass(e)},this.onInputRichTextEditor3Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor3Keydown=t=>{this.state.handleClassInputKeyDown(t)},this.onButtonRichTextEditor37Mousedown=t=>{t.preventDefault(),this.state.applyClassFromInput(t)},this.onButtonRichTextEditor38Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor38Click=t=>{this.state.toggleMode()},this.onButtonRichTextEditor39Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor39Click=t=>{this.state.toggleFullScreen()},this.onButtonRichTextEditor40Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor40Click=t=>{this.state.syncContent()},this.onDivRichTextEditor7Scroll=t=>{this.state.handleEditorScroll()},this.onDivRichTextEditor7Click=t=>{this.state.handleEditorContentClick(t)},this.onDivRichTextEditor8Input=t=>{this.state.handleInput()},this.onDivRichTextEditor8Focus=t=>{this.state.handleFocus()},this.onDivRichTextEditor8Blur=t=>{this.state.handleBlur()},this.onDivRichTextEditor8Keyup=t=>{this.state.saveSelection(),this.state.checkFormats()},this.onDivRichTextEditor8Keydown=t=>{this.state.handleKeyDown(t)},this.onDivRichTextEditor8Mouseup=t=>{this.state.saveSelection(),this.state.checkFormats()},this.onDivRichTextEditor8Click=t=>{this.state.handleEditorClick(t)},this.onDivRichTextEditor9Mousedown=t=>{this.state.startResize(t)},this.onButtonRichTextEditor41Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor41Click=t=>{this.state.setImageSize("25%")},this.onButtonRichTextEditor42Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor42Click=t=>{this.state.setImageSize("50%")},this.onButtonRichTextEditor43Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor43Click=t=>{this.state.setImageSize("75%")},this.onButtonRichTextEditor44Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor44Click=t=>{this.state.setImageSize("100%")},this.onButtonRichTextEditor45Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor45Click=t=>{this.state.setImageAlign("left")},this.onButtonRichTextEditor46Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor46Click=t=>{this.state.setImageAlign("center")},this.onButtonRichTextEditor47Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor47Click=t=>{this.state.setImageAlign("right")},this.onButtonRichTextEditor48Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor48Click=t=>{this.state.deleteSelectedMedia()},this.onDivRichTextEditor13Click=t=>{this.state.handleBackdropClick(t)},this.onButtonRichTextEditor49Click=t=>{this.state.closeAiModal()},this.onButtonRichTextEditor50Click=t=>{this.state.applyAiAction("improve")},this.onButtonRichTextEditor51Click=t=>{this.state.applyAiAction("callout")},this.onButtonRichTextEditor52Click=t=>{this.state.applyAiAction("summarize")},this.onButtonRichTextEditor53Click=t=>{this.state.applyAiAction("grammar")},this.onButtonRichTextEditor54Click=t=>{this.state.closeAiModal()},this.onInputRichTextEditor4Input=t=>{this.state.imageUrl=t.target.value,this.update()},this.onInputRichTextEditor4Keydown=t=>{t.key==="Enter"&&(t.preventDefault(),this.state.confirmImage())},this.onInputRichTextEditor5Input=t=>{this.state.imageAlt=t.target.value,this.update()},this.onInputRichTextEditor5Keydown=t=>{t.key==="Enter"&&(t.preventDefault(),this.state.confirmImage())},this.onButtonRichTextEditor55Click=t=>{this.state.closeImageModal()},this.onButtonRichTextEditor56Click=t=>{this.state.confirmImage()},this.onInputRichTextEditor6Input=t=>{this.state.videoUrl=t.target.value,this.update()},this.onInputRichTextEditor6Keydown=t=>{t.key==="Enter"&&(t.preventDefault(),this.state.confirmVideo())},this.onButtonRichTextEditor57Click=t=>{this.state.closeVideoModal()},this.onButtonRichTextEditor58Click=t=>{this.state.confirmVideo()},this.onSelectRichTextEditor4Change=t=>{this.state.btnStyle=t.target.value,this.update()},this.onInputRichTextEditor7Input=t=>{this.state.btnText=t.target.value,this.update()},this.onInputRichTextEditor7Keydown=t=>{t.key==="Enter"&&(t.preventDefault(),this.state.confirmButton())},this.onInputRichTextEditor8Input=t=>{this.state.btnUrl=t.target.value,this.update()},this.onInputRichTextEditor8Keydown=t=>{t.key==="Enter"&&(t.preventDefault(),this.state.confirmButton())},this.onButtonRichTextEditor59Click=t=>{this.state.closeButtonModal()},this.onButtonRichTextEditor60Click=t=>{this.state.confirmButton()},this.onInputRichTextEditor9Input=t=>{this.state.tableRows=t.target.value,this.update()},this.onInputRichTextEditor9Keydown=t=>{t.key==="Enter"&&(t.preventDefault(),this.state.confirmTable())},this.onInputRichTextEditor10Input=t=>{this.state.tableCols=t.target.value,this.update()},this.onInputRichTextEditor10Keydown=t=>{t.key==="Enter"&&(t.preventDefault(),this.state.confirmTable())},this.onInputRichTextEditor11Change=t=>{this.state.tableHasHeader=t.target.checked,this.update()},this.onButtonRichTextEditor61Click=t=>{this.state.closeTableModal()},this.onButtonRichTextEditor62Click=t=>{this.state.confirmTable()},this.onInputRichTextEditor12Input=t=>{this.state.linkUrl=t.target.value,this.update()},this.onInputRichTextEditor12Keydown=t=>{t.key==="Enter"&&(t.preventDefault(),this.state.confirmLink())},this.onButtonRichTextEditor63Click=t=>{this.state.closeLinkModal()},this.onButtonRichTextEditor64Click=t=>{this.state.confirmLink()},this.onSelectRichTextEditor5Change=t=>{this.state.selectedWidget=t.target.value,this.update()},this.onButtonRichTextEditor65Click=t=>{this.state.closeWidgetModal()},this.onButtonRichTextEditor66Click=t=>{this.state.confirmWidget()},this.onSelectRichTextEditor6Change=t=>{this.state.socialPlatform=t.target.value,this.update()},this.onInputRichTextEditor13Input=t=>{this.state.socialUrl=t.target.value,this.update()},this.onInputRichTextEditor13Keydown=t=>{t.key==="Enter"&&(t.preventDefault(),this.state.confirmSocial())},this.onButtonRichTextEditor67Click=t=>{this.state.closeSocialModal()},this.onButtonRichTextEditor68Click=t=>{this.state.confirmSocial()},this.onInputRichTextEditor14Input=t=>{this.state.formulaInput=t.target.value,this.update()},this.onInputRichTextEditor14Keydown=t=>{t.key==="Enter"&&(t.preventDefault(),this.state.confirmFormula())},this.onButtonRichTextEditor69Click=t=>{this.state.closeFormulaModal()},this.onButtonRichTextEditor70Click=t=>{this.state.confirmFormula()},this.onTextareaRichTextEditor1Input=t=>{this.state.handleSourceInput(t)}}disconnectedCallback(){const o=this,t=this.state.getEditorElement();t&&(t.__cv_inputTimer&&(clearTimeout(t.__cv_inputTimer),t.__cv_inputTimer=null),t.__cv_selectionTimer&&(clearTimeout(t.__cv_selectionTimer),t.__cv_selectionTimer=null)),typeof document<"u"&&(document.removeEventListener("fullscreenchange",this.state.handleFullscreenChange),document.removeEventListener("selectionchange",this.state.handleSelectionChange),document.removeEventListener("keydown",this.state.handleGlobalKeyDown),document.removeEventListener("mousemove",this.state.handleResizeMove),document.removeEventListener("mouseup",this.state.stopResize)),this.destroyAnyNodes()}destroyAnyNodes(){const o=this;this.nodesToDestroy.forEach(t=>{t.__persistent||t.remove()}),this.nodesToDestroy=this.nodesToDestroy.filter(t=>t.__persistent)}connectedCallback(){const o=this;this.getAttributeNames().forEach(t=>{const e=t.replace(/-/g,""),i=new RegExp("^"+e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"$","i");this.componentProps.forEach(s=>{if(i.test(s)){let n=this.getAttribute(t);if(n==="true")n=!0;else if(n==="false")n=!1;else try{n&&(n.trim().startsWith("{")||n.trim().startsWith("["))&&(n=JSON.parse(n))}catch{}this.props[s]!==n&&(this.props[s]=n)}})}),this._root.innerHTML=`
      <div data-el="div-rich-text-editor-1" data-ref="RichTextEditor-rootRef">
        <div data-el="div-rich-text-editor-2">
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
                <option value="15px">15px</option>
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
            <div
              class="cv-toolbar-group cv-insert-dropdown relative"
              data-el="div-rich-text-editor-3"
            >
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
                <div
                  class="cv-insert-menu shadow-xl"
                  data-el="div-rich-text-editor-4"
                >
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
                    <span
                      class="font-serif italic font-bold text-xs"
                      data-el="span-rich-text-editor-4"
                    >
                      Fx
                    </span>
      
                    Formula
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
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
      
                    Divider
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
                data-el="button-rich-text-editor-26"
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
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  <span class="text-[9px] font-bold ml-0.5">R</span>
                </button>
                <button
                  type="button"
                  class="w-6 h-6 flex items-center justify-center rounded hover:bg-rose-500/30 text-rose-500 transition-colors"
                  title="Delete Row"
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
                    <path d="M5 12h14"></path>
                  </svg>
                  <span class="text-[9px] font-bold ml-0.5">R</span>
                </button>
                <div class="w-px h-3 cv-rte-tint-strong mx-0.5"></div>
                <button
                  type="button"
                  class="w-6 h-6 flex items-center justify-center rounded hover:cv-rte-tint-strong cv-rte-accent transition-colors"
                  title="Add Column Right"
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
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  <span class="text-[9px] font-bold ml-0.5">C</span>
                </button>
                <button
                  type="button"
                  class="w-6 h-6 flex items-center justify-center rounded hover:bg-rose-500/30 text-rose-500 transition-colors"
                  title="Delete Column"
                  data-el="button-rich-text-editor-30"
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
                  data-el="button-rich-text-editor-32"
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
                data-el="button-rich-text-editor-33"
              >
                <span class="font-serif italic font-bold text-xs">Fx</span>
              </button>
              <template data-el="show-rich-text-editor-21">
                <button
                  type="button"
                  class="cv-toolbar-btn"
                  title="Social Media Embed"
                  data-el="button-rich-text-editor-34"
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
                data-el="button-rich-text-editor-35"
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
                  <span class="cv-class-chip" data-el="span-rich-text-editor-5">
                    <span>
                      <template data-el="div-rich-text-editor-5">
                        <!-- cls -->
                      </template>
                    </span>
                    <button
                      type="button"
                      class="cv-class-chip-remove"
                      data-el="button-rich-text-editor-36"
                    >
                      \xD7
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
                <button
                  type="button"
                  class="cv-class-apply-btn"
                  title="Apply Class"
                  data-el="button-rich-text-editor-37"
                >
                  Apply
                </button>
                <template data-el="show-rich-text-editor-24">
                  <datalist id="editor-class-list">
                    <template data-el="for-rich-text-editor-2">
                      <option data-el="option-rich-text-editor-1">
                        <template data-el="div-rich-text-editor-6">
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
                  data-el="button-rich-text-editor-39"
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
                  data-el="button-rich-text-editor-40"
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
        <div data-el="div-rich-text-editor-7">
          <div
            data-el="div-rich-text-editor-8"
            data-ref="RichTextEditor-editorRef"
          ></div>
          <template data-el="show-rich-text-editor-28">
            <div
              class="cv-resize-handle"
              title="Drag to resize"
              data-el="div-rich-text-editor-9"
            ></div>
            <div class="cv-media-toolbar" data-el="div-rich-text-editor-10">
              <button
                type="button"
                class="cv-media-toolbar-btn"
                title="25% width"
                data-el="button-rich-text-editor-41"
              >
                25%
              </button>
              <button
                type="button"
                class="cv-media-toolbar-btn"
                title="50% width"
                data-el="button-rich-text-editor-42"
              >
                50%
              </button>
              <button
                type="button"
                class="cv-media-toolbar-btn"
                title="75% width"
                data-el="button-rich-text-editor-43"
              >
                75%
              </button>
              <button
                type="button"
                class="cv-media-toolbar-btn"
                title="100% width"
                data-el="button-rich-text-editor-44"
              >
                100%
              </button>
              <div class="cv-toolbar-divider" data-el="div-rich-text-editor-11"></div>
              <button
                type="button"
                class="cv-media-toolbar-btn"
                title="Align Left"
                data-el="button-rich-text-editor-45"
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
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                  <line x1="17" y1="18" x2="3" y2="18"></line>
                </svg>
              </button>
              <button
                type="button"
                class="cv-media-toolbar-btn"
                title="Align Center"
                data-el="button-rich-text-editor-46"
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
                  <line x1="18" y1="6" x2="6" y2="6"></line>
                  <line x1="21" y1="12" x2="3" y2="12"></line>
                  <line x1="18" y1="18" x2="6" y2="18"></line>
                </svg>
              </button>
              <button
                type="button"
                class="cv-media-toolbar-btn"
                title="Align Right"
                data-el="button-rich-text-editor-47"
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
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                  <line x1="21" y1="18" x2="7" y2="18"></line>
                </svg>
              </button>
              <div class="cv-toolbar-divider" data-el="div-rich-text-editor-12"></div>
              <button
                type="button"
                class="cv-media-toolbar-btn cv-btn-danger"
                title="Remove Media"
                data-el="button-rich-text-editor-48"
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
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                </svg>
              </button>
            </div>
          </template>
          <template data-el="show-rich-text-editor-29">
            <div
              class="fixed inset-0 flex items-center justify-center z-[100] backdrop-blur-md"
              data-el="div-rich-text-editor-13"
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
                      data-el="button-rich-text-editor-49"
                    >
                      \xD7
                    </button>
                  </div>
                  <div data-el="div-rich-text-editor-14">
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-50"
                    >
                      \u2728 Improve Writing & Polish Flow
                    </button>
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-51"
                    >
                      \u{1F4A1} Generate AI Callout Insight Box
                    </button>
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-52"
                    >
                      \u{1F4DD} Summarize Selected Section
                    </button>
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-53"
                    >
                      \u{1F50D} Fix Grammar & Syntax
                    </button>
                  </div>
                  <div data-el="div-rich-text-editor-15">
                    <button type="button" data-el="button-rich-text-editor-54">
                      Close
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-31">
                <div class="shadow-2xl" data-el="div-rich-text-editor-16">
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
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
      
                    Insert Image
                  </h3>
                  <div data-el="div-rich-text-editor-17">
                    <div data-el="div-rich-text-editor-18">
                      <label data-el="label-rich-text-editor-3">Image URL</label>
                      <input
                        type="url"
                        aria-label="Image URL"
                        placeholder="https://example.com/photo.jpg"
                        data-el="input-rich-text-editor-4"
                        data-dom-state="RichTextEditor-input-rich-text-editor-4"
                      />
                    </div>
                    <div data-el="div-rich-text-editor-19">
                      <label data-el="label-rich-text-editor-4">
                        Alt Text (Accessibility & SEO)
                      </label>
                      <input
                        type="text"
                        aria-label="Image Alt Text"
                        placeholder="Descriptive text for screen readers"
                        data-el="input-rich-text-editor-5"
                        data-dom-state="RichTextEditor-input-rich-text-editor-5"
                      />
                    </div>
                  </div>
                  <div data-el="div-rich-text-editor-20">
                    <button type="button" data-el="button-rich-text-editor-55">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-56">
                      Insert Image
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-32">
                <div class="shadow-2xl" data-el="div-rich-text-editor-21">
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
      
                    Insert Video
                  </h3>
                  <div data-el="div-rich-text-editor-22">
                    <div data-el="div-rich-text-editor-23">
                      <label data-el="label-rich-text-editor-5">
                        Video URL (YouTube, Vimeo, or MP4)
                      </label>
                      <input
                        type="url"
                        aria-label="Video URL"
                        placeholder="https://www.youtube.com/watch?v=... or .mp4"
                        data-el="input-rich-text-editor-6"
                        data-dom-state="RichTextEditor-input-rich-text-editor-6"
                      />
                    </div>
                  </div>
                  <div data-el="div-rich-text-editor-24">
                    <button type="button" data-el="button-rich-text-editor-57">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-58">
                      Insert Video
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-33">
                <div class="shadow-2xl" data-el="div-rich-text-editor-25">
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
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
      
                    Insert Button
                  </h3>
                  <div data-el="div-rich-text-editor-26">
                    <div data-el="div-rich-text-editor-27">
                      <label data-el="label-rich-text-editor-6">Button Style</label>
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
                    <div data-el="div-rich-text-editor-28">
                      <label data-el="label-rich-text-editor-7">Button Label</label>
                      <input
                        type="text"
                        aria-label="Button Label"
                        placeholder="e.g. Get Started Today"
                        data-el="input-rich-text-editor-7"
                        data-dom-state="RichTextEditor-input-rich-text-editor-7"
                      />
                    </div>
                    <div data-el="div-rich-text-editor-29">
                      <label data-el="label-rich-text-editor-8">Target URL</label>
                      <input
                        type="url"
                        aria-label="Target URL"
                        placeholder="https://..."
                        data-el="input-rich-text-editor-8"
                        data-dom-state="RichTextEditor-input-rich-text-editor-8"
                      />
                    </div>
                  </div>
                  <div data-el="div-rich-text-editor-30">
                    <button type="button" data-el="button-rich-text-editor-59">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-60">
                      Insert
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-34">
                <div class="shadow-2xl" data-el="div-rich-text-editor-31">
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
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="3" y1="15" x2="21" y2="15"></line>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                      <line x1="15" y1="3" x2="15" y2="21"></line>
                    </svg>
      
                    Insert Table Grid
                  </h3>
                  <div data-el="div-rich-text-editor-32">
                    <div data-el="div-rich-text-editor-33">
                      <label data-el="label-rich-text-editor-9">Rows</label>
                      <input
                        type="number"
                        aria-label="Table Rows"
                        min="1"
                        max="10"
                        data-el="input-rich-text-editor-9"
                        data-dom-state="RichTextEditor-input-rich-text-editor-9"
                      />
                    </div>
                    <div data-el="div-rich-text-editor-34">
                      <label data-el="label-rich-text-editor-10">Columns</label>
                      <input
                        type="number"
                        aria-label="Table Columns"
                        min="1"
                        max="10"
                        data-el="input-rich-text-editor-10"
                        data-dom-state="RichTextEditor-input-rich-text-editor-10"
                      />
                    </div>
                  </div>
                  <div data-el="div-rich-text-editor-35">
                    <input
                      type="checkbox"
                      id="cv-header-check"
                      data-el="input-rich-text-editor-11"
                      data-dom-state="RichTextEditor-input-rich-text-editor-11"
                    />
                    <label for="cv-header-check" data-el="label-rich-text-editor-11">
                      Include header row
                    </label>
                  </div>
                  <div data-el="div-rich-text-editor-36">
                    <button type="button" data-el="button-rich-text-editor-61">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-62">
                      Insert Table
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-35">
                <div class="shadow-2xl" data-el="div-rich-text-editor-37">
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
                        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                      ></path>
                      <path
                        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                      ></path>
                    </svg>
      
                    Insert Hyperlink
                  </h3>
                  <div data-el="div-rich-text-editor-38">
                    <label data-el="label-rich-text-editor-12">URL Destination</label>
                    <input
                      type="url"
                      aria-label="Hyperlink URL"
                      placeholder="https://example.com"
                      data-el="input-rich-text-editor-12"
                      data-dom-state="RichTextEditor-input-rich-text-editor-12"
                    />
                  </div>
                  <div data-el="div-rich-text-editor-39">
                    <button type="button" data-el="button-rich-text-editor-63">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-64">
                      Insert Link
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-36">
                <div class="shadow-2xl" data-el="div-rich-text-editor-40">
                  <h3
                    class="flex items-center text-white"
                    data-el="h3-rich-text-editor-6"
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
                      data-el="svg-rich-text-editor-6"
                    >
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
      
                    Insert Component
                  </h3>
                  <div data-el="div-rich-text-editor-41">
                    <label data-el="label-rich-text-editor-13">
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
                  <div data-el="div-rich-text-editor-42">
                    <button type="button" data-el="button-rich-text-editor-65">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-66">
                      Insert Widget
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-37">
                <div class="shadow-2xl" data-el="div-rich-text-editor-43">
                  <h3
                    class="flex items-center text-white"
                    data-el="h3-rich-text-editor-7"
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
                      data-el="svg-rich-text-editor-7"
                    >
                      <path
                        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                      ></path>
                    </svg>
      
                    Embed Social Post
                  </h3>
                  <div data-el="div-rich-text-editor-44">
                    <div data-el="div-rich-text-editor-45">
                      <label data-el="label-rich-text-editor-14">Platform</label>
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
                    <div data-el="div-rich-text-editor-46">
                      <label data-el="label-rich-text-editor-15">Post URL</label>
                      <input
                        type="url"
                        aria-label="Social Link URL"
                        placeholder="https://..."
                        data-el="input-rich-text-editor-13"
                        data-dom-state="RichTextEditor-input-rich-text-editor-13"
                      />
                    </div>
                  </div>
                  <div data-el="div-rich-text-editor-47">
                    <button type="button" data-el="button-rich-text-editor-67">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-68">
                      Embed Post
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-38">
                <div class="shadow-2xl" data-el="div-rich-text-editor-48">
                  <h3
                    class="flex items-center text-white"
                    data-el="h3-rich-text-editor-8"
                  >
                    <span
                      class="font-serif italic font-bold text-base"
                      data-el="span-rich-text-editor-6"
                    >
                      Fx
                    </span>
      
                    Insert Math Formula
                  </h3>
                  <div data-el="div-rich-text-editor-49">
                    <label data-el="label-rich-text-editor-16">
                      Formula Expression
                    </label>
                    <input
                      type="text"
                      aria-label="Formula Expression"
                      placeholder="e.g. E = mc\xB2 or f(x) = ax\xB2 + bx + c"
                      data-el="input-rich-text-editor-14"
                      data-dom-state="RichTextEditor-input-rich-text-editor-14"
                    />
                  </div>
                  <div data-el="div-rich-text-editor-50">
                    <button type="button" data-el="button-rich-text-editor-69">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-70">
                      Insert Formula
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>
        <div data-el="div-rich-text-editor-51">
          <textarea
            class="w-full flex-1 bg-transparent cv-rte-ok font-mono text-[14px] leading-loose outline-none"
            data-el="textarea-rich-text-editor-1"
            data-dom-state="RichTextEditor-textarea-rich-text-editor-1"
          ></textarea>
        </div>
      </div>`,this.pendingUpdate=!0,this.render(),this.onMount(),this.pendingUpdate=!1,this.update()}showContent(o,t){const e=this;if(t){if(o.__renderedNodes)return;const i=o.content.cloneNode(!0),s=Array.from(i.childNodes);o.__renderedNodes=s,s.forEach(n=>{o?.scope&&(n.scope=o.scope),o?.context&&(n.context=o.context),n.__persistent=!0,this.nodesToDestroy.push(n)}),o.after(i)}else o.__renderedNodes&&(o.__renderedNodes.forEach(i=>{i.remove();const s=this.nodesToDestroy.indexOf(i);s!==-1&&this.nodesToDestroy.splice(s,1)}),o.__renderedNodes=null)}onMount(){const o=this;if(this.state.isMounted=!0,this.update(),typeof document<"u")try{document.execCommand("defaultParagraphSeparator",!1,"p")}catch{}this.state.internalContent||(this.state.internalContent=this.props.content||this.props.initialContent||"",this.update());const t=this.state.getEditorElement();if(t&&(t.innerHTML=this.state.sanitizeHtml(this.state.internalContent),this.state.ensureEditableStructure(),this.state.renderEmbeds()),typeof document<"u"){const e="cv-editor-styles";if(!document.getElementById(e)){const i=document.createElement("style");i.id=e,i.innerHTML=".wysiwyg-content blockquote { border-left: 4px solid var(--cv-color-quote-accent, #7fc4de) !important; background: linear-gradient(90deg, var(--cv-color-accent-tint, rgba(127, 196, 222, 0.1)) 0%, transparent 100%) !important; padding: 20px 24px !important; margin: 24px 0 !important; border-radius: 0 16px 16px 0 !important; font-style: italic !important; color: var(--cv-color-text-main, #e2e8f0) !important; font-size: 1.1em !important; line-height: 1.8 !important; position: relative; box-shadow: inset 2px 0 0px var(--cv-color-border, rgba(255,255,255,0.1)); } .wysiwyg-content pre { background: var(--cv-color-code-bg, #0f172a) !important; border: 1px solid var(--cv-color-code-border, rgba(255,255,255,0.1)) !important; border-radius: 12px !important; padding: 20px !important; color: var(--cv-color-code-text, #38bdf8) !important; font-family: 'Fira Code', monospace !important; overflow-x: auto !important; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5) !important; } .wysiwyg-content ul { list-style-type: disc !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content ol { list-style-type: decimal !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content li { margin-bottom: 0.5em !important; display: list-item !important; } .wysiwyg-content a:not(.cv-btn) { color: var(--cv-color-link, #7fc4de) !important; text-decoration: underline !important; text-underline-offset: 3px !important; }",document.head.appendChild(i)}document.addEventListener("fullscreenchange",this.state.handleFullscreenChange),document.addEventListener("selectionchange",this.state.handleSelectionChange),document.addEventListener("keydown",this.state.handleGlobalKeyDown)}}onUpdate(){const o=this;(function(t,e){if(t.some((s,n)=>s!==e[n])){if(!o.state.isMounted)return;const s=o.state.getEditorElement();if(!s)return;typeof o.props.content=="string"&&o.props.content!==o.state.internalContent&&(o.state.internalContent=o.props.content,s.innerHTML=o.state.sanitizeHtml(o.state.internalContent),o.state.ensureEditableStructure(),o.state.renderEmbeds()),o.updateDeps[0]=e}})(o.updateDeps[0],[o.props.content])}update(){const o=this;if(this.pendingUpdate!==!0){this.pendingUpdate=!0;try{this.render(),this.onUpdate()}finally{this.pendingUpdate=!1}}}render(){const o=this,t=this.getStateful(this._root),e=this.prepareHydrate(t);if(this.destroyAnyNodes(),this.updateBindings(),e.length){const i=this.getStateful(this._root);this.hydrateDom(e,i)}}getStateful(o){const t=this,e=o.querySelectorAll("[data-dom-state]");return e?Array.from(e):[]}prepareHydrate(o){const t=this;return o.map(e=>{let i=null;try{["color","checkbox","radio","button","file","range","submit","reset","image"].includes(e.type)||(i=e.selectionStart)}catch{}return{id:e.dataset.domState,value:e.value,active:document.activeElement===e,selectionStart:i}})}hydrateDom(o,t){const e=this;return t.map((i,s)=>{const n=o.find(c=>i.dataset.domState===c.id);if(n&&n.active){i.value=n.value;try{i.focus()}catch{}try{!["color","checkbox","radio","button","file","range","submit","reset","image"].includes(i.type)&&n.selectionStart!==null&&n.selectionStart!==void 0&&(i.selectionStart=n.selectionStart)}catch{}}})}updateBindings(){const o=this;this._root.querySelectorAll("[data-el='div-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-rich-text-editor flex flex-col rounded-xl overflow-hidden relative ${this.state.isFullscreen?"fixed inset-0 z-[9999] w-screen h-screen rounded-none":"w-full h-full"} ${this.state.mode==="source"?"cv-source-mode":""} ${this.props.className||""}`,__cvAssignStyle(t.style,{boxSizing:"border-box",background:"var(--cv-color-surface-sunken, #0f172a)",border:this.state.isFullscreen?"none":"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",boxShadow:"var(--cv-shadow-overlay, 0 8px 32px rgba(0,0,0,0.4))"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`editor-toolbar select-none sticky top-0 z-10 w-full ${this.state.isReadOnly()?"opacity-60 pointer-events-none":""}`}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor1Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor1Click),t.addEventListener("click",this.onButtonRichTextEditor1Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor2Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor2Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor2Click),t.addEventListener("click",this.onButtonRichTextEditor2Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("headings");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.headingFormat,t.removeEventListener("mousedown",this.onSelectRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onSelectRichTextEditor1Mousedown),t.removeEventListener("change",this.onSelectRichTextEditor1Change),t.addEventListener("change",this.onSelectRichTextEditor1Change)}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.fontFamily,t.removeEventListener("mousedown",this.onSelectRichTextEditor2Mousedown),t.addEventListener("mousedown",this.onSelectRichTextEditor2Mousedown),t.removeEventListener("change",this.onSelectRichTextEditor2Change),t.addEventListener("change",this.onSelectRichTextEditor2Change)}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.fontSize,t.removeEventListener("mousedown",this.onSelectRichTextEditor3Mousedown),t.addEventListener("mousedown",this.onSelectRichTextEditor3Mousedown),t.removeEventListener("change",this.onSelectRichTextEditor3Change),t.addEventListener("change",this.onSelectRichTextEditor3Change)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("bold");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.bold?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor3Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor3Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor3Click),t.addEventListener("click",this.onButtonRichTextEditor3Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("italic");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.italic?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor4Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor4Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor4Click),t.addEventListener("click",this.onButtonRichTextEditor4Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("underline");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.underline?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor5Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor5Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor5Click),t.addEventListener("click",this.onButtonRichTextEditor5Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("strikeThrough");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.strikeThrough?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor6Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor6Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor6Click),t.addEventListener("click",this.onButtonRichTextEditor6Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("code");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.code?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor7Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor7Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor7Click),t.addEventListener("click",this.onButtonRichTextEditor7Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("foreColor")||this.state.showToolbarOption("backColor");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("foreColor");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onLabelRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onLabelRichTextEditor1Mousedown)}catch{}}),this._root.querySelectorAll("[data-el='span-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{lineHeight:"1"})}catch{}}),this._root.querySelectorAll("[data-el='span-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{backgroundColor:this.state.textColor})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.textColor,t.removeEventListener("mousedown",this.onInputRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onInputRichTextEditor1Mousedown),t.removeEventListener("input",this.onInputRichTextEditor1Input),t.addEventListener("input",this.onInputRichTextEditor1Input),t.removeEventListener("change",this.onInputRichTextEditor1Change),t.addEventListener("change",this.onInputRichTextEditor1Change)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("backColor");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onLabelRichTextEditor2Mousedown),t.addEventListener("mousedown",this.onLabelRichTextEditor2Mousedown)}catch{}}),this._root.querySelectorAll("[data-el='span-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{backgroundColor:this.state.highlightColor})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.highlightColor,t.removeEventListener("mousedown",this.onInputRichTextEditor2Mousedown),t.addEventListener("mousedown",this.onInputRichTextEditor2Mousedown),t.removeEventListener("input",this.onInputRichTextEditor2Input),t.addEventListener("input",this.onInputRichTextEditor2Input),t.removeEventListener("change",this.onInputRichTextEditor2Change),t.addEventListener("change",this.onInputRichTextEditor2Change)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyLeft")||this.state.showToolbarOption("justifyCenter")||this.state.showToolbarOption("justifyRight");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyLeft");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.justifyLeft?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor8Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor8Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor8Click),t.addEventListener("click",this.onButtonRichTextEditor8Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyCenter");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.justifyCenter?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor9Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor9Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor9Click),t.addEventListener("click",this.onButtonRichTextEditor9Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyRight");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.justifyRight?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor10Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor10Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor10Click),t.addEventListener("click",this.onButtonRichTextEditor10Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.justifyFull?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor11Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor11Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor11Click),t.addEventListener("click",this.onButtonRichTextEditor11Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("unorderedList");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.unorderedList?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor12Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor12Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor12Click),t.addEventListener("click",this.onButtonRichTextEditor12Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("orderedList");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.orderedList?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor13Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor13Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor13Click),t.addEventListener("click",this.onButtonRichTextEditor13Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor14Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor14Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor14Click),t.addEventListener("click",this.onButtonRichTextEditor14Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{position:"relative",display:"inline-flex"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor15Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor15Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor15Click),t.addEventListener("click",this.onButtonRichTextEditor15Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showInsertMenu;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{position:"absolute",top:"calc(100% + 4px)",left:"0",zIndex:50,minWidth:"170px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor16Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor16Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor16Click),t.addEventListener("click",this.onButtonRichTextEditor16Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor17Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor17Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor17Click),t.addEventListener("click",this.onButtonRichTextEditor17Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor18Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor18Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor18Click),t.addEventListener("click",this.onButtonRichTextEditor18Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor19Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor19Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor19Click),t.addEventListener("click",this.onButtonRichTextEditor19Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor20Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor20Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor20Click),t.addEventListener("click",this.onButtonRichTextEditor20Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor21Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor21Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor21Click),t.addEventListener("click",this.onButtonRichTextEditor21Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor22Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor22Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor22Click),t.addEventListener("click",this.onButtonRichTextEditor22Click)}catch{}}),this._root.querySelectorAll("[data-el='span-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{width:"14px",textAlign:"center"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor23Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor23Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor23Click),t.addEventListener("click",this.onButtonRichTextEditor23Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor24Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor24Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor24Click),t.addEventListener("click",this.onButtonRichTextEditor24Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor25Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor25Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor25Click),t.addEventListener("click",this.onButtonRichTextEditor25Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("table");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor26Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor26Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor26Click),t.addEventListener("click",this.onButtonRichTextEditor26Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.activeFormats.inTable&&this.state.showToolbarOption("table");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor27Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor27Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor27Click),t.addEventListener("click",this.onButtonRichTextEditor27Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor28Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor28Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor28Click),t.addEventListener("click",this.onButtonRichTextEditor28Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor29Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor29Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor29Click),t.addEventListener("click",this.onButtonRichTextEditor29Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-30']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor30Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor30Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor30Click),t.addEventListener("click",this.onButtonRichTextEditor30Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("image");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-31']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor31Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor31Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor31Click),t.addEventListener("click",this.onButtonRichTextEditor31Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("link");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-32']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor32Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor32Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor32Click),t.addEventListener("click",this.onButtonRichTextEditor32Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-33']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor33Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor33Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor33Click),t.addEventListener("click",this.onButtonRichTextEditor33Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("social");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-34']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor34Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor34Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor34Click),t.addEventListener("click",this.onButtonRichTextEditor34Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("addWidget");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-35']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor35Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor35Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor35Click),t.addEventListener("click",this.onButtonRichTextEditor35Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("classInput");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='for-rich-text-editor']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null,p=this.state.appliedClasses;this.renderLoop(t,p,"cls")}catch{}}),this._root.querySelectorAll("[data-el='span-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.key=l}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;this.renderTextNode(t,l)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-36']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor36Click),t.addEventListener("click",this.onButtonRichTextEditor36Click),t.setAttribute("title","Remove "+l)}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onInputRichTextEditor3Mousedown),t.addEventListener("mousedown",this.onInputRichTextEditor3Mousedown),t.removeEventListener("keydown",this.onInputRichTextEditor3Keydown),t.addEventListener("keydown",this.onInputRichTextEditor3Keydown)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-37']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor37Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor37Mousedown),__cvAssignStyle(t.style,{border:"none",background:"var(--cv-color-primary, #0284c7)",color:"#fff",borderRadius:"4px",padding:"1px 6px",fontSize:"11px",cursor:"pointer",fontWeight:600,lineHeight:"1.4"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.props.availableClasses&&this.props.availableClasses.length>0;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='for-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null,p=this.props.availableClasses;this.renderLoop(t,p,"cls")}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.value=l}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;this.renderTextNode(t,l)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("source");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-38']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn cv-source-toggle-btn ${this.state.mode==="source"?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor38Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor38Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor38Click),t.addEventListener("click",this.onButtonRichTextEditor38Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("fullscreen");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-39']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor39Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor39Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor39Click),t.addEventListener("click",this.onButtonRichTextEditor39Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("save");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-40']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor40Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor40Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor40Click),t.addEventListener("click",this.onButtonRichTextEditor40Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`editor-content flex-1 overflow-y-auto relative min-h-0 cv-mode-${this.state.mode}`,t.removeEventListener("scroll",this.onDivRichTextEditor7Scroll),t.addEventListener("scroll",this.onDivRichTextEditor7Scroll),t.removeEventListener("click",this.onDivRichTextEditor7Click),t.addEventListener("click",this.onDivRichTextEditor7Click),__cvAssignStyle(t.style,{padding:"16px 20px",color:"var(--cv-color-text-main, #f1f5f9)",position:"relative",cursor:this.state.isReadOnly()?"default":"text"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.setAttribute("contentEditable",this.state.isReadOnly()?"false":"true"),t.className=`wysiwyg-content outline-none prose prose-invert max-w-none ${this.state.isReadOnly()?"cv-readonly":""}`,t.removeEventListener("input",this.onDivRichTextEditor8Input),t.addEventListener("input",this.onDivRichTextEditor8Input),t.removeEventListener("focus",this.onDivRichTextEditor8Focus),t.addEventListener("focus",this.onDivRichTextEditor8Focus),t.removeEventListener("blur",this.onDivRichTextEditor8Blur),t.addEventListener("blur",this.onDivRichTextEditor8Blur),t.removeEventListener("keyup",this.onDivRichTextEditor8Keyup),t.addEventListener("keyup",this.onDivRichTextEditor8Keyup),t.removeEventListener("keydown",this.onDivRichTextEditor8Keydown),t.addEventListener("keydown",this.onDivRichTextEditor8Keydown),t.removeEventListener("mouseup",this.onDivRichTextEditor8Mouseup),t.addEventListener("mouseup",this.onDivRichTextEditor8Mouseup),t.removeEventListener("click",this.onDivRichTextEditor8Click),t.addEventListener("click",this.onDivRichTextEditor8Click),__cvAssignStyle(t.style,{minHeight:"350px",fontFamily:"Inter, sans-serif",lineHeight:"1.7",fontSize:"15px"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.selectedMediaEl&&!this.state.isReadOnly();this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{position:"absolute",top:`${this.state.resizeHandleTop}px`,left:`${this.state.resizeHandleLeft}px`,width:"14px",height:"14px",borderRadius:"3px",background:"var(--cv-color-primary, #245066)",border:"2px solid var(--cv-color-surface-raised, #fff)",cursor:"nwse-resize",zIndex:30,boxShadow:"0 1px 4px rgba(0,0,0,0.4)"}),t.removeEventListener("mousedown",this.onDivRichTextEditor9Mousedown),t.addEventListener("mousedown",this.onDivRichTextEditor9Mousedown)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{position:"absolute",top:`${this.state.resizeToolbarTop}px`,left:`${this.state.resizeToolbarLeft}px`,zIndex:35})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-41']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor41Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor41Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor41Click),t.addEventListener("click",this.onButtonRichTextEditor41Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-42']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor42Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor42Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor42Click),t.addEventListener("click",this.onButtonRichTextEditor42Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-43']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor43Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor43Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor43Click),t.addEventListener("click",this.onButtonRichTextEditor43Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-44']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor44Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor44Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor44Click),t.addEventListener("click",this.onButtonRichTextEditor44Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{height:"14px",margin:"0 2px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-45']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor45Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor45Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor45Click),t.addEventListener("click",this.onButtonRichTextEditor45Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-46']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor46Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor46Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor46Click),t.addEventListener("click",this.onButtonRichTextEditor46Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-47']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor47Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor47Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor47Click),t.addEventListener("click",this.onButtonRichTextEditor47Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{height:"14px",margin:"0 2px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-48']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor48Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor48Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor48Click),t.addEventListener("click",this.onButtonRichTextEditor48Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showTableModal||this.state.showLinkModal||this.state.showWidgetModal||this.state.showSocialModal||this.state.showButtonModal||this.state.showAiModal||this.state.showImageModal||this.state.showVideoModal||this.state.showFormulaModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"rgba(0, 0, 0, 0.6)"}),t.removeEventListener("click",this.onDivRichTextEditor13Click),t.addEventListener("click",this.onDivRichTextEditor13Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-30']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showAiModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-49']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor49Click),t.addEventListener("click",this.onButtonRichTextEditor49Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"20px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-50']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor50Click),t.addEventListener("click",this.onButtonRichTextEditor50Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-51']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor51Click),t.addEventListener("click",this.onButtonRichTextEditor51Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-52']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor52Click),t.addEventListener("click",this.onButtonRichTextEditor52Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-53']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor53Click),t.addEventListener("click",this.onButtonRichTextEditor53Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"10px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-54']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"8px 16px",fontSize:"13px",color:"#cbd5e1",background:"rgba(255,255,255,0.05)",border:"none",borderRadius:"6px",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor54Click),t.addEventListener("click",this.onButtonRichTextEditor54Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-31']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showImageModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"400px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-primary, #7fc4de)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.imageUrl,t.removeEventListener("input",this.onInputRichTextEditor4Input),t.addEventListener("input",this.onInputRichTextEditor4Input),t.removeEventListener("keydown",this.onInputRichTextEditor4Keydown),t.addEventListener("keydown",this.onInputRichTextEditor4Keydown)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.imageAlt,t.removeEventListener("input",this.onInputRichTextEditor5Input),t.addEventListener("input",this.onInputRichTextEditor5Input),t.removeEventListener("keydown",this.onInputRichTextEditor5Keydown),t.addEventListener("keydown",this.onInputRichTextEditor5Keydown)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-55']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor55Click),t.addEventListener("click",this.onButtonRichTextEditor55Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-56']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor56Click),t.addEventListener("click",this.onButtonRichTextEditor56Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-32']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showVideoModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"400px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-info, #0ea5e9)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.videoUrl,t.removeEventListener("input",this.onInputRichTextEditor6Input),t.addEventListener("input",this.onInputRichTextEditor6Input),t.removeEventListener("keydown",this.onInputRichTextEditor6Keydown),t.addEventListener("keydown",this.onInputRichTextEditor6Keydown)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-57']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor57Click),t.addEventListener("click",this.onButtonRichTextEditor57Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-58']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-color-info-fill, #075985)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor58Click),t.addEventListener("click",this.onButtonRichTextEditor58Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-33']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showButtonModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-primary, #7fc4de)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none"}),t.value=this.state.btnStyle,t.removeEventListener("change",this.onSelectRichTextEditor4Change),t.addEventListener("change",this.onSelectRichTextEditor4Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.btnText,t.removeEventListener("input",this.onInputRichTextEditor7Input),t.addEventListener("input",this.onInputRichTextEditor7Input),t.removeEventListener("keydown",this.onInputRichTextEditor7Keydown),t.addEventListener("keydown",this.onInputRichTextEditor7Keydown)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.btnUrl,t.removeEventListener("input",this.onInputRichTextEditor8Input),t.addEventListener("input",this.onInputRichTextEditor8Input),t.removeEventListener("keydown",this.onInputRichTextEditor8Keydown),t.addEventListener("keydown",this.onInputRichTextEditor8Keydown)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-30']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-59']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor59Click),t.addEventListener("click",this.onButtonRichTextEditor59Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-60']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.2))"}),t.removeEventListener("click",this.onButtonRichTextEditor60Click),t.addEventListener("click",this.onButtonRichTextEditor60Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-34']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showTableModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-31']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"340px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-link, #7fc4de)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-32']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",gap:"16px",marginBottom:"20px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-33']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{flex:1,display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px",width:"100%",fontSize:"15px",color:"var(--cv-color-text-main, #fff)",outline:"none",textAlign:"center",boxSizing:"border-box"}),t.value=this.state.tableRows,t.removeEventListener("input",this.onInputRichTextEditor9Input),t.addEventListener("input",this.onInputRichTextEditor9Input),t.removeEventListener("keydown",this.onInputRichTextEditor9Keydown),t.addEventListener("keydown",this.onInputRichTextEditor9Keydown)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-34']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{flex:1,display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px",width:"100%",fontSize:"15px",color:"var(--cv-color-text-main, #fff)",outline:"none",textAlign:"center",boxSizing:"border-box"}),t.value=this.state.tableCols,t.removeEventListener("input",this.onInputRichTextEditor10Input),t.addEventListener("input",this.onInputRichTextEditor10Input),t.removeEventListener("keydown",this.onInputRichTextEditor10Keydown),t.addEventListener("keydown",this.onInputRichTextEditor10Keydown)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-35']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",alignItems:"center",gap:"10px",marginBottom:"28px"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{width:"18px",height:"18px",borderRadius:"4px",cursor:"pointer",accentColor:"var(--cv-color-link, #7fc4de)"}),t.setAttribute("checked",this.state.tableHasHeader),t.removeEventListener("change",this.onInputRichTextEditor11Change),t.addEventListener("change",this.onInputRichTextEditor11Change)}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",cursor:"pointer",userSelect:"none"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-36']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-61']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor61Click),t.addEventListener("click",this.onButtonRichTextEditor61Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-62']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor62Click),t.addEventListener("click",this.onButtonRichTextEditor62Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-35']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showLinkModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-37']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-link, #7fc4de)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-38']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.linkUrl,t.removeEventListener("input",this.onInputRichTextEditor12Input),t.addEventListener("input",this.onInputRichTextEditor12Input),t.removeEventListener("keydown",this.onInputRichTextEditor12Keydown),t.addEventListener("keydown",this.onInputRichTextEditor12Keydown)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-39']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-63']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor63Click),t.addEventListener("click",this.onButtonRichTextEditor63Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-64']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-color-info-fill, #075985)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor64Click),t.addEventListener("click",this.onButtonRichTextEditor64Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-36']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showWidgetModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-40']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-secondary, #5eb3d6)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-41']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.selectedWidget,t.removeEventListener("change",this.onSelectRichTextEditor5Change),t.addEventListener("change",this.onSelectRichTextEditor5Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-42']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-65']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor65Click),t.addEventListener("click",this.onButtonRichTextEditor65Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-66']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor66Click),t.addEventListener("click",this.onButtonRichTextEditor66Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-37']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showSocialModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-43']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-info, #0ea5e9)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-44']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-45']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.socialPlatform,t.removeEventListener("change",this.onSelectRichTextEditor6Change),t.addEventListener("change",this.onSelectRichTextEditor6Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-46']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.socialUrl,t.removeEventListener("input",this.onInputRichTextEditor13Input),t.addEventListener("input",this.onInputRichTextEditor13Input),t.removeEventListener("keydown",this.onInputRichTextEditor13Keydown),t.addEventListener("keydown",this.onInputRichTextEditor13Keydown)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-47']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-67']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor67Click),t.addEventListener("click",this.onButtonRichTextEditor67Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-68']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-color-info-fill, #075985)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor68Click),t.addEventListener("click",this.onButtonRichTextEditor68Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-38']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showFormulaModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-48']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='span-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-primary, #7fc4de)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-49']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box",fontFamily:"monospace"}),t.value=this.state.formulaInput,t.removeEventListener("input",this.onInputRichTextEditor14Input),t.addEventListener("input",this.onInputRichTextEditor14Input),t.removeEventListener("keydown",this.onInputRichTextEditor14Keydown),t.addEventListener("keydown",this.onInputRichTextEditor14Keydown)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-50']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-69']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor69Click),t.addEventListener("click",this.onButtonRichTextEditor69Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-70']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor70Click),t.addEventListener("click",this.onButtonRichTextEditor70Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-51']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.className=`editor-source flex-1 relative min-h-[350px] overflow-hidden cv-mode-src-${this.state.mode}`,__cvAssignStyle(t.style,{flexDirection:"column",height:"100%",minHeight:"350px"})}catch{}}),this._root.querySelectorAll("[data-el='textarea-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,r=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,l=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.internalContent,t.removeEventListener("input",this.onTextareaRichTextEditor1Input),t.addEventListener("input",this.onTextareaRichTextEditor1Input),__cvAssignStyle(t.style,{padding:"16px 20px",whiteSpace:"pre-wrap",overflowY:"auto",resize:"none",height:"100%",width:"100%",boxSizing:"border-box"}),t.setAttribute("spellcheck",!1)}catch{}})}renderTextNode(o,t){const e=this,i=document.createTextNode(t);o?.scope&&(i.scope=o.scope),o?.context&&(i.context=o.context),o.after(i),this.nodesToDestroy.push(o.nextSibling)}getScope(o,t){const e=this;do{let i=o?.scope?.[t];if(i!==void 0)return i}while(o=o.parentNode)}renderLoop(o,t,e,i,s){const n=this;if(t||(t=[]),o.__renderedArray&&o.__renderedArray.length===t.length&&t.every((l,p)=>o.__renderedArray[p]===l))return;o.__renderedNodes&&o.__renderedNodes.forEach(l=>{l.remove();const p=this.nodesToDestroy.indexOf(l);p!==-1&&this.nodesToDestroy.splice(p,1)});const r=[],d=[];for(let[l,p]of t.entries()){const y=o.content.cloneNode(!0),I=Array.from(y.childNodes),E={};let k=E;if(o?.scope){const R={get(f,x,v){return x in f?f[x]:x in o.scope?o.scope[x]:f[x]}};k=new Proxy(E,R)}I.forEach(R=>{e!==void 0&&(k[e]=p),i!==void 0&&(k[i]=l),s!==void 0&&(k[s]=t),R.scope=k,o.context&&(R.context=o.context),R.__persistent=!0,this.nodesToDestroy.push(R),r.unshift(R),d.push(R)})}r.forEach(l=>o.after(l)),o.__renderedArray=[...t],o.__renderedNodes=d}};customElements.define("cv-rich-text-editor",RichTextEditor);function __cvAssignStyle(o,t){if(!o||!t)return o;for(const e in t){const i=t[e];e.charCodeAt(0)===45&&e.charCodeAt(1)===45?i===""||i===null||i===void 0?o.removeProperty(e):o.setProperty(e,String(i)):o[e]=i}return o}/*! Bundled license information:

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.4.15 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.15/LICENSE *)
*/
