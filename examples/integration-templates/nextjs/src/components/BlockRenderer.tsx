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
// @ts-ignore
import CustomContentBlock from '@contentveda/ui/react/CustomContentBlock';
import type { ContentBlock } from '@/lib/contentveda';
import { normalizeBlock, timerTarget, headline } from '@/lib/blocks';
import { bannerMedia, mediaUrl } from '@/lib/media';

export default function BlockRenderer({ block }: { block: ContentBlock }) {
  const n = normalizeBlock(block);
  const styling = n.styling;
  const text = headline(block);
  const link = block.slug || block.ctaLink || block.link || '';

  const slideItems = n.banners.map((b) => ({
    id: b.id,
    title: b.headline || '',
    subtitle: b.description || '',
    ctaText: b.url ? b.ctaLabel || '' : '',
    ctaLink: b.url || '',
    media: bannerMedia(b.image)
  }));
  const tileItems = n.banners.map((b) => ({
    id: b.id,
    title: b.name || b.headline || '',
    media: bannerMedia(b.image),
    mapLinks: b.url ? [{ label: b.ctaLabel || '', url: b.url }] : []
  }));

  switch (n.kind) {
    case 'paragraph':
      return <WysiwygRenderer content={block.title} htmlContent={block.title} />;

    case 'hero':
      return (
        <Banner
          title={text.title}
          subtitle={text.subtitle}
          ctaText={block.cta}
          ctaLink={link || '#'}
          media={n.media}
          backgroundImageUrl={!n.media && block.mediaUrl ? mediaUrl(block.mediaUrl) : undefined}
          hotspots={Array.isArray(block.imageMap) ? block.imageMap : undefined}
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
          message={text.title || text.subtitle || ''}
          mapLinks={link ? [{ url: link }] : undefined}
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
      return <RowScrollable title={text.title} items={tileItems} />;

    case 'timer':
      return (
        <TimerWidget
          title={text.title}
          targetDate={timerTarget(block) || ''}
          variant={block.variant || 'dark'}
          backgroundImageUrl={block.mediaUrl ? mediaUrl(block.mediaUrl) : n.media?.url}
          expiredText={block.expiredText}
          width="auto"
          height={styling.height || 'auto'}
        />
      );

    case 'html':
      return <WysiwygRenderer content={n.html} htmlContent={n.html} />;

    case 'custom':
      // Custom content type. CustomContentBlock renders entries generically (fields, media,
      // rich text); to give a type its own design, branch on block.contentType first, e.g.
      //   if (block.contentType === 'testimonial') return <Testimonials entries={block.entries} />;
      return (
        <CustomContentBlock
          contentType={block.contentType}
          contentTypeKind={block.contentTypeKind}
          entries={block.entries}
          media={n.media}
          textOverlays={block.textOverlays}
        />
      );

    default:
      return (
        <div className="cv-unknown-block">
          No renderer for block type <code>{block.type}</code>
          {block.widget ? ` (widget: ${block.widget.type})` : ''} — add one in{' '}
          <code>src/components/BlockRenderer.tsx</code>.
        </div>
      );
  }
}
