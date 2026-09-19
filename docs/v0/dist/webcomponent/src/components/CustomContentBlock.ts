// Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api)
// produces for a PageFloorEntry.kind === "custom" block — see
// docs/adr-025-custom-content-types.md. Renders site-owner-defined content types
// (Strapi-style), additive/parallel to the built-in Widget types every other
// component here renders one of.
//
// Deliberately self-contained rather than composing Banner.lite.tsx for the
// base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js)
// does not support one .lite.tsx component rendering another as a JSX tag — the nested
// component reference is silently dropped from the compiled output, verified while
// building this component. So the base-widget-typed background+overlay rendering is
// duplicated here in simplified form (no hotspot SVG layer) rather than delegated.

export interface CustomContentMedia {
  type?: "image" | "video" | "gif" | string;
  url?: string;
  posterUrl?: string;
  altText?: string;
}
// Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api)
// produces for a PageFloorEntry.kind === "custom" block — see
// docs/adr-025-custom-content-types.md. Renders site-owner-defined content types
// (Strapi-style), additive/parallel to the built-in Widget types every other
// component here renders one of.
//
// Deliberately self-contained rather than composing Banner.lite.tsx for the
// base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js)
// does not support one .lite.tsx component rendering another as a JSX tag — the nested
// component reference is silently dropped from the compiled output, verified while
// building this component. So the base-widget-typed background+overlay rendering is
// duplicated here in simplified form (no hotspot SVG layer) rather than delegated.

export interface CustomContentTextOverlay {
  id?: string;
  text?: string;
  type?: "title" | "subtitle" | "cta-button" | string;
}

// One ContentEntry as the public API shapes it: raw field data keyed by the
// ContentTypeDefinition's field schema (not included in this payload — see the
// "generic by runtime shape" rendering below), plus the base-widget-type-inherited
// shape when the owning type has one.
// Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api)
// produces for a PageFloorEntry.kind === "custom" block — see
// docs/adr-025-custom-content-types.md. Renders site-owner-defined content types
// (Strapi-style), additive/parallel to the built-in Widget types every other
// component here renders one of.
//
// Deliberately self-contained rather than composing Banner.lite.tsx for the
// base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js)
// does not support one .lite.tsx component rendering another as a JSX tag — the nested
// component reference is silently dropped from the compiled output, verified while
// building this component. So the base-widget-typed background+overlay rendering is
// duplicated here in simplified form (no hotspot SVG layer) rather than delegated.

// One ContentEntry as the public API shapes it: raw field data keyed by the
// ContentTypeDefinition's field schema (not included in this payload — see the
// "generic by runtime shape" rendering below), plus the base-widget-type-inherited
// shape when the owning type has one.
export interface CustomContentEntry {
  id: string;
  name?: string;
  data?: Record<string, any>;
  media?: CustomContentMedia;
  textOverlays?: CustomContentTextOverlay[];
}
// Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api)
// produces for a PageFloorEntry.kind === "custom" block — see
// docs/adr-025-custom-content-types.md. Renders site-owner-defined content types
// (Strapi-style), additive/parallel to the built-in Widget types every other
// component here renders one of.
//
// Deliberately self-contained rather than composing Banner.lite.tsx for the
// base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js)
// does not support one .lite.tsx component rendering another as a JSX tag — the nested
// component reference is silently dropped from the compiled output, verified while
// building this component. So the base-widget-typed background+overlay rendering is
// duplicated here in simplified form (no hotspot SVG layer) rather than delegated.

// One ContentEntry as the public API shapes it: raw field data keyed by the
// ContentTypeDefinition's field schema (not included in this payload — see the
// "generic by runtime shape" rendering below), plus the base-widget-type-inherited
// shape when the owning type has one.

export interface CustomContentBlockProps {
  contentType?: string;
  contentTypeKind?: "single" | "collection" | string;
  entries?: CustomContentEntry[];
  // Hoisted base-widget-type shape — present on the block itself (not nested under an
  // entry) only for the common case PageService.resolvePage documents: a "single"-kind
  // type, or a "collection" pick showing exactly one item. See state.isBaseWidgetShaped.
  media?: CustomContentMedia;
  textOverlays?: CustomContentTextOverlay[];
  className?: string;
  isLoading?: boolean;
}

/**
 * Usage:
 *
 *  <custom-content-block></custom-content-block>
 *
 */
class CustomContentBlock extends HTMLElement {
  get _root() {
    return this.shadowRoot || this;
  }

