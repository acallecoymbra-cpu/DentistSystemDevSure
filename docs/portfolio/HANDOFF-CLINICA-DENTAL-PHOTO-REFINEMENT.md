# Lúmina Dental — Photo refinement (handoff)

Retrofit fotográfico de `/portfolio/clinica-dental` a partir del lienzo aprobado
de Claude Design "Lúmina Dental — Refinamiento fotográfico"
(`https://claude.ai/artifact/SV8wejfoc9DKe7EpMQSCgJ`), dirección "luz natural y
calma clínica".

Estado: IMPLEMENTED y verificado en el build de producción el 2026-10-07. En el
commit `ce67504`, en Forgejo (este documento se redactó antes del commit y decía
"sin commit, sin push"; corregido el 2026-10-11). Sin despliegue verificado.

## Alcance

Solo presentación. No cambian el producto, el flujo de cita, el reducer
(`appointment-state.ts`), los datos (`appointment-data.ts`), las validaciones,
el routing, la arquitectura de showcases ni los otros demos. No se tocó ningún
test.

## Assets

Seis WebP derivados en `apps/web/public/portfolio/clinica-dental/` (339 230 B en
total). Origen: Pexels, licencia Pexels ("Free to use"), comprobada en la página
de cada foto el 2026-10-07. Descarga desde
`https://images.pexels.com/photos/<ID>/pexels-photo-<ID>.jpeg`.

| Ref. | Archivo local | Origen | ID | Autor | Original | Producción | Peso | Recorte |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| H-01 | `hero.webp` | https://www.pexels.com/photo/6812453/ | 6812453 | Pavel Danilyuk | 5473×3654 | 1800×1878 | 110 182 B | Se retira el 36 % izquierdo (queda 3503×3654) |
| T-01 | `treatment-chair.webp` | https://www.pexels.com/photo/6812479/ | 6812479 | Pavel Danilyuk | 5473×3654 | 1400×1460 | 46 556 B | Se retira el 36 % izquierdo |
| E-01 | `specialties-detail.webp` | https://www.pexels.com/photo/6812477/ | 6812477 | Pavel Danilyuk | 5473×3654 | 1800×1202 | 37 734 B | Ninguno |
| V-01 | `first-visit.webp` | https://www.pexels.com/photo/6627325/ | 6627325 | Karola G | 6720×4480 | 2000×1147 | 38 242 B | Se retira el 14 % inferior |
| C-01 | `how-we-work.webp` | https://www.pexels.com/photo/4269497/ | 4269497 | Cedric Fauntleroy | 7996×5331 | 2000×1333 | 51 898 B | Ninguno |
| U-01 | `location.webp` | https://www.pexels.com/photo/16571738/ | 16571738 | Yusuf Çelik | 4160×6240 | 1200×1800 | 54 618 B | Ninguno |

### Inspección de marcas (originales a resolución completa)

Los recortes están hechos en el archivo, no ocultos con CSS.

- **H-01**: rótulo "MixStar" en un equipo del extremo izquierdo, logotipo en el
  aire acondicionado de la pared y en el monitor. Para retirar los tres hizo
  falta recortar el 36 % izquierdo, no el ~15 % previsto en el lienzo.
- **T-01**: relieve "KAVO" en el brazo del sillón, legible a resolución completa.
  No estaba previsto en el lienzo; se retira con el mismo recorte izquierdo.
- **V-01**: etiqueta "uniformix club med" en el bolsillo del uniforme; se retira
  el 14 % inferior.
- **E-01**: solo marcas de conformidad "CE" en el instrumental, no una marca
  comercial. Sin recorte.
- **C-01** y **U-01**: sin marcas legibles.

## Dónde va cada foto

| Sección | Foto | Comportamiento |
| --- | --- | --- |
| Hero | H-01 | La ventana en arco es la fotografía. 4:5 en mobile, 5:4 de 600 a 1023 px, 460/560 px de ancho desde 1024 px. `priority` y `placeholder="blur"`. El titular sigue sobre marfil; nunca pisa la foto. |
| Tratamientos | T-01 | Fondo de la tarjeta "Evaluación general", decorativa (`alt=""`), bajo un velo pino. En mobile se ve arriba y se funde hacia el pino; desde 600 px el velo es lateral. |
| Especialidades | E-01 | Banda bajo el encabezado, solo desde 600 px (3:1; 4:1 desde 1024 px). Alt descriptivo. |
| Primera visita | V-01 | En todos los anchos, con la etiqueta "IMAGEN ILUSTRATIVA". Arco 4:5 a ancho completo en mobile; 300 px junto al título desde 600 px. |
| Cómo trabajamos | C-01 | La sección pasa a fondo pino. Foto junto al bloque en escritorio (600 px de alto), ~16:9 en tablet, ~4:3 en mobile. |
| Ubicación | U-01 | Junto a la ilustración de cercanía, que se conserva. 3:2 en mobile, 5:2 en tablet, columna desde 1280 px. |

Pie de página, frase nueva: "Fotografías de stock con fines ilustrativos: las
personas y los espacios no pertenecen a una clínica real."

## Implementación

- `components/hero.tsx`: los arcos SVG, el marcador y el marco neutro se
  sustituyen por un `<figure>` con `next/image`.
