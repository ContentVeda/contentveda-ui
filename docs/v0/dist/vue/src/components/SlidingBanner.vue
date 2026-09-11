<template>
  <div
    role="region"
    ref="rootRef"
    :class="`cv-sliding-banner ${showSkeleton ? 'cv-image-shimmer' : ''} ${
      className || ''
    } effect-${animationClass} bg-effect-${backgroundClass} quality-${qualityClass} ${
      config?.showDots ? 'has-dots' : ''
    }`"
    @mouseenter="async (event) => stopAutoPlay()"
    @mouseleave="async (event) => startAutoPlay()"
    :style="{
      height: config?.height || '',
      minHeight: config?.height === 'auto' ? 'auto' : config?.minHeight || '',
    }"
  >
    <template v-if="backgroundClass !== 'none'">
      <canvas class="cv-sliding-banner-canvas" ref="canvasRef"></canvas>
    </template>

    <template v-if="config?.height === 'auto' && items?.[0]?.media?.url">
      <img
        alt=""
        :src="items[0].media.url"
        :style="{
          width: '100%',
          height: 'auto',
          display: 'block',
          visibility: 'hidden',
          pointerEvents: 'none',
        }"
      />
    </template>

    <div
      :class="`cv-sliding-banner-track dir-${direction} ${
        wrapping ? 'no-transition' : ''
      }`"
      :style="{
        transform: `translateX(-${currentIndex * 100}%)`,
        position: config?.height === 'auto' ? 'absolute' : 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }"
    >
      <template :key="item.id || index" v-for="(item, index) in items">
        <div
          :class="`cv-sliding-slide ${index === currentIndex ? 'active' : ''} ${
            index === previousIndex && index !== currentIndex ? 'previous' : ''
          }`"
        >
          <template v-if="shouldMount && item.media?.type === 'video'">
            <video
              :src="item.media?.url"
              :autoPlay="true"
              :loop="true"
              :muted="true"
              :playsInline="true"
              :class="`cv-sliding-bg-video ${
                showSkeleton ? 'cv-image-shimmer' : ''
              }`"
              :style="{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }"
            ></video>
          </template>

          <template v-if="shouldMount && item.media?.type !== 'video'">
            <div
              :class="`cv-sliding-bg ${showSkeleton ? 'cv-image-shimmer' : ''}`"
              :style="{
                backgroundImage: item.media?.url
                  ? `url(${item.media.url})`
                  : 'none',
                backgroundPosition: config?.bgPosition || 'center',
              }"
            ></div>
          </template>

          <template
            v-if="animationClass === 'curtain' && item.media?.type !== 'video'"
          >
            <div
              class="cv-curtain-panel cv-curtain-panel-left"
              :style="{
                backgroundImage: item.media?.url
                  ? `url(${item.media.url})`
                  : 'none',
                backgroundPosition: config?.bgPosition || 'center',
              }"
            ></div>
            <div
              class="cv-curtain-panel cv-curtain-panel-right"
              :style="{
                backgroundImage: item.media?.url
                  ? `url(${item.media.url})`
                  : 'none',
                backgroundPosition: config?.bgPosition || 'center',
              }"
            ></div>
          </template>

          <template v-if="animationClass === 'cube'">
            <div class="cv-cube-side"></div>
          </template>

          <div class="cv-sliding-overlay"></div>
          <div
            class="cv-sliding-content"
            :style="{
              textAlign: item.textAlignment || config?.align || 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems:
                (item.textAlignment || config?.align || 'center') === 'center'
                  ? 'center'
                  : (item.textAlignment || config?.align || 'center') ===
                    'right'
                  ? 'flex-end'
                  : 'flex-start',
            }"
          >
            <template v-if="showSkeleton">
              <div
                class="cv-skeleton-title cv-image-shimmer"
                :style="{
                  width: '50%',
                  height: '32px',
                  marginBottom: '16px',
                }"
              ></div>
              <div
                class="cv-skeleton-text cv-image-shimmer"
                :style="{
                  width: '70%',
                  height: '16px',
                  marginBottom: '10px',
                }"
              ></div>
              <div
                class="cv-skeleton-text cv-image-shimmer"
                :style="{
                  width: '40%',
                  height: '16px',
                  marginBottom: '24px',
                }"
              ></div>
              <div
                class="cv-skeleton-button cv-image-shimmer"
                :style="{
                  width: '130px',
                  height: '40px',
                }"
              ></div>
            </template>

            <template v-if="!showSkeleton">
              <h2 class="cv-sliding-title">{{ item.title }}</h2>

              <template v-if="item.subtitle">
                <p class="cv-sliding-subtitle">{{ item.subtitle }}</p>
              </template>

              <template v-if="item.ctaText">
                <a
                  class="cv-sliding-cta"
                  :href="item.mapLinks?.[0]?.url || undefined"
                  >{{ item.ctaText }}</a
                >
              </template>
            </template>
          </div>
        </div>
      </template>
    </div>
    <template
      v-if="
        (config?.showArrows || config?.showNextPrev) &&
        (!config?.hideArrowsIfNoScroll || (items && items.length > 1))
      "
    >
      <button
        type="button"
        class="cv-sliding-arrow prev"
        aria-label="Previous"
        @click="async (event) => prev()"
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
        @click="async (event) => next()"
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

    <template v-if="config?.showDots">
      <div class="cv-sliding-dots">
        <template :key="index" v-for="(_, index) in items">
          <button
            type="button"
            :class="`cv-sliding-dot ${index === currentIndex ? 'active' : ''}`"
            :aria-label="`Go to slide ${index + 1}`"
            @click="async (event) => goTo(index)"
          ></button>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { observeLazyMount } from "../utils/lazyObserver";
import { defaultBackgroundEffectPlugin } from "../utils/backgroundEffects";
import type {
  BackgroundEffectContext,
  BackgroundEffectName,
  BackgroundEffectPlugin,
} from "../utils/backgroundEffects";

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

export default defineComponent({
  name: "sliding-banner",

  props: [
    "lazyLoad",
    "lazyThreshold",
    "lazyRootMargin",
    "isLoading",
    "config",
    "items",
    "className",
  ],

  data() {
    return {
      currentIndex: 0,
      previousIndex: 0,
      direction: "next",
      isVisible: false,
      wrapping: false,
    };
  },

  mounted() {
    if (this.lazyLoad === false) {
      this.isVisible = true;
      this.mountHeavyContent();
      return;
    }
    if (this.$refs.rootRef) {
      this.$refs.observerBox.disconnect = observeLazyMount(
        this.$refs.rootRef,
        () => {
          this.isVisible = true;
          this.mountHeavyContent();
        },
        this.lazyThreshold ?? 0.1,
        this.lazyRootMargin ?? "200px"
      );
    }
  },
  updated() {
    this.$refs.latestNext.fn = this.next;
  },
  watch: {
    onUpdateHook0: {
      handler() {
        if (this.wrapping) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              this.wrapping = false;
            });
          });
        }
      },
      immediate: true,
    },
    onUpdateHook1: {
      handler() {
        if (this.isVisible && this.$refs.canvasRef) {
          this.plugin.start(
            this.$refs.canvasRef,
            this.backgroundClass as BackgroundEffectName,
            this.$refs.bgEffectContext
          );
        }
      },
      immediate: true,
    },
  },
  unmounted() {
    this.stopAutoPlay();
    this.plugin.stop(this.$refs.bgEffectContext);
    // Same guard as RowScrollable: onDestroy also runs on the server. The
    // handler is only assigned in onMount so this branch is normally skipped
    // there, but the typeof check makes that safe by construction rather than
    // by coincidence.
    if (
      typeof window !== "undefined" &&
      this.$refs.animContext.dimResizeHandler
    ) {
      window.removeEventListener(
        "resize",
        this.$refs.animContext.dimResizeHandler
      );
    }
    if (this.$refs.observerBox.disconnect) this.$refs.observerBox.disconnect();
  },

  computed: {
    shouldMount() {
      return this.lazyLoad === false || this.isVisible;
    },
    showSkeleton() {
      return !!this.isLoading || !this.shouldMount;
    },
    animationClass() {
      return this.config?.animationEffect || "slide";
    },
    backgroundClass() {
      return this.config?.backgroundEffect || "none";
    },
    plugin() {
      return (
        this.config?.backgroundEffectPlugin || defaultBackgroundEffectPlugin
      );
    },
    qualityClass() {
      return this.config?.animationQuality || "detailed";
    },
    onUpdateHook0() {
      return {
        0: this.wrapping,
      };
    },
    onUpdateHook1() {
      return {
        0: this.backgroundClass,
        1: this.$refs.canvasRef,
      };
    },
  },

  methods: {
    next() {
      if (!this.items?.length) return;
      this.direction = "next";
      this.previousIndex = this.currentIndex;
      if (this.currentIndex >= this.items.length - 1) {
        if (this.config?.rotateAgain !== false) {
          this.wrapping = true;
          this.currentIndex = 0;
        }
      } else {
        this.currentIndex = this.currentIndex + 1;
      }
    },
    prev() {
      if (!this.items?.length) return;
      this.direction = "prev";
      this.previousIndex = this.currentIndex;
      if (this.currentIndex <= 0) {
        if (this.config?.rotateAgain !== false) {
          this.wrapping = true;
          this.currentIndex = this.items.length - 1;
        }
      } else {
        this.currentIndex = this.currentIndex - 1;
      }
    },
    goTo(index: number) {
      if (this.currentIndex !== index) {
        this.direction = index > this.currentIndex ? "next" : "prev";
        this.previousIndex = this.currentIndex;
        this.currentIndex = index;
      }
    },
    startAutoPlay() {
      if (this.$refs.animContext.intervalId) return;
      if (this.config?.autoStart !== false && this.items?.length > 1) {
        this.$refs.animContext.intervalId = setInterval(() => {
          this.$refs.latestNext.fn();
        }, this.config?.delayMs || 5000);
      }
    },
    stopAutoPlay() {
      if (this.$refs.animContext.intervalId) {
        clearInterval(this.$refs.animContext.intervalId);
        this.$refs.animContext.intervalId = null;
      }
    },
    setupDimensions() {
      if (this.$refs.rootRef) {
        this.$refs.rootRef.style.setProperty(
          "--slider-half-width",
          `${this.$refs.rootRef.offsetWidth / 2}px`
        );
      }
    },
    mountHeavyContent: function mountHeavyContent() {
      this.startAutoPlay();
      this.setupDimensions();
      this.$refs.animContext.dimResizeHandler = () => this.setupDimensions();
      window.addEventListener(
        "resize",
        this.$refs.animContext.dimResizeHandler
      );
      if (this.$refs.canvasRef) {
        this.plugin.start(
          this.$refs.canvasRef,
          this.backgroundClass as BackgroundEffectName,
          this.$refs.bgEffectContext
        );
      }
    },
  },
});
</script>