'use client';

import { useEffect, useRef } from 'react';
import { trapTabKey } from '../../shared/focus-trap';
import styles from '../lumina.module.css';
import { AppointmentPanel } from './appointment-panel';
import { TABLET_QUERY, useAppointment } from './appointment-provider';

/**
 * Appointment dialog below 1024px: a side drawer on tablet (600–1023px) and a
 * full-screen flow on mobile (<600px). The page behind is `inert`; focus
 * starts on the dialog title, stays inside, and returns to the opener on close.
 */
export function AppointmentDialog() {
  const { closeBooking } = useAppointment();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  return (
    <div className={styles.dialogLayer}>
      <div
        className={styles.scrim}
        aria-hidden="true"
        onClick={() => {
          // The tablet drawer closes from the backdrop. The mobile flow covers
          // the screen, so there is no backdrop to tap.
          if (window.matchMedia(TABLET_QUERY).matches) closeBooking();
        }}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lm-dialog-title"
        tabIndex={-1}
        className={styles.dialog}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation();
            closeBooking();
            return;
          }
          trapTabKey(event, dialogRef.current);
        }}
      >
        <AppointmentPanel variant="dialog" onClose={closeBooking} />
      </div>
    </div>
  );
}
