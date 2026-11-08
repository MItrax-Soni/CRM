import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import confetti from 'canvas-confetti';

export const ContactDossierCopilotView: React.FC = () => {
  const { selectedContactDeal, telemetrySignals, showToast } = useCrm();

  const [tone, setTone] = useState<'Executive' | 'Technical' | 'Concise'>('Technical');
  const [telemetryFilter, setTelemetryFilter] = useState<'all' | 'deck' | 'zoom' | 'sentiment'>('all');
  const [subject, setSubject] = useState(
    'Horizon Cloud Labs // Frankfurt Data Residency & SOC2 Type II Security Telemetry'
  );

  const emailDrafts = {
    Technical: `Hi Elena,

Following up on your team’s review of our infrastructure architecture earlier this morning. I noted your focus on Frankfurt region routing and strict sub-15ms interconnect targets.

[DIRECT TELEMETRY MATCH: AWS eu-central-1 Isolated VPC]
1. All customer embeddings and inference payloads remain pinned to our Frankfurt cluster with zero cross-border replication.
2. Attached is our freshly verified SOC2 Type II attestation report (audited Dec 2024) specifically addressing multi-tenant isolation.

Would you and your principal infrastructure architect be open for a 20-minute latency benchmark walk-through this Thursday at 14:00 CET? We can spin up a live stress pipeline in real-time.

Best regards,
Alex Vance | Chief Revenue Officer`,

    Executive: `Dear Elena,

It was a pleasure speaking with you and Sarah during our architecture sync. 

We fully guarantee strict data residency within AWS Frankfurt (eu-central-1) under DPA clause 4.2. In addition, our Tier-1 enterprise SLA guarantees 99.99% neural uptime with full multi-tenant isolation.

Attached is our complete SOC2 Type II compliance audit pack. Let's finalize contract terms this Thursday at 14:00 CET to stay on schedule for your Q3 deployment.

Sincerely,
Alex Vance | Chief Revenue Officer`,

    Concise: `Elena,

Per our sync today:
- Frankfurt (eu-central-1) zero cross-border replication confirmed in contract addendum.
- SOC2 Type II 2025 report attached.
- 99.99% neural SLA backed with financial credits.

Let's do a 15-min final alignment this Thursday at 14:00 CET.

Alex`
  };

  const [emailBody, setEmailBody] = useState(emailDrafts.Technical);

  const handleToneChange = (newTone: 'Executive' | 'Technical' | 'Concise') => {
    setTone(newTone);
    setEmailBody(emailDrafts[newTone]);
    showToast(`Outreach draft adjusted to ${newTone} executive tone.`, 'info');
  };

  const handleSendEmail = () => {
    showToast(`Email & SOC2 Type II pack dispatched to Elena Rostova!`, 'success');
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const filteredTelemetry = telemetrySignals.filter((t) => {
    if (telemetryFilter === 'deck' && t.type !== 'deck') return false;
    if (telemetryFilter === 'zoom' && t.type !== 'zoom') return false;
    if (telemetryFilter === 'sentiment' && t.type !== 'security') return false;
    return true;
  });

  return (
    <div className="w-full h-[calc(100vh-6rem)] flex gap-4 overflow-hidden animate-in fade-in duration-150">
      {/* ============================================================ */}
      {/* PANEL 1 (LEFT): Contact & Org Context Dossier (340px fixed)  */}
      {/* ============================================================ */}
      <section className="w-80 min-w-[320px] max-w-[340px] h-full flex flex-col gap-3 overflow-y-auto pr-1">
        {/* Primary Contact Card */}
        <div className="rounded-2xl p-4 bg-surface-container-lowest/80 border border-outline-variant/30 backdrop-blur-xl relative overflow-hidden shadow-[0_0_20px_-4px_rgba(124,58,237,0.15)] flex flex-col gap-3 glass-panel">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-primary-container/60 via-secondary/40 to-transparent"></div>
          
          <div className="flex items-start justify-between">
            <div className="relative">
              {/* Executive Profile Photo */}
              <img
                className="w-16 h-16 rounded-2xl object-cover border border-outline-variant/50 shadow-md"
                src={
                  selectedContactDeal.championAvatar ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuCFAHInUzaix7-unCz6w4nrze5RU5tbJ2IXql0rwpuhStX45SI4H6ABjsUa3lCAK-qiAhgFUMP6MarKIStxV4oAkkzXy5nufvkUjh3ovXqrBHyA6DMKjA3UsnwgX0IyFdaGIBnuBX2lVSBtHEok_v_Hf_y4XBORY_SGDgzloJy577exL6uEZqZj1bZvsq6Ay59AN0ZADYMjID1fcqWoYv_vaEbUsYFYXTFAml_4ufo'
                }
                alt={selectedContactDeal.champion}
              />
              {/* Active Signal Indicator */}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-surface-container-lowest flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_6px_#4edea3]"></span>
              </span>
            </div>

            {/* Fit Score Ring */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-container/30 border border-tertiary/30 shadow-[0_0_16px_-4px_rgba(16,185,129,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                <span className="text-tertiary font-bold text-xs font-mono">94% Fit</span>
              </div>
              <span className="text-[10px] text-outline mt-1 font-mono tracking-tight">Probabilistic ICP Match</span>
            </div>
          </div>

          <div>
            <h2 className="text-base font-headline font-bold text-on-surface tracking-tight">
              {selectedContactDeal.id === 'horizon-cloud-labs' ? 'Elena Rostova' : selectedContactDeal.champion}
            </h2>
            <p className="text-xs text-on-surface-variant font-medium">
              {selectedContactDeal.championRole}
            </p>
            <div className="flex items-center gap-1.5 text-secondary text-xs mt-0.5">
              <span className="material-symbols-outlined text-sm">cloud</span>
              <span className="font-semibold">{selectedContactDeal.company}</span>
              <span className="text-outline text-xs">• Frankfurt HQ</span>
            </div>
          </div>

          {/* Badges & Authority Tag */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <div className="px-2 py-1 rounded-lg bg-surface-container-high border border-outline-variant/40 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-primary">verified_user</span>
              <span className="text-[11px] font-semibold text-primary-fixed">Primary Decision Maker</span>
            </div>
            <div className="px-2 py-1 rounded-lg bg-surface-container-high border border-outline-variant/40 flex items-center gap-1">
              <span className="text-[11px] text-outline font-mono">Budget: $350K+</span>
            </div>
          </div>

          {/* Social & Direct Channels */}
          <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-outline-variant/20">
            <button
              onClick={() => showToast('Connecting to Outlook exchange mail sync...', 'info')}
              className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-white/5 text-outline hover:text-on-surface transition-all text-xs font-mono"
            >
              <span className="material-symbols-outlined text-sm text-secondary">mail</span>
              Email
            </button>
            <button
              onClick={() => showToast('Opening GitHub Enterprise telemetry graph...', 'info')}
              className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-white/5 text-outline hover:text-on-surface transition-all text-xs font-mono"
            >
              <span className="material-symbols-outlined text-sm text-primary">terminal</span>
              GitHub
            </button>
            <button
              onClick={() => showToast('Opening verified LinkedIn executive bio...', 'info')}
              className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-white/5 text-outline hover:text-on-surface transition-all text-xs font-mono"
            >
              <span className="material-symbols-outlined text-sm text-secondary-fixed">public</span>
              LinkedIn
            </button>
          </div>
        </div>

        {/* Psychographic Telemetry Card */}
        <div className="rounded-2xl p-4 bg-surface-container-lowest/80 border border-outline-variant/30 backdrop-blur-xl flex flex-col gap-3 glass-panel">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-base">psychology</span>
              <h3 className="text-xs font-mono font-bold text-on-surface uppercase tracking-wider">
                Psychographic Telemetry
              </h3>
            </div>
            <span className="text-[10px] font-mono text-outline">Real-time LLM</span>
          </div>

          <div className="space-y-2.5">
            {/* Metric 1: Sentiment */}
            <div className="p-2.5 rounded-xl bg-surface-container/60 border border-outline-variant/20">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-outline">Observed Sentiment</span>
                <span className="text-tertiary font-semibold flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  Highly Positive (94%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-tertiary rounded-full shadow-[0_0_8px_#4edea3]" style={{ width: '94%' }}></div>
              </div>
            </div>

            {/* Metric 2: Cognitive Profile */}
            <div className="p-2.5 rounded-xl bg-surface-container/60 border border-outline-variant/20">
              <div className="flex items-center gap-1.5 text-xs text-outline mb-1 font-mono">
                <span className="material-symbols-outlined text-sm text-secondary">speed</span>
                <span>Cognitive Profile</span>
              </div>
              <p className="text-on-surface text-xs leading-relaxed">
                Data-driven latency-focused. Responds favorably to deterministic benchmarks over marketing claims.
              </p>
            </div>

            {/* Metric 3: Procurement & Gate */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-surface-container/60 border border-outline-variant/20 flex flex-col justify-between">
                <span className="text-outline text-[11px] font-mono">Procurement Risk</span>
                <div className="flex items-center gap-1 mt-1 text-tertiary font-semibold text-xs">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  Minimal
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container/60 border border-outline-variant/20 flex flex-col justify-between">
                <span className="text-outline text-[11px] font-mono">Technical Gate</span>
                <div className="flex items-center gap-1 mt-1 text-secondary font-semibold text-xs">
                  <span className="material-symbols-outlined text-xs">shield</span>
                  SOC2 Validation
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Vital Stats */}
        <div className="rounded-2xl p-3.5 bg-surface-container-lowest/80 border border-outline-variant/30 backdrop-blur-xl flex flex-col gap-2 glass-panel">
          <span className="text-[11px] font-mono font-semibold text-outline uppercase tracking-wider">
            Cloud Footprint Telemetry
          </span>
          <div className="flex items-center justify-between text-xs py-1 border-b border-outline-variant/10">
            <span className="text-outline">Current Stack:</span>
            <span className="text-on-surface font-mono">AWS eu-central-1 (Frankfurt)</span>
          </div>
          <div className="flex items-center justify-between text-xs py-1 border-b border-outline-variant/10">
            <span className="text-outline">Data Residency:</span>
            <span className="text-on-surface font-mono">GDPR Strict Isol.</span>
          </div>
          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-outline">Target Cutover:</span>
            <span className="text-primary-fixed font-semibold font-mono">Q3 Enterprise Cycle</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PANEL 2 (CENTER): Copilot AI Studio & Next Best Action (Fluid Center)     */}
      {/* ========================================================================= */}
      <section className="flex-1 h-full flex flex-col gap-3 min-w-0">
        {/* Proactive Copilot Recommendation Banner (97% Confidence) */}
        <div className="rounded-2xl p-4 bg-surface-container-lowest/90 border border-primary/40 backdrop-blur-xl relative overflow-hidden shadow-[0_0_24px_-4px_rgba(124,58,237,0.3)] glass-panel">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-white shrink-0 shadow-lg">
                <span className="material-symbols-outlined text-xl">auto_awesome</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                    Proactive Copilot Recommendation
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-primary-container/30 border border-primary/40 text-primary-fixed text-[10px] font-mono">
                    97% Confidence
                  </span>
                  <span className="text-[11px] text-tertiary font-mono">Win-Velocity +3.4x</span>
                </div>
                <p className="text-sm font-headline font-bold text-on-surface tracking-tight">
                  Send tailored SOC2 Type II compliance pack and schedule technical deep-dive
                </p>
                <p className="text-xs text-outline mt-1 leading-relaxed">
                  Elena visited the security appendix 4 times in 24h. Triggering this exact sequence clears her last gating hurdle before Master Services Agreement signoff.
                </p>
              </div>
            </div>
            <button 
              onClick={() => showToast('Logic Path: Bayesian decision tree matched slide dweltime + transcript milestone.', 'info')}
              className="shrink-0 px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-bright border border-outline-variant/40 text-secondary text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">tune</span>
              Logic Path
            </button>
          </div>
        </div>

        {/* Rich Interactive AI Email Composer */}
        <div className="flex-1 rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/30 backdrop-blur-xl flex flex-col overflow-hidden shadow-lg glass-panel">
          {/* Composer Header & Recipient Meta */}
          <div className="p-3.5 border-b border-outline-variant/20 bg-surface-container-low/50 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">mail</span>
                <span className="text-sm font-headline font-bold text-on-surface">Neural Outreach Copilot</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container-highest text-outline font-mono">
                  v4.2 Deterministic
                </span>
              </div>
              {/* Tone Adjustment Toggles */}
              <div className="flex items-center gap-1 bg-surface-container p-1 rounded-xl border border-outline-variant/20">
                <span className="text-[10px] text-outline px-1.5 font-mono">Tone:</span>
                {(['Executive', 'Technical', 'Concise'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => handleToneChange(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      tone === t
                        ? 'bg-primary-container text-white shadow-sm'
                        : 'text-outline hover:text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient / Subject Fields */}
            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-outline w-14 font-mono">To:</span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface">
                  <span className="font-semibold">
                    {selectedContactDeal.id === 'horizon-cloud-labs' ? 'Elena Rostova' : selectedContactDeal.champion}
                  </span>
                  <span className="text-outline font-mono">
                    &lt;{selectedContactDeal.company.toLowerCase().replace(/[^a-z]/g, '')}@enterprise.io&gt;
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-outline w-14 font-mono">Subject:</span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-on-surface font-semibold text-xs focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Formatting Micro Toolbar */}
          <div className="px-3.5 py-1.5 border-b border-outline-variant/20 bg-surface-container-lowest flex items-center justify-between text-outline text-xs">
            <div className="flex items-center gap-2">
              <button className="hover:text-on-surface p-1 rounded hover:bg-surface-container">
                <span className="material-symbols-outlined text-sm">format_bold</span>
              </button>
              <button className="hover:text-on-surface p-1 rounded hover:bg-surface-container">
                <span className="material-symbols-outlined text-sm">format_italic</span>
              </button>
              <button className="hover:text-on-surface p-1 rounded hover:bg-surface-container">
                <span className="material-symbols-outlined text-sm">link</span>
              </button>
              <span className="w-[1px] h-3 bg-outline-variant/40"></span>
              <button className="hover:text-on-surface p-1 rounded hover:bg-surface-container">
                <span className="material-symbols-outlined text-sm">format_list_bulleted</span>
              </button>
              <button className="hover:text-on-surface p-1 rounded hover:bg-surface-container">
                <span className="material-symbols-outlined text-sm">code</span>
              </button>
              <span className="w-[1px] h-3 bg-outline-variant/40"></span>
              <span className="text-[11px] text-secondary flex items-center gap-1 font-mono">
                <span className="material-symbols-outlined text-xs">attach_file</span>
                SOC2_Type_II_2025_Audit.pdf attached
              </span>
            </div>
            <span className="font-mono text-[10px] text-outline">Context: Debrief + Slide 8 review</span>
          </div>

          {/* Editable Content Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <textarea
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              className="w-full h-full bg-transparent border-none p-0 text-on-surface text-xs leading-relaxed focus:ring-0 focus:outline-none font-sans resize-none"
            />
          </div>

          {/* Composer Bottom Action Bar */}
          <div className="p-3.5 border-t border-outline-variant/20 bg-surface-container-low/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEmailBody(emailDrafts[tone]);
                  showToast('Regenerated neural draft with latest telemetry context.', 'info');
                }}
                className="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 text-on-surface text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <span className="material-symbols-outlined text-sm text-outline">refresh</span>
                Regenerate Draft
              </button>
              <button className="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 text-outline hover:text-on-surface text-xs font-mono flex items-center gap-1.5 transition-all">
                <span className="material-symbols-outlined text-sm">history</span>
                Version 2 of 3
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => showToast('Scheduled dispatch for optimal open rate window (Thursday 08:30 CET).', 'info')}
                className="px-3.5 py-2 rounded-xl bg-surface-container-highest hover:bg-surface-bright text-on-surface text-xs font-semibold transition-all"
              >
                Schedule Send
              </button>
              {/* Primary Action CTA */}
              <button
                onClick={handleSendEmail}
                className="px-4 py-2 rounded-xl bg-primary-container hover:bg-primary-container/90 text-white font-semibold text-xs shadow-[0_0_20px_-4px_rgba(124,58,237,0.5)] active:scale-[0.98] transition-all flex items-center gap-2 border border-primary/40"
              >
                <span className="material-symbols-outlined text-sm">send</span>
                <span>Review &amp; Send with 1-Tap</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PANEL 3 (RIGHT): Unified Real-time Telemetry Timeline (380px fixed)      */}
      {/* ========================================================================= */}
      <section className="w-96 min-w-[360px] max-w-[390px] h-full flex flex-col gap-3 overflow-hidden rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/30 backdrop-blur-xl p-4 glass-panel">
        {/* Timeline Header & Filtering */}
        <div className="flex flex-col gap-2.5 pb-2 border-b border-outline-variant/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-lg">timeline</span>
              <h3 className="text-sm font-headline font-bold text-on-surface">Unified Real-time Telemetry</h3>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-mono text-tertiary">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
              LIVE STREAM
            </span>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {(['all', 'deck', 'zoom', 'sentiment'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setTelemetryFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  telemetryFilter === cat
                    ? 'bg-surface-container-high text-secondary border border-secondary/30'
                    : 'bg-surface-container text-outline hover:text-on-surface'
                }`}
              >
                {cat === 'all' ? 'All Signals' : cat === 'deck' ? 'Deck Telemetry' : cat === 'zoom' ? 'Zoom Transcripts' : 'Sentiment'}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Event Stream */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredTelemetry.map((event) => (
            <div
              key={event.id}
              className="p-3 rounded-xl bg-surface-container/70 border border-outline-variant/30 hover:border-secondary/40 transition-all flex flex-col gap-2 relative overflow-hidden group"
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${
                  event.type === 'deck' ? 'bg-secondary' : event.type === 'zoom' ? 'bg-primary-container' : 'bg-tertiary'
                } rounded-l`}
              ></div>
              <div className="flex items-center justify-between text-xs pl-1">
                <div
                  className={`flex items-center gap-1.5 font-semibold ${
                    event.type === 'deck' ? 'text-secondary' : event.type === 'zoom' ? 'text-primary' : 'text-tertiary'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{event.icon}</span>
                  <span>{event.title}</span>
                </div>
                <span className="text-outline font-mono text-[10px]">{event.timestamp}</span>
              </div>
              <div className="pl-1">
                <p className="text-xs text-on-surface leading-snug font-medium">{event.description}</p>
                {event.detail && (
                  <div className="mt-2 p-2 rounded-lg bg-surface-container-lowest/80 border border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-outline">{event.detail}</span>
                    {event.confidence && <span className="text-tertiary font-bold">{event.confidence}</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

