/**
 * Lúmina Dental demo content. Fictional brand, treatments, schedule and
 * location, shown only as demonstration data
 * (docs/portfolio/PROJECT-DESIGN-BRIEF-CLINICA-DENTAL.md).
 */

export type ReasonId = 'evaluacion' | 'limpieza' | 'dolor' | 'ortodoncia' | 'estetica' | 'otro' | 'nose';

export interface Reason {
  id: ReasonId;
  label: string;
  hint: string;
}

/** Step 1 of the appointment. "No estoy seguro" is a valid path, not an error. */
export const REASONS: readonly Reason[] = [
  { id: 'evaluacion', label: 'Evaluación general', hint: 'Revisión y plan de atención' },
  { id: 'limpieza', label: 'Limpieza y prevención', hint: 'Higiene y control periódico' },
  { id: 'dolor', label: 'Dolor o molestia', hint: 'Algo que quieres revisar pronto' },
  { id: 'ortodoncia', label: 'Ortodoncia', hint: 'Alineación y mordida' },
  { id: 'estetica', label: 'Estética dental', hint: 'Aspecto y color de la sonrisa' },
  { id: 'otro', label: 'Otro tratamiento', hint: 'Restauraciones, implantes y más' },
  { id: 'nose', label: 'No estoy seguro', hint: 'Lo vemos juntos en una evaluación' },
];

/** Optional detail when the reason is "Otro tratamiento". */
export const OTHER_TREATMENTS: readonly string[] = ['Restauraciones', 'Endodoncia', 'Implantes', 'Odontopediatría'];

export type ProfessionalId = 'none' | 'general' | 'ortodoncia' | 'endodoncia' | 'pediatria';

export interface Professional {
  id: ProfessionalId;
  label: string;
  hint: string;
}

/** Step 2: an area of care, never a named person. */
export const PROFESSIONALS: readonly Professional[] = [
  { id: 'none', label: 'Sin preferencia', hint: 'La clínica asigna el área adecuada' },
  { id: 'general', label: 'Odontología general', hint: 'Evaluación, prevención y restauraciones' },
  { id: 'ortodoncia', label: 'Ortodoncia', hint: 'Alineación dental y mordida' },
  { id: 'endodoncia', label: 'Endodoncia', hint: 'Tratamiento del interior del diente' },
  { id: 'pediatria', label: 'Odontopediatría', hint: 'Atención para niñas y niños' },
];

export interface Treatment {
  number: string;
  name: string;
  text: string;
  /** Demo duration range. */
  duration: string;
  /** What the appointment starts with when booked from this treatment. */
  reason: ReasonId;
  other?: string;
}

/** The three entry points shown as featured cards. */
export const FEATURED_TREATMENTS: readonly [Treatment, Treatment, Treatment] = [
  {
    number: '01',
    name: 'Evaluación general',
    text: 'Revisión completa de dientes y encías para entender el punto de partida. Es la visita adecuada si no sabes por dónde empezar.',
    duration: '30–40 min',
    reason: 'evaluacion',
  },
  {
    number: '02',
    name: 'Limpieza y prevención',
    text: 'Higiene profesional y pautas de cuidado para el día a día.',
    duration: '40–50 min',
    reason: 'limpieza',
  },
  {
    number: '03',
    name: 'Ortodoncia',
    text: 'Alineación de los dientes y corrección de la mordida, con un plan por etapas.',
    duration: '30–45 min',
    reason: 'ortodoncia',
  },
];

export const MORE_TREATMENTS: readonly Treatment[] = [
  { number: '04', name: 'Restauraciones', text: 'Reparación de piezas dañadas para recuperar forma y función.', duration: '45–60 min', reason: 'otro', other: 'Restauraciones' },
  { number: '05', name: 'Endodoncia', text: 'Tratamiento del interior del diente cuando el nervio está afectado.', duration: '60–90 min', reason: 'otro', other: 'Endodoncia' },
  { number: '06', name: 'Estética dental', text: 'Opciones para cuidar el color y la forma de la sonrisa.', duration: '45–60 min', reason: 'estetica' },
  { number: '07', name: 'Implantes', text: 'Reposición de piezas ausentes con una base fija.', duration: '40–50 min', reason: 'otro', other: 'Implantes' },
  { number: '08', name: 'Odontopediatría', text: 'Atención pensada para niñas y niños, a su ritmo.', duration: '30–40 min', reason: 'otro', other: 'Odontopediatría' },
];

export const SPECIALTIES: ReadonlyArray<{ number: string; name: string; what: string; when: string }> = [
  { number: '01', name: 'Odontología general', what: 'Evaluación, prevención, limpiezas y restauraciones.', when: 'Es el punto de entrada: revisa, explica y deriva si hace falta otra área.' },
  { number: '02', name: 'Ortodoncia', what: 'Posición de los dientes y relación entre las arcadas.', when: 'Cuando la alineación o la mordida necesitan corrección planificada.' },
  { number: '03', name: 'Endodoncia', what: 'El tejido interno del diente y sus conductos.', when: 'Cuando el interior de una pieza está afectado y se busca conservarla.' },
  { number: '04', name: 'Odontopediatría', what: 'Salud bucal de niñas, niños y adolescentes.', when: 'Desde las primeras visitas, con controles adaptados a cada edad.' },
];

