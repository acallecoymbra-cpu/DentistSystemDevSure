'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
} from 'react';
import { toIsoDate, type Treatment } from '../appointment-data';
import { AGENDA_TITLE_ID } from '../ids';
import { appointmentReducer, createInitialState, type AppointmentAction, type AppointmentState } from '../appointment-state';
import { AppointmentDialog } from './appointment-dialog';
import { StickyBookBar } from './sticky-book-bar';

/** ≥1024px: the appointment lives inline in its section; below, it opens as a dialog. */
export const DESKTOP_QUERY = '(min-width: 1024px)';
/** 600–1023px: side drawer (backdrop closes it); below 600px: full-screen flow. */
export const TABLET_QUERY = '(min-width: 600px)';

interface AppointmentContextValue {
  state: AppointmentState;
  dispatch: Dispatch<AppointmentAction>;
  /** Visitor's local date (`YYYY-MM-DD`); null until mounted, to keep SSR and hydration equal. */
  today: string | null;
  /** Header / CTA trigger: go to the inline panel on desktop, open the dialog below. */
  openBooking: () => void;
  closeBooking: () => void;
  /** Start (or restart) the request from a treatment card, then show the appointment. */
  bookTreatment: (treatment: Treatment) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const AppointmentContext = createContext<AppointmentContextValue | null>(null);

export function useAppointment(): AppointmentContextValue {
  const value = useContext(AppointmentContext);
  if (!value) throw new Error('useAppointment must be used inside <AppointmentProvider>');
  return value;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appointmentReducer, undefined, createInitialState);
  const [today, setToday] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setToday(toIsoDate(new Date()));
  }, []);

  const closeBooking = useCallback(() => {
    dispatch({ type: 'setOverlay', open: false });
    const trigger = triggerRef.current;
    triggerRef.current = null;
    // Return focus once the dialog is gone and the page is no longer inert.
    window.requestAnimationFrame(() => trigger?.focus());
  }, []);

  const openBooking = useCallback(() => {
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      const title = document.getElementById(AGENDA_TITLE_ID);
      title?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      title?.focus({ preventScroll: true });
      return;
    }
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setMenuOpen(false);
    dispatch({ type: 'setOverlay', open: true });
  }, []);

  const bookTreatment = useCallback(
    (treatment: Treatment) => {
      dispatch({ type: 'startFromTreatment', name: treatment.name, reason: treatment.reason, other: treatment.other });
      openBooking();
    },
    [openBooking],
  );

  // The dialog only exists below 1024px; growing the window closes it.
  useEffect(() => {
    if (!state.overlayOpen) return;
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (query.matches) closeBooking();
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [state.overlayOpen, closeBooking]);

  // Lock page scroll behind the dialog.
  useEffect(() => {
    if (!state.overlayOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [state.overlayOpen]);

  const value = useMemo(
    () => ({ state, dispatch, today, openBooking, closeBooking, bookTreatment, menuOpen, setMenuOpen }),
    [state, today, openBooking, closeBooking, bookTreatment, menuOpen],
  );

  return (
    <AppointmentContext.Provider value={value}>
      <div inert={state.overlayOpen}>
        {children}
        <StickyBookBar />
      </div>
      {state.overlayOpen ? <AppointmentDialog /> : null}
    </AppointmentContext.Provider>
  );
}
