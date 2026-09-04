'use client';
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react';

const sources = [
  { id: 'aurora', name: 'Hospital Aurora', detail: 'Internações · 18.420 registros', kind: 'Hospital', system: 'FHIR / SQL', icon: '+', color: 'indigo' },
  { id: 'helena', name: 'Santa Helena', detail: 'Internações · 12.806 registros', kind: 'Hospital', system: 'FHIR', icon: '+', color: 'blue' },
  { id: 'publica', name: 'Dados públicos de saúde', detail: 'Indicadores regionais', kind: 'Fonte aberta', system: 'API pública', icon: '◎', color: 'teal' },
];

const defaultQuestion = 'Como evoluíram as internações por diabetes na rede em comparação com a região?';
const scheduleUrl = 'https://calendar.app.google/AEpf5q75ekxHX1mP8';

function DemoApp() {
  const [phase, setPhase] = useState(0);
  const [activeTab, setActiveTab] = useState<'query' | 'sources' | 'audit'>('query');
  const [question, setQuestion] = useState(defaultQuestion);
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
    setQuestion(defaultQuestion);
    setPhase(0);
  }

  const isRunning = phase > 0 && phase < 4;
  const activeSources = sources.filter((source) => activeSourceIds.includes(source.id));
  const normalizedQuestion = question.toLocaleLowerCase('pt-BR');
  const currentResult = normalizedQuestion.includes('reintern')
    ? { value: '8,4%', detail: 'de reinternação na rede selecionada' }
    : normalizedQuestion.includes('coorte') || normalizedQuestion.includes('critério') || normalizedQuestion.includes('quantos pacientes')
      ? { value: '2.847', detail: 'pacientes atendem aos critérios' }
      : normalizedQuestion.includes('intern') || normalizedQuestion.includes('diabetes') || normalizedQuestion.includes('região')
        ? { value: '12% abaixo', detail: 'da média regional de internações' }
        : { value: 'Resposta pronta', detail: 'indicadores autorizados foram consolidados' };
  const hospitalCount = activeSources.filter((source) => source.kind === 'Hospital').length;
  const hasPublicSource = activeSourceIds.includes('publica');
  const sourceSummary = [hospitalCount ? `${hospitalCount} ${hospitalCount === 1 ? 'hospital' : 'hospitais'}` : '', hasPublicSource ? '1 fonte pública' : ''].filter(Boolean).join(' + ');
  const sourceStatus = phase === 0 ? 'Pronta para executar' : phase === 1 ? 'Distribuindo' : phase === 2 ? 'Aplicando regras' : phase === 3 ? 'Combinando' : 'Respondido';
  const auditEvents = [
    { phase: 1, title: 'Pergunta distribuída', text: `${activeSources.length} fontes receberam a consulta.` },
    { phase: 2, title: 'Políticas locais aplicadas', text: 'Cada fonte validou finalidade e permissão.' },
    { phase: 3, title: 'Respostas autorizadas recebidas', text: 'Somente indicadores agregados retornaram.' },
    { phase: 4, title: 'Resultado consolidado', text: 'A resposta foi registrada para auditoria.' },
  ];

  return (
    <div className="demo-window" aria-label="Demonstração interativa da Tessila">
      <div className="demo-topbar">
        <div className="demo-title">
          <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
          <img src="/assets/tessila-symbol.svg" alt="" />
          <span>Tessila Fabric</span>
        </div>
        <div className="demo-tabs" role="tablist" aria-label="Áreas da demonstração">
          {[
            { id: 'query', label: 'Consulta' },
            { id: 'sources', label: 'Fontes' },
            { id: 'audit', label: 'Auditoria' },
          ].map((tab) => (
            <button type="button" role="tab" aria-selected={activeTab === tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id as typeof activeTab)} key={tab.id}>{tab.label}</button>
          ))}
        </div>
        <span className="demo-badge"><i /> Ambiente seguro</span>
      </div>

      <div className="demo-body">
        <aside className="demo-sidebar" aria-label="Fontes conectadas">
          <div className="demo-sidebar-heading"><span>Fontes da consulta</span><b>{activeSources.length} {activeSources.length === 1 ? 'ativa' : 'ativas'}</b></div>
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
          <div className="demo-privacy"><span aria-hidden="true">◇</span><div><strong>Dados na origem</strong><small>Nenhuma base é transferida.</small></div></div>
        </aside>

        <section className="demo-workspace" aria-live="polite">
          {activeTab === 'query' && (
            <div className="demo-tab-panel" role="tabpanel">
              <label className="query-label" htmlFor="demo-question">Escreva uma pergunta para esta rede</label>
              <div className="query-box">
                <div className="query-input-wrap">
                  <textarea id="demo-question" rows={2} value={question} onChange={(event) => writeQuestion(event.target.value)} disabled={isRunning} placeholder="Digite aqui uma pergunta sobre os dados da rede…" />
                  {question.trim().length === 0 && <button type="button" className="query-generate" onClick={generateDemoQuestion}><span aria-hidden="true">✦</span> Gerar uma pergunta demo</button>}
                </div>
                <button type="button" className="query-run" onClick={runDemo} disabled={isRunning || activeSources.length === 0 || question.trim().length === 0}>
                  {question.trim().length === 0 ? 'Escreva uma pergunta' : activeSources.length === 0 ? 'Selecione uma fonte' : phase === 0 ? 'Executar consulta' : isRunning ? 'Consultando…' : 'Executar novamente'}
                  <span aria-hidden="true">→</span>
                </button>
              </div>

              <div className={`fabric-canvas phase-${phase}`}>
                <div className="canvas-grid" aria-hidden="true" />
                <div className="canvas-sources">
                  {sources.map((source, index) => {
                    const isActive = activeSourceIds.includes(source.id);
                    return (
                      <button type="button" className={`canvas-source source-${source.color} ${isActive ? '' : 'off'}`} aria-label={`${isActive ? 'Remover' : 'Adicionar'} ${source.name} da consulta`} aria-pressed={isActive} onClick={() => toggleSource(source.id)} disabled={isRunning} key={source.name}>
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
                  <small>{activeSources.length === 0 ? 'Selecione uma fonte' : phase < 2 ? 'Orquestrador federado' : phase === 2 ? 'Aplicando políticas locais' : 'Combinando respostas'}</small>
                </div>
                <div className="answer-line" aria-hidden="true"><i /></div>
                <div className={`insight-card ${phase === 4 ? 'ready' : ''}`} aria-live="polite">
                  {phase === 4 ? (
                    <><span>Insight consolidado</span><strong>{currentResult.value}</strong><p>{currentResult.detail}</p><small>{sourceSummary}</small></>
                  ) : (
                    <><span>Resposta</span><strong>—</strong><p>{activeSources.length === 0 ? 'Ative uma fonte para começar.' : phase === 0 ? 'Execute a consulta para visualizar.' : 'Os dados continuam em cada fonte.'}</p></>
                  )}
                </div>
              </div>

              <div className="demo-progress">
                {['Pergunta distribuída', 'Regras aplicadas', 'Respostas combinadas'].map((label, index) => (
                  <div className={phase > index ? 'active' : ''} key={label}><span>{phase > index + 1 ? '✓' : index + 1}</span><p>{label}</p></div>
                ))}
                <b>{sourceStatus}</b>
              </div>
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="demo-tab-panel demo-sources-panel" role="tabpanel">
              <div className="panel-heading"><div><span>Configuração da consulta</span><h3>Escolha quais fontes participam</h3><p>Clique nos cartões para incluir ou remover uma fonte. Nenhum dado será transferido.</p></div><b>{activeSources.length} de {sources.length} selecionadas</b></div>
              <div className="source-manager-grid">
                {sources.map((source) => {
                  const isActive = activeSourceIds.includes(source.id);
                  return (
                    <button type="button" className={`source-manager-card source-${source.color} ${isActive ? 'selected' : ''}`} aria-pressed={isActive} onClick={() => toggleSource(source.id)} disabled={isRunning} key={source.id}>
                      <span className="manager-icon">{source.icon}</span><span className="manager-check">{isActive ? '✓ Incluída' : '+ Adicionar'}</span>
                      <strong>{source.name}</strong><small>{source.detail}</small>
                      <span className="manager-meta"><i>{source.kind}</i><i>{source.system}</i></span>
                    </button>
                  );
                })}
              </div>
              <button type="button" className="panel-primary-action" onClick={() => setActiveTab('query')} disabled={activeSources.length === 0}>Usar estas fontes na consulta <span>→</span></button>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="demo-tab-panel demo-audit-panel" role="tabpanel">
              <div className="panel-heading"><div><span>Registro demonstrativo</span><h3>Veja o rastro da consulta</h3><p>Cada etapa informa o que aconteceu sem expor os dados das instituições.</p></div><button type="button" className="audit-clear" onClick={() => setPhase(0)} disabled={phase === 0}>Limpar registro</button></div>
              <div className="audit-list">
                {auditEvents.map((event) => (
                  <div className={phase >= event.phase ? 'complete' : 'pending'} key={event.title}><span>{phase >= event.phase ? '✓' : event.phase}</span><div><strong>{event.title}</strong><small>{phase >= event.phase ? event.text : 'Aguardando execução da consulta.'}</small></div><time>{phase >= event.phase ? `00:0${event.phase}` : '—'}</time></div>
                ))}
              </div>
              <button type="button" className="panel-primary-action" onClick={() => setActiveTab('query')}>{phase === 0 ? 'Voltar e executar uma consulta' : 'Voltar para a consulta'} <span>→</span></button>
            </div>
          )}
        </section>
      </div>
      <div className="demo-footnote">
        <span><i /> Dados fictícios para fins demonstrativos</span>
        <span>O resultado recebe apenas indicadores autorizados — nunca os prontuários completos.</span>
      </div>
    </div>
  );
}

function HeroNetwork() {
  return (
    <div className="hero-network" aria-label="Hospitais e uma fonte pública conectados pela Tessila">
      <div className="hero-network-grid" aria-hidden="true" />
      <div className="hero-node hero-node-a"><span>+</span><div><strong>Hospital A</strong><small>Dados clínicos</small></div></div>
      <div className="hero-node hero-node-b"><span>+</span><div><strong>Hospital B</strong><small>Atendimentos</small></div></div>
      <div className="hero-node hero-node-c"><span>◎</span><div><strong>Fonte pública</strong><small>Contexto regional</small></div></div>
      <i className="hero-line line-a" /><i className="hero-line line-b" /><i className="hero-line line-c" />
      <div className="hero-core"><img src="/assets/tessila-symbol.svg" alt="" /><strong>Uma consulta</strong><span>governada e federada</span></div>
      <div className="hero-answer"><span>Resposta consolidada</span><strong>sem copiar as bases</strong></div>
      <div className="floating-chip chip-lock">✓ políticas aplicadas</div>
      <div className="floating-chip chip-audit">● registro auditável</div>
    </div>
  );
}

const faqs = [
  {
    question: 'A Tessila cria um novo banco de dados?',
    answer: 'Não. A Tessila conecta e consulta as fontes existentes. Os dados permanecem nos sistemas de cada instituição; apenas a resposta autorizada volta para quem fez a pergunta.',
  },
  {
    question: 'É preciso trocar os sistemas que o hospital já usa?',
    answer: 'Não. A proposta é integrar gradualmente as fontes atuais por conectores e padrões abertos, preservando investimentos, processos e responsabilidades já existentes.',
  },
  {
    question: 'Quem decide o que pode ser consultado?',
    answer: 'A própria instituição dona do dado. Políticas locais definem quais fontes, campos, finalidades e perfis podem participar de cada consulta.',
  },
  {
    question: 'Como a solução ajuda na LGPD?',
    answer: 'Ela reduz cópias desnecessárias, aplica regras antes da execução e mantém registros auditáveis. A conformidade completa também depende das bases legais, processos e controles definidos por cada organização.',
  },
  {
    question: 'A demonstração usa dados reais?',
    answer: 'Não. Todos os nomes, números e instituições exibidos nesta página são fictícios e servem somente para explicar o conceito.',
  },
];

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

function SourceDots() {
  return (
    <div className="source-dots" aria-hidden="true">
      <i /><i /><i /><i />
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Tessila — início">
          <img src="/assets/tessila-logo.svg" alt="Tessila" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#como-funciona">Como funciona</a>
          <a href="#demonstracao">Demonstração</a>
          <a href="#governanca">Governança</a>
        </nav>
        <a className="button button-small" href={scheduleUrl} target="_blank" rel="noopener noreferrer">Agendar uma conversa</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> Data fabric federado para saúde</div>
          <h1>Uma visão única dos dados, <em>sem mover nenhuma peça.</em></h1>
          <p>
            A Tessila leva a consulta até onde os dados já estão. Cada instituição mantém o controle e você recebe uma resposta consolidada, sem cópias desnecessárias.
          </p>
          <div className="hero-actions">
            <a className="button" href="#demonstracao">Testar a demonstração <span>→</span></a>
            <a className="text-link" href="#como-funciona">Entender em 60 segundos <span>↓</span></a>
          </div>
          <div className="trust-row">
            <span><b>✓</b> Dados permanecem na origem</span>
            <span><b>✓</b> Governança e LGPD desde o início</span>
          </div>
        </div>
        <div className="hero-demo"><HeroNetwork /><div className="demo-caption"><span /> Hospitais + fonte externa, conectados sem centralizar os dados</div></div>
      </section>

      <section className="plain-language" aria-label="Tessila em uma frase">
        <span className="plain-number">01</span>
        <p><strong>Pense numa pergunta, não numa migração.</strong> Em vez de reunir todos os prontuários em outro lugar, a Tessila leva a mesma pergunta até cada fonte e combina somente as respostas permitidas.</p>
        <div className="plain-metrics">
          <span><b>3+</b> fontes</span>
          <span><b>0</b> cópias</span>
          <span><b>1</b> resposta</span>
        </div>
      </section>

      <section className="section process-section" id="como-funciona">
        <div className="section-heading centered">
          <span className="section-label">Como funciona</span>
          <h2>A consulta viaja. <em>O dado não.</em></h2>
          <p>Três passos para transformar sistemas separados em uma visão útil, mantendo cada instituição no comando.</p>
        </div>

        <div className="process-grid">
          <article className="process-card">
            <span className="step-number">01</span>
            <div className="step-icon question-icon" aria-hidden="true">?</div>
            <h3>Faça uma pergunta</h3>
            <p>O usuário escreve uma pergunta de negócio ou pesquisa uma única vez.</p>
            <span className="card-example">“Quantos pacientes atendem aos critérios?”</span>
          </article>
          <article className="process-card featured">
            <span className="step-number">02</span>
            <div className="step-icon route-icon" aria-hidden="true">↗</div>
            <h3>A Tessila consulta na origem</h3>
            <p>A mesma pergunta chega a cada fonte, que aplica suas próprias permissões.</p>
            <span className="card-example">Nenhum prontuário sai da instituição</span>
          </article>
          <article className="process-card">
            <span className="step-number">03</span>
            <div className="step-icon answer-icon" aria-hidden="true">✓</div>
            <h3>Receba uma resposta única</h3>
            <p>Somente os resultados autorizados são combinados e apresentados.</p>
            <span className="card-example">Uma visão clara, rastreável e útil</span>
          </article>
        </div>
      </section>

      <section className="demo-section" id="demonstracao">
        <div className="demo-section-heading">
          <div><span className="section-label">Ambiente demonstrativo</span><h2>Veja a pergunta atravessar a rede. <em>Os dados ficam onde estão.</em></h2></div>
          <p>O exemplo combina informações internas de dois hospitais com uma referência pública regional. Assim, fica claro que a Tessila pode conectar instituições e enriquecer a análise com fontes externas.</p>
        </div>
        <DemoApp />
      </section>

      <section className="section architecture-section" aria-labelledby="architecture-title">
        <div className="architecture-copy">
          <span className="section-label">Uma imagem simples</span>
          <h2 id="architecture-title">Várias peças. <em>Uma resposta.</em></h2>
          <p>Cada organização continua cuidando da própria peça. A Tessila combina respostas de hospitais, laboratórios, fontes públicas e outros sistemas autorizados.</p>
          <ul className="check-list">
            <li><span>✓</span> Conecta fontes heterogêneas</li>
            <li><span>✓</span> Executa políticas antes da consulta</li>
            <li><span>✓</span> Entrega resultados agregados</li>
          </ul>
        </div>

        <div className="architecture-visual" aria-label="Diagrama: hospitais e fonte pública conectados à Tessila e a uma resposta consolidada">
          <div className="visual-sources">
            {[
              { name: 'Hospital Aurora', detail: 'Dados clínicos', icon: '+' },
              { name: 'Laboratório parceiro', detail: 'Resultados de exames', icon: '⌁' },
              { name: 'Fonte pública', detail: 'Contexto regional', icon: '◎' },
            ].map((source) => (
              <div className="visual-source" key={source.name}>
                <span className="mini-hospital" aria-hidden="true">{source.icon}</span>
                <div><strong>{source.name}</strong><small>{source.detail}</small></div>
                <SourceDots />
              </div>
            ))}
          </div>
          <div className="visual-connector"><span>pergunta</span><i /><i /><i /></div>
          <div className="visual-core">
            <img src="/assets/tessila-symbol.svg" alt="" />
            <strong>Tessila</strong>
            <small>Consulta federada</small>
          </div>
          <div className="visual-arrow"><i /><span>somente respostas</span></div>
          <div className="visual-result"><span>Resultado</span><strong>2.847</strong><small>indicadores combinados</small><b>0 bases copiadas</b></div>
        </div>
      </section>

      <section className="governance-section" id="governanca">
        <div className="governance-inner">
          <div className="governance-heading">
            <div className="governance-copy">
              <span className="section-label light">Governança desde o primeiro clique</span>
              <h2>Controle não é uma etapa depois. <em>É parte da consulta.</em></h2>
              <p>O modelo federado reduz movimentações desnecessárias e torna cada decisão verificável.</p>
            </div>
            <div className="governance-proof" aria-label="Exemplo de registro de uma consulta governada">
              <div className="governance-proof-head"><span><i /> Consulta #T-024</span><b>Autorizada</b></div>
              <div className="governance-proof-steps">
                <div><span>01</span><p>Identidade</p><b>Verificada</b></div>
                <i aria-hidden="true" />
                <div><span>02</span><p>Políticas locais</p><b>Aplicadas</b></div>
                <i aria-hidden="true" />
                <div><span>03</span><p>Resultado</p><b>Registrado</b></div>
              </div>
              <div className="governance-proof-foot"><span>✓ Nenhuma base foi copiada</span><span>Trilha auditável</span></div>
            </div>
          </div>
          <div className="governance-grid">
            <article><span>01</span><h3>O dado não muda de dono</h3><p>A instituição mantém custódia, contexto e responsabilidade sobre suas informações.</p></article>
            <article><span>02</span><h3>Permissão antes da execução</h3><p>Cada consulta respeita finalidade, perfil de acesso e política local.</p></article>
            <article><span>03</span><h3>Rastreabilidade ponta a ponta</h3><p>Quem perguntou, o que foi consultado e qual resposta foi entregue ficam registrados.</p></article>
            <article><span>04</span><h3>Menos superfície de risco</h3><p>Menos cópias significam menos repositórios extras para proteger e administrar.</p></article>
          </div>
        </div>
      </section>

      <section className="section audience-section">
        <div className="section-heading split-heading">
          <div><span className="section-label">Onde a Tessila ajuda</span><h2>Da operação à pesquisa, <em>sem outro silo.</em></h2></div>
          <p>A mesma camada de acesso pode responder perguntas diferentes sem criar uma cópia nova para cada projeto.</p>
        </div>
        <div className="audience-grid">
          <article><span className="audience-tag">Redes de saúde</span><h3>Visão entre unidades</h3><p>Entenda jornadas, produção e populações atendidas em hospitais e unidades distintas.</p><b>Gestão integrada →</b></article>
          <article><span className="audience-tag">Pesquisa</span><h3>Coortes multicêntricas</h3><p>Descubra a viabilidade de estudos em múltiplas instituições antes de movimentar dados sensíveis.</p><b>Pesquisa federada →</b></article>
          <article><span className="audience-tag">Qualidade</span><h3>Indicadores confiáveis</h3><p>Compare padrões assistenciais com regras claras e resultados rastreáveis.</p><b>Decisão baseada em dados →</b></article>
          <article><span className="audience-tag">Tecnologia</span><h3>Integração sustentável</h3><p>Conecte fontes existentes sem substituir tudo nem manter pipelines de cópia para sempre.</p><b>Operação simples →</b></article>
        </div>
      </section>

      <section className="values-section" id="sobre">
        <div className="values-mark"><img src="/assets/tessila-symbol.svg" alt="" /></div>
        <div className="values-copy"><span className="section-label">Por que Tessila?</span><h2>Cada peça preservada.<br /><em>A imagem completa.</em></h2></div>
        <p>“Tessila” vem de <i>tessera</i>, a pequena peça de um mosaico. É a ideia central do produto: dados separados continuam onde estão, mas passam a formar uma visão útil em conjunto.</p>
      </section>

      <section className="section faq-section" id="perguntas-frequentes">
        <div className="faq-intro"><span className="section-label">Perguntas frequentes</span><h2>O essencial, <em>sem jargão.</em></h2><p>Respostas diretas para entender a proposta antes de entrar nos detalhes técnicos.</p></div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary><span>{String(index + 1).padStart(2, '0')}</span>{faq.question}<i aria-hidden="true">+</i></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-section" id="contato">
        <div className="cta-pattern" aria-hidden="true"><img src="/assets/tessila-symbol.svg" alt="" /></div>
        <div className="cta-copy"><span className="section-label light">Próximo passo</span><h2>Que pergunta sua rede ainda não consegue responder?</h2><p>Conte o cenário. A primeira conversa serve para entender as fontes, a governança e qual prova de valor faz sentido.</p></div>
        <a className="button button-light" href={scheduleUrl} target="_blank" rel="noopener noreferrer">Agendar uma conversa <span>→</span></a>
      </section>

      <footer>
        <div className="footer-brand"><img src="/assets/tessila-logo.svg" alt="Tessila" /><p>Uma visão única dos dados, sem mover nenhuma peça.</p></div>
        <div className="footer-links"><a href="#como-funciona">Como funciona</a><a href="#governanca">Governança</a><a href="#sobre">Sobre</a><a href="#perguntas-frequentes">Perguntas frequentes</a></div>
        <div className="footer-meta"><span>© 2026 Tessila</span><a href="mailto:contato@tessila.com">contato@tessila.com</a><span>Data fabric federado para saúde</span></div>
      </footer>
    </main>
  );
}
