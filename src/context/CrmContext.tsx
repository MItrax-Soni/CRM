import React, { createContext, useContext, useState } from 'react';
import type { ViewType, Deal, CrmFieldUpdate, ActionItem, TelemetrySignal, NotificationItem, CopilotMessage } from '../types';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'purple';
}

interface CrmContextType {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  deals: Deal[];
  addDeal: (deal: Omit<Deal, 'id'>) => void;
  updateDeal: (id: string, updates: Partial<Deal>) => void;
  crmUpdates: CrmFieldUpdate[];
  toggleCrmUpdateApproval: (id: string) => void;
  approveAllCrmUpdates: () => void;
  actionItems: ActionItem[];
  toggleActionItem: (id: string) => void;
  dispatchActionItem: (id: string) => void;
  telemetrySignals: TelemetrySignal[];
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isCopilotDrawerOpen: boolean;
  setIsCopilotDrawerOpen: (open: boolean) => void;
  isNewLeadModalOpen: boolean;
  setIsNewLeadModalOpen: (open: boolean) => void;
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  copilotMessages: CopilotMessage[];
  sendCopilotMessage: (text: string) => void;
  selectedContactDeal: Deal;
  setSelectedContactDeal: (deal: Deal) => void;
  totalPipelineValue: number;
}

