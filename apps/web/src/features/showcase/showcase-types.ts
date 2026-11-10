/**
 * Portfolio / Project Showcase model (docs/portfolio/DEVSURE-PROJECT-SHOWCASE-SYSTEM.md).
 *
 * Kept separate from `features/portfolio`, which holds the home page's CMS
 * sections (the API aggregate is also called "portfolio"); this feature is the
 * public /portfolio showcase and uses local, typed data only.
 */

/** A Concept Demo is fictional; a Real Project must be verifiable (future). */
export type ShowcaseKind = 'CONCEPT_DEMO' | 'REAL_PROJECT';

export type ShowcaseArchetype = 'SERVICE_BUSINESS' | 'PRODUCT_SAAS' | 'ENTERPRISE_PROJECT';

/** `published` has a full showcase at /portfolio/[slug]; `in-preparation` is a card only. */
export type ShowcaseStatus = 'published' | 'in-preparation';

export interface ShowcaseEntry {
  slug: string;
  kind: ShowcaseKind;
  status: ShowcaseStatus;
  archetype: ShowcaseArchetype;
  /** Public industry name, e.g. "Ferretería". */
  industry: string;
  /** Card tag line, e.g. "Retail · Construcción". */
  tags: string;
  /** Fictional brand name, when the showcase has one. */
  projectName?: string;
  /** One-line value proposition for the card. */
  summary: string;
  /** The central digital interaction the demo proves. */
  coreExperience: string;
}
