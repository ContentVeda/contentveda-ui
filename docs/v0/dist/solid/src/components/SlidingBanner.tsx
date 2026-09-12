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
  const [currentIndex, setCurrentIndex] = createSignal(0);

  const [previousIndex, setPreviousIndex] = createSignal(0);

  const [direction, setDirection] = createSignal("next");

  const [isVisible, setIsVisible] = createSignal(false);

  const [wrapping, setWrapping] = createSignal(false);

  const [animContext, setAnimContext] = createSignal({
    intervalId: null as any,
    dimResizeHandler: null as any,
  });

  const [bgEffectContext, setBgEffectContext] = createSignal({
    animationFrameId: null,
    resizeHandler: null,
    resizeObserver: null,
  });

  const [observerBox, setObserverBox] = createSignal({
    disconnect: null as (() => void) | null,
  });

  const [latestNext, setLatestNext] = createSignal({
    fn: () => {},
  });

  const shouldMount = createMemo(() => {
    return props.lazyLoad === false || isVisible();
  });

  const showSkeleton = createMemo(() => {
    return !!props.isLoading || !shouldMount();
  });

  const animationClass = createMemo(() => {
    return props.config?.animationEffect || "slide";
  });

  const backgroundClass = createMemo(() => {
    return props.config?.backgroundEffect || "none";
  });

  const plugin = createMemo(() => {
    return (
      props.config?.backgroundEffectPlugin || defaultBackgroundEffectPlugin
    );
  });

  const qualityClass = createMemo(() => {
    return props.config?.animationQuality || "detailed";
  });

  function next() {
    if (!props.items?.length) return;
    setDirection("next");
    setPreviousIndex(currentIndex());
    if (currentIndex() >= props.items.length - 1) {
      if (props.config?.rotateAgain !== false) {
        setWrapping(true);
        setCurrentIndex(0);
      }
    } else {
      setCurrentIndex(currentIndex() + 1);
    }
  }

  function prev() {
    if (!props.items?.length) return;
    setDirection("prev");
    setPreviousIndex(currentIndex());
    if (currentIndex() <= 0) {
      if (props.config?.rotateAgain !== false) {
        setWrapping(true);
        setCurrentIndex(props.items.length - 1);
      }
    } else {
      setCurrentIndex(currentIndex() - 1);
    }
  }

  function goTo(index: number) {
    if (currentIndex() !== index) {
      setDirection(index > currentIndex() ? "next" : "prev");
      setPreviousIndex(currentIndex());
      setCurrentIndex(index);
    }
  }

  function startAutoPlay() {
    if (animContext().intervalId) return;
    if (props.config?.autoStart !== false && props.items?.length > 1) {
      animContext().intervalId = setInterval(() => {
        latestNext().fn();
      }, props.config?.delayMs || 5000);
    }
  }

  function stopAutoPlay() {
    if (animContext().intervalId) {
      clearInterval(animContext().intervalId);
      animContext().intervalId = null;
    }
  }

  function setupDimensions() {
    if (rootRef) {
      rootRef.style.setProperty(
        "--slider-half-width",
        `${rootRef.offsetWidth / 2}px`
      );
    }
  }

  function mountHeavyContent() {
    startAutoPlay();
    setupDimensions();
    animContext().dimResizeHandler = () => setupDimensions();
    window.addEventListener("resize", animContext().dimResizeHandler);
    if (canvasRef) {
      plugin().start(
        canvasRef,
        backgroundClass() as BackgroundEffectName,
        bgEffectContext()
      );
    }
  }

  let rootRef: HTMLDivElement;
  let canvasRef: HTMLCanvasElement;

  onMount(() => {
    if (props.lazyLoad === false) {
      setIsVisible(true);
      mountHeavyContent();
      return;
    }
    if (rootRef) {
      observerBox().disconnect = observeLazyMount(
        rootRef,
        () => {
          setIsVisible(true);
          mountHeavyContent();
        },
        props.lazyThreshold ?? 0.1,
        props.lazyRootMargin ?? "200px"
      );
    }
  });

  const onUpdateFn_1_wrapping__ = createMemo(() => wrapping());
  function onUpdateFn_1() {
    if (wrapping()) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWrapping(false);
        });
      });
    }
  }
  createEffect(on(() => [onUpdateFn_1_wrapping__()], onUpdateFn_1));

  const onUpdateFn_2_backgroundClass__ = createMemo(() => backgroundClass());
  const onUpdateFn_2_canvasRef = createMemo(() => canvasRef);
  function onUpdateFn_2() {
    if (isVisible() && canvasRef) {
      plugin().start(
        canvasRef,
        backgroundClass() as BackgroundEffectName,
        bgEffectContext()
      );
    }
  }
  createEffect(
    on(
      () => [onUpdateFn_2_backgroundClass__(), onUpdateFn_2_canvasRef()],
      onUpdateFn_2
    )
  );

  return (
    <>
      <div
        class={`cv-sliding-banner ${showSkeleton() ? "cv-image-shimmer" : ""} ${
          props.className || ""
        } effect-${animationClass()} bg-effect-${backgroundClass()} quality-${qualityClass()} ${
          props.config?.showDots ? "has-dots" : ""
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
        <Show when={backgroundClass() !== "none"}>
          <canvas class="cv-sliding-banner-canvas" ref={canvasRef!}></canvas>
        </Show>
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
          class={`cv-sliding-banner-track dir-${direction()} ${
            wrapping() ? "no-transition" : ""
          }`}
          style={{
            transform: `translateX(-${currentIndex() * 100}%)`,
            position: props.config?.height === "auto" ? "absolute" : "relative",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <For each={props.items}>
            {(item, _index) => {
              const index = _index();
              return (
                <div
                  class={`cv-sliding-slide ${
                    index === currentIndex() ? "active" : ""
                  } ${
                    index === previousIndex() && index !== currentIndex()
                      ? "previous"
                      : ""
                  }`}
                  key={item.id || index}
                >
                  <Show when={shouldMount() && item.media?.type === "video"}>
                    <video
                      class={`cv-sliding-bg-video ${
                        showSkeleton() ? "cv-image-shimmer" : ""
                      }`}
                      src={item.media?.url}
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
                  <Show when={shouldMount() && item.media?.type !== "video"}>
                    <div
                      class={`cv-sliding-bg ${
                        showSkeleton() ? "cv-image-shimmer" : ""
                      }`}
                      style={{
                        "background-image": item.media?.url
                          ? `url(${item.media.url})`
                          : "none",
                        "background-position":
                          props.config?.bgPosition || "center",
                      }}
                    ></div>
                  </Show>
                  <Show
                    when={
                      animationClass() === "curtain" &&
                      item.media?.type !== "video"
                    }
                  >
                    <div
                      class="cv-curtain-panel cv-curtain-panel-left"
                      style={{
                        "background-image": item.media?.url
                          ? `url(${item.media.url})`
                          : "none",
                        "background-position":
                          props.config?.bgPosition || "center",
                      }}
                    ></div>
                    <div
                      class="cv-curtain-panel cv-curtain-panel-right"
                      style={{
                        "background-image": item.media?.url
                          ? `url(${item.media.url})`
                          : "none",
                        "background-position":
                          props.config?.bgPosition || "center",
                      }}
                    ></div>
                  </Show>
                  <Show when={animationClass() === "cube"}>
                    <div class="cv-cube-side"></div>
                  </Show>
                  <div class="cv-sliding-overlay"></div>
                  <div
                    class="cv-sliding-content"
                    style={{
                      "text-align":
                        item.textAlignment || props.config?.align || "center",
                      display: "flex",
                      "flex-direction": "column",
                      "align-items":
                        (item.textAlignment ||
                          props.config?.align ||
                          "center") === "center"
                          ? "center"
                          : (item.textAlignment ||
                              props.config?.align ||
                              "center") === "right"
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    <Show when={showSkeleton()}>
                      <div
                        class="cv-skeleton-title cv-image-shimmer"
                        style={{
                          width: "50%",
                          height: "32px",
                          "margin-bottom": "16px",
                        }}
                      ></div>
                      <div
                        class="cv-skeleton-text cv-image-shimmer"
                        style={{
                          width: "70%",
                          height: "16px",
                          "margin-bottom": "10px",
                        }}
                      ></div>
                      <div
                        class="cv-skeleton-text cv-image-shimmer"
                        style={{
                          width: "40%",
                          height: "16px",
                          "margin-bottom": "24px",
                        }}
                      ></div>
                      <div
                        class="cv-skeleton-button cv-image-shimmer"
                        style={{
                          width: "130px",
                          height: "40px",
                        }}
                      ></div>
                    </Show>
                    <Show when={!showSkeleton()}>
                      <h2 class="cv-sliding-title">{item.title}</h2>
                      <Show when={item.subtitle}>
                        <p class="cv-sliding-subtitle">{item.subtitle}</p>
                      </Show>
                      <Show when={item.ctaText}>
                        <a
                          class="cv-sliding-cta"
                          href={item.mapLinks?.[0]?.url || undefined}
                        >
                          {item.ctaText}
                        </a>
                      </Show>
                    </Show>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
        <Show
          when={
            (props.config?.showArrows || props.config?.showNextPrev) &&
            (!props.config?.hideArrowsIfNoScroll ||
              (props.items && props.items.length > 1))
          }
        >
          <>
            <button
              class="cv-sliding-arrow prev"
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
              class="cv-sliding-arrow next"
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
          <div class="cv-sliding-dots">
            <For each={props.items}>
              {(_, _index) => {
                const index = _index();
                return (
                  <button
                    class={`cv-sliding-dot ${
                      index === currentIndex() ? "active" : ""
                    }`}
                    type="button"
                    key={index}
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

export default SlidingBanner;
