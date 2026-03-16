"use client";

import React from "react";
import { ContainerScroll } from "./container-scroll-animation";
import { GradientButton } from "./gradient-button";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col items-center overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-center text-4xl font-semibold text-white">
              Hidden Worth
              <br />
              <span className="text-4xl font-bold md:text-[6rem] text-white">
                Made Visible
              </span>
            </h1>

            <div className="mt-8 flex justify-center gap-6">
              <GradientButton>Get Started</GradientButton>
              <GradientButton variant="variant">
                Explore Platform
              </GradientButton>
            </div>
          </>
        }
      >
        <div className="h-full w-full bg-slate-950 p-4 md:p-6">
          <div className="grid h-full gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">PRISM Trust Passport</p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">
                    Ravi Kumar
                  </h2>
                  <p className="text-sm text-slate-400">
                    Delivery Partner • Hyderabad
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-400/15 px-4 py-3 text-right">
                  <p className="text-xs uppercase tracking-widest text-emerald-300">
                    Trust Score
                  </p>
                  <p className="text-3xl font-bold text-emerald-300">742</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-slate-400">Forecast</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    Improving
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Projected 60-day growth
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-slate-400">Confidence</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    Medium-High
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Financial visibility
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-slate-400">Eligibility</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    3 Products
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Opportunity unlocks
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm text-slate-400">Trust Score Trend</p>
                <div className="flex h-40 items-end gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="w-full rounded-t-xl bg-cyan-500/70" style={{ height: "45%" }} />
                  <div className="w-full rounded-t-xl bg-cyan-500/70" style={{ height: "52%" }} />
                  <div className="w-full rounded-t-xl bg-cyan-500/70" style={{ height: "60%" }} />
                  <div className="w-full rounded-t-xl bg-cyan-500/70" style={{ height: "68%" }} />
                  <div className="w-full rounded-t-xl bg-cyan-500/70" style={{ height: "75%" }} />
                  <div className="w-full rounded-t-xl bg-cyan-400" style={{ height: "82%" }} />
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">Top Signals</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                    <span className="text-sm text-slate-300">UPI consistency</span>
                    <span className="text-xs font-medium text-cyan-300">89%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                    <span className="text-sm text-slate-300">Platform rating</span>
                    <span className="text-xs font-medium text-cyan-300">4.8/5</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                    <span className="text-sm text-slate-300">Income stability</span>
                    <span className="text-xs font-medium text-cyan-300">Strong</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">Eligible Opportunities</p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300">
                    Emergency Credit
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300">
                    Bike Financing
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300">
                    Micro-Insurance
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">Improvement Plan</p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300">
                    Maintain 25+ active workdays this month
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300">
                    Keep cancellations below 5%
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300">
                    Maintain stable weekly income consistency
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}