import type { PageServerLoad } from './$types';
import { loadPage } from '$lib/server/load-page';

// Any other ContentVeda page is served at its own slug, e.g. /about → page "about".
export const load: PageServerLoad = ({ params, fetch }) => loadPage(params.slug, fetch);
