import { Show, For, onMount, createSignal, createMemo } from "solid-js";

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
      <div class={`cv-media-grid ${props.className || ""}`} ref={rootRef!}>
        <Show when={showSkeleton()}>
          <div class="cv-media-primary cv-image-shimmer"></div>
          <div class="cv-media-secondary-col">
            <div class="cv-media-secondary-item cv-image-shimmer"></div>
            <div class="cv-media-secondary-item cv-image-shimmer"></div>
          </div>
        </Show>
        <Show when={!showSkeleton()}>
          <Show when={props.primaryMedia}>
            <a
              class="cv-media-primary"
              href={props.primaryMedia.mapLinks?.[0]?.url || undefined}
              aria-label={
                props.primaryMedia.mapLinks?.[0]?.url
                  ? props.primaryMedia.altText ||
                    props.primaryMedia.title ||
                    "Media content"
                  : undefined
              }
            >
              <Show when={props.primaryMedia.media?.type === "video"}>
                <video
                  class="cv-media-asset"
                  src={props.primaryMedia.media?.url}
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                ></video>
              </Show>
              <Show when={props.primaryMedia.media?.type !== "video"}>
                <img
                  class="cv-media-asset"
                  src={props.primaryMedia.media?.url}
                  alt={
                    props.primaryMedia.altText || props.primaryMedia.title || ""
                  }
                />
              </Show>
            </a>
          </Show>
          <Show when={props.secondaryMedia && props.secondaryMedia.length > 0}>
            <div class="cv-media-secondary-col">
              <For each={props.secondaryMedia}>
                {(item, _index) => {
                  const index = _index();
                  return (
                    <a
                      class="cv-media-secondary-item"
                      href={item.mapLinks?.[0]?.url || undefined}
                      key={item.id}
                      aria-label={
                        item.mapLinks?.[0]?.url
                          ? item.altText || item.title || "Media content"
                          : undefined
                      }
                    >
                      <Show when={item.media?.type === "video"}>
                        <video
                          class="cv-media-asset"
                          src={item.media?.url}
                          autoPlay={true}
                          loop={true}
                          muted={true}
                          playsInline={true}
                        ></video>
                      </Show>
                      <Show when={item.media?.type !== "video"}>
                        <img
                          class="cv-media-asset"
                          src={item.media?.url}
                          alt={item.altText || item.title || ""}
                        />
                      </Show>
                    </a>
                  );
                }}
              </For>
            </div>
          </Show>
        </Show>
      </div>
    </>
  );
}

export default MediaGrid;
