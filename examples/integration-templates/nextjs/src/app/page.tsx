import type { Metadata } from 'next';
import PageView from '@/components/PageView';
import { defaultSlug } from '@/lib/config';
import { loadPage } from '@/lib/load-page';

export async function generateMetadata(): Promise<Metadata> {
  const page = await loadPage(defaultSlug);
  return { title: page.title };
}

export default async function HomePage() {
  const page = await loadPage(defaultSlug);
  return <PageView page={page} />;
}
