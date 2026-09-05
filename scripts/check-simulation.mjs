import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../app/components/landing/simulation.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { calculateSimulation, simulationData } = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));

// June: a hospital, a clinic and a public population source.
const defaults = ['aurora', 'helena', 'regional'];
assert.equal(calculateSimulation('visits', defaults).value, 262);
assert.equal(calculateSimulation('cohort', defaults).value, 115);
assert.equal(calculateSimulation('exams', defaults).value, 230);
assert.equal(calculateSimulation('visits', ['aurora', 'aurora']).value, 146);
assert.equal(calculateSimulation('visits', [...defaults, 'atlas', 'vale']).value, 430);
assert.equal(calculateSimulation('exams', [...defaults, 'atlas', 'vale']).value, 395);

for (const scenario of ['visits', 'cohort', 'exams']) {
  const withPublic = calculateSimulation(scenario, defaults);
  const withoutPublic = calculateSimulation(scenario, ['aurora', 'helena']);
  // Population is useful context; adding it must not inflate records or the chart.
  assert.deepEqual(withPublic.monthlyTotals, withoutPublic.monthlyTotals);
  assert.deepEqual(withPublic.series, withoutPublic.series);
  assert.deepEqual(withPublic.context, [{ id: 'regional', population: 120000 }]);
  assert.deepEqual(withoutPublic.context, []);
  const publicOnly = calculateSimulation(scenario, ['regional']);
  assert.equal(publicOnly.value, null);
  assert.deepEqual(publicOnly.series, []);
  assert.equal(publicOnly.context[0].population, 120000);
  const empty = calculateSimulation(scenario, []);
  assert.deepEqual(empty.monthlyTotals, Array(6).fill(null));
  assert.deepEqual(empty.context, []);
  const single = calculateSimulation(scenario, ['helena']);
  assert.deepEqual(single.monthlyTotals, single.series[0].values);
}

for (const data of Object.values(simulationData)) {
  if (data.kind === 'context') continue;
  for (const scenario of ['visits', 'cohort', 'exams']) {
    assert.equal(data[scenario].length, 6);
    assert.ok(data[scenario].every(value => Number.isInteger(value) && value >= 0));
  }
  data.cohort.forEach((count, month) => assert.ok(count <= data.visits[month]));
}
console.log('Activity totals, public context, source additions and empty selections are valid');
