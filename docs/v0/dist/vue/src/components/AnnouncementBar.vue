<template>
  <div
    :class="`cv-announcement-bar ${className || ''}`"
    :style="{
      // Defaults pair white text with the ContentVeda brand teal, which
      // measures 8.70:1 -- clearing WCAG 2.1 AAA. Falls back through the
      // shared primary token so a consumer theming the library gets their
      // colour, not this hardcoded one.
      backgroundColor:
        backgroundColor || 'var(--cv-color-primary-fill, #245066)',
      color: textColor || 'var(--cv-color-on-primary, #ffffff)',
    }"
  >
    <template v-if="mapLinks && mapLinks.length > 0">
      <a class="cv-announcement-link" :href="mapLinks?.[0]?.url">{{
        message
      }}</a>
    </template>

    <template v-if="!(mapLinks && mapLinks.length > 0)">
      <span class="cv-announcement-text">{{ message }}</span>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface AnnouncementBarProps {
  message: string;
  mapLinks?: {
    url: string;
  }[];
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export default defineComponent({
  name: "announcement-bar",

  props: ["className", "backgroundColor", "textColor", "mapLinks", "message"],
});
</script>