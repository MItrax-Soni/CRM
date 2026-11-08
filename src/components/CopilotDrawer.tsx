import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';

export const CopilotDrawer: React.FC = () => {
  const { isCopilotDrawerOpen, setIsCopilotDrawerOpen, copilotMessages, sendCopilotMessage } = useCrm();
  const [inputText, setInputText] = useState('');

  if (!isCopilotDrawerOpen) return null;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendCopilotMessage(inputText);
    setInputText('');
  };

  const samplePrompts = [
    'Counteract Palantir bid on Acme Corp',
    'Run Q3 revenue gap pacing scenario',
    'Generate Frankfurt AWS addendum for Elena',
    'Which accounts are stalled > 14 days?'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-high border-l border-outline-variant/40 shadow-2xl flex flex-col glass-panel-elevated">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-surface-container-low/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                <span className="material-symbols-outlined text-lg">smart_toy</span>
              </div>
              <div>
                <h3 className="text-base font-headline font-bold text-on-surface">Cognitive Copilot Studio</h3>
                <p className="text-xs font-mono text-tertiary flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
                  Prescient Model v4.8 Active
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCopilotDrawerOpen(false)}
              className="p-1.5 rounded-lg text-outline hover:text-white hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Quick Context Strip */}
          <div className="px-4 py-2 bg-primary-container/10 border-b border-primary/20 flex items-center justify-between text-xs">
            <span className="text-primary-fixed font-medium">Context: Enterprise Pipeline Q3 FY25</span>
            <span className="text-outline font-mono">42 Active Signals</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {copilotMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="text-[10px] font-mono text-outline mb-1 px-1">
                  {msg.sender === 'user' ? 'Alex Vance (CRO)' : 'Prescient Copilot'} · {msg.timestamp}
                </div>
                <div
                  className={`p-3.5 rounded-2xl max-w-[90%] text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary-container text-white rounded-tr-none shadow-md shadow-primary-container/20'
                      : 'bg-surface-container-lowest border border-white/10 text-on-surface rounded-tl-none glass-panel'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Prompt Recommendations */}
          <div className="p-3 border-t border-white/5 bg-surface-container-lowest/60">
            <div className="text-[11px] font-mono text-outline mb-2 uppercase tracking-wider">
              Suggested Executive Prompts
            </div>
            <div className="flex flex-wrap gap-1.5">
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sendCopilotMessage(prompt);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-bright text-xs text-on-surface-variant hover:text-white border border-white/5 transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-surface-container-low/60 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Copilot anything about deals, revenue, actions..."
              className="flex-1 h-10 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-all"
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-xl bg-primary-container hover:bg-primary-container/90 text-white font-semibold text-sm flex items-center justify-center gap-1 shadow-md shadow-primary-container/30 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
