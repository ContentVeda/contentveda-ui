export interface BannerMedia {
  type?: "image" | "video" | string;
  url?: string;
  settings?: any;
}
export interface MapLink {
  label?: string;
  url?: string;
}
export interface WidgetItem {
  id?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  textAlignment?: "left" | "center" | "right";
  media?: BannerMedia;
  mapLinks?: MapLink[];
}
export interface SliderConfig {
  autoStart: boolean;
  rotateAgain: boolean;
  delayMs: number;
  showNextPrev: boolean;
  showArrows?: boolean;
  showDots: boolean;
  animationEffect?:
    | "slide"
    | "fade"
    | "zoom"
    | "flip"
    | "push-horizontal"
    | "push-vertical"
    | "wipe"
    | "cube"
    | "door"
    | "fall"
    | "crush"
    | "peel-off"
    | "curtain";
  animationQuality?: "light" | "detailed";
  backgroundEffect?: BackgroundEffectName;
  backgroundEffectPlugin?: BackgroundEffectPlugin;
  hideArrowsIfNoScroll?: boolean;
  height?: string;
  minHeight?: string;
  bgPosition?: string;
  align?: "left" | "center" | "right";
}
export interface SlidingBannerProps {
  items: WidgetItem[];
  config?: SliderConfig;
  className?: string;
  isLoading?: boolean;
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
 *  <sliding-banner></sliding-banner>
 *
 */
class SlidingBanner extends HTMLElement {
  get _rootRef() {
    return this._root.querySelector("[data-ref='SlidingBanner-rootRef']");
  }

  get _canvasRef() {
    return this._root.querySelector("[data-ref='SlidingBanner-canvasRef']");
  }

  get _root() {
    return this.shadowRoot || this;
  }

