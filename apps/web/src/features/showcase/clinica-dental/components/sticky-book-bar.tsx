'use client';

import { useEffect, useState } from 'react';
import { AGENDA_SECTION_ID, DEVSURE_SECTION_ID, FOOTER_ID, HERO_CTA_ID } from '../ids';
import styles from '../lumina.module.css';
import { useAppointment } from './appointment-provider';
import { BookLink } from './book-link';
import { useNextOpeningLabel } from './hero-openings';

/**
 * Mobile (<600px) floating "Agendar cita" bar. It shows once the hero button
 * has scrolled away and steps aside wherever the page already offers the
 * action or hands over to DevSure: the appointment section, the DevSure
 * transition and the footer. Never shown over the open dialog or menu.
 */
export function StickyBookBar() {
  const { state, menuOpen } = useAppointment();
  const nextOpening = useNextOpeningLabel();
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById(HERO_CTA_ID);
    const blockers = [AGENDA_SECTION_ID, DEVSURE_SECTION_ID, FOOTER_ID].map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    if (!heroCta) return;

    const heroObserver = new IntersectionObserver(([entry]) => {
      // Past the hero means the button left through the top, not that it has yet to appear.
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    heroObserver.observe(heroCta);

    const visible = new Set<Element>();
    const blockObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setBlocked(visible.size > 0);
    });
    for (const blocker of blockers) blockObserver.observe(blocker);

    return () => {
      heroObserver.disconnect();
      blockObserver.disconnect();
    };
  }, []);

  const shown = pastHero && !blocked && !state.overlayOpen && !menuOpen;

  return (
    <div className={styles.stickyBar} data-shown={shown} inert={!shown}>
      <p>
        <span>PRÓXIMO CUPO · DEMO</span>
        <strong>{nextOpening || ' '}</strong>
      </p>
      <BookLink className={styles.buttonPrimary}>Agendar cita</BookLink>
    </div>
  );
}