export const FIRST_VISIT: ReadonlyArray<{ number: string; title: string; text: string }> = [
  { number: '01', title: 'Cuéntanos qué necesitas', text: 'Eliges un motivo en la agenda, o marcas que no estás seguro.' },
  { number: '02', title: 'Agenda un horario', text: 'Seleccionas el día y la hora que te quedan mejor.' },
  { number: '03', title: 'Realizamos una evaluación', text: 'En la clínica se revisa tu caso con calma.' },
  { number: '04', title: 'Recibes el siguiente paso', text: 'Te explican qué se recomienda y cómo continuaría la atención.' },
];

export const PRINCIPLES: ReadonlyArray<{ title: string; text: string }> = [
  { title: 'Explicación comprensible', text: 'Cada tratamiento se describe con palabras simples antes de empezar.' },
  { title: 'Planificación por etapas', text: 'Sabes qué viene primero y qué puede esperar.' },
  { title: 'Acompañamiento', text: 'Un mismo criterio de atención de principio a fin.' },
  { title: 'Agenda organizada', text: 'La cita se prepara con tu motivo: llegas y te atienden.' },
];

/** Demo opening hours as a share of the longest day, Monday first. */
export const WEEK_HOURS: ReadonlyArray<{ day: string; share: number }> = [
  { day: 'L', share: 1 },
  { day: 'M', share: 1 },
  { day: 'M', share: 1 },
  { day: 'J', share: 1 },
  { day: 'V', share: 1 },
  { day: 'S', share: 0.42 },
  { day: 'D', share: 0 },
];

/* ---------- Demo calendar ---------- */

export const TIME_SLOTS: readonly string[] = ['09:00', '10:30', '12:00', '15:00', '16:30', '18:00'];

/** The calendar shows this many weeks, starting on the Monday of the current one. */
export const CALENDAR_WEEKS = 5;
/** Days after today that accept requests (demo). */
const BOOKING_WINDOW_DAYS = 21;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const WEEKDAYS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const WEEKDAYS_SHORT = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/** `YYYY-MM-DD` in the visitor's local time. */
export function toIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function fromIsoDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function addDays(iso: string, days: number): string {
  const date = fromIsoDate(iso);
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

/** 0 = Monday … 6 = Sunday. */
function weekdayIndex(iso: string): number {
  return (fromIsoDate(iso).getDay() + 6) % 7;
}

export function dayNumber(iso: string): number {
  return fromIsoDate(iso).getDate();
}

export function weekdayName(iso: string): string {
  return WEEKDAYS[weekdayIndex(iso)];
}

export function weekdayShort(iso: string): string {
  return WEEKDAYS_SHORT[weekdayIndex(iso)];
}

export function monthName(iso: string): string {
  return MONTHS[fromIsoDate(iso).getMonth()];
}

/** "Martes 13 de octubre". */
export function formatLongDate(iso: string): string {
  const weekday = weekdayName(iso);
  return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${dayNumber(iso)} de ${monthName(iso)}`;
}

export interface CalendarDay {
  iso: string;
  day: number;
  isToday: boolean;
  /** Has demo availability. Past days, today and Sundays never do. */
  available: boolean;
  /** First cell of a month other than the one the calendar starts in. */
  startsMonth: boolean;
}

/**
 * Whether `date` accepts requests when the visitor's day is `today` (both
 * `YYYY-MM-DD`). A fixed demo pattern: the three weeks after today, Monday to
 * Saturday. The single rule behind the calendar and the reducer.
 */
export function isDateBookable(date: string, today: string): boolean {
  if (!ISO_DATE.test(date) || !ISO_DATE.test(today)) return false;
  return date > today && date <= addDays(today, BOOKING_WINDOW_DAYS) && weekdayIndex(date) !== 6;
}

/**
 * Five weeks from the Monday of the current week, with the availability of
 * each day relative to `today`. Nothing is fetched.
 */
export function buildCalendar(today: string): CalendarDay[] {
  const start = addDays(today, -weekdayIndex(today));
  return Array.from({ length: CALENDAR_WEEKS * 7 }, (_, index) => {
    const iso = addDays(start, index);
    return {
      iso,
      day: dayNumber(iso),
      isToday: iso === today,
      available: isDateBookable(iso, today),
      startsMonth: index > 0 && dayNumber(iso) === 1,
    };
  });
}

/** "Octubre 2026" or "Octubre – noviembre 2026" when the five weeks span two months. */
export function calendarTitle(days: readonly CalendarDay[]): string {
  const first = days[0].iso;
  const last = days[days.length - 1].iso;
  const firstMonth = monthName(first);
  const title = `${firstMonth.charAt(0).toUpperCase()}${firstMonth.slice(1)}`;
  const year = fromIsoDate(last).getFullYear();
  return monthName(first) === monthName(last) ? `${title} ${year}` : `${title} – ${monthName(last)} ${year}`;
}

/** Demo pattern of taken slots: Saturday afternoons, plus a couple per weekday. */
export function isSlotTaken(iso: string, slot: string): boolean {
  if (weekdayIndex(iso) === 5) return ['15:00', '16:30', '18:00'].includes(slot);
  const day = dayNumber(iso);
  return (day % 3 === 1 && slot === '12:00') || (day % 4 === 0 && slot === '16:30');
}

/** The first days with availability and the first open slots, for the hero teaser. */
export function nextOpenings(today: string): { days: string[]; slots: string[] } {
  const days = buildCalendar(today)
    .filter((day) => day.available)
    .slice(0, 3)
    .map((day) => day.iso);
  const slots = days.length ? TIME_SLOTS.filter((slot) => !isSlotTaken(days[0], slot)).slice(0, 2) : [];
  return { days, slots };
}
