function _arrayLikeToArray(o,t){(t==null||t>o.length)&&(t=o.length);for(var e=0,i=Array(t);e<t;e++)i[e]=o[e];return i}function _arrayWithHoles(o){if(Array.isArray(o))return o}function _iterableToArrayLimit(o,t){var e=o==null?null:typeof Symbol<"u"&&o[Symbol.iterator]||o["@@iterator"];if(e!=null){var i,s,n,c,h=[],d=!0,r=!1;try{if(n=(e=e.call(o)).next,t!==0)for(;!(d=(i=n.call(e)).done)&&(h.push(i.value),h.length!==t);d=!0);}catch(p){r=!0,s=p}finally{try{if(!d&&e.return!=null&&(c=e.return(),Object(c)!==c))return}finally{if(r)throw s}}return h}}function _nonIterableRest(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function _slicedToArray(o,t){return _arrayWithHoles(o)||_iterableToArrayLimit(o,t)||_unsupportedIterableToArray(o,t)||_nonIterableRest()}function _unsupportedIterableToArray(o,t){if(o){if(typeof o=="string")return _arrayLikeToArray(o,t);var e={}.toString.call(o).slice(8,-1);return e==="Object"&&o.constructor&&(e=o.constructor.name),e==="Map"||e==="Set"?Array.from(o):e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?_arrayLikeToArray(o,t):void 0}}var entries=Object.entries,setPrototypeOf=Object.setPrototypeOf,isFrozen=Object.isFrozen,getPrototypeOf=Object.getPrototypeOf,getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor,freeze=Object.freeze,seal=Object.seal,create=Object.create,_ref=typeof Reflect<"u"&&Reflect,apply=_ref.apply,construct=_ref.construct;freeze||(freeze=function(t){return t}),seal||(seal=function(t){return t}),apply||(apply=function(t,e){for(var i=arguments.length,s=new Array(i>2?i-2:0),n=2;n<i;n++)s[n-2]=arguments[n];return t.apply(e,s)}),construct||(construct=function(t){for(var e=arguments.length,i=new Array(e>1?e-1:0),s=1;s<e;s++)i[s-1]=arguments[s];return new t(...i)});var arrayForEach=unapply(Array.prototype.forEach),arrayLastIndexOf=unapply(Array.prototype.lastIndexOf),arrayPop=unapply(Array.prototype.pop),arrayPush=unapply(Array.prototype.push),arraySplice=unapply(Array.prototype.splice),arrayIsArray=Array.isArray,stringToLowerCase=unapply(String.prototype.toLowerCase),stringToString=unapply(String.prototype.toString),stringMatch=unapply(String.prototype.match),stringReplace=unapply(String.prototype.replace),stringIndexOf=unapply(String.prototype.indexOf),stringTrim=unapply(String.prototype.trim),numberToString=unapply(Number.prototype.toString),booleanToString=unapply(Boolean.prototype.toString),bigintToString=typeof BigInt>"u"?null:unapply(BigInt.prototype.toString),symbolToString=typeof Symbol>"u"?null:unapply(Symbol.prototype.toString),objectHasOwnProperty=unapply(Object.prototype.hasOwnProperty),objectToString=unapply(Object.prototype.toString),regExpTest=unapply(RegExp.prototype.test),typeErrorCreate=unconstruct(TypeError);function unapply(o){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var e=arguments.length,i=new Array(e>1?e-1:0),s=1;s<e;s++)i[s-1]=arguments[s];return apply(o,t,i)}}function unconstruct(o){return function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return construct(o,e)}}function addToSet(o,t){let e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:stringToLowerCase;if(setPrototypeOf&&setPrototypeOf(o,null),!arrayIsArray(t))return o;let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const n=e(s);n!==s&&(isFrozen(t)||(t[i]=n),s=n)}o[s]=!0}return o}function cleanArray(o){for(let t=0;t<o.length;t++)objectHasOwnProperty(o,t)||(o[t]=null);return o}function clone(o){const t=create(null);for(const i of entries(o)){var e=_slicedToArray(i,2);const s=e[0],n=e[1];objectHasOwnProperty(o,s)&&(arrayIsArray(n)?t[s]=cleanArray(n):n&&typeof n=="object"&&n.constructor===Object?t[s]=clone(n):t[s]=n)}return t}function stringifyValue(o){switch(typeof o){case"string":return o;case"number":return numberToString(o);case"boolean":return booleanToString(o);case"bigint":return bigintToString?bigintToString(o):"0";case"symbol":return symbolToString?symbolToString(o):"Symbol()";case"undefined":return objectToString(o);case"function":case"object":{if(o===null)return objectToString(o);const t=o,e=lookupGetter(t,"toString");if(typeof e=="function"){const i=e(t);return typeof i=="string"?i:objectToString(i)}return objectToString(o)}default:return objectToString(o)}}function lookupGetter(o,t){for(;o!==null;){const i=getOwnPropertyDescriptor(o,t);if(i){if(i.get)return unapply(i.get);if(typeof i.value=="function")return unapply(i.value)}o=getPrototypeOf(o)}function e(){return null}return e}function isRegex(o){try{return regExpTest(o,""),!0}catch{return!1}}var html$1=freeze(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),svg$1=freeze(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),svgFilters=freeze(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),svgDisallowed=freeze(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),mathMl$1=freeze(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),mathMlDisallowed=freeze(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),text=freeze(["#text"]),html=freeze(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),svg=freeze(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),mathMl=freeze(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),xml=freeze(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),MUSTACHE_EXPR=seal(/{{[\w\W]*|^[\w\W]*}}/g),ERB_EXPR=seal(/<%[\w\W]*|^[\w\W]*%>/g),TMPLIT_EXPR=seal(/\${[\w\W]*/g),DATA_ATTR=seal(/^data-[\-\w.\u00B7-\uFFFF]+$/),ARIA_ATTR=seal(/^aria-[\-\w]+$/),IS_ALLOWED_URI=seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),IS_SCRIPT_OR_DATA=seal(/^(?:\w+script|data):/i),ATTR_WHITESPACE=seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),DOCTYPE_NAME=seal(/^html$/i),CUSTOM_ELEMENT=seal(/^[a-z][.\w]*(-[.\w]+)+$/i),ELEMENT_MARKUP_PROBE=seal(/<[/\w!]/g),COMMENT_MARKUP_PROBE=seal(/<[/\w]/g),FALLBACK_TAG_CLOSE=seal(/<\/no(script|embed|frames)/i),SELF_CLOSING_TAG=seal(/\/>/i),NODE_TYPE={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},LITERAL_TEXT_ELEMENT_NAMES=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],LITERAL_TEXT_ELEMENTS=freeze(addToSet({},LITERAL_TEXT_ELEMENT_NAMES)),LITERAL_TEXT_CLOSE=(function(){const o={};return arrayForEach(LITERAL_TEXT_ELEMENT_NAMES,t=>{o[t]=seal(new RegExp("</"+t+"(?=[\\t\\n\\f\\r />])","i"))}),freeze(o)})(),getGlobal=function(){return typeof window>"u"?null:window},_createTrustedTypesPolicy=function(t,e){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";e&&e.hasAttribute(s)&&(i=e.getAttribute(s));const n="dompurify"+(i?"#"+i:"");try{return t.createPolicy(n,{createHTML(c){return c},createScriptURL(c){return c}})}catch{return console.warn("TrustedTypes policy "+n+" could not be created."),null}},_createHooksMap=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},_resolveSetOption=function(t,e,i,s){return objectHasOwnProperty(t,e)&&arrayIsArray(t[e])?addToSet(s.base?clone(s.base):{},t[e],s.transform):i},_resolveObjectOption=function(t,e,i){const s=objectHasOwnProperty(t,e)?t[e]:void 0;return s&&typeof s=="object"?clone(s):i()};function createDOMPurify(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:getGlobal();const t=u=>createDOMPurify(u);if(t.version="3.4.15",t.removed=[],!o||!o.document||o.document.nodeType!==NODE_TYPE.document||!o.Element)return t.isSupported=!1,t;let e=o.document;const i=e,s=i.currentScript;o.DocumentFragment;const n=o.HTMLTemplateElement,c=o.Node,h=o.Element,d=o.NodeFilter,r=o.NamedNodeMap;r===void 0&&(o.NamedNodeMap||o.MozNamedAttrMap),o.HTMLFormElement;const p=o.DOMParser,w=o.trustedTypes,R=h.prototype,nt=lookupGetter(R,"cloneNode"),N=lookupGetter(R,"remove"),_=lookupGetter(R,"removeAttributeNode"),Q=lookupGetter(R,"nextSibling"),L=lookupGetter(R,"childNodes"),H=lookupGetter(R,"parentNode"),Ht=lookupGetter(R,"shadowRoot"),vt=lookupGetter(R,"attributes"),F=c&&c.prototype?lookupGetter(c.prototype,"nodeType"):null,$=c&&c.prototype?lookupGetter(c.prototype,"nodeName"):null,ct=c&&c.prototype?lookupGetter(c.prototype,"ownerDocument"):null,tt=function(l){return F?F(l):l.nodeType},It=function(l){return $?$(l):l.nodeName};if(typeof n=="function"){const u=e.createElement("template");u.content&&u.content.ownerDocument&&(e=u.content.ownerDocument)}let k,P="",Et,Ft=!1,et=0;const Pt=function(){if(et>0)throw typeErrorCreate('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},G=function(l){Pt(),et++;try{return k.createHTML(l)}finally{et--}},we=function(l){Pt(),et++;try{return k.createScriptURL(l)}finally{et--}},ve=function(){return Ft||(Et=_createTrustedTypesPolicy(w,s),Ft=!0),Et},lt=e,yt=lt.implementation,Ut=lt.createNodeIterator,Ie=lt.createDocumentFragment,Ee=lt.getElementsByTagName,ye=i.importNode;let v=_createHooksMap();t.isSupported=typeof entries=="function"&&typeof H=="function"&&yt&&yt.createHTMLDocument!==void 0;const be=MUSTACHE_EXPR,Re=ERB_EXPR,Te=TMPLIT_EXPR,ke=DATA_ATTR,Ce=ARIA_ATTR,Ae=IS_SCRIPT_OR_DATA,jt=ATTR_WHITESPACE,Le=CUSTOM_ELEMENT;let Wt=IS_ALLOWED_URI,I=null;const bt=addToSet({},[...html$1,...svg$1,...svgFilters,...mathMl$1,...text]);let E=null;const Rt=addToSet({},[...html,...svg,...mathMl,...xml]);let M=Object.seal(create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ot=null,$t=null;const O=Object.seal(create(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Gt=!0,Tt=!0,Vt=!1,Yt=!0,q=!1,U=!0,j=!1,kt=!1,rt=null,dt=null,Ct=!1,V=!1,ht=!1,at=!1,Kt=!0,Xt=!1;const Zt="user-content-";let At=!0,Lt=!1,Y={},K=null;const Jt=addToSet({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Qt=null;const te=addToSet({},["audio","video","img","source","image","track"]);let ee=null;const oe=addToSet({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),pt="http://www.w3.org/1998/Math/MathML",gt="http://www.w3.org/2000/svg",B="http://www.w3.org/1999/xhtml";let X=B,_t=!1,Mt=null;const _e=addToSet({},[pt,gt,B],stringToString),ie=freeze(["mi","mo","mn","ms","mtext"]);let Bt=addToSet({},ie);const se=freeze(["annotation-xml"]);let Dt=addToSet({},se);const Me=addToSet({},["title","style","font","a","script"]);let it=null;const Be=["application/xhtml+xml","text/html"],De="text/html";let b=null,Z=null;const Ne=e.createElement("form"),ne=function(l){return l instanceof RegExp||l instanceof Function},Nt=function(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(Z&&Z===l)return;(!l||typeof l!="object")&&(l={}),l=clone(l),it=Be.indexOf(l.PARSER_MEDIA_TYPE)===-1?De:l.PARSER_MEDIA_TYPE,b=it==="application/xhtml+xml"?stringToString:stringToLowerCase,I=_resolveSetOption(l,"ALLOWED_TAGS",bt,{transform:b}),E=_resolveSetOption(l,"ALLOWED_ATTR",Rt,{transform:b}),Mt=_resolveSetOption(l,"ALLOWED_NAMESPACES",_e,{transform:stringToString}),ee=_resolveSetOption(l,"ADD_URI_SAFE_ATTR",oe,{transform:b,base:oe}),Qt=_resolveSetOption(l,"ADD_DATA_URI_TAGS",te,{transform:b,base:te}),K=_resolveSetOption(l,"FORBID_CONTENTS",Jt,{transform:b}),ot=_resolveSetOption(l,"FORBID_TAGS",clone({}),{transform:b}),$t=_resolveSetOption(l,"FORBID_ATTR",clone({}),{transform:b}),Y=objectHasOwnProperty(l,"USE_PROFILES")?l.USE_PROFILES&&typeof l.USE_PROFILES=="object"?clone(l.USE_PROFILES):l.USE_PROFILES:!1,Gt=l.ALLOW_ARIA_ATTR!==!1,Tt=l.ALLOW_DATA_ATTR!==!1,Vt=l.ALLOW_UNKNOWN_PROTOCOLS||!1,Yt=l.ALLOW_SELF_CLOSE_IN_ATTR!==!1,q=l.SAFE_FOR_TEMPLATES||!1,U=l.SAFE_FOR_XML!==!1,j=l.WHOLE_DOCUMENT||!1,V=l.RETURN_DOM||!1,ht=l.RETURN_DOM_FRAGMENT||!1,at=l.RETURN_TRUSTED_TYPE||!1,Ct=l.FORCE_BODY||!1,Kt=l.SANITIZE_DOM!==!1,Xt=l.SANITIZE_NAMED_PROPS||!1,At=l.KEEP_CONTENT!==!1,Lt=l.IN_PLACE||!1,Wt=isRegex(l.ALLOWED_URI_REGEXP)?l.ALLOWED_URI_REGEXP:IS_ALLOWED_URI,X=typeof l.NAMESPACE=="string"?l.NAMESPACE:B,Bt=_resolveObjectOption(l,"MATHML_TEXT_INTEGRATION_POINTS",()=>addToSet({},ie)),Dt=_resolveObjectOption(l,"HTML_INTEGRATION_POINTS",()=>addToSet({},se));const a=_resolveObjectOption(l,"CUSTOM_ELEMENT_HANDLING",()=>create(null));if(M=create(null),objectHasOwnProperty(a,"tagNameCheck")&&ne(a.tagNameCheck)&&(M.tagNameCheck=a.tagNameCheck),objectHasOwnProperty(a,"attributeNameCheck")&&ne(a.attributeNameCheck)&&(M.attributeNameCheck=a.attributeNameCheck),objectHasOwnProperty(a,"allowCustomizedBuiltInElements")&&typeof a.allowCustomizedBuiltInElements=="boolean"&&(M.allowCustomizedBuiltInElements=a.allowCustomizedBuiltInElements),seal(M),q&&(Tt=!1),ht&&(V=!0),Y&&(I=addToSet({},text),E=create(null),Y.html===!0&&(addToSet(I,html$1),addToSet(E,html)),Y.svg===!0&&(addToSet(I,svg$1),addToSet(E,svg),addToSet(E,xml)),Y.svgFilters===!0&&(addToSet(I,svgFilters),addToSet(E,svg),addToSet(E,xml)),Y.mathMl===!0&&(addToSet(I,mathMl$1),addToSet(E,mathMl),addToSet(E,xml))),O.tagCheck=null,O.attributeCheck=null,objectHasOwnProperty(l,"ADD_TAGS")&&(typeof l.ADD_TAGS=="function"?O.tagCheck=l.ADD_TAGS:arrayIsArray(l.ADD_TAGS)&&(I===bt&&(I=clone(I)),addToSet(I,l.ADD_TAGS,b))),objectHasOwnProperty(l,"ADD_ATTR")&&(typeof l.ADD_ATTR=="function"?O.attributeCheck=l.ADD_ATTR:arrayIsArray(l.ADD_ATTR)&&(E===Rt&&(E=clone(E)),addToSet(E,l.ADD_ATTR,b))),objectHasOwnProperty(l,"ADD_FORBID_CONTENTS")&&arrayIsArray(l.ADD_FORBID_CONTENTS)&&(K===Jt&&(K=clone(K)),addToSet(K,l.ADD_FORBID_CONTENTS,b)),At&&(I["#text"]=!0),j&&addToSet(I,["html","head","body"]),I.table&&(addToSet(I,["tbody"]),delete ot.tbody),l.TRUSTED_TYPES_POLICY){if(typeof l.TRUSTED_TYPES_POLICY.createHTML!="function")throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof l.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const g=k;k=l.TRUSTED_TYPES_POLICY;try{P=G("")}catch(S){throw k=g,S}}else l.TRUSTED_TYPES_POLICY===null?(k=void 0,P=""):(k===void 0&&(k=ve()),k&&typeof P=="string"&&(P=G("")));freeze&&freeze(l),Z=l},ce=addToSet({},[...svg$1,...svgFilters,...svgDisallowed]),le=addToSet({},[...mathMl$1,...mathMlDisallowed]),Oe=function(l,a,g){return a.namespaceURI===B?l==="svg":a.namespaceURI===pt?l==="svg"&&(g==="annotation-xml"||Bt[g]):!!ce[l]},qe=function(l,a,g){return a.namespaceURI===B?l==="math":a.namespaceURI===gt?l==="math"&&Dt[g]:!!le[l]},ze=function(l,a,g){return a.namespaceURI===gt&&!Dt[g]||a.namespaceURI===pt&&!Bt[g]?!1:!le[l]&&(Me[l]||!ce[l])},He=function(l){let a=H(l);(!a||!a.tagName)&&(a={namespaceURI:X,tagName:"template"});const g=stringToLowerCase(l.tagName),S=stringToLowerCase(a.tagName);return Mt[l.namespaceURI]?l.namespaceURI===gt?Oe(g,a,S):l.namespaceURI===pt?qe(g,a,S):l.namespaceURI===B?ze(g,a,S):!!(it==="application/xhtml+xml"&&Mt[l.namespaceURI]):!1},z=function(l){arrayPush(t.removed,{element:l});try{H(l).removeChild(l)}catch{if(N(l),!H(l))throw typeErrorCreate("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},re=function(l,a,g){try{_(l,a)}catch{try{l.removeAttribute(g)}catch{}}},ut=function(l){St(l);const a=L(l);if(a){const S=[];arrayForEach(a,x=>{arrayPush(S,x)}),arrayForEach(S,x=>{try{N(x)}catch{}})}const g=vt(l);if(g)for(let S=g.length-1;S>=0;--S){const x=g[S],m=x&&x.name;typeof m=="string"&&re(l,x,m)}},W=function(l,a,g){if(!g)try{g=a.getAttributeNode(l)}catch{g=null}arrayPush(t.removed,{attribute:g||null,from:a});try{g?_(a,g):a.removeAttribute(l)}catch{try{a.removeAttribute(l)}catch{}}if(l==="is")if(V||ht)try{z(a)}catch{}else try{a.setAttribute(l,"")}catch{}},Fe=function(l){const a=vt(l);if(a)for(let g=a.length-1;g>=0;--g){const S=a[g],x=S&&S.name;typeof x!="string"||E[b(x)]||re(l,S,x)}},St=function(l){const a=[l];for(;a.length>0;){const g=a.pop();tt(g)===NODE_TYPE.element&&Fe(g);const x=L(g);if(x)for(let m=x.length-1;m>=0;--m)a.push(x[m])}},de=function(l,a){return U?l==="patchsrc"?!0:l==="for"&&a!=="label"&&a!=="output":!1},Pe=function(l){if(!U)return;const a=[l];for(;a.length>0;){const g=a.pop(),S=tt(g);if(S===NODE_TYPE.processingInstruction||S===NODE_TYPE.comment&&regExpTest(COMMENT_MARKUP_PROBE,g.data)){try{N(g)}catch{}continue}if(S===NODE_TYPE.element){const m=g,f=b(It(g));try{m.hasAttribute&&m.hasAttribute("patchsrc")&&m.removeAttribute("patchsrc"),m.hasAttribute&&m.hasAttribute("for")&&de("for",f)&&m.removeAttribute("for")}catch{}}const x=L(g);if(x)for(let m=x.length-1;m>=0;--m)a.push(x[m])}},he=function(l){let a=null,g=null;if(Ct)l="<remove></remove>"+l;else{const m=stringMatch(l,/^[\r\n\t ]+/);g=m&&m[0]}it==="application/xhtml+xml"&&X===B&&(l='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+l+"</body></html>");const S=k?G(l):l;if(X===B)try{a=new p().parseFromString(S,it)}catch{}if(!a||!a.documentElement){a=yt.createDocument(X,"template",null);try{a.documentElement.innerHTML=_t?P:S}catch{}}const x=a.body||a.documentElement;return l&&g&&x.insertBefore(e.createTextNode(g),x.childNodes[0]||null),X===B?Ee.call(a,j?"html":"body")[0]:j?a.documentElement:x},ae=function(l){const a=ct?ct(l):l.ownerDocument;return Ut.call(a||l,l,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},xt=function(l){return l=stringReplace(l,be," "),l=stringReplace(l,Re," "),l=stringReplace(l,Te," "),l},Ot=function(l){var a;l.normalize();const g=ct?ct(l):l.ownerDocument,S=Ut.call(g||l,l,d.SHOW_TEXT|d.SHOW_COMMENT|d.SHOW_CDATA_SECTION|d.SHOW_PROCESSING_INSTRUCTION,null);let x=S.nextNode();for(;x;)x.data=xt(x.data),x=S.nextNode();const m=(a=l.querySelectorAll)===null||a===void 0?void 0:a.call(l,"template");m&&arrayForEach(m,f=>{J(f.content)&&Ot(f.content)})},mt=function(l){const a=$?$(l):null;return typeof a!="string"||b(a)!=="form"?!1:typeof l.nodeName!="string"||typeof l.textContent!="string"||typeof l.removeChild!="function"||l.attributes!==vt(l)||typeof l.removeAttribute!="function"||typeof l.removeAttributeNode!="function"||typeof l.getAttributeNode!="function"||typeof l.setAttribute!="function"||typeof l.namespaceURI!="string"||typeof l.insertBefore!="function"||typeof l.hasChildNodes!="function"||l.nodeType!==F(l)||l.childNodes!==L(l)},J=function(l){if(!F||typeof l!="object"||l===null)return!1;try{return F(l)===NODE_TYPE.documentFragment}catch{return!1}},st=function(l){if(!F||typeof l!="object"||l===null)return!1;try{return typeof F(l)=="number"}catch{return!1}};function D(u,l,a){u.length!==0&&arrayForEach(u,g=>{g.call(t,l,a,Z)})}const Ue=function(l,a){return!!(U&&l.hasChildNodes()&&!st(l.firstElementChild)&&regExpTest(ELEMENT_MARKUP_PROBE,l.textContent)&&regExpTest(ELEMENT_MARKUP_PROBE,l.innerHTML)||U&&l.namespaceURI===B&&LITERAL_TEXT_ELEMENTS[a]&&(st(l.firstElementChild)||typeof l.textContent=="string"&&regExpTest(LITERAL_TEXT_CLOSE[a],l.textContent))||l.nodeType===NODE_TYPE.processingInstruction||U&&l.nodeType===NODE_TYPE.comment&&regExpTest(COMMENT_MARKUP_PROBE,l.data))},ft=function(l,a){if(l instanceof RegExp)return regExpTest(l,a);if(l instanceof Function){for(var g=arguments.length,S=new Array(g>2?g-2:0),x=2;x<g;x++)S[x-2]=arguments[x];return!!l(a,...S)}return!1},je=function(l,a,g){if(!ot[a]&&xe(a)&&ft(M.tagNameCheck,a))return!1;if(At&&!K[a]){const S=H(l),x=L(l);if(x&&S){const m=x.length;for(let f=m-1;f>=0;--f){const y=l===g?nt(x[f],!0):x[f];S.insertBefore(y,Q(l))}}}return z(l),!0},pe=function(l,a,g,S){return l.length===0?a:a===g||a===S?clone(a):a},ge=function(l,a){return l===a||H(l)!==null?!1:(Lt&&St(l),!0)},ue=function(l,a){if(D(v.beforeSanitizeElements,l,null),ge(l,a))return!0;if(mt(l))return z(l),!0;const g=b(It(l));if(I=pe(v.uponSanitizeElement,I,bt,rt),D(v.uponSanitizeElement,l,{tagName:g,allowedTags:I}),ge(l,a))return!0;if(Ue(l,g))return z(l),!0;if(ot[g]||!(O.tagCheck instanceof Function&&O.tagCheck(g))&&!I[g]){const x=je(l,g,a);return x===!1&&D(v.afterSanitizeElements,l,null),x}if(tt(l)===NODE_TYPE.element&&!He(l)||(g==="noscript"||g==="noembed"||g==="noframes")&&regExpTest(FALLBACK_TAG_CLOSE,l.innerHTML))return z(l),!0;if(q&&l.nodeType===NODE_TYPE.text){const x=xt(l.textContent);l.textContent!==x&&(arrayPush(t.removed,{element:l.cloneNode()}),l.textContent=x)}return D(v.afterSanitizeElements,l,null),!1},Se=function(l,a,g){if($t[a]||de(a,l)||Kt&&(a==="id"||a==="name")&&(g in e||g in Ne))return!1;const S=E[a]||O.attributeCheck instanceof Function&&O.attributeCheck(a,l);return Tt&&regExpTest(ke,a)||Gt&&regExpTest(Ce,a)?!0:S?ee[a]||regExpTest(Wt,stringReplace(g,jt,""))||(a==="src"||a==="xlink:href"||a==="href")&&l!=="script"&&stringIndexOf(g,"data:")===0&&Qt[l]||Vt&&!regExpTest(Ae,stringReplace(g,jt,""))?!0:!g:xe(l)&&ft(M.tagNameCheck,l)&&ft(M.attributeNameCheck,a,l)||a==="is"&&M.allowCustomizedBuiltInElements&&ft(M.tagNameCheck,g)},We=addToSet({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),xe=function(l){return!We[stringToLowerCase(l)]&&regExpTest(Le,l)},$e=function(l,a,g,S){if(k&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!g)switch(w.getAttributeType(l,a)){case"TrustedHTML":return G(S);case"TrustedScriptURL":return we(S)}return S},Ge=function(l,a,g,S){try{return g?l.setAttributeNS(g,a,S):l.setAttribute(a,S),mt(l)?(z(l),!1):!0}catch{return W(a,l),!1}},me=function(l){D(v.beforeSanitizeAttributes,l,null);const a=l.attributes;if(!a||mt(l))return;E=pe(v.uponSanitizeAttribute,E,Rt,dt);const g={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:E,forceKeepAttr:void 0};let S=a.length;const x=b(l.nodeName);for(;S--;){const m=a[S],f=m.name,y=m.namespaceURI,C=m.value,A=b(f),zt=C;let T=f==="value"?zt:stringTrim(zt),fe=!1;if(g.attrName=A,g.attrValue=T,g.keepAttr=!0,g.forceKeepAttr=void 0,D(v.uponSanitizeAttribute,l,g),T=g.attrValue,Xt&&(A==="id"||A==="name")&&stringIndexOf(T,Zt)!==0&&(W(f,l,m),T=Zt+T,fe=!0),U&&regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,T)){W(f,l,m);continue}if(A==="attributename"&&stringMatch(T,"href")){W(f,l,m);continue}if(!g.forceKeepAttr){if(!g.keepAttr){W(f,l,m);continue}if(!Yt&&regExpTest(SELF_CLOSING_TAG,T)){W(f,l,m);continue}if(q&&(T=xt(T)),!Se(x,A,T)){W(f,l,m);continue}T=$e(x,A,y,T),T!==zt&&Ge(l,f,y,T)&&fe&&arrayPop(t.removed)}}D(v.afterSanitizeAttributes,l,null)},wt=function(l){let a=null;const g=ae(l);for(D(v.beforeSanitizeShadowDOM,l,null);a=g.nextNode();)if(D(v.uponSanitizeShadowNode,a,null),ue(a,l),me(a),J(a.content)&&wt(a.content),tt(a)===NODE_TYPE.element){const S=Ht(a);J(S)&&(qt(S),wt(S))}D(v.afterSanitizeShadowDOM,l,null)},qt=function(l){const a=[{node:l,shadow:null}];for(;a.length>0;){const g=a.pop();if(g.shadow){wt(g.shadow);continue}const S=g.node,m=tt(S)===NODE_TYPE.element,f=L(S);if(f)for(let y=f.length-1;y>=0;--y)a.push({node:f[y],shadow:null});if(m){const y=$?$(S):null;if(typeof y=="string"&&b(y)==="template"){const C=S.content;J(C)&&a.push({node:C,shadow:null})}}if(m){const y=Ht(S);J(y)&&a.push({node:null,shadow:y},{node:y,shadow:null})}}};return t.sanitize=function(u){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=null,g=null,S=null,x=null;if(_t=!u,_t&&(u="<!-->"),typeof u!="string"&&!st(u)&&(u=stringifyValue(u),typeof u!="string"))throw typeErrorCreate("dirty is not a string, aborting");if(!t.isSupported)return u;kt?(I=rt,E=dt):Nt(l),(v.uponSanitizeElement.length>0||v.uponSanitizeAttribute.length>0)&&(I=clone(I)),v.uponSanitizeAttribute.length>0&&(E=clone(E)),t.removed=[];const m=Lt&&typeof u!="string"&&st(u);if(m){Pe(u);const C=It(u);if(typeof C=="string"){const A=b(C);if(!I[A]||ot[A])throw ut(u),typeErrorCreate("root node is forbidden and cannot be sanitized in-place")}if(mt(u))throw ut(u),typeErrorCreate("root node is clobbered and cannot be sanitized in-place");try{qt(u)}catch(A){throw ut(u),A}}else if(st(u))a=he("<!---->"),g=a.ownerDocument.importNode(u,!0),g.nodeType===NODE_TYPE.element&&g.nodeName==="BODY"||g.nodeName==="HTML"?a=g:a.appendChild(g),qt(a);else{if(!V&&!q&&!j&&u.indexOf("<")===-1)return k&&at?G(u):u;if(a=he(u),!a)return V?null:at?P:""}a&&Ct&&z(a.firstChild);const f=m?u:a;try{const C=ae(f);for(;S=C.nextNode();)ue(S,f),me(S),J(S.content)&&wt(S.content)}catch(C){throw m&&(ut(u),arrayForEach(t.removed,A=>{A.element&&St(A.element)})),C}if(m)return arrayForEach(t.removed,C=>{C.element&&St(C.element)}),q&&Ot(u),u;if(V){if(q&&Ot(a),ht)for(x=Ie.call(a.ownerDocument);a.firstChild;)x.appendChild(a.firstChild);else x=a;return(E.shadowroot||E.shadowrootmode)&&(x=ye.call(i,x,!0)),x}let y=j?a.outerHTML:a.innerHTML;return j&&I["!doctype"]&&a.ownerDocument&&a.ownerDocument.doctype&&a.ownerDocument.doctype.name&&regExpTest(DOCTYPE_NAME,a.ownerDocument.doctype.name)&&(y="<!DOCTYPE "+a.ownerDocument.doctype.name+`>
`+y),q&&(y=xt(y)),k&&at?G(y):y},t.setConfig=function(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Nt(u),kt=!0,rt=I,dt=E},t.clearConfig=function(){Z=null,kt=!1,rt=null,dt=null,k=Et,P=""},t.isValidAttribute=function(u,l,a){Z||Nt({});const g=b(u),S=b(l);return Se(g,S,a)},t.addHook=function(u,l){typeof l=="function"&&objectHasOwnProperty(v,u)&&arrayPush(v[u],l)},t.removeHook=function(u,l){if(objectHasOwnProperty(v,u)){if(l!==void 0){const a=arrayLastIndexOf(v[u],l);return a===-1?void 0:arraySplice(v[u],a,1)[0]}return arrayPop(v[u])}},t.removeHooks=function(u){objectHasOwnProperty(v,u)&&(v[u]=[])},t.removeAllHooks=function(){v=_createHooksMap()},t}var purify=createDOMPurify(),browser_default=purify,sanitize=purify.sanitize.bind(purify),isSupported=purify.isSupported,addHook=purify.addHook.bind(purify),removeHook=purify.removeHook.bind(purify),removeHooks=purify.removeHooks.bind(purify),removeAllHooks=purify.removeAllHooks.bind(purify),setConfig=purify.setConfig.bind(purify),clearConfig=purify.clearConfig.bind(purify),isValidAttribute=purify.isValidAttribute.bind(purify),version=purify.version,removed=purify.removed,activeSavedRange=null,RichTextEditor=class extends HTMLElement{static get observedAttributes(){return["content","initial-content","on-media-request","on-change","config","read-only","disabled","class-name","available-classes"]}attributeChangedCallback(o,t,e){const i=this,s=o.replace(/-/g,""),n=new RegExp("^"+s+"$","i");this.componentProps&&(this.componentProps.forEach(c=>{if(n.test(c)){let h=e;if(h==="true")h=!0;else if(h==="false")h=!1;else try{h&&(h.trim().startsWith("{")||h.trim().startsWith("["))&&(h=JSON.parse(h))}catch{}this.props[c]=h}}),this.update())}forceUpdate(o){const t=this;o&&typeof o=="object"&&Object.assign(this.props,o),typeof this.update=="function"&&this.update()}get _rootRef(){return this.__rootRef||this._root.querySelector("[data-ref='RichTextEditor-rootRef']")}set _rootRef(o){this.__rootRef=o}get _editorRef(){return this.__editorRef||this._root.querySelector("[data-ref='RichTextEditor-editorRef']")}set _editorRef(o){this.__editorRef=o}get _root(){return this.shadowRoot||this}constructor(){super();const o=this;this.props||(this.props={}),this.state={mode:"visual",isFullscreen:!1,isMounted:!1,internalContent:o.props.content||o.props.initialContent||"",getEditorElement(){return typeof window>"u"?null:o._editorRef||(o._rootRef?o._rootRef.querySelector(".wysiwyg-content"):null)},getTrustedHttpUrl(t){try{const e=new URL(t,typeof window<"u"?window.location.origin:"http://localhost");return e.protocol!=="http:"&&e.protocol!=="https:"?null:e.toString()}catch{return null}},getHostname(t){try{return new URL(t,typeof window<"u"?window.location.origin:"http://localhost").hostname.toLowerCase()}catch{return""}},isHost(t,e){const i=o.state.getHostname(t);return i===e||i.endsWith("."+e)},escapeHtml(t){return String(t??"").split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;").split("'").join("&#39;")},sanitizeHtml(t){return browser_default.sanitize(t,{ADD_TAGS:["iframe","video","audio","source"],ADD_ATTR:["allow","allowfullscreen","frameborder","scrolling","target","contenteditable","data-platform","data-url","data-widget","data-formula","controls","playsinline","autoplay","muted","loop"]})},showTableModal:!1,tableRows:"3",tableCols:"3",tableHasHeader:!0,showLinkModal:!1,linkUrl:"",showWidgetModal:!1,selectedWidget:"banner",showSocialModal:!1,socialUrl:"",socialPlatform:"x",showButtonModal:!1,btnText:"Click Here",btnUrl:"",btnStyle:"primary",selectedMediaEl:null,resizeHandleTop:0,resizeHandleLeft:0,resizeToolbarTop:0,resizeToolbarLeft:0,isResizing:!1,resizeStartX:0,resizeStartWidth:0,fontFamily:"Inter",fontSize:"16px",textColor:"#0f172a",highlightColor:"#fde047",appliedClasses:["cv-callout","variant-blue"],showInsertMenu:!1,showAiModal:!1,aiAction:"improve",aiInput:"",activeFormats:{bold:!1,italic:!1,underline:!1,strikeThrough:!1,justifyLeft:!1,justifyCenter:!1,justifyRight:!1,justifyFull:!1,quote:!1,code:!1,unorderedList:!1,orderedList:!1,inTable:!1},headingFormat:"P",checkFormats(){if(typeof window<"u"&&typeof document<"u"){let t=!1,e=!1,i=!1;const s=window.getSelection();if(s&&s.rangeCount>0){let c=s.getRangeAt(0).startContainer,h=c&&c.nodeType===1?c:c?c.parentElement:null;if(h){try{const p=window.getComputedStyle(h);if(p&&p.fontSize&&(o.state.fontSize=p.fontSize,o.update()),p&&p.fontFamily){const w=p.fontFamily.split(",")[0].split('"').join("").split("'").join("").trim();w&&(o.state.fontFamily=w,o.update())}}catch{}const d=[];let r=h;for(;r&&r!==o._editorRef;){if(r.className&&typeof r.className=="string"){if(r.className.indexOf("wysiwyg-content")!==-1)break;const p=r.className.split(/\s+/);for(let w=0;w<p.length;w++){const R=p[w];R&&R.indexOf("prose")!==0&&R!=="task-list"&&!d.includes(R)&&d.push(R)}}r=r.parentElement}o.state.appliedClasses=d,o.update()}for(;c&&c.nodeName!=="DIV"&&c.className!=="wysiwyg-content";)c.nodeName==="BLOCKQUOTE"&&(t=!0),(c.nodeName==="PRE"||c.nodeName==="CODE")&&(e=!0),(c.nodeName==="TD"||c.nodeName==="TH")&&(i=!0),c=c.parentNode}o.state.activeFormats={bold:document.queryCommandState("bold"),italic:document.queryCommandState("italic"),underline:document.queryCommandState("underline"),strikeThrough:document.queryCommandState("strikeThrough"),justifyLeft:document.queryCommandState("justifyLeft"),justifyCenter:document.queryCommandState("justifyCenter"),justifyRight:document.queryCommandState("justifyRight"),justifyFull:document.queryCommandState("justifyFull"),unorderedList:document.queryCommandState("insertUnorderedList"),orderedList:document.queryCommandState("insertOrderedList"),quote:t,code:e,inTable:i},o.update();const n=document.queryCommandValue("formatBlock");n&&(n.includes("1")?(o.state.headingFormat="H1",o.update(),o.update()):n.includes("2")?(o.state.headingFormat="H2",o.update(),o.update()):n.includes("3")?(o.state.headingFormat="H3",o.update(),o.update()):n.includes("4")?(o.state.headingFormat="H4",o.update(),o.update()):n.toLowerCase().includes("blockquote")?(o.state.activeFormats.quote=!0,o.state.headingFormat="P",o.update()):n.toLowerCase().includes("pre")?(o.state.activeFormats.code=!0,o.state.headingFormat="P",o.update()):(n.includes("p")||n.includes("div"))&&(o.state.headingFormat="P",o.update(),o.update()))}},saveSelection(){if(typeof window<"u"){const t=window.getSelection();if(t&&t.rangeCount>0){const e=t.getRangeAt(0),i=o.state.getEditorElement();if(i)try{i.contains(e.commonAncestorContainer)&&(activeSavedRange=o.state.escapeAtomicRange(e.cloneRange()))}catch{}}}},restoreSelection(){if(typeof window<"u"){const t=o.state.getEditorElement();if(t){try{typeof t.focus=="function"&&t.focus()}catch{}if(activeSavedRange)try{if(t.contains(activeSavedRange.commonAncestorContainer)){const e=window.getSelection();e&&(e.removeAllRanges(),e.addRange(activeSavedRange.cloneRange()))}}catch{}}}},escapeAtomicRange(t){const e=o.state.getEditorElement();if(!t||!e)return t;let i=t.startContainer,s=null;for(;i&&i!==e;)i.nodeType===1&&i.getAttribute&&i.getAttribute("contenteditable")==="false"&&(s=i),i=i.parentNode;if(!s)return t;const n=document.createRange();return n.setStartAfter(s),n.collapse(!0),n},insertHtmlAtCursor(t){if(typeof window>"u")return;const e=o.state.getEditorElement();if(e)try{typeof e.focus=="function"&&e.focus()}catch{}o.state.restoreSelection();const i=window.getSelection();let s=null;if(i&&i.rangeCount>0){const n=i.getRangeAt(0);try{e&&e.contains(n.commonAncestorContainer)&&(s=n)}catch{}}if(!s&&activeSavedRange)try{e&&e.contains(activeSavedRange.commonAncestorContainer)&&(s=activeSavedRange)}catch{}if(s=o.state.escapeAtomicRange(s),s&&s.insertNode){s.deleteContents();const n=document.createElement("template");n.innerHTML=t.trim();const c=n.content,h=c.querySelector("img, video, audio, .cv-social-embed, .cv-widget"),d=c.lastChild;if(s.insertNode(c),d&&i){const r=document.createRange();r.setStartAfter(d),r.collapse(!0),i.removeAllRanges(),i.addRange(r),activeSavedRange=r.cloneRange()}h&&o.state.selectMediaElement(h)}else if(e){const n=document.createElement("template");n.innerHTML=t.trim();const c=n.content.querySelector("img, video, audio, .cv-social-embed, .cv-widget");e.appendChild(n.content);const h=document.createRange();h.selectNodeContents(e),h.collapse(!1),i&&(i.removeAllRanges(),i.addRange(h),activeSavedRange=h.cloneRange()),c&&o.state.selectMediaElement(c)}o.state.ensureEditableStructure(),o.state.syncContent(),o.state.checkFormats(),o.state.renderEmbeds()},formatHTML(t){if(!t)return"";let e="",i="";const s="  ";return t.split(/>\s*</).forEach(function(n){n.match(/^\/\w/)&&(i=i.substring(s.length)),e+=i+"<"+n+`>
`,n.match(/^<?\w[^>]*[^\/]$/)&&!n.startsWith("input")&&!n.startsWith("img")&&!n.startsWith("br")&&!n.startsWith("hr")&&(i+=s)}),e.length>3?e.substring(1,e.length-2):t},format(t,e){o.state.restoreSelection(),document.execCommand(t,!1,e),o.state.saveSelection(),o.state.syncContent(),o.state.checkFormats()},applyColorPreview(t,e){if(!e)return;const i=o.state.getEditorElement();if(i)try{i.focus()}catch{}o.state.restoreSelection(),t==="foreColor"?document.execCommand("foreColor",!1,e):document.execCommand("hiliteColor",!1,e)||document.execCommand("backColor",!1,e),o.state.saveSelection()},applyColor(t,e){if(!e)return;const i=o.state.getEditorElement();if(i)try{i.focus()}catch{}o.state.restoreSelection(),t==="foreColor"?(document.execCommand("foreColor",!1,e),o.state.textColor=e,o.update()):(document.execCommand("hiliteColor",!1,e)||document.execCommand("backColor",!1,e),o.state.highlightColor=e,o.update()),o.state.saveSelection(),o.state.syncContent(),o.state.checkFormats()},formatHeading(t){o.state.restoreSelection(),document.execCommand("formatBlock",!1,t),o.state.headingFormat=t,o.update(),o.state.syncContent(),o.state.checkFormats();const e=o.state.getEditorElement();if(e)try{e.focus()}catch{}},insertMedia(t){o.state.saveSelection();const e=(i,s)=>{if(!i)return;let n="";if(t==="image"){const c=(i.split("/").pop()||"image").split("?")[0].split(".")[0].replace(/[-_]+/g," ").trim(),h=(s||"").trim()||c||"Image",d=o.state.escapeHtml(h);n=`<img src="${o.state.escapeHtml(i)}" alt="${d}" loading="lazy" decoding="async" draggable="false" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" /><p><br></p>`}else if(t==="video"){const c=i.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/),h=i.match(/vimeo\.com\/(?:video\/)?([0-9]+)/),d=o.state.escapeHtml(i);c?n=`<div class="cv-social-embed" data-platform="youtube" data-url="${d}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded YOUTUBE Video: ${d}]</div><p><br></p>`:h?n=`<div class="cv-social-embed" data-platform="vimeo" data-url="${d}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded VIMEO Video: ${d}]</div><p><br></p>`:n=`<video src="${d}" controls style="max-width: 100%; border-radius: 8px; margin: 16px 0;"></video><p><br></p>`}else t==="audio"&&(n=`<audio src="${o.state.escapeHtml(i)}" controls style="margin: 16px 0;"></audio><p><br></p>`);o.state.insertHtmlAtCursor(n)};if(o.props.onMediaRequest)o.props.onMediaRequest(t).then(i=>{i&&e(i)}).catch(i=>{console.error("Media request failed",i)});else{const i=window.prompt(`Enter ${t} URL:`);if(i&&t==="image"){const s=window.prompt("Describe this image for screen readers and search engines (alt text):","");e(i,s||void 0)}else i&&e(i)}},clearAllFormatting(){document.execCommand("removeFormat",!1,void 0),document.execCommand("formatBlock",!1,"P"),document.execCommand("unlink",!1,void 0),o.state.syncContent(),o.state.checkFormats()},toggleBlock(t){o.state.checkFormats(),(t==="PRE"?o.state.activeFormats.code:o.state.activeFormats.quote)?document.execCommand("formatBlock",!1,"P"):document.execCommand("formatBlock",!1,t),o.state.syncContent(),o.state.checkFormats()},applyClass(t){if(!t)return;const e=window.getSelection();if(e&&e.rangeCount>0){const i=e.getRangeAt(0),s=document.createElement("span");s.className=t,s.appendChild(i.extractContents()),i.insertNode(s),o.state.syncContent()}},openButtonModal(){o.state.saveSelection(),o.state.showButtonModal=!0,o.update(),o.state.btnText="Click Here",o.update(),o.state.btnUrl="",o.update(),o.state.btnStyle="primary",o.update()},closeButtonModal(){o.state.showButtonModal=!1,o.update()},confirmButton(){if(o.state.showButtonModal=!1,o.update(),o.state.btnText){let t="padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; display: inline-block; text-decoration: none; transition: all 0.2s;";o.state.btnStyle==="primary"?t+=" background: var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480)); color: white; border: none; box-shadow: 0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.3));":o.state.btnStyle==="secondary"?t+=" background: var(--cv-color-surface-raised, #1e293b); color: var(--cv-color-text-main, #fff); border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1));":o.state.btnStyle==="outline"&&(t+=" background: transparent; color: var(--cv-color-primary-fill, #245066); border: 2px solid var(--cv-color-primary-fill, #245066);");const i=`<a href="${o.state.escapeHtml(o.state.btnUrl||"#")}" class="cv-btn" style="${t}">${o.state.escapeHtml(o.state.btnText)}</a>&nbsp;`;o.state.insertHtmlAtCursor(i)}},getCanonicalHtml(){const t=o.state.getEditorElement();if(!t)return"";const e=t.cloneNode(!0);return e.querySelectorAll(".cv-resizing-selected").forEach(n=>{n.classList.remove("cv-resizing-selected"),n.getAttribute("class")||n.removeAttribute("class")}),e.querySelectorAll('[data-cv-rendered="true"]').forEach(n=>{if(n.removeAttribute("data-cv-rendered"),n.classList.contains("cv-social-embed")){const c=n.getAttribute("data-platform")||"",h=n.getAttribute("data-url")||"";n.textContent=`[Embedded ${c.toUpperCase()} Post: ${h}]`}else n.classList.contains("cv-math-formula")&&(n.textContent=n.getAttribute("data-formula")||"")}),e.innerHTML},renderEmbeds(){if(typeof window>"u")return;const t=o.state.getEditorElement();if(!t)return;t.querySelectorAll('.cv-social-embed:not([data-cv-rendered="true"])').forEach(s=>{const n=(s.getAttribute("data-platform")||"").toLowerCase(),c=s.getAttribute("data-url")||"";if(!n||!c)return;const h=()=>{const d=s.style.width,r=s.style.maxWidth;s.setAttribute("data-cv-rendered","true"),s.setAttribute("style","margin: 16px 0; padding: 0; border: none; background: transparent; display: flex; justify-content: center;"),d&&(s.style.width=d),r&&(s.style.maxWidth=r)};if(n==="youtube"){const d=c.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/);if(!d||!d[1])return;s.innerHTML="";const r=document.createElement("iframe");r.width="100%",r.height="280",r.src=`https://www.youtube.com/embed/${d[1]}`,r.title="YouTube video player",r.setAttribute("frameborder","0"),r.setAttribute("allowfullscreen",""),r.style.cssText="border-radius: 8px; display: block; max-width: 100%; pointer-events: none;",s.appendChild(r),h()}else if(n==="vimeo"){const d=c.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);if(!d||!d[1])return;s.innerHTML="";const r=document.createElement("iframe");r.width="100%",r.height="280",r.src=`https://player.vimeo.com/video/${d[1]}`,r.title="Vimeo video player",r.setAttribute("frameborder","0"),r.setAttribute("allowfullscreen",""),r.style.cssText="border-radius: 8px; display: block; max-width: 100%; pointer-events: none;",s.appendChild(r),h()}else if(n==="x"||n==="twitter"){s.innerHTML="";const d=document.createElement("blockquote");d.className="twitter-tweet",d.setAttribute("data-theme","dark"),d.style.pointerEvents="none";const r=o.state.getTrustedHttpUrl(c);if(!r)return;const p=document.createElement("a");if(p.href=r,d.appendChild(p),s.appendChild(d),h(),document.getElementById("twitter-wjs"))window.twttr&&window.twttr.widgets.load(s);else{const w=document.createElement("script");w.id="twitter-wjs",w.src="https://platform.twitter.com/widgets.js",w.async=!0,document.body.appendChild(w)}}else if(n==="instagram"){s.innerHTML="";const d=document.createElement("blockquote");if(d.className="instagram-media",d.setAttribute("data-instgrm-permalink",c),d.setAttribute("data-instgrm-version","14"),d.style.pointerEvents="none",s.appendChild(d),h(),document.getElementById("instagram-embed"))window.instgrm&&window.instgrm.Embeds.process();else{const r=document.createElement("script");r.id="instagram-embed",r.src="https://www.instagram.com/embed.js",r.async=!0,document.body.appendChild(r)}}else if(n==="facebook"){s.innerHTML="";const d=document.createElement("div");if(d.className="fb-post",d.setAttribute("data-href",c),d.setAttribute("data-width","500"),d.style.pointerEvents="none",s.appendChild(d),h(),document.getElementById("facebook-jssdk"))window.FB&&window.FB.XFBML.parse(s);else{const r=document.createElement("script");r.id="facebook-jssdk",r.src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0",r.async=!0,r.defer=!0,r.crossOrigin="anonymous",document.body.appendChild(r)}}else if(n==="linkedin"){const d=c.includes("/embed/")?c:c.replace(/\/posts?\//,"/embed/feed/update/"),r=o.state.getTrustedHttpUrl(d);if(!r)return;s.innerHTML="";const p=document.createElement("iframe");p.src=r,p.height="400",p.width="100%",p.setAttribute("frameborder","0"),p.setAttribute("allowfullscreen",""),p.title="Embedded post",p.style.cssText="border-radius: 8px; max-width: 100%; pointer-events: none;",s.appendChild(p),h()}});const i=t.querySelectorAll('.cv-math-formula:not([data-cv-rendered="true"])');if(i.length>0){const s=()=>{i.forEach(n=>{const c=n.getAttribute("data-formula")||n.textContent||"";if(!c)return;const h=window.katex;if(h)try{n.innerHTML=browser_default.sanitize(h.renderToString(c,{throwOnError:!1,displayMode:!1}),{USE_PROFILES:{html:!0,mathMl:!0,svg:!0},ADD_TAGS:["semantics","annotation"],ADD_ATTR:["encoding"]}),n.setAttribute("data-cv-rendered","true")}catch{}})};if(window.katex)s();else if(document.getElementById("cv-katex-js")){const n=document.getElementById("cv-katex-js");n&&n.addEventListener("load",s)}else{if(!document.getElementById("cv-katex-css")){const c=document.createElement("link");c.id="cv-katex-css",c.rel="stylesheet",c.href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",document.head.appendChild(c)}const n=document.createElement("script");n.id="cv-katex-js",n.src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",n.async=!0,n.onload=s,document.body.appendChild(n)}}},syncContent(){o.state.getEditorElement()&&(o.state.internalContent=o.state.getCanonicalHtml(),o.update(),o.props.onChange&&o.props.onChange(o.state.internalContent))},handleInput(){o.state.syncContent()},handleSourceInput(t){o.state.internalContent=t.target.value,o.update(),o.props.onChange&&o.props.onChange(o.state.internalContent),o._editorRef&&(o._editorRef.innerHTML=o.state.sanitizeHtml(o.state.internalContent),o.state.renderEmbeds())},openTableModal(){o.state.saveSelection(),o.state.showTableModal=!0,o.update(),o.state.tableRows="3",o.update(),o.state.tableCols="3",o.update(),o.state.tableHasHeader=!0,o.update()},confirmTable(){o.state.showTableModal=!1,o.update();const t=parseInt(o.state.tableRows,10),e=parseInt(o.state.tableCols,10);if(t>0&&e>0){let i='<table border="1" style="width:100%; border-collapse: collapse; min-width: 50px;">';if(o.state.tableHasHeader){i+='<thead style="background-color: var(--cv-color-hover, rgba(255,255,255,0.05));"><tr>';for(let s=0;s<e;s++)i+='<th scope="col" style="padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);">Header</th>';i+="</tr></thead>"}i+="<tbody>";for(let s=0;s<t;s++){i+="<tr>";for(let n=0;n<e;n++)i+='<td style="padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);">Cell</td>';i+="</tr>"}i+="</tbody></table><p><br></p>",o.state.insertHtmlAtCursor(i)}},closeTableModal(){o.state.showTableModal=!1,o.update()},modifyTable(t){const e=window.getSelection();if(!e||e.rangeCount===0)return;let i=e.getRangeAt(0).startContainer,s=null,n=null,c=null;for(;i&&i.nodeName!=="DIV"&&i.className!=="wysiwyg-content";)(i.nodeName==="TD"||i.nodeName==="TH")&&(s=i),i.nodeName==="TR"&&(n=i),i.nodeName==="TABLE"&&(c=i),i=i.parentNode;if(!c||!n||!s)return;const h=Array.from(n.children).indexOf(s);if(t==="addRow"){const d=document.createElement("tr"),r=n.children.length;for(let p=0;p<r;p++){const w=document.createElement("td");w.style.cssText="padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);",w.innerHTML="Cell",d.appendChild(w)}n.parentNode.insertBefore(d,n.nextSibling)}else if(t==="removeRow")n.parentNode.children.length>1?n.parentNode.removeChild(n):c.parentNode.removeChild(c);else if(t==="addCol")c.querySelectorAll("tr").forEach(r=>{const p=document.createElement(r.parentNode.nodeName==="THEAD"?"th":"td");r.parentNode.nodeName==="THEAD"&&p.setAttribute("scope","col"),p.style.cssText=r.parentNode.nodeName==="THEAD"?"padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);":"padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);",p.innerHTML=r.parentNode.nodeName==="THEAD"?"Header":"Cell";const w=r.children[h];r.insertBefore(p,w?w.nextSibling:null)});else if(t==="removeCol"){const d=c.querySelectorAll("tr");n.children.length>1?d.forEach(r=>{r.children[h]&&r.removeChild(r.children[h])}):c.parentNode.removeChild(c)}o.state.syncContent()},openLinkModal(){o.state.saveSelection(),o.state.showLinkModal=!0,o.update(),o.state.linkUrl="",o.update()},confirmLink(){o.state.showLinkModal=!1,o.update(),o.state.linkUrl&&(o.state.restoreSelection(),document.execCommand("createLink",!1,o.state.linkUrl),o.state.syncContent())},closeLinkModal(){o.state.showLinkModal=!1,o.update()},openWidgetModal(){o.state.saveSelection(),o.state.showWidgetModal=!0,o.update()},confirmWidget(){o.state.showWidgetModal=!1,o.update();let e=`<div class="cv-widget" data-widget="${o.state.escapeHtml(o.state.selectedWidget)}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-primary, #7fc4de); background: var(--cv-color-accent-tint, rgba(127,196,222,0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-link, #7fc4de); font-weight: 600;">[ContentVeda Widget: ${o.state.escapeHtml(o.state.selectedWidget.toUpperCase())}]</div><p><br></p>`;o.state.insertHtmlAtCursor(e)},closeWidgetModal(){o.state.showWidgetModal=!1,o.update()},openSocialModal(){o.state.saveSelection(),o.state.showSocialModal=!0,o.update(),o.state.socialUrl="",o.update(),o.state.socialPlatform="youtube",o.update()},confirmSocial(){if(o.state.showSocialModal=!1,o.update(),o.state.socialUrl){let t=(o.state.socialPlatform||"youtube").toLowerCase();o.state.isHost(o.state.socialUrl,"youtube.com")||o.state.isHost(o.state.socialUrl,"youtu.be")?t="youtube":o.state.isHost(o.state.socialUrl,"vimeo.com")&&(t="vimeo");const e=o.state.escapeHtml(t),i=o.state.escapeHtml(o.state.socialUrl);let s=`<div class="cv-social-embed" data-platform="${e}" data-url="${i}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded ${o.state.escapeHtml(t.toUpperCase())} Post: ${i}]</div><p><br></p>`;o.state.insertHtmlAtCursor(s)}},closeSocialModal(){o.state.showSocialModal=!1,o.update()},toggleMode(){o.state.mode==="visual"?(o.state.syncContent(),o.state.internalContent=o.state.formatHTML(o.state.internalContent),o.update(),o.state.mode="source",o.update()):(o.state.mode="visual",o.update(),o._editorRef&&(o._editorRef.innerHTML=o.state.sanitizeHtml(o.state.internalContent),o.state.renderEmbeds()))},toggleFullScreen(){typeof document<"u"&&(document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():o._rootRef&&o._rootRef.requestFullscreen&&o._rootRef.requestFullscreen().catch(t=>console.warn("Fullscreen denied",t)))},changeFontFamily(t){o.state.fontFamily=t,o.update(),o.state.restoreSelection(),document.execCommand("fontName",!1,t),o.state.syncContent(),o.state.checkFormats()},changeFontSize(t){o.state.fontSize=t,o.update(),o.state.restoreSelection();const e=window.getSelection();if(e&&e.rangeCount>0&&!e.isCollapsed){const i=document.createElement("span");i.style.fontSize=t;const s=e.getRangeAt(0).extractContents();i.appendChild(s),e.getRangeAt(0).insertNode(i),e.removeAllRanges();const n=document.createRange();n.selectNodeContents(i),e.addRange(n),o.state.saveSelection()}else{const i={"12px":"1","14px":"2","16px":"3","18px":"4","20px":"5","24px":"6","32px":"7"};document.execCommand("fontSize",!1,i[t]||"3")}o.state.syncContent(),o.state.checkFormats()},insertChecklist(){o.state.insertHtmlAtCursor('<ul class="task-list" style="list-style: none; padding-left: 0.25rem;"><li style="margin: 4px 0;"><label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span>Task item</span></label></li></ul><p><br></p>')},insertFormula(){o.state.saveSelection();const t=window.prompt("Enter math formula or expression:","E = mc\xB2");if(t){const e=t.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;"),i=`<code class="cv-math-formula" data-formula="${e}" contenteditable="false" style="background: rgba(127,196,222,0.15); color: #0284c7; padding: 2px 8px; border-radius: 6px; font-family: monospace; font-size: 0.9em; border: 1px solid rgba(127,196,222,0.3);">${e}</code>&nbsp;`;o.state.insertHtmlAtCursor(i)}},addClass(t){t&&(o.state.appliedClasses.includes(t)||(o.state.appliedClasses=[...o.state.appliedClasses,t],o.update()))},removeClass(t){o.state.appliedClasses=o.state.appliedClasses.filter(e=>e!==t),o.update(),o._editorRef&&(o._editorRef.querySelectorAll(`.${t}`).forEach(i=>{if(i.classList.remove(t),i.classList.length===0&&i.tagName==="SPAN"){const s=i.parentNode;for(;i.firstChild;)s.insertBefore(i.firstChild,i);s.removeChild(i)}}),o.state.syncContent())},handleClassInputKeyDown(t){if(t.key==="Enter"){t.preventDefault();const e=t.target,i=e.value?e.value.trim():"";i&&(o.state.applyClass(i),o.state.addClass(i),e.value="")}},openAiModal(){o.state.saveSelection(),o.state.showAiModal=!0,o.update(),o.state.aiInput="",o.update()},closeAiModal(){o.state.showAiModal=!1,o.update()},applyAiAction(t){o.state.restoreSelection();const e=window.getSelection(),i=e?e.toString():"";let s="";t==="improve"?i?s=i.trim()+" (enhanced for clarity and conciseness)":s="<p><strong>Executive Summary:</strong> Designed for high-velocity digital engineering squads, this next-generation prose engine pairs strict AST schemas with real-time reactive UI component embedding.</p>":t==="callout"?s=`<div class="cv-callout variant-blue" style="padding: 16px 20px; border-left: 4px solid #0284c7; background: rgba(2, 132, 199, 0.08); border-radius: 0 8px 8px 0; margin: 16px 0;"><strong>AI INSIGHT:</strong> ${i?o.state.escapeHtml(i):"Configure your toolbar modules, slot rules, and custom micro-frontends directly in the inspector panel."}</div><p><br></p>`:t==="summarize"?s=`<p><em>Summary:</em> ${i?o.state.escapeHtml(i.slice(0,100))+"...":"Key takeaways: High performance AST validation, component slot architecture, and real-time schema hydration."}</p>`:t==="grammar"&&(s=i?i.trim():"<p>All grammar and formatting validated.</p>"),s&&(s.startsWith("<")?document.execCommand("insertHTML",!1,s):document.execCommand("insertText",!1,s),o.state.syncContent()),o.state.showAiModal=!1,o.update()},showToolbarOption(t){if(!o.props.config||!o.props.config.toolbar)return!0;let e=t;return t==="alignLeft"&&(e="justifyLeft"),t==="alignCenter"&&(e="justifyCenter"),t==="alignRight"&&(e="justifyRight"),t==="alignJustify"&&(e="justifyFull"),t==="bulletList"&&(e="unorderedList"),t==="numberedList"&&(e="orderedList"),t==="code"?o.props.config.toolbar.includes("code")||o.props.config.toolbar.includes("pre"):o.props.config.toolbar.includes(t)||o.props.config.toolbar.includes(e)},showSeparator(t){const e=[["fullscreen","source","bold","italic","underline","strikeThrough"],["code","quote","clear"],["headings"],["foreColor","backColor"],["alignLeft","justifyLeft","alignCenter","justifyCenter","alignRight","justifyRight"],["image","link","table","unorderedList","orderedList","horizontalRule","video","social"],["insertButton","addWidget"],["save"],["classInput"]],i=e.slice(0,t+1).some(n=>n.some(c=>o.state.showToolbarOption(c))),s=e[t+1]&&e[t+1].some(n=>o.state.showToolbarOption(n));return i&&s},handleFullscreenChange(){typeof document<"u"&&(o.state.isFullscreen=!!document.fullscreenElement,o.update(),o.state.deselectMediaElement())},isResizableTarget(t){if(!t||t.nodeType!==1)return!1;const e=t.tagName;return!!(e==="IMG"||e==="VIDEO"||e==="AUDIO"||t.classList&&(t.classList.contains("cv-social-embed")||t.classList.contains("cv-widget")))},updateResizeHandlePosition(){const t=o.state.getEditorElement();if(!o.state.selectedMediaEl||!t)return;const e=t.parentElement;if(!e)return;const i=o.state.selectedMediaEl.getBoundingClientRect(),s=e.getBoundingClientRect();o.state.resizeHandleTop=i.bottom-s.top+e.scrollTop-7,o.update(),o.state.resizeHandleLeft=i.right-s.left+e.scrollLeft-7,o.update();let n=i.top-s.top+e.scrollTop-40;n<8&&(n=i.bottom-s.top+e.scrollTop+8);let c=i.left-s.left+e.scrollLeft;c<8&&(c=8),o.state.resizeToolbarTop=n,o.update(),o.state.resizeToolbarLeft=c,o.update()},selectMediaElement(t){o.state.selectedMediaEl&&o.state.selectedMediaEl!==t&&o.state.selectedMediaEl.classList.remove("cv-resizing-selected"),o.state.selectedMediaEl=t,o.update(),t.classList.add("cv-resizing-selected"),o.state.updateResizeHandlePosition(),t.tagName==="IMG"&&!t.complete&&t.addEventListener("load",()=>{o.state.selectedMediaEl===t&&o.state.updateResizeHandlePosition()},{once:!0})},deleteSelectedMedia(){if(o.state.selectedMediaEl){const t=o.state.selectedMediaEl;o.state.deselectMediaElement(),t&&t.parentNode&&t.parentNode.removeChild(t),o.state.ensureEditableStructure(),o.state.syncContent()}},setImageSize(t){if(!o.state.selectedMediaEl)return;const e=o.state.selectedMediaEl;e.style.width=t,e.style.maxWidth="100%",e.style.height="auto",o.state.updateResizeHandlePosition(),o.state.syncContent()},setImageAlign(t){if(!o.state.selectedMediaEl)return;const e=o.state.selectedMediaEl;t==="center"?(e.style.display="block",e.style.marginLeft="auto",e.style.marginRight="auto"):t==="left"?(e.style.display="block",e.style.marginLeft="0",e.style.marginRight="auto"):t==="right"&&(e.style.display="block",e.style.marginLeft="auto",e.style.marginRight="0"),o.state.updateResizeHandlePosition(),o.state.syncContent()},deselectMediaElement(){o.state.selectedMediaEl&&o.state.selectedMediaEl.classList.remove("cv-resizing-selected"),o.state.selectedMediaEl=null,o.update()},isReadOnly(){return!!(o.props.readOnly||o.props.disabled)},closeAllModals(){o.state.showTableModal=!1,o.update(),o.state.showLinkModal=!1,o.update(),o.state.showWidgetModal=!1,o.update(),o.state.showSocialModal=!1,o.update(),o.state.showButtonModal=!1,o.update(),o.state.showAiModal=!1,o.update()},handleBackdropClick(t){t&&t.target===t.currentTarget&&o.state.closeAllModals()},ensureEditableStructure(){const t=o.state.getEditorElement();if(!t)return;const e=(t.innerHTML||"").trim();if(!e||e==="<br>"||e==="<p></p>"){t.innerHTML="<p><br></p>";return}const i=t.lastElementChild;if(i&&(i.getAttribute("contenteditable")==="false"||i.tagName==="TABLE"||i.classList&&(i.classList.contains("cv-social-embed")||i.classList.contains("cv-widget")))){const n=document.createElement("p");n.innerHTML="<br>",t.appendChild(n)}const s=t.firstElementChild;if(s&&(s.getAttribute("contenteditable")==="false"||s.tagName==="TABLE"||s.classList&&(s.classList.contains("cv-social-embed")||s.classList.contains("cv-widget")))){const n=document.createElement("p");n.innerHTML="<br>",t.insertBefore(n,s)}},normalizeSelection(){if(o.state.isReadOnly())return;const t=o.state.getEditorElement();if(!t)return;const e=window.getSelection();if(!e||e.rangeCount===0)return;let i=null;try{i=e.getRangeAt(0)}catch{return}let s=i.startContainer,n=null;for(;s&&s!==t;){if(s.nodeType===1&&s.getAttribute&&s.getAttribute("contenteditable")==="false"){n=s;break}s=s.parentNode}if(n){const c=document.createRange();if(!n.nextSibling||n.nextSibling.nodeType===1&&n.nextSibling.getAttribute("contenteditable")==="false"){const h=document.createElement("p");h.innerHTML="<br>",n.nextSibling?n.parentNode.insertBefore(h,n.nextSibling):n.parentNode.appendChild(h),c.setStart(h,0)}else c.setStartAfter(n);c.collapse(!0),e.removeAllRanges(),e.addRange(c),activeSavedRange=c.cloneRange()}},focusEditorAtEnd(){if(o.state.isReadOnly())return;const t=o.state.getEditorElement();if(!t)return;o.state.ensureEditableStructure();try{typeof t.focus=="function"&&t.focus()}catch{}const e=window.getSelection();if(e){const i=document.createRange();i.selectNodeContents(t),i.collapse(!1),e.removeAllRanges(),e.addRange(i),activeSavedRange=i.cloneRange()}},handleEditorContentClick(t){t&&t.target===t.currentTarget&&o.state.focusEditorAtEnd()},handleKeyDown(t){if(o.state.isReadOnly()){t.preventDefault();return}if(t.key==="Escape"){o.state.deselectMediaElement(),o.state.closeAllModals();return}if(o.state.selectedMediaEl&&(t.key==="Backspace"||t.key==="Delete")){t.preventDefault();const e=o.state.selectedMediaEl;o.state.deselectMediaElement(),e&&e.parentNode&&e.parentNode.removeChild(e),o.state.ensureEditableStructure(),o.state.syncContent();return}o.state.normalizeSelection()},handleGlobalKeyDown(t){t.key==="Escape"&&(o.state.closeAllModals(),o.state.deselectMediaElement())},handleEditorClick(t){if(o.state.isReadOnly())return;const e=t.target,i=e&&e.closest?e.closest("img, video, audio, .cv-social-embed, .cv-widget"):null;i&&o.state.isResizableTarget(i)?o.state.selectMediaElement(i):(o.state.deselectMediaElement(),o.state.normalizeSelection())},startResize(t){!o.state.selectedMediaEl||o.state.isReadOnly()||(t.preventDefault(),t.stopPropagation(),o.state.isResizing=!0,o.update(),o.state.resizeStartX=t.clientX,o.update(),o.state.resizeStartWidth=o.state.selectedMediaEl.getBoundingClientRect().width,o.update(),typeof document<"u"&&(document.addEventListener("mousemove",o.state.handleResizeMove),document.addEventListener("mouseup",o.state.stopResize)))},handleResizeMove(t){if(!o.state.isResizing||!o.state.selectedMediaEl)return;const e=t.clientX-o.state.resizeStartX;let i=Math.round(o.state.resizeStartWidth+e);const s=80,n=o.state.getEditorElement(),c=n?n.clientWidth:2e3;i<s&&(i=s),i>c&&(i=c);const h=o.state.selectedMediaEl;h.style.width=i+"px",h.style.maxWidth="100%",(h.tagName==="IMG"||h.tagName==="VIDEO")&&(h.style.height="auto"),o.state.updateResizeHandlePosition()},stopResize(){o.state.isResizing&&(o.state.isResizing=!1,o.update(),typeof document<"u"&&(document.removeEventListener("mousemove",o.state.handleResizeMove),document.removeEventListener("mouseup",o.state.stopResize)),o.state.syncContent())},handleSelectionChange(){if(typeof window<"u"){const t=o.state.getEditorElement();if(!t)return;const e=window.getSelection();let i=!1;try{e&&e.anchorNode&&typeof t.contains=="function"&&(i=t.contains(e.anchorNode))}catch{}i&&(e&&e.rangeCount>0&&o.state.saveSelection(),o.state.checkFormats(),o.state.normalizeSelection())}}},this.props||(this.props={}),this.componentProps=["content","initialContent","onMediaRequest","onChange","config","readOnly","disabled","className","availableClasses"],this.updateDeps=[[this.props.content]],this.nodesToDestroy=[],this.pendingUpdate=!1,this.onButtonRichTextEditor1Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor1Click=t=>{this.state.format("undo")},this.onButtonRichTextEditor2Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor2Click=t=>{this.state.format("redo")},this.onSelectRichTextEditor1Mousedown=t=>{this.state.saveSelection()},this.onSelectRichTextEditor1Change=t=>{this.state.formatHeading(t.target.value)},this.onSelectRichTextEditor2Mousedown=t=>{this.state.saveSelection()},this.onSelectRichTextEditor2Change=t=>{this.state.restoreSelection(),this.state.changeFontFamily(t.target.value)},this.onSelectRichTextEditor3Mousedown=t=>{this.state.saveSelection()},this.onSelectRichTextEditor3Change=t=>{this.state.restoreSelection(),this.state.changeFontSize(t.target.value)},this.onButtonRichTextEditor3Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor3Click=t=>{this.state.format("bold")},this.onButtonRichTextEditor4Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor4Click=t=>{this.state.format("italic")},this.onButtonRichTextEditor5Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor5Click=t=>{this.state.format("underline")},this.onButtonRichTextEditor6Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor6Click=t=>{this.state.format("strikeThrough")},this.onButtonRichTextEditor7Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor7Click=t=>{this.state.toggleBlock("PRE")},this.onLabelRichTextEditor1Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor1Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor1Input=t=>{this.state.applyColorPreview("foreColor",t.target.value)},this.onInputRichTextEditor1Change=t=>{this.state.applyColor("foreColor",t.target.value)},this.onLabelRichTextEditor2Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor2Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor2Input=t=>{this.state.applyColorPreview("backColor",t.target.value)},this.onInputRichTextEditor2Change=t=>{this.state.applyColor("backColor",t.target.value)},this.onButtonRichTextEditor8Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor8Click=t=>{this.state.format("justifyLeft")},this.onButtonRichTextEditor9Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor9Click=t=>{this.state.format("justifyCenter")},this.onButtonRichTextEditor10Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor10Click=t=>{this.state.format("justifyRight")},this.onButtonRichTextEditor11Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor11Click=t=>{this.state.format("justifyFull")},this.onButtonRichTextEditor12Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor12Click=t=>{this.state.format("insertUnorderedList")},this.onButtonRichTextEditor13Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor13Click=t=>{this.state.format("insertOrderedList")},this.onButtonRichTextEditor14Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor14Click=t=>{this.state.insertChecklist()},this.onButtonRichTextEditor15Mousedown=t=>{t.preventDefault(),this.state.saveSelection()},this.onButtonRichTextEditor15Click=t=>{this.state.showInsertMenu=!this.state.showInsertMenu,this.update()},this.onButtonRichTextEditor16Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor16Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.openTableModal()},this.onButtonRichTextEditor17Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor17Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.insertMedia("image")},this.onButtonRichTextEditor18Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor18Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.openLinkModal()},this.onButtonRichTextEditor19Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor19Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.insertMedia("video")},this.onButtonRichTextEditor20Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor20Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.openButtonModal()},this.onButtonRichTextEditor21Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor21Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.openSocialModal()},this.onButtonRichTextEditor22Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor22Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.format("insertHorizontalRule")},this.onButtonRichTextEditor23Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor23Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.toggleBlock("BLOCKQUOTE")},this.onButtonRichTextEditor24Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor24Click=t=>{this.state.showInsertMenu=!1,this.update(),this.state.clearAllFormatting()},this.onButtonRichTextEditor25Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor25Click=t=>{this.state.openTableModal()},this.onButtonRichTextEditor26Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor26Click=t=>{this.state.modifyTable("addRow")},this.onButtonRichTextEditor27Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor27Click=t=>{this.state.modifyTable("removeRow")},this.onButtonRichTextEditor28Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor28Click=t=>{this.state.modifyTable("addCol")},this.onButtonRichTextEditor29Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor29Click=t=>{this.state.modifyTable("removeCol")},this.onButtonRichTextEditor30Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor30Click=t=>{this.state.insertMedia("image")},this.onButtonRichTextEditor31Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor31Click=t=>{this.state.openLinkModal()},this.onButtonRichTextEditor32Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor32Click=t=>{this.state.insertFormula()},this.onButtonRichTextEditor33Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor33Click=t=>{this.state.openSocialModal()},this.onButtonRichTextEditor34Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor34Click=t=>{this.state.openWidgetModal()},this.onButtonRichTextEditor35Click=t=>{const e=this.getScope(t.currentTarget,"cls");this.state.removeClass(e)},this.onInputRichTextEditor3Keydown=t=>{this.state.handleClassInputKeyDown(t)},this.onButtonRichTextEditor36Click=t=>{this.state.toggleMode()},this.onButtonRichTextEditor37Click=t=>{this.state.toggleFullScreen()},this.onButtonRichTextEditor38Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor38Click=t=>{this.state.syncContent()},this.onDivRichTextEditor5Scroll=t=>{this.state.updateResizeHandlePosition()},this.onDivRichTextEditor5Click=t=>{this.state.handleEditorContentClick(t)},this.onDivRichTextEditor6Input=t=>{this.state.handleInput(),this.state.checkFormats(),this.state.normalizeSelection()},this.onDivRichTextEditor6Blur=t=>{this.state.handleInput()},this.onDivRichTextEditor6Keyup=t=>{this.state.checkFormats(),this.state.normalizeSelection()},this.onDivRichTextEditor6Keydown=t=>{this.state.handleKeyDown(t)},this.onDivRichTextEditor6Mouseup=t=>{this.state.checkFormats(),this.state.normalizeSelection()},this.onDivRichTextEditor6Click=t=>{this.state.handleEditorClick(t)},this.onDivRichTextEditor7Mousedown=t=>{this.state.startResize(t)},this.onButtonRichTextEditor39Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor39Click=t=>{this.state.setImageSize("25%")},this.onButtonRichTextEditor40Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor40Click=t=>{this.state.setImageSize("50%")},this.onButtonRichTextEditor41Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor41Click=t=>{this.state.setImageSize("75%")},this.onButtonRichTextEditor42Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor42Click=t=>{this.state.setImageSize("100%")},this.onButtonRichTextEditor43Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor43Click=t=>{this.state.setImageAlign("left")},this.onButtonRichTextEditor44Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor44Click=t=>{this.state.setImageAlign("center")},this.onButtonRichTextEditor45Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor45Click=t=>{this.state.setImageAlign("right")},this.onButtonRichTextEditor46Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor46Click=t=>{this.state.deleteSelectedMedia()},this.onDivRichTextEditor11Click=t=>{this.state.handleBackdropClick(t)},this.onButtonRichTextEditor47Click=t=>{this.state.closeAiModal()},this.onButtonRichTextEditor48Click=t=>{this.state.applyAiAction("improve")},this.onButtonRichTextEditor49Click=t=>{this.state.applyAiAction("callout")},this.onButtonRichTextEditor50Click=t=>{this.state.applyAiAction("summarize")},this.onButtonRichTextEditor51Click=t=>{this.state.applyAiAction("grammar")},this.onButtonRichTextEditor52Click=t=>{this.state.closeAiModal()},this.onSelectRichTextEditor4Change=t=>{this.state.btnStyle=t.target.value,this.update()},this.onInputRichTextEditor4Input=t=>{this.state.btnText=t.target.value,this.update()},this.onInputRichTextEditor5Input=t=>{this.state.btnUrl=t.target.value,this.update()},this.onButtonRichTextEditor53Click=t=>{this.state.closeButtonModal()},this.onButtonRichTextEditor54Click=t=>{this.state.confirmButton()},this.onInputRichTextEditor6Input=t=>{this.state.tableRows=t.target.value,this.update()},this.onInputRichTextEditor7Input=t=>{this.state.tableCols=t.target.value,this.update()},this.onInputRichTextEditor8Change=t=>{this.state.tableHasHeader=t.target.checked,this.update()},this.onButtonRichTextEditor55Click=t=>{this.state.closeTableModal()},this.onButtonRichTextEditor56Click=t=>{this.state.confirmTable()},this.onInputRichTextEditor9Input=t=>{this.state.linkUrl=t.target.value,this.update()},this.onButtonRichTextEditor57Click=t=>{this.state.closeLinkModal()},this.onButtonRichTextEditor58Click=t=>{this.state.confirmLink()},this.onSelectRichTextEditor5Change=t=>{this.state.selectedWidget=t.target.value,this.update()},this.onButtonRichTextEditor59Click=t=>{this.state.closeWidgetModal()},this.onButtonRichTextEditor60Click=t=>{this.state.confirmWidget()},this.onSelectRichTextEditor6Change=t=>{this.state.socialPlatform=t.target.value,this.update()},this.onInputRichTextEditor10Input=t=>{this.state.socialUrl=t.target.value,this.update()},this.onButtonRichTextEditor61Click=t=>{this.state.closeSocialModal()},this.onButtonRichTextEditor62Click=t=>{this.state.confirmSocial()},this.onTextareaRichTextEditor1Input=t=>{this.state.handleSourceInput(t)}}disconnectedCallback(){const o=this;typeof document<"u"&&(document.removeEventListener("fullscreenchange",this.state.handleFullscreenChange),document.removeEventListener("selectionchange",this.state.handleSelectionChange),document.removeEventListener("keydown",this.state.handleGlobalKeyDown),document.removeEventListener("mousemove",this.state.handleResizeMove),document.removeEventListener("mouseup",this.state.stopResize)),this.destroyAnyNodes()}destroyAnyNodes(){const o=this;this.nodesToDestroy.forEach(t=>{t.__persistent||t.remove()}),this.nodesToDestroy=this.nodesToDestroy.filter(t=>t.__persistent)}connectedCallback(){const o=this;this.getAttributeNames().forEach(t=>{const e=t.replace(/-/g,""),i=new RegExp("^"+e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"$","i");this.componentProps.forEach(s=>{if(i.test(s)){let n=this.getAttribute(t);if(n==="true")n=!0;else if(n==="false")n=!1;else try{n&&(n.trim().startsWith("{")||n.trim().startsWith("["))&&(n=JSON.parse(n))}catch{}this.props[s]!==n&&(this.props[s]=n)}})}),this._root.innerHTML=`
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
                      <template data-el="div-rich-text-editor-3">
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
                        <template data-el="div-rich-text-editor-4">
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
        <div data-el="div-rich-text-editor-5">
          <div
            data-el="div-rich-text-editor-6"
            data-ref="RichTextEditor-editorRef"
          ></div>
          <template data-el="show-rich-text-editor-28">
            <div
              class="cv-resize-handle"
              title="Drag to resize"
              data-el="div-rich-text-editor-7"
            ></div>
            <div class="cv-media-toolbar" data-el="div-rich-text-editor-8">
              <button
                type="button"
                class="cv-media-toolbar-btn"
                title="25% width"
                data-el="button-rich-text-editor-39"
              >
                25%
              </button>
              <button
                type="button"
                class="cv-media-toolbar-btn"
                title="50% width"
                data-el="button-rich-text-editor-40"
              >
                50%
              </button>
              <button
                type="button"
                class="cv-media-toolbar-btn"
                title="75% width"
                data-el="button-rich-text-editor-41"
              >
                75%
              </button>
              <button
                type="button"
                class="cv-media-toolbar-btn"
                title="100% width"
                data-el="button-rich-text-editor-42"
              >
                100%
              </button>
              <div class="cv-toolbar-divider" data-el="div-rich-text-editor-9"></div>
              <button
                type="button"
                class="cv-media-toolbar-btn"
                title="Align Left"
                data-el="button-rich-text-editor-43"
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
                data-el="button-rich-text-editor-44"
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
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                  <line x1="21" y1="18" x2="7" y2="18"></line>
                </svg>
              </button>
              <div class="cv-toolbar-divider" data-el="div-rich-text-editor-10"></div>
              <button
                type="button"
                class="cv-media-toolbar-btn cv-btn-danger"
                title="Remove Media"
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
              data-el="div-rich-text-editor-11"
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
                      data-el="button-rich-text-editor-47"
                    >
                      \xD7
                    </button>
                  </div>
                  <div data-el="div-rich-text-editor-12">
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-48"
                    >
                      \u2728 Improve Writing & Polish Flow
                    </button>
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-49"
                    >
                      \u{1F4A1} Generate AI Callout Insight Box
                    </button>
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-50"
                    >
                      \u{1F4DD} Summarize Selected Section
                    </button>
                    <button
                      type="button"
                      class="cv-ai-pill-btn"
                      data-el="button-rich-text-editor-51"
                    >
                      \u{1F50D} Fix Grammar & Syntax
                    </button>
                  </div>
                  <div data-el="div-rich-text-editor-13">
                    <button type="button" data-el="button-rich-text-editor-52">
                      Close
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-31">
                <div class="shadow-2xl" data-el="div-rich-text-editor-14">
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
                  <div data-el="div-rich-text-editor-15">
                    <div data-el="div-rich-text-editor-16">
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
                    <div data-el="div-rich-text-editor-17">
                      <label data-el="label-rich-text-editor-4">Button Label</label>
                      <input
                        type="text"
                        aria-label="Button Label"
                        placeholder="e.g. Get Started Today"
                        data-el="input-rich-text-editor-4"
                        data-dom-state="RichTextEditor-input-rich-text-editor-4"
                      />
                    </div>
                    <div data-el="div-rich-text-editor-18">
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
                  <div data-el="div-rich-text-editor-19">
                    <button type="button" data-el="button-rich-text-editor-53">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-54">
                      Insert
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-32">
                <div class="shadow-2xl" data-el="div-rich-text-editor-20">
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
                  <div data-el="div-rich-text-editor-21">
                    <div data-el="div-rich-text-editor-22">
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
                    <div data-el="div-rich-text-editor-23">
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
                  <div data-el="div-rich-text-editor-24">
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
                  <div data-el="div-rich-text-editor-25">
                    <button type="button" data-el="button-rich-text-editor-55">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-56">
                      Insert Table
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-33">
                <div class="shadow-2xl" data-el="div-rich-text-editor-26">
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
                  <div data-el="div-rich-text-editor-27">
                    <label data-el="label-rich-text-editor-9">URL Destination</label>
                    <input
                      type="url"
                      aria-label="Hyperlink URL"
                      placeholder="https://example.com"
                      data-el="input-rich-text-editor-9"
                      data-dom-state="RichTextEditor-input-rich-text-editor-9"
                    />
                  </div>
                  <div data-el="div-rich-text-editor-28">
                    <button type="button" data-el="button-rich-text-editor-57">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-58">
                      Insert Link
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-34">
                <div class="shadow-2xl" data-el="div-rich-text-editor-29">
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
                  <div data-el="div-rich-text-editor-30">
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
                  <div data-el="div-rich-text-editor-31">
                    <button type="button" data-el="button-rich-text-editor-59">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-60">
                      Insert Widget
                    </button>
                  </div>
                </div>
              </template>
              <template data-el="show-rich-text-editor-35">
                <div class="shadow-2xl" data-el="div-rich-text-editor-32">
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
                  <div data-el="div-rich-text-editor-33">
                    <div data-el="div-rich-text-editor-34">
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
                    <div data-el="div-rich-text-editor-35">
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
                  <div data-el="div-rich-text-editor-36">
                    <button type="button" data-el="button-rich-text-editor-61">
                      Cancel
                    </button>
                    <button type="button" data-el="button-rich-text-editor-62">
                      Embed Post
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>
        <div data-el="div-rich-text-editor-37">
          <textarea
            class="w-full flex-1 p-6 bg-transparent cv-rte-ok font-mono text-[14px] leading-loose outline-none"
            data-el="textarea-rich-text-editor-1"
            data-dom-state="RichTextEditor-textarea-rich-text-editor-1"
          ></textarea>
        </div>
      </div>`,this.pendingUpdate=!0,this.render(),this.onMount(),this.pendingUpdate=!1,this.update()}showContent(o,t){const e=this;if(t){if(o.__renderedNodes)return;const i=o.content.cloneNode(!0),s=Array.from(i.childNodes);o.__renderedNodes=s,s.forEach(n=>{o?.scope&&(n.scope=o.scope),o?.context&&(n.context=o.context),n.__persistent=!0,this.nodesToDestroy.push(n)}),o.after(i)}else o.__renderedNodes&&(o.__renderedNodes.forEach(i=>{i.remove();const s=this.nodesToDestroy.indexOf(i);s!==-1&&this.nodesToDestroy.splice(s,1)}),o.__renderedNodes=null)}onMount(){const o=this;this.state.isMounted=!0,this.update(),this.state.internalContent||(this.state.internalContent=this.props.content||this.props.initialContent||"",this.update());const t=this.state.getEditorElement();if(t&&(t.innerHTML=this.state.sanitizeHtml(this.state.internalContent),this.state.ensureEditableStructure(),this.state.renderEmbeds()),typeof document<"u"){const e="cv-editor-styles";if(!document.getElementById(e)){const i=document.createElement("style");i.id=e,i.innerHTML=".wysiwyg-content blockquote { border-left: 4px solid var(--cv-color-quote-accent, #7fc4de) !important; background: linear-gradient(90deg, var(--cv-color-accent-tint, rgba(127, 196, 222, 0.1)) 0%, transparent 100%) !important; padding: 20px 24px !important; margin: 24px 0 !important; border-radius: 0 16px 16px 0 !important; font-style: italic !important; color: var(--cv-color-text-main, #e2e8f0) !important; font-size: 1.1em !important; line-height: 1.8 !important; position: relative; box-shadow: inset 2px 0 0px var(--cv-color-border, rgba(255,255,255,0.1)); } .wysiwyg-content pre { background: var(--cv-color-code-bg, #0f172a) !important; border: 1px solid var(--cv-color-code-border, rgba(255,255,255,0.1)) !important; border-radius: 12px !important; padding: 20px !important; color: var(--cv-color-code-text, #38bdf8) !important; font-family: 'Fira Code', monospace !important; overflow-x: auto !important; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5) !important; } .wysiwyg-content ul { list-style-type: disc !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content ol { list-style-type: decimal !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content li { margin-bottom: 0.5em !important; display: list-item !important; } .wysiwyg-content a:not(.cv-btn) { color: var(--cv-color-link, #7fc4de) !important; text-decoration: underline !important; text-underline-offset: 3px !important; }",document.head.appendChild(i)}document.addEventListener("fullscreenchange",this.state.handleFullscreenChange),document.addEventListener("selectionchange",this.state.handleSelectionChange),document.addEventListener("keydown",this.state.handleGlobalKeyDown)}}onUpdate(){const o=this;(function(t,e){if(t.some((s,n)=>s!==e[n])){if(!o.state.isMounted)return;const s=o.state.getEditorElement();if(!s)return;typeof o.props.content=="string"&&o.props.content!==o.state.internalContent&&(o.state.internalContent=o.props.content,s.innerHTML=o.state.sanitizeHtml(o.state.internalContent),o.state.ensureEditableStructure(),o.state.renderEmbeds()),o.updateDeps[0]=e}})(o.updateDeps[0],[o.props.content])}update(){const o=this;if(this.pendingUpdate!==!0){this.pendingUpdate=!0;try{this.render(),this.onUpdate()}finally{this.pendingUpdate=!1}}}render(){const o=this,t=this.getStateful(this._root),e=this.prepareHydrate(t);if(this.destroyAnyNodes(),this.updateBindings(),e.length){const i=this.getStateful(this._root);this.hydrateDom(e,i)}}getStateful(o){const t=this,e=o.querySelectorAll("[data-dom-state]");return e?Array.from(e):[]}prepareHydrate(o){const t=this;return o.map(e=>{let i=null;try{["color","checkbox","radio","button","file","range","submit","reset","image"].includes(e.type)||(i=e.selectionStart)}catch{}return{id:e.dataset.domState,value:e.value,active:document.activeElement===e,selectionStart:i}})}hydrateDom(o,t){const e=this;return t.map((i,s)=>{const n=o.find(c=>i.dataset.domState===c.id);if(n&&n.active){i.value=n.value;try{i.focus()}catch{}try{!["color","checkbox","radio","button","file","range","submit","reset","image"].includes(i.type)&&n.selectionStart!==null&&n.selectionStart!==void 0&&(i.selectionStart=n.selectionStart)}catch{}}})}updateBindings(){const o=this;this._root.querySelectorAll("[data-el='div-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-rich-text-editor flex flex-col rounded-xl overflow-hidden relative ${this.state.isFullscreen?"fixed inset-0 z-[9999] w-screen h-screen rounded-none":"w-full"} ${this.props.className||""}`,__cvAssignStyle(t.style,{boxSizing:"border-box",background:"var(--cv-color-surface-sunken, #0f172a)",border:this.state.isFullscreen?"none":"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",boxShadow:"var(--cv-shadow-overlay, 0 8px 32px rgba(0,0,0,0.4))"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`editor-toolbar select-none sticky top-0 z-10 w-full ${this.state.isReadOnly()?"opacity-60 pointer-events-none":""}`}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor1Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor1Click),t.addEventListener("click",this.onButtonRichTextEditor1Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor2Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor2Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor2Click),t.addEventListener("click",this.onButtonRichTextEditor2Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("headings");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.headingFormat,t.removeEventListener("mousedown",this.onSelectRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onSelectRichTextEditor1Mousedown),t.removeEventListener("change",this.onSelectRichTextEditor1Change),t.addEventListener("change",this.onSelectRichTextEditor1Change)}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.fontFamily,t.removeEventListener("mousedown",this.onSelectRichTextEditor2Mousedown),t.addEventListener("mousedown",this.onSelectRichTextEditor2Mousedown),t.removeEventListener("change",this.onSelectRichTextEditor2Change),t.addEventListener("change",this.onSelectRichTextEditor2Change)}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.fontSize,t.removeEventListener("mousedown",this.onSelectRichTextEditor3Mousedown),t.addEventListener("mousedown",this.onSelectRichTextEditor3Mousedown),t.removeEventListener("change",this.onSelectRichTextEditor3Change),t.addEventListener("change",this.onSelectRichTextEditor3Change)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("bold");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.bold?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor3Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor3Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor3Click),t.addEventListener("click",this.onButtonRichTextEditor3Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("italic");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.italic?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor4Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor4Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor4Click),t.addEventListener("click",this.onButtonRichTextEditor4Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("underline");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.underline?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor5Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor5Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor5Click),t.addEventListener("click",this.onButtonRichTextEditor5Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("strikeThrough");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.strikeThrough?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor6Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor6Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor6Click),t.addEventListener("click",this.onButtonRichTextEditor6Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("code");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.code?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor7Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor7Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor7Click),t.addEventListener("click",this.onButtonRichTextEditor7Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("foreColor")||this.state.showToolbarOption("backColor");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("foreColor");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onLabelRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onLabelRichTextEditor1Mousedown)}catch{}}),this._root.querySelectorAll("[data-el='span-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{lineHeight:"1"})}catch{}}),this._root.querySelectorAll("[data-el='span-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{backgroundColor:this.state.textColor})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.textColor,t.removeEventListener("mousedown",this.onInputRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onInputRichTextEditor1Mousedown),t.removeEventListener("input",this.onInputRichTextEditor1Input),t.addEventListener("input",this.onInputRichTextEditor1Input),t.removeEventListener("change",this.onInputRichTextEditor1Change),t.addEventListener("change",this.onInputRichTextEditor1Change)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("backColor");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onLabelRichTextEditor2Mousedown),t.addEventListener("mousedown",this.onLabelRichTextEditor2Mousedown)}catch{}}),this._root.querySelectorAll("[data-el='span-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{backgroundColor:this.state.highlightColor})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.highlightColor,t.removeEventListener("mousedown",this.onInputRichTextEditor2Mousedown),t.addEventListener("mousedown",this.onInputRichTextEditor2Mousedown),t.removeEventListener("input",this.onInputRichTextEditor2Input),t.addEventListener("input",this.onInputRichTextEditor2Input),t.removeEventListener("change",this.onInputRichTextEditor2Change),t.addEventListener("change",this.onInputRichTextEditor2Change)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyLeft")||this.state.showToolbarOption("justifyCenter")||this.state.showToolbarOption("justifyRight");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyLeft");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.justifyLeft?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor8Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor8Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor8Click),t.addEventListener("click",this.onButtonRichTextEditor8Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyCenter");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.justifyCenter?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor9Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor9Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor9Click),t.addEventListener("click",this.onButtonRichTextEditor9Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyRight");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.justifyRight?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor10Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor10Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor10Click),t.addEventListener("click",this.onButtonRichTextEditor10Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.justifyFull?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor11Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor11Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor11Click),t.addEventListener("click",this.onButtonRichTextEditor11Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("unorderedList");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.unorderedList?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor12Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor12Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor12Click),t.addEventListener("click",this.onButtonRichTextEditor12Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("orderedList");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.activeFormats.orderedList?"is-active":""}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor13Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor13Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor13Click),t.addEventListener("click",this.onButtonRichTextEditor13Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor14Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor14Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor14Click),t.addEventListener("click",this.onButtonRichTextEditor14Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor15Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor15Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor15Click),t.addEventListener("click",this.onButtonRichTextEditor15Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showInsertMenu;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor16Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor16Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor16Click),t.addEventListener("click",this.onButtonRichTextEditor16Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor17Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor17Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor17Click),t.addEventListener("click",this.onButtonRichTextEditor17Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor18Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor18Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor18Click),t.addEventListener("click",this.onButtonRichTextEditor18Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor19Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor19Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor19Click),t.addEventListener("click",this.onButtonRichTextEditor19Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor20Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor20Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor20Click),t.addEventListener("click",this.onButtonRichTextEditor20Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor21Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor21Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor21Click),t.addEventListener("click",this.onButtonRichTextEditor21Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor22Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor22Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor22Click),t.addEventListener("click",this.onButtonRichTextEditor22Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor23Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor23Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor23Click),t.addEventListener("click",this.onButtonRichTextEditor23Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor24Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor24Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor24Click),t.addEventListener("click",this.onButtonRichTextEditor24Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("table");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor25Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor25Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor25Click),t.addEventListener("click",this.onButtonRichTextEditor25Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.activeFormats.inTable&&this.state.showToolbarOption("table");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor26Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor26Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor26Click),t.addEventListener("click",this.onButtonRichTextEditor26Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor27Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor27Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor27Click),t.addEventListener("click",this.onButtonRichTextEditor27Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor28Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor28Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor28Click),t.addEventListener("click",this.onButtonRichTextEditor28Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor29Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor29Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor29Click),t.addEventListener("click",this.onButtonRichTextEditor29Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("image");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-30']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor30Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor30Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor30Click),t.addEventListener("click",this.onButtonRichTextEditor30Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("link");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-31']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor31Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor31Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor31Click),t.addEventListener("click",this.onButtonRichTextEditor31Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-32']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor32Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor32Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor32Click),t.addEventListener("click",this.onButtonRichTextEditor32Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("social");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-33']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor33Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor33Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor33Click),t.addEventListener("click",this.onButtonRichTextEditor33Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("addWidget");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-34']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor34Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor34Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor34Click),t.addEventListener("click",this.onButtonRichTextEditor34Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("classInput");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='for-rich-text-editor']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null,p=this.state.appliedClasses;this.renderLoop(t,p,"cls")}catch{}}),this._root.querySelectorAll("[data-el='span-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.key=r}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;this.renderTextNode(t,r)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-35']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor35Click),t.addEventListener("click",this.onButtonRichTextEditor35Click),t.setAttribute("title","Remove "+r)}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("keydown",this.onInputRichTextEditor3Keydown),t.addEventListener("keydown",this.onInputRichTextEditor3Keydown)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.props.availableClasses&&this.props.availableClasses.length>0;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='for-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null,p=this.props.availableClasses;this.renderLoop(t,p,"cls")}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.value=r}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;this.renderTextNode(t,r)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("source");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-36']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-toolbar-btn ${this.state.mode==="source"?"is-active":""}`,t.removeEventListener("click",this.onButtonRichTextEditor36Click),t.addEventListener("click",this.onButtonRichTextEditor36Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("fullscreen");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-37']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor37Click),t.addEventListener("click",this.onButtonRichTextEditor37Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("save");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-38']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor38Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor38Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor38Click),t.addEventListener("click",this.onButtonRichTextEditor38Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`editor-content flex-1 overflow-y-auto relative min-h-[350px] cv-mode-${this.state.mode}`,t.removeEventListener("scroll",this.onDivRichTextEditor5Scroll),t.addEventListener("scroll",this.onDivRichTextEditor5Scroll),t.removeEventListener("click",this.onDivRichTextEditor5Click),t.addEventListener("click",this.onDivRichTextEditor5Click),__cvAssignStyle(t.style,{padding:"2rem 3rem",color:"var(--cv-color-text-main, #f1f5f9)",position:"relative",cursor:this.state.isReadOnly()?"default":"text"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.setAttribute("contentEditable",this.state.isReadOnly()?"false":"true"),t.className=`wysiwyg-content outline-none prose prose-invert max-w-none ${this.state.isReadOnly()?"cv-readonly":""}`,t.removeEventListener("input",this.onDivRichTextEditor6Input),t.addEventListener("input",this.onDivRichTextEditor6Input),t.removeEventListener("blur",this.onDivRichTextEditor6Blur),t.addEventListener("blur",this.onDivRichTextEditor6Blur),t.removeEventListener("keyup",this.onDivRichTextEditor6Keyup),t.addEventListener("keyup",this.onDivRichTextEditor6Keyup),t.removeEventListener("keydown",this.onDivRichTextEditor6Keydown),t.addEventListener("keydown",this.onDivRichTextEditor6Keydown),t.removeEventListener("mouseup",this.onDivRichTextEditor6Mouseup),t.addEventListener("mouseup",this.onDivRichTextEditor6Mouseup),t.removeEventListener("click",this.onDivRichTextEditor6Click),t.addEventListener("click",this.onDivRichTextEditor6Click),__cvAssignStyle(t.style,{minHeight:"350px",fontFamily:"Inter, sans-serif",lineHeight:"1.7",fontSize:"15px"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.selectedMediaEl&&!this.state.isReadOnly();this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{position:"absolute",top:`${this.state.resizeHandleTop}px`,left:`${this.state.resizeHandleLeft}px`,width:"14px",height:"14px",borderRadius:"3px",background:"var(--cv-color-primary, #245066)",border:"2px solid var(--cv-color-surface-raised, #fff)",cursor:"nwse-resize",zIndex:30,boxShadow:"0 1px 4px rgba(0,0,0,0.4)"}),t.removeEventListener("mousedown",this.onDivRichTextEditor7Mousedown),t.addEventListener("mousedown",this.onDivRichTextEditor7Mousedown)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{position:"absolute",top:`${this.state.resizeToolbarTop}px`,left:`${this.state.resizeToolbarLeft}px`,zIndex:35})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-39']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor39Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor39Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor39Click),t.addEventListener("click",this.onButtonRichTextEditor39Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-40']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor40Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor40Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor40Click),t.addEventListener("click",this.onButtonRichTextEditor40Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-41']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor41Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor41Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor41Click),t.addEventListener("click",this.onButtonRichTextEditor41Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-42']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor42Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor42Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor42Click),t.addEventListener("click",this.onButtonRichTextEditor42Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{height:"14px",margin:"0 2px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-43']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor43Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor43Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor43Click),t.addEventListener("click",this.onButtonRichTextEditor43Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-44']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor44Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor44Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor44Click),t.addEventListener("click",this.onButtonRichTextEditor44Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-45']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor45Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor45Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor45Click),t.addEventListener("click",this.onButtonRichTextEditor45Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{height:"14px",margin:"0 2px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-46']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor46Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor46Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor46Click),t.addEventListener("click",this.onButtonRichTextEditor46Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showTableModal||this.state.showLinkModal||this.state.showWidgetModal||this.state.showSocialModal||this.state.showButtonModal||this.state.showAiModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"rgba(0, 0, 0, 0.6)"}),t.removeEventListener("click",this.onDivRichTextEditor11Click),t.addEventListener("click",this.onDivRichTextEditor11Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-30']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showAiModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-47']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor47Click),t.addEventListener("click",this.onButtonRichTextEditor47Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"20px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-48']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor48Click),t.addEventListener("click",this.onButtonRichTextEditor48Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-49']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor49Click),t.addEventListener("click",this.onButtonRichTextEditor49Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-50']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor50Click),t.addEventListener("click",this.onButtonRichTextEditor50Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-51']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("click",this.onButtonRichTextEditor51Click),t.addEventListener("click",this.onButtonRichTextEditor51Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"10px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-52']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"8px 16px",fontSize:"13px",color:"#cbd5e1",background:"rgba(255,255,255,0.05)",border:"none",borderRadius:"6px",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor52Click),t.addEventListener("click",this.onButtonRichTextEditor52Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-31']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showButtonModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-primary, #7fc4de)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none"}),t.value=this.state.btnStyle,t.removeEventListener("change",this.onSelectRichTextEditor4Change),t.addEventListener("change",this.onSelectRichTextEditor4Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.btnText,t.removeEventListener("input",this.onInputRichTextEditor4Input),t.addEventListener("input",this.onInputRichTextEditor4Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.btnUrl,t.removeEventListener("input",this.onInputRichTextEditor5Input),t.addEventListener("input",this.onInputRichTextEditor5Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-53']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor53Click),t.addEventListener("click",this.onButtonRichTextEditor53Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-54']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.2))"}),t.removeEventListener("click",this.onButtonRichTextEditor54Click),t.addEventListener("click",this.onButtonRichTextEditor54Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-32']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showTableModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"340px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-link, #7fc4de)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",gap:"16px",marginBottom:"20px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{flex:1,display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px",width:"100%",fontSize:"15px",color:"var(--cv-color-text-main, #fff)",outline:"none",textAlign:"center",boxSizing:"border-box"}),t.value=this.state.tableRows,t.removeEventListener("input",this.onInputRichTextEditor6Input),t.addEventListener("input",this.onInputRichTextEditor6Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{flex:1,display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px",width:"100%",fontSize:"15px",color:"var(--cv-color-text-main, #fff)",outline:"none",textAlign:"center",boxSizing:"border-box"}),t.value=this.state.tableCols,t.removeEventListener("input",this.onInputRichTextEditor7Input),t.addEventListener("input",this.onInputRichTextEditor7Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",alignItems:"center",gap:"10px",marginBottom:"28px"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{width:"18px",height:"18px",borderRadius:"4px",cursor:"pointer",accentColor:"var(--cv-color-link, #7fc4de)"}),t.setAttribute("checked",this.state.tableHasHeader),t.removeEventListener("change",this.onInputRichTextEditor8Change),t.addEventListener("change",this.onInputRichTextEditor8Change)}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",cursor:"pointer",userSelect:"none"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-55']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor55Click),t.addEventListener("click",this.onButtonRichTextEditor55Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-56']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor56Click),t.addEventListener("click",this.onButtonRichTextEditor56Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-33']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showLinkModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-link, #7fc4de)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.linkUrl,t.removeEventListener("input",this.onInputRichTextEditor9Input),t.addEventListener("input",this.onInputRichTextEditor9Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-57']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor57Click),t.addEventListener("click",this.onButtonRichTextEditor57Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-58']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-color-info-fill, #075985)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor58Click),t.addEventListener("click",this.onButtonRichTextEditor58Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-34']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showWidgetModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-secondary, #5eb3d6)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-30']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.selectedWidget,t.removeEventListener("change",this.onSelectRichTextEditor5Change),t.addEventListener("change",this.onSelectRichTextEditor5Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-31']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-59']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor59Click),t.addEventListener("click",this.onButtonRichTextEditor59Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-60']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor60Click),t.addEventListener("click",this.onButtonRichTextEditor60Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-35']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showSocialModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-32']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-info, #0ea5e9)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-33']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-34']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.socialPlatform,t.removeEventListener("change",this.onSelectRichTextEditor6Change),t.addEventListener("change",this.onSelectRichTextEditor6Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-35']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.socialUrl,t.removeEventListener("input",this.onInputRichTextEditor10Input),t.addEventListener("input",this.onInputRichTextEditor10Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-36']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-61']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor61Click),t.addEventListener("click",this.onButtonRichTextEditor61Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-62']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-color-info-fill, #075985)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor62Click),t.addEventListener("click",this.onButtonRichTextEditor62Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-37']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`editor-source flex-1 relative min-h-[350px] overflow-hidden cv-mode-src-${this.state.mode}`,__cvAssignStyle(t.style,{flexDirection:"column",height:"100%",minHeight:"350px"})}catch{}}),this._root.querySelectorAll("[data-el='textarea-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,s=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,c=this.getScope?this.getScope(t,"rowIndex"):0,h=this.getScope?this.getScope(t,"mediaIndex"):0,d=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.internalContent,t.removeEventListener("input",this.onTextareaRichTextEditor1Input),t.addEventListener("input",this.onTextareaRichTextEditor1Input),__cvAssignStyle(t.style,{whiteSpace:"pre-wrap",overflowY:"auto",resize:"none",height:"100%",width:"100%",boxSizing:"border-box"}),t.setAttribute("spellcheck",!1)}catch{}})}renderTextNode(o,t){const e=this,i=document.createTextNode(t);o?.scope&&(i.scope=o.scope),o?.context&&(i.context=o.context),o.after(i),this.nodesToDestroy.push(o.nextSibling)}getScope(o,t){const e=this;do{let i=o?.scope?.[t];if(i!==void 0)return i}while(o=o.parentNode)}renderLoop(o,t,e,i,s){const n=this;if(t||(t=[]),o.__renderedArray&&o.__renderedArray.length===t.length&&t.every((r,p)=>o.__renderedArray[p]===r))return;o.__renderedNodes&&o.__renderedNodes.forEach(r=>{r.remove();const p=this.nodesToDestroy.indexOf(r);p!==-1&&this.nodesToDestroy.splice(p,1)});const h=[],d=[];for(let[r,p]of t.entries()){const w=o.content.cloneNode(!0),R=Array.from(w.childNodes),nt={};let N=nt;if(o?.scope){const _={get(Q,L,H){return L in Q?Q[L]:L in o.scope?o.scope[L]:Q[L]}};N=new Proxy(nt,_)}R.forEach(_=>{e!==void 0&&(N[e]=p),i!==void 0&&(N[i]=r),s!==void 0&&(N[s]=t),_.scope=N,o.context&&(_.context=o.context),_.__persistent=!0,this.nodesToDestroy.push(_),h.unshift(_),d.push(_)})}h.forEach(r=>o.after(r)),o.__renderedArray=[...t],o.__renderedNodes=d}};customElements.define("cv-rich-text-editor",RichTextEditor);function __cvAssignStyle(o,t){if(!o||!t)return o;for(const e in t){const i=t[e];e.charCodeAt(0)===45&&e.charCodeAt(1)===45?i===""||i===null||i===void 0?o.removeProperty(e):o.setProperty(e,String(i)):o[e]=i}return o}/*! Bundled license information:

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.4.15 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.15/LICENSE *)
*/
