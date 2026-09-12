function _arrayLikeToArray(o,t){(t==null||t>o.length)&&(t=o.length);for(var e=0,i=Array(t);e<t;e++)i[e]=o[e];return i}function _arrayWithHoles(o){if(Array.isArray(o))return o}function _iterableToArrayLimit(o,t){var e=o==null?null:typeof Symbol<"u"&&o[Symbol.iterator]||o["@@iterator"];if(e!=null){var i,c,n,l,d=[],h=!0,r=!1;try{if(n=(e=e.call(o)).next,t!==0)for(;!(h=(i=n.call(e)).done)&&(d.push(i.value),d.length!==t);h=!0);}catch(p){r=!0,c=p}finally{try{if(!h&&e.return!=null&&(l=e.return(),Object(l)!==l))return}finally{if(r)throw c}}return d}}function _nonIterableRest(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function _slicedToArray(o,t){return _arrayWithHoles(o)||_iterableToArrayLimit(o,t)||_unsupportedIterableToArray(o,t)||_nonIterableRest()}function _unsupportedIterableToArray(o,t){if(o){if(typeof o=="string")return _arrayLikeToArray(o,t);var e={}.toString.call(o).slice(8,-1);return e==="Object"&&o.constructor&&(e=o.constructor.name),e==="Map"||e==="Set"?Array.from(o):e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?_arrayLikeToArray(o,t):void 0}}var entries=Object.entries,setPrototypeOf=Object.setPrototypeOf,isFrozen=Object.isFrozen,getPrototypeOf=Object.getPrototypeOf,getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor,freeze=Object.freeze,seal=Object.seal,create=Object.create,_ref=typeof Reflect<"u"&&Reflect,apply=_ref.apply,construct=_ref.construct;freeze||(freeze=function(t){return t}),seal||(seal=function(t){return t}),apply||(apply=function(t,e){for(var i=arguments.length,c=new Array(i>2?i-2:0),n=2;n<i;n++)c[n-2]=arguments[n];return t.apply(e,c)}),construct||(construct=function(t){for(var e=arguments.length,i=new Array(e>1?e-1:0),c=1;c<e;c++)i[c-1]=arguments[c];return new t(...i)});var arrayForEach=unapply(Array.prototype.forEach),arrayLastIndexOf=unapply(Array.prototype.lastIndexOf),arrayPop=unapply(Array.prototype.pop),arrayPush=unapply(Array.prototype.push),arraySplice=unapply(Array.prototype.splice),arrayIsArray=Array.isArray,stringToLowerCase=unapply(String.prototype.toLowerCase),stringToString=unapply(String.prototype.toString),stringMatch=unapply(String.prototype.match),stringReplace=unapply(String.prototype.replace),stringIndexOf=unapply(String.prototype.indexOf),stringTrim=unapply(String.prototype.trim),numberToString=unapply(Number.prototype.toString),booleanToString=unapply(Boolean.prototype.toString),bigintToString=typeof BigInt>"u"?null:unapply(BigInt.prototype.toString),symbolToString=typeof Symbol>"u"?null:unapply(Symbol.prototype.toString),objectHasOwnProperty=unapply(Object.prototype.hasOwnProperty),objectToString=unapply(Object.prototype.toString),regExpTest=unapply(RegExp.prototype.test),typeErrorCreate=unconstruct(TypeError);function unapply(o){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var e=arguments.length,i=new Array(e>1?e-1:0),c=1;c<e;c++)i[c-1]=arguments[c];return apply(o,t,i)}}function unconstruct(o){return function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return construct(o,e)}}function addToSet(o,t){let e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:stringToLowerCase;if(setPrototypeOf&&setPrototypeOf(o,null),!arrayIsArray(t))return o;let i=t.length;for(;i--;){let c=t[i];if(typeof c=="string"){const n=e(c);n!==c&&(isFrozen(t)||(t[i]=n),c=n)}o[c]=!0}return o}function cleanArray(o){for(let t=0;t<o.length;t++)objectHasOwnProperty(o,t)||(o[t]=null);return o}function clone(o){const t=create(null);for(const i of entries(o)){var e=_slicedToArray(i,2);const c=e[0],n=e[1];objectHasOwnProperty(o,c)&&(arrayIsArray(n)?t[c]=cleanArray(n):n&&typeof n=="object"&&n.constructor===Object?t[c]=clone(n):t[c]=n)}return t}function stringifyValue(o){switch(typeof o){case"string":return o;case"number":return numberToString(o);case"boolean":return booleanToString(o);case"bigint":return bigintToString?bigintToString(o):"0";case"symbol":return symbolToString?symbolToString(o):"Symbol()";case"undefined":return objectToString(o);case"function":case"object":{if(o===null)return objectToString(o);const t=o,e=lookupGetter(t,"toString");if(typeof e=="function"){const i=e(t);return typeof i=="string"?i:objectToString(i)}return objectToString(o)}default:return objectToString(o)}}function lookupGetter(o,t){for(;o!==null;){const i=getOwnPropertyDescriptor(o,t);if(i){if(i.get)return unapply(i.get);if(typeof i.value=="function")return unapply(i.value)}o=getPrototypeOf(o)}function e(){return null}return e}function isRegex(o){try{return regExpTest(o,""),!0}catch{return!1}}var html$1=freeze(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),svg$1=freeze(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),svgFilters=freeze(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),svgDisallowed=freeze(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),mathMl$1=freeze(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),mathMlDisallowed=freeze(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),text=freeze(["#text"]),html=freeze(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),svg=freeze(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),mathMl=freeze(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),xml=freeze(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),MUSTACHE_EXPR=seal(/{{[\w\W]*|^[\w\W]*}}/g),ERB_EXPR=seal(/<%[\w\W]*|^[\w\W]*%>/g),TMPLIT_EXPR=seal(/\${[\w\W]*/g),DATA_ATTR=seal(/^data-[\-\w.\u00B7-\uFFFF]+$/),ARIA_ATTR=seal(/^aria-[\-\w]+$/),IS_ALLOWED_URI=seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),IS_SCRIPT_OR_DATA=seal(/^(?:\w+script|data):/i),ATTR_WHITESPACE=seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),DOCTYPE_NAME=seal(/^html$/i),CUSTOM_ELEMENT=seal(/^[a-z][.\w]*(-[.\w]+)+$/i),ELEMENT_MARKUP_PROBE=seal(/<[/\w!]/g),COMMENT_MARKUP_PROBE=seal(/<[/\w]/g),FALLBACK_TAG_CLOSE=seal(/<\/no(script|embed|frames)/i),SELF_CLOSING_TAG=seal(/\/>/i),NODE_TYPE={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},LITERAL_TEXT_ELEMENT_NAMES=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],LITERAL_TEXT_ELEMENTS=freeze(addToSet({},LITERAL_TEXT_ELEMENT_NAMES)),LITERAL_TEXT_CLOSE=(function(){const o={};return arrayForEach(LITERAL_TEXT_ELEMENT_NAMES,t=>{o[t]=seal(new RegExp("</"+t+"(?=[\\t\\n\\f\\r />])","i"))}),freeze(o)})(),getGlobal=function(){return typeof window>"u"?null:window},_createTrustedTypesPolicy=function(t,e){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const c="data-tt-policy-suffix";e&&e.hasAttribute(c)&&(i=e.getAttribute(c));const n="dompurify"+(i?"#"+i:"");try{return t.createPolicy(n,{createHTML(l){return l},createScriptURL(l){return l}})}catch{return console.warn("TrustedTypes policy "+n+" could not be created."),null}},_createHooksMap=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},_resolveSetOption=function(t,e,i,c){return objectHasOwnProperty(t,e)&&arrayIsArray(t[e])?addToSet(c.base?clone(c.base):{},t[e],c.transform):i},_resolveObjectOption=function(t,e,i){const c=objectHasOwnProperty(t,e)?t[e]:void 0;return c&&typeof c=="object"?clone(c):i()};function createDOMPurify(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:getGlobal();const t=S=>createDOMPurify(S);if(t.version="3.4.15",t.removed=[],!o||!o.document||o.document.nodeType!==NODE_TYPE.document||!o.Element)return t.isSupported=!1,t;let e=o.document;const i=e,c=i.currentScript;o.DocumentFragment;const n=o.HTMLTemplateElement,l=o.Node,d=o.Element,h=o.NodeFilter,r=o.NamedNodeMap;r===void 0&&(o.NamedNodeMap||o.MozNamedAttrMap),o.HTMLFormElement;const p=o.DOMParser,C=o.trustedTypes,L=d.prototype,nt=lookupGetter(L,"cloneNode"),D=lookupGetter(L,"remove"),A=lookupGetter(L,"removeAttributeNode"),J=lookupGetter(L,"nextSibling"),k=lookupGetter(L,"childNodes"),F=lookupGetter(L,"parentNode"),Ft=lookupGetter(L,"shadowRoot"),It=lookupGetter(L,"attributes"),z=l&&l.prototype?lookupGetter(l.prototype,"nodeType"):null,$=l&&l.prototype?lookupGetter(l.prototype,"nodeName"):null,ct=l&&l.prototype?lookupGetter(l.prototype,"ownerDocument"):null,tt=function(s){return z?z(s):s.nodeType},vt=function(s){return $?$(s):s.nodeName};if(typeof n=="function"){const S=e.createElement("template");S.content&&S.content.ownerDocument&&(e=S.content.ownerDocument)}let R,H="",yt,zt=!1,et=0;const Ht=function(){if(et>0)throw typeErrorCreate('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},G=function(s){Ht(),et++;try{return R.createHTML(s)}finally{et--}},fe=function(s){Ht(),et++;try{return R.createScriptURL(s)}finally{et--}},Ie=function(){return zt||(yt=_createTrustedTypesPolicy(C,c),zt=!0),yt},lt=e,bt=lt.implementation,Ut=lt.createNodeIterator,ve=lt.createDocumentFragment,ye=lt.getElementsByTagName,be=i.importNode;let f=_createHooksMap();t.isSupported=typeof entries=="function"&&typeof F=="function"&&bt&&bt.createHTMLDocument!==void 0;const Ee=MUSTACHE_EXPR,Re=ERB_EXPR,Te=TMPLIT_EXPR,_e=DATA_ATTR,Ce=ARIA_ATTR,ke=IS_SCRIPT_OR_DATA,jt=ATTR_WHITESPACE,Ae=CUSTOM_ELEMENT;let Wt=IS_ALLOWED_URI,I=null;const Et=addToSet({},[...html$1,...svg$1,...svgFilters,...mathMl$1,...text]);let v=null;const Rt=addToSet({},[...html,...svg,...mathMl,...xml]);let M=Object.seal(create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ot=null,$t=null;const N=Object.seal(create(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Gt=!0,Tt=!0,Vt=!1,Yt=!0,q=!1,U=!0,j=!1,_t=!1,rt=null,dt=null,Ct=!1,V=!1,ht=!1,at=!1,Xt=!0,Kt=!1;const Zt="user-content-";let kt=!0,At=!1,Y={},X=null;const Qt=addToSet({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Jt=null;const te=addToSet({},["audio","video","img","source","image","track"]);let ee=null;const oe=addToSet({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),pt="http://www.w3.org/1998/Math/MathML",gt="http://www.w3.org/2000/svg",B="http://www.w3.org/1999/xhtml";let K=B,Lt=!1,Mt=null;const Le=addToSet({},[pt,gt,B],stringToString),ie=freeze(["mi","mo","mn","ms","mtext"]);let Bt=addToSet({},ie);const se=freeze(["annotation-xml"]);let Ot=addToSet({},se);const Me=addToSet({},["title","style","font","a","script"]);let it=null;const Be=["application/xhtml+xml","text/html"],Oe="text/html";let b=null,Z=null;const De=e.createElement("form"),ne=function(s){return s instanceof RegExp||s instanceof Function},Dt=function(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(Z&&Z===s)return;(!s||typeof s!="object")&&(s={}),s=clone(s),it=Be.indexOf(s.PARSER_MEDIA_TYPE)===-1?Oe:s.PARSER_MEDIA_TYPE,b=it==="application/xhtml+xml"?stringToString:stringToLowerCase,I=_resolveSetOption(s,"ALLOWED_TAGS",Et,{transform:b}),v=_resolveSetOption(s,"ALLOWED_ATTR",Rt,{transform:b}),Mt=_resolveSetOption(s,"ALLOWED_NAMESPACES",Le,{transform:stringToString}),ee=_resolveSetOption(s,"ADD_URI_SAFE_ATTR",oe,{transform:b,base:oe}),Jt=_resolveSetOption(s,"ADD_DATA_URI_TAGS",te,{transform:b,base:te}),X=_resolveSetOption(s,"FORBID_CONTENTS",Qt,{transform:b}),ot=_resolveSetOption(s,"FORBID_TAGS",clone({}),{transform:b}),$t=_resolveSetOption(s,"FORBID_ATTR",clone({}),{transform:b}),Y=objectHasOwnProperty(s,"USE_PROFILES")?s.USE_PROFILES&&typeof s.USE_PROFILES=="object"?clone(s.USE_PROFILES):s.USE_PROFILES:!1,Gt=s.ALLOW_ARIA_ATTR!==!1,Tt=s.ALLOW_DATA_ATTR!==!1,Vt=s.ALLOW_UNKNOWN_PROTOCOLS||!1,Yt=s.ALLOW_SELF_CLOSE_IN_ATTR!==!1,q=s.SAFE_FOR_TEMPLATES||!1,U=s.SAFE_FOR_XML!==!1,j=s.WHOLE_DOCUMENT||!1,V=s.RETURN_DOM||!1,ht=s.RETURN_DOM_FRAGMENT||!1,at=s.RETURN_TRUSTED_TYPE||!1,Ct=s.FORCE_BODY||!1,Xt=s.SANITIZE_DOM!==!1,Kt=s.SANITIZE_NAMED_PROPS||!1,kt=s.KEEP_CONTENT!==!1,At=s.IN_PLACE||!1,Wt=isRegex(s.ALLOWED_URI_REGEXP)?s.ALLOWED_URI_REGEXP:IS_ALLOWED_URI,K=typeof s.NAMESPACE=="string"?s.NAMESPACE:B,Bt=_resolveObjectOption(s,"MATHML_TEXT_INTEGRATION_POINTS",()=>addToSet({},ie)),Ot=_resolveObjectOption(s,"HTML_INTEGRATION_POINTS",()=>addToSet({},se));const a=_resolveObjectOption(s,"CUSTOM_ELEMENT_HANDLING",()=>create(null));if(M=create(null),objectHasOwnProperty(a,"tagNameCheck")&&ne(a.tagNameCheck)&&(M.tagNameCheck=a.tagNameCheck),objectHasOwnProperty(a,"attributeNameCheck")&&ne(a.attributeNameCheck)&&(M.attributeNameCheck=a.attributeNameCheck),objectHasOwnProperty(a,"allowCustomizedBuiltInElements")&&typeof a.allowCustomizedBuiltInElements=="boolean"&&(M.allowCustomizedBuiltInElements=a.allowCustomizedBuiltInElements),seal(M),q&&(Tt=!1),ht&&(V=!0),Y&&(I=addToSet({},text),v=create(null),Y.html===!0&&(addToSet(I,html$1),addToSet(v,html)),Y.svg===!0&&(addToSet(I,svg$1),addToSet(v,svg),addToSet(v,xml)),Y.svgFilters===!0&&(addToSet(I,svgFilters),addToSet(v,svg),addToSet(v,xml)),Y.mathMl===!0&&(addToSet(I,mathMl$1),addToSet(v,mathMl),addToSet(v,xml))),N.tagCheck=null,N.attributeCheck=null,objectHasOwnProperty(s,"ADD_TAGS")&&(typeof s.ADD_TAGS=="function"?N.tagCheck=s.ADD_TAGS:arrayIsArray(s.ADD_TAGS)&&(I===Et&&(I=clone(I)),addToSet(I,s.ADD_TAGS,b))),objectHasOwnProperty(s,"ADD_ATTR")&&(typeof s.ADD_ATTR=="function"?N.attributeCheck=s.ADD_ATTR:arrayIsArray(s.ADD_ATTR)&&(v===Rt&&(v=clone(v)),addToSet(v,s.ADD_ATTR,b))),objectHasOwnProperty(s,"ADD_FORBID_CONTENTS")&&arrayIsArray(s.ADD_FORBID_CONTENTS)&&(X===Qt&&(X=clone(X)),addToSet(X,s.ADD_FORBID_CONTENTS,b)),kt&&(I["#text"]=!0),j&&addToSet(I,["html","head","body"]),I.table&&(addToSet(I,["tbody"]),delete ot.tbody),s.TRUSTED_TYPES_POLICY){if(typeof s.TRUSTED_TYPES_POLICY.createHTML!="function")throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof s.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const g=R;R=s.TRUSTED_TYPES_POLICY;try{H=G("")}catch(x){throw R=g,x}}else s.TRUSTED_TYPES_POLICY===null?(R=void 0,H=""):(R===void 0&&(R=Ie()),R&&typeof H=="string"&&(H=G("")));freeze&&freeze(s),Z=s},ce=addToSet({},[...svg$1,...svgFilters,...svgDisallowed]),le=addToSet({},[...mathMl$1,...mathMlDisallowed]),Ne=function(s,a,g){return a.namespaceURI===B?s==="svg":a.namespaceURI===pt?s==="svg"&&(g==="annotation-xml"||Bt[g]):!!ce[s]},qe=function(s,a,g){return a.namespaceURI===B?s==="math":a.namespaceURI===gt?s==="math"&&Ot[g]:!!le[s]},Pe=function(s,a,g){return a.namespaceURI===gt&&!Ot[g]||a.namespaceURI===pt&&!Bt[g]?!1:!le[s]&&(Me[s]||!ce[s])},Fe=function(s){let a=F(s);(!a||!a.tagName)&&(a={namespaceURI:K,tagName:"template"});const g=stringToLowerCase(s.tagName),x=stringToLowerCase(a.tagName);return Mt[s.namespaceURI]?s.namespaceURI===gt?Ne(g,a,x):s.namespaceURI===pt?qe(g,a,x):s.namespaceURI===B?Pe(g,a,x):!!(it==="application/xhtml+xml"&&Mt[s.namespaceURI]):!1},P=function(s){arrayPush(t.removed,{element:s});try{F(s).removeChild(s)}catch{if(D(s),!F(s))throw typeErrorCreate("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},re=function(s,a,g){try{A(s,a)}catch{try{s.removeAttribute(g)}catch{}}},St=function(s){xt(s);const a=k(s);if(a){const x=[];arrayForEach(a,u=>{arrayPush(x,u)}),arrayForEach(x,u=>{try{D(u)}catch{}})}const g=It(s);if(g)for(let x=g.length-1;x>=0;--x){const u=g[x],m=u&&u.name;typeof m=="string"&&re(s,u,m)}},W=function(s,a,g){if(!g)try{g=a.getAttributeNode(s)}catch{g=null}arrayPush(t.removed,{attribute:g||null,from:a});try{g?A(a,g):a.removeAttribute(s)}catch{try{a.removeAttribute(s)}catch{}}if(s==="is")if(V||ht)try{P(a)}catch{}else try{a.setAttribute(s,"")}catch{}},ze=function(s){const a=It(s);if(a)for(let g=a.length-1;g>=0;--g){const x=a[g],u=x&&x.name;typeof u!="string"||v[b(u)]||re(s,x,u)}},xt=function(s){const a=[s];for(;a.length>0;){const g=a.pop();tt(g)===NODE_TYPE.element&&ze(g);const u=k(g);if(u)for(let m=u.length-1;m>=0;--m)a.push(u[m])}},de=function(s,a){return U?s==="patchsrc"?!0:s==="for"&&a!=="label"&&a!=="output":!1},He=function(s){if(!U)return;const a=[s];for(;a.length>0;){const g=a.pop(),x=tt(g);if(x===NODE_TYPE.processingInstruction||x===NODE_TYPE.comment&&regExpTest(COMMENT_MARKUP_PROBE,g.data)){try{D(g)}catch{}continue}if(x===NODE_TYPE.element){const m=g,w=b(vt(g));try{m.hasAttribute&&m.hasAttribute("patchsrc")&&m.removeAttribute("patchsrc"),m.hasAttribute&&m.hasAttribute("for")&&de("for",w)&&m.removeAttribute("for")}catch{}}const u=k(g);if(u)for(let m=u.length-1;m>=0;--m)a.push(u[m])}},he=function(s){let a=null,g=null;if(Ct)s="<remove></remove>"+s;else{const m=stringMatch(s,/^[\r\n\t ]+/);g=m&&m[0]}it==="application/xhtml+xml"&&K===B&&(s='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+s+"</body></html>");const x=R?G(s):s;if(K===B)try{a=new p().parseFromString(x,it)}catch{}if(!a||!a.documentElement){a=bt.createDocument(K,"template",null);try{a.documentElement.innerHTML=Lt?H:x}catch{}}const u=a.body||a.documentElement;return s&&g&&u.insertBefore(e.createTextNode(g),u.childNodes[0]||null),K===B?ye.call(a,j?"html":"body")[0]:j?a.documentElement:u},ae=function(s){const a=ct?ct(s):s.ownerDocument;return Ut.call(a||s,s,h.SHOW_ELEMENT|h.SHOW_COMMENT|h.SHOW_TEXT|h.SHOW_PROCESSING_INSTRUCTION|h.SHOW_CDATA_SECTION,null)},ut=function(s){return s=stringReplace(s,Ee," "),s=stringReplace(s,Re," "),s=stringReplace(s,Te," "),s},Nt=function(s){var a;s.normalize();const g=ct?ct(s):s.ownerDocument,x=Ut.call(g||s,s,h.SHOW_TEXT|h.SHOW_COMMENT|h.SHOW_CDATA_SECTION|h.SHOW_PROCESSING_INSTRUCTION,null);let u=x.nextNode();for(;u;)u.data=ut(u.data),u=x.nextNode();const m=(a=s.querySelectorAll)===null||a===void 0?void 0:a.call(s,"template");m&&arrayForEach(m,w=>{Q(w.content)&&Nt(w.content)})},mt=function(s){const a=$?$(s):null;return typeof a!="string"||b(a)!=="form"?!1:typeof s.nodeName!="string"||typeof s.textContent!="string"||typeof s.removeChild!="function"||s.attributes!==It(s)||typeof s.removeAttribute!="function"||typeof s.removeAttributeNode!="function"||typeof s.getAttributeNode!="function"||typeof s.setAttribute!="function"||typeof s.namespaceURI!="string"||typeof s.insertBefore!="function"||typeof s.hasChildNodes!="function"||s.nodeType!==z(s)||s.childNodes!==k(s)},Q=function(s){if(!z||typeof s!="object"||s===null)return!1;try{return z(s)===NODE_TYPE.documentFragment}catch{return!1}},st=function(s){if(!z||typeof s!="object"||s===null)return!1;try{return typeof z(s)=="number"}catch{return!1}};function O(S,s,a){S.length!==0&&arrayForEach(S,g=>{g.call(t,s,a,Z)})}const Ue=function(s,a){return!!(U&&s.hasChildNodes()&&!st(s.firstElementChild)&&regExpTest(ELEMENT_MARKUP_PROBE,s.textContent)&&regExpTest(ELEMENT_MARKUP_PROBE,s.innerHTML)||U&&s.namespaceURI===B&&LITERAL_TEXT_ELEMENTS[a]&&(st(s.firstElementChild)||typeof s.textContent=="string"&&regExpTest(LITERAL_TEXT_CLOSE[a],s.textContent))||s.nodeType===NODE_TYPE.processingInstruction||U&&s.nodeType===NODE_TYPE.comment&&regExpTest(COMMENT_MARKUP_PROBE,s.data))},wt=function(s,a){if(s instanceof RegExp)return regExpTest(s,a);if(s instanceof Function){for(var g=arguments.length,x=new Array(g>2?g-2:0),u=2;u<g;u++)x[u-2]=arguments[u];return!!s(a,...x)}return!1},je=function(s,a,g){if(!ot[a]&&ue(a)&&wt(M.tagNameCheck,a))return!1;if(kt&&!X[a]){const x=F(s),u=k(s);if(u&&x){const m=u.length;for(let w=m-1;w>=0;--w){const y=s===g?nt(u[w],!0):u[w];x.insertBefore(y,J(s))}}}return P(s),!0},pe=function(s,a,g,x){return s.length===0?a:a===g||a===x?clone(a):a},ge=function(s,a){return s===a||F(s)!==null?!1:(At&&xt(s),!0)},Se=function(s,a){if(O(f.beforeSanitizeElements,s,null),ge(s,a))return!0;if(mt(s))return P(s),!0;const g=b(vt(s));if(I=pe(f.uponSanitizeElement,I,Et,rt),O(f.uponSanitizeElement,s,{tagName:g,allowedTags:I}),ge(s,a))return!0;if(Ue(s,g))return P(s),!0;if(ot[g]||!(N.tagCheck instanceof Function&&N.tagCheck(g))&&!I[g]){const u=je(s,g,a);return u===!1&&O(f.afterSanitizeElements,s,null),u}if(tt(s)===NODE_TYPE.element&&!Fe(s)||(g==="noscript"||g==="noembed"||g==="noframes")&&regExpTest(FALLBACK_TAG_CLOSE,s.innerHTML))return P(s),!0;if(q&&s.nodeType===NODE_TYPE.text){const u=ut(s.textContent);s.textContent!==u&&(arrayPush(t.removed,{element:s.cloneNode()}),s.textContent=u)}return O(f.afterSanitizeElements,s,null),!1},xe=function(s,a,g){if($t[a]||de(a,s)||Xt&&(a==="id"||a==="name")&&(g in e||g in De))return!1;const x=v[a]||N.attributeCheck instanceof Function&&N.attributeCheck(a,s);return Tt&&regExpTest(_e,a)||Gt&&regExpTest(Ce,a)?!0:x?ee[a]||regExpTest(Wt,stringReplace(g,jt,""))||(a==="src"||a==="xlink:href"||a==="href")&&s!=="script"&&stringIndexOf(g,"data:")===0&&Jt[s]||Vt&&!regExpTest(ke,stringReplace(g,jt,""))?!0:!g:ue(s)&&wt(M.tagNameCheck,s)&&wt(M.attributeNameCheck,a,s)||a==="is"&&M.allowCustomizedBuiltInElements&&wt(M.tagNameCheck,g)},We=addToSet({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),ue=function(s){return!We[stringToLowerCase(s)]&&regExpTest(Ae,s)},$e=function(s,a,g,x){if(R&&typeof C=="object"&&typeof C.getAttributeType=="function"&&!g)switch(C.getAttributeType(s,a)){case"TrustedHTML":return G(x);case"TrustedScriptURL":return fe(x)}return x},Ge=function(s,a,g,x){try{return g?s.setAttributeNS(g,a,x):s.setAttribute(a,x),mt(s)?(P(s),!1):!0}catch{return W(a,s),!1}},me=function(s){O(f.beforeSanitizeAttributes,s,null);const a=s.attributes;if(!a||mt(s))return;v=pe(f.uponSanitizeAttribute,v,Rt,dt);const g={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:v,forceKeepAttr:void 0};let x=a.length;const u=b(s.nodeName);for(;x--;){const m=a[x],w=m.name,y=m.namespaceURI,T=m.value,_=b(w),Pt=T;let E=w==="value"?Pt:stringTrim(Pt),we=!1;if(g.attrName=_,g.attrValue=E,g.keepAttr=!0,g.forceKeepAttr=void 0,O(f.uponSanitizeAttribute,s,g),E=g.attrValue,Kt&&(_==="id"||_==="name")&&stringIndexOf(E,Zt)!==0&&(W(w,s,m),E=Zt+E,we=!0),U&&regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,E)){W(w,s,m);continue}if(_==="attributename"&&stringMatch(E,"href")){W(w,s,m);continue}if(!g.forceKeepAttr){if(!g.keepAttr){W(w,s,m);continue}if(!Yt&&regExpTest(SELF_CLOSING_TAG,E)){W(w,s,m);continue}if(q&&(E=ut(E)),!xe(u,_,E)){W(w,s,m);continue}E=$e(u,_,y,E),E!==Pt&&Ge(s,w,y,E)&&we&&arrayPop(t.removed)}}O(f.afterSanitizeAttributes,s,null)},ft=function(s){let a=null;const g=ae(s);for(O(f.beforeSanitizeShadowDOM,s,null);a=g.nextNode();)if(O(f.uponSanitizeShadowNode,a,null),Se(a,s),me(a),Q(a.content)&&ft(a.content),tt(a)===NODE_TYPE.element){const x=Ft(a);Q(x)&&(qt(x),ft(x))}O(f.afterSanitizeShadowDOM,s,null)},qt=function(s){const a=[{node:s,shadow:null}];for(;a.length>0;){const g=a.pop();if(g.shadow){ft(g.shadow);continue}const x=g.node,m=tt(x)===NODE_TYPE.element,w=k(x);if(w)for(let y=w.length-1;y>=0;--y)a.push({node:w[y],shadow:null});if(m){const y=$?$(x):null;if(typeof y=="string"&&b(y)==="template"){const T=x.content;Q(T)&&a.push({node:T,shadow:null})}}if(m){const y=Ft(x);Q(y)&&a.push({node:null,shadow:y},{node:y,shadow:null})}}};return t.sanitize=function(S){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=null,g=null,x=null,u=null;if(Lt=!S,Lt&&(S="<!-->"),typeof S!="string"&&!st(S)&&(S=stringifyValue(S),typeof S!="string"))throw typeErrorCreate("dirty is not a string, aborting");if(!t.isSupported)return S;_t?(I=rt,v=dt):Dt(s),(f.uponSanitizeElement.length>0||f.uponSanitizeAttribute.length>0)&&(I=clone(I)),f.uponSanitizeAttribute.length>0&&(v=clone(v)),t.removed=[];const m=At&&typeof S!="string"&&st(S);if(m){He(S);const T=vt(S);if(typeof T=="string"){const _=b(T);if(!I[_]||ot[_])throw St(S),typeErrorCreate("root node is forbidden and cannot be sanitized in-place")}if(mt(S))throw St(S),typeErrorCreate("root node is clobbered and cannot be sanitized in-place");try{qt(S)}catch(_){throw St(S),_}}else if(st(S))a=he("<!---->"),g=a.ownerDocument.importNode(S,!0),g.nodeType===NODE_TYPE.element&&g.nodeName==="BODY"||g.nodeName==="HTML"?a=g:a.appendChild(g),qt(a);else{if(!V&&!q&&!j&&S.indexOf("<")===-1)return R&&at?G(S):S;if(a=he(S),!a)return V?null:at?H:""}a&&Ct&&P(a.firstChild);const w=m?S:a;try{const T=ae(w);for(;x=T.nextNode();)Se(x,w),me(x),Q(x.content)&&ft(x.content)}catch(T){throw m&&(St(S),arrayForEach(t.removed,_=>{_.element&&xt(_.element)})),T}if(m)return arrayForEach(t.removed,T=>{T.element&&xt(T.element)}),q&&Nt(S),S;if(V){if(q&&Nt(a),ht)for(u=ve.call(a.ownerDocument);a.firstChild;)u.appendChild(a.firstChild);else u=a;return(v.shadowroot||v.shadowrootmode)&&(u=be.call(i,u,!0)),u}let y=j?a.outerHTML:a.innerHTML;return j&&I["!doctype"]&&a.ownerDocument&&a.ownerDocument.doctype&&a.ownerDocument.doctype.name&&regExpTest(DOCTYPE_NAME,a.ownerDocument.doctype.name)&&(y="<!DOCTYPE "+a.ownerDocument.doctype.name+`>
`+y),q&&(y=ut(y)),R&&at?G(y):y},t.setConfig=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Dt(S),_t=!0,rt=I,dt=v},t.clearConfig=function(){Z=null,_t=!1,rt=null,dt=null,R=yt,H=""},t.isValidAttribute=function(S,s,a){Z||Dt({});const g=b(S),x=b(s);return xe(g,x,a)},t.addHook=function(S,s){typeof s=="function"&&objectHasOwnProperty(f,S)&&arrayPush(f[S],s)},t.removeHook=function(S,s){if(objectHasOwnProperty(f,S)){if(s!==void 0){const a=arrayLastIndexOf(f[S],s);return a===-1?void 0:arraySplice(f[S],a,1)[0]}return arrayPop(f[S])}},t.removeHooks=function(S){objectHasOwnProperty(f,S)&&(f[S]=[])},t.removeAllHooks=function(){f=_createHooksMap()},t}var purify=createDOMPurify(),browser_default=purify,sanitize=purify.sanitize.bind(purify),isSupported=purify.isSupported,addHook=purify.addHook.bind(purify),removeHook=purify.removeHook.bind(purify),removeHooks=purify.removeHooks.bind(purify),removeAllHooks=purify.removeAllHooks.bind(purify),setConfig=purify.setConfig.bind(purify),clearConfig=purify.clearConfig.bind(purify),isValidAttribute=purify.isValidAttribute.bind(purify),version=purify.version,removed=purify.removed,RichTextEditor=class extends HTMLElement{static get observedAttributes(){return["content","initial-content","on-media-request","on-change","config","class-name","available-classes"]}attributeChangedCallback(o,t,e){const i=this,c=o.replace(/-/g,""),n=new RegExp("^"+c+"$","i");this.componentProps&&(this.componentProps.forEach(l=>{if(n.test(l)){let d=e;if(d==="true")d=!0;else if(d==="false")d=!1;else try{d&&(d.trim().startsWith("{")||d.trim().startsWith("["))&&(d=JSON.parse(d))}catch{}this.props[l]=d}}),this.update())}forceUpdate(o){const t=this;o&&typeof o=="object"&&Object.assign(this.props,o),typeof this.update=="function"&&this.update()}get _rootRef(){return this.__rootRef||this._root.querySelector("[data-ref='RichTextEditor-rootRef']")}set _rootRef(o){this.__rootRef=o}get _editorRef(){return this.__editorRef||this._root.querySelector("[data-ref='RichTextEditor-editorRef']")}set _editorRef(o){this.__editorRef=o}get _root(){return this.shadowRoot||this}constructor(){super();const o=this;this.props||(this.props={}),this.state={mode:"visual",isFullscreen:!1,internalContent:o.props.content||o.props.initialContent||"",showTableModal:!1,tableRows:"3",tableCols:"3",tableHasHeader:!0,showLinkModal:!1,linkUrl:"",showWidgetModal:!1,selectedWidget:"banner",showSocialModal:!1,socialUrl:"",socialPlatform:"x",showButtonModal:!1,btnText:"Click Here",btnUrl:"",btnStyle:"primary",activeFormats:{bold:!1,italic:!1,underline:!1,strikeThrough:!1,justifyLeft:!1,justifyCenter:!1,justifyRight:!1,quote:!1,code:!1,unorderedList:!1,orderedList:!1,inTable:!1},headingFormat:"P",checkFormats(){if(typeof window<"u"&&typeof document<"u"){let t=!1,e=!1,i=!1;const c=window.getSelection();if(c&&c.rangeCount>0){let l=c.getRangeAt(0).startContainer;for(;l&&l.nodeName!=="DIV"&&l.className!=="wysiwyg-content";)l.nodeName==="BLOCKQUOTE"&&(t=!0),(l.nodeName==="PRE"||l.nodeName==="CODE")&&(e=!0),(l.nodeName==="TD"||l.nodeName==="TH")&&(i=!0),l=l.parentNode}o.state.activeFormats={bold:document.queryCommandState("bold"),italic:document.queryCommandState("italic"),underline:document.queryCommandState("underline"),strikeThrough:document.queryCommandState("strikeThrough"),justifyLeft:document.queryCommandState("justifyLeft"),justifyCenter:document.queryCommandState("justifyCenter"),justifyRight:document.queryCommandState("justifyRight"),unorderedList:document.queryCommandState("insertUnorderedList"),orderedList:document.queryCommandState("insertOrderedList"),quote:t,code:e,inTable:i},o.update();const n=document.queryCommandValue("formatBlock");n&&(n.includes("1")?(o.state.headingFormat="H1",o.update(),o.update()):n.includes("2")?(o.state.headingFormat="H2",o.update(),o.update()):n.includes("3")?(o.state.headingFormat="H3",o.update(),o.update()):n.includes("4")?(o.state.headingFormat="H4",o.update(),o.update()):n.toLowerCase().includes("blockquote")?(o.state.activeFormats.quote=!0,o.state.headingFormat="P",o.update()):n.toLowerCase().includes("pre")?(o.state.activeFormats.code=!0,o.state.headingFormat="P",o.update()):(n.includes("p")||n.includes("div"))&&(o.state.headingFormat="P",o.update(),o.update()))}},saveSelection(){const t=window.getSelection();t&&t.rangeCount>0&&(o._savedRangeRef=t.getRangeAt(0))},restoreSelection(){if(o._savedRangeRef&&o._editorRef){o._editorRef.focus();const t=window.getSelection();t&&(t.removeAllRanges(),t.addRange(o._savedRangeRef))}},formatHTML(t){if(!t)return"";let e="",i="";const c="  ";return t.split(/>\s*</).forEach(function(n){n.match(/^\/\w/)&&(i=i.substring(c.length)),e+=i+"<"+n+`>
`,n.match(/^<?\w[^>]*[^\/]$/)&&!n.startsWith("input")&&!n.startsWith("img")&&!n.startsWith("br")&&!n.startsWith("hr")&&(i+=c)}),e.length>3?e.substring(1,e.length-2):t},format(t,e){document.execCommand(t,!1,e),o.state.syncContent(),o.state.checkFormats()},formatHeading(t){document.execCommand("formatBlock",!1,t),o.state.syncContent(),o.state.checkFormats()},insertMedia(t){if(o.state.saveSelection(),o.props.onMediaRequest)o.props.onMediaRequest(t).then(e=>{if(e){o.state.restoreSelection();let i="";t==="image"?i=`<img src="${e}" alt="Embedded media" style="max-width:100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);" />`:t==="video"?i=`<video src="${e}" controls style="max-width:100%; border-radius: 8px;"></video>`:t==="audio"&&(i=`<audio src="${e}" controls></audio>`),document.execCommand("insertHTML",!1,i),o.state.syncContent()}});else{const e=prompt(`Enter ${t} URL:`);if(e){o.state.restoreSelection();let i="";t==="image"?i=`<img src="${e}" alt="Embedded media" style="max-width:100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);" />`:t==="video"?i=`<video src="${e}" controls style="max-width:100%; border-radius: 8px;"></video>`:t==="audio"&&(i=`<audio src="${e}" controls></audio>`),document.execCommand("insertHTML",!1,i),o.state.syncContent()}}},clearAllFormatting(){document.execCommand("removeFormat",!1,void 0),document.execCommand("formatBlock",!1,"P"),document.execCommand("unlink",!1,void 0),o.state.syncContent(),o.state.checkFormats()},toggleBlock(t){o.state.checkFormats(),(t==="PRE"?o.state.activeFormats.code:o.state.activeFormats.quote)?document.execCommand("formatBlock",!1,"P"):document.execCommand("formatBlock",!1,t),o.state.syncContent(),o.state.checkFormats()},applyClass(t){if(!t)return;const e=window.getSelection();if(e&&e.rangeCount>0){const i=e.getRangeAt(0),c=document.createElement("span");c.className=t,c.appendChild(i.extractContents()),i.insertNode(c),o.state.syncContent()}},openButtonModal(){o.state.saveSelection(),o.state.showButtonModal=!0,o.update(),o.state.btnText="Click Here",o.update(),o.state.btnUrl="",o.update(),o.state.btnStyle="primary",o.update()},closeButtonModal(){o.state.showButtonModal=!1,o.update()},confirmButton(){if(o.state.showButtonModal=!1,o.update(),o.state.btnText){o._editorRef&&o._editorRef.focus(),o.state.restoreSelection();let t="padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; display: inline-block; text-decoration: none; transition: all 0.2s;";o.state.btnStyle==="primary"?t+=" background: var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480)); color: white; border: none; box-shadow: 0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.3));":o.state.btnStyle==="secondary"?t+=" background: var(--cv-color-surface-raised, #1e293b); color: var(--cv-color-text-main, #fff); border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1));":o.state.btnStyle==="outline"&&(t+=" background: transparent; color: var(--cv-color-primary-fill, #245066); border: 2px solid var(--cv-color-primary-fill, #245066);");const i=`<a href="${o.state.btnUrl||"#"}" class="cv-btn" style="${t}">${o.state.btnText}</a>&nbsp;`;if(!document.execCommand("insertHTML",!1,i))if(o._savedRangeRef&&o._savedRangeRef.insertNode){const n=document.createElement("template");n.innerHTML=i.trim();const l=n.content;o._savedRangeRef.deleteContents(),o._savedRangeRef.insertNode(l),o._savedRangeRef.collapse(!1)}else o._editorRef.innerHTML+=i;o.state.syncContent()}},syncContent(){o._editorRef&&(o.state.internalContent=o._editorRef.innerHTML,o.update(),o.props.onChange&&o.props.onChange(o.state.internalContent))},handleInput(){o.state.syncContent()},handleSourceInput(t){o.state.internalContent=t.target.value,o.update(),o.props.onChange&&o.props.onChange(o.state.internalContent),o._editorRef&&(o._editorRef.innerHTML=browser_default.sanitize(o.state.internalContent))},openTableModal(){o.state.saveSelection(),o.state.showTableModal=!0,o.update(),o.state.tableRows="3",o.update(),o.state.tableCols="3",o.update(),o.state.tableHasHeader=!0,o.update()},confirmTable(){o.state.showTableModal=!1,o.update();const t=parseInt(o.state.tableRows,10),e=parseInt(o.state.tableCols,10);if(t>0&&e>0){o.state.restoreSelection();let i='<table border="1" style="width:100%; border-collapse: collapse; min-width: 50px;">';if(o.state.tableHasHeader){i+='<thead style="background-color: var(--cv-color-hover, rgba(255,255,255,0.05));"><tr>';for(let c=0;c<e;c++)i+='<th style="padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);">Header</th>';i+="</tr></thead>"}i+="<tbody>";for(let c=0;c<t;c++){i+="<tr>";for(let n=0;n<e;n++)i+='<td style="padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);">Cell</td>';i+="</tr>"}i+="</tbody></table><p><br></p>",document.execCommand("insertHTML",!1,i),o.state.syncContent()}},closeTableModal(){o.state.showTableModal=!1,o.update()},modifyTable(t){const e=window.getSelection();if(!e||e.rangeCount===0)return;let i=e.getRangeAt(0).startContainer,c=null,n=null,l=null;for(;i&&i.nodeName!=="DIV"&&i.className!=="wysiwyg-content";)(i.nodeName==="TD"||i.nodeName==="TH")&&(c=i),i.nodeName==="TR"&&(n=i),i.nodeName==="TABLE"&&(l=i),i=i.parentNode;if(!l||!n||!c)return;const d=Array.from(n.children).indexOf(c);if(t==="addRow"){const h=document.createElement("tr"),r=n.children.length;for(let p=0;p<r;p++){const C=document.createElement("td");C.style.cssText="padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);",C.innerHTML="Cell",h.appendChild(C)}n.parentNode.insertBefore(h,n.nextSibling)}else if(t==="removeRow")n.parentNode.children.length>1?n.parentNode.removeChild(n):l.parentNode.removeChild(l);else if(t==="addCol")l.querySelectorAll("tr").forEach(r=>{const p=document.createElement(r.parentNode.nodeName==="THEAD"?"th":"td");p.style.cssText=r.parentNode.nodeName==="THEAD"?"padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);":"padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);",p.innerHTML=r.parentNode.nodeName==="THEAD"?"Header":"Cell";const C=r.children[d];r.insertBefore(p,C?C.nextSibling:null)});else if(t==="removeCol"){const h=l.querySelectorAll("tr");n.children.length>1?h.forEach(r=>{r.children[d]&&r.removeChild(r.children[d])}):l.parentNode.removeChild(l)}o.state.syncContent()},openLinkModal(){o.state.saveSelection(),o.state.showLinkModal=!0,o.update(),o.state.linkUrl="",o.update()},confirmLink(){o.state.showLinkModal=!1,o.update(),o.state.linkUrl&&(o.state.restoreSelection(),document.execCommand("createLink",!1,o.state.linkUrl),o.state.syncContent())},closeLinkModal(){o.state.showLinkModal=!1,o.update()},openWidgetModal(){o.state.saveSelection(),o.state.showWidgetModal=!0,o.update()},confirmWidget(){o.state.showWidgetModal=!1,o.update(),o.state.restoreSelection();let t=`<div class="cv-widget" data-widget="${o.state.selectedWidget}" style="padding: 24px; border: 2px dashed var(--cv-color-primary, #7fc4de); background: var(--cv-color-accent-tint, rgba(127,196,222,0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-link, #7fc4de); font-weight: 600;">[ContentVeda Widget: ${o.state.selectedWidget.toUpperCase()}]</div><p><br></p>`;document.execCommand("insertHTML",!1,t),o.state.syncContent()},closeWidgetModal(){o.state.showWidgetModal=!1,o.update()},openSocialModal(){o.state.saveSelection(),o.state.showSocialModal=!0,o.update(),o.state.socialUrl="",o.update(),o.state.socialPlatform="x",o.update()},confirmSocial(){if(o.state.showSocialModal=!1,o.update(),o.state.socialUrl){o.state.restoreSelection();let t=`<div class="social-embed-placeholder" data-platform="${o.state.socialPlatform}" data-url="${o.state.socialUrl}" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded ${o.state.socialPlatform.toUpperCase()} Post: ${o.state.socialUrl}]</div><p><br></p>`;document.execCommand("insertHTML",!1,t),o.state.syncContent()}},closeSocialModal(){o.state.showSocialModal=!1,o.update()},toggleMode(){o.state.mode==="visual"?(o.state.internalContent=o.state.formatHTML(o.state.internalContent),o.update(),o.state.mode="source",o.update()):(o.state.mode="visual",o.update(),o._editorRef&&(o._editorRef.innerHTML=browser_default.sanitize(o.state.internalContent)))},toggleFullScreen(){o.state.isFullscreen=!o.state.isFullscreen,o.update(),typeof document<"u"&&(o.state.isFullscreen?o._rootRef&&o._rootRef.requestFullscreen&&o._rootRef.requestFullscreen().catch(t=>console.warn("Fullscreen denied",t)):document.fullscreenElement&&document.exitFullscreen&&document.exitFullscreen())},showToolbarOption(t){if(!o.props.config||!o.props.config.toolbar)return!0;let e=t;return t==="alignLeft"&&(e="justifyLeft"),t==="alignCenter"&&(e="justifyCenter"),t==="alignRight"&&(e="justifyRight"),o.props.config.toolbar.includes(t)||o.props.config.toolbar.includes(e)},showSeparator(t){const e=[["fullscreen","source","bold","italic","underline","strikeThrough"],["code","quote","clear"],["headings"],["foreColor","backColor"],["alignLeft","justifyLeft","alignCenter","justifyCenter","alignRight","justifyRight"],["image","link","table","unorderedList","orderedList","horizontalRule","video","social"],["insertButton","addWidget"],["save"],["classInput"]],i=e.slice(0,t+1).some(n=>n.some(l=>o.state.showToolbarOption(l))),c=e[t+1]&&e[t+1].some(n=>o.state.showToolbarOption(n));return i&&c}},this.props||(this.props={}),this.componentProps=["content","initialContent","onMediaRequest","onChange","config","className","availableClasses"],this.nodesToDestroy=[],this.pendingUpdate=!1,this.onButtonRichTextEditor1Click=t=>{this.state.toggleFullScreen()},this.onButtonRichTextEditor2Click=t=>{this.state.toggleMode()},this.onButtonRichTextEditor3Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor3Click=t=>{this.state.format("bold")},this.onButtonRichTextEditor4Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor4Click=t=>{this.state.format("italic")},this.onButtonRichTextEditor5Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor5Click=t=>{this.state.format("underline")},this.onButtonRichTextEditor6Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor6Click=t=>{this.state.format("strikeThrough")},this.onButtonRichTextEditor7Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor7Click=t=>{this.state.toggleBlock("PRE")},this.onButtonRichTextEditor8Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor8Click=t=>{this.state.toggleBlock("BLOCKQUOTE")},this.onButtonRichTextEditor9Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor9Click=t=>{this.state.clearAllFormatting()},this.onSelectRichTextEditor1Mousedown=t=>{this.state.saveSelection()},this.onSelectRichTextEditor1Change=t=>{this.state.restoreSelection(),this.state.formatHeading(t.target.value),o._editorRef.focus()},this.onInputRichTextEditor1Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor1Change=t=>{this.state.restoreSelection(),document.execCommand("foreColor",!1,t.target.value),this.state.syncContent()},this.onInputRichTextEditor2Mousedown=t=>{this.state.saveSelection()},this.onInputRichTextEditor2Change=t=>{this.state.restoreSelection(),document.execCommand("hiliteColor",!1,t.target.value),document.execCommand("backColor",!1,t.target.value),this.state.syncContent()},this.onButtonRichTextEditor10Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor10Click=t=>{this.state.format("justifyLeft")},this.onButtonRichTextEditor11Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor11Click=t=>{this.state.format("justifyCenter")},this.onButtonRichTextEditor12Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor12Click=t=>{this.state.format("justifyRight")},this.onButtonRichTextEditor13Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor13Click=t=>{this.state.insertMedia("image")},this.onButtonRichTextEditor14Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor14Click=t=>{this.state.openLinkModal()},this.onButtonRichTextEditor15Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor15Click=t=>{this.state.openTableModal()},this.onButtonRichTextEditor16Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor16Click=t=>{this.state.modifyTable("addRow")},this.onButtonRichTextEditor17Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor17Click=t=>{this.state.modifyTable("removeRow")},this.onButtonRichTextEditor18Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor18Click=t=>{this.state.modifyTable("addCol")},this.onButtonRichTextEditor19Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor19Click=t=>{this.state.modifyTable("removeCol")},this.onButtonRichTextEditor20Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor20Click=t=>{this.state.format("insertUnorderedList")},this.onButtonRichTextEditor21Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor21Click=t=>{this.state.format("insertOrderedList")},this.onButtonRichTextEditor22Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor22Click=t=>{this.state.format("insertHorizontalRule")},this.onButtonRichTextEditor23Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor23Click=t=>{this.state.insertMedia("video")},this.onButtonRichTextEditor24Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor24Click=t=>{this.state.openSocialModal()},this.onButtonRichTextEditor25Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor25Click=t=>{this.state.openButtonModal()},this.onButtonRichTextEditor26Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor26Click=t=>{this.state.openWidgetModal()},this.onButtonRichTextEditor27Mousedown=t=>{t.preventDefault()},this.onButtonRichTextEditor27Click=t=>{this.state.syncContent()},this.onInputRichTextEditor3Keydown=t=>{t.key==="Enter"&&(t.preventDefault(),this.state.applyClass(t.target.value),t.target.value="")},this.onDivRichTextEditor5Input=t=>{this.state.handleInput(),this.state.checkFormats()},this.onDivRichTextEditor5Blur=t=>{this.state.handleInput()},this.onDivRichTextEditor5Keyup=t=>{this.state.checkFormats()},this.onDivRichTextEditor5Mouseup=t=>{this.state.checkFormats()},this.onSelectRichTextEditor2Change=t=>{this.state.btnStyle=t.target.value,this.update()},this.onInputRichTextEditor4Input=t=>{this.state.btnText=t.target.value,this.update()},this.onInputRichTextEditor5Input=t=>{this.state.btnUrl=t.target.value,this.update()},this.onButtonRichTextEditor28Click=t=>{this.state.closeButtonModal()},this.onButtonRichTextEditor29Click=t=>{this.state.confirmButton()},this.onInputRichTextEditor6Input=t=>{this.state.tableRows=t.target.value,this.update()},this.onInputRichTextEditor7Input=t=>{this.state.tableCols=t.target.value,this.update()},this.onButtonRichTextEditor30Click=t=>{this.state.closeTableModal()},this.onButtonRichTextEditor31Click=t=>{this.state.confirmTable()},this.onInputRichTextEditor8Input=t=>{this.state.linkUrl=t.target.value,this.update()},this.onButtonRichTextEditor32Click=t=>{this.state.closeLinkModal()},this.onButtonRichTextEditor33Click=t=>{this.state.confirmLink()},this.onSelectRichTextEditor3Change=t=>{this.state.selectedWidget=t.target.value,this.update()},this.onButtonRichTextEditor34Click=t=>{this.state.closeWidgetModal()},this.onButtonRichTextEditor35Click=t=>{this.state.confirmWidget()},this.onSelectRichTextEditor4Change=t=>{this.state.socialPlatform=t.target.value,this.update()},this.onInputRichTextEditor9Input=t=>{this.state.socialUrl=t.target.value,this.update()},this.onButtonRichTextEditor36Click=t=>{this.state.closeSocialModal()},this.onButtonRichTextEditor37Click=t=>{this.state.confirmSocial()},this.onTextareaRichTextEditor1Input=t=>{this.state.handleSourceInput(t)},this._savedRangeRef=null}destroyAnyNodes(){const o=this;this.nodesToDestroy.forEach(t=>{t.__persistent||t.remove()}),this.nodesToDestroy=this.nodesToDestroy.filter(t=>t.__persistent)}connectedCallback(){const o=this;this.getAttributeNames().forEach(t=>{const e=t.replace(/-/g,""),i=new RegExp("^"+e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"$","i");this.componentProps.forEach(c=>{if(i.test(c)){let n=this.getAttribute(t);if(n==="true")n=!0;else if(n==="false")n=!1;else try{n&&(n.trim().startsWith("{")||n.trim().startsWith("["))&&(n=JSON.parse(n))}catch{}this.props[c]!==n&&(this.props[c]=n)}})}),this._root.innerHTML=`
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
                    aria-label="Text Color"
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
                    aria-label="Background Color"
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
                aria-label="Dynamic CSS Class"
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
                        aria-label="Button Text"
                        placeholder="Click Here"
                        data-el="input-rich-text-editor-4"
                        data-dom-state="RichTextEditor-input-rich-text-editor-4"
                      />
                    </div>
                    <div data-el="div-rich-text-editor-11">
                      <label data-el="label-rich-text-editor-3">Link URL</label>
                      <input
                        type="url"
                        aria-label="Button URL"
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
                        aria-label="Table Rows"
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
                        aria-label="Table Columns"
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
                      aria-label="Hyperlink URL"
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
                        aria-label="Social Link URL"
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
      </div>`,this.pendingUpdate=!0,this.render(),this.onMount(),this.pendingUpdate=!1,this.update()}showContent(o,t){const e=this;if(t){if(o.__renderedNodes)return;const i=o.content.cloneNode(!0),c=Array.from(i.childNodes);o.__renderedNodes=c,c.forEach(n=>{o?.scope&&(n.scope=o.scope),o?.context&&(n.context=o.context),n.__persistent=!0,this.nodesToDestroy.push(n)}),o.after(i)}else o.__renderedNodes&&(o.__renderedNodes.forEach(i=>{i.remove();const c=this.nodesToDestroy.indexOf(i);c!==-1&&this.nodesToDestroy.splice(c,1)}),o.__renderedNodes=null)}onMount(){const o=this;if(this.state.internalContent||(this.state.internalContent=this.props.content||this.props.initialContent||"",this.update()),o._editorRef&&(o._editorRef.innerHTML=browser_default.sanitize(this.state.internalContent)),typeof document<"u"){const t="cv-editor-styles";if(!document.getElementById(t)){const i=document.createElement("style");i.id=t,i.innerHTML=".wysiwyg-content blockquote { border-left: 4px solid var(--cv-color-quote-accent, #7fc4de) !important; background: linear-gradient(90deg, var(--cv-color-accent-tint, rgba(127, 196, 222, 0.1)) 0%, transparent 100%) !important; padding: 20px 24px !important; margin: 24px 0 !important; border-radius: 0 16px 16px 0 !important; font-style: italic !important; color: var(--cv-color-text-main, #e2e8f0) !important; font-size: 1.1em !important; line-height: 1.8 !important; position: relative; box-shadow: inset 2px 0 0px var(--cv-color-border, rgba(255,255,255,0.1)); } .wysiwyg-content pre { background: var(--cv-color-code-bg, #0f172a) !important; border: 1px solid var(--cv-color-code-border, rgba(255,255,255,0.1)) !important; border-radius: 12px !important; padding: 20px !important; color: var(--cv-color-code-text, #38bdf8) !important; font-family: 'Fira Code', monospace !important; overflow-x: auto !important; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5) !important; } .wysiwyg-content ul { list-style-type: disc !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content ol { list-style-type: decimal !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content li { margin-bottom: 0.5em !important; display: list-item !important; } .wysiwyg-content a:not(.cv-btn) { color: var(--cv-color-link, #7fc4de) !important; text-decoration: underline !important; text-underline-offset: 3px !important; }",document.head.appendChild(i)}const e=()=>{this.state.isFullscreen=!!document.fullscreenElement,this.update()};return document.addEventListener("fullscreenchange",e),()=>{document.removeEventListener("fullscreenchange",e)}}}onUpdate(){const o=this}update(){const o=this;this.pendingUpdate!==!0&&(this.pendingUpdate=!0,this.render(),this.onUpdate(),this.pendingUpdate=!1)}render(){const o=this,t=this.getStateful(this._root),e=this.prepareHydrate(t);if(this.destroyAnyNodes(),this.updateBindings(),e.length){const i=this.getStateful(this._root);this.hydrateDom(e,i)}}getStateful(o){const t=this,e=o.querySelectorAll("[data-dom-state]");return e?Array.from(e):[]}prepareHydrate(o){const t=this;return o.map(e=>({id:e.dataset.domState,value:e.value,active:document.activeElement===e,selectionStart:e.selectionStart}))}hydrateDom(o,t){const e=this;return t.map((i,c)=>{const n=o.find(l=>i.dataset.domState===l.id);n&&n.active&&(i.value=n.value,i.focus(),i.selectionStart=n.selectionStart)})}updateBindings(){const o=this;this._root.querySelectorAll("[data-el='div-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`cv-rich-text-editor flex flex-col rounded-xl overflow-hidden relative ${this.state.isFullscreen?"fixed inset-0 z-[9999] w-screen h-screen rounded-none":"w-full"} ${this.props.className||""}`,__cvAssignStyle(t.style,{boxSizing:"border-box",background:"var(--cv-color-surface-sunken, #0f172a)",border:this.state.isFullscreen?"none":"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",boxShadow:"var(--cv-shadow-overlay, 0 8px 32px rgba(0,0,0,0.4))"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface, rgba(15, 23, 42, 0.85))",borderBottom:"1px solid var(--cv-color-border, rgba(255,255,255,0.08))",alignItems:"center",padding:"16px 24px"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("fullscreen");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-accent-tint, rgba(127, 196, 222, 0.15))",color:"var(--cv-color-primary-hover, #a8d8ea)",border:"none"}),t.removeEventListener("click",this.onButtonRichTextEditor1Click),t.addEventListener("click",this.onButtonRichTextEditor1Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.isFullscreen;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("source");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${this.state.mode==="source"?"cv-rte-tint cv-rte-accent":"text-slate-400 hover:text-slate-200 hover:bg-white/5"}`,t.removeEventListener("click",this.onButtonRichTextEditor2Click),t.addEventListener("click",this.onButtonRichTextEditor2Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("bold")||this.state.showToolbarOption("italic")||this.state.showToolbarOption("underline")||this.state.showToolbarOption("strikeThrough");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("bold");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`font-bold text-sm w-9 h-9 flex items-center justify-center rounded transition-colors ${this.state.activeFormats.bold?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor3Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor3Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor3Click),t.addEventListener("click",this.onButtonRichTextEditor3Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("italic");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`italic text-sm w-9 h-9 flex items-center justify-center rounded transition-colors font-serif ${this.state.activeFormats.italic?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor4Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor4Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor4Click),t.addEventListener("click",this.onButtonRichTextEditor4Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("underline");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`underline text-sm w-9 h-9 flex items-center justify-center rounded transition-colors ${this.state.activeFormats.underline?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor5Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor5Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor5Click),t.addEventListener("click",this.onButtonRichTextEditor5Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("strikeThrough");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`line-through text-sm w-9 h-9 flex items-center justify-center rounded transition-colors ${this.state.activeFormats.strikeThrough?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor6Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor6Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor6Click),t.addEventListener("click",this.onButtonRichTextEditor6Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showSeparator(0);this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("code")||this.state.showToolbarOption("quote")||this.state.showToolbarOption("clear");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("code");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.code?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor7Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor7Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor7Click),t.addEventListener("click",this.onButtonRichTextEditor7Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("quote");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.quote?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor8Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor8Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor8Click),t.addEventListener("click",this.onButtonRichTextEditor8Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("clear");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor9Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor9Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor9Click),t.addEventListener("click",this.onButtonRichTextEditor9Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showSeparator(1);this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("headings");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.headingFormat,t.removeEventListener("mousedown",this.onSelectRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onSelectRichTextEditor1Mousedown),t.removeEventListener("change",this.onSelectRichTextEditor1Change),t.addEventListener("change",this.onSelectRichTextEditor1Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"14px",fontWeight:"normal"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"24px",fontWeight:"bold"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"20px",fontWeight:"bold"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showSeparator(2);this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("foreColor")||this.state.showToolbarOption("backColor");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("foreColor");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onInputRichTextEditor1Mousedown),t.addEventListener("mousedown",this.onInputRichTextEditor1Mousedown),t.removeEventListener("change",this.onInputRichTextEditor1Change),t.addEventListener("change",this.onInputRichTextEditor1Change)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("backColor");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onInputRichTextEditor2Mousedown),t.addEventListener("mousedown",this.onInputRichTextEditor2Mousedown),t.removeEventListener("change",this.onInputRichTextEditor2Change),t.addEventListener("change",this.onInputRichTextEditor2Change)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showSeparator(3);this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyLeft")||this.state.showToolbarOption("justifyCenter")||this.state.showToolbarOption("justifyRight");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyLeft");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.justifyLeft?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor10Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor10Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor10Click),t.addEventListener("click",this.onButtonRichTextEditor10Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyCenter");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.justifyCenter?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor11Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor11Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor11Click),t.addEventListener("click",this.onButtonRichTextEditor11Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("justifyRight");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.justifyRight?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor12Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor12Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor12Click),t.addEventListener("click",this.onButtonRichTextEditor12Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showSeparator(4);this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("image")||this.state.showToolbarOption("link")||this.state.showToolbarOption("table")||this.state.showToolbarOption("unorderedList")||this.state.showToolbarOption("orderedList")||this.state.showToolbarOption("horizontalRule")||this.state.showToolbarOption("video")||this.state.showToolbarOption("social");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("image");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor13Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor13Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor13Click),t.addEventListener("click",this.onButtonRichTextEditor13Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("link");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor14Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor14Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor14Click),t.addEventListener("click",this.onButtonRichTextEditor14Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("table");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor15Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor15Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor15Click),t.addEventListener("click",this.onButtonRichTextEditor15Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-30']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.activeFormats.inTable&&this.state.showToolbarOption("table");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor16Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor16Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor16Click),t.addEventListener("click",this.onButtonRichTextEditor16Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor17Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor17Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor17Click),t.addEventListener("click",this.onButtonRichTextEditor17Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor18Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor18Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor18Click),t.addEventListener("click",this.onButtonRichTextEditor18Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor19Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor19Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor19Click),t.addEventListener("click",this.onButtonRichTextEditor19Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-31']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("unorderedList");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.unorderedList?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor20Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor20Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor20Click),t.addEventListener("click",this.onButtonRichTextEditor20Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-32']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("orderedList");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.className=`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${this.state.activeFormats.orderedList?"bg-white/20 text-white shadow-inner":"hover:bg-white/10 hover:text-white"}`,t.removeEventListener("mousedown",this.onButtonRichTextEditor21Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor21Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor21Click),t.addEventListener("click",this.onButtonRichTextEditor21Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-33']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("horizontalRule");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor22Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor22Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor22Click),t.addEventListener("click",this.onButtonRichTextEditor22Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-34']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("video");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor23Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor23Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor23Click),t.addEventListener("click",this.onButtonRichTextEditor23Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-35']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("social");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor24Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor24Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor24Click),t.addEventListener("click",this.onButtonRichTextEditor24Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-36']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showSeparator(5);this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-37']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("insertButton")||this.state.showToolbarOption("addWidget");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-38']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("insertButton");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor25Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor25Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor25Click),t.addEventListener("click",this.onButtonRichTextEditor25Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-39']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("addWidget");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor26Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor26Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor26Click),t.addEventListener("click",this.onButtonRichTextEditor26Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-40']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showSeparator(6);this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-41']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("save");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("mousedown",this.onButtonRichTextEditor27Mousedown),t.addEventListener("mousedown",this.onButtonRichTextEditor27Mousedown),t.removeEventListener("click",this.onButtonRichTextEditor27Click),t.addEventListener("click",this.onButtonRichTextEditor27Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-42']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showToolbarOption("classInput");this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("keydown",this.onInputRichTextEditor3Keydown),t.addEventListener("keydown",this.onInputRichTextEditor3Keydown)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-43']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.props.availableClasses&&this.props.availableClasses.length>0;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='for-rich-text-editor']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null,p=this.props.availableClasses;this.renderLoop(t,p,"cls")}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.value=r}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;this.renderTextNode(t,r)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:this.state.mode==="visual"?"block":"none",padding:"2rem 3rem",color:"var(--cv-color-text-main, #f1f5f9)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.removeEventListener("input",this.onDivRichTextEditor5Input),t.addEventListener("input",this.onDivRichTextEditor5Input),t.removeEventListener("blur",this.onDivRichTextEditor5Blur),t.addEventListener("blur",this.onDivRichTextEditor5Blur),t.removeEventListener("keyup",this.onDivRichTextEditor5Keyup),t.addEventListener("keyup",this.onDivRichTextEditor5Keyup),t.removeEventListener("mouseup",this.onDivRichTextEditor5Mouseup),t.addEventListener("mouseup",this.onDivRichTextEditor5Mouseup),__cvAssignStyle(t.style,{minHeight:"350px",fontFamily:"Inter, sans-serif",lineHeight:"1.7",fontSize:"15px"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-44']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showTableModal||this.state.showLinkModal||this.state.showWidgetModal||this.state.showSocialModal||this.state.showButtonModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"rgba(0, 0, 0, 0.6)"})}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-45']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showButtonModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-link, #7fc4de)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none"}),t.value=this.state.btnStyle,t.removeEventListener("change",this.onSelectRichTextEditor2Change),t.addEventListener("change",this.onSelectRichTextEditor2Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none"}),t.value=this.state.btnText,t.removeEventListener("input",this.onInputRichTextEditor4Input),t.addEventListener("input",this.onInputRichTextEditor4Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none"}),t.value=this.state.btnUrl,t.removeEventListener("input",this.onInputRichTextEditor5Input),t.addEventListener("input",this.onInputRichTextEditor5Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor28Click),t.addEventListener("click",this.onButtonRichTextEditor28Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.2))"}),t.removeEventListener("click",this.onButtonRichTextEditor29Click),t.addEventListener("click",this.onButtonRichTextEditor29Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-46']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showTableModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"340px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-2']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-link, #7fc4de)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.2))",padding:"12px",borderRadius:"8px",border:"1px solid var(--cv-color-hover, rgba(255,255,255,0.05))"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"14px",fontWeight:"500",color:"var(--cv-color-text-secondary, #cbd5e1)"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"transparent",border:"none",textAlign:"right",color:"var(--cv-color-text-main, #fff)",fontWeight:"bold",width:"64px",fontSize:"14px",outline:"none"}),t.value=this.state.tableRows,t.removeEventListener("input",this.onInputRichTextEditor6Input),t.addEventListener("input",this.onInputRichTextEditor6Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.2))",padding:"12px",borderRadius:"8px",border:"1px solid var(--cv-color-hover, rgba(255,255,255,0.05))"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"14px",fontWeight:"500",color:"var(--cv-color-text-secondary, #cbd5e1)"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"transparent",border:"none",textAlign:"right",color:"var(--cv-color-text-main, #fff)",fontWeight:"bold",width:"64px",fontSize:"14px",outline:"none"}),t.value=this.state.tableCols,t.removeEventListener("input",this.onInputRichTextEditor7Input),t.addEventListener("input",this.onInputRichTextEditor7Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-17']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-30']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor30Click),t.addEventListener("click",this.onButtonRichTextEditor30Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-31']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor31Click),t.addEventListener("click",this.onButtonRichTextEditor31Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-47']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showLinkModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-18']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-info, #0ea5e9)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-19']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-6']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.linkUrl,t.removeEventListener("input",this.onInputRichTextEditor8Input),t.addEventListener("input",this.onInputRichTextEditor8Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-20']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-32']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor32Click),t.addEventListener("click",this.onButtonRichTextEditor32Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-33']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-color-info-fill, #075985)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor33Click),t.addEventListener("click",this.onButtonRichTextEditor33Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-48']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showWidgetModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-21']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-secondary, #5eb3d6)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-22']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-7']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-3']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.selectedWidget,t.removeEventListener("change",this.onSelectRichTextEditor3Change),t.addEventListener("change",this.onSelectRichTextEditor3Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-10']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-11']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-12']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-23']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-34']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor34Click),t.addEventListener("click",this.onButtonRichTextEditor34Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-35']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor35Click),t.addEventListener("click",this.onButtonRichTextEditor35Click)}catch{}}),this._root.querySelectorAll("[data-el='show-rich-text-editor-49']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;const p=this.state.showSocialModal;this.showContent(t,!!p)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-24']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"16px",padding:"24px",width:"380px"})}catch{}}),this._root.querySelectorAll("[data-el='h3-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='svg-rich-text-editor-5']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{color:"var(--cv-color-info, #0ea5e9)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-25']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-26']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-8']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='select-rich-text-editor-4']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.socialPlatform,t.removeEventListener("change",this.onSelectRichTextEditor4Change),t.addEventListener("change",this.onSelectRichTextEditor4Change)}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-13']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-14']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-15']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='option-rich-text-editor-16']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-raised, #1e293b)"})}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-27']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",flexDirection:"column",gap:"8px"})}catch{}}),this._root.querySelectorAll("[data-el='label-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{fontSize:"12px",fontWeight:"600",color:"var(--cv-color-text-muted, #94a3b8)",textTransform:"uppercase",letterSpacing:"0.05em"})}catch{}}),this._root.querySelectorAll("[data-el='input-rich-text-editor-9']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{background:"var(--cv-color-surface-sunken, rgba(0,0,0,0.3))",border:"1px solid var(--cv-color-border, rgba(255,255,255,0.1))",borderRadius:"8px",padding:"12px 16px",width:"100%",fontSize:"14px",color:"var(--cv-color-text-main, #fff)",outline:"none",boxSizing:"border-box"}),t.value=this.state.socialUrl,t.removeEventListener("input",this.onInputRichTextEditor9Input),t.addEventListener("input",this.onInputRichTextEditor9Input)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-28']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px"})}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-36']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-text-secondary, #cbd5e1)",background:"var(--cv-color-hover, rgba(255,255,255,0.05))",border:"none",borderRadius:"8px",fontWeight:"500",cursor:"pointer"}),t.removeEventListener("click",this.onButtonRichTextEditor36Click),t.addEventListener("click",this.onButtonRichTextEditor36Click)}catch{}}),this._root.querySelectorAll("[data-el='button-rich-text-editor-37']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{padding:"10px 20px",fontSize:"14px",color:"var(--cv-color-on-primary, #fff)",background:"var(--cv-color-info-fill, #075985)",border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}),t.removeEventListener("click",this.onButtonRichTextEditor37Click),t.addEventListener("click",this.onButtonRichTextEditor37Click)}catch{}}),this._root.querySelectorAll("[data-el='div-rich-text-editor-29']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;__cvAssignStyle(t.style,{display:this.state.mode==="source"?"block":"none"})}catch{}}),this._root.querySelectorAll("[data-el='textarea-rich-text-editor-1']").forEach(t=>{try{let e=this.getScope?this.getScope(t,"colIndex"):0,i=this.getScope?this.getScope(t,"slideIndex"):0,c=this.getScope?this.getScope(t,"slideRow"):null,n=this.getScope?this.getScope(t,"index"):0,l=this.getScope?this.getScope(t,"rowIndex"):0,d=this.getScope?this.getScope(t,"mediaIndex"):0,h=this.getScope?this.getScope(t,"item"):null,r=this.getScope?this.getScope(t,"cls"):null;t.value=this.state.internalContent,t.removeEventListener("input",this.onTextareaRichTextEditor1Input),t.addEventListener("input",this.onTextareaRichTextEditor1Input),__cvAssignStyle(t.style,{whiteSpace:"pre-wrap"}),t.setAttribute("spellcheck",!1)}catch{}})}renderTextNode(o,t){const e=this,i=document.createTextNode(t);o?.scope&&(i.scope=o.scope),o?.context&&(i.context=o.context),o.after(i),this.nodesToDestroy.push(o.nextSibling)}getScope(o,t){const e=this;do{let i=o?.scope?.[t];if(i!==void 0)return i}while(o=o.parentNode)}renderLoop(o,t,e,i,c){const n=this;if(t||(t=[]),o.__renderedArray&&o.__renderedArray.length===t.length&&t.every((r,p)=>o.__renderedArray[p]===r))return;o.__renderedNodes&&o.__renderedNodes.forEach(r=>{r.remove();const p=this.nodesToDestroy.indexOf(r);p!==-1&&this.nodesToDestroy.splice(p,1)});const d=[],h=[];for(let[r,p]of t.entries()){const C=o.content.cloneNode(!0),L=Array.from(C.childNodes),nt={};let D=nt;if(o?.scope){const A={get(J,k,F){return k in J?J[k]:k in o.scope?o.scope[k]:J[k]}};D=new Proxy(nt,A)}L.forEach(A=>{e!==void 0&&(D[e]=p),i!==void 0&&(D[i]=r),c!==void 0&&(D[c]=t),A.scope=D,o.context&&(A.context=o.context),A.__persistent=!0,this.nodesToDestroy.push(A),d.unshift(A),h.push(A)})}d.forEach(r=>o.after(r)),o.__renderedArray=[...t],o.__renderedNodes=h}};customElements.define("cv-rich-text-editor",RichTextEditor);function __cvAssignStyle(o,t){if(!o||!t)return o;for(const e in t){const i=t[e];e.charCodeAt(0)===45&&e.charCodeAt(1)===45?i===""||i===null||i===void 0?o.removeProperty(e):o.setProperty(e,String(i)):o[e]=i}return o}/*! Bundled license information:

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.4.15 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.15/LICENSE *)
*/
