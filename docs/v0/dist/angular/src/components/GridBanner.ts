import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, ViewChild, ElementRef, Input } from "@angular/core";

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

@Component({
  selector: "grid-banner",
  template: `
    <div
      #rootRef
      [class]="\`cv-grid-banner \${className || ''}\`"
      [ngStyle]="{
          gridTemplateColumns: gridTemplateColumns,
          '--cv-grid-cols-tablet': columnsTabletVar,
          '--cv-grid-cols-mobile': columnsMobileVar,
          height: config?.height || '',
          minHeight: config?.minHeight || ''
        }"
    >
      <ng-container
        *ngFor="let item of items; index as index; trackBy: trackByItem0"
        ><a
          class="cv-grid-item"
          [attr.href]="item.mapLinks?.[0]?.url || undefined"
          ><div
            [class]="\`cv-grid-img-wrap \${showSkeleton ? 'cv-image-shimmer' : ''}\`"
            [ngStyle]="{
          height: config?.height || '',
          minHeight: config?.minHeight || '',
          aspectRatio: config?.height ? 'unset' : '16/9'
        }"
          >
            <ng-container *ngIf="!showSkeleton"
              ><ng-container *ngIf="item.media?.type === 'video'"
                ><video
                  class="cv-grid-img"
                  [attr.src]="item.media?.url"
                  [attr.autoPlay]="true"
                  [attr.loop]="true"
                  [attr.muted]="true"
                  [attr.playsInline]="true"
                  [ngStyle]="{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          objectPosition: config?.bgPosition || 'center'
        }"
                ></video
              ></ng-container>
              <ng-container *ngIf="item.media?.type !== 'video'"
                ><img
                  class="cv-grid-img"
                  [attr.src]="item.media?.url"
                  [attr.alt]="item.title"
                  [ngStyle]="{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          objectPosition: config?.bgPosition || 'center'
        }" /></ng-container
            ></ng-container>
          </div>
          <ng-container *ngIf="showSkeleton"
            ><div
              [ngStyle]="{
          display: 'flex',
          flexDirection: 'column',
          alignItems: item.textAlignment || 'center',
          width: '100%',
          marginTop: '12px'
        }"
            >
              <div
                class="cv-skeleton-text cv-image-shimmer"
                [ngStyle]="{
          width: '70%',
          height: '14px',
          margin: '0 0 6px 0'
        }"
              ></div>
              <div
                class="cv-skeleton-text cv-image-shimmer"
                [ngStyle]="{
          width: '40%',
          height: '10px',
          margin: 0
        }"
              ></div></div
          ></ng-container>
          <ng-container *ngIf="!showSkeleton"
            ><div
              class="cv-grid-title"
              [ngStyle]="{
          textAlign: item.textAlignment || 'center'
        }"
            >
              {{item.title}}
            </div></ng-container
          ></a
        ></ng-container
      >
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
export default class GridBanner {
  @Input() lazyLoad!: GridBannerProps["lazyLoad"];
  @Input() lazyThreshold!: GridBannerProps["lazyThreshold"];
  @Input() lazyRootMargin!: GridBannerProps["lazyRootMargin"];
  @Input() isLoading!: GridBannerProps["isLoading"];
  @Input() columns!: GridBannerProps["columns"];
  @Input() columnsTablet!: GridBannerProps["columnsTablet"];
  @Input() columnsMobile!: GridBannerProps["columnsMobile"];
  @Input() className!: GridBannerProps["className"];
  @Input() config!: GridBannerProps["config"];
  @Input() items!: GridBannerProps["items"];

  @ViewChild("rootRef") rootRef!: ElementRef;

  isVisible = false;
  get shouldMount() {
    return this.lazyLoad === false || this.isVisible;
  }
  get showSkeleton() {
    return !!this.isLoading || !this.shouldMount;
  }
  get gridTemplateColumns() {
    const cols = this.columns || 3;
    return `repeat(${cols}, 1fr)`;
  }
  get columnsTabletVar() {
    return `${this.columnsTablet || 2}`;
  }
  get columnsMobileVar() {
    return `${this.columnsMobile || this.columnsTablet || 2}`;
  }
  observerBox = {
    disconnect: null as (() => void) | null,
  };
  trackByItem0(index, item) {
    return item.id || index;
  }

  ngOnInit() {
    if (typeof window !== "undefined") {
      if (this.lazyLoad === false) {
        this.isVisible = true;
        return;
      }
      if (this.rootRef?.nativeElement) {
        this.observerBox.disconnect = observeLazyMount(
          this.rootRef!.nativeElement,
          () => {
            this.isVisible = true;
          },
          this.lazyThreshold ?? 0.1,
          this.lazyRootMargin ?? "200px"
        );
      }
    }
  }

  ngOnDestroy() {
    if (this.observerBox.disconnect) this.observerBox.disconnect();
  }
}

@NgModule({
  declarations: [GridBanner],
  imports: [CommonModule],
  exports: [GridBanner],
})
export class GridBannerModule {}
