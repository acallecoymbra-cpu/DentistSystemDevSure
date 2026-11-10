# Module: Showcase (Portfolio / Concept Demos)

Memoria del módulo `apps/web/src/features/showcase/`. Describe su contrato; no
registra progreso de tareas ni estado de QA o publicación (eso está en
[STATUS.md](../../../../../docs/ai/STATUS.md) y
[HANDOFF.md](../../../../../docs/ai/HANDOFF.md)). Está subordinada al código y a
ADR-006 y ADR-007 de [DECISIONS.md](../../../../../docs/ai/DECISIONS.md): si
discrepan, mandan ellos y la discrepancia se registra.

## Purpose

Publicar Concept Demos en `/portfolio` y `/portfolio/[slug]`: experiencias
digitales por rubro con **marca ficticia y datos demostrativos**, cada una con
identidad visual propia, sin rediseñar el resto de DevSure (ADR-006).

Un Concept Demo **no es una aplicación de producción**: no envía, guarda ni
reserva nada, no tiene backend propio y no representa un negocio real. El modelo admite
`kind: 'REAL_PROJECT'`, pero no hay ninguno y el índice no muestra ese grupo
mientras esté vacío.

## Boundaries

Dentro del módulo:

- modelo y catálogo local tipado (`showcase-types.ts`, `showcase-catalog.ts`);
- registro de cargadores perezosos (`showcase-registry.tsx`);
- índice y tarjetas (`components/`);
- una carpeta por demo (`<slug>/`) con su skin, fuentes, datos y estado locales;
- utilidades compartidas entre demos (`shared/focus-trap.ts`).

Fuera del módulo, pero parte de su contrato:

- rutas: [`app/portfolio/page.tsx`](../../app/portfolio/page.tsx) y
  [`app/portfolio/[slug]/page.tsx`](../../app/portfolio/[slug]/page.tsx);
- [`middleware.ts`](../../middleware.ts): 404 de slugs no publicados;
- [`components/site-chrome.tsx`](../../components/site-chrome.tsx): retira el
  chrome de DevSure en un showcase publicado;
- [`components/site-header.tsx`](../../components/site-header.tsx): enlace
  «Portfolio» de la navegación.

No es parte del módulo `features/portfolio/`: son las secciones de la home y el
agregado `GET /api/v1/portfolio`, sin relación con los showcases salvo por el
`RootLayout` (ver «Known limitations»).

## Entry points

| Punto de entrada                 | Qué expone                                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| `showcase-catalog.ts`            | `showcases`, `PublishedShowcaseSlug`, `getPublishedShowcase(slug)`, `getPublishedSlugs()` |
| `showcase-registry.tsx`          | `ShowcaseRenderer({ slug })` (módulo cliente)                                             |
| `components/portfolio-index.tsx` | `PortfolioIndex`, usado por `/portfolio`                                                  |
| `<slug>/<nombre>-showcase.tsx`   | El componente raíz de cada demo, solo vía el registro                                     |

## Contracts / Invariants

Estables (cambiarlos exige un ADR nuevo o la modificación de ADR-006/007):

1. **El catálogo es dueño de los slugs y de su estado.** `showcase-catalog.ts` es
   la única lista de showcases; `status` es `published` (página completa) o
   `in-preparation` (solo tarjeta, sin ruta).
2. **Un cargador por slug publicado, y solo para ellos.** Las claves de
   `showcaseLoaders` se tipan como `Record<PublishedShowcaseSlug, …>`, derivado
   del catálogo (`as const satisfies`): publicar un slug sin cargador, o
   registrar uno no publicado, no compila.
3. **Imports dinámicos con rutas literales** en un módulo `'use client'`
   (`dynamic(() => import('./<slug>/<archivo>'))`). Nunca una ruta construida a
   partir del slug ni un import estático de un demo en el registro: rompería la
   separación de chunks por ruta (ADR-007).
