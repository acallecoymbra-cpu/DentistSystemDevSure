# Plan de pruebas — Lúmina Dental (Clínica Dental)

Jira: SCRUM-111 (plan) y SCRUM-112 (automatización P0).
Alcance: `/portfolio/clinica-dental`, su card en `/portfolio` y los slugs no publicados.
Fuera de alcance: Nexo Obra (su propio plan y suite), API, admin y el resto del sitio.

## Criterios de prioridad

- **P0** — Si falla, el demo no cumple su función o engaña al visitante: no
  carga, no se puede preparar la solicitud de cita, se confirma una solicitud
  incompleta, se pierde la divulgación "Concept Demo", sale algún dato del
  navegador o no se puede volver a DevSure. Bloquea el cierre del slice.
  Automatizado en Playwright.
- **P1** — Comportamiento importante con alternativa o de menor frecuencia. No
  bloquea el commit; se cubre en el QA final (SCRUM-113 / 117 / 118 / 119) y es
  candidato a automatización posterior.
- **P2** — Casos límite, pulido y verificaciones no funcionales de bajo riesgo.

Viewports de referencia: desktop 1440×1000, tablet 834×1100, mobile 390×844.
La agenda cambia materialmente entre ellos: panel en línea dentro de su sección
(≥1024 px), panel lateral de 480 px (600–1023 px) y flujo a pantalla completa
(<600 px). Los pasos, la validación y el reducer son los mismos en los tres, así
que el detalle de cada paso se prueba una sola vez (desktop) y en tablet y
mobile solo lo que cambia: abrir, cerrar, foco, fondo inerte y el recorrido
completo dentro del diálogo.

## Fechas

El calendario es relativo al día local del visitante. Las pruebas no nombran
fechas: eligen el **primer día habilitado** y la **primera hora libre** por su
semántica accesible (botones habilitados del grupo del calendario; horas con
nombre `HH:MM`, las ocupadas se llaman `HH:MM, ocupado`) y comprueban que la
confirmación muestra esa misma fecha y hora.

Una única prueba (P0-17) afirma fechas concretas. Para eso fija de forma
explícita el reloj del navegador (`page.clock.setFixedTime`) en el martes 13 de
octubre de 2026 a las 10:00 y la zona horaria en `America/La_Paz`.

## P0 — automatizado

Archivo: `apps/web/tests/e2e/portfolio-clinica-dental.spec.ts` (23 tests).

