<script lang="ts">
  import '@contentveda/ui/theme.css';
  import '@contentveda/ui/styles/components/Banner.css';
  import '@contentveda/ui/styles/components/AnnouncementBar.css';
  import '@contentveda/ui/styles/components/GridBanner.css';
  import '@contentveda/ui/styles/components/RowScrollable.css';
  import '@contentveda/ui/styles/components/SlidingBanner.css';
  import '@contentveda/ui/styles/components/AlternatingSlider.css';
  import '@contentveda/ui/styles/components/TimerWidget.css';
  import '@contentveda/ui/styles/components/WysiwygRenderer.css';
  import '@contentveda/ui/styles/components/CustomContentBlock.css';
  import '../app.css';

  let { children } = $props();
</script>

{@render children()}
