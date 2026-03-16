"use client";

import { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import MetricCard from "../../components/MetricCard";
import InfoCard from "../../components/InfoCard";
import SectionTitle from "../../components/SectionTitle";
import ScoreGauge from "@/components/ScoreGauge";
import { scoreGigWorker, parseUPIStatement, ScoreResult, UPIResult } from "@/lib/api";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      {children}
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export default function GigWorkerPage() {
  // Pre-filled demo values
  const [name, setName] = useState("Ravi Kumar");
  const [city, setCity] = useState("Hyderabad");
  const [workType, setWorkType] = useState("Delivery Partner");
  const [platform, setPlatform] = useState("Swiggy");
  const [monthlyIncome, setMonthlyIncome] = useState("32000");
  const [workDays, setWorkDays] = useState("26");
  const [monthlyJobs, setMonthlyJobs] = useState("210");
  const [rating, setRating] = useState("4.7");
  const [cancellationRate, setCancellationRate] = useState("4");
  const [paymentConsistency, setPaymentConsistency] = useState("88");

  const [result, setResult] = useState<ScoreResult | null>(null);
  const [upiResult, setUpiResult] = useState<UPIResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [upiLoading, setUpiLoading] = useState(false);
  const [error, setError] = useState("");
  const [upiFile, setUpiFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUPIUpload(file: File) {
    setUpiFile(file);
    setUpiLoading(true);
    try {
      const res = await parseUPIStatement(file, "gig");
      setUpiResult(res);
    } catch (e) {
      console.error("UPI parse error:", e);
    } finally {
      setUpiLoading(false);
    }
  }

  async function handleSubmit() {
    if (!name || !city || !workType || !platform || !monthlyIncome || !workDays || !monthlyJobs || !rating || !cancellationRate || !paymentConsistency) {
      setError("Please fill in all fields before generating insights.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await scoreGigWorker({
        name,
        city,
        work_type: workType,
        platform,
        monthly_income: Number(monthlyIncome),
        work_days_per_month: Number(workDays),
        monthly_jobs: Number(monthlyJobs),
        rating: Number(rating),
        cancellation_rate: Number(cancellationRate),
        payment_consistency: Number(paymentConsistency),
      });
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400/50 placeholder:text-slate-600 w-full";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <SectionTitle
          eyebrow="Gig Worker Mode"
          title="Gig Worker Trust Assessment"
          description="Enter work and financial behavior details to generate a PRISM Trust Passport."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* ── Input Panel ── */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="mb-6 text-xl font-semibold">Profile Details</h3>

            <div className="grid gap-5">
              <Field label="Full Name">
                <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="e.g. Ravi Kumar" />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="City">
                  <input value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} placeholder="e.g. Hyderabad" />
                </Field>
                <Field label="Work Type">
                  <input value={workType} onChange={(e) => setWorkType(e.target.value)} className={inputClass} placeholder="e.g. Delivery Partner" />
                </Field>
              </div>

              <Field label="Platform">
                <input value={platform} onChange={(e) => setPlatform(e.target.value)} className={inputClass} placeholder="e.g. Swiggy, Zomato, Ola, Uber" />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Monthly Income (₹)" hint="Average earnings per month">
                  <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} className={inputClass} placeholder="e.g. 32000" />
                </Field>
                <Field label="Work Days / Month" hint="Active days worked last month">
                  <input type="number" value={workDays} onChange={(e) => setWorkDays(e.target.value)} className={inputClass} placeholder="e.g. 26" />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Monthly Jobs" hint="Total deliveries or jobs completed">
                  <input type="number" value={monthlyJobs} onChange={(e) => setMonthlyJobs(e.target.value)} className={inputClass} placeholder="e.g. 210" />
                </Field>
                <Field label="Customer Rating" hint="Your average platform rating (0–5)">
                  <input type="number" step="0.1" value={rating} onChange={(e) => setRating(e.target.value)} className={inputClass} placeholder="e.g. 4.7" />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Cancellation Rate (%)" hint="% of jobs cancelled. Lower is better.">
                  <input type="number" value={cancellationRate} onChange={(e) => setCancellationRate(e.target.value)} className={inputClass} placeholder="e.g. 4" />
                </Field>
                <Field label="Payment Consistency (%)" hint="How consistently you receive digital payments">
                  <input type="number" value={paymentConsistency} onChange={(e) => setPaymentConsistency(e.target.value)} className={inputClass} placeholder="e.g. 88" />
                </Field>
              </div>
            </div>

            {/* UPI Upload */}
            <div className="mt-6 rounded-2xl border border-dashed border-cyan-400/30 bg-cyan-400/5 p-4">
              <p className="text-sm font-semibold text-cyan-300">
                Upload 30-Day UPI Statement{" "}
                <span className="text-slate-500 font-normal">(Optional)</span>
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Upload a recent UPI transaction statement to help PRISM analyze income consistency and hidden trust signals.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUPIUpload(file);
                }}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={upiLoading}
                className="mt-4 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-4 text-center text-sm text-slate-400 hover:border-cyan-400/40 hover:text-cyan-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {upiLoading
                  ? <span className="flex items-center justify-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />Analyzing statement...</span>
                  : upiFile
                  ? `✓ ${upiFile.name}`
                  : "Click to upload PDF statement"}
              </button>

              {upiResult?.parsed && (
                <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-slate-900 p-3 text-xs text-slate-400">
                  <span>Transactions: <span className="text-white">{upiResult.transaction_count}</span></span>
                  <span>Consistency: <span className="text-white">{upiResult.consistency_score}/100</span></span>
                  <span>Credits: <span className="text-white">₹{upiResult.total_credits?.toLocaleString("en-IN")}</span></span>
                  <span>Debits: <span className="text-white">₹{upiResult.total_debits?.toLocaleString("en-IN")}</span></span>
                  {upiResult.risk_flags && upiResult.risk_flags.length > 0 && (
                    <p className="col-span-2 mt-1 text-red-400">Risk flags: {upiResult.risk_flags.join(", ")}</p>
                  )}
                  {upiResult.summary && (
                    <p className="col-span-2 mt-1 text-slate-400 italic">{upiResult.summary}</p>
                  )}
                </div>
              )}
            </div>

            {error && (
              <p className="mt-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.01] hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating Trust Insights..." : "Generate Trust Insights"}
            </button>
          </div>

          {/* ── Results Panel ── */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            {loading && !result ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />
                <p className="text-sm text-slate-400">Generating Trust Passport...</p>
              </div>
            ) : !result ? (
              <div className="flex h-full flex-col items-center justify-center text-center gap-3">
                <div className="text-5xl opacity-20">◈</div>
                <p className="text-base font-medium text-slate-300">Your Trust Passport will appear here</p>
                <p className="text-sm text-slate-500 max-w-xs">Fill the form and click Generate Trust Insights.</p>
              </div>
            ) : (
              <div>
                <h3 className="mb-1 text-xl font-semibold">PRISM Trust Passport</h3>
                <p className="mb-2 text-sm text-slate-400">{name} • {workType} • {city}</p>

                {result.summary_headline && (
                  <p className="mb-6 text-sm font-medium text-cyan-300 italic">"{result.summary_headline}"</p>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="self-start text-xs text-slate-400">Trust Score</p>
                    <ScoreGauge score={result.trust_score} maxScore={100} label={result.confidence + " confidence"} />
                  </div>
                  <MetricCard title="Forecast" value={result.forecast} subtitle="60-day trend" />
                  <MetricCard title="Confidence" value={result.confidence} subtitle="Signal reliability" />
                  <MetricCard title="Eligibility" value={`${result.opportunities.length} Products`} subtitle="Matched opportunities" />
                </div>

                {result.score_explanation && (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">PRISM Analysis</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{result.score_explanation}</p>
                  </div>
                )}

                {result.trust_signals && result.trust_signals.length > 0 && (
                  <div className="mt-4">
                    <InfoCard title="Top Trust Signals" items={result.trust_signals} />
                  </div>
                )}

                <div className="mt-4 grid gap-4">
                  <InfoCard title="Trust Improvement Plan" items={result.improvement_plan} />
                  <InfoCard title="Eligible Opportunities" items={result.opportunities.map((o) => `${o.title} — ${o.partner} (${o.match}% match)`)} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}