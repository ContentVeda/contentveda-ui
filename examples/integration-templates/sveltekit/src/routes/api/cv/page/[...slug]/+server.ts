// Same-origin proxy for browser code: GET /api/cv/page/<slug>[?platform=mweb]
// The ContentVeda tenant key and API key are added here, on the server, so they never
// reach the browser and the public API never sees a cross-origin request.
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchPage } from '$lib/contentveda';
import { config } from '$lib/server/config';

const PLATFORMS = ['desktop', 'mweb', 'app', 'universal'];

export const GET: RequestHandler = async ({ params, url, fetch }) => {
  if (!config.apiKey) error(500, 'CV_API_KEY is not set');

  const platform = url.searchParams.get('platform');
  const page = await fetchPage(
    params.slug || 'home',
    { ...config, platform: platform && PLATFORMS.includes(platform) ? platform : config.platform },
    fetch
  );
  if (!page) error(404, `Page "${params.slug}" not found`);

  return json(page, { headers: { 'cache-control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=300' } });
};
