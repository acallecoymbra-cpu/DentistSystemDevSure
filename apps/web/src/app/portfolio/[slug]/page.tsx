import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedShowcase, getPublishedSlugs } from '@/features/showcase/showcase-catalog';
import { ShowcaseRenderer } from '@/features/showcase/showcase-registry';

// Only published showcases exist; any other slug is a 404. Each one needs a
// loader in showcase-registry.tsx, or its prerender fails the build.
export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getPublishedShowcase(slug);
  if (!entry) return {};
  const name = entry.projectName ?? entry.industry;
  const title = `${name} — Concept Demo ${entry.industry}`;
  const description = `${entry.summary} Concept Demo de DevSure con marca ficticia y datos demostrativos.`;
  return {
    title,
    description,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: { title: `${title} | DevSure`, description, type: 'website', url: `/portfolio/${slug}` },
  };
}

export default async function ShowcasePage({ params }: { params: Params }) {
  const { slug } = await params;
  if (!getPublishedShowcase(slug)) notFound();
  return <ShowcaseRenderer slug={slug} />;
}