  constructor() {
    super();
    const self = this;

    this.state = {
      overlayText(
        overlays: CustomContentTextOverlay[] | undefined,
        type: string
      ) {
        return overlays?.find((o) => o.type === type)?.text;
      },
      isBaseWidgetShaped(entry: { media?: CustomContentMedia }) {
        return !!entry.media?.url;
      },
      isMediaFieldValue(value: any) {
        return (
          !!value && typeof value === "object" && typeof value.url === "string"
        );
      },
      fieldValueText(value: any) {
        if (Array.isArray(value)) {
          return value
            .map((item) =>
              typeof item === "object" ? JSON.stringify(item) : String(item)
            )
            .join(", ");
        }
        return typeof value === "object"
          ? JSON.stringify(value)
          : String(value);
      },
      entrySummary(entry: CustomContentEntry) {
        const data = entry.data || {};
        return Object.entries(data)
          .filter(
            ([, v]) =>
              v !== null &&
              v !== undefined &&
              v !== "" &&
              !self.state.isMediaFieldValue(v)
          )
          .map(([key, value]) => `${key}: ${self.state.fieldValueText(value)}`)
          .join(" · ");
      },
      firstMediaField(entry: CustomContentEntry) {
        const data = entry.data || {};
        const found = Object.values(data).find((v) =>
          self.state.isMediaFieldValue(v)
        );
        return found as
          | {
              url?: string;
              type?: string;
            }
          | undefined;
      },
      get isBlockBaseWidgetShaped() {
        return self.state.isBaseWidgetShaped(self.props);
      },
      get hasEntries() {
        return (
          !self.state.isBlockBaseWidgetShaped && !!self.props.entries?.length
        );
      },
      get entriesLayoutClass() {
        return self.props.contentTypeKind === "collection"
          ? "cv-custom-entries-row"
          : "cv-custom-entries-single";
      },
      get blockTitle() {
        return self.state.overlayText(self.props.textOverlays, "title");
      },
      get blockSubtitle() {
        return self.state.overlayText(self.props.textOverlays, "subtitle");
      },
      get blockCta() {
        return self.state.overlayText(self.props.textOverlays, "cta-button");
      },
      get blockIsVideo() {
        return self.props.media?.type === "video";
      },
    };
    if (!this.props) {
      this.props = {};
    }

    this.componentProps = [
      "entries",
      "contentTypeKind",
      "textOverlays",
      "media",
      "className",
    ];

    // used to keep track of all nodes created by show/for
    this.nodesToDestroy = [];
    // batch updates
    this.pendingUpdate = false;

    if (undefined) {
      this.attachShadow({ mode: "open" });
    }
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
      <div data-el="div-custom-content-block-1">
        <template data-el="show-custom-content-block">
          <div class="cv-custom-hero">
            <template data-el="show-custom-content-block-2">
              <video
                class="cv-custom-hero-media"
                data-el="video-custom-content-block-1"
              ></video>
            </template>
            <template data-el="show-custom-content-block-3">
              <img
                class="cv-custom-hero-media"
                data-el="img-custom-content-block-1"
              />
            </template>
            <div class="cv-custom-hero-overlay">
              <template data-el="show-custom-content-block-4">
                <h2 class="cv-custom-hero-title">
                  <template data-el="div-custom-content-block-2">
                    <!-- state.blockTitle -->
                  </template>
                </h2>
              </template>
              <template data-el="show-custom-content-block-5">
                <p class="cv-custom-hero-subtitle">
                  <template data-el="div-custom-content-block-3">
                    <!-- state.blockSubtitle -->
                  </template>
                </p>
              </template>
              <template data-el="show-custom-content-block-6">
                <span class="cv-custom-hero-cta">
                  <template data-el="div-custom-content-block-4">
                    <!-- state.blockCta -->
                  </template>
                </span>
              </template>
            </div>
          </div>
        </template>
        <template data-el="show-custom-content-block-7">
          <div data-el="div-custom-content-block-5">
            <template data-el="for-custom-content-block">
              <div class="cv-custom-entry" data-el="div-custom-content-block-6">
                <template data-el="show-custom-content-block-8">
                  <img
                    class="cv-custom-entry-media"
                    data-el="img-custom-content-block-2"
                  />
                  <template data-el="show-custom-content-block-9">
                    <h4 class="cv-custom-entry-title">
                      <template data-el="div-custom-content-block-7">
                        <!-- state.overlayText(entry.textOverlays, 'title') -->
                      </template>
                    </h4>
                  </template>
                </template>
                <template data-el="show-custom-content-block-10">
                  <template data-el="show-custom-content-block-11">
                    <h4 class="cv-custom-entry-title">
                      <template data-el="div-custom-content-block-8">
                        <!-- entry.name -->
                      </template>
                    </h4>
                  </template>
                  <template data-el="show-custom-content-block-12">
                    <img
                      class="cv-custom-entry-media"
                      alt=""
                      data-el="img-custom-content-block-3"
                    />
                  </template>
                  <p class="cv-custom-entry-fields">
                    <template data-el="div-custom-content-block-9">
                      <!-- state.entrySummary(entry) -->
                    </template>
                  </p>
                </template>
              </div>
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

  onMount() {}

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
      .querySelectorAll("[data-el='div-custom-content-block-1']")
      .forEach((el) => {
        el.className = `cv-custom-block ${this.props.className || ""}`;
      });

    this._root
      .querySelectorAll("[data-el='show-custom-content-block']")
      .forEach((el) => {
        const whenCondition = this.state.isBlockBaseWidgetShaped;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-custom-content-block-2']")
      .forEach((el) => {
        const whenCondition = this.state.blockIsVideo;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='video-custom-content-block-1']")
      .forEach((el) => {
        el.setAttribute("src", this.props.media?.url);
        el.setAttribute("autoPlay", true);
        el.setAttribute("loop", true);
        el.setAttribute("muted", true);
        el.setAttribute("playsInline", true);
      });

    this._root
      .querySelectorAll("[data-el='show-custom-content-block-3']")
      .forEach((el) => {
        const whenCondition = !this.state.blockIsVideo;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='img-custom-content-block-1']")
      .forEach((el) => {
        el.setAttribute("src", this.props.media?.url);
        el.setAttribute("alt", this.props.media?.altText || "");
      });

    this._root
      .querySelectorAll("[data-el='show-custom-content-block-4']")
      .forEach((el) => {
        const whenCondition = this.state.blockTitle;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-custom-content-block-2']")
      .forEach((el) => {
        this.renderTextNode(el, this.state.blockTitle);
      });

    this._root
      .querySelectorAll("[data-el='show-custom-content-block-5']")
      .forEach((el) => {
        const whenCondition = this.state.blockSubtitle;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-custom-content-block-3']")
      .forEach((el) => {
        this.renderTextNode(el, this.state.blockSubtitle);
      });

    this._root
      .querySelectorAll("[data-el='show-custom-content-block-6']")
      .forEach((el) => {
        const whenCondition = this.state.blockCta;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-custom-content-block-4']")
      .forEach((el) => {
        this.renderTextNode(el, this.state.blockCta);
      });

    this._root
      .querySelectorAll("[data-el='show-custom-content-block-7']")
      .forEach((el) => {
        const whenCondition = this.state.hasEntries;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-custom-content-block-5']")
      .forEach((el) => {
        el.className = `cv-custom-entries ${this.state.entriesLayoutClass}`;
      });

    this._root
      .querySelectorAll("[data-el='for-custom-content-block']")
      .forEach((el) => {
        let array = this.props.entries;
        this.renderLoop(el, array, "entry");
      });

    this._root
      .querySelectorAll("[data-el='div-custom-content-block-6']")
      .forEach((el) => {
        const entry = this.getScope(el, "entry");
        el.key = entry.id;
      });

    this._root
      .querySelectorAll("[data-el='show-custom-content-block-8']")
      .forEach((el) => {
        const entry = this.getScope(el, "entry");
        const whenCondition = this.state.isBaseWidgetShaped(entry);
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='img-custom-content-block-2']")
      .forEach((el) => {
        const entry = this.getScope(el, "entry");
        el.setAttribute("src", entry.media?.url);
        el.setAttribute("alt", entry.media?.altText || "");
      });

    this._root
      .querySelectorAll("[data-el='show-custom-content-block-9']")
      .forEach((el) => {
        const entry = this.getScope(el, "entry");
        const whenCondition = this.state.overlayText(
          entry.textOverlays,
          "title"
        );
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-custom-content-block-7']")
      .forEach((el) => {
        const entry = this.getScope(el, "entry");
        this.renderTextNode(
          el,
          this.state.overlayText(entry.textOverlays, "title")
        );
      });

    this._root
      .querySelectorAll("[data-el='show-custom-content-block-10']")
      .forEach((el) => {
        const entry = this.getScope(el, "entry");
        const whenCondition = !this.state.isBaseWidgetShaped(entry);
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-custom-content-block-11']")
      .forEach((el) => {
        const entry = this.getScope(el, "entry");
        const whenCondition = entry.name;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-custom-content-block-8']")
      .forEach((el) => {
        const entry = this.getScope(el, "entry");
        this.renderTextNode(el, entry.name);
      });

    this._root
      .querySelectorAll("[data-el='show-custom-content-block-12']")
      .forEach((el) => {
        const entry = this.getScope(el, "entry");
        const whenCondition = !!this.state.firstMediaField(entry);
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='img-custom-content-block-3']")
      .forEach((el) => {
        const entry = this.getScope(el, "entry");
        el.setAttribute("src", this.state.firstMediaField(entry)?.url);
      });

    this._root
      .querySelectorAll("[data-el='div-custom-content-block-9']")
      .forEach((el) => {
        const entry = this.getScope(el, "entry");
        this.renderTextNode(el, this.state.entrySummary(entry));
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

customElements.define("custom-content-block", CustomContentBlock);
