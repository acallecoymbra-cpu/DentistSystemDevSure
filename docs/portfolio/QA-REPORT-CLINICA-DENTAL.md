# Informe de QA — Lúmina Dental (Clínica Dental)

Jira: SCRUM-113 (responsive), SCRUM-117 (revisión visual), SCRUM-118
(accesibilidad) y SCRUM-119 (rendimiento).
Fecha: 2026-10-02. Código: `2bdc329` más los cambios sin commit de Lúmina Dental.
SCRUM-93 (fotografías) sigue abierto.

## Cómo se ejecutó

- Build de producción (`pnpm build`) servido con `next start` en el puerto 3000.
  Para el recorrido hasta `/#contacto` se levantó además la API de pruebas
  (`tests/start-e2e-api.mjs`, base de datos desechable) en el 3001.
- Chromium headless (Playwright) con scripts temporales no versionados: medidas
  de layout, tipografía, contraste, orden de tabulación, recorrido solo con
  teclado, red, CLS y capturas de pantalla, que se revisaron una a una.
- Diseño de referencia: lienzo aprobado de Claude Design (artboards
  `Main` 1440, `Tablet` 834, `Mobile` 390, `Booking`) y
  `HANDOFF-CLINICA-DENTAL-LUMINA.md`. Los artboards se leyeron como código
  (medidas, tipografía, color); no se superpusieron imágenes píxel a píxel.
- No ejecutado: lector de pantalla real, axe, Lighthouse, Firefox, Safari / iOS,
  Android, dispositivo táctil físico ni teclado virtual real.

## Resultado

Sin hallazgos BLOCKER, HIGH ni MEDIUM abiertos. El QA encontró cuatro defectos
de composición en escritorio estrecho (1024–1379 px), uno de ellos HIGH, y se
corrigieron en esta misma puerta con un bloque de CSS acotado a ese rango.
Quedan cuatro hallazgos LOW y el bloqueo visual de assets.

| ID   | Severidad    | Hallazgo                                                                                   | Viewport        | Componente                      | Estado    | ¿Bloquea la aceptación técnica? |
| ---- | ------------ | ------------------------------------------------------------------------------------------ | --------------- | ------------------------------- | --------- | ------------------------------- |
| Q-1  | HIGH         | Calendario del paso 3 aplastado en el panel en línea: días de ~8 px a 1024 y < 44 px hasta 1379 | 1024–1379       | Agenda en línea (`.agendaInner`) | Corregido | No (corregido)                  |
| Q-2  | MEDIUM       | Opciones del paso 1 de 125 px: texto a una palabra por línea y marca fuera de la tarjeta    | 1024–1379       | Agenda en línea (`.optionGrid`)  | Corregido | No (corregido)                  |
| Q-3  | MEDIUM       | "30–40 min" quedaba tapado por el botón "Agendar evaluación"                                | 1024            | Tratamiento destacado            | Corregido | No (corregido)                  |
| Q-4  | MEDIUM       | Header en dos líneas: marca, "Cómo trabajamos" y "Primera visita" partidos                  | 1024–1099       | `LuminaHeader`                   | Corregido | No (corregido)                  |
| Q-5  | LOW          | Titular del hero con una línea más con la fuente de reserva que con Fraunces                | 531–532, 1130, 1328 | Hero / `fonts.module.css`    | Abierto   | No                              |
| Q-6  | LOW          | "Áreas de atención" es una parada de tabulación también en escritorio, donde no hace scroll | ≥ 600           | Especialidades                   | Abierto   | No                              |
| Q-7  | LOW          | El botón Atrás del navegador no cierra el diálogo: sale de la página                        | < 1024          | `AppointmentDialog`              | Abierto   | No                              |
| C-5  | LOW          | El calendario queda desfasado si la página sigue abierta al cruzar la medianoche            | Todos           | `AppointmentProvider`            | Aceptado  | No                              |
| V-1  | VISUAL-ASSET | Fotografías A-01 y A-02 pendientes: marcadores neutros en hero, primera visita y cómo trabajamos | Todos       | Hero, FirstVisit, ClinicExperience | Abierto (SCRUM-93) | No (bloqueo visual)    |

Evidencia de Q-1 a Q-4 antes y después, medida en el build de producción:

