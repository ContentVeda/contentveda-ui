import { Show, For, onMount, createSignal, createMemo } from "solid-js";

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
  const [canScrollLeft, setCanScrollLeft] = createSignal(false);

  const [canScrollRight, setCanScrollRight] = createSignal(false);

  const [hasOverflow, setHasOverflow] = createSignal(false);

  const [isVisible, setIsVisible] = createSignal(false);

  const [observerBox, setObserverBox] = createSignal({
    disconnect: null as (() => void) | null,
    row: null as any,
  });

  const shouldMount = createMemo(() => {
    return props.lazyLoad === false || isVisible();
  });

  const showSkeleton = createMemo(() => {
    return !!props.isLoading || !shouldMount();
  });

  const showArrows = createMemo(() => {
    if (props.config?.showArrows === false) return false;
    if (props.config?.hideArrowsIfNoScroll !== false && !hasOverflow())
      return false;
    return true;
  });

  function checkScroll() {
    const el = rowRef;
    if (el) {
      setHasOverflow(el.scrollWidth > el.clientWidth + 5);
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    }
  }

  function scroll(direction: "left" | "right") {
    const el = rowRef;
    if (el) {
      const scrollAmount = 300;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }

  let containerRef: HTMLDivElement;
  let rowRef: HTMLDivElement;

  onMount(() => {
    const el = rowRef;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      // Allow DOM to render then check
      setTimeout(() => {
        checkScroll();
      }, 150);
      if (typeof ResizeObserver !== "undefined") {
        observerBox().row = new ResizeObserver(() => checkScroll());
        observerBox().row.observe(el);
      }
    }
    window.addEventListener("resize", checkScroll);
    if (props.lazyLoad === false) {
      setIsVisible(true);
      return;
    }
    if (containerRef) {
      observerBox().disconnect = observeLazyMount(
        containerRef,
        () => {
          setIsVisible(true);
        },
        props.lazyThreshold ?? 0.1,
        props.lazyRootMargin ?? "200px"
      );
    }
  });

  return (
    <>
      <div
        class={`cv-scrollable-container ${props.className || ""}`}
        ref={containerRef!}
      >
        <Show when={props.title}>
          <h3 class="cv-scrollable-title">{props.title}</h3>
        </Show>
        <div
          class="cv-scrollable-wrapper"
          style={{
            position: "relative",
          }}
        >
          <div
            class={`cv-scrollable-row ${
              props.config?.hideScrollbar ? "cv-scrollable-hide-scrollbar" : ""
            }`}
            ref={rowRef!}
          >
            <For each={props.items}>
              {(item) => {
                return (
                  <a
                    class={`cv-scrollable-card ${
                      showSkeleton() ? "cv-image-shimmer" : ""
                    }`}
                    href={item.mapLinks?.[0]?.url || undefined}
                    key={item.id}
                  >
                    <Show when={!showSkeleton()}>
                      <Show when={item.media?.url}>
                        <div class="cv-scrollable-img-wrap">
                          <Show when={item.media?.type === "video"}>
                            <video
                              class="cv-scrollable-img"
                              src={item.media?.url}
                              autoPlay={true}
                              loop={true}
                              muted={true}
                              playsInline={true}
                            ></video>
                          </Show>
                          <Show when={item.media?.type !== "video"}>
                            <img
                              class="cv-scrollable-img"
                              src={item.media?.url}
                              alt={item.title || ""}
                            />
                          </Show>
                        </div>
                      </Show>
                      <div class="cv-scrollable-body">
                        <Show when={item.title}>
                          <div class="cv-scrollable-card-title">
                            {item.title}
                          </div>
                        </Show>
                        <Show when={item.subtitle}>
                          <div class="cv-scrollable-card-sub">
                            {item.subtitle}
                          </div>
                        </Show>
                      </div>
                    </Show>
                  </a>
                );
              }}
            </For>
          </div>
          <Show when={showArrows()}>
            <div
              style={{
                display: "contents",
              }}
            >
              <button
                class="cv-scrollable-arrow prev"
                type="button"
                aria-label="Previous"
                onClick={(event) => scroll("left")}
                style={{
                  opacity: !canScrollLeft() ? "0.35" : "1",
                  "pointer-events": !canScrollLeft() ? "none" : "auto",
                }}
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
                class="cv-scrollable-arrow next"
                type="button"
                aria-label="Next"
                onClick={(event) => scroll("right")}
                style={{
                  opacity: !canScrollRight() ? "0.35" : "1",
                  "pointer-events": !canScrollRight() ? "none" : "auto",
                }}
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
            </div>
          </Show>
        </div>
      </div>
    </>
  );
}

export default RowScrollable;
