import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, before, test } from 'node:test';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

// The Lúmina Dental reducer and its calendar rule are pure TypeScript modules.
// They are transpiled as they are (with the project's own `typescript`) and
// run here, so these tests exercise the real code and not a copy of it.

const source = new URL('../src/features/showcase/clinica-dental/', import.meta.url);
const TODAY = '2026-10-13'; // A Tuesday.

let dir;
let reducer;
let createInitialState;
let data;
let reducerSource;

before(async () => {
  dir = await mkdtemp(join(tmpdir(), 'lumina-reducer-'));
  for (const name of ['appointment-data', 'appointment-state']) {
    const code = await readFile(new URL(`${name}.ts`, source), 'utf8');
    if (name === 'appointment-state') reducerSource = code;
    const { outputText } = ts.transpileModule(code, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    });
    await writeFile(join(dir, `${name}.mjs`), outputText.replaceAll("'./appointment-data'", "'./appointment-data.mjs'"));
  }
  data = await import(pathToFileURL(join(dir, 'appointment-data.mjs')).href);
  ({ appointmentReducer: reducer, createInitialState } = await import(pathToFileURL(join(dir, 'appointment-state.mjs')).href));
});

after(async () => {
  await rm(dir, { recursive: true, force: true });
});

const pickDate = (state, date, today = TODAY) => reducer(state, { type: 'pickDate', date, today });

test('isDateBookable: the three weeks after today, Monday to Saturday', () => {
  const { isDateBookable } = data;
  assert.equal(isDateBookable('2026-10-14', TODAY), true); // tomorrow
  assert.equal(isDateBookable('2026-10-17', TODAY), true); // Saturday
  assert.equal(isDateBookable('2026-11-03', TODAY), true); // last day of the window
  assert.equal(isDateBookable(TODAY, TODAY), false); // today
  assert.equal(isDateBookable('2026-10-12', TODAY), false); // past
  assert.equal(isDateBookable('2026-10-18', TODAY), false); // Sunday
  assert.equal(isDateBookable('2026-11-04', TODAY), false); // past the window
  assert.equal(isDateBookable('', TODAY), false);
  assert.equal(isDateBookable('14/10/2026', TODAY), false);
  assert.equal(isDateBookable('2026-10-14', ''), false);
});

test('the calendar and the rule agree on every day shown', () => {
  const days = data.buildCalendar(TODAY);
  assert.equal(days.length, 35);
  for (const day of days) assert.equal(day.available, data.isDateBookable(day.iso, TODAY), day.iso);
  assert.equal(days.filter((day) => day.available).length, 18);
});

test('pickDate accepts a bookable date', () => {
  const state = pickDate(createInitialState(), '2026-10-14');
  assert.equal(state.date, '2026-10-14');
  assert.equal(state.time, '');
});

test('pickDate ignores a date that is not bookable and leaves the state untouched', () => {
  const empty = createInitialState();
  for (const date of [TODAY, '2026-10-12', '2026-10-18', '2026-11-04', '', 'mañana']) {
    assert.equal(pickDate(empty, date), empty, date);
  }

  // With a slot already chosen: neither the day nor the hour changes.
  const chosen = reducer(pickDate(empty, '2026-10-14'), { type: 'pickTime', time: '09:00' });
  assert.equal(chosen.time, '09:00');
  const afterInvalid = pickDate(chosen, '2026-10-18');
  assert.equal(afterInvalid, chosen);
  assert.equal(afterInvalid.date, '2026-10-14');
  assert.equal(afterInvalid.time, '09:00');

  // And it cannot be used to get past step 3.
  let state = { ...empty, step: 3 };
  state = reducer(pickDate(state, '2026-10-18'), { type: 'next' });
  assert.equal(state.step, 3);
  assert.deepEqual(state.errors, { slot: true });
});

test('pickDate with a new bookable date clears the hour chosen for the previous one', () => {
  const chosen = reducer(pickDate(createInitialState(), '2026-10-14'), { type: 'pickTime', time: '09:00' });
  const moved = pickDate(chosen, '2026-10-15');
  assert.equal(moved.date, '2026-10-15');
  assert.equal(moved.time, '');
});

test('the reducer decides with the day it is given and never reads the clock', () => {
  assert.equal(pickDate(createInitialState(), '2026-10-14', '2026-10-13').date, '2026-10-14');
  assert.equal(pickDate(createInitialState(), '2026-10-14', '2026-10-14').date, '');
  assert.doesNotMatch(reducerSource, /Date\.now|new Date\(/);
});
