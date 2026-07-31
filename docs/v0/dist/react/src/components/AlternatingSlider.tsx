"use client";
import * as React from "react";
import { useState, useRef, useEffect } from "react";

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

import { observeLazyMount } from "../utils/lazyObserver";

function AlternatingSlider(props: AlternatingSliderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const observerBox = useRef<{
    disconnect: (() => void) | null;
  }>({
    disconnect: null,
  });
  const [currentIndex, setCurrentIndex] = useState(() => 0);

  const [intervalId, setIntervalId] = useState(() => null);

  const [isVisible, setIsVisible] = useState(() => false);

  function shouldMount() {
    return props.lazyLoad === false || isVisible;
  }

  function showSkeleton() {
    return !!props.isLoading || !shouldMount();
  }

  function columns() {
    return props.config?.columns || 2;
  }

  function slideSets() {
    const sets: WidgetItem[][] = [];
    const currentItems = props.items || [];
    const cols = columns();
    for (let i = 0; i < currentItems.length; i += cols) {
      sets.push(currentItems.slice(i, i + cols));
    }
    return sets;
  }

  function totalSlides() {
    return slideSets().length;
  }

  function next() {
    if (totalSlides() <= 1) return;
    setCurrentIndex(prev => (prev + 1) % totalSlides());
  }

  function prev() {
    if (totalSlides() <= 1) return;
    setCurrentIndex(prev => (prev - 1 + totalSlides()) % totalSlides());
  }

  function goTo(index: number) {
    setCurrentIndex(index);
  }

  function startAutoPlay() {
    if (props.config?.autoStart !== false && totalSlides() > 1) {
      setIntervalId(
        setInterval(() => {
          next();
        }, props.config?.delayMs || 5000)
      );
    }
  }

  function stopAutoPlay() {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }

  useEffect(() => {
    if (props.lazyLoad === false) {
      setIsVisible(true);
      startAutoPlay();
      return;
    }
    if (rootRef.current) {
      observerBox.current.disconnect = observeLazyMount(
        rootRef.current,
        () => {
          setIsVisible(true);
          startAutoPlay();
        },
        props.lazyThreshold ?? 0.1,
        props.lazyRootMargin ?? "200px"
      );
    }
  }, []);

  useEffect(() => {
    return () => {
      stopAutoPlay();
      if (observerBox.current.disconnect) observerBox.current.disconnect();
    };
  }, []);

  return (
    <div
      role="region"
      ref={rootRef}
      className={`cv-alt-slider ${showSkeleton() ? "cv-image-shimmer" : ""} ${
        props.className || ""
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
        className="cv-alt-cols-container"
        style={{
          gridTemplateColumns: `repeat(${columns()}, 1fr)`,
          position: props.config?.height === "auto" ? "absolute" : "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {Array.from({
          length: columns(),
        })?.map((_, colIndex) => (
          <div className="cv-alt-col" key={`col-${colIndex}`}>
            <div
              className="cv-alt-track"
              style={{
                transform: `translateY(${
                  colIndex % 2 === 0 ? -currentIndex * 100 : currentIndex * 100
                }%)`,
              }}
            >
              {slideSets()?.map((slideRow, slideIndex) => (
                <div
                  className="cv-alt-cell"
                  key={`cell-${slideIndex}-${colIndex}`}
                  style={{
                    top: `${
                      colIndex % 2 === 0 ? slideIndex * 100 : -slideIndex * 100
                    }%`,
                  }}
                >
                  {slideRow[colIndex] ? (
                    <>
                      {slideRow[colIndex].mapLinks?.[0]?.url ? (
                        <a
                          className="cv-alt-content-wrap"
                          href={slideRow[colIndex].mapLinks[0].url}
                          style={{
                            display: "block",
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          {shouldMount() &&
                          slideRow[colIndex].media?.type === "video" ? (
                            <video
                              src={slideRow[colIndex].media?.url}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className={`cv-alt-bg-video ${
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
                          {shouldMount() &&
                          slideRow[colIndex].media?.type !== "video" ? (
                            <div
                              style={{
                                backgroundImage: slideRow[colIndex].media?.url
                                  ? `url(${slideRow[colIndex].media.url})`
                                  : "none",
                                backgroundPosition:
                                  props.config?.bgPosition || "center",
                              }}
                              className={`cv-alt-bg ${
                                showSkeleton() ? "cv-image-shimmer" : ""
                              }`}
                            />
                          ) : null}
                          <div className="cv-alt-overlay" />
                          <div
                            className="cv-alt-content"
                            style={{
                              textAlign:
                                slideRow[colIndex].textAlignment || "left",
                              display: "flex",
                              flexDirection: "column",
                              alignItems:
                                (slideRow[colIndex].textAlignment || "left") ===
                                "center"
                                  ? "center"
                                  : (slideRow[colIndex].textAlignment ||
                                      "left") === "right"
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
                                    height: "24px",
                                    marginBottom: "12px",
                                  }}
                                />
                                <div
                                  className="cv-skeleton-text cv-image-shimmer"
                                  style={{
                                    width: "80%",
                                    height: "14px",
                                    marginBottom: "8px",
                                  }}
                                />
                                <div
                                  className="cv-skeleton-text cv-image-shimmer"
                                  style={{
                                    width: "50%",
                                    height: "14px",
                                    marginBottom: "16px",
                                  }}
                                />
                                <div
                                  className="cv-skeleton-button cv-image-shimmer"
                                  style={{
                                    width: "110px",
                                    height: "36px",
                                  }}
                                />
                              </>
                            ) : null}
                            {!showSkeleton() ? (
                              <>
                                <h2 className="cv-alt-title">
                                  {slideRow[colIndex].title}
                                </h2>
                                {slideRow[colIndex].subtitle ? (
                                  <p className="cv-alt-subtitle">
                                    {slideRow[colIndex].subtitle}
                                  </p>
                                ) : null}
                                {slideRow[colIndex].ctaText ? (
                                  <span className="cv-alt-cta">
                                    {slideRow[colIndex].ctaText}
                                  </span>
                                ) : null}
                              </>
                            ) : null}
                          </div>
                        </a>
                      ) : null}
                      {!slideRow[colIndex].mapLinks?.[0]?.url ? (
                        <div className="cv-alt-content-wrap">
                          {shouldMount() &&
                          slideRow[colIndex].media?.type === "video" ? (
                            <video
                              src={slideRow[colIndex].media?.url}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className={`cv-alt-bg-video ${
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
                          {shouldMount() &&
                          slideRow[colIndex].media?.type !== "video" ? (
                            <div
                              style={{
                                backgroundImage: slideRow[colIndex].media?.url
                                  ? `url(${slideRow[colIndex].media.url})`
                                  : "none",
                                backgroundPosition:
                                  props.config?.bgPosition || "center",
                              }}
                              className={`cv-alt-bg ${
                                showSkeleton() ? "cv-image-shimmer" : ""
                              }`}
                            />
                          ) : null}
                          <div className="cv-alt-overlay" />
                          <div
                            className="cv-alt-content"
                            style={{
                              textAlign:
                                slideRow[colIndex].textAlignment || "left",
                              display: "flex",
                              flexDirection: "column",
                              alignItems:
                                (slideRow[colIndex].textAlignment || "left") ===
                                "center"
                                  ? "center"
                                  : (slideRow[colIndex].textAlignment ||
                                      "left") === "right"
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
                                    height: "24px",
                                    marginBottom: "12px",
                                  }}
                                />
                                <div
                                  className="cv-skeleton-text cv-image-shimmer"
                                  style={{
                                    width: "80%",
                                    height: "14px",
                                    marginBottom: "8px",
                                  }}
                                />
                                <div
                                  className="cv-skeleton-text cv-image-shimmer"
                                  style={{
                                    width: "50%",
                                    height: "14px",
                                    marginBottom: "16px",
                                  }}
                                />
                                <div
                                  className="cv-skeleton-button cv-image-shimmer"
                                  style={{
                                    width: "110px",
                                    height: "36px",
                                  }}
                                />
                              </>
                            ) : null}
                            {!showSkeleton() ? (
                              <>
                                <h2 className="cv-alt-title">
                                  {slideRow[colIndex].title}
                                </h2>
                                {slideRow[colIndex].subtitle ? (
                                  <p className="cv-alt-subtitle">
                                    {slideRow[colIndex].subtitle}
                                  </p>
                                ) : null}
                                {slideRow[colIndex].ctaText ? (
                                  <span className="cv-alt-cta">
                                    {slideRow[colIndex].ctaText}
                                  </span>
                                ) : null}
                              </>
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {props.config?.showArrows &&
      (!props.config?.hideArrowsIfNoScroll || slideSets().length > 1) ? (
        <>
          <button
            className="cv-alt-arrow prev"
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
            className="cv-alt-arrow next"
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
        <div className="cv-alt-dots">
          {slideSets()?.map((_, index) => (
            <button
              key={`dot-${index}`}
              className={`cv-alt-dot ${index === currentIndex ? "active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={(event) => goTo(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default AlternatingSlider;
