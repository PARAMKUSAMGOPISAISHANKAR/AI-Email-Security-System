import type {
  DetectionResult,
  HistoryItem,
  DashboardStats,
  TrendPoint,
  MonthlyReport,
  User,
  RiskLevel,
} from '@/types';

// --- Dummy user -----------------------------------------------------------

export const mockUser: User = {
  name: 'Ananya Rao',
  email: 'ananya.rao@mailbox.dev',
  joined: '2025-02-11',
  totalEmails: 4821,
  avatarColor: 'from-signal-500 to-violet-600',
};

// --- Dashboard stats --------------------------------------------------------

export const mockStats: DashboardStats = {
  totalScanned: 4821,
  spamCount: 1163,
  safeCount: 3658,
  accuracy: 97.4,
};

// --- Trend / analytics data -------------------------------------------------

export const spamTrend: TrendPoint[] = [
  { label: 'Mon', spam: 32, safe: 118 },
  { label: 'Tue', spam: 41, safe: 126 },
  { label: 'Wed', spam: 28, safe: 132 },
  { label: 'Thu', spam: 55, safe: 109 },
  { label: 'Fri', spam: 47, safe: 121 },
  { label: 'Sat', spam: 19, safe: 88 },
  { label: 'Sun', spam: 15, safe: 76 },
];

export const monthlyReports: MonthlyReport[] = [
  { month: 'Feb', scanned: 512, spam: 121 },
  { month: 'Mar', scanned: 634, spam: 158 },
  { month: 'Apr', scanned: 701, spam: 149 },
  { month: 'May', scanned: 588, spam: 132 },
  { month: 'Jun', scanned: 812, spam: 231 },
  { month: 'Jul', scanned: 574, spam: 372 },
];

export const distribution = [
  { name: 'Safe', value: mockStats.safeCount, color: '#10b981' },
  { name: 'Spam', value: mockStats.spamCount, color: '#ef4444' },
];

// --- Detection history -------------------------------------------------------

const subjects = [
  'Your Amazon package has been delayed',
  'URGENT: Verify your account within 24 hours',
  'Quarterly team sync — agenda attached',
  'You have WON a $1,000 Walmart Gift Card!!!',
  'Invoice #4471 from Northwind Traders',
  'Re: Project Falcon launch checklist',
  'Claim your free iPhone 16 now',
  'Password reset request for your account',
  'Weekly newsletter: design trends in 2026',
  'Nigerian prince needs your help transferring funds',
  'Your Netflix subscription payment failed',
  'Lunch tomorrow? Let me know',
  'Congratulations! You are pre-approved for a loan',
  'Meeting notes: Q3 roadmap planning',
  'Limited time offer — 90% off luxury watches',
  'Flight confirmation: BLR → SFO',
  'Reminder: submit your timesheet',
  'Hot singles in your area want to chat',
  'GitHub: new pull request on spamshield/core',
  'Bank alert: unusual login detected',
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const rand = seededRandom(42);

function riskFromConfidence(pred: 'spam' | 'safe', confidence: number): RiskLevel {
  if (pred === 'safe') return 'Low';
  if (confidence > 90) return 'High';
  if (confidence > 70) return 'Medium';
  return 'Low';
}

export const historyData: HistoryItem[] = Array.from({ length: 48 }).map((_, i) => {
  const isSpamSubject = /won|urgent|free|prince|luxury|singles|pre-approved|claim/i.test(
    subjects[i % subjects.length]
  );
  const prediction: 'spam' | 'safe' = isSpamSubject
    ? rand() > 0.1
      ? 'spam'
      : 'safe'
    : rand() > 0.85
    ? 'spam'
    : 'safe';
  const confidence = Math.round((prediction === 'spam' ? 70 + rand() * 29 : 55 + rand() * 44));
  const daysAgo = Math.floor(rand() * 60);
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);

  return {
    id: `hist-${i + 1}`,
    date: d.toISOString(),
    subject: subjects[i % subjects.length],
    prediction,
    confidence: Math.min(confidence, 99),
    riskLevel: riskFromConfidence(prediction, confidence),
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// --- Fake spam analysis engine ------------------------------------------------

const SPAM_KEYWORDS = [
  'free', 'winner', 'won', 'urgent', 'act now', 'limited time', 'click here',
  'verify your account', 'gift card', 'congratulations', 'cash', 'loan',
  'credit card', 'guarantee', 'no obligation', '100% free', 'risk-free',
  'unsubscribe', 'buy now', 'discount', 'lottery', 'inheritance', 'wire transfer',
  'password', 'suspended', 'crypto', 'bitcoin', 'investment opportunity',
];

const URGENCY_WORDS = ['urgent', 'immediately', 'now', 'expire', 'act now', 'last chance', 'today only'];
const LINK_PATTERN = /(https?:\/\/|www\.)[^\s]+/gi;

export function analyzeEmail(content: string): DetectionResult {
  const lower = content.toLowerCase();
  const foundKeywords = SPAM_KEYWORDS.filter((k) => lower.includes(k));
  const links = content.match(LINK_PATTERN) || [];
  const hasUrgency = URGENCY_WORDS.some((w) => lower.includes(w));
  const exclaimCount = (content.match(/!/g) || []).length;
  const capsWords = (content.match(/\b[A-Z]{4,}\b/g) || []).length;

  let score = 0;
  score += foundKeywords.length * 12;
  score += links.length * 15;
  score += hasUrgency ? 18 : 0;
  score += exclaimCount * 4;
  score += capsWords * 6;

  const spamProbability = Math.max(2, Math.min(98, score + Math.round(Math.random() * 6)));
  const prediction: 'spam' | 'safe' = spamProbability >= 50 ? 'spam' : 'safe';
  const confidence = prediction === 'spam'
    ? Math.min(99, 55 + Math.round(spamProbability * 0.44))
    : Math.min(99, 55 + Math.round((100 - spamProbability) * 0.44));

  const reasons: string[] = [];
  if (foundKeywords.length > 0) {
    reasons.push(`Contains promotional/spam trigger words (${foundKeywords.slice(0, 3).join(', ')}${foundKeywords.length > 3 ? ', …' : ''})`);
  }
  if (links.length > 0) {
    reasons.push(`Email contains ${links.length} suspicious link${links.length > 1 ? 's' : ''}`);
  }
  if (hasUrgency) {
    reasons.push('Uses urgent or high-pressure language');
  }
  if (exclaimCount >= 2) {
    reasons.push('Excessive use of exclamation marks');
  }
  if (capsWords >= 2) {
    reasons.push('Unusual amount of capitalized words (shouting tone)');
  }
  if (reasons.length === 0) {
    reasons.push('No suspicious keywords, links, or patterns detected');
    reasons.push('Language tone is neutral and consistent with legitimate correspondence');
  }

  const riskLevel: RiskLevel = prediction === 'safe'
    ? 'Low'
    : spamProbability > 80
    ? 'High'
    : spamProbability > 55
    ? 'Medium'
    : 'Low';

  const firstLine = content.trim().split('\n')[0] || 'Untitled email';

  return {
    id: `res-${Date.now()}`,
    prediction,
    confidence,
    spamProbability,
    riskLevel,
    reasons,
    subject: firstLine.slice(0, 60),
    snippet: content.slice(0, 140),
    date: new Date().toISOString(),
  };
}

export function simulateNetworkDelay(ms = 1600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
