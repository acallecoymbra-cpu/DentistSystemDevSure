import { Figtree, Fraunces } from 'next/font/google';
import './fonts.module.css';

// Lúmina Dental's own type system (docs/portfolio/HANDOFF-CLINICA-DENTAL-LUMINA.md §02).
// Loaded only by the modules that import this file (the showcase and its
// Portfolio card) and exposed as CSS variables on their root element.
export const luminaDisplay = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--lm-font-display',
  display: 'swap',
  // Headlines are large and sit close to their wrapping points: the fallback
  // is declared in fonts.module.css with a measured size-adjust.
  adjustFontFallback: false,
  fallback: ['Lumina Display Fallback'],
});

export const luminaSans = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--lm-font-sans',
  display: 'swap',
});

export const luminaFontVariables = `${luminaDisplay.variable} ${luminaSans.variable}`;
