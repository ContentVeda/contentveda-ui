<svelte:options runes={false} />
<script context="module" lang="ts">
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
</script>

<script lang="ts">
  let observerBox = { disconnect: null, row: null };
  import { onDestroy, onMount } from "svelte";

  import { observeLazyMount } from "../utils/lazyObserver";

  export let lazyLoad: MediaGridProps["lazyLoad"];
  export let lazyThreshold: MediaGridProps["lazyThreshold"];
  export let lazyRootMargin: MediaGridProps["lazyRootMargin"];
  export let isLoading: MediaGridProps["isLoading"];
  export let className: MediaGridProps["className"];
  export let primaryMedia: MediaGridProps["primaryMedia"];
  export let secondaryMedia: MediaGridProps["secondaryMedia"];

  $: shouldMount = () => {
    return lazyLoad === false || isVisible;
  };
  $: showSkeleton = () => {
    return !!isLoading || !shouldMount();
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

<div bind:this={rootRef} class={`cv-media-grid ${className || ""}`}>
  {#if showSkeleton()}
    <div class="cv-media-primary cv-image-shimmer"></div>
    <div class="cv-media-secondary-col">
      <div class="cv-media-secondary-item cv-image-shimmer"></div>
      <div class="cv-media-secondary-item cv-image-shimmer"></div>
    </div>
  {/if}
  {#if !showSkeleton()}
    {#if primaryMedia}
      <a
        class="cv-media-primary"
        href={primaryMedia.mapLinks?.[0]?.url || undefined}
      >
        {#if primaryMedia.media?.type === "video"}
          <video
            class="cv-media-asset"
            src={primaryMedia.media?.url}
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}></video>
        {/if}
        {#if primaryMedia.media?.type !== "video"}
          <img
            class="cv-media-asset"
            src={primaryMedia.media?.url}
            alt={primaryMedia.altText || primaryMedia.title || ""}
          />
        {/if}</a
      >
    {/if}

    {#if secondaryMedia && secondaryMedia.length > 0}
      <div class="cv-media-secondary-col">
        {#each secondaryMedia as item (item.id)}
          <a
            class="cv-media-secondary-item"
            href={item.mapLinks?.[0]?.url || undefined}
          >
            {#if item.media?.type === "video"}
              <video
                class="cv-media-asset"
                src={item.media?.url}
                autoPlay={true}
                loop={true}
                muted={true}
                playsInline={true}></video>
            {/if}
            {#if item.media?.type !== "video"}
              <img
                class="cv-media-asset"
                src={item.media?.url}
                alt={item.altText || item.title || ""}
              />
            {/if}</a
          >
        {/each}
      </div>
    {/if}
  {/if}
</div>