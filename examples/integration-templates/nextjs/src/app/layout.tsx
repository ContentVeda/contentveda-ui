import type { Metadata } from 'next';
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
import './globals.css';

export const metadata: Metadata = {
  title: '__CV_PAGE_TITLE__',
  description: 'Powered by ContentVeda'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
