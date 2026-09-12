<template>
  <div
    ref="containerRef"
    :class="`cv-wysiwyg-content ${!shouldMount ? 'cv-image-shimmer' : ''} ${
      className || ''
    }`"
    :style="{
      minHeight: !shouldMount ? '120px' : '',
    }"
    v-html="renderedHtml"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { observeLazyMount } from "../utils/lazyObserver";

export interface WysiwygRendererProps {
  htmlContent: string;
  className?: string;
  widgetData?: any;
  lazyLoad?: boolean;
  lazyThreshold?: number;
  lazyRootMargin?: string;
}

export default defineComponent({
  name: "wysiwyg-renderer",

  props: [
    "lazyLoad",
    "lazyThreshold",
    "lazyRootMargin",
    "htmlContent",
    "widgetData",
    "className",
  ],

  data() {
    return {
      isVisible: false,
      observerBox: {
        disconnect: null as (() => void) | null,
      },
    };
  },

  mounted() {
    if (this.lazyLoad === false) {
      this.isVisible = true;
      this.processContent();
      return;
    }
    if (this.$refs.containerRef) {
      this.observerBox.disconnect = observeLazyMount(
        this.$refs.containerRef,
        () => {
          this.isVisible = true;
          this.processContent();
        },
        this.lazyThreshold ?? 0.1,
        this.lazyRootMargin ?? "200px"
      );
    }
  },

  watch: {
    onUpdateHook0: {
      handler() {
        if (this.shouldMount) this.processContent();
      },
      immediate: true,
    },
  },
  unmounted() {
    if (this.observerBox.disconnect) this.observerBox.disconnect();
  },

  computed: {
    shouldMount() {
      return this.lazyLoad === false || this.isVisible;
    },
    renderedHtml() {
      return this.shouldMount ? this.htmlContent : "";
    },
    onUpdateHook0() {
      return {
        0: this.htmlContent,
        1: this.widgetData,
      };
    },
  },

  methods: {
    processContent() {
      setTimeout(() => {
        if (!this.$refs.containerRef) return;

        // Process Social Embeds
        const socialEmbeds =
          this.$refs.containerRef.querySelectorAll(".cv-social-embed");
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
        const widgetPlaceholders = this.$refs.containerRef.querySelectorAll(
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
          if (this.widgetData && this.widgetData[widgetType]) {
            const data = this.widgetData[widgetType];
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
    },
  },
});
</script>