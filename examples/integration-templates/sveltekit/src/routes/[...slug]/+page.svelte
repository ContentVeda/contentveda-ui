<script lang="ts">
  import PageView from '$lib/PageView.svelte';
  let { data } = $props();
</script>

<PageView page={data.page} mode={data.mode} />
