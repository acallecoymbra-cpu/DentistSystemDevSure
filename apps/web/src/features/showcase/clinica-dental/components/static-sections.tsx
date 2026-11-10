import Image from 'next/image';
import Link from 'next/link';
import firstVisitImage from '../../../../../public/portfolio/clinica-dental/first-visit.webp';
import howWeWorkImage from '../../../../../public/portfolio/clinica-dental/how-we-work.webp';
import locationImage from '../../../../../public/portfolio/clinica-dental/location.webp';
import specialtiesImage from '../../../../../public/portfolio/clinica-dental/specialties-detail.webp';
import { FIRST_VISIT, PRINCIPLES, SPECIALTIES, WEEK_HOURS } from '../appointment-data';
import { DEVSURE_SECTION_ID, FOOTER_ID } from '../ids';
import styles from '../lumina.module.css';
import { BookLink } from './book-link';
import { Icon, LuminaMark } from './icons';

/** Concept Demo disclosure, always first on the page. */
export function DemoBar() {
  return (
    <div className={styles.demoBar}>
      <Link href="/portfolio" className={styles.demoBarBack}>
        <Icon name="arrowLeft" size={14} />
        <span className={styles.fromTablet}>Portfolio DevSure</span>
        <span className={styles.onlyMobile}>Portfolio</span>
      </Link>
      <p className={styles.demoBarNotice}>
        <strong>CONCEPT DEMO</strong>
        <span className={styles.onlyDesktop}>Lúmina Dental es una marca ficticia diseñada por DevSure</span>
        <span className={styles.onlyTablet}>· marca ficticia</span>
        <span className={styles.onlyMobile}>· ficticio</span>
      </p>
      <p className={`${styles.demoBarData} ${styles.onlyDesktop}`}>Contenido y horarios demostrativos</p>
    </div>
  );
}