- `components/treatments.tsx`: los arcos de la tarjeta destacada se sustituyen
  por la foto decorativa.
- `components/static-sections.tsx`: cuatro `<figure>` nuevos y la frase del pie.
- `lumina.module.css`: un bloque final "Photo refinement" con selectores
  `.root .x`, que gana a las reglas base en todos los breakpoints sin
  reescribirlas.

Todas las imágenes usan `next/image` con `fill`, `sizes` y `object-fit: cover`.
Solo el hero lleva `priority`.

## Desviaciones respecto al lienzo

1. **Recorte del hero mayor** (36 % en vez de ~15 %) por las marcas. Los puntos
   focales se recalcularon sobre el archivo recortado (40 % 60 % mobile, 50 % 62 %
   tablet, 46 % 62 % escritorio); no son los del lienzo.
2. **T-01 recortada** por el relieve "KAVO", que el lienzo no contemplaba.
3. **Velo de la tarjeta de tratamientos más denso** cuando la tarjeta mide menos
   de ~700 px (600 px y 1024–1279 px): con el velo del lienzo el texto bajaba a
   3,29:1. Ahora la foto apenas se percibe en esos anchos; se priorizó AA.
4. **El panel de horarios sigue unido bajo la foto del hero** (el layout ya
   verificado) en lugar de superponerse a ella.
5. **Especialidades**: la foto es una banda bajo el encabezado, no una pieza al
   lado.
6. **Cómo trabajamos**: la foto conserva su marco redondeado junto al bloque
   pino; no va a sangre.
7. **Ubicación**: la foto se oculta de 1024 a 1279 px (la tarjeta no tiene sitio
   para una tercera columna) y en mobile va después del texto.
8. **Primera visita en escritorio**: el encuadre 4:5 muestra solo al
   profesional; el texto alternativo lo describe así.

## Verificación (2026-10-07)

Build de producción (`next start`), Chromium headless.

- Anchos 1440, 1100, 1024, 1023, 834, 600, 599, 390, 375 y 320 px: desborde
  horizontal 0, texto recortado 0, controles por debajo de 44 px 0, errores de
  consola y de página 0. El titular del hero no se solapa con la foto en ningún
  ancho. Las imágenes visibles usan `object-fit: cover`; E-01 no se muestra ni
  se descarga por debajo de 600 px.
- Contraste (peor píxel bajo cada texto, 17 textos por ancho): mínimo 6,23:1
  (chips del panel de horarios, sin cambios). Texto de la tarjeta sobre la foto:
  ≥ 7,74:1; etiquetas de la tarjeta: ≥ 6,32:1; sección pino: ≥ 7,25:1. Sin
  fallos de AA.
- CLS en carga: 0,0007 (1440), 0,0004 (834), 0,0008 (390). En 1100 y 1024 px es
  0,0160 / 0,0163 y ya lo era antes del cambio (0,0165 / 0,0178): lo causa el
  ajuste de fuente en la columna del hero, no las fotos.
- Rutas: `/portfolio`, `/portfolio/clinica-dental`, `/portfolio/ferreteria` y
  `/portfolio/restaurante` 200; `/portfolio/no-existe` 404.

| Medida | Antes | Después |
| --- | --- | --- |
| JS de la página (gzip) | 450 524 B (135 062) | 467 607 B (141 470) |
| CSS (gzip) | 118 771 B (23 117) | 123 855 B (23 901) |
| HTML, 1440 px (gzip) | 45 052 B (11 709) | 54 250 B (13 320) |
| HTML, 390 px (gzip) | 44 769 B (11 657) | 53 967 B (13 269) |
| Chunk propio de Lúmina (gzip) | 59 318 B | 62 166 B (18 270) |
| Imágenes, 1440 px | 0 · 0 B | 6 · 133 690 B |
| Imágenes, 390 px a 3× | 0 · 0 B | 5 · 185 654 B |
| Imagen del hero, 1440 px | — | 21 412 B (640 px de ancho) |
| Imagen del hero, 390 px a 3× | — | 51 614 B (1200 px de ancho) |
| CLS, 1440 / 390 px | 0,0007 / 0,0008 | 0,0007 / 0,0008 |

Suites: `pnpm test:e2e portfolio-clinica-dental navigation` 28/28 (23 + 5, sin
cambios en los tests); `pnpm lint`, `pnpm typecheck` PASS; `pnpm test` web
82/82; `pnpm test:integration` 107/107; `pnpm build --force` PASS.

No ejecutado: `pnpm test:e2e` completo y las suites de los otros demos (no se
tocó ningún archivo suyo); lector de pantalla, axe, Lighthouse, Firefox, WebKit
y dispositivos físicos; el flujo de cita en el build de producción (lo cubre la
suite sobre `next dev`).

## Pendiente y riesgos

- Quedan sin uso las reglas `.photo`, `.heroArcs`, `.heroMarker` y
  `.featuredArcs` de `lumina.module.css`. No afectan a la página.
- La tarjeta de `/portfolio` de Lúmina no cambió: sigue con su visual en CSS.
- El lienzo sigue mostrando los encuadres originales, sin los recortes por
  marcas.
- La licencia se comprobó el 2026-10-07; para un registro duradero, guardar una
  captura de cada página de origen.
- En E-01 se distinguen marcas "CE" pequeñas en el instrumental.
