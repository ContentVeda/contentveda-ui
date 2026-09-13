import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";

// Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api)
// produces for a PageFloorEntry.kind === "custom" block — see
// docs/adr-025-custom-content-types.md. Renders site-owner-defined content types
// (Strapi-style), additive/parallel to the built-in Widget types every other
// component here renders one of.
//
// Deliberately self-contained rather than composing Banner.lite.tsx for the
// base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js)
// does not support one .lite.tsx component rendering another as a JSX tag — the nested
// component reference is silently dropped from the compiled output, verified while
// building this component. So the base-widget-typed background+overlay rendering is
// duplicated here in simplified form (no hotspot SVG layer) rather than delegated.

export interface CustomContentMedia {
  type?: "image" | "video" | "gif" | string;
  url?: string;
  posterUrl?: string;
  altText?: string;
}
// Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api)
// produces for a PageFloorEntry.kind === "custom" block — see
// docs/adr-025-custom-content-types.md. Renders site-owner-defined content types
// (Strapi-style), additive/parallel to the built-in Widget types every other
// component here renders one of.
//
// Deliberately self-contained rather than composing Banner.lite.tsx for the
// base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js)
// does not support one .lite.tsx component rendering another as a JSX tag — the nested
// component reference is silently dropped from the compiled output, verified while
// building this component. So the base-widget-typed background+overlay rendering is
// duplicated here in simplified form (no hotspot SVG layer) rather than delegated.

export interface CustomContentTextOverlay {
  id?: string;
  text?: string;
  type?: "title" | "subtitle" | "cta-button" | string;
}

// One ContentEntry as the public API shapes it: raw field data keyed by the
// ContentTypeDefinition's field schema (not included in this payload — see the
// "generic by runtime shape" rendering below), plus the base-widget-type-inherited
// shape when the owning type has one.
// Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api)
// produces for a PageFloorEntry.kind === "custom" block — see
// docs/adr-025-custom-content-types.md. Renders site-owner-defined content types
// (Strapi-style), additive/parallel to the built-in Widget types every other
// component here renders one of.
//
// Deliberately self-contained rather than composing Banner.lite.tsx for the
// base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js)
// does not support one .lite.tsx component rendering another as a JSX tag — the nested
// component reference is silently dropped from the compiled output, verified while
// building this component. So the base-widget-typed background+overlay rendering is
// duplicated here in simplified form (no hotspot SVG layer) rather than delegated.

// One ContentEntry as the public API shapes it: raw field data keyed by the
// ContentTypeDefinition's field schema (not included in this payload — see the
// "generic by runtime shape" rendering below), plus the base-widget-type-inherited
// shape when the owning type has one.
export interface CustomContentEntry {
  id: string;
  name?: string;
  data?: Record<string, any>;
  media?: CustomContentMedia;
  textOverlays?: CustomContentTextOverlay[];
}
// Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api)
// produces for a PageFloorEntry.kind === "custom" block — see
// docs/adr-025-custom-content-types.md. Renders site-owner-defined content types
// (Strapi-style), additive/parallel to the built-in Widget types every other
// component here renders one of.
//
// Deliberately self-contained rather than composing Banner.lite.tsx for the
// base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js)
// does not support one .lite.tsx component rendering another as a JSX tag — the nested
// component reference is silently dropped from the compiled output, verified while
// building this component. So the base-widget-typed background+overlay rendering is
// duplicated here in simplified form (no hotspot SVG layer) rather than delegated.

// One ContentEntry as the public API shapes it: raw field data keyed by the
// ContentTypeDefinition's field schema (not included in this payload — see the
// "generic by runtime shape" rendering below), plus the base-widget-type-inherited
// shape when the owning type has one.

export interface CustomContentBlockProps {
  contentType?: string;
  contentTypeKind?: "single" | "collection" | string;
  entries?: CustomContentEntry[];
  // Hoisted base-widget-type shape — present on the block itself (not nested under an
  // entry) only for the common case PageService.resolvePage documents: a "single"-kind
  // type, or a "collection" pick showing exactly one item. See state.isBaseWidgetShaped.
  media?: CustomContentMedia;
  textOverlays?: CustomContentTextOverlay[];
  className?: string;
  isLoading?: boolean;
}

