// Normalises the three ways a floor can be filled in the CMS — a built-in block, a widget,
// or a custom content type — into one shape the renderer can switch on.
import type { ContentBlock } from './contentveda';

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

// Widget.type values from the CMS widget library.
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
  /** Block styling layered over the widget's own slider/layout config. */
  styling: Record<string, any>;
  banners: any[];
  /** Hero/announcement media: block media first, then the widget's. */
  media?: { url: string; type?: string; altText?: string; posterUrl?: string };
  html?: string;
}

export function normalizeBlock(block: ContentBlock): NormalizedBlock {
  const widget = block.widget;
  let kind: RenderKind = BLOCK_TYPES[block.type] ?? 'unknown';

  if (block.contentType && Array.isArray(block.entries)) kind = 'custom';
  else if (kind === 'unknown' && widget) kind = WIDGET_TYPES[widget.type] ?? 'unknown';

  // A widget with a running countdown renders as a timer whatever its type.
  if (kind === 'hero' && widget?.timerConfig?.enabled && !block.targetDate) kind = 'timer';

  const html = block.htmlContent || widget?.htmlContent;
  if (kind === 'unknown' && html) kind = 'html';

  const styling = { ...(widget?.layoutConfig || {}), ...(widget?.sliderConfig || {}), ...(block.styling || {}) };
  const banners = Array.isArray(block.banners) ? block.banners : Array.isArray(widget?.banners) ? widget.banners : [];
  const media = block.media?.url ? block.media : widget?.media?.url ? widget.media : undefined;

  return { kind, block, styling, banners, media, html };
}

/** Countdown target for a timer floor (block field first, then the widget's timer config). */
export function timerTarget(block: ContentBlock): string | undefined {
  const t = block.widget?.timerConfig;
  return block.targetDate || t?.countdownTo || block.widget?.endDate;
}

/** Title/subtitle from a widget's header data when the block doesn't carry its own. */
export function headline(block: ContentBlock): { title?: string; subtitle?: string } {
  const h = block.widget?.headerData || {};
  return {
    title: block.title || h.title,
    subtitle: block.subtitle || h.subtitle
  };
}
