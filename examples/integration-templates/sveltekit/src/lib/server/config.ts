import { env } from '$env/dynamic/private';
import type { ApiMode, ContentVedaConfig } from '$lib/contentveda';

export const config: ContentVedaConfig = {
  apiUrl: env.CV_API_URL || '__CV_API_URL__',
  graphqlUrl: env.CV_GRAPHQL_URL || '__CV_GRAPHQL_URL__',
  tenantKey: env.CV_TENANT_KEY || '__CV_TENANT_KEY__',
  apiKey: env.CV_API_KEY || '',
  platform: env.CV_PLATFORM ?? '__CV_PLATFORM__',
  mode: (env.CV_API_MODE as ApiMode) || '__CV_API_MODE__',
  populate: env.CV_POPULATE ?? '*'
};

export const defaultSlug = env.CV_PAGE_SLUG || '__CV_SLUG__';
