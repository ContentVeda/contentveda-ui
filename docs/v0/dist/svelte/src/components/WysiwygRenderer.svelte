<svelte:options runes={false} />
<script context="module" lang="ts">
  export interface WysiwygRendererProps {
    htmlContent: string;
    className?: string;
    widgetData?: any;
    lazyLoad?: boolean;
    lazyThreshold?: number;
    lazyRootMargin?: string;
  }
</script>

<script lang="ts">
  let observerBox = { disconnect: null, row: null };
  import { onDestroy, onMount } from "svelte";

  import { observeLazyMount } from "../utils/lazyObserver";

  export let lazyLoad: WysiwygRendererProps["lazyLoad"];
  export let lazyThreshold: WysiwygRendererProps["lazyThreshold"];
  export let lazyRootMargin: WysiwygRendererProps["lazyRootMargin"];
  export let htmlContent: WysiwygRendererProps["htmlContent"];
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

  function processContent() {
    setTimeout(() => {
      if (!containerRef) return;

      // Process Social Embeds
      const socialEmbeds = containerRef.querySelectorAll(".cv-social-embed");
      socialEmbeds.forEach((el) => {
        const platform = el.getAttribute("data-platform");
        const url = el.getAttribute("data-url");
        if (!platform || !url) return;

        // Clear placeholder text and fix styling
        el.innerHTML = "";
        el.setAttribute(
          "style",
          "margin: 20px 0; display: flex; justify-content: center; background: transparent; border: none; padding: 0;"
        );
        if (platform === "youtube") {
          let videoId = "";
          const match = url.match(
            /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
          );
          if (match && match[1]) videoId = match[1];
          if (videoId) {
            el.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);"></iframe>`;
          } else {
            el.innerHTML = `<a href="${url}" target="_blank" style="color: var(--cv-color-link, #7fc4de); text-decoration: underline;">View Video on YouTube</a>`;
          }
        } else if (platform === "facebook") {
          el.innerHTML = `<div class="fb-post" data-href="${url}" data-width="500"></div>`;
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
          el.innerHTML = `<blockquote class="twitter-tweet" data-theme="dark"><a href="${url}"></a></blockquote>`;
          if (!document.getElementById("twitter-wjs")) {
            const script = document.createElement("script");
            script.id = "twitter-wjs";
            script.src = "https://platform.twitter.com/widgets";
            script.async = true;
            document.body.appendChild(script);
          } else if ((window as any).twttr) {
            (window as any).twttr.widgets.load(el);
          }
        } else if (platform === "instagram") {
          el.innerHTML = `<blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14" style="background: var(--cv-color-media-base, #000); border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); border-radius: 3px; box-shadow: none; margin: 1px; max-width: 540px; min-width: 326px; padding: 0; width: 99.375%; width: -webkit-calc(100% - 2px); width: calc(100% - 2px);"></blockquote>`;
          if (!document.getElementById("instagram-embed")) {
            const script = document.createElement("script");
            script.id = "instagram-embed";
            script.src = "https://www.instagram.com/embed";
            script.async = true;
            document.body.appendChild(script);
          } else if ((window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
          }
        } else if (platform === "linkedin") {
          const embedUrl = url.includes("/embed/")
            ? url
            : url.replace("/post/", "/embed/feed/update/");
          el.innerHTML = `<iframe src="${embedUrl}" height="600" width="504" frameborder="0" allowfullscreen="" title="Embedded post" style="border-radius: 12px;"></iframe>`;
        }
      });

      // Process Widgets
      const widgetPlaceholders = containerRef.querySelectorAll(
        ".cv-widget-placeholder"
      );
      widgetPlaceholders.forEach((el) => {
        const widgetType = el.getAttribute("data-widget");
        if (!widgetType) return;

        // Clear placeholder text and styling
        el.innerHTML = "";
        el.setAttribute("style", "margin: 24px 0;");

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
    return shouldMount() ? htmlContent : "";
  };

  let containerRef;

  let isVisible = false;

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

  $: onUpdateFn_0(...[htmlContent, widgetData]);

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