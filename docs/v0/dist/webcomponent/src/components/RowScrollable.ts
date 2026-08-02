export interface RowScrollableItem {
  id: string;
  title?: string;
  subtitle?: string;
  media?: {
    type: "image" | "video";
    url: string;
  };
  mapLinks?: {
    url: string;
  }[];
}
export interface RowScrollableConfig {
  showArrows?: boolean;
  hideArrowsIfNoScroll?: boolean;
  hideScrollbar?: boolean;
}
export interface RowScrollableProps {
  items: RowScrollableItem[];
  title?: string;
  className?: string;
  config?: RowScrollableConfig;
  isLoading?: boolean;
  lazyLoad?: boolean;
  lazyThreshold?: number;
  lazyRootMargin?: string;
}

import { observeLazyMount } from "../utils/lazyObserver";

/**
 * Usage:
 *
 *  <row-scrollable></row-scrollable>
 *
 */
class RowScrollable extends HTMLElement {
  get _containerRef() {
    return this._root.querySelector("[data-ref='RowScrollable-containerRef']");
  }

  get _rowRef() {
    return this._root.querySelector("[data-ref='RowScrollable-rowRef']");
  }

  get _root() {
    return this.shadowRoot || this;
  }

  constructor() {
    super();
    const self = this;

    this.state = {
      canScrollLeft: false,
      canScrollRight: false,
      isVisible: false,
      get shouldMount() {
        return self.props.lazyLoad === false || self.state.isVisible;
      },
      get showSkeleton() {
        return !!self.props.isLoading || !self.state.shouldMount;
      },
      checkScroll() {
        const el = self._rowRef;
        if (el) {
          self.state.canScrollLeft = el.scrollLeft > 5;
          self.update();
          self.state.canScrollRight =
            el.scrollLeft + el.clientWidth < el.scrollWidth - 5;
          self.update();
        }
      },
      scroll(direction: "left" | "right") {
        const el = self._rowRef;
        if (el) {
          const scrollAmount = 300;
          el.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
          });
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
      "className",
      "title",
      "config",
      "items",
    ];

    // used to keep track of all nodes created by show/for
    this.nodesToDestroy = [];
    // batch updates
    this.pendingUpdate = false;

    // Event handler for 'click' event on button-row-scrollable-1
    this.onButtonRowScrollable1Click = (event) => {
      this.state.scroll("left");
    };

    // Event handler for 'click' event on button-row-scrollable-2
    this.onButtonRowScrollable2Click = (event) => {
      this.state.scroll("right");
    };

    this._observerBox = {
      disconnect: null,
      row: null,
    };

    if (undefined) {
      this.attachShadow({ mode: "open" });
    }
  }

