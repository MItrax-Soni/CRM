export type ViewType = 'pipeline' | 'leads' | 'debriefs' | 'copilot' | 'analytics' | 'settings';

export interface Deal {
  id: string;
  name: string;
  company: string;
  sector: string;
  champion: string;
  championRole: string;
  championAvatar?: string;
  dealValue: number;
  dealValueFormatted: string;
  winProbability: number;
  healthScore: number;
  stage: 'Qualified' | 'Proposal' | 'Contract Sent' | 'Closed Won' | 'At Risk';
  velocity: string;
  cycleTime: string;
  prescribedAction: string;
  signalSnippet: string;
  tag?: string;
  statusType?: 'accelerating' | 'stalled' | 'risk';
  category?: 'high_intent' | 'at_risk' | 'closing_this_month' | 'contract_sent';
  initials: string;
  colorClass: string;
  stakeholders?: {
    name: string;
    role: string;
    status: string;
    intent: 'high' | 'signed' | 'review' | 'neutral';
    touchpoints: number;
    initials: string;
  }[];
  warmConnections?: {
    name: string;
    title: string;
    strength: number;
    description: string;
  }[];
  copilotRecommendation?: {
    title: string;
    description: string;
    actionLabel: string;
  };
}

export interface CrmFieldUpdate {
  id: string;
  field: string;
  previousValue: string;
  neuralUpdate: string;
  approved: boolean;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'High Priority' | 'Medium' | 'AI Draft Ready';
  assignee: string;
  dueText: string;
  completed: boolean;
  actionType: 'dispatch' | 'calendar' | 'email';
}

export interface TelemetrySignal {
  id: string;
  type: 'deck' | 'zoom' | 'email' | 'security';
  title: string;
  timestamp: string;
  description: string;
  detail?: string;
  confidence?: string;
  icon: string;
  color: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'success' | 'info';
  read: boolean;
  linkView?: ViewType;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'copilot';
  text: string;
  timestamp: string;
  actions?: { label: string; action: () => void }[];
}

