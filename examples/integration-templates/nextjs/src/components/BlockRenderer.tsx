// Maps a ContentVeda floor — built-in block, widget or custom content type — to its
// @contentveda/ui component. Mirrors the CMS editor preview.
// The @contentveda/ui React components are client components ("use client"), so this
// file can stay a server component and just pass serialisable props down.

// @ts-ignore — the package ships JS without type declarations for these entry points
import Banner from '@contentveda/ui/react/Banner';
// @ts-ignore
import AnnouncementBar from '@contentveda/ui/react/AnnouncementBar';
// @ts-ignore
import SlidingBanner from '@contentveda/ui/react/SlidingBanner';
// @ts-ignore
import AlternatingSlider from '@contentveda/ui/react/AlternatingSlider';
// @ts-ignore
import GridBanner from '@contentveda/ui/react/GridBanner';
// @ts-ignore
import RowScrollable from '@contentveda/ui/react/RowScrollable';
// @ts-ignore
import TimerWidget from '@contentveda/ui/react/TimerWidget';
// @ts-ignore
import WysiwygRenderer from '@contentveda/ui/react/WysiwygRenderer';
import CustomEntries from './CustomEntries';
import type { ContentBlock } from '@/lib/contentveda';
import { normalizeBlock } from '@/lib/blocks';
import { uiMedia } from '@/lib/media';

function Floor({ block }: { block: ContentBlock }) {
  const n = normalizeBlock(block);
  const styling = n.styling;
  const media = uiMedia(n.media);

  const slideItems = n.banners.map((b) => ({
    id: b.id,
    title: b.properties.title || '',
    subtitle: b.properties.description || '',
    ctaText: b.properties.cta?.label || '',
    ctaLink: b.properties.cta?.url || '',
    media: uiMedia(b.properties.media)
  }));
  const tileItems = n.banners.map((b) => ({
    id: b.id,
    title: b.properties.title || '',
    media: uiMedia(b.properties.media),
    mapLinks: b.properties.cta?.url ? [{ label: b.properties.cta.label || '', url: b.properties.cta.url || '' }] : []
  }));

  switch (n.kind) {
    case 'paragraph':
      return <WysiwygRenderer content={n.html} htmlContent={n.html} />;

    case 'hero':
      return (
        <Banner
          title={n.title}
          subtitle={n.subtitle}
          ctaText={n.ctaLabel}
          ctaLink={n.ctaUrl || '#'}
          media={media}
          hotspots={block.properties.hotspots.length ? block.properties.hotspots : block.widget?.properties.hotspots}
          config={{
            align: styling.alignment || 'center',
            bgGradient: styling.bgGradient,
            padding: styling.padding,
            height: styling.height,
            bgPosition: styling.bgPosition,
            backgroundEffect: styling.backgroundEffect || 'none'
          }}
        />
      );

    case 'announcement':
      return (
        <AnnouncementBar
          message={n.title || n.subtitle || ''}
          mapLinks={n.ctaUrl ? [{ url: n.ctaUrl }] : undefined}
          backgroundColor={styling.announcementBg}
          textColor={styling.textColor}
        />
      );

    case 'slider':
      return (
        <SlidingBanner
          items={slideItems}
          config={{
            rotateAgain: true,
            showNextPrev: styling.showArrows !== false,
            showArrows: styling.showArrows !== false,
            showDots: styling.showDots !== false,
            autoStart: styling.autoplay !== false,
            delayMs: styling.delayMs || 5000,
            animationEffect: styling.animationEffect || 'slide',
            backgroundEffect: styling.backgroundEffect || 'none',
            height: styling.height,
            bgPosition: styling.bgPosition
          }}
        />
      );

    case 'alternating-slider':
      return (
        <AlternatingSlider
          items={slideItems}
          config={{
            columns: styling.columns || 2,
            showArrows: styling.showArrows !== false,
            showDots: styling.showDots !== false,
            autoStart: styling.autoplay !== false,
            delayMs: styling.delayMs || 5000,
            height: styling.height,
            bgPosition: styling.bgPosition
          }}
        />
      );

    case 'grid':
      return (
        <GridBanner
          items={tileItems}
          columns={styling.columns || 3}
          config={{ height: styling.height, bgPosition: styling.bgPosition }}
        />
      );

    case 'scroller':
      return <RowScrollable title={n.title} items={tileItems} />;

    case 'timer':
      return (
        <TimerWidget
          title={n.title}
          targetDate={n.targetDate || ''}
          variant={styling.variant || 'dark'}
          backgroundImageUrl={media?.url}
          expiredText={styling.expiredText}
          width="auto"
          height={styling.height || 'auto'}
        />
      );

    case 'html':
      return <WysiwygRenderer content={n.html} htmlContent={n.html} />;

    case 'custom':
      // Custom content type. CustomEntries renders entries generically (fields, media,
      // rich text); to give a type its own design, branch on block.contentType.name first, e.g.
      //   if (block.contentType?.name === 'testimonial') return <Testimonials entries={block.contentType.entries} />;
      return <CustomEntries block={block} />;

    default:
      return (
        <div className="cv-unknown-block">
          No renderer for floor type <code>{block.type}</code>
          {block.widget ? ` (widget: ${block.widget.type})` : ''} — add one in{' '}
          <code>src/components/BlockRenderer.tsx</code>.
        </div>
      );
  }
}

export default function BlockRenderer({ block }: { block: ContentBlock }) {
  const classes = block.properties.classes.join(' ');
  return (
    <div className={classes || undefined}>
      <Floor block={block} />
    </div>
  );
}