| ID    | Escenario                                                                                                                  | Viewport                |
| ----- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| P0-01 | `/portfolio` carga (200), Lúmina Dental aparece como demo publicado y su card abre `/portfolio/clinica-dental`             | Desktop                 |
| P0-02 | `/portfolio/clinica-dental` carga (200): h1, navegación propia, sin chrome de DevSure                                      | Desktop                 |
| P0-03 | Divulgación "CONCEPT DEMO" en el primer pantallazo (franja superior y hero) y en el footer                                 | Desktop, mobile         |
| P0-04 | Volver a Portfolio desde la franja Concept Demo y desde el footer                                                          | Desktop                 |
| P0-05 | CTA DevSure "Hablemos de tu proyecto" → `/#contacto`, con el chrome de DevSure y la sección a la vista                     | Desktop                 |
| P0-06 | Slug no publicado (`salon-spa`, `CLINICA-DENTAL`) → 404 con el chrome de DevSure                                           | Desktop                 |
| P0-07 | Tratamientos visibles: 3 destacados, 5 en el índice, 8 enlaces "Agendar"                                                   | Desktop                 |
| P0-08 | Agendar desde una tarjeta: el motivo llega preseleccionado, la tarjeta queda marcada "En tu solicitud"; un tratamiento del índice llega como "Otro tratamiento" con su opción | Desktop, mobile |
| P0-09 | Abrir la agenda — desktop: el CTA lleva a la agenda en línea con el foco en la sección, sin diálogo                        | Desktop                 |
| P0-10 | Abrir la agenda — tablet: el CTA abre el panel lateral (480 px), foco dentro, `aria-modal`, fondo inerte, Shift+Tab no sale | Tablet                  |
| P0-11 | Abrir la agenda — mobile: el CTA abre el flujo a pantalla completa (cubre el viewport), fondo inerte                       | Mobile                  |
| P0-12 | Cerrar el diálogo con Esc y con ×: desaparece, el fondo deja de ser inerte y el foco vuelve al control que lo abrió        | Tablet, mobile          |
| P0-13 | Paso 1: sin motivo no avanza (alerta asociada al grupo); "No estoy seguro" es válido y explica qué prepara                 | Desktop                 |
| P0-14 | Paso 1: "Otro tratamiento" revela sus cuatro opciones y permite elegir una                                                 | Desktop                 |
| P0-15 | Paso 2: "Sin preferencia" por defecto; cambiar de área; Atrás / Continuar conservan motivo y preferencia                   | Desktop                 |
| P0-16 | Paso 3: los días sin cupo y hoy están deshabilitados; sin día, o con día y sin hora, no avanza; cambiar de día borra la hora | Desktop               |
| P0-17 | Paso 3 con reloj fijo: 35 días desde el lunes de la semana; hoy, pasados y domingos sin cupo; 18 días con cupo (21 días siguientes, lunes a sábado); sábado solo por la mañana | Desktop |
| P0-18 | Paso 4: envío vacío marca nombre y teléfono, foco en el primer inválido, `aria-invalid` y descripción accesible; teléfono corto; email, primera visita y comentario opcionales | Desktop, mobile |
| P0-19 | Confirmación: "Solicitud preparada." con el foco, día, hora, motivo y preferencia elegidos y el aviso "No se reservó una cita real ni se envió ningún dato." | Desktop, tablet, mobile |
| P0-20 | "No estoy seguro" se confirma como "Evaluación general" con "Sin preferencia"                                              | Desktop                 |
| P0-21 | Todo queda en el navegador: ninguna petición que no sea GET, ninguna petición a otro host, sin popups ni cambio de URL, sin enlaces `mailto:` / `tel:` / WhatsApp, almacenamiento y cookies sin cambios, y recargar empieza vacío | Desktop |
| P0-22 | "Nueva solicitud" limpia motivo, preferencia, día, hora y datos de contacto                                                | Desktop                 |
| P0-23 | Agendar desde una tarjeta después de una confirmación: solo queda el tratamiento nuevo; preferencia, fecha, hora y contacto anteriores no sobreviven | Desktop |
| P0-24 | Recorrido completo dentro del panel lateral; cerrar y reabrir conserva la solicitud en curso                               | Tablet                  |
| P0-25 | Recorrido completo en el flujo a pantalla completa, iniciado desde una tarjeta de tratamiento                              | Mobile                  |
| P0-26 | Sin scroll horizontal en mobile                                                                                            | Mobile                  |

26 escenarios P0, cubiertos por 23 tests (varios tests cubren más de un
escenario y algunos escenarios se comprueban en más de un viewport).

## P1 — QA final; no automatizado todavía

| ID    | Escenario                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| P1-01 | Navegación interna del header: cada enlace lleva a su sección                                               |
| P1-02 | Menú mobile / tablet: abre, el foco va al primer enlace, Esc lo cierra y devuelve el foco, un enlace lo cierra |
| P1-03 | Abrir la agenda desde el menú desplegable: el menú se cierra y, al cerrar el diálogo, el foco vuelve a un control visible |
| P1-04 | Tablet: tocar el fondo cierra el panel lateral; en mobile no hay fondo que tocar                            |
| P1-05 | Barra flotante mobile: oculta arriba, visible en tratamientos y primera visita, oculta en la agenda, la transición de DevSure y el footer |
| P1-06 | Cambiar de tratamiento a mitad del flujo: cambia el motivo y conserva horario y contacto                    |
| P1-07 | Cambiar de motivo en el paso 1 quita la marca "En tu solicitud" y el detalle de "Otro tratamiento"          |
| P1-08 | Campos opcionales: email, primera visita (Sí / No, se puede desmarcar) y comentario no bloquean ni aparecen como error |
| P1-09 | Secuencia de foco: título del paso al avanzar y retroceder; orden de tabulación dentro del diálogo          |
| P1-10 | Anuncios para lector de pantalla (`aria-live`): cambio de paso, motivo, fecha, hora y confirmación          |
| P1-11 | Movimiento reducido: sin animaciones ni transiciones; el scroll hacia la agenda es inmediato                |
| P1-12 | Pasar de <1024 px a ≥1024 px con el diálogo abierto: se cierra, se libera el scroll y vuelve el foco (C-3)   |
| P1-13 | "Próximos horarios" del hero coincide con el primer día y horas libres del calendario                       |
| P1-14 | Secciones estáticas: especialidades, primera visita, cómo trabajamos, ubicación y contacto demostrativos    |
| P1-15 | Acceso directo a un ancla (`/portfolio/clinica-dental#agenda`, `#tratamientos`)                              |
| P1-16 | Scroll bloqueado detrás del diálogo y restaurado al cerrar                                                   |
| P1-17 | Teclado en los radios nativos: flechas cambian la opción, Espacio selecciona                                 |

