import type { PageServerLoad } from './$types';
import { loadPage } from '$lib/server/load-page';
import { defaultSlug } from '$lib/server/config';

export const load: PageServerLoad = ({ fetch }) => loadPage(defaultSlug, fetch);
