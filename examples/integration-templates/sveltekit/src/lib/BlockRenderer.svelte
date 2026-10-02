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
  import { normalizeBlock } from '$lib/blocks';
  import { uiMedia } from '$lib/media';
  import CustomEntries from '$lib/CustomEntries.svelte';

  let { block }: { block: ContentBlock } = $props();

  const n = $derived(normalizeBlock(block));
  const styling = $derived(n.styling);
  const media = $derived(uiMedia(n.media));

  const slideItems = $derived(
    n.banners.map((b) => ({
      id: b.id,
      title: b.properties.title || '',
      subtitle: b.properties.description || '',
      ctaText: b.properties.cta?.label || '',
      ctaLink: b.properties.cta?.url || '',
      media: uiMedia(b.properties.media)
    }))
  );
  const tileItems = $derived(
    n.banners.map((b) => ({
      id: b.id,
      title: b.properties.title || '',
      media: uiMedia(b.properties.media),
      mapLinks: b.properties.cta?.url ? [{ label: b.properties.cta.label || '', url: b.properties.cta.url }] : []
    }))
  );
</script>

<div class={n.classes.join(' ') || undefined}>
  {#if n.kind === 'paragraph'}
    <WysiwygRenderer content={n.html} htmlContent={n.html} />
  {:else if n.kind === 'hero'}
    <Banner
      title={n.title}
      subtitle={n.subtitle}
      ctaText={n.ctaLabel}
      ctaLink={n.ctaUrl || '#'}
      {media}
      hotspots={n.block.properties.hotspots.length ? n.block.properties.hotspots : n.block.widget?.properties.hotspots}
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
      message={n.title || n.subtitle || ''}
      mapLinks={n.ctaUrl ? [{ url: n.ctaUrl }] : undefined}
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
    <RowScrollable title={n.title} items={tileItems} />
  {:else if n.kind === 'timer'}
    <TimerWidget
      title={n.title}
      targetDate={n.targetDate || ''}
      variant={styling.variant || 'dark'}
      backgroundImageUrl={media?.url}
      expiredText={styling.expiredText}
      width="auto"
      height={styling.height || 'auto'}
    />
  {:else if n.kind === 'html'}
    <WysiwygRenderer content={n.html} htmlContent={n.html} />
  {:else if n.kind === 'custom'}
    <!-- Custom content type: CustomEntries renders every entry's fields generically. To give a
         type its own design, branch on block.contentType.name first, e.g.
         {#if block.contentType?.name === 'testimonial'}<Testimonials entries={block.contentType.entries} />{/if} -->
    <CustomEntries {block} />
  {:else}
    <div class="cv-unknown-block">
      No renderer for floor type <code>{block.type}</code>{block.widget ? ` (widget: ${block.widget.type})` : ''} —
      add one in <code>src/lib/BlockRenderer.svelte</code>.
    </div>
  {/if}
</div>
