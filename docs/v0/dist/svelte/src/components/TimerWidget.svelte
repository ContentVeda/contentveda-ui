<svelte:options runes={false} />
<script context="module" lang="ts">
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
</script>

<script lang="ts">
  let animContext = { animationFrameId: null, resizeHandler: null };
  let observerBox = { disconnect: null };
  import { onDestroy, onMount } from "svelte";

  import { observeLazyMount } from "../utils/lazyObserver";
  import { defaultBackgroundEffectPlugin } from "../utils/backgroundEffects";
  import type {
    BackgroundEffectContext,
    BackgroundEffectName,
    BackgroundEffectPlugin,
  } from "../utils/backgroundEffects";

  export let lazyLoad: TimerWidgetProps["lazyLoad"];
  export let lazyThreshold: TimerWidgetProps["lazyThreshold"];
  export let lazyRootMargin: TimerWidgetProps["lazyRootMargin"];
  export let targetDate: TimerWidgetProps["targetDate"];
  export let backgroundImageUrl: TimerWidgetProps["backgroundImageUrl"];
  export let width: TimerWidgetProps["width"];
  export let height: TimerWidgetProps["height"];
  export let backgroundEffect: TimerWidgetProps["backgroundEffect"];
  export let backgroundEffectPlugin: TimerWidgetProps["backgroundEffectPlugin"];
  export let variant: TimerWidgetProps["variant"];
  export let className: TimerWidgetProps["className"];
  export let backgroundPosition: TimerWidgetProps["backgroundPosition"];
  export let overlay: TimerWidgetProps["overlay"];
  export let title: TimerWidgetProps["title"];
  export let expiredText: TimerWidgetProps["expiredText"];
  function stringifyStyles(stylesObj) {
    let styles = "";
    for (let key in stylesObj) {
      const dashedKey = key.replace(/[A-Z]/g, function (match) {
        return "-" + match.toLowerCase();
      });
      styles += dashedKey + ":" + stylesObj[key] + ";";
    }
    return styles;
  }

  function calculateTimeLeft() {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference > 0) {
      isExpired = false;
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      isExpired = true;
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  }
  function startTicking() {
    calculateTimeLeft();
    timerId = setInterval(() => {
      calculateTimeLeft();
    }, 1000);
  }
  $: hasBackgroundImage = () => {
    return !!backgroundImageUrl;
  };
  $: widthValue = () => {
    return width || "auto";
  };
  $: heightMode = () => {
    return height || "auto";
  };
  $: useImageForHeight = () => {
    return hasBackgroundImage() && heightMode() === "auto";
  };
  $: fixedHeightValue = () => {
    return heightMode() !== "auto" ? heightMode() : undefined;
  };
  $: contentOverlaysBox = () => {
    return useImageForHeight() || !!fixedHeightValue();
  };
  $: backgroundEffectClass = () => {
    return backgroundEffect || "none";
  };
  $: plugin = () => {
    return backgroundEffectPlugin || defaultBackgroundEffectPlugin;
  };

  let rootRef;
  let canvasRef;

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  let timerId = null;
  let isExpired = false;

  onMount(() => {
    if (lazyLoad === false) {
      startTicking();
      if (canvasRef)
        plugin().start(
          canvasRef,
          backgroundEffectClass() as BackgroundEffectName,
          animContext
        );
      return;
    }
    if (rootRef) {
      observerBox.disconnect = observeLazyMount(
        rootRef,
        () => {
          startTicking();
          if (canvasRef)
            plugin().start(
              canvasRef,
              backgroundEffectClass() as BackgroundEffectName,
              animContext
            );
        },
        lazyThreshold ?? 0.1,
        lazyRootMargin ?? "200px"
      );
    }
  });

  function onUpdateFn_0(..._args: any[]) {
    if (canvasRef)
      plugin().start(
        canvasRef,
        backgroundEffectClass() as BackgroundEffectName,
        animContext
      );
  }

  $: onUpdateFn_0(...[backgroundEffectClass(), canvasRef]);

  onDestroy(() => {
    if (timerId) clearInterval(timerId);
    if (observerBox.disconnect) observerBox.disconnect();
    plugin().stop(animContext);
  });
</script>

<div
  style={stringifyStyles({
    width: widthValue(),
    height: fixedHeightValue() || undefined,
    backgroundImage:
      hasBackgroundImage() && !useImageForHeight()
        ? `url(${backgroundImageUrl})`
        : undefined,
    backgroundPosition: backgroundPosition || "center",
  })}
  bind:this={rootRef}
  class={`cv-timer-widget cv-timer-variant-${variant || "dark"} ${
    hasBackgroundImage() ? "cv-timer-has-bg" : ""
  } ${className || ""}`}
>
  {#if useImageForHeight()}
    <img
      style={stringifyStyles({
        width: "100%",
        height: "auto",
        display: "block",
        objectFit: "cover",
        objectPosition: backgroundPosition || "center",
      })}
      alt=""
      src={backgroundImageUrl}
    />
  {/if}
  {#if hasBackgroundImage()}
    <div
      style={stringifyStyles({
        background: overlay || "var(--cv-color-scrim, rgba(0, 0, 0, 0.45))",
      })}
      class="cv-timer-overlay"
    />
  {/if}
  {#if backgroundEffectClass() !== "none"}
    <canvas
      style={stringifyStyles({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      })}
      class="cv-timer-bg-effect"
      aria-hidden="true"
      bind:this={canvasRef}
    />
  {/if}
  <div
    style={stringifyStyles({
      position: contentOverlaysBox() ? "absolute" : "relative",
      top: contentOverlaysBox() ? 0 : undefined,
      left: contentOverlaysBox() ? 0 : undefined,
      width: contentOverlaysBox() ? "100%" : undefined,
      height: contentOverlaysBox() ? "100%" : undefined,
    })}
    class="cv-timer-content"
  >
    {#if title}
      <h3 class="cv-timer-title">{title}</h3>
    {/if}
    {#if !isExpired}
      <div
        class="cv-timer-blocks"
        role="timer"
        aria-live="off"
        aria-label={`Time remaining: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
      >
        <div class="cv-timer-block">
          <span class="cv-timer-value" aria-hidden="true">{timeLeft.days}</span
          ><span class="cv-timer-label" aria-hidden="true">Days</span>
        </div>
        <div class="cv-timer-block">
          <span class="cv-timer-value" aria-hidden="true">{timeLeft.hours}</span
          ><span class="cv-timer-label" aria-hidden="true">Hours</span>
        </div>
        <div class="cv-timer-block">
          <span class="cv-timer-value" aria-hidden="true"
            >{timeLeft.minutes}</span
          ><span class="cv-timer-label" aria-hidden="true">Minutes</span>
        </div>
        <div class="cv-timer-block">
          <span class="cv-timer-value" aria-hidden="true"
            >{timeLeft.seconds}</span
          ><span class="cv-timer-label" aria-hidden="true">Seconds</span>
        </div>
      </div>
    {/if}
    {#if !!isExpired && !!expiredText}
      <p class="cv-timer-expired">{expiredText}</p>
    {/if}
  </div>
</div>