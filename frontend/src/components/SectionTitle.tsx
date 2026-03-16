type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mb-8">
      {eyebrow ? (
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="mt-2 text-3xl font-semibold text-white">{title}</h2>

      {description ? (
        <p className="mt-3 max-w-2xl text-slate-400">{description}</p>
      ) : null}
    </div>
  );
}