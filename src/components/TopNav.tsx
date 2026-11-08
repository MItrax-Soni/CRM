import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';

export const TopNav: React.FC = () => {
  const { 
    setIsCommandPaletteOpen, 
    setIsCopilotDrawerOpen, 
    setIsNewLeadModalOpen, 
    notifications, 
    markNotificationRead,
    setActiveView,
    showToast 
  } = useCrm();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="fixed top-0 right-0 left-72 h-16 flex items-center justify-between px-6 z-30 bg-surface-container-low/80 backdrop-blur-md border-b border-outline-variant/30 select-none">
      {/* Left: Global Command Search & Neural Telemetry Status */}
      <div className="flex items-center gap-6 w-1/2 max-w-xl">
        <div 
          onClick={() => setIsCommandPaletteOpen(true)}
          className="relative w-full cursor-pointer"
        >
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg">
            search
          </span>
          <div className="w-full h-10 pl-10 pr-12 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/40 text-sm text-outline hover:border-secondary flex items-center transition-all">
            <span>Command Palette: Search accounts, deal signals, or prompt Copilot...</span>
          </div>
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-surface-container text-[11px] font-mono text-outline border border-outline-variant/30">
            ⌘K
          </kbd>
        </div>

        {/* Telemetry Status Indicator */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-tertiary font-semibold whitespace-nowrap text-xs">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
          <span>Status: Neural Active 99.8%</span>
        </div>
      </div>

      {/* Right: Quick Actions & Profile Area */}
      <div className="flex items-center gap-3">
        {/* VOIP Instant Dialer Action */}
        <button 
          onClick={() => showToast('Simulating VOIP conference line interconnect (Frankfurt Edge #04)...', 'info')}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
          title="Dialer & Conference Integration"
        >
          <span className="material-symbols-outlined text-xl">call</span>
        </button>

        {/* Notifications Tray */}
        <div className="relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
            title="Predictive Alerts & Telemetry"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface-container-low animate-pulse"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-surface-container-high border border-outline-variant/40 shadow-2xl p-4 z-50 glass-panel-elevated">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-secondary">notifications</span>
                  <span className="text-sm font-headline font-bold text-on-surface">Predictive Alerts</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container-lowest text-outline font-mono">
                  {unreadCount} unread
                </span>
              </div>
              <div className="divide-y divide-white/5 max-h-72 overflow-y-auto mt-2">
                {notifications.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      markNotificationRead(item.id);
                      if (item.linkView) setActiveView(item.linkView);
                      setIsNotificationsOpen(false);
                    }}
                    className={`py-3 px-1 flex flex-col gap-1 cursor-pointer rounded-lg hover:bg-surface-container transition-colors ${
                      !item.read ? 'opacity-100' : 'opacity-65'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-on-surface flex items-center gap-1.5">
                        {!item.read && <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>}
                        {item.title}
                      </span>
                      <span className="text-[10px] text-outline font-mono">{item.time}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{item.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-outline-variant/30 mx-1"></div>

        {/* Secondary Trailing Action: New Lead */}
        <button 
          onClick={() => setIsNewLeadModalOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 text-on-surface text-sm font-semibold flex items-center gap-1.5 transition-all"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>New Lead</span>
        </button>

        {/* Primary Trailing Action: Ask Copilot */}
        <button 
          onClick={() => setIsCopilotDrawerOpen(true)}
          className="px-4 py-2 rounded-xl bg-primary-container hover:bg-primary-container/90 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary-container/30 hover:brightness-110 active:scale-[0.98] transition-all border border-white/20"
        >
          <span className="material-symbols-outlined text-base">smart_toy</span>
          <span>Ask Copilot</span>
        </button>

        {/* Executive Avatar */}
        <div className="w-8 h-8 rounded-full ring-2 ring-primary/40 overflow-hidden ml-1 bg-surface-container-highest border border-white/10 flex items-center justify-center">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQEuCVWsLvmvjETlHX8Vk-5p-huiLVBlU2ZrE5BV41v8JuScpmzPGeoh57kwHF4s7Y7qhznkREGsTKY892e6PY3udNWkEEvSHplst9UREvgH6IwcmVse1mTDAef0a01NOJUMcgiTXFKHvU3-ij9d9xVyfZBdvnEOx8KmUFBBjSad-7EcTHxM1pYoNPtuV6rQhofJpqw8YfcjgsBS7GXY8v46gOKS6Gq2SbPZDj_pc"
            alt="Alex Vance CRO"
          />
        </div>
      </div>
    </header>
  );
};

