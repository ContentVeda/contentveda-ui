import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
} from "@angular/core";

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

@Component({
  selector: "sliding-banner",
  template: `
    <div
      role="region"
      #rootRef
      [class]="'cv-sliding-banner ' + (showSkeleton ? 'cv-image-shimmer' : '') + ' ' + (className || '') + ' effect-' + (animationClass) + ' bg-effect-' + (backgroundClass) + ' quality-' + (qualityClass) + ' ' + (config?.showDots ? 'has-dots' : '')"
      (mouseenter)="stopAutoPlay()"
      (mouseleave)="startAutoPlay()"
      [ngStyle]="{
          height: config?.height || '',
          minHeight: config?.height === 'auto' ? 'auto' : config?.minHeight || ''
        }"
    >
      <ng-container *ngIf="backgroundClass !== 'none'"
        ><canvas class="cv-sliding-banner-canvas" #canvasRef></canvas
      ></ng-container>
      <ng-container *ngIf="config?.height === 'auto' && items[0]?.media?.url"
        ><img
          alt=""
          [attr.src]="items[0].media.url"
          [ngStyle]="{
          width: '100%',
          height: 'auto',
          display: 'block',
          visibility: 'hidden',
          pointerEvents: 'none'
        }"
      /></ng-container>
      <div
        [class]="'cv-sliding-banner-track dir-' + (direction) + ' ' + (wrapping ? 'no-transition' : '')"
        [ngStyle]="{
          transform: 'translateX(-' + (currentIndex * 100) + '%)',
          position: config?.height === 'auto' ? 'absolute' : 'relative',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }"
      >
        <ng-container
          *ngFor="let item of items; index as index; trackBy: trackByItem0"
          ><div
            [class]="'cv-sliding-slide ' + (index === currentIndex ? 'active' : '') + ' ' + (index === previousIndex && index !== currentIndex ? 'previous' : '')"
          >
            <ng-container *ngIf="shouldMount && item.media?.type === 'video'"
              ><video
                [attr.src]="item.media?.url"
                [attr.autoPlay]="true"
                [attr.loop]="true"
                [attr.muted]="true"
                [attr.playsInline]="true"
                [class]="'cv-sliding-bg-video ' + (showSkeleton ? 'cv-image-shimmer' : '')"
                [ngStyle]="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }"
              ></video
            ></ng-container>
            <ng-container *ngIf="shouldMount && item.media?.type !== 'video'"
              ><div
                [class]="'cv-sliding-bg ' + (showSkeleton ? 'cv-image-shimmer' : '')"
                [ngStyle]="{
          backgroundImage: item.media?.url ? 'url(' + (item.media.url) + ')' : 'none',
          backgroundPosition: config?.bgPosition || 'center'
        }"
              ></div
            ></ng-container>
            <ng-container
              *ngIf="animationClass === 'curtain' && item.media?.type !== 'video'"
              ><div
                class="cv-curtain-panel cv-curtain-panel-left"
                [ngStyle]="{
          backgroundImage: item.media?.url ? 'url(' + (item.media.url) + ')' : 'none',
          backgroundPosition: config?.bgPosition || 'center'
        }"
              ></div>
              <div
                class="cv-curtain-panel cv-curtain-panel-right"
                [ngStyle]="{
          backgroundImage: item.media?.url ? 'url(' + (item.media.url) + ')' : 'none',
          backgroundPosition: config?.bgPosition || 'center'
        }"
              ></div
            ></ng-container>
            <ng-container *ngIf="animationClass === 'cube'"
              ><div class="cv-cube-side"></div
            ></ng-container>
            <div class="cv-sliding-overlay"></div>
            <div
              class="cv-sliding-content"
              [ngStyle]="{
          textAlign: item.textAlignment || config?.align || 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: (item.textAlignment || config?.align || 'center') === 'center' ? 'center' : (item.textAlignment || config?.align || 'center') === 'right' ? 'flex-end' : 'flex-start'
        }"
            >
              <ng-container *ngIf="showSkeleton"
                ><div
                  class="cv-skeleton-title cv-image-shimmer"
                  [ngStyle]="{
          width: '50%',
          height: '32px',
          marginBottom: '16px'
        }"
                ></div>
                <div
                  class="cv-skeleton-text cv-image-shimmer"
                  [ngStyle]="{
          width: '70%',
          height: '16px',
          marginBottom: '10px'
        }"
                ></div>
                <div
                  class="cv-skeleton-text cv-image-shimmer"
                  [ngStyle]="{
          width: '40%',
          height: '16px',
          marginBottom: '24px'
        }"
                ></div>
                <div
                  class="cv-skeleton-button cv-image-shimmer"
                  [ngStyle]="{
          width: '130px',
          height: '40px'
        }"
                ></div
              ></ng-container>
              <ng-container *ngIf="!showSkeleton"
                ><h2 class="cv-sliding-title">{{item.title}}</h2>
                <ng-container *ngIf="item.subtitle"
                  ><p class="cv-sliding-subtitle">
                    {{item.subtitle}}
                  </p></ng-container
                >
                <ng-container *ngIf="item.ctaText"
                  ><a
                    class="cv-sliding-cta"
                    [attr.href]="item.mapLinks[0]?.url || undefined"
                    >{{item.ctaText}}</a
                  ></ng-container
                ></ng-container
              >
            </div>
          </div></ng-container
        >
      </div>
      <ng-container
        *ngIf="(config?.showArrows || config?.showNextPrev) && (!config?.hideArrowsIfNoScroll || items && items.length > 1)"
        ><ng-container
          ><button
            type="button"
            class="cv-sliding-arrow prev"
            aria-label="Previous"
            (click)="prev()"
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
            type="button"
            class="cv-sliding-arrow next"
            aria-label="Next"
            (click)="next()"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M9 5l7 7-7 7"></path>
            </svg></button></ng-container
      ></ng-container>
      <ng-container *ngIf="config?.showDots"
        ><div class="cv-sliding-dots">
          <ng-container
            *ngFor="let _ of items; index as index; trackBy: trackBy_1"
            ><button
              type="button"
              [class]="'cv-sliding-dot ' + (index === currentIndex ? 'active' : '')"
              [attr.aria-label]="'Go to slide ' + (index + 1)"
              (click)="goTo(index)"
            ></button
          ></ng-container></div
      ></ng-container>
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
export default class SlidingBanner {
  @Input() lazyLoad!: SlidingBannerProps["lazyLoad"];
  @Input() lazyThreshold!: SlidingBannerProps["lazyThreshold"];
  @Input() lazyRootMargin!: SlidingBannerProps["lazyRootMargin"];
  @Input() isLoading!: SlidingBannerProps["isLoading"];
  @Input() config!: SlidingBannerProps["config"];
  @Input() items!: SlidingBannerProps["items"];
  @Input() className!: SlidingBannerProps["className"];

  @ViewChild("rootRef") rootRef!: ElementRef;
  @ViewChild("canvasRef") canvasRef!: ElementRef;

  currentIndex = 0;
  previousIndex = 0;
  direction = "next";
  isVisible = false;
  wrapping = false;
  get shouldMount() {
    return this.lazyLoad === false || this.isVisible;
  }
  get showSkeleton() {
    return !!this.isLoading || !this.shouldMount;
  }
  get animationClass() {
    return this.config?.animationEffect || "slide";
  }
  get backgroundClass() {
    return this.config?.backgroundEffect || "none";
  }
  get plugin() {
    return this.config?.backgroundEffectPlugin || defaultBackgroundEffectPlugin;
  }
  get qualityClass() {
    return this.config?.animationQuality || "detailed";
  }
  next() {
    if (!this.items?.length) return;
    this.direction = "next";
    this.previousIndex = this.currentIndex;
    if (this.currentIndex >= this.items.length - 1) {
      if (this.config?.rotateAgain !== false) {
        this.wrapping = true;
        this.currentIndex = 0;
      }
    } else {
      this.currentIndex = this.currentIndex + 1;
    }
  }
  prev() {
    if (!this.items?.length) return;
    this.direction = "prev";
    this.previousIndex = this.currentIndex;
    if (this.currentIndex <= 0) {
      if (this.config?.rotateAgain !== false) {
        this.wrapping = true;
        this.currentIndex = this.items.length - 1;
      }
    } else {
      this.currentIndex = this.currentIndex - 1;
    }
  }
  goTo(index: number) {
    if (this.currentIndex !== index) {
      this.direction = index > this.currentIndex ? "next" : "prev";
      this.previousIndex = this.currentIndex;
      this.currentIndex = index;
    }
  }
  startAutoPlay() {
    if (this.animContext.intervalId) return;
    if (this.config?.autoStart !== false && this.items?.length > 1) {
      this.animContext.intervalId = setInterval(() => {
        this.latestNext.fn();
      }, this.config?.delayMs || 5000);
    }
  }
  stopAutoPlay() {
    if (this.animContext.intervalId) {
      clearInterval(this.animContext.intervalId);
      this.animContext.intervalId = null;
    }
  }
  setupDimensions() {
    if (this.rootRef?.nativeElement) {
      this.rootRef?.nativeElement.style.setProperty(
        "--slider-half-width",
        `${this.rootRef?.nativeElement.offsetWidth / 2}px`
      );
    }
  }
  animContext = {
    intervalId: null as any,
    dimResizeHandler: null as any,
  };
  bgEffectContext = {
    animationFrameId: null,
    resizeHandler: null,
    resizeObserver: null,
  };
  observerBox = {
    disconnect: null as (() => void) | null,
  };
  latestNext = {
    fn: () => {},
  };
  mountHeavyContent = function mountHeavyContent() {
    this.startAutoPlay();
    this.setupDimensions();
    this.animContext.dimResizeHandler = () => this.setupDimensions();
    window.addEventListener("resize", this.animContext.dimResizeHandler);
    if (this.canvasRef?.nativeElement) {
      this.plugin.start(
        this.canvasRef?.nativeElement,
        this.backgroundClass as BackgroundEffectName,
        this.bgEffectContext
      );
    }
  };
  trackByItem0(index, item) {
    return item.id || index;
  }
  trackBy_1(index, _) {
    return index;
  }

  ngAfterViewInit() {
    this.ngOnInit();
  }

  ngOnInit() {
    if (typeof window !== "undefined") {
      if (this.lazyLoad === false) {
        this.isVisible = true;
        this.mountHeavyContent();
        return;
      }
      if (this.rootRef?.nativeElement) {
        this.observerBox.disconnect = observeLazyMount(
          this.rootRef!.nativeElement,
          () => {
            this.isVisible = true;
            this.mountHeavyContent();
          },
          this.lazyThreshold ?? 0.1,
          this.lazyRootMargin ?? "200px"
        );
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof window !== "undefined") {
      this.latestNext.fn = this.next;
      if (this.wrapping) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.wrapping = false;
          });
        });
      }
      if (this.isVisible && this.canvasRef?.nativeElement) {
        this.plugin.start(
          this.canvasRef?.nativeElement,
          this.backgroundClass as BackgroundEffectName,
          this.bgEffectContext
        );
      }
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
    this.plugin.stop(this.bgEffectContext);
    // Same guard as RowScrollable: onDestroy also runs on the server. The
    // handler is only assigned in onMount so this branch is normally skipped
    // there, but the typeof check makes that safe by construction rather than
    // by coincidence.
    if (typeof window !== "undefined" && this.animContext.dimResizeHandler) {
      window.removeEventListener("resize", this.animContext.dimResizeHandler);
    }
    if (this.observerBox.disconnect) this.observerBox.disconnect();
  }
}

@NgModule({
  declarations: [SlidingBanner],
  imports: [CommonModule],
  exports: [SlidingBanner],
})
export class SlidingBannerModule {}
