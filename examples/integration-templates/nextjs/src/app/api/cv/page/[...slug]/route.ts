// Same-origin proxy for browser code: GET /api/cv/page/<slug>[?platform=mweb]
// The ContentVeda tenant key and API key are added here, on the server, so they never
// reach the browser and the public API never sees a cross-origin request.
import { NextResponse, type NextRequest } from 'next/server';
import { fetchPage } from '@/lib/contentveda';
import { config, revalidate } from '@/lib/config';

const PLATFORMS = ['desktop', 'mweb', 'app', 'universal'];

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  if (!config.apiKey) {
    return NextResponse.json({ error: 'CV_API_KEY is not set' }, { status: 500 });
  }

  const { slug } = await params;
  const platform = request.nextUrl.searchParams.get('platform');
  const fetchWithRevalidate: typeof fetch = (input, init) => fetch(input, { ...init, next: { revalidate } });

  try {
    const page = await fetchPage(
      slug.join('/'),
      { ...config, platform: platform && PLATFORMS.includes(platform) ? platform : config.platform },
      fetchWithRevalidate
    );
    if (!page) return NextResponse.json({ error: `Page "${slug.join('/')}" not found` }, { status: 404 });
    return NextResponse.json(page, {
      headers: { 'cache-control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=300' }
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}