  constructor() {
    super();
    const self = this;

    this.state = {
      currentIndex: 0,
      previousIndex: 0,
      direction: "next",
      isVisible: false,
      wrapping: false,
      get shouldMount() {
        return self.props.lazyLoad === false || self.state.isVisible;
      },
      get showSkeleton() {
        return !!self.props.isLoading || !self.state.shouldMount;
      },
      get animationClass() {
        return self.props.config?.animationEffect || "slide";
      },
      get backgroundClass() {
        return self.props.config?.backgroundEffect || "none";
      },
      get plugin() {
        return (
          self.props.config?.backgroundEffectPlugin ||
          defaultBackgroundEffectPlugin
        );
      },
      get qualityClass() {
        return self.props.config?.animationQuality || "detailed";
      },
      next() {
        if (!self.props.items?.length) return;
        self.state.direction = "next";
        self.update();
        self.state.previousIndex = self.state.currentIndex;
        self.update();
        if (self.state.currentIndex >= self.props.items.length - 1) {
          if (self.props.config?.rotateAgain !== false) {
            self.state.wrapping = true;
            self.update();
            self.state.currentIndex = 0;
            self.update();
          }
        } else {
          self.state.currentIndex = self.state.currentIndex + 1;
          self.update();
        }
      },
      prev() {
        if (!self.props.items?.length) return;
        self.state.direction = "prev";
        self.update();
        self.state.previousIndex = self.state.currentIndex;
        self.update();
        if (self.state.currentIndex <= 0) {
          if (self.props.config?.rotateAgain !== false) {
            self.state.wrapping = true;
            self.update();
            self.state.currentIndex = self.props.items.length - 1;
            self.update();
          }
        } else {
          self.state.currentIndex = self.state.currentIndex - 1;
          self.update();
        }
      },
      goTo(index: number) {
        if (self.state.currentIndex !== index) {
          self.state.direction =
            index > self.state.currentIndex ? "next" : "prev";
          self.update();
          self.state.previousIndex = self.state.currentIndex;
          self.update();
          self.state.currentIndex = index;
          self.update();
        }
      },
      startAutoPlay() {
        if (self._animContext.intervalId) return;
        if (
          self.props.config?.autoStart !== false &&
          self.props.items?.length > 1
        ) {
          self._animContext.intervalId = setInterval(() => {
            self._latestNext.fn();
          }, self.props.config?.delayMs || 5000);
        }
      },
      stopAutoPlay() {
        if (self._animContext.intervalId) {
          clearInterval(self._animContext.intervalId);
          self._animContext.intervalId = null;
        }
      },
      setupDimensions() {
        if (self._rootRef) {
          self._rootRef.style.setProperty(
            "--slider-half-width",
            `${self._rootRef.offsetWidth / 2}px`
          );
        }
      },
      mountHeavyContent: function mountHeavyContent() {
        self.state.startAutoPlay();
        self.state.setupDimensions();
        self._animContext.dimResizeHandler = () => self.state.setupDimensions();
        window.addEventListener("resize", self._animContext.dimResizeHandler);
        if (self._canvasRef) {
          self.state.plugin.start(
            self._canvasRef,
            self.state.backgroundClass as BackgroundEffectName,
            self._bgEffectContext
          );
        }
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
      "config",
      "items",
      "className",
    ];

    this.updateDeps = [
      [],
      [this.state.wrapping],
      [this.state.backgroundClass, self._canvasRef],
    ];

    // used to keep track of all nodes created by show/for
    this.nodesToDestroy = [];
    // batch updates
    this.pendingUpdate = false;

    // Event handler for 'mouseenter' event on div-sliding-banner-1
    this.onDivSlidingBanner1Mouseenter = (event) => {
      this.state.stopAutoPlay();
    };

    // Event handler for 'mouseleave' event on div-sliding-banner-1
    this.onDivSlidingBanner1Mouseleave = (event) => {
      this.state.startAutoPlay();
    };

    // Event handler for 'click' event on button-sliding-banner-1
    this.onButtonSlidingBanner1Click = (event) => {
      this.state.prev();
    };

    // Event handler for 'click' event on button-sliding-banner-2
    this.onButtonSlidingBanner2Click = (event) => {
      this.state.next();
    };

    // Event handler for 'click' event on button-sliding-banner-3
    this.onButtonSlidingBanner3Click = (event) => {
      const index = this.getScope(event.currentTarget, "index");
      this.state.goTo(index);
    };

    this._animContext = {
      intervalId: null as any,
      dimResizeHandler: null as any,
    };
    this._bgEffectContext = {
      animationFrameId: null,
      resizeHandler: null,
      resizeObserver: null,
    };
    this._observerBox = {
      disconnect: null,
    };
    this._latestNext = {
      fn: () => {},
    };

    if (undefined) {
      this.attachShadow({ mode: "open" });
    }
  }

  disconnectedCallback() {
    // onUnMount
    this.state.stopAutoPlay();
    this.state.plugin.stop(self._bgEffectContext);
    // Same guard as RowScrollable: onDestroy also runs on the server. The
    // handler is only assigned in onMount so this branch is normally skipped
    // there, but the typeof check makes that safe by construction rather than
    // by coincidence.
    if (typeof window !== "undefined" && self._animContext.dimResizeHandler) {
      window.removeEventListener("resize", self._animContext.dimResizeHandler);
    }
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
      <div
        role="region"
        data-el="div-sliding-banner-1"
        data-ref="SlidingBanner-rootRef"
      >
        <template data-el="show-sliding-banner">
          <canvas
            class="cv-sliding-banner-canvas"
            data-el="canvas-sliding-banner-1"
            data-ref="SlidingBanner-canvasRef"
          ></canvas>
        </template>
        <template data-el="show-sliding-banner-2">
          <img alt="" data-el="img-sliding-banner-1" />
        </template>
        <div data-el="div-sliding-banner-2">
          <template data-el="for-sliding-banner">
            <div data-el="div-sliding-banner-3">
              <template data-el="show-sliding-banner-3">
                <video data-el="video-sliding-banner-1"></video>
              </template>
              <template data-el="show-sliding-banner-4">
                <div data-el="div-sliding-banner-4"></div>
              </template>
              <template data-el="show-sliding-banner-5">
                <div
                  class="cv-curtain-panel cv-curtain-panel-left"
                  data-el="div-sliding-banner-5"
                ></div>
                <div
                  class="cv-curtain-panel cv-curtain-panel-right"
                  data-el="div-sliding-banner-6"
                ></div>
              </template>
              <template data-el="show-sliding-banner-6">
                <div class="cv-cube-side"></div>
              </template>
              <div class="cv-sliding-overlay"></div>
              <div class="cv-sliding-content" data-el="div-sliding-banner-7">
                <template data-el="show-sliding-banner-7">
                  <div
                    class="cv-skeleton-title cv-image-shimmer"
                    data-el="div-sliding-banner-8"
                  ></div>
                  <div
                    class="cv-skeleton-text cv-image-shimmer"
                    data-el="div-sliding-banner-9"
                  ></div>
                  <div
                    class="cv-skeleton-text cv-image-shimmer"
                    data-el="div-sliding-banner-10"
                  ></div>
                  <div
                    class="cv-skeleton-button cv-image-shimmer"
                    data-el="div-sliding-banner-11"
                  ></div>
                </template>
                <template data-el="show-sliding-banner-8">
                  <h2 class="cv-sliding-title">
                    <template data-el="div-sliding-banner-12">
                      <!-- item.title -->
                    </template>
                  </h2>
                  <template data-el="show-sliding-banner-9">
                    <p class="cv-sliding-subtitle">
                      <template data-el="div-sliding-banner-13">
                        <!-- item.subtitle -->
                      </template>
                    </p>
                  </template>
                  <template data-el="show-sliding-banner-10">
                    <a class="cv-sliding-cta" data-el="a-sliding-banner-1">
                      <template data-el="div-sliding-banner-14">
                        <!-- item.ctaText -->
                      </template>
                    </a>
                  </template>
                </template>
              </div>
            </div>
          </template>
        </div>
        <template data-el="show-sliding-banner-11">
          <button
            type="button"
            class="cv-sliding-arrow prev"
            aria-label="Previous"
            data-el="button-sliding-banner-1"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button
            type="button"
            class="cv-sliding-arrow next"
            aria-label="Next"
            data-el="button-sliding-banner-2"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </template>
        <template data-el="show-sliding-banner-12">
          <div class="cv-sliding-dots">
            <template data-el="for-sliding-banner-2">
              <button type="button" data-el="button-sliding-banner-3"></button>
            </template>
          </div>
        </template>
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
      this.state.mountHeavyContent();
      return;
    }
    if (self._rootRef) {
      self._observerBox.disconnect = observeLazyMount(
        self._rootRef,
        () => {
          this.state.isVisible = true;
          this.update();
          this.state.mountHeavyContent();
        },
        this.props.lazyThreshold ?? 0.1,
        this.props.lazyRootMargin ?? "200px"
      );
    }
  }