## P2 — casos límite y calidad

| ID    | Escenario                                                                                              |
| ----- | ------------------------------------------------------------------------------------------------------ |
| P2-01 | Página abierta al cruzar la medianoche: el calendario queda desfasado (C-5, known issue aceptado)      |
| P2-02 | Calendario en cambio de mes y de año: título del rango y etiqueta de mes en el día 1                   |
| P2-03 | Anchos poco comunes: 320, 375, 600, 1023, 1024 y 1100 px                                               |
| P2-04 | Fuente de reserva: el titular conserva sus líneas con y sin Fraunces (anchos límite 531–532, 1130, 1328) |
| P2-05 | Abrir y cerrar el diálogo repetidas veces; avanzar y retroceder pasos rápidamente                       |
| P2-06 | Botón Atrás del navegador con el diálogo abierto (hoy sale de la página; no cierra el diálogo)          |
| P2-07 | Detalles visuales: arcos, ticket, marcadores de fotografía A-01 / A-02                                  |
| P2-08 | Zona horaria y cambio de hora: el día local del visitante decide "hoy"                                  |
| P2-09 | Teléfono con formatos variados (espacios, guiones, prefijo +591)                                        |
| P2-10 | Otros navegadores: Firefox, Safari / iOS, Android                                                       |

## Invariantes del reducer

Observación (SCRUM-110): `appointmentReducer` acepta `pickDate` con una fecha sin
cupo si se le despacha directamente. La interfaz nunca lo hace: esos días son
botones deshabilitados (P0-16, P0-17).

Opciones:

- **A — endurecer el reducer**: `pickDate` ignora una fecha que no tiene cupo.
- **B — dejarlo como invariante de la interfaz**.

Evaluación:

- `pickTime` ya protege su invariante (rechaza una hora sin día o una hora
  ocupada). `pickDate` es la única acción de selección que confía en la
  interfaz, así que hoy el modelo es incoherente consigo mismo.
- El cupo depende de "hoy" y el reducer es puro: no puede leer el reloj. La
  acción tendría que llevar el día de referencia
  (`{ type: 'pickDate', date, today }`) y la regla "tiene cupo" saldría de
  `buildCalendar` a una función exportada (`isDateBookable(date, today)`) que
  usarían tanto el calendario como el reducer. Son unas 10 líneas y un cambio en
  la firma de una acción; sin dependencias nuevas ni cambios visibles.
- Lo que se gana: el paso 3 no puede dejar pasar un domingo, un día pasado o
  una fecha fuera de la ventana aunque un componente futuro despache mal, y la
  regla de cupo queda en un solo sitio.
- Lo que no resuelve: el desfase de medianoche (C-5), porque `today` seguiría
  siendo el del montaje.
- Riesgo de no hacerlo: bajo. No hay reserva real y solo un error de
  programación llega a ese estado.

Decisión: **A**, aprobada e implementada en SCRUM-121. `isDateBookable(date,
today)` es la única regla de cupo, la usan `buildCalendar` y el reducer, y
`pickDate` lleva `today` en la acción. P0-16 y P0-17 siguen valiendo sin
cambios (prueban la interfaz); la regla y el rechazo en el reducer se prueban
en `apps/web/tests/appointment-reducer.test.mjs` (unit, `pnpm test`). C-5 no
cambia.

## Resultado

Ver `docs/ai/HANDOFF.md` para la última ejecución.
