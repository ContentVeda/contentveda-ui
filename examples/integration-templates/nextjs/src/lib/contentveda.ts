// ContentVeda public API client — runs on the server only, so the API key never
// reaches the browser. Switch between REST and GraphQL with CV_API_MODE.

export type ApiMode = 'rest' | 'graphql';

export interface ContentVedaConfig {
  apiUrl: string;      // e.g. https://api.contentveda.com/api/v1
  graphqlUrl: string;  // e.g. https://api.contentveda.com/graphql
  tenantKey: string;   // workspace slug, sent as X-Tenant-Key
  apiKey: string;      // sent as X-Api-Key (the key also selects the environment)
  platform: string;    // desktop | mweb | app, or '' for the universal page
  mode: ApiMode;
}

export interface Media {
  type: string; // image | video | gif
  url: string;
  posterUrl: string | null;
  altText: string | null;
  videoOptions: Record<string, boolean> | null;
}

export interface Cta {
  label: string | null;
  url: string | null;
  style: string | null;
}

export interface Banner {
  id: string;
  properties: {
    title: string | null;
    description: string | null;
    cta: Cta | null;
    media: Media | null;
    hotspots: any[];
    textOverlays: any[];
  };
}

/** A reusable widget: its config properties, and the banners it holds. */
export interface Widget {
  id: string;
  name: string;
  type: string; // hero | promo | announcement | media | sliding-banner | alternating-slider | row-scrollable | grid | wysiwyg
  properties: {
    title: string | null;
    subtitle: string | null;
    html: string | null;
    targetDate: string | null;
    media: Media | null;
    styling: Record<string, any>;
    hotspots: any[];
    textOverlays: any[];
  };
  banners: Banner[];
}

/**
 * One floor (slot) of the page. `properties` is what was authored on the slot itself,
 * `widget` is the widget placed in it (its own config properties and banners), and
 * `contentType` is a custom content type placed in it. Nothing is repeated between them.
 */
export interface ContentBlock {
  id: string;
  type: string;
  order: number;
  source: 'inline' | 'widget' | 'contentType';
  layout: { width: string; padding: string };
  properties: {
    /** Section heading above the floor, with its "more" link and bottom CTA. */
    header: {
      title: string | null;
      subtitle: string | null;
      moreLink: { label: string; url: string; icon: string | null } | null;
      bottomCta: { label: string; url: string } | null;
    };
    title: string | null;
    subtitle: string | null;
    cta: Cta | null;
    media: Media | null;
    html: string | null;
    targetDate: string | null;
    styling: Record<string, any>;
    classes: string[];
    hotspots: any[];
    textOverlays: any[];
    banners: Banner[]; // banners authored on the slot itself; a widget's banners live on the widget
  };
  widget: Widget | null;
  contentType: {
    name: string;
    kind: 'single' | 'collection' | string;
    entries: { id: string; name: string; data: Record<string, any>; media: Media | null }[];
  } | null;
}

export interface MenuItem {
  id: string;
  label: string;
  linkType?: 'PAGE' | 'EXTERNAL' | 'HASH' | string;
  pageSlug?: string;
  url?: string;
  target?: string;
  children?: MenuItem[];
}

/** Menus attached to the page, keyed by slot (header, footer, mobile, …). */
export type Navigation = Record<string, MenuItem[]>;

export interface ContentVedaPage {
  slug: string;
  title: string;
  status?: string;
  updatedAt?: string;
  content: ContentBlock[];
  navigation: Navigation;
  /** Page-level metadata. */
  properties: {
    seo: { title: string; description: string; keywords: string | null; canonicalUrl: string | null; ogImageUrl: string | null };
    classes: string[];
  };
}

const PAGE_QUERY = `query GetPage($slug: String!, $platform: String) {
  page(slug: $slug, platform: $platform) {
    slug
    title
    status
    updatedAt
    propertiesJson
    navigationJson
    contentJson
  }
}`;

function emptyProperties(title: string): ContentVedaPage['properties'] {
  return { seo: { title, description: '', keywords: null, canonicalUrl: null, ogImageUrl: null }, classes: [] };
}

function headers(cfg: ContentVedaConfig): Record<string, string> {
  return {
    Accept: 'application/json',
    'X-Tenant-Key': cfg.tenantKey,
    'X-Api-Key': cfg.apiKey
  };
}

/** Fetches a page by slug. Resolves to null when the page doesn't exist. */
export async function fetchPage(
  slug: string,
  cfg: ContentVedaConfig,
  fetchFn: typeof fetch = fetch
): Promise<ContentVedaPage | null> {
  const cleanSlug = slug.replace(/^\/+/, '') || 'home';

  if (cfg.mode === 'graphql') {
    const res = await fetchFn(cfg.graphqlUrl, {
      method: 'POST',
      headers: { ...headers(cfg), 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: PAGE_QUERY, variables: { slug: cleanSlug, platform: cfg.platform || null } })
    });
    if (!res.ok) throw new Error(`ContentVeda GraphQL request failed: ${res.status}`);
    const { data, errors } = await res.json();
    if (errors?.length && !data?.page) {
      if (/not found/i.test(errors[0].message)) return null;
      throw new Error(`ContentVeda GraphQL error: ${errors[0].message}`);
    }
    if (!data?.page) return null;
    const { contentJson, navigationJson, propertiesJson, ...rest } = data.page;
    return {
      ...rest,
      content: Array.isArray(contentJson) ? contentJson : [],
      navigation: navigationJson || {},
      properties: propertiesJson || emptyProperties(rest.title)
    };
  }

  // platform is optional: without it the API returns the universal page.
  const qs = cfg.platform ? `?platform=${encodeURIComponent(cfg.platform)}` : '';
  const url = `${cfg.apiUrl}/pages/${encodeURIComponent(cleanSlug)}${qs}`;
  const res = await fetchFn(url, { headers: headers(cfg) });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`ContentVeda REST request failed: ${res.status}`);
  const page = await res.json();
  return {
    ...page,
    content: Array.isArray(page.content) ? page.content : [],
    navigation: page.navigation || {},
    properties: page.properties || emptyProperties(page.title)
  };
}

/** Link target for a menu item: CMS pages map to /<slug>, everything else uses its URL. */
export function menuHref(item: MenuItem): string {
  if (item.linkType?.toLowerCase() === 'page' && item.pageSlug) return `/${item.pageSlug.replace(/^\/+/, '')}`;
  return item.url || '#';
}