  onUpdate() {
    const self = this;

    self._latestNext.fn = self.state.next;
    (function (__prev, __next) {
      const __hasChange = __prev.find((val, index) => val !== __next[index]);
      if (__hasChange !== undefined) {
        if (self.state.wrapping) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              self.state.wrapping = false;
            });
          });
        }
        self.updateDeps[1] = __next;
      }
    })(self.updateDeps[1], [self.state.wrapping]);

    (function (__prev, __next) {
      const __hasChange = __prev.find((val, index) => val !== __next[index]);
      if (__hasChange !== undefined) {
        if (self.state.isVisible && self._canvasRef) {
          self.state.plugin.start(
            self._canvasRef,
            self.state.backgroundClass as BackgroundEffectName,
            self._bgEffectContext
          );
        }
        self.updateDeps[2] = __next;
      }
    })(self.updateDeps[2], [self.state.backgroundClass, self._canvasRef]);
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
      .querySelectorAll("[data-el='div-sliding-banner-1']")
      .forEach((el) => {
        el.className = `cv-sliding-banner ${
          this.state.showSkeleton ? "cv-image-shimmer" : ""
        } ${this.props.className || ""} effect-${
          this.state.animationClass
        } bg-effect-${this.state.backgroundClass} quality-${
          this.state.qualityClass
        }`;
        el.removeEventListener(
          "mouseenter",
          this.onDivSlidingBanner1Mouseenter
        );
        el.addEventListener("mouseenter", this.onDivSlidingBanner1Mouseenter);
        el.removeEventListener(
          "mouseleave",
          this.onDivSlidingBanner1Mouseleave
        );
        el.addEventListener("mouseleave", this.onDivSlidingBanner1Mouseleave);
        Object.assign(el.style, {
          height: this.props.config?.height || "",
          minHeight:
            this.props.config?.height === "auto"
              ? "auto"
              : this.props.config?.minHeight || "",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-sliding-banner']")
      .forEach((el) => {
        const whenCondition = this.state.backgroundClass !== "none";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-sliding-banner-2']")
      .forEach((el) => {
        const whenCondition =
          this.props.config?.height === "auto" &&
          this.props.items?.[0]?.media?.url;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='img-sliding-banner-1']")
      .forEach((el) => {
        el.setAttribute("src", this.props.items[0].media.url);
        Object.assign(el.style, {
          width: "100%",
          height: "auto",
          display: "block",
          visibility: "hidden",
          pointerEvents: "none",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-sliding-banner-2']")
      .forEach((el) => {
        el.className = `cv-sliding-banner-track dir-${this.state.direction} ${
          this.state.wrapping ? "no-transition" : ""
        }`;
        Object.assign(el.style, {
          transform: `translateX(-${this.state.currentIndex * 100}%)`,
          position:
            this.props.config?.height === "auto" ? "absolute" : "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        });
      });

    this._root
      .querySelectorAll("[data-el='for-sliding-banner']")
      .forEach((el) => {
        let array = this.props.items;
        this.renderLoop(el, array, "item", "index");
      });

    this._root
      .querySelectorAll("[data-el='div-sliding-banner-3']")
      .forEach((el) => {
        const index = this.getScope(el, "index");
        const item = this.getScope(el, "item");
        el.className = `cv-sliding-slide ${
          index === this.state.currentIndex ? "active" : ""
        } ${
          index === this.state.previousIndex &&
          index !== this.state.currentIndex
            ? "previous"
            : ""
        }`;
        el.key = item.id || index;
      });

    this._root
      .querySelectorAll("[data-el='show-sliding-banner-3']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        const whenCondition =
          this.state.shouldMount && item.media?.type === "video";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='video-sliding-banner-1']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        el.setAttribute("src", item.media?.url);
        el.setAttribute("autoPlay", true);
        el.setAttribute("loop", true);
        el.setAttribute("muted", true);
        el.setAttribute("playsInline", true);
        el.className = `cv-sliding-bg-video ${
          this.state.showSkeleton ? "cv-image-shimmer" : ""
        }`;
        Object.assign(el.style, {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-sliding-banner-4']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        const whenCondition =
          this.state.shouldMount && item.media?.type !== "video";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-sliding-banner-4']")
      .forEach((el) => {
        el.className = `cv-sliding-bg ${
          this.state.showSkeleton ? "cv-image-shimmer" : ""
        }`;
        const item = this.getScope(el, "item");
        Object.assign(el.style, {
          backgroundImage: item.media?.url ? `url(${item.media.url})` : "none",
          backgroundPosition: this.props.config?.bgPosition || "center",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-sliding-banner-5']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        const whenCondition =
          this.state.animationClass === "curtain" &&
          item.media?.type !== "video";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-sliding-banner-5']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        Object.assign(el.style, {
          backgroundImage: item.media?.url ? `url(${item.media.url})` : "none",
          backgroundPosition: this.props.config?.bgPosition || "center",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-sliding-banner-6']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        Object.assign(el.style, {
          backgroundImage: item.media?.url ? `url(${item.media.url})` : "none",
          backgroundPosition: this.props.config?.bgPosition || "center",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-sliding-banner-6']")
      .forEach((el) => {
        const whenCondition = this.state.animationClass === "cube";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-sliding-banner-7']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        Object.assign(el.style, {
          textAlign: item.textAlignment || this.props.config?.align || "center",
          display: "flex",
          flexDirection: "column",
          alignItems:
            (item.textAlignment || this.props.config?.align || "center") ===
            "center"
              ? "center"
              : (item.textAlignment || this.props.config?.align || "center") ===
                "right"
              ? "flex-end"
              : "flex-start",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-sliding-banner-7']")
      .forEach((el) => {
        const whenCondition = this.state.showSkeleton;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-sliding-banner-8']")
      .forEach((el) => {
        Object.assign(el.style, {
          width: "50%",
          height: "32px",
          marginBottom: "16px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-sliding-banner-9']")
      .forEach((el) => {
        Object.assign(el.style, {
          width: "70%",
          height: "16px",
          marginBottom: "10px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-sliding-banner-10']")
      .forEach((el) => {
        Object.assign(el.style, {
          width: "40%",
          height: "16px",
          marginBottom: "24px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-sliding-banner-11']")
      .forEach((el) => {
        Object.assign(el.style, {
          width: "130px",
          height: "40px",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-sliding-banner-8']")
      .forEach((el) => {
        const whenCondition = !this.state.showSkeleton;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-sliding-banner-12']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        this.renderTextNode(el, item.title);
      });

    this._root
      .querySelectorAll("[data-el='show-sliding-banner-9']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        const whenCondition = item.subtitle;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-sliding-banner-13']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        this.renderTextNode(el, item.subtitle);
      });

    this._root
      .querySelectorAll("[data-el='show-sliding-banner-10']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        const whenCondition = item.ctaText;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='a-sliding-banner-1']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        el.setAttribute("href", item.mapLinks?.[0]?.url || undefined);
      });

    this._root
      .querySelectorAll("[data-el='div-sliding-banner-14']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        this.renderTextNode(el, item.ctaText);
      });

    this._root
      .querySelectorAll("[data-el='show-sliding-banner-11']")
      .forEach((el) => {
        const whenCondition =
          (this.props.config?.showArrows || this.props.config?.showNextPrev) &&
          (!this.props.config?.hideArrowsIfNoScroll ||
            (this.props.items && this.props.items.length > 1));
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-sliding-banner-1']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonSlidingBanner1Click);
        el.addEventListener("click", this.onButtonSlidingBanner1Click);
      });

    this._root
      .querySelectorAll("[data-el='button-sliding-banner-2']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonSlidingBanner2Click);
        el.addEventListener("click", this.onButtonSlidingBanner2Click);
      });

    this._root
      .querySelectorAll("[data-el='show-sliding-banner-12']")
      .forEach((el) => {
        const whenCondition = this.props.config?.showDots;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='for-sliding-banner-2']")
      .forEach((el) => {
        let array = this.props.items;
        this.renderLoop(el, array, "_", "index");
      });

    this._root
      .querySelectorAll("[data-el='button-sliding-banner-3']")
      .forEach((el) => {
        const index = this.getScope(el, "index");
        el.key = index;
        el.className = `cv-sliding-dot ${
          index === this.state.currentIndex ? "active" : ""
        }`;
        el.setAttribute("aria-label", `Go to slide ${index + 1}`);
        el.removeEventListener("click", this.onButtonSlidingBanner3Click);
        el.addEventListener("click", this.onButtonSlidingBanner3Click);
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

customElements.define("sliding-banner", SlidingBanner);
