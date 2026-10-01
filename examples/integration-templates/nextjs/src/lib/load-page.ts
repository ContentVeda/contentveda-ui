import { cache } from 'react';
import { notFound } from 'next/navigation';
import { fetchPage } from './contentveda';
import { config, revalidate } from './config';

// Cached per request, so generateMetadata and the page share one API call.
export const loadPage = cache(async (slug: string) => {
  if (!config.apiKey) {
    throw new Error('CV_API_KEY is not set. Copy an API key from ContentVeda → Settings → API Keys into .env.local');
  }
  const fetchWithRevalidate: typeof fetch = (input, init) => fetch(input, { ...init, next: { revalidate } });
  const page = await fetchPage(slug, config, fetchWithRevalidate);
  if (!page) notFound();
  return page;
});
