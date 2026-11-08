import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';

export const LeadFeedScoringView: React.FC = () => {
  const { deals, setActiveView, setSelectedContactDeal, showToast, setIsCopilotDrawerOpen, sendCopilotMessage } = useCrm();

  const [activeTab, setActiveTab] = useState<'all' | 'high_intent' | 'at_risk' | 'closing_this_month' | 'contract_sent'>('all');
  const [expandedDealId, setExpandedDealId] = useState<string | null>('horizon-cloud-labs');
  const [filterQuery, setFilterQuery] = useState('');
  const [sortBy, setSortBy] = useState<'probability' | 'value' | 'health'>('probability');
  const [activeFilters, setActiveFilters] = useState<string[]>(['ARR > $100k', 'Stage: Qualified to Contract']);
  const [bottomPrompt, setBottomPrompt] = useState('');

  // Filtering deals
  const filteredDeals = deals.filter((deal) => {
    if (activeTab === 'high_intent' && deal.category !== 'high_intent') return false;
    if (activeTab === 'at_risk' && deal.category !== 'at_risk') return false;
    if (activeTab === 'closing_this_month' && deal.category !== 'closing_this_month') return false;
    if (activeTab === 'contract_sent' && deal.category !== 'contract_sent' && deal.stage !== 'Contract Sent') return false;

    if (filterQuery) {
      const q = filterQuery.toLowerCase();
      const matchCompany = deal.company.toLowerCase().includes(q);
      const matchChampion = deal.champion.toLowerCase().includes(q);
      const matchSector = deal.sector.toLowerCase().includes(q);
      if (!matchCompany && !matchChampion && !matchSector) return false;
    }

    return true;
  });

  // Sorting deals
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (sortBy === 'probability') return b.winProbability - a.winProbability;
    if (sortBy === 'value') return b.dealValue - a.dealValue;
    if (sortBy === 'health') return b.healthScore - a.healthScore;
    return 0;
  });

  const toggleExpand = (dealId: string) => {
    setExpandedDealId(expandedDealId === dealId ? null : dealId);
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
    showToast(`Filter removed: ${filter}`, 'info');
  };

  const handleBottomPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bottomPrompt.trim()) return;
    sendCopilotMessage(bottomPrompt);
    setIsCopilotDrawerOpen(true);
    setBottomPrompt('');
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12 animate-in fade-in duration-150">
      {/* ========================================================================= */}
      {/* 1. HEADER & CONTROLS: OVERVIEW METRICS & TARGET                           */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-12 gap-4">
        {/* Target & Real-time Probabilistic Engine Card */}
        <div className="col-span-12 xl:col-span-4 glass-panel rounded-2xl p-5 relative overflow-hidden ai-glow flex flex-col justify-between">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary-container/10 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">track_changes</span>
                <span className="text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold">
                  Q3 Velocity Target
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-tertiary/15 text-tertiary border border-tertiary/30">
                91.4% Pacing Ahead
              </span>
            </div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-headline font-bold text-on-surface tracking-tight">
                $2,840,000
              </span>
              <span className="text-xs text-outline font-mono">Target $3.10M ARR</span>
            </div>
            <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden mb-3">
              <div className="bg-gradient-to-r from-primary-container via-secondary to-tertiary h-full rounded-full w-[91.6%] shadow-[0_0_10px_#4edea3]"></div>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs text-outline pt-2 border-t border-white/5">
            <span>
              Weighted Neural Expected: <strong className="text-secondary font-mono">$2.68M</strong>
            </span>
            <span className="flex items-center gap-1 text-tertiary font-mono">
              <span className="material-symbols-outlined text-sm">trending_up</span> +$340k vs last week
            </span>
          </div>
        </div>

        {/* Segment Filter Tabs & Quick Action Control Center */}
        <div className="col-span-12 xl:col-span-8 glass-panel rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
            <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-xl border border-white/5 overflow-x-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'all'
                    ? 'bg-primary-container text-white shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                All 42
              </button>
              <button
                onClick={() => setActiveTab('high_intent')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === 'high_intent'
                    ? 'bg-primary-container text-white shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>High Intent</span>
                <span className="px-1.5 py-0.2 rounded-full bg-tertiary/20 text-tertiary text-[10px] font-bold">
                  9
                </span>
              </button>
              <button
                onClick={() => setActiveTab('at_risk')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === 'at_risk'
                    ? 'bg-primary-container text-white shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>At Risk</span>
                <span className="px-1.5 py-0.2 rounded-full bg-error/20 text-error text-[10px] font-bold">
                  4
                </span>
              </button>
              <button
                onClick={() => setActiveTab('closing_this_month')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === 'closing_this_month'
                    ? 'bg-primary-container text-white shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>Closing This Month</span>
                <span className="px-1.5 py-0.2 rounded-full bg-secondary/20 text-secondary text-[10px] font-bold">
                  7
                </span>
              </button>
              <button
                onClick={() => setActiveTab('contract_sent')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === 'contract_sent'
                    ? 'bg-primary-container text-white shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>Contract Sent</span>
                <span className="px-1.5 py-0.2 rounded-full bg-primary/20 text-primary text-[10px] font-bold">
                  3
                </span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-outline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-surface-container-high px-3 py-1.5 rounded-lg border border-white/5 text-xs font-semibold text-on-surface cursor-pointer hover:border-outline-variant focus:outline-none"
              >
                <option value="probability">Neural Win Probability</option>
                <option value="value">Deal ARR Value</option>
                <option value="health">Neural Health Score</option>
              </select>
            </div>
          </div>

          {/* Secondary Controls row: Smart NLP search bar + Telemetry */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-outline flex-1">
              <span className="material-symbols-outlined text-lg text-secondary">filter_list</span>
              <div className="relative">
                <input
                  type="text"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  placeholder="Filter by account or champion..."
                  className="h-7 pl-6 pr-2 rounded-lg bg-surface-container border border-outline-variant/30 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary"
                />
                <span className="material-symbols-outlined text-xs absolute left-1.5 top-1/2 -translate-y-1/2 text-outline">search</span>
              </div>
              <span className="hidden md:inline">Presets:</span>
              {activeFilters.map((f) => (
                <span
                  key={f}
                  className="bg-surface-container px-2.5 py-0.5 rounded-full text-xs text-on-surface border border-white/5 flex items-center gap-1"
                >
                  {f}
                  <span
                    onClick={() => removeFilter(f)}
                    className="material-symbols-outlined text-xs cursor-pointer hover:text-error"
                  >
                    close
                  </span>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-outline font-mono">Telemetry: 12 live signals parsed</span>
              <button
                onClick={() => showToast('Refreshed telemetry pipeline with 0 latency.', 'info')}
                className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-outline hover:text-on-surface border border-white/5 transition-colors"
                title="Refresh Telemetry"
              >
                <span className="material-symbols-outlined text-lg">refresh</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PIPELINE VELOCITY SUMMARY BAR                                          */}
      {/* ========================================================================= */}
      <section className="glass-panel rounded-2xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {/* Stage 1 */}
          <div className="flex flex-col gap-2 md:pr-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                <span className="text-sm font-semibold text-on-surface">1. Qualified</span>
              </div>
              <span className="text-lg font-headline font-bold text-on-surface">
                $940,000 <span className="text-xs text-outline font-normal font-mono">ARR</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-outline">
              <span>14 active opportunities</span>
              <span className="text-secondary font-medium font-mono">Avg Cycle: 18d</span>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-secondary h-full rounded-full w-[65%]"></div>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="flex flex-col gap-2 md:px-4 pt-3 md:pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-container"></div>
                <span className="text-sm font-semibold text-on-surface">2. Proposal Stage</span>
              </div>
              <span className="text-lg font-headline font-bold text-on-surface">
                $1,100,000 <span className="text-xs text-outline font-normal font-mono">ARR</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-outline">
              <span>11 opportunities in review</span>
              <span className="text-primary font-medium font-mono">Avg Cycle: 27d</span>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full rounded-full w-[82%]"></div>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="flex flex-col gap-2 md:pl-4 pt-3 md:pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
                <span className="text-sm font-semibold text-on-surface">3. Contract Execution</span>
              </div>
              <span className="text-lg font-headline font-bold text-on-surface">
                $800,000 <span className="text-xs text-outline font-normal font-mono">ARR</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-outline">
              <span>4 in procurement / Redlines</span>
              <span className="text-tertiary font-medium font-mono">Fast Track: 6d</span>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full rounded-full w-[94%]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MULTI-COLUMN DESKTOP DATA TABLE / GRID FOR DEALS & DETAILED DRAWER     */}
      {/* ========================================================================= */}
      <section className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-6 py-3.5 bg-surface-container-lowest/90 border-b border-white/10 text-xs font-mono uppercase tracking-wider text-outline font-semibold">
          <div className="col-span-3 flex items-center gap-2">
            <span>Company &amp; Sector</span>
          </div>
          <div className="col-span-2">Lead Executive &amp; Title</div>
          <div className="col-span-1 text-right">ARR (Value)</div>
          <div className="col-span-2 text-center">AI Probability / Intent</div>
          <div className="col-span-2">Neural Telemetry &amp; Signals</div>
          <div className="col-span-1">Stage / Velocity</div>
          <div className="col-span-1 text-right pr-2">Quick Triage</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/5">
          {sortedDeals.map((deal) => {
            const isExpanded = expandedDealId === deal.id;
            return (
              <div
                key={deal.id}
                className={`transition-colors relative ${
                  isExpanded ? 'border-b border-primary/40 bg-surface-container-low/60' : 'hover:bg-surface-container-low/40'
                }`}
              >
                {/* 3px Left Semantic Line */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 ${
                    deal.statusType === 'accelerating'
                      ? 'bg-tertiary'
                      : deal.statusType === 'risk'
                      ? 'bg-error'
                      : 'bg-amber-500'
                  }`}
                ></div>

                {/* Main Row Content */}
                <div className="grid grid-cols-12 px-6 py-4 items-center">
                  {/* Col 1: Company & Sector */}
                  <div className="col-span-3 flex items-center gap-3">
                    <button
                      onClick={() => toggleExpand(deal.id)}
                      className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                        isExpanded
                          ? 'bg-primary-container/20 text-primary-fixed'
                          : 'text-outline hover:text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {isExpanded ? 'keyboard_arrow_down' : 'chevron_right'}
                      </span>
                    </button>
                    <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center font-headline font-bold text-secondary border border-white/10">
                      {deal.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-on-surface flex items-center gap-1.5">
                        <span>{deal.company}</span>
                        {deal.id === 'horizon-cloud-labs' && (
                          <span className="material-symbols-outlined text-secondary text-sm">verified</span>
                        )}
                      </div>
                      <div className="text-xs text-outline">{deal.sector}</div>
                    </div>
                  </div>

                  {/* Col 2: Lead Executive */}
                  <div className="col-span-2 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-surface-container-high overflow-hidden border border-white/10 flex items-center justify-center text-xs font-bold text-primary">
                      {deal.championAvatar ? (
                        <img className="w-full h-full object-cover" src={deal.championAvatar} alt={deal.champion} />
                      ) : (
                        deal.champion[0]
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-on-surface">{deal.champion}</div>
                      <div className="text-[11px] text-outline font-mono">{deal.championRole}</div>
                    </div>
                  </div>

                  {/* Col 3: Deal Value */}
                  <div className="col-span-1 text-right">
                    <div className="text-sm font-bold text-on-surface font-mono">{deal.dealValueFormatted}</div>
                    <div className="text-[11px] text-tertiary font-mono">
                      {deal.id === 'horizon-cloud-labs' ? '+$20k expansion' : 'Base ARR'}
                    </div>
                  </div>

                  {/* Col 4: AI Win Probability */}
                  <div className="col-span-2 flex flex-col items-center justify-center px-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          deal.winProbability >= 80
                            ? 'bg-tertiary/10 text-tertiary border border-tertiary/30 emerald-glow'
                            : deal.winProbability >= 60
                            ? 'bg-secondary/10 text-secondary border border-secondary/30'
                            : 'bg-error/15 text-error border border-error/30'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            deal.winProbability >= 80 ? 'bg-tertiary animate-pulse' : deal.winProbability >= 60 ? 'bg-secondary' : 'bg-error'
                          }`}
                        ></span>
                        {deal.winProbability}% {deal.winProbability >= 90 ? 'Supercharged' : deal.winProbability >= 80 ? 'Advancing' : deal.winProbability >= 60 ? 'Moderate' : 'Critical Risk'}
                      </span>
                    </div>
                    {/* Intent bar */}
                    <div className="w-28 bg-surface-container-highest h-1 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          deal.winProbability >= 80 ? 'bg-tertiary' : deal.winProbability >= 60 ? 'bg-secondary' : 'bg-error'
                        }`}
                        style={{ width: `${deal.winProbability}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Col 5: Telemetry Signal */}
                  <div className="col-span-2 pr-2">
                    <div className="flex items-start gap-1.5 text-xs text-on-surface-variant bg-surface-container-highest/40 p-1.5 rounded-lg border border-white/5">
                      <span className="material-symbols-outlined text-sm text-tertiary shrink-0 mt-0.5">bolt</span>
                      <span className="line-clamp-2">{deal.signalSnippet}</span>
                    </div>
                  </div>

                  {/* Col 6: Stage / Velocity */}
                  <div className="col-span-1">
                    <div className="text-xs font-semibold text-secondary">{deal.stage}</div>
                    <div className="text-[11px] text-tertiary flex items-center gap-1 font-mono">
                      <span className="material-symbols-outlined text-xs">speed</span> {deal.velocity}
                    </div>
                  </div>

                  {/* Col 7: Quick Actions */}
                  <div className="col-span-1 flex items-center justify-end gap-1.5 pr-2">
                    <button
                      onClick={() => showToast(`Initiating direct phone triage with ${deal.champion}...`, 'info')}
                      className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-secondary border border-white/10 transition-colors"
                      title="Trigger Instant Phone Call"
                    >
                      <span className="material-symbols-outlined text-sm">call</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedContactDeal(deal);
                        setActiveView('copilot');
                        showToast(`Opened Copilot Studio for ${deal.company}`, 'purple');
                      }}
                      className="p-1.5 rounded-lg bg-primary-container/20 hover:bg-primary-container text-primary-fixed hover:text-white border border-primary/30 transition-all"
                      title="Generate Copilot Draft"
                    >
                      <span className="material-symbols-outlined text-sm">smart_toy</span>
                    </button>
                    <button
                      onClick={() => toggleExpand(deal.id)}
                      className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-tertiary border border-white/10 transition-colors"
                      title="View Warm Graph"
                    >
                      <span className="material-symbols-outlined text-sm">hub</span>
                    </button>
                  </div>
                </div>

                {/* DETAILED EXPAND / DRAWER PREVIEW STATE */}
                {isExpanded && (
                  <div className="px-8 py-5 bg-surface-container-lowest/90 border-t border-primary/20 grid grid-cols-12 gap-6 animate-in fade-in duration-150">
                    {/* Stakeholder Engagement Graph (4 Cols) */}
                    <div className="col-span-12 lg:col-span-4 glass-panel rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-on-surface uppercase tracking-wider">
                            <span className="material-symbols-outlined text-secondary text-base">account_tree</span>
                            <span>Stakeholder Alignment Radar</span>
                          </div>
                          <span className="text-xs text-tertiary font-bold font-mono">
                            {deal.stakeholders ? `${deal.stakeholders.length} / ${deal.stakeholders.length} Champions` : '4 / 4 Champions'}
                          </span>
                        </div>
                        {/* Stakeholder List */}
                        <div className="space-y-2.5">
                          {(deal.stakeholders || [
                            { name: `${deal.champion}`, role: 'Economic Buyer', status: 'High Intent', touchpoints: 8, initials: 'CH' },
                            { name: 'Sarah Lin', role: 'Security Compliance', status: 'Signed Off', touchpoints: 4, initials: 'SL' }
                          ]).map((sh, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2 rounded-lg bg-surface-container/60 border border-white/5"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary-fixed flex items-center justify-center text-[10px] font-bold">
                                  {sh.initials}
                                </div>
                                <div>
                                  <div className="text-xs font-semibold text-on-surface">{sh.name}</div>
                                  <div className="text-[10px] text-outline">{sh.role} · {sh.touchpoints} touchpoints</div>
                                </div>
                              </div>
                              <span className="text-xs text-tertiary font-semibold flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-xs">check_circle</span> {sh.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs text-outline font-mono">
                        <span>Avg response time: <strong className="text-on-surface">42 minutes</strong></span>
                        <span className="text-secondary font-medium">Zero blockers</span>
                      </div>
                    </div>

                    {/* Warm Intro Graph & Mutual Connectivity (4 Cols) */}
                    <div className="col-span-12 lg:col-span-4 glass-panel rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-on-surface uppercase tracking-wider">
                            <span className="material-symbols-outlined text-primary text-base">hub</span>
                            <span>Warm Connection Matrix</span>
                          </div>
                          <span className="text-xs text-primary font-bold font-mono">2 Direct Bridges</span>
                        </div>
                        <div className="space-y-2.5">
                          <div className="p-2.5 rounded-lg bg-surface-container-high/40 border border-white/5">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-on-surface">Board Member: Elena Rostova</span>
                              <span className="text-[10px] bg-primary-container/20 text-primary-fixed px-1.5 py-0.2 rounded font-mono">
                                Strength 94%
                              </span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                              Co-invested with Marcus Chen in 2022. Offered to send closing endorsement via Signal.
                            </p>
                          </div>
                          <div className="p-2.5 rounded-lg bg-surface-container-high/40 border border-white/5">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-on-surface">Peer Referral: Datadog Ex-SVP</span>
                              <span className="text-[10px] bg-secondary/20 text-secondary px-1.5 py-0.2 rounded font-mono">
                                Strength 88%
                              </span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                              Validated Cognitive CRM deployment speed during breakfast roundtable yesterday.
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => showToast('One-click executive endorsement signal dispatched via Signal & Email.', 'purple')}
                        className="mt-3 w-full py-2 rounded-lg bg-surface-container hover:bg-surface-container-high border border-white/10 text-on-surface text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm text-primary">share</span>
                        <span>Request 1-Click Executive Endorsement</span>
                      </button>
                    </div>

                    {/* AI Counter-Pitch Status & Next Move Recommendation (4 Cols) */}
                    <div className="col-span-12 lg:col-span-4 glass-panel rounded-xl p-4 flex flex-col justify-between border-l-2 border-primary">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-primary-fixed uppercase tracking-wider">
                            <span className="material-symbols-outlined text-primary text-base">psychology</span>
                            <span>AI Copilot Prescriptive Action</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary-container/30 text-primary-fixed border border-primary/40 font-bold font-mono">
                            Prescient Rec
                          </span>
                        </div>
                        <div className="bg-surface-container/70 p-3 rounded-lg border border-white/5 space-y-2 mb-3">
                          <div className="text-xs font-semibold text-on-surface">
                            Competitor (Palantir Foundry) proposed lower upfront tier.
                          </div>
                          <p className="text-xs text-on-surface-variant leading-relaxed">
                            Trigger pre-baked <strong>Executive SLA &amp; Zero-Egress Addendum</strong>. Marcus Chen reviewed cloud data egress clause 3x; offering 0% egress markup seals signature before Friday 5 PM.
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-outline font-mono">
                          <span className="material-symbols-outlined text-sm text-tertiary">check</span>
                          <span>Counter-pitch deck generated and synched to CRM files</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => {
                            showToast('Egress Addendum draft delivered to Horizon legal team.', 'success');
                          }}
                          className="flex-1 py-2 px-3 rounded-lg bg-primary-container hover:bg-primary-container/90 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-primary-container/30 transition-all active:scale-95"
                        >
                          <span className="material-symbols-outlined text-sm">send</span>
                          <span>Send Egress Addendum Draft</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedContactDeal(deal);
                            setActiveView('copilot');
                          }}
                          className="py-2 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold border border-white/10 flex items-center justify-center transition-colors"
                          title="Open Full Account Dossier"
                        >
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3.5 bg-surface-container-lowest/90 border-t border-white/10 flex items-center justify-between text-xs text-outline font-mono">
          <div className="flex items-center gap-4">
            <span>Showing {sortedDeals.length} of 42 High-Velocity Neural Accounts</span>
            <span className="w-1 h-1 rounded-full bg-outline"></span>
            <span>Aggregated Active Pipeline: <strong className="text-on-surface font-semibold">$2,840,000 ARR</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded bg-surface-container text-outline hover:text-on-surface border border-white/5 disabled:opacity-40" disabled>
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-primary-container/20 text-primary-fixed border border-primary/30 font-semibold">
              1
            </button>
            <button className="px-3 py-1 rounded bg-surface-container text-outline hover:text-on-surface border border-white/5">
              2
            </button>
            <button className="px-3 py-1 rounded bg-surface-container text-outline hover:text-on-surface border border-white/5">
              Next
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BOTTOM DOCKED EXECUTIVE RADAR / LIVE COPILOT PROMPT STRIP              */}
      {/* ========================================================================= */}
      <section className="glass-panel-elevated rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-white shadow-md shadow-primary-container/30">
            <span className="material-symbols-outlined text-xl">auto_awesome</span>
          </div>
          <div>
            <div className="text-sm font-headline font-bold text-on-surface flex items-center gap-2">
              <span>Neural Copilot Active Triage</span>
              <span className="text-[10px] font-mono bg-tertiary/15 text-tertiary px-2 py-0.5 rounded-full border border-tertiary/30">
                Ready for Execution
              </span>
            </div>
            <div className="text-xs text-outline">
              "Ask: Which 3 deals are susceptible to competitor displacement before quarter-end?"
            </div>
          </div>
        </div>

        <form onSubmit={handleBottomPrompt} className="flex items-center gap-3 flex-1 max-w-xl w-full">
          <div className="relative w-full">
            <input
              type="text"
              value={bottomPrompt}
              onChange={(e) => setBottomPrompt(e.target.value)}
              placeholder="Instruct Copilot (e.g. 'Generate warm re-intro via Elena for Sovereign Financial')..."
              className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface placeholder:text-outline/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-primary-container hover:bg-primary-container/90 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-all shadow-sm"
            >
              <span>Execute</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
        </form>

        <div className="flex items-center gap-2 text-xs font-mono text-outline">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          <span>Latency: 48ms</span>
        </div>
      </section>
    </div>
  );
};
