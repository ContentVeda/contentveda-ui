import { useStore, Show } from '@builder.io/mitosis';

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
  type?: 'image' | 'video' | 'gif' | string;
  url?: string;
  posterUrl?: string;
  altText?: string;
}

export interface CustomContentTextOverlay {
  id?: string;
  text?: string;
  type?: 'title' | 'subtitle' | 'cta-button' | string;
}

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

export interface CustomContentBlockProps {
  contentType?: string;
  contentTypeKind?: 'single' | 'collection' | string;
  entries?: CustomContentEntry[];
  // Hoisted base-widget-type shape — present on the block itself (not nested under an
  // entry) only for the common case PageService.resolvePage documents: a "single"-kind
  // type, or a "collection" pick showing exactly one item. See state.isBaseWidgetShaped.
  media?: CustomContentMedia;
  textOverlays?: CustomContentTextOverlay[];
  className?: string;
  isLoading?: boolean;
}

export default function CustomContentBlock(props: CustomContentBlockProps) {
  const state = useStore({
    overlayText(overlays: CustomContentTextOverlay[] | undefined, type: string) {
      return overlays?.find((o) => o.type === type)?.text;
    },

    // A base-widget-typed entry/block carries the same media/textOverlays shape a
    // built-in Widget does (PageService.resolvePage's applyMediaShapeProps).
    isBaseWidgetShaped(entry: { media?: CustomContentMedia }) {
      return !!entry.media?.url;
    },

    // A "media" field's value mirrors WidgetMedia's own shape ({assetId, url, type} —
    // see ContentEntry.data's class doc); anything else is rendered by its runtime JS
    // shape since the field-type schema (ContentTypeDefinition.fields) isn't part of
    // this response — see this component's file doc.
    isMediaFieldValue(value: any) {
      return !!value && typeof value === 'object' && typeof value.url === 'string';
    },

    fieldValueText(value: any) {
      if (Array.isArray(value)) {
        return value.map((item) => (typeof item === 'object' ? JSON.stringify(item) : String(item))).join(', ');
      }
      return typeof value === 'object' ? JSON.stringify(value) : String(value);
    },

    // One display line per non-media field, e.g. "Headline: Festival Sale · Discount: 20"
    // — a single computed string per entry rather than a nested per-field loop, since
    // this repo's Mitosis pipeline doesn't reliably compile a loop nested inside another
    // loop (verified while building this component; see the file doc above).
    entrySummary(entry: CustomContentEntry) {
      const data = entry.data || {};
      return Object.entries(data)
        .filter(([, v]) => v !== null && v !== undefined && v !== '' && !state.isMediaFieldValue(v))
        .map(([key, value]) => `${key}: ${state.fieldValueText(value)}`)
        .join(' · ');
    },

    // The first media-shaped field value on an entry, if any — rendered as an image
    // separately from entrySummary's text fields.
    firstMediaField(entry: CustomContentEntry) {
      const data = entry.data || {};
      const found = Object.values(data).find((v) => state.isMediaFieldValue(v));
      return found as { url?: string; type?: string } | undefined;
    },

    get isBlockBaseWidgetShaped() {
      return state.isBaseWidgetShaped(props);
    },
    get hasEntries() {
      return !state.isBlockBaseWidgetShaped && !!props.entries?.length;
    },
    get entriesLayoutClass() {
      return props.contentTypeKind === 'collection' ? 'cv-custom-entries-row' : 'cv-custom-entries-single';
    },
    get blockTitle() {
      return state.overlayText(props.textOverlays, 'title');
    },
    get blockSubtitle() {
      return state.overlayText(props.textOverlays, 'subtitle');
    },
    get blockCta() {
      return state.overlayText(props.textOverlays, 'cta-button');
    },
    get blockIsVideo() {
      return props.media?.type === 'video';
    }
  });

  return (
    <div class={`cv-custom-block ${props.className || ''}`}>
      <Show when={state.isBlockBaseWidgetShaped}>
        <div class="cv-custom-hero">
          <Show when={state.blockIsVideo}>
            <video class="cv-custom-hero-media" src={props.media?.url} autoPlay loop muted playsInline />
          </Show>
          <Show when={!state.blockIsVideo}>
            <img class="cv-custom-hero-media" src={props.media?.url} alt={props.media?.altText || ''} />
          </Show>
          <div class="cv-custom-hero-overlay">
            {state.blockTitle && <h2 class="cv-custom-hero-title">{state.blockTitle}</h2>}
            {state.blockSubtitle && <p class="cv-custom-hero-subtitle">{state.blockSubtitle}</p>}
            {state.blockCta && <span class="cv-custom-hero-cta">{state.blockCta}</span>}
          </div>
        </div>
      </Show>

      <Show when={state.hasEntries}>
        <div class={`cv-custom-entries ${state.entriesLayoutClass}`}>
          {props.entries?.map((entry) => (
            <div key={entry.id} class="cv-custom-entry">
              <Show when={state.isBaseWidgetShaped(entry)}>
                <img class="cv-custom-entry-media" src={entry.media?.url} alt={entry.media?.altText || ''} />
                {state.overlayText(entry.textOverlays, 'title') && (
                  <h4 class="cv-custom-entry-title">{state.overlayText(entry.textOverlays, 'title')}</h4>
                )}
              </Show>

              <Show when={!state.isBaseWidgetShaped(entry)}>
                {entry.name && <h4 class="cv-custom-entry-title">{entry.name}</h4>}
                <Show when={!!state.firstMediaField(entry)}>
                  <img class="cv-custom-entry-media" src={state.firstMediaField(entry)?.url} alt="" />
                </Show>
                <p class="cv-custom-entry-fields">{state.entrySummary(entry)}</p>
              </Show>
            </div>
          ))}
        </div>
      </Show>
    </div>
  );
}
