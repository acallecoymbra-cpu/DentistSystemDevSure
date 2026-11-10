# Claude Design Task — DevSure Portfolio / Clínica Dental Concept Demo

You are acting as the **Lead Product Designer and Creative Director** for the second Concept Demo in the DevSure Portfolio system.

Your task is to design:

```text
LÚMINA DENTAL
Clínica Odontológica
```

Route:

```text
/portfolio/clinica-dental
```

Classification:

```text
CONCEPT DEMO
```

This is a fictional business created exclusively to demonstrate DevSure's product-design and software capabilities.

---

# Required Context

Read these files in this exact order:

```text
1. docs/portfolio/DEVSURE-PROJECT-SHOWCASE-SYSTEM.md
2. docs/portfolio/DEVSURE-CONCEPT-DEMO-CATALOG.md
3. docs/portfolio/PROJECT-DESIGN-BRIEF-CLINICA-DENTAL.md
```

You may also inspect the existing Nexo Obra implementation only to understand the validated Portfolio architecture and interaction quality.

Do NOT use Nexo Obra as the visual template for this design.

---

# Scope Boundary

Design only:

```text
/portfolio/clinica-dental
```

Do NOT redesign:

```text
DevSure homepage
Portfolio architecture
Nexo Obra
Cultura
Tecnologías
Servicios
Casos de éxito
global DevSure branding
```

Do NOT produce production code in this phase.

---

# Main Goal

Create an experience that first feels like:

```text
A HIGH-QUALITY DIGITAL DENTAL CLINIC
```

and only near the end reveals:

```text
THIS IS A DEVSURE CONCEPT DEMO
AND DEVSURE CAN BUILD EXPERIENCES LIKE THIS.
```

---

# Brand

```text
LÚMINA DENTAL
Clínica Odontológica
```

Personality:

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

Avoid generic healthcare-template aesthetics.

---

# Core Product Experience

The central interaction is:

```text
APPOINTMENT BOOKING
```

Flow:

```text
Treatment / reason
↓
Professional preference
↓
Date
↓
Time
↓
Patient details
↓
Demo confirmation
```

This must be designed as a real product interaction, not merely a contact form.

---

# Appointment Principles

The user must be able to choose:

```text
Treatment / reason
Professional preference
Date
Time
```

Then provide only basic contact information.

Do NOT request sensitive health information.

Do NOT design:

```text
medical history
diagnosis
medications
clinical image upload
insurance validation
prescriptions
real payments
real booking backend
```

---

# Treatment Discovery

Design for these demonstration categories:

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

Include a useful:

```text
No estoy seguro
```

path in the booking experience.

---

# Hero

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

Supporting:

```text
Una experiencia odontológica clara desde el primer contacto.

Explora tratamientos, conoce cómo trabajamos y solicita una cita
desde cualquier dispositivo.
```

Primary CTA:

```text
Agendar una cita
```

Secondary:

```text
Ver tratamientos
```

---

# Hero Art Direction

Avoid:

```text
doctor smiling at camera
generic blue gradient
floating medical icons
tooth icon as the entire identity
```

Explore:

```text
CLINICAL SPACE
+
HUMAN DETAIL
+
DIGITAL APPOINTMENT INTERFACE
```

Possible ingredients:

```text
clean architecture
soft daylight
material close-ups
abstract dental geometry
calendar UI
time-slot interface
treatment cards
```

---

# Trust Layer

Use:

```text
Atención personalizada
Horarios organizados
Tratamientos explicados con claridad
Solicitud de cita en línea
```

No fake metrics.

No fake testimonials.

No fake clinical claims.

---

# Required Sections

Design:

