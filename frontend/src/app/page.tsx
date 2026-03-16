import Navbar from "../components/Navbar";
import { HeroScrollDemo } from "../components/ui/hero-scroll-demo";
import ModeSelector from "../components/ModeSelector";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Alternative Credit Intelligence Platform
        </div>

        {/* Headline */}
        <h1 className="text-6xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl">
          PRISM
        </h1>

        {/* Sharpened tagline — problem first */}
        <p className="mt-4 text-2xl font-semibold text-cyan-300 md:text-3xl">
          300M Indians. Zero Credit Score. One Fix.
        </p>

        {/* Sharpened description — problem → solution in 2 sentences */}
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-400 leading-relaxed">
          Gig workers and small businesses are denied loans every day — not because
          they can't repay, but because banks can't see them. PRISM reveals their
          hidden financial credibility using UPI behavior, work consistency, and
          alternative signals. No credit history needed.
        </p>

        {/* Stat strip */}
        <div className="mt-10 inline-flex flex-wrap justify-center gap-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-8 py-5">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-white">300M+</span>
            <span className="text-xs text-slate-500">Unscored Indians</span>
          </div>
          <div className="h-10 w-px bg-white/10 self-center hidden sm:block" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-white">0</span>
            <span className="text-xs text-slate-500">Credit History Required</span>
          </div>
          <div className="h-10 w-px bg-white/10 self-center hidden sm:block" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-white">&lt;2 min</span>
            <span className="text-xs text-slate-500">Trust Score Generated</span>
          </div>
        </div>
      </section>

      {/* ── Hero Scroll Animation (untouched) ────────────────────── */}
      <HeroScrollDemo />

      {/* ── Choose Your Mode ─────────────────────────────────────── */}
      <ModeSelector />

      {/* ── Feature Cards ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">How PRISM Works</h2>
          <p className="mt-3 text-sm text-slate-400">
            Three intelligent layers that reveal your true financial worth
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-emerald-500/30 hover:bg-white/[0.06] transition-all duration-300">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-white">Dynamic Trust Score</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              PRISM converts alternative financial and behavioral signals into a
              clear trust score that lenders and partners can act on.
            </p>
          </div>

          <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all duration-300">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-white">Future Stability Forecast</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              PRISM predicts whether a gig worker or MSME is improving, stable,
              or declining over time using behavioral trend analysis.
            </p>
          </div>

          <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-violet-500/30 hover:bg-white/[0.06] transition-all duration-300">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 mb-4">
              <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-white">Trust Improvement Plan</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Users receive practical suggestions to improve trust and unlock
              financial opportunities they were previously invisible to.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-8 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} PRISM · Making financial potential visible · Built for India
      </footer>
    </main>
  );
}