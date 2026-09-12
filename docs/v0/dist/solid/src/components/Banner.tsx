import {
  Show,
  For,
  onMount,
  on,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";

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

import { observeLazyMount } from "../utils/lazyObserver";
import { defaultBackgroundEffectPlugin } from "../utils/backgroundEffects";
import type {
  BackgroundEffectContext,
  BackgroundEffectName,
  BackgroundEffectPlugin,
} from "../utils/backgroundEffects";

function Banner(props: BannerProps) {
  const [isVisible, setIsVisible] = createSignal(false);

  const [animContext, setAnimContext] = createSignal({
    animationFrameId: null,
    resizeHandler: null,
    resizeObserver: null,
  });

  const [observerBox, setObserverBox] = createSignal({
    disconnect: null as (() => void) | null,
  });

  const shouldMount = createMemo(() => {
    return props.lazyLoad === false || isVisible();
  });

  const showSkeleton = createMemo(() => {
    return !!props.isLoading || !shouldMount();
  });

  const alignment = createMemo(() => {
    return (
      props.textAlignment ||
      props.align ||
      props.config?.textAlignment ||
      props.config?.align ||
      "center"
    );
  });

  const hasVideo = createMemo(() => {
    return (
      props.media?.type === "video" ||
      (props.backgroundImageUrl && props.backgroundImageUrl.endsWith(".mp4")) ||
      (props.media?.url && props.media.url.endsWith(".mp4"))
    );
  });

  const videoUrl = createMemo(() => {
    return props.media?.url || props.backgroundImageUrl || "";
  });

  const imageUrl = createMemo(() => {
    return props.media?.url || props.backgroundImageUrl || "";
  });

  const linkUrl = createMemo(() => {
    return props.mapLinks?.[0]?.url || props.ctaLink || undefined;
  });

  const gradientOverlay = createMemo(() => {
    return props.config?.bgGradient || props.bgGradient || "";
  });

  const paddingValue = createMemo(() => {
    const p = props.config?.padding || props.padding;
    if (p === "sm") return "var(--cv-spacing-sm)";
    if (p === "md") return "var(--cv-spacing-md)";
    if (p === "lg") return "var(--cv-spacing-lg)";
    if (p === "xl") return "var(--cv-spacing-xl)";
    return p || "";
  });

  const backgroundPosition = createMemo(() => {
    return props.config?.bgPosition || "";
  });

  const minHeightValue = createMemo(() => {
    if (props.config?.height === "auto") return "auto";
    return props.config?.minHeight || props.config?.height || "300px";
  });

  const hotspotMinTarget = createMemo(() => {
    return props.config?.hotspotMinTargetSize ?? 24;
  });

  const backgroundEffectClass = createMemo(() => {
    return props.config?.backgroundEffect || "none";
  });

  const plugin = createMemo(() => {
    return (
      props.config?.backgroundEffectPlugin || defaultBackgroundEffectPlugin
    );
  });

  function hotspotHref(h: Hotspot) {
    return h.action?.type === "deeplink"
      ? h.action.deeplink || h.action.url || undefined
      : h.action?.url || undefined;
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

  let rootRef: HTMLDivElement;
  let canvasRef: HTMLCanvasElement;

  onMount(() => {
    if (props.lazyLoad === false) {
      setIsVisible(true);
      if (canvasRef)
        plugin().start(
          canvasRef,
          backgroundEffectClass() as BackgroundEffectName,
          animContext()
        );
      return;
    }
    if (rootRef) {
      observerBox().disconnect = observeLazyMount(
        rootRef,
        () => {
          setIsVisible(true);
          if (canvasRef)
            plugin().start(
              canvasRef,
              backgroundEffectClass() as BackgroundEffectName,
              animContext()
            );
        },
        props.lazyThreshold ?? 0.1,
        props.lazyRootMargin ?? "200px"
      );
    }
  });

  const onUpdateFn_0_backgroundEffectClass__ = createMemo(() =>
    backgroundEffectClass()
  );
  const onUpdateFn_0_canvasRef = createMemo(() => canvasRef);
  function onUpdateFn_0() {
    if (isVisible() && canvasRef)
      plugin().start(
        canvasRef,
        backgroundEffectClass() as BackgroundEffectName,
        animContext()
      );
  }
  createEffect(
    on(
      () => [onUpdateFn_0_backgroundEffectClass__(), onUpdateFn_0_canvasRef()],
      onUpdateFn_0
    )
  );

  return (
    <>
      <div
        class={`cv-banner ${showSkeleton() ? "cv-image-shimmer" : ""} ${
          props.className || ""
        }`}
        ref={rootRef!}
        style={{
          "background-image":
            shouldMount() &&
            !props.isLoading &&
            !hasVideo() &&
            imageUrl() &&
            props.config?.height !== "auto"
              ? `url(${imageUrl()})`
              : "none",
          "text-align": alignment(),
          "background-position": backgroundPosition() || "center",
          "min-height": minHeightValue() || "",
          height: props.config?.height || "",
        }}
      >
        <Show when={shouldMount() && !props.isLoading && hasVideo()}>
          <video
            src={videoUrl()}
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              "object-fit": "cover",
              "z-index": 0,
            }}
          ></video>
        </Show>
        <Show
          when={
            shouldMount() &&
            !props.isLoading &&
            !hasVideo() &&
            imageUrl() &&
            props.config?.height === "auto"
          }
        >
          <img
            alt=""
            src={imageUrl()}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              "z-index": 0,
              "object-fit": "cover",
              "object-position": backgroundPosition() || "center",
            }}
          />
        </Show>
        <Show
          when={
            !!props.config?.backgroundEffect &&
            props.config.backgroundEffect !== "none"
          }
        >
          <canvas
            class="cv-banner-bg-effect"
            aria-hidden="true"
            ref={canvasRef!}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              "z-index": 0,
              "pointer-events": "none",
            }}
          ></canvas>
        </Show>
        <Show when={shouldMount() && !!props.hotspots?.length}>
          <div
            class="cv-banner-hotspots"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              "z-index": 2,
            }}
          >
            <svg
              class="cv-banner-hotspots-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <For each={props.hotspots}>
                {(h, _index) => {
                  const index = _index();
                  return (
                    <g key={`${h.id}-visual`}>
                      <g
                        class={`cv-hotspot-visual cv-hotspot-visual-${h.shape}`}
                      >
                        <Show when={h.shape === "rect"}>
                          <rect
                            vector-effect="non-scaling-stroke"
                            x={h.coords.x}
                            y={h.coords.y}
                            width={h.coords.width}
                            height={h.coords.height}
                          ></rect>
                        </Show>
                        <Show when={h.shape === "oval"}>
                          <ellipse
                            vector-effect="non-scaling-stroke"
                            cx={h.coords.x + h.coords.width / 2}
                            cy={h.coords.y + h.coords.height / 2}
                            rx={h.coords.width / 2}
                            ry={h.coords.height / 2}
                          ></ellipse>
                        </Show>
                        <Show when={h.shape === "polygon"}>
                          <polygon
                            vector-effect="non-scaling-stroke"
                            points={hotspotPolygonPoints(h)}
                          ></polygon>
                        </Show>
                        <Show when={h.pulse}>
                          <Show when={h.shape === "rect"}>
                            <rect
                              class="cv-hotspot-pulse-ring"
                              vector-effect="non-scaling-stroke"
                              x={h.coords.x}
                              y={h.coords.y}
                              width={h.coords.width}
                              height={h.coords.height}
                            ></rect>
                          </Show>
                        </Show>
                        <Show when={h.pulse}>
                          <Show when={h.shape === "oval"}>
                            <ellipse
                              class="cv-hotspot-pulse-ring"
                              vector-effect="non-scaling-stroke"
                              cx={h.coords.x + h.coords.width / 2}
                              cy={h.coords.y + h.coords.height / 2}
                              rx={h.coords.width / 2}
                              ry={h.coords.height / 2}
                            ></ellipse>
                          </Show>
                        </Show>
                        <Show when={h.pulse}>
                          <Show when={h.shape === "polygon"}>
                            <polygon
                              class="cv-hotspot-pulse-ring"
                              vector-effect="non-scaling-stroke"
                              points={hotspotPolygonPoints(h)}
                            ></polygon>
                          </Show>
                        </Show>
                      </g>
                    </g>
                  );
                }}
              </For>
            </svg>
            <For each={props.hotspots}>
              {(h, _index) => {
                const index = _index();
                return (
                  <div key={h.id}>
                    <div class="cv-hotspot-hit" style={hotspotHitStyle(h)}>
                      <a
                        class={`cv-hotspot cv-hotspot-${h.shape}`}
                        href={hotspotHref(h)}
                        aria-label={hotspotLabel(h)}
                        aria-describedby={
                          h.showTooltip ? `cv-hotspot-tip-${h.id}` : undefined
                        }
                      >
                        <Show when={!!h.showTooltip}>
                          <span
                            class="cv-hotspot-tooltip"
                            role="tooltip"
                            id={`cv-hotspot-tip-${h.id}`}
                          >
                            {h.label || h.altText}
                          </span>
                        </Show>
                      </a>
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
        </Show>
        <div
          class="cv-banner-overlay"
          style={{
            "z-index": 1,
            position: props.config?.height === "auto" ? "absolute" : "relative",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              gradientOverlay() || "var(--cv-color-scrim, rgba(0, 0, 0, 0.4))",
            padding: paddingValue() || "var(--cv-spacing-xl)",
          }}
        >
          <div
            class="cv-banner-content"
            style={{
              display: "flex",
              "flex-direction": "column",
              "align-items":
                alignment() === "center"
                  ? "center"
                  : alignment() === "right"
                  ? "flex-end"
                  : "flex-start",
            }}
          >
            <Show when={showSkeleton()}>
              <div
                class="cv-skeleton-title cv-image-shimmer"
                style={{
                  width: "60%",
                  height: "36px",
                  "margin-bottom": "16px",
                }}
              ></div>
              <div
                class="cv-skeleton-text cv-image-shimmer"
                style={{
                  width: "80%",
                  height: "18px",
                  "margin-bottom": "10px",
                }}
              ></div>
              <div
                class="cv-skeleton-text cv-image-shimmer"
                style={{
                  width: "50%",
                  height: "18px",
                  "margin-bottom": "24px",
                }}
              ></div>
              <div
                class="cv-skeleton-button cv-image-shimmer"
                style={{
                  width: "140px",
                  height: "42px",
                }}
              ></div>
            </Show>
            <Show when={!showSkeleton()}>
              <Show when={props.title}>
                <h2 class="cv-banner-title">{props.title}</h2>
              </Show>
              <Show when={props.subtitle}>
                <p class="cv-banner-subtitle">{props.subtitle}</p>
              </Show>
              <Show when={props.ctaText}>
                <a class="cv-banner-cta" href={linkUrl()}>
                  {props.ctaText}
                </a>
              </Show>
            </Show>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