4. **Un slug no publicado no expone un showcase.** En el runtime actual, el
   **HTTP 404 lo garantiza el middleware**: reescribe a una ruta inexistente
   antes de renderizar. La ruta se sirve dinámica (ADR-006), así que
   `dynamicParams = false` no se aplica en runtime y `notFound()` llega cuando
   `app/loading.tsx` ya respondió 200. `dynamicParams` con
   `generateStaticParams()` y `notFound()` son protecciones complementarias
   (build y render), no garantías HTTP independientes. En el 404 se conserva el
   chrome de DevSure.
5. **Chrome:** solo un showcase publicado se renderiza sin el header/footer de
   DevSure; trae su propia franja «CONCEPT DEMO», header y footer con enlaces a
   `/portfolio` y `/#contacto`. El índice `/portfolio` mantiene el chrome.
6. **Aislamiento visual y de código entre demos:** estilos en CSS modules sin
   `:global` ni selectores `html`, `body` o `:root`; fuentes `next/font` propias
   de cada demo; ningún demo importa a otro. El código compartido
   (`components/`) solo importa el `fonts` de cada demo, nunca sus componentes
   ni sus datos.
7. **Los flujos de los demos no envían ni persisten transacciones reales:** sin
   `fetch`, almacenamiento del navegador, `wa.me` ni `mailto:` en el código del
   módulo. Los demos que piden contacto se limitan a campos básicos y muestran
   que no se envió nada. Esto no aísla la ruta de la API: ver «Known
   limitations» (`RootLayout`, ADR-006).
8. **Divulgación de Concept Demo** visible en cada demo (marca ficticia, datos
   demostrativos, avisos de cada rubro).
9. **Un showcase es código cliente** (ADR-007): no puede usar componentes
   `async`, `next/headers` ni acceso a datos.

Derivado del código (no es un ADR): el catálogo se importa desde
`middleware.ts` y desde `site-chrome.tsx` (cliente), así que debe seguir siendo
datos puros, sin dependencias de servidor ni de navegador.

Hechos que cambian (consultarlos en el código, no aquí): qué slugs están
publicados, cuántos demos hay y sus nombres de marca. Fuente:
`showcase-catalog.ts`.

## Dependencies

- Internas: `@/features/showcase/*` (rutas relativas dentro del módulo); el
  módulo no importa otros features ni `@devsure/contracts`.
- Consumidores: las dos páginas de `app/portfolio/`, `middleware.ts` y
  `site-chrome.tsx`.
- Next.js: `next/dynamic`, `next/link`, `next/image`, `next/font/google`.
- Assets: fotografías locales en `apps/web/public/portfolio/<slug>/`,
  importadas de forma estática; nada se enlaza desde fuera.
- Indirecta: el `RootLayout` (`app/layout.tsx`) llama a `getSiteChromeData()`
  de `features/portfolio/api/get-portfolio` también en las rutas de showcase.

## Change procedure

Modificar un demo existente: limitarse a `<slug>/` (y a sus assets en
`public/portfolio/<slug>/`); comprobar que no aparecen imports de otros demos ni
llamadas de red.

Añadir un showcase (ADR-006 «Consequences» y ADR-007):

1. Carpeta `features/showcase/<slug>/` con su componente raíz, CSS module,
   `fonts.ts` y datos locales.
2. Entrada en el catálogo con `status: 'published'` (o `in-preparation` si solo
   lleva tarjeta).
3. Cargador en `showcaseLoaders` con import literal.
4. Visual de la tarjeta en `components/showcase-card.tsx` (mapa `VISUALS`),
   usando solo el `fonts` del demo.
5. No tocar el routing, el middleware ni `SiteChrome`.
6. Actualizar `tests/showcase-structure.test.mjs` (fija el número de publicados
   y en preparación, la lista de slugs y cada import literal) y añadir la suite
   `tests/e2e/portfolio-<slug>.spec.ts` con su caso de 404.
7. Comprobar en el build que ningún chunk de una ruta contiene código de otro
   showcase (ADR-007).

