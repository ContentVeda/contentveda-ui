<template>
  <div ref="rootRef" :class="`cv-media-grid ${className || ''}`">
    <template v-if="showSkeleton">
      <div class="cv-media-primary cv-image-shimmer"></div>
      <div class="cv-media-secondary-col">
        <div class="cv-media-secondary-item cv-image-shimmer"></div>
        <div class="cv-media-secondary-item cv-image-shimmer"></div>
      </div>
    </template>

    <template v-if="!showSkeleton">
      <template v-if="primaryMedia">
        <a
          class="cv-media-primary"
          :href="primaryMedia.mapLinks?.[0]?.url || undefined"
          :aria-label="
            primaryMedia.mapLinks?.[0]?.url
              ? primaryMedia.altText || primaryMedia.title || 'Media content'
              : undefined
          "
        >
          <template v-if="primaryMedia.media?.type === 'video'">
            <video
              class="cv-media-asset"
              :src="primaryMedia.media?.url"
              :autoPlay="true"
              :loop="true"
              :muted="true"
              :playsInline="true"
            ></video>
          </template>

          <template v-if="primaryMedia.media?.type !== 'video'">
            <img
              class="cv-media-asset"
              :src="primaryMedia.media?.url"
              :alt="primaryMedia.altText || primaryMedia.title || ''"
            />
          </template>
        </a>
      </template>

      <template v-if="secondaryMedia && secondaryMedia.length > 0">
        <div class="cv-media-secondary-col">
          <template :key="item.id" v-for="(item, index) in secondaryMedia">
            <a
              class="cv-media-secondary-item"
              :href="item.mapLinks?.[0]?.url || undefined"
              :aria-label="
                item.mapLinks?.[0]?.url
                  ? item.altText || item.title || 'Media content'
                  : undefined
              "
            >
              <template v-if="item.media?.type === 'video'">
                <video
                  class="cv-media-asset"
                  :src="item.media?.url"
                  :autoPlay="true"
                  :loop="true"
                  :muted="true"
                  :playsInline="true"
                ></video>
              </template>

              <template v-if="item.media?.type !== 'video'">
                <img
                  class="cv-media-asset"
                  :src="item.media?.url"
                  :alt="item.altText || item.title || ''"
                />
              </template>
            </a>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { observeLazyMount } from "../utils/lazyObserver";

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

export default defineComponent({
  name: "media-grid",

  props: [
    "lazyLoad",
    "lazyThreshold",
    "lazyRootMargin",
    "isLoading",
    "className",
    "primaryMedia",
    "secondaryMedia",
  ],

  data() {
    return {
      isVisible: false,
      observerBox: {
        disconnect: null as (() => void) | null,
      },
    };
  },

  mounted() {
    if (this.lazyLoad === false) {
      this.isVisible = true;
      return;
    }
    if (this.$refs.rootRef) {
      this.observerBox.disconnect = observeLazyMount(
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
    if (this.observerBox.disconnect) this.observerBox.disconnect();
  },

  computed: {
    shouldMount() {
      return this.lazyLoad === false || this.isVisible;
    },
    showSkeleton() {
      return !!this.isLoading || !this.shouldMount;
    },
  },
});
</script>