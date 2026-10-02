// Turns a floor (slot) into what the renderer needs. A floor's own `properties` and the
// widget placed in it (`widget.properties`, `widget.banners`) are separate in the API;
// this is the one place they are combined, slot values winning over the widget's config.
import type { Banner, ContentBlock, Media } from './contentveda';

export type RenderKind =
  | 'paragraph'
  | 'hero'
  | 'announcement'
  | 'slider'
  | 'alternating-slider'
  | 'grid'
  | 'scroller'
  | 'timer'
  | 'html'
  | 'custom'
  | 'unknown';

// Floor `type` values from the page editor.
const BLOCK_TYPES: Record<string, RenderKind> = {
  paragraph: 'paragraph',
  hero: 'hero',
  announcement: 'announcement',
  slider: 'slider',
  'alternating-slider': 'alternating-slider',
  'image-links': 'grid',
  grid: 'grid',
  scroller: 'scroller',
  timer: 'timer'
};

// `widget.type` values from the widget library.
const WIDGET_TYPES: Record<string, RenderKind> = {
  hero: 'hero',
  promo: 'hero',
  media: 'hero',
  announcement: 'announcement',
  'sliding-banner': 'slider',
  'alternating-slider': 'alternating-slider',
  'row-scrollable': 'scroller',
  grid: 'grid',
  wysiwyg: 'html'
};

export interface NormalizedBlock {
  kind: RenderKind;
  block: ContentBlock;
  // undefined (not null) when absent, which is what the @contentveda/ui props expect
  title: string | undefined;
  subtitle: string | undefined;
  ctaLabel: string | undefined;
  ctaUrl: string | undefined;
  media: Media | null;
  html: string | undefined;
  targetDate: string | undefined;
  styling: Record<string, any>;
  classes: string[];
  banners: Banner[];
}

export function normalizeBlock(block: ContentBlock): NormalizedBlock {
  const p = block.properties;
  const w = block.widget;
  const wp = w?.properties;

  const html = p.html ?? wp?.html ?? undefined;
  const targetDate = p.targetDate ?? wp?.targetDate ?? undefined;

  let kind: RenderKind = BLOCK_TYPES[block.type] ?? (w ? WIDGET_TYPES[w.type] : undefined) ?? 'unknown';
  if (block.contentType) kind = 'custom';
  else if (kind === 'hero' && w && targetDate) kind = 'timer'; // a widget with a countdown
  else if (kind === 'unknown' && html) kind = 'html';

  return {
    kind,
    block,
    title: p.title ?? wp?.title ?? undefined,
    subtitle: p.subtitle ?? wp?.subtitle ?? undefined,
    ctaLabel: p.cta?.label ?? undefined,
    ctaUrl: p.cta?.url ?? undefined,
    media: p.media ?? wp?.media ?? null,
    html,
    targetDate,
    styling: { ...(wp?.styling || {}), ...p.styling },
    classes: p.classes,
    banners: w ? w.banners : p.banners
  };
}
