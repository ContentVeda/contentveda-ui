import type { Metadata } from 'next';
import PageView from '@/components/PageView';
import { loadPage } from '@/lib/load-page';

// Any other ContentVeda page is served at its own slug, e.g. /about → page "about".
type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await loadPage(slug.join('/'));
  return { title: page.title };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const page = await loadPage(slug.join('/'));
  return <PageView page={page} />;
}
