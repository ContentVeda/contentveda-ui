export interface BannerMedia {
  type?: "image" | "video" | string;
  url?: string;
  settings?: any;
}
export interface MapLink {
  label?: string;
  url?: string;
}
export interface BannerConfig {
  align?: "left" | "center" | "right";
  textAlignment?: "left" | "center" | "right";
  padding?: "sm" | "md" | "lg" | "xl" | string;
  bgGradient?: string;
  autoplay?: boolean;
  height?: string;
  minHeight?: string;
  bgPosition?: string;
  hotspotMinTargetSize?: number;
  backgroundEffect?: BackgroundEffectName;
  backgroundEffectPlugin?: BackgroundEffectPlugin;
}
export type HotspotShape = "rect" | "oval" | "polygon";
export interface HotspotCoords {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface HotspotPoint {
  x: number;
  y: number;
}
export interface HotspotAction {
  type: "link" | "deeplink";
  url: string;
  deeplink?: string;
}
export interface Hotspot {
  id: string;
  label?: string;
  altText: string;
  shape: HotspotShape;
  coords: HotspotCoords;
  points?: HotspotPoint[];
  action: HotspotAction;
  showTooltip?: boolean;
  pulse?: boolean;
}
export interface BannerProps {
  id?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  media?: BannerMedia;
  mapLinks?: MapLink[];
  textAlignment?: "left" | "center" | "right";
  className?: string;
  isLoading?: boolean;
  align?: "left" | "center" | "right";
  backgroundImageUrl?: string;
  ctaLink?: string;
  padding?: "sm" | "md" | "lg" | "xl" | string;
  bgGradient?: string;
  config?: BannerConfig;
  hotspots?: Hotspot[];
  lazyLoad?: boolean;
  lazyThreshold?: number;
  lazyRootMargin?: string;
}

import { observeLazyMount } from "../utils/lazyObserver";
import { defaultBackgroundEffectPlugin } from "../utils/backgroundEffects";
import type {
  BackgroundEffectContext,
  BackgroundEffectName,
  BackgroundEffectPlugin,
} from "../utils/backgroundEffects";

/**
 * Usage:
 *
 *  <banner></banner>
 *
 */
class Banner extends HTMLElement {
  get _rootRef() {
    return this._root.querySelector("[data-ref='Banner-rootRef']");
  }

  get _canvasRef() {
    return this._root.querySelector("[data-ref='Banner-canvasRef']");
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
      get showSkeleton() {
        return !!self.props.isLoading || !self.state.shouldMount;
      },
      get alignment() {
        return (
          self.props.textAlignment ||
          self.props.align ||
          self.props.config?.textAlignment ||
          self.props.config?.align ||
          "center"
        );
      },
      get hasVideo() {
        return (
          self.props.media?.type === "video" ||
          (self.props.backgroundImageUrl &&
            self.props.backgroundImageUrl.endsWith(".mp4")) ||
          (self.props.media?.url && self.props.media.url.endsWith(".mp4"))
        );
      },
      get videoUrl() {
        return self.props.media?.url || self.props.backgroundImageUrl || "";
      },
      get imageUrl() {
        return self.props.media?.url || self.props.backgroundImageUrl || "";
      },
      get linkUrl() {
        return self.props.mapLinks?.[0]?.url || self.props.ctaLink || "#";
      },
      get gradientOverlay() {
        return self.props.config?.bgGradient || self.props.bgGradient || "";
      },
      get paddingValue() {
        const p = self.props.config?.padding || self.props.padding;
        if (p === "sm") return "var(--cv-spacing-sm)";
        if (p === "md") return "var(--cv-spacing-md)";
        if (p === "lg") return "var(--cv-spacing-lg)";
        if (p === "xl") return "var(--cv-spacing-xl)";
        return p || "";
      },
      get backgroundPosition() {
        return self.props.config?.bgPosition || "";
      },
      get minHeightValue() {
        if (self.props.config?.height === "auto") return "auto";
        return (
          self.props.config?.minHeight || self.props.config?.height || "300px"
        );
      },
      get hotspotMinTarget() {
        return self.props.config?.hotspotMinTargetSize ?? 24;
      },
      get backgroundEffectClass() {
        return self.props.config?.backgroundEffect || "none";
      },
      get plugin() {
        return (
          self.props.config?.backgroundEffectPlugin ||
          defaultBackgroundEffectPlugin
        );
      },
      hotspotHref(h: Hotspot) {
        return h.action?.type === "deeplink"
          ? h.action.deeplink || h.action.url || "#"
          : h.action?.url || "#";
      },
      hotspotLabel(h: Hotspot) {
        return h.altText || h.label || "Hotspot link";
      },
      hotspotPolygonPoints(h: Hotspot) {
        if (!h.points?.length) return "";
        return h.points.map((p) => `${p.x},${p.y}`).join(" ");
      },
      hotspotCenter(h: Hotspot) {
        return {
          x: h.coords.x + h.coords.width / 2,
          y: h.coords.y + h.coords.height / 2,
        };
      },
      hotspotHitStyle(h: Hotspot) {
        const c = self.state.hotspotCenter(h);
        return {
          position: "absolute",
          left: `${c.x}%`,
          top: `${c.y}%`,
          width: `${h.coords.width}%`,
          height: `${h.coords.height}%`,
          minWidth: `${self.state.hotspotMinTarget}px`,
          minHeight: `${self.state.hotspotMinTarget}px`,
          transform: "translate(-50%, -50%)",
        };
      },
    };
    if (!this.props) {
      this.props = {};
    }

