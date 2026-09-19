'use client';

import { useState } from 'react';
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

// @ts-ignore
import Banner from '@contentveda/ui/react/Banner';
// @ts-ignore
import AnnouncementBar from '@contentveda/ui/react/AnnouncementBar';
// @ts-ignore
import GridBanner from '@contentveda/ui/react/GridBanner';
// @ts-ignore
import MediaGrid from '@contentveda/ui/react/MediaGrid';
// @ts-ignore
import RowScrollable from '@contentveda/ui/react/RowScrollable';
// @ts-ignore
import TimerWidget from '@contentveda/ui/react/TimerWidget';
// @ts-ignore
import WysiwygRenderer from '@contentveda/ui/react/WysiwygRenderer';
// @ts-ignore
import RichTextEditor from '@contentveda/ui/react/RichTextEditor';
// @ts-ignore
import SlidingBanner from '@contentveda/ui/react/SlidingBanner';
// @ts-ignore
import AlternatingSlider from '@contentveda/ui/react/AlternatingSlider';
// Note: CustomContentBlock in published @contentveda/ui@0.3.0 for React had an empty compiled JS artifact;
// full React CustomContentBlock will be published in the next release.
// import CustomContentBlock from '@contentveda/ui/react/CustomContentBlock';

export default function NextDemoPage() {
  const [editorContent, setEditorContent] = useState(
    '<h2>🚀 Rich Text Editor in Next.js</h2><p>This is live rendered from <strong>ContentVeda UI</strong> with full formatting support.</p><ul><li>Instant reactivity</li><li>Cross-framework compatibility</li><li>Clean typography styling</li></ul>'
  );

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'system-ui, sans-serif', color: '#f1f5f9', background: '#020617', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#38bdf8', marginBottom: '0.5rem' }}>ContentVeda UI — Next.js Demo</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Showcase of all 11 core components integrated into Next.js App Router</p>
      </header>

      {/* 1. Announcement Bar */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#7dd3fc', fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>1. Announcement Bar</h2>
        <AnnouncementBar
          message="⚡ FLASH SALE: Save 25% off all accessories today only! Code: CONTENTVEDA25"
          backgroundColor="#245066"
          textColor="#ffffff"
          mapLinks={[{ url: '#sale' }]}
        />
      </section>

      {/* 2. Timer Widget */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#7dd3fc', fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>2. Timer Widget</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Standard Dark Variant</h3>
            <TimerWidget
              title="Special Offer Ends In:"
              targetDate="2027-12-31T23:59:59Z"
              variant="dark"
              expiredText="This offer has ended."
            />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Neon Variant with Image Background</h3>
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

      {/* 3. Banner */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#7dd3fc', fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>3. Banner (with Interactive Hotspots)</h2>
        <Banner
          title="Unleash Your Potential"
          subtitle="Discover our performance gear designed for daily comfort and high-impact movement."
          ctaText="Shop Collection"
          ctaLink="#shop"
          media={{ type: 'image', url: '/img/placeholder-01.svg' }}
          lazyLoad={true}
          hotspots={[
            { id: 'h1', altText: 'Featured jacket', label: 'Tech Jacket', shape: 'rect', coords: { x: 8, y: 18, width: 16, height: 28 }, action: { type: 'link', url: '#jacket' }, pulse: true, showTooltip: true },
            { id: 'h2', altText: 'Sunglasses', label: 'UV Sunglasses', shape: 'oval', coords: { x: 34, y: 12, width: 10, height: 8 }, action: { type: 'link', url: '#glasses' }, pulse: true, showTooltip: true },
            { id: 'h3', altText: 'Sneakers', label: 'Aero Runners', shape: 'polygon', coords: { x: 55, y: 60, width: 20, height: 15 }, points: [{ x: 55, y: 68 }, { x: 62, y: 60 }, { x: 75, y: 62 }, { x: 70, y: 75 }], action: { type: 'link', url: '#runners' }, pulse: true, showTooltip: true }
          ]}
          config={{
            align: 'center',
            padding: 'lg',
            bgGradient: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.65))',
            hotspotMinTargetSize: 24
          }}
        />
      </section>

      {/* 4. Grid Banner */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#7dd3fc', fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>4. Grid Banner</h2>
        <GridBanner
          columns={3}
          items={[
            { id: '1', title: 'Activewear', subtitle: 'Comfort meets speed', media: { type: 'image', url: '/img/placeholder-02.svg' }, mapLinks: [{ label: 'Explore', url: '#activewear' }] },
            { id: '2', title: 'Footwear', subtitle: 'Step into future', media: { type: 'image', url: '/img/placeholder-03.svg' }, mapLinks: [{ label: 'Shop Shoes', url: '#footwear' }] },
            { id: '3', title: 'Accessories', subtitle: 'Complete the look', media: { type: 'image', url: '/img/placeholder-04.svg' }, mapLinks: [{ label: 'View All', url: '#accessories' }] }
          ]}
        />
      </section>

      {/* 5. Media Grid */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#7dd3fc', fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>5. Media Grid</h2>
        <MediaGrid
          primaryMedia={{ id: 'p1', title: 'Premium Audio', media: { type: 'image', url: '/img/placeholder-05.svg' }, mapLinks: [{ url: '#audio' }] }}
          secondaryMedia={[
            { id: 's1', title: 'Wireless Comfort', media: { type: 'image', url: '/img/placeholder-06.svg' }, mapLinks: [{ url: '#wireless' }] },
            { id: 's2', title: 'Smart Controls', media: { type: 'image', url: '/img/placeholder-07.svg' }, mapLinks: [{ url: '#smart' }] }
          ]}
        />
      </section>

      {/* 6. Row Scrollable */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#7dd3fc', fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>6. Row Scrollable</h2>
        <RowScrollable
          title="Trending Essentials"
          items={[
            { id: '1', title: 'Smart Watch v2', subtitle: '$299', media: { type: 'image', url: '/img/placeholder-08.svg' } },
            { id: '2', title: 'Leather Wallet', subtitle: '$49', media: { type: 'image', url: '/img/placeholder-09.svg' } },
            { id: '3', title: 'Bluetooth Speaker', subtitle: '$129', media: { type: 'image', url: '/img/placeholder-10.svg' } },
            { id: '4', title: 'Minimalist Backpack', subtitle: '$89', media: { type: 'image', url: '/img/placeholder-11.svg' } },
            { id: '5', title: 'Noise-Canceling Pods', subtitle: '$179', media: { type: 'image', url: '/img/placeholder-12.svg' } }
          ]}
          config={{ showArrows: true, hideArrowsIfNoScroll: false }}
        />
      </section>

      {/* 7. Sliding Banner */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#7dd3fc', fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>7. Sliding Banner</h2>
        <SlidingBanner
          config={{ autoStart: true, rotateAgain: true, delayMs: 4000, showDots: true, showNextPrev: true, animationEffect: 'fade' }}
          items={[
            { id: '1', title: 'Modern Workspace', subtitle: 'Engineered for seamless productivity', media: { type: 'image', url: '/img/placeholder-12.svg' } },
            { id: '2', title: 'Sustainable Apparel', subtitle: 'Crafted with 100% recycled fibers', media: { type: 'image', url: '/img/placeholder-13.svg' } },
            { id: '3', title: 'Outdoor Discovery', subtitle: 'Engineered for the elements', media: { type: 'image', url: '/img/placeholder-14.svg' } }
          ]}
        />
      </section>

      {/* 8. Alternating Slider */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#7dd3fc', fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>8. Alternating Slider</h2>
        <AlternatingSlider
          config={{ columns: 2, autoStart: true, delayMs: 3500, showArrows: true, showDots: true }}
          items={[
            { id: '1', title: 'Urban Edge', subtitle: 'Everyday street tech', media: { type: 'image', url: '/img/placeholder-01.svg' } },
            { id: '2', title: 'Trail Runner', subtitle: 'Tough grip anywhere', media: { type: 'image', url: '/img/placeholder-02.svg' } },
            { id: '3', title: 'City Commute', subtitle: 'Weather-ready packs', media: { type: 'image', url: '/img/placeholder-03.svg' } },
            { id: '4', title: 'Studio Sound', subtitle: 'Pure acoustic design', media: { type: 'image', url: '/img/placeholder-04.svg' } }
          ]}
        />
      </section>

      {/* 9. Custom Content Block */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#7dd3fc', fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>9. Custom Content Block</h2>
        <div style={{ padding: '1.25rem', border: '1px dashed #334155', borderRadius: '8px', background: '#090d16', color: '#94a3b8' }}>
          <p>📦 <em>CustomContentBlock for React will be available in the next release (v0.3.1). Available and demonstrated in Solid, Vue, and Nuxt demos.</em></p>
        </div>
      </section>

      {/* 10. Rich Text Editor & 11. WYSIWYG Renderer */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#7dd3fc', fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>10. Rich Text Editor &amp; 11. WYSIWYG Renderer</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Live Editor</h3>
            <div style={{ border: '1px solid #334155', borderRadius: '8px', overflow: 'hidden', background: '#0f172a' }}>
              <RichTextEditor
                content={editorContent}
                onChange={(html: string) => setEditorContent(html)}
              />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Output Preview (WysiwygRenderer)</h3>
            <div style={{ padding: '1.25rem', border: '1px solid #334155', borderRadius: '8px', background: '#090d16', minHeight: '300px' }}>
              <WysiwygRenderer content={editorContent} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
