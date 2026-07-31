<svelte:options runes={false} />
<script context="module" lang="ts">
  export interface AnnouncementBarProps {
    message: string;
    mapLinks?: {
      url: string;
    }[];
    backgroundColor?: string;
    textColor?: string;
    className?: string;
  }
</script>

<script lang="ts">
  export let className: AnnouncementBarProps["className"];
  export let backgroundColor: AnnouncementBarProps["backgroundColor"];
  export let textColor: AnnouncementBarProps["textColor"];
  export let mapLinks: AnnouncementBarProps["mapLinks"];
  export let message: AnnouncementBarProps["message"];
  function stringifyStyles(stylesObj) {
    let styles = "";
    for (let key in stylesObj) {
      const dashedKey = key.replace(/[A-Z]/g, function (match) {
        return "-" + match.toLowerCase();
      });
      styles += dashedKey + ":" + stylesObj[key] + ";";
    }
    return styles;
  }
</script>

<div
  style={stringifyStyles({
    // Defaults pair white text with violet-700, which measures 7.10:1 --
    // clearing WCAG 2.1 AAA. The previous violet-500 (#8b5cf6) default was
    // only 4.23:1, failing even AA. Falls back through the shared primary
    // token so a consumer theming the library gets their colour, not this
    // hardcoded one.
    backgroundColor: backgroundColor || "var(--cv-color-primary, #6d28d9)",
    color: textColor || "#ffffff",
  })}
  class={`cv-announcement-bar ${className || ""}`}
>
  {#if mapLinks && mapLinks.length > 0}
    <a class="cv-announcement-link" href={mapLinks?.[0]?.url}>{message}</a>
  {/if}
  {#if !(mapLinks && mapLinks.length > 0)}
    <span class="cv-announcement-text">{message}</span>
  {/if}
</div>