    this.componentProps = [
      "lazyLoad",
      "lazyThreshold",
      "lazyRootMargin",
      "isLoading",
      "textAlignment",
      "align",
      "config",
      "media",
      "backgroundImageUrl",
      "mapLinks",
      "ctaLink",
      "bgGradient",
      "padding",
      "className",
      "hotspots",
      "title",
      "subtitle",
      "ctaText",
    ];

    this.updateDeps = [[this.state.backgroundEffectClass, self._canvasRef]];

    // used to keep track of all nodes created by show/for
    this.nodesToDestroy = [];
    // batch updates
    this.pendingUpdate = false;

    this._animContext = {
      animationFrameId: null,
      resizeHandler: null,
      resizeObserver: null,
    };
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
    this.state.plugin.stop(self._animContext);
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
      const regexp = new RegExp(jsVar, "i");
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
      <div data-el="div-banner-1" data-ref="Banner-rootRef">
        <template data-el="show-banner">
          <video data-el="video-banner-1"></video>
        </template>
        <template data-el="show-banner-2">
          <img alt="" data-el="img-banner-1" />
        </template>
        <template data-el="show-banner-3">
          <canvas
            class="cv-banner-bg-effect"
            aria-hidden="true"
            data-el="canvas-banner-1"
            data-ref="Banner-canvasRef"
          ></canvas>
        </template>
        <template data-el="show-banner-4">
          <div class="cv-banner-hotspots" data-el="div-banner-2">
            <svg
              class="cv-banner-hotspots-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <template data-el="for-banner">
                <g data-el="g-banner-1">
                  <g data-el="g-banner-2">
                    <template data-el="show-banner-5">
                      <rect
                        vector-effect="non-scaling-stroke"
                        data-el="rect-banner-1"
                      ></rect>
                    </template>
                    <template data-el="show-banner-6">
                      <ellipse
                        vector-effect="non-scaling-stroke"
                        data-el="ellipse-banner-1"
                      ></ellipse>
                    </template>
                    <template data-el="show-banner-7">
                      <polygon
                        vector-effect="non-scaling-stroke"
                        data-el="polygon-banner-1"
                      ></polygon>
                    </template>
                    <template data-el="show-banner-8">
                      <template data-el="show-banner-9">
                        <rect
                          class="cv-hotspot-pulse-ring"
                          vector-effect="non-scaling-stroke"
                          data-el="rect-banner-2"
                        ></rect>
                      </template>
                    </template>
                    <template data-el="show-banner-10">
                      <template data-el="show-banner-11">
                        <ellipse
                          class="cv-hotspot-pulse-ring"
                          vector-effect="non-scaling-stroke"
                          data-el="ellipse-banner-2"
                        ></ellipse>
                      </template>
                    </template>
                    <template data-el="show-banner-12">
                      <template data-el="show-banner-13">
                        <polygon
                          class="cv-hotspot-pulse-ring"
                          vector-effect="non-scaling-stroke"
                          data-el="polygon-banner-2"
                        ></polygon>
                      </template>
                    </template>
                  </g>
                </g>
              </template>
            </svg>
      
