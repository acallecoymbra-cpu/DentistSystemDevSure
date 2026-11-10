'use client';

import { useEffect, useMemo, useRef, type FormEvent } from 'react';
import {
  buildCalendar,
  calendarTitle,
  dayNumber,
  formatLongDate,
  isSlotTaken,
  monthName,
  OTHER_TREATMENTS,
  PROFESSIONALS,
  REASONS,
  TIME_SLOTS,
  weekdayName,
} from '../appointment-data';
import { LAST_STEP, professionalLabel, reasonLabel, STEP_LABELS, type FormField, type Step } from '../appointment-state';
import styles from '../lumina.module.css';
import { useAppointment } from './appointment-provider';
import { ArchMark, Icon } from './icons';

const STEPS: readonly Step[] = [1, 2, 3, 4];

/**
 * The appointment request: reason → professional preference → day and time →
 * contact details → demo confirmation.
 *
 * Rendered inline in its section (≥1024px, "panel" layout with the summary
 * ticket) and inside the drawer / full-screen dialog (<1024px, "stack"
 * layout). Only the instance the visitor can see ("active") moves focus.
 */
export function AppointmentPanel({ variant, onClose }: { variant: 'inline' | 'dialog'; onClose?: () => void }) {
  const { state, dispatch, today } = useAppointment();
  const active = variant === 'dialog' ? state.overlayOpen : !state.overlayOpen;
  const id = (name: string) => `lm-${variant}-${name}`;

  const headingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const lastFocusToken = useRef(state.focusToken);

  const days = useMemo(() => (today ? buildCalendar(today) : []), [today]);

  // Step changes, the confirmation and a reset move focus to the step heading;
  // a failed contact form moves it to the first invalid field. Missing reason
  // or slot are announced by their alert and leave focus where it is.
  useEffect(() => {
    if (lastFocusToken.current === state.focusToken) return;
    lastFocusToken.current = state.focusToken;
    if (!active) return;
    if (state.errors.name) nameRef.current?.focus();
    else if (state.errors.phone) phoneRef.current?.focus();
    else if (state.errors.reason || state.errors.slot) return;
    else headingRef.current?.focus({ preventScroll: variant === 'inline' });
  }, [state.focusToken, state.errors, active, variant]);

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch({ type: 'next' });
  }

  function field(name: FormField) {
    return {
      id: id(name),
      value: state.form[name],
      onChange: (event: { target: { value: string } }) => dispatch({ type: 'setField', field: name, value: event.target.value }),
    };
  }

  const reasonText = reasonLabel(state);
  const proText = professionalLabel(state.professional);
  const stepTitle = state.done ? 'Tu solicitud' : STEP_LABELS[state.step];
  const kicker = state.done ? 'LISTO' : `PASO ${state.step} DE ${LAST_STEP}`;
  const summaryLine = [
    state.reason ? reasonText : null,
    state.step > 2 ? proText : null,
    state.date ? formatLongDate(state.date) : null,
    state.time || null,
  ]
    .filter(Boolean)
    .join(' · ');
  const firstName = state.form.name.trim().split(' ')[0] || 'paciente';

  return (
    <div className={`${styles.panel} ${variant === 'dialog' ? styles.panelStack : styles.panelInline}`}>
      {/* ---------- Header ---------- */}
      <div className={styles.panelHeader}>
        <div className={styles.panelHeading}>
          <span className={styles.panelNumeral} aria-hidden="true">
            {state.done ? <Icon name="check" size={36} strokeWidth={2} /> : `0${state.step}`}
          </span>
          <div>
            <p className={styles.panelKicker}>{kicker}</p>
            {variant === 'dialog' ? (
              <h2 id="lm-dialog-title" className={styles.panelStepName}>
                Agenda de cita · {stepTitle}
              </h2>
            ) : (
              <p className={styles.panelStepName}>{stepTitle}</p>
            )}
          </div>
        </div>

        {variant === 'inline' ? (
          <ol className={styles.rail} aria-label="Pasos de la solicitud">
            {STEPS.map((step) => {
              const past = state.done || step < state.step;
              const current = !state.done && step === state.step;
              return (
                <li
                  key={step}
                  className={`${styles.railStep} ${past ? styles.railPast : ''} ${current ? styles.railCurrent : ''}`}
                  aria-current={current ? 'step' : undefined}
                >
                  <span className={styles.railDot} aria-hidden="true">
                    {past ? <Icon name="check" size={14} strokeWidth={2.4} /> : step}
                  </span>
                  <span className={styles.railLabel}>
                    <span className="sr-only">{past ? 'Completado: ' : ''}</span>
                    {STEP_LABELS[step]}
                  </span>
                </li>
              );
            })}
          </ol>
        ) : (
          <button type="button" className={styles.closeButton} aria-label="Cerrar la agenda" onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
        )}

        {variant === 'dialog' ? (
          <div className={styles.progress} aria-hidden="true">
            {STEPS.map((step) => (
              <span key={step} className={state.done || step <= state.step ? styles.progressOn : undefined} />
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.panelMain}>
        <div className={styles.panelBody}>
          {/* ---------- Step 1: reason ---------- */}
          {!state.done && state.step === 1 ? (
            <div className={styles.step} key="step-1">
              <div className={styles.stepIntro}>
                <h3 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>
                  ¿Qué te trae a la clínica?
                </h3>
                <p>Elige lo que más se parezca. No es un diagnóstico: solo nos ayuda a preparar tu visita.</p>
              </div>
              <fieldset className={styles.optionGrid} aria-describedby={state.errors.reason ? id('reason-error') : undefined}>
                <legend className="sr-only">Motivo de la cita</legend>
                {REASONS.map((reason) => (
                  <label key={reason.id} className={styles.option}>
                    <input
                      type="radio"
                      name={id('reason')}
                      className={styles.optionInput}
                      checked={state.reason === reason.id}
                      onChange={() => dispatch({ type: 'pickReason', reason: reason.id })}
                    />
                    <span className={styles.optionText}>
                      <span className={styles.optionLabel}>{reason.label}</span>
                      <span className={styles.optionHint}>{reason.hint}</span>
                    </span>
                    <span className={styles.optionCheck} aria-hidden="true">
                      <Icon name="check" size={12} strokeWidth={2.4} />
                    </span>
                  </label>
                ))}
              </fieldset>
              {state.reason === 'otro' ? (
                <div className={styles.otherBox}>
                  <p id={id('other-label')}>Si ya sabes cuál, indícalo (opcional)</p>
                  <div role="group" aria-labelledby={id('other-label')} className={styles.chipRow}>
                    {OTHER_TREATMENTS.map((other) => (
                      <button
                        key={other}
                        type="button"
                        className={styles.chip}
                        aria-pressed={state.other === other}
                        onClick={() => dispatch({ type: 'pickOther', other })}
                      >
                        {state.other === other ? <Icon name="check" size={12} strokeWidth={2.4} /> : null}
                        {other}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              {state.reason === 'nose' ? (
                <p className={styles.note}>
                  Está bien no saberlo. Preparamos una <strong>evaluación general</strong>: en esa visita se revisa qué
                  necesitas y se explica el siguiente paso.
                </p>
              ) : null}
              {state.errors.reason ? (
                <p id={id('reason-error')} role="alert" className={styles.alert}>
                  Elige un motivo para continuar. Si no estás seguro, marca «No estoy seguro».
                </p>
              ) : null}
            </div>
          ) : null}

          {/* ---------- Step 2: professional preference ---------- */}
          {!state.done && state.step === 2 ? (
            <div className={styles.step} key="step-2">
              <div className={styles.stepIntro}>
                <h3 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>
                  ¿Prefieres un área en particular?
                </h3>
                <p>Puedes dejarlo sin preferencia: la clínica asigna el área según tu motivo.</p>
              </div>
              <fieldset className={styles.optionList}>
                <legend className="sr-only">Preferencia de profesional</legend>
                {PROFESSIONALS.map((professional) => (
                  <label key={professional.id} className={`${styles.option} ${styles.optionRadio}`}>
                    <input
                      type="radio"
                      name={id('professional')}
                      className={styles.optionInput}
                      checked={state.professional === professional.id}
                      onChange={() => dispatch({ type: 'pickProfessional', professional: professional.id })}
                    />
                    <span className={styles.radioDot} aria-hidden="true" />
                    <span className={styles.optionText}>
                      <span className={styles.optionLabel}>{professional.label}</span>
                      <span className={styles.optionHint}>{professional.hint}</span>
                    </span>
                  </label>
                ))}
              </fieldset>
            </div>
          ) : null}

          {/* ---------- Step 3: day and time ---------- */}
          {!state.done && state.step === 3 ? (
            <div className={styles.step} key="step-3">
              <div className={styles.stepIntro}>
                <h3 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>
                  Elige día y hora
                </h3>
                <p>Horarios demostrativos. Los días atenuados no tienen cupo.</p>
              </div>
              <div className={styles.slotPicker}>
                <div className={styles.calendar}>
                  <div className={styles.calendarHead}>
                    <span id={id('calendar-title')} className={styles.pickerTitle}>
                      {days.length ? calendarTitle(days) : ''}
                    </span>
                    <span className={styles.demoTag}>FECHAS DEMO</span>
                  </div>
                  <div className={styles.weekdays} aria-hidden="true">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((letter, index) => (
                      <span key={index}>{letter}</span>
                    ))}
                  </div>
                  <div role="group" aria-labelledby={id('calendar-title')} className={styles.days}>
                    {days.map((day) => (
                      <button
                        key={day.iso}
                        type="button"
                        className={`${styles.day} ${day.isToday ? styles.dayToday : ''}`}
                        aria-pressed={state.date === day.iso}
                        aria-label={`${formatLongDate(day.iso)}${day.isToday ? ', hoy' : ''}${day.available ? '' : ', sin cupo'}`}
                        disabled={!day.available}
                        onClick={() => {
                          if (today) dispatch({ type: 'pickDate', date: day.iso, today });
                        }}
                      >
                        {day.startsMonth ? <span className={styles.dayMonth}>{monthName(day.iso).slice(0, 3)}</span> : null}
                        {day.day}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.times}>
                  <span id={id('time-title')} className={styles.pickerTitle}>
                    {state.date ? formatLongDate(state.date) : 'Hora'}
                  </span>
                  {state.date ? (
                    <div role="group" aria-labelledby={id('time-title')} className={styles.timeGrid}>
                      {TIME_SLOTS.map((slot) => {
                        const taken = isSlotTaken(state.date, slot);
                        return (
                          <button
                            key={slot}
                            type="button"
                            className={styles.time}
                            aria-pressed={state.time === slot}
                            aria-label={taken ? `${slot}, ocupado` : slot}
                            disabled={taken}
                            onClick={() => dispatch({ type: 'pickTime', time: slot })}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className={styles.timesEmpty}>Elige primero un día para ver sus horarios.</p>
                  )}
                </div>
              </div>
              {state.date && state.time ? (
                <p className={styles.slotReady}>
                  <Icon name="check" size={16} strokeWidth={2.2} />
                  {formatLongDate(state.date)} · {state.time}
                </p>
              ) : null}
              {state.errors.slot ? (
                <p role="alert" className={styles.alert}>
                  {state.date ? 'Elige una hora disponible para ese día.' : 'Elige un día y una hora para continuar.'}
                </p>
              ) : null}
            </div>
          ) : null}

          {/* ---------- Step 4: contact details ---------- */}
          {!state.done && state.step === 4 ? (
            <form id={id('form')} className={styles.step} key="step-4" noValidate onSubmit={onSubmit}>
              <div className={styles.stepIntro}>
                <h3 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>
                  ¿A quién le confirmamos?
                </h3>
                <p>Solo datos de contacto. No pedimos información médica.</p>
              </div>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label htmlFor={id('name')}>Nombre</label>
                  <input
                    ref={nameRef}
                    {...field('name')}
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(state.errors.name)}
                    aria-describedby={state.errors.name ? id('name-error') : undefined}
                  />
                  {state.errors.name ? (
                    <p id={id('name-error')} className={styles.fieldError}>
                      Escribe tu nombre para preparar la solicitud.
                    </p>
                  ) : null}
                </div>
                <div className={styles.field}>
                  <label htmlFor={id('phone')}>Teléfono / WhatsApp</label>
                  <input
                    ref={phoneRef}
                    {...field('phone')}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="7XX XXXXX"
                    required
                    aria-invalid={Boolean(state.errors.phone)}
                    aria-describedby={state.errors.phone ? id('phone-error') : undefined}
                  />
                  {state.errors.phone ? (
                    <p id={id('phone-error')} className={styles.fieldError}>
                      Indica un teléfono de al menos 7 dígitos.
                    </p>
                  ) : null}
                </div>
                <div className={styles.field}>
                  <label htmlFor={id('email')}>
                    Email <span className={styles.optional}>(opcional)</span>
                  </label>
                  <input {...field('email')} type="email" autoComplete="email" />
                </div>
                <div className={styles.field}>
                  <span id={id('first-label')} className={styles.fieldLabel}>
                    ¿Es tu primera visita? <span className={styles.optional}>(opcional)</span>
                  </span>
                  <div role="group" aria-labelledby={id('first-label')} className={styles.toggleRow}>
                    {(
                      [
                        ['si', 'Sí'],
                        ['no', 'No'],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        className={styles.toggle}
                        aria-pressed={state.firstVisit === value}
                        onClick={() => dispatch({ type: 'setFirstVisit', value })}
                      >
                        {state.firstVisit === value ? <Icon name="check" size={14} strokeWidth={2.4} /> : null}
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor={id('comment')}>
                  Comentario <span className={styles.optional}>(opcional)</span>
                </label>
                <textarea
                  {...field('comment')}
                  rows={2}
                  placeholder="Ej.: prefiero que me llamen por la tarde"
                  aria-describedby={id('comment-hint')}
                />
                <p id={id('comment-hint')} className={styles.fieldHint}>
                  No incluyas diagnósticos ni datos médicos.
                </p>
              </div>
            </form>
          ) : null}

          {/* ---------- Demo confirmation ---------- */}
          {state.done ? (
            <div className={`${styles.step} ${styles.done}`} key="done">
              <div className={`${styles.ticket} ${styles.ticketDone}`}>
                <span className={styles.ticketCheck} aria-hidden="true">
                  <Icon name="check" size={22} strokeWidth={2.2} />
                </span>
                <p className={styles.ticketWeekday}>{weekdayName(state.date).toUpperCase()}</p>
                <p className={styles.ticketDay}>{dayNumber(state.date)}</p>
                <p className={styles.ticketWhen}>
                  de {monthName(state.date)} · {state.time}
                </p>
                <span className={styles.ticketRule} aria-hidden="true" />
                <p className={styles.ticketReason}>{reasonText}</p>
                <p className={styles.ticketPro}>{proText}</p>
              </div>
              <div className={styles.doneCopy}>
                <h3 ref={headingRef} tabIndex={-1} className={styles.doneTitle}>
                  Solicitud preparada.
                </h3>
                <p>
                  Gracias, {firstName}. Tu motivo, tu preferencia y el horario quedaron reunidos en una sola solicitud.
                </p>
                <p className={styles.doneSmall}>
                  En una implementación real esta solicitud podría integrarse con la agenda de la clínica, WhatsApp, CRM
                  o el sistema de gestión.
                </p>
                <p className={styles.demoNotice}>DEMO · No se reservó una cita real ni se envió ningún dato.</p>
              </div>
            </div>
          ) : null}
        </div>

        {/* ---------- Summary ticket (inline layout) ---------- */}
        {variant === 'inline' && !state.done ? (
          <aside className={`${styles.ticket} ${styles.ticketSide}`} aria-label="Tu solicitud">
            <div className={styles.ticketTop}>
              <p className={styles.ticketLabel}>TU SOLICITUD</p>
              {state.date ? (
                <>
                  <p className={styles.ticketWeekday}>{weekdayName(state.date).toUpperCase()}</p>
                  <p className={styles.ticketDay}>{dayNumber(state.date)}</p>
                  <p className={styles.ticketWhen}>
                    de {monthName(state.date)} · {state.time || 'elige la hora'}
                  </p>
                </>
              ) : (
                <>
                  <ArchMark className={styles.ticketArch} />
                  <p className={styles.ticketEmpty}>Aún sin horario</p>
                </>
              )}
            </div>
            <dl className={styles.ticketRows}>
              <div>
                <dt>MOTIVO</dt>
                <dd className={state.reason ? undefined : styles.ticketUnset}>{reasonText}</dd>
              </div>
              <div>
                <dt>PREFERENCIA</dt>
                <dd>{proText}</dd>
              </div>
            </dl>
          </aside>
        ) : null}
      </div>

      {/* ---------- Summary strip (stack layout) ---------- */}
      {variant === 'dialog' && !state.done && summaryLine ? (
        <p className={styles.summaryStrip}>
          <ArchMark className={styles.summaryArch} />
          <span>
            <span className="sr-only">Tu solicitud: </span>
            {summaryLine}
          </span>
        </p>
      ) : null}

      {/* ---------- Footer ---------- */}
      <div className={styles.panelFooter}>
        {!state.done && state.step > 1 ? (
          <button type="button" className={styles.backButton} onClick={() => dispatch({ type: 'back' })}>
            Atrás
          </button>
        ) : (
          <span className={styles.footNote}>
            {state.done ? 'Puedes preparar otra solicitud.' : 'Cuatro pasos · menos de un minuto'}
          </span>
        )}
        {/* Distinct keys: reusing one node would turn "Continuar" into the submit
            button mid-click and send the form the moment step 4 appears. */}
        {state.done ? (
          <button key="reset" type="button" className={styles.nextButton} onClick={() => dispatch({ type: 'reset' })}>
            Nueva solicitud
          </button>
        ) : state.step === LAST_STEP ? (
          <button key="submit" type="submit" form={id('form')} className={styles.nextButton}>
            Preparar solicitud
            <Icon name="arrowRight" size={16} />
          </button>
        ) : (
          <button key="next" type="button" className={styles.nextButton} onClick={() => dispatch({ type: 'next' })}>
            Continuar
            <Icon name="arrowRight" size={16} />
          </button>
        )}
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {active ? state.announcement : ''}
      </p>
    </div>
  );
}
