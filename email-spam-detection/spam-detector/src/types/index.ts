export type Prediction = 'spam' | 'safe';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface DetectionResult {
  id: string;
  prediction: Prediction;
  confidence: number; // 0-100
  spamProbability: number; // 0-100
  riskLevel: RiskLevel;
  reasons: string[];
  subject: string;
  snippet: string;
  date: string; // ISO
}

export interface HistoryItem {
  id: string;
  date: string;
  subject: string;
  prediction: Prediction;
  confidence: number;
  riskLevel: RiskLevel;
}

export interface DashboardStats {
  totalScanned: number;
  spamCount: number;
  safeCount: number;
  accuracy: number;
}

export interface TrendPoint {
  label: string;
  spam: number;
  safe: number;
}

export interface MonthlyReport {
  month: string;
  scanned: number;
  spam: number;
}

export interface User {
  name: string;
  email: string;
  joined: string;
  totalEmails: number;
  avatarColor: string;
}
