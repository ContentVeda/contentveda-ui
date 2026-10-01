// Browser-side access to ContentVeda pages. Always goes through this app's own
// /api/cv route — never call the ContentVeda API (or fetchPage) from the browser.
import type { ContentVedaPage } from './contentveda';

/** Fetches a page via /api/cv/page/<slug>. Resolves to null when it doesn't exist. */
export async function getPage(slug: string, opts: { platform?: string; signal?: AbortSignal } = {}): Promise<ContentVedaPage | null> {
  const path = slug.replace(/^\/+/, '') || 'home';
  const qs = opts.platform ? `?platform=${encodeURIComponent(opts.platform)}` : '';
  const res = await fetch(`/api/cv/page/${path}${qs}`, { signal: opts.signal });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load page "${path}": ${res.status}`);
  return res.json();
}
