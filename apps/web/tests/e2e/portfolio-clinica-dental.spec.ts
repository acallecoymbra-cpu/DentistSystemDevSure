import { expect, test, type Locator, type Page } from '@playwright/test';
import { stretchHome } from './support/tall-home';

// P0 scenarios of docs/portfolio/TEST-PLAN-CLINICA-DENTAL.md (SCRUM-111 / SCRUM-112).
// Lúmina Dental is fully client-side: treatments and copy are fixed local data
// (appointment-data.ts), but the calendar is relative to the visitor's day.
// Tests never name a date: they take the first day and hour the page offers.
// The one test that asserts concrete dates fixes the browser clock explicitly.

const DEMO_URL = '/portfolio/clinica-dental';

const DESKTOP = { width: 1440, height: 1000 };
const TABLET = { width: 834, height: 1100 };
const MOBILE = { width: 390, height: 844 };

const CONTACT = { name: 'Ana Demo', phone: '7000 0000' };
const DEMO_NOTICE = 'DEMO · No se reservó una cita real ni se envió ningún dato.';

// The dev server compiles each route on its first request.
test.describe.configure({ timeout: 90_000 });

async function openDemo(page: Page): Promise<void> {
  const response = await page.goto(DEMO_URL);
  expect(response?.status()).toBe(200);
  // The appointment is a client component: a click before hydration is lost,
  // so wait until React has attached to the hero button.
  await expect
    .poll(() =>
      page.locator('#lm-hero-cta').evaluate((element) => Object.keys(element).some((key) => key.startsWith('__reactProps'))),
    )
    .toBe(true);
}

/** ≥1024px: the appointment works inline, inside its section. */
const inlinePanel = (page: Page): Locator => page.locator('#agenda');
/** <1024px: side drawer on tablet, full-screen flow on mobile. */
const bookingDialog = (page: Page): Locator => page.getByRole('dialog', { name: /^Agenda de cita/ });
const heroCta = (page: Page): Locator => page.locator('#inicio').getByRole('link', { name: 'Agendar una cita' });
const treatments = (page: Page): Locator => page.locator('#tratamientos');
/** Marks that the page behind the dialog cannot be reached. */
const inertPage = (page: Page): Locator => page.locator('[inert] #lm-contenido');

const stepTitle = (panel: Locator, name: string): Locator => panel.getByRole('heading', { level: 3, name });
const reason = (panel: Locator, label: string): Locator => panel.getByRole('radio', { name: new RegExp(`^${label}`) });
const preference = reason;
const continueButton = (panel: Locator): Locator => panel.getByRole('button', { name: 'Continuar' });
const backButton = (panel: Locator): Locator => panel.getByRole('button', { name: 'Atrás' });
const submitButton = (panel: Locator): Locator => panel.getByRole('button', { name: 'Preparar solicitud' });
/** The calendar group is named after its range, e.g. "Octubre – noviembre 2026". */
const calendar = (panel: Locator): Locator => panel.getByRole('group', { name: /\b20\d{2}$/ });
const openDays = (panel: Locator): Locator => calendar(panel).getByRole('button', { disabled: false });
/** Free hours are named "HH:MM"; taken ones are "HH:MM, ocupado" and disabled. */
const openTimes = (panel: Locator): Locator => panel.getByRole('button', { name: /^\d{2}:\d{2}$/ });
const nameField = (panel: Locator): Locator => panel.getByLabel('Nombre', { exact: true });
const phoneField = (panel: Locator): Locator => panel.getByLabel('Teléfono / WhatsApp');

async function toPreference(panel: Locator, reasonLabel = 'Evaluación general'): Promise<void> {
  await reason(panel, reasonLabel).check();
  await continueButton(panel).click();
  await expect(stepTitle(panel, '¿Prefieres un área en particular?')).toBeFocused();
}

async function toSlot(panel: Locator, reasonLabel?: string): Promise<void> {
  await toPreference(panel, reasonLabel);
  await continueButton(panel).click();
  await expect(stepTitle(panel, 'Elige día y hora')).toBeFocused();
}