  disconnectedCallback() {
    // onUnMount
    const el = self._rowRef;
    if (el) {
      el.removeEventListener("scroll", this.state.checkScroll);
    }
    // Guarded: Svelte 5 runs onDestroy during *server* teardown too, so an
    // unguarded window access here throws `window is not defined` and 500s any
    // SSR page that renders this component — it never reaches the listener it
    // was trying to remove, because onMount never added one.
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.state.checkScroll);
    }
    if (self._observerBox.disconnect) self._observerBox.disconnect();
    if (self._observerBox.row) {
      self._observerBox.row.disconnect();
      self._observerBox.row = null;
    }
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
      <div data-el="div-row-scrollable-1" data-ref="RowScrollable-containerRef">
        <template data-el="show-row-scrollable">
          <h3 class="cv-scrollable-title">
            <template data-el="div-row-scrollable-2"><!-- props.title --></template>
          </h3>
        </template>
        <div class="cv-scrollable-wrapper" data-el="div-row-scrollable-3">
          <div data-el="div-row-scrollable-4" data-ref="RowScrollable-rowRef">
            <template data-el="for-row-scrollable">
              <a data-el="a-row-scrollable-1">
                <template data-el="show-row-scrollable-2">
                  <template data-el="show-row-scrollable-3">
                    <div class="cv-scrollable-img-wrap">
                      <template data-el="show-row-scrollable-4">
                        <video
                          class="cv-scrollable-img"
                          data-el="video-row-scrollable-1"
                        ></video>
                      </template>
                      <template data-el="show-row-scrollable-5">
                        <img
                          class="cv-scrollable-img"
                          data-el="img-row-scrollable-1"
                        />
                      </template>
                    </div>
                  </template>
                  <div class="cv-scrollable-body">
                    <template data-el="show-row-scrollable-6">
                      <div class="cv-scrollable-card-title">
                        <template data-el="div-row-scrollable-5">
                          <!-- item.title -->
                        </template>
                      </div>
                    </template>
                    <template data-el="show-row-scrollable-7">
                      <div class="cv-scrollable-card-sub">
                        <template data-el="div-row-scrollable-6">
                          <!-- item.subtitle -->
                        </template>
                      </div>
                    </template>
                  </div>
                </template>
              </a>
            </template>
          </div>
          <template data-el="show-row-scrollable-8">
            <template data-el="show-row-scrollable-9">
              <button
                type="button"
                class="cv-scrollable-arrow prev"
                aria-label="Previous"
                data-el="button-row-scrollable-1"
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
            </template>
            <template data-el="show-row-scrollable-10">
              <button
                type="button"
                class="cv-scrollable-arrow next"
                aria-label="Next"
                data-el="button-row-scrollable-2"
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
          </template>
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
    const el = self._rowRef;
    if (el) {
      el.addEventListener("scroll", this.state.checkScroll);
      // Allow DOM to render then check
      setTimeout(() => {
        this.state.checkScroll();
      }, 150);
      if (typeof ResizeObserver !== "undefined") {
        self._observerBox.row = new ResizeObserver(() =>
          this.state.checkScroll()
        );
        self._observerBox.row.observe(el);
      }
    }
    window.addEventListener("resize", this.state.checkScroll);
    if (this.props.lazyLoad === false) {
      this.state.isVisible = true;
      this.update();
      return;
    }
    if (self._containerRef) {
      self._observerBox.disconnect = observeLazyMount(
        self._containerRef,
        () => {
          this.state.isVisible = true;
          this.update();
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
      .querySelectorAll("[data-el='div-row-scrollable-1']")
      .forEach((el) => {
        el.className = `cv-scrollable-container ${this.props.className || ""}`;
      });

    this._root
      .querySelectorAll("[data-el='show-row-scrollable']")
      .forEach((el) => {
        const whenCondition = this.props.title;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-row-scrollable-2']")
      .forEach((el) => {
        this.renderTextNode(el, this.props.title);
      });

    this._root
      .querySelectorAll("[data-el='div-row-scrollable-3']")
      .forEach((el) => {
        __cvAssignStyle(el.style, {
          position: "relative",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-row-scrollable-4']")
      .forEach((el) => {
        el.className = `cv-scrollable-row ${
          this.props.config?.hideScrollbar ? "cv-scrollable-hide-scrollbar" : ""
        }`;
      });

    this._root
      .querySelectorAll("[data-el='for-row-scrollable']")
      .forEach((el) => {
        let array = this.props.items;
        this.renderLoop(el, array, "item");
      });

    this._root
      .querySelectorAll("[data-el='a-row-scrollable-1']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        el.setAttribute("href", item.mapLinks?.[0]?.url || undefined);
        el.className = `cv-scrollable-card ${
          this.state.showSkeleton ? "cv-image-shimmer" : ""
        }`;
        el.key = item.id;
      });

    this._root
      .querySelectorAll("[data-el='show-row-scrollable-2']")
      .forEach((el) => {
        const whenCondition = !this.state.showSkeleton;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-row-scrollable-3']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        const whenCondition = item.media?.url;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-row-scrollable-4']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        const whenCondition = item.media?.type === "video";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='video-row-scrollable-1']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        el.setAttribute("src", item.media?.url);
        el.setAttribute("autoPlay", true);
        el.setAttribute("loop", true);
        el.setAttribute("muted", true);
        el.setAttribute("playsInline", true);
      });

    this._root
      .querySelectorAll("[data-el='show-row-scrollable-5']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        const whenCondition = item.media?.type !== "video";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='img-row-scrollable-1']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        el.setAttribute("src", item.media?.url);
        el.setAttribute("alt", item.title || "");
      });

    this._root
      .querySelectorAll("[data-el='show-row-scrollable-6']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        const whenCondition = item.title;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-row-scrollable-5']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        this.renderTextNode(el, item.title);
      });

    this._root
      .querySelectorAll("[data-el='show-row-scrollable-7']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        const whenCondition = item.subtitle;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-row-scrollable-6']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        this.renderTextNode(el, item.subtitle);
      });

    this._root
      .querySelectorAll("[data-el='show-row-scrollable-8']")
      .forEach((el) => {
        const whenCondition = this.props.config?.showArrows !== false;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-row-scrollable-9']")
      .forEach((el) => {
        const whenCondition =
          this.props.config?.hideArrowsIfNoScroll === false ||
          this.state.canScrollLeft;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-row-scrollable-1']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonRowScrollable1Click);
        el.addEventListener("click", this.onButtonRowScrollable1Click);
        __cvAssignStyle(el.style, {
          opacity: !this.state.canScrollLeft ? "0.35" : "1",
          pointerEvents: !this.state.canScrollLeft ? "none" : "auto",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-row-scrollable-10']")
      .forEach((el) => {
        const whenCondition =
          this.props.config?.hideArrowsIfNoScroll === false ||
          this.state.canScrollRight;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='button-row-scrollable-2']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonRowScrollable2Click);
        el.addEventListener("click", this.onButtonRowScrollable2Click);
        __cvAssignStyle(el.style, {
          opacity: !this.state.canScrollRight ? "0.35" : "1",
          pointerEvents: !this.state.canScrollRight ? "none" : "auto",
        });
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

customElements.define("row-scrollable", RowScrollable);


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
