export interface TimerWidgetProps {
  targetDate: string;
  title?: string;
  className?: string;
  variant?: "neon" | "dark" | "gray";
  backgroundImageUrl?: string;
  backgroundPosition?: string;
  overlay?: string;
  backgroundEffect?: BackgroundEffectName;
  backgroundEffectPlugin?: BackgroundEffectPlugin;
  expiredText?: string;
  width?: string;
  height?: string;
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
 *  <timer-widget></timer-widget>
 *
 */
class TimerWidget extends HTMLElement {
  get _rootRef() {
    return this._root.querySelector("[data-ref='TimerWidget-rootRef']");
  }

  get _canvasRef() {
    return this._root.querySelector("[data-ref='TimerWidget-canvasRef']");
  }

  get _root() {
    return this.shadowRoot || this;
  }

  constructor() {
    super();
    const self = this;

    this.state = {
      timeLeft: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      timerId: null,
      isExpired: false,
      calculateTimeLeft() {
        const difference =
          new Date(self.props.targetDate).getTime() - new Date().getTime();
        if (difference > 0) {
          self.state.isExpired = false;
          self.update();
          self.state.timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
          self.update();
        } else {
          self.state.isExpired = true;
          self.update();
          self.state.timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };
          self.update();
        }
      },
      startTicking() {
        self.state.calculateTimeLeft();
        self.state.timerId = setInterval(() => {
          self.state.calculateTimeLeft();
        }, 1000);
        self.update();
      },
      get hasBackgroundImage() {
        return !!self.props.backgroundImageUrl;
      },
      get widthValue() {
        return self.props.width || "auto";
      },
      get heightMode() {
        return self.props.height || "auto";
      },
      get useImageForHeight() {
        return (
          self.state.hasBackgroundImage && self.state.heightMode === "auto"
        );
      },
      get fixedHeightValue() {
        return self.state.heightMode !== "auto"
          ? self.state.heightMode
          : undefined;
      },
      get contentOverlaysBox() {
        return self.state.useImageForHeight || !!self.state.fixedHeightValue;
      },
      get backgroundEffectClass() {
        return self.props.backgroundEffect || "none";
      },
      get plugin() {
        return (
          self.props.backgroundEffectPlugin || defaultBackgroundEffectPlugin
        );
      },
    };
    if (!this.props) {
      this.props = {};
    }

    this.componentProps = [
      "lazyLoad",
      "lazyThreshold",
      "lazyRootMargin",
      "targetDate",
      "backgroundImageUrl",
      "width",
      "height",
      "backgroundEffect",
      "backgroundEffectPlugin",
      "variant",
      "className",
      "backgroundPosition",
      "overlay",
      "title",
      "expiredText",
    ];

    this.updateDeps = [[this.state.backgroundEffectClass, self._canvasRef]];

    // used to keep track of all nodes created by show/for
    this.nodesToDestroy = [];
    // batch updates
    this.pendingUpdate = false;

