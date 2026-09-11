<template>
  <div
    ref="rootRef"
    :class="`cv-grid-banner ${className || ''}`"
    :style="{
      gridTemplateColumns: gridTemplateColumns,
      '--cv-grid-cols-tablet': columnsTabletVar,
      '--cv-grid-cols-mobile': columnsMobileVar,
      height: config?.height || '',
      minHeight: config?.minHeight || '',
    }"
  >
    <template :key="item.id || index" v-for="(item, index) in items">
      <a class="cv-grid-item" :href="item.mapLinks?.[0]?.url || undefined"
        ><div
          :class="`cv-grid-img-wrap ${showSkeleton ? 'cv-image-shimmer' : ''}`"
          :style="{
            height: config?.height || '',
            minHeight: config?.minHeight || '',
            aspectRatio: config?.height ? 'unset' : '16/9',
          }"
        >
          <template v-if="!showSkeleton">
            <template v-if="item.media?.type === 'video'">
              <video
                class="cv-grid-img"
                :src="item.media?.url"
                :autoPlay="true"
                :loop="true"
                :muted="true"
                :playsInline="true"
                :style="{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  objectPosition: config?.bgPosition || 'center',
                }"
              ></video>
            </template>

            <template v-if="item.media?.type !== 'video'">
              <img
                class="cv-grid-img"
                :src="item.media?.url"
                :alt="item.title"
                :style="{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  objectPosition: config?.bgPosition || 'center',
                }"
              />
            </template>
          </template>
        </div>
        <template v-if="showSkeleton">
          <div
            :style="{
              display: 'flex',
              flexDirection: 'column',
              alignItems: item.textAlignment || 'center',
              width: '100%',
              marginTop: '12px',
            }"
          >
            <div
              class="cv-skeleton-text cv-image-shimmer"
              :style="{
                width: '70%',
                height: '14px',
                margin: '0 0 6px 0',
              }"
            ></div>
            <div
              class="cv-skeleton-text cv-image-shimmer"
              :style="{
                width: '40%',
                height: '10px',
                margin: 0,
              }"
            ></div>
          </div>
        </template>

        <template v-if="!showSkeleton">
          <div
            class="cv-grid-title"
            :style="{
              textAlign: item.textAlignment || 'center',
            }"
          >
            {{ item.title }}
          </div>
        </template>
      </a>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { observeLazyMount } from "../utils/lazyObserver";

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
  /** Items per row on screens wider than 768px. Defaults to 3. */
  columns?: number;
  /**
   * Items per row at 768px and below. Omit to let the component break by
   * itself, which is 2 across.
   */
  columnsTablet?: number;
  /**
   * Items per row at 480px and below. Omit to inherit whatever the tablet
   * breakpoint resolved to, so setting only `columnsTablet` carries all the
   * way down rather than snapping back to the default on the smallest screens.
   */
  columnsMobile?: number;
  className?: string;
  isLoading?: boolean;
  config?: GridBannerConfig;
  lazyLoad?: boolean;
  lazyThreshold?: number;
  lazyRootMargin?: string;
}

export default defineComponent({
  name: "grid-banner",

  props: [
    "lazyLoad",
    "lazyThreshold",
    "lazyRootMargin",
    "isLoading",
    "columns",
    "columnsTablet",
    "columnsMobile",
    "className",
    "config",
    "items",
  ],

  data() {
    return { isVisible: false };
  },

  mounted() {
    if (this.lazyLoad === false) {
      this.isVisible = true;
      return;
    }
    if (this.$refs.rootRef) {
      this.$refs.observerBox.disconnect = observeLazyMount(
        this.$refs.rootRef,
        () => {
          this.isVisible = true;
        },
        this.lazyThreshold ?? 0.1,
        this.lazyRootMargin ?? "200px"
      );
    }
  },

  unmounted() {
    if (this.$refs.observerBox.disconnect) this.$refs.observerBox.disconnect();
  },

  computed: {
    shouldMount() {
      return this.lazyLoad === false || this.isVisible;
    },
    showSkeleton() {
      return !!this.isLoading || !this.shouldMount;
    },
    gridTemplateColumns() {
      const cols = this.columns || 3;
      return `repeat(${cols}, 1fr)`;
    },
    columnsTabletVar() {
      return `${this.columnsTablet || 2}`;
    },
    columnsMobileVar() {
      return `${this.columnsMobile || this.columnsTablet || 2}`;
    },
  },
});
</script>