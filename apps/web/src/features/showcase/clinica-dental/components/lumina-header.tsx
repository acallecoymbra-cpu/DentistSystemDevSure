'use client';

import { useEffect, useRef } from 'react';
import styles from '../lumina.module.css';
import { useAppointment } from './appointment-provider';
import { BookLink } from './book-link';
import { Icon, LuminaMark } from './icons';

const NAV_LINKS = [
  { href: '#tratamientos', label: 'Tratamientos' },
  { href: '#como-trabajamos', label: 'Cómo trabajamos' },
  { href: '#especialidades', label: 'Especialidades' },
  { href: '#primera-visita', label: 'Primera visita' },
  { href: '#ubicacion', label: 'Contacto' },
];

export function LuminaHeader() {
  const { menuOpen, setMenuOpen } = useAppointment();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (menuOpen) firstLinkRef.current?.focus();
  }, [menuOpen]);

  function closeMenu(returnFocus: boolean): void {
    setMenuOpen(false);
    if (returnFocus) menuButtonRef.current?.focus();
  }

  return (
    <header className={styles.header}>
      <a href="#inicio" className={styles.brand} aria-label="Lúmina Dental, inicio">
        <LuminaMark size={40} />
        <span className={styles.brandText}>
          <span className={styles.brandName}>Lúmina Dental</span>
          <span className={styles.brandTagline}>CLÍNICA ODONTOLÓGICA</span>
        </span>
      </a>

      <nav
        id="lm-navegacion"
        className={styles.nav}
        aria-label="Navegación de Lúmina Dental"
        data-open={menuOpen}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && menuOpen) closeMenu(true);
        }}
      >
        <ul className={styles.navList}>
          {NAV_LINKS.map((link, index) => (
            <li key={link.href}>
              <a href={link.href} ref={index === 0 ? firstLinkRef : undefined} onClick={() => closeMenu(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <BookLink className={`${styles.buttonPrimary} ${styles.navCta}`}>Agendar cita</BookLink>
      </nav>

      <div className={styles.headerActions}>
        <BookLink className={`${styles.buttonPrimary} ${styles.headerCta}`}>
          <Icon name="calendar" size={18} strokeWidth={1.5} />
          Agendar cita
        </BookLink>
        <button
          type="button"
          ref={menuButtonRef}
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="lm-navegacion"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
        </button>
      </div>
    </header>
  );
}
