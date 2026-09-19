import { Show, For, createSignal, createMemo } from "solid-js";

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
    return found as
      | {
          url?: string;
          type?: string;
        }
      | undefined;
  }

  const isBlockBaseWidgetShaped = createMemo(() => {
    return isBaseWidgetShaped(props);
  });

  const hasEntries = createMemo(() => {
    return !isBlockBaseWidgetShaped() && !!props.entries?.length;
  });

  const entriesLayoutClass = createMemo(() => {
    return props.contentTypeKind === "collection"
      ? "cv-custom-entries-row"
      : "cv-custom-entries-single";
  });

  const blockTitle = createMemo(() => {
    return overlayText(props.textOverlays, "title");
  });

  const blockSubtitle = createMemo(() => {
    return overlayText(props.textOverlays, "subtitle");
  });

  const blockCta = createMemo(() => {
    return overlayText(props.textOverlays, "cta-button");
  });

  const blockIsVideo = createMemo(() => {
    return props.media?.type === "video";
  });

  return (
    <>
      <div class={`cv-custom-block ${props.className || ""}`}>
        <Show when={isBlockBaseWidgetShaped()}>
          <div class="cv-custom-hero">
            <Show when={blockIsVideo()}>
              <video
                class="cv-custom-hero-media"
                src={props.media?.url}
                autoPlay={true}
                loop={true}
                muted={true}
                playsInline={true}
              ></video>
            </Show>
            <Show when={!blockIsVideo()}>
              <img
                class="cv-custom-hero-media"
                src={props.media?.url}
                alt={props.media?.altText || ""}
              />
            </Show>
            <div class="cv-custom-hero-overlay">
              <Show when={blockTitle()}>
                <h2 class="cv-custom-hero-title">{blockTitle()}</h2>
              </Show>
              <Show when={blockSubtitle()}>
                <p class="cv-custom-hero-subtitle">{blockSubtitle()}</p>
              </Show>
              <Show when={blockCta()}>
                <span class="cv-custom-hero-cta">{blockCta()}</span>
              </Show>
            </div>
          </div>
        </Show>
        <Show when={hasEntries()}>
          <div class={`cv-custom-entries ${entriesLayoutClass()}`}>
            <For each={props.entries}>
              {(entry) => {
                return (
                  <div class="cv-custom-entry" key={entry.id}>
                    <Show when={isBaseWidgetShaped(entry)}>
                      <img
                        class="cv-custom-entry-media"
                        src={entry.media?.url}
                        alt={entry.media?.altText || ""}
                      />
                      <Show when={overlayText(entry.textOverlays, "title")}>
                        <h4 class="cv-custom-entry-title">
                          {overlayText(entry.textOverlays, "title")}
                        </h4>
                      </Show>
                    </Show>
                    <Show when={!isBaseWidgetShaped(entry)}>
                      <Show when={entry.name}>
                        <h4 class="cv-custom-entry-title">{entry.name}</h4>
                      </Show>
                      <Show when={!!firstMediaField(entry)}>
                        <img
                          class="cv-custom-entry-media"
                          alt=""
                          src={firstMediaField(entry)?.url}
                        />
                      </Show>
                      <p class="cv-custom-entry-fields">
                        {entrySummary(entry)}
                      </p>
                    </Show>
                  </div>
                );
              }}
            </For>
          </div>
        </Show>
      </div>
    </>
  );
}

export default CustomContentBlock;
