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
export interface BannerConfig {
  align?: "left" | "center" | "right";
  textAlignment?: "left" | "center" | "right";
  padding?: "sm" | "md" | "lg" | "xl" | string;
  bgGradient?: string;
  autoplay?: boolean;
  height?: string;
  minHeight?: string;
  bgPosition?: string;
  hotspotMinTargetSize?: number;
  backgroundEffect?: BackgroundEffectName;
  backgroundEffectPlugin?: BackgroundEffectPlugin;
}
export type HotspotShape = "rect" | "oval" | "polygon";
export interface HotspotCoords {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface HotspotPoint {
  x: number;
  y: number;
}
export interface HotspotAction {
  type: "link" | "deeplink";
  url: string;
  deeplink?: string;
}
export interface Hotspot {
  id: string;
  label?: string;
  altText: string;
  shape: HotspotShape;
  coords: HotspotCoords;
  points?: HotspotPoint[];
  action: HotspotAction;
  showTooltip?: boolean;
  pulse?: boolean;
}
export interface BannerProps {
  id?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  media?: BannerMedia;
  mapLinks?: MapLink[];
  textAlignment?: "left" | "center" | "right";
  className?: string;
  isLoading?: boolean;
  align?: "left" | "center" | "right";
  backgroundImageUrl?: string;
  ctaLink?: string;
  padding?: "sm" | "md" | "lg" | "xl" | string;
  bgGradient?: string;
  config?: BannerConfig;
  hotspots?: Hotspot[];
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
  selector: "banner",
  template: `
    <div
      #rootRef
      [class]="'cv-banner ' + (showSkeleton ? 'cv-image-shimmer' : '') + ' ' + (className || '')"
      [ngStyle]="{
          backgroundImage: shouldMount && !isLoading && !hasVideo && imageUrl && config?.height !== 'auto' ? 'url(' + (imageUrl) + ')' : 'none',
          textAlign: alignment,
          backgroundPosition: backgroundPosition || 'center',
          minHeight: minHeightValue || '',
          height: config?.height || ''
        }"
    >
      <ng-container *ngIf="shouldMount && !isLoading && hasVideo"
        ><video
          [attr.src]="videoUrl"
          [attr.autoPlay]="true"
          [attr.loop]="true"
          [attr.muted]="true"
          [attr.playsInline]="true"
          [ngStyle]="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }"
        ></video
      ></ng-container>
      <ng-container
        *ngIf="shouldMount && !isLoading && !hasVideo && imageUrl && config?.height === 'auto'"
        ><img
          alt=""
          [attr.src]="imageUrl"
          [ngStyle]="{
          width: '100%',
          height: 'auto',
          display: 'block',
          zIndex: 0,
          objectFit: 'cover',
          objectPosition: backgroundPosition || 'center'
        }"
      /></ng-container>
      <ng-container
        *ngIf="!!config?.backgroundEffect && config.backgroundEffect !== 'none'"
        ><canvas
          class="cv-banner-bg-effect"
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
      <ng-container *ngIf="shouldMount && !!hotspots?.length"
        ><div
          class="cv-banner-hotspots"
          [ngStyle]="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2
        }"
        >
          <svg
            class="cv-banner-hotspots-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <ng-container *ngFor="let h of hotspots; trackBy: trackByH0">
              <g>
                <g
                  [class]="'cv-hotspot-visual cv-hotspot-visual-' + (h.shape)"
                >
                  <ng-container *ngIf="h.shape === 'rect'">
                    <rect
                      vector-effect="non-scaling-stroke"
                      [attr.x]="h.coords.x"
                      [attr.y]="h.coords.y"
                      [attr.width]="h.coords.width"
                      [attr.height]="h.coords.height"
                    ></rect>
                  </ng-container>
                  <ng-container *ngIf="h.shape === 'oval'">
                    <ellipse
                      vector-effect="non-scaling-stroke"
                      [attr.cx]="h.coords.x + h.coords.width / 2"
                      [attr.cy]="h.coords.y + h.coords.height / 2"
                      [attr.rx]="h.coords.width / 2"
                      [attr.ry]="h.coords.height / 2"
                    ></ellipse>
                  </ng-container>
                  <ng-container *ngIf="h.shape === 'polygon'">
                    <polygon
                      vector-effect="non-scaling-stroke"
                      [attr.points]="hotspotPolygonPoints(h)"
                    ></polygon>
                  </ng-container>
                  <ng-container *ngIf="h.pulse">
                    <ng-container *ngIf="h.shape === 'rect'">
                      <rect
                        class="cv-hotspot-pulse-ring"
                        vector-effect="non-scaling-stroke"
                        [attr.x]="h.coords.x"
                        [attr.y]="h.coords.y"
                        [attr.width]="h.coords.width"
                        [attr.height]="h.coords.height"
                      ></rect>
                    </ng-container>
                  </ng-container>
                  <ng-container *ngIf="h.pulse">
                    <ng-container *ngIf="h.shape === 'oval'">
                      <ellipse
                        class="cv-hotspot-pulse-ring"
                        vector-effect="non-scaling-stroke"
                        [attr.cx]="h.coords.x + h.coords.width / 2"
                        [attr.cy]="h.coords.y + h.coords.height / 2"
                        [attr.rx]="h.coords.width / 2"
                        [attr.ry]="h.coords.height / 2"
                      ></ellipse>
                    </ng-container>
                  </ng-container>
                  <ng-container *ngIf="h.pulse">
                    <ng-container *ngIf="h.shape === 'polygon'">
                      <polygon
                        class="cv-hotspot-pulse-ring"
                        vector-effect="non-scaling-stroke"
                        [attr.points]="hotspotPolygonPoints(h)"
                      ></polygon>
                    </ng-container>
                  </ng-container>
                </g>
              </g>
            </ng-container>
          </svg>
          <ng-container *ngFor="let h of hotspots; trackBy: trackByH1"
            ><div>
              <div class="cv-hotspot-hit" [ngStyle]="hotspotHitStyle(h)">
                <a
                  [attr.href]="hotspotHref(h)"
                  [attr.aria-label]="hotspotLabel(h)"
                  [attr.aria-describedby]="h.showTooltip ? 'cv-hotspot-tip-' + (h.id) : undefined"
                  [class]="'cv-hotspot cv-hotspot-' + (h.shape)"
                  ><ng-container *ngIf="!!h.showTooltip"
                    ><span
                      role="tooltip"
                      class="cv-hotspot-tooltip"
                      [attr.id]="'cv-hotspot-tip-' + (h.id)"
                      >{{h.label || h.altText}}</span
                    ></ng-container
                  ></a
                >
              </div>
            </div></ng-container
          >
        </div></ng-container
      >
      <div
        class="cv-banner-overlay"
        [ngStyle]="{
          zIndex: 1,
          position: config?.height === 'auto' ? 'absolute' : 'relative',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: gradientOverlay || 'var(--cv-color-scrim, rgba(0, 0, 0, 0.4))',
          padding: paddingValue || 'var(--cv-spacing-xl)'
        }"
      >
        <div
          class="cv-banner-content"
          [ngStyle]="{
          display: 'flex',
          flexDirection: 'column',
          alignItems: alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start'
        }"
        >
          <ng-container *ngIf="showSkeleton"
            ><div
              class="cv-skeleton-title cv-image-shimmer"
              [ngStyle]="{
          width: '60%',
          height: '36px',
          marginBottom: '16px'
        }"
            ></div>
            <div
              class="cv-skeleton-text cv-image-shimmer"
              [ngStyle]="{
          width: '80%',
          height: '18px',
          marginBottom: '10px'
        }"
            ></div>
            <div
              class="cv-skeleton-text cv-image-shimmer"
              [ngStyle]="{
          width: '50%',
          height: '18px',
          marginBottom: '24px'
        }"
            ></div>
            <div
              class="cv-skeleton-button cv-image-shimmer"
              [ngStyle]="{
          width: '140px',
          height: '42px'
        }"
            ></div
          ></ng-container>
          <ng-container *ngIf="!showSkeleton"
            ><ng-container *ngIf="title"
              ><h2 class="cv-banner-title">{{title}}</h2></ng-container
            >
            <ng-container *ngIf="subtitle"
              ><p class="cv-banner-subtitle">{{subtitle}}</p></ng-container
            >
            <ng-container *ngIf="ctaText"
              ><a
                class="cv-banner-cta"
                [attr.href]="linkUrl"
                >{{ctaText}}</a
              ></ng-container
            ></ng-container
          >
        </div>
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
export default class Banner {
  @Input() lazyLoad!: BannerProps["lazyLoad"];
  @Input() lazyThreshold!: BannerProps["lazyThreshold"];
  @Input() lazyRootMargin!: BannerProps["lazyRootMargin"];
  @Input() isLoading!: BannerProps["isLoading"];
  @Input() textAlignment!: BannerProps["textAlignment"];
  @Input() align!: BannerProps["align"];
  @Input() config!: BannerProps["config"];
  @Input() media!: BannerProps["media"];
  @Input() backgroundImageUrl!: BannerProps["backgroundImageUrl"];
  @Input() mapLinks!: BannerProps["mapLinks"];
  @Input() ctaLink!: BannerProps["ctaLink"];
  @Input() bgGradient!: BannerProps["bgGradient"];
  @Input() padding!: BannerProps["padding"];
  @Input() className!: BannerProps["className"];
  @Input() hotspots!: BannerProps["hotspots"];
  @Input() title!: BannerProps["title"];
  @Input() subtitle!: BannerProps["subtitle"];
  @Input() ctaText!: BannerProps["ctaText"];

  @ViewChild("rootRef") rootRef!: ElementRef;
  @ViewChild("canvasRef") canvasRef!: ElementRef;

  isVisible = false;
  get shouldMount() {
    return this.lazyLoad === false || this.isVisible;
  }
  get showSkeleton() {
    return !!this.isLoading || !this.shouldMount;
  }
  get alignment() {
    return (
      this.textAlignment ||
      this.align ||
      this.config?.textAlignment ||
      this.config?.align ||
      "center"
    );
  }
  get hasVideo() {
    return (
      this.media?.type === "video" ||
      (this.backgroundImageUrl && this.backgroundImageUrl.endsWith(".mp4")) ||
      (this.media?.url && this.media.url.endsWith(".mp4"))
    );
  }
  get videoUrl() {
    return this.media?.url || this.backgroundImageUrl || "";
  }
  get imageUrl() {
    return this.media?.url || this.backgroundImageUrl || "";
  }
  get linkUrl() {
    return this.mapLinks?.[0]?.url || this.ctaLink || undefined;
  }
  get gradientOverlay() {
    return this.config?.bgGradient || this.bgGradient || "";
  }
  get paddingValue() {
    const p = this.config?.padding || this.padding;
    if (p === "sm") return "var(--cv-spacing-sm)";
    if (p === "md") return "var(--cv-spacing-md)";
    if (p === "lg") return "var(--cv-spacing-lg)";
    if (p === "xl") return "var(--cv-spacing-xl)";
    return p || "";
  }
  get backgroundPosition() {
    return this.config?.bgPosition || "";
  }
  get minHeightValue() {
    if (this.config?.height === "auto") return "auto";
    return this.config?.minHeight || this.config?.height || "300px";
  }
  get hotspotMinTarget() {
    return this.config?.hotspotMinTargetSize ?? 24;
  }
  get backgroundEffectClass() {
    return this.config?.backgroundEffect || "none";
  }
  get plugin() {
    return this.config?.backgroundEffectPlugin || defaultBackgroundEffectPlugin;
  }
  hotspotHref(h: Hotspot) {
    return h.action?.type === "deeplink"
      ? h.action.deeplink || h.action.url || undefined
      : h.action?.url || undefined;
  }
  hotspotLabel(h: Hotspot) {
    return h.altText || h.label || "Hotspot link";
  }
  hotspotPolygonPoints(h: Hotspot) {
    if (!h.points?.length) return "";
    return h.points.map((p) => `${p.x},${p.y}`).join(" ");
  }
  hotspotCenter(h: Hotspot) {
    return {
      x: h.coords.x + h.coords.width / 2,
      y: h.coords.y + h.coords.height / 2,
    };
  }
  hotspotHitStyle(h: Hotspot) {
    const c = this.hotspotCenter(h);
    return {
      position: "absolute",
      left: `${c.x}%`,
      top: `${c.y}%`,
      width: `${h.coords.width}%`,
      height: `${h.coords.height}%`,
      minWidth: `${this.hotspotMinTarget}px`,
      minHeight: `${this.hotspotMinTarget}px`,
      transform: "translate(-50%, -50%)",
    };
  }
  animContext = {
    animationFrameId: null,
    resizeHandler: null,
    resizeObserver: null,
  };
  observerBox = {
    disconnect: null as (() => void) | null,
  };
  trackByH0(_, h) {
    return `${h.id}-visual`;
  }
  trackByH1(_, h) {
    return h.id;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    if (typeof window !== "undefined") {
      if (this.lazyLoad === false) {
        this.isVisible = true;
        if (this.canvasRef?.nativeElement)
          this.plugin.start(
            this.canvasRef?.nativeElement,
            this.backgroundEffectClass as BackgroundEffectName,
            this.animContext
          );
        return;
      }
      if (this.rootRef?.nativeElement) {
        this.observerBox.disconnect = observeLazyMount(
          this.rootRef!.nativeElement,
          () => {
            this.isVisible = true;
            if (this.canvasRef?.nativeElement)
              this.plugin.start(
                this.canvasRef?.nativeElement,
                this.backgroundEffectClass as BackgroundEffectName,
                this.animContext
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
      if (this.isVisible && this.canvasRef?.nativeElement)
        this.plugin.start(
          this.canvasRef?.nativeElement,
          this.backgroundEffectClass as BackgroundEffectName,
          this.animContext
        );
    }
  }

  ngOnDestroy() {
    if (this.observerBox.disconnect) this.observerBox.disconnect();
    this.plugin.stop(this.animContext);
  }
}

@NgModule({
  declarations: [Banner],
  imports: [CommonModule],
  exports: [Banner],
})
export class BannerModule {}