Publicar o retirar un slug cambia el catálogo y el registro en el mismo commit.
Que un slug esté `published` solo significa que una compilación de ese commit
expone la ruta: no implica despliegue ni aprobación de publicación
([PROTOCOL.md](../../../../../docs/ai/PROTOCOL.md), «Anti-Hallucination Rule»).

## Validation

| Prueba                                                                 | Qué cubre                                                                                                                                                  |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/web/tests/showcase-structure.test.mjs`                           | Archivos requeridos, catálogo ↔ registro, imports literales, `dynamicParams`, CSS con alcance, divulgación, sin red ni almacenamiento, chrome y navegación |
| `apps/web/tests/{appointment,faro,quote,savia,nacar}-reducer.test.mjs` | Reducers de estado de Lúmina Dental, FARO, Cota Cero, SAVIA y NÁCAR                                                                                        |
| `apps/web/tests/e2e/portfolio-<slug>.spec.ts` (seis suites)            | Recorrido de cada demo y 404 de slugs no publicados; el índice `/portfolio` está en `portfolio-ferreteria.spec.ts`                                         |
| `apps/web/tests/e2e/navigation.spec.ts`                                | Enlace «Portfolio» de la navegación                                                                                                                        |

Comandos (scripts de `package.json`; siempre con pnpm, nunca con `npx`):

```bash
pnpm --filter @devsure/web test        # node --test tests (unitarias y estructura)
pnpm --filter @devsure/web typecheck   # incluye la comprobación catálogo ↔ registro
pnpm --filter @devsure/web lint
pnpm --filter @devsure/web test:e2e tests/e2e/portfolio-<slug>.spec.ts
pnpm build                             # nunca con `next dev` en marcha
```

Playwright usa Chromium y necesita libres los puertos 3000 y 3001. Guardian
(`pnpm -s guardian:check`, propuesta, no quality gate) compara catálogo y
cargadores en GDN-002.

## Known limitations

- **Sin aislamiento completo en tiempo de ejecución** (ADR-006, «Known
  limitation»): las rutas de showcase usan el `RootLayout` global, que pide
  datos a la API antes de que `SiteChrome` decida. La ruta figura como SSG en el
  build pero se sirve dinámica (`no-store`) y hace una petición a la API por
  visita; `app/loading.tsx` se pinta antes del contenido. Un route group con
  layout propio queda como consideración futura, no decidida.
- **Todo el árbol del demo se hidrata** (ADR-007): las secciones estáticas
  viajan en el chunk del showcase.
- **El índice `/portfolio` carga el CSS y las fuentes de todos los demos**,
  porque las tarjetas importan sus `fonts`.
- `VISUALS` en `showcase-card.tsx` se indexa por `string`: un slug publicado
  sin visual compila y muestra la tarjeta sin imagen.
- Las suites E2E corren sobre `next dev` y no detectan diferencias del build de
  producción.

Detalle, mediciones y seguimiento: «Known issues» de
[STATUS.md](../../../../../docs/ai/STATUS.md) (buscar `showcase` o
`/portfolio`).

## References

- [DECISIONS.md](../../../../../docs/ai/DECISIONS.md): ADR-006 (feature aislada
  y limitación del `RootLayout`) y ADR-007 (registro con carga perezosa).
- Diseño original:
  [`docs/portfolio/DEVSURE-PROJECT-SHOWCASE-SYSTEM.md`](../../../../../docs/portfolio/DEVSURE-PROJECT-SHOWCASE-SYSTEM.md)
  y
  [`docs/portfolio/DEVSURE-CONCEPT-DEMO-CATALOG.md`](../../../../../docs/portfolio/DEVSURE-CONCEPT-DEMO-CATALOG.md).
- Código: [`showcase-catalog.ts`](./showcase-catalog.ts),
  [`showcase-registry.tsx`](./showcase-registry.tsx),
  [`showcase-types.ts`](./showcase-types.ts).
- Informes de QA por demo: `docs/portfolio/QA-REPORT-*.md` (históricos; leer
  solo con un motivo concreto).
