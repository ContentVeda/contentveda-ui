<template>
  <div
    ref="rootRef"
    :class="`cv-timer-widget cv-timer-variant-${variant || 'dark'} ${
      hasBackgroundImage ? 'cv-timer-has-bg' : ''
    } ${className || ''}`"
    :style="{
      width: widthValue,
      height: fixedHeightValue || undefined,
      backgroundImage:
        hasBackgroundImage && !useImageForHeight
          ? `url(${backgroundImageUrl})`
          : undefined,
      backgroundPosition: backgroundPosition || 'center',
    }"
  >
    <template v-if="useImageForHeight">
      <img
        alt=""
        :src="backgroundImageUrl"
        :style="{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'cover',
          objectPosition: backgroundPosition || 'center',
        }"
      />
    </template>

    <template v-if="hasBackgroundImage">
      <div
        class="cv-timer-overlay"
        :style="{
          background: overlay || 'var(--cv-color-scrim, rgba(0, 0, 0, 0.45))',
        }"
      ></div>
    </template>

    <template v-if="backgroundEffectClass !== 'none'">
      <canvas
        class="cv-timer-bg-effect"
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

    <div
      class="cv-timer-content"
      :style="{
        position: contentOverlaysBox ? 'absolute' : 'relative',
        top: contentOverlaysBox ? 0 : undefined,
        left: contentOverlaysBox ? 0 : undefined,
        width: contentOverlaysBox ? '100%' : undefined,
        height: contentOverlaysBox ? '100%' : undefined,
      }"
    >
      <template v-if="title">
        <h3 class="cv-timer-title">{{ title }}</h3>
      </template>

      <template v-if="!isExpired">
        <div
          class="cv-timer-blocks"
          role="timer"
          aria-live="off"
          :aria-label="`Time remaining: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`"
        >
          <div class="cv-timer-block">
            <span class="cv-timer-value" aria-hidden="true">{{
              timeLeft.days
            }}</span
            ><span class="cv-timer-label" aria-hidden="true">Days</span>
          </div>
          <div class="cv-timer-block">
            <span class="cv-timer-value" aria-hidden="true">{{
              timeLeft.hours
            }}</span
            ><span class="cv-timer-label" aria-hidden="true">Hours</span>
          </div>
          <div class="cv-timer-block">
            <span class="cv-timer-value" aria-hidden="true">{{
              timeLeft.minutes
            }}</span
            ><span class="cv-timer-label" aria-hidden="true">Minutes</span>
          </div>
          <div class="cv-timer-block">
            <span class="cv-timer-value" aria-hidden="true">{{
              timeLeft.seconds
            }}</span
            ><span class="cv-timer-label" aria-hidden="true">Seconds</span>
          </div>
        </div>
      </template>

      <template v-if="!!isExpired && !!expiredText">
        <p class="cv-timer-expired">{{ expiredText }}</p>
      </template>
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

export default defineComponent({
  name: "timer-widget",

  props: [
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
  ],

  data() {
    return {
      timeLeft: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      timerId: null,
      isExpired: false,
      animContext: {
        animationFrameId: null,
        resizeHandler: null,
        resizeObserver: null,
      },
      observerBox: {
        disconnect: null as (() => void) | null,
      },
    };
  },

  mounted() {
    if (this.lazyLoad === false) {
      this.startTicking();
      if (this.$refs.canvasRef)
        this.plugin.start(
          this.$refs.canvasRef,
          this.backgroundEffectClass as BackgroundEffectName,
          this.animContext
        );
      return;
    }
    if (this.$refs.rootRef) {
      this.observerBox.disconnect = observeLazyMount(
        this.$refs.rootRef,
        () => {
          this.startTicking();
          if (this.$refs.canvasRef)
            this.plugin.start(
              this.$refs.canvasRef,
              this.backgroundEffectClass as BackgroundEffectName,
              this.animContext
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
        if (this.$refs.canvasRef)
          this.plugin.start(
            this.$refs.canvasRef,
            this.backgroundEffectClass as BackgroundEffectName,
            this.animContext
          );
      },
      immediate: true,
    },
  },
  unmounted() {
    if (this.timerId) clearInterval(this.timerId);
    if (this.observerBox.disconnect) this.observerBox.disconnect();
    this.plugin.stop(this.animContext);
  },

  computed: {
    hasBackgroundImage() {
      return !!this.backgroundImageUrl;
    },
    widthValue() {
      return this.width || "100%";
    },
    heightMode() {
      return this.height || "auto";
    },
    useImageForHeight() {
      return this.hasBackgroundImage && this.heightMode === "auto";
    },
    fixedHeightValue() {
      return this.heightMode !== "auto" ? this.heightMode : undefined;
    },
    contentOverlaysBox() {
      return this.useImageForHeight || !!this.fixedHeightValue;
    },
    backgroundEffectClass() {
      return this.backgroundEffect || "none";
    },
    plugin() {
      return this.backgroundEffectPlugin || defaultBackgroundEffectPlugin;
    },
    onUpdateHook0() {
      return {
        0: this.backgroundEffectClass,
        1: this.$refs.canvasRef,
      };
    },
  },

  methods: {
    calculateTimeLeft() {
      const difference =
        new Date(this.targetDate).getTime() - new Date().getTime();
      if (difference > 0) {
        this.isExpired = false;
        this.timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        this.isExpired = true;
        this.timeLeft = {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }
    },
    startTicking() {
      this.calculateTimeLeft();
      this.timerId = setInterval(() => {
        this.calculateTimeLeft();
      }, 1000);
    },
  },
});
</script>