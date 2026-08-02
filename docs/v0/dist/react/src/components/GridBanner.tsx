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
  /** Items per row on screens wider than 768px. Defaults to 3. */
  columns?: number;
  /**
   * Items per row at 768px and below. Omit to let the component break by
   * itself, which is 2 across.
   */
  columnsTablet?: number;
  /**
   * Items per row at 480px and below. Omit to inherit whatever the tablet
   * breakpoint resolved to, so setting only `columnsTablet` carries all the
   * way down rather than snapping back to the default on the smallest screens.
   */
  columnsMobile?: number;
  className?: string;
  isLoading?: boolean;
  config?: GridBannerConfig;
  lazyLoad?: boolean;
  lazyThreshold?: number;
  lazyRootMargin?: string;
}

import { observeLazyMount } from "../utils/lazyObserver";

function GridBanner(props: GridBannerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
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

  function gridTemplateColumns() {
    const cols = props.columns || 3;
    return `repeat(${cols}, 1fr)`;
  }

  function columnsTabletVar() {
    return `${props.columnsTablet || 2}`;
  }

  function columnsMobileVar() {
    return `${props.columnsMobile || props.columnsTablet || 2}`;
  }

  useEffect(() => {
    if (props.lazyLoad === false) {
      setIsVisible(true);
      return;
    }
    if (rootRef.current) {
      observerBox.current.disconnect = observeLazyMount(
        rootRef.current,
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
      if (observerBox.current.disconnect) observerBox.current.disconnect();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`cv-grid-banner ${props.className || ""}`}
      style={{
        gridTemplateColumns: gridTemplateColumns(),
        "--cv-grid-cols-tablet": columnsTabletVar(),
        "--cv-grid-cols-mobile": columnsMobileVar(),
        height: props.config?.height || "",
        minHeight: props.config?.minHeight || "",
      }}
    >
      {props.items?.map((item, index) => (
        <a
          className="cv-grid-item"
          href={item.mapLinks?.[0]?.url || undefined}
          key={item.id || index}
        >
          <div
            className={`cv-grid-img-wrap ${
              showSkeleton() ? "cv-image-shimmer" : ""
            }`}
            style={{
              height: props.config?.height || "",
              minHeight: props.config?.minHeight || "",
              aspectRatio: props.config?.height ? "unset" : "16/9",
            }}
          >
            {!showSkeleton() ? (
              <>
                {item.media?.type === "video" ? (
                  <video
                    className="cv-grid-img"
                    src={item.media?.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      objectPosition: props.config?.bgPosition || "center",
                    }}
                  />
                ) : null}
                {item.media?.type !== "video" ? (
                  <img
                    className="cv-grid-img"
                    src={item.media?.url}
                    alt={item.title}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      objectPosition: props.config?.bgPosition || "center",
                    }}
                  />
                ) : null}
              </>
            ) : null}
          </div>
          {showSkeleton() ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: item.textAlignment || "center",
                width: "100%",
                marginTop: "12px",
              }}
            >
              <div
                className="cv-skeleton-text cv-image-shimmer"
                style={{
                  width: "70%",
                  height: "14px",
                  margin: "0 0 6px 0",
                }}
              />
              <div
                className="cv-skeleton-text cv-image-shimmer"
                style={{
                  width: "40%",
                  height: "10px",
                  margin: 0,
                }}
              />
            </div>
          ) : null}
          {!showSkeleton() ? (
            <div
              className="cv-grid-title"
              style={{
                textAlign: item.textAlignment || "center",
              }}
            >
              {item.title}
            </div>
          ) : null}
        </a>
      ))}
    </div>
  );
}

export default GridBanner;
