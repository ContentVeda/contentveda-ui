
<script setup>
import Banner from '@contentveda/ui/vue/Banner.vue';
import AnnouncementBar from '@contentveda/ui/vue/AnnouncementBar.vue';
import GridBanner from '@contentveda/ui/vue/GridBanner.vue';
import MediaGrid from '@contentveda/ui/vue/MediaGrid.vue';
import RowScrollable from '@contentveda/ui/vue/RowScrollable.vue';
import TimerWidget from '@contentveda/ui/vue/TimerWidget.vue';
import '@contentveda/ui/theme.css';
import '@contentveda/ui/styles/components/Banner.css';
</script>
<template>
  <div>
    <h1>Vue CSR Demo</h1>
    <Banner title="Vue CSR Banner" :config="{}" />
  </div>
</template>
  