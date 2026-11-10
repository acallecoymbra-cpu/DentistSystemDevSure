'use client';

import { STEP_LABELS, type Step } from '../appointment-state';
import { AGENDA_SECTION_ID, AGENDA_TITLE_ID } from '../ids';
import styles from '../lumina.module.css';
import { AppointmentPanel } from './appointment-panel';
import { useAppointment } from './appointment-provider';
import { BookLink } from './book-link';

const STEPS: readonly Step[] = [1, 2, 3, 4];

/**
 * The appointment section. On desktop it holds the working panel; below
 * 1024px it shows the four steps and a button that opens the dialog.
 */
export function AgendaSection() {
  const { state } = useAppointment();

  return (
    <section id={AGENDA_SECTION_ID} className={styles.agenda} aria-labelledby={AGENDA_TITLE_ID}>
      <svg className={styles.agendaArcs} viewBox="0 0 900 700" fill="none" aria-hidden="true">
        <path d="M60 700V420a390 390 0 0 1 780 0v280" />
        <path d="M150 700V420a300 300 0 0 1 600 0v280" />
        <path d="M240 700V420a210 210 0 0 1 420 0v280" />
      </svg>
      <div className={styles.agendaInner}>
        <div className={styles.agendaCopy}>
          <p className={styles.sectionLabel}>AGENDA EN LÍNEA</p>
          <h2 id={AGENDA_TITLE_ID} tabIndex={-1} className={styles.sectionTitle}>
            Agenda tu cita en cuatro pasos.
          </h2>
          <p className={styles.agendaLead}>Motivo, preferencia, día y hora, y tus datos de contacto. Nada más.</p>
          {state.source ? (
            <p className={styles.agendaSource}>
              <span>ELEGIDO EN TRATAMIENTOS</span>
              <strong>{state.source}</strong>
            </p>
          ) : null}
          <ul className={`${styles.agendaPoints} ${styles.onlyDesktop}`}>
            <li>No necesitas saber el nombre del tratamiento.</li>
            <li>No pedimos historial ni datos médicos.</li>
            <li>Puedes cambiar cualquier paso antes de terminar.</li>
          </ul>
          <ol className={`${styles.agendaSteps} ${styles.belowDesktop}`}>
            {STEPS.map((step) => (
              <li key={step}>
                <span aria-hidden="true">0{step}</span>
                {STEP_LABELS[step]}
              </li>
            ))}
          </ol>
          <BookLink className={`${styles.buttonMint} ${styles.buttonLarge} ${styles.belowDesktop}`}>Empezar</BookLink>
          <p className={styles.agendaDemo}>
            <strong>Concept Demo.</strong> La agenda funciona en tu navegador: no reserva citas reales ni envía datos.
          </p>
        </div>
        <div className={`${styles.agendaPanel} ${styles.onlyDesktop}`}>
          <AppointmentPanel variant="inline" />
        </div>
      </div>
    </section>
  );
}