const initialDeals: Deal[] = [
  {
    id: 'stripe-enterprise',
    name: 'Stripe Enterprise',
    company: 'Stripe Enterprise',
    sector: 'Global Fintech Infrastructure',
    champion: 'Sarah Lin',
    championRole: 'VP Engineering',
    dealValue: 1200000,
    dealValueFormatted: '$1,200,000',
    winProbability: 91,
    healthScore: 96,
    stage: 'Contract Sent',
    velocity: '2.8x speed',
    cycleTime: '12d',
    prescribedAction: 'Stage Master Service Agreement',
    signalSnippet: 'CEO viewed InfoSec sheet 4x',
    category: 'closing_this_month',
    statusType: 'accelerating',
    initials: 'SE',
    colorClass: 'secondary'
  },
  {
    id: 'horizon-cloud-labs',
    name: 'Horizon Cloud Labs',
    company: 'Horizon Cloud Labs',
    sector: 'Multi-Cloud Infrastructure · Series C',
    champion: 'Dr. Marcus Chen & Elena Rostova',
    championRole: 'Chief Technology Officer / VP Eng',
    championAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFAHInUzaix7-unCz6w4nrze5RU5tbJ2IXql0rwpuhStX45SI4H6ABjsUa3lCAK-qiAhgFUMP6MarKIStxV4oAkkzXy5nufvkUjh3ovXqrBHyA6DMKjA3UsnwgX0IyFdaGIBnuBX2lVSBtHEok_v_Hf_y4XBORY_SGDgzloJy577exL6uEZqZj1bZvsq6Ay59AN0ZADYMjID1fcqWoYv_vaEbUsYFYXTFAml_4ufo',
    dealValue: 340000,
    dealValueFormatted: '$340,000 ARR',
    winProbability: 96,
    healthScore: 94,
    stage: 'Contract Sent',
    velocity: '2.4x speed',
    cycleTime: '6d fast track',
    prescribedAction: 'Send Egress Addendum Draft',
    signalSnippet: 'CEO & VP Sec reviewed security doc 4x today',
    category: 'contract_sent',
    statusType: 'accelerating',
    initials: 'HL',
    colorClass: 'tertiary',
    stakeholders: [
      { name: 'Dr. Marcus Chen', role: 'Chief Technology Officer (Economic Buyer)', status: 'High Intent', intent: 'high', touchpoints: 8, initials: 'MC' },
      { name: 'Elena Rostova', role: 'VP of Engineering (Primary Decision Maker)', status: 'Signed Off', intent: 'signed', touchpoints: 12, initials: 'ER' },
      { name: 'Sarah Lin', role: 'VP Security (SOC2 Compliance Signoff)', status: 'Approved', intent: 'signed', touchpoints: 5, initials: 'SL' },
      { name: 'David Vance', role: 'Procurement Lead (Contract Redlines)', status: 'In Review', intent: 'review', touchpoints: 3, initials: 'DV' }
    ],
    warmConnections: [
      { name: 'Elena Rostova (Board Member)', title: 'Co-invested with Marcus Chen in 2022', strength: 94, description: 'Offered to send closing endorsement via Signal' },
      { name: 'Peer Referral: Datadog Ex-SVP', title: 'Advisory Circle', strength: 88, description: 'Validated Cognitive CRM deployment speed during breakfast roundtable' }
    ],
    copilotRecommendation: {
      title: 'Competitor (Palantir Foundry) proposed lower upfront tier',
      description: 'Trigger pre-baked Executive SLA & Zero-Egress Addendum. Marcus Chen reviewed cloud data egress clause 3x; offering 0% egress markup seals signature before Friday 5 PM.',
      actionLabel: 'Send Egress Addendum Draft'
    }
  },
  {
    id: 'acme-corp',
    name: 'Acme Corp',
    company: 'Acme Corp',
    sector: 'Global Logistics & Retail Infrastructure',
    champion: 'Mark Rodriguez',
    championRole: 'Chief Technology Officer',
    dealValue: 850000,
    dealValueFormatted: '$850,000',
    winProbability: 64,
    healthScore: 58,
    stage: 'Proposal',
    velocity: 'Stalled',
    cycleTime: '28d',
    prescribedAction: 'Dispatch Competitor Counter-Brief',
    signalSnippet: 'Competitor battlecard alert flagged',
    category: 'at_risk',
    statusType: 'risk',
    initials: 'AC',
    colorClass: 'error'
  },
  {
    id: 'vektor-ai',
    name: 'Vektor AI Systems',
    company: 'Vektor AI Systems',
    sector: 'Autonomous Logistics · Enterprise',
    champion: 'Claire Beaumont',
    championRole: 'VP Operations & Supply Chain',
    championAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzEKO_7C430DO7VfUQ7xq2Yhd9MOgvhd3jE847OlPInn1ubbTP-1h13cqgoJiXfTPF_nzIRHo86ub2mVk05_SyI4wN4Wlp0zqbh4Rm7MFlMy7_R_KveLygzGbxGlJRiftA1XdWpVURc5T7DDYTDJnZqq1K4peUs65xMshfrd0LtAUozwNjomOVtB4uTY-1VxhA6p-tgdUBKe0wvsmisL1F9fw26c5uiBkCnwacRVI',
    dealValue: 245000,
    dealValueFormatted: '$245,000',
    winProbability: 84,
    healthScore: 88,
    stage: 'Proposal',
    velocity: 'On Track (14d)',
    cycleTime: '14d',
    prescribedAction: 'Draft Confirmation Schedule',
    signalSnippet: 'Budget approved; procurement sync scheduled tomorrow',
    category: 'high_intent',
    statusType: 'accelerating',
    initials: 'VA',
    colorClass: 'tertiary'
  },
  {
    id: 'sovereign-financial',
    name: 'Sovereign Financial Group',
    company: 'Sovereign Financial Group',
    sector: 'Asset Management · Tier 1 FinTech',
    champion: 'Julian Sterling',
    championRole: 'Managing Director, Risk',
    championAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG6qdk9eoQw1YSMPVsziH6Myy-GrhF4i36lzt4fEWmcXfVleAjjK-bkyedwux_v96MlVqlQIQl8jDbgVneMbpWsaaxuBrLpBTfdPTczT3tzdwc_Gc9poLIIQvFTLZZE4QcqszLNmO9pue-fa60lHkjhoNs_zPVLW5URKvxZPkTAPyh83o9Vsx4lj93dpDQ5flfWqmdvpY_KRRLQrFG15yk-JCu4l0JsOisLtLHOuM',
    dealValue: 510000,
    dealValueFormatted: '$510,000',
    winProbability: 41,
    healthScore: 42,
    stage: 'Proposal',
    velocity: '+19d delay',
    cycleTime: '45d',
    prescribedAction: 'Emergency Executive Call / Re-engagement',
    signalSnippet: '14 days without interaction; Julian out-of-office missed',
    category: 'at_risk',
    statusType: 'risk',
    initials: 'SF',
    colorClass: 'error'
  },
  {
    id: 'aether-biotech',
    name: 'Aether BioTech Discovery',
    company: 'Aether BioTech Discovery',
    sector: 'Genomic Analytics · Public Health',
    champion: 'Dr. Aris Thorne',
    championRole: 'Head of Computational Biology',
    championAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh2C4a3Styf5rMuwUH-P9WHQuaMSlHwFuwaXzpJOeQ6vzRRuBE5YL540T9novMXoZ9d-Y27PXMkIw7Jj4o-jwusEPaR5Sq_L6wEcyzHJiNxAK9re2D0fdjoBlbUwNS2rBmtLzKh0D2iHdnOcJmG10nqxZbmJ7XEQB_ZqWFvbzOT8V9U5UNL03guwnY5TzJ_mWuLpxE1jZmFdVkt7oqDwY_u_37YZguzer3ZbahdeA',
    dealValue: 185000,
    dealValueFormatted: '$185,000',
    winProbability: 91,
    healthScore: 92,
    stage: 'Contract Sent',
    velocity: 'Closes in 4d',
    cycleTime: '8d',
    prescribedAction: 'Draft Sign-off reminder',
    signalSnippet: 'Security annex ratified; legal sent finalized MS Word doc',
    category: 'closing_this_month',
    statusType: 'accelerating',
    initials: 'AB',
    colorClass: 'secondary'
  },
  {
    id: 'nexar-security',
    name: 'Nexar Cyber Shield',
    company: 'Nexar Cyber Shield',
    sector: 'Zero Trust Security · Scaleup',
    champion: 'Kareem Al-Mansoor',
    championRole: 'Chief Information Security Officer',
    championAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQxd-eKz_ZW3Ce36gZA9XiFKmB-12rk8KF7adNqvz5C1hCIggnnFJ9p5lx2PKUTU0t_kcEHu2WS8udfozfouivoWD-TonelhWtHn2bZH2QjV3wMt7aYwZ4pjwT-wd-NnrWxUAVpFz2wJ5t4CdnekxdW6NPc_v6-paU8sk2tUUJVZxyGGBiCpmGWvjUitKPMPOBFo3kt4r-6meAUJ75byfQx24emqfSi7qMKzeUVwk',
    dealValue: 160000,
    dealValueFormatted: '$160,000',
    winProbability: 72,
    healthScore: 78,
    stage: 'Qualified',
    velocity: 'Day 8 in stage',
    cycleTime: '8d',
    prescribedAction: 'Draft Sandbox Follow-up',
    signalSnippet: 'Downloaded API specs; 2 engineers invited to sandbox',
    category: 'high_intent',
    statusType: 'stalled',
    initials: 'NS',
    colorClass: 'primary'
  },
  {
    id: 'datasync-systems',
    name: 'Datasync Systems',
    company: 'Datasync Systems',
    sector: 'Data Mesh & Lakehouse Integrations',
    champion: 'Kavita Patel',
    championRole: 'Procurement Lead',
    dealValue: 310000,
    dealValueFormatted: '$310,000',
    winProbability: 75,
    healthScore: 79,
    stage: 'Contract Sent',
    velocity: 'Final Sign-off',
    cycleTime: '15d',
    prescribedAction: 'Contract Final Sign-off Review',
    signalSnippet: 'Legal review completed today',
    category: 'contract_sent',
    statusType: 'accelerating',
    initials: 'DS',
    colorClass: 'secondary'
  }
];

