export interface BannerMedia {
  type?: string;
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
export interface AlternatingConfig {
  columns: number;
  autoStart: boolean;
  delayMs: number;
  showArrows: boolean;
  showDots: boolean;
  hideArrowsIfNoScroll?: boolean;
  height?: string;
  minHeight?: string;
  bgPosition?: string;
}
export interface AlternatingSliderProps {
  items: WidgetItem[];
  config?: AlternatingConfig;
  className?: string;
  isLoading?: boolean;
  lazyLoad?: boolean;
  lazyThreshold?: number;
  lazyRootMargin?: string;
}

import { observeLazyMount } from "../utils/lazyObserver";

/**
 * Usage:
 *
 *  <alternating-slider></alternating-slider>
 *
 */
class AlternatingSlider extends HTMLElement {
  get _rootRef() {
    return this._root.querySelector("[data-ref='AlternatingSlider-rootRef']");
  }

  get _root() {
    return this.shadowRoot || this;
  }

  constructor() {
    super();
    const self = this;

    this.state = {
      currentIndex: 0,
      intervalId: null,
      isVisible: false,
      get shouldMount() {
        return self.props.lazyLoad === false || self.state.isVisible;
      },
      get showSkeleton() {
        return !!self.props.isLoading || !self.state.shouldMount;
      },
      get columns() {
        return self.props.config?.columns || 2;
      },
      get slideSets() {
        const sets: WidgetItem[][] = [];
        const currentItems = self.props.items || [];
        const cols = self.state.columns;
        for (let i = 0; i < currentItems.length; i += cols) {
          sets.push(currentItems.slice(i, i + cols));
        }
        return sets;
      },
      get totalSlides() {
        return self.state.slideSets.length;
      },
      next() {
        if (self.state.totalSlides <= 1) return;
        self.state.currentIndex =
          (self.state.currentIndex + 1) % self.state.totalSlides;
        self.update();
      },
      prev() {
        if (self.state.totalSlides <= 1) return;
        self.state.currentIndex =
          (self.state.currentIndex - 1 + self.state.totalSlides) %
          self.state.totalSlides;
        self.update();
      },
      goTo(index: number) {
        self.state.currentIndex = index;
        self.update();
      },
      startAutoPlay() {
        if (
          self.props.config?.autoStart !== false &&
          self.state.totalSlides > 1
        ) {
          self.state.intervalId = setInterval(() => {
            self.state.next();
          }, self.props.config?.delayMs || 5000);
          self.update();
        }
      },
      stopAutoPlay() {
        if (self.state.intervalId) {
          clearInterval(self.state.intervalId);
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

    // used to keep track of all nodes created by show/for
    this.nodesToDestroy = [];
    // batch updates
    this.pendingUpdate = false;

    // Event handler for 'mouseenter' event on div-alternating-slider-1
    this.onDivAlternatingSlider1Mouseenter = (event) => {
      this.state.stopAutoPlay();
    };

    // Event handler for 'mouseleave' event on div-alternating-slider-1
    this.onDivAlternatingSlider1Mouseleave = (event) => {
      this.state.startAutoPlay();
    };

    // Event handler for 'click' event on button-alternating-slider-1
    this.onButtonAlternatingSlider1Click = (event) => {
      this.state.prev();
    };

    // Event handler for 'click' event on button-alternating-slider-2
    this.onButtonAlternatingSlider2Click = (event) => {
      this.state.next();
    };

    // Event handler for 'click' event on button-alternating-slider-3
    this.onButtonAlternatingSlider3Click = (event) => {
      const index = this.getScope(event.currentTarget, "index");
      this.state.goTo(index);
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
    this.state.stopAutoPlay();
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
        role="region"
        data-el="div-alternating-slider-1"
        data-ref="AlternatingSlider-rootRef"
      >
        <template data-el="show-alternating-slider">
          <img alt="" data-el="img-alternating-slider-1" />
        </template>
        <div class="cv-alt-cols-container" data-el="div-alternating-slider-2">
          <template data-el="for-alternating-slider">
            <div class="cv-alt-col" data-el="div-alternating-slider-3">
              <div class="cv-alt-track" data-el="div-alternating-slider-4">
                <template data-el="for-alternating-slider-2">
                  <div class="cv-alt-cell" data-el="div-alternating-slider-5">
                    <template data-el="show-alternating-slider-2">
                      <template data-el="show-alternating-slider-3">
                        <a
                          class="cv-alt-content-wrap"
                          data-el="a-alternating-slider-1"
                        >
                          <template data-el="show-alternating-slider-4">
                            <video data-el="video-alternating-slider-1"></video>
                          </template>
                          <template data-el="show-alternating-slider-5">
                            <div data-el="div-alternating-slider-6"></div>
                          </template>
                          <div class="cv-alt-overlay"></div>
                          <div
                            class="cv-alt-content"
                            data-el="div-alternating-slider-7"
                          >
                            <template data-el="show-alternating-slider-6">
                              <div
                                class="cv-skeleton-title cv-image-shimmer"
                                data-el="div-alternating-slider-8"
                              ></div>
                              <div
                                class="cv-skeleton-text cv-image-shimmer"
                                data-el="div-alternating-slider-9"
                              ></div>
                              <div
                                class="cv-skeleton-text cv-image-shimmer"
                                data-el="div-alternating-slider-10"
                              ></div>
                              <div
                                class="cv-skeleton-button cv-image-shimmer"
                                data-el="div-alternating-slider-11"
                              ></div>
                            </template>
                            <template data-el="show-alternating-slider-7">
                              <h2 class="cv-alt-title">
                                <template data-el="div-alternating-slider-12">
                                  <!-- slideRow[colIndex].title -->
                                </template>
                              </h2>
                              <template data-el="show-alternating-slider-8">
                                <p class="cv-alt-subtitle">
                                  <template data-el="div-alternating-slider-13">
                                    <!-- slideRow[colIndex].subtitle -->
                                  </template>
                                </p>
                              </template>
                              <template data-el="show-alternating-slider-9">
                                <span class="cv-alt-cta">
                                  <template data-el="div-alternating-slider-14">
                                    <!-- slideRow[colIndex].ctaText -->
                                  </template>
                                </span>
                              </template>
                            </template>
                          </div>
                        </a>
                      </template>
                      <template data-el="show-alternating-slider-10">
                        <div class="cv-alt-content-wrap">
                          <template data-el="show-alternating-slider-11">
                            <video data-el="video-alternating-slider-2"></video>
                          </template>
                          <template data-el="show-alternating-slider-12">
                            <div data-el="div-alternating-slider-15"></div>
                          </template>
                          <div class="cv-alt-overlay"></div>
                          <div
                            class="cv-alt-content"
                            data-el="div-alternating-slider-16"
                          >
                            <template data-el="show-alternating-slider-13">
                              <div
                                class="cv-skeleton-title cv-image-shimmer"
                                data-el="div-alternating-slider-17"
                              ></div>
                              <div
                                class="cv-skeleton-text cv-image-shimmer"
                                data-el="div-alternating-slider-18"
                              ></div>
                              <div
                                class="cv-skeleton-text cv-image-shimmer"
                                data-el="div-alternating-slider-19"
                              ></div>
                              <div
                                class="cv-skeleton-button cv-image-shimmer"
                                data-el="div-alternating-slider-20"
                              ></div>
                            </template>
                            <template data-el="show-alternating-slider-14">
                              <h2 class="cv-alt-title">
                                <template data-el="div-alternating-slider-21">
                                  <!-- slideRow[colIndex].title -->
                                </template>
                              </h2>
                              <template data-el="show-alternating-slider-15">
                                <p class="cv-alt-subtitle">
                                  <template data-el="div-alternating-slider-22">
                                    <!-- slideRow[colIndex].subtitle -->
                                  </template>
                                </p>
                              </template>
                              <template data-el="show-alternating-slider-16">
                                <span class="cv-alt-cta">
                                  <template data-el="div-alternating-slider-23">
                                    <!-- slideRow[colIndex].ctaText -->
                                  </template>
                                </span>
                              </template>
                            </template>
                          </div>
                        </div>
                      </template>
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
        <template data-el="show-alternating-slider-17">
          <button
            type="button"
            class="cv-alt-arrow prev"
            aria-label="Previous"
            data-el="button-alternating-slider-1"
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
            class="cv-alt-arrow next"
            aria-label="Next"
            data-el="button-alternating-slider-2"
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
        <template data-el="show-alternating-slider-18">
          <div class="cv-alt-dots">
            <template data-el="for-alternating-slider-3">
              <button type="button" data-el="button-alternating-slider-3"></button>
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
      this.state.startAutoPlay();
      return;
    }
    if (self._rootRef) {
      self._observerBox.disconnect = observeLazyMount(
        self._rootRef,
        () => {
          this.state.isVisible = true;
          this.update();
          this.state.startAutoPlay();
        },
        this.props.lazyThreshold ?? 0.1,
        this.props.lazyRootMargin ?? "200px"
      );
    }
  }

  onUpdate() {}

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
      .querySelectorAll("[data-el='div-alternating-slider-1']")
      .forEach((el) => {
        el.className = `cv-alt-slider ${
          this.state.showSkeleton ? "cv-image-shimmer" : ""
        } ${this.props.className || ""}`;
        el.removeEventListener(
          "mouseenter",
          this.onDivAlternatingSlider1Mouseenter
        );
        el.addEventListener(
          "mouseenter",
          this.onDivAlternatingSlider1Mouseenter
        );
        el.removeEventListener(
          "mouseleave",
          this.onDivAlternatingSlider1Mouseleave
        );
        el.addEventListener(
          "mouseleave",
          this.onDivAlternatingSlider1Mouseleave
        );
        __cvAssignStyle(el.style, {
          height: this.props.config?.height || "",
          minHeight:
            this.props.config?.height === "auto"
              ? "auto"
              : this.props.config?.minHeight || "",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider']")
      .forEach((el) => {
        const whenCondition =
          this.props.config?.height === "auto" &&
          this.props.items?.[0]?.media?.url;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='img-alternating-slider-1']")
      .forEach((el) => {
        el.setAttribute("src", this.props.items[0].media.url);
        __cvAssignStyle(el.style, {
          width: "100%",
          height: "auto",
          display: "block",
          visibility: "hidden",
          pointerEvents: "none",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-2']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          gridTemplateColumns: `repeat(${this.state.columns}, 1fr)`,
          position:
            this.props.config?.height === "auto" ? "absolute" : "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        });
      });

    this._root
      .querySelectorAll("[data-el='for-alternating-slider']")
      .forEach((el) => {
        let array = Array.from({
          length: this.state.columns,
        });
        this.renderLoop(el, array, "_", "colIndex");
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-3']")
      .forEach((el) => {
        el.key = `col-${colIndex}`;
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-4']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          transform: `translateY(${
            colIndex % 2 === 0
              ? -this.state.currentIndex * 100
              : this.state.currentIndex * 100
          }%)`,
        });
      });

    this._root
      .querySelectorAll("[data-el='for-alternating-slider-2']")
      .forEach((el) => {
        let array = this.state.slideSets;
        this.renderLoop(el, array, "slideRow", "slideIndex");
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-5']")
      .forEach((el) => {
        el.key = `cell-${slideIndex}-${colIndex}`;
        const slideIndex = this.getScope(el, "slideIndex");
        __cvAssignStyle(el.style, {
          top: `${colIndex % 2 === 0 ? slideIndex * 100 : -slideIndex * 100}%`,
        });
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-2']")
      .forEach((el) => {
        const whenCondition = slideRow[colIndex];
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-3']")
      .forEach((el) => {
        const whenCondition = slideRow[colIndex].mapLinks?.[0]?.url;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='a-alternating-slider-1']")
      .forEach((el) => {
        el.setAttribute("href", slideRow[colIndex].mapLinks[0].url);
        __cvAssignStyle(el.style, {
          display: "block",
          textDecoration: "none",
          color: "inherit",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-4']")
      .forEach((el) => {
        const whenCondition =
          this.state.shouldMount && slideRow[colIndex].media?.type === "video";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='video-alternating-slider-1']")
      .forEach((el) => {
        el.setAttribute("src", slideRow[colIndex].media?.url);
        el.setAttribute("autoPlay", true);
        el.setAttribute("loop", true);
        el.setAttribute("muted", true);
        el.setAttribute("playsInline", true);
        el.className = `cv-alt-bg-video ${
          this.state.showSkeleton ? "cv-image-shimmer" : ""
        }`;
        __cvAssignStyle(el.style, {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-5']")
      .forEach((el) => {
        const whenCondition =
          this.state.shouldMount && slideRow[colIndex].media?.type !== "video";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-6']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          backgroundImage: slideRow[colIndex].media?.url
            ? `url(${slideRow[colIndex].media.url})`
            : "none",
          backgroundPosition: this.props.config?.bgPosition || "center",
        });
        el.className = `cv-alt-bg ${
          this.state.showSkeleton ? "cv-image-shimmer" : ""
        }`;
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-7']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          textAlign: slideRow[colIndex].textAlignment || "left",
          display: "flex",
          flexDirection: "column",
          alignItems:
            (slideRow[colIndex].textAlignment || "left") === "center"
              ? "center"
              : (slideRow[colIndex].textAlignment || "left") === "right"
              ? "flex-end"
              : "flex-start",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-6']")
      .forEach((el) => {
        const whenCondition = this.state.showSkeleton;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-8']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          width: "60%",
          height: "24px",
          marginBottom: "12px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-9']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          width: "80%",
          height: "14px",
          marginBottom: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-10']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          width: "50%",
          height: "14px",
          marginBottom: "16px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-11']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          width: "110px",
          height: "36px",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-7']")
      .forEach((el) => {
        const whenCondition = !this.state.showSkeleton;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-12']")
      .forEach((el) => {
        this.renderTextNode(el, slideRow[colIndex].title);
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-8']")
      .forEach((el) => {
        const whenCondition = slideRow[colIndex].subtitle;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-13']")
      .forEach((el) => {
        this.renderTextNode(el, slideRow[colIndex].subtitle);
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-9']")
      .forEach((el) => {
        const whenCondition = slideRow[colIndex].ctaText;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-14']")
      .forEach((el) => {
        this.renderTextNode(el, slideRow[colIndex].ctaText);
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-10']")
      .forEach((el) => {
        const whenCondition = !slideRow[colIndex].mapLinks?.[0]?.url;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-11']")
      .forEach((el) => {
        const whenCondition =
          this.state.shouldMount && slideRow[colIndex].media?.type === "video";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='video-alternating-slider-2']")
      .forEach((el) => {
        el.setAttribute("src", slideRow[colIndex].media?.url);
        el.setAttribute("autoPlay", true);
        el.setAttribute("loop", true);
        el.setAttribute("muted", true);
        el.setAttribute("playsInline", true);
        el.className = `cv-alt-bg-video ${
          this.state.showSkeleton ? "cv-image-shimmer" : ""
        }`;
        __cvAssignStyle(el.style, {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-12']")
      .forEach((el) => {
        const whenCondition =
          this.state.shouldMount && slideRow[colIndex].media?.type !== "video";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-15']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          backgroundImage: slideRow[colIndex].media?.url
            ? `url(${slideRow[colIndex].media.url})`
            : "none",
          backgroundPosition: this.props.config?.bgPosition || "center",
        });
        el.className = `cv-alt-bg ${
          this.state.showSkeleton ? "cv-image-shimmer" : ""
        }`;
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-16']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          textAlign: slideRow[colIndex].textAlignment || "left",
          display: "flex",
          flexDirection: "column",
          alignItems:
            (slideRow[colIndex].textAlignment || "left") === "center"
              ? "center"
              : (slideRow[colIndex].textAlignment || "left") === "right"
              ? "flex-end"
              : "flex-start",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-13']")
      .forEach((el) => {
        const whenCondition = this.state.showSkeleton;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-17']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          width: "60%",
          height: "24px",
          marginBottom: "12px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-18']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          width: "80%",
          height: "14px",
          marginBottom: "8px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-19']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          width: "50%",
          height: "14px",
          marginBottom: "16px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-20']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          width: "110px",
          height: "36px",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-14']")
      .forEach((el) => {
        const whenCondition = !this.state.showSkeleton;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-21']")
      .forEach((el) => {
        this.renderTextNode(el, slideRow[colIndex].title);
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-15']")
      .forEach((el) => {
        const whenCondition = slideRow[colIndex].subtitle;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-22']")
      .forEach((el) => {
        this.renderTextNode(el, slideRow[colIndex].subtitle);
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-16']")
      .forEach((el) => {
        const whenCondition = slideRow[colIndex].ctaText;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-alternating-slider-23']")
      .forEach((el) => {
        this.renderTextNode(el, slideRow[colIndex].ctaText);
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-17']")
      .forEach((el) => {
        const whenCondition =
          this.props.config?.showArrows &&
          (!this.props.config?.hideArrowsIfNoScroll ||
            this.state.slideSets.length > 1);
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-alternating-slider-1']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonAlternatingSlider1Click);
        el.addEventListener("click", this.onButtonAlternatingSlider1Click);
      });

    this._root
      .querySelectorAll("[data-el='button-alternating-slider-2']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonAlternatingSlider2Click);
        el.addEventListener("click", this.onButtonAlternatingSlider2Click);
      });

    this._root
      .querySelectorAll("[data-el='show-alternating-slider-18']")
      .forEach((el) => {
        const whenCondition = this.props.config?.showDots;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='for-alternating-slider-3']")
      .forEach((el) => {
        let array = this.state.slideSets;
        this.renderLoop(el, array, "_", "index");
      });

    this._root
      .querySelectorAll("[data-el='button-alternating-slider-3']")
      .forEach((el) => {
        el.key = `dot-${index}`;
        el.className = `cv-alt-dot ${
          index === this.state.currentIndex ? "active" : ""
        }`;
        el.setAttribute("aria-label", `Go to slide ${index + 1}`);
        el.removeEventListener("click", this.onButtonAlternatingSlider3Click);
        el.addEventListener("click", this.onButtonAlternatingSlider3Click);
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

customElements.define("alternating-slider", AlternatingSlider);


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
