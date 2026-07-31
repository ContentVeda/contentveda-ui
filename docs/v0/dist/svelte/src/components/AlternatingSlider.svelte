<svelte:options runes={false} />
<script context="module" lang="ts">
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
</script>

<script lang="ts">
  let observerBox = { disconnect: null };
  import { onDestroy, onMount } from "svelte";

  import { observeLazyMount } from "../utils/lazyObserver";

  export let lazyLoad: AlternatingSliderProps["lazyLoad"];
  export let lazyThreshold: AlternatingSliderProps["lazyThreshold"];
  export let lazyRootMargin: AlternatingSliderProps["lazyRootMargin"];
  export let isLoading: AlternatingSliderProps["isLoading"];
  export let config: AlternatingSliderProps["config"];
  export let items: AlternatingSliderProps["items"];
  export let className: AlternatingSliderProps["className"];
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
    if (totalSlides() <= 1) return;
    currentIndex = (currentIndex + 1) % totalSlides();
  }
  function prev() {
    if (totalSlides() <= 1) return;
    currentIndex = (currentIndex - 1 + totalSlides()) % totalSlides();
  }
  function goTo(index: number) {
    currentIndex = index;
  }
  function startAutoPlay() {
    if (config?.autoStart !== false && totalSlides() > 1) {
      intervalId = setInterval(() => {
        next();
      }, config?.delayMs || 5000);
    }
  }
  function stopAutoPlay() {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }
  $: shouldMount = () => {
    return lazyLoad === false || isVisible;
  };
  $: showSkeleton = () => {
    return !!isLoading || !shouldMount();
  };
  $: columns = () => {
    return config?.columns || 2;
  };
  $: slideSets = () => {
    const sets: WidgetItem[][] = [];
    const currentItems = items || [];
    const cols = columns();
    for (let i = 0; i < currentItems.length; i += cols) {
      sets.push(currentItems.slice(i, i + cols));
    }
    return sets;
  };
  $: totalSlides = () => {
    return slideSets().length;
  };

  let rootRef;

  let currentIndex = 0;
  let intervalId = null;
  let isVisible = false;

  onMount(() => {
    if (lazyLoad === false) {
      isVisible = true;
      startAutoPlay();
      return;
    }
    if (rootRef) {
      observerBox.disconnect = observeLazyMount(
        rootRef,
        () => {
          isVisible = true;
          startAutoPlay();
        },
        lazyThreshold ?? 0.1,
        lazyRootMargin ?? "200px"
      );
    }
  });

  onDestroy(() => {
    stopAutoPlay();
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
  class={`cv-alt-slider ${showSkeleton() ? "cv-image-shimmer" : ""} ${
    className || ""
  }`}
  on:mouseenter={(event) => {
    stopAutoPlay();
  }}
  on:mouseleave={(event) => {
    startAutoPlay();
  }}
>
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
      gridTemplateColumns: `repeat(${columns()}, 1fr)`,
      position: config?.height === "auto" ? "absolute" : "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    })}
    class="cv-alt-cols-container"
  >
    {#each Array.from({ length: columns() }) as _, colIndex (`col-${colIndex}`)}
      <div class="cv-alt-col">
        <div
          style={stringifyStyles({
            transform: `translateY(${
              colIndex % 2 === 0 ? -currentIndex * 100 : currentIndex * 100
            }%)`,
          })}
          class="cv-alt-track"
        >
          {#each slideSets() as slideRow, slideIndex (`cell-${slideIndex}-${colIndex}`)}
            <div
              style={stringifyStyles({
                top: `${
                  colIndex % 2 === 0 ? slideIndex * 100 : -slideIndex * 100
                }%`,
              })}
              class="cv-alt-cell"
            >
              {#if slideRow[colIndex]}
                {#if slideRow[colIndex].mapLinks?.[0]?.url}
                  <a
                    style={stringifyStyles({
                      display: "block",
                      textDecoration: "none",
                      color: "inherit",
                    })}
                    class="cv-alt-content-wrap"
                    href={slideRow[colIndex].mapLinks[0].url}
                  >
                    {#if shouldMount() && slideRow[colIndex].media?.type === "video"}
                      <video
                        style={stringifyStyles({
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        })}
                        src={slideRow[colIndex].media?.url}
                        autoPlay={true}
                        loop={true}
                        muted={true}
                        playsInline={true}
                        class={`cv-alt-bg-video ${
                          showSkeleton() ? "cv-image-shimmer" : ""
                        }`}
                      />
                    {/if}
                    {#if shouldMount() && slideRow[colIndex].media?.type !== "video"}
                      <div
                        style={stringifyStyles({
                          backgroundImage: slideRow[colIndex].media?.url
                            ? `url(${slideRow[colIndex].media.url})`
                            : "none",
                          backgroundPosition: config?.bgPosition || "center",
                        })}
                        class={`cv-alt-bg ${
                          showSkeleton() ? "cv-image-shimmer" : ""
                        }`}
                      />
                    {/if}
                    <div class="cv-alt-overlay" />
                    <div
                      style={stringifyStyles({
                        textAlign: slideRow[colIndex].textAlignment || "left",
                        display: "flex",
                        flexDirection: "column",
                        alignItems:
                          (slideRow[colIndex].textAlignment || "left") ===
                          "center"
                            ? "center"
                            : (slideRow[colIndex].textAlignment || "left") ===
                              "right"
                            ? "flex-end"
                            : "flex-start",
                      })}
                      class="cv-alt-content"
                    >
                      {#if showSkeleton()}
                        <div
                          style={stringifyStyles({
                            width: "60%",
                            height: "24px",
                            marginBottom: "12px",
                          })}
                          class="cv-skeleton-title cv-image-shimmer"
                        />
                        <div
                          style={stringifyStyles({
                            width: "80%",
                            height: "14px",
                            marginBottom: "8px",
                          })}
                          class="cv-skeleton-text cv-image-shimmer"
                        />
                        <div
                          style={stringifyStyles({
                            width: "50%",
                            height: "14px",
                            marginBottom: "16px",
                          })}
                          class="cv-skeleton-text cv-image-shimmer"
                        />
                        <div
                          style={stringifyStyles({
                            width: "110px",
                            height: "36px",
                          })}
                          class="cv-skeleton-button cv-image-shimmer"
                        />
                      {/if}
                      {#if !showSkeleton()}
                        <h2 class="cv-alt-title">{slideRow[colIndex].title}</h2>

                        {#if slideRow[colIndex].subtitle}
                          <p class="cv-alt-subtitle">
                            {slideRow[colIndex].subtitle}
                          </p>
                        {/if}

                        {#if slideRow[colIndex].ctaText}
                          <span class="cv-alt-cta"
                            >{slideRow[colIndex].ctaText}</span
                          >
                        {/if}
                      {/if}
                    </div></a
                  >
                {/if}

                {#if !slideRow[colIndex].mapLinks?.[0]?.url}
                  <div class="cv-alt-content-wrap">
                    {#if shouldMount() && slideRow[colIndex].media?.type === "video"}
                      <video
                        style={stringifyStyles({
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        })}
                        src={slideRow[colIndex].media?.url}
                        autoPlay={true}
                        loop={true}
                        muted={true}
                        playsInline={true}
                        class={`cv-alt-bg-video ${
                          showSkeleton() ? "cv-image-shimmer" : ""
                        }`}
                      />
                    {/if}
                    {#if shouldMount() && slideRow[colIndex].media?.type !== "video"}
                      <div
                        style={stringifyStyles({
                          backgroundImage: slideRow[colIndex].media?.url
                            ? `url(${slideRow[colIndex].media.url})`
                            : "none",
                          backgroundPosition: config?.bgPosition || "center",
                        })}
                        class={`cv-alt-bg ${
                          showSkeleton() ? "cv-image-shimmer" : ""
                        }`}
                      />
                    {/if}
                    <div class="cv-alt-overlay" />
                    <div
                      style={stringifyStyles({
                        textAlign: slideRow[colIndex].textAlignment || "left",
                        display: "flex",
                        flexDirection: "column",
                        alignItems:
                          (slideRow[colIndex].textAlignment || "left") ===
                          "center"
                            ? "center"
                            : (slideRow[colIndex].textAlignment || "left") ===
                              "right"
                            ? "flex-end"
                            : "flex-start",
                      })}
                      class="cv-alt-content"
                    >
                      {#if showSkeleton()}
                        <div
                          style={stringifyStyles({
                            width: "60%",
                            height: "24px",
                            marginBottom: "12px",
                          })}
                          class="cv-skeleton-title cv-image-shimmer"
                        />
                        <div
                          style={stringifyStyles({
                            width: "80%",
                            height: "14px",
                            marginBottom: "8px",
                          })}
                          class="cv-skeleton-text cv-image-shimmer"
                        />
                        <div
                          style={stringifyStyles({
                            width: "50%",
                            height: "14px",
                            marginBottom: "16px",
                          })}
                          class="cv-skeleton-text cv-image-shimmer"
                        />
                        <div
                          style={stringifyStyles({
                            width: "110px",
                            height: "36px",
                          })}
                          class="cv-skeleton-button cv-image-shimmer"
                        />
                      {/if}
                      {#if !showSkeleton()}
                        <h2 class="cv-alt-title">{slideRow[colIndex].title}</h2>

                        {#if slideRow[colIndex].subtitle}
                          <p class="cv-alt-subtitle">
                            {slideRow[colIndex].subtitle}
                          </p>
                        {/if}

                        {#if slideRow[colIndex].ctaText}
                          <span class="cv-alt-cta"
                            >{slideRow[colIndex].ctaText}</span
                          >
                        {/if}
                      {/if}
                    </div>
                  </div>
                {/if}
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
  {#if config?.showArrows && (!config?.hideArrowsIfNoScroll || slideSets().length > 1)}
    <button
      class="cv-alt-arrow prev"
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
      class="cv-alt-arrow next"
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
    <div class="cv-alt-dots">
      {#each slideSets() as _, index (`dot-${index}`)}
        <button
          class={`cv-alt-dot ${index === currentIndex ? "active" : ""}`}
          aria-label={`Go to slide ${index + 1}`}
          on:click={(event) => {
            goTo(index);
          }}
        />
      {/each}
    </div>
  {/if}
</div>