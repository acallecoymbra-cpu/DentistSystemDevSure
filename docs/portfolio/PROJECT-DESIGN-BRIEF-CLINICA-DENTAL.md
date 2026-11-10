# Project Design Brief — Clínica Dental / Lúmina Dental

**Status:** READY FOR DESIGN — PROPOSED  
**System:** DevSure Project Showcase System  
**Classification:** CONCEPT DEMO  
**Showcase Archetype:** TYPE-A — SERVICE / BUSINESS  
**Functional Level:** LEVEL 2 — Interactive Functional Demo  
**Route:** `/portfolio/clinica-dental`  
**Client:** N/A — Fictional Concept  
**Jira Parent:** `SCRUM-21 — DEMO-02 — Clínica Dental`

---

# 1. Purpose

Crear una demostración de cómo DevSure podría diseñar una experiencia digital moderna para una clínica dental.

La experiencia debe demostrar que DevSure entiende un flujo real del rubro:

```text
entender el tratamiento
↓
elegir el tipo de atención
↓
seleccionar fecha y hora
↓
indicar datos de contacto
↓
preparar una solicitud de cita
```

La página no debe sentirse como una landing genérica de salud ni como un SaaS.

Debe sentirse como una **experiencia clínica digital clara, tranquila, profesional y humana**.

---

# 2. Fictional Brand

```text
LÚMINA DENTAL
Clínica Odontológica
```

Brand status:

```text
FICTIONAL BRAND
CONCEPT DEMO
```

Personalidad:

```text
Calm
Professional
Human
Precise
Clean
Contemporary
Warm
Trustworthy
```

Evitar:

```text
hospital coldness
generic blue healthcare template
luxury spa aesthetic
fake medical authority
aggressive sales language
```

---

# 3. Audience

## Paciente nuevo

Quiere entender:

- qué tratamientos existen;
- cuál podría ser el siguiente paso;
- cómo agendar;
- qué esperar en la primera visita.

## Paciente recurrente

Quiere:

- solicitar una nueva cita;
- escoger fecha/hora;
- ubicar rápidamente servicios y contacto.

## Padre / madre / responsable

Puede buscar atención odontológica para otra persona y necesita un proceso claro y simple.

---

# 4. Primary Digital Experience

# Appointment Booking

```text
TREATMENT / REASON
↓
PROFESSIONAL PREFERENCE
↓
DATE
↓
TIME
↓
PATIENT DETAILS
↓
DEMO CONFIRMATION
```

Este flujo debe ser el principal diferenciador funcional del showcase.

No debe ser un formulario largo incrustado al final de la página.

Debe sentirse como un producto digital integrado a la experiencia de la clínica.

---

# 5. DevSure Capability Demonstrated

```text
Service Catalog
Treatment Discovery
Appointment Scheduling UX
Date / Time Selection
Professional Preference
Responsive Forms
Accessible Dialog / Step Flow
Client-side State
Validation
Confirmation States
Mobile-first Booking Experience
```

---

# 6. Core Business Problem

Un paciente que visita una clínica dental digitalmente suele necesitar responder varias preguntas antes de contactar:

```text
¿Qué atienden?
¿Esto parece adecuado para mi necesidad?
¿Cómo solicito una cita?
¿Qué horarios puedo elegir?
¿Tengo que llamar?
¿Qué información debo enviar?
```

El demo debe reducir esa incertidumbre.

---

# 7. Hero

Eyebrow:

```text
CONCEPT DEMO · CLÍNICA DENTAL
```

Brand:

```text
LÚMINA DENTAL
Clínica Odontológica
```

Headline direction:

```text
Tu sonrisa empieza
con sentirte en confianza.
```

Supporting copy:

```text
Una experiencia odontológica clara desde el primer contacto.

Explora tratamientos, conoce cómo trabajamos y solicita una cita
desde cualquier dispositivo.
```

Primary CTA:

