import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';

export const PipelineDashboardView: React.FC = () => {
  const { deals, setActiveView, setSelectedContactDeal, showToast, setIsCopilotDrawerOpen, sendCopilotMessage } = useCrm();
  const [period, setPeriod] = useState<'Q3 FY25' | 'Trailing 30D' | 'Full Year'>('Q3 FY25');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [miniPrompt, setMiniPrompt] = useState('');

  const priorityDeals = deals.slice(0, 4);

  const handleMiniPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!miniPrompt.trim()) return;
    sendCopilotMessage(miniPrompt);
    setIsCopilotDrawerOpen(true);
    setMiniPrompt('');
  };

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto pb-12 animate-in fade-in duration-150">
      {/* Top Canvas Header Greeting & Period Indicator */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-headline font-bold text-on-surface tracking-tight">
              AI Pipeline &amp; Pulse Executive Dashboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-primary-container/20 border border-primary/40 text-primary-fixed text-xs font-mono">
              Autonomous Mode
            </span>
          </div>
          <p className="text-sm font-body text-outline mt-0.5">
            Real-time Bayesian revenue forecast and automated deal telemetry across Enterprise Segments.
          </p>
        </div>

        {/* Date / Filter Pill */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30">
            {(['Q3 FY25', 'Trailing 30D', 'Full Year'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  period === p
                    ? 'bg-surface-container text-primary-fixed shadow-sm'
                    : 'text-outline hover:text-on-surface'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => showToast('Exporting executive telemetry report to CSV / PDF...', 'info')}
            className="p-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-outline hover:text-on-surface transition-colors"
            title="Export Executive Summary"
          >
            <span className="material-symbols-outlined text-lg">tune</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. EXECUTIVE KPI SUMMARY CARDS (4-Column Bento Stack)                     */}
      {/* ========================================================================= */}
      <section aria-label="Key Performance Indicators" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Active Pipeline */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-200 hover:border-primary/40 group">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-outline">Active Pipeline</span>
              <div className="text-3xl font-headline font-bold text-on-surface mt-1 tracking-tight">
                $2.84M
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container-high/80 border border-outline-variant/30 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-tertiary">
              <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
              <span className="text-xs font-semibold">+18.4%</span>
              <span className="text-xs text-outline">vs Q2 target</span>
            </div>
            {/* Sparkline representation */}
            <svg className="w-16 h-6 stroke-tertiary fill-none" viewBox="0 0 64 24">
              <path d="M0 20 L16 16 L32 18 L48 8 L64 4" strokeLinecap="round" strokeWidth="2"></path>
            </svg>
          </div>
        </div>

        {/* KPI 2: Win Probability (Radial Gauge) */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-200 hover:border-primary/40 emerald-glow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-outline">Weighted Win Probability</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-headline font-bold text-on-surface tracking-tight">78%</span>
                <span className="text-[11px] text-tertiary px-1.5 py-0.5 rounded-full bg-tertiary/10 border border-tertiary/30 font-medium">
                  High Velocity
                </span>
              </div>
            </div>
            {/* 32px Circular Ring Meter */}
            <div className="relative w-11 h-11 flex items-center justify-center">
              <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="stroke-white/10"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3.5"
                ></path>
                <path
                  className="stroke-tertiary"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeDasharray="78, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                ></path>
              </svg>
              <span className="absolute text-xs font-bold text-on-surface font-mono">78</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span className="text-xs">Bayesian threshold: optimal</span>
            </div>
            <span className="text-xs text-outline font-mono">+4.2% MoM</span>
          </div>
        </div>

        {/* KPI 3: AI Revenue Forecast */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-200 hover:border-primary/40 neon-purple-glow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-outline">Projected Rev Forecast</span>
              <div className="text-3xl font-headline font-bold text-on-surface mt-1 tracking-tight">
                $3.12M
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary/40 flex items-center justify-center text-primary-fixed">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-primary-fixed bg-primary-container/20 px-2 py-0.5 rounded-md border border-primary/30 font-medium">
                94.2% AI Confidence
              </span>
            </div>
            <span className="text-xs text-outline font-mono">Target: $3.0M</span>
          </div>
        </div>

        {/* KPI 4: Autonomous Operations */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-200 hover:border-primary/40">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-outline">Autonomous Actions</span>
              <div className="text-3xl font-headline font-bold text-on-surface mt-1 tracking-tight">
                142
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container-high/80 border border-outline-variant/30 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">bolt</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-1 text-secondary">
              <span className="material-symbols-outlined text-sm">sync</span>
              <span className="text-xs font-semibold">142 auto-synced</span>
            </div>
            <span className="text-xs text-outline font-mono">this week (0 errors)</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. AI INTELLIGENCE RADAR (Urgent Actionable Intervention Banner)           */}
      {/* ========================================================================= */}
      <section aria-label="Urgent AI Intervention Banner" className="glass-panel-elevated p-5 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
          {/* Left: Status & Signal Detail */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container/30 border border-primary/50 flex items-center justify-center text-primary-fixed shrink-0 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
              <span className="material-symbols-outlined text-2xl">radar</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error"></span>
                </span>
                <h2 className="text-base font-headline font-bold text-on-surface">
                  3 Enterprise accounts require immediate intervention
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-error-container/40 text-error border border-error/30 font-medium">
                  Action Required
                </span>
              </div>
              <p className="text-xs font-body text-on-surface-variant mt-1 leading-relaxed">
                Neural sensors flagged competitor pricing shifts and legal stakeholder inertia in critical Q3 contract phases.
              </p>
            </div>
          </div>

          {/* Right: Actionable Account Intervention Chips & Instant Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Urgent Card: Acme Corp */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-surface-container-lowest/90 border border-outline-variant/30 hover:border-secondary/40 transition-colors">
              <div className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></div>
              <div>
                <div className="text-xs font-bold text-on-surface">Acme Corp</div>
                <div className="text-[11px] text-error font-medium">Competitor battlecard alert</div>
              </div>
              <button
                onClick={() => {
                  showToast('Counter-pitch battlecard staged for Acme Corp (Palantir comparison).', 'purple');
                  sendCopilotMessage('Prepare a counter-brief against Palantir for Acme Corp with 0% egress markup.');
                  setIsCopilotDrawerOpen(true);
                }}
                className="ml-2 px-2.5 py-1 rounded-lg bg-primary-container/30 hover:bg-primary-container text-primary-fixed text-xs font-semibold border border-primary/40 transition-all flex items-center gap-1 active:scale-95"
              >
                <span className="material-symbols-outlined text-xs">bolt</span>
                Counter
              </button>
            </div>

            {/* Urgent Card: Horizon Labs */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-surface-container-lowest/90 border border-outline-variant/30 hover:border-secondary/40 transition-colors">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <div>
                <div className="text-xs font-bold text-on-surface">Horizon Labs</div>
                <div className="text-[11px] text-amber-300 font-medium">Procurement delay (6 days)</div>
              </div>
              <button
                onClick={() => {
                  setSelectedContactDeal(deals.find((d) => d.id === 'horizon-cloud-labs') || deals[1]);
                  setActiveView('copilot');
                  showToast('Opened Elena Rostova contact dossier and tailored outreach composer.', 'info');
                }}
                className="ml-2 px-2.5 py-1 rounded-lg bg-primary-container/30 hover:bg-primary-container text-primary-fixed text-xs font-semibold border border-primary/40 transition-all flex items-center gap-1 active:scale-95"
              >
                <span className="material-symbols-outlined text-xs">outgoing_mail</span>
                Nudge
              </button>
            </div>

            {/* All Actions Trigger */}
            <button
              onClick={() => setActiveView('leads')}
              className="px-3.5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/50 text-on-surface text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Inspect All (3)</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE REVENUE VELOCITY FORECAST VISUAL CHART                     */}
      {/* ========================================================================= */}
      <section aria-label="Interactive Revenue Forecast Chart" className="glass-panel p-6 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-headline font-bold text-on-surface">
                Revenue Velocity &amp; Pacing Curve
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-surface-container-high text-secondary border border-secondary/20 font-mono">
                Probabilistic Envelope
              </span>
            </div>
            <p className="text-xs text-outline mt-0.5">
              Model v4.8: Paced closed revenue vs Milestone targets with 95% Bayesian confidence ribbon.
            </p>
          </div>

          {/* Legend and Mode Controls */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-primary rounded-full"></span>
              <span className="text-on-surface">AI Projected Curve</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-outline border-b border-dashed border-outline"></span>
              <span className="text-outline">Board Target ($3.00M)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-primary-container/20 border border-primary/30"></span>
              <span className="text-outline">Confidence Bounds</span>
            </div>
          </div>
        </div>

        {/* High-Density SVG Interactive Forecast Chart */}
        <div className="relative w-full h-72">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1100 260">
            <defs>
              {/* Gradient for Confidence Interval Ribbon */}
              <linearGradient id="confidenceGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.32"></stop>
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.0"></stop>
              </linearGradient>
              {/* Gradient for Revenue Paced Area Fill */}
              <linearGradient id="velocityGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.25"></stop>
                <stop offset="100%" stopColor="#4cd7f6" stopOpacity="0.0"></stop>
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines */}
            <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="60" x2="1080" y1="20" y2="20"></line>
            <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="60" x2="1080" y1="80" y2="80"></line>
            <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="60" x2="1080" y1="140" y2="140"></line>
            <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="60" x2="1080" y1="200" y2="200"></line>

            {/* Y-Axis Value Labels */}
            <text fill="#958da1" fontSize="11" x="15" y="24" fontFamily="Inter">$3.5M</text>
            <text fill="#958da1" fontSize="11" x="15" y="84" fontFamily="Inter">$3.0M</text>
            <text fill="#958da1" fontSize="11" x="15" y="144" fontFamily="Inter">$2.5M</text>
            <text fill="#958da1" fontSize="11" x="15" y="204" fontFamily="Inter">$2.0M</text>

            {/* Board Target Constant Line ($3.0M at y=80) */}
            <line opacity="0.6" stroke="#958da1" strokeDasharray="6 4" strokeWidth="1.5" x1="60" x2="1080" y1="80" y2="80"></line>

            {/* Confidence Interval Band */}
            <polygon fill="url(#confidenceGrad)" points="560,118 730,90 900,60 1080,45 1080,95 900,105 730,135 560,118"></polygon>

            {/* Historical Closed Velocity Area Fill */}
            <polygon fill="url(#velocityGrad)" points="60,210 220,185 390,150 560,118 560,240 60,240"></polygon>

            {/* Past Actuals Closed Curve Line */}
            <path d="M60 210 Q 140 200, 220 185 T 390 150 T 560 118" fill="none" stroke="#4cd7f6" strokeLinecap="round" strokeWidth="3"></path>

            {/* Projected AI Curve (Forecasted) */}
            <path d="M560 118 Q 730 100, 900 80 T 1080 62" fill="none" stroke="#d2bbff" strokeDasharray="4 2" strokeLinecap="round" strokeWidth="3"></path>

            {/* Historical Data Nodes */}
            <circle cx="60" cy="210" fill="#0f131c" r="4" stroke="#4cd7f6" strokeWidth="2.5"></circle>
            <circle cx="220" cy="185" fill="#0f131c" r="4" stroke="#4cd7f6" strokeWidth="2.5"></circle>
            <circle cx="390" cy="150" fill="#0f131c" r="4" stroke="#4cd7f6" strokeWidth="2.5"></circle>

            {/* Current Real-Time Pacing Node (Anchor) */}
            <circle
              className="cursor-pointer"
              cx="560"
              cy="118"
              fill="#7c3aed"
              r="6"
              stroke="#ffffff"
              strokeWidth="2"
              onMouseEnter={() => setHoveredPoint(560)}
              onMouseLeave={() => setHoveredPoint(null)}
            ></circle>
            <circle cx="560" cy="118" fill="#7c3aed" opacity="0.25" r="14" className="animate-ping"></circle>

            {/* AI Predicted Future Nodes */}
            <circle cx="730" cy="98" fill="#1c1f29" r="4.5" stroke="#d2bbff" strokeWidth="2"></circle>
            <circle cx="900" cy="80" fill="#1c1f29" r="4.5" stroke="#d2bbff" strokeWidth="2"></circle>
            <circle cx="1080" cy="62" fill="#1c1f29" r="5" stroke="#4edea3" strokeWidth="2.5"></circle>

            {/* Quarter Vertical Ticks & Labels */}
            <text fill="#958da1" fontSize="11" textAnchor="middle" x="60" y="250">Week 1 (Q3)</text>
            <text fill="#958da1" fontSize="11" textAnchor="middle" x="220" y="250">Week 4</text>
            <text fill="#958da1" fontSize="11" textAnchor="middle" x="390" y="250">Week 7</text>
            <text fill="#d2bbff" fontSize="11" fontWeight="700" textAnchor="middle" x="560" y="250">Today (Wk 9)</text>
            <text fill="#958da1" fontSize="11" textAnchor="middle" x="730" y="250">Week 11</text>
            <text fill="#958da1" fontSize="11" textAnchor="middle" x="900" y="250">Week 13</text>
            <text fill="#4edea3" fontSize="11" textAnchor="middle" x="1080" y="250">Q3 Close ($3.12M)</text>
          </svg>

          {/* Floating Prediction Tooltip Node Overlay */}
          <div className={`absolute top-12 left-[51%] -translate-x-1/2 px-3 py-2 rounded-xl bg-surface-container-high/90 backdrop-blur-md border border-primary/40 shadow-xl pointer-events-none flex flex-col items-center transition-all ${hoveredPoint ? 'scale-105 border-secondary' : ''}`}>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span className="text-xs font-bold text-on-surface">Pacing: +$340k Ahead</span>
            </div>
            <span className="text-[10px] text-outline font-mono">Target threshold crossed early</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TWO-COLUMN LOWER SECTION: Deals Table & Autonomous Feed                */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Priority Enterprise Deals (8 of 12 cols) */}
        <section aria-label="Priority Enterprise Deals" className="lg:col-span-8 glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-headline font-bold text-on-surface">Priority Enterprise Deals</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary-fixed border border-primary/20 font-mono">
                  3 Active Interventions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setActiveView('leads')}
                  className="px-2.5 py-1 rounded-lg bg-surface-container text-outline hover:text-on-surface text-xs font-semibold border border-outline-variant/30 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">filter_list</span>
                  Filter
                </button>
                <button 
                  onClick={() => showToast('Exported deal pipeline portfolio to CSV.', 'info')}
                  className="px-2.5 py-1 rounded-lg bg-surface-container text-outline hover:text-on-surface text-xs font-semibold border border-outline-variant/30 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">download</span>
                  Export
                </button>
              </div>
            </div>

            {/* Deals Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/20 text-xs font-mono uppercase tracking-wider text-outline">
                    <th className="pb-3 font-semibold">Account &amp; Champion</th>
                    <th className="pb-3 font-semibold">Deal Value</th>
                    <th className="pb-3 font-semibold">Win Prob</th>
                    <th className="pb-3 font-semibold">Neural Health</th>
                    <th className="pb-3 font-semibold">AI Prescribed Next Action</th>
                    <th className="pb-3 text-right font-semibold">Execute</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {priorityDeals.map((deal) => (
                    <tr key={deal.id} className="hover:bg-surface-container-high/40 transition-colors group">
                      <td className="py-3.5 pr-3">
                        <div 
                          className="flex items-center gap-3 cursor-pointer"
                          onClick={() => {
                            setSelectedContactDeal(deal);
                            setActiveView('copilot');
                          }}
                        >
                          <div className={`w-8 h-8 rounded-lg bg-${deal.colorClass}/10 border border-${deal.colorClass}/30 flex items-center justify-center text-${deal.colorClass} font-bold text-xs`}>
                            {deal.initials}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors flex items-center gap-1.5">
                              {deal.company}
                              {deal.id === 'horizon-cloud-labs' && (
                                <span className="material-symbols-outlined text-secondary text-xs">verified</span>
                              )}
                            </div>
                            <div className="text-xs text-outline">{deal.champion} ({deal.championRole})</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 pr-3 font-semibold text-on-surface font-mono">{deal.dealValueFormatted}</td>
                      <td className="py-3.5 pr-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          deal.winProbability >= 80 
                            ? 'bg-tertiary/10 border border-tertiary/30 text-tertiary' 
                            : 'bg-amber-400/10 border border-amber-400/30 text-amber-300'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${deal.winProbability >= 80 ? 'bg-tertiary' : 'bg-amber-400'}`}></span>
                          {deal.winProbability}% {deal.winProbability >= 80 ? 'High' : 'Mod'}
                        </span>
                      </td>
                      <td className="py-3.5 pr-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold font-mono ${deal.healthScore >= 80 ? 'text-tertiary' : 'text-error'}`}>
                            {deal.healthScore}/100
                          </span>
                          <div className="w-12 h-1.5 rounded-full bg-surface-container overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${deal.healthScore >= 80 ? 'bg-tertiary' : 'bg-error'}`} 
                              style={{ width: `${deal.healthScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 pr-3">
                        <div className="text-xs font-medium text-on-surface">{deal.prescribedAction}</div>
                        <div className="text-[11px] text-outline font-mono">{deal.signalSnippet}</div>
                      </td>
                      <td className="py-3.5 text-right">
                        <button 
                          onClick={() => {
                            if (deal.id === 'horizon-cloud-labs') {
                              setSelectedContactDeal(deal);
                              setActiveView('copilot');
                            } else if (deal.id === 'stripe-enterprise') {
                              showToast('Master Service Agreement staged for Stripe VP Eng signoff.', 'success');
                            } else if (deal.id === 'acme-corp') {
                              sendCopilotMessage('Dispatch Palantir counter-brief to Mark Rodriguez at Acme Corp.');
                              setIsCopilotDrawerOpen(true);
                            } else {
                              showToast(`Action triggered: ${deal.prescribedAction}`, 'purple');
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg bg-primary-container text-white text-xs font-semibold hover:brightness-110 active:scale-95 transition-all shadow-sm"
                        >
                          {deal.id === 'stripe-enterprise' ? 'Stage MSA' : deal.id === 'acme-corp' ? 'Send Brief' : deal.id === 'horizon-cloud-labs' ? 'Sync CRO' : 'View Doc'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Bottom Pagination / Summary */}
          <div className="pt-4 mt-2 border-t border-white/5 flex items-center justify-between text-xs text-outline font-mono">
            <span>Displaying {priorityDeals.length} of 28 Active High-Velocity Opportunities</span>
            <button 
              onClick={() => setActiveView('leads')}
              className="text-primary hover:underline flex items-center gap-1 font-sans font-semibold"
            >
              <span>Explore Full Pipeline Portfolio</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* RIGHT COLUMN: Real-Time Autonomous Operations Feed (4 of 12 cols) */}
        <section aria-label="Real-time Autonomous Operations Feed" className="lg:col-span-4 glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_#4edea3]"></span>
                <h2 className="text-base font-headline font-bold text-on-surface">Autonomous Pulse</h2>
              </div>
              <span className="text-xs text-outline font-mono">Live Telemetry</span>
            </div>

            {/* Feed Activity Stream */}
            <div className="flex flex-col gap-3.5">
              {/* Feed Item 1: Voice Note Summarized */}
              <div 
                onClick={() => setActiveView('debriefs')}
                className="p-3.5 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/20 hover:border-primary/40 transition-colors cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary-fixed shrink-0">
                    <span className="material-symbols-outlined text-base">record_voice_over</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                        Voice Debrief Summarized
                      </span>
                      <span className="text-[10px] text-outline font-mono">2m ago</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1 leading-snug">
                      Synthesized 34m sync with Horizon Labs VP Eng. 3 procurement deliverables auto-logged into CRM records.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container text-secondary border border-secondary/20 font-mono">
                        Action items auto-assigned
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feed Item 2: Security Doc Read 4x */}
              <div 
                onClick={() => {
                  setSelectedContactDeal(deals.find((d) => d.id === 'horizon-cloud-labs') || deals[1]);
                  setActiveView('copilot');
                }}
                className="p-3.5 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/20 hover:border-secondary/40 transition-colors cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-base">visibility</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-on-surface group-hover:text-secondary transition-colors">
                        High Intent Signal
                      </span>
                      <span className="text-[10px] text-outline font-mono">18m ago</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1 leading-snug">
                      CEO at Horizon Cloud Labs reviewed InfoSec whitepaper 4 times within past 90 minutes.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-tertiary/10 text-tertiary border border-tertiary/20 font-mono">
                        +14% Win Probability
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feed Item 3: Contract Negotiation Staged */}
              <div 
                onClick={() => {
                  sendCopilotMessage('Show contract clause status for Horizon Labs mutual SLA terms.');
                  setIsCopilotDrawerOpen(true);
                }}
                className="p-3.5 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/20 hover:border-primary/40 transition-colors cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary-fixed shrink-0">
                    <span className="material-symbols-outlined text-base">gavel</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                        Contract Clause Staged
                      </span>
                      <span className="text-[10px] text-outline font-mono">44m ago</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1 leading-snug">
                      Copilot drafted mutual SLA terms counter-proposal matching Q3 legal guidance parameters.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] text-outline font-mono">Waiting for CRO review</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copilot Mini Prompt Bar (Bottom 40% vertical zone) */}
          <div className="mt-4 pt-3 border-t border-white/5">
            <form onSubmit={handleMiniPromptSubmit} className="relative">
              <input
                type="text"
                value={miniPrompt}
                onChange={(e) => setMiniPrompt(e.target.value)}
                placeholder="Ask Copilot: 'Run Q3 gap scenario'..."
                className="w-full h-10 pl-3 pr-9 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors"
                title="Send prompt"
              >
                <span className="material-symbols-outlined text-base">send</span>
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
