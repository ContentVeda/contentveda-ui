function _arrayLikeToArray(o,t){(t==null||t>o.length)&&(t=o.length);for(var e=0,i=Array(t);e<t;e++)i[e]=o[e];return i}function _arrayWithHoles(o){if(Array.isArray(o))return o}function _iterableToArrayLimit(o,t){var e=o==null?null:typeof Symbol<"u"&&o[Symbol.iterator]||o["@@iterator"];if(e!=null){var i,s,n,l,d=[],r=!0,h=!1;try{if(n=(e=e.call(o)).next,t!==0)for(;!(r=(i=n.call(e)).done)&&(d.push(i.value),d.length!==t);r=!0);}catch(p){h=!0,s=p}finally{try{if(!r&&e.return!=null&&(l=e.return(),Object(l)!==l))return}finally{if(h)throw s}}return d}}function _nonIterableRest(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function _slicedToArray(o,t){return _arrayWithHoles(o)||_iterableToArrayLimit(o,t)||_unsupportedIterableToArray(o,t)||_nonIterableRest()}function _unsupportedIterableToArray(o,t){if(o){if(typeof o=="string")return _arrayLikeToArray(o,t);var e={}.toString.call(o).slice(8,-1);return e==="Object"&&o.constructor&&(e=o.constructor.name),e==="Map"||e==="Set"?Array.from(o):e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?_arrayLikeToArray(o,t):void 0}}var entries=Object.entries,setPrototypeOf=Object.setPrototypeOf,isFrozen=Object.isFrozen,getPrototypeOf=Object.getPrototypeOf,getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor,freeze=Object.freeze,seal=Object.seal,create=Object.create,_ref=typeof Reflect<"u"&&Reflect,apply=_ref.apply,construct=_ref.construct;freeze||(freeze=function(t){return t}),seal||(seal=function(t){return t}),apply||(apply=function(t,e){for(var i=arguments.length,s=new Array(i>2?i-2:0),n=2;n<i;n++)s[n-2]=arguments[n];return t.apply(e,s)}),construct||(construct=function(t){for(var e=arguments.length,i=new Array(e>1?e-1:0),s=1;s<e;s++)i[s-1]=arguments[s];return new t(...i)});var arrayForEach=unapply(Array.prototype.forEach),arrayLastIndexOf=unapply(Array.prototype.lastIndexOf),arrayPop=unapply(Array.prototype.pop),arrayPush=unapply(Array.prototype.push),arraySplice=unapply(Array.prototype.splice),arrayIsArray=Array.isArray,stringToLowerCase=unapply(String.prototype.toLowerCase),stringToString=unapply(String.prototype.toString),stringMatch=unapply(String.prototype.match),stringReplace=unapply(String.prototype.replace),stringIndexOf=unapply(String.prototype.indexOf),stringTrim=unapply(String.prototype.trim),numberToString=unapply(Number.prototype.toString),booleanToString=unapply(Boolean.prototype.toString),bigintToString=typeof BigInt>"u"?null:unapply(BigInt.prototype.toString),symbolToString=typeof Symbol>"u"?null:unapply(Symbol.prototype.toString),objectHasOwnProperty=unapply(Object.prototype.hasOwnProperty),objectToString=unapply(Object.prototype.toString),regExpTest=unapply(RegExp.prototype.test),typeErrorCreate=unconstruct(TypeError);function unapply(o){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var e=arguments.length,i=new Array(e>1?e-1:0),s=1;s<e;s++)i[s-1]=arguments[s];return apply(o,t,i)}}function unconstruct(o){return function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return construct(o,e)}}function addToSet(o,t){let e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:stringToLowerCase;if(setPrototypeOf&&setPrototypeOf(o,null),!arrayIsArray(t))return o;let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const n=e(s);n!==s&&(isFrozen(t)||(t[i]=n),s=n)}o[s]=!0}return o}function cleanArray(o){for(let t=0;t<o.length;t++)objectHasOwnProperty(o,t)||(o[t]=null);return o}function clone(o){const t=create(null);for(const i of entries(o)){var e=_slicedToArray(i,2);const s=e[0],n=e[1];objectHasOwnProperty(o,s)&&(arrayIsArray(n)?t[s]=cleanArray(n):n&&typeof n=="object"&&n.constructor===Object?t[s]=clone(n):t[s]=n)}return t}function stringifyValue(o){switch(typeof o){case"string":return o;case"number":return numberToString(o);case"boolean":return booleanToString(o);case"bigint":return bigintToString?bigintToString(o):"0";case"symbol":return symbolToString?symbolToString(o):"Symbol()";case"undefined":return objectToString(o);case"function":case"object":{if(o===null)return objectToString(o);const t=o,e=lookupGetter(t,"toString");if(typeof e=="function"){const i=e(t);return typeof i=="string"?i:objectToString(i)}return objectToString(o)}default:return objectToString(o)}}function lookupGetter(o,t){for(;o!==null;){const i=getOwnPropertyDescriptor(o,t);if(i){if(i.get)return unapply(i.get);if(typeof i.value=="function")return unapply(i.value)}o=getPrototypeOf(o)}function e(){return null}return e}function isRegex(o){try{return regExpTest(o,""),!0}catch{return!1}}var html$1=freeze(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),svg$1=freeze(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),svgFilters=freeze(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),svgDisallowed=freeze(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),mathMl$1=freeze(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),mathMlDisallowed=freeze(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),text=freeze(["#text"]),html=freeze(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),svg=freeze(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),mathMl=freeze(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),xml=freeze(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),MUSTACHE_EXPR=seal(/{{[\w\W]*|^[\w\W]*}}/g),ERB_EXPR=seal(/<%[\w\W]*|^[\w\W]*%>/g),TMPLIT_EXPR=seal(/\${[\w\W]*/g),DATA_ATTR=seal(/^data-[\-\w.\u00B7-\uFFFF]+$/),ARIA_ATTR=seal(/^aria-[\-\w]+$/),IS_ALLOWED_URI=seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),IS_SCRIPT_OR_DATA=seal(/^(?:\w+script|data):/i),ATTR_WHITESPACE=seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),DOCTYPE_NAME=seal(/^html$/i),CUSTOM_ELEMENT=seal(/^[a-z][.\w]*(-[.\w]+)+$/i),ELEMENT_MARKUP_PROBE=seal(/<[/\w!]/g),COMMENT_MARKUP_PROBE=seal(/<[/\w]/g),FALLBACK_TAG_CLOSE=seal(/<\/no(script|embed|frames)/i),SELF_CLOSING_TAG=seal(/\/>/i),NODE_TYPE={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},LITERAL_TEXT_ELEMENT_NAMES=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],LITERAL_TEXT_ELEMENTS=freeze(addToSet({},LITERAL_TEXT_ELEMENT_NAMES)),LITERAL_TEXT_CLOSE=(function(){const o={};return arrayForEach(LITERAL_TEXT_ELEMENT_NAMES,t=>{o[t]=seal(new RegExp("</"+t+"(?=[\\t\\n\\f\\r />])","i"))}),freeze(o)})(),getGlobal=function(){return typeof window>"u"?null:window},_createTrustedTypesPolicy=function(t,e){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";e&&e.hasAttribute(s)&&(i=e.getAttribute(s));const n="dompurify"+(i?"#"+i:"");try{return t.createPolicy(n,{createHTML(l){return l},createScriptURL(l){return l}})}catch{return console.warn("TrustedTypes policy "+n+" could not be created."),null}},_createHooksMap=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},_resolveSetOption=function(t,e,i,s){return objectHasOwnProperty(t,e)&&arrayIsArray(t[e])?addToSet(s.base?clone(s.base):{},t[e],s.transform):i},_resolveObjectOption=function(t,e,i){const s=objectHasOwnProperty(t,e)?t[e]:void 0;return s&&typeof s=="object"?clone(s):i()};function createDOMPurify(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:getGlobal();const t=S=>createDOMPurify(S);if(t.version="3.4.15",t.removed=[],!o||!o.document||o.document.nodeType!==NODE_TYPE.document||!o.Element)return t.isSupported=!1,t;let e=o.document;const i=e,s=i.currentScript;o.DocumentFragment;const n=o.HTMLTemplateElement,l=o.Node,d=o.Element,r=o.NodeFilter,h=o.NamedNodeMap;h===void 0&&(o.NamedNodeMap||o.MozNamedAttrMap),o.HTMLFormElement;const p=o.DOMParser,E=o.trustedTypes,R=d.prototype,nt=lookupGetter(R,"cloneNode"),N=lookupGetter(R,"remove"),L=lookupGetter(R,"removeAttributeNode"),Q=lookupGetter(R,"nextSibling"),A=lookupGetter(R,"childNodes"),H=lookupGetter(R,"parentNode"),Ht=lookupGetter(R,"shadowRoot"),vt=lookupGetter(R,"attributes"),F=l&&l.prototype?lookupGetter(l.prototype,"nodeType"):null,$=l&&l.prototype?lookupGetter(l.prototype,"nodeName"):null,ct=l&&l.prototype?lookupGetter(l.prototype,"ownerDocument"):null,tt=function(c){return F?F(c):c.nodeType},It=function(c){return $?$(c):c.nodeName};if(typeof n=="function"){const S=e.createElement("template");S.content&&S.content.ownerDocument&&(e=S.content.ownerDocument)}let k,P="",yt,Ft=!1,et=0;const Pt=function(){if(et>0)throw typeErrorCreate('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},G=function(c){Pt(),et++;try{return k.createHTML(c)}finally{et--}},we=function(c){Pt(),et++;try{return k.createScriptURL(c)}finally{et--}},ve=function(){return Ft||(yt=_createTrustedTypesPolicy(E,s),Ft=!0),yt},lt=e,bt=lt.implementation,Ut=lt.createNodeIterator,Ie=lt.createDocumentFragment,ye=lt.getElementsByTagName,be=i.importNode;let w=_createHooksMap();t.isSupported=typeof entries=="function"&&typeof H=="function"&&bt&&bt.createHTMLDocument!==void 0;const Ee=MUSTACHE_EXPR,Re=ERB_EXPR,Te=TMPLIT_EXPR,ke=DATA_ATTR,Ce=ARIA_ATTR,_e=IS_SCRIPT_OR_DATA,jt=ATTR_WHITESPACE,Ae=CUSTOM_ELEMENT;let Wt=IS_ALLOWED_URI,v=null;const Et=addToSet({},[...html$1,...svg$1,...svgFilters,...mathMl$1,...text]);let I=null;const Rt=addToSet({},[...html,...svg,...mathMl,...xml]);let M=Object.seal(create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ot=null,$t=null;const O=Object.seal(create(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Gt=!0,Tt=!0,Vt=!1,Yt=!0,q=!1,U=!0,j=!1,kt=!1,rt=null,dt=null,Ct=!1,V=!1,ht=!1,at=!1,Xt=!0,Kt=!1;const Zt="user-content-";let _t=!0,At=!1,Y={},X=null;const Jt=addToSet({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Qt=null;const te=addToSet({},["audio","video","img","source","image","track"]);let ee=null;const oe=addToSet({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),pt="http://www.w3.org/1998/Math/MathML",gt="http://www.w3.org/2000/svg",B="http://www.w3.org/1999/xhtml";let K=B,Lt=!1,Mt=null;const Le=addToSet({},[pt,gt,B],stringToString),ie=freeze(["mi","mo","mn","ms","mtext"]);let Bt=addToSet({},ie);const se=freeze(["annotation-xml"]);let Dt=addToSet({},se);const Me=addToSet({},["title","style","font","a","script"]);let it=null;const Be=["application/xhtml+xml","text/html"],De="text/html";let b=null,Z=null;const Ne=e.createElement("form"),ne=function(c){return c instanceof RegExp||c instanceof Function},Nt=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(Z&&Z===c)return;(!c||typeof c!="object")&&(c={}),c=clone(c),it=Be.indexOf(c.PARSER_MEDIA_TYPE)===-1?De:c.PARSER_MEDIA_TYPE,b=it==="application/xhtml+xml"?stringToString:stringToLowerCase,v=_resolveSetOption(c,"ALLOWED_TAGS",Et,{transform:b}),I=_resolveSetOption(c,"ALLOWED_ATTR",Rt,{transform:b}),Mt=_resolveSetOption(c,"ALLOWED_NAMESPACES",Le,{transform:stringToString}),ee=_resolveSetOption(c,"ADD_URI_SAFE_ATTR",oe,{transform:b,base:oe}),Qt=_resolveSetOption(c,"ADD_DATA_URI_TAGS",te,{transform:b,base:te}),X=_resolveSetOption(c,"FORBID_CONTENTS",Jt,{transform:b}),ot=_resolveSetOption(c,"FORBID_TAGS",clone({}),{transform:b}),$t=_resolveSetOption(c,"FORBID_ATTR",clone({}),{transform:b}),Y=objectHasOwnProperty(c,"USE_PROFILES")?c.USE_PROFILES&&typeof c.USE_PROFILES=="object"?clone(c.USE_PROFILES):c.USE_PROFILES:!1,Gt=c.ALLOW_ARIA_ATTR!==!1,Tt=c.ALLOW_DATA_ATTR!==!1,Vt=c.ALLOW_UNKNOWN_PROTOCOLS||!1,Yt=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,q=c.SAFE_FOR_TEMPLATES||!1,U=c.SAFE_FOR_XML!==!1,j=c.WHOLE_DOCUMENT||!1,V=c.RETURN_DOM||!1,ht=c.RETURN_DOM_FRAGMENT||!1,at=c.RETURN_TRUSTED_TYPE||!1,Ct=c.FORCE_BODY||!1,Xt=c.SANITIZE_DOM!==!1,Kt=c.SANITIZE_NAMED_PROPS||!1,_t=c.KEEP_CONTENT!==!1,At=c.IN_PLACE||!1,Wt=isRegex(c.ALLOWED_URI_REGEXP)?c.ALLOWED_URI_REGEXP:IS_ALLOWED_URI,K=typeof c.NAMESPACE=="string"?c.NAMESPACE:B,Bt=_resolveObjectOption(c,"MATHML_TEXT_INTEGRATION_POINTS",()=>addToSet({},ie)),Dt=_resolveObjectOption(c,"HTML_INTEGRATION_POINTS",()=>addToSet({},se));const a=_resolveObjectOption(c,"CUSTOM_ELEMENT_HANDLING",()=>create(null));if(M=create(null),objectHasOwnProperty(a,"tagNameCheck")&&ne(a.tagNameCheck)&&(M.tagNameCheck=a.tagNameCheck),objectHasOwnProperty(a,"attributeNameCheck")&&ne(a.attributeNameCheck)&&(M.attributeNameCheck=a.attributeNameCheck),objectHasOwnProperty(a,"allowCustomizedBuiltInElements")&&typeof a.allowCustomizedBuiltInElements=="boolean"&&(M.allowCustomizedBuiltInElements=a.allowCustomizedBuiltInElements),seal(M),q&&(Tt=!1),ht&&(V=!0),Y&&(v=addToSet({},text),I=create(null),Y.html===!0&&(addToSet(v,html$1),addToSet(I,html)),Y.svg===!0&&(addToSet(v,svg$1),addToSet(I,svg),addToSet(I,xml)),Y.svgFilters===!0&&(addToSet(v,svgFilters),addToSet(I,svg),addToSet(I,xml)),Y.mathMl===!0&&(addToSet(v,mathMl$1),addToSet(I,mathMl),addToSet(I,xml))),O.tagCheck=null,O.attributeCheck=null,objectHasOwnProperty(c,"ADD_TAGS")&&(typeof c.ADD_TAGS=="function"?O.tagCheck=c.ADD_TAGS:arrayIsArray(c.ADD_TAGS)&&(v===Et&&(v=clone(v)),addToSet(v,c.ADD_TAGS,b))),objectHasOwnProperty(c,"ADD_ATTR")&&(typeof c.ADD_ATTR=="function"?O.attributeCheck=c.ADD_ATTR:arrayIsArray(c.ADD_ATTR)&&(I===Rt&&(I=clone(I)),addToSet(I,c.ADD_ATTR,b))),objectHasOwnProperty(c,"ADD_FORBID_CONTENTS")&&arrayIsArray(c.ADD_FORBID_CONTENTS)&&(X===Jt&&(X=clone(X)),addToSet(X,c.ADD_FORBID_CONTENTS,b)),_t&&(v["#text"]=!0),j&&addToSet(v,["html","head","body"]),v.table&&(addToSet(v,["tbody"]),delete ot.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const g=k;k=c.TRUSTED_TYPES_POLICY;try{P=G("")}catch(u){throw k=g,u}}else c.TRUSTED_TYPES_POLICY===null?(k=void 0,P=""):(k===void 0&&(k=ve()),k&&typeof P=="string"&&(P=G("")));freeze&&freeze(c),Z=c},ce=addToSet({},[...svg$1,...svgFilters,...svgDisallowed]),le=addToSet({},[...mathMl$1,...mathMlDisallowed]),Oe=function(c,a,g){return a.namespaceURI===B?c==="svg":a.namespaceURI===pt?c==="svg"&&(g==="annotation-xml"||Bt[g]):!!ce[c]},qe=function(c,a,g){return a.namespaceURI===B?c==="math":a.namespaceURI===gt?c==="math"&&Dt[g]:!!le[c]},ze=function(c,a,g){return a.namespaceURI===gt&&!Dt[g]||a.namespaceURI===pt&&!Bt[g]?!1:!le[c]&&(Me[c]||!ce[c])},He=function(c){let a=H(c);(!a||!a.tagName)&&(a={namespaceURI:K,tagName:"template"});const g=stringToLowerCase(c.tagName),u=stringToLowerCase(a.tagName);return Mt[c.namespaceURI]?c.namespaceURI===gt?Oe(g,a,u):c.namespaceURI===pt?qe(g,a,u):c.namespaceURI===B?ze(g,a,u):!!(it==="application/xhtml+xml"&&Mt[c.namespaceURI]):!1},z=function(c){arrayPush(t.removed,{element:c});try{H(c).removeChild(c)}catch{if(N(c),!H(c))throw typeErrorCreate("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},re=function(c,a,g){try{L(c,a)}catch{try{c.removeAttribute(g)}catch{}}},St=function(c){ut(c);const a=A(c);if(a){const u=[];arrayForEach(a,x=>{arrayPush(u,x)}),arrayForEach(u,x=>{try{N(x)}catch{}})}const g=vt(c);if(g)for(let u=g.length-1;u>=0;--u){const x=g[u],m=x&&x.name;typeof m=="string"&&re(c,x,m)}},W=function(c,a,g){if(!g)try{g=a.getAttributeNode(c)}catch{g=null}arrayPush(t.removed,{attribute:g||null,from:a});try{g?L(a,g):a.removeAttribute(c)}catch{try{a.removeAttribute(c)}catch{}}if(c==="is")if(V||ht)try{z(a)}catch{}else try{a.setAttribute(c,"")}catch{}},Fe=function(c){const a=vt(c);if(a)for(let g=a.length-1;g>=0;--g){const u=a[g],x=u&&u.name;typeof x!="string"||I[b(x)]||re(c,u,x)}},ut=function(c){const a=[c];for(;a.length>0;){const g=a.pop();tt(g)===NODE_TYPE.element&&Fe(g);const x=A(g);if(x)for(let m=x.length-1;m>=0;--m)a.push(x[m])}},de=function(c,a){return U?c==="patchsrc"?!0:c==="for"&&a!=="label"&&a!=="output":!1},Pe=function(c){if(!U)return;const a=[c];for(;a.length>0;){const g=a.pop(),u=tt(g);if(u===NODE_TYPE.processingInstruction||u===NODE_TYPE.comment&&regExpTest(COMMENT_MARKUP_PROBE,g.data)){try{N(g)}catch{}continue}if(u===NODE_TYPE.element){const m=g,f=b(It(g));try{m.hasAttribute&&m.hasAttribute("patchsrc")&&m.removeAttribute("patchsrc"),m.hasAttribute&&m.hasAttribute("for")&&de("for",f)&&m.removeAttribute("for")}catch{}}const x=A(g);if(x)for(let m=x.length-1;m>=0;--m)a.push(x[m])}},he=function(c){let a=null,g=null;if(Ct)c="<remove></remove>"+c;else{const m=stringMatch(c,/^[\r\n\t ]+/);g=m&&m[0]}it==="application/xhtml+xml"&&K===B&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");const u=k?G(c):c;if(K===B)try{a=new p().parseFromString(u,it)}catch{}if(!a||!a.documentElement){a=bt.createDocument(K,"template",null);try{a.documentElement.innerHTML=Lt?P:u}catch{}}const x=a.body||a.documentElement;return c&&g&&x.insertBefore(e.createTextNode(g),x.childNodes[0]||null),K===B?ye.call(a,j?"html":"body")[0]:j?a.documentElement:x},ae=function(c){const a=ct?ct(c):c.ownerDocument;return Ut.call(a||c,c,r.SHOW_ELEMENT|r.SHOW_COMMENT|r.SHOW_TEXT|r.SHOW_PROCESSING_INSTRUCTION|r.SHOW_CDATA_SECTION,null)},xt=function(c){return c=stringReplace(c,Ee," "),c=stringReplace(c,Re," "),c=stringReplace(c,Te," "),c},Ot=function(c){var a;c.normalize();const g=ct?ct(c):c.ownerDocument,u=Ut.call(g||c,c,r.SHOW_TEXT|r.SHOW_COMMENT|r.SHOW_CDATA_SECTION|r.SHOW_PROCESSING_INSTRUCTION,null);let x=u.nextNode();for(;x;)x.data=xt(x.data),x=u.nextNode();const m=(a=c.querySelectorAll)===null||a===void 0?void 0:a.call(c,"template");m&&arrayForEach(m,f=>{J(f.content)&&Ot(f.content)})},mt=function(c){const a=$?$(c):null;return typeof a!="string"||b(a)!=="form"?!1:typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||c.attributes!==vt(c)||typeof c.removeAttribute!="function"||typeof c.removeAttributeNode!="function"||typeof c.getAttributeNode!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function"||c.nodeType!==F(c)||c.childNodes!==A(c)},J=function(c){if(!F||typeof c!="object"||c===null)return!1;try{return F(c)===NODE_TYPE.documentFragment}catch{return!1}},st=function(c){if(!F||typeof c!="object"||c===null)return!1;try{return typeof F(c)=="number"}catch{return!1}};function D(S,c,a){S.length!==0&&arrayForEach(S,g=>{g.call(t,c,a,Z)})}const Ue=function(c,a){return!!(U&&c.hasChildNodes()&&!st(c.firstElementChild)&&regExpTest(ELEMENT_MARKUP_PROBE,c.textContent)&&regExpTest(ELEMENT_MARKUP_PROBE,c.innerHTML)||U&&c.namespaceURI===B&&LITERAL_TEXT_ELEMENTS[a]&&(st(c.firstElementChild)||typeof c.textContent=="string"&&regExpTest(LITERAL_TEXT_CLOSE[a],c.textContent))||c.nodeType===NODE_TYPE.processingInstruction||U&&c.nodeType===NODE_TYPE.comment&&regExpTest(COMMENT_MARKUP_PROBE,c.data))},ft=function(c,a){if(c instanceof RegExp)return regExpTest(c,a);if(c instanceof Function){for(var g=arguments.length,u=new Array(g>2?g-2:0),x=2;x<g;x++)u[x-2]=arguments[x];return!!c(a,...u)}return!1},je=function(c,a,g){if(!ot[a]&&xe(a)&&ft(M.tagNameCheck,a))return!1;if(_t&&!X[a]){const u=H(c),x=A(c);if(x&&u){const m=x.length;for(let f=m-1;f>=0;--f){const y=c===g?nt(x[f],!0):x[f];u.insertBefore(y,Q(c))}}}return z(c),!0},pe=function(c,a,g,u){return c.length===0?a:a===g||a===u?clone(a):a},ge=function(c,a){return c===a||H(c)!==null?!1:(At&&ut(c),!0)},Se=function(c,a){if(D(w.beforeSanitizeElements,c,null),ge(c,a))return!0;if(mt(c))return z(c),!0;const g=b(It(c));if(v=pe(w.uponSanitizeElement,v,Et,rt),D(w.uponSanitizeElement,c,{tagName:g,allowedTags:v}),ge(c,a))return!0;if(Ue(c,g))return z(c),!0;if(ot[g]||!(O.tagCheck instanceof Function&&O.tagCheck(g))&&!v[g]){const x=je(c,g,a);return x===!1&&D(w.afterSanitizeElements,c,null),x}if(tt(c)===NODE_TYPE.element&&!He(c)||(g==="noscript"||g==="noembed"||g==="noframes")&&regExpTest(FALLBACK_TAG_CLOSE,c.innerHTML))return z(c),!0;if(q&&c.nodeType===NODE_TYPE.text){const x=xt(c.textContent);c.textContent!==x&&(arrayPush(t.removed,{element:c.cloneNode()}),c.textContent=x)}return D(w.afterSanitizeElements,c,null),!1},ue=function(c,a,g){if($t[a]||de(a,c)||Xt&&(a==="id"||a==="name")&&(g in e||g in Ne))return!1;const u=I[a]||O.attributeCheck instanceof Function&&O.attributeCheck(a,c);return Tt&&regExpTest(ke,a)||Gt&&regExpTest(Ce,a)?!0:u?ee[a]||regExpTest(Wt,stringReplace(g,jt,""))||(a==="src"||a==="xlink:href"||a==="href")&&c!=="script"&&stringIndexOf(g,"data:")===0&&Qt[c]||Vt&&!regExpTest(_e,stringReplace(g,jt,""))?!0:!g:xe(c)&&ft(M.tagNameCheck,c)&&ft(M.attributeNameCheck,a,c)||a==="is"&&M.allowCustomizedBuiltInElements&&ft(M.tagNameCheck,g)},We=addToSet({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),xe=function(c){return!We[stringToLowerCase(c)]&&regExpTest(Ae,c)},$e=function(c,a,g,u){if(k&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!g)switch(E.getAttributeType(c,a)){case"TrustedHTML":return G(u);case"TrustedScriptURL":return we(u)}return u},Ge=function(c,a,g,u){try{return g?c.setAttributeNS(g,a,u):c.setAttribute(a,u),mt(c)?(z(c),!1):!0}catch{return W(a,c),!1}},me=function(c){D(w.beforeSanitizeAttributes,c,null);const a=c.attributes;if(!a||mt(c))return;I=pe(w.uponSanitizeAttribute,I,Rt,dt);const g={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:I,forceKeepAttr:void 0};let u=a.length;const x=b(c.nodeName);for(;u--;){const m=a[u],f=m.name,y=m.namespaceURI,C=m.value,_=b(f),zt=C;let T=f==="value"?zt:stringTrim(zt),fe=!1;if(g.attrName=_,g.attrValue=T,g.keepAttr=!0,g.forceKeepAttr=void 0,D(w.uponSanitizeAttribute,c,g),T=g.attrValue,Kt&&(_==="id"||_==="name")&&stringIndexOf(T,Zt)!==0&&(W(f,c,m),T=Zt+T,fe=!0),U&&regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,T)){W(f,c,m);continue}if(_==="attributename"&&stringMatch(T,"href")){W(f,c,m);continue}if(!g.forceKeepAttr){if(!g.keepAttr){W(f,c,m);continue}if(!Yt&&regExpTest(SELF_CLOSING_TAG,T)){W(f,c,m);continue}if(q&&(T=xt(T)),!ue(x,_,T)){W(f,c,m);continue}T=$e(x,_,y,T),T!==zt&&Ge(c,f,y,T)&&fe&&arrayPop(t.removed)}}D(w.afterSanitizeAttributes,c,null)},wt=function(c){let a=null;const g=ae(c);for(D(w.beforeSanitizeShadowDOM,c,null);a=g.nextNode();)if(D(w.uponSanitizeShadowNode,a,null),Se(a,c),me(a),J(a.content)&&wt(a.content),tt(a)===NODE_TYPE.element){const u=Ht(a);J(u)&&(qt(u),wt(u))}D(w.afterSanitizeShadowDOM,c,null)},qt=function(c){const a=[{node:c,shadow:null}];for(;a.length>0;){const g=a.pop();if(g.shadow){wt(g.shadow);continue}const u=g.node,m=tt(u)===NODE_TYPE.element,f=A(u);if(f)for(let y=f.length-1;y>=0;--y)a.push({node:f[y],shadow:null});if(m){const y=$?$(u):null;if(typeof y=="string"&&b(y)==="template"){const C=u.content;J(C)&&a.push({node:C,shadow:null})}}if(m){const y=Ht(u);J(y)&&a.push({node:null,shadow:y},{node:y,shadow:null})}}};return t.sanitize=function(S){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=null,g=null,u=null,x=null;if(Lt=!S,Lt&&(S="<!-->"),typeof S!="string"&&!st(S)&&(S=stringifyValue(S),typeof S!="string"))throw typeErrorCreate("dirty is not a string, aborting");if(!t.isSupported)return S;kt?(v=rt,I=dt):Nt(c),(w.uponSanitizeElement.length>0||w.uponSanitizeAttribute.length>0)&&(v=clone(v)),w.uponSanitizeAttribute.length>0&&(I=clone(I)),t.removed=[];const m=At&&typeof S!="string"&&st(S);if(m){Pe(S);const C=It(S);if(typeof C=="string"){const _=b(C);if(!v[_]||ot[_])throw St(S),typeErrorCreate("root node is forbidden and cannot be sanitized in-place")}if(mt(S))throw St(S),typeErrorCreate("root node is clobbered and cannot be sanitized in-place");try{qt(S)}catch(_){throw St(S),_}}else if(st(S))a=he("<!---->"),g=a.ownerDocument.importNode(S,!0),g.nodeType===NODE_TYPE.element&&g.nodeName==="BODY"||g.nodeName==="HTML"?a=g:a.appendChild(g),qt(a);else{if(!V&&!q&&!j&&S.indexOf("<")===-1)return k&&at?G(S):S;if(a=he(S),!a)return V?null:at?P:""}a&&Ct&&z(a.firstChild);const f=m?S:a;try{const C=ae(f);for(;u=C.nextNode();)Se(u,f),me(u),J(u.content)&&wt(u.content)}catch(C){throw m&&(St(S),arrayForEach(t.removed,_=>{_.element&&ut(_.element)})),C}if(m)return arrayForEach(t.removed,C=>{C.element&&ut(C.element)}),q&&Ot(S),S;if(V){if(q&&Ot(a),ht)for(x=Ie.call(a.ownerDocument);a.firstChild;)x.appendChild(a.firstChild);else x=a;return(I.shadowroot||I.shadowrootmode)&&(x=be.call(i,x,!0)),x}let y=j?a.outerHTML:a.innerHTML;return j&&v["!doctype"]&&a.ownerDocument&&a.ownerDocument.doctype&&a.ownerDocument.doctype.name&&regExpTest(DOCTYPE_NAME,a.ownerDocument.doctype.name)&&(y="<!DOCTYPE "+a.ownerDocument.doctype.name+`>
`+y),q&&(y=xt(y)),k&&at?G(y):y},t.setConfig=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Nt(S),kt=!0,rt=v,dt=I},t.clearConfig=function(){Z=null,kt=!1,rt=null,dt=null,k=yt,P=""},t.isValidAttribute=function(S,c,a){Z||Nt({});const g=b(S),u=b(c);return ue(g,u,a)},t.addHook=function(S,c){typeof c=="function"&&objectHasOwnProperty(w,S)&&arrayPush(w[S],c)},t.removeHook=function(S,c){if(objectHasOwnProperty(w,S)){if(c!==void 0){const a=arrayLastIndexOf(w[S],c);return a===-1?void 0:arraySplice(w[S],a,1)[0]}return arrayPop(w[S])}},t.removeHooks=function(S){objectHasOwnProperty(w,S)&&(w[S]=[])},t.removeAllHooks=function(){w=_createHooksMap()},t}var purify=createDOMPurify(),browser_default=purify,sanitize=purify.sanitize.bind(purify),isSupported=purify.isSupported,addHook=purify.addHook.bind(purify),removeHook=purify.removeHook.bind(purify),removeHooks=purify.removeHooks.bind(purify),removeAllHooks=purify.removeAllHooks.bind(purify),setConfig=purify.setConfig.bind(purify),clearConfig=purify.clearConfig.bind(purify),isValidAttribute=purify.isValidAttribute.bind(purify),version=purify.version,removed=purify.removed,activeSavedRange=null,RichTextEditor=class extends HTMLElement{static get observedAttributes(){return["content","initial-content","on-media-request","on-change","config","class-name","available-classes"]}attributeChangedCallback(o,t,e){const i=this,s=o.replace(/-/g,""),n=new RegExp("^"+s+"$","i");this.componentProps&&(this.componentProps.forEach(l=>{if(n.test(l)){let d=e;if(d==="true")d=!0;else if(d==="false")d=!1;else try{d&&(d.trim().startsWith("{")||d.trim().startsWith("["))&&(d=JSON.parse(d))}catch{}this.props[l]=d}}),this.update())}forceUpdate(o){const t=this;o&&typeof o=="object"&&Object.assign(this.props,o),typeof this.update=="function"&&this.update()}get _rootRef(){return this.__rootRef||this._root.querySelector("[data-ref='RichTextEditor-rootRef']")}set _rootRef(o){this.__rootRef=o}get _editorRef(){return this.__editorRef||this._root.querySelector("[data-ref='RichTextEditor-editorRef']")}set _editorRef(o){this.__editorRef=o}get _root(){return this.shadowRoot||this}constructor(){super();const o=this;this.props||(this.props={}),this.state={mode:"visual",isFullscreen:!1,internalContent:o.props.content||o.props.initialContent||"",getTrustedHttpUrl(t){try{const e=new URL(t,typeof window<"u"?window.location.origin:"http://localhost");return e.protocol!=="http:"&&e.protocol!=="https:"?null:e.toString()}catch{return null}},getHostname(t){try{return new URL(t,typeof window<"u"?window.location.origin:"http://localhost").hostname.toLowerCase()}catch{return""}},isHost(t,e){const i=o.state.getHostname(t);return i===e||i.endsWith("."+e)},escapeHtml(t){return String(t??"").split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;").split("'").join("&#39;")},sanitizeHtml(t){return browser_default.sanitize(t,{ADD_TAGS:["iframe","video","audio","source"],ADD_ATTR:["allow","allowfullscreen","frameborder","scrolling","target","contenteditable","data-platform","data-url","data-widget","data-formula","controls","playsinline","autoplay","muted","loop"]})},showTableModal:!1,tableRows:"3",tableCols:"3",tableHasHeader:!0,showLinkModal:!1,linkUrl:"",showWidgetModal:!1,selectedWidget:"banner",showSocialModal:!1,socialUrl:"",socialPlatform:"x",showButtonModal:!1,btnText:"Click Here",btnUrl:"",btnStyle:"primary",selectedMediaEl:null,resizeHandleTop:0,resizeHandleLeft:0,isResizing:!1,resizeStartX:0,resizeStartWidth:0,fontFamily:"Inter",fontSize:"16px",textColor:"#0f172a",highlightColor:"#fde047",appliedClasses:["cv-callout","variant-blue"],showInsertMenu:!1,showAiModal:!1,aiAction:"improve",aiInput:"",activeFormats:{bold:!1,italic:!1,underline:!1,strikeThrough:!1,justifyLeft:!1,justifyCenter:!1,justifyRight:!1,justifyFull:!1,quote:!1,code:!1,unorderedList:!1,orderedList:!1,inTable:!1},headingFormat:"P",checkFormats(){if(typeof window<"u"&&typeof document<"u"){let t=!1,e=!1,i=!1;const s=window.getSelection();if(s&&s.rangeCount>0){let l=s.getRangeAt(0).startContainer,d=l&&l.nodeType===1?l:l?l.parentElement:null;if(d){try{const p=window.getComputedStyle(d);if(p&&p.fontSize&&(o.state.fontSize=p.fontSize,o.update()),p&&p.fontFamily){const E=p.fontFamily.split(",")[0].split('"').join("").split("'").join("").trim();E&&(o.state.fontFamily=E,o.update())}}catch{}const r=[];let h=d;for(;h&&h!==o._editorRef;){if(h.className&&typeof h.className=="string"){if(h.className.indexOf("wysiwyg-content")!==-1)break;const p=h.className.split(/\s+/);for(let E=0;E<p.length;E++){const R=p[E];R&&R.indexOf("prose")!==0&&R!=="task-list"&&!r.includes(R)&&r.push(R)}}h=h.parentElement}o.state.appliedClasses=r,o.update()}for(;l&&l.nodeName!=="DIV"&&l.className!=="wysiwyg-content";)l.nodeName==="BLOCKQUOTE"&&(t=!0),(l.nodeName==="PRE"||l.nodeName==="CODE")&&(e=!0),(l.nodeName==="TD"||l.nodeName==="TH")&&(i=!0),l=l.parentNode}o.state.activeFormats={bold:document.queryCommandState("bold"),italic:document.queryCommandState("italic"),underline:document.queryCommandState("underline"),strikeThrough:document.queryCommandState("strikeThrough"),justifyLeft:document.queryCommandState("justifyLeft"),justifyCenter:document.queryCommandState("justifyCenter"),justifyRight:document.queryCommandState("justifyRight"),justifyFull:document.queryCommandState("justifyFull"),unorderedList:document.queryCommandState("insertUnorderedList"),orderedList:document.queryCommandState("insertOrderedList"),quote:t,code:e,inTable:i},o.update();const n=document.queryCommandValue("formatBlock");n&&(n.includes("1")?(o.state.headingFormat="H1",o.update(),o.update()):n.includes("2")?(o.state.headingFormat="H2",o.update(),o.update()):n.includes("3")?(o.state.headingFormat="H3",o.update(),o.update()):n.includes("4")?(o.state.headingFormat="H4",o.update(),o.update()):n.toLowerCase().includes("blockquote")?(o.state.activeFormats.quote=!0,o.state.headingFormat="P",o.update()):n.toLowerCase().includes("pre")?(o.state.activeFormats.code=!0,o.state.headingFormat="P",o.update()):(n.includes("p")||n.includes("div"))&&(o.state.headingFormat="P",o.update(),o.update()))}},saveSelection(){if(typeof window<"u"){const t=window.getSelection();if(t&&t.rangeCount>0){const e=t.getRangeAt(0);if(o._editorRef)try{o._editorRef.contains(e.commonAncestorContainer)&&(activeSavedRange=o.state.escapeAtomicRange(e.cloneRange()))}catch{activeSavedRange=e.cloneRange()}else activeSavedRange=e.cloneRange()}}},restoreSelection(){if(typeof window<"u"&&o._editorRef){try{typeof o._editorRef.focus=="function"&&o._editorRef.focus()}catch{}if(activeSavedRange){const t=window.getSelection();t&&(t.removeAllRanges(),t.addRange(activeSavedRange.cloneRange()))}}},escapeAtomicRange(t){if(!t||!o._editorRef)return t;let e=t.startContainer,i=null;for(;e&&e!==o._editorRef;)e.nodeType===1&&e.getAttribute&&e.getAttribute("contenteditable")==="false"&&(i=e),e=e.parentNode;if(!i)return t;const s=document.createRange();return s.setStartAfter(i),s.collapse(!0),s},insertHtmlAtCursor(t){if(typeof window>"u")return;if(o._editorRef)try{typeof o._editorRef.focus=="function"&&o._editorRef.focus()}catch{}o.state.restoreSelection();const e=window.getSelection();let i=null;if(e&&e.rangeCount>0){const s=e.getRangeAt(0);try{o._editorRef&&o._editorRef.contains(s.commonAncestorContainer)&&(i=s)}catch{}}if(!i&&activeSavedRange)try{o._editorRef&&o._editorRef.contains(activeSavedRange.commonAncestorContainer)&&(i=activeSavedRange)}catch{}if(i=o.state.escapeAtomicRange(i),i&&i.insertNode){i.deleteContents();const s=document.createElement("template");s.innerHTML=t.trim();const n=s.content,l=n.lastChild;if(i.insertNode(n),l&&e){const d=document.createRange();d.setStartAfter(l),d.collapse(!0),e.removeAllRanges(),e.addRange(d),activeSavedRange=d.cloneRange()}}else if(o._editorRef){const s=document.createElement("template");s.innerHTML=t.trim(),o._editorRef.appendChild(s.content);const n=document.createRange();n.selectNodeContents(o._editorRef),n.collapse(!1),e&&(e.removeAllRanges(),e.addRange(n),activeSavedRange=n.cloneRange())}o.state.syncContent(),o.state.checkFormats(),o.state.renderEmbeds()},formatHTML(t){if(!t)return"";let e="",i="";const s="  ";return t.split(/>\s*</).forEach(function(n){n.match(/^\/\w/)&&(i=i.substring(s.length)),e+=i+"<"+n+`>
`,n.match(/^<?\w[^>]*[^\/]$/)&&!n.startsWith("input")&&!n.startsWith("img")&&!n.startsWith("br")&&!n.startsWith("hr")&&(i+=s)}),e.length>3?e.substring(1,e.length-2):t},format(t,e){o.state.restoreSelection(),document.execCommand(t,!1,e),o.state.saveSelection(),o.state.syncContent(),o.state.checkFormats()},applyColor(t,e){e&&(t==="foreColor"?(o.state.textColor=e,o.update()):(o.state.highlightColor=e,o.update()),o.state.restoreSelection(),t==="foreColor"?document.execCommand("foreColor",!1,e):document.execCommand("hiliteColor",!1,e)||document.execCommand("backColor",!1,e),o.state.saveSelection(),o.state.syncContent(),o.state.checkFormats())},formatHeading(t){o.state.restoreSelection(),document.execCommand("formatBlock",!1,t),o.state.headingFormat=t,o.update(),o.state.syncContent(),o.state.checkFormats(),o._editorRef&&o._editorRef.focus()},insertMedia(t){o.state.saveSelection();const e=(i,s)=>{if(!i)return;let n="";if(t==="image"){const l=(i.split("/").pop()||"image").split("?")[0].split(".")[0].replace(/[-_]+/g," ").trim(),d=(s||"").trim()||l||"Image",r=o.state.escapeHtml(d);n=`<img src="${o.state.escapeHtml(i)}" alt="${r}" loading="lazy" decoding="async" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" /><p><br></p>`}else if(t==="video"){const l=i.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/),d=i.match(/vimeo\.com\/(?:video\/)?([0-9]+)/),r=o.state.escapeHtml(i);l?n=`<div class="cv-social-embed" data-platform="youtube" data-url="${r}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded YOUTUBE Video: ${r}]</div><p><br></p>`:d?n=`<div class="cv-social-embed" data-platform="vimeo" data-url="${r}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded VIMEO Video: ${r}]</div><p><br></p>`:n=`<video src="${r}" controls style="max-width: 100%; border-radius: 8px; margin: 16px 0;"></video><p><br></p>`}else t==="audio"&&(n=`<audio src="${o.state.escapeHtml(i)}" controls style="margin: 16px 0;"></audio><p><br></p>`);o.state.insertHtmlAtCursor(n)};if(o.props.onMediaRequest)o.props.onMediaRequest(t).then(i=>{i&&e(i)}).catch(i=>{console.error("Media request failed",i)});else{const i=window.prompt(`Enter ${t} URL:`);if(i&&t==="image"){const s=window.prompt("Describe this image for screen readers and search engines (alt text):","");e(i,s||void 0)}else i&&e(i)}},clearAllFormatting(){document.execCommand("removeFormat",!1,void 0),document.execCommand("formatBlock",!1,"P"),document.execCommand("unlink",!1,void 0),o.state.syncContent(),o.state.checkFormats()},toggleBlock(t){o.state.checkFormats(),(t==="PRE"?o.state.activeFormats.code:o.state.activeFormats.quote)?document.execCommand("formatBlock",!1,"P"):document.execCommand("formatBlock",!1,t),o.state.syncContent(),o.state.checkFormats()},applyClass(t){if(!t)return;const e=window.getSelection();if(e&&e.rangeCount>0){const i=e.getRangeAt(0),s=document.createElement("span");s.className=t,s.appendChild(i.extractContents()),i.insertNode(s),o.state.syncContent()}},openButtonModal(){o.state.saveSelection(),o.state.showButtonModal=!0,o.update(),o.state.btnText="Click Here",o.update(),o.state.btnUrl="",o.update(),o.state.btnStyle="primary",o.update()},closeButtonModal(){o.state.showButtonModal=!1,o.update()},confirmButton(){if(o.state.showButtonModal=!1,o.update(),o.state.btnText){let t="padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; display: inline-block; text-decoration: none; transition: all 0.2s;";o.state.btnStyle==="primary"?t+=" background: var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480)); color: white; border: none; box-shadow: 0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.3));":o.state.btnStyle==="secondary"?t+=" background: var(--cv-color-surface-raised, #1e293b); color: var(--cv-color-text-main, #fff); border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1));":o.state.btnStyle==="outline"&&(t+=" background: transparent; color: var(--cv-color-primary-fill, #245066); border: 2px solid var(--cv-color-primary-fill, #245066);");const i=`<a href="${o.state.escapeHtml(o.state.btnUrl||"#")}" class="cv-btn" style="${t}">${o.state.escapeHtml(o.state.btnText)}</a>&nbsp;`;o.state.insertHtmlAtCursor(i)}},getCanonicalHtml(){if(!o._editorRef)return"";const t=o._editorRef.cloneNode(!0);return t.querySelectorAll(".cv-resizing-selected").forEach(s=>{s.classList.remove("cv-resizing-selected"),s.getAttribute("class")||s.removeAttribute("class")}),t.querySelectorAll('[data-cv-rendered="true"]').forEach(s=>{if(s.removeAttribute("data-cv-rendered"),s.classList.contains("cv-social-embed")){const n=s.getAttribute("data-platform")||"",l=s.getAttribute("data-url")||"";s.textContent=`[Embedded ${n.toUpperCase()} Post: ${l}]`}else s.classList.contains("cv-math-formula")&&(s.textContent=s.getAttribute("data-formula")||"")}),t.innerHTML},renderEmbeds(){if(!o._editorRef||typeof window>"u")return;o._editorRef.querySelectorAll('.cv-social-embed:not([data-cv-rendered="true"])').forEach(i=>{const s=(i.getAttribute("data-platform")||"").toLowerCase(),n=i.getAttribute("data-url")||"";if(!s||!n)return;const l=()=>{const d=i.style.width,r=i.style.maxWidth;i.setAttribute("data-cv-rendered","true"),i.setAttribute("style","margin: 16px 0; padding: 0; border: none; background: transparent; display: flex; justify-content: center;"),d&&(i.style.width=d),r&&(i.style.maxWidth=r)};if(s==="youtube"){const d=n.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/);if(!d||!d[1])return;i.innerHTML="";const r=document.createElement("iframe");r.width="100%",r.height="280",r.src=`https://www.youtube.com/embed/${d[1]}`,r.title="YouTube video player",r.setAttribute("frameborder","0"),r.setAttribute("allowfullscreen",""),r.style.cssText="border-radius: 8px; display: block; max-width: 100%; pointer-events: none;",i.appendChild(r),l()}else if(s==="vimeo"){const d=n.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);if(!d||!d[1])return;i.innerHTML="";const r=document.createElement("iframe");r.width="100%",r.height="280",r.src=`https://player.vimeo.com/video/${d[1]}`,r.title="Vimeo video player",r.setAttribute("frameborder","0"),r.setAttribute("allowfullscreen",""),r.style.cssText="border-radius: 8px; display: block; max-width: 100%; pointer-events: none;",i.appendChild(r),l()}else if(s==="x"||s==="twitter"){i.innerHTML="";const d=document.createElement("blockquote");d.className="twitter-tweet",d.setAttribute("data-theme","dark"),d.style.pointerEvents="none";const r=o.state.getTrustedHttpUrl(n);if(!r)return;const h=document.createElement("a");if(h.href=r,d.appendChild(h),i.appendChild(d),l(),document.getElementById("twitter-wjs"))window.twttr&&window.twttr.widgets.load(i);else{const p=document.createElement("script");p.id="twitter-wjs",p.src="https://platform.twitter.com/widgets.js",p.async=!0,document.body.appendChild(p)}}else if(s==="instagram"){i.innerHTML="";const d=document.createElement("blockquote");if(d.className="instagram-media",d.setAttribute("data-instgrm-permalink",n),d.setAttribute("data-instgrm-version","14"),d.style.pointerEvents="none",i.appendChild(d),l(),document.getElementById("instagram-embed"))window.instgrm&&window.instgrm.Embeds.process();else{const r=document.createElement("script");r.id="instagram-embed",r.src="https://www.instagram.com/embed.js",r.async=!0,document.body.appendChild(r)}}else if(s==="facebook"){i.innerHTML="";const d=document.createElement("div");if(d.className="fb-post",d.setAttribute("data-href",n),d.setAttribute("data-width","500"),d.style.pointerEvents="none",i.appendChild(d),l(),document.getElementById("facebook-jssdk"))window.FB&&window.FB.XFBML.parse(i);else{const r=document.createElement("script");r.id="facebook-jssdk",r.src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0",r.async=!0,r.defer=!0,r.crossOrigin="anonymous",document.body.appendChild(r)}}else if(s==="linkedin"){const d=n.includes("/embed/")?n:n.replace(/\/posts?\//,"/embed/feed/update/"),r=o.state.getTrustedHttpUrl(d);if(!r)return;i.innerHTML="";const h=document.createElement("iframe");h.src=r,h.height="400",h.width="100%",h.setAttribute("frameborder","0"),h.setAttribute("allowfullscreen",""),h.title="Embedded post",h.style.cssText="border-radius: 8px; max-width: 100%; pointer-events: none;",i.appendChild(h),l()}});const e=o._editorRef.querySelectorAll('.cv-math-formula:not([data-cv-rendered="true"])');if(e.length>0){const i=()=>{e.forEach(s=>{const n=s.getAttribute("data-formula")||s.textContent||"";if(!n)return;const l=window.katex;if(l)try{s.innerHTML=browser_default.sanitize(l.renderToString(n,{throwOnError:!1,displayMode:!1}),{USE_PROFILES:{html:!0,mathMl:!0,svg:!0},ADD_TAGS:["semantics","annotation"],ADD_ATTR:["encoding"]}),s.setAttribute("data-cv-rendered","true")}catch{}})};if(window.katex)i();else if(document.getElementById("cv-katex-js")){const s=document.getElementById("cv-katex-js");s&&s.addEventListener("load",i)}else{if(!document.getElementById("cv-katex-css")){const n=document.createElement("link");n.id="cv-katex-css",n.rel="stylesheet",n.href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",document.head.appendChild(n)}const s=document.createElement("script");s.id="cv-katex-js",s.src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",s.async=!0,s.onload=i,document.body.appendChild(s)}}},syncContent(){o._editorRef&&(o.state.internalContent=o.state.getCanonicalHtml(),o.update(),o.props.onChange&&o.props.onChange(o.state.internalContent))},handleInput(){o.state.syncContent()},handleSourceInput(t){o.state.internalContent=t.target.value,o.update(),o.props.onChange&&o.props.onChange(o.state.internalContent),o._editorRef&&(o._editorRef.innerHTML=o.state.sanitizeHtml(o.state.internalContent),o.state.renderEmbeds())},openTableModal(){o.state.saveSelection(),o.state.showTableModal=!0,o.update(),o.state.tableRows="3",o.update(),o.state.tableCols="3",o.update(),o.state.tableHasHeader=!0,o.update()},confirmTable(){o.state.showTableModal=!1,o.update();const t=parseInt(o.state.tableRows,10),e=parseInt(o.state.tableCols,10);if(t>0&&e>0){let i='<table border="1" style="width:100%; border-collapse: collapse; min-width: 50px;">';if(o.state.tableHasHeader){i+='<thead style="background-color: var(--cv-color-hover, rgba(255,255,255,0.05));"><tr>';for(let s=0;s<e;s++)i+='<th scope="col" style="padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);">Header</th>';i+="</tr></thead>"}i+="<tbody>";for(let s=0;s<t;s++){i+="<tr>";for(let n=0;n<e;n++)i+='<td style="padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);">Cell</td>';i+="</tr>"}i+="</tbody></table><p><br></p>",o.state.insertHtmlAtCursor(i)}},closeTableModal(){o.state.showTableModal=!1,o.update()},modifyTable(t){const e=window.getSelection();if(!e||e.rangeCount===0)return;let i=e.getRangeAt(0).startContainer,s=null,n=null,l=null;for(;i&&i.nodeName!=="DIV"&&i.className!=="wysiwyg-content";)(i.nodeName==="TD"||i.nodeName==="TH")&&(s=i),i.nodeName==="TR"&&(n=i),i.nodeName==="TABLE"&&(l=i),i=i.parentNode;if(!l||!n||!s)return;const d=Array.from(n.children).indexOf(s);if(t==="addRow"){const r=document.createElement("tr"),h=n.children.length;for(let p=0;p<h;p++){const E=document.createElement("td");E.style.cssText="padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);",E.innerHTML="Cell",r.appendChild(E)}n.parentNode.insertBefore(r,n.nextSibling)}else if(t==="removeRow")n.parentNode.children.length>1?n.parentNode.removeChild(n):l.parentNode.removeChild(l);else if(t==="addCol")l.querySelectorAll("tr").forEach(h=>{const p=document.createElement(h.parentNode.nodeName==="THEAD"?"th":"td");h.parentNode.nodeName==="THEAD"&&p.setAttribute("scope","col"),p.style.cssText=h.parentNode.nodeName==="THEAD"?"padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);":"padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);",p.innerHTML=h.parentNode.nodeName==="THEAD"?"Header":"Cell";const E=h.children[d];h.insertBefore(p,E?E.nextSibling:null)});else if(t==="removeCol"){const r=l.querySelectorAll("tr");n.children.length>1?r.forEach(h=>{h.children[d]&&h.removeChild(h.children[d])}):l.parentNode.removeChild(l)}o.state.syncContent()},openLinkModal(){o.state.saveSelection(),o.state.showLinkModal=!0,o.update(),o.state.linkUrl="",o.update()},confirmLink(){o.state.showLinkModal=!1,o.update(),o.state.linkUrl&&(o.state.restoreSelection(),document.execCommand("createLink",!1,o.state.linkUrl),o.state.syncContent())},closeLinkModal(){o.state.showLinkModal=!1,o.update()},openWidgetModal(){o.state.saveSelection(),o.state.showWidgetModal=!0,o.update()},confirmWidget(){o.state.showWidgetModal=!1,o.update();let e=`<div class="cv-widget" data-widget="${o.state.escapeHtml(o.state.selectedWidget)}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-primary, #7fc4de); background: var(--cv-color-accent-tint, rgba(127,196,222,0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-link, #7fc4de); font-weight: 600;">[ContentVeda Widget: ${o.state.escapeHtml(o.state.selectedWidget.toUpperCase())}]</div><p><br></p>`;o.state.insertHtmlAtCursor(e)},closeWidgetModal(){o.state.showWidgetModal=!1,o.update()},openSocialModal(){o.state.saveSelection(),o.state.showSocialModal=!0,o.update(),o.state.socialUrl="",o.update(),o.state.socialPlatform="youtube",o.update()},confirmSocial(){if(o.state.showSocialModal=!1,o.update(),o.state.socialUrl){let t=(o.state.socialPlatform||"youtube").toLowerCase();o.state.isHost(o.state.socialUrl,"youtube.com")||o.state.isHost(o.state.socialUrl,"youtu.be")?t="youtube":o.state.isHost(o.state.socialUrl,"vimeo.com")&&(t="vimeo");const e=o.state.escapeHtml(t),i=o.state.escapeHtml(o.state.socialUrl);let s=`<div class="cv-social-embed" data-platform="${e}" data-url="${i}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded ${o.state.escapeHtml(t.toUpperCase())} Post: ${i}]</div><p><br></p>`;o.state.insertHtmlAtCursor(s)}},closeSocialModal(){o.state.showSocialModal=!1,o.update()},toggleMode(){o.state.mode==="visual"?(o.state.syncContent(),o.state.internalContent=o.state.formatHTML(o.state.internalContent),o.update(),o.state.mode="source",o.update()):(o.state.mode="visual",o.update(),o._editorRef&&(o._editorRef.innerHTML=o.state.sanitizeHtml(o.state.internalContent),o.state.renderEmbeds()))},toggleFullScreen(){typeof document<"u"&&(document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():o._rootRef&&o._rootRef.requestFullscreen&&o._rootRef.requestFullscreen().catch(t=>console.warn("Fullscreen denied",t)))},changeFontFamily(t){o.state.fontFamily=t,o.update(),o.state.restoreSelection(),document.execCommand("fontName",!1,t),o.state.syncContent(),o.state.checkFormats()},changeFontSize(t){o.state.fontSize=t,o.update(),o.state.restoreSelection();const e=window.getSelection();if(e&&e.rangeCount>0&&!e.isCollapsed){const i=document.createElement("span");i.style.fontSize=t;const s=e.getRangeAt(0).extractContents();i.appendChild(s),e.getRangeAt(0).insertNode(i),e.removeAllRanges();const n=document.createRange();n.selectNodeContents(i),e.addRange(n),o.state.saveSelection()}else{const i={"12px":"1","14px":"2","16px":"3","18px":"4","20px":"5","24px":"6","32px":"7"};document.execCommand("fontSize",!1,i[t]||"3")}o.state.syncContent(),o.state.checkFormats()},insertChecklist(){o.state.insertHtmlAtCursor('<ul class="task-list" style="list-style: none; padding-left: 0.25rem;"><li style="margin: 4px 0;"><label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span>Task item</span></label></li></ul><p><br></p>')},insertFormula(){o.state.saveSelection();const t=window.prompt("Enter math formula or expression:","E = mc\xB2");if(t){const e=t.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;"),i=`<code class="cv-math-formula" data-formula="${e}" contenteditable="false" style="background: rgba(127,196,222,0.15); color: #0284c7; padding: 2px 8px; border-radius: 6px; font-family: monospace; font-size: 0.9em; border: 1px solid rgba(127,196,222,0.3);">${e}</code>&nbsp;`;o.state.insertHtmlAtCursor(i)}},addClass(t){t&&(o.state.appliedClasses.includes(t)||(o.state.appliedClasses=[...o.state.appliedClasses,t],o.update()))},removeClass(t){o.state.appliedClasses=o.state.appliedClasses.filter(e=>e!==t),o.update(),o._editorRef&&(o._editorRef.querySelectorAll(`.${t}`).forEach(i=>{if(i.classList.remove(t),i.classList.length===0&&i.tagName==="SPAN"){const s=i.parentNode;for(;i.firstChild;)s.insertBefore(i.firstChild,i);s.removeChild(i)}}),o.state.syncContent())},handleClassInputKeyDown(t){if(t.key==="Enter"){t.preventDefault();const e=t.target,i=e.value?e.value.trim():"";i&&(o.state.applyClass(i),o.state.addClass(i),e.value="")}},openAiModal(){o.state.saveSelection(),o.state.showAiModal=!0,o.update(),o.state.aiInput="",o.update()},closeAiModal(){o.state.showAiModal=!1,o.update()},applyAiAction(t){o.state.restoreSelection();const e=window.getSelection(),i=e?e.toString():"";let s="";t==="improve"?i?s=i.trim()+" (enhanced for clarity and conciseness)":s="<p><strong>Executive Summary:</strong> Designed for high-velocity digital engineering squads, this next-generation prose engine pairs strict AST schemas with real-time reactive UI component embedding.</p>":t==="callout"?s=`<div class="cv-callout variant-blue" style="padding: 16px 20px; border-left: 4px solid #0284c7; background: rgba(2, 132, 199, 0.08); border-radius: 0 8px 8px 0; margin: 16px 0;"><strong>AI INSIGHT:</strong> ${i?o.state.escapeHtml(i):"Configure your toolbar modules, slot rules, and custom micro-frontends directly in the inspector panel."}</div><p><br></p>`:t==="summarize"?s=`<p><em>Summary:</em> ${i?o.state.escapeHtml(i.slice(0,100))+"...":"Key takeaways: High performance AST validation, component slot architecture, and real-time schema hydration."}</p>`:t==="grammar"&&(s=i?i.trim():"<p>All grammar and formatting validated.</p>"),s&&(s.startsWith("<")?document.execCommand("insertHTML",!1,s):document.execCommand("insertText",!1,s),o.state.syncContent()),o.state.showAiModal=!1,o.update()},showToolbarOption(t){if(!o.props.config||!o.props.config.toolbar)return!0;let e=t;return t==="alignLeft"&&(e="justifyLeft"),t==="alignCenter"&&(e="justifyCenter"),t==="alignRight"&&(e="justifyRight"),t==="alignJustify"&&(e="justifyFull"),t==="bulletList"&&(e="unorderedList"),t==="numberedList"&&(e="orderedList"),t==="code"?o.props.config.toolbar.includes("code")||o.props.config.toolbar.includes("pre"):o.props.config.toolbar.includes(t)||o.props.config.toolbar.includes(e)},showSeparator(t){const e=[["fullscreen","source","bold","italic","underline","strikeThrough"],["code","quote","clear"],["headings"],["foreColor","backColor"],["alignLeft","justifyLeft","alignCenter","justifyCenter","alignRight","justifyRight"],["image","link","table","unorderedList","orderedList","horizontalRule","video","social"],["insertButton","addWidget"],["save"],["classInput"]],i=e.slice(0,t+1).some(n=>n.some(l=>o.state.showToolbarOption(l))),s=e[t+1]&&e[t+1].some(n=>o.state.showToolbarOption(n));return i&&s},handleFullscreenChange(){typeof document<"u"&&(o.state.isFullscreen=!!document.fullscreenElement,o.update(),o.state.deselectMediaElement())},isResizableTarget(t){if(!t||t.nodeType!==1)return!1;const e=t.tagName;return!!(e==="IMG"||e==="VIDEO"||e==="AUDIO"||t.classList&&(t.classList.contains("cv-social-embed")||t.classList.contains("cv-widget")))},updateResizeHandlePosition(){if(!o.state.selectedMediaEl||!o._editorRef)return;const t=o._editorRef.parentElement;if(!t)return;const e=o.state.selectedMediaEl.getBoundingClientRect(),i=t.getBoundingClientRect();o.state.resizeHandleTop=e.bottom-i.top+t.scrollTop-7,o.update(),o.state.resizeHandleLeft=e.right-i.left+t.scrollLeft-7,o.update()},selectMediaElement(t){o.state.selectedMediaEl&&o.state.selectedMediaEl!==t&&o.state.selectedMediaEl.classList.remove("cv-resizing-selected"),o.state.selectedMediaEl=t,o.update(),t.classList.add("cv-resizing-selected"),o.state.updateResizeHandlePosition()},deselectMediaElement(){o.state.selectedMediaEl&&o.state.selectedMediaEl.classList.remove("cv-resizing-selected"),o.state.selectedMediaEl=null,o.update()},handleEditorClick(t){const e=t.target;o.state.isResizableTarget(e)?o.state.selectMediaElement(e):o.state.deselectMediaElement()},startResize(t){o.state.selectedMediaEl&&(t.preventDefault(),t.stopPropagation(),o.state.isResizing=!0,o.update(),o.state.resizeStartX=t.clientX,o.update(),o.state.resizeStartWidth=o.state.selectedMediaEl.getBoundingClientRect().width,o.update(),typeof document<"u"&&(document.addEventListener("mousemove",o.state.handleResizeMove),document.addEventListener("mouseup",o.state.stopResize)))},handleResizeMove(t){if(!o.state.isResizing||!o.state.selectedMediaEl)return;const e=t.clientX-o.state.resizeStartX;let i=Math.round(o.state.resizeStartWidth+e);const s=80,n=o._editorRef?o._editorRef.clientWidth:2e3;i<s&&(i=s),i>n&&(i=n);const l=o.state.selectedMediaEl;l.style.width=i+"px",l.style.maxWidth="100%",(l.tagName==="IMG"||l.tagName==="VIDEO")&&(l.style.height="auto"),o.state.updateResizeHandlePosition()},stopResize(){o.state.isResizing&&(o.state.isResizing=!1,o.update(),typeof document<"u"&&(document.removeEventListener("mousemove",o.state.handleResizeMove),document.removeEventListener("mouseup",o.state.stopResize)),o.state.syncContent())},handleSelectionChange(){if(typeof window<"u"&&o._editorRef){const t=window.getSelection();let e=!1;try{t&&t.anchorNode&&typeof o._editorRef.contains=="function"&&(e=o._editorRef.contains(t.anchorNode))}catch{}e&&(t&&t.rangeCount>0&&o.state.saveSelection(),o.state.checkFormats())}}},this.props||(this.props={}),this.componentProps=["content","initialContent","onMediaRequest","onChange","config","className","availableClasses"],this.nodesToDestroy=[],this.pendingUpdate=!1,this.onButtonRichTextEditor1Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor1Click=t=>{this.state.format("undo")},this.onButtonRichTextEditor2Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor2Click=t=>{this.state.format("redo")},this.onSelectRichTextEditor1Mousedown=t=>{this.state.saveSelection()},this.onSelectRichTextEditor1Change=t=>{this.state.formatHeading(t.target.value)},this.onSelectRichTextEditor2Mousedown=t=>{this.state.saveSelection()},this.onSelectRichTextEditor2Change=t=>{this.state.restoreSelection(),this.state.changeFontFamily(t.target.value)},this.onSelectRichTextEditor3Mousedown=t=>{this.state.saveSelection()},this.onSelectRichTextEditor3Change=t=>{this.state.restoreSelection(),this.state.changeFontSize(t.target.value)},this.onButtonRichTextEditor3Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor3Click=t=>{this.state.format("bold")},this.onButtonRichTextEditor4Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor4Click=t=>{this.state.format("italic")},this.onButtonRichTextEditor5Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor5Click=t=>{this.state.format("underline")},this.onButtonRichTextEditor6Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor6Click=t=>{this.state.format("strikeThrough")},this.onButtonRichTextEditor7Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor7Click=t=>{this.state.toggleBlock("PRE")},this.onLabelRichTextEditor1Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor1Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor1Input=t=>{this.state.applyColor("foreColor",t.target.value)},this.onInputRichTextEditor1Change=t=>{this.state.applyColor("foreColor",t.target.value)},this.onLabelRichTextEditor2Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor2Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor2Input=t=>{this.state.applyColor("backColor",t.target.value)},this.onInputRichTextEditor2Change=t=>{this.state.applyColor("backColor",t.target.value)},this.onButtonRichTextEditor8Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor8Click=t=>{this.state.format("justifyLeft")},this.onButtonRichTextEditor9Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor9Click=t=>{this.state.format("justifyCenter")},this.onButtonRichTextEditor10Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor10Click=t=>{this.state.format("justifyRight")},this.onButtonRichTextEditor11Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor11Click=t=>{this.state.format("justifyFull")},this.onButtonRichTextEditor12Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor12Click=t=>{this.state.format("insertUnorderedList")},this.onButtonRichTextEditor13Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor13Click=t=>{this.state.format("insertOrderedList")},this.onButtonRichTextEditor14Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor14Click=t=>{this.state.insertChecklist()},this.onButtonRichTextEditor15Click=t=>{this.state.showInsertMenu=!this.state.showInsertMenu,this.update()},this.onButtonRichTextEditor16Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor16Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.openTableModal()},this.onButtonRichTextEditor17Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor17Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.insertMedia("image")},this.onButtonRichTextEditor18Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor18Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.openLinkModal()},this.onButtonRichTextEditor19Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor19Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.insertMedia("video")},this.onButtonRichTextEditor20Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor20Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.openButtonModal()},this.onButtonRichTextEditor21Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor21Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.openSocialModal()},this.onButtonRichTextEditor22Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor22Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.format("insertHorizontalRule")},this.onButtonRichTextEditor23Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor23Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.toggleBlock("BLOCKQUOTE")},this.onButtonRichTextEditor24Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor24Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.clearAllFormatting()},this.onButtonRichTextEditor25Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor25Click=t=>{this.state.openTableModal()},this.onButtonRichTextEditor26Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor26Click=t=>{this.state.modifyTable("addRow")},this.onButtonRichTextEditor27Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor27Click=t=>{this.state.modifyTable("removeRow")},this.onButtonRichTextEditor28Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor28Click=t=>{this.state.modifyTable("addCol")},this.onButtonRichTextEditor29Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor29Click=t=>{this.state.modifyTable("removeCol")},this.onButtonRichTextEditor30Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor30Click=t=>{this.state.insertMedia("image")},this.onButtonRichTextEditor31Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor31Click=t=>{this.state.openLinkModal()},this.onButtonRichTextEditor32Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor32Click=t=>{this.state.insertFormula()},this.onButtonRichTextEditor33Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor33Click=t=>{this.state.openSocialModal()},this.onButtonRichTextEditor34Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor34Click=t=>{this.state.openWidgetModal()},this.onButtonRichTextEditor35Click=t=>{const e=this.getScope(t.currentTarget,"cls");this.state.removeClass(e)},this.onInputRichTextEditor3Keydown=t=>{this.state.handleClassInputKeyDown(t)},this.onButtonRichTextEditor36Click=t=>{this.state.toggleMode()},this.onButtonRichTextEditor37Click=t=>{this.state.toggleFullScreen()},this.onButtonRichTextEditor38Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor38Click=t=>{this.state.syncContent()},this.onDivRichTextEditor4Scroll=t=>{this.state.updateResizeHandlePosition()},this.onDivRichTextEditor5Input=t=>{this.state.handleInput(),this.state.checkFormats()},this.onDivRichTextEditor5Blur=t=>{this.state.handleInput()},this.onDivRichTextEditor5Keyup=t=>{this.state.checkFormats()},this.onDivRichTextEditor5Mouseup=t=>{this.state.checkFormats()},this.onDivRichTextEditor5Click=t=>{this.state.handleEditorClick(t)},this.onDivRichTextEditor6Mousedown=t=>{this.state.startResize(t)},this.onButtonRichTextEditor39Click=t=>{this.state.closeAiModal()},this.onButtonRichTextEditor40Click=t=>{this.state.applyAiAction("improve")},this.onButtonRichTextEditor41Click=t=>{this.state.applyAiAction("callout")},this.onButtonRichTextEditor42Click=t=>{this.state.applyAiAction("summarize")},this.onButtonRichTextEditor43Click=t=>{this.state.applyAiAction("grammar")},this.onButtonRichTextEditor44Click=t=>{this.state.closeAiModal()},this.onSelectRichTextEditor4Change=t=>{this.state.btnStyle=t.target.value,this.update()},this.onInputRichTextEditor4Input=t=>{this.state.btnText=t.target.value,this.update()},this.onInputRichTextEditor5Input=t=>{this.state.btnUrl=t.target.value,this.update()},this.onButtonRichTextEditor45Click=t=>{this.state.closeButtonModal()},this.onButtonRichTextEditor46Click=t=>{this.state.confirmButton()},this.onInputRichTextEditor6Input=t=>{this.state.tableRows=t.target.value,this.update()},this.onInputRichTextEditor7Input=t=>{this.state.tableCols=t.target.value,this.update()},this.onInputRichTextEditor8Change=t=>{this.state.tableHasHeader=t.target.checked,this.update()},this.onButtonRichTextEditor47Click=t=>{this.state.closeTableModal()},this.onButtonRichTextEditor48Click=t=>{this.state.confirmTable()},this.onInputRichTextEditor9Input=t=>{this.state.linkUrl=t.target.value,this.update()},this.onButtonRichTextEditor49Click=t=>{this.state.closeLinkModal()},this.onButtonRichTextEditor50Click=t=>{this.state.confirmLink()},this.onSelectRichTextEditor5Change=t=>{this.state.selectedWidget=t.target.value,this.update()},this.onButtonRichTextEditor51Click=t=>{this.state.closeWidgetModal()},this.onButtonRichTextEditor52Click=t=>{this.state.confirmWidget()},this.onSelectRichTextEditor6Change=t=>{this.state.socialPlatform=t.target.value,this.update()},this.onInputRichTextEditor10Input=t=>{this.state.socialUrl=t.target.value,this.update()},this.onButtonRichTextEditor53Click=t=>{this.state.closeSocialModal()},this.onButtonRichTextEditor54Click=t=>{this.state.confirmSocial()},this.onTextareaRichTextEditor1Input=t=>{this.state.handleSourceInput(t)}}disconnectedCallback(){const o=this;typeof document<"u"&&(document.removeEventListener("fullscreenchange",this.state.handleFullscreenChange),document.removeEventListener("selectionchange",this.state.handleSelectionChange)),this.destroyAnyNodes()}destroyAnyNodes(){const o=this;this.nodesToDestroy.forEach(t=>{t.__persistent||t.remove()}),this.nodesToDestroy=this.nodesToDestroy.filter(t=>t.__persistent)}connectedCallback(){const o=this;this.getAttributeNames().forEach(t=>{const e=t.replace(/-/g,""),i=new RegExp("^"+e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"$","i");this.componentProps.forEach(s=>{if(i.test(s)){let n=this.getAttribute(t);if(n==="true")n=!0;else if(n==="false")n=!1;else try{n&&(n.trim().startsWith("{")||n.trim().startsWith("["))&&(n=JSON.parse(n))}catch{}this.props[s]!==n&&(this.props[s]=n)}})}),this._root.innerHTML=`
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
                      \xD7
                    </button>
                  </div>
                  <div data-el="div-rich-text-editor-8">
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-40"
                    >
                      \u2728 Improve Writing & Polish Flow
                    </button>
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-41"
                    >
                      \u{1F4A1} Generate AI Callout Insight Box
                    </button>
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-42"
                    >
                      \u{1F4DD} Summarize Selected Section
                    </button>
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-43"
                    >
                      \u{1F50D} Fix Grammar & Syntax
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
      </div>`,this.pendingUpdate=!0,this.render(),this.onMount(),this.pendingUpdate=!1,this.update()}showContent(o,t){const e=this;if(t){if(o.__renderedNodes)return;const i=o.content.cloneNode(!0),s=Array.from(i.childNodes);o.__renderedNodes=s,s.forEach(n=>{o?.scope&&(n.scope=o.scope),o?.context&&(n.context=o.context),n.__persistent=!0,this.nodesToDestroy.push(n)}),o.after(i)}else o.__renderedNodes&&(o.__renderedNodes.forEach(i=>{i.remove();const s=this.nodesToDestroy.indexOf(i);s!==-1&&this.nodesToDestroy.splice(s,1)}),o.__renderedNodes=null)}onMount(){const o=this;if(this.state.internalContent||(this.state.internalContent=this.props.content||this.props.initialContent||"",this.update()),o._editorRef&&(o._editorRef.innerHTML=this.state.sanitizeHtml(this.state.internalContent),this.state.renderEmbeds()),typeof document<"u"){const t="cv-editor-styles";if(!document.getElementById(t)){const e=document.createElement("style");e.id=t,e.innerHTML=".wysiwyg-content blockquote { border-left: 4px solid var(--cv-color-quote-accent, #7fc4de) !important; background: linear-gradient(90deg, var(--cv-color-accent-tint, rgba(127, 196, 222, 0.1)) 0%, transparent 100%) !important; padding: 20px 24px !important; margin: 24px 0 !important; border-radius: 0 16px 16px 0 !important; font-style: italic !important; color: var(--cv-color-text-main, #e2e8f0) !important; font-size: 1.1em !important; line-height: 1.8 !important; position: relative; box-shadow: inset 2px 0 0px var(--cv-color-border, rgba(255,255,255,0.1)); } .wysiwyg-content pre { background: var(--cv-color-code-bg, #0f172a) !important; border: 1px solid var(--cv-color-code-border, rgba(255,255,255,0.1)) !important; border-radius: 12px !important; padding: 20px !important; color: var(--cv-color-code-text, #38bdf8) !important; font-family: 'Fira Code', monospace !important; overflow-x: auto !important; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5) !important; } .wysiwyg-content ul { list-style-type: disc !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content ol { list-style-type: decimal !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content li { margin-bottom: 0.5em !important; display: list-item !important; } .wysiwyg-content a:not(.cv-btn) { color: var(--cv-color-link, #7fc4de) !important; text-decoration: underline !important; text-underline-offset: 3px !important; }",document.head.appendChild(e)}document.addEventListener("fullscreenchange",this.state.handleFullscreenChange),document.addEventListener("selectionchange",this.state.handleSelectionChange)}}onUpdate(){const o=this}update(){const o=this;this.pendingUpdate!==!0&&(this.pendingUpdate=!0,this.render(),this.onUpdate(),this.pendingUpdate=!1)}render(){const o=this,t=this.getStateful(this._root),e=this.prepareHydrate(t);if(this.destroyAnyNodes(),this.updateBindings(),e.length){const i=this.getStateful(this._root);this.hydrateDom(e,i)}}getStateful(o){const t=this,e=o.querySelectorAll("[data-dom-state]");return e?Array.from(e):[]}prepareHydrate(o){const t=this;return o.map(e=>({id:e.dataset.domState,value:e.value,active:document.activeElement===e,selectionStart:e.selectionStart}))}hydrateDom(o,t){const e=this;return t.map((i,s)=>{const n=o.find(l=>i.dataset.domState===l.id);n&&n.active&&(i.value=n.value,i.focus(),i.selectionStart=n.selectionStart)})}updateBindings(){const o=this;this._root.querySelectorAll("[data-el='div-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-rich-text-editor flex flex-col rounded-xl overflow-hidden relative ${this.state.isFullscreen?"fixed inset-0 z-[9999] w-screen h-screen rounded-none":"w-full"} ${this.props.className||""}`,__cvAssignStyle(t.style,{boxSizing:"border-box",background:"var(--cv-color-surface-sunken, #0f172a)",border:this.state.isFullscreen?"none":"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",boxShadow:"var(--cv-shadow-overlay, 0 8px 32px rgba(0,0,0,0.4))"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor1Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor1Click),t.addEventListener("click",this.onButtonRichTextEditor1Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor2Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor2Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor2Click),t.addEventListener("click",this.onButtonRichTextEditor2Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("headings");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.headingFormat,t.removeEventListener("mousedown",this.onSelectRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onSelectRichTextEditor1Mousedown),t.removeEventListener("change",this.onSelectRichTextEditor1Change),t.addEventListener("change",this.onSelectRichTextEditor1Change)}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.fontFamily,t.removeEventListener("mousedown",this.onSelectRichTextEditor2Mousedown),t.addEventListener("mousedown",this.onSelectRichTextEditor2Mousedown),t.removeEventListener("change",this.onSelectRichTextEditor2Change),t.addEventListener("change",this.onSelectRichTextEditor2Change)}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.fontSize,t.removeEventListener("mousedown",this.onSelectRichTextEditor3Mousedown),t.addEventListener("mousedown",this.onSelectRichTextEditor3Mousedown),t.removeEventListener("change",this.onSelectRichTextEditor3Change),t.addEventListener("change",this.onSelectRichTextEditor3Change)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("bold");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.bold?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor3Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor3Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor3Click),t.addEventListener("click",this.onButtonRichTextEditor3Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("italic");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.italic?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor4Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor4Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor4Click),t.addEventListener("click",this.onButtonRichTextEditor4Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("underline");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.underline?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor5Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor5Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor5Click),t.addEventListener("click",this.onButtonRichTextEditor5Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("strikeThrough");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.strikeThrough?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor6Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor6Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor6Click),t.addEventListener("click",this.onButtonRichTextEditor6Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("code");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.code?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor7Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor7Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor7Click),t.addEventListener("click",this.onButtonRichTextEditor7Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("foreColor")||this.state.showToolbarOption("backColor");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("foreColor");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onLabelRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onLabelRichTextEditor1Mousedown)}catch{}}),this._root.querySelectorAll("[data-el='span-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{lineHeight:"1"})}catch{}}),this._root.querySelectorAll("[data-el='span-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{backgroundColor:this.state.textColor})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.textColor,t.removeEventListener("mousedown",this.onInputRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onInputRichTextEditor1Mousedown),t.removeEventListener("input",this.onInputRichTextEditor1Input),t.addEventListener("input",this.onInputRichTextEditor1Input),t.removeEventListener("change",this.onInputRichTextEditor1Change),t.addEventListener("change",this.onInputRichTextEditor1Change)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("backColor");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onLabelRichTextEditor2Mousedown),t.addEventListener("mousedown",this.onLabelRichTextEditor2Mousedown)}catch{}}),this._root.querySelectorAll("[data-el='span-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{backgroundColor:this.state.highlightColor})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.highlightColor,t.removeEventListener("mousedown",this.onInputRichTextEditor2Mousedown),t.addEventListener("mousedown",this.onInputRichTextEditor2Mousedown),t.removeEventListener("input",this.onInputRichTextEditor2Input),t.addEventListener("input",this.onInputRichTextEditor2Input),t.removeEventListener("change",this.onInputRichTextEditor2Change),t.addEventListener("change",this.onInputRichTextEditor2Change)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyLeft")||this.state.showToolbarOption("justifyCenter")||this.state.showToolbarOption("justifyRight");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyLeft");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.justifyLeft?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor8Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor8Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor8Click),t.addEventListener("click",this.onButtonRichTextEditor8Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyCenter");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.justifyCenter?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor9Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor9Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor9Click),t.addEventListener("click",this.onButtonRichTextEditor9Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyRight");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.justifyRight?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor10Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor10Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor10Click),t.addEventListener("click",this.onButtonRichTextEditor10Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.justifyFull?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor11Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor11Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor11Click),t.addEventListener("click",this.onButtonRichTextEditor11Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("unorderedList");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.unorderedList?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor12Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor12Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor12Click),t.addEventListener("click",this.onButtonRichTextEditor12Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("orderedList");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.orderedList?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor13Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor13Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor13Click),t.addEventListener("click",this.onButtonRichTextEditor13Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor14Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor14Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor14Click),t.addEventListener("click",this.onButtonRichTextEditor14Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor15Click),t.addEventListener("click",this.onButtonRichTextEditor15Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showInsertMenu;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor16Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor16Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor16Click),t.addEventListener("click",this.onButtonRichTextEditor16Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor17Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor17Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor17Click),t.addEventListener("click",this.onButtonRichTextEditor17Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor18Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor18Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor18Click),t.addEventListener("click",this.onButtonRichTextEditor18Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor19Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor19Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor19Click),t.addEventListener("click",this.onButtonRichTextEditor19Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor20Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor20Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor20Click),t.addEventListener("click",this.onButtonRichTextEditor20Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor21Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor21Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor21Click),t.addEventListener("click",this.onButtonRichTextEditor21Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor22Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor22Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor22Click),t.addEventListener("click",this.onButtonRichTextEditor22Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor23Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor23Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor23Click),t.addEventListener("click",this.onButtonRichTextEditor23Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor24Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor24Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor24Click),t.addEventListener("click",this.onButtonRichTextEditor24Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("table");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor25Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor25Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor25Click),t.addEventListener("click",this.onButtonRichTextEditor25Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.activeFormats.inTable&&this.state.showToolbarOption("table");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor26Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor26Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor26Click),t.addEventListener("click",this.onButtonRichTextEditor26Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor27Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor27Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor27Click),t.addEventListener("click",this.onButtonRichTextEditor27Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor28Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor28Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor28Click),t.addEventListener("click",this.onButtonRichTextEditor28Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor29Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor29Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor29Click),t.addEventListener("click",this.onButtonRichTextEditor29Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("image");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-30']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor30Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor30Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor30Click),t.addEventListener("click",this.onButtonRichTextEditor30Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("link");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-31']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor31Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor31Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor31Click),t.addEventListener("click",this.onButtonRichTextEditor31Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-32']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor32Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor32Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor32Click),t.addEventListener("click",this.onButtonRichTextEditor32Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("social");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-33']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor33Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor33Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor33Click),t.addEventListener("click",this.onButtonRichTextEditor33Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("addWidget");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-34']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor34Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor34Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor34Click),t.addEventListener("click",this.onButtonRichTextEditor34Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("classInput");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='for-rich-text-editor']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null,p=this.state.appliedClasses;this.renderLoop(t,p,"cls")}catch{}}),this._root.querySelectorAll("[data-el='span-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.key=h}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;this.renderTextNode(t,h)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-35']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor35Click),t.addEventListener("click",this.onButtonRichTextEditor35Click),t.setAttribute("title","Remove "+h)}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("keydown",this.onInputRichTextEditor3Keydown),t.addEventListener("keydown",this.onInputRichTextEditor3Keydown)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.props.availableClasses&&this.props.availableClasses.length>0;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='for-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null,p=this.props.availableClasses;this.renderLoop(t,p,"cls")}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.value=h}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;this.renderTextNode(t,h)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("source");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-36']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.mode==="source"?"is-active":""}`,t.removeEventListener("click",this.onButtonRichTextEditor36Click),t.addEventListener("click",this.onButtonRichTextEditor36Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("fullscreen");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-37']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor37Click),t.addEventListener("click",this.onButtonRichTextEditor37Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("save");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-38']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor38Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor38Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor38Click),t.addEventListener("click",this.onButtonRichTextEditor38Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.className=`editor-content flex-1 overflow-y-auto relative min-h-[350px] cv-mode-${this.state.mode}`,t.removeEventListener("scroll",this.onDivRichTextEditor4Scroll),t.addEventListener("scroll",this.onDivRichTextEditor4Scroll),__cvAssignStyle(t.style,{padding:"2rem 3rem",color:"var(--cv-color-text-main, #f1f5f9)",position:"relative"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("input",this.onDivRichTextEditor5Input),t.addEventListener("input",this.onDivRichTextEditor5Input),t.removeEventListener("blur",this.onDivRichTextEditor5Blur),t.addEventListener("blur",this.onDivRichTextEditor5Blur),t.removeEventListener("keyup",this.onDivRichTextEditor5Keyup),t.addEventListener("keyup",this.onDivRichTextEditor5Keyup),t.removeEventListener("mouseup",this.onDivRichTextEditor5Mouseup),t.addEventListener("mouseup",this.onDivRichTextEditor5Mouseup),t.removeEventListener("click",this.onDivRichTextEditor5Click),t.addEventListener("click",this.onDivRichTextEditor5Click),__cvAssignStyle(t.style,{minHeight:"350px",fontFamily:"Inter, sans-serif",lineHeight:"1.7",fontSize:"15px"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.selectedMediaEl;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{position:"absolute",top:`${this.state.resizeHandleTop}px`,left:`${this.state.resizeHandleLeft}px`,width:"14px",height:"14px",borderRadius:"3px",background:"var(--cv-color-primary, #245066)",border:"2px solid var(--cv-color-surface-raised, #fff)",cursor:"nwse-resize",zIndex:30,boxShadow:"0 1px 4px rgba(0,0,0,0.4)"}),t.removeEventListener("mousedown",this.onDivRichTextEditor6Mousedown),t.addEventListener("mousedown",this.onDivRichTextEditor6Mousedown)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showTableModal||this.state.showLinkModal||this.state.showWidgetModal||this.state.showSocialModal||this.state.showButtonModal||this.state.showAiModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"rgba(0, 0, 0, 0.6)"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-30']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showAiModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-39']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor39Click),t.addEventListener("click",this.onButtonRichTextEditor39Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"20px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-40']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor40Click),t.addEventListener("click",this.onButtonRichTextEditor40Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-41']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor41Click),t.addEventListener("click",this.onButtonRichTextEditor41Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-42']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor42Click),t.addEventListener("click",this.onButtonRichTextEditor42Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-43']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor43Click),t.addEventListener("click",this.onButtonRichTextEditor43Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"10px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-44']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"8px 16px",fontSize:"13px",color:"#cbd5e1",background:"rgba(255,255,255,0.05)",border:"none",borderRadius:"6px",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor44Click),t.addEventListener("click",this.onButtonRichTextEditor44Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-31']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showButtonModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-primary, #7fc4de)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none"}),t.value=this.state.btnStyle,t.removeEventListener("change",this.onSelectRichTextEditor4Change),t.addEventListener("change",this.onSelectRichTextEditor4Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.btnText,t.removeEventListener("input",this.onInputRichTextEditor4Input),t.addEventListener("input",this.onInputRichTextEditor4Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.btnUrl,t.removeEventListener("input",this.onInputRichTextEditor5Input),t.addEventListener("input",this.onInputRichTextEditor5Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-45']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor45Click),t.addEventListener("click",this.onButtonRichTextEditor45Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-46']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.2))"}),t.removeEventListener("click",this.onButtonRichTextEditor46Click),t.addEventListener("click",this.onButtonRichTextEditor46Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-32']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showTableModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"340px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-link, #7fc4de)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",gap:"16px",marginBottom:"20px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{flex:1,display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px",width:"100%",fontSize:"15px",color:"var(--cv-color-text-main, #fff)",outline:"none",textAlign:"center",boxSizing:"border-box"}),t.value=this.state.tableRows,t.removeEventListener("input",this.onInputRichTextEditor6Input),t.addEventListener("input",this.onInputRichTextEditor6Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{flex:1,display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px",width:"100%",fontSize:"15px",color:"var(--cv-color-text-main, #fff)",outline:"none",textAlign:"center",boxSizing:"border-box"}),t.value=this.state.tableCols,t.removeEventListener("input",this.onInputRichTextEditor7Input),t.addEventListener("input",this.onInputRichTextEditor7Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",alignItems:"center",gap:"10px",marginBottom:"28px"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{width:"18px",height:"18px",borderRadius:"4px",cursor:"pointer",accentColor:"var(--cv-color-link, #7fc4de)"}),t.setAttribute("checked",this.state.tableHasHeader),t.removeEventListener("change",this.onInputRichTextEditor8Change),t.addEventListener("change",this.onInputRichTextEditor8Change)}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",cursor:"pointer",userSelect:"none"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-47']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor47Click),t.addEventListener("click",this.onButtonRichTextEditor47Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-48']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor48Click),t.addEventListener("click",this.onButtonRichTextEditor48Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-33']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showLinkModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-link, #7fc4de)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.linkUrl,t.removeEventListener("input",this.onInputRichTextEditor9Input),t.addEventListener("input",this.onInputRichTextEditor9Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-49']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor49Click),t.addEventListener("click",this.onButtonRichTextEditor49Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-50']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-color-info-fill, #075985)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor50Click),t.addEventListener("click",this.onButtonRichTextEditor50Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-34']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showWidgetModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-secondary, #5eb3d6)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.selectedWidget,t.removeEventListener("change",this.onSelectRichTextEditor5Change),t.addEventListener("change",this.onSelectRichTextEditor5Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-51']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor51Click),t.addEventListener("click",this.onButtonRichTextEditor51Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-52']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor52Click),t.addEventListener("click",this.onButtonRichTextEditor52Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-35']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showSocialModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-info, #0ea5e9)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-30']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.socialPlatform,t.removeEventListener("change",this.onSelectRichTextEditor6Change),t.addEventListener("change",this.onSelectRichTextEditor6Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-31']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.socialUrl,t.removeEventListener("input",this.onInputRichTextEditor10Input),t.addEventListener("input",this.onInputRichTextEditor10Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-32']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-53']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor53Click),t.addEventListener("click",this.onButtonRichTextEditor53Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-54']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-color-info-fill, #075985)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor54Click),t.addEventListener("click",this.onButtonRichTextEditor54Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-33']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.className=`editor-source flex-1 relative min-h-[350px] overflow-hidden cv-mode-src-${this.state.mode}`,__cvAssignStyle(t.style,{flexDirection:"column",height:"100%",minHeight:"350px"})}catch{}}),this._root.querySelectorAll("[data-el='textarea-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,r=this.getScope?this.getScope(t,"item"):null,h=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.internalContent,t.removeEventListener("input",this.onTextareaRichTextEditor1Input),t.addEventListener("input",this.onTextareaRichTextEditor1Input),__cvAssignStyle(t.style,{whiteSpace:"pre-wrap",overflowY:"auto",resize:"none",height:"100%",width:"100%",boxSizing:"border-box"}),t.setAttribute("spellcheck",!1)}catch{}})}renderTextNode(o,t){const e=this,i=document.createTextNode(t);o?.scope&&(i.scope=o.scope),o?.context&&(i.context=o.context),o.after(i),this.nodesToDestroy.push(o.nextSibling)}getScope(o,t){const e=this;do{let i=o?.scope?.[t];if(i!==void 0)return i}while(o=o.parentNode)}renderLoop(o,t,e,i,s){const n=this;if(t||(t=[]),o.__renderedArray&&o.__renderedArray.length===t.length&&t.every((h,p)=>o.__renderedArray[p]===h))return;o.__renderedNodes&&o.__renderedNodes.forEach(h=>{h.remove();const p=this.nodesToDestroy.indexOf(h);p!==-1&&this.nodesToDestroy.splice(p,1)});const d=[],r=[];for(let[h,p]of t.entries()){const E=o.content.cloneNode(!0),R=Array.from(E.childNodes),nt={};let N=nt;if(o?.scope){const L={get(Q,A,H){return A in Q?Q[A]:A in o.scope?o.scope[A]:Q[A]}};N=new Proxy(nt,L)}R.forEach(L=>{e!==void 0&&(N[e]=p),i!==void 0&&(N[i]=h),s!==void 0&&(N[s]=t),L.scope=N,o.context&&(L.context=o.context),L.__persistent=!0,this.nodesToDestroy.push(L),d.unshift(L),r.push(L)})}d.forEach(h=>o.after(h)),o.__renderedArray=[...t],o.__renderedNodes=r}};customElements.define("cv-rich-text-editor",RichTextEditor);function __cvAssignStyle(o,t){if(!o||!t)return o;for(const e in t){const i=t[e];e.charCodeAt(0)===45&&e.charCodeAt(1)===45?i===""||i===null||i===void 0?o.removeProperty(e):o.setProperty(e,String(i)):o[e]=i}return o}/*! Bundled license information:

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.4.15 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.15/LICENSE *)
*/
