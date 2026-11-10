# Design Handoff — Clínica Dental / Lúmina Dental

**Status:** PROPOSED — pendiente de revisión de diseño. No implementar hasta su aprobación.
**Jira:** SCRUM-21 (DEMO-02) · SCRUM-91 (DEMO-02.1, exploración de diseño)
**Route:** `/portfolio/clinica-dental` · **Classification:** CONCEPT DEMO · **Level:** 2
**Fuentes:** `DEVSURE-PROJECT-SHOWCASE-SYSTEM.md`, `DEVSURE-CONCEPT-DEMO-CATALOG.md`,
`PROJECT-DESIGN-BRIEF-CLINICA-DENTAL.md`, `CLAUDE-DESIGN-PROMPT-CLINICA-DENTAL.md`
**Lienzo de diseño:** https://claude.ai/artifact/SEXE231VQWjZ6FrsHi858k (privado del autor)

El lienzo contiene siete artboards:

| Artboard | Qué muestra |
| --- | --- |
| Escritorio 1440 — página completa | Las 12 secciones; la agenda funciona |
| Tablet 834 | Página con la agenda abierta en panel lateral |
| Mobile 390 — página | Página completa con barra fija al pie |
| Agenda — componente interactivo | La agenda sola, operable |
| Agenda — estados (escritorio) | 9 estados lado a lado |
| Agenda — flujo mobile | Menú abierto y los 5 momentos del flujo a pantalla completa |
| Sistema visual | Color, tipografía, lenguaje gráfico, controles y estados |

Este documento es solo diseño. No se escribió código de producción ni se tocó Nexo Obra.

---

## 01 Design Concept

**Editorial clínico en calma.** La página se lee como una publicación cuidada —titulares
serif grandes, mucho aire, líneas finas— y en el centro tiene un producto: la agenda.

Dos ideas sostienen el diseño:

1. **El arco.** La arcada dental, reducida a una curva, es el único motivo gráfico: es el
   símbolo de la marca, la máscara de las fotografías y las líneas de fondo del hero. Evita
   muelas, cruces y ondas.
2. **La agenda como pieza central, no como formulario final.** Ocupa una sección propia a
   mitad de página, se alimenta desde las tarjetas de tratamiento y muestra en todo momento
   un resumen de lo elegido.

Se diferencia de Nexo Obra en todo lo visible: serif humana frente a condensada industrial,
marfil y pino frente a amarillo y grafito, radios amplios frente a aristas, y una agenda por
pasos frente a un catálogo con cotizador.

## 02 Visual System

**Color**

| Nombre | Hex | Uso |
| --- | --- | --- |
| Marfil | `#F6F3EC` | Fondo de página |
| Papel | `#FCFBF8` | Bandas alternas, cabecera y pie de la agenda |
| Blanco | `#FFFFFF` | Superficies (agenda, tarjetas flotantes) |
| Pino | `#123D3A` | Marca, titulares, botón primario, sección "Cómo trabajamos" |
| Menta | `#CFE6DD` · suave `#E7F1EC` | Fondo de la sección de agenda, opción elegida, etiquetas |
| Grafito | `#1F2423` | Texto |
| Apoyo | `#55605C` · `#3C4643` | Texto secundario (≥ 5,9:1 sobre marfil) |
| Línea | `#DDD8CC` · fuerte `#B9B3A4` | Divisores y bordes de control |
| Cobalto | `#2F55D4` | **Solo** selección de día/hora y anillo de foco |
| Aviso | `#8A2A18` sobre `#F8E9E4` | Validación |

Cobalto no se usa para botones ni enlaces de navegación: así "elegido" siempre significa lo
mismo. La sección final de DevSure usa la identidad de DevSure (`#070B14`, `#3DD9C5`,
Plus Jakarta Sans), igual que en Nexo Obra.

**Tipografía**

- **Fraunces** 400 (cursiva solo para una palabra de énfasis): titulares de 34 a 84 px,
  interlineado 1,02–1,15, tracking −0,015 a −0,02 em.
- **Figtree** 400/500/600/700: toda la interfaz. Párrafos 17–19 px; controles 15–16 px en
  600; etiquetas 13 px, 600, 0,12 em; cifras tabulares en fechas y horas.

