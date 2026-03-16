type MetricCardProps = {
  title: string;
  value: string;
  subtitle?: string;
};

function getValueColor(title: string, value: string): string {
  const t = title.toLowerCase();
  const v = value.toLowerCase();

  if (t === "forecast") {
    if (v === "improving") return "text-emerald-400";
    if (v === "stable")    return "text-amber-400";
    if (v === "declining") return "text-red-400";
  }

  if (t === "confidence") {
    if (v === "high")        return "text-emerald-400";
    if (v === "medium-high") return "text-cyan-400";
    if (v === "medium")      return "text-amber-400";
    if (v === "low")         return "text-red-400";
  }

  return "text-white";
}

export default function MetricCard({ title, value, subtitle }: MetricCardProps) {
  const valueColor = getValueColor(title, value);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg shadow-black/20">
      <p className="text-sm text-slate-400">{title}</p>
      <p className={`mt-2 text-3xl font-semibold ${valueColor}`}>{value}</p>
      {subtitle ? <p className="mt-2 text-xs text-slate-500">{subtitle}</p> : null}
    </div>
  );
}