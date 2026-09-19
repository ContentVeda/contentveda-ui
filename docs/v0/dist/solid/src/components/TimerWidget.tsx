import {
  Show,
  onMount,
  on,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";

export interface TimerWidgetProps {
  targetDate: string;
  title?: string;
  className?: string;
  variant?: "neon" | "dark" | "gray";
  backgroundImageUrl?: string;
  backgroundPosition?: string;
  overlay?: string;
  backgroundEffect?: BackgroundEffectName;
  backgroundEffectPlugin?: BackgroundEffectPlugin;
  expiredText?: string;
  width?: string;
  height?: string;
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

function TimerWidget(props: TimerWidgetProps) {
  const [timeLeft, setTimeLeft] = createSignal({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [timerId, setTimerId] = createSignal(null);

  const [isExpired, setIsExpired] = createSignal(false);

  const [animContext, setAnimContext] = createSignal({
    animationFrameId: null,
    resizeHandler: null,
    resizeObserver: null,
  });

  const [observerBox, setObserverBox] = createSignal({
    disconnect: null as (() => void) | null,
  });

  function calculateTimeLeft() {
    const difference =
      new Date(props.targetDate).getTime() - new Date().getTime();
    if (difference > 0) {
      setIsExpired(false);
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    } else {
      setIsExpired(true);
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  }

  function startTicking() {
    calculateTimeLeft();
    setTimerId(
      setInterval(() => {
        calculateTimeLeft();
      }, 1000)
    );
  }

  const hasBackgroundImage = createMemo(() => {
    return !!props.backgroundImageUrl;
  });

  const widthValue = createMemo(() => {
    return props.width || "100%";
  });

  const heightMode = createMemo(() => {
    return props.height || "auto";
  });

  const useImageForHeight = createMemo(() => {
    return hasBackgroundImage() && heightMode() === "auto";
  });

  const fixedHeightValue = createMemo(() => {
    return heightMode() !== "auto" ? heightMode() : undefined;
  });

  const contentOverlaysBox = createMemo(() => {
    return useImageForHeight() || !!fixedHeightValue();
  });

  const backgroundEffectClass = createMemo(() => {
    return props.backgroundEffect || "none";
  });

  const plugin = createMemo(() => {
    return props.backgroundEffectPlugin || defaultBackgroundEffectPlugin;
  });

  let rootRef: HTMLDivElement;
  let canvasRef: HTMLCanvasElement;

  onMount(() => {
    if (props.lazyLoad === false) {
      startTicking();
      if (canvasRef)
        plugin().start(
          canvasRef,
          backgroundEffectClass() as BackgroundEffectName,
          animContext()
        );
      return;
    }
    if (rootRef) {
      observerBox().disconnect = observeLazyMount(
        rootRef,
        () => {
          startTicking();
          if (canvasRef)
            plugin().start(
              canvasRef,
              backgroundEffectClass() as BackgroundEffectName,
              animContext()
            );
        },
        props.lazyThreshold ?? 0.1,
        props.lazyRootMargin ?? "200px"
      );
    }
  });

  const onUpdateFn_0_backgroundEffectClass__ = createMemo(() =>
    backgroundEffectClass()
  );
  const onUpdateFn_0_canvasRef = createMemo(() => canvasRef);
  function onUpdateFn_0() {
    if (canvasRef)
      plugin().start(
        canvasRef,
        backgroundEffectClass() as BackgroundEffectName,
        animContext()
      );
  }
  createEffect(
    on(
      () => [onUpdateFn_0_backgroundEffectClass__(), onUpdateFn_0_canvasRef()],
      onUpdateFn_0
    )
  );

  return (
    <>
      <div
        class={`cv-timer-widget cv-timer-variant-${props.variant || "dark"} ${
          hasBackgroundImage() ? "cv-timer-has-bg" : ""
        } ${props.className || ""}`}
        ref={rootRef!}
        style={{
          width: widthValue(),
          height: fixedHeightValue() || undefined,
          "background-image":
            hasBackgroundImage() && !useImageForHeight()
              ? `url(${props.backgroundImageUrl})`
              : undefined,
          "background-position": props.backgroundPosition || "center",
        }}
      >
        <Show when={useImageForHeight()}>
          <img
            alt=""
            src={props.backgroundImageUrl}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              "object-fit": "cover",
              "object-position": props.backgroundPosition || "center",
            }}
          />
        </Show>
        <Show when={hasBackgroundImage()}>
          <div
            class="cv-timer-overlay"
            style={{
              background:
                props.overlay || "var(--cv-color-scrim, rgba(0, 0, 0, 0.45))",
            }}
          ></div>
        </Show>
        <Show when={backgroundEffectClass() !== "none"}>
          <canvas
            class="cv-timer-bg-effect"
            aria-hidden="true"
            ref={canvasRef!}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              "z-index": 0,
              "pointer-events": "none",
            }}
          ></canvas>
        </Show>
        <div
          class="cv-timer-content"
          style={{
            position: contentOverlaysBox() ? "absolute" : "relative",
            top: contentOverlaysBox() ? 0 : undefined,
            left: contentOverlaysBox() ? 0 : undefined,
            width: contentOverlaysBox() ? "100%" : undefined,
            height: contentOverlaysBox() ? "100%" : undefined,
          }}
        >
          <Show when={props.title}>
            <h3 class="cv-timer-title">{props.title}</h3>
          </Show>
          <Show when={!isExpired()}>
            <div
              class="cv-timer-blocks"
              role="timer"
              aria-live="off"
              aria-label={`Time remaining: ${timeLeft().days} days, ${
                timeLeft().hours
              } hours, ${timeLeft().minutes} minutes, ${
                timeLeft().seconds
              } seconds`}
            >
              <div class="cv-timer-block">
                <span class="cv-timer-value" aria-hidden="true">
                  {timeLeft().days}
                </span>
                <span class="cv-timer-label" aria-hidden="true">
                  Days
                </span>
              </div>
              <div class="cv-timer-block">
                <span class="cv-timer-value" aria-hidden="true">
                  {timeLeft().hours}
                </span>
                <span class="cv-timer-label" aria-hidden="true">
                  Hours
                </span>
              </div>
              <div class="cv-timer-block">
                <span class="cv-timer-value" aria-hidden="true">
                  {timeLeft().minutes}
                </span>
                <span class="cv-timer-label" aria-hidden="true">
                  Minutes
                </span>
              </div>
              <div class="cv-timer-block">
                <span class="cv-timer-value" aria-hidden="true">
                  {timeLeft().seconds}
                </span>
                <span class="cv-timer-label" aria-hidden="true">
                  Seconds
                </span>
              </div>
            </div>
          </Show>
          <Show when={!!isExpired() && !!props.expiredText}>
            <p class="cv-timer-expired">{props.expiredText}</p>
          </Show>
        </div>
      </div>
    </>
  );
}

export default TimerWidget;