```text
Agendar una cita
```

Secondary CTA:

```text
Ver tratamientos
```

---

# 8. Hero Art Direction

Evitar:

```text
doctor smiling at camera
+
generic blue gradient
+
floating medical icons
```

Explorar una combinación de:

```text
CLINICAL SPACE
+
HUMAN DETAIL
+
DIGITAL APPOINTMENT UI
```

Potential ingredients:

```text
clean dental interior
soft daylight
dental tools shown abstractly / carefully
macro material detail
appointment calendar UI
time slots
treatment cards
subtle clinical geometry
```

El diseño debe transmitir precisión sin parecer frío.

---

# 9. Trust Layer

Usar atributos del servicio, no métricas falsas.

Ejemplo:

```text
Atención personalizada
Horarios organizados
Tratamientos explicados con claridad
Solicitud de cita en línea
```

No usar:

```text
"10.000 pacientes"
"98% satisfacción"
"20 años de experiencia"
"mejor clínica"
```

salvo que fueran datos reales, lo cual no aplica al Concept Demo.

---

# 10. Navigation

Conceptual:

```text
LÚMINA DENTAL

Tratamientos
Cómo trabajamos
Especialidades
Primera visita
Contacto

[Agendar cita]
```

Debe existir:

```text
← Portfolio DevSure
```

---

# 11. Treatment Categories

Diseñar un catálogo de servicios claro y calmado.

Propuesta inicial:

```text
Evaluación general
Limpieza y prevención
Restauraciones
Endodoncia
Ortodoncia
Estética dental
Implantes
Odontopediatría
```

Estos nombres son categorías demostrativas.

No convertir la página en consejo médico personalizado.

---

# 12. Treatment Card

Cada card puede contener:

```text
name
short explanation
typical purpose
duration range [demo]
appointment CTA
optional icon / image
```

No incluir:

```text
guaranteed outcomes
diagnosis
before/after fabricated results
medical claims not supported
```

---

# 13. Appointment Flow

## Step 1 — Motivo / tratamiento

User chooses:

```text
Evaluación general
Limpieza
Dolor / molestia
Ortodoncia
Estética
Otro
```

Un estado "No estoy seguro" debe ser válido.

---

## Step 2 — Professional Preference

Options:

```text
Sin preferencia
Odontología general
Ortodoncia
Endodoncia
Odontopediatría
```

No es necesario usar nombres reales de profesionales.

Si se usan perfiles ficticios, deben marcarse visualmente como contenido demostrativo o mantenerse claramente dentro de la marca ficticia.

---

## Step 3 — Date

Mostrar un selector de fechas de demo.

No necesita backend real.

Puede limitarse a días disponibles ficticios.

---

## Step 4 — Time

Ejemplo:

```text
09:00
10:30
12:00
15:00
16:30
18:00
```

Los horarios son demostrativos.

---

## Step 5 — Patient Details

Fields:

```text
Nombre
Teléfono / WhatsApp
Email [optional]
¿Es tu primera visita? [optional]
Comentario [optional]
```

No pedir información médica sensible en v1.

No pedir:

```text
diagnóstico
historial médico
medicación
documento de identidad
seguro
fotografías clínicas
```

---

## Step 6 — Demo Confirmation

Ejemplo:

```text
Solicitud preparada.

Evaluación general
Martes 13 de octubre
10:30

En una implementación real esta solicitud podría integrarse
con la agenda de la clínica, WhatsApp, CRM o sistema de gestión.
```

Debe indicarse:

```text
No se reservó una cita real.
```

---

# 14. Appointment States Required

```text
Booking closed
Booking open
Treatment selected
No treatment selected
No professional preference
Date selected
Time selected
Validation error
Patient details valid
Demo confirmation
Booking reset
Mobile booking sheet
```

---

# 15. Specialists / Areas

Puede existir una sección editorial para explicar áreas de atención.