**Forma:** radios de 12 px (controles), 14 px (opciones), 22–28 px (tarjetas y paneles),
píldora en botones. Fotografías con máscara de arco (radio superior = mitad del ancho).

**Lenguaje gráfico:** arco, retícula clínica de 1 px muy tenue, marcadores de cita (puntos y
trazo discontinuo).

## 03 Information Architecture

Orden aprobado para escritorio (ids entre paréntesis):

```text
01 Franja Concept Demo
02 Header y navegación
03 Hero (#inicio)
04 Capa de confianza
05 Tratamientos (#tratamientos)
06 Agenda de cita (#agenda)
07 Especialidades (#especialidades)
08 Primera visita (#primera-visita)
09 Cómo trabajamos (#como-trabajamos)
10 Ubicación y contacto (#ubicacion)
11 Transición a DevSure
12 Footer
```

Navegación: Tratamientos · Cómo trabajamos · Especialidades · Primera visita · Contacto ·
**[Agendar cita]**. El id de contacto es `#ubicacion`, no `#contacto`, para no coincidir con
el ancla de la home de DevSure.

## 04 Section-by-Section Design

**01 Franja.** Banda pino de 40 px: "← Portfolio DevSure" · "CONCEPT DEMO — Lúmina Dental es
una marca ficticia diseñada por DevSure" · "Contenido y horarios demostrativos". En tablet:
"CONCEPT DEMO · marca ficticia"; en mobile: "CONCEPT DEMO · ficticio".

**02 Header.** Símbolo + "Lúmina Dental / CLÍNICA ODONTOLÓGICA", cinco enlaces y botón
"Agendar cita". No es fijo en escritorio. En tablet y mobile los enlaces pasan a un menú.

**03 Hero.** Izquierda: etiqueta, titular "Tu sonrisa empieza con sentirte *en confianza.*",
texto de apoyo y dos acciones. Derecha: fotografía A-01 con máscara de arco y, superpuesta,
una tarjeta "Próximos horarios" (tres días, tres horas, enlace "Elegir mi horario") que
anticipa la agenda. Detrás, dos arcos de línea.

**04 Confianza.** Cuatro atributos con icono de trazo: atención personalizada, horarios
organizados, tratamientos explicados con claridad, solicitud de cita en línea. Sin cifras.

**05 Tratamientos.** Ocho tarjetas (4 × 2): número, nombre, explicación, "Suele indicarse
para", "Duración orientativa (demo)" y "Agendar". Al pulsar "Agendar" la tarjeta queda
marcada ("En tu solicitud") y la agenda arranca con ese motivo. Nota al pie: categorías
demostrativas, sin diagnóstico ni consejo médico.

**06 Agenda.** Ver sección 05.

**07 Especialidades.** Tabla editorial de cuatro áreas: qué atiende y cuándo suele
intervenir. No hay perfiles de personas ni credenciales.

**08 Primera visita.** "Tu primera visita, sin incertidumbre." Cuatro pasos unidos por un
arco discontinuo.

**09 Cómo trabajamos.** Banda pino: "Claridad antes de cualquier procedimiento.", fotografía
A-02 con arco invertido y cuatro principios.

**10 Ubicación y contacto.** Datos demostrativos (Clínica Demo, Santa Cruz, horario demo,
canal no conectado) y mapa ilustrativo sin dirección real.

**11 DevSure.** "A DEVSURE CONCEPT DEMO" · "¿Tu clínica necesita una experiencia digital más
clara?" · "Hablemos de tu proyecto" → `/#contacto` · "Ver otros concept demos" → `/portfolio`.

**12 Footer.** Marca ficticia · "Un Concept Demo de DevSure" · "Volver a Portfolio" · aviso.

## 05 Appointment Booking UX

**Cuatro pasos visibles** que cubren los seis del brief:

| Paso en pantalla | Pasos del brief |
| --- | --- |
| 1 Motivo | 1 — Motivo / tratamiento |
| 2 Preferencia | 2 — Preferencia de profesional |
| 3 Día y hora | 3 — Fecha y 4 — Hora (misma pantalla) |
| 4 Tus datos | 5 — Datos del paciente |
| Confirmación | 6 — Confirmación demo |

