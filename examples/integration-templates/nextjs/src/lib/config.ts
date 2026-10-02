// Server-only: imported from server components, so the API key never reaches the browser.
import type { ApiMode, ContentVedaConfig } from './contentveda';

export const config: ContentVedaConfig = {
  apiUrl: process.env.CV_API_URL || '__CV_API_URL__',
  graphqlUrl: process.env.CV_GRAPHQL_URL || '__CV_GRAPHQL_URL__',
  tenantKey: process.env.CV_TENANT_KEY || '__CV_TENANT_KEY__',
  apiKey: process.env.CV_API_KEY || '',
  platform: process.env.CV_PLATFORM ?? '__CV_PLATFORM__',
  mode: (process.env.CV_API_MODE as ApiMode) || '__CV_API_MODE__'
};

export const defaultSlug = process.env.CV_PAGE_SLUG || '__CV_SLUG__';

// Seconds before a cached page is re-fetched (ISR).
export const revalidate = Number(process.env.CV_REVALIDATE_SECONDS || 60);