Preferir:

```text
Especialidad
Qué atiende
Cuándo suele intervenir
```

en vez de perfiles llenos de credenciales ficticias.

Si Claude Design propone personas:

- usar identidad ficticia;
- no presentar títulos o experiencia como hechos reales;
- evitar testimonios falsos;
- evitar atribuir resultados clínicos.

---

# 16. First Visit

Sección:

```text
Tu primera visita,
sin incertidumbre.
```

Posible secuencia:

```text
01 — Cuéntanos qué necesitas
02 — Agenda un horario
03 — Realizamos una evaluación
04 — Recibes una explicación del siguiente paso
```

Mantenerlo descriptivo, no prometer resultados clínicos.

---

# 17. Clinic Experience / Differentiator

Dirección:

```text
Claridad antes de cualquier procedimiento.
```

Puede comunicar:

```text
explicación comprensible
planificación
acompañamiento
organización
experiencia digital
```

---

# 18. Demo Location

No usar dirección real.

Ejemplo:

```text
Clínica Demo
Santa Cruz, Bolivia
```

o:

```text
Ubicación demostrativa
```

No usar teléfono real.

---

# 19. Contact

Puede incluir:

```text
Horario demostrativo
Canal de contacto demostrativo
Mapa abstracto / ubicación demo
```

No debe parecer una clínica real operativa.

---

# 20. Final DevSure CTA

Transition label:

```text
A DEVSURE CONCEPT DEMO
```

Headline:

```text
¿Tu clínica necesita
una experiencia digital más clara?
```

Supporting:

```text
Diseñamos productos digitales alrededor de cómo realmente
trabaja tu equipo y de lo que tus pacientes necesitan hacer.
```

CTA:

```text
Hablemos de tu proyecto
```

Destination:

```text
/#contacto
```

Debe aprovechar el comportamiento de hash navigation ya validado por el piloto de Ferretería.

---

# 21. Footer

Include:

```text
LÚMINA DENTAL
Fictional Concept Brand

A DevSure Concept Demo

Volver a Portfolio
```

---

# 22. Required Sections

```text
01 Concept Demo disclosure
02 Header / navigation
03 Hero
04 Trust Layer
05 Treatments
06 Appointment Booking
07 Areas / Specialties
08 First Visit
09 Clinic Experience / Differentiator
10 Demo Location / Contact
11 DevSure CTA
12 Footer
```

Claude Design puede reorganizar visualmente la composición siempre que conserve el propósito.

---

# 23. Excluded Features

No implementar en v1:

```text
real appointment backend
patient accounts
medical records
diagnosis
telemedicine
payments
insurance validation
prescriptions
clinical image upload
real WhatsApp send
real calendar integration
admin panel
database
AI symptom checker
```

---

# 24. Visual Direction

Concept:

```text
CALM CLINICAL EDITORIAL
```

No copiar la estética industrial de Nexo Obra.

Possible palette direction:

```text
Warm Ivory
Deep Teal
Soft Mint
Graphite
Cobalt accent
```

Inspirational only:

```text
#F5F2EC
#123D3A
#CFE6DD
#202523
#3B68FF
```

Claude Design puede proponer otra paleta si mantiene:

```text
calm
professional
clean
human
distinctive
```

---

# 25. Typography

Direction:

```text
Editorial / human display face
+
highly readable sans-serif UI
```

Evitar tipografía excesivamente tecnológica.

La interfaz de booking debe priorizar legibilidad y estados claros.

---

# 26. Graphic Language

Potential:

```text
soft clinical grids
rounded geometry
precise line work
appointment markers
subtle dental-arch curves
material texture
calm whitespace
```

Evitar:

```text
tooth icons everywhere
cross symbols everywhere
generic medical waves
neon healthcare gradients
```

---

# 27. Photography / Assets

Prioritize:

```text
interior architecture
natural clinical materials
clean instruments as detail
hands preparing a space
soft daylight
human-scale environment
```