| Medida                              | 1024 antes | 1024 después | 1280 antes | 1280 después | 1380 | 1440 |
| ----------------------------------- | ---------- | ------------ | ---------- | ------------ | ---- | ---- |
| Ancho del panel en línea            | 572 px     | 912 px       | 772 px     | 1168 px      | 872  | 932  |
| Día del calendario (ancho × alto)   | ~8 × 46    | 55 × 46      | 30 × 46    | 87 × 46      | 45 × 46 | 53 × 46 |
| Opción del paso 1                   | 125 × 133–176 | 295 × 69  | 209 × 90–113 | 407 × 69   | 259 × 69–90 | 289 × 69 |
| Lista de datos del destacado        | 68 px      | 322 px       | 217 px     | 472 px       | 276  | 311  |
| Enlaces de navegación en una línea  | No         | Sí           | Sí         | Sí           | Sí   | Sí   |

Corrección: bloque "Narrow desktop" al final de `lumina.module.css`. Entre 1024
y 1379 px el texto de la agenda se apila sobre el panel (que ocupa toda la
fila), el pie del tratamiento destacado se apila y los enlaces del header no
parten línea; entre 1024 y 1099 px el header reduce separación y tamaño. No
cambia nada por debajo de 1024 ni desde 1380 px.

## SCRUM-113 — Responsive

Anchos: 1440, 1100, 1024, 1023, 834, 600, 599, 390, 375 y 320 px. Los cortes
reales de layout son 1024 / 1023 (agenda en línea ↔ diálogo) y 600 / 599 (panel
lateral ↔ pantalla completa, barra flotante).

En los diez anchos, con la página recorrida de arriba abajo:

- Scroll horizontal: 0 px en todos.
- Elementos fuera del viewport, texto recortado y controles solapados: 0.
- Controles por debajo de 44 px: 0 (página, diálogo y pasos 1, 3 y 4).
- Las doce piezas están presentes: franja Concept Demo, header, hero,
  confianza, tratamientos, agenda, especialidades, primera visita, cómo
  trabajamos, ubicación y contacto, transición a DevSure y footer.
- Errores de consola: 0.

| Ancho | Alto de página | Agenda                                  | Fondo cierra | Barra flotante                         |
| ----- | -------------- | --------------------------------------- | ------------ | -------------------------------------- |
| 1440  | 8108           | En línea; el CTA lleva el foco a la sección | —        | No existe                              |
| 1100  | 8598           | En línea                                | —            | No existe                              |
| 1024  | 8856           | En línea                                | —            | No existe                              |
| 1023  | 8530           | Panel lateral 480 px, fondo inerte, scroll bloqueado | Sí; el foco vuelve al CTA | No existe |
| 834   | 8692           | Panel lateral 480 px                    | Sí           | No existe                              |
| 600   | 9719           | Panel lateral 480 px                    | Sí           | No existe                              |
| 599   | 6730           | Pantalla completa (599 × alto)          | No (no hay fondo) | Aparece tras el hero; oculta en agenda, DevSure y footer |
| 390   | 7555           | Pantalla completa                       | No           | Igual                                  |
| 375   | 7649           | Pantalla completa                       | No           | Igual                                  |
| 320   | 8220           | Pantalla completa                       | No           | Igual                                  |

Recorrido completo de la solicitud en producción (tratamiento → motivo →
preferencia → día y hora → datos → confirmación) en 1440, 834 y 390 px:
confirmado en los tres, con el aviso "No se reservó una cita real…".

Desktop: agenda en línea, ticket lateral alineado y recorrido tratamiento →
agenda correctos; tras la corrección también entre 1024 y 1379 px. Tablet:
panel, fondo atenuado, cierre por fondo, bloqueo y liberación del scroll y
retorno del foco correctos. Mobile: pantalla completa, pie fijo con Atrás /
Continuar, barra de progreso y resumen sobre el pie correctos.

No verificado: comportamiento con el teclado virtual real ("keyboard-safe") —
en headless no existe; el pie del diálogo es fijo y el contenido hace scroll.

## SCRUM-117 — Revisión visual

Comparado contra los artboards aprobados. Valores medidos en la implementación:

| Elemento                    | Diseño (1440)              | Implementación (1440) | Diseño (390) | Implementación (390) |
| --------------------------- | -------------------------- | --------------------- | ------------ | -------------------- |
| h1 del hero                 | clamp(56, 6.5vw, 100) = 93,6 px | 93,6 px Fraunces | 50 px        | 50 px                |
| h2 de sección               | clamp(40, 4.4vw, 64) = 63,4 px  | 63,4 px          | 38 px        | 38 px                |
| h2 "Cómo trabajamos"        | clamp(44, 5vw, 76) = 72 px      | 72 px            | 42 px        | 42 px                |
| h2 de ubicación             | 56 px                      | 56 px                 | 34 px        | 34 px                |
| h2 de DevSure               | 80,6 px Plus Jakarta Sans  | 80,6 px Plus Jakarta Sans | 38 px    | 38 px                |
| Padding de tratamientos     | 112 / 56 / 120             | 112 / 56 / 120        | 56 / 16 / 56 | 56 / 16 / 56         |
| Padding y radio de la agenda | 104 / 56 / 112 · 72 px · pino | igual              | 48 / 16 / 52 · 40 px | igual        |
| Padding de DevSure          | 128 / 56 / 96 · 72 px      | igual                 | —            | 64 / 16 / 40 · 40 px |

