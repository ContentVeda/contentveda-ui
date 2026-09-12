import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, ViewChild, ElementRef, Input } from "@angular/core";

export interface RowScrollableItem {
  id: string;
  title?: string;
  subtitle?: string;
  media?: {
    type: "image" | "video";
    url: string;
  };
  mapLinks?: {
    url: string;
  }[];
}
export interface RowScrollableConfig {
  showArrows?: boolean;
  hideArrowsIfNoScroll?: boolean;
  hideScrollbar?: boolean;
}
export interface RowScrollableProps {
  items: RowScrollableItem[];
  title?: string;
  className?: string;
  config?: RowScrollableConfig;
  isLoading?: boolean;
  lazyLoad?: boolean;
  lazyThreshold?: number;
  lazyRootMargin?: string;
}

import { observeLazyMount } from "../utils/lazyObserver";

@Component({
  selector: "row-scrollable",
  template: `
    <div
      #containerRef
      [class]="\`cv-scrollable-container \${className || ''}\`"
    >
      <ng-container *ngIf="title"
        ><h3 class="cv-scrollable-title">{{title}}</h3></ng-container
      >
      <div
        class="cv-scrollable-wrapper"
        [ngStyle]="{
          position: 'relative'
        }"
      >
        <div
          #rowRef
          [class]="\`cv-scrollable-row \${config?.hideScrollbar ? 'cv-scrollable-hide-scrollbar' : ''}\`"
        >
          <ng-container *ngFor="let item of items; trackBy: trackByItem0"
            ><a
              [attr.href]="item.mapLinks?.[0]?.url || undefined"
              [class]="\`cv-scrollable-card \${showSkeleton ? 'cv-image-shimmer' : ''}\`"
              ><ng-container *ngIf="!showSkeleton"
                ><ng-container *ngIf="item.media?.url"
                  ><div class="cv-scrollable-img-wrap">
                    <ng-container *ngIf="item.media?.type === 'video'"
                      ><video
                        class="cv-scrollable-img"
                        [attr.src]="item.media?.url"
                        [attr.autoPlay]="true"
                        [attr.loop]="true"
                        [attr.muted]="true"
                        [attr.playsInline]="true"
                      ></video
                    ></ng-container>
                    <ng-container *ngIf="item.media?.type !== 'video'"
                      ><img
                        class="cv-scrollable-img"
                        [attr.src]="item.media?.url"
                        [attr.alt]="item.title || ''"
                    /></ng-container></div
                ></ng-container>
                <div class="cv-scrollable-body">
                  <ng-container *ngIf="item.title"
                    ><div class="cv-scrollable-card-title">
                      {{item.title}}
                    </div></ng-container
                  >
                  <ng-container *ngIf="item.subtitle"
                    ><div class="cv-scrollable-card-sub">
                      {{item.subtitle}}
                    </div></ng-container
                  >
                </div></ng-container
              ></a
            ></ng-container
          >
        </div>
        <ng-container *ngIf="config?.showArrows !== false"
          ><ng-container
            ><ng-container
              *ngIf="config?.hideArrowsIfNoScroll === false || canScrollLeft"
              ><button
                type="button"
                class="cv-scrollable-arrow prev"
                aria-label="Previous"
                (click)="scroll('left')"
                [ngStyle]="{
          opacity: !canScrollLeft ? '0.35' : '1',
          pointerEvents: !canScrollLeft ? 'none' : 'auto'
        }"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M15 19l-7-7 7-7"></path>
                </svg></button
            ></ng-container>
            <ng-container
              *ngIf="config?.hideArrowsIfNoScroll === false || canScrollRight"
              ><button
                type="button"
                class="cv-scrollable-arrow next"
                aria-label="Next"
                (click)="scroll('right')"
                [ngStyle]="{
          opacity: !canScrollRight ? '0.35' : '1',
          pointerEvents: !canScrollRight ? 'none' : 'auto'
        }"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M9 5l7 7-7 7"></path>
                </svg></button></ng-container></ng-container
        ></ng-container>
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
export default class RowScrollable {
  @Input() lazyLoad!: RowScrollableProps["lazyLoad"];
  @Input() lazyThreshold!: RowScrollableProps["lazyThreshold"];
  @Input() lazyRootMargin!: RowScrollableProps["lazyRootMargin"];
  @Input() isLoading!: RowScrollableProps["isLoading"];
  @Input() className!: RowScrollableProps["className"];
  @Input() title!: RowScrollableProps["title"];
  @Input() config!: RowScrollableProps["config"];
  @Input() items!: RowScrollableProps["items"];

  @ViewChild("containerRef") containerRef!: ElementRef;
  @ViewChild("rowRef") rowRef!: ElementRef;

  canScrollLeft = false;
  canScrollRight = false;
  isVisible = false;
  get shouldMount() {
    return this.lazyLoad === false || this.isVisible;
  }
  get showSkeleton() {
    return !!this.isLoading || !this.shouldMount;
  }
  checkScroll() {
    const el = this.rowRef?.nativeElement;
    if (el) {
      this.canScrollLeft = el.scrollLeft > 5;
      this.canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 5;
    }
  }
  scroll(direction: "left" | "right") {
    const el = this.rowRef?.nativeElement;
    if (el) {
      const scrollAmount = 300;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }
  observerBox = {
    disconnect: null as (() => void) | null,
    row: null as any,
  };
  trackByItem0(_, item) {
    return item.id;
  }

  ngOnInit() {
    if (typeof window !== "undefined") {
      const el = this.rowRef?.nativeElement;
      if (el) {
        el.addEventListener("scroll", this.checkScroll);
        // Allow DOM to render then check
        setTimeout(() => {
          this.checkScroll();
        }, 150);
        if (typeof ResizeObserver !== "undefined") {
          this.observerBox.row = new ResizeObserver(() => this.checkScroll());
          this.observerBox.row.observe(el);
        }
      }
      window.addEventListener("resize", this.checkScroll);
      if (this.lazyLoad === false) {
        this.isVisible = true;
        return;
      }
      if (this.containerRef?.nativeElement) {
        this.observerBox.disconnect = observeLazyMount(
          this.containerRef!.nativeElement,
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
    const el = this.rowRef?.nativeElement;
    if (el) {
      el.removeEventListener("scroll", this.checkScroll);
    }
    // Guarded: Svelte 5 runs onDestroy during *server* teardown too, so an
    // unguarded window access here throws `window is not defined` and 500s any
    // SSR page that renders this component — it never reaches the listener it
    // was trying to remove, because onMount never added one.
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.checkScroll);
    }
    if (this.observerBox.disconnect) this.observerBox.disconnect();
    if (this.observerBox.row) {
      this.observerBox.row.disconnect();
      this.observerBox.row = null;
    }
  }
}

@NgModule({
  declarations: [RowScrollable],
  imports: [CommonModule],
  exports: [RowScrollable],
})
export class RowScrollableModule {}
