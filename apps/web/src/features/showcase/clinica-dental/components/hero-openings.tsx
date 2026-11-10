'use client';

import { dayNumber, nextOpenings, weekdayShort } from '../appointment-data';
import styles from '../lumina.module.css';
import { useAppointment } from './appointment-provider';
import { BookLink } from './book-link';
import { Icon } from './icons';

/**
 * "Próximos horarios" docked under the hero photograph: a preview of the demo
 * calendar. The dates depend on the visitor's day, so they are filled in after
 * mount; until then the chips keep their size and stay empty.
 */
export function HeroOpenings() {
  const { today } = useAppointment();
  const openings = today ? nextOpenings(today) : null;
  const days = openings?.days ?? ['', '', ''];
  const slots = openings?.slots ?? ['', ''];

  return (
    <div className={styles.heroDock}>
      <div className={styles.heroDockInfo}>
        <p className={styles.heroDockLabel}>
          <span>PRÓXIMOS HORARIOS</span>
          <span className={styles.demoPill}>DEMO</span>
        </p>
        <ul className={styles.heroDockChips} aria-label="Próximos días y horas con cupo, demostrativos">
          {days.map((day, index) => (
            <li key={day || index} className={`${styles.dockChip} ${index === 0 ? styles.dockChipDay : ''}`}>
              {day ? `${weekdayShort(day)} ${dayNumber(day)}` : ' '}
            </li>
          ))}
          <li className={styles.dockDivider} aria-hidden="true" />
          {slots.map((slot, index) => (
            <li key={slot || index} className={`${styles.dockChip} ${styles.dockChipTime}`}>
              {slot || ' '}
            </li>
          ))}
        </ul>
      </div>
      <BookLink className={styles.heroDockButton} ariaLabel="Elegir mi horario">
        <Icon name="arrowRight" size={18} />
      </BookLink>
    </div>
  );
}

/** Next demo opening for the mobile sticky bar. */
export function useNextOpeningLabel(): string {
  const { today } = useAppointment();
  if (!today) return '';
  const { days, slots } = nextOpenings(today);
  return days.length && slots.length ? `${weekdayShort(days[0])} ${dayNumber(days[0])} · ${slots[0]}` : '';
}
