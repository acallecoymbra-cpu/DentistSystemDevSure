import Image from 'next/image';
import heroImage from '../../../../../public/portfolio/clinica-dental/hero.webp';
import { HERO_CTA_ID } from '../ids';
import styles from '../lumina.module.css';
import { BookLink } from './book-link';
import { HeroOpenings } from './hero-openings';
import { Icon, TrustIcon, type TrustIconName } from './icons';

export function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="lm-hero-title">
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>
          <span className={styles.conceptBadge}>CONCEPT DEMO</span>
          <span>CLÍNICA DENTAL</span>
        </p>
        <h1 id="lm-hero-title" className={styles.heroTitle}>
          Tu sonrisa empieza con sentirte <em>en confianza.</em>
        </h1>
        <p className={styles.heroLead}>
          Una experiencia odontológica clara desde el primer contacto.{' '}
          <span className={styles.fromTablet}>
            Explora tratamientos, conoce cómo trabajamos y solicita una cita desde cualquier dispositivo.
          </span>
          <span className={styles.onlyMobile}>Solicita tu cita desde el celular.</span>
        </p>
        <div className={styles.heroActions}>
          <BookLink id={HERO_CTA_ID} className={`${styles.buttonPrimary} ${styles.buttonLarge}`}>
            Agendar una cita
            <Icon name="arrowRight" size={16} />
          </BookLink>
          <a href="#tratamientos" className={`${styles.buttonOutline} ${styles.buttonLarge}`}>
            Ver tratamientos
          </a>
        </div>
      </div>

      {/* Photograph and schedule teaser as one object: the arched window is the photograph. */}
      <div className={styles.heroWindow}>
        <figure className={styles.heroPhoto}>
          <Image
            src={heroImage}
            alt="Sala de tratamiento luminosa: sillón dental negro, mobiliario blanco con encimera de madera y luz natural tamizada."
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1280px) 560px, (min-width: 1024px) 460px, 100vw"
            className={styles.heroPhotoImage}
          />
        </figure>
        <HeroOpenings />
      </div>
    </section>
  );
}

const TRUST_ITEMS: ReadonlyArray<{ icon: TrustIconName; title: string; text: string }> = [
  { icon: 'person', title: 'Atención personalizada', text: 'Cada visita parte de lo que tú necesitas.' },
  { icon: 'calendar', title: 'Horarios organizados', text: 'Eliges día y hora antes de venir.' },
  { icon: 'message', title: 'Tratamientos explicados con claridad', text: 'Sabes qué se hará y por qué.' },
  { icon: 'phone', title: 'Solicitud de cita en línea', text: 'Sin llamadas: desde el celular o la computadora.' },
];

export function TrustStrip() {
  return (
    <section className={styles.trust} aria-label="Cómo atiende Lúmina Dental">
      <ul className={styles.trustList}>
        {TRUST_ITEMS.map((item) => (
          <li key={item.title}>
            <TrustIcon name={item.icon} />
            <div>
              <p className={styles.trustTitle}>{item.title}</p>
              <p className={styles.trustText}>{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
