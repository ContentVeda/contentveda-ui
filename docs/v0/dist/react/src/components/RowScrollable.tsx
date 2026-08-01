"use client";
import * as React from "react";
import { useState, useRef, useEffect } from "react";

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

import { observeLazyMount } from "../utils/lazyObserver";

function RowScrollable(props: RowScrollableProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerBox = useRef<any>({
    disconnect: null,
    row: null,
  });
  const [canScrollLeft, setCanScrollLeft] = useState(() => false);

  const [canScrollRight, setCanScrollRight] = useState(() => false);

  const [isVisible, setIsVisible] = useState(() => false);

  function shouldMount() {
    return props.lazyLoad === false || isVisible;
  }

  function showSkeleton() {
    return !!props.isLoading || !shouldMount();
  }

  function checkScroll() {
    const el = rowRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    }
  }

  function scroll(direction: "left" | "right") {
    const el = rowRef.current;
    if (el) {
      const scrollAmount = 300;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    const el = rowRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      // Allow DOM to render then check
      setTimeout(() => {
        checkScroll();
      }, 150);
      if (typeof ResizeObserver !== "undefined") {
        observerBox.current.row = new ResizeObserver(() => checkScroll());
        observerBox.current.row.observe(el);
      }
    }
    window.addEventListener("resize", checkScroll);
    if (props.lazyLoad === false) {
      setIsVisible(true);
      return;
    }
    if (containerRef.current) {
      observerBox.current.disconnect = observeLazyMount(
        containerRef.current,
        () => {
          setIsVisible(true);
        },
        props.lazyThreshold ?? 0.1,
        props.lazyRootMargin ?? "200px"
      );
    }
  }, []);

  useEffect(() => {
    return () => {
      const el = rowRef.current;
      if (el) {
        el.removeEventListener("scroll", checkScroll);
      }
      // Guarded: Svelte 5 runs onDestroy during *server* teardown too, so an
      // unguarded window access here throws `window is not defined` and 500s any
      // SSR page that renders this component — it never reaches the listener it
      // was trying to remove, because onMount never added one.
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", checkScroll);
      }
      if (observerBox.current.disconnect) observerBox.current.disconnect();
      if (observerBox.current.row) {
        observerBox.current.row.disconnect();
        observerBox.current.row = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`cv-scrollable-container ${props.className || ""}`}
    >
      {props.title ? (
        <h3 className="cv-scrollable-title">{props.title}</h3>
      ) : null}
      <div
        className="cv-scrollable-wrapper"
        style={{
          position: "relative",
        }}
      >
        <div
          ref={rowRef}
          className={`cv-scrollable-row ${
            props.config?.hideScrollbar ? "cv-scrollable-hide-scrollbar" : ""
          }`}
        >
          {props.items?.map((item) => (
            <a
              href={item.mapLinks?.[0]?.url || undefined}
              className={`cv-scrollable-card ${
                showSkeleton() ? "cv-image-shimmer" : ""
              }`}
              key={item.id}
            >
              {!showSkeleton() ? (
                <>
                  {item.media?.url ? (
                    <div className="cv-scrollable-img-wrap">
                      {item.media?.type === "video" ? (
                        <video
                          className="cv-scrollable-img"
                          src={item.media?.url}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : null}
                      {item.media?.type !== "video" ? (
                        <img
                          className="cv-scrollable-img"
                          src={item.media?.url}
                          alt={item.title || ""}
                        />
                      ) : null}
                    </div>
                  ) : null}
                  <div className="cv-scrollable-body">
                    {item.title ? (
                      <div className="cv-scrollable-card-title">
                        {item.title}
                      </div>
                    ) : null}
                    {item.subtitle ? (
                      <div className="cv-scrollable-card-sub">
                        {item.subtitle}
                      </div>
                    ) : null}
                  </div>
                </>
              ) : null}
            </a>
          ))}
        </div>
        {props.config?.showArrows !== false ? (
          <>
            {props.config?.hideArrowsIfNoScroll === false || canScrollLeft ? (
              <button
                type="button"
                className="cv-scrollable-arrow prev"
                aria-label="Previous"
                onClick={(event) => scroll("left")}
                style={{
                  opacity: !canScrollLeft ? "0.35" : "1",
                  pointerEvents: !canScrollLeft ? "none" : "auto",
                }}
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
            ) : null}
            {props.config?.hideArrowsIfNoScroll === false || canScrollRight ? (
              <button
                type="button"
                className="cv-scrollable-arrow next"
                aria-label="Next"
                onClick={(event) => scroll("right")}
                style={{
                  opacity: !canScrollRight ? "0.35" : "1",
                  pointerEvents: !canScrollRight ? "none" : "auto",
                }}
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
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default RowScrollable;
