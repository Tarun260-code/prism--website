type InfoCardProps = {
  title: string;
  items: string[];
};

export default function InfoCard({ title, items }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>

      <div className="mt-4 space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-300"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}