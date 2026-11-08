import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';

export const SettingsView: React.FC = () => {
  const { showToast } = useCrm();

  const [modelMode, setModelMode] = useState<'Prescient v4.8' | 'Prescient v4.2 Deterministic'>('Prescient v4.8');
  const [euEnclaveEnabled, setEuEnclaveEnabled] = useState(true);
  const [autoApproveLowRisk, setAutoApproveLowRisk] = useState(true);
  const [bayesianThreshold, setBayesianThreshold] = useState('85');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Platform settings saved and telemetry parameters synchronized.', 'success');
  };

  return (
    <div className="space-y-6 max-w-[1000px] mx-auto pb-12 animate-in fade-in duration-150">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-headline font-bold text-on-surface tracking-tight">
            Platform Settings &amp; Governance
          </h1>
          <p className="text-sm text-outline mt-0.5">
            Configure neural model parameters, European residency enclaves, and autonomous execution guardrails.
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-primary-container/20 text-primary-fixed border border-primary/30 font-mono">
          Organization Tier: Global Enterprise
        </span>
      </section>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Model Governance */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <span className="material-symbols-outlined text-primary text-xl">psychology</span>
            <h2 className="text-base font-headline font-bold text-on-surface">Cognitive Intelligence Engine</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-outline mb-1.5">
                Active Inference Engine
              </label>
              <select
                value={modelMode}
                onChange={(e) => setModelMode(e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface focus:border-secondary focus:outline-none font-mono"
              >
                <option value="Prescient v4.8">Prescient v4.8 (Dynamic Multi-Turn Real-Time Telemetry)</option>
                <option value="Prescient v4.2 Deterministic">Prescient v4.2 Deterministic (Strict Compliance Bound)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-outline mb-1.5">
                Autonomous Intervention Threshold (%)
              </label>
              <input
                type="number"
                value={bayesianThreshold}
                onChange={(e) => setBayesianThreshold(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface focus:border-secondary focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Security & European Data Residency */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <span className="material-symbols-outlined text-secondary text-xl">shield</span>
            <h2 className="text-base font-headline font-bold text-on-surface">European Data Residency &amp; Compliance Enclave</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container/60 border border-white/5">
              <div>
                <div className="text-xs font-bold text-on-surface">AWS eu-central-1 (Frankfurt) Dedicated Enclave</div>
                <p className="text-[11px] text-outline mt-0.5">
                  Pin all vector embeddings, audio diarization transcripts, and CRM synchronization strictly within Germany.
                </p>
              </div>
              <input
                type="checkbox"
                checked={euEnclaveEnabled}
                onChange={(e) => setEuEnclaveEnabled(e.target.checked)}
                className="rounded bg-surface border-outline-variant text-primary-container focus:ring-0 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container/60 border border-white/5">
              <div>
                <div className="text-xs font-bold text-on-surface">Autonomous Auto-Approval for Verified Milestones</div>
                <p className="text-[11px] text-outline mt-0.5">
                  Allow verified contract stage advances when mutual recorded consent exceeds 95% Bayesian confidence.
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoApproveLowRisk}
                onChange={(e) => setAutoApproveLowRisk(e.target.checked)}
                className="rounded bg-surface border-outline-variant text-primary-container focus:ring-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Channels & Integrations */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <span className="material-symbols-outlined text-tertiary text-xl">hub</span>
            <h2 className="text-base font-headline font-bold text-on-surface">Connected Telemetry Pipelines</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-surface-container/60 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-secondary">videocam</span>
                <span className="text-xs font-semibold text-on-surface">Zoom Diarizer</span>
              </div>
              <span className="text-[10px] font-mono text-tertiary">Connected</span>
            </div>

            <div className="p-3 rounded-xl bg-surface-container/60 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">mail</span>
                <span className="text-xs font-semibold text-on-surface">Outlook 365</span>
              </div>
              <span className="text-[10px] font-mono text-tertiary">Connected</span>
            </div>

            <div className="p-3 rounded-xl bg-surface-container/60 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-tertiary">chat</span>
                <span className="text-xs font-semibold text-on-surface">Signal Executive</span>
              </div>
              <span className="text-[10px] font-mono text-tertiary">Connected</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-primary-container hover:bg-primary-container/90 text-white font-semibold text-xs shadow-lg shadow-primary-container/30 transition-all active:scale-95"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};

