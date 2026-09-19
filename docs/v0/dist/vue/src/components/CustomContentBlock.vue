<template>
  <div :class="`cv-custom-block ${className || ''}`">
    <template v-if="isBlockBaseWidgetShaped">
      <div class="cv-custom-hero">
        <template v-if="blockIsVideo">
          <video
            class="cv-custom-hero-media"
            :src="media?.url"
            :autoPlay="true"
            :loop="true"
            :muted="true"
            :playsInline="true"
          ></video>
        </template>

        <template v-if="!blockIsVideo">
          <img
            class="cv-custom-hero-media"
            :src="media?.url"
            :alt="media?.altText || ''"
          />
        </template>

        <div class="cv-custom-hero-overlay">
          <template v-if="blockTitle">
            <h2 class="cv-custom-hero-title">{{ blockTitle }}</h2>
          </template>

          <template v-if="blockSubtitle">
            <p class="cv-custom-hero-subtitle">{{ blockSubtitle }}</p>
          </template>

          <template v-if="blockCta">
            <span class="cv-custom-hero-cta">{{ blockCta }}</span>
          </template>
        </div>
      </div>
    </template>

    <template v-if="hasEntries">
      <div :class="`cv-custom-entries ${entriesLayoutClass}`">
        <template :key="entry.id" v-for="(entry, index) in entries">
          <div class="cv-custom-entry">
            <template v-if="isBaseWidgetShaped(entry)">
              <img
                class="cv-custom-entry-media"
                :src="entry.media?.url"
                :alt="entry.media?.altText || ''"
              />

              <template v-if="overlayText(entry.textOverlays, 'title')">
                <h4 class="cv-custom-entry-title">
                  {{ overlayText(entry.textOverlays, "title") }}
                </h4>
              </template>
            </template>

            <template v-if="!isBaseWidgetShaped(entry)">
              <template v-if="entry.name">
                <h4 class="cv-custom-entry-title">{{ entry.name }}</h4>
              </template>

              <template v-if="!!firstMediaField(entry)">
                <img
                  class="cv-custom-entry-media"
                  alt=""
                  :src="firstMediaField(entry)?.url"
                />
              </template>

              <p class="cv-custom-entry-fields">{{ entrySummary(entry) }}</p>
            </template>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/*
Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api)
produces for a PageFloorEntry.kind === "custom" block — see
docs/adr-025-custom-content-types.md. Renders site-owner-defined content types
(Strapi-style), additive/parallel to the built-in Widget types every other
component here renders one of.

Deliberately self-contained rather than composing Banner.lite.tsx for the
base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js)
does not support one .lite.tsx component rendering another as a JSX tag — the nested
component reference is silently dropped from the compiled output, verified while
building this component. So the base-widget-typed background+overlay rendering is
duplicated here in simplified form (no hotspot SVG layer) rather than delegated.
*/

export interface CustomContentMedia {
  type?: "image" | "video" | "gif" | string;
  url?: string;
  posterUrl?: string;
  altText?: string;
}
/*
Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api)
produces for a PageFloorEntry.kind === "custom" block — see
docs/adr-025-custom-content-types.md. Renders site-owner-defined content types
(Strapi-style), additive/parallel to the built-in Widget types every other
component here renders one of.

Deliberately self-contained rather than composing Banner.lite.tsx for the
base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js)
does not support one .lite.tsx component rendering another as a JSX tag — the nested
component reference is silently dropped from the compiled output, verified while
building this component. So the base-widget-typed background+overlay rendering is
duplicated here in simplified form (no hotspot SVG layer) rather than delegated.
*/

export interface CustomContentTextOverlay {
  id?: string;
  text?: string;
  type?: "title" | "subtitle" | "cta-button" | string;
}

