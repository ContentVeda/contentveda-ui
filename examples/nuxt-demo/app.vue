<script setup>
import { ref } from 'vue';
import '@contentveda/ui/theme.css';
import '@contentveda/ui/styles/components/Banner.css';
import '@contentveda/ui/styles/components/AnnouncementBar.css';
import '@contentveda/ui/styles/components/GridBanner.css';
import '@contentveda/ui/styles/components/MediaGrid.css';
import '@contentveda/ui/styles/components/RowScrollable.css';
import '@contentveda/ui/styles/components/TimerWidget.css';
import '@contentveda/ui/styles/components/WysiwygRenderer.css';
import '@contentveda/ui/styles/components/RichTextEditor.css';
import '@contentveda/ui/styles/components/SlidingBanner.css';
import '@contentveda/ui/styles/components/AlternatingSlider.css';
import '@contentveda/ui/styles/components/CustomContentBlock.css';

import Banner from '@contentveda/ui/vue/Banner.vue';
import AnnouncementBar from '@contentveda/ui/vue/AnnouncementBar.vue';
import GridBanner from '@contentveda/ui/vue/GridBanner.vue';
import MediaGrid from '@contentveda/ui/vue/MediaGrid.vue';
import RowScrollable from '@contentveda/ui/vue/RowScrollable.vue';
import TimerWidget from '@contentveda/ui/vue/TimerWidget.vue';
import WysiwygRenderer from '@contentveda/ui/vue/WysiwygRenderer.vue';
import RichTextEditor from '@contentveda/ui/vue/RichTextEditor.vue';
import SlidingBanner from '@contentveda/ui/vue/SlidingBanner.vue';
import AlternatingSlider from '@contentveda/ui/vue/AlternatingSlider.vue';
import CustomContentBlock from '@contentveda/ui/vue/CustomContentBlock.vue';

const editorContent = ref(
  '<h2>🌐 Rich Text Editor in Nuxt</h2><p>Integrated natively into Nuxt with full SSR and CSR compatibility.</p><ul><li>Server-side and client-side rendering</li><li>Seamless styling with ContentVeda UI design system</li><li>Cross-framework feature fidelity</li></ul>'
);
</script>

