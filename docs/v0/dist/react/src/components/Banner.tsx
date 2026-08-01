"use client";
import * as React from "react";
import { useState, useRef, useEffect } from "react";

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
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animContext = useRef<BackgroundEffectContext>({
    animationFrameId: null,
    resizeHandler: null,
    resizeObserver: null,
  });
  const observerBox = useRef<{
    disconnect: (() => void) | null;
  }>({
    disconnect: null,
  });
  const [isVisible, setIsVisible] = useState(() => false);

  function shouldMount() {
    return props.lazyLoad === false || isVisible;
  }

  function showSkeleton() {
    return !!props.isLoading || !shouldMount();
  }

  function alignment() {
    return (
      props.textAlignment ||
      props.align ||
      props.config?.textAlignment ||
      props.config?.align ||
      "center"
    );
  }

  function hasVideo() {
    return (
      props.media?.type === "video" ||
      (props.backgroundImageUrl && props.backgroundImageUrl.endsWith(".mp4")) ||
      (props.media?.url && props.media.url.endsWith(".mp4"))
    );
  }

  function videoUrl() {
    return props.media?.url || props.backgroundImageUrl || "";
  }

  function imageUrl() {
    return props.media?.url || props.backgroundImageUrl || "";
  }

  function linkUrl() {
    return props.mapLinks?.[0]?.url || props.ctaLink || "#";
  }

  function gradientOverlay() {
    return props.config?.bgGradient || props.bgGradient || "";
  }

  function paddingValue() {
    const p = props.config?.padding || props.padding;
    if (p === "sm") return "var(--cv-spacing-sm)";
    if (p === "md") return "var(--cv-spacing-md)";
    if (p === "lg") return "var(--cv-spacing-lg)";
    if (p === "xl") return "var(--cv-spacing-xl)";
    return p || "";
  }

  function backgroundPosition() {
    return props.config?.bgPosition || "";
  }

  function minHeightValue() {
    if (props.config?.height === "auto") return "auto";
    return props.config?.minHeight || props.config?.height || "300px";
  }

  function hotspotMinTarget() {
    return props.config?.hotspotMinTargetSize ?? 24;
  }

  function backgroundEffectClass() {
    return props.config?.backgroundEffect || "none";
  }

  function plugin() {
    return (
      props.config?.backgroundEffectPlugin || defaultBackgroundEffectPlugin
    );
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

  useEffect(() => {
    if (props.lazyLoad === false) {
      setIsVisible(true);
      if (canvasRef.current)
        plugin().start(
          canvasRef.current,
          backgroundEffectClass() as BackgroundEffectName,
          animContext.current
        );
      return;
    }
    if (rootRef.current) {
      observerBox.current.disconnect = observeLazyMount(
        rootRef.current,
        () => {
          setIsVisible(true);
          if (canvasRef.current)
            plugin().start(
              canvasRef.current,
              backgroundEffectClass() as BackgroundEffectName,
              animContext.current
            );
        },
        props.lazyThreshold ?? 0.1,
        props.lazyRootMargin ?? "200px"
      );
    }
  }, []);
  useEffect(() => {
    if (isVisible && canvasRef.current)
      plugin().start(
        canvasRef.current,
        backgroundEffectClass() as BackgroundEffectName,
        animContext.current
      );
  }, [backgroundEffectClass(), canvasRef.current]);
  useEffect(() => {
    return () => {
      if (observerBox.current.disconnect) observerBox.current.disconnect();
      plugin().stop(animContext.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`cv-banner ${showSkeleton() ? "cv-image-shimmer" : ""} ${
        props.className || ""
      }`}
      style={{
        backgroundImage:
          shouldMount() &&
          !props.isLoading &&
          !hasVideo() &&
          imageUrl() &&
          props.config?.height !== "auto"
            ? `url(${imageUrl()})`
            : "none",
        textAlign: alignment(),
        backgroundPosition: backgroundPosition() || "center",
        minHeight: minHeightValue() || "",
        height: props.config?.height || "",
      }}
    >
      {shouldMount() && !props.isLoading && hasVideo() ? (
        <video
          src={videoUrl()}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      ) : null}
      {shouldMount() &&
      !props.isLoading &&
      !hasVideo() &&
      imageUrl() &&
      props.config?.height === "auto" ? (
        <img
          alt=""
          src={imageUrl()}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            zIndex: 0,
            objectFit: "cover",
            objectPosition: backgroundPosition() || "center",
          }}
        />
      ) : null}
      {!!props.config?.backgroundEffect &&
      props.config.backgroundEffect !== "none" ? (
        <canvas
          className="cv-banner-bg-effect"
          aria-hidden="true"
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      ) : null}
      {shouldMount() && !!props.hotspots?.length ? (
        <div
          className="cv-banner-hotspots"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
        >
          <svg
            className="cv-banner-hotspots-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            {props.hotspots?.map((h) => (
              <g key={`${h.id}-visual`}>
                <g className={`cv-hotspot-visual cv-hotspot-visual-${h.shape}`}>
                  {h.shape === "rect" ? (
                    <rect
                      vector-effect="non-scaling-stroke"
                      x={h.coords.x}
                      y={h.coords.y}
                      width={h.coords.width}
                      height={h.coords.height}
                    />
                  ) : null}
                  {h.shape === "oval" ? (
                    <ellipse
                      vector-effect="non-scaling-stroke"
                      cx={h.coords.x + h.coords.width / 2}
                      cy={h.coords.y + h.coords.height / 2}
                      rx={h.coords.width / 2}
                      ry={h.coords.height / 2}
                    />
                  ) : null}
                  {h.shape === "polygon" ? (
                    <polygon
                      vector-effect="non-scaling-stroke"
                      points={hotspotPolygonPoints(h)}
                    />
                  ) : null}
                  {h.pulse ? (
                    <>
                      {h.shape === "rect" ? (
                        <rect
                          className="cv-hotspot-pulse-ring"
                          vector-effect="non-scaling-stroke"
                          x={h.coords.x}
                          y={h.coords.y}
                          width={h.coords.width}
                          height={h.coords.height}
                        />
                      ) : null}
                    </>
                  ) : null}
                  {h.pulse ? (
                    <>
                      {h.shape === "oval" ? (
                        <ellipse
                          className="cv-hotspot-pulse-ring"
                          vector-effect="non-scaling-stroke"
                          cx={h.coords.x + h.coords.width / 2}
                          cy={h.coords.y + h.coords.height / 2}
                          rx={h.coords.width / 2}
                          ry={h.coords.height / 2}
                        />
                      ) : null}
                    </>
                  ) : null}
                  {h.pulse ? (
                    <>
                      {h.shape === "polygon" ? (
                        <polygon
                          className="cv-hotspot-pulse-ring"
                          vector-effect="non-scaling-stroke"
                          points={hotspotPolygonPoints(h)}
                        />
                      ) : null}
                    </>
                  ) : null}
                </g>
              </g>
            ))}
          </svg>
          {props.hotspots?.map((h) => (
            <div key={h.id}>
              <div className="cv-hotspot-hit" style={hotspotHitStyle(h)}>
                <a
                  href={hotspotHref(h)}
                  aria-label={hotspotLabel(h)}
                  aria-describedby={
                    h.showTooltip ? `cv-hotspot-tip-${h.id}` : undefined
                  }
                  className={`cv-hotspot cv-hotspot-${h.shape}`}
                >
                  {!!h.showTooltip ? (
                    <span
                      role="tooltip"
                      className="cv-hotspot-tooltip"
                      id={`cv-hotspot-tip-${h.id}`}
                    >
                      {h.label || h.altText}
                    </span>
                  ) : null}
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div
        className="cv-banner-overlay"
        style={{
          zIndex: 1,
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
          className="cv-banner-content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems:
              alignment() === "center"
                ? "center"
                : alignment() === "right"
                ? "flex-end"
                : "flex-start",
          }}
        >
          {showSkeleton() ? (
            <>
              <div
                className="cv-skeleton-title cv-image-shimmer"
                style={{
                  width: "60%",
                  height: "36px",
                  marginBottom: "16px",
                }}
              />
              <div
                className="cv-skeleton-text cv-image-shimmer"
                style={{
                  width: "80%",
                  height: "18px",
                  marginBottom: "10px",
                }}
              />
              <div
                className="cv-skeleton-text cv-image-shimmer"
                style={{
                  width: "50%",
                  height: "18px",
                  marginBottom: "24px",
                }}
              />
              <div
                className="cv-skeleton-button cv-image-shimmer"
                style={{
                  width: "140px",
                  height: "42px",
                }}
              />
            </>
          ) : null}
          {!showSkeleton() ? (
            <>
              {props.title ? (
                <h2 className="cv-banner-title">{props.title}</h2>
              ) : null}
              {props.subtitle ? (
                <p className="cv-banner-subtitle">{props.subtitle}</p>
              ) : null}
              {props.ctaText ? (
                <a className="cv-banner-cta" href={linkUrl()}>
                  {props.ctaText}
                </a>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Banner;