> **Decisión que necesita aprobación:** día y hora comparten paso. Elegir el día revela sus
> horas al lado (debajo en mobile); son una sola decisión y separarlas añade un clic sin
> aportar claridad.

**Paso 1 — Motivo.** Siete opciones: Evaluación general, Limpieza y prevención, Dolor o
molestia, Ortodoncia, Estética dental, Otro tratamiento y **No estoy seguro**.

- "Otro tratamiento" despliega cuatro opciones opcionales: Restauraciones, Endodoncia,
  Implantes, Odontopediatría. Las tarjetas de esos cuatro tratamientos llegan aquí ya
  marcadas.
- "No estoy seguro" es válido: muestra una nota que explica que se prepara una evaluación
  general.
- Continuar sin elegir muestra: "Elige un motivo para continuar. Si no estás seguro, marca
  «No estoy seguro»."

**Paso 2 — Preferencia.** Radios: Sin preferencia (marcado por defecto), Odontología
general, Ortodoncia, Endodoncia, Odontopediatría. Nunca bloquea.

**Paso 3 — Día y hora.** Calendario mensual (lunes a domingo) y lista de horas.

- Estados de día: disponible, elegido (cobalto), hoy (borde pino, no reservable), sin cupo
  (atenuado y deshabilitado).
- Horas: 09:00, 10:30, 12:00, 15:00, 16:30, 18:00. Sábados solo mañana. Algunas aparecen
  tachadas como ocupadas.
- Sin día elegido, el área de horas dice "Elige primero un día para ver sus horarios."
- Cambiar de día borra la hora.
- Avisos: "Elige un día y una hora para continuar." / "Elige una hora disponible para ese día."

**Paso 4 — Datos.** Nombre y Teléfono / WhatsApp (obligatorios); Email, "¿Es tu primera
visita?" (Sí / No, se puede dejar sin marcar) y Comentario (opcionales). Bajo el comentario:
"No incluyas diagnósticos ni datos médicos." Validación: nombre no vacío; teléfono con al
menos 7 dígitos.

**Confirmación.** "Solicitud preparada." · resumen (motivo, preferencia, día, hora) · texto
sobre integración posible · "DEMO · No se reservó una cita real ni se envió ningún dato." ·
"Nueva solicitud" reinicia todo.