@Component({
  selector: "custom-content-block",
  template: `
    <div [class]="'cv-custom-block ' + (className || '')">
      <ng-container *ngIf="isBlockBaseWidgetShaped"
        ><div class="cv-custom-hero">
          <ng-container *ngIf="blockIsVideo"
            ><video
              class="cv-custom-hero-media"
              [attr.src]="media?.url"
              [attr.autoPlay]="true"
              [attr.loop]="true"
              [attr.muted]="true"
              [attr.playsInline]="true"
            ></video
          ></ng-container>
          <ng-container *ngIf="!blockIsVideo"
            ><img
              class="cv-custom-hero-media"
              [attr.src]="media?.url"
              [attr.alt]="media?.altText || ''"
          /></ng-container>
          <div class="cv-custom-hero-overlay">
            <ng-container *ngIf="blockTitle"
              ><h2 class="cv-custom-hero-title">
                {{blockTitle}}
              </h2></ng-container
            >
            <ng-container *ngIf="blockSubtitle"
              ><p class="cv-custom-hero-subtitle">
                {{blockSubtitle}}
              </p></ng-container
            >
            <ng-container *ngIf="blockCta"
              ><span
                class="cv-custom-hero-cta"
                >{{blockCta}}</span
              ></ng-container
            >
          </div>
        </div></ng-container
      >
      <ng-container *ngIf="hasEntries"
        ><div [class]="'cv-custom-entries ' + (entriesLayoutClass)">
          <ng-container *ngFor="let entry of entries; trackBy: trackByEntry0"
            ><div class="cv-custom-entry">
              <ng-container *ngIf="isBaseWidgetShaped(entry)"
                ><img
                  class="cv-custom-entry-media"
                  [attr.src]="entry.media?.url"
                  [attr.alt]="entry.media?.altText || ''"
                />
                <ng-container *ngIf="overlayText(entry.textOverlays, 'title')"
                  ><h4 class="cv-custom-entry-title">
                    {{overlayText(entry.textOverlays, 'title')}}
                  </h4></ng-container
                ></ng-container
              >
              <ng-container *ngIf="!isBaseWidgetShaped(entry)"
                ><ng-container *ngIf="entry.name"
                  ><h4 class="cv-custom-entry-title">
                    {{entry.name}}
                  </h4></ng-container
                >
                <ng-container *ngIf="!!firstMediaField(entry)"
                  ><img
                    class="cv-custom-entry-media"
                    alt=""
                    [attr.src]="firstMediaField(entry)?.url"
                /></ng-container>
                <p class="cv-custom-entry-fields">
                  {{entrySummary(entry)}}
                </p></ng-container
              >
            </div></ng-container
          >
        </div></ng-container
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
export default class CustomContentBlock {
  @Input() entries!: CustomContentBlockProps["entries"];
  @Input() contentTypeKind!: CustomContentBlockProps["contentTypeKind"];
  @Input() textOverlays!: CustomContentBlockProps["textOverlays"];
  @Input() media!: CustomContentBlockProps["media"];
  @Input() className!: CustomContentBlockProps["className"];

  overlayText(overlays: CustomContentTextOverlay[] | undefined, type: string) {
    return overlays?.find((o) => o.type === type)?.text;
  }
  isBaseWidgetShaped(entry: { media?: CustomContentMedia }) {
    return !!entry.media?.url;
  }
  isMediaFieldValue(value: any) {
    return (
      !!value && typeof value === "object" && typeof value.url === "string"
    );
  }
  fieldValueText(value: any) {
    if (Array.isArray(value)) {
      return value
        .map((item) =>
          typeof item === "object" ? JSON.stringify(item) : String(item)
        )
        .join(", ");
    }
    return typeof value === "object" ? JSON.stringify(value) : String(value);
  }
  entrySummary(entry: CustomContentEntry) {
    const data = entry.data || {};
    return Object.entries(data)
      .filter(
        ([, v]) =>
          v !== null &&
          v !== undefined &&
          v !== "" &&
          !this.isMediaFieldValue(v)
      )
      .map(([key, value]) => `${key}: ${this.fieldValueText(value)}`)
      .join(" · ");
  }
  firstMediaField(entry: CustomContentEntry) {
    const data = entry.data || {};
    const found = Object.values(data).find((v) => this.isMediaFieldValue(v));
    return found as
      | {
          url?: string;
          type?: string;
        }
      | undefined;
  }
  get isBlockBaseWidgetShaped() {
    return this.isBaseWidgetShaped(this);
  }
  get hasEntries() {
    return !this.isBlockBaseWidgetShaped && !!this.entries?.length;
  }
  get entriesLayoutClass() {
    return this.contentTypeKind === "collection"
      ? "cv-custom-entries-row"
      : "cv-custom-entries-single";
  }
  get blockTitle() {
    return this.overlayText(this.textOverlays, "title");
  }
  get blockSubtitle() {
    return this.overlayText(this.textOverlays, "subtitle");
  }
  get blockCta() {
    return this.overlayText(this.textOverlays, "cta-button");
  }
  get blockIsVideo() {
    return this.media?.type === "video";
  }
  trackByEntry0(_, entry) {
    return entry.id;
  }
}

@NgModule({
  declarations: [CustomContentBlock],
  imports: [CommonModule],
  exports: [CustomContentBlock],
})
export class CustomContentBlockModule {}
