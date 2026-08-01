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
    columns?: number;
    className?: string;
    isLoading?: boolean;
    config?: GridBannerConfig;
    lazyLoad?: boolean;
    lazyThreshold?: number;
    lazyRootMargin?: string;
  }
</script>

<script lang="ts">
  let observerBox = { disconnect: null };
  import { onDestroy, onMount } from "svelte";

  import { observeLazyMount } from "../utils/lazyObserver";

  export let lazyLoad: GridBannerProps["lazyLoad"];
  export let lazyThreshold: GridBannerProps["lazyThreshold"];
  export let lazyRootMargin: GridBannerProps["lazyRootMargin"];
  export let isLoading: GridBannerProps["isLoading"];
  export let columns: GridBannerProps["columns"];
  export let className: GridBannerProps["className"];
  export let config: GridBannerProps["config"];
  export let items: GridBannerProps["items"];
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

  $: shouldMount = () => {
    return lazyLoad === false || isVisible;
  };
  $: showSkeleton = () => {
    return !!isLoading || !shouldMount();
  };
  $: gridTemplateColumns = () => {
    const cols = columns || 3;
    return `repeat(${cols}, 1fr)`;
  };

  let rootRef;

  let isVisible = false;

  onMount(() => {
    if (lazyLoad === false) {
      isVisible = true;
      return;
    }
    if (rootRef) {
      observerBox.disconnect = observeLazyMount(
        rootRef,
        () => {
          isVisible = true;
        },
        lazyThreshold ?? 0.1,
        lazyRootMargin ?? "200px"
      );
    }
  });

  onDestroy(() => {
    if (observerBox.disconnect) observerBox.disconnect();
  });
</script>

<div
  style={stringifyStyles({
    gridTemplateColumns: gridTemplateColumns(),
    height: config?.height || "",
    minHeight: config?.minHeight || "",
  })}
  bind:this={rootRef}
  class={`cv-grid-banner ${className || ""}`}
>
  {#each items as item, index (item.id || index)}
    <a class="cv-grid-item" href={item.mapLinks?.[0]?.url || "#"}
      ><div
        style={stringifyStyles({
          height: config?.height || "",
          minHeight: config?.minHeight || "",
          aspectRatio: config?.height ? "unset" : "16/9",
        })}
        class={`cv-grid-img-wrap ${showSkeleton() ? "cv-image-shimmer" : ""}`}
      >
        {#if !showSkeleton()}
          {#if item.media?.type === "video"}
            <video
              style={stringifyStyles({
                objectFit: "cover",
                width: "100%",
                height: "100%",
                objectPosition: config?.bgPosition || "center",
              })}
              class="cv-grid-img"
              src={item.media?.url}
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}></video>
          {/if}

          {#if item.media?.type !== "video"}
            <img
              style={stringifyStyles({
                objectFit: "cover",
                width: "100%",
                height: "100%",
                objectPosition: config?.bgPosition || "center",
              })}
              class="cv-grid-img"
              src={item.media?.url}
              alt={item.title}
            />
          {/if}
        {/if}
      </div>
      {#if showSkeleton()}
        <div
          style={stringifyStyles({
            display: "flex",
            flexDirection: "column",
            alignItems: item.textAlignment || "center",
            width: "100%",
            marginTop: "12px",
          })}
        >
          <div
            style={stringifyStyles({
              width: "70%",
              height: "14px",
              margin: "0 0 6px 0",
            })}
            class="cv-skeleton-text cv-image-shimmer"></div>
          <div
            style={stringifyStyles({
              width: "40%",
              height: "10px",
              margin: 0,
            })}
            class="cv-skeleton-text cv-image-shimmer"></div>
        </div>
      {/if}
      {#if !showSkeleton()}
        <div
          style={stringifyStyles({
            textAlign: item.textAlignment || "center",
          })}
          class="cv-grid-title"
        >
          {item.title}
        </div>
      {/if}</a
    >
  {/each}
</div>