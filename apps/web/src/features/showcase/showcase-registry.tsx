'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { PublishedShowcaseSlug } from './showcase-catalog';

/**
 * Full showcase implementations by slug, each behind its own lazy boundary
 * (ADR-007). A slug must be both `published` in showcase-catalog.ts and have a
 * loader here to have a /portfolio/[slug] page. The catalog stays the only
 * list of what is published: the keys are typed from it, so publishing a slug
 * without a loader (or the reverse) does not compile.
 *
 * The import paths are literal so the bundler emits one chunk per showcase,
 * and this file is a client module because that is where the split happens:
 * loaders declared in a Server Component still put every showcase's client
 * code in the route's bundle. The selected showcase is rendered on the server
 * and its chunk is preloaded, so there is no loading state.
 */
const showcaseLoaders: Readonly<Record<PublishedShowcaseSlug, ComponentType>> = {
  ferreteria: dynamic(() => import('./ferreteria/nexo-obra-showcase').then((module) => module.NexoObraShowcase)),
  'clinica-dental': dynamic(() =>
    import('./clinica-dental/lumina-dental-showcase').then((module) => module.LuminaDentalShowcase),
  ),
  torneria: dynamic(() => import('./torneria/cota-cero-showcase').then((module) => module.CotaCeroShowcase)),
  farmacia: dynamic(() => import('./farmacia/faro-showcase').then((module) => module.FaroShowcase)),
  restaurante: dynamic(() => import('./restaurante/savia-showcase').then((module) => module.SaviaShowcase)),
  'salon-spa': dynamic(() => import('./salon-spa/nacar-showcase').then((module) => module.NacarShowcase)),
};

export function ShowcaseRenderer({ slug }: { slug: string }) {
  const Showcase = (showcaseLoaders as Readonly<Record<string, ComponentType | undefined>>)[slug];
  if (!Showcase) throw new Error(`Showcase "${slug}" is published but has no loader in showcase-registry.tsx`);
  return <Showcase />;
}
