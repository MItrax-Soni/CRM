import React from 'react';
import { useCrm } from '../context/CrmContext';
import type { ViewType } from '../types';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, setIsCopilotDrawerOpen, showToast } = useCrm();

  const navItems: { id: ViewType; label: string; icon: string; badge?: string; isPulse?: boolean }[] = [
    { id: 'pipeline', label: 'Pipeline & Pulse', icon: 'insights', isPulse: true },
    { id: 'leads', label: 'Deals & Intelligence', icon: 'handshake' },
    { id: 'copilot', label: 'Copilot & Accounts', icon: 'smart_toy' },
    { id: 'debriefs', label: 'Meeting Debriefs', icon: 'record_voice_over', badge: '3 New' },
    { id: 'analytics', label: 'Analytics', icon: 'monitoring' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  return (
    <aside className="h-screen w-72 flex flex-col fixed left-0 top-0 border-r border-outline-variant/30 bg-surface-container-lowest z-40 justify-between p-4 select-none">
      {/* Top Section: Brand & Nav Links */}
      <div className="flex flex-col gap-5">
        {/* Header Brand */}
        <div 
          className="flex items-center gap-3 px-2 py-1.5 cursor-pointer group"
          onClick={() => setActiveView('pipeline')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-container to-secondary border border-primary/40 flex items-center justify-center text-white shadow-lg shadow-primary-container/20 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-2xl text-white">smart_toy</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-headline font-bold tracking-tight text-on-surface">Cognitive CRM</span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-outline">Enterprise Intelligence</span>
          </div>
        </div>

        {/* Quick Action CTA */}
        <button 
          onClick={() => setIsCopilotDrawerOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary-container hover:bg-primary-container/90 text-white font-semibold text-sm shadow-lg shadow-primary-container/25 transition-all duration-150 active:scale-[0.98] border-t border-white/20 group"
        >
          <span className="material-symbols-outlined text-lg text-primary-fixed group-hover:rotate-12 transition-transform">smart_toy</span>
          <span>Ask Copilot</span>
          <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30 border border-white/10 text-primary-fixed">⌘K</span>
        </button>

        {/* Navigation Tabs */}
        <nav aria-label="Main Navigation" className="flex flex-col gap-1.5 mt-1">
          <div className="px-3 pb-1 text-[11px] font-mono uppercase tracking-wider text-outline">
            WORKSPACE RADAR
          </div>

          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-medium text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-primary-container/20 text-primary-fixed border border-primary/30 shadow-[0_0_15px_rgba(124,58,237,0.15)]'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span 
                  className={`material-symbols-outlined text-xl ${
                    isActive ? 'text-primary' : 'text-outline'
                  }`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span className="flex-1 font-body text-sm">{item.label}</span>

                {item.isPulse && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_#4edea3]"></span>
                )}

                {item.badge && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-md bg-surface-container-high text-secondary border border-outline-variant/40 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Session Controls */}
      <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-2">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-surface-container-low/60 border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
          <div className="w-9 h-9 rounded-full bg-surface-container-high border border-primary/30 flex items-center justify-center text-primary-fixed font-bold text-sm shadow-inner overflow-hidden">
            <span className="material-symbols-outlined text-2xl text-primary-fixed">account_circle</span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-on-surface truncate">Alex Vance (CRO)</span>
            <span className="text-[11px] font-mono text-tertiary flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Connected (Active)
            </span>
          </div>
          <button 
            onClick={() => showToast('Session locked. Re-authenticating credentials...', 'info')}
            className="ml-auto text-outline hover:text-on-surface transition-colors p-1 rounded-lg hover:bg-surface-container"
            title="Log out"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

