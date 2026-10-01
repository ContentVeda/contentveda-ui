import { error } from '@sveltejs/kit';
import { fetchPage } from '$lib/contentveda';
import { config } from './config';

export async function loadPage(slug: string, fetchFn: typeof fetch) {
  if (!config.apiKey) {
    error(500, 'CV_API_KEY is not set. Copy an API key from ContentVeda → Settings → API Keys into .env');
  }
  const page = await fetchPage(slug, config, fetchFn);
  if (!page) error(404, `Page "${slug}" not found`);
  return { page, mode: config.mode };
}
