import React, { useState, useEffect } from 'react';
import { useCrm } from '../context/CrmContext';

export const MeetingDebriefView: React.FC = () => {
  const { 
    crmUpdates, 
    toggleCrmUpdateApproval, 
    approveAllCrmUpdates, 
    actionItems, 
    toggleActionItem, 
    dispatchActionItem, 
    setActiveView, 
    setSelectedContactDeal, 
    deals, 
    showToast 
  } = useCrm();

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1.0x' | '1.25x' | '1.5x'>('1.25x');
  const [currentTimeSec, setCurrentTimeSec] = useState(862); // 14m 22s = 862s
  const totalDurationSec = 2052; // 34m 12s = 2052s

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= totalDurationSec) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / parseFloat(playbackSpeed));
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const seekTo = (sec: number) => {
    setCurrentTimeSec(sec);
    showToast(`Jumped to audio timestamp ${formatTime(sec)}`, 'info');
  };

  const progressPercent = (currentTimeSec / totalDurationSec) * 100;

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto pb-12 animate-in fade-in duration-150">
      {/* ========================================================================= */}
      {/* MEETING HEADER BAR                                                        */}
      {/* ========================================================================= */}
      <section className="p-6 rounded-2xl bg-surface-container-low/90 backdrop-blur-xl border border-outline-variant/30 shadow-lg relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          {/* Left: Title & Meta */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-primary-container/20 text-primary-fixed border border-primary/30 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">lock</span>
                CONFIDENTIAL ARCHITECTURE SYNC
              </span>
              <span className="text-xs text-outline font-mono">Meeting ID: #SYN-8492</span>
              <span className="text-outline">•</span>
              <span className="text-xs text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-secondary">schedule</span>
                Today, 14:00 - 14:34 UTC
              </span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-headline font-bold text-on-surface tracking-tight">
                Horizon Labs Architecture &amp; Commercial Sync
              </h1>
              <span className="px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface-variant text-xs font-mono border border-outline-variant/30">
                34m 12s
              </span>
            </div>

            {/* Participants Pill Stack */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-outline font-mono">Participants:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container border border-outline-variant/40 text-on-surface">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                Elena Rostova <span className="text-outline">(VP Engineering, Horizon)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container border border-outline-variant/40 text-on-surface">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Sarah Chen <span className="text-outline">(Lead Architect, Horizon)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container border border-outline-variant/40 text-on-surface">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                Alex Vance <span className="text-outline">(CRO, Cognitive CRM)</span>
              </span>
            </div>
          </div>

          {/* Right: Overall Sentiment Score & Predictive Signal */}
          <div className="flex items-center gap-4 bg-surface-container/60 p-4 rounded-xl border border-outline-variant/40 shadow-inner shrink-0">
            {/* Circular Confidence Meter */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" fill="none" r="20" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="4"></circle>
                <circle
                  cx="24"
                  cy="24"
                  fill="none"
                  r="20"
                  stroke="#4edea3"
                  strokeDasharray="125.6"
                  strokeDashoffset="11.3"
                  strokeLinecap="round"
                  strokeWidth="4"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-tertiary font-mono">91%</span>
              </div>
            </div>

            {/* Sentiment Telemetry */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_#4edea3]"></span>
                <span className="text-xs text-tertiary font-bold tracking-wide font-mono">High Buy Signal</span>
              </div>
              <div className="text-base font-headline font-bold text-on-surface">91% Positive</div>
              <div className="text-xs text-on-surface-variant flex items-center gap-1">
                <span>Velocity index:</span>
                <span className="text-secondary font-mono font-medium">+38% vs benchmark</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TWO-COLUMN DESKTOP WORKSPACE                                              */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN: MEDIA & EXECUTIVE AI SYNTHESIS (7 Cols) ================= */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          {/* SECTION: STEREO AUDIO SYNTHESIS & WAVEFORM PLAYER */}
          <div className="p-5 rounded-2xl bg-surface-container-low/75 backdrop-blur-xl border border-outline-variant/30 space-y-4 glass-panel">
            {/* Player Bar Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">graphic_eq</span>
                <h2 className="text-base font-headline font-bold text-on-surface">
                  Interactive Diarized Audio Synthesis
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const next = playbackSpeed === '1.0x' ? '1.25x' : playbackSpeed === '1.25x' ? '1.5x' : '1.0x';
                    setPlaybackSpeed(next);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-surface-container-high border border-outline-variant/30 text-xs font-mono text-on-surface hover:border-secondary transition-colors"
                >
                  {playbackSpeed}
                </button>
                <button 
                  onClick={() => showToast('Audio equalizer preset: Enterprise High-Fidelity Vocal Isolation.', 'info')}
                  className="p-1 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-lg">tune</span>
                </button>
              </div>
            </div>

            {/* Speaker Legend Badges */}
            <div className="flex items-center gap-4 text-xs pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="text-on-surface font-medium">Elena Rostova (48%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                <span className="text-on-surface font-medium">Sarah Chen (32%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                <span className="text-on-surface font-medium">Alex Vance (20%)</span>
              </div>
            </div>

            {/* Multi-Track Diarized Waveform Canvas */}
            <div className="p-4 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/30 space-y-3 relative group">
              {/* Scrubbable Milestone Pinpoints */}
              <div className="relative h-5 w-full">
                {/* Milestone Marker 1: Architecture Signoff (08:14 = 494s, ~24%) */}
                <div
                  onClick={() => seekTo(494)}
                  className="absolute left-[24%] -top-1 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group/pin z-20"
                >
                  <span className="material-symbols-outlined text-secondary text-xs hover:scale-125 transition-transform">flag</span>
                  <div className="hidden group-hover/pin:block absolute bottom-5 bg-surface-container-highest px-2 py-0.5 rounded text-[11px] font-mono text-white whitespace-nowrap shadow-md border border-outline-variant">
                    08:14 - Architecture Signoff
                  </div>
                </div>

                {/* Milestone Marker 2: EU Data Residency Raised (19:52 = 1192s, ~58%) */}
                <div
                  onClick={() => seekTo(1192)}
                  className="absolute left-[58%] -top-1 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group/pin z-20"
                >
                  <span className="material-symbols-outlined text-error text-xs hover:scale-125 transition-transform">warning</span>
                  <div className="hidden group-hover/pin:block absolute bottom-5 bg-surface-container-highest px-2 py-0.5 rounded text-[11px] font-mono text-error whitespace-nowrap shadow-md border border-outline-variant">
                    19:52 - EU Data Residency Raised
                  </div>
                </div>

                {/* Milestone Marker 3: Budget Confirmed (28:05 = 1685s, ~82%) */}
                <div
                  onClick={() => seekTo(1685)}
                  className="absolute left-[82%] -top-1 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group/pin z-20"
                >
                  <span className="material-symbols-outlined text-tertiary text-xs hover:scale-125 transition-transform">attach_money</span>
                  <div className="hidden group-hover/pin:block absolute bottom-5 bg-surface-container-highest px-2 py-0.5 rounded text-[11px] font-mono text-tertiary whitespace-nowrap shadow-md border border-outline-variant">
                    28:05 - $340k Budget Verified
                  </div>
                </div>
              </div>

              {/* Waveform Bars Stack */}
              <div 
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  seekTo(Math.floor(pos * totalDurationSec));
                }}
                className="h-16 flex items-end gap-1 relative overflow-hidden cursor-pointer"
              >
                {/* Vertical scrubhead line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-secondary-fixed shadow-[0_0_10px_#4cd7f6] z-20 flex flex-col items-center transition-all duration-100"
                  style={{ left: `${progressPercent}%` }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary -mt-1 shadow-sm"></div>
                </div>

                {/* Waveform visual bars with speaker tinting */}
                {[
                  { h: 16, c: 'bg-secondary/40' }, { h: 28, c: 'bg-secondary/70' }, { h: 48, c: 'bg-secondary' }, { h: 36, c: 'bg-secondary/80' },
                  { h: 56, c: 'bg-secondary' }, { h: 32, c: 'bg-secondary/60' }, { h: 20, c: 'bg-secondary/40' }, { h: 40, c: 'bg-secondary/80' },
                  { h: 12, c: 'bg-tertiary/40' }, { h: 24, c: 'bg-tertiary/70' }, { h: 44, c: 'bg-tertiary' }, { h: 52, c: 'bg-tertiary' },
                  { h: 32, c: 'bg-tertiary/80' }, { h: 16, c: 'bg-tertiary/50' }, { h: 24, c: 'bg-primary/40' }, { h: 40, c: 'bg-primary/70' },
                  { h: 60, c: 'bg-primary' }, { h: 48, c: 'bg-primary/90' }, { h: 28, c: 'bg-primary/60' }, { h: 56, c: 'bg-primary' },
                  { h: 36, c: 'bg-primary/70' }, { h: 64, c: 'bg-primary' }, { h: 28, c: 'bg-secondary/50' }, { h: 48, c: 'bg-secondary/80' },
                  { h: 40, c: 'bg-secondary' }, { h: 20, c: 'bg-secondary/40' }, { h: 44, c: 'bg-secondary/70' }, { h: 32, c: 'bg-secondary/60' },
                  { h: 24, c: 'bg-outline-variant/30' }, { h: 52, c: 'bg-outline-variant/40' }, { h: 36, c: 'bg-outline-variant/30' }, { h: 56, c: 'bg-outline-variant/40' },
                  { h: 20, c: 'bg-outline-variant/20' }, { h: 32, c: 'bg-outline-variant/30' }, { h: 44, c: 'bg-outline-variant/30' }, { h: 24, c: 'bg-outline-variant/20' },
                  { h: 16, c: 'bg-outline-variant/20' }
                ].map((bar, i) => (
                  <div
                    key={i}
                    className={`w-2.5 rounded-full ${bar.c} transition-all`}
                    style={{ height: `${bar.h}px` }}
                  ></div>
                ))}
              </div>

              {/* Timeline Track Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-full bg-primary-container text-white hover:bg-inverse-primary transition-all flex items-center justify-center shadow-md shadow-primary-container/30 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-base">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <button
                    onClick={() => seekTo(Math.max(0, currentTimeSec - 10))}
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    title="Rewind 10s"
                  >
                    <span className="material-symbols-outlined text-lg">replay_10</span>
                  </button>
                  <button
                    onClick={() => seekTo(Math.min(totalDurationSec, currentTimeSec + 10))}
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    title="Forward 10s"
                  >
                    <span className="material-symbols-outlined text-lg">forward_10</span>
                  </button>
                  <span className="text-xs font-mono text-on-surface-variant ml-2">
                    {formatTime(currentTimeSec)} / {formatTime(totalDurationSec)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-secondary font-medium">
                  <span className="material-symbols-outlined text-sm">record_voice_over</span>
                  <span>Now Speaking: Elena Rostova</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: PRESCIENT MODEL v4.2 EXECUTIVE AI SYNTHESIS */}
          <div className="p-5 rounded-2xl bg-surface-container-low/75 backdrop-blur-xl border border-outline-variant/30 space-y-4 glass-panel">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-primary-container/30 border border-primary/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm">psychology</span>
                </div>
                <h2 className="text-base font-headline font-bold text-on-surface">
                  Prescient Model v4.2 Executive AI Synthesis
                </h2>
              </div>
              <span className="text-xs text-outline font-mono">Confidence: 96.4%</span>
            </div>

            {/* Structured AI Key Insights Grid */}
            <div className="space-y-3">
              {/* 1. Budget Confirmed */}
              <div className="p-3.5 rounded-xl bg-surface-container/60 border border-outline-variant/40 flex items-start gap-3.5 hover:border-tertiary/40 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-tertiary/15 border border-tertiary/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-on-surface">Budget Confirmed for Q3 Deployment</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-tertiary/15 text-tertiary border border-tertiary/30">
                      Verified Capital
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Horizon engineering leadership signed off on capital allocation of <strong className="text-on-surface font-semibold">$340,000 ARR</strong>, representing a +$20k expansion from the initial $320k scope to accommodate continuous vector indexing.
                  </p>
                  <div className="text-[11px] text-outline flex items-center gap-1.5 pt-1 font-mono">
                    <span className="material-symbols-outlined text-xs">mic</span>
                    <span>Direct Quote (28:05): "The Q3 allocation has been cleared with finance for 340k."</span>
                  </div>
                </div>
              </div>

              {/* 2. Primary Blocker */}
              <div className="p-3.5 rounded-xl bg-surface-container/60 border border-error/30 flex items-start gap-3.5 hover:border-error/50 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-error/15 border border-error/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-error text-lg">error</span>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-error">Blocker: European Data Residency Frankfurt Guarantees</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-error/15 text-error border border-error/30">
                      Action Required
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Elena explicitly reiterated that contractual execution cannot proceed without a binding commitment that all neural pipeline workloads remain strictly bounded within the <strong className="text-on-surface font-semibold">AWS eu-central-1 (Frankfurt)</strong> region.
                  </p>
                  <div className="text-[11px] text-outline flex items-center gap-1.5 pt-1 font-mono">
                    <span className="material-symbols-outlined text-xs">policy</span>
                    <span>Requires legal addendum DPA clause 4.2 attachment.</span>
                  </div>
                </div>
              </div>

              {/* 3. Requested Deliverable */}
              <div className="p-3.5 rounded-xl bg-surface-container/60 border border-outline-variant/40 flex items-start gap-3.5 hover:border-secondary/40 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-secondary text-lg">description</span>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-on-surface">Requested SLA Document Delivery to Legal</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary/15 text-secondary border border-secondary/30">
                      Friday Deadline
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Custom Tier-1 SLA specifications (99.99% neural response uptime, 15-minute critical triage response) requested for Horizon legal review prior to <strong className="text-on-surface font-semibold">Friday, 17:00 CET</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Deep Transcript Context Snippet */}
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-outline uppercase tracking-wider font-semibold font-mono">Key Exchange Transcript</span>
                <span 
                  onClick={() => showToast('Opening complete diarized conversation transcript (3,842 words)...', 'info')}
                  className="text-primary hover:underline cursor-pointer"
                >
                  View full diarization (3,842 words)
                </span>
              </div>
              <div className="text-xs space-y-2 font-mono leading-relaxed">
                <p>
                  <span className="text-secondary font-semibold">Elena (VP Eng):</span> "If you can provide written Frankfurt enclave containment before Friday, we will route through procurement without delay."
                </p>
                <p>
                  <span className="text-tertiary font-semibold">Alex (CRO):</span> "Consider it done. I'll dispatch the addendum alongside the 99.99% enterprise SLA guarantee tonight."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: CRM UPDATES & ACTION STAGING (5 Cols) ================= */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          {/* SECTION: AUTONOMOUS CRM FIELD UPDATES */}
          <div className="p-5 rounded-2xl bg-surface-container-low/75 backdrop-blur-xl border border-outline-variant/30 space-y-4 glass-panel">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-tertiary/20 border border-tertiary/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary text-sm">sync</span>
                </div>
                <h2 className="text-base font-headline font-bold text-on-surface">
                  Autonomous CRM Field Updates
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-primary-container/20 text-primary-fixed border border-primary/30">
                {crmUpdates.filter((u) => u.approved).length} / {crmUpdates.length} Staged
              </span>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Prescient AI synthesized real-time agreement milestones and extracted three direct CRM adjustments for Horizon Labs opportunity.
            </p>

            {/* Pending Modifications Comparison Table */}
            <div className="rounded-xl border border-outline-variant/30 overflow-hidden bg-surface-container-lowest/80">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high/60 border-b border-outline-variant/30 text-xs font-mono uppercase tracking-wider text-outline">
                    <th className="p-3 w-8">
                      <span className="material-symbols-outlined text-xs">check_box</span>
                    </th>
                    <th className="p-3 font-semibold">CRM Field</th>
                    <th className="p-3 font-semibold">Previous</th>
                    <th className="p-3 font-semibold text-secondary">Neural Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 text-xs">
                  {crmUpdates.map((update) => (
                    <tr key={update.id} className="hover:bg-surface-container/50 transition-colors">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={update.approved}
                          onChange={() => toggleCrmUpdateApproval(update.id)}
                          className="rounded bg-surface border-outline-variant text-primary-container focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="p-3 font-medium text-on-surface">{update.field}</td>
                      <td className="p-3 text-on-surface-variant font-mono line-through decoration-outline">
                        {update.previousValue}
                      </td>
                      <td className="p-3 font-mono text-tertiary font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-tertiary">arrow_forward</span>
                        {update.neuralUpdate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Approve All Changes Trigger Button */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={approveAllCrmUpdates}
                className="flex-1 py-2.5 px-4 rounded-xl bg-primary-container hover:bg-inverse-primary text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-container/30 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-base">done_all</span>
                <span>Approve All Changes</span>
              </button>
              <button
                onClick={() => showToast('Opening manual field editor override...', 'info')}
                className="py-2.5 px-3 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface text-xs font-semibold border border-outline-variant/30 transition-colors"
              >
                Modify
              </button>
            </div>
          </div>

          {/* SECTION: AUTO-GENERATED ACTION ITEMS */}
          <div className="p-5 rounded-2xl bg-surface-container-low/75 backdrop-blur-xl border border-outline-variant/30 space-y-4 glass-panel">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-secondary/20 border border-secondary/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-sm">bolt</span>
                </div>
                <h2 className="text-base font-headline font-bold text-on-surface">Auto-Generated Action Items</h2>
              </div>
              <span className="text-xs text-outline font-mono">Autonomous Dispatch</span>
            </div>

            {/* Action Checklist Items with 1-Tap Dispatch */}
            <div className="space-y-3">
              {actionItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl bg-surface-container/60 border border-outline-variant/40 space-y-2.5 hover:border-primary/40 transition-colors ${
                    item.completed ? 'opacity-80' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleActionItem(item.id)}
                        className="mt-0.5 rounded bg-surface border-outline-variant text-primary-container focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <h3 className={`text-xs font-semibold text-on-surface ${item.completed ? 'line-through text-outline' : ''}`}>
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-on-surface-variant leading-snug">{item.description}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap ${
                        item.priority === 'High Priority'
                          ? 'bg-error/15 text-error border border-error/30'
                          : item.priority === 'AI Draft Ready'
                          ? 'bg-primary-container/20 text-primary-fixed border border-primary/30'
                          : 'bg-surface-container-high text-on-surface-variant border border-outline-variant/30'
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                    <div className="flex items-center gap-3 text-[11px] text-outline font-mono">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">person</span>
                        {item.assignee}
                      </span>
                      <span className={`flex items-center gap-1 ${item.priority === 'High Priority' ? 'text-error' : item.priority === 'AI Draft Ready' ? 'text-primary' : ''}`}>
                        <span className="material-symbols-outlined text-xs">
                          {item.actionType === 'calendar' ? 'calendar_today' : item.actionType === 'email' ? 'mail' : 'schedule'}
                        </span>
                        {item.dueText}
                      </span>
                    </div>

                    {/* 1-Tap Dispatch Trigger */}
                    {item.actionType === 'email' ? (
                      <button
                        onClick={() => {
                          const horizonDeal = deals.find((d) => d.id === 'horizon-cloud-labs') || deals[1];
                          setSelectedContactDeal(horizonDeal);
                          setActiveView('copilot');
                          showToast('Jumped to Outreach Copilot with staged SLA breakdown email.', 'purple');
                        }}
                        className="px-3 py-1 rounded-lg bg-primary-container hover:bg-inverse-primary text-white text-xs font-bold flex items-center gap-1 transition-all active:scale-95 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-xs">forward_to_inbox</span>
                        <span>Review &amp; Send</span>
                      </button>
                    ) : item.actionType === 'calendar' ? (
                      <button
                        onClick={() => {
                          showToast('Calendar invite staged and synched with Google Calendar.', 'success');
                          dispatchActionItem(item.id);
                        }}
                        className="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-secondary/20 hover:text-secondary text-on-surface text-xs font-semibold border border-outline-variant/40 flex items-center gap-1 transition-all"
                      >
                        <span className="material-symbols-outlined text-xs">event</span>
                        <span>Calendar Sync</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => dispatchActionItem(item.id)}
                        className="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-secondary/20 hover:text-secondary text-on-surface text-xs font-semibold border border-outline-variant/40 flex items-center gap-1 transition-all"
                      >
                        <span className="material-symbols-outlined text-xs">send</span>
                        <span>Dispatch</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Autonomous Action Protocol Banner */}
            <div className="p-3 rounded-xl bg-surface-container-high/40 border border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-base">check_circle</span>
                <span className="text-xs text-on-surface">Autonomous routing enabled for trusted recipients</span>
              </div>
              <span 
                onClick={() => setActiveView('settings')}
                className="text-xs text-secondary hover:underline cursor-pointer font-mono"
              >
                Configure rules
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

