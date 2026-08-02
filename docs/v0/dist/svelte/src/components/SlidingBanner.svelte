<svelte:options runes={false} />
<script context="module" lang="ts">
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
</script>

<script lang="ts">
  let latestNext = { fn: () => {} };
  let bgEffectContext = { animationFrameId: null, resizeHandler: null };
  let observerBox = { disconnect: null, row: null };
  import { afterUpdate, onDestroy, onMount } from "svelte";

  import { observeLazyMount } from "../utils/lazyObserver";
  import { defaultBackgroundEffectPlugin } from "../utils/backgroundEffects";
  import type {
    BackgroundEffectContext,
    BackgroundEffectName,
    BackgroundEffectPlugin,
  } from "../utils/backgroundEffects";

  export let lazyLoad: SlidingBannerProps["lazyLoad"];
  export let lazyThreshold: SlidingBannerProps["lazyThreshold"];
  export let lazyRootMargin: SlidingBannerProps["lazyRootMargin"];
  export let isLoading: SlidingBannerProps["isLoading"];
  let animContext = { intervalId: null, animationFrameId: null, resizeHandler: null, dimResizeHandler: null };
  export let config: SlidingBannerProps["config"];
  export let items: SlidingBannerProps["items"];
  export let className: SlidingBannerProps["className"];
  function stringifyStyles(stylesObj) {
    let styles = "";
    for (let key in stylesObj) {
      const dashedKey = key.replace(/[A-Z]/g, function (match) {
        return "-" + match.toLowerCase();
      });
      styles += dashedKey + ":" + stylesObj[key] + ";";
    }
    return styles;
  }

  function next() {
    if (!items?.length) return;
    direction = "next";
    previousIndex = currentIndex;
    if (currentIndex >= items.length - 1) {
      if (config?.rotateAgain !== false) {
        wrapping = true;
        currentIndex = 0;
      }
    } else {
      currentIndex = currentIndex + 1;
    }
  }
  function prev() {
    if (!items?.length) return;
    direction = "prev";
    previousIndex = currentIndex;
    if (currentIndex <= 0) {
      if (config?.rotateAgain !== false) {
        wrapping = true;
        currentIndex = items.length - 1;
      }
    } else {
      currentIndex = currentIndex - 1;
    }
  }
  function goTo(index: number) {
    if (currentIndex !== index) {
      direction = index > currentIndex ? "next" : "prev";
      previousIndex = currentIndex;
      currentIndex = index;
    }
  }
  function startAutoPlay() {
    if (animContext.intervalId) return;
    if (config?.autoStart !== false && items?.length > 1) {
      animContext.intervalId = setInterval(() => {
        latestNext.fn();
      }, config?.delayMs || 5000);
    }
  }
  function stopAutoPlay() {
    if (animContext.intervalId) {
      clearInterval(animContext.intervalId);
      animContext.intervalId = null;
    }
  }
  function setupDimensions() {
    if (rootRef) {
      rootRef.style.setProperty(
        "--slider-half-width",
        `${rootRef.offsetWidth / 2}px`
      );
    }
  }
  function mountHeavyContent() {
    startAutoPlay();
    setupDimensions();
    animContext.dimResizeHandler = () => setupDimensions();
    window.addEventListener("resize", animContext.dimResizeHandler);
    if (canvasRef) {
      plugin().start(
        canvasRef,
        backgroundClass() as BackgroundEffectName,
        bgEffectContext
      );
    }
  }
  $: shouldMount = () => {
    return lazyLoad === false || isVisible;
  };
  $: showSkeleton = () => {
    return !!isLoading || !shouldMount();
  };
  $: animationClass = () => {
    return config?.animationEffect || "slide";
  };
  $: backgroundClass = () => {
    return config?.backgroundEffect || "none";
  };
  $: plugin = () => {
    return config?.backgroundEffectPlugin || defaultBackgroundEffectPlugin;
  };
  $: qualityClass = () => {
    return config?.animationQuality || "detailed";
  };

  let rootRef;
  let canvasRef;

  let currentIndex = 0;
  let previousIndex = 0;
  let direction = "next";
  let isVisible = false;
  let wrapping = false;

  onMount(() => {
    if (lazyLoad === false) {
      isVisible = true;
      mountHeavyContent();
      return;
    }
    if (rootRef) {
      observerBox.disconnect = observeLazyMount(
        rootRef,
        () => {
          isVisible = true;
          mountHeavyContent();
        },
        lazyThreshold ?? 0.1,
        lazyRootMargin ?? "200px"
      );
    }
  });

  afterUpdate(() => {
    latestNext.fn = next;
  });

  function onUpdateFn_1(..._args: any[]) {
    if (wrapping) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          wrapping = false;
        });
      });
    }
  }

  $: onUpdateFn_1(...[wrapping]);

  function onUpdateFn_2(..._args: any[]) {
    if (isVisible && canvasRef) {
      plugin().start(
        canvasRef,
        backgroundClass() as BackgroundEffectName,
        bgEffectContext
      );
    }
  }

  $: onUpdateFn_2(...[backgroundClass(), canvasRef]);

  onDestroy(() => {
    stopAutoPlay();
    plugin().stop(bgEffectContext);
    // Same guard as RowScrollable: onDestroy also runs on the server. The
    // handler is only assigned in onMount so this branch is normally skipped
    // there, but the typeof check makes that safe by construction rather than
    // by coincidence.
    if (typeof window !== "undefined" && animContext.dimResizeHandler) {
      window.removeEventListener("resize", animContext.dimResizeHandler);
    }
    if (observerBox.disconnect) observerBox.disconnect();
  });
</script>

