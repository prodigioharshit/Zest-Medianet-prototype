
export type View = 'dashboard' | 'create-campaign' | 'analytics' | 'faq' | 'community' | 'settings';

export interface Campaign {
  id: string;
  name: string;
  goal: string;
  status: 'active' | 'paused' | 'draft';
  budget: number;
  spent: number;
  clicks: number;
  impressions: number;
  ctr: number;
  cpc: number;
  createdAt: string;
}

export interface TargetingFilter {
  ageRange: [number, number];
  gender: string[];
  interests: string[];
  behaviors: string[];
}

export interface CampaignFormData {
  name: string;
  goal: string;
  targeting: TargetingFilter;
  hosting: string[];
  dailyBudget: number;
  headline: string;
  description: string;
  assetUrl: string | null;
  isScheduled: boolean;
  scheduledDate: string;
  scheduledTime: string;
}
