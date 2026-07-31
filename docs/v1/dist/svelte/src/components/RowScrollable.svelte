<svelte:options runes={false} />
<script context="module" lang="ts">
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
</script>

<script lang="ts">
  let observerBox = { disconnect: null };
  import { onDestroy, onMount } from "svelte";

  import { observeLazyMount } from "../utils/lazyObserver";

  export let lazyLoad: RowScrollableProps["lazyLoad"];
  export let lazyThreshold: RowScrollableProps["lazyThreshold"];
  export let lazyRootMargin: RowScrollableProps["lazyRootMargin"];
  export let isLoading: RowScrollableProps["isLoading"];
  export let className: RowScrollableProps["className"];
  export let title: RowScrollableProps["title"];
  export let config: RowScrollableProps["config"];
  export let items: RowScrollableProps["items"];
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

  function checkScroll() {
    const el = rowRef;
    if (el) {
      canScrollLeft = el.scrollLeft > 5;
      canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 5;
    }
  }
  function scroll(direction: "left" | "right") {
    const el = rowRef;
    if (el) {
      const scrollAmount = 300;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }
  $: shouldMount = () => {
    return lazyLoad === false || isVisible;
  };
  $: showSkeleton = () => {
    return !!isLoading || !shouldMount();
  };

  let containerRef;
  let rowRef;

  let canScrollLeft = false;
  let canScrollRight = false;
  let isVisible = false;

  onMount(() => {
    const el = rowRef;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      // Allow DOM to render then check
      setTimeout(() => {
        checkScroll();
      }, 150);
    }
    window.addEventListener("resize", checkScroll);
    if (lazyLoad === false) {
      isVisible = true;
      return;
    }
    if (containerRef) {
      observerBox.disconnect = observeLazyMount(
        containerRef,
        () => {
          isVisible = true;
        },
        lazyThreshold ?? 0.1,
        lazyRootMargin ?? "200px"
      );
    }
  });

  onDestroy(() => {
    const el = rowRef;
    if (el) {
      el.removeEventListener("scroll", checkScroll);
    }
    window.removeEventListener("resize", checkScroll);
    if (observerBox.disconnect) observerBox.disconnect();
  });
</script>

<div
  bind:this={containerRef}
  class={`cv-scrollable-container ${className || ""}`}
>
  {#if title}
    <h3 class="cv-scrollable-title">{title}</h3>
  {/if}
  <div
    style={stringifyStyles({
      position: "relative",
    })}
    class="cv-scrollable-wrapper"
  >
    <div
      bind:this={rowRef}
      class={`cv-scrollable-row ${
        config?.hideScrollbar ? "cv-scrollable-hide-scrollbar" : ""
      }`}
    >
      {#each items as item (item.id)}
        <a
          href={item.mapLinks?.[0]?.url || "#"}
          class={`cv-scrollable-card ${
            showSkeleton() ? "cv-image-shimmer" : ""
          }`}
        >
          {#if !showSkeleton()}
            {#if item.media?.url}
              <div class="cv-scrollable-img-wrap">
                {#if item.media?.type === "video"}
                  <video
                    class="cv-scrollable-img"
                    src={item.media?.url}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    playsInline={true}
                  />
                {/if}
                {#if item.media?.type !== "video"}
                  <img
                    class="cv-scrollable-img"
                    src={item.media?.url}
                    alt={item.title || ""}
                  />
                {/if}
              </div>
            {/if}
            <div class="cv-scrollable-body">
              {#if item.title}
                <div class="cv-scrollable-card-title">{item.title}</div>
              {/if}
              {#if item.subtitle}
                <div class="cv-scrollable-card-sub">{item.subtitle}</div>
              {/if}
            </div>
          {/if}</a
        >
      {/each}
    </div>
    {#if config?.showArrows !== false}
      {#if !config?.hideArrowsIfNoScroll || canScrollLeft}
        <button
          style={stringifyStyles({
            opacity: !canScrollLeft ? "0.35" : "1",
            pointerEvents: !canScrollLeft ? "none" : "auto",
          })}
          class="cv-scrollable-arrow prev"
          aria-label="Previous"
          on:click={(event) => {
            scroll("left");
          }}
          ><svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"><path d="M15 19l-7-7 7-7" /></svg
          ></button
        >
      {/if}

      {#if !config?.hideArrowsIfNoScroll || canScrollRight}
        <button
          style={stringifyStyles({
            opacity: !canScrollRight ? "0.35" : "1",
            pointerEvents: !canScrollRight ? "none" : "auto",
          })}
          class="cv-scrollable-arrow next"
          aria-label="Next"
          on:click={(event) => {
            scroll("right");
          }}
          ><svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"><path d="M9 5l7 7-7 7" /></svg
          ></button
        >
      {/if}
    {/if}
  </div>
</div>