<div
  style={stringifyStyles({
    height: config?.height || "",
    minHeight: config?.height === "auto" ? "auto" : config?.minHeight || "",
  })}
  role="region"
  bind:this={rootRef}
  class={`cv-sliding-banner ${showSkeleton() ? "cv-image-shimmer" : ""} ${
    className || ""
  } effect-${animationClass()} bg-effect-${backgroundClass()} quality-${qualityClass()} ${
    config?.showDots ? "has-dots" : ""
  }`}
  on:mouseenter={(event) => {
    stopAutoPlay();
  }}
  on:mouseleave={(event) => {
    startAutoPlay();
  }}
>
  {#if backgroundClass() !== "none"}
    <canvas class="cv-sliding-banner-canvas" bind:this={canvasRef}></canvas>
  {/if}
  {#if config?.height === "auto" && items?.[0]?.media?.url}
    <img
      style={stringifyStyles({
        width: "100%",
        height: "auto",
        display: "block",
        visibility: "hidden",
        pointerEvents: "none",
      })}
      alt=""
      src={items[0].media.url}
    />
  {/if}
  <div
    style={stringifyStyles({
      transform: `translateX(-${currentIndex * 100}%)`,
      position: config?.height === "auto" ? "absolute" : "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    })}
    class={`cv-sliding-banner-track dir-${direction} ${
      wrapping ? "no-transition" : ""
    }`}
  >
    {#each items as item, index (item.id || index)}
      <div
        class={`cv-sliding-slide ${index === currentIndex ? "active" : ""} ${
          index === previousIndex && index !== currentIndex ? "previous" : ""
        }`}
      >
        {#if shouldMount() && item.media?.type === "video"}
          <video
            style={stringifyStyles({
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            })}
            src={item.media?.url}
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            class={`cv-sliding-bg-video ${
              showSkeleton() ? "cv-image-shimmer" : ""
            }`}></video>
        {/if}
        {#if shouldMount() && item.media?.type !== "video"}
          <div
            style={stringifyStyles({
              backgroundImage: item.media?.url
                ? `url(${item.media.url})`
                : "none",
              backgroundPosition: config?.bgPosition || "center",
            })}
            class={`cv-sliding-bg ${showSkeleton() ? "cv-image-shimmer" : ""}`}></div>
        {/if}
        {#if animationClass() === "curtain" && item.media?.type !== "video"}
          <div
            style={stringifyStyles({
              backgroundImage: item.media?.url
                ? `url(${item.media.url})`
                : "none",
              backgroundPosition: config?.bgPosition || "center",
            })}
            class="cv-curtain-panel cv-curtain-panel-left"></div>
          <div
            style={stringifyStyles({
              backgroundImage: item.media?.url
                ? `url(${item.media.url})`
                : "none",
              backgroundPosition: config?.bgPosition || "center",
            })}
            class="cv-curtain-panel cv-curtain-panel-right"></div>
        {/if}
        {#if animationClass() === "cube"}
          <div class="cv-cube-side"></div>
        {/if}
        <div class="cv-sliding-overlay"></div>
        <div
          style={stringifyStyles({
            textAlign: item.textAlignment || config?.align || "center",
            display: "flex",
            flexDirection: "column",
            alignItems:
              (item.textAlignment || config?.align || "center") === "center"
                ? "center"
                : (item.textAlignment || config?.align || "center") === "right"
                ? "flex-end"
                : "flex-start",
          })}
          class="cv-sliding-content"
        >
          {#if showSkeleton()}
            <div
              style={stringifyStyles({
                width: "50%",
                height: "32px",
                marginBottom: "16px",
              })}
              class="cv-skeleton-title cv-image-shimmer"></div>
            <div
              style={stringifyStyles({
                width: "70%",
                height: "16px",
                marginBottom: "10px",
              })}
              class="cv-skeleton-text cv-image-shimmer"></div>
            <div
              style={stringifyStyles({
                width: "40%",
                height: "16px",
                marginBottom: "24px",
              })}
              class="cv-skeleton-text cv-image-shimmer"></div>
            <div
              style={stringifyStyles({
                width: "130px",
                height: "40px",
              })}
              class="cv-skeleton-button cv-image-shimmer"></div>
          {/if}
          {#if !showSkeleton()}
            <h2 class="cv-sliding-title">{item.title}</h2>

            {#if item.subtitle}
              <p class="cv-sliding-subtitle">{item.subtitle}</p>
            {/if}

            {#if item.ctaText}
              <a
                class="cv-sliding-cta"
                href={item.mapLinks?.[0]?.url || undefined}>{item.ctaText}</a
              >
            {/if}
          {/if}
        </div>
      </div>
    {/each}
  </div>
  {#if (config?.showArrows || config?.showNextPrev) && (!config?.hideArrowsIfNoScroll || (items && items.length > 1))}
    <button
      type="button"
      class="cv-sliding-arrow prev"
      aria-label="Previous"
      on:click={(event) => {
        prev();
      }}
      ><svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"><path d="M15 19l-7-7 7-7" /></svg
      ></button
    >
    <button
      type="button"
      class="cv-sliding-arrow next"
      aria-label="Next"
      on:click={(event) => {
        next();
      }}
      ><svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"><path d="M9 5l7 7-7 7" /></svg
      ></button
    >
  {/if}
  {#if config?.showDots}
    <div class="cv-sliding-dots">
      {#each items as _, index (index)}
        <button
          type="button"
          class={`cv-sliding-dot ${index === currentIndex ? "active" : ""}`}
          aria-label={`Go to slide ${index + 1}`}
          on:click={(event) => {
            goTo(index);
          }}
        />
      {/each}
    </div>
  {/if}
</div>