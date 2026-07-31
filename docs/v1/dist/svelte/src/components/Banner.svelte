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

  export interface BannerConfig {
    align?: "left" | "center" | "right";
    textAlignment?: "left" | "center" | "right";
    padding?: "sm" | "md" | "lg" | "xl" | string;
    bgGradient?: string;
    autoplay?: boolean;
    height?: string;
    minHeight?: string;
    bgPosition?: string;
    hotspotMinTargetSize?: number;
    backgroundEffect?: BackgroundEffectName;
    backgroundEffectPlugin?: BackgroundEffectPlugin;
  }

  export type HotspotShape = "rect" | "oval" | "polygon";

  export interface HotspotCoords {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  export interface HotspotPoint {
    x: number;
    y: number;
  }

  export interface HotspotAction {
    type: "link" | "deeplink";
    url: string;
    deeplink?: string;
  }

  export interface Hotspot {
    id: string;
    label?: string;
    altText: string;
    shape: HotspotShape;
    coords: HotspotCoords;
    points?: HotspotPoint[];
    action: HotspotAction;
    showTooltip?: boolean;
    pulse?: boolean;
  }

  export interface BannerProps {
    id?: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    media?: BannerMedia;
    mapLinks?: MapLink[];
    textAlignment?: "left" | "center" | "right";
    className?: string;
    isLoading?: boolean;
    align?: "left" | "center" | "right";
    backgroundImageUrl?: string;
    ctaLink?: string;
    padding?: "sm" | "md" | "lg" | "xl" | string;
    bgGradient?: string;
    config?: BannerConfig;
    hotspots?: Hotspot[];
    lazyLoad?: boolean;
    lazyThreshold?: number;
    lazyRootMargin?: string;
  }
</script>

<script lang="ts">
  let animContext = { animationFrameId: null, resizeHandler: null };
  let observerBox = { disconnect: null };
  import { onDestroy, onMount } from "svelte";

  import { observeLazyMount } from "../utils/lazyObserver";
  import { defaultBackgroundEffectPlugin } from "../utils/backgroundEffects";
  import type {
    BackgroundEffectContext,
    BackgroundEffectName,
    BackgroundEffectPlugin,
  } from "../utils/backgroundEffects";

  export let lazyLoad: BannerProps["lazyLoad"];
  export let lazyThreshold: BannerProps["lazyThreshold"];
  export let lazyRootMargin: BannerProps["lazyRootMargin"];
  export let isLoading: BannerProps["isLoading"];
  export let textAlignment: BannerProps["textAlignment"];
  export let align: BannerProps["align"];
  export let config: BannerProps["config"];
  export let media: BannerProps["media"];
  export let backgroundImageUrl: BannerProps["backgroundImageUrl"];
  export let mapLinks: BannerProps["mapLinks"];
  export let ctaLink: BannerProps["ctaLink"];
  export let bgGradient: BannerProps["bgGradient"];
  export let padding: BannerProps["padding"];
  export let className: BannerProps["className"];
  export let hotspots: BannerProps["hotspots"];
  export let title: BannerProps["title"];
  export let subtitle: BannerProps["subtitle"];
  export let ctaText: BannerProps["ctaText"];
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

  function hotspotHref(h: Hotspot) {
    return h.action?.type === "deeplink"
      ? h.action.deeplink || h.action.url || "#"
      : h.action?.url || "#";
  }
  function hotspotLabel(h: Hotspot) {
    return h.altText || h.label || "Hotspot link";
  }
  function hotspotPolygonPoints(h: Hotspot) {
    if (!h.points?.length) return "";
    return h.points.map((p) => `${p.x},${p.y}`).join(" ");
  }
  function hotspotCenter(h: Hotspot) {
    return {
      x: h.coords.x + h.coords.width / 2,
      y: h.coords.y + h.coords.height / 2,
    };
  }
  function hotspotHitStyle(h: Hotspot) {
    const c = hotspotCenter(h);
    return {
      position: "absolute",
      left: `${c.x}%`,
      top: `${c.y}%`,
      width: `${h.coords.width}%`,
      height: `${h.coords.height}%`,
      minWidth: `${hotspotMinTarget()}px`,
      minHeight: `${hotspotMinTarget()}px`,
      transform: "translate(-50%, -50%)",
    };
  }
  $: shouldMount = () => {
    return lazyLoad === false || isVisible;
  };
  $: showSkeleton = () => {
    return !!isLoading || !shouldMount();
  };
  $: alignment = () => {
    return (
      textAlignment ||
      align ||
      config?.textAlignment ||
      config?.align ||
      "center"
    );
  };
  $: hasVideo = () => {
    return (
      media?.type === "video" ||
      (backgroundImageUrl && backgroundImageUrl.endsWith(".mp4")) ||
      (media?.url && media.url.endsWith(".mp4"))
    );
  };
  $: videoUrl = () => {
    return media?.url || backgroundImageUrl || "";
  };
  $: imageUrl = () => {
    return media?.url || backgroundImageUrl || "";
  };
  $: linkUrl = () => {
    return mapLinks?.[0]?.url || ctaLink || "#";
  };
  $: gradientOverlay = () => {
    return config?.bgGradient || bgGradient || "";
  };
  $: paddingValue = () => {
    const p = config?.padding || padding;
    if (p === "sm") return "var(--cv-spacing-sm)";
    if (p === "md") return "var(--cv-spacing-md)";
    if (p === "lg") return "var(--cv-spacing-lg)";
    if (p === "xl") return "var(--cv-spacing-xl)";
    return p || "";
  };
  $: backgroundPosition = () => {
    return config?.bgPosition || "";
  };
  $: minHeightValue = () => {
    if (config?.height === "auto") return "auto";
    return config?.minHeight || config?.height || "300px";
  };
  $: hotspotMinTarget = () => {
    return config?.hotspotMinTargetSize ?? 24;
  };
  $: backgroundEffectClass = () => {
    return config?.backgroundEffect || "none";
  };
  $: plugin = () => {
    return config?.backgroundEffectPlugin || defaultBackgroundEffectPlugin;
  };

  let rootRef;
  let canvasRef;

  let isVisible = false;

  onMount(() => {
    if (lazyLoad === false) {
      isVisible = true;
      if (canvasRef)
        plugin().start(
          canvasRef,
          backgroundEffectClass() as BackgroundEffectName,
          animContext
        );
      return;
    }
    if (rootRef) {
      observerBox.disconnect = observeLazyMount(
        rootRef,
        () => {
          isVisible = true;
          if (canvasRef)
            plugin().start(
              canvasRef,
              backgroundEffectClass() as BackgroundEffectName,
              animContext
            );
        },
        lazyThreshold ?? 0.1,
        lazyRootMargin ?? "200px"
      );
    }
  });

  function onUpdateFn_0(..._args: any[]) {
    if (isVisible && canvasRef)
      plugin().start(
        canvasRef,
        backgroundEffectClass() as BackgroundEffectName,
        animContext
      );
  }

  $: onUpdateFn_0(...[backgroundEffectClass(), canvasRef]);

  onDestroy(() => {
    if (observerBox.disconnect) observerBox.disconnect();
    plugin().stop(animContext);
  });
</script>

<div
  style={stringifyStyles({
    backgroundImage:
      shouldMount() &&
      !isLoading &&
      !hasVideo() &&
      imageUrl() &&
      config?.height !== "auto"
        ? `url(${imageUrl()})`
        : "none",
    textAlign: alignment(),
    backgroundPosition: backgroundPosition() || "center",
    minHeight: minHeightValue() || "",
    height: config?.height || "",
  })}
  bind:this={rootRef}
  class={`cv-banner ${showSkeleton() ? "cv-image-shimmer" : ""} ${
    className || ""
  }`}
>
  {#if shouldMount() && !isLoading && hasVideo()}
    <video
      style={stringifyStyles({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
      })}
      src={videoUrl()}
      autoPlay={true}
      loop={true}
      muted={true}
      playsInline={true}
    />
  {/if}
  {#if shouldMount() && !isLoading && !hasVideo() && imageUrl() && config?.height === "auto"}
    <img
      style={stringifyStyles({
        width: "100%",
        height: "auto",
        display: "block",
        zIndex: 0,
        objectFit: "cover",
        objectPosition: backgroundPosition() || "center",
      })}
      alt=""
      src={imageUrl()}
    />
  {/if}
  {#if !!config?.backgroundEffect && config.backgroundEffect !== "none"}
    <canvas
      style={stringifyStyles({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      })}
      class="cv-banner-bg-effect"
      aria-hidden="true"
      bind:this={canvasRef}
    />
  {/if}
  {#if shouldMount() && !!hotspots?.length}
    <div
      style={stringifyStyles({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
      })}
      class="cv-banner-hotspots"
    >
      <svg
        class="cv-banner-hotspots-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {#each hotspots as h (`${h.id}-visual`)}
          <g
            ><g class={`cv-hotspot-visual cv-hotspot-visual-${h.shape}`}>
              {#if h.shape === "rect"}
                <rect
                  vector-effect="non-scaling-stroke"
                  x={h.coords.x}
                  y={h.coords.y}
                  width={h.coords.width}
                  height={h.coords.height}
                />
              {/if}
              {#if h.shape === "oval"}
                <ellipse
                  vector-effect="non-scaling-stroke"
                  cx={h.coords.x + h.coords.width / 2}
                  cy={h.coords.y + h.coords.height / 2}
                  rx={h.coords.width / 2}
                  ry={h.coords.height / 2}
                />
              {/if}
              {#if h.shape === "polygon"}
                <polygon
                  vector-effect="non-scaling-stroke"
                  points={hotspotPolygonPoints(h)}
                />
              {/if}
              {#if h.pulse}
                {#if h.shape === "rect"}
                  <rect
                    class="cv-hotspot-pulse-ring"
                    vector-effect="non-scaling-stroke"
                    x={h.coords.x}
                    y={h.coords.y}
                    width={h.coords.width}
                    height={h.coords.height}
                  />
                {/if}
              {/if}
              {#if h.pulse}
                {#if h.shape === "oval"}
                  <ellipse
                    class="cv-hotspot-pulse-ring"
                    vector-effect="non-scaling-stroke"
                    cx={h.coords.x + h.coords.width / 2}
                    cy={h.coords.y + h.coords.height / 2}
                    rx={h.coords.width / 2}
                    ry={h.coords.height / 2}
                  />
                {/if}
              {/if}
              {#if h.pulse}
                {#if h.shape === "polygon"}
                  <polygon
                    class="cv-hotspot-pulse-ring"
                    vector-effect="non-scaling-stroke"
                    points={hotspotPolygonPoints(h)}
                  />
                {/if}
              {/if}</g
            ></g
          >
        {/each}
      </svg>
      {#each hotspots as h (h.id)}
        <div>
          <div
            style={stringifyStyles(hotspotHitStyle(h))}
            class="cv-hotspot-hit"
          >
            <a
              href={hotspotHref(h)}
              aria-label={hotspotLabel(h)}
              aria-describedby={h.showTooltip
                ? `cv-hotspot-tip-${h.id}`
                : undefined}
              class={`cv-hotspot cv-hotspot-${h.shape}`}
            >
              {#if !!h.showTooltip}
                <span
                  role="tooltip"
                  class="cv-hotspot-tooltip"
                  id={`cv-hotspot-tip-${h.id}`}>{h.label || h.altText}</span
                >
              {/if}</a
            >
          </div>
        </div>
      {/each}
    </div>
  {/if}
  <div
    style={stringifyStyles({
      zIndex: 1,
      position: config?.height === "auto" ? "absolute" : "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: gradientOverlay() || "rgba(0, 0, 0, 0.4)",
      padding: paddingValue() || "var(--cv-spacing-xl)",
    })}
    class="cv-banner-overlay"
  >
    <div
      style={stringifyStyles({
        display: "flex",
        flexDirection: "column",
        alignItems:
          alignment() === "center"
            ? "center"
            : alignment() === "right"
            ? "flex-end"
            : "flex-start",
      })}
      class="cv-banner-content"
    >
      {#if showSkeleton()}
        <div
          style={stringifyStyles({
            width: "60%",
            height: "36px",
            marginBottom: "16px",
          })}
          class="cv-skeleton-title cv-image-shimmer"
        />
        <div
          style={stringifyStyles({
            width: "80%",
            height: "18px",
            marginBottom: "10px",
          })}
          class="cv-skeleton-text cv-image-shimmer"
        />
        <div
          style={stringifyStyles({
            width: "50%",
            height: "18px",
            marginBottom: "24px",
          })}
          class="cv-skeleton-text cv-image-shimmer"
        />
        <div
          style={stringifyStyles({
            width: "140px",
            height: "42px",
          })}
          class="cv-skeleton-button cv-image-shimmer"
        />
      {/if}
      {#if !showSkeleton()}
        {#if title}
          <h2 class="cv-banner-title">{title}</h2>
        {/if}

        {#if subtitle}
          <p class="cv-banner-subtitle">{subtitle}</p>
        {/if}

        {#if ctaText}
          <a class="cv-banner-cta" href={linkUrl()}>{ctaText}</a>
        {/if}
      {/if}
    </div>
  </div>
</div>