<template>
  <main class="demo-container">
    <header class="demo-header">
      <h1>ContentVeda UI — Nuxt Demo</h1>
      <p>Comprehensive showcase of all 11 core components running on Nuxt &amp; Vue 3</p>
    </header>

    <!-- 1. Announcement Bar -->
    <section class="demo-section">
      <h2>1. Announcement Bar</h2>
      <AnnouncementBar
        message="⚡ FLASH SALE: Save 25% off all accessories today only! Code: CONTENTVEDA25"
        backgroundColor="#245066"
        textColor="#ffffff"
        :mapLinks="[{ url: '#sale' }]"
      />
    </section>

    <!-- 2. Timer Widget -->
    <section class="demo-section">
      <h2>2. Timer Widget</h2>
      <div class="grid-2">
        <div>
          <h3>Standard Dark Variant</h3>
          <TimerWidget
            title="Special Offer Ends In:"
            targetDate="2027-12-31T23:59:59Z"
            variant="dark"
            expiredText="This offer has ended."
          />
        </div>
        <div>
          <h3>Neon Variant with Image Background</h3>
          <TimerWidget
            title="Holiday Drop Countdown"
            targetDate="2027-12-31T23:59:59Z"
            variant="neon"
            backgroundImageUrl="/img/placeholder-05.svg"
            overlay="rgba(0, 0, 0, 0.55)"
            height="320px"
            expiredText="Drop is now live!"
          />
        </div>
      </div>
    </section>

    <!-- 3. Banner -->
    <section class="demo-section">
      <h2>3. Banner (with Interactive Hotspots)</h2>
      <Banner
        title="Unleash Your Potential"
        subtitle="Discover our performance gear designed for daily comfort and high-impact movement."
        ctaText="Shop Collection"
        ctaLink="#shop"
        :media="{ type: 'image', url: '/img/placeholder-01.svg' }"
        :lazyLoad="true"
        :hotspots="[
          { id: 'h1', altText: 'Featured jacket', label: 'Tech Jacket', shape: 'rect', coords: { x: 8, y: 18, width: 16, height: 28 }, action: { type: 'link', url: '#jacket' }, pulse: true, showTooltip: true },
          { id: 'h2', altText: 'Sunglasses', label: 'UV Sunglasses', shape: 'oval', coords: { x: 34, y: 12, width: 10, height: 8 }, action: { type: 'link', url: '#glasses' }, pulse: true, showTooltip: true },
          { id: 'h3', altText: 'Sneakers', label: 'Aero Runners', shape: 'polygon', coords: { x: 55, y: 60, width: 20, height: 15 }, points: [{ x: 55, y: 68 }, { x: 62, y: 60 }, { x: 75, y: 62 }, { x: 70, y: 75 }], action: { type: 'link', url: '#runners' }, pulse: true, showTooltip: true }
        ]"
        :config="{
          align: 'center',
          padding: 'lg',
          bgGradient: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.65))',
          hotspotMinTargetSize: 24
        }"
      />
    </section>

    <!-- 4. Grid Banner -->
    <section class="demo-section">
      <h2>4. Grid Banner</h2>
      <GridBanner
        :columns="3"
        :items="[
          { id: '1', title: 'Activewear', subtitle: 'Comfort meets speed', media: { type: 'image', url: '/img/placeholder-02.svg' }, mapLinks: [{ label: 'Explore', url: '#activewear' }] },
          { id: '2', title: 'Footwear', subtitle: 'Step into future', media: { type: 'image', url: '/img/placeholder-03.svg' }, mapLinks: [{ label: 'Shop Shoes', url: '#footwear' }] },
          { id: '3', title: 'Accessories', subtitle: 'Complete the look', media: { type: 'image', url: '/img/placeholder-04.svg' }, mapLinks: [{ label: 'View All', url: '#accessories' }] }
        ]"
      />
    </section>

    <!-- 5. Media Grid -->
    <section class="demo-section">
      <h2>5. Media Grid</h2>
      <MediaGrid
        :primaryMedia="{ id: 'p1', title: 'Premium Audio', media: { type: 'image', url: '/img/placeholder-05.svg' }, mapLinks: [{ url: '#audio' }] }"
        :secondaryMedia="[
          { id: 's1', title: 'Wireless Comfort', media: { type: 'image', url: '/img/placeholder-06.svg' }, mapLinks: [{ url: '#wireless' }] },
          { id: 's2', title: 'Smart Controls', media: { type: 'image', url: '/img/placeholder-07.svg' }, mapLinks: [{ url: '#smart' }] }
        ]"
      />
    </section>

    <!-- 6. Row Scrollable -->
    <section class="demo-section">
      <h2>6. Row Scrollable</h2>
      <RowScrollable
        title="Trending Essentials"
        :items="[
          { id: '1', title: 'Smart Watch v2', subtitle: '$299', media: { type: 'image', url: '/img/placeholder-08.svg' } },
          { id: '2', title: 'Leather Wallet', subtitle: '$49', media: { type: 'image', url: '/img/placeholder-09.svg' } },
          { id: '3', title: 'Bluetooth Speaker', subtitle: '$129', media: { type: 'image', url: '/img/placeholder-10.svg' } },
          { id: '4', title: 'Minimalist Backpack', subtitle: '$89', media: { type: 'image', url: '/img/placeholder-11.svg' } },
          { id: '5', title: 'Noise-Canceling Pods', subtitle: '$179', media: { type: 'image', url: '/img/placeholder-12.svg' } }
        ]"
        :config="{ showArrows: true, hideArrowsIfNoScroll: false }"
      />
    </section>

    <!-- 7. Sliding Banner -->
    <section class="demo-section">
      <h2>7. Sliding Banner</h2>
      <SlidingBanner
        :config="{ autoStart: true, rotateAgain: true, delayMs: 4000, showDots: true, showNextPrev: true, animationEffect: 'fade' }"
        :items="[
          { id: '1', title: 'Modern Workspace', subtitle: 'Engineered for seamless productivity', media: { type: 'image', url: '/img/placeholder-12.svg' } },
          { id: '2', title: 'Sustainable Apparel', subtitle: 'Crafted with 100% recycled fibers', media: { type: 'image', url: '/img/placeholder-13.svg' } },
          { id: '3', title: 'Outdoor Discovery', subtitle: 'Engineered for the elements', media: { type: 'image', url: '/img/placeholder-14.svg' } }
        ]"
      />
    </section>

    <!-- 8. Alternating Slider -->
    <section class="demo-section">
      <h2>8. Alternating Slider</h2>
      <AlternatingSlider
        :config="{ columns: 2, autoStart: true, delayMs: 3500, showArrows: true, showDots: true }"
        :items="[
          { id: '1', title: 'Urban Edge', subtitle: 'Everyday street tech', media: { type: 'image', url: '/img/placeholder-01.svg' } },
          { id: '2', title: 'Trail Runner', subtitle: 'Tough grip anywhere', media: { type: 'image', url: '/img/placeholder-02.svg' } },
          { id: '3', title: 'City Commute', subtitle: 'Weather-ready packs', media: { type: 'image', url: '/img/placeholder-03.svg' } },
          { id: '4', title: 'Studio Sound', subtitle: 'Pure acoustic design', media: { type: 'image', url: '/img/placeholder-04.svg' } }
        ]"
      />
    </section>

    <!-- 9. Custom Content Block -->
    <section class="demo-section">
      <h2>9. Custom Content Block</h2>
      <CustomContentBlock
        contentType="brand-features"
        contentTypeKind="collection"
        :entries="[
          {
            id: 'c1',
            name: 'Eco Materials',
            media: { type: 'image', url: '/img/placeholder-06.svg', altText: 'Eco materials' },
            textOverlays: [
              { id: 't1', type: 'title', text: '100% Sustainable' },
              { id: 't2', type: 'subtitle', text: 'Zero virgin plastic across the entire supply chain.' }
            ]
          },
          {
            id: 'c2',
            name: 'Global Warranty',
            media: { type: 'image', url: '/img/placeholder-07.svg', altText: 'Warranty' },
            textOverlays: [
              { id: 't3', type: 'title', text: 'Lifetime Guarantee' },
              { id: 't4', type: 'subtitle', text: 'We stand by craftsmanship on every stitch and seam.' }
            ]
          }
        ]"
      />
    </section>

    <!-- 10. Rich Text Editor & 11. WYSIWYG Renderer -->
    <section class="demo-section">
      <h2>10. Rich Text Editor &amp; 11. WYSIWYG Renderer</h2>
      <div class="grid-2">
        <div>
          <h3>Live Editor</h3>
          <div class="editor-wrap">
            <ClientOnly>
              <RichTextEditor
                :content="editorContent"
                @change="(html) => (editorContent = html)"
              />
            </ClientOnly>
          </div>
        </div>
        <div>
          <h3>Output Preview (WysiwygRenderer)</h3>
          <div class="preview-wrap">
            <WysiwygRenderer :content="editorContent" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.demo-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: system-ui, sans-serif;
  color: #f1f5f9;
  background: #020617;
  min-height: 100vh;
}
.demo-header {
  text-align: center;
  margin-bottom: 3rem;
}
.demo-header h1 {
  font-size: 2.5rem;
  color: #38bdf8;
  margin-bottom: 0.5rem;
}
.demo-header p {
  color: #94a3b8;
  font-size: 1.1rem;
}
.demo-section {
  margin-bottom: 3.5rem;
}
.demo-section h2 {
  color: #7dd3fc;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 0.5rem;
}
.grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
h3 {
  font-size: 1.1rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}
.editor-wrap {
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
  background: #0f172a;
}
.preview-wrap {
  padding: 1.25rem;
  border: 1px solid #334155;
  border-radius: 8px;
  background: #090d16;
  min-height: 300px;
}
:global(body) {
  margin: 0;
  background: #020617;
}
</style>