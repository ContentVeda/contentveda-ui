import * as React from "react";

/*
Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api)
produces for a PageFloorEntry.kind === "custom" block — see
docs/adr-025-custom-content-types.md. Renders site-owner-defined content types
(Strapi-style), additive/parallel to the built-in Widget types every other
component here renders one of.

Deliberately self-contained rather than composing Banner.lite.tsx for the
base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js) does not support one .lite.tsx component rendering another as a JSX tag — the nested component reference is silently dropped from the compiled output, verified while building this component. So the base-widget-typed background+overlay rendering is duplicated here in simplified form (no hotspot SVG layer) rather than delegated. */ export interface CustomContentMedia {
  type?: "image" | "video" | "gif" | string;
  url?: string;
  posterUrl?: string;
  altText?: string;
} /* Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api) produces for a PageFloorEntry.kind === "custom" block — see docs/adr-025-custom-content-types.md. Renders site-owner-defined content types (Strapi-style), additive/parallel to the built-in Widget types every other component here renders one of.  Deliberately self-contained rather than composing Banner.lite.tsx for the base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js)
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
ContentTypeDefinition's field schema (not included in this payload — see the "generic by runtime shape" rendering below), plus the base-widget-type-inherited shape when the owning type has one. */ /* Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api) produces for a PageFloorEntry.kind === "custom" block — see docs/adr-025-custom-content-types.md. Renders site-owner-defined content types (Strapi-style), additive/parallel to the built-in Widget types every other component here renders one of.  Deliberately self-contained rather than composing Banner.lite.tsx for the base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js)
does not support one .lite.tsx component rendering another as a JSX tag — the nested
component reference is silently dropped from the compiled output, verified while
building this component. So the base-widget-typed background+overlay rendering is
duplicated here in simplified form (no hotspot SVG layer) rather than delegated.
*/

/*
One ContentEntry as the public API shapes it: raw field data keyed by the
ContentTypeDefinition's field schema (not included in this payload — see the "generic by runtime shape" rendering below), plus the base-widget-type-inherited shape when the owning type has one. */ export interface CustomContentEntry {
  id: string;
  name?: string;
  data?: Record<string, any>;
  media?: CustomContentMedia;
  textOverlays?: CustomContentTextOverlay[];
} /* Mirrors the resolved block shape PageService.resolvePage (contentveda-public-api) produces for a PageFloorEntry.kind === "custom" block — see docs/adr-025-custom-content-types.md. Renders site-owner-defined content types (Strapi-style), additive/parallel to the built-in Widget types every other component here renders one of.  Deliberately self-contained rather than composing Banner.lite.tsx for the base-widget-type case: this repo's Mitosis -> webcomponent pipeline (build-wc.js)
does not support one .lite.tsx component rendering another as a JSX tag — the nested
component reference is silently dropped from the compiled output, verified while
building this component. So the base-widget-typed background+overlay rendering is
duplicated here in simplified form (no hotspot SVG layer) rather than delegated.
*/