Tablet (834): h1 64 px, igual que el artboard. Identidad, paleta, rejilla,
composición del hero (ventana con arco y horarios acoplados), tratamientos
(destacado pino, dos secundarios, índice de cinco), agenda (numeral, riel,
ticket, píldoras de día y hora en cobalto), bordes, superficies, ritmo de
secciones y transición a DevSure coinciden con el diseño en 1440, 834 y 390.

Ninguna anotación de diseño llega al visitante: no aparecen `[PHOTO]`,
`[IMAGE]`, "A-01"… "A-04", "recorte", notas de diseño ni de implementación en el
texto de la página en 1440, 834 y 390 (los marcadores del lienzo sí las
llevaban).

**A. Defectos de implementación:** Q-1 a Q-4, corregidos. Ninguno abierto.

**B. Desviaciones aceptadas:**

- Calendario de cinco semanas móviles en lugar de un mes fijo.
- Franja Concept Demo de 44 px (38–40 en el diseño) para cumplir 44 px táctiles.
- Botón principal del hero de 58 px (56 en tablet y 60 en desktop en el diseño).
- Motivo con radios nativos (el diseño pedía botones con `aria-pressed`).
- Al agendar desde una tarjeta en desktop el foco va al título del paso 1, no
  al de la sección.
- Menú mobile desplegable bajo el header, no a pantalla completa.
- Arcos del hero solo en desktop; horarios del hero en mobile con un día y dos
  horas.
- La página no reserva 88 px al pie: la barra flotante se oculta donde taparía.
- Nueva: entre 1024 y 1379 px el texto de la agenda va sobre el panel y no a su
  izquierda (el diseño solo define 1440).
- Altura total mayor que la del artboard (8108 frente a 7560 px en 1440; 7555
  frente a 6260 en 390). No se analizó sección por sección.

**C. Assets pendientes:** ver "Bloqueo visual de assets".

## Regresión de fuentes

Titular del hero con la fuente de reserva (Fraunces bloqueada) frente a Fraunces
cargada, y CLS en carga en frío y con las fuentes retrasadas 1,2 s. Medido tras
C-6 y tras las correcciones de este QA.

| Ancho | Líneas reserva / Fraunces | Alto del hero reserva / Fraunces | CLS en frío | CLS fuente lenta |
| ----- | ------------------------- | -------------------------------- | ----------- | ---------------- |
| 320   | 4 / 4                     | 933 / 933                        | 0,0005      | 0,0005           |
| 375   | 4 / 4                     | 933 / 933                        | 0,0006      | 0,0006           |
| 390   | 4 / 4                     | 933 / 933                        | 0,0010      | 0,0006           |
| 531   | **3 / 2**                 | 858 / 809 (−49 px)               | 0,0698      | 0,0695           |
| 532   | **3 / 2**                 | 858 / 809 (−49 px)               | 0,0698      | 0,0695           |
| 599   | 2 / 2                     | 809 / 809                        | 0,0004      | 0,0004           |
| 600   | 3 / 3                     | 1058 / 1058                      | 0,0000      | 0,0000           |
| 834   | 2 / 2                     | 966 / 966                        | 0,0004      | 0,0004           |
| 1023  | 2 / 2                     | 966 / 966                        | 0,0005      | 0,0003           |
| 1024  | 4 / 4                     | 680 / 680                        | 0,0003      | 0,0003           |
| 1100  | 4 / 4                     | 682 / 682                        | 0,0057      | 0,0003           |
| 1130  | **4 / 3**                 | 680 / 680                        | 0,0281      | 0,0282           |
| 1328  | **4 / 3**                 | 785 / 785                        | 0,0312      | 0,0305           |
| 1440  | 3 / 3                     | 785 / 785                        | 0,0007      | 0,0008           |

- Objetivo CLS ≤ 0,10: cumplido en los catorce anchos. Máximo 0,0698 (531–532 px).
- Diferencias de líneas en los mismos cuatro anchos que antes de C-6: 531, 532,
  1130 y 1328 px (Q-5). En 1130 y 1328 el hero no cambia de alto; en 531–532
  cambia 49 px. La composición no se rompe en ninguno. No se rediseñó la
  tipografía.
