import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, ViewChild, ElementRef, Input } from "@angular/core";

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

@Component({
  selector: "alternating-slider",
  template: `
    <div
      role="region"
      #rootRef
      [class]="\`cv-alt-slider \${showSkeleton ? 'cv-image-shimmer' : ''} \${className || ''}\`"
      (mouseenter)="stopAutoPlay()"
      (mouseleave)="startAutoPlay()"
      [ngStyle]="{
          height: config?.height || '',
          minHeight: config?.height === 'auto' ? 'auto' : config?.minHeight || ''
        }"
    >
      <ng-container *ngIf="config?.height === 'auto' && items?.[0]?.media?.url"
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
        class="cv-alt-cols-container"
        [ngStyle]="{
          gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,
          position: config?.height === 'auto' ? 'absolute' : 'relative',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }"
      >
        <ng-container
          *ngFor="let _ of Array.from({
          length: columns
        }); index as colIndex; trackBy: trackBy_0"
          ><div class="cv-alt-col">
            <div
              class="cv-alt-track"
              [ngStyle]="{
          transform: \`translateY(\${colIndex % 2 === 0 ? -currentIndex * 100 : currentIndex * 100}%)\`
        }"
            >
              <ng-container
                *ngFor="let slideRow of slideSets; index as slideIndex; trackBy: trackBySlideRow1"
                ><div
                  class="cv-alt-cell"
                  [ngStyle]="{
          top: \`\${colIndex % 2 === 0 ? slideIndex * 100 : -slideIndex * 100}%\`
        }"
                >
                  <ng-container *ngIf="slideRow[colIndex]"
                    ><ng-container *ngIf="slideRow[colIndex].mapLinks?.[0]?.url"
                      ><a
                        class="cv-alt-content-wrap"
                        [attr.href]="slideRow[colIndex].mapLinks[0].url"
                        [ngStyle]="{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit'
        }"
                        ><ng-container
                          *ngIf="shouldMount && slideRow[colIndex].media?.type === 'video'"
                          ><video
                            [attr.src]="slideRow[colIndex].media?.url"
                            [attr.autoPlay]="true"
                            [attr.loop]="true"
                            [attr.muted]="true"
                            [attr.playsInline]="true"
                            [class]="\`cv-alt-bg-video \${showSkeleton ? 'cv-image-shimmer' : ''}\`"
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
                        <ng-container
                          *ngIf="shouldMount && slideRow[colIndex].media?.type !== 'video'"
                          ><div
                            [ngStyle]="{
          backgroundImage: slideRow[colIndex].media?.url ? \`url(\${slideRow[colIndex].media.url})\` : 'none',
          backgroundPosition: config?.bgPosition || 'center'
        }"
                            [class]="\`cv-alt-bg \${showSkeleton ? 'cv-image-shimmer' : ''}\`"
                          ></div
                        ></ng-container>
                        <div class="cv-alt-overlay"></div>
                        <div
                          class="cv-alt-content"
                          [ngStyle]="{
          textAlign: slideRow[colIndex].textAlignment || 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: (slideRow[colIndex].textAlignment || 'left') === 'center' ? 'center' : (slideRow[colIndex].textAlignment || 'left') === 'right' ? 'flex-end' : 'flex-start'
        }"
                        >
                          <ng-container *ngIf="showSkeleton"
                            ><div
                              class="cv-skeleton-title cv-image-shimmer"
                              [ngStyle]="{
          width: '60%',
          height: '24px',
          marginBottom: '12px'
        }"
                            ></div>
                            <div
                              class="cv-skeleton-text cv-image-shimmer"
                              [ngStyle]="{
          width: '80%',
          height: '14px',
          marginBottom: '8px'
        }"
                            ></div>
                            <div
                              class="cv-skeleton-text cv-image-shimmer"
                              [ngStyle]="{
          width: '50%',
          height: '14px',
          marginBottom: '16px'
        }"
                            ></div>
                            <div
                              class="cv-skeleton-button cv-image-shimmer"
                              [ngStyle]="{
          width: '110px',
          height: '36px'
        }"
                            ></div
                          ></ng-container>
                          <ng-container *ngIf="!showSkeleton"
                            ><h2 class="cv-alt-title">
                              {{slideRow[colIndex].title}}
                            </h2>
                            <ng-container *ngIf="slideRow[colIndex].subtitle"
                              ><p class="cv-alt-subtitle">
                                {{slideRow[colIndex].subtitle}}
                              </p></ng-container
                            >
                            <ng-container *ngIf="slideRow[colIndex].ctaText"
                              ><span
                                class="cv-alt-cta"
                                >{{slideRow[colIndex].ctaText}}</span
                              ></ng-container
                            ></ng-container
                          >
                        </div></a
                      ></ng-container
                    >
                    <ng-container *ngIf="!slideRow[colIndex].mapLinks?.[0]?.url"
                      ><div class="cv-alt-content-wrap">
                        <ng-container
                          *ngIf="shouldMount && slideRow[colIndex].media?.type === 'video'"
                          ><video
                            [attr.src]="slideRow[colIndex].media?.url"
                            [attr.autoPlay]="true"
                            [attr.loop]="true"
                            [attr.muted]="true"
                            [attr.playsInline]="true"
                            [class]="\`cv-alt-bg-video \${showSkeleton ? 'cv-image-shimmer' : ''}\`"
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
                        <ng-container
                          *ngIf="shouldMount && slideRow[colIndex].media?.type !== 'video'"
                          ><div
                            [ngStyle]="{
          backgroundImage: slideRow[colIndex].media?.url ? \`url(\${slideRow[colIndex].media.url})\` : 'none',
          backgroundPosition: config?.bgPosition || 'center'
        }"
                            [class]="\`cv-alt-bg \${showSkeleton ? 'cv-image-shimmer' : ''}\`"
                          ></div
                        ></ng-container>
                        <div class="cv-alt-overlay"></div>
                        <div
                          class="cv-alt-content"
                          [ngStyle]="{
          textAlign: slideRow[colIndex].textAlignment || 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: (slideRow[colIndex].textAlignment || 'left') === 'center' ? 'center' : (slideRow[colIndex].textAlignment || 'left') === 'right' ? 'flex-end' : 'flex-start'
        }"
                        >
                          <ng-container *ngIf="showSkeleton"
                            ><div
                              class="cv-skeleton-title cv-image-shimmer"
                              [ngStyle]="{
          width: '60%',
          height: '24px',
          marginBottom: '12px'
        }"
                            ></div>
                            <div
                              class="cv-skeleton-text cv-image-shimmer"
                              [ngStyle]="{
          width: '80%',
          height: '14px',
          marginBottom: '8px'
        }"
                            ></div>
                            <div
                              class="cv-skeleton-text cv-image-shimmer"
                              [ngStyle]="{
          width: '50%',
          height: '14px',
          marginBottom: '16px'
        }"
                            ></div>
                            <div
                              class="cv-skeleton-button cv-image-shimmer"
                              [ngStyle]="{
          width: '110px',
          height: '36px'
        }"
                            ></div
                          ></ng-container>
                          <ng-container *ngIf="!showSkeleton"
                            ><h2 class="cv-alt-title">
                              {{slideRow[colIndex].title}}
                            </h2>
                            <ng-container *ngIf="slideRow[colIndex].subtitle"
                              ><p class="cv-alt-subtitle">
                                {{slideRow[colIndex].subtitle}}
                              </p></ng-container
                            >
                            <ng-container *ngIf="slideRow[colIndex].ctaText"
                              ><span
                                class="cv-alt-cta"
                                >{{slideRow[colIndex].ctaText}}</span
                              ></ng-container
                            ></ng-container
                          >
                        </div>
                      </div></ng-container
                    ></ng-container
                  >
                </div></ng-container
              >
            </div>
          </div></ng-container
        >
      </div>
      <ng-container
        *ngIf="config?.showArrows && (!config?.hideArrowsIfNoScroll || slideSets.length > 1)"
        ><ng-container
          ><button
            type="button"
            class="cv-alt-arrow prev"
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
            class="cv-alt-arrow next"
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
        ><div class="cv-alt-dots">
          <ng-container
            *ngFor="let _ of slideSets; index as index; trackBy: trackBy_2"
            ><button
              type="button"
              [class]="\`cv-alt-dot \${index === currentIndex ? 'active' : ''}\`"
              [attr.aria-label]="\`Go to slide \${index + 1}\`"
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
export default class AlternatingSlider {
  @Input() lazyLoad!: AlternatingSliderProps["lazyLoad"];
  @Input() lazyThreshold!: AlternatingSliderProps["lazyThreshold"];
  @Input() lazyRootMargin!: AlternatingSliderProps["lazyRootMargin"];
  @Input() isLoading!: AlternatingSliderProps["isLoading"];
  @Input() config!: AlternatingSliderProps["config"];
  @Input() items!: AlternatingSliderProps["items"];
  @Input() className!: AlternatingSliderProps["className"];

  @ViewChild("rootRef") rootRef!: ElementRef;

  currentIndex = 0;
  intervalId = null;
  isVisible = false;
  get shouldMount() {
    return this.lazyLoad === false || this.isVisible;
  }
  get showSkeleton() {
    return !!this.isLoading || !this.shouldMount;
  }
  get columns() {
    return this.config?.columns || 2;
  }
  get slideSets() {
    const sets: WidgetItem[][] = [];
    const currentItems = this.items || [];
    const cols = this.columns;
    for (let i = 0; i < currentItems.length; i += cols) {
      sets.push(currentItems.slice(i, i + cols));
    }
    return sets;
  }
  get totalSlides() {
    return this.slideSets.length;
  }
  next() {
    if (this.totalSlides <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
  }
  prev() {
    if (this.totalSlides <= 1) return;
    this.currentIndex =
      (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
  }
  goTo(index: number) {
    this.currentIndex = index;
  }
  startAutoPlay() {
    if (this.config?.autoStart !== false && this.totalSlides > 1) {
      this.intervalId = setInterval(() => {
        this.next();
      }, this.config?.delayMs || 5000);
    }
  }
  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  trackBy_0(colIndex, _) {
    return `col-${colIndex}`;
  }
  trackBySlideRow1(slideIndex, slideRow) {
    return `cell-${slideIndex}-${colIndex}`;
  }
  trackBy_2(index, _) {
    return `dot-${index}`;
  }

  private _observerBox: {
    disconnect: (() => void) | null;
  } = {
    disconnect: null,
  };

  ngOnInit() {
    if (typeof window !== "undefined") {
      if (this.lazyLoad === false) {
        this.isVisible = true;
        this.startAutoPlay();
        return;
      }
      if (this.rootRef?.nativeElement) {
        this._observerBox.disconnect = observeLazyMount(
          this.rootRef!.nativeElement,
          () => {
            this.isVisible = true;
            this.startAutoPlay();
          },
          this.lazyThreshold ?? 0.1,
          this.lazyRootMargin ?? "200px"
        );
      }
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
    if (this._observerBox.disconnect) this._observerBox.disconnect();
  }
}

@NgModule({
  declarations: [AlternatingSlider],
  imports: [CommonModule],
  exports: [AlternatingSlider],
})
export class AlternatingSliderModule {}
