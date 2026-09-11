<template>
  <div
    ref="rootRef"
    :class="`cv-banner ${showSkeleton ? 'cv-image-shimmer' : ''} ${
      className || ''
    }`"
    :style="{
      backgroundImage:
        shouldMount &&
        !isLoading &&
        !hasVideo &&
        imageUrl &&
        config?.height !== 'auto'
          ? `url(${imageUrl})`
          : 'none',
      textAlign: alignment,
      backgroundPosition: backgroundPosition || 'center',
      minHeight: minHeightValue || '',
      height: config?.height || '',
    }"
  >
    <template v-if="shouldMount && !isLoading && hasVideo">
      <video
        :src="videoUrl"
        :autoPlay="true"
        :loop="true"
        :muted="true"
        :playsInline="true"
        :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }"
      ></video>
    </template>

    <template
      v-if="
        shouldMount &&
        !isLoading &&
        !hasVideo &&
        imageUrl &&
        config?.height === 'auto'
      "
    >
      <img
        alt=""
        :src="imageUrl"
        :style="{
          width: '100%',
          height: 'auto',
          display: 'block',
          zIndex: 0,
          objectFit: 'cover',
          objectPosition: backgroundPosition || 'center',
        }"
      />
    </template>

    <template
      v-if="!!config?.backgroundEffect && config.backgroundEffect !== 'none'"
    >
      <canvas
        class="cv-banner-bg-effect"
        aria-hidden="true"
        ref="canvasRef"
        :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }"
      ></canvas>
    </template>

    <template v-if="shouldMount && !!hotspots?.length">
      <div
        class="cv-banner-hotspots"
        :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
        }"
      >
        <svg
          class="cv-banner-hotspots-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <template :key="`${h.id}-visual`" v-for="(h, index) in hotspots">
            <g>
              <g :class="`cv-hotspot-visual cv-hotspot-visual-${h.shape}`">
                <template v-if="h.shape === 'rect'">
                  <rect
                    vector-effect="non-scaling-stroke"
                    :x="h.coords.x"
                    :y="h.coords.y"
                    :width="h.coords.width"
                    :height="h.coords.height"
                  ></rect>
                </template>

                <template v-if="h.shape === 'oval'">
                  <ellipse
                    vector-effect="non-scaling-stroke"
                    :cx="h.coords.x + h.coords.width / 2"
                    :cy="h.coords.y + h.coords.height / 2"
                    :rx="h.coords.width / 2"
                    :ry="h.coords.height / 2"
                  ></ellipse>
                </template>

                <template v-if="h.shape === 'polygon'">
                  <polygon
                    vector-effect="non-scaling-stroke"
                    :points="hotspotPolygonPoints(h)"
                  ></polygon>
                </template>

                <template v-if="h.pulse">
                  <template v-if="h.shape === 'rect'">
                    <rect
                      class="cv-hotspot-pulse-ring"
                      vector-effect="non-scaling-stroke"
                      :x="h.coords.x"
                      :y="h.coords.y"
                      :width="h.coords.width"
                      :height="h.coords.height"
                    ></rect>
                  </template>
                </template>

                <template v-if="h.pulse">
                  <template v-if="h.shape === 'oval'">
                    <ellipse
                      class="cv-hotspot-pulse-ring"
                      vector-effect="non-scaling-stroke"
                      :cx="h.coords.x + h.coords.width / 2"
                      :cy="h.coords.y + h.coords.height / 2"
                      :rx="h.coords.width / 2"
                      :ry="h.coords.height / 2"
                    ></ellipse>
                  </template>
                </template>

                <template v-if="h.pulse">
                  <template v-if="h.shape === 'polygon'">
                    <polygon
                      class="cv-hotspot-pulse-ring"
                      vector-effect="non-scaling-stroke"
                      :points="hotspotPolygonPoints(h)"
                    ></polygon>
                  </template>
                </template>
              </g>
            </g>
          </template></svg
        ><template :key="h.id" v-for="(h, index) in hotspots">
          <div>
            <div class="cv-hotspot-hit" :style="hotspotHitStyle(h)">
              <a
                :href="hotspotHref(h)"
                :aria-label="hotspotLabel(h)"
                :aria-describedby="
                  h.showTooltip ? `cv-hotspot-tip-${h.id}` : undefined
                "
                :class="`cv-hotspot cv-hotspot-${h.shape}`"
              >
                <template v-if="!!h.showTooltip">
                  <span
                    role="tooltip"
                    class="cv-hotspot-tooltip"
                    :id="`cv-hotspot-tip-${h.id}`"
                    >{{ h.label || h.altText }}</span
                  >
                </template>
              </a>
            </div>
          </div>
        </template>
      </div>
    </template>

    <div
      class="cv-banner-overlay"
      :style="{
        zIndex: 1,
        position: config?.height === 'auto' ? 'absolute' : 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background:
          gradientOverlay || 'var(--cv-color-scrim, rgba(0, 0, 0, 0.4))',
        padding: paddingValue || 'var(--cv-spacing-xl)',
      }"
    >
      <div
        class="cv-banner-content"
        :style="{
          display: 'flex',
          flexDirection: 'column',
          alignItems:
            alignment === 'center'
              ? 'center'
              : alignment === 'right'
              ? 'flex-end'
              : 'flex-start',
        }"
      >
        <template v-if="showSkeleton">
          <div
            class="cv-skeleton-title cv-image-shimmer"
            :style="{
              width: '60%',
              height: '36px',
              marginBottom: '16px',
            }"
          ></div>
          <div
            class="cv-skeleton-text cv-image-shimmer"
            :style="{
              width: '80%',
              height: '18px',
              marginBottom: '10px',
            }"
          ></div>
          <div
            class="cv-skeleton-text cv-image-shimmer"
            :style="{
              width: '50%',
              height: '18px',
              marginBottom: '24px',
            }"
          ></div>
          <div
            class="cv-skeleton-button cv-image-shimmer"
            :style="{
              width: '140px',
              height: '42px',
            }"
          ></div>
        </template>

        <template v-if="!showSkeleton">
          <template v-if="title">
            <h2 class="cv-banner-title">{{ title }}</h2>
          </template>

          <template v-if="subtitle">
            <p class="cv-banner-subtitle">{{ subtitle }}</p>
          </template>

          <template v-if="ctaText">
            <a class="cv-banner-cta" :href="linkUrl">{{ ctaText }}</a>
          </template>
        </template>
      </div>
    </div>
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

export default defineComponent({
  name: "banner",

  props: [
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
  ],

  data() {
    return { isVisible: false };
  },

  mounted() {
    if (this.lazyLoad === false) {
      this.isVisible = true;
      if (this.$refs.canvasRef)
        this.plugin.start(
          this.$refs.canvasRef,
          this.backgroundEffectClass as BackgroundEffectName,
          this.$refs.animContext
        );
      return;
    }
    if (this.$refs.rootRef) {
      this.$refs.observerBox.disconnect = observeLazyMount(
        this.$refs.rootRef,
        () => {
          this.isVisible = true;
          if (this.$refs.canvasRef)
            this.plugin.start(
              this.$refs.canvasRef,
              this.backgroundEffectClass as BackgroundEffectName,
              this.$refs.animContext
            );
        },
        this.lazyThreshold ?? 0.1,
        this.lazyRootMargin ?? "200px"
      );
    }
  },

  watch: {
    onUpdateHook0: {
      handler() {
        if (this.isVisible && this.$refs.canvasRef)
          this.plugin.start(
            this.$refs.canvasRef,
            this.backgroundEffectClass as BackgroundEffectName,
            this.$refs.animContext
          );
      },
      immediate: true,
    },
  },
  unmounted() {
    if (this.$refs.observerBox.disconnect) this.$refs.observerBox.disconnect();
    this.plugin.stop(this.$refs.animContext);
  },

  computed: {
    shouldMount() {
      return this.lazyLoad === false || this.isVisible;
    },
    showSkeleton() {
      return !!this.isLoading || !this.shouldMount;
    },
    alignment() {
      return (
        this.textAlignment ||
        this.align ||
        this.config?.textAlignment ||
        this.config?.align ||
        "center"
      );
    },
    hasVideo() {
      return (
        this.media?.type === "video" ||
        (this.backgroundImageUrl && this.backgroundImageUrl.endsWith(".mp4")) ||
        (this.media?.url && this.media.url.endsWith(".mp4"))
      );
    },
    videoUrl() {
      return this.media?.url || this.backgroundImageUrl || "";
    },
    imageUrl() {
      return this.media?.url || this.backgroundImageUrl || "";
    },
    linkUrl() {
      return this.mapLinks?.[0]?.url || this.ctaLink || undefined;
    },
    gradientOverlay() {
      return this.config?.bgGradient || this.bgGradient || "";
    },
    paddingValue() {
      const p = this.config?.padding || this.padding;
      if (p === "sm") return "var(--cv-spacing-sm)";
      if (p === "md") return "var(--cv-spacing-md)";
      if (p === "lg") return "var(--cv-spacing-lg)";
      if (p === "xl") return "var(--cv-spacing-xl)";
      return p || "";
    },
    backgroundPosition() {
      return this.config?.bgPosition || "";
    },
    minHeightValue() {
      if (this.config?.height === "auto") return "auto";
      return this.config?.minHeight || this.config?.height || "300px";
    },
    hotspotMinTarget() {
      return this.config?.hotspotMinTargetSize ?? 24;
    },
    backgroundEffectClass() {
      return this.config?.backgroundEffect || "none";
    },
    plugin() {
      return (
        this.config?.backgroundEffectPlugin || defaultBackgroundEffectPlugin
      );
    },
    onUpdateHook0() {
      return {
        0: this.backgroundEffectClass,
        1: this.$refs.canvasRef,
      };
    },
  },

  methods: {
    hotspotHref(h: Hotspot) {
      return h.action?.type === "deeplink"
        ? h.action.deeplink || h.action.url || undefined
        : h.action?.url || undefined;
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
      const c = this.hotspotCenter(h);
      return {
        position: "absolute",
        left: `${c.x}%`,
        top: `${c.y}%`,
        width: `${h.coords.width}%`,
        height: `${h.coords.height}%`,
        minWidth: `${this.hotspotMinTarget}px`,
        minHeight: `${this.hotspotMinTarget}px`,
        transform: "translate(-50%, -50%)",
      };
    },
  },
});
</script>