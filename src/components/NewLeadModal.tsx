import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';

export const NewLeadModal: React.FC = () => {
  const { isNewLeadModalOpen, setIsNewLeadModalOpen, addDeal } = useCrm();

  const [company, setCompany] = useState('');
  const [sector, setSector] = useState('');
  const [champion, setChampion] = useState('');
  const [championRole, setChampionRole] = useState('');
  const [dealValue, setDealValue] = useState('350000');
  const [stage, setStage] = useState<'Qualified' | 'Proposal' | 'Contract Sent'>('Qualified');
  const [notes, setNotes] = useState('');

  if (!isNewLeadModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !champion.trim()) return;

    const numericValue = parseInt(dealValue.replace(/[^0-9]/g, ''), 10) || 250000;
    const formatted = `$${numericValue.toLocaleString()}`;
    const initials = company
      .split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    addDeal({
      name: company,
      company: company,
      sector: sector || 'Enterprise SaaS / Infrastructure',
      champion: champion,
      championRole: championRole || 'VP Engineering / Technology Lead',
      dealValue: numericValue,
      dealValueFormatted: formatted,
      winProbability: Math.floor(Math.random() * 25) + 70, // 70-95%
      healthScore: Math.floor(Math.random() * 20) + 75,
      stage: stage,
      velocity: 'On Track (New)',
      cycleTime: '0d',
      prescribedAction: 'Send Neural Architecture Brief & Schedule Discovery',
      signalSnippet: notes || 'Lead created via executive rapid triage palette',
      category: 'high_intent',
      statusType: 'accelerating',
      initials: initials || 'NL',
      colorClass: 'secondary'
    });

    setIsNewLeadModalOpen(false);
    setCompany('');
    setSector('');
    setChampion('');
    setChampionRole('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-surface-container-high border border-outline-variant/40 shadow-2xl overflow-hidden glass-panel-elevated">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-surface-container-low/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary/40 flex items-center justify-center text-primary-fixed">
              <span className="material-symbols-outlined text-xl">add_business</span>
            </div>
            <div>
              <h3 className="text-base font-headline font-bold text-on-surface">Create High-Velocity Opportunity</h3>
              <p className="text-xs text-outline">Real-time Bayesian scoring will be calculated upon creation</p>
            </div>
          </div>
          <button
            onClick={() => setIsNewLeadModalOpen(false)}
            className="p-1 rounded-lg text-outline hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Synthetix Labs"
                className="w-full h-10 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-sm text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1">
                Sector / Industry
              </label>
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="e.g. Autonomous AI Robotics"
                className="w-full h-10 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-sm text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1">
                Executive Champion *
              </label>
              <input
                type="text"
                required
                value={champion}
                onChange={(e) => setChampion(e.target.value)}
                placeholder="e.g. Dr. Jordan Bell"
                className="w-full h-10 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-sm text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1">
                Champion Title
              </label>
              <input
                type="text"
                value={championRole}
                onChange={(e) => setChampionRole(e.target.value)}
                placeholder="e.g. VP Infrastructure"
                className="w-full h-10 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-sm text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1">
                Expected ARR ($ USD)
              </label>
              <input
                type="text"
                value={dealValue}
                onChange={(e) => setDealValue(e.target.value)}
                placeholder="350000"
                className="w-full h-10 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-sm text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1">
                Pipeline Stage
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-sm text-on-surface focus:border-secondary focus:outline-none"
              >
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Contract Sent">Contract Sent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1">
              Neural Signal / Discovery Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Engineering team downloaded benchmark SDK; seeking sub-15ms inference SLA."
              className="w-full p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-sm text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsNewLeadModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-sm font-semibold text-outline hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary-container hover:bg-primary-container/90 text-white text-sm font-semibold shadow-lg shadow-primary-container/30 flex items-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-base">bolt</span>
              <span>Deploy Opportunity</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