- CLS de toda la sesión durante el recorrido completo: 0,0022 (1440), 0,0005
  (834) y 0,0007 (390).

## SCRUM-118 — Accesibilidad

Estructura (1440): un `h1`, sin saltos de nivel, un `header`, un `nav`, un
`main`, un `footer`, `lang="es"`, ningún control sin nombre ni id duplicado.

Solo con teclado:

- **Skip link:** primera parada, visible al enfocarse, lleva el foco a `<main>`.
- **Orden de tabulación (1440):** 27 paradas — skip link, Portfolio, marca,
  cinco enlaces, "Agendar cita", acciones del hero, "Elegir mi horario", ocho
  "Agendar" de tratamientos, radios del paso 1, "Continuar", áreas de atención,
  "Agendar una cita", "Hablemos de tu proyecto", "Ver otros concept demos" y
  "Volver a Portfolio". Las 27 con anillo de foco (3 px cobalto, 3 px de
  separación).
- **Recorrido completo sin ratón** en 1440 (en línea), 834 (panel lateral) y 390
  (pantalla completa): abrir con Enter, elegir motivo con Espacio y flechas,
  preferencia con flechas, primer día habilitado con Enter, primera hora con
  Espacio, envío vacío con Enter desde un campo, rellenar, confirmar y "Nueva
  solicitud". Completado en los tres.
- **Tratamiento por teclado:** "Agendar: Ortodoncia" con Enter marca el motivo,
  la tarjeta ("En tu solicitud") y anuncia "Ortodoncia agregado a tu solicitud.".

Diálogo (834 y 390): `role="dialog"`, `aria-modal="true"`, etiquetado por
"Agenda de cita · <paso>", foco inicial en el diálogo, fondo `inert`, scroll de
fondo bloqueado. 40 Tab y 40 Shift+Tab sin salir. Esc y × lo cierran, liberan el
fondo y el scroll y devuelven el foco a "Agendar una cita". Durante el recorrido
con teclado el foco no salió del diálogo en ningún paso.

Foco tras cada transición: título del paso al avanzar, primer campo inválido
("Nombre") tras el envío vacío, "Solicitud preparada." al confirmar y título del
paso 1 tras "Nueva solicitud".

Formulario: etiquetas visibles en los cuatro campos; Nombre y Teléfono con
`required`; `aria-invalid` y `aria-describedby` hacia "Escribe tu nombre para
preparar la solicitud." e "Indica un teléfono de al menos 7 dígitos."; el
comentario describe "No incluyas diagnósticos ni datos médicos.". El error se
comunica con texto, no solo con color.

Región viva (`aria-live="polite"`), textos leídos durante el recorrido: "Motivo:
Limpieza y prevención." · "Paso 2 de 4: Preferencia." · "Preferencia:
Odontología general." · "Sábado 3 de octubre. Elige una hora." · "Sábado 3 de
octubre, 09:00." · "Revisa los campos marcados." · "Solicitud preparada. No se
reservó una cita real ni se envió ningún dato.".

Objetivos táctiles: ningún control visible por debajo de 44 × 44 px en página y
diálogo (1440, 834, 390), incluidos días (≥ 45 × 46) y horas (48 de alto).

Contraste (heurística propia sobre color calculado, AA 4,5:1 y 3:1 en texto
grande): sin fallos en el texto de la página (150–211 nodos por viewport) ni en
los estados de la agenda (paso 1, 2, 3 con aviso, 3 con selección, 4 con
errores y confirmación). Los únicos valores bajos son los numerales decorativos
"01"–"04" de Primera visita (1,27:1), que son `aria-hidden` y no transmiten
información.

Movimiento reducido (1440 y 390): 0 animaciones en curso, 0 elementos con
animación y transiciones de 0,00001 s (anuladas); scroll no suave. La solicitud
se completa y el foco llega a los mismos sitios.

Menú (834 y 390): se abre con Enter, `aria-expanded="true"`, foco en
"Tratamientos"; Esc lo cierra y devuelve el foco al botón.

## SCRUM-119 — Rendimiento

Build de producción: PASS. Tamaños en gzip.