/*
One ContentEntry as the public API shapes it: raw field data keyed by the
ContentTypeDefinition's field schema (not included in this payload — see the
"generic by runtime shape" rendering below), plus the base-widget-type-inherited
shape when the owning type has one.
*/
/*
Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api)
produces for a PageFloorEntry.kind === "custom" block — see
docs/adr-025-custom-content-types.md. Renders site-owner-defined content types
(Strapi-style), additive/parallel to the built-in Widget types every other
component here renders one of.

Deliberately self-contained rather than composing Banner.lite.tsx for the
base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js)
does not support one .lite.tsx component rendering another as a JSX tag — the nested
component reference is silently dropped from the compiled output, verified while
building this component. So the base-widget-typed background+overlay rendering is
duplicated here in simplified form (no hotspot SVG layer) rather than delegated.
*/

/*
One ContentEntry as the public API shapes it: raw field data keyed by the
ContentTypeDefinition's field schema (not included in this payload — see the
"generic by runtime shape" rendering below), plus the base-widget-type-inherited
shape when the owning type has one.
*/
export interface CustomContentEntry {
  id: string;
  name?: string;
  data?: Record<string, any>;
  media?: CustomContentMedia;
  textOverlays?: CustomContentTextOverlay[];
}
/*
Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api)
produces for a PageFloorEntry.kind === "custom" block — see
docs/adr-025-custom-content-types.md. Renders site-owner-defined content types
(Strapi-style), additive/parallel to the built-in Widget types every other
component here renders one of.

Deliberately self-contained rather than composing Banner.lite.tsx for the
base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js)
does not support one .lite.tsx component rendering another as a JSX tag — the nested
component reference is silently dropped from the compiled output, verified while
building this component. So the base-widget-typed background+overlay rendering is
duplicated here in simplified form (no hotspot SVG layer) rather than delegated.
*/

/*
One ContentEntry as the public API shapes it: raw field data keyed by the
ContentTypeDefinition's field schema (not included in this payload — see the
"generic by runtime shape" rendering below), plus the base-widget-type-inherited
shape when the owning type has one.
*/

export interface CustomContentBlockProps {
  contentType?: string;
  contentTypeKind?: "single" | "collection" | string;
  entries?: CustomContentEntry[];
  /* Hoisted base-widget-type shape — present on the block itself (not nested under an
   entry) only for the common case PageService.resolvePage documents: a "single"-kind
   type, or a "collection" pick showing exactly one item. See state.isBaseWidgetShaped. */
  media?: CustomContentMedia;
  textOverlays?: CustomContentTextOverlay[];
  className?: string;
  isLoading?: boolean;
}

export default defineComponent({
  name: "custom-content-block",

  props: ["entries", "contentTypeKind", "textOverlays", "media", "className"],

  computed: {
    isBlockBaseWidgetShaped() {
      return this.isBaseWidgetShaped(this.props);
    },
    hasEntries() {
      return !this.isBlockBaseWidgetShaped && !!this.entries?.length;
    },
    entriesLayoutClass() {
      return this.contentTypeKind === "collection"
        ? "cv-custom-entries-row"
        : "cv-custom-entries-single";
    },
    blockTitle() {
      return this.overlayText(this.textOverlays, "title");
    },
    blockSubtitle() {
      return this.overlayText(this.textOverlays, "subtitle");
    },
    blockCta() {
      return this.overlayText(this.textOverlays, "cta-button");
    },
    blockIsVideo() {
      return this.media?.type === "video";
    },
  },

  methods: {
    overlayText(
      overlays: CustomContentTextOverlay[] | undefined,
      type: string
    ) {
      return overlays?.find((o) => o.type === type)?.text;
    },
    isBaseWidgetShaped(entry: { media?: CustomContentMedia }) {
      return !!entry.media?.url;
    },
    isMediaFieldValue(value: any) {
      return (
        !!value && typeof value === "object" && typeof value.url === "string"
      );
    },
    fieldValueText(value: any) {
      if (Array.isArray(value)) {
        return value
          .map((item) =>
            typeof item === "object" ? JSON.stringify(item) : String(item)
          )
          .join(", ");
      }
      return typeof value === "object" ? JSON.stringify(value) : String(value);
    },
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
    },
    firstMediaField(entry: CustomContentEntry) {
      const data = entry.data || {};
      const found = Object.values(data).find((v) => this.isMediaFieldValue(v));
      return found as
        | {
            url?: string;
            type?: string;
          }
        | undefined;
    },
  },
});
</script>