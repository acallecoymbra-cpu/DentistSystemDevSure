import {
  formatLongDate,
  isDateBookable,
  isSlotTaken,
  PROFESSIONALS,
  REASONS,
  type ProfessionalId,
  type ReasonId,
} from './appointment-data';

/**
 * Client-side state of the Lúmina Dental appointment request. Pure: no
 * persistence, no network. Every visit starts with an empty request, and the
 * confirmation never books anything.
 */

export const LAST_STEP = 4;
export type Step = 1 | 2 | 3 | 4;
export const STEP_LABELS: Record<Step, string> = { 1: 'Motivo', 2: 'Preferencia', 3: 'Día y hora', 4: 'Tus datos' };

export type FormField = 'name' | 'phone' | 'email' | 'comment';
export type FirstVisit = '' | 'si' | 'no';
export type ErrorKey = 'reason' | 'slot' | 'name' | 'phone';

export interface AppointmentState {
  step: Step;
  /** The request was prepared (demo confirmation). */
  done: boolean;
  reason: ReasonId | '';
  /** Optional detail for the "otro" reason. */
  other: string;
  professional: ProfessionalId;
  /** `YYYY-MM-DD`, or '' while unset. */
  date: string;
  time: string;
  form: Record<FormField, string>;
  firstVisit: FirstVisit;
  errors: Partial<Record<ErrorKey, true>>;
  /** Treatment card the request was started from, for the "En tu solicitud" mark. */
  source: string;
  /** Drawer (tablet) / full-screen flow (mobile). */
  overlayOpen: boolean;
  /** Text for the polite live region. */
  announcement: string;
  /** Bumped on every step change, failed validation and reset, to move focus. */
  focusToken: number;
}

const EMPTY_FORM: Record<FormField, string> = { name: '', phone: '', email: '', comment: '' };

export function createInitialState(): AppointmentState {
  return {
    step: 1,
    done: false,
    reason: '',
    other: '',
    professional: 'none',
    date: '',
    time: '',
    form: { ...EMPTY_FORM },
    firstVisit: '',
    errors: {},
    source: '',
    overlayOpen: false,
    announcement: '',
    focusToken: 0,
  };
}

export type AppointmentAction =
  | { type: 'pickReason'; reason: ReasonId }
  | { type: 'pickOther'; other: string }
  | { type: 'pickProfessional'; professional: ProfessionalId }
  /** `today` is the visitor's day the calendar was built for: the reducer never reads the clock. */
  | { type: 'pickDate'; date: string; today: string }
  | { type: 'pickTime'; time: string }
  | { type: 'setField'; field: FormField; value: string }
  | { type: 'setFirstVisit'; value: FirstVisit }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'reset' }
  | { type: 'startFromTreatment'; name: string; reason: ReasonId; other?: string }
  | { type: 'setOverlay'; open: boolean };

function clearError(state: AppointmentState, key: ErrorKey): AppointmentState['errors'] {
  const errors = { ...state.errors };
  delete errors[key];
  return errors;
}

export function validateContact(form: AppointmentState['form']): AppointmentState['errors'] {
  const errors: AppointmentState['errors'] = {};
  if (!form.name.trim()) errors.name = true;
  if (form.phone.replace(/\D/g, '').length < 7) errors.phone = true;
  return errors;
}

function goTo(state: AppointmentState, step: Step): AppointmentState {
  return {
    ...state,
    step,
    errors: {},
    announcement: `Paso ${step} de ${LAST_STEP}: ${STEP_LABELS[step]}.`,
    focusToken: state.focusToken + 1,
  };
}

function fail(state: AppointmentState, errors: AppointmentState['errors'], announcement: string): AppointmentState {
  return { ...state, errors, announcement, focusToken: state.focusToken + 1 };
}

export function appointmentReducer(state: AppointmentState, action: AppointmentAction): AppointmentState {
  switch (action.type) {
    case 'pickReason':
      return {
        ...state,
        reason: action.reason,
        other: action.reason === 'otro' ? state.other : '',
        source: '',
        errors: clearError(state, 'reason'),
        announcement: `Motivo: ${reasonLabel({ reason: action.reason, other: '' })}.`,
      };
    case 'pickOther':
      return { ...state, other: state.other === action.other ? '' : action.other, source: '' };
    case 'pickProfessional':
      return { ...state, professional: action.professional, announcement: `Preferencia: ${professionalLabel(action.professional)}.` };
    case 'pickDate':
      // A day without availability is ignored, whatever dispatched it.
      if (!isDateBookable(action.date, action.today)) return state;
      // A new day invalidates the hour: its slots may differ.
      return {
        ...state,
        date: action.date,
        time: '',
        errors: clearError(state, 'slot'),
        announcement: `${formatLongDate(action.date)}. Elige una hora.`,
      };
    case 'pickTime':
      if (!state.date || isSlotTaken(state.date, action.time)) return state;
      return {
        ...state,
        time: action.time,
        errors: clearError(state, 'slot'),
        announcement: `${formatLongDate(state.date)}, ${action.time}.`,
      };
    case 'setField': {
      const errors = action.field === 'name' || action.field === 'phone' ? clearError(state, action.field) : state.errors;
      return { ...state, form: { ...state.form, [action.field]: action.value }, errors };
    }
    case 'setFirstVisit':
      return { ...state, firstVisit: state.firstVisit === action.value ? '' : action.value };
    case 'next': {
      if (state.done) return state;
      if (state.step === 1) {
        return state.reason ? goTo(state, 2) : fail(state, { reason: true }, 'Falta elegir un motivo.');
      }
      if (state.step === 2) return goTo(state, 3);
      if (state.step === 3) {
        return state.date && state.time ? goTo(state, 4) : fail(state, { slot: true }, 'Falta elegir día y hora.');
      }
      const errors = validateContact(state.form);
      if (Object.keys(errors).length > 0) return fail(state, errors, 'Revisa los campos marcados.');
      return {
        ...state,
        done: true,
        errors: {},
        announcement: 'Solicitud preparada. No se reservó una cita real ni se envió ningún dato.',
        focusToken: state.focusToken + 1,
      };
    }
    case 'back':
      return state.done || state.step === 1 ? state : goTo(state, (state.step - 1) as Step);
    case 'reset':
      return {
        ...createInitialState(),
        overlayOpen: state.overlayOpen,
        announcement: 'Agenda reiniciada.',
        focusToken: state.focusToken + 1,
      };
    case 'startFromTreatment':
      return {
        // After a confirmation this is a new request: nothing from the prepared
        // one carries over. Mid-flow it only changes the reason, like step 1.
        ...(state.done ? { ...createInitialState(), overlayOpen: state.overlayOpen } : state),
        step: 1,
        done: false,
        reason: action.reason,
        other: action.other ?? '',
        source: action.name,
        errors: {},
        announcement: `${action.name} agregado a tu solicitud.`,
        focusToken: state.focusToken + 1,
      };
    case 'setOverlay':
      return { ...state, overlayOpen: action.open };
    default:
      return state;
  }
}

/** What the request is for. "No estoy seguro" becomes a general evaluation. */
export function reasonLabel(state: Pick<AppointmentState, 'reason' | 'other'>): string {
  if (!state.reason) return 'Sin elegir';
  if (state.reason === 'otro' && state.other) return state.other;
  if (state.reason === 'nose') return 'Evaluación general';
  return REASONS.find((reason) => reason.id === state.reason)?.label ?? 'Sin elegir';
}

export function professionalLabel(id: ProfessionalId): string {
  return PROFESSIONALS.find((professional) => professional.id === id)?.label ?? PROFESSIONALS[0].label;
}
