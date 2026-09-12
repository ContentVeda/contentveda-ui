<template>
  <div
    role="region"
    ref="rootRef"
    :class="`cv-alt-slider ${showSkeleton ? 'cv-image-shimmer' : ''} ${
      className || ''
    }`"
    @mouseenter="async (event) => stopAutoPlay()"
    @mouseleave="async (event) => startAutoPlay()"
    :style="{
      height: config?.height || '',
      minHeight: config?.height === 'auto' ? 'auto' : config?.minHeight || '',
    }"
  >
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
      class="cv-alt-cols-container"
      :style="{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        position: config?.height === 'auto' ? 'absolute' : 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }"
    >
      <template
        :key="`col-${colIndex}`"
        v-for="(_, colIndex) in Array.from({
          length: columns,
        })"
      >
        <div class="cv-alt-col">
          <div
            class="cv-alt-track"
            :style="{
              transform: `translateY(${
                colIndex % 2 === 0 ? -currentIndex * 100 : currentIndex * 100
              }%)`,
            }"
          >
            <template
              :key="`cell-${slideIndex}-${colIndex}`"
              v-for="(slideRow, slideIndex) in slideSets"
            >
              <div
                class="cv-alt-cell"
                :style="{
                  top: `${
                    colIndex % 2 === 0 ? slideIndex * 100 : -slideIndex * 100
                  }%`,
                }"
              >
                <template v-if="slideRow[colIndex]">
                  <template v-if="slideRow[colIndex].mapLinks?.[0]?.url">
                    <a
                      class="cv-alt-content-wrap"
                      :href="slideRow[colIndex].mapLinks[0].url"
                      :style="{
                        display: 'block',
                        textDecoration: 'none',
                        color: 'inherit',
                      }"
                    >
                      <template
                        v-if="
                          shouldMount &&
                          slideRow[colIndex].media?.type === 'video'
                        "
                      >
                        <video
                          :src="slideRow[colIndex].media?.url"
                          :autoPlay="true"
                          :loop="true"
                          :muted="true"
                          :playsInline="true"
                          :class="`cv-alt-bg-video ${
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

                      <template
                        v-if="
                          shouldMount &&
                          slideRow[colIndex].media?.type !== 'video'
                        "
                      >
                        <div
                          :style="{
                            backgroundImage: slideRow[colIndex].media?.url
                              ? `url(${slideRow[colIndex].media.url})`
                              : 'none',
                            backgroundPosition: config?.bgPosition || 'center',
                          }"
                          :class="`cv-alt-bg ${
                            showSkeleton ? 'cv-image-shimmer' : ''
                          }`"
                        ></div>
                      </template>

                      <div class="cv-alt-overlay"></div>
                      <div
                        class="cv-alt-content"
                        :style="{
                          textAlign: slideRow[colIndex].textAlignment || 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems:
                            (slideRow[colIndex].textAlignment || 'left') ===
                            'center'
                              ? 'center'
                              : (slideRow[colIndex].textAlignment || 'left') ===
                                'right'
                              ? 'flex-end'
                              : 'flex-start',
                        }"
                      >
                        <template v-if="showSkeleton">
                          <div
                            class="cv-skeleton-title cv-image-shimmer"
                            :style="{
                              width: '60%',
                              height: '24px',
                              marginBottom: '12px',
                            }"
                          ></div>
                          <div
                            class="cv-skeleton-text cv-image-shimmer"
                            :style="{
                              width: '80%',
                              height: '14px',
                              marginBottom: '8px',
                            }"
                          ></div>
                          <div
                            class="cv-skeleton-text cv-image-shimmer"
                            :style="{
                              width: '50%',
                              height: '14px',
                              marginBottom: '16px',
                            }"
                          ></div>
                          <div
                            class="cv-skeleton-button cv-image-shimmer"
                            :style="{
                              width: '110px',
                              height: '36px',
                            }"
                          ></div>
                        </template>

                        <template v-if="!showSkeleton">
                          <h2 class="cv-alt-title">
                            {{ slideRow[colIndex].title }}
                          </h2>

                          <template v-if="slideRow[colIndex].subtitle">
                            <p class="cv-alt-subtitle">
                              {{ slideRow[colIndex].subtitle }}
                            </p>
                          </template>

                          <template v-if="slideRow[colIndex].ctaText">
                            <span class="cv-alt-cta">{{
                              slideRow[colIndex].ctaText
                            }}</span>
                          </template>
                        </template>
                      </div></a
                    >
                  </template>

                  <template v-if="!slideRow[colIndex].mapLinks?.[0]?.url">
                    <div class="cv-alt-content-wrap">
                      <template
                        v-if="
                          shouldMount &&
                          slideRow[colIndex].media?.type === 'video'
                        "
                      >
                        <video
                          :src="slideRow[colIndex].media?.url"
                          :autoPlay="true"
                          :loop="true"
                          :muted="true"
                          :playsInline="true"
                          :class="`cv-alt-bg-video ${
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

                      <template
                        v-if="
                          shouldMount &&
                          slideRow[colIndex].media?.type !== 'video'
                        "
                      >
                        <div
                          :style="{
                            backgroundImage: slideRow[colIndex].media?.url
                              ? `url(${slideRow[colIndex].media.url})`
                              : 'none',
                            backgroundPosition: config?.bgPosition || 'center',
                          }"
                          :class="`cv-alt-bg ${
                            showSkeleton ? 'cv-image-shimmer' : ''
                          }`"
                        ></div>
                      </template>

                      <div class="cv-alt-overlay"></div>
                      <div
                        class="cv-alt-content"
                        :style="{
                          textAlign: slideRow[colIndex].textAlignment || 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems:
                            (slideRow[colIndex].textAlignment || 'left') ===
                            'center'
                              ? 'center'
                              : (slideRow[colIndex].textAlignment || 'left') ===
                                'right'
                              ? 'flex-end'
                              : 'flex-start',
                        }"
                      >
                        <template v-if="showSkeleton">
                          <div
                            class="cv-skeleton-title cv-image-shimmer"
                            :style="{
                              width: '60%',
                              height: '24px',
                              marginBottom: '12px',
                            }"
                          ></div>
                          <div
                            class="cv-skeleton-text cv-image-shimmer"
                            :style="{
                              width: '80%',
                              height: '14px',
                              marginBottom: '8px',
                            }"
                          ></div>
                          <div
                            class="cv-skeleton-text cv-image-shimmer"
                            :style="{
                              width: '50%',
                              height: '14px',
                              marginBottom: '16px',
                            }"
                          ></div>
                          <div
                            class="cv-skeleton-button cv-image-shimmer"
                            :style="{
                              width: '110px',
                              height: '36px',
                            }"
                          ></div>
                        </template>

                        <template v-if="!showSkeleton">
                          <h2 class="cv-alt-title">
                            {{ slideRow[colIndex].title }}
                          </h2>

                          <template v-if="slideRow[colIndex].subtitle">
                            <p class="cv-alt-subtitle">
                              {{ slideRow[colIndex].subtitle }}
                            </p>
                          </template>

                          <template v-if="slideRow[colIndex].ctaText">
                            <span class="cv-alt-cta">{{
                              slideRow[colIndex].ctaText
                            }}</span>
                          </template>
                        </template>
                      </div>
                    </div>
                  </template>
                </template>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    <template
      v-if="
        config?.showArrows &&
        (!config?.hideArrowsIfNoScroll || slideSets.length > 1)
      "
    >
      <button
        type="button"
        class="cv-alt-arrow prev"
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
        class="cv-alt-arrow next"
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
      <div class="cv-alt-dots">
        <template :key="`dot-${index}`" v-for="(_, index) in slideSets">
          <button
            type="button"
            :class="`cv-alt-dot ${index === currentIndex ? 'active' : ''}`"
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

export interface BannerMedia {
  type?: string;
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
export interface AlternatingConfig {
  columns: number;
  autoStart: boolean;
  delayMs: number;
  showArrows: boolean;
  showDots: boolean;
  hideArrowsIfNoScroll?: boolean;
  height?: string;
  minHeight?: string;
  bgPosition?: string;
}
export interface AlternatingSliderProps {
  items: WidgetItem[];
  config?: AlternatingConfig;
  className?: string;
  isLoading?: boolean;
  lazyLoad?: boolean;
  lazyThreshold?: number;
  lazyRootMargin?: string;
}

export default defineComponent({
  name: "alternating-slider",

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
      intervalId: null,
      isVisible: false,
      observerBox: {
        disconnect: null as (() => void) | null,
      },
    };
  },

  mounted() {
    if (this.lazyLoad === false) {
      this.isVisible = true;
      this.startAutoPlay();
      return;
    }
    if (this.$refs.rootRef) {
      this.observerBox.disconnect = observeLazyMount(
        this.$refs.rootRef,
        () => {
          this.isVisible = true;
          this.startAutoPlay();
        },
        this.lazyThreshold ?? 0.1,
        this.lazyRootMargin ?? "200px"
      );
    }
  },

  unmounted() {
    this.stopAutoPlay();
    if (this.observerBox.disconnect) this.observerBox.disconnect();
  },

  computed: {
    shouldMount() {
      return this.lazyLoad === false || this.isVisible;
    },
    showSkeleton() {
      return !!this.isLoading || !this.shouldMount;
    },
    columns() {
      return this.config?.columns || 2;
    },
    slideSets() {
      const sets: WidgetItem[][] = [];
      const currentItems = this.items || [];
      const cols = this.columns;
      for (let i = 0; i < currentItems.length; i += cols) {
        sets.push(currentItems.slice(i, i + cols));
      }
      return sets;
    },
    totalSlides() {
      return this.slideSets.length;
    },
  },

  methods: {
    next() {
      if (this.totalSlides <= 1) return;
      this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    },
    prev() {
      if (this.totalSlides <= 1) return;
      this.currentIndex =
        (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    },
    goTo(index: number) {
      this.currentIndex = index;
    },
    startAutoPlay() {
      if (this.config?.autoStart !== false && this.totalSlides > 1) {
        this.intervalId = setInterval(() => {
          this.next();
        }, this.config?.delayMs || 5000);
      }
    },
    stopAutoPlay() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    },
  },
});
</script>