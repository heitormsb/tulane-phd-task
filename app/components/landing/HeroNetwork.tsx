/* eslint-disable @next/next/no-img-element */

import type { SiteCopy } from '../../i18n';

export default function HeroNetwork({ copy }: { copy: SiteCopy['heroNetwork'] }) {
  return (
    <div className="hero-network" aria-label={copy.ariaLabel}>
      <div className="hero-network-grid" aria-hidden="true" />
      <div className="hero-node hero-node-a"><span>+</span><div><strong>{copy.hospitalA}</strong><small>{copy.clinicalData}</small></div></div>
      <div className="hero-node hero-node-b"><span>+</span><div><strong>{copy.hospitalB}</strong><small>{copy.visits}</small></div></div>
      <div className="hero-node hero-node-c"><span>◎</span><div><strong>{copy.publicSource}</strong><small>{copy.regionalContext}</small></div></div>
      <i className="hero-line line-a" /><i className="hero-line line-b" /><i className="hero-line line-c" />
      <div className="hero-core"><img src="/assets/tessila-symbol.svg" alt="" /><strong>{copy.oneQuery}</strong><span>{copy.governedFederated}</span></div>
      <div className="hero-answer"><span>{copy.consolidatedAnswer}</span><strong>{copy.withoutCopying}</strong></div>
      <div className="floating-chip chip-lock">✓ {copy.policiesApplied}</div>
      <div className="floating-chip chip-audit">● {copy.auditableRecord}</div>
    </div>
  );
}
