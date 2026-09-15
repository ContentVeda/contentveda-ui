<svelte:options runes={false} />
<script context="module" lang="ts">
  export interface WysiwygRendererProps {
    htmlContent?: string;
    content?: string;
    className?: string;
    widgetData?: any;
    lazyLoad?: boolean;
    lazyThreshold?: number;
    lazyRootMargin?: string;
  }
</script>

<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import DOMPurify from "isomorphic-dompurify";
  import { observeLazyMount } from "../utils/lazyObserver";

  export let lazyLoad: WysiwygRendererProps["lazyLoad"];
  export let lazyThreshold: WysiwygRendererProps["lazyThreshold"];
  export let lazyRootMargin: WysiwygRendererProps["lazyRootMargin"];
  export let htmlContent: WysiwygRendererProps["htmlContent"];
  export let content: WysiwygRendererProps["content"];
  export let widgetData: WysiwygRendererProps["widgetData"];
  export let className: WysiwygRendererProps["className"];
  function stringifyStyles(stylesObj) {
    let styles = "";
    for (let key in stylesObj) {
      const dashedKey = key.replace(/[A-Z]/g, function (match) {
        return "-" + match.toLowerCase();
      });
      styles += dashedKey + ":" + stylesObj[key] + ";";
    }
    return styles;
  }

  function getTrustedHttpUrl(rawUrl: string) {
    try {
      const parsed = new URL(rawUrl, window.location.origin);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return null;
      }
      return parsed.toString();
    } catch {
      return null;
    }
  }
  function processContent() {
    setTimeout(() => {
      if (!containerRef) return;

      // Process Social Embeds
      const socialEmbeds = containerRef.querySelectorAll(
        ".social-embed-placeholder, .cv-social-embed"
      );
      socialEmbeds.forEach((el) => {
        const platform = (el.getAttribute("data-platform") || "").toLowerCase();
        const url = el.getAttribute("data-url") || el.getAttribute("data-href");
        if (!platform || !url) return;

        // Preserve an author-set resize width so a resized embed does not snap back to full width on publish.
        const preservedWidth = (el as any).style.width;
        const preservedMaxWidth = (el as any).style.maxWidth;

        // Clear placeholder text and fix styling
        // lgtm[js/xss, js/html-constructed-from-input]
        // codeql[js/xss, js/html-constructed-from-input]
        el.innerHTML = "";
        el.setAttribute(
          "style",
          "margin: 20px 0; display: flex; justify-content: center; background: transparent; border: none; padding: 0;"
        );
        if (preservedWidth) {
          (el as any).style.width = preservedWidth;
        }
        if (preservedMaxWidth) {
          (el as any).style.maxWidth = preservedMaxWidth;
        }
        if (platform === "youtube") {
          let videoId = "";
          const match = url.match(
            /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/
          );
          if (match && match[1]) videoId = match[1];
          if (videoId) {
            const iframe = document.createElement("iframe");
            iframe.width = "560";
            iframe.height = "315";
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.title = "YouTube video player";
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute(
              "allow",
              "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            );
            iframe.setAttribute("allowfullscreen", "");
            iframe.style.cssText =
              "border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);";
            el.appendChild(iframe);
          } else {
            const trustedUrl = getTrustedHttpUrl(url);
            if (!trustedUrl) return;
            const link = document.createElement("a");
            link.href = trustedUrl;
            link.target = "_blank";
            link.style.cssText =
              "color: var(--cv-color-link, #7fc4de); text-decoration: underline;";
            link.textContent = "View Video on YouTube";
            el.appendChild(link);
          }
        } else if (platform === "vimeo") {
          let videoId = "";
          const match = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
          if (match && match[1]) videoId = match[1];
          if (videoId) {
            const iframe = document.createElement("iframe");
            iframe.width = "560";
            iframe.height = "315";
            iframe.src = `https://player.vimeo.com/video/${videoId}`;
            iframe.title = "Vimeo video player";
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute(
              "allow",
              "autoplay; fullscreen; picture-in-picture; clipboard-write"
            );
            iframe.setAttribute("allowfullscreen", "");
            iframe.style.cssText =
              "border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);";
            el.appendChild(iframe);
          } else {
            const trustedUrl = getTrustedHttpUrl(url);
            if (!trustedUrl) return;
            const link = document.createElement("a");
            link.href = trustedUrl;
            link.target = "_blank";
            link.style.cssText =
              "color: var(--cv-color-link, #7fc4de); text-decoration: underline;";
            link.textContent = "View Video on Vimeo";
            el.appendChild(link);
          }
        } else if (platform === "facebook") {
          const trustedUrl = getTrustedHttpUrl(url);
          if (!trustedUrl) return;
          const fbDiv = document.createElement("div");
          fbDiv.className = "fb-post";
          fbDiv.setAttribute("data-href", trustedUrl);
          fbDiv.setAttribute("data-width", "500");
          el.appendChild(fbDiv);
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
        } else if (platform === "x" || platform === "twitter") {
          const bq = document.createElement("blockquote");
          bq.className = "twitter-tweet";
          bq.setAttribute("data-theme", "dark");
          const trustedUrl = getTrustedHttpUrl(url);
          if (!trustedUrl) return;
          const a = document.createElement("a");
          a.href = trustedUrl;
          bq.appendChild(a);
          el.appendChild(bq);
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
          const trustedUrl = getTrustedHttpUrl(url);
          if (!trustedUrl) return;
          const igBq = document.createElement("blockquote");
          igBq.className = "instagram-media";
          igBq.setAttribute("data-instgrm-permalink", trustedUrl);
          igBq.setAttribute("data-instgrm-version", "14");
          igBq.style.cssText =
            "background: var(--cv-color-media-base, #000); border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); border-radius: 3px; box-shadow: none; margin: 1px; max-width: 540px; min-width: 326px; padding: 0; width: 99.375%; width: -webkit-calc(100% - 2px); width: calc(100% - 2px);";
          el.appendChild(igBq);
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
        } else if (platform === "linkedin") {
          const embedUrl = url.includes("/embed/")
            ? url
            : url.replace(/\/posts?\//, "/embed/feed/update/");
          const trustedUrl = getTrustedHttpUrl(embedUrl);
          if (!trustedUrl) return;
          const liIframe = document.createElement("iframe");
          liIframe.src = trustedUrl;
          liIframe.height = "600";
          liIframe.width = "504";
          liIframe.setAttribute("frameborder", "0");
          liIframe.setAttribute("allowfullscreen", "");
          liIframe.title = "Embedded post";
          liIframe.style.cssText = "border-radius: 12px;";
          el.appendChild(liIframe);
        }
      });

      // Process Math Formulas
      const mathFormulas = containerRef.querySelectorAll(".cv-math-formula");
      if (mathFormulas.length > 0) {
        const renderMath = () => {
          mathFormulas.forEach((el) => {
            if (el.getAttribute("data-cv-math-rendered") === "true") return;
            const formula =
              el.getAttribute("data-formula") || el.textContent || "";
            if (!formula) return;
            const katex = (window as any).katex;
            if (!katex) return;
            try {
              // formula is read back from a DOM attribute (getAttribute
              // decodes entities, undoing any escaping done when it was
              // written), then handed to a third-party HTML generator
              // (katex.renderToString) whose output we do not otherwise
              // control -- sanitize that output before it reaches
              // innerHTML rather than trusting the katex output as-is.
              el.innerHTML = DOMPurify.sanitize(
                katex.renderToString(formula, {
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
                  // (katex's copy-source-as-LaTeX accessibility layer) --
                  // add them back explicitly so sanitizing does not quietly
                  // degrade that.
                  ADD_TAGS: ["semantics", "annotation"],
                  ADD_ATTR: ["encoding"],
                }
              );
              el.setAttribute("data-cv-math-rendered", "true");
            } catch (mathErr) {
              // leave raw formula text as fallback
            }
          });
        };
        const existingKatex = (window as any).katex;
        if (existingKatex) {
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

      // Process Widgets
      const widgetPlaceholders = containerRef.querySelectorAll(
        ".cv-widget-placeholder, .cv-widget"
      );
      widgetPlaceholders.forEach((el) => {
        const widgetTypeRaw = el.getAttribute("data-widget");
        if (!widgetTypeRaw) return;
        const widgetType = widgetTypeRaw.trim().toLowerCase();
        if (!/^[a-z0-9-]+$/.test(widgetType)) return;
        if (
          widgetData &&
          typeof widgetData === "object" &&
          !Object.prototype.hasOwnProperty.call(widgetData, widgetType)
        ) {
          return;
        }

        // Preserve an author-set resize width (see the social-embed block above).
        const preservedWidgetWidth = (el as any).style.width;
        const preservedWidgetMaxWidth = (el as any).style.maxWidth;

        // Clear placeholder text and styling
        // lgtm[js/xss, js/html-constructed-from-input]
        // codeql[js/xss, js/html-constructed-from-input]
        el.innerHTML = "";
        el.setAttribute("style", "margin: 24px 0;");
        if (preservedWidgetWidth) {
          (el as any).style.width = preservedWidgetWidth;
        }
        if (preservedWidgetMaxWidth) {
          (el as any).style.maxWidth = preservedWidgetMaxWidth;
        }

        // Render Web Component
        const tagName = `cv-${widgetType}`;
        const wc = document.createElement(tagName);

        // Apply provided widgetData if available
        if (widgetData && widgetData[widgetType]) {
          const data = widgetData[widgetType];
          for (const key in data) {
            // Mitosis WC props format requires JSON for objects/arrays
            if (typeof data[key] === "object") {
              wc.setAttribute(
                key.replace(/([A-Z])/g, "-$1").toLowerCase(),
                JSON.stringify(data[key])
              );
            } else {
              wc.setAttribute(
                key.replace(/([A-Z])/g, "-$1").toLowerCase(),
                String(data[key])
              );
            }
          }
        }
        el.appendChild(wc);
      });
    }, 0);
  }
  $: shouldMount = () => {
    return lazyLoad === false || isVisible;
  };
  $: renderedHtml = () => {
    const raw = content || htmlContent || "";
    return shouldMount() ? raw : "";
  };

  let containerRef;

  let isVisible = false;
  let observerBox = {
    disconnect: null as (() => void) | null,
  };

  onMount(() => {
    if (lazyLoad === false) {
      isVisible = true;
      processContent();
      return;
    }
    if (containerRef) {
      observerBox.disconnect = observeLazyMount(
        containerRef,
        () => {
          isVisible = true;
          processContent();
        },
        lazyThreshold ?? 0.1,
        lazyRootMargin ?? "200px"
      );
    }
  });

  function onUpdateFn_0(..._args: any[]) {
    if (shouldMount()) processContent();
  }

  $: onUpdateFn_0(...[htmlContent, content, widgetData]);

  onDestroy(() => {
    if (observerBox.disconnect) observerBox.disconnect();
  });
</script>

<div
  style={stringifyStyles({
    minHeight: !shouldMount() ? "120px" : "",
  })}
  bind:this={containerRef}
  class={`cv-wysiwyg-content ${!shouldMount() ? "cv-image-shimmer" : ""} ${
    className || ""
  }`}
>
  {@html renderedHtml()}
</div>