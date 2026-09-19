<template>
  <div ref="containerRef" :class="`cv-scrollable-container ${className || ''}`">
    <template v-if="title">
      <h3 class="cv-scrollable-title">{{ title }}</h3>
    </template>

    <div
      class="cv-scrollable-wrapper"
      :style="{
        position: 'relative',
      }"
    >
      <div
        ref="rowRef"
        :class="`cv-scrollable-row ${
          config?.hideScrollbar ? 'cv-scrollable-hide-scrollbar' : ''
        }`"
      >
        <template :key="item.id" v-for="(item, index) in items">
          <a
            :href="item.mapLinks?.[0]?.url || undefined"
            :class="`cv-scrollable-card ${
              showSkeleton ? 'cv-image-shimmer' : ''
            }`"
          >
            <template v-if="!showSkeleton">
              <template v-if="item.media?.url">
                <div class="cv-scrollable-img-wrap">
                  <template v-if="item.media?.type === 'video'">
                    <video
                      class="cv-scrollable-img"
                      :src="item.media?.url"
                      :autoPlay="true"
                      :loop="true"
                      :muted="true"
                      :playsInline="true"
                    ></video>
                  </template>

                  <template v-if="item.media?.type !== 'video'">
                    <img
                      class="cv-scrollable-img"
                      :src="item.media?.url"
                      :alt="item.title || ''"
                    />
                  </template>
                </div>
              </template>

              <div class="cv-scrollable-body">
                <template v-if="item.title">
                  <div class="cv-scrollable-card-title">{{ item.title }}</div>
                </template>

                <template v-if="item.subtitle">
                  <div class="cv-scrollable-card-sub">{{ item.subtitle }}</div>
                </template>
              </div>
            </template>
          </a>
        </template>
      </div>
      <template v-if="showArrows">
        <div
          :style="{
            display: 'contents',
          }"
        >
          <button
            type="button"
            class="cv-scrollable-arrow prev"
            aria-label="Previous"
            @click="async (event) => scroll('left')"
            :style="{
              opacity: !canScrollLeft ? '0.35' : '1',
              pointerEvents: !canScrollLeft ? 'none' : 'auto',
            }"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M15 19l-7-7 7-7"></path>
            </svg></button
          ><button
            type="button"
            class="cv-scrollable-arrow next"
            aria-label="Next"
            @click="async (event) => scroll('right')"
            :style="{
              opacity: !canScrollRight ? '0.35' : '1',
              pointerEvents: !canScrollRight ? 'none' : 'auto',
            }"
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
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { observeLazyMount } from "../utils/lazyObserver";

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

export default defineComponent({
  name: "row-scrollable",

  props: [
    "lazyLoad",
    "lazyThreshold",
    "lazyRootMargin",
    "isLoading",
    "config",
    "className",
    "title",
    "items",
  ],

  data() {
    return {
      canScrollLeft: false,
      canScrollRight: false,
      hasOverflow: false,
      isVisible: false,
      observerBox: {
        disconnect: null as (() => void) | null,
        row: null as any,
      },
    };
  },

  mounted() {
    const el = this.$refs.rowRef;
    if (el) {
      el.addEventListener("scroll", this.checkScroll);
      this.checkScroll();
      // Allow DOM to render then check
      setTimeout(() => {
        this.checkScroll();
      }, 150);
      if (typeof ResizeObserver !== "undefined") {
        this.observerBox.row = new ResizeObserver(() => this.checkScroll());
        this.observerBox.row.observe(el);
      }
    }
    window.addEventListener("resize", this.checkScroll);
    if (this.lazyLoad === false) {
      this.isVisible = true;
      return;
    }
    if (this.$refs.containerRef) {
      this.observerBox.disconnect = observeLazyMount(
        this.$refs.containerRef,
        () => {
          this.isVisible = true;
        },
        this.lazyThreshold ?? 0.1,
        this.lazyRootMargin ?? "200px"
      );
    }
  },

  unmounted() {
    const el = this.$refs.rowRef;
    if (el) {
      el.removeEventListener("scroll", this.checkScroll);
    }
    // Guarded: Svelte 5 runs onDestroy during *server* teardown too, so an
    // unguarded window access here throws `window is not defined` and 500s any
    // SSR page that renders this component — it never reaches the listener it
    // was trying to remove, because onMount never added one.
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.checkScroll);
    }
    if (this.observerBox.disconnect) this.observerBox.disconnect();
    if (this.observerBox.row) {
      this.observerBox.row.disconnect();
      this.observerBox.row = null;
    }
  },

  computed: {
    shouldMount() {
      return this.lazyLoad === false || this.isVisible;
    },
    showSkeleton() {
      return !!this.isLoading || !this.shouldMount;
    },
    showArrows() {
      if (this.config?.showArrows === false) return false;
      if (this.config?.hideArrowsIfNoScroll !== false && !this.hasOverflow)
        return false;
      return true;
    },
  },

  methods: {
    checkScroll() {
      const el = this.$refs.rowRef;
      if (el) {
        this.hasOverflow = el.scrollWidth > el.clientWidth + 5;
        this.canScrollLeft = el.scrollLeft > 5;
        this.canScrollRight =
          el.scrollLeft + el.clientWidth < el.scrollWidth - 5;
      }
    },
    scroll(direction: "left" | "right") {
      const el = this.$refs.rowRef;
      if (el) {
        const scrollAmount = 300;
        el.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    },
  },
});
</script>