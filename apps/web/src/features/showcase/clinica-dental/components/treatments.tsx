'use client';

import Image from 'next/image';
import chairImage from '../../../../../public/portfolio/clinica-dental/treatment-chair.webp';
import { FEATURED_TREATMENTS, MORE_TREATMENTS, type Treatment } from '../appointment-data';
import styles from '../lumina.module.css';
import { useAppointment } from './appointment-provider';
import { BookLink } from './book-link';
import { Icon } from './icons';

function InRequest({ treatment, tone }: { treatment: Treatment; tone?: 'onDark' }) {
  const { state } = useAppointment();
  if (state.source !== treatment.name) return null;
  return <span className={`${styles.inRequest} ${tone === 'onDark' ? styles.inRequestOnDark : ''}`}>En tu solicitud</span>;
}

/**
 * Treatment discovery: three featured entry points and an editorial index of
 * the rest. "Agendar" starts the appointment with that reason already chosen.
 */
export function Treatments() {
  const { state } = useAppointment();
  const [main, second, third] = FEATURED_TREATMENTS;
  const picked = (treatment: Treatment) => (state.source === treatment.name ? styles.treatmentPicked : '');

  return (
    <section id="tratamientos" className={styles.treatments} aria-labelledby="lm-treat-title">
      <div className={styles.sectionHead}>
        <div>
          <p className={styles.sectionLabel}>TRATAMIENTOS</p>
          <h2 id="lm-treat-title" className={styles.sectionTitle}>
            Empieza por lo que necesitas hoy.
          </h2>
        </div>
        <p className={styles.sectionIntro}>Tres puertas de entrada habituales y, debajo, el resto de lo que atendemos.</p>
      </div>

      <div className={styles.featured}>
        <article className={`${styles.featuredMain} ${picked(main)}`}>
          {/* Decorative: it sits under a pine veil and the card says everything in text. */}
          <Image
            src={chairImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className={styles.featuredPhoto}
          />
          <p className={styles.featuredKicker}>
            01 · PUNTO DE PARTIDA <InRequest treatment={main} tone="onDark" />
          </p>
          <h3 className={styles.featuredMainTitle}>{main.name}</h3>
          <p className={styles.featuredMainText}>{main.text}</p>
          <div className={styles.featuredMainFoot}>
            <dl>
              <div>
                <dt>Suele indicarse para</dt>
                <dd>Primera visita o control</dd>
              </div>
              <div>
                <dt>Duración orientativa (demo)</dt>
                <dd>{main.duration}</dd>
              </div>
            </dl>
            <BookLink treatment={main} className={`${styles.buttonMint} ${styles.buttonLarge}`}>
              Agendar evaluación
              <Icon name="arrowRight" size={14} />
            </BookLink>
          </div>
        </article>

        <article className={`${styles.featuredCard} ${styles.featuredMint} ${picked(second)}`}>
          <p className={styles.featuredKicker}>
            02 · CUIDADO PERIÓDICO <InRequest treatment={second} />
          </p>
          <h3 className={styles.featuredTitle}>{second.name}</h3>
          <p>{second.text}</p>
          <div className={styles.featuredFoot}>
            <span>{second.duration} (demo)</span>
            <BookLink treatment={second} className={styles.buttonPrimary} ariaLabel={`Agendar: ${second.name}`}>
              Agendar
            </BookLink>
          </div>
        </article>

        <article className={`${styles.featuredCard} ${styles.featuredPaper} ${picked(third)}`}>
          <p className={styles.featuredKicker}>
            03 · ALINEACIÓN <InRequest treatment={third} />
          </p>
          <h3 className={styles.featuredTitle}>{third.name}</h3>
          <p>{third.text}</p>
          <div className={styles.featuredFoot}>
            <span>{third.duration} (demo)</span>
            <BookLink treatment={third} className={styles.buttonOutline} ariaLabel={`Agendar: ${third.name}`}>
              Agendar
            </BookLink>
          </div>
        </article>
      </div>

      <div className={styles.more}>
        <div className={styles.moreHead}>
          <h3>También en la clínica</h3>
          <p>
            Cinco áreas más. Categorías y duraciones demostrativas; esta página no ofrece diagnóstico ni consejo médico.
          </p>
        </div>
        <ul className={styles.moreList}>
          {MORE_TREATMENTS.map((treatment) => (
            <li key={treatment.name} className={styles.moreRow}>
              <span className={styles.moreNumber}>{treatment.number}</span>
              <span className={styles.moreName}>{treatment.name}</span>
              <span className={styles.moreText}>{treatment.text}</span>
              <InRequest treatment={treatment} />
              <span className={styles.moreDuration}>{treatment.duration}</span>
              <BookLink treatment={treatment} className={styles.roundLink} ariaLabel={`Agendar: ${treatment.name}`}>
                <Icon name="arrowRight" size={16} />
              </BookLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
