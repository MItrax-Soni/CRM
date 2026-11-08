import React, { useState, useEffect } from 'react';
import { useCrm } from '../context/CrmContext';

export const CommandPaletteModal: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    deals, 
    setActiveView, 
    setSelectedContactDeal,
    setIsCopilotDrawerOpen,
    setIsNewLeadModalOpen,
    sendCopilotMessage
  } = useCrm();

  const [query, setQuery] = useState('');

  // Handle global ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredDeals = deals.filter(
    (d) =>
      d.company.toLowerCase().includes(query.toLowerCase()) ||
      d.champion.toLowerCase().includes(query.toLowerCase()) ||
      d.sector.toLowerCase().includes(query.toLowerCase())
  );

  const quickActions = [
    {
      id: 'new-lead',
      label: 'Create New Lead Opportunity',
      icon: 'add_circle',
      action: () => {
        setIsCommandPaletteOpen(false);
        setIsNewLeadModalOpen(true);
      }
    },
    {
      id: 'ask-copilot',
      label: 'Ask Copilot for Q3 Revenue Gap Strategy',
      icon: 'auto_awesome',
      action: () => {
        setIsCommandPaletteOpen(false);
        sendCopilotMessage('Run Q3 revenue gap strategy analysis across our enterprise portfolio.');
        setIsCopilotDrawerOpen(true);
      }
    },
    {
      id: 'debriefs',
      label: 'Inspect Horizon Labs Architecture Debrief',
      icon: 'record_voice_over',
      action: () => {
        setIsCommandPaletteOpen(false);
        setActiveView('debriefs');
      }
    },
    {
      id: 'pipeline',
      label: 'Jump to Executive Pipeline Forecast Curve',
      icon: 'insights',
      action: () => {
        setIsCommandPaletteOpen(false);
        setActiveView('pipeline');
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-md">
      <div 
        className="w-full max-w-2xl rounded-2xl bg-surface-container-high border border-outline-variant/40 shadow-2xl overflow-hidden glass-panel-elevated animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <span className="material-symbols-outlined text-secondary text-xl">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search accounts, or prompt Copilot..."
            className="w-full bg-transparent text-on-surface placeholder:text-outline text-base focus:outline-none focus:ring-0 border-none p-0"
          />
          <kbd 
            onClick={() => setIsCommandPaletteOpen(false)}
            className="cursor-pointer px-2 py-0.5 rounded bg-surface-container text-xs font-mono text-outline border border-white/10 hover:text-white"
          >
            ESC
          </kbd>
        </div>

        {/* Content list */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Quick Actions */}
          <div>
            <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-outline">
              Executive Actions
            </div>
            <div className="space-y-1">
              {quickActions.map((qa) => (
                <button
                  key={qa.id}
                  onClick={qa.action}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors group"
                >
                  <span className="material-symbols-outlined text-outline group-hover:text-primary text-lg">
                    {qa.icon}
                  </span>
                  <span className="font-medium flex-1">{qa.label}</span>
                  <span className="text-xs text-outline font-mono">↵ Jump</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Deals */}
          <div>
            <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-outline">
              Enterprise Accounts & Deals ({filteredDeals.length})
            </div>
            <div className="space-y-1">
              {filteredDeals.slice(0, 6).map((deal) => (
                <button
                  key={deal.id}
                  onClick={() => {
                    setSelectedContactDeal(deal);
                    setActiveView('copilot');
                    setIsCommandPaletteOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-surface-container transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-lowest border border-white/10 flex items-center justify-center font-bold text-xs text-primary">
                      {deal.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                        {deal.company}
                      </div>
                      <div className="text-xs text-outline">
                        {deal.champion} · {deal.dealValueFormatted}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container-lowest text-tertiary font-mono">
                      {deal.winProbability}% Win
                    </span>
                    <span className="text-xs text-outline font-mono">{deal.stage}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-surface-container-lowest/80 border-t border-white/5 flex items-center justify-between text-xs text-outline font-mono">
          <span>Tip: Use ↑ ↓ arrows to navigate</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
