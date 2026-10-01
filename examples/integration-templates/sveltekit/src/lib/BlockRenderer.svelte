<script lang="ts">
  // Maps a ContentVeda floor — built-in block, widget or custom content type — to its
  // @contentveda/ui component. Mirrors the CMS editor preview.
  import Banner from '@contentveda/ui/svelte/Banner.svelte';
  import AnnouncementBar from '@contentveda/ui/svelte/AnnouncementBar.svelte';
  import SlidingBanner from '@contentveda/ui/svelte/SlidingBanner.svelte';
  import AlternatingSlider from '@contentveda/ui/svelte/AlternatingSlider.svelte';
  import GridBanner from '@contentveda/ui/svelte/GridBanner.svelte';
  import RowScrollable from '@contentveda/ui/svelte/RowScrollable.svelte';
  import TimerWidget from '@contentveda/ui/svelte/TimerWidget.svelte';
  import WysiwygRenderer from '@contentveda/ui/svelte/WysiwygRenderer.svelte';
  import type { ContentBlock } from '$lib/contentveda';
  import { normalizeBlock, timerTarget, headline } from '$lib/blocks';
  import { bannerMedia, mediaUrl } from '$lib/media';
  import CustomEntries from '$lib/CustomEntries.svelte';

  let { block }: { block: ContentBlock } = $props();

  const n = $derived(normalizeBlock(block));
  const styling = $derived(n.styling);
  const text = $derived(headline(block));
  const link = $derived(block.slug || block.ctaLink || block.link || '');

  const slideItems = $derived(
    n.banners.map((b) => ({
      id: b.id,
      title: b.headline || '',
      subtitle: b.description || '',
      ctaText: b.url ? b.ctaLabel || '' : '',
      ctaLink: b.url || '',
      media: bannerMedia(b.image)
    }))
  );
  const tileItems = $derived(
    n.banners.map((b) => ({
      id: b.id,
      title: b.name || b.headline || '',
      media: bannerMedia(b.image),
      mapLinks: b.url ? [{ label: b.ctaLabel || '', url: b.url }] : []
    }))
  );
</script>

{#if n.kind === 'paragraph'}
  <WysiwygRenderer content={block.title} htmlContent={block.title} />
{:else if n.kind === 'hero'}
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
{:else if n.kind === 'announcement'}
  <AnnouncementBar
    message={text.title || text.subtitle || ''}
    mapLinks={link ? [{ url: link }] : undefined}
    backgroundColor={styling.announcementBg}
    textColor={styling.textColor}
  />
{:else if n.kind === 'slider'}
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
{:else if n.kind === 'alternating-slider'}
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
{:else if n.kind === 'grid'}
  <GridBanner
    items={tileItems}
    columns={styling.columns || 3}
    config={{ height: styling.height, bgPosition: styling.bgPosition }}
  />
{:else if n.kind === 'scroller'}
  <RowScrollable title={text.title} items={tileItems} />
{:else if n.kind === 'timer'}
  <TimerWidget
    title={text.title}
    targetDate={timerTarget(block) || ''}
    variant={block.variant || 'dark'}
    backgroundImageUrl={block.mediaUrl ? mediaUrl(block.mediaUrl) : n.media?.url}
    expiredText={block.expiredText}
    width="auto"
    height={styling.height || 'auto'}
  />
{:else if n.kind === 'html'}
  <WysiwygRenderer content={n.html} htmlContent={n.html} />
{:else if n.kind === 'custom'}
  <!-- Custom content type: CustomEntries renders every entry's fields generically. To give a
       type its own design, branch on block.contentType first, e.g.
       {#if block.contentType === 'testimonial'}<Testimonials entries={block.entries} />{/if} -->
  <CustomEntries {block} />
{:else}
  <div class="cv-unknown-block">
    No renderer for block type <code>{block.type}</code>{block.widget ? ` (widget: ${block.widget.type})` : ''} —
    add one in <code>src/lib/BlockRenderer.svelte</code>.
  </div>
{/if}