```text
01 Concept Demo disclosure
02 Header / Navigation
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

Visual composition may differ from this literal sequence if the information architecture and business intent remain intact.

---

# Specialists / People

If you introduce professional profiles:

- identities must be fictional;
- do not fabricate real medical authority;
- do not create fake outcome claims;
- avoid presenting invented years of experience or awards as credibility proof.

Prefer specialty-focused storytelling over fake résumés.

---

# Appointment States

Design all of these:

```text
Booking closed
Booking open
Treatment selected
No treatment selected
Professional preference
Date selected
Time selected
Patient details
Validation error
Confirmation
Reset / new request
Tablet booking
Mobile booking
```

---

# Responsive Booking

Explicitly design:

```text
Desktop
Tablet
Mobile
```

Potential approaches:

Desktop:

```text
split layout
persistent booking panel
editorial content + scheduler
```

Tablet:

```text
drawer
step panel
```

Mobile:

```text
bottom sheet
or full-screen booking flow
```

Choose the strongest UX.

Do not simply shrink desktop.

---

# Visual Direction

Explore:

```text
CALM CLINICAL EDITORIAL
```

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

You may improve or replace these values.

The result must be clearly different from Nexo Obra.

---

# Typography

Explore:

```text
human editorial display typography
+
highly readable sans-serif UI
```

The scheduling UI must prioritize clarity over visual experimentation.

---

# Graphic Language

Potential:

```text
soft clinical grids
precise line work
subtle arch curves
appointment markers
calm whitespace
material texture
```

Avoid healthcare clichés.

---

# Photography / Asset Direction

Prioritize:

```text
clinical interiors
architecture
natural materials
clean instruments as details
hands preparing a room
soft daylight
```

If people appear:

```text
natural
non-stock feeling
not posed at camera
no fabricated outcome imagery
```

Provide an explicit asset list and art direction.

---

# Motion

Level:

```text
SUBTLE → MODERATE
```

Useful motion:

```text
section reveal
booking step transition
date/time selection feedback
drawer / sheet transition
gentle hero movement
```

Avoid:

```text
continuous floating
heavy parallax
dramatic 3D
high-energy transitions
```

---

# Accessibility

Design for:

```text
keyboard navigation
visible focus
accessible date/time controls
dialog semantics where used
focus trap
focus restoration
validation messages
aria-live feedback
touch targets
contrast
prefers-reduced-motion
```

Do not leave accessibility as an implementation afterthought.

---

# Final DevSure Transition

Label:

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

---

# Portfolio / Architecture Reuse

Reuse the validated system behavior:

```text
Concept Demo disclosure
Back to Portfolio
DevSure final CTA
showcase route model
responsive/accessibility quality bar
```

Do NOT reuse:

```text
Nexo Obra industrial skin
yellow palette
construction typography
product-grid visual pattern
quote-builder visual treatment
```

---

# Deliverables

Produce:

```text
1. Design concept
2. Brand direction
3. Color system
4. Typography
5. Graphic language
6. Hero
7. Navigation
8. Trust layer
9. Treatment discovery
10. Appointment Booking UX
11. All booking states
12. Specialties / areas
13. First Visit storytelling
14. Clinic experience / differentiator
15. Demo location/contact
16. Final DevSure transition
17. Footer
18. Desktop layout
19. Tablet layout
20. Mobile layout
21. Motion specification
22. Accessibility behavior
23. Asset requirements
24. Implementation notes
```

---

# Asset Handoff

For each required visual asset specify:

```text
asset ID
purpose
subject
art direction
desktop ratio
mobile treatment
minimum recommended resolution
required / optional
```

Do not leave generic `[PHOTO]` placeholders without an asset definition.

---

# Implementation Handoff

At the end provide a concise handoff for Claude Code containing:

```text
approved section order
desktop behavior
tablet behavior
mobile behavior
booking flow
dialog/drawer/sheet behavior
focus behavior
validation states
motion timings
reduced-motion behavior
asset mapping
user-facing content
design-only annotations
elements that must not be implemented
```

---

# Scope Protection

Do NOT add:

```text
AI symptom checker
patient portal
authentication
real scheduling backend
payments
medical records
insurance
telemedicine
chatbot
admin dashboard
real WhatsApp submission
```

Do not expand scope.

---

# Final Evaluation

Before finishing verify:

```text
Is it immediately recognizable as a dental clinic?
Does it feel calm and professional rather than generic?
Is Appointment Booking the central digital experience?
Does mobile feel intentionally designed?
Are all booking states covered?
Are no sensitive medical details requested?
Is Concept Demo clearly disclosed?
Does it avoid fake medical credibility?
Does it feel distinct from Nexo Obra?
Can Claude Code realistically implement it?
Does the final DevSure transition feel natural?
```

If any answer is no, revise before handoff.

---

# Final Output Format

Return:

```text
01 Design Concept
02 Visual System
03 Information Architecture
04 Section-by-Section Design
05 Appointment Booking UX
06 Responsive Strategy
07 Motion / Interaction
08 Accessibility
09 Asset Requirements
10 Implementation Handoff
11 Final Design Rationale
```

This is DESIGN ONLY.

Do not produce production implementation code.
