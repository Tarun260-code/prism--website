"use client";

import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number;        // 0–850 for gig, 0–100 for MSME
  maxScore?: number;    // default 850
  label?: string;       // e.g. "Strong"
}

function getColor(pct: number) {
  if (pct >= 0.75) return { stroke: "#34d399", text: "text-emerald-400", label: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20" };
  if (pct >= 0.55) return { stroke: "#fbbf24", text: "text-amber-400",   label: "bg-amber-400/10 text-amber-300 border-amber-400/20" };
  return               { stroke: "#f87171", text: "text-red-400",     label: "bg-red-400/10 text-red-300 border-red-400/20" };
}

export default function ScoreGauge({ score, maxScore = 850, label }: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate from 0 → score on mount / score change
  useEffect(() => {
    setAnimatedScore(0);
    const duration = 1200; // ms
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, score);
      setAnimatedScore(Math.round(current));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const pct = score / maxScore;
  const colors = getColor(pct);

  // SVG circle math
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 68;
  const circumference = 2 * Math.PI * radius;

  // We draw a 270° arc (from 135° to 405°)
  const arcFraction = 0.75; // 270° out of 360°
  const totalArc = circumference * arcFraction;
  const filledArc = totalArc * (animatedScore / maxScore);
  const gapArc = circumference - totalArc;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-[225deg]"
        >
          {/* Track */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${totalArc} ${gapArc}`}
          />
          {/* Fill */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${filledArc} ${circumference - filledArc}`}
            style={{ transition: "stroke-dasharray 0.05s linear" }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-black tabular-nums ${colors.text}`}>
            {animatedScore}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500">
            / {maxScore}
          </span>
        </div>
      </div>

      {/* Band label */}
      {label && (
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${colors.label}`}>
          {label}
        </span>
      )}
    </div>
  );
}