const initialCrmUpdates: CrmFieldUpdate[] = [
  { id: 'u1', field: 'Opportunity Stage', previousValue: 'Technical Eval', neuralUpdate: 'Contract Negotiation', approved: true },
  { id: 'u2', field: 'Target Close Date', previousValue: 'Dec 15, 2024', neuralUpdate: 'Nov 18, 2024', approved: true },
  { id: 'u3', field: 'Total Contract Value', previousValue: '$320,000', neuralUpdate: '$340,000 ARR', approved: true }
];

const initialActionItems: ActionItem[] = [
  {
    id: 'a1',
    title: 'Send EU Data Residency Addendum to legal team',
    description: 'Include Frankfurt AWS containment clause 4.2',
    priority: 'High Priority',
    assignee: 'Alex Vance',
    dueText: 'Due Today 18:00',
    completed: false,
    actionType: 'dispatch'
  },
  {
    id: 'a2',
    title: 'Schedule 15-min follow-up with procurement lead',
    description: 'Align on MSA standard terms & Q3 PO generation',
    priority: 'Medium',
    assignee: 'Sarah Chen',
    dueText: 'Tomorrow, 10:00',
    completed: false,
    actionType: 'calendar'
  },
  {
    id: 'a3',
    title: 'Email Elena custom SLA tier breakdown',
    description: 'Includes 99.99% neural uptime tier & latency SLA',
    priority: 'AI Draft Ready',
    assignee: 'Alex Vance',
    dueText: 'Draft Auto-Compiled',
    completed: true,
    actionType: 'email'
  }
];