/** Picks the first day with availability and its first free hour. */
async function pickFirstSlot(panel: Locator): Promise<{ date: string; time: string }> {
  const day = openDays(panel).first();
  const date = (await day.getAttribute('aria-label')) ?? '';
  await day.click();
  await expect(day).toHaveAttribute('aria-pressed', 'true');
  const hour = openTimes(panel).first();
  const time = (await hour.textContent()) ?? '';
  await hour.click();
  await expect(hour).toHaveAttribute('aria-pressed', 'true');
  // "Martes 13 de octubre · 10:30"
  await expect(panel.getByText(`${date} · ${time}`, { exact: true })).toBeVisible();
  return { date, time };
}

async function toContact(panel: Locator, reasonLabel?: string): Promise<{ date: string; time: string }> {
  await toSlot(panel, reasonLabel);
  const slot = await pickFirstSlot(panel);
  await continueButton(panel).click();
  await expect(stepTitle(panel, '¿A quién le confirmamos?')).toBeFocused();
  return slot;
}

async function confirmRequest(panel: Locator): Promise<void> {
  await nameField(panel).fill(CONTACT.name);
  await phoneField(panel).fill(CONTACT.phone);
  await submitButton(panel).click();
  await expect(stepTitle(panel, 'Solicitud preparada.')).toBeFocused();
}

/** The confirmation ticket: weekday, day and "de <month> · <time>", reason and preference. */
async function expectTicket(
  panel: Locator,
  expected: { date: string; time: string; reason: string; preference: string },
): Promise<void> {
  const [, weekday, day, month] = /^(\S+) (\d+) de (\S+)$/.exec(expected.date) ?? [];
  await expect(panel.getByText(weekday.toUpperCase(), { exact: true })).toBeVisible();
  await expect(panel.getByText(day, { exact: true })).toBeVisible();
  await expect(panel.getByText(`de ${month} · ${expected.time}`)).toBeVisible();
  await expect(panel.getByText(expected.reason, { exact: true })).toBeVisible();
  await expect(panel.getByText(expected.preference, { exact: true })).toBeVisible();
  await expect(panel.getByText(DEMO_NOTICE)).toBeVisible();
}

