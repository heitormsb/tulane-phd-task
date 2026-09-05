'use client';
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import type { SiteCopy } from '../../i18n';

export default function DemoApp({ copy }: { copy: SiteCopy }) {
  const { demo, sources } = copy;
  const [phase, setPhase] = useState(0);
  const [activeTab, setActiveTab] = useState<'query' | 'sources' | 'audit'>('query');
  const [question, setQuestion] = useState(demo.defaultQuestion);
  const [activeSourceIds, setActiveSourceIds] = useState(sources.map((source) => source.id));

  useEffect(() => {
    if (phase === 0 || phase === 4) return;
    const timer = window.setTimeout(() => setPhase((current) => Math.min(current + 1, 4)), 760);
    return () => window.clearTimeout(timer);
  }, [phase]);

  function runDemo() {
    if (activeSourceIds.length === 0) return;
    setActiveTab('query');
    setPhase(1);
  }

  function toggleSource(sourceId: string) {
    if (phase > 0 && phase < 4) return;
    setActiveSourceIds((current) => current.includes(sourceId) ? current.filter((id) => id !== sourceId) : [...current, sourceId]);
    setPhase(0);
  }

  function writeQuestion(nextQuestion: string) {
    setQuestion(nextQuestion);
    setPhase(0);
  }

  function generateDemoQuestion() {
    setQuestion(demo.defaultQuestion);
    setPhase(0);
  }

  const isRunning = phase > 0 && phase < 4;
  const activeSources = sources.filter((source) => activeSourceIds.includes(source.id));
  const numberFormatter = useMemo(() => new Intl.NumberFormat(copy.htmlLang), [copy.htmlLang]);
  const percentFormatter = useMemo(() => new Intl.NumberFormat(copy.htmlLang, { style: 'percent', maximumFractionDigits: 1 }), [copy.htmlLang]);
  const normalizedQuestion = question.toLocaleLowerCase(copy.htmlLang);
  const matchesAny = (keywords: readonly string[]) => keywords.some((keyword) => normalizedQuestion.includes(keyword));
  const currentResult = matchesAny(demo.keywords.readmission)
    ? { ...demo.result.readmission, value: percentFormatter.format(0.084) }
    : matchesAny(demo.keywords.cohort)
      ? { ...demo.result.cohort, value: numberFormatter.format(2847) }
      : matchesAny(demo.keywords.hospitalization)
        ? demo.result.hospitalization
        : demo.result.fallback;
  const hospitalCount = activeSources.filter((source) => source.kind === demo.hospitalKind).length;
  const hasPublicSource = activeSourceIds.includes('publica');
  const sourceSummary = [hospitalCount ? `${hospitalCount} ${hospitalCount === 1 ? demo.hospitalSingular : demo.hospitalPlural}` : '', hasPublicSource ? demo.publicSource : ''].filter(Boolean).join(' + ');
  const sourceStatus = demo.statuses[phase];
  const auditEvents = demo.auditEvents.map((event) => event.phase === 1 ? { ...event, text: `${activeSources.length} ${event.text}` } : event);

  return (
    <div className="demo-window" aria-label={demo.ariaLabel}>
      <div className="demo-topbar">
        <div className="demo-title">
          <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
          <img src="/assets/tessila-symbol.svg" alt="" />
          <span>Tessila Fabric</span>
        </div>
        <div className="demo-tabs" role="tablist" aria-label={demo.tabsAriaLabel}>
          {[
            { id: 'query', label: demo.tabs[0] },
            { id: 'sources', label: demo.tabs[1] },
            { id: 'audit', label: demo.tabs[2] },
          ].map((tab) => (
            <button type="button" role="tab" aria-selected={activeTab === tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id as typeof activeTab)} key={tab.id}>{tab.label}</button>
          ))}
        </div>
        <span className="demo-badge"><i /> {demo.safeEnvironment}</span>
      </div>

      <div className="demo-body">
        <aside className="demo-sidebar" aria-label={demo.sourcesAriaLabel}>
          <div className="demo-sidebar-heading"><span>{demo.querySources}</span><b>{activeSources.length} {activeSources.length === 1 ? demo.activeSingular : demo.activePlural}</b></div>
          <div className="demo-source-list">
            {sources.map((source) => {
              const isActive = activeSourceIds.includes(source.id);
              return (
              <button type="button" className={`demo-source source-${source.color} ${isActive ? 'selected' : 'off'}`} aria-pressed={isActive} onClick={() => toggleSource(source.id)} disabled={isRunning} key={source.name}>
                <span className="demo-source-icon" aria-hidden="true">{source.icon}</span>
                <div><strong>{source.name}</strong><small>{source.detail}</small></div>
                <span className="source-kind">{source.kind}</span>
                <span className="source-toggle" aria-hidden="true">{isActive ? '✓' : '+'}</span>
              </button>
            );})}
          </div>
          <div className="demo-privacy"><span aria-hidden="true">◇</span><div><strong>{demo.dataAtSource}</strong><small>{demo.noTransfer}</small></div></div>
        </aside>

        <section className="demo-workspace" aria-live="polite">
          {activeTab === 'query' && (
            <div className="demo-tab-panel" role="tabpanel">
              <label className="query-label" htmlFor="demo-question">{demo.queryLabel}</label>
              <div className="query-box">
                <div className="query-input-wrap">
                  <textarea id="demo-question" rows={2} value={question} onChange={(event) => writeQuestion(event.target.value)} disabled={isRunning} placeholder={demo.queryPlaceholder} />
                  {question.trim().length === 0 && <button type="button" className="query-generate" onClick={generateDemoQuestion}><span aria-hidden="true">✦</span> {demo.generateQuestion}</button>}
                </div>
                <button type="button" className="query-run" onClick={runDemo} disabled={isRunning || activeSources.length === 0 || question.trim().length === 0}>
                  {question.trim().length === 0 ? demo.writeQuestion : activeSources.length === 0 ? demo.selectSource : phase === 0 ? demo.runQuery : isRunning ? demo.querying : demo.runAgain}
                  <span aria-hidden="true">→</span>
                </button>
              </div>

              <div className={`fabric-canvas phase-${phase}`}>
                <div className="canvas-grid" aria-hidden="true" />
                <div className="canvas-sources">
                  {sources.map((source, index) => {
                    const isActive = activeSourceIds.includes(source.id);
                    return (
                      <button type="button" className={`canvas-source source-${source.color} ${isActive ? '' : 'off'}`} aria-label={`${isActive ? demo.remove : demo.add} ${source.name} ${demo.fromQuery}`} aria-pressed={isActive} onClick={() => toggleSource(source.id)} disabled={isRunning} key={source.name}>
                        <span>{source.icon}</span><i className={phase >= 1 && isActive ? 'sending' : ''} style={{ animationDelay: `${index * 140}ms` }} />
                      </button>
                    );
                  })}
                </div>
                <div className="canvas-lines" aria-hidden="true">{sources.map((source) => <i className={activeSourceIds.includes(source.id) ? '' : 'off'} key={source.id} />)}</div>
                <div className={`fabric-engine ${phase >= 2 ? 'processing' : ''}`}>
                  <span className="engine-orbit" aria-hidden="true" />
                  <img src="/assets/tessila-symbol.svg" alt="" />
                  <strong>Tessila</strong>
                  <small>{activeSources.length === 0 ? demo.selectSource : phase < 2 ? demo.federatedOrchestrator : phase === 2 ? demo.applyingPolicies : demo.combiningAnswers}</small>
                </div>
                <div className="answer-line" aria-hidden="true"><i /></div>
                <div className={`insight-card ${phase === 4 ? 'ready' : ''}`} aria-live="polite">
                  {phase === 4 ? (
                    <><span>{demo.consolidatedInsight}</span><strong>{currentResult.value}</strong><p>{currentResult.detail}</p><small>{sourceSummary}</small></>
                  ) : (
                    <><span>{demo.answer}</span><strong>—</strong><p>{activeSources.length === 0 ? demo.activateSource : phase === 0 ? demo.runToVisualize : demo.dataStays}</p></>
                  )}
                </div>
              </div>

              <div className="demo-progress">
                {demo.progress.map((label, index) => (
                  <div className={phase > index ? 'active' : ''} key={label}><span>{phase > index + 1 ? '✓' : index + 1}</span><p>{label}</p></div>
                ))}
                <b>{sourceStatus}</b>
              </div>
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="demo-tab-panel demo-sources-panel" role="tabpanel">
              <div className="panel-heading"><div><span>{demo.sourcesPanel.eyebrow}</span><h3>{demo.sourcesPanel.title}</h3><p>{demo.sourcesPanel.description}</p></div><b>{activeSources.length} / {sources.length} {demo.sourcesPanel.selected}</b></div>
              <div className="source-manager-grid">
                {sources.map((source) => {
                  const isActive = activeSourceIds.includes(source.id);
                  return (
                    <button type="button" className={`source-manager-card source-${source.color} ${isActive ? 'selected' : ''}`} aria-pressed={isActive} onClick={() => toggleSource(source.id)} disabled={isRunning} key={source.id}>
                      <span className="manager-icon">{source.icon}</span><span className="manager-check">{isActive ? `✓ ${demo.sourcesPanel.included}` : `+ ${demo.sourcesPanel.add}`}</span>
                      <strong>{source.name}</strong><small>{source.detail}</small>
                      <span className="manager-meta"><i>{source.kind}</i><i>{source.system}</i></span>
                    </button>
                  );
                })}
              </div>
              <button type="button" className="panel-primary-action" onClick={() => setActiveTab('query')} disabled={activeSources.length === 0}>{demo.sourcesPanel.action} <span>→</span></button>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="demo-tab-panel demo-audit-panel" role="tabpanel">
              <div className="panel-heading"><div><span>{demo.auditPanel.eyebrow}</span><h3>{demo.auditPanel.title}</h3><p>{demo.auditPanel.description}</p></div><button type="button" className="audit-clear" onClick={() => setPhase(0)} disabled={phase === 0}>{demo.auditPanel.clear}</button></div>
              <div className="audit-list">
                {auditEvents.map((event) => (
                  <div className={phase >= event.phase ? 'complete' : 'pending'} key={event.title}><span>{phase >= event.phase ? '✓' : event.phase}</span><div><strong>{event.title}</strong><small>{phase >= event.phase ? event.text : demo.auditPanel.waiting}</small></div><time>{phase >= event.phase ? `00:0${event.phase}` : '—'}</time></div>
                ))}
              </div>
              <button type="button" className="panel-primary-action" onClick={() => setActiveTab('query')}>{phase === 0 ? demo.auditPanel.backAndRun : demo.auditPanel.back} <span>→</span></button>
            </div>
          )}
        </section>
      </div>
      <div className="demo-footnote">
        <span><i /> {demo.fictitiousData}</span>
        <span>{demo.authorizedOnly}</span>
      </div>
    </div>
  );
}
