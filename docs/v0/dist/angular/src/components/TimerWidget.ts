import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
} from "@angular/core";

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

@Component({
  selector: "timer-widget",
  template: `
    <div
      #rootRef
      [class]="\`cv-timer-widget cv-timer-variant-\${variant || 'dark'} \${hasBackgroundImage ? 'cv-timer-has-bg' : ''} \${className || ''}\`"
      [ngStyle]="{
          width: widthValue,
          height: fixedHeightValue || undefined,
          backgroundImage: hasBackgroundImage && !useImageForHeight ? \`url(\${backgroundImageUrl})\` : undefined,
          backgroundPosition: backgroundPosition || 'center'
        }"
    >
      <ng-container *ngIf="useImageForHeight"
        ><img
          alt=""
          [attr.src]="backgroundImageUrl"
          [ngStyle]="{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'cover',
          objectPosition: backgroundPosition || 'center'
        }"
      /></ng-container>
      <ng-container *ngIf="hasBackgroundImage"
        ><div
          class="cv-timer-overlay"
          [ngStyle]="{
          background: overlay || 'var(--cv-color-scrim, rgba(0, 0, 0, 0.45))'
        }"
        ></div
      ></ng-container>
      <ng-container *ngIf="backgroundEffectClass !== 'none'"
        ><canvas
          class="cv-timer-bg-effect"
          aria-hidden="true"
          #canvasRef
          [ngStyle]="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }"
        ></canvas
      ></ng-container>
      <div
        class="cv-timer-content"
        [ngStyle]="{
          position: contentOverlaysBox ? 'absolute' : 'relative',
          top: contentOverlaysBox ? 0 : undefined,
          left: contentOverlaysBox ? 0 : undefined,
          width: contentOverlaysBox ? '100%' : undefined,
          height: contentOverlaysBox ? '100%' : undefined
        }"
      >
        <ng-container *ngIf="title"
          ><h3 class="cv-timer-title">{{title}}</h3></ng-container
        >
        <ng-container *ngIf="!isExpired"
          ><div
            class="cv-timer-blocks"
            role="timer"
            aria-live="off"
            [attr.aria-label]="\`Time remaining: \${timeLeft.days} days, \${timeLeft.hours} hours, \${timeLeft.minutes} minutes, \${timeLeft.seconds} seconds\`"
          >
            <div class="cv-timer-block">
              <span
                class="cv-timer-value"
                aria-hidden="true"
                >{{timeLeft.days}}</span
              >
              <span class="cv-timer-label" aria-hidden="true">Days</span>
            </div>
            <div class="cv-timer-block">
              <span
                class="cv-timer-value"
                aria-hidden="true"
                >{{timeLeft.hours}}</span
              >
              <span class="cv-timer-label" aria-hidden="true">Hours</span>
            </div>
            <div class="cv-timer-block">
              <span
                class="cv-timer-value"
                aria-hidden="true"
                >{{timeLeft.minutes}}</span
              >
              <span class="cv-timer-label" aria-hidden="true">Minutes</span>
            </div>
            <div class="cv-timer-block">
              <span
                class="cv-timer-value"
                aria-hidden="true"
                >{{timeLeft.seconds}}</span
              >
              <span class="cv-timer-label" aria-hidden="true">Seconds</span>
            </div>
          </div></ng-container
        >
        <ng-container *ngIf="!!isExpired && !!expiredText"
          ><p class="cv-timer-expired">{{expiredText}}</p></ng-container
        >
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export default class TimerWidget {
  @Input() lazyLoad!: TimerWidgetProps["lazyLoad"];
  @Input() lazyThreshold!: TimerWidgetProps["lazyThreshold"];
  @Input() lazyRootMargin!: TimerWidgetProps["lazyRootMargin"];
  @Input() targetDate!: TimerWidgetProps["targetDate"];
  @Input() backgroundImageUrl!: TimerWidgetProps["backgroundImageUrl"];
  @Input() width!: TimerWidgetProps["width"];
  @Input() height!: TimerWidgetProps["height"];
  @Input() backgroundEffect!: TimerWidgetProps["backgroundEffect"];
  @Input() backgroundEffectPlugin!: TimerWidgetProps["backgroundEffectPlugin"];
  @Input() variant!: TimerWidgetProps["variant"];
  @Input() className!: TimerWidgetProps["className"];
  @Input() backgroundPosition!: TimerWidgetProps["backgroundPosition"];
  @Input() overlay!: TimerWidgetProps["overlay"];
  @Input() title!: TimerWidgetProps["title"];
  @Input() expiredText!: TimerWidgetProps["expiredText"];

  @ViewChild("rootRef") rootRef!: ElementRef;
  @ViewChild("canvasRef") canvasRef!: ElementRef;

  timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  timerId = null;
  isExpired = false;
  calculateTimeLeft() {
    const difference =
      new Date(this.targetDate).getTime() - new Date().getTime();
    if (difference > 0) {
      this.isExpired = false;
      this.timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      this.isExpired = true;
      this.timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  }
  startTicking() {
    this.calculateTimeLeft();
    this.timerId = setInterval(() => {
      this.calculateTimeLeft();
    }, 1000);
  }
  get hasBackgroundImage() {
    return !!this.backgroundImageUrl;
  }
  get widthValue() {
    return this.width || "100%";
  }
  get heightMode() {
    return this.height || "auto";
  }
  get useImageForHeight() {
    return this.hasBackgroundImage && this.heightMode === "auto";
  }
  get fixedHeightValue() {
    return this.heightMode !== "auto" ? this.heightMode : undefined;
  }
  get contentOverlaysBox() {
    return this.useImageForHeight || !!this.fixedHeightValue;
  }
  get backgroundEffectClass() {
    return this.backgroundEffect || "none";
  }
  get plugin() {
    return this.backgroundEffectPlugin || defaultBackgroundEffectPlugin;
  }

  private _animContext: BackgroundEffectContext = {
    animationFrameId: null,
    resizeHandler: null,
    resizeObserver: null,
  };
  private _observerBox: {
    disconnect: (() => void) | null;
  } = {
    disconnect: null,
  };

  ngOnInit() {
    if (typeof window !== "undefined") {
      if (this.lazyLoad === false) {
        this.startTicking();
        if (this.canvasRef?.nativeElement)
          this.plugin.start(
            this.canvasRef?.nativeElement,
            this.backgroundEffectClass as BackgroundEffectName,
            this._animContext
          );
        return;
      }
      if (this.rootRef?.nativeElement) {
        this._observerBox.disconnect = observeLazyMount(
          this.rootRef!.nativeElement,
          () => {
            this.startTicking();
            if (this.canvasRef?.nativeElement)
              this.plugin.start(
                this.canvasRef?.nativeElement,
                this.backgroundEffectClass as BackgroundEffectName,
                this._animContext
              );
          },
          this.lazyThreshold ?? 0.1,
          this.lazyRootMargin ?? "200px"
        );
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof window !== "undefined") {
      if (this.canvasRef?.nativeElement)
        this.plugin.start(
          this.canvasRef?.nativeElement,
          this.backgroundEffectClass as BackgroundEffectName,
          this._animContext
        );
    }
  }

  ngOnDestroy() {
    if (this.timerId) clearInterval(this.timerId);
    if (this._observerBox.disconnect) this._observerBox.disconnect();
    this.plugin.stop(this._animContext);
  }
}

@NgModule({
  declarations: [TimerWidget],
  imports: [CommonModule],
  exports: [TimerWidget],
})
export class TimerWidgetModule {}
