import { Show, For, onMount, createSignal, createMemo } from "solid-js";

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
  const [isVisible, setIsVisible] = createSignal(false);

  const [observerBox, setObserverBox] = createSignal({
    disconnect: null as (() => void) | null,
  });

  const shouldMount = createMemo(() => {
    return props.lazyLoad === false || isVisible();
  });

  const showSkeleton = createMemo(() => {
    return !!props.isLoading || !shouldMount();
  });

  const gridTemplateColumns = createMemo(() => {
    const cols = props.columns || 3;
    return `repeat(${cols}, 1fr)`;
  });

  const columnsTabletVar = createMemo(() => {
    return `${props.columnsTablet || 2}`;
  });

  const columnsMobileVar = createMemo(() => {
    return `${props.columnsMobile || props.columnsTablet || 2}`;
  });

  let rootRef: HTMLDivElement;

  onMount(() => {
    if (props.lazyLoad === false) {
      setIsVisible(true);
      return;
    }
    if (rootRef) {
      observerBox().disconnect = observeLazyMount(
        rootRef,
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
        class={`cv-grid-banner ${props.className || ""}`}
        ref={rootRef!}
        style={{
          "grid-template-columns": gridTemplateColumns(),
          "cv-grid-cols-tablet": columnsTabletVar(),
          "cv-grid-cols-mobile": columnsMobileVar(),
          height: props.config?.height || "",
          "min-height": props.config?.minHeight || "",
        }}
      >
        <For each={props.items}>
          {(item, _index) => {
            const index = _index();
            return (
              <a
                class="cv-grid-item"
                href={item.mapLinks?.[0]?.url || undefined}
                key={item.id || index}
              >
                <div
                  class={`cv-grid-img-wrap ${
                    showSkeleton() ? "cv-image-shimmer" : ""
                  }`}
                  style={{
                    height: props.config?.height || "",
                    "min-height": props.config?.minHeight || "",
                    "aspect-ratio": props.config?.height ? "unset" : "16/9",
                  }}
                >
                  <Show when={!showSkeleton()}>
                    <Show when={item.media?.type === "video"}>
                      <video
                        class="cv-grid-img"
                        src={item.media?.url}
                        autoPlay={true}
                        loop={true}
                        muted={true}
                        playsInline={true}
                        style={{
                          "object-fit": "cover",
                          width: "100%",
                          height: "100%",
                          "object-position":
                            props.config?.bgPosition || "center",
                        }}
                      ></video>
                    </Show>
                    <Show when={item.media?.type !== "video"}>
                      <img
                        class="cv-grid-img"
                        src={item.media?.url}
                        alt={item.title}
                        style={{
                          "object-fit": "cover",
                          width: "100%",
                          height: "100%",
                          "object-position":
                            props.config?.bgPosition || "center",
                        }}
                      />
                    </Show>
                  </Show>
                </div>
                <Show when={showSkeleton()}>
                  <div
                    style={{
                      display: "flex",
                      "flex-direction": "column",
                      "align-items": item.textAlignment || "center",
                      width: "100%",
                      "margin-top": "12px",
                    }}
                  >
                    <div
                      class="cv-skeleton-text cv-image-shimmer"
                      style={{
                        width: "70%",
                        height: "14px",
                        margin: "0 0 6px 0",
                      }}
                    ></div>
                    <div
                      class="cv-skeleton-text cv-image-shimmer"
                      style={{
                        width: "40%",
                        height: "10px",
                        margin: 0,
                      }}
                    ></div>
                  </div>
                </Show>
                <Show when={!showSkeleton()}>
                  <div
                    class="cv-grid-title"
                    style={{
                      "text-align": item.textAlignment || "center",
                    }}
                  >
                    {item.title}
                  </div>
                </Show>
              </a>
            );
          }}
        </For>
      </div>
    </>
  );
}

export default GridBanner;