test.describe('Lúmina Dental routing', () => {
  test.use({ viewport: DESKTOP });

  test('/portfolio lists Clínica Dental as a published demo and opens it', async ({ page }) => {
    const response = await page.goto('/portfolio');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1, name: 'Concept Demos' })).toBeVisible();

    const card = page.getByRole('main').getByRole('link', { name: /Lúmina Dental/ });
    await expect(card).toHaveAttribute('href', DEMO_URL);
    await card.click();

    // First visit to the showcase route in this run: the dev server compiles it
    // before the client-side navigation can finish.
    await expect(page).toHaveURL(new RegExp(`${DEMO_URL}$`), { timeout: 60_000 });
    await expect(page.getByRole('heading', { level: 1, name: /Tu sonrisa empieza con sentirte/ })).toBeVisible();
  });

  test('loads as a Concept Demo without the DevSure chrome', async ({ page }) => {
    await openDemo(page);

    await expect(page.getByRole('heading', { level: 1, name: /Tu sonrisa empieza con sentirte/ })).toBeVisible();
    // Disclosure in the first screen: the top bar and the hero badge.
    await expect(page.getByText('Lúmina Dental es una marca ficticia diseñada por DevSure')).toBeInViewport();
    await expect(page.locator('#inicio').getByText('CONCEPT DEMO', { exact: true })).toBeInViewport();
    await expect(page.getByRole('contentinfo').getByText('Un Concept Demo de DevSure')).toBeVisible();

    // The showcase brings its own navigation; DevSure's header is not rendered.
    await expect(page.getByRole('navigation', { name: 'Navegación de Lúmina Dental' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Navegación principal' })).toHaveCount(0);
  });

  test('goes back to the Portfolio from the demo bar and the footer', async ({ page }) => {
    await openDemo(page);

    await page.getByRole('link', { name: 'Portfolio DevSure' }).click();
    await expect(page).toHaveURL(/\/portfolio$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Concept Demos' })).toBeVisible();

    await openDemo(page);
    await page.getByRole('contentinfo').getByRole('link', { name: 'Volver a Portfolio' }).click();
    await expect(page).toHaveURL(/\/portfolio$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Concept Demos' })).toBeVisible();
  });

  test('the DevSure CTA leads to the contact section of the home', async ({ page }) => {
    await openDemo(page);
    await stretchHome(page);

    const cta = page.getByRole('link', { name: 'Hablemos de tu proyecto' });
    await expect(cta).toHaveAttribute('href', '/#contacto');
    await cta.click();

    await expect(page).toHaveURL(/\/#contacto$/);
    await expect(page.getByRole('navigation', { name: 'Navegación principal' })).toBeVisible();
    await expect(page.locator('#contact-title')).toBeInViewport();
  });

  // Listed in the catalog but not published, and a published slug in another case.
  for (const slug of ['colegio', 'CLINICA-DENTAL']) {
    test(`unpublished slug /portfolio/${slug} answers 404`, async ({ page }) => {
      const response = await page.goto(`/portfolio/${slug}`);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole('heading', { level: 1, name: 'Este espacio todavía no existe.' })).toBeVisible();
      await expect(page.getByRole('navigation', { name: 'Navegación principal' })).toBeVisible();
    });
  }
});

test.describe('Lúmina Dental on desktop', () => {
  test.use({ viewport: DESKTOP });

  test('shows the treatments, each one with a way to book it', async ({ page }) => {
    await openDemo(page);
    const section = treatments(page);

    await expect(section.getByRole('heading', { level: 2, name: 'Empieza por lo que necesitas hoy.' })).toBeVisible();
    for (const name of ['Evaluación general', 'Limpieza y prevención', 'Ortodoncia']) {
      await expect(section.getByRole('heading', { level: 3, name })).toBeVisible();
    }
    // Five more areas in the index below the featured three.
    await expect(section.getByRole('listitem')).toHaveCount(5);
    await expect(section.getByRole('link', { name: /^Agendar/ })).toHaveCount(8);
  });

  test('booking from a treatment card starts the request with that reason', async ({ page }) => {
    await openDemo(page);
    const panel = inlinePanel(page);

    await treatments(page).getByRole('link', { name: 'Agendar: Limpieza y prevención' }).click();

    // Desktop: no dialog; the section comes into view and focus lands on step 1.
    await expect(bookingDialog(page)).toHaveCount(0);
    await expect(stepTitle(panel, '¿Qué te trae a la clínica?')).toBeFocused();
    await expect(panel.getByRole('heading', { level: 2, name: 'Agenda tu cita en cuatro pasos.' })).toBeInViewport();
    await expect(reason(panel, 'Limpieza y prevención')).toBeChecked();
    await expect(panel.getByText('ELEGIDO EN TRATAMIENTOS')).toBeVisible();
    // The card is marked, visibly and in text.
    await expect(treatments(page).getByText('En tu solicitud')).toHaveCount(1);

    // A treatment from the index arrives as "Otro tratamiento" with its option.
    await treatments(page).getByRole('link', { name: 'Agendar: Implantes' }).click();
    await expect(reason(panel, 'Otro tratamiento')).toBeChecked();
    await expect(panel.getByRole('button', { name: 'Implantes', pressed: true })).toBeVisible();
    await expect(treatments(page).getByText('En tu solicitud')).toHaveCount(1);
  });

  test('"Agendar una cita" takes the visitor to the inline appointment instead of opening a dialog', async ({ page }) => {
    await openDemo(page);

    await heroCta(page).click();

    await expect(bookingDialog(page)).toHaveCount(0);
    const panel = inlinePanel(page);
    await expect(panel.getByRole('heading', { level: 2, name: 'Agenda tu cita en cuatro pasos.' })).toBeFocused();
    await expect(panel).toBeInViewport();
    await expect(stepTitle(panel, '¿Qué te trae a la clínica?')).toBeVisible();
    await expect(panel.getByRole('list', { name: 'Pasos de la solicitud' }).getByRole('listitem')).toHaveCount(4);
  });

  test('step 1 needs a reason; "No estoy seguro" and "Otro tratamiento" are valid ones', async ({ page }) => {
    await openDemo(page);
    const panel = inlinePanel(page);

    await expect(panel.getByRole('radio', { checked: true })).toHaveCount(0);
    await continueButton(panel).click();
    const alert = panel.getByRole('alert');
    await expect(alert).toHaveText('Elige un motivo para continuar. Si no estás seguro, marca «No estoy seguro».');
    await expect(panel.getByRole('group', { name: 'Motivo de la cita' })).toHaveAccessibleDescription(/Elige un motivo/);
    await expect(stepTitle(panel, '¿Qué te trae a la clínica?')).toBeVisible();

    // "Otro tratamiento" reveals its optional detail; one option can be chosen.
    await expect(panel.getByRole('group', { name: 'Si ya sabes cuál, indícalo (opcional)' })).toHaveCount(0);
    await reason(panel, 'Otro tratamiento').check();
    await expect(alert).toHaveCount(0);
    const options = panel.getByRole('group', { name: 'Si ya sabes cuál, indícalo (opcional)' });
    await expect(options.getByRole('button')).toHaveCount(4);
    await options.getByRole('button', { name: 'Endodoncia' }).click();
    await expect(options.getByRole('button', { name: 'Endodoncia' })).toHaveAttribute('aria-pressed', 'true');
    await expect(options.getByRole('button', { pressed: true })).toHaveCount(1);

    // "No estoy seguro" is a real path: it explains itself and lets the visitor go on.
    await reason(panel, 'No estoy seguro').check();
    await expect(options).toHaveCount(0);
    await expect(panel.getByText('Está bien no saberlo.')).toBeVisible();
    await continueButton(panel).click();
    await expect(stepTitle(panel, '¿Prefieres un área en particular?')).toBeFocused();
  });

  test('step 2 defaults to no preference and keeps the choice when going back and forth', async ({ page }) => {
    await openDemo(page);
    const panel = inlinePanel(page);
    await toPreference(panel, 'Dolor o molestia');

    await expect(preference(panel, 'Sin preferencia')).toBeChecked();
    await preference(panel, 'Endodoncia').check();
    await expect(preference(panel, 'Sin preferencia')).not.toBeChecked();

    await backButton(panel).click();
    await expect(stepTitle(panel, '¿Qué te trae a la clínica?')).toBeFocused();
    await expect(reason(panel, 'Dolor o molestia')).toBeChecked();

    await continueButton(panel).click();
    await expect(preference(panel, 'Endodoncia')).toBeChecked();
    await continueButton(panel).click();
    await expect(stepTitle(panel, 'Elige día y hora')).toBeFocused();
    await backButton(panel).click();
    await expect(preference(panel, 'Endodoncia')).toBeChecked();
  });

  test('step 3 needs a day and an hour, and changing the day clears the hour', async ({ page }) => {
    await openDemo(page);
    const panel = inlinePanel(page);
    await toSlot(panel);

    // Days without availability cannot be chosen.
    const closedDays = calendar(panel).getByRole('button', { name: /, sin cupo$/ });
    await expect(closedDays.first()).toBeDisabled();
    await expect(calendar(panel).getByRole('button', { name: /, hoy, sin cupo$/ })).toBeDisabled();
    await expect(calendar(panel).getByRole('button', { pressed: true })).toHaveCount(0);
    await expect(panel.getByText('Elige primero un día para ver sus horarios.')).toBeVisible();

    // Nothing chosen.
    await continueButton(panel).click();
    await expect(panel.getByRole('alert')).toHaveText('Elige un día y una hora para continuar.');
    await expect(stepTitle(panel, 'Elige día y hora')).toBeVisible();

    // A day without an hour is not enough.
    const firstDay = openDays(panel).first();
    await firstDay.click();
    await expect(firstDay).toHaveAttribute('aria-pressed', 'true');
    await expect(panel.getByRole('alert')).toHaveCount(0);
    await continueButton(panel).click();
    await expect(panel.getByRole('alert')).toHaveText('Elige una hora disponible para ese día.');

    const hour = openTimes(panel).first();
    await hour.click();
    await expect(hour).toHaveAttribute('aria-pressed', 'true');
    await expect(panel.getByRole('alert')).toHaveCount(0);

    // Another day: the hour chosen for the first one does not carry over.
    const lastDay = openDays(panel).last();
    await lastDay.click();
    await expect(lastDay).toHaveAttribute('aria-pressed', 'true');
    await expect(firstDay).toHaveAttribute('aria-pressed', 'false');
    await expect(panel.getByRole('button', { name: /^\d{2}:\d{2}/, pressed: true })).toHaveCount(0);
    await continueButton(panel).click();
    await expect(panel.getByRole('alert')).toHaveText('Elige una hora disponible para ese día.');

    await openTimes(panel).first().click();
    await continueButton(panel).click();
    await expect(stepTitle(panel, '¿A quién le confirmamos?')).toBeFocused();
  });

  test('step 4 validates name and phone, focuses the first error and prepares the demo request', async ({ page }) => {
    await openDemo(page);
    const panel = inlinePanel(page);
    await toPreference(panel, 'Ortodoncia');
    await preference(panel, 'Odontopediatría').check();
    await continueButton(panel).click();
    const slot = await pickFirstSlot(panel);
    await continueButton(panel).click();
    await expect(stepTitle(panel, '¿A quién le confirmamos?')).toBeFocused();

    // Empty form: both errors, focus on the first invalid field.
    await submitButton(panel).click();
    await expect(nameField(panel)).toBeFocused();
    await expect(nameField(panel)).toHaveAttribute('aria-invalid', 'true');
    await expect(nameField(panel)).toHaveAccessibleDescription('Escribe tu nombre para preparar la solicitud.');
    await expect(phoneField(panel)).toHaveAttribute('aria-invalid', 'true');
    await expect(phoneField(panel)).toHaveAccessibleDescription('Indica un teléfono de al menos 7 dígitos.');
    await expect(stepTitle(panel, 'Solicitud preparada.')).toHaveCount(0);

    // Name fixed, phone too short: focus moves to the phone.
    await nameField(panel).fill(CONTACT.name);
    await expect(nameField(panel)).toHaveAttribute('aria-invalid', 'false');
    await phoneField(panel).fill('70 00');
    await submitButton(panel).click();
    await expect(phoneField(panel)).toBeFocused();
    await expect(phoneField(panel)).toHaveAttribute('aria-invalid', 'true');

    // Optional fields stay optional: email and comment are left empty.
    await expect(panel.getByLabel(/^Email/)).toHaveValue('');
    await expect(panel.getByLabel(/^Comentario/)).toHaveAccessibleDescription('No incluyas diagnósticos ni datos médicos.');
    await panel.getByRole('group', { name: /primera visita/ }).getByRole('button', { name: 'Sí' }).click();

    await phoneField(panel).fill(CONTACT.phone);
    await submitButton(panel).click();

    await expect(stepTitle(panel, 'Solicitud preparada.')).toBeFocused();
    await expect(panel.getByText('Gracias, Ana.')).toBeVisible();
    await expectTicket(panel, { ...slot, reason: 'Ortodoncia', preference: 'Odontopediatría' });
    await expect(submitButton(panel)).toHaveCount(0);
  });

  test('"No estoy seguro" is confirmed as a general evaluation with no preference', async ({ page }) => {
    await openDemo(page);
    const panel = inlinePanel(page);
    const slot = await toContact(panel, 'No estoy seguro');

    await confirmRequest(panel);

    await expectTicket(panel, { ...slot, reason: 'Evaluación general', preference: 'Sin preferencia' });
  });

  test('completing the request stays in the browser: nothing is sent, opened or stored', async ({ page, context }) => {
    const writes: string[] = [];
    const external: string[] = [];
    const popups: string[] = [];
    page.on('request', (request) => {
      const url = new URL(request.url());
      if (request.method() !== 'GET') writes.push(`${request.method()} ${request.url()}`);
      if (/^https?:$/.test(url.protocol) && !['127.0.0.1', 'localhost'].includes(url.hostname)) external.push(request.url());
    });
    context.on('page', (popup) => popups.push(popup.url()));

    await openDemo(page);
    // No channel out of the demo: no WhatsApp, email or phone links anywhere.
    await expect(page.locator('a[href^="mailto:"], a[href^="tel:"], a[href*="wa.me"], a[href*="whatsapp"]')).toHaveCount(0);
    const storage = () =>
      page.evaluate(() => JSON.stringify([Object.entries(localStorage), Object.entries(sessionStorage), document.cookie]));
    const storageBefore = await storage();

    const panel = inlinePanel(page);
    await toContact(panel);
    await panel.getByLabel(/^Email/).fill('ana@example.com');
    await panel.getByLabel(/^Comentario/).fill('Prefiero la tarde');
    await confirmRequest(panel);
    await expect(panel.getByText(DEMO_NOTICE)).toBeVisible();

    expect(writes).toEqual([]);
    expect(external).toEqual([]);
    expect(popups).toEqual([]);
    await expect(page).toHaveURL(new RegExp(`${DEMO_URL}$`));
    expect(await storage()).toBe(storageBefore);

    // Nothing was kept: a reload starts an empty request.
    await openDemo(page);
    await expect(stepTitle(panel, '¿Qué te trae a la clínica?')).toBeVisible();
    await expect(panel.getByRole('radio', { checked: true })).toHaveCount(0);
    expect(writes).toEqual([]);
  });

  test('"Nueva solicitud" clears the previous request', async ({ page }) => {
    await openDemo(page);
    const panel = inlinePanel(page);
    await toPreference(panel, 'Estética dental');
    await preference(panel, 'Odontología general').check();
    await continueButton(panel).click();
    await pickFirstSlot(panel);
    await continueButton(panel).click();
    await confirmRequest(panel);

    await panel.getByRole('button', { name: 'Nueva solicitud' }).click();

    await expect(stepTitle(panel, '¿Qué te trae a la clínica?')).toBeFocused();
    await expect(panel.getByRole('radio', { checked: true })).toHaveCount(0);
    await toPreference(panel);
    await expect(preference(panel, 'Sin preferencia')).toBeChecked();
    await continueButton(panel).click();
    await expect(calendar(panel).getByRole('button', { pressed: true })).toHaveCount(0);
    await pickFirstSlot(panel);
    await continueButton(panel).click();
    await expect(nameField(panel)).toHaveValue('');
    await expect(phoneField(panel)).toHaveValue('');
  });

  test('booking a treatment after a confirmation starts a clean request with only that treatment', async ({ page }) => {
    await openDemo(page);
    const panel = inlinePanel(page);
    await toPreference(panel, 'Estética dental');
    await preference(panel, 'Odontología general').check();
    await continueButton(panel).click();
    await pickFirstSlot(panel);
    await continueButton(panel).click();
    await confirmRequest(panel);

    await treatments(page).getByRole('link', { name: 'Agendar: Ortodoncia' }).click();

    await expect(stepTitle(panel, '¿Qué te trae a la clínica?')).toBeVisible();
    await expect(reason(panel, 'Ortodoncia')).toBeChecked();
    await expect(panel.getByRole('radio', { checked: true })).toHaveCount(1);
    await continueButton(panel).click();
    await expect(preference(panel, 'Sin preferencia')).toBeChecked();
    await continueButton(panel).click();
    await expect(calendar(panel).getByRole('button', { pressed: true })).toHaveCount(0);
    await pickFirstSlot(panel);
    await continueButton(panel).click();
    await expect(nameField(panel)).toHaveValue('');
    await expect(phoneField(panel)).toHaveValue('');
  });
});

test.describe('Lúmina Dental calendar with a fixed clock', () => {
  // The only test that names dates. The browser clock and time zone are set
  // explicitly: Tuesday 13 October 2026, 10:00 in La Paz.
  test.use({ viewport: DESKTOP, timezoneId: 'America/La_Paz' });

  test('availability is relative to the visitor\'s day', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2026-10-13T10:00:00-04:00'));
    await openDemo(page);
    const panel = inlinePanel(page);
    await toSlot(panel);

    const days = panel.getByRole('group', { name: 'Octubre – noviembre 2026' });
    // Five weeks from the Monday of the current one.
    await expect(days.getByRole('button')).toHaveCount(35);
    await expect(days.getByRole('button', { name: 'Lunes 12 de octubre, sin cupo' })).toBeDisabled();
    await expect(days.getByRole('button', { name: 'Martes 13 de octubre, hoy, sin cupo' })).toBeDisabled();
    await expect(days.getByRole('button', { name: 'Domingo 18 de octubre, sin cupo' })).toBeDisabled();
    // Bookable: the 21 days after today, Monday to Saturday.
    await expect(openDays(panel).first()).toHaveAccessibleName('Miércoles 14 de octubre');
    await expect(openDays(panel).last()).toHaveAccessibleName('Martes 3 de noviembre');
    await expect(days.getByRole('button', { name: 'Miércoles 4 de noviembre, sin cupo' })).toBeDisabled();
    await expect(openDays(panel)).toHaveCount(18);

    // Saturdays only offer the morning.
    await days.getByRole('button', { name: 'Sábado 17 de octubre' }).click();
    const hours = panel.getByRole('group', { name: 'Sábado 17 de octubre' });
    await expect(hours.getByRole('button', { disabled: false })).toHaveText(['09:00', '10:30', '12:00']);
    await expect(hours.getByRole('button', { name: '15:00, ocupado' })).toBeDisabled();
  });
});

test.describe('Lúmina Dental on tablet', () => {
  test.use({ viewport: TABLET });

  test('the CTA opens the appointment as a drawer; Escape and × close it and return focus', async ({ page }) => {
    await openDemo(page);
    const trigger = heroCta(page);
    const dialog = bookingDialog(page);
    await expect(inertPage(page)).toHaveCount(0);

    await trigger.click();

    await expect(dialog).toBeVisible();
    await expect(dialog).toBeFocused();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(stepTitle(dialog, '¿Qué te trae a la clínica?')).toBeVisible();
    // A side drawer: narrower than the screen, with the page behind it inert.
    await expect.poll(async () => (await dialog.boundingBox())?.width).toBe(480);
    await expect(inertPage(page)).toHaveCount(1);
    // Going back from the initial focus target wraps inside the dialog.
    await page.keyboard.press('Shift+Tab');
    await expect(dialog.locator(':focus')).toHaveCount(1);

    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(inertPage(page)).toHaveCount(0);
    await expect(trigger).toBeFocused();

    await trigger.click();
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Cerrar la agenda' }).click();
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test('completes the request inside the drawer and keeps it after closing and reopening', async ({ page }) => {
    await openDemo(page);
    await heroCta(page).click();
    const dialog = bookingDialog(page);
    const slot = await toContact(dialog, 'Limpieza y prevención');

    // Closing does not lose the request in progress.
    await dialog.getByRole('button', { name: 'Cerrar la agenda' }).click();
    await expect(dialog).toHaveCount(0);
    await heroCta(page).click();
    await expect(stepTitle(dialog, '¿A quién le confirmamos?')).toBeVisible();

    await confirmRequest(dialog);
    await expectTicket(dialog, { ...slot, reason: 'Limpieza y prevención', preference: 'Sin preferencia' });
  });
});

test.describe('Lúmina Dental on mobile', () => {
  test.use({ viewport: MOBILE });

  test('shows the Concept Demo disclosure without horizontal overflow', async ({ page }) => {
    await openDemo(page);

    await expect(page.locator('#inicio').getByText('CONCEPT DEMO', { exact: true })).toBeInViewport();
    await expect(page.getByRole('link', { name: 'Portfolio', exact: true })).toBeInViewport();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth))
      .toBe(0);
  });

  test('the CTA opens the appointment full screen; × and Escape close it and return focus', async ({ page }) => {
    await openDemo(page);
    const trigger = heroCta(page);
    const dialog = bookingDialog(page);

    await trigger.click();

    await expect(dialog).toBeVisible();
    await expect(dialog).toBeFocused();
    await expect(inertPage(page)).toHaveCount(1);
    // Full screen: the dialog covers the viewport.
    await expect.poll(async () => await dialog.boundingBox()).toEqual({ x: 0, y: 0, ...MOBILE });

    await dialog.getByRole('button', { name: 'Cerrar la agenda' }).click();
    await expect(dialog).toHaveCount(0);
    await expect(inertPage(page)).toHaveCount(0);
    await expect(trigger).toBeFocused();

    await trigger.click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test('books a treatment from its card and completes the request in the full-screen flow', async ({ page }) => {
    await openDemo(page);
    const dialog = bookingDialog(page);

    await treatments(page).getByRole('link', { name: 'Agendar: Ortodoncia' }).click();

    await expect(dialog).toBeVisible();
    await expect(reason(dialog, 'Ortodoncia')).toBeChecked();
    await continueButton(dialog).click();
    await expect(stepTitle(dialog, '¿Prefieres un área en particular?')).toBeFocused();
    await continueButton(dialog).click();
    const slot = await pickFirstSlot(dialog);
    await continueButton(dialog).click();

    // Validation also moves focus inside the dialog.
    await submitButton(dialog).click();
    await expect(nameField(dialog)).toBeFocused();
    await expect(nameField(dialog)).toHaveAccessibleDescription('Escribe tu nombre para preparar la solicitud.');

    await confirmRequest(dialog);
    await expectTicket(dialog, { ...slot, reason: 'Ortodoncia', preference: 'Sin preferencia' });
  });
});
