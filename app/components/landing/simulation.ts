export type ScenarioId = 'visits' | 'cohort' | 'exams';

type ActivityData = { kind: 'activity'; visits: number[]; cohort: number[]; exams: number[] };
type ContextData = { kind: 'context'; population: number };

// Entirely fictitious monthly records, January–June. Records from each institution
// are disjoint; they do not represent unique people across institutions.
// Public population data provides context and never enters activity totals.
export const simulationData = {
  aurora: { kind: 'activity', visits: [120, 126, 118, 134, 140, 146], cohort: [48, 51, 46, 59, 63, 68], exams: [100, 110, 100, 120, 125, 130] },
  helena: { kind: 'activity', visits: [90, 96, 102, 98, 110, 116], cohort: [31, 34, 38, 36, 43, 47], exams: [80, 85, 90, 85, 95, 100] },
  regional: { kind: 'context', population: 120000 },
  atlas: { kind: 'activity', visits: [48, 50, 56, 61, 64, 70], cohort: [15, 18, 20, 23, 26, 29], exams: [50, 55, 60, 65, 70, 80] },
  vale: { kind: 'activity', visits: [72, 76, 80, 86, 92, 98], cohort: [22, 25, 30, 34, 37, 41], exams: [60, 65, 70, 75, 80, 85] },
} satisfies Record<string, ActivityData | ContextData>;

export type SourceId = keyof typeof simulationData;

export function calculateSimulation(scenario: ScenarioId, sourceIds: readonly SourceId[]) {
  const ids = [...new Set(sourceIds)];
  const series = ids.flatMap(id => {
    const source = simulationData[id];
    return source.kind === 'activity' ? [{ id, values: source[scenario] }] : [];
  });
  const context = ids.flatMap(id => {
    const source = simulationData[id];
    return source.kind === 'context' ? [{ id, population: source.population }] : [];
  });
  const monthlyTotals = Array.from({ length: 6 }, (_, index) =>
    series.length ? series.reduce((sum, item) => sum + item.values[index], 0) : null
  );
  return { series, context, monthlyTotals, value: monthlyTotals[5] };
}