| Medida                         | `/portfolio/ferreteria`   | `/portfolio/clinica-dental` | SCRUM-120                  |
| ------------------------------ | ------------------------- | --------------------------- | -------------------------- |
| Ruta según `next build`        | 1,44 kB · first load 105 kB | 1,44 kB · first load 105 kB | igual                    |
| Chunk de ruta (`page-*.js`)    | 1,4 kB, sin código de demos | el mismo archivo          | igual                      |
| Chunk del showcase             | `5375.*.js` 20,7 kB (72 587 B) | `7191.*.js` 17,3 kB (59 251 B) | 20,7 kB · 17,3 kB (59 132 B) |
| CSS del showcase               | `6eb985dc*.css` 14,4 kB   | `21e13ca2*.css` 12,0 kB (61 600 B) | 14,4 kB · 11,8 kB (60 944 B) |
| HTML                           | 79,3 kB                   | 44,0 kB                     | 79,0 kB · 44,0 kB          |
| Archivos JS descargados        | 11                        | 10                          | —                          |
| Carga código del otro showcase | No (JS ni CSS)            | No (JS ni CSS)              | No                         |
| Hojas con CSS de showcase      | 1                         | 1                           | 1                          |

Cambios respecto a SCRUM-120: el chunk de Lúmina crece 119 B sin comprimir
(SCRUM-121) y su CSS 656 B (bloque de escritorio estrecho de este QA). Nexo Obra
no cambia. ADR-007 se mantiene: cada ruta descarga solo su showcase.

Compartido por ambas rutas: framework y runtime de Next, `app/layout`,
`app/error`, el chunk de ruta y la hoja global del sitio
(`401a328301c27819.css`, 11,1 kB).

Red y ejecución (producción):

- Errores de consola: 0 en ambas rutas y durante el recorrido completo en 1440,
  834 y 390.
- Peticiones POST / PUT / PATCH / DELETE: 0. Peticiones a otro host: 0. Popups:
  0. La URL no cambia al confirmar. Almacenamiento y cookies sin cambios.
- Peticiones que no son assets: una precarga GET de `/portfolio` (enlace de
  vuelta) y, en Nexo Obra, `/_next/image`.
- Sin CSS duplicado: una sola hoja contiene las clases de cada showcase.
- `Cache-Control: no-store` en ambas rutas (limitación conocida de ADR-006).

HTTP en producción: `/portfolio`, `/portfolio/ferreteria` y
`/portfolio/clinica-dental` 200; `/portfolio/torneria` y `/portfolio/salon-spa`
(no publicados), `/portfolio/no-existe` y `/portfolio/CLINICA-DENTAL` 404.

"Hablemos de tu proyecto" (producción con la API de pruebas): navega a
`/#contacto`, el título "Cuéntanos tu próximo proyecto" queda dentro del
viewport en 1440 y 390 y no hay errores de consola. Sin API en marcha la home no
tiene sección de contacto que mostrar; no es un comportamiento de Lúmina.

## Reducer y agenda (SCRUM-121)

- `apps/web/tests/appointment-reducer.test.mjs`: 6/6. Una fecha no reservable no
  altera el estado; una fecha válida nueva borra la hora anterior.
- La agenda funciona de extremo a extremo en 1440, 834 y 390 (producción) y en
  la suite Playwright.
- C-5 no cambia.

## P0 y regresión completa

Ejecutado al final, sobre el código ya corregido y con los puertos 3000 y 3001
libres:

- `pnpm lint`: PASS.
- `pnpm typecheck`: PASS.
- `pnpm test`: PASS — web 34/34 (reducer 6/6), API 176/176.
- `pnpm test:integration`: PASS — 107/107 (18 suites).
- `pnpm build`: PASS.
- `pnpm test:e2e`: 82/85.
  - `portfolio-clinica-dental.spec.ts` (P0 de Lúmina): 23/23.
  - `portfolio-ferreteria.spec.ts`: 21/21.
  - `navigation.spec.ts`: 5/5.
  - Tres fallos, los tres en `home-hero.spec.ts` (`:17`, `:53` a 360 px y `:53`
    a 768 px), los tres "Tearing down context exceeded the test timeout of
    30000ms": el timeout de cierre histórico de la home, anterior a Portfolio.
    `technologies.spec.ts` pasó completo en esta corrida.

## Bloqueo visual de assets

- **A-01** (hero): pendiente. Se muestra un marcador neutro de bandas tonales
  con la geometría final (ventana con arco).
- **A-02** (cómo trabajamos y fragmento de primera visita): pendiente. Mismo
  marcador.
- **A-03** (Open Graph): opcional, no producido.
- Los marcadores son `aria-hidden` y no llevan texto. Cuando lleguen las
  fotografías habrá que añadir `next/image`, `alt` y `sizes` (sección 09 del
  handoff de diseño) y repetir CLS y revisión visual del hero.

No se generaron assets de sustitución. SCRUM-93 no está completo.
