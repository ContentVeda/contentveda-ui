import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, ViewChild, ElementRef, Input } from "@angular/core";

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

@Component({
  selector: "media-grid",
  template: `
    <div #rootRef [class]="'cv-media-grid ' + (className || '')">
      <ng-container *ngIf="showSkeleton"
        ><div
          [ngStyle]="{
          display: 'contents'
        }"
        >
          <div class="cv-media-primary cv-image-shimmer"></div>
          <div class="cv-media-secondary-col">
            <div class="cv-media-secondary-item cv-image-shimmer"></div>
            <div class="cv-media-secondary-item cv-image-shimmer"></div>
          </div></div
      ></ng-container>
      <ng-container *ngIf="!showSkeleton"
        ><div
          [ngStyle]="{
          display: 'contents'
        }"
        >
          <ng-container *ngIf="primaryMedia"
            ><a
              class="cv-media-primary"
              [attr.href]="(primaryMedia.mapLinks ? primaryMedia.mapLinks[0] : null)?.url || undefined"
              [attr.aria-label]='(primaryMedia.mapLinks ? primaryMedia.mapLinks[0] : null)?.url ? primaryMedia.altText || primaryMedia.title || "Media content" : undefined'
              ><ng-container *ngIf="primaryMedia.media?.type === 'video'"
                ><video
                  class="cv-media-asset"
                  [attr.src]="primaryMedia.media?.url"
                  [attr.autoPlay]="true"
                  [attr.loop]="true"
                  [attr.muted]="true"
                  [attr.playsInline]="true"
                ></video
              ></ng-container>
              <ng-container *ngIf="primaryMedia.media?.type !== 'video'"
                ><img
                  class="cv-media-asset"
                  [attr.src]="primaryMedia.media?.url"
                  [attr.alt]="primaryMedia.altText || primaryMedia.title || ''" /></ng-container></a
          ></ng-container>
          <ng-container *ngIf="secondaryMedia && secondaryMedia.length > 0"
            ><div class="cv-media-secondary-col">
              <ng-container
                *ngFor="let item of secondaryMedia; trackBy: trackByItem0"
                ><a
                  class="cv-media-secondary-item"
                  [attr.href]="ite(m.mapLinks ? m.mapLinks[0] : null)?.url || undefined"
                  [attr.aria-label]='ite(m.mapLinks ? m.mapLinks[0] : null)?.url ? item.altText || item.title || "Media content" : undefined'
                  ><ng-container *ngIf="item.media?.type === 'video'"
                    ><video
                      class="cv-media-asset"
                      [attr.src]="item.media?.url"
                      [attr.autoPlay]="true"
                      [attr.loop]="true"
                      [attr.muted]="true"
                      [attr.playsInline]="true"
                    ></video
                  ></ng-container>
                  <ng-container *ngIf="item.media?.type !== 'video'"
                    ><img
                      class="cv-media-asset"
                      [attr.src]="item.media?.url"
                      [attr.alt]="item.altText || item.title || ''" /></ng-container></a
              ></ng-container></div
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
export default class MediaGrid {
  @Input() lazyLoad!: MediaGridProps["lazyLoad"];
  @Input() lazyThreshold!: MediaGridProps["lazyThreshold"];
  @Input() lazyRootMargin!: MediaGridProps["lazyRootMargin"];
  @Input() isLoading!: MediaGridProps["isLoading"];
  @Input() className!: MediaGridProps["className"];
  @Input() primaryMedia!: MediaGridProps["primaryMedia"];
  @Input() secondaryMedia!: MediaGridProps["secondaryMedia"];

  @ViewChild("rootRef") rootRef!: ElementRef;

  isVisible = false;
  get shouldMount() {
    return this.lazyLoad === false || this.isVisible;
  }
  get showSkeleton() {
    return !!this.isLoading || !this.shouldMount;
  }
  observerBox = {
    disconnect: null as (() => void) | null,
  };
  trackByItem0(_, item) {
    return item.id;
  }

  ngAfterViewInit() {
    this.ngOnInit();
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
  declarations: [MediaGrid],
  imports: [CommonModule],
  exports: [MediaGrid],
})
export class MediaGridModule {}
