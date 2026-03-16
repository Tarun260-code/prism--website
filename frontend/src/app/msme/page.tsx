"use client";

import { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import MetricCard from "../../components/MetricCard";
import InfoCard from "../../components/InfoCard";
import SectionTitle from "../../components/SectionTitle";
import ScoreGauge from "@/components/ScoreGauge";
import { scoreMSME, parseUPIStatement, ScoreResult, UPIResult } from "@/lib/api";

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

export default function MSMEPage() {
  // Pre-filled demo values
  const [businessName, setBusinessName] = useState("Sharma Kirana Store");
  const [ownerName, setOwnerName] = useState("Amit Sharma");
  const [businessType, setBusinessType] = useState("Retail");
  const [monthlyRevenue, setMonthlyRevenue] = useState("250000");
  const [monthlyExpenses, setMonthlyExpenses] = useState("180000");
  const [yearsInBusiness, setYearsInBusiness] = useState("4");
  const [transactionConsistency, setTransactionConsistency] = useState("78");
  const [supplierDiscipline, setSupplierDiscipline] = useState("80");
  const [invoiceTimeliness, setInvoiceTimeliness] = useState("75");
  const [loanBurden, setLoanBurden] = useState("20");

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
      const res = await parseUPIStatement(file, "msme");
      setUpiResult(res);
    } catch (e) {
      console.error("UPI parse error:", e);
    } finally {
      setUpiLoading(false);
    }
  }

  async function handleSubmit() {
    if (!businessName || !ownerName || !businessType || !monthlyRevenue || !monthlyExpenses || !yearsInBusiness || !transactionConsistency || !supplierDiscipline || !invoiceTimeliness || !loanBurden) {
      setError("Please fill in all fields before generating insights.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await scoreMSME({
        business_name: businessName,
        owner_name: ownerName,
        business_type: businessType,
        monthly_revenue: Number(monthlyRevenue),
        monthly_expenses: Number(monthlyExpenses),
        years_in_business: Number(yearsInBusiness),
        transaction_consistency: Number(transactionConsistency),
        supplier_discipline: Number(supplierDiscipline),
        invoice_timeliness: Number(invoiceTimeliness),
        loan_burden: Number(loanBurden),
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
          eyebrow="MSME Mode"
          title="MSME Trust Assessment"
          description="Enter your business details below. PRISM will analyze your financial behavior and generate a BizTrust Passport."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* ── Form ── */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="mb-6 text-xl font-semibold">Business Details</h3>

            <div className="grid gap-5">
              <Field label="Business Name">
                <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className={inputClass} placeholder="e.g. Sharma Kirana Store" />
              </Field>

              <Field label="Owner Name">
                <input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className={inputClass} placeholder="e.g. Amit Sharma" />
              </Field>

              <Field label="Business Type">
                <input value={businessType} onChange={(e) => setBusinessType(e.target.value)} className={inputClass} placeholder="e.g. Retail, Manufacturing, Food & Beverage, Services" />
              </Field>

              <Field label="Monthly Revenue (₹)" hint="Total money your business earns in a typical month before expenses">
                <input type="number" value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(e.target.value)} className={inputClass} placeholder="e.g. 250000" />
              </Field>

              <Field label="Monthly Expenses (₹)" hint="Total costs per month including rent, salaries, raw materials, and utilities">
                <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)} className={inputClass} placeholder="e.g. 180000" />
              </Field>

              <Field label="Years in Business" hint="How many years your business has been operating">
                <input type="number" value={yearsInBusiness} onChange={(e) => setYearsInBusiness(e.target.value)} className={inputClass} placeholder="e.g. 4" />
              </Field>

              <Field label="Transaction Consistency (%)" hint="How regularly your business receives payments. Enter 90 if customers pay every week consistently, 70 if payments are sometimes irregular, 50 if very unpredictable.">
                <input type="number" min="0" max="100" value={transactionConsistency} onChange={(e) => setTransactionConsistency(e.target.value)} className={inputClass} placeholder="e.g. 78" />
              </Field>

              <Field label="Supplier Payment Discipline (%)" hint="How consistently you pay your suppliers on time. Enter 90 if you always pay on time, 70 if occasionally late, 50 if frequently delayed.">
                <input type="number" min="0" max="100" value={supplierDiscipline} onChange={(e) => setSupplierDiscipline(e.target.value)} className={inputClass} placeholder="e.g. 80" />
              </Field>

              <Field label="Invoice Collection Timeliness (%)" hint="How quickly you collect payments from customers after issuing invoices. Enter 90 if collected within 15 days, 70 if within 30 days, 50 if often takes longer.">
                <input type="number" min="0" max="100" value={invoiceTimeliness} onChange={(e) => setInvoiceTimeliness(e.target.value)} className={inputClass} placeholder="e.g. 75" />
              </Field>

              <Field label="Loan Burden (%)" hint="What percentage of your monthly revenue goes toward repaying existing loans. Enter 0 if you have no loans, 20 if repayments are ₹20 for every ₹100 earned.">
                <input type="number" min="0" max="100" value={loanBurden} onChange={(e) => setLoanBurden(e.target.value)} className={inputClass} placeholder="e.g. 20" />
              </Field>
            </div>

            {/* UPI Upload */}
            <div className="mt-6 rounded-2xl border border-dashed border-cyan-400/30 bg-cyan-400/5 p-4">
              <p className="text-sm font-semibold text-cyan-300">
                Upload 30-Day UPI / Transaction Statement{" "}
                <span className="text-slate-500 font-normal">(Optional)</span>
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Download your business account statement PDF from your bank app and upload it here. PRISM will analyze cash flow patterns automatically.
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
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
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
              {loading ? "Generating Business Insights..." : "Generate Business Trust Insights"}
            </button>
          </div>

          {/* ── Results ── */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            {loading && !result ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />
                <p className="text-sm text-slate-400">Generating BizTrust Passport...</p>
              </div>
            ) : !result ? (
              <div className="flex h-full flex-col items-center justify-center text-center gap-3">
                <div className="text-5xl opacity-20">◈</div>
                <p className="text-base font-medium text-slate-300">Your BizTrust Passport will appear here</p>
                <p className="text-sm text-slate-500 max-w-xs">Fill in your business details on the left and click Generate Business Trust Insights.</p>
              </div>
            ) : (
              <div>
                <h3 className="mb-1 text-xl font-semibold">PRISM BizTrust Passport</h3>
                <p className="mb-2 text-sm text-slate-400">{businessName} • {businessType} • {ownerName}</p>

                {result.summary_headline && (
                  <p className="mb-6 text-sm font-medium text-cyan-300 italic">"{result.summary_headline}"</p>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="self-start text-xs text-slate-400">Trust Score</p>
                    <ScoreGauge score={result.trust_score} maxScore={100} label={result.confidence + " confidence"} />
                  </div>
                  <MetricCard title="Forecast" value={result.forecast} subtitle="90-day trend" />
                  <MetricCard title="Confidence" value={result.confidence} subtitle="Signal reliability" />
                  <MetricCard title="Eligibility" value={`${result.opportunities.length} Products`} subtitle="Matched opportunities" />
                </div>

                {result.score_explanation && (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">PRISM Analysis</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{result.score_explanation}</p>
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