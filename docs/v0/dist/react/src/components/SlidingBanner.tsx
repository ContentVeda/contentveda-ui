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

import { observeLazyMount } from "../utils/lazyObserver";
import { defaultBackgroundEffectPlugin } from "../utils/backgroundEffects";
import type {
  BackgroundEffectContext,
  BackgroundEffectName,
  BackgroundEffectPlugin,
} from "../utils/backgroundEffects";

function SlidingBanner(props: SlidingBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const animContext = useRef({
    intervalId: null as any,
    dimResizeHandler: null as any,
  });
  const bgEffectContext = useRef<BackgroundEffectContext>({
    animationFrameId: null,
    resizeHandler: null,
    resizeObserver: null,
  });
  const observerBox = useRef<{
    disconnect: (() => void) | null;
  }>({
    disconnect: null,
  });
  const latestNext = useRef<{
    fn: () => void;
  }>({
    fn: () => {},
  });
  const [currentIndex, setCurrentIndex] = useState(() => 0);

  const [previousIndex, setPreviousIndex] = useState(() => 0);

  const [direction, setDirection] = useState(() => "next");

  const [isVisible, setIsVisible] = useState(() => false);

  const [wrapping, setWrapping] = useState(() => false);

  function shouldMount() {
    return props.lazyLoad === false || isVisible;
  }

  function showSkeleton() {
    return !!props.isLoading || !shouldMount();
  }

  function animationClass() {
    return props.config?.animationEffect || "slide";
  }

  function backgroundClass() {
    return props.config?.backgroundEffect || "none";
  }

  function plugin() {
    return (
      props.config?.backgroundEffectPlugin || defaultBackgroundEffectPlugin
    );
  }

  function qualityClass() {
    return props.config?.animationQuality || "detailed";
  }

  function next() {
    if (!props.items?.length) return;
    setDirection("next");
    setPreviousIndex(currentIndex);
    if (currentIndex >= props.items.length - 1) {
      if (props.config?.rotateAgain !== false) {
        setWrapping(true);
        setCurrentIndex(0);
      }
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  }

  function prev() {
    if (!props.items?.length) return;
    setDirection("prev");
    setPreviousIndex(currentIndex);
    if (currentIndex <= 0) {
      if (props.config?.rotateAgain !== false) {
        setWrapping(true);
        setCurrentIndex(props.items.length - 1);
      }
    } else {
      setCurrentIndex(prev => prev - 1);
    }
  }

  function goTo(index: number) {
    if (currentIndex !== index) {
      setDirection(index > currentIndex ? "next" : "prev");
      setPreviousIndex(currentIndex);
      setCurrentIndex(index);
    }
  }

  function startAutoPlay() {
    if (animContext.current.intervalId) return;
    if (props.config?.autoStart !== false && props.items?.length > 1) {
      animContext.current.intervalId = setInterval(() => {
        latestNext.current.fn();
      }, props.config?.delayMs || 5000);
    }
  }

  function stopAutoPlay() {
    if (animContext.current.intervalId) {
      clearInterval(animContext.current.intervalId);
      animContext.current.intervalId = null;
    }
  }

  function setupDimensions() {
    if (rootRef.current) {
      rootRef.current.style.setProperty(
        "--slider-half-width",
        `${rootRef.current.offsetWidth / 2}px`
      );
    }
  }

  function mountHeavyContent() {
    startAutoPlay();
    setupDimensions();
    animContext.current.dimResizeHandler = () => setupDimensions();
    window.addEventListener("resize", animContext.current.dimResizeHandler);
    if (canvasRef.current) {
      plugin().start(
        canvasRef.current,
        backgroundClass() as BackgroundEffectName,
        bgEffectContext.current
      );
    }
  }

  useEffect(() => {
    if (props.lazyLoad === false) {
      setIsVisible(true);
      mountHeavyContent();
      return;
    }
    if (rootRef.current) {
      observerBox.current.disconnect = observeLazyMount(
        rootRef.current,
        () => {
          setIsVisible(true);
          mountHeavyContent();
        },
        props.lazyThreshold ?? 0.1,
        props.lazyRootMargin ?? "200px"
      );
    }
  }, []);
  useEffect(() => {
    latestNext.current.fn = next;
  });
  useEffect(() => {
    if (wrapping) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWrapping(false);
        });
      });
    }
  }, [wrapping]);
  useEffect(() => {
    if (isVisible && canvasRef.current) {
      plugin().start(
        canvasRef.current,
        backgroundClass() as BackgroundEffectName,
        bgEffectContext.current
      );
    }
  }, [backgroundClass(), canvasRef.current]);
  useEffect(() => {
    return () => {
      stopAutoPlay();
      plugin().stop(bgEffectContext.current);
      // Same guard as RowScrollable: onDestroy also runs on the server. The
      // handler is only assigned in onMount so this branch is normally skipped
      // there, but the typeof check makes that safe by construction rather than
      // by coincidence.
      if (
        typeof window !== "undefined" &&
        animContext.current.dimResizeHandler
      ) {
        window.removeEventListener(
          "resize",
          animContext.current.dimResizeHandler
        );
      }
      if (observerBox.current.disconnect) observerBox.current.disconnect();
    };
  }, []);

  return (
    <div
      role="region"
      ref={rootRef}
      className={`cv-sliding-banner ${
        showSkeleton() ? "cv-image-shimmer" : ""
      } ${
        props.className || ""
      } effect-${animationClass()} bg-effect-${backgroundClass()} quality-${qualityClass()} ${
        props.config?.showDots ? "has-dots" : ""
      }`}
      onMouseEnter={(event) => stopAutoPlay()}
      onMouseLeave={(event) => startAutoPlay()}
      style={{
        height: props.config?.height || "",
        minHeight:
          props.config?.height === "auto"
            ? "auto"
            : props.config?.minHeight || "",
      }}
    >
      {backgroundClass() !== "none" ? (
        <canvas className="cv-sliding-banner-canvas" ref={canvasRef} />
      ) : null}
      {props.config?.height === "auto" && props.items?.[0]?.media?.url ? (
        <img
          alt=""
          src={props.items[0].media.url}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            visibility: "hidden",
            pointerEvents: "none",
          }}
        />
      ) : null}
      <div
        className={`cv-sliding-banner-track dir-${direction} ${
          wrapping ? "no-transition" : ""
        }`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          position: props.config?.height === "auto" ? "absolute" : "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {props.items?.map((item, index) => (
          <div
            className={`cv-sliding-slide ${
              index === currentIndex ? "active" : ""
            } ${
              index === previousIndex && index !== currentIndex
                ? "previous"
                : ""
            }`}
            key={item.id || index}
          >
            {shouldMount() && item.media?.type === "video" ? (
              <video
                src={item.media?.url}
                autoPlay
                loop
                muted
                playsInline
                className={`cv-sliding-bg-video ${
                  showSkeleton() ? "cv-image-shimmer" : ""
                }`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : null}
            {shouldMount() && item.media?.type !== "video" ? (
              <div
                className={`cv-sliding-bg ${
                  showSkeleton() ? "cv-image-shimmer" : ""
                }`}
                style={{
                  backgroundImage: item.media?.url
                    ? `url(${item.media.url})`
                    : "none",
                  backgroundPosition: props.config?.bgPosition || "center",
                }}
              />
            ) : null}
            {animationClass() === "curtain" && item.media?.type !== "video" ? (
              <>
                <div
                  className="cv-curtain-panel cv-curtain-panel-left"
                  style={{
                    backgroundImage: item.media?.url
                      ? `url(${item.media.url})`
                      : "none",
                    backgroundPosition: props.config?.bgPosition || "center",
                  }}
                />
                <div
                  className="cv-curtain-panel cv-curtain-panel-right"
                  style={{
                    backgroundImage: item.media?.url
                      ? `url(${item.media.url})`
                      : "none",
                    backgroundPosition: props.config?.bgPosition || "center",
                  }}
                />
              </>
            ) : null}
            {animationClass() === "cube" ? (
              <div className="cv-cube-side" />
            ) : null}
            <div className="cv-sliding-overlay" />
            <div
              className="cv-sliding-content"
              style={{
                textAlign:
                  item.textAlignment || props.config?.align || "center",
                display: "flex",
                flexDirection: "column",
                alignItems:
                  (item.textAlignment || props.config?.align || "center") ===
                  "center"
                    ? "center"
                    : (item.textAlignment ||
                        props.config?.align ||
                        "center") === "right"
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              {showSkeleton() ? (
                <>
                  <div
                    className="cv-skeleton-title cv-image-shimmer"
                    style={{
                      width: "50%",
                      height: "32px",
                      marginBottom: "16px",
                    }}
                  />
                  <div
                    className="cv-skeleton-text cv-image-shimmer"
                    style={{
                      width: "70%",
                      height: "16px",
                      marginBottom: "10px",
                    }}
                  />
                  <div
                    className="cv-skeleton-text cv-image-shimmer"
                    style={{
                      width: "40%",
                      height: "16px",
                      marginBottom: "24px",
                    }}
                  />
                  <div
                    className="cv-skeleton-button cv-image-shimmer"
                    style={{
                      width: "130px",
                      height: "40px",
                    }}
                  />
                </>
              ) : null}
              {!showSkeleton() ? (
                <>
                  <h2 className="cv-sliding-title">{item.title}</h2>
                  {item.subtitle ? (
                    <p className="cv-sliding-subtitle">{item.subtitle}</p>
                  ) : null}
                  {item.ctaText ? (
                    <a
                      className="cv-sliding-cta"
                      href={item.mapLinks?.[0]?.url || undefined}
                    >
                      {item.ctaText}
                    </a>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      {(props.config?.showArrows || props.config?.showNextPrev) &&
      (!props.config?.hideArrowsIfNoScroll ||
        (props.items && props.items.length > 1)) ? (
        <>
          <button
            type="button"
            className="cv-sliding-arrow prev"
            aria-label="Previous"
            onClick={(event) => prev()}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            className="cv-sliding-arrow next"
            aria-label="Next"
            onClick={(event) => next()}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      ) : null}
      {props.config?.showDots ? (
        <div className="cv-sliding-dots">
          {props.items?.map((_, index) => (
            <button
              type="button"
              key={index}
              className={`cv-sliding-dot ${
                index === currentIndex ? "active" : ""
              }`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={(event) => goTo(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default SlidingBanner;
