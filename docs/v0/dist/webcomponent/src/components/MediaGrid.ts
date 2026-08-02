export interface MediaGridItem {
  id: string;
  media?: {
    type: "image" | "video";
    url: string;
  };
  mapLinks?: {
    url: string;
  }[];
  altText?: string;
  title?: string;
}
export interface MediaGridProps {
  primaryMedia: MediaGridItem;
  secondaryMedia?: MediaGridItem[];
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
 *  <media-grid></media-grid>
 *
 */
class MediaGrid extends HTMLElement {
  get _rootRef() {
    return this._root.querySelector("[data-ref='MediaGrid-rootRef']");
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
      "primaryMedia",
      "secondaryMedia",
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
      <div data-el="div-media-grid-1" data-ref="MediaGrid-rootRef">
        <template data-el="show-media-grid">
          <div class="cv-media-primary cv-image-shimmer"></div>
          <div class="cv-media-secondary-col">
            <div class="cv-media-secondary-item cv-image-shimmer"></div>
            <div class="cv-media-secondary-item cv-image-shimmer"></div>
          </div>
        </template>
        <template data-el="show-media-grid-2">
          <template data-el="show-media-grid-3">
            <a class="cv-media-primary" data-el="a-media-grid-1">
              <template data-el="show-media-grid-4">
                <video class="cv-media-asset" data-el="video-media-grid-1"></video>
              </template>
              <template data-el="show-media-grid-5">
                <img class="cv-media-asset" data-el="img-media-grid-1" />
              </template>
            </a>
          </template>
          <template data-el="show-media-grid-6">
            <div class="cv-media-secondary-col">
              <template data-el="for-media-grid">
                <a class="cv-media-secondary-item" data-el="a-media-grid-2">
                  <template data-el="show-media-grid-7">
                    <video
                      class="cv-media-asset"
                      data-el="video-media-grid-2"
                    ></video>
                  </template>
                  <template data-el="show-media-grid-8">
                    <img class="cv-media-asset" data-el="img-media-grid-2" />
                  </template>
                </a>
              </template>
            </div>
          </template>
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
      .querySelectorAll("[data-el='div-media-grid-1']")
      .forEach((el) => {
        el.className = `cv-media-grid ${this.props.className || ""}`;
      });

    this._root.querySelectorAll("[data-el='show-media-grid']").forEach((el) => {
      const whenCondition = this.state.showSkeleton;
      if (whenCondition) {
        this.showContent(el);
      }
    });

    this._root
      .querySelectorAll("[data-el='show-media-grid-2']")
      .forEach((el) => {
        const whenCondition = !this.state.showSkeleton;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-media-grid-3']")
      .forEach((el) => {
        const whenCondition = this.props.primaryMedia;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root.querySelectorAll("[data-el='a-media-grid-1']").forEach((el) => {
      el.setAttribute(
        "href",
        this.props.primaryMedia.mapLinks?.[0]?.url || undefined
      );
    });

    this._root
      .querySelectorAll("[data-el='show-media-grid-4']")
      .forEach((el) => {
        const whenCondition = this.props.primaryMedia.media?.type === "video";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='video-media-grid-1']")
      .forEach((el) => {
        el.setAttribute("src", this.props.primaryMedia.media?.url);
        el.setAttribute("autoPlay", true);
        el.setAttribute("loop", true);
        el.setAttribute("muted", true);
        el.setAttribute("playsInline", true);
      });

    this._root
      .querySelectorAll("[data-el='show-media-grid-5']")
      .forEach((el) => {
        const whenCondition = this.props.primaryMedia.media?.type !== "video";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='img-media-grid-1']")
      .forEach((el) => {
        el.setAttribute("src", this.props.primaryMedia.media?.url);
        el.setAttribute(
          "alt",
          this.props.primaryMedia.altText || this.props.primaryMedia.title || ""
        );
      });

    this._root
      .querySelectorAll("[data-el='show-media-grid-6']")
      .forEach((el) => {
        const whenCondition =
          this.props.secondaryMedia && this.props.secondaryMedia.length > 0;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root.querySelectorAll("[data-el='for-media-grid']").forEach((el) => {
      let array = this.props.secondaryMedia;
      this.renderLoop(el, array, "item");
    });

    this._root.querySelectorAll("[data-el='a-media-grid-2']").forEach((el) => {
      const item = this.getScope(el, "item");
      el.setAttribute("href", item.mapLinks?.[0]?.url || undefined);
      el.key = item.id;
    });

    this._root
      .querySelectorAll("[data-el='show-media-grid-7']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        const whenCondition = item.media?.type === "video";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='video-media-grid-2']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        el.setAttribute("src", item.media?.url);
        el.setAttribute("autoPlay", true);
        el.setAttribute("loop", true);
        el.setAttribute("muted", true);
        el.setAttribute("playsInline", true);
      });

    this._root
      .querySelectorAll("[data-el='show-media-grid-8']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        const whenCondition = item.media?.type !== "video";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='img-media-grid-2']")
      .forEach((el) => {
        const item = this.getScope(el, "item");
        el.setAttribute("src", item.media?.url);
        el.setAttribute("alt", item.altText || item.title || "");
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

customElements.define("media-grid", MediaGrid);
