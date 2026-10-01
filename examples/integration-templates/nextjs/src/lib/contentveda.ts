// ContentVeda public API client — runs on the server only, so the API key never
// reaches the browser. Switch between REST and GraphQL with CV_API_MODE.

export type ApiMode = 'rest' | 'graphql';

export interface ContentVedaConfig {
  apiUrl: string;      // e.g. https://api.contentveda.com/api/v1
  graphqlUrl: string;  // e.g. https://api.contentveda.com/graphql
  tenantKey: string;   // workspace slug, sent as X-Tenant-Key
  apiKey: string;      // sent as X-Api-Key (the key also selects the environment)
  platform: string;    // desktop | mweb | app | universal
  mode: ApiMode;
}

/**
 * One floor of the page. Depending on how it was placed in the CMS it carries:
 *  - built-in block fields (title, subtitle, styling, banners, …)
 *  - a widget: `widgetId` + the live widget inlined as `widget`
 *  - a custom content type: `contentType`, `contentTypeKind` and `entries`
 */
export interface ContentBlock {
  id: string;
  type: string;
  widgetId?: string;
  widget?: Record<string, any>;
  contentType?: string;
  contentTypeKind?: 'single' | 'collection' | string;
  entries?: { id: string; name: string; data: Record<string, any>; media?: any }[];
  [key: string]: any;
}

export interface MenuItem {
  id: string;
  label: string;
  linkType?: 'page' | 'url' | string;
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
  /** Every live widget used on the page (each is also inlined on its block as `widget`). */
  widgets: Record<string, any>[];
}

const PAGE_QUERY = `query GetPage($slug: String!, $platform: String) {
  page(slug: $slug, platform: $platform) {
    slug
    title
    status
    updatedAt
    contentJson
    navigationJson
    widgetsJson
  }
}`;

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
      body: JSON.stringify({ query: PAGE_QUERY, variables: { slug: cleanSlug, platform: cfg.platform } })
    });
    if (!res.ok) throw new Error(`ContentVeda GraphQL request failed: ${res.status}`);
    const { data, errors } = await res.json();
    if (errors?.length && !data?.page) {
      if (/not found/i.test(errors[0].message)) return null;
      throw new Error(`ContentVeda GraphQL error: ${errors[0].message}`);
    }
    if (!data?.page) return null;
    const { contentJson, navigationJson, widgetsJson, ...rest } = data.page;
    return {
      ...rest,
      content: Array.isArray(contentJson) ? contentJson : [],
      navigation: navigationJson || {},
      widgets: Array.isArray(widgetsJson) ? widgetsJson : []
    };
  }

  const url = `${cfg.apiUrl}/pages/${encodeURIComponent(cleanSlug)}?platform=${encodeURIComponent(cfg.platform)}`;
  const res = await fetchFn(url, { headers: headers(cfg) });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`ContentVeda REST request failed: ${res.status}`);
  const page = await res.json();
  return {
    ...page,
    content: Array.isArray(page.content) ? page.content : [],
    navigation: page.navigation || {},
    widgets: Array.isArray(page.widgets) ? page.widgets : []
  };
}

/** Link target for a menu item: CMS pages map to /<slug>, everything else uses its URL. */
export function menuHref(item: MenuItem): string {
  if (item.linkType === 'page' && item.pageSlug) return `/${item.pageSlug.replace(/^\/+/, '')}`;
  return item.url || '#';
}