/** Areas of care, told by what they attend. No people, credentials or résumés. */
export function Specialties() {
  return (
    <section id="especialidades" className={styles.specialties} aria-labelledby="lm-areas-title">
      <div className={styles.sectionHead}>
        <div>
          <p className={styles.sectionLabel}>ESPECIALIDADES</p>
          <h2 id="lm-areas-title" className={styles.sectionTitle}>
            Cuatro áreas, un mismo criterio.
          </h2>
        </div>
        <p className={styles.sectionIntro}>
          Las presentamos por lo que atienden, no por currículos. Los perfiles del equipo no forman parte de este concept
          demo.
        </p>
      </div>
      {/* An editorial detail from 600px; on mobile the list follows the heading directly. */}
      <figure className={`${styles.specialtiesPhoto} ${styles.fromTablet}`}>
        <Image
          src={specialtiesImage}
          alt="Detalle del instrumental de un equipo dental, en tonos blancos y grises con foco selectivo."
          fill
          sizes="(min-width: 600px) 100vw, 1px"
          className={styles.specialtiesPhotoImage}
        />
      </figure>
      {/* On mobile this list scrolls sideways; tabindex makes it reachable by keyboard. */}
      <ol className={styles.areas} tabIndex={0} aria-label="Áreas de atención">
        {SPECIALTIES.map((area) => (
          <li key={area.name} className={styles.area}>
            <span className={styles.areaNumber} aria-hidden="true">
              {area.number}
            </span>
            <span className={styles.areaDot} aria-hidden="true" />
            <h3 className={styles.areaName}>{area.name}</h3>
            <p>{area.what}</p>
            <p className={styles.areaWhen}>
              <span>CUÁNDO INTERVIENE</span>
              {area.when}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function FirstVisit() {
  return (
    <section id="primera-visita" className={styles.firstVisit} aria-labelledby="lm-first-title">
      <div className={styles.firstVisitInner}>
        <div className={styles.firstVisitHead}>
          <div>
            <p className={styles.sectionLabel}>PRIMERA VISITA</p>
            <h2 id="lm-first-title" className={styles.sectionTitle}>
              Tu primera visita, sin incertidumbre.
            </h2>
          </div>
          <figure className={styles.firstVisitPhoto}>
            <Image
              src={firstVisitImage}
              alt="Un odontólogo con mascarilla y guantes sostiene un modelo dental durante una consulta, en un consultorio luminoso."
              fill
              sizes="(min-width: 600px) 300px, 100vw"
              className={styles.firstVisitPhotoImage}
            />
            <figcaption className={styles.photoTag}>IMAGEN ILUSTRATIVA</figcaption>
          </figure>
        </div>
        <ol className={styles.visitSteps}>
          {FIRST_VISIT.map((step) => (
            <li key={step.number} className={styles.visitStep}>
              <span className={styles.visitNumber} aria-hidden="true">
                {step.number}
              </span>
              <span className={styles.visitLine} aria-hidden="true" />
              <div>
                <h3 className={styles.visitTitle}>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ClinicExperience() {
  return (
    <section id="como-trabajamos" className={styles.experience} aria-labelledby="lm-exp-title">
      <div className={styles.experienceCopy}>
        <p className={styles.sectionLabel}>CÓMO TRABAJAMOS</p>
        <h2 id="lm-exp-title" className={styles.experienceTitle}>
          Claridad <em>antes</em> de cualquier procedimiento.
        </h2>
        <dl className={styles.principles}>
          {PRINCIPLES.map((principle) => (
            <div key={principle.title}>
              <dt>{principle.title}</dt>
              <dd>{principle.text}</dd>
            </div>
          ))}
        </dl>
      </div>
      <figure className={styles.experiencePhoto}>
        <Image
          src={howWeWorkImage}
          alt="Manos con guantes azules sostienen un espejo dental sobre una bandeja de instrumental ordenado."
          fill
          sizes="(min-width: 1024px) 36vw, 100vw"
          className={styles.experiencePhotoImage}
        />
      </figure>
    </section>
  );
}

export function LocationContact() {
  return (
    <section id="ubicacion" className={styles.location} aria-labelledby="lm-loc-title">
      <div className={styles.locationCard}>
        <div className={styles.locationCopy}>
          <div>
            <p className={styles.sectionLabel}>UBICACIÓN Y CONTACTO</p>
            <h2 id="lm-loc-title" className={styles.locationTitle}>
              Te esperamos con la hora reservada.
            </h2>
          </div>
          <div className={styles.hours}>
            <p className={styles.sectionLabel}>HORARIO DEMOSTRATIVO</p>
            <div className={styles.week} aria-hidden="true">
              {WEEK_HOURS.map((entry, index) => (
                <div key={index}>
                  <span className={styles.weekTrack}>
                    <span
                      className={entry.share < 1 ? styles.weekFillShort : styles.weekFill}
                      style={{ height: `${Math.round(entry.share * 100)}%` }}
                    />
                  </span>
                  <span className={styles.weekDay}>{entry.day}</span>
                </div>
              ))}
            </div>
            <p className={styles.hoursText}>
              Lunes a viernes 08:30–19:00 · Sábados 09:00–13:00 · Domingos cerrado <span>(demo)</span>
            </p>
          </div>
          <dl className={styles.contactList}>
            <div>
              <dt>UBICACIÓN</dt>
              <dd>
                <strong>Clínica Demo</strong> · Santa Cruz, Bolivia
                <br />
                <span>Ubicación demostrativa</span>
              </dd>
            </div>
            <div>
              <dt>CONTACTO</dt>
              <dd>Canal demostrativo · no conectado en el demo</dd>
            </div>
          </dl>
          <BookLink className={`${styles.buttonPrimary} ${styles.buttonLarge} ${styles.fromTablet}`}>Agendar una cita</BookLink>
        </div>
        <figure className={styles.locationPhoto}>
          <Image
            src={locationImage}
            alt="Pasillo interior de tonos cálidos con puertas de vidrio y una planta de bambú."
            fill
            sizes="(min-width: 1280px) 260px, (min-width: 1024px) 1px, 100vw"
            className={styles.locationPhotoImage}
          />
        </figure>
        <div className={styles.proximity} role="img" aria-label="Ilustración de cercanía con arcos concéntricos y tiempos a pie demostrativos; no representa una dirección real">
          <svg viewBox="0 0 680 560" preserveAspectRatio="xMidYMax slice" fill="none" aria-hidden="true">
            <path className={styles.proximityRoads} d="M-40 150L720 90M-40 330L720 410M190 -20L250 580M520 -20L450 580" />
            <path d="M240 560V500a100 100 0 0 1 200 0v60" strokeWidth="1.4" />
            <path d="M150 560V500a190 190 0 0 1 380 0v60" strokeWidth="1.2" strokeDasharray="3 7" strokeLinecap="round" />
            <path d="M50 560V500a290 290 0 0 1 580 0v60" strokeDasharray="2 9" strokeLinecap="round" />
            <circle className={styles.proximityPoint} cx="340" cy="500" r="9" />
            <circle className={styles.proximityRing} cx="340" cy="500" r="18" strokeWidth="1.2" />
          </svg>
          <span className={styles.proximityPin}>Lúmina Dental · demo</span>
          {['5 min', '10 min', '15 min'].map((label) => (
            <span key={label} className={styles.proximityRingLabel} aria-hidden="true">
              {label}
            </span>
          ))}
          <span className={styles.proximityTag}>ILUSTRACIÓN · TIEMPOS A PIE DEMOSTRATIVOS</span>
        </div>
      </div>
    </section>
  );
}

/** The reveal: Lúmina ends and DevSure takes over, in DevSure's own identity. */
export function DevSureTransition() {
  return (
    <section id={DEVSURE_SECTION_ID} className={styles.devsure} aria-labelledby="lm-devsure-title">
      <svg className={styles.devsureArcs} viewBox="0 0 760 460" fill="none" aria-hidden="true">
        <path d="M40 460V380a340 340 0 0 1 680 0v80" />
        <path d="M140 460V380a240 240 0 0 1 480 0v80" />
        <circle cx="380" cy="380" r="6" />
      </svg>
      <div className={styles.devsureInner}>
        <p className={styles.devsureLabel}>A DEVSURE CONCEPT DEMO</p>
        <h2 id="lm-devsure-title" className={styles.devsureTitle}>
          ¿Tu clínica necesita una experiencia digital más clara?
        </h2>
        <p className={styles.devsureLead}>
          Diseñamos productos digitales alrededor de cómo realmente trabaja tu equipo y de lo que tus pacientes necesitan
          hacer.
        </p>
        <div className={styles.devsureActions}>
          <Link href="/#contacto" className={styles.devsurePrimary}>
            Hablemos de tu proyecto
          </Link>
          <Link href="/portfolio" className={styles.devsureSecondary}>
            Ver otros concept demos
          </Link>
        </div>
        <ul className={styles.devsureSteps}>
          <li>
            <span>ENTENDER</span>
            Partimos de cómo atiende tu equipo, no de una plantilla.
          </li>
          <li>
            <span>DISEÑAR</span>
            Convertimos ese recorrido en una experiencia que tus pacientes entienden a la primera.
          </li>
          <li>
            <span>CONSTRUIR</span>
            La dejamos funcionando en cualquier dispositivo, lista para crecer contigo.
          </li>
        </ul>
      </div>
    </section>
  );
}

export function LuminaFooter() {
  return (
    <footer id={FOOTER_ID} className={styles.footer}>
      <div className={styles.footerRow}>
        <div className={styles.footerBrand}>
          <LuminaMark size={34} tone="dark" />
          <div>
            <p className={styles.footerName}>Lúmina Dental</p>
            <p className={styles.footerTag}>MARCA FICTICIA DE CONCEPTO</p>
          </div>
        </div>
        <p className={styles.footerDevsure}>
          Un Concept Demo de <strong>DevSure</strong>
        </p>
        <Link href="/portfolio" className={styles.footerBack}>
          <Icon name="arrowLeft" size={14} />
          Volver a Portfolio
        </Link>
      </div>
      <p className={styles.footerNote}>
        Tratamientos, horarios, ubicación y contacto utilizados únicamente con fines demostrativos. Lúmina Dental no es
        una clínica real y esta página no ofrece atención ni consejo médico. Fotografías de stock con fines
        ilustrativos: las personas y los espacios no pertenecen a una clínica real.
      </p>
    </footer>
  );
}
