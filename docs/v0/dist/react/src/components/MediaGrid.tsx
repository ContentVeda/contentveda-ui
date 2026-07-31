"use client";
import * as React from "react";
import { useState, useRef, useEffect } from "react";

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

import { observeLazyMount } from "../utils/lazyObserver";

function MediaGrid(props: MediaGridProps) {
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
    <div ref={rootRef} className={`cv-media-grid ${props.className || ""}`}>
      {showSkeleton() ? (
        <>
          <div className="cv-media-primary cv-image-shimmer" />
          <div className="cv-media-secondary-col">
            <div className="cv-media-secondary-item cv-image-shimmer" />
            <div className="cv-media-secondary-item cv-image-shimmer" />
          </div>
        </>
      ) : null}
      {!showSkeleton() ? (
        <>
          {props.primaryMedia ? (
            <a
              className="cv-media-primary"
              href={props.primaryMedia.mapLinks?.[0]?.url || "#"}
            >
              {props.primaryMedia.media?.type === "video" ? (
                <video
                  className="cv-media-asset"
                  src={props.primaryMedia.media?.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : null}
              {props.primaryMedia.media?.type !== "video" ? (
                <img
                  className="cv-media-asset"
                  src={props.primaryMedia.media?.url}
                  alt={
                    props.primaryMedia.altText || props.primaryMedia.title || ""
                  }
                />
              ) : null}
            </a>
          ) : null}
          {props.secondaryMedia && props.secondaryMedia.length > 0 ? (
            <div className="cv-media-secondary-col">
              {props.secondaryMedia?.map((item) => (
                <a
                  className="cv-media-secondary-item"
                  href={item.mapLinks?.[0]?.url || "#"}
                  key={item.id}
                >
                  {item.media?.type === "video" ? (
                    <video
                      className="cv-media-asset"
                      src={item.media?.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : null}
                  {item.media?.type !== "video" ? (
                    <img
                      className="cv-media-asset"
                      src={item.media?.url}
                      alt={item.altText || item.title || ""}
                    />
                  ) : null}
                </a>
              ))}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export default MediaGrid;
