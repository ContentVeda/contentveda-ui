import { Show, For, onMount, createSignal, createMemo } from "solid-js";

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
  const [currentIndex, setCurrentIndex] = createSignal(0);

  const [intervalId, setIntervalId] = createSignal(null);

  const [isVisible, setIsVisible] = createSignal(false);

  const shouldMount = createMemo(() => {
    return props.lazyLoad === false || isVisible();
  });

  const showSkeleton = createMemo(() => {
    return !!props.isLoading || !shouldMount();
  });

  const columns = createMemo(() => {
    return props.config?.columns || 2;
  });

  const slideSets = createMemo(() => {
    const sets: WidgetItem[][] = [];
    const currentItems = props.items || [];
    const cols = columns();
    for (let i = 0; i < currentItems.length; i += cols) {
      sets.push(currentItems.slice(i, i + cols));
    }
    return sets;
  });

  const totalSlides = createMemo(() => {
    return slideSets().length;
  });

  function next() {
    if (totalSlides() <= 1) return;
    setCurrentIndex((currentIndex() + 1) % totalSlides());
  }

  function prev() {
    if (totalSlides() <= 1) return;
    setCurrentIndex((currentIndex() - 1 + totalSlides()) % totalSlides());
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
    if (intervalId()) {
      clearInterval(intervalId());
    }
  }

  let rootRef: HTMLDivElement;

  onMount(() => {
    if (props.lazyLoad === false) {
      setIsVisible(true);
      startAutoPlay();
      return;
    }
    if (rootRef) {
      observerBox.disconnect = observeLazyMount(
        rootRef,
        () => {
          setIsVisible(true);
          startAutoPlay();
        },
        props.lazyThreshold ?? 0.1,
        props.lazyRootMargin ?? "200px"
      );
    }
  });

  return (
    <>
      <div
        class={`cv-alt-slider ${showSkeleton() ? "cv-image-shimmer" : ""} ${
          props.className || ""
        }`}
        role="region"
        ref={rootRef!}
        onMouseEnter={(event) => stopAutoPlay()}
        onMouseLeave={(event) => startAutoPlay()}
        style={{
          height: props.config?.height || "",
          "min-height":
            props.config?.height === "auto"
              ? "auto"
              : props.config?.minHeight || "",
        }}
      >
        <Show
          when={props.config?.height === "auto" && props.items?.[0]?.media?.url}
        >
          <img
            alt=""
            src={props.items[0].media.url}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              visibility: "hidden",
              "pointer-events": "none",
            }}
          />
        </Show>
        <div
          class="cv-alt-cols-container"
          style={{
            "grid-template-columns": `repeat(${columns()}, 1fr)`,
            position: props.config?.height === "auto" ? "absolute" : "relative",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <For
            each={Array.from({
              length: columns(),
            })}
          >
            {(_, _index) => {
              const colIndex = _index();
              return (
                <div class="cv-alt-col" key={`col-${colIndex}`}>
                  <div
                    class="cv-alt-track"
                    style={{
                      transform: `translateY(${
                        colIndex % 2 === 0
                          ? -currentIndex() * 100
                          : currentIndex() * 100
                      }%)`,
                    }}
                  >
                    <For each={slideSets()}>
                      {(slideRow, _index) => {
                        const slideIndex = _index();
                        return (
                          <div
                            class="cv-alt-cell"
                            key={`cell-${slideIndex}-${colIndex}`}
                            style={{
                              top: `${
                                colIndex % 2 === 0
                                  ? slideIndex * 100
                                  : -slideIndex * 100
                              }%`,
                            }}
                          >
                            <Show when={slideRow[colIndex]}>
                              <Show
                                when={slideRow[colIndex].mapLinks?.[0]?.url}
                              >
                                <a
                                  class="cv-alt-content-wrap"
                                  href={slideRow[colIndex].mapLinks[0].url}
                                  style={{
                                    display: "block",
                                    "text-decoration": "none",
                                    color: "inherit",
                                  }}
                                >
                                  <Show
                                    when={
                                      shouldMount() &&
                                      slideRow[colIndex].media?.type === "video"
                                    }
                                  >
                                    <video
                                      class={`cv-alt-bg-video ${
                                        showSkeleton() ? "cv-image-shimmer" : ""
                                      }`}
                                      src={slideRow[colIndex].media?.url}
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
                                      }}
                                    ></video>
                                  </Show>
                                  <Show
                                    when={
                                      shouldMount() &&
                                      slideRow[colIndex].media?.type !== "video"
                                    }
                                  >
                                    <div
                                      class={`cv-alt-bg ${
                                        showSkeleton() ? "cv-image-shimmer" : ""
                                      }`}
                                      style={{
                                        "background-image": slideRow[colIndex]
                                          .media?.url
                                          ? `url(${slideRow[colIndex].media.url})`
                                          : "none",
                                        "background-position":
                                          props.config?.bgPosition || "center",
                                      }}
                                    ></div>
                                  </Show>
                                  <div class="cv-alt-overlay"></div>
                                  <div
                                    class="cv-alt-content"
                                    style={{
                                      "text-align":
                                        slideRow[colIndex].textAlignment ||
                                        "left",
                                      display: "flex",
                                      "flex-direction": "column",
                                      "align-items":
                                        (slideRow[colIndex].textAlignment ||
                                          "left") === "center"
                                          ? "center"
                                          : (slideRow[colIndex].textAlignment ||
                                              "left") === "right"
                                          ? "flex-end"
                                          : "flex-start",
                                    }}
                                  >
                                    <Show when={showSkeleton()}>
                                      <div
                                        class="cv-skeleton-title cv-image-shimmer"
                                        style={{
                                          width: "60%",
                                          height: "24px",
                                          "margin-bottom": "12px",
                                        }}
                                      ></div>
                                      <div
                                        class="cv-skeleton-text cv-image-shimmer"
                                        style={{
                                          width: "80%",
                                          height: "14px",
                                          "margin-bottom": "8px",
                                        }}
                                      ></div>
                                      <div
                                        class="cv-skeleton-text cv-image-shimmer"
                                        style={{
                                          width: "50%",
                                          height: "14px",
                                          "margin-bottom": "16px",
                                        }}
                                      ></div>
                                      <div
                                        class="cv-skeleton-button cv-image-shimmer"
                                        style={{
                                          width: "110px",
                                          height: "36px",
                                        }}
                                      ></div>
                                    </Show>
                                    <Show when={!showSkeleton()}>
                                      <h2 class="cv-alt-title">
                                        {slideRow[colIndex].title}
                                      </h2>
                                      <Show when={slideRow[colIndex].subtitle}>
                                        <p class="cv-alt-subtitle">
                                          {slideRow[colIndex].subtitle}
                                        </p>
                                      </Show>
                                      <Show when={slideRow[colIndex].ctaText}>
                                        <span class="cv-alt-cta">
                                          {slideRow[colIndex].ctaText}
                                        </span>
                                      </Show>
                                    </Show>
                                  </div>
                                </a>
                              </Show>
                              <Show
                                when={!slideRow[colIndex].mapLinks?.[0]?.url}
                              >
                                <div class="cv-alt-content-wrap">
                                  <Show
                                    when={
                                      shouldMount() &&
                                      slideRow[colIndex].media?.type === "video"
                                    }
                                  >
                                    <video
                                      class={`cv-alt-bg-video ${
                                        showSkeleton() ? "cv-image-shimmer" : ""
                                      }`}
                                      src={slideRow[colIndex].media?.url}
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
                                      }}
                                    ></video>
                                  </Show>
                                  <Show
                                    when={
                                      shouldMount() &&
                                      slideRow[colIndex].media?.type !== "video"
                                    }
                                  >
                                    <div
                                      class={`cv-alt-bg ${
                                        showSkeleton() ? "cv-image-shimmer" : ""
                                      }`}
                                      style={{
                                        "background-image": slideRow[colIndex]
                                          .media?.url
                                          ? `url(${slideRow[colIndex].media.url})`
                                          : "none",
                                        "background-position":
                                          props.config?.bgPosition || "center",
                                      }}
                                    ></div>
                                  </Show>
                                  <div class="cv-alt-overlay"></div>
                                  <div
                                    class="cv-alt-content"
                                    style={{
                                      "text-align":
                                        slideRow[colIndex].textAlignment ||
                                        "left",
                                      display: "flex",
                                      "flex-direction": "column",
                                      "align-items":
                                        (slideRow[colIndex].textAlignment ||
                                          "left") === "center"
                                          ? "center"
                                          : (slideRow[colIndex].textAlignment ||
                                              "left") === "right"
                                          ? "flex-end"
                                          : "flex-start",
                                    }}
                                  >
                                    <Show when={showSkeleton()}>
                                      <div
                                        class="cv-skeleton-title cv-image-shimmer"
                                        style={{
                                          width: "60%",
                                          height: "24px",
                                          "margin-bottom": "12px",
                                        }}
                                      ></div>
                                      <div
                                        class="cv-skeleton-text cv-image-shimmer"
                                        style={{
                                          width: "80%",
                                          height: "14px",
                                          "margin-bottom": "8px",
                                        }}
                                      ></div>
                                      <div
                                        class="cv-skeleton-text cv-image-shimmer"
                                        style={{
                                          width: "50%",
                                          height: "14px",
                                          "margin-bottom": "16px",
                                        }}
                                      ></div>
                                      <div
                                        class="cv-skeleton-button cv-image-shimmer"
                                        style={{
                                          width: "110px",
                                          height: "36px",
                                        }}
                                      ></div>
                                    </Show>
                                    <Show when={!showSkeleton()}>
                                      <h2 class="cv-alt-title">
                                        {slideRow[colIndex].title}
                                      </h2>
                                      <Show when={slideRow[colIndex].subtitle}>
                                        <p class="cv-alt-subtitle">
                                          {slideRow[colIndex].subtitle}
                                        </p>
                                      </Show>
                                      <Show when={slideRow[colIndex].ctaText}>
                                        <span class="cv-alt-cta">
                                          {slideRow[colIndex].ctaText}
                                        </span>
                                      </Show>
                                    </Show>
                                  </div>
                                </div>
                              </Show>
                            </Show>
                          </div>
                        );
                      }}
                    </For>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
        <Show
          when={
            props.config?.showArrows &&
            (!props.config?.hideArrowsIfNoScroll || slideSets().length > 1)
          }
        >
          <>
            <button
              class="cv-alt-arrow prev"
              type="button"
              aria-label="Previous"
              onClick={(event) => prev()}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              class="cv-alt-arrow next"
              type="button"
              aria-label="Next"
              onClick={(event) => next()}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </>
        </Show>
        <Show when={props.config?.showDots}>
          <div class="cv-alt-dots">
            <For each={slideSets()}>
              {(_, _index) => {
                const index = _index();
                return (
                  <button
                    class={`cv-alt-dot ${
                      index === currentIndex() ? "active" : ""
                    }`}
                    type="button"
                    key={`dot-${index}`}
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={(event) => goTo(index)}
                  ></button>
                );
              }}
            </For>
          </div>
        </Show>
      </div>
    </>
  );
}

export default AlternatingSlider;
