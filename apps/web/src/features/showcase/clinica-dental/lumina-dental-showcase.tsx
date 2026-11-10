import { AgendaSection } from './components/agenda-section';
import { AppointmentProvider } from './components/appointment-provider';
import { Hero, TrustStrip } from './components/hero';
import { LuminaHeader } from './components/lumina-header';
import {
  ClinicExperience,
  DemoBar,
  DevSureTransition,
  FirstVisit,
  LocationContact,
  LuminaFooter,
  Specialties,
} from './components/static-sections';
import { Treatments } from './components/treatments';
import { luminaFontVariables } from './fonts';
import styles from './lumina.module.css';

/**
 * /portfolio/clinica-dental — Lúmina Dental, a DevSure Concept Demo (fictional
 * brand). Approved design: docs/portfolio/HANDOFF-CLINICA-DENTAL-LUMINA.md.
 *
 * Loaded through the lazy registry (showcase-registry.tsx, ADR-007): the whole
 * tree is server-rendered and ships in this showcase's own chunk. Only the
 * appointment, the treatment cards that start it and the controls that open it
 * hold state.
 */
export function LuminaDentalShowcase() {
  return (
    <div className={`${styles.root} ${luminaFontVariables}`}>
      <a className={styles.skipLink} href="#lm-contenido">
        Saltar al contenido
      </a>
      <AppointmentProvider>
        <DemoBar />
        <LuminaHeader />
        <main id="lm-contenido" tabIndex={-1} className={styles.main}>
          <Hero />
          <TrustStrip />
          <Treatments />
          <AgendaSection />
          <Specialties />
          <FirstVisit />
          <ClinicExperience />
          <LocationContact />
          <DevSureTransition />
        </main>
        <LuminaFooter />
      </AppointmentProvider>
    </div>
  );
}
