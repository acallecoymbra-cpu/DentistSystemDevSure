'use client';

import type { ReactNode } from 'react';
import type { Treatment } from '../appointment-data';
import { useAppointment } from './appointment-provider';

/**
 * A link to the appointment. On desktop it takes the visitor (and keyboard
 * focus) to the inline panel; below 1024px it opens the dialog. With a
 * `treatment`, the request starts with that reason already chosen.
 */
export function BookLink({
  className,
  children,
  treatment,
  ariaLabel,
  id,
}: {
  className?: string;
  children: ReactNode;
  treatment?: Treatment;
  ariaLabel?: string;
  id?: string;
}) {
  const { openBooking, bookTreatment } = useAppointment();
  return (
    <a
      id={id}
      href="#agenda"
      className={className}
      aria-label={ariaLabel}
      onClick={(event) => {
        event.preventDefault();
        if (treatment) bookTreatment(treatment);
        else openBooking();
      }}
    >
      {children}
    </a>
  );
}
