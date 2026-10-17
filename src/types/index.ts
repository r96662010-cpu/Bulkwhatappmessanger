export interface Lead {
  id: string;
  name: string;
  phone: string;
  company: string;
  course: string;
  status: 'pending' | 'delivered' | 'read' | 'failed';
  discount: string;
  selected: boolean;
  tags: string[];
  lastContacted?: string;
}

export interface Candidate {
  id: string;
  name: string;
  phone: string;
  email: string;
  profileCategory: 'IT & AI' | 'Non-IT' | 'White Collar' | 'Blue Collar' | 'Executive';
  currentRole: string;
  currentCTC: string;
  expectedCTC: string;
  experienceYears: string;
  noticePeriodDays: string;
  cvFileName: string;
  status: 'Screening' | 'Call Done' | 'Interview Scheduled' | 'Shortlisted' | 'Offer Sent' | 'Hired' | 'Rejected';
  lastCallStatus: 'Connected' | 'Follow-up Needed' | 'Busy' | 'Offer Discussion' | 'Payment Due';
  callNotes: string;
  paymentStatus: 'Pending' | 'Advance Paid' | 'Settled' | 'N/A';
  paymentAmount: string;
  addedDate: string;
}

export interface JobDescription {
  id: string;
  title: string;
  category: string;
  experience: string;
  salaryRange: string;
  location: string;
  openings: number;
  skills: string[];
  whatsappMessage: string;
}

export interface TemplateButton {
  type: 'url' | 'call' | 'quick_reply';
  label: string;
  value: string;
}

export type TemplateCategory =
  | 'All'
  | 'Special Announcements'
  | 'Masterclass & Training'
  | 'Corporate Staffing'
  | '48-Hour Flash Offers'
  | 'Live Webinars'
  | 'Invoice Reminders'
  | 'VIP Onboarding'
  | 'Free YouTube Video Promo'
  | 'Win-Back Campaigns'
  | 'Course Syllabus Downloads'
  | 'AI Calling Follow-up'
  | 'Payment Notice'
  | 'Custom';

export interface Template {
  id: string;
  title: string;
  category: TemplateCategory;
  content: string;
  buttons?: TemplateButton[];
  variables: string[];
  createdDate: string;
  isCustom?: boolean;
  conversionRate?: string;
}

export interface SIMConfig {
  id: string;
  name: string;
  number: string;
  carrier: string;
  status: 'active' | 'warming' | 'paused';
  sentToday: number;
  dailyLimit: number;
  healthScore: number;
  ipLocation: string;
  lastUsed?: string;
}

export interface BroadcastLog {
  id: string;
  timestamp: string;
  leadId: string;
  leadName: string;
  phone: string;
  company: string;
  message: string;
  simId: string;
  simName: string;
  status: 'delivered' | 'read' | 'failed';
  delaySeconds: number;
}

export interface BroadcastSettings {
  jitterMin: number;
  jitterMax: number;
  selectedSimIds: string[];
  retryFailed: boolean;
  stopOnSpamFlag: boolean;
}

export type TabType = 
  | 'console' 
  | 'audience' 
  | 'recruitment' 
  | 'templates' 
  | 'ai-workflow' 
  | 'creator-studio' 
  | 'sims' 
  | 'logs';

export interface ShortcutItem {
  id: string;
  keyCombo: string[];
  description: string;
  category: 'Navigation' | 'Broadcasting' | 'Audience' | 'General';
  action: () => void;
  badge?: string;
}