    this._animContext = {
      animationFrameId: null,
      resizeHandler: null,
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
    if (this.state.timerId) clearInterval(this.state.timerId);
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
      <div data-el="div-timer-widget-1" data-ref="TimerWidget-rootRef">
        <template data-el="show-timer-widget">
          <img alt="" data-el="img-timer-widget-1" />
        </template>
        <template data-el="show-timer-widget-2">
          <div class="cv-timer-overlay" data-el="div-timer-widget-2"></div>
        </template>
        <template data-el="show-timer-widget-3">
          <canvas
            class="cv-timer-bg-effect"
            aria-hidden="true"
            data-el="canvas-timer-widget-1"
            data-ref="TimerWidget-canvasRef"
          ></canvas>
        </template>
        <div class="cv-timer-content" data-el="div-timer-widget-3">
          <template data-el="show-timer-widget-4">
            <h3 class="cv-timer-title">
              <template data-el="div-timer-widget-4"><!-- props.title --></template>
            </h3>
          </template>
          <template data-el="show-timer-widget-5">
            <div
              class="cv-timer-blocks"
              role="timer"
              aria-live="off"
              data-el="div-timer-widget-5"
            >
              <div class="cv-timer-block">
                <span class="cv-timer-value" aria-hidden="true">
                  <template data-el="div-timer-widget-6">
                    <!-- state.timeLeft.days -->
                  </template>
                </span>
                <span class="cv-timer-label" aria-hidden="true">Days</span>
              </div>
              <div class="cv-timer-block">
                <span class="cv-timer-value" aria-hidden="true">
                  <template data-el="div-timer-widget-7">
                    <!-- state.timeLeft.hours -->
                  </template>
                </span>
                <span class="cv-timer-label" aria-hidden="true">Hours</span>
              </div>
              <div class="cv-timer-block">
                <span class="cv-timer-value" aria-hidden="true">
                  <template data-el="div-timer-widget-8">
                    <!-- state.timeLeft.minutes -->
                  </template>
                </span>
                <span class="cv-timer-label" aria-hidden="true">Minutes</span>
              </div>
              <div class="cv-timer-block">
                <span class="cv-timer-value" aria-hidden="true">
                  <template data-el="div-timer-widget-9">
                    <!-- state.timeLeft.seconds -->
                  </template>
                </span>
                <span class="cv-timer-label" aria-hidden="true">Seconds</span>
              </div>
            </div>
          </template>
          <template data-el="show-timer-widget-6">
            <p class="cv-timer-expired">
              <template data-el="div-timer-widget-10">
                <!-- props.expiredText -->
              </template>
            </p>
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
    if (this.props.lazyLoad === false) {
      this.state.startTicking();
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
          this.state.startTicking();
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
        if (self._canvasRef)
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
    this._root
      .querySelectorAll("[data-el='div-timer-widget-1']")
      .forEach((el) => {
        el.className = `cv-timer-widget cv-timer-variant-${
          this.props.variant || "dark"
        } ${this.state.hasBackgroundImage ? "cv-timer-has-bg" : ""} ${
          this.props.className || ""
        }`;
        Object.assign(el.style, {
          width: this.state.widthValue,
          height: this.state.fixedHeightValue || undefined,
          backgroundImage:
            this.state.hasBackgroundImage && !this.state.useImageForHeight
              ? `url(${this.props.backgroundImageUrl})`
              : undefined,
          backgroundPosition: this.props.backgroundPosition || "center",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-timer-widget']")
      .forEach((el) => {
        const whenCondition = this.state.useImageForHeight;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='img-timer-widget-1']")
      .forEach((el) => {
        el.setAttribute("src", this.props.backgroundImageUrl);
        Object.assign(el.style, {
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "cover",
          objectPosition: this.props.backgroundPosition || "center",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-timer-widget-2']")
      .forEach((el) => {
        const whenCondition = this.state.hasBackgroundImage;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-timer-widget-2']")
      .forEach((el) => {
        Object.assign(el.style, {
          background: this.props.overlay || "rgba(0, 0, 0, 0.45)",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-timer-widget-3']")
      .forEach((el) => {
        const whenCondition = this.state.backgroundEffectClass !== "none";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='canvas-timer-widget-1']")
      .forEach((el) => {
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

    this._root
      .querySelectorAll("[data-el='div-timer-widget-3']")
      .forEach((el) => {
        Object.assign(el.style, {
          position: this.state.contentOverlaysBox ? "absolute" : "relative",
          top: this.state.contentOverlaysBox ? 0 : undefined,
          left: this.state.contentOverlaysBox ? 0 : undefined,
          width: this.state.contentOverlaysBox ? "100%" : undefined,
          height: this.state.contentOverlaysBox ? "100%" : undefined,
        });
      });

    this._root
      .querySelectorAll("[data-el='show-timer-widget-4']")
      .forEach((el) => {
        const whenCondition = this.props.title;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-timer-widget-4']")
      .forEach((el) => {
        this.renderTextNode(el, this.props.title);
      });

    this._root
      .querySelectorAll("[data-el='show-timer-widget-5']")
      .forEach((el) => {
        const whenCondition = !this.state.isExpired;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-timer-widget-5']")
      .forEach((el) => {
        el.setAttribute(
          "aria-label",
          `Time remaining: ${this.state.timeLeft.days} days, ${this.state.timeLeft.hours} hours, ${this.state.timeLeft.minutes} minutes, ${this.state.timeLeft.seconds} seconds`
        );
      });

    this._root
      .querySelectorAll("[data-el='div-timer-widget-6']")
      .forEach((el) => {
        this.renderTextNode(el, this.state.timeLeft.days);
      });

    this._root
      .querySelectorAll("[data-el='div-timer-widget-7']")
      .forEach((el) => {
        this.renderTextNode(el, this.state.timeLeft.hours);
      });

    this._root
      .querySelectorAll("[data-el='div-timer-widget-8']")
      .forEach((el) => {
        this.renderTextNode(el, this.state.timeLeft.minutes);
      });

    this._root
      .querySelectorAll("[data-el='div-timer-widget-9']")
      .forEach((el) => {
        this.renderTextNode(el, this.state.timeLeft.seconds);
      });

    this._root
      .querySelectorAll("[data-el='show-timer-widget-6']")
      .forEach((el) => {
        const whenCondition =
          !!this.state.isExpired && !!this.props.expiredText;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-timer-widget-10']")
      .forEach((el) => {
        this.renderTextNode(el, this.props.expiredText);
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

customElements.define("timer-widget", TimerWidget);
