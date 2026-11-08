import React from 'react';
import { useCrm } from '../context/CrmContext';

export const AnalyticsView: React.FC = () => {
  const { deals } = useCrm();

  const totalARR = deals.reduce((sum, d) => sum + d.dealValue, 0);
  const avgWinProb = Math.round(deals.reduce((sum, d) => sum + d.winProbability, 0) / deals.length);
  const avgHealth = Math.round(deals.reduce((sum, d) => sum + d.healthScore, 0) / deals.length);

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-headline font-bold text-on-surface tracking-tight">
              Executive Revenue Telemetry &amp; Bayesian Analytics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-mono">
              Model v4.8 Calibrated
            </span>
          </div>
          <p className="text-sm text-outline mt-0.5">
            Deep neural attribution across high-velocity sales pipelines, cycle time decay, and multi-touch telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-outline font-mono">Last Neural Sync: 42s ago</span>
        </div>
      </section>

      {/* Metric Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-outline">Total Tracked Pipeline</span>
          <div className="text-3xl font-headline font-bold text-on-surface mt-1 font-mono">
            ${(totalARR / 1000000).toFixed(2)}M
          </div>
          <div className="mt-3 text-xs text-tertiary flex items-center gap-1 font-mono">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            +$420K expansion capacity
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between emerald-glow">
          <span className="text-xs font-mono uppercase tracking-wider text-outline">Bayesian Win Probability</span>
          <div className="text-3xl font-headline font-bold text-tertiary mt-1 font-mono">
            {avgWinProb}%
          </div>
          <div className="mt-3 text-xs text-outline font-mono">
            Model error rate: ±1.4%
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between neon-purple-glow">
          <span className="text-xs font-mono uppercase tracking-wider text-outline">Portfolio Neural Health</span>
          <div className="text-3xl font-headline font-bold text-primary mt-1 font-mono">
            {avgHealth}/100
          </div>
          <div className="mt-3 text-xs text-primary-fixed font-mono">
            Optimal stakeholder density
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-outline">Velocity Attribution</span>
          <div className="text-3xl font-headline font-bold text-secondary mt-1 font-mono">
            2.4x
          </div>
          <div className="mt-3 text-xs text-secondary font-mono">
            Fastest in Tier-1 Infrastructure
          </div>
        </div>
      </div>

      {/* Visual Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Conversion Attribution Funnel */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <h2 className="text-base font-headline font-bold text-on-surface">
                Stage Velocity &amp; Degradation Envelope
              </h2>
              <span className="text-xs font-mono text-outline">Trailing 90 Days</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-on-surface font-semibold">1. Discovery &amp; Telemetry Fit</span>
                  <span className="font-mono text-tertiary">92% conversion (Avg: 8 days)</span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-on-surface font-semibold">2. Security &amp; SOC2 Transit Validation</span>
                  <span className="font-mono text-secondary">84% conversion (Avg: 14 days)</span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-on-surface font-semibold">3. Commercial MSA &amp; Egress Addendum</span>
                  <span className="font-mono text-primary">78% conversion (Avg: 11 days)</span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-on-surface font-semibold">4. Procurement Execution &amp; PO Signoff</span>
                  <span className="font-mono text-emerald-400">94% conversion (Avg: 5 days)</span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-outline font-mono">
            <span>Overall Pipeline Attainment Index: 87.2%</span>
            <span className="text-secondary font-semibold">Autonomous actions contributed +$680k in cycle acceleration</span>
          </div>
        </div>

        {/* Neural Signal Breakdown */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <h2 className="text-base font-headline font-bold text-on-surface">Signal Correlation</h2>
              <span className="text-xs text-tertiary font-mono">99.8% Reliability</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-surface-container/60 border border-white/5 space-y-1">
                <div className="flex items-center justify-between font-semibold text-on-surface">
                  <span>Slide #8 Dwell Time &gt; 5m</span>
                  <span className="text-tertiary font-mono">+24% Win Rate</span>
                </div>
                <p className="text-outline text-[11px]">Direct signal of economic buyer infosec evaluation.</p>
              </div>

              <div className="p-3 rounded-xl bg-surface-container/60 border border-white/5 space-y-1">
                <div className="flex items-center justify-between font-semibold text-on-surface">
                  <span>EU Enclave Routing Guarantee</span>
                  <span className="text-tertiary font-mono">+38% Fast Track</span>
                </div>
                <p className="text-outline text-[11px]">Eliminates legal review delays for DACH region accounts.</p>
              </div>

              <div className="p-3 rounded-xl bg-surface-container/60 border border-white/5 space-y-1">
                <div className="flex items-center justify-between font-semibold text-on-surface">
                  <span>Competitor Battlecard Nudge &lt; 2h</span>
                  <span className="text-secondary font-mono">91% Retention</span>
                </div>
                <p className="text-outline text-[11px]">Neutralizes predatory upfront discount threats.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-outline text-center">
            Bayesian Weighting Model v4.8 Active
          </div>
        </div>
      </div>
    </div>
  );
};

