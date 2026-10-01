<script lang="ts">
  // Renders a ContentVeda navigation menu (any depth) as nested lists.
  import { menuHref, type MenuItem } from '$lib/contentveda';
  import SiteMenu from './SiteMenu.svelte';

  let { items, depth = 0 }: { items: MenuItem[]; depth?: number } = $props();
</script>

<ul class="cv-menu" class:cv-submenu={depth > 0}>
  {#each items as item (item.id)}
    <li class:has-children={!!item.children?.length}>
      <a
        href={menuHref(item)}
        target={item.target || '_self'}
        rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {item.label}
      </a>
      {#if item.children?.length}
        <SiteMenu items={item.children} depth={depth + 1} />
      {/if}
    </li>
  {/each}
</ul>
