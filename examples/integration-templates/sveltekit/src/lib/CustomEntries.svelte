<script lang="ts">
  // Generic renderer for a custom content type's entries: every field of entry.data,
  // with media fields as images/videos and HTML strings as rich text. Copy this per
  // content type (branch on block.contentType.name in BlockRenderer) for a bespoke design.
  //
  // (@contentveda/ui's CustomContentBlock does the same; its Svelte build in 0.3.1 throws
  // during SSR, so this starter ships its own until a fixed version is published.)
  import WysiwygRenderer from '@contentveda/ui/svelte/WysiwygRenderer.svelte';
  import type { ContentBlock } from '$lib/contentveda';
  import { mediaUrl } from '$lib/media';

  let { block }: { block: ContentBlock } = $props();

  const entries = $derived(block.contentType?.entries || []);
  const isMedia = (v: unknown): v is { url: string; type?: string; altText?: string } =>
    !!v && typeof v === 'object' && typeof (v as any).url === 'string';
  const isHtml = (v: unknown) => typeof v === 'string' && /<[a-z][\s\S]*>/i.test(v);
  const label = (key: string) => key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ');
</script>

<div
  class="cv-custom-entries"
  class:cv-custom-entries-row={block.contentType?.kind === 'collection'}
  data-cv-content-type={block.contentType?.name}
>
  {#each entries as entry (entry.id)}
    <article class="cv-custom-entry">
      {#if isMedia(entry.media)}
        <img class="cv-custom-media" src={mediaUrl(entry.media.url)} alt={entry.media.altText || entry.name} loading="lazy" />
      {/if}
      <h3>{entry.name}</h3>
      <dl>
        {#each Object.entries(entry.data || {}) as [key, value] (key)}
          {#if value !== null && value !== undefined && value !== ''}
            <div class="cv-custom-field" data-field={key}>
              <dt>{label(key)}</dt>
              <dd>
                {#if isMedia(value)}
                  {#if value.type === 'video' || value.url.endsWith('.mp4')}
                    <video src={mediaUrl(value.url)} controls playsinline></video>
                  {:else}
                    <img class="cv-custom-media" src={mediaUrl(value.url)} alt={value.altText || key} loading="lazy" />
                  {/if}
                {:else if isHtml(value)}
                  <WysiwygRenderer content={value} htmlContent={value} />
                {:else if Array.isArray(value)}
                  {value.map((v) => (typeof v === 'object' ? JSON.stringify(v) : v)).join(', ')}
                {:else if typeof value === 'object'}
                  <code>{JSON.stringify(value)}</code>
                {:else}
                  {String(value)}
                {/if}
              </dd>
            </div>
          {/if}
        {/each}
      </dl>
    </article>
  {/each}
</div>

<style>
  .cv-custom-entries {
    display: grid;
    gap: 1rem;
  }
  .cv-custom-entries-row {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  .cv-custom-entry {
    padding: 1rem;
    border: 1px solid color-mix(in srgb, currentColor 15%, transparent);
    border-radius: 8px;
  }
  .cv-custom-entry h3 {
    margin: 0 0 0.5rem;
  }
  dl {
    margin: 0;
    display: grid;
    gap: 0.5rem;
  }
  dt {
    font-size: 0.75rem;
    text-transform: capitalize;
    opacity: 0.65;
  }
  dd {
    margin: 0;
  }
  .cv-custom-media,
  video {
    width: 100%;
    border-radius: 6px;
    display: block;
  }
</style>
