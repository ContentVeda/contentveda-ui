export interface WysiwygRendererProps {
  htmlContent: string;
  className?: string;
  widgetData?: any;
  lazyLoad?: boolean;
  lazyThreshold?: number;
  lazyRootMargin?: string;
}

import { observeLazyMount } from "../utils/lazyObserver";

/**
 * Usage:
 *
 *  <wysiwyg-renderer></wysiwyg-renderer>
 *
 */
class WysiwygRenderer extends HTMLElement {
  get _containerRef() {
    return this._root.querySelector(
      "[data-ref='WysiwygRenderer-containerRef']"
    );
  }

  get _root() {
    return this.shadowRoot || this;
  }

  constructor() {
    super();
    const self = this;

    this.state = {
      isVisible: false,
      get shouldMount() {
        return self.props.lazyLoad === false || self.state.isVisible;
      },
      get renderedHtml() {
        return self.state.shouldMount ? self.props.htmlContent : "";
      },
      processContent() {
        setTimeout(() => {
          if (!self._containerRef) return;

          // Process Social Embeds
          const socialEmbeds =
            self._containerRef.querySelectorAll(".cv-social-embed");
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
          const widgetPlaceholders = self._containerRef.querySelectorAll(
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
            if (self.props.widgetData && self.props.widgetData[widgetType]) {
              const data = self.props.widgetData[widgetType];
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
    };
    if (!this.props) {
      this.props = {};
    }

    this.componentProps = [
      "lazyLoad",
      "lazyThreshold",
      "lazyRootMargin",
      "htmlContent",
      "widgetData",
      "className",
    ];

    this.updateDeps = [[this.props.htmlContent, this.props.widgetData]];

    // used to keep track of all nodes created by show/for
    this.nodesToDestroy = [];
    // batch updates
    this.pendingUpdate = false;

    this._observerBox = {
      disconnect: null,
    };

    if (undefined) {
      this.attachShadow({ mode: "open" });
    }
  }

  disconnectedCallback() {
    // onUnMount
    if (self._observerBox.disconnect) self._observerBox.disconnect();
    this.destroyAnyNodes(); // clean up nodes when component is destroyed
  }

  destroyAnyNodes() {
    // destroy current view template refs before rendering again
    this.nodesToDestroy.forEach((el) => el.remove());
    this.nodesToDestroy = [];
  }

  connectedCallback() {
    this.getAttributeNames().forEach((attr) => {
      const jsVar = attr.replace(/-/g, "");
      const regexp = new RegExp("^" + jsVar.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$", "i");
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
      <div
        data-el="div-wysiwyg-renderer-1"
        data-ref="WysiwygRenderer-containerRef"
      ></div>`;
    this.pendingUpdate = true;

    this.render();
    this.onMount();
    this.pendingUpdate = false;
    this.update();
  }

  onMount() {
    // onMount
    if (this.props.lazyLoad === false) {
      this.state.isVisible = true;
      this.update();
      this.state.processContent();
      return;
    }
    if (self._containerRef) {
      self._observerBox.disconnect = observeLazyMount(
        self._containerRef,
        () => {
          this.state.isVisible = true;
          this.update();
          this.state.processContent();
        },
        this.props.lazyThreshold ?? 0.1,
        this.props.lazyRootMargin ?? "200px"
      );
    }
  }

  onUpdate() {
    const self = this;

    (function (__prev, __next) {
      const __hasChange = __prev.find((val, index) => val !== __next[index]);
      if (__hasChange !== undefined) {
        if (self.state.shouldMount) self.state.processContent();
        self.updateDeps[0] = __next;
      }
    })(self.updateDeps[0], [self.props.htmlContent, self.props.widgetData]);
  }

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
    // re-rendering needs to ensure that all nodes generated by for/show are refreshed
    this.destroyAnyNodes();
    this.updateBindings();
  }

  updateBindings() {
    this._root
      .querySelectorAll("[data-el='div-wysiwyg-renderer-1']")
      .forEach((el) => {
        el.className = `cv-wysiwyg-content ${
          !this.state.shouldMount ? "cv-image-shimmer" : ""
        } ${this.props.className || ""}`;
        __cvAssignStyle(el.style, {
          minHeight: !this.state.shouldMount ? "120px" : "",
        });
        el.innerHTML = this.state.renderedHtml;
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
}

customElements.define("wysiwyg-renderer", WysiwygRenderer);


/**
 * Object.assign for inline styles that also handles CSS custom properties.
 * Injected by fix-wc-props.js — see the note there.
 */
function __cvAssignStyle(style: any, obj: any) {
  if (!style || !obj) return style;
  for (const key in obj) {
    const value = obj[key];
    if (key.charCodeAt(0) === 45 && key.charCodeAt(1) === 45) {
      // Custom property. Removing on empty keeps var() fallbacks working,
      // since a property set to the empty value substitutes nothing rather
      // than falling back.
      if (value === '' || value === null || value === undefined) {
        style.removeProperty(key);
      } else {
        style.setProperty(key, String(value));
      }
    } else {
      style[key] = value;
    }
  }
  return style;
}
