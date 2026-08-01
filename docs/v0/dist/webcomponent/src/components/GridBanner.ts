export interface BannerMedia {
  type?: "image" | "video" | string;
  url?: string;
  settings?: any;
}
export interface MapLink {
  label?: string;
  url?: string;
}
export interface GridBannerItem {
  id?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  textAlignment?: "left" | "center" | "right";
  media?: BannerMedia;
  mapLinks?: MapLink[];
}
export interface GridBannerConfig {
  height?: string;
  minHeight?: string;
  bgPosition?: string;
}
export interface GridBannerProps {
  items: GridBannerItem[];
  columns?: number;
  className?: string;
  isLoading?: boolean;
  config?: GridBannerConfig;
  lazyLoad?: boolean;
  lazyThreshold?: number;
  lazyRootMargin?: string;
}

import { observeLazyMount } from "../utils/lazyObserver";

/**
 * Usage:
 *
 *  <grid-banner></grid-banner>
 *
 */
class GridBanner extends HTMLElement {
  get _rootRef() {
    return this._root.querySelector("[data-ref='GridBanner-rootRef']");
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
      get gridTemplateColumns() {
        const cols = self.props.columns || 3;
        return `repeat(${cols}, 1fr)`;
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
      "columns",
      "className",
      "config",
      "items",
    ];

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
      <div data-el="div-grid-banner-1" data-ref="GridBanner-rootRef">
        <template data-el="for-grid-banner">
          <a class="cv-grid-item" data-el="a-grid-banner-1">
            <div data-el="div-grid-banner-2">
              <template data-el="show-grid-banner">
                <template data-el="show-grid-banner-2">
                  <video class="cv-grid-img" data-el="video-grid-banner-1"></video>
                </template>
                <template data-el="show-grid-banner-3">
                  <img class="cv-grid-img" data-el="img-grid-banner-1" />
                </template>
              </template>
            </div>
            <template data-el="show-grid-banner-4">
              <div data-el="div-grid-banner-3">
                <div
                  class="cv-skeleton-text cv-image-shimmer"
                  data-el="div-grid-banner-4"
                ></div>
                <div
                  class="cv-skeleton-text cv-image-shimmer"
                  data-el="div-grid-banner-5"
                ></div>
              </div>
            </template>
            <template data-el="show-grid-banner-5">
              <div class="cv-grid-title" data-el="div-grid-banner-6">
                <template data-el="div-grid-banner-7"><!-- item.title --></template>
              </div>
            </template>
          </a>
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
      return;
    }
    if (self._rootRef) {
      self._observerBox.disconnect = observeLazyMount(
        self._rootRef,
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
      .querySelectorAll("[data-el='div-grid-banner-1']")
      .forEach((el) => {
        el.className = `cv-grid-banner ${this.props.className || ""}`;
        Object.assign(el.style, {
          gridTemplateColumns: this.state.gridTemplateColumns,
          height: this.props.config?.height || "",
          minHeight: this.props.config?.minHeight || "",
        });
      });

    this._root.querySelectorAll("[data-el='for-grid-banner']").forEach((el) => {
      let array = this.props.items;
      this.renderLoop(el, array, "item", "index");
    });

    this._root.querySelectorAll("[data-el='a-grid-banner-1']").forEach((el) => {
      const item = this.getScope(el, "item");
      const index = this.getScope(el, "index");
      el.setAttribute("href", item.mapLinks?.[0]?.url || undefined);
      el.key = item.id || index;
    });

    this._root
      .querySelectorAll("[data-el='div-grid-banner-2']")
      .forEach((el) => {
        el.className = `cv-grid-img-wrap ${
          this.state.showSkeleton ? "cv-image-shimmer" : ""
        }`;
        Object.assign(el.style, {
          height: this.props.config?.height || "",
          minHeight: this.props.config?.minHeight || "",
          aspectRatio: this.props.config?.height ? "unset" : "16/9",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-grid-banner']")
      .forEach((el) => {
        const whenCondition = !this.state.showSkeleton;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-grid-banner-2']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        const whenCondition = item.media?.type === "video";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='video-grid-banner-1']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        el.setAttribute("src", item.media?.url);
        el.setAttribute("autoPlay", true);
        el.setAttribute("loop", true);
        el.setAttribute("muted", true);
        el.setAttribute("playsInline", true);
        Object.assign(el.style, {
          objectFit: "cover",
          width: "100%",
          height: "100%",
          objectPosition: this.props.config?.bgPosition || "center",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-grid-banner-3']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        const whenCondition = item.media?.type !== "video";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='img-grid-banner-1']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        el.setAttribute("src", item.media?.url);
        el.setAttribute("alt", item.title);
        Object.assign(el.style, {
          objectFit: "cover",
          width: "100%",
          height: "100%",
          objectPosition: this.props.config?.bgPosition || "center",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-grid-banner-4']")
      .forEach((el) => {
        const whenCondition = this.state.showSkeleton;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-grid-banner-3']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        Object.assign(el.style, {
          display: "flex",
          flexDirection: "column",
          alignItems: item.textAlignment || "center",
          width: "100%",
          marginTop: "12px",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-grid-banner-4']")
      .forEach((el) => {
        Object.assign(el.style, {
          width: "70%",
          height: "14px",
          margin: "0 0 6px 0",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-grid-banner-5']")
      .forEach((el) => {
        Object.assign(el.style, {
          width: "40%",
          height: "10px",
          margin: 0,
        });
      });

    this._root
      .querySelectorAll("[data-el='show-grid-banner-5']")
      .forEach((el) => {
        const whenCondition = !this.state.showSkeleton;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-grid-banner-6']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        Object.assign(el.style, {
          textAlign: item.textAlignment || "center",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-grid-banner-7']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        this.renderTextNode(el, item.title);
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

customElements.define("grid-banner", GridBanner);
