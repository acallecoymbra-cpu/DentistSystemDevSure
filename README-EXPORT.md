# Lúmina Dental — exportación desde DevSure

Origen: repositorio DevSure `LandingPage`, commit `79e37b4fbac5eab90f274cbe23702e4a136d2017` (rama `main`), exportado el 2026-11-10.
Solo se incluyeron archivos versionados en Git, con sus rutas originales.

## Qué es

Landing page de una clínica dental ficticia («Lúmina Dental»), construida como *Concept Demo* del portfolio de DevSure.
Ruta original: `/portfolio/clinica-dental`.

**No tiene backend.** Por decisión de arquitectura (ADR-006 de DevSure), la demo usa datos locales tipados, sin API, base de datos ni CMS. La agenda de citas funciona solo en el navegador: no reserva citas reales ni envía datos. Si el nuevo sistema necesita reservas reales, el backend es trabajo nuevo.

## Contenido

| Carpeta / archivo | Qué es | ¿Necesario? |
|---|---|---|
| `apps/web/src/features/showcase/clinica-dental/` | Todo el frontend de la landing: componentes, estilos (CSS modules), fuentes, datos y estado de la agenda | Sí |
| `apps/web/public/portfolio/clinica-dental/*.webp` | Las 6 fotografías | Sí |
| `apps/web/src/features/showcase/shared/focus-trap.ts` | Utilidad de accesibilidad que usa el diálogo de cita | Sí |
| `apps/web/tests/appointment-reducer.test.mjs` | Tests unitarios del estado de la agenda (`node --test`, usa `typescript`) | Recomendado |
| `apps/web/tests/e2e/portfolio-clinica-dental.spec.ts` + `support/tall-home.ts` | Test E2E de Playwright | Recomendado |
| `apps/web/src/app/portfolio/[slug]/page.tsx`, `showcase-catalog.ts`, `showcase-registry.tsx`, `showcase-types.ts` | Cómo DevSure monta la demo dentro de su sitio | Solo referencia |
| `apps/web/src/features/showcase/MODULE.md` | Memoria del módulo Showcase en DevSure | Solo referencia |
| `docs/portfolio/*CLINICA-DENTAL*` | Brief de diseño, prompt de diseño, handoffs, plan de pruebas e informe de QA | Referencia |

## Dependencias

- Next.js 15 (App Router), React 19, TypeScript 5. Usa `next/image`, `next/link` y `next/font/google`.
- Sin librerías externas adicionales.
- Tests: `typescript` (unitarios) y `@playwright/test` (E2E).

## Qué ajustar en el repositorio nuevo

1. **Montar la página.** En DevSure se carga desde `/portfolio/[slug]` a través del registro. En un sitio propio basta con renderizar `<LuminaDentalShowcase />` (de `lumina-dental-showcase.tsx`) en `app/page.tsx`.
2. **Rutas de imágenes.** Los componentes importan las fotos con rutas relativas a `public/portfolio/clinica-dental/`. Si cambias la ubicación de `public/`, ajusta esos imports.
3. **`focus-trap`.** Se importa como `../../shared/focus-trap`. Ajusta la ruta si cambias la estructura de carpetas.
4. **Marca DevSure.** La página incluye un aviso de *Concept Demo*, una sección y un footer que mencionan a DevSure (`static-sections.tsx`, `ids.ts`, `hero.tsx`, `agenda-section.tsx`). Si pasa a ser un sitio real, hay que retirarlos o adaptarlos.
5. **Tests E2E.** La configuración de Playwright de DevSure también levanta la API, que este proyecto no necesita. Crea una configuración nueva que solo arranque la web.
6. **Contenido ficticio.** Nombre, textos, tratamientos y horarios son demostrativos. Cámbialos por los datos reales de la clínica.