If people are used:

```text
natural
non-stock feeling
not posing at camera
no fake treatment outcomes
```

Required asset direction should be delivered separately before implementation.

---

# 28. Motion

Level:

```text
SUBTLE → MODERATE
```

Potential:

```text
hero reveal
treatment card reveal
appointment step transition
date/time selection feedback
booking drawer / sheet
soft section transitions
```

Avoid:

```text
heavy parallax
continuous floating
dramatic 3D
motion that reduces calmness
```

---

# 29. Responsive

## Desktop

Potential:

```text
editorial hero
treatment grid
booking panel / split interface
comfortable whitespace
```

## Tablet

Potential:

```text
booking drawer
two-column treatment layout
```

## Mobile

Priority:

```text
treatment discovery
appointment CTA
step-by-step booking
date/time targets
form clarity
easy close/back
```

Mobile booking may use:

```text
bottom sheet
full-screen step flow
```

Claude Design should choose the stronger pattern.

---

# 30. Accessibility

At minimum:

```text
semantic headings
keyboard navigation
visible focus
accessible dialog/sheet
focus trap where modal
focus restoration
form labels
validation association
aria-live for booking feedback
minimum touch targets
contrast
prefers-reduced-motion
```

Healthcare context increases the importance of calm, understandable error states.

---

# 31. Performance

Avoid unnecessary:

```text
video backgrounds
continuous WebGL
oversized photography
heavy animation
large client bundles
```

No Three.js requirement.

---

# 32. Portfolio Card

```text
CONCEPT DEMO

SALUD · SERVICIOS

Lúmina Dental

Tratamientos, confianza y solicitud de citas
para una clínica odontológica moderna.

Explorar demo →
```

---

# 33. Required Design States

```text
Treatment default
Treatment selected
Appointment closed
Appointment opened
Professional preference
Date selection
Time selection
Patient details
Validation error
Confirmation
Reset
Tablet booking
Mobile booking
Navigation open
Reduced motion behavior
```

---

# 34. Design Review Criteria

- reconocible inmediatamente como clínica dental;
- no parece una plantilla SaaS;
- no copia Nexo Obra;
- Concept Demo visible;
- booking es la experiencia central;
- no contiene métricas/testimonios médicos ficticios;
- no solicita datos médicos sensibles;
- mobile diseñado intencionalmente;
- estados del booking completos;
- transición a DevSure natural;
- técnicamente implementable;
- aislado del resto de DevSure.

---

# 35. Functional Acceptance Direction

Future implementation should ultimately validate:

```text
[ ] /portfolio/clinica-dental loads
[ ] Concept Demo visible
[ ] treatments render
[ ] treatment selection works
[ ] appointment flow opens
[ ] professional preference works
[ ] date selection works
[ ] time selection works
[ ] validation works
[ ] confirmation works
[ ] no real appointment created
[ ] booking resets
[ ] desktop/tablet/mobile
[ ] keyboard navigation
[ ] reduced motion
[ ] no horizontal overflow
[ ] Back to Portfolio
[ ] DevSure CTA → /#contacto
[ ] unsupported routes remain 404
[ ] no global style leakage
```

---

# 36. Pilot Reuse Rules

Reuse from Nexo Obra:

```text
Portfolio routing architecture
showcase registry/catalog pattern
Concept Demo disclosure
DevSure return/CTA behavior
QA workflow
accessibility standards
404 behavior
hash navigation
test strategy
```

Do NOT reuse visually:

```text
industrial typography
yellow/graphite skin
construction labels
product catalog layout
quote-builder visual treatment
industrial motion language
```

---

# 37. Design Principle

The visitor should first experience:

```text
A CALM, HIGH-QUALITY DIGITAL DENTAL CLINIC
```

and then understand:

```text
DEVSURE CAN DESIGN AND BUILD THIS.
```
