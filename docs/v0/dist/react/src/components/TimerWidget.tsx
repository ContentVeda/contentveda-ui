"use client";
import * as React from "react";
import { useState, useRef, useEffect } from "react";

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
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animContext = useRef<BackgroundEffectContext>({
    animationFrameId: null,
    resizeHandler: null,
    resizeObserver: null,
  });
  const observerBox = useRef<{
    disconnect: (() => void) | null;
  }>({
    disconnect: null,
  });
  const [timeLeft, setTimeLeft] = useState(() => ({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }));

  const [timerId, setTimerId] = useState(() => null);

  const [isExpired, setIsExpired] = useState(() => false);

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

  function hasBackgroundImage() {
    return !!props.backgroundImageUrl;
  }

  function widthValue() {
    return props.width || "100%";
  }

  function heightMode() {
    return props.height || "auto";
  }

  function useImageForHeight() {
    return hasBackgroundImage() && heightMode() === "auto";
  }

  function fixedHeightValue() {
    return heightMode() !== "auto" ? heightMode() : undefined;
  }

  function contentOverlaysBox() {
    return useImageForHeight() || !!fixedHeightValue();
  }

  function backgroundEffectClass() {
    return props.backgroundEffect || "none";
  }

  function plugin() {
    return props.backgroundEffectPlugin || defaultBackgroundEffectPlugin;
  }

  useEffect(() => {
    if (props.lazyLoad === false) {
      startTicking();
      if (canvasRef.current)
        plugin().start(
          canvasRef.current,
          backgroundEffectClass() as BackgroundEffectName,
          animContext.current
        );
      return;
    }
    if (rootRef.current) {
      observerBox.current.disconnect = observeLazyMount(
        rootRef.current,
        () => {
          startTicking();
          if (canvasRef.current)
            plugin().start(
              canvasRef.current,
              backgroundEffectClass() as BackgroundEffectName,
              animContext.current
            );
        },
        props.lazyThreshold ?? 0.1,
        props.lazyRootMargin ?? "200px"
      );
    }
  }, []);
  useEffect(() => {
    if (canvasRef.current)
      plugin().start(
        canvasRef.current,
        backgroundEffectClass() as BackgroundEffectName,
        animContext.current
      );
  }, [backgroundEffectClass(), canvasRef.current]);
  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
      if (observerBox.current.disconnect) observerBox.current.disconnect();
      plugin().stop(animContext.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`cv-timer-widget cv-timer-variant-${props.variant || "dark"} ${
        hasBackgroundImage() ? "cv-timer-has-bg" : ""
      } ${props.className || ""}`}
      style={{
        width: widthValue(),
        height: fixedHeightValue() || undefined,
        backgroundImage:
          hasBackgroundImage() && !useImageForHeight()
            ? `url(${props.backgroundImageUrl})`
            : undefined,
        backgroundPosition: props.backgroundPosition || "center",
      }}
    >
      {useImageForHeight() ? (
        <img
          alt=""
          src={props.backgroundImageUrl}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "cover",
            objectPosition: props.backgroundPosition || "center",
          }}
        />
      ) : null}
      {hasBackgroundImage() ? (
        <div
          className="cv-timer-overlay"
          style={{
            background:
              props.overlay || "var(--cv-color-scrim, rgba(0, 0, 0, 0.45))",
          }}
        />
      ) : null}
      {backgroundEffectClass() !== "none" ? (
        <canvas
          className="cv-timer-bg-effect"
          aria-hidden="true"
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      ) : null}
      <div
        className="cv-timer-content"
        style={{
          position: contentOverlaysBox() ? "absolute" : "relative",
          top: contentOverlaysBox() ? 0 : undefined,
          left: contentOverlaysBox() ? 0 : undefined,
          width: contentOverlaysBox() ? "100%" : undefined,
          height: contentOverlaysBox() ? "100%" : undefined,
        }}
      >
        {props.title ? <h3 className="cv-timer-title">{props.title}</h3> : null}
        {!isExpired ? (
          <div
            className="cv-timer-blocks"
            role="timer"
            aria-live="off"
            aria-label={`Time remaining: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
          >
            <div className="cv-timer-block">
              <span className="cv-timer-value" aria-hidden="true">
                {timeLeft.days}
              </span>
              <span className="cv-timer-label" aria-hidden="true">
                Days
              </span>
            </div>
            <div className="cv-timer-block">
              <span className="cv-timer-value" aria-hidden="true">
                {timeLeft.hours}
              </span>
              <span className="cv-timer-label" aria-hidden="true">
                Hours
              </span>
            </div>
            <div className="cv-timer-block">
              <span className="cv-timer-value" aria-hidden="true">
                {timeLeft.minutes}
              </span>
              <span className="cv-timer-label" aria-hidden="true">
                Minutes
              </span>
            </div>
            <div className="cv-timer-block">
              <span className="cv-timer-value" aria-hidden="true">
                {timeLeft.seconds}
              </span>
              <span className="cv-timer-label" aria-hidden="true">
                Seconds
              </span>
            </div>
          </div>
        ) : null}
        {!!isExpired && !!props.expiredText ? (
          <p className="cv-timer-expired">{props.expiredText}</p>
        ) : null}
      </div>
    </div>
  );
}

export default TimerWidget;
