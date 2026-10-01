<script lang="ts">
  import type { ContentVedaPage } from '$lib/contentveda';
  import BlockRenderer from '$lib/BlockRenderer.svelte';
  import SiteMenu from '$lib/SiteMenu.svelte';

  let { page, mode }: { page: ContentVedaPage; mode: string } = $props();

  // Menus are assigned to slots in CMS → Navigation; the page can override them.
  const header = $derived(page.navigation.header || page.navigation.mobile || []);
  const footer = $derived(page.navigation.footer || []);
</script>

<svelte:head>
  <title>{page.title}</title>
</svelte:head>

{#if header.length}
  <header class="cv-site-header">
    <nav aria-label="Main"><SiteMenu items={header} /></nav>
  </header>
{/if}

<main class="cv-page" data-cv-slug={page.slug} data-cv-api={mode}>
  {#each page.content as block (block.id)}
    <section class="cv-floor" data-cv-type={block.type}>
      {#if block.rowConfig?.title}
        <div class="cv-floor-header">
          <div>
            <h2>{block.rowConfig.title}</h2>
            {#if block.rowConfig.subtitle}<p>{block.rowConfig.subtitle}</p>{/if}
          </div>
          {#if block.rowConfig.rightLinkLabel && block.rowConfig.rightLinkUrl}
            <a href={block.rowConfig.rightLinkUrl}>
              {block.rowConfig.rightLinkLabel} {block.rowConfig.rightLinkIcon || '→'}
            </a>
          {/if}
        </div>
      {/if}
      <BlockRenderer {block} />
    </section>
  {/each}
</main>

{#if footer.length}
  <footer class="cv-site-footer">
    <nav aria-label="Footer"><SiteMenu items={footer} /></nav>
  </footer>
{/if}