**Resumen permanente.** En escritorio, columna "Tu solicitud" a la derecha del panel. En
panel lateral y mobile, una línea sobre el pie ("Dolor o molestia · Odontología general ·
Miércoles 14 de octubre · 15:00").

**Estados diseñados:** agenda cerrada (página mobile con barra fija), abierta, motivo sin
elegir, aviso por falta de motivo, "No estoy seguro", preferencia, día elegido, día y hora
elegidos, error de validación, datos válidos, confirmación, reinicio, tablet, mobile, menú
abierto.

## 06 Responsive Strategy

| | Escritorio ≥ 1024 | Tablet 600–1023 | Mobile < 600 |
| --- | --- | --- | --- |
| Agenda | En línea, dentro de la sección `#agenda`; panel con resumen lateral | Panel lateral derecho de 480 px sobre fondo atenuado | **Pantalla completa**, un paso por pantalla |
| Disparador | "Agendar cita" lleva el foco a la sección | "Agendar cita" abre el panel | Barra fija al pie con "Agendar cita" |
| Tratamientos | Rejilla 4 × 2 | Rejilla 2 × 4 | Acordeón; el primero abierto |
| Especialidades | Tabla | Tabla | Lista apilada |
| Primera visita | 4 columnas con arco | 2 × 2 | Línea de tiempo vertical |
| Navegación | Enlaces visibles | Menú | Menú a pantalla completa |

Mobile usa pantalla completa y no hoja inferior: el calendario necesita celdas de 46 px, el
teclado ocupa media pantalla en el paso de datos y un único "Atrás / Continuar" fijo al pie
es más claro que una hoja con scroll interno.

En mobile la sección `#agenda` no incrusta el panel: muestra los cuatro pasos y un botón
"Empezar". La barra fija se oculta mientras la agenda está abierta.

## 07 Motion / Interaction

Nivel sutil. Solo CSS; sin GSAP ni Three.js.

| Elemento | Movimiento | Duración · curva |
| --- | --- | --- |
| Titular del hero | Entrada por líneas, 12 px hacia arriba + opacidad | 500 ms · ease-out, 60 ms entre líneas |
| Secciones | Opacidad + 16 px al entrar en pantalla, una vez | 400 ms · ease-out |
| Cambio de paso | Sale 120 ms (opacidad); entra 220 ms (opacidad + 8 px desde el lado de avance) | ease-out |
| Día / hora elegidos | Cambio de color, sin escala | 120 ms |
| Tarjeta "En tu solicitud" | Aparece la etiqueta | 160 ms |
| Panel lateral (tablet) | Desliza desde la derecha; fondo en opacidad | 260 ms · ease-out |
| Pantalla completa (mobile) | Sube desde abajo | 280 ms · ease-out |
| Botones | Sin desplazamiento; cambio de fondo al pasar el cursor | 120 ms |

Con `prefers-reduced-motion: reduce` todas las animaciones y transiciones se anulan y el
scroll deja de ser suave. Nada se mueve de forma continua.

**Hover (no visible en el lienzo):** botón primario `#1D5550`; botón de borde, fondo
`#E7F1EC`; opción y día disponibles, borde `#123D3A`; enlaces de navegación, subrayado.

## 08 Accessibility

- Un `h1`; `h2` por sección; `h3` en tarjetas y pasos. Landmarks: `header`, `nav`, `main`,
  `footer`. Skip link "Saltar al contenido".
- Foco visible: anillo cobalto de 3 px con 3 px de separación en todos los controles.
- Objetivos táctiles ≥ 44 px (días 46, horas 48, opciones 60–64, botones 50–58).
- La selección se comunica con borde, fondo y símbolo, no solo con color.
- **Motivo, día, hora y primera visita:** botones con `aria-pressed`. **Preferencia:**
  `radiogroup` con flechas. Días sin cupo: `disabled` y nombre accesible con el motivo
  ("Lunes 12 de octubre, hoy, sin cupo").
- Cada día se anuncia con su fecha completa ("Martes 13 de octubre").
- **Diálogo (tablet y mobile):** `role="dialog"`, `aria-modal`, etiquetado por su título;
  foco atrapado, fondo `inert`, sin scroll de fondo; Esc cierra; el foco vuelve al control
  que abrió. En tablet el fondo cierra; en mobile no.
- **Foco al cambiar de paso:** va al título del paso (`tabindex="-1"`). En la confirmación,
  a "Solicitud preparada.". En escritorio, "Agendar cita" y las tarjetas llevan el foco al
  título de la sección.
- **Validación:** `aria-invalid` y `aria-describedby` en los campos; el foco va al primer
  campo inválido. Los avisos de los pasos 1 y 3 usan `role="alert"`.
- **Región viva** (`role="status"`, `aria-live="polite"`): anuncia motivo, día, hora, cambio
  de paso y resultado.
- Los mensajes de error explican qué falta, con tono neutro.

## 09 Asset Requirements

Dirección de arte final. No se generaron imágenes; en el lienzo son marcadores con su ID.

### A-01 — Hero (obligatorio)

- **Sujeto:** interior de una sala de atención dental de gama alta. Sillón y lámpara en
  segundo plano, superficies despejadas. Sin personas posando; como máximo, una figura de
  espaldas o parcial preparando la sala.
- **Luz:** natural, lateral (ventana a la izquierda del encuadre), de mañana, con sombras
  suaves que crucen pared y suelo.
- **Materiales y color:** marfil cálido, madera clara, vidrio esmerilado, metal satinado;
  acentos verdes apagados. Evitar azul clínico, blanco quemado y fluorescentes.
- **Carácter:** limpio pero habitado (una toalla doblada, una planta, una bandeja). Debe
  evitar el aspecto de banco de imágenes: sin sonrisas a cámara ni batas en primer plano.
- **Composición:** el tercio inferior debe ser tranquilo (suelo o mobiliario bajo), porque
  queda junto al módulo de horarios. Punto focal en el tercio superior central.
- **Máster:** vertical 4:5, mínimo **3200 × 4000 px**.

| Dispositivo | Caja | Proporción | Recorte |
| --- | --- | --- | --- |
| Escritorio 1440 | 560 × 500, arco superior de radio 280 | 28:25 | Franja superior-central del máster; foco al 40 % de la altura |
| Tablet 834 | 770 × 380, arco superior | ≈ 2:1 | Franja horizontal central; foco al 45 % |
| Mobile 390 | 334 × 260, arco superior | ≈ 9:7 | Igual que escritorio, más cerrado |

### A-02 — Cómo trabajamos y Primera visita (obligatorio)

- **Sujeto:** manos preparando instrumental o materiales sobre una bandeja. Detalle macro
  editorial; no hace falta ningún rostro.
- **Luz:** clínica suave, difusa, cenital con relleno lateral. Sin reflejos duros en el metal.
- **Carácter:** fotografía de producto de gama alta: poca profundidad de campo, fondo
  marfil o verde apagado, guantes de color neutro.
- **Composición:** manos y bandeja en el centro, con aire alrededor para recortar.
- **Máster:** vertical 5:6, mínimo **3000 × 3600 px**.

| Uso | Caja | Proporción | Recorte |
| --- | --- | --- | --- |
| Cómo trabajamos — escritorio | 520 × 600, arco inferior de radio 260 | 13:15 | Máster casi completo; foco al centro |
| Cómo trabajamos — tablet | 770 × 430 | ≈ 16:9 | Franja central |
| Cómo trabajamos — mobile | 358 × 240, arco inferior | 3:2 | Franja central |
| Primera visita — escritorio | 300 × 340, arco superior | ≈ 15:17 | Fragmento cerrado sobre la bandeja |
| Primera visita — tablet y mobile | No se muestra | — | — |

### A-03 — Open Graph (opcional)

1200 × 630. Composición con marca y arco sobre marfil; sin fotografía obligatoria.

### A-04 — Card de Portfolio

Composición HTML/CSS en la skin de Lúmina, como la card de Nexo Obra. Sin fotografía.

Reglas comunes: sin resultados clínicos, sin antes/después, sin logotipos reales. Ambas se
encargan en vertical; `sizes` debe describir la caja real para no ampliar la imagen
(hallazgo H-3 de Nexo Obra).

## 10 Implementation Handoff

**Arquitectura (reutiliza la validada):** `features/showcase/clinica-dental/` con su CSS
module bajo una clase raíz, fuentes `next/font` propias y estado en un reducer puro. En
`showcase-catalog.ts`, `clinica-dental` pasa a `published` con `projectName: 'Lúmina Dental'`
y se registra en `showcase-registry.tsx`. El middleware y `SiteChrome` ya resuelven 404 y
chrome a partir del catálogo; el CTA a `/#contacto` usa el componente de ancla existente.

**Comportamiento por breakpoint:** tabla de la sección 06.

**Agenda — estado sugerido:** `step` (1–4), `done`, `reason`, `other`, `pro` (`none` por
defecto), `date`, `time`, `form`, `errors`, `overlayOpen`. Arranca vacía; sin persistencia,
sin `fetch`, sin almacenamiento.

**Fechas.** El lienzo usa octubre de 2026 con "hoy" fijo en el día 12. En código deben
calcularse desde la fecha actual: mes en curso, días pasados y "hoy" sin cupo, y un patrón
determinista de disponibilidad (por ejemplo, laborables y sábados por la mañana de las dos
semanas siguientes). El patrón debe ser estable para que los tests no dependan del día.

**Foco, validación, movimiento y movimiento reducido:** secciones 07 y 08.

**Lecciones de Nexo Obra que aplican aquí**

- Fraunces es una serif ancha: declarar una fuente de reserva con `size-adjust` medido para
  los titulares, y comprobar CLS en 320, 375 y 390 px (H-1).
- Medir contraste de todas las etiquetas pequeñas (H-2).
- `sizes` de A-01 y A-02 debe reflejar que la caja es vertical (H-3).
- Controles ≥ 44 px desde el inicio (H-6).
- Tests E2E contra build de producción además de `next dev` (H-7).

**Contenido de usuario:** todos los textos del lienzo son finales, en español. Los datos de
tratamientos, áreas, pasos y principios están en el artboard de escritorio.

**Anotaciones solo de diseño — no implementar**

- Los marcadores "A-01 · Fotografía pendiente", "A-02 · …" y sus leyendas.
- Los rótulos de los artboards de estados y de flujo mobile.
- El texto "Barra fija al pie mientras se recorre la página" de la página mobile.
- La palabra "DEMO" junto al indicador de pasos puede conservarse; es divulgación.

**No implementar:** backend de citas, cuentas, historial o datos médicos, pagos, seguros,
envío real por WhatsApp o correo, integración de calendario, panel de administración, base de
datos, chatbot, verificador de síntomas, subida de imágenes.

**Fuera de alcance de este diseño:** la home de DevSure, el índice `/portfolio` (salvo
publicar la card) y Nexo Obra.

## 11 Final Design Rationale

| Criterio | Respuesta |
| --- | --- |
| ¿Se reconoce como clínica dental? | Sí: marca, titular, tratamientos y agenda; el arco alude a la arcada sin recurrir a muelas. |
| ¿Calmo y profesional, no genérico? | Marfil, pino y serif editorial en lugar de azul clínico y degradados. |
| ¿La agenda es la experiencia central? | Sección propia a mitad de página, anticipada en el hero y alimentada por las tarjetas. |
| ¿Mobile diseñado a propósito? | Acordeón, barra fija y agenda a pantalla completa. |
| ¿Todos los estados cubiertos? | 9 en escritorio, 5 en mobile, tablet y menú abierto. |
| ¿Sin datos médicos sensibles? | Solo nombre y teléfono obligatorios; aviso expreso en el comentario. |
| ¿Concept Demo divulgado? | Franja, etiqueta del hero, notas en tratamientos y agenda, confirmación, footer. |
| ¿Sin credibilidad médica falsa? | Sin cifras, testimonios, premios ni perfiles de profesionales. |
| ¿Distinto de Nexo Obra? | Tipografía, color, forma, ritmo e interacción central diferentes. |
| ¿Implementable? | Solo CSS y estado de cliente; reutiliza rutas, catálogo, middleware y ancla. |
| ¿Transición natural a DevSure? | Misma pieza final que Nexo Obra, con el titular del brief. |

**Pendiente de decisión del propietario**

1. Día y hora en un solo paso (sección 05).
2. Agenda mobile a pantalla completa en lugar de hoja inferior.
3. Fraunces + Figtree como par tipográfico.
4. Especialidades sin perfiles de personas.

**Límite de esta entrega:** el lienzo se construyó sin revisarlo renderizado. Antes de
aprobar conviene recorrer los siete artboards y probar la agenda en el de escritorio.

---

## 12 Refinement Delta (segunda pasada)

Refinamiento visual sobre la dirección aprobada. No cambian marca, paleta, tipografía, flujo
de la agenda, arquitectura de información, divulgación Concept Demo ni requisitos de
accesibilidad. Donde esta sección contradiga las secciones 04 a 07, manda esta sección.

**Hero.** Fotografía, agenda, tipografía y arco pasan a ser una sola pieza: una "ventana" de
560 px con el arco arriba (A-01) y el módulo "Próximos horarios" acoplado como su base, con
un botón circular hacia la agenda. Dos arcos concéntricos de línea rodean la ventana y
llevan marcadores de cita (un punto cobalto con la etiqueta "10:30"). El titular sube a
56–100 px. El header pierde su línea inferior para que hero y header se lean juntos.

**Tratamientos.** Deja de ser una rejilla uniforme:

- *Destacado principal* (7 de 12 columnas): "Evaluación general" sobre pino, con arcos de
  línea, esquina inferior izquierda de radio 220 px y botón menta.
- *Dos destacados secundarios* (5 columnas, apilados): "Limpieza y prevención" (menta) y
  "Ortodoncia" (blanco con borde).
- *"También en la clínica":* las otras cinco áreas como índice editorial (número, nombre,
  descripción, duración y botón circular).
- La tarjeta elegida muestra "En tu solicitud" y un anillo cobalto de 3 px.

**Agenda.**

- La sección pasa a fondo **pino**, con esquinas superiores de 72 px y arcos de línea; el
  panel blanco flota con sombra. Es el único bloque oscuro antes de DevSure.
- Cabecera del panel: numeral grande del paso activo ("02"), "PASO 2 DE 4" y nombre del paso.
  El riel de pasos agranda el paso activo (36 px con halo menta) y marca los completados.
- Opción elegida (motivo, preferencia, primera visita): relleno pino con texto blanco.
- Día y hora elegidos: cobalto con halo de 4 px; días y horas pasan a forma de píldora. Con
  ambos elegidos aparece una línea de confirmación ("Martes 13 de octubre · 10:30").
- "Tu solicitud" es un **ticket** pino con arco superior: día en numeral grande cuando ya hay
  fecha, y motivo y preferencia debajo.
- Confirmación: ticket con arco (día, hora, motivo, preferencia) junto a "Solicitud
  preparada." y el aviso DEMO.
- La columna izquierda muestra "ELEGIDO EN TRATAMIENTOS · <nombre>" cuando se llega desde
  una tarjeta.
- Cambio de paso: el contenido entra con opacidad y 10 px de desplazamiento, 240 ms,
  `cubic-bezier(0.2, 0.7, 0.2, 1)`; la confirmación, 320 ms. Anulado con movimiento reducido.

**Especialidades.** La tabla se sustituye por cuatro columnas con arco superior (radio 170 px),
escalonadas 36 px cada una, con numeral grande, nombre, qué atiende y "cuándo interviene".
Cuatro tratamientos: contorno, menta, blanco y pino. En mobile es un carrusel horizontal con
ajuste por tarjeta. Semánticamente es una lista ordenada, no una tabla.

**Primera visita.** Composición vertical progresiva: título y fragmento de A-02 fijos a la
izquierda; a la derecha, cuatro pasos con numerales de 150 px en menta, una línea
discontinua con marcadores y sangría creciente de 48 px por paso.

**Cómo trabajamos.** Pasa a fondo marfil (la agenda ya es el bloque pino). Titular de hasta
76 px con "antes" en cursiva; A-02 a la derecha con arco inferior.

**Ubicación y contacto.** Bloque menta de esquinas de 40 px. El mapa se sustituye por una
ilustración propia: arcos concéntricos desde un punto cobalto, con etiquetas "5 min",
"10 min" y "15 min" marcadas como tiempos a pie demostrativos. El horario se dibuja como
siete barras (lunes a domingo) con su texto debajo y una descripción accesible.

**Transición a DevSure.** Se elimina la lista "Lo que acabas de usar". Queda etiqueta,
titular de hasta 84 px, texto, dos acciones y, bajo una línea, tres frases: Entender,
Diseñar, Construir. Esquinas superiores de 72 px y arcos de línea en el tono de DevSure. El
footer pasa a fondo oscuro para leerse como una sola pieza con la transición.

**Mobile.**

- Hero con la misma ventana (arco + horarios) y un solo botón primario.
- Tratamientos: destacado pino, dos tarjetas a media anchura y el índice de cinco filas.
- **Barra "Agendar cita":** píldora flotante blanca, a 12 px de los bordes, 64 px de alto,
  con "PRÓXIMO CUPO · DEMO" y el botón.
  - Aparece cuando el botón del hero sale de pantalla.
  - Se oculta mientras la sección "Agenda en línea" está visible.
  - Se oculta al llegar a la transición de DevSure y al footer.
  - No se muestra con la agenda o el menú abiertos.
  - La página reserva 88 px más el área segura al pie para que nunca tape contenido.

**Tablet.** Hero con la ventana a todo el ancho (arco de radio 385 px) y los horarios como
base; el resto, sin cambios.

**Estados finales de la agenda:** los nueve del artboard "Agenda — estados finales
(escritorio)" y los cinco de "Agenda — flujo mobile".

**Notas para implementación**

- La barra flotante necesita observar tres elementos (botón del hero, sección de agenda,
  transición de DevSure) con `IntersectionObserver`; sin temporizadores.
- El carrusel de especialidades en mobile debe ser recorrible con teclado y no bloquear el
  scroll vertical.
- Los tiempos a pie de la ilustración son contenido demostrativo y deben seguir rotulados
  como tales.
- Las fechas siguen calculándose desde la fecha actual (sección 10).

**Límite:** esta pasada tampoco se revisó renderizada. El artboard "Sistema visual" no se
actualizó: sus muestras de opción elegida y de día/hora siguen con el tratamiento de la
primera versión.
