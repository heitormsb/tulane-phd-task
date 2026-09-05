'use client';
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import type { SiteCopy } from '../../i18n';
import { calculateSimulation, type ScenarioId, type SourceId } from './simulation';
import { emitConversion } from './conversions';

const tabIds = ['query', 'dashboard', 'sources', 'audit'] as const;
type TabId = typeof tabIds[number];

export default function DemoApp({ copy }: { copy: SiteCopy }) {
  const { demo, sources } = copy;
  const [phase, setPhase] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>('query');
  const [scenarioId, setScenarioId] = useState<ScenarioId>('visits');
  const [activeSourceIds, setActiveSourceIds] = useState(sources.map(source => source.id));
  const [addedSourceIds, setAddedSourceIds] = useState<string[]>([]);
  const [isSourceCatalogOpen, setIsSourceCatalogOpen] = useState(false);
  const isRunning = phase > 0 && phase < 4;

  useEffect(() => {
    if (phase === 0 || phase === 4) return;
    const timer = window.setTimeout(() => {
      setPhase(phase + 1);
      if (phase === 3) emitConversion('demo_completed', { locale: copy.htmlLang, scenario: scenarioId, source_count: activeSourceIds.length });
    }, 600);
    return () => window.clearTimeout(timer);
  }, [phase, scenarioId, activeSourceIds.length, copy.htmlLang]);

  const addedSources = demo.additionalSources.filter(source => addedSourceIds.includes(source.id));
  const remainingSources = demo.additionalSources.filter(source => !addedSourceIds.includes(source.id));
  const allSources = [...sources, ...addedSources];
  const activeSources = allSources.filter(source => activeSourceIds.includes(source.id));
  const scenario = demo.scenarios.find(item => item.id === scenarioId)!;
  const result = useMemo(() => calculateSimulation(scenarioId, activeSourceIds as SourceId[]), [scenarioId, activeSourceIds]);
  const numberFormatter = useMemo(() => new Intl.NumberFormat(copy.htmlLang, { maximumFractionDigits: 0 }), [copy.htmlLang]);
  const format = (value: number) => numberFormatter.format(value);
  const sourceSummary = `${activeSources.length} ${activeSources.length === 1 ? demo.sourceSingular : demo.sourcePlural}`;
  const institutionSummary = `${result.series.length} ${result.series.length === 1 ? demo.institutionSingular : demo.institutionPlural}`;
  const engineMessage = !result.series.length ? demo.selectActivitySource : [demo.federatedOrchestrator, demo.statuses[1], demo.applyingPolicies, demo.combiningAnswers, demo.statuses[4]][phase];
  const chartMax = Math.max(4, Math.ceil(Math.max(...result.series.flatMap(series => series.values), 0) / 4) * 4);
  const chartX = (index: number) => 46 + index * 84;
  const chartY = (value: number) => 178 - value / chartMax * 150;
  const connectorPath = (index: number) => {
    const divisor = Math.max(allSources.length - 1, 1);
    const sourceY = 14.5 + (index * 71 / divisor);
    const tessilaY = 30 + (index * 40 / divisor);
    return `M 9.5 ${sourceY} C 19 ${sourceY}, 29 ${tessilaY}, 39.5 ${tessilaY}`;
  };

  function runDemo() {
    if (!result.series.length || isRunning) return;
    setPhase(1);
    emitConversion('demo_started', { locale: copy.htmlLang, scenario: scenarioId, source_count: activeSources.length });
  }

  function toggleSource(sourceId: string) {
    if (isRunning) return;
    setActiveSourceIds(current => current.includes(sourceId) ? current.filter(id => id !== sourceId) : [...current, sourceId]);
    setPhase(0);
  }

  function selectScenario(id: ScenarioId) {
    if (isRunning) return;
    setScenarioId(id);
    setPhase(0);
    emitConversion('scenario_selected', { locale: copy.htmlLang, scenario: id });
  }

  function addSource(sourceId: string) {
    if (isRunning) return;
    setAddedSourceIds(current => current.includes(sourceId) ? current : [...current, sourceId]);
    setActiveSourceIds(current => current.includes(sourceId) ? current : [...current, sourceId]);
    setPhase(0);
  }

  return (
    <div className="guided-demo">
      <fieldset className="scenario-picker" disabled={isRunning}>
        <legend>{demo.scenarioLabel}</legend>
        <div>{demo.scenarios.map((item, index) => <button type="button" id={`scenario-${item.id}`} aria-pressed={scenarioId === item.id} className={scenarioId === item.id ? 'selected' : ''} onClick={() => selectScenario(item.id as ScenarioId)} key={item.id}><span aria-hidden="true">0{index + 1}</span>{item.label}</button>)}</div>
      </fieldset>
      <div className="demo-window" aria-label={demo.ariaLabel}>
        <div className="demo-topbar">
          <div className="demo-title"><img src="/assets/tessila-symbol.svg" alt="" width="24" height="24" /><span>Tessila</span></div>
          <div className="demo-tabs" role="tablist" aria-label={demo.tabsAriaLabel}>
            {tabIds.map((id, index) => <button type="button" role="tab" id={`demo-tab-${id}`} aria-controls={`demo-panel-${id}`} aria-selected={activeTab === id} tabIndex={activeTab === id ? 0 : -1} className={activeTab === id ? 'active' : ''} key={id} onClick={() => setActiveTab(id)} onKeyDown={event => {
              let next = index;
              if (event.key === 'ArrowRight') next = (index + 1) % tabIds.length;
              else if (event.key === 'ArrowLeft') next = (index + tabIds.length - 1) % tabIds.length;
              else if (event.key === 'Home') next = 0;
              else if (event.key === 'End') next = tabIds.length - 1;
              else return;
              event.preventDefault(); setActiveTab(tabIds[next]); document.getElementById(`demo-tab-${tabIds[next]}`)?.focus();
            }}>{demo.tabs[index]}</button>)}
          </div>
          <span className="demo-badge">{demo.safeEnvironment}</span>
        </div>
        <div className="demo-body">
          <aside className="demo-sidebar" aria-label={demo.sourcesAriaLabel}>
            <div className="demo-sidebar-heading"><span>{demo.querySources}</span><b>{activeSources.length}</b></div>
            <div className="demo-source-list">{allSources.map(source => <button type="button" className={`demo-source source-${source.color} ${activeSourceIds.includes(source.id) ? 'selected' : 'off'}`} aria-pressed={activeSourceIds.includes(source.id)} onClick={() => toggleSource(source.id)} disabled={isRunning} key={source.id}><span className="demo-source-icon" aria-hidden="true">{source.icon}</span><div><strong>{source.name}</strong><small>{source.detail}</small></div><span className="source-toggle" aria-hidden="true">{activeSourceIds.includes(source.id) ? '✓' : '+'}</span></button>)}</div>
            {remainingSources.length > 0 && <button type="button" className="source-add-toggle sidebar-add-source" disabled={isRunning} onClick={() => { setActiveTab('sources'); setIsSourceCatalogOpen(true); }}>{demo.sourcesPanel.addSource}<span aria-hidden="true">+</span></button>}
            <div className="demo-privacy"><div><strong>{demo.dataAtSource}</strong><small>{demo.noTransfer}</small></div></div>
          </aside>

          <section className="demo-workspace">
            {tabIds.filter(id => id !== activeTab).map(id => <div id={`demo-panel-${id}`} role="tabpanel" aria-labelledby={`demo-tab-${id}`} hidden key={id} />)}
            <div id={`demo-panel-${activeTab}`} role="tabpanel" aria-labelledby={`demo-tab-${activeTab}`} tabIndex={0} className="demo-tab-panel">
              {activeTab === 'query' && <>
                <div className="query-box"><div><span className="query-label">{demo.queryLabel}</span><h3>{scenario.question}</h3></div><button type="button" className="query-run" onClick={runDemo} disabled={isRunning || result.series.length === 0}>{!result.series.length ? demo.selectActivitySource : isRunning ? demo.querying : phase === 4 ? demo.runAgain : demo.runQuery}<span aria-hidden="true">→</span></button></div>
                <div className={`fabric-canvas phase-${phase}`}>
                  <div className="canvas-grid" aria-hidden="true" />
                  <div className="canvas-sources">{allSources.map(source => <button type="button" className={`canvas-source source-${source.color} ${activeSourceIds.includes(source.id) ? '' : 'off'}`} title={source.name} aria-label={`${activeSourceIds.includes(source.id) ? demo.remove : demo.add} ${source.name} ${activeSourceIds.includes(source.id) ? demo.fromQuery : demo.toQuery}`} aria-pressed={activeSourceIds.includes(source.id)} onClick={() => toggleSource(source.id)} disabled={isRunning} key={source.id}><span>{source.icon}</span></button>)}</div>
                  <svg className="canvas-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <defs><linearGradient id="canvas-connector-gradient" x1="9.5" x2="39.5" y1="0" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2563eb" stopOpacity=".22" /><stop offset="1" stopColor="#14b8a6" stopOpacity=".72" /></linearGradient></defs>
                    {allSources.map((source, index) => <path className={`${activeSourceIds.includes(source.id) ? '' : 'off'} ${isRunning && activeSourceIds.includes(source.id) ? 'sending' : ''}`} d={connectorPath(index)} vectorEffect="non-scaling-stroke" style={{ animationDelay: `${index * 140}ms` }} key={source.id} />)}
                  </svg>
                  <div className="answer-flow">
                    <div className={`fabric-engine ${isRunning && phase >= 2 ? 'processing' : ''}`}><span className="engine-orbit" aria-hidden="true" /><img src="/assets/tessila-symbol.svg" alt="" width="85" height="85" /><strong>Tessila</strong><small>{engineMessage}</small></div>
                    <div className="answer-line" aria-hidden="true"><i /></div>
                    <div className={`insight-card ${phase === 4 ? 'ready' : ''}`} role="status">{phase === 4 && result.value !== null ? <><span>{demo.consolidatedInsight}</span><strong>{format(result.value)}</strong><p>{scenario.resultLabel}</p><small>{institutionSummary}</small></> : <><span>{demo.answer}</span><strong>—</strong><p>{!result.series.length ? demo.activateSource : phase === 0 ? demo.runToVisualize : `${demo.statuses[phase]}…`}</p></>}</div>
                  </div>
                </div>
                <div className="demo-progress">{demo.progress.map((label, index) => <div className={phase > index ? 'active' : ''} key={label}><span>{phase > index + 1 ? '✓' : index + 1}</span><p>{label}</p></div>)}<b aria-live="polite">{result.series.length ? demo.statuses[phase] : demo.selectActivitySource}</b></div>
                {phase === 4 && <button className="panel-primary-action" type="button" onClick={() => setActiveTab('dashboard')}>{demo.viewResult}<span aria-hidden="true">→</span></button>}
              </>}

              {activeTab === 'dashboard' && <>
                <div className="panel-heading"><div><span>{demo.dashboardPanel.eyebrow}</span><h3>{demo.dashboardPanel.title}</h3><p>{scenario.question}</p></div>{activeSources.length > 0 && <b>{demo.dashboardPanel.ready}</b>}</div>
                {result.value === null ? <div className="result-prompt"><p role="status">{activeSources.length ? demo.dashboardPanel.awaitingActivity : demo.dashboardPanel.awaiting}</p><button type="button" className="query-run" onClick={() => setActiveTab('sources')}>{demo.dashboardPanel.chooseSources}</button></div> : <>
                  <div className="result-summary"><div role="status" aria-atomic="true"><strong>{format(result.value)}</strong><span>{scenario.resultLabel}</span></div><p>{scenario.explanation}</p></div>
                  <figure className="simulation-chart">
                    <figcaption><strong>{scenario.chartTitle}</strong><span>{demo.periodLabel}</span></figcaption>
                    <span className="chart-unit">{scenario.unit}</span>
                    <svg viewBox="0 0 500 212" role="img" aria-label={`${scenario.chartTitle}. ${demo.periodLabel}. ${scenario.unit}.`}>
                      {[0, 1, 2, 3, 4].map(tick => <g key={tick}><line x1="46" x2="466" y1={chartY(chartMax * tick / 4)} y2={chartY(chartMax * tick / 4)} className="chart-gridline" /><text x="37" y={chartY(chartMax * tick / 4) + 4} textAnchor="end">{numberFormatter.format(chartMax * tick / 4)}</text></g>)}
                      {demo.periods.map((period, index) => <text x={chartX(index)} y="202" textAnchor="middle" key={period}>{period}</text>)}
                      {result.series.map(series => <g className={`source-${allSources.find(source => source.id === series.id)!.color}`} key={series.id}><polyline points={series.values.map((value, index) => `${chartX(index)},${chartY(value)}`).join(' ')} fill="none" stroke="var(--accent)" strokeWidth="2.5" />{series.values.map((value, index) => <circle cx={chartX(index)} cy={chartY(value)} r="4" fill="var(--accent)" key={index}><title>{allSources.find(source => source.id === series.id)!.name} · {demo.periods[index]}: {format(value)}</title></circle>)}</g>)}
                    </svg>
                    <div className="chart-legend">{allSources.filter(source => result.series.some(series => series.id === source.id)).map(source => <span key={source.id}><i className={`source-${source.color}`} />{source.name}</span>)}</div>
                    <p className="chart-source">{demo.dashboardPanel.chartCaption}</p>
                  </figure>
                  <details className="chart-table"><summary>{demo.dashboardPanel.showValues}</summary><div className="table-scroll" tabIndex={0} role="region" aria-label={scenario.chartTitle}><table><caption>{scenario.chartTitle} · {scenario.unit}</caption><thead><tr><th scope="col">{demo.dashboardPanel.source}</th>{demo.periods.map(period => <th scope="col" key={period}>{period}</th>)}</tr></thead><tbody>{result.series.map(series => <tr key={series.id}><th scope="row">{allSources.find(source => source.id === series.id)!.name}</th>{series.values.map((value, index) => <td key={index}>{format(value)}</td>)}</tr>)}</tbody></table></div></details>
                </>}
              </>}

              {activeTab === 'sources' && <>
                <div className="panel-heading"><div><span>{demo.sourcesPanel.eyebrow}</span><h3>{demo.sourcesPanel.title}</h3><p>{demo.sourcesPanel.description}</p></div><b>{sourceSummary}</b></div>
                <div className="source-manager-grid">{allSources.map(source => <button type="button" className={`source-manager-card source-${source.color} ${activeSourceIds.includes(source.id) ? 'selected' : 'off'}`} aria-pressed={activeSourceIds.includes(source.id)} onClick={() => toggleSource(source.id)} disabled={isRunning} key={source.id}><span className="manager-icon" aria-hidden="true">{source.icon}</span><strong>{source.name}</strong><small>{source.detail}</small><span className="manager-check">{activeSourceIds.includes(source.id) ? demo.sourcesPanel.selected : demo.sourcesPanel.add}</span></button>)}</div>
                {remainingSources.length > 0 ? <div className="source-add-area"><div><strong>{demo.sourcesPanel.addSource}</strong><p>{demo.sourcesPanel.addSourceDescription}</p></div><button type="button" className="source-add-toggle" disabled={isRunning} aria-expanded={isSourceCatalogOpen} aria-controls="source-catalog" onClick={() => setIsSourceCatalogOpen(current => !current)}>{demo.sourcesPanel.addSource} +</button>{isSourceCatalogOpen && <div className="source-catalog" id="source-catalog">{remainingSources.map(source => <button type="button" className={`source-catalog-option source-${source.color}`} disabled={isRunning} onClick={() => addSource(source.id)} key={source.id}><span aria-hidden="true">{source.icon}</span><div><strong>{source.name}</strong><small>{source.detail}</small></div><b aria-hidden="true">+</b></button>)}</div>}</div> : <p>{demo.sourcesPanel.allAdded}</p>}
                <button type="button" className="panel-primary-action" onClick={() => setActiveTab('query')}>{demo.sourcesPanel.action} →</button>
              </>}

              {activeTab === 'audit' && <>
                <div className="panel-heading"><div><span>{demo.auditPanel.eyebrow}</span><h3>{demo.auditPanel.title}</h3><p>{demo.auditPanel.description}</p></div><button type="button" className="audit-clear" disabled={isRunning || phase === 0} onClick={() => setPhase(0)}>{demo.auditPanel.clear}</button></div>
                <div className="audit-list" aria-live="polite">{demo.auditEvents.map(event => <div className={phase >= event.phase ? 'complete' : 'pending'} key={event.phase}><span>{phase >= event.phase ? '✓' : event.phase}</span><div><strong>{event.title}</strong><small>{phase >= event.phase ? event.text : demo.auditPanel.waiting}</small></div></div>)}</div>
                <button type="button" className="panel-primary-action" onClick={() => setActiveTab('query')}>{demo.auditPanel.back} →</button>
              </>}
            </div>
          </section>
        </div>
        <div className="demo-footnote"><strong>{demo.fictitiousData}</strong><span>{demo.authorizedOnly}</span></div>
      </div>
    </div>
  );
}