/*
One ContentEntry as the public API shapes it: raw field data keyed by the
ContentTypeDefinition's field schema (not included in this payload — see the "generic by runtime shape" rendering below), plus the base-widget-type-inherited shape when the owning type has one. */ export interface CustomContentBlockProps {
  contentType?: string;
  contentTypeKind?: "single" | "collection" | string;
  entries?: CustomContentEntry[];
  /* Hoisted base-widget-type shape — present on the block itself (not nested under an    entry) only for the common case PageService.resolvePage documents: a "single"-kind    type, or a "collection" pick showing exactly one item. See state.isBaseWidgetShaped. */ media?: CustomContentMedia;
  textOverlays?: CustomContentTextOverlay[];
  className?: string;
  isLoading?: boolean;
}
function CustomContentBlock(props: CustomContentBlockProps) {
  function overlayText(
    overlays: CustomContentTextOverlay[] | undefined,
    type: string
  ) {
    return overlays?.find((o) => o.type === type)?.text;
  }
  function isBaseWidgetShaped(entry: { media?: CustomContentMedia }) {
    return !!entry.media?.url;
  }
  function isMediaFieldValue(value: any) {
    return (
      !!value && typeof value === "object" && typeof value.url === "string"
    );
  }
  function fieldValueText(value: any) {
    if (Array.isArray(value)) {
      return value
        .map((item) =>
          typeof item === "object" ? JSON.stringify(item) : String(item)
        )
        .join(", ");
    }
    return typeof value === "object" ? JSON.stringify(value) : String(value);
  }
  function entrySummary(entry: CustomContentEntry) {
    const data = entry.data || {};
    return Object.entries(data)
      .filter(
        ([, v]) =>
          v !== null && v !== undefined && v !== "" && !isMediaFieldValue(v)
      )
      .map(([key, value]) => `${key}: ${fieldValueText(value)}`)
      .join(" · ");
  }
  function firstMediaField(entry: CustomContentEntry) {
    const data = entry.data || {};
    const found = Object.values(data).find((v) => isMediaFieldValue(v));
    return found as { url?: string; type?: string } | undefined;
  }
  function isBlockBaseWidgetShaped() {
    return isBaseWidgetShaped(props);
  }
  function hasEntries() {
    return !isBlockBaseWidgetShaped() && !!props.entries?.length;
  }
  function entriesLayoutClass() {
    return props.contentTypeKind === "collection"
      ? "cv-custom-entries-row"
      : "cv-custom-entries-single";
  }
  function blockTitle() {
    return overlayText(props.textOverlays, "title");
  }
  function blockSubtitle() {
    return overlayText(props.textOverlays, "subtitle");
  }
  function blockCta() {
    return overlayText(props.textOverlays, "cta-button");
  }
  function blockIsVideo() {
    return props.media?.type === "video";
  }
  return (
    <div className={`cv-custom-block ${props.className || ""}`}>
      {isBlockBaseWidgetShaped() ? (
        <div className="cv-custom-hero">
          {blockIsVideo() ? (
            <video
              className="cv-custom-hero-media"
              src={props.media?.url}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : null}
          {!blockIsVideo() ? (
            <img
              className="cv-custom-hero-media"
              src={props.media?.url}
              alt={props.media?.altText || ""}
            />
          ) : null}
          <div className="cv-custom-hero-overlay">
            {blockTitle() ? (
              <h2 className="cv-custom-hero-title">{blockTitle()}</h2>
            ) : null}
            {blockSubtitle() ? (
              <p className="cv-custom-hero-subtitle">{blockSubtitle()}</p>
            ) : null}
            {blockCta() ? (
              <span className="cv-custom-hero-cta">{blockCta()}</span>
            ) : null}
          </div>
        </div>
      ) : null}
      {hasEntries() ? (
        <div className={`cv-custom-entries ${entriesLayoutClass()}`}>
          {props.entries?.map((entry) => (
            <div className="cv-custom-entry" key={entry.id}>
              {isBaseWidgetShaped(entry) ? (
                <>
                  <img
                    className="cv-custom-entry-media"
                    src={entry.media?.url}
                    alt={entry.media?.altText || ""}
                  />{" "}
                  {overlayText(entry.textOverlays, "title") ? (
                    <h4 className="cv-custom-entry-title">
                      {overlayText(entry.textOverlays, "title")}
                    </h4>
                  ) : null}
                </>
              ) : null}
              {!isBaseWidgetShaped(entry) ? (
                <>
                  {entry.name ? (
                    <h4 className="cv-custom-entry-title">{entry.name}</h4>
                  ) : null}{" "}
                  {!!firstMediaField(entry) ? (
                    <img
                      className="cv-custom-entry-media"
                      alt=""
                      src={firstMediaField(entry)?.url}
                    />
                  ) : null}{" "}
                  <p className="cv-custom-entry-fields">
                    {entrySummary(entry)}
                  </p>
                </>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
export default CustomContentBlock;