            <template data-el="for-banner-2">
              <div data-el="div-banner-3">
                <div class="cv-hotspot-hit" data-el="div-banner-4">
                  <a data-el="a-banner-1">
                    <template data-el="show-banner-14">
                      <span
                        role="tooltip"
                        class="cv-hotspot-tooltip"
                        data-el="span-banner-1"
                      >
                        <template data-el="div-banner-5">
                          <!-- h.label || h.altText -->
                        </template>
                      </span>
                    </template>
                  </a>
                </div>
              </div>
            </template>
          </div>
        </template>
        <div class="cv-banner-overlay" data-el="div-banner-6">
          <div class="cv-banner-content" data-el="div-banner-7">
            <template data-el="show-banner-15">
              <div
                class="cv-skeleton-title cv-image-shimmer"
                data-el="div-banner-8"
              ></div>
              <div
                class="cv-skeleton-text cv-image-shimmer"
                data-el="div-banner-9"
              ></div>
              <div
                class="cv-skeleton-text cv-image-shimmer"
                data-el="div-banner-10"
              ></div>
              <div
                class="cv-skeleton-button cv-image-shimmer"
                data-el="div-banner-11"
              ></div>
            </template>
            <template data-el="show-banner-16">
              <template data-el="show-banner-17">
                <h2 class="cv-banner-title">
                  <template data-el="div-banner-12"><!-- props.title --></template>
                </h2>
              </template>
              <template data-el="show-banner-18">
                <p class="cv-banner-subtitle">
                  <template data-el="div-banner-13"><!-- props.subtitle --></template>
                </p>
              </template>
              <template data-el="show-banner-19">
                <a class="cv-banner-cta" data-el="a-banner-2">
                  <template data-el="div-banner-14"><!-- props.ctaText --></template>
                </a>
              </template>
            </template>
          </div>
        </div>
      </div>`;
    this.pendingUpdate = true;

    this.render();
    this.onMount();
    this.pendingUpdate = false;
    this.update();
  }

  showContent(el) {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content
    // grabs the content of a node that is between <template> tags
    // iterates through child nodes to register all content including text elements
    // attaches the content after the template

    const elementFragment = el.content.cloneNode(true);
    const children = Array.from(elementFragment.childNodes);
    children.forEach((child) => {
      if (el?.scope) {
        child.scope = el.scope;
      }
      if (el?.context) {
        child.context = el.context;
      }
      this.nodesToDestroy.push(child);
    });
    el.after(elementFragment);
  }

  onMount() {
    // onMount
    if (this.props.lazyLoad === false) {
      this.state.isVisible = true;
      this.update();
      if (self._canvasRef)
        this.state.plugin.start(
          self._canvasRef,
          this.state.backgroundEffectClass as BackgroundEffectName,
          self._animContext
        );
      return;
    }
    if (self._rootRef) {
      self._observerBox.disconnect = observeLazyMount(
        self._rootRef,
        () => {
          this.state.isVisible = true;
          this.update();
          if (self._canvasRef)
            this.state.plugin.start(
              self._canvasRef,
              this.state.backgroundEffectClass as BackgroundEffectName,
              self._animContext
            );
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
        if (self.state.isVisible && self._canvasRef)
          self.state.plugin.start(
            self._canvasRef,
            self.state.backgroundEffectClass as BackgroundEffectName,
            self._animContext
          );
        self.updateDeps[0] = __next;
      }
    })(self.updateDeps[0], [self.state.backgroundEffectClass, self._canvasRef]);
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
    this._root.querySelectorAll("[data-el='div-banner-1']").forEach((el) => {
      el.className = `cv-banner ${
        this.state.showSkeleton ? "cv-image-shimmer" : ""
      } ${this.props.className || ""}`;
      Object.assign(el.style, {
        backgroundImage:
          this.state.shouldMount &&
          !this.props.isLoading &&
          !this.state.hasVideo &&
          this.state.imageUrl &&
          this.props.config?.height !== "auto"
            ? `url(${this.state.imageUrl})`
            : "none",
        textAlign: this.state.alignment,
        backgroundPosition: this.state.backgroundPosition || "center",
        minHeight: this.state.minHeightValue || "",
        height: this.props.config?.height || "",
      });
    });

    this._root.querySelectorAll("[data-el='show-banner']").forEach((el) => {
      const whenCondition =
        this.state.shouldMount && !this.props.isLoading && this.state.hasVideo;
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root.querySelectorAll("[data-el='video-banner-1']").forEach((el) => {
      el.setAttribute("src", this.state.videoUrl);
      el.setAttribute("autoPlay", true);
      el.setAttribute("loop", true);
      el.setAttribute("muted", true);
      el.setAttribute("playsInline", true);
      Object.assign(el.style, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
      });
    });

    this._root.querySelectorAll("[data-el='show-banner-2']").forEach((el) => {
      const whenCondition =
        this.state.shouldMount &&
        !this.props.isLoading &&
        !this.state.hasVideo &&
        this.state.imageUrl &&
        this.props.config?.height === "auto";
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root.querySelectorAll("[data-el='img-banner-1']").forEach((el) => {
      el.setAttribute("src", this.state.imageUrl);
      Object.assign(el.style, {
        width: "100%",
        height: "auto",
        display: "block",
        zIndex: 0,
        objectFit: "cover",
        objectPosition: this.state.backgroundPosition || "center",
      });
    });

    this._root.querySelectorAll("[data-el='show-banner-3']").forEach((el) => {
      const whenCondition =
        !!this.props.config?.backgroundEffect &&
        this.props.config.backgroundEffect !== "none";
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root.querySelectorAll("[data-el='canvas-banner-1']").forEach((el) => {
      Object.assign(el.style, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      });
    });

    this._root.querySelectorAll("[data-el='show-banner-4']").forEach((el) => {
      const whenCondition =
        this.state.shouldMount && !!this.props.hotspots?.length;
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root.querySelectorAll("[data-el='div-banner-2']").forEach((el) => {
      Object.assign(el.style, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
      });
    });

    this._root.querySelectorAll("[data-el='for-banner']").forEach((el) => {
      let array = this.props.hotspots;
      this.renderLoop(el, array, "h");
    });

    this._root.querySelectorAll("[data-el='g-banner-1']").forEach((el) => {
      el.key = `${h.id}-visual`;
    });

    this._root.querySelectorAll("[data-el='g-banner-2']").forEach((el) => {
      el.className = `cv-hotspot-visual cv-hotspot-visual-${h.shape}`;
    });

    this._root.querySelectorAll("[data-el='show-banner-5']").forEach((el) => {
      const h = this.getScope(el, "h");
      const whenCondition = h.shape === "rect";
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root.querySelectorAll("[data-el='rect-banner-1']").forEach((el) => {
      const h = this.getScope(el, "h");
      el.setAttribute("x", h.coords.x);
      el.setAttribute("y", h.coords.y);
      el.setAttribute("width", h.coords.width);
      el.setAttribute("height", h.coords.height);
    });

    this._root.querySelectorAll("[data-el='show-banner-6']").forEach((el) => {
      const h = this.getScope(el, "h");
      const whenCondition = h.shape === "oval";
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root
      .querySelectorAll("[data-el='ellipse-banner-1']")
      .forEach((el) => {
        const h = this.getScope(el, "h");
        el.setAttribute("cx", h.coords.x + h.coords.width / 2);
        el.setAttribute("cy", h.coords.y + h.coords.height / 2);
        el.setAttribute("rx", h.coords.width / 2);
        el.setAttribute("ry", h.coords.height / 2);
      });

    this._root.querySelectorAll("[data-el='show-banner-7']").forEach((el) => {
      const h = this.getScope(el, "h");
      const whenCondition = h.shape === "polygon";
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root
      .querySelectorAll("[data-el='polygon-banner-1']")
      .forEach((el) => {
        const h = this.getScope(el, "h");
        el.setAttribute("points", this.state.hotspotPolygonPoints(h));
      });

    this._root.querySelectorAll("[data-el='show-banner-8']").forEach((el) => {
      const h = this.getScope(el, "h");
      const whenCondition = h.pulse;
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root.querySelectorAll("[data-el='show-banner-9']").forEach((el) => {
      const h = this.getScope(el, "h");
      const whenCondition = h.shape === "rect";
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root.querySelectorAll("[data-el='rect-banner-2']").forEach((el) => {
      const h = this.getScope(el, "h");
      el.setAttribute("x", h.coords.x);
      el.setAttribute("y", h.coords.y);
      el.setAttribute("width", h.coords.width);
      el.setAttribute("height", h.coords.height);
    });

    this._root.querySelectorAll("[data-el='show-banner-10']").forEach((el) => {
      const h = this.getScope(el, "h");
      const whenCondition = h.pulse;
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root.querySelectorAll("[data-el='show-banner-11']").forEach((el) => {
      const h = this.getScope(el, "h");
      const whenCondition = h.shape === "oval";
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root
      .querySelectorAll("[data-el='ellipse-banner-2']")
      .forEach((el) => {
        const h = this.getScope(el, "h");
        el.setAttribute("cx", h.coords.x + h.coords.width / 2);
        el.setAttribute("cy", h.coords.y + h.coords.height / 2);
        el.setAttribute("rx", h.coords.width / 2);
        el.setAttribute("ry", h.coords.height / 2);
      });

    this._root.querySelectorAll("[data-el='show-banner-12']").forEach((el) => {
      const h = this.getScope(el, "h");
      const whenCondition = h.pulse;
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root.querySelectorAll("[data-el='show-banner-13']").forEach((el) => {
      const h = this.getScope(el, "h");
      const whenCondition = h.shape === "polygon";
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root
      .querySelectorAll("[data-el='polygon-banner-2']")
      .forEach((el) => {
        const h = this.getScope(el, "h");
        el.setAttribute("points", this.state.hotspotPolygonPoints(h));
      });

    this._root.querySelectorAll("[data-el='for-banner-2']").forEach((el) => {
      let array = this.props.hotspots;
      this.renderLoop(el, array, "h");
    });

    this._root.querySelectorAll("[data-el='div-banner-3']").forEach((el) => {
      const h = this.getScope(el, "h");
      el.key = h.id;
    });

    this._root.querySelectorAll("[data-el='div-banner-4']").forEach((el) => {
      const h = this.getScope(el, "h");
      Object.assign(el.style, this.state.hotspotHitStyle(h));
    });

    this._root.querySelectorAll("[data-el='a-banner-1']").forEach((el) => {
      const h = this.getScope(el, "h");
      el.setAttribute("href", this.state.hotspotHref(h));
      el.setAttribute("aria-label", this.state.hotspotLabel(h));
      el.setAttribute(
        "aria-describedby",
        h.showTooltip ? `cv-hotspot-tip-${h.id}` : undefined
      );
      el.className = `cv-hotspot cv-hotspot-${h.shape}`;
    });

    this._root.querySelectorAll("[data-el='show-banner-14']").forEach((el) => {
      const h = this.getScope(el, "h");
      const whenCondition = !!h.showTooltip;
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root.querySelectorAll("[data-el='span-banner-1']").forEach((el) => {
      el.setAttribute("id", `cv-hotspot-tip-${h.id}`);
    });

    this._root.querySelectorAll("[data-el='div-banner-5']").forEach((el) => {
      const h = this.getScope(el, "h");
      this.renderTextNode(el, h.label || h.altText);
    });

    this._root.querySelectorAll("[data-el='div-banner-6']").forEach((el) => {
      Object.assign(el.style, {
        zIndex: 1,
        position:
          this.props.config?.height === "auto" ? "absolute" : "relative",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background:
          this.state.gradientOverlay ||
          "var(--cv-color-scrim, rgba(0, 0, 0, 0.4))",
        padding: this.state.paddingValue || "var(--cv-spacing-xl)",
      });
    });

    this._root.querySelectorAll("[data-el='div-banner-7']").forEach((el) => {
      Object.assign(el.style, {
        display: "flex",
        flexDirection: "column",
        alignItems:
          this.state.alignment === "center"
            ? "center"
            : this.state.alignment === "right"
            ? "flex-end"
            : "flex-start",
      });
    });

    this._root.querySelectorAll("[data-el='show-banner-15']").forEach((el) => {
      const whenCondition = this.state.showSkeleton;
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root.querySelectorAll("[data-el='div-banner-8']").forEach((el) => {
      Object.assign(el.style, {
        width: "60%",
        height: "36px",
        marginBottom: "16px",
      });
    });

    this._root.querySelectorAll("[data-el='div-banner-9']").forEach((el) => {
      Object.assign(el.style, {
        width: "80%",
        height: "18px",
        marginBottom: "10px",
      });
    });

    this._root.querySelectorAll("[data-el='div-banner-10']").forEach((el) => {
      Object.assign(el.style, {
        width: "50%",
        height: "18px",
        marginBottom: "24px",
      });
    });

    this._root.querySelectorAll("[data-el='div-banner-11']").forEach((el) => {
      Object.assign(el.style, {
        width: "140px",
        height: "42px",
      });
    });

    this._root.querySelectorAll("[data-el='show-banner-16']").forEach((el) => {
      const whenCondition = !this.state.showSkeleton;
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root.querySelectorAll("[data-el='show-banner-17']").forEach((el) => {
      const whenCondition = this.props.title;
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root.querySelectorAll("[data-el='div-banner-12']").forEach((el) => {
      this.renderTextNode(el, this.props.title);
    });

    this._root.querySelectorAll("[data-el='show-banner-18']").forEach((el) => {
      const whenCondition = this.props.subtitle;
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root.querySelectorAll("[data-el='div-banner-13']").forEach((el) => {
      this.renderTextNode(el, this.props.subtitle);
    });

    this._root.querySelectorAll("[data-el='show-banner-19']").forEach((el) => {
      const whenCondition = this.props.ctaText;
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root.querySelectorAll("[data-el='a-banner-2']").forEach((el) => {
      el.setAttribute("href", this.state.linkUrl);
    });

    this._root.querySelectorAll("[data-el='div-banner-14']").forEach((el) => {
      this.renderTextNode(el, this.props.ctaText);
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

  // scope helper
  getScope(el, name) {
    do {
      let value = el?.scope?.[name];
      if (value !== undefined) {
        return value;
      }
    } while ((el = el.parentNode));
  }

  // Helper to render loops
  renderLoop(template, array, itemName, itemIndex, collectionName) {
    const collection = [];
    for (let [index, value] of array.entries()) {
      const elementFragment = template.content.cloneNode(true);
      const children = Array.from(elementFragment.childNodes);
      const localScope = {};
      let scope = localScope;
      if (template?.scope) {
        const getParent = {
          get(target, prop, receiver) {
            if (prop in target) {
              return target[prop];
            }
            if (prop in template.scope) {
              return template.scope[prop];
            }
            return target[prop];
          },
        };
        scope = new Proxy(localScope, getParent);
      }
      children.forEach((child) => {
        if (itemName !== undefined) {
          scope[itemName] = value;
        }
        if (itemIndex !== undefined) {
          scope[itemIndex] = index;
        }
        if (collectionName !== undefined) {
          scope[collectionName] = array;
        }
        child.scope = scope;
        if (template.context) {
          child.context = context;
        }
        this.nodesToDestroy.push(child);
        collection.unshift(child);
      });
    }
    collection.forEach((child) => template.after(child));
  }
}

customElements.define("banner", Banner);
