"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// ─── Fix: ease must be typed as const tuple, not number[] ────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

interface ModeCardProps {
  href: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  hoverBorderClass: string;
  glowClass: string;
  topAccentClass: string;
  iconBgClass: string;
  iconBorderClass: string;
  buttonStyle: React.CSSProperties;
  buttonLabel: string;
  delay: number;
}

function ModeCard({
  href,
  title,
  description,
  tags,
  icon,
  hoverBorderClass,
  glowClass,
  topAccentClass,
  iconBgClass,
  iconBorderClass,
  buttonStyle,
  buttonLabel,
  delay,
}: ModeCardProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      whileHover={{ y: -6 }}
      onClick={() => router.push(href)}
      className={`group relative flex cursor-pointer flex-col gap-6 overflow-hidden
                  rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8
                  transition-colors duration-300 ${hoverBorderClass}`}
    >
      {/* Top accent line */}
      <div
        className={`absolute inset-x-0 top-0 h-px opacity-0 transition-opacity
                    duration-500 group-hover:opacity-100 ${topAccentClass}`}
      />

      {/* Ambient glow */}
      <div
        className={`pointer-events-none absolute -top-20 left-1/2 h-40 w-64
                    -translate-x-1/2 rounded-full blur-[80px] opacity-0
                    transition-opacity duration-500 group-hover:opacity-100 ${glowClass}`}
      />

      {/* Icon */}
      <div
        className={`relative flex h-12 w-12 items-center justify-center
                    rounded-xl border ${iconBorderClass} ${iconBgClass}`}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="relative flex flex-col gap-2">
        <h3 className="text-2xl font-bold tracking-tight text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-400">{description}</p>
      </div>

      {/* Tags */}
      <div className="relative flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/[0.08] bg-white/5
                       px-3 py-1 text-xs text-slate-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <div className="relative mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(href);
          }}
          className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white
                     transition-all duration-200 hover:scale-[1.02] hover:brightness-110
                     active:scale-[0.98]"
          style={buttonStyle}
        >
          {buttonLabel}
        </button>
      </div>
    </motion.div>
  );
}

export default function ModeSelector() {
  return (
    <section className="relative overflow-hidden bg-[#0d0d0d] py-28">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-1/2 h-[500px] w-[500px]
                        -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute right-[10%] top-1/2 h-[500px] w-[500px]
                        -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0 }}
            className="mb-4 text-xs uppercase tracking-widest text-white/30"
          >
            Get Started
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
            className="text-4xl font-semibold tracking-tight text-white md:text-5xl"
          >
            Who are you building{" "}
            <span className="text-white/40">credibility for?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
            className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-500"
          >
            Select the profile that best represents you so PRISM can analyze
            your financial trust signals and reveal your hidden worth.
          </motion.p>
        </div>

        {/* Mode Cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          <ModeCard
            href="/gig-worker"
            title="Gig Worker Mode"
            description="Analyze gig platform performance, ratings, work consistency, and digital payment behavior to build your trust profile."
            tags={["Swiggy", "Zomato", "Ola", "Uber", "Upwork", "UPI Behavior"]}
            hoverBorderClass="hover:border-emerald-500/40"
            glowClass="bg-emerald-500"
            topAccentClass="bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
            iconBgClass="bg-emerald-500/10"
            iconBorderClass="border-emerald-500/20"
            buttonLabel="Analyze My Profile →"
            buttonStyle={{
              background: "linear-gradient(135deg, #059669, #10b981, #34d399)",
              boxShadow: "0 4px 24px rgba(16,185,129,0.2)",
            }}
            delay={0.22}
            icon={
              <svg
                className="h-6 w-6 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            }
          />

          <ModeCard
            href="/msme"
            title="MSME Business Mode"
            description="Analyze business cash flow, supplier discipline, invoice timeliness, and financial stability signals to unlock credit opportunities."
            tags={["Kirana", "Retail", "Manufacturing", "Services", "GST"]}
            hoverBorderClass="hover:border-blue-500/40"
            glowClass="bg-blue-500"
            topAccentClass="bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
            iconBgClass="bg-blue-500/10"
            iconBorderClass="border-blue-500/20"
            buttonLabel="Analyze My Business →"
            buttonStyle={{
              background: "linear-gradient(135deg, #1d4ed8, #3b82f6, #60a5fa)",
              boxShadow: "0 4px 24px rgba(59,130,246,0.2)",
            }}
            delay={0.32}
            icon={
              <svg
                className="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            }
          />
        </div>

        {/* Bottom trust note */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.44 }}
          className="mt-10 text-center text-xs text-white/20"
        >
          No credit history required · No collateral · Results in under 2 minutes
        </motion.p>
      </div>
    </section>
  );
}