const initialTelemetry: TelemetrySignal[] = [
  {
    id: 't1',
    type: 'deck',
    title: 'Deck Telemetry',
    timestamp: '14 mins ago',
    description: 'Elena opened proposal deck, spent 6m on Security slide #8.',
    detail: 'Slide #8: "Zero-Knowledge SOC2 Transit" (Dwell: 380s)',
    confidence: '98%',
    icon: 'present_to_all',
    color: 'secondary'
  },
  {
    id: 't2',
    type: 'zoom',
    title: 'Zoom Debrief Synthesis',
    timestamp: '2 hours ago',
    description: 'AI debriefed 4 questions from 32-min technical discovery call.',
    detail: 'Elena: "Our telemetry pipeline SLA requires latency under 15ms target for Frankfurt node."',
    confidence: '98%',
    icon: 'record_voice_over',
    color: 'primary'
  },
  {
    id: 't3',
    type: 'security',
    title: 'High Intent Signal',
    timestamp: '18m ago',
    description: 'CEO at Horizon Cloud Labs reviewed InfoSec whitepaper 4 times in 90 minutes.',
    detail: '+14% Win Probability acceleration',
    confidence: '96%',
    icon: 'visibility',
    color: 'tertiary'
  },
  {
    id: 't4',
    type: 'email',
    title: 'Contract Clause Staged',
    timestamp: '44m ago',
    description: 'Copilot drafted mutual SLA terms counter-proposal matching Q3 legal guidance parameters.',
    detail: 'Waiting for CRO sign-off',
    confidence: '94%',
    icon: 'gavel',
    color: 'primary'
  }
];

const initialNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Competitor Battlecard Alert',
    message: 'Acme Corp is reviewing a lower upfront bid from Palantir Foundry.',
    time: '8m ago',
    type: 'alert',
    read: false,
    linkView: 'leads'
  },
  {
    id: 'n2',
    title: 'Meeting Debrief Synthesized',
    message: 'Horizon Labs Architecture Sync debriefed. $340k budget confirmed.',
    time: '22m ago',
    type: 'success',
    read: false,
    linkView: 'debriefs'
  },
  {
    id: 'n3',
    title: 'Autonomous Field Synced',
    message: 'Stripe Enterprise MSA staged with 0 errors.',
    time: '1h ago',
    type: 'info',
    read: true,
    linkView: 'pipeline'
  }
];

const CrmContext = createContext<CrmContextType | undefined>(undefined);

export const CrmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewType>('pipeline');
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [crmUpdates, setCrmUpdates] = useState<CrmFieldUpdate[]>(initialCrmUpdates);
  const [actionItems, setActionItems] = useState<ActionItem[]>(initialActionItems);
  const [telemetrySignals, setTelemetrySignals] = useState<TelemetrySignal[]>(initialTelemetry);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCopilotDrawerOpen, setIsCopilotDrawerOpen] = useState(false);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [selectedContactDeal, setSelectedContactDeal] = useState<Deal>(initialDeals[1]); // Horizon Labs by default
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>([
    {
      id: 'm1',
      sender: 'copilot',
      text: 'Good morning Alex. Neural telemetry is active across all 42 enterprise accounts. Active pipeline is tracking +$340k ahead of Q3 pacing. 3 accounts require immediate tactical interventions today (Acme Corp, Horizon Cloud Labs, Sovereign Financial). What would you like to execute?',
      timestamp: 'Just now'
    }
  ]);

  const showToast = (message: string, type: Toast['type'] = 'purple') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addDeal = (dealData: Omit<Deal, 'id'>) => {
    const newId = 'deal-' + Math.random().toString(36).substring(2, 9);
    const newDeal: Deal = {
      ...dealData,
      id: newId
    };
    setDeals((prev) => [newDeal, ...prev]);
    showToast(`Lead created for ${newDeal.company}! Win probability: ${newDeal.winProbability}%`, 'success');
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const updateDeal = (id: string, updates: Partial<Deal>) => {
    setDeals((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  };

  const toggleCrmUpdateApproval = (id: string) => {
    setCrmUpdates((prev) =>
      prev.map((u) => (u.id === id ? { ...u, approved: !u.approved } : u))
    );
  };

  const approveAllCrmUpdates = () => {
    setCrmUpdates((prev) => prev.map((u) => ({ ...u, approved: true })));
    // Sync with Horizon Labs deal
    updateDeal('horizon-cloud-labs', {
      stage: 'Contract Sent',
      dealValue: 340000,
      dealValueFormatted: '$340,000 ARR'
    });
    showToast('All 3 autonomous CRM modifications approved & synchronized into live pipeline!', 'success');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const toggleActionItem = (id: string) => {
    setActionItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
    showToast('Action item updated.', 'info');
  };

  const dispatchActionItem = (id: string) => {
    const item = actionItems.find((i) => i.id === id);
    if (!item) return;

    setActionItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, completed: true } : i))
    );

    showToast(`Dispatched: ${item.title}`, 'purple');
    
    // Add to telemetry
    setTelemetrySignals((prev) => [
      {
        id: 't-' + Date.now(),
        type: 'email',
        title: 'Action Item Dispatched',
        timestamp: 'Just now',
        description: `${item.title} automatically delivered to recipient.`,
        confidence: '99%',
        icon: 'send',
        color: 'tertiary'
      },
      ...prev
    ]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const sendCopilotMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: CopilotMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setCopilotMessages((prev) => [...prev, userMsg]);

    // Intelligent responses
    setTimeout(() => {
      let reply = "I've analyzed that request across your Bayesian pipeline telemetry.";
      const lower = text.toLowerCase();

      if (lower.includes('acme') || lower.includes('competitor')) {
        reply = "Acme Corp alert: Palantir Foundry is pitching a 15% lower entry tier. I recommend counteracting with our Zero-Egress Architecture Brief & guaranteed 99.99% neural SLA. Would you like me to dispatch the counter-brief?";
      } else if (lower.includes('horizon') || lower.includes('elena')) {
        reply = "Horizon Cloud Labs update: Elena Rostova spent 6 minutes reviewing Slide #8 (Zero-Knowledge SOC2 Transit). Frankfurt EU enclave DPA clause is staged. The $340,000 ARR PO is ready upon sending the SOC2 pack.";
      } else if (lower.includes('q3') || lower.includes('gap') || lower.includes('pacing')) {
        reply = "Q3 Pacing Analysis: Currently at $2,840,000 ARR with $3.10M target (91.4% achieved). Model v4.8 projects a $3.12M close (+$20k above target) if either Stripe Enterprise ($1.2M) or Horizon Labs ($340k) closes by Week 11.";
      } else if (lower.includes('sovereign')) {
        reply = "Sovereign Financial ($510k) has stalled 14 days due to Julian Sterling's PTO. I drafted a personalized executive re-engagement note leveraging our mutual board contact Elena Rostova.";
      } else {
        reply = `Prescient AI synthesized "${text}". All pipeline weights adjusted. 0 telemetry anomalies detected across 42 active enterprise accounts.`;
      }

      setCopilotMessages((prev) => [
        ...prev,
        {
          id: 'msg-rep-' + Date.now(),
          sender: 'copilot',
          text: reply,
          timestamp: 'Just now'
        }
      ]);
    }, 700);
  };

  const totalPipelineValue = deals.reduce((acc, deal) => acc + deal.dealValue, 0);

  return (
    <CrmContext.Provider
      value={{
        activeView,
        setActiveView,
        deals,
        addDeal,
        updateDeal,
        crmUpdates,
        toggleCrmUpdateApproval,
        approveAllCrmUpdates,
        actionItems,
        toggleActionItem,
        dispatchActionItem,
        telemetrySignals,
        notifications,
        markNotificationRead,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isCopilotDrawerOpen,
        setIsCopilotDrawerOpen,
        isNewLeadModalOpen,
        setIsNewLeadModalOpen,
        toasts,
        showToast,
        removeToast,
        copilotMessages,
        sendCopilotMessage,
        selectedContactDeal,
        setSelectedContactDeal,
        totalPipelineValue
      }}
    >
      {children}
    </CrmContext.Provider>
  );
};

export const useCrm = () => {
  const context = useContext(CrmContext);
  if (!context) {
    throw new Error('useCrm must be used within a CrmProvider');
  }
  return context;
};

