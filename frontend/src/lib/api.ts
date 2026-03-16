const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://prism-website-2cjt.onrender.com";

export interface GigWorkerInput {
  name: string;
  city: string;
  work_type: string;
  platform: string;
  monthly_income: number;
  work_days_per_month: number;
  monthly_jobs: number;
  rating: number;
  cancellation_rate: number;
  payment_consistency: number;
}

export interface MSMEInput {
  business_name: string;
  owner_name: string;
  business_type: string;
  monthly_revenue: number;
  monthly_expenses: number;
  years_in_business: number;
  transaction_consistency: number;
  supplier_discipline: number;
  invoice_timeliness: number;
  loan_burden: number;
}

export interface Opportunity {
  title: string;
  partner: string;
  match: number;
}

export interface ScoreResult {
  trust_score: number;
  forecast: "Improving" | "Stable" | "Declining";
  confidence: "High" | "Medium" | "Low";
  opportunities: Opportunity[];
  trust_signals?: string[];
  score_explanation: string;
  improvement_plan: string[];
  summary_headline: string;
  breakdown: Record<string, number | string>;
}

export interface UPIResult {
  parsed: boolean;
  error?: string;
  total_credits?: number;
  total_debits?: number;
  transaction_count?: number;
  avg_credit?: number;
  income_sources?: string[];
  spending_categories?: string[];
  consistency_score?: number;
  risk_flags?: string[];
  summary?: string;
}

interface APIError {
  detail?: string;
}

export async function scoreGigWorker(data: GigWorkerInput): Promise<ScoreResult> {
  const res = await fetch(`${BASE_URL}/api/gig-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err: APIError = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to score gig worker");
  }
  return res.json();
}

export async function scoreMSME(data: MSMEInput): Promise<ScoreResult> {
  const res = await fetch(`${BASE_URL}/api/msme-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err: APIError = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to score MSME");
  }
  return res.json();
}

export async function parseUPIStatement(
  file: File,
  userType: "gig" | "msme"
): Promise<UPIResult> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${BASE_URL}/api/parse-upi/${userType}`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err: APIError = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to parse UPI statement");
  }
  return res.json();
}