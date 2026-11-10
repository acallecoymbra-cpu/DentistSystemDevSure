import type { ShowcaseEntry } from './showcase-types';

/**
 * The eight initial Concept Demos (docs/portfolio/DEVSURE-CONCEPT-DEMO-CATALOG.md),
 * in the catalog's recommended build order, published first. The `published` ones have a full
 * showcase at /portfolio/[slug]; the rest are listed as in preparation and
 * have no route.
 */
const entries = [
  {
    slug: 'ferreteria',
    kind: 'CONCEPT_DEMO',
    status: 'published',
    archetype: 'SERVICE_BUSINESS',
    industry: 'Ferretería',
    tags: 'Retail · Construcción',
    projectName: 'Nexo Obra',
    summary: 'Catálogo, búsqueda y cotización digital para una ferretería moderna.',
    coreExperience: 'Lista de cotización',
  },
  {
    slug: 'clinica-dental',
    kind: 'CONCEPT_DEMO',
    status: 'published',
    archetype: 'SERVICE_BUSINESS',
    industry: 'Clínica Dental',
    tags: 'Salud · Servicios',
    projectName: 'Lúmina Dental',
    summary: 'Tratamientos, confianza y solicitud de citas para una clínica odontológica moderna.',
    coreExperience: 'Reserva de cita',
  },
  {
    slug: 'torneria',
    kind: 'CONCEPT_DEMO',
    status: 'published',
    archetype: 'SERVICE_BUSINESS',
    industry: 'Tornería & Mecanizado',
    tags: 'Industria · Mecanizado',
    projectName: 'Cota Cero',
    summary: 'Capacidades, medidas y solicitud de cotización para piezas mecanizadas.',
    coreExperience: 'Cotizar una pieza',
  },
  {
    slug: 'farmacia',
    kind: 'CONCEPT_DEMO',
    status: 'published',
    archetype: 'SERVICE_BUSINESS',
    industry: 'Farmacia',
    tags: 'Retail · Farmacia',
    projectName: 'FARO',
    summary: 'Búsqueda, disponibilidad y reserva para retiro en una experiencia de farmacia moderna.',
    coreExperience: 'Buscar y reservar para retiro',
  },
  {
    slug: 'restaurante',
    kind: 'CONCEPT_DEMO',
    status: 'published',
    archetype: 'SERVICE_BUSINESS',
    industry: 'Restaurante',
    tags: 'Hospitality · Restaurante',
    projectName: 'SAVIA',
    summary: 'Menú interactivo y reserva de mesa en una experiencia editorial contemporánea.',
    coreExperience: 'Explorar la carta y reservar mesa',
  },
  {
    slug: 'colegio',
    kind: 'CONCEPT_DEMO',
    status: 'in-preparation',
    archetype: 'SERVICE_BUSINESS',
    industry: 'Colegio',
    tags: 'Educación',
    summary: 'Niveles, programas y solicitud de visita o admisión.',
    coreExperience: 'Admisión / visita',
  },
  {
    slug: 'taller-mecanico',
    kind: 'CONCEPT_DEMO',
    status: 'in-preparation',
    archetype: 'SERVICE_BUSINESS',
    industry: 'Taller Mecánico',
    tags: 'Automotriz',
    summary: 'Servicios, diagnóstico y solicitud de revisión del vehículo.',
    coreExperience: 'Solicitud de revisión',
  },
  {
    slug: 'salon-spa',
    kind: 'CONCEPT_DEMO',
    status: 'published',
    archetype: 'SERVICE_BUSINESS',
    industry: 'Salón & Spa',
    tags: 'Belleza · Bienestar',
    projectName: 'NÁCAR',
    summary: 'Rituales, especialistas y reserva de turno en cinco pasos, sin datos personales.',
    coreExperience: 'Reservar un ritual en cinco pasos',
  },
] as const satisfies readonly ShowcaseEntry[];

export const showcases: readonly ShowcaseEntry[] = entries;

/** Slugs with a full showcase. showcase-registry.tsx must have a loader for each one. */
export type PublishedShowcaseSlug = Extract<(typeof entries)[number], { status: 'published' }>['slug'];

export function getPublishedShowcase(slug: string): ShowcaseEntry | undefined {
  return showcases.find((entry) => entry.slug === slug && entry.status === 'published');
}

export function getPublishedSlugs(): string[] {
  return showcases.filter((entry) => entry.status === 'published').map((entry) => entry.slug);
}
