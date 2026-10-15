import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Clock,
  Lock,
  Coins,
  Zap,
  CheckCircle2,
  Terminal,
  Database,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* Navigation */}
      <header className="border-b border-surface-border bg-surface/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>
              Prep<span className="text-accent">Me</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold bg-accent hover:bg-accent-hover text-black px-4 py-2 rounded-lg transition-colors shadow-lg shadow-accent/20"
            >
              Start Side Hustle
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-12">
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-semibold tracking-wide">
            <Zap className="w-3.5 h-3.5 fill-accent" />
            <span>SIDE HUSTLE SAAS &bull; POWERED BY OPEN-WEIGHT GOOGLE GEMMA 2</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.15]">
            Turn Job Postings into Paid Interview Kits with{" "}
            <span className="text-accent">Open-Source AI</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A high-margin interview coaching side hustle powered by open-weight models.
            Run locally on <strong>Google Gemma 2</strong> with zero per-token API bills, complete candidate privacy, verbatim evidence grounding, and spaced repetition.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-black font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-xl shadow-accent/20"
            >
              <span>Launch Your Prep Kit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-surface border border-surface-border hover:border-slate-600 text-slate-200 font-semibold text-base transition-colors"
            >
              Sign In to Existing Kits
            </Link>
          </div>
        </div>

        {/* Why Open Innovation Matters (Side Hustle Pillars) */}
        <div className="pt-6">
          <div className="text-left mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-accent">Why Open-Source AI Powers This Side Hustle</h2>
            <p className="text-lg font-semibold text-slate-200">Built to beat closed API economics and protect candidate confidentiality</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-3 relative overflow-hidden group hover:border-accent/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-accent">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base">Zero Inference Cost &bull; 95%+ Margins</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Closed APIs charge hefty per-token fees on lengthy job descriptions and crawled context. Running open-weight <strong>Google Gemma 2</strong> locally via Ollama costs $0 in marginal API fees, making a $19/kit side hustle nearly 100% gross profit.
              </p>
            </div>

            <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-3 relative overflow-hidden group hover:border-accent/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base">Air-Gapped Privacy &bull; Zero Data Leakage</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Confidential resumes, internal recruiter interview discussions, and proprietary job descriptions never leave your laptop or private VPC. No third-party corporate servers train on your clients&apos; sensitive career data.
              </p>
            </div>

            <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-3 relative overflow-hidden group hover:border-accent/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base">Offline &amp; Fully Deterministic</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unlike flaky proprietary APIs prone to sudden rate limits or outages, PrepMe pairs open-weight inference with a 100% deterministic TypeScript scheduling &amp; 100% coverage repair engine that operates anywhere.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-left">
          <div className="bg-surface border border-surface-border/70 rounded-xl p-5 space-y-2">
            <ShieldCheck className="w-5 h-5 text-accent" />
            <h4 className="font-bold text-slate-100 text-sm">Verbatim Evidence Grounding</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every single extracted requirement is backed by verbatim text citations from the posting. Zero hallucinated skills.
            </p>
          </div>

          <div className="bg-surface border border-surface-border/70 rounded-xl p-5 space-y-2">
            <Cpu className="w-5 h-5 text-accent" />
            <h4 className="font-bold text-slate-100 text-sm">100% Must-Have Coverage</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated multi-pass coverage loop mathematically verifies that no critical job requirement goes untested.
            </p>
          </div>

          <div className="bg-surface border border-surface-border/70 rounded-xl p-5 space-y-2">
            <Clock className="w-5 h-5 text-accent" />
            <h4 className="font-bold text-slate-100 text-sm">Multi-Day Study Schedule</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Algorithmic scheduler allocates exact daily study minutes and front-loads heavy topics before interview day.
            </p>
          </div>
        </div>

        {/* Side Hustle Monetization Plans */}
        <div className="pt-6">
          <div className="text-center mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-accent">Side Hustle Monetization Ready</h2>
            <p className="text-2xl font-bold text-slate-100 mt-1">Sell interview prep services or monetize personal kits</p>
            <p className="text-xs text-slate-400 mt-1">Built-in pricing models tested with real freelance tech job seekers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">Free / Local</span>
                <h3 className="text-xl font-bold text-slate-100">Starter</h3>
                <div className="text-3xl font-extrabold text-slate-100">$0 <span className="text-xs text-slate-400 font-normal">/ forever</span></div>
                <p className="text-xs text-slate-400">Run locally on your own machine with Ollama &amp; Gemma 2.</p>
                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-surface-border">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> 1 Active Kit at a time</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Local Ollama (Gemma 2:9b)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Practice flashcards</li>
                </ul>
              </div>
              <Link href="/register" className="w-full text-center py-2 rounded-lg bg-surface border border-surface-border text-xs font-semibold hover:border-slate-500 transition-colors">
                Get Started Free
              </Link>
            </div>

            <div className="bg-surface-card border-2 border-accent rounded-xl p-6 space-y-4 flex flex-col justify-between relative shadow-2xl shadow-accent/10">
              <div className="absolute -top-3 right-6 bg-accent text-black text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div className="space-y-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/20 text-accent">Pro Seeker</span>
                <h3 className="text-xl font-bold text-slate-100">Job Hunter</h3>
                <div className="text-3xl font-extrabold text-slate-100">$19 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                <p className="text-xs text-slate-400">For ambitious candidates actively interviewing across multiple offers.</p>
                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-surface-border">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Unlimited Prep Kits</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Automated company web crawling</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> 60-Second timed drill simulations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Cloud sync via MongoDB Atlas</li>
                </ul>
              </div>
              <Link href="/register" className="w-full text-center py-2 rounded-lg bg-accent text-black text-xs font-bold hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20">
                Start Pro Trial
              </Link>
            </div>

            <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300">Side Hustle / Coach</span>
                <h3 className="text-xl font-bold text-slate-100">Career Coach</h3>
                <div className="text-3xl font-extrabold text-slate-100">$49 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                <p className="text-xs text-slate-400">For coaches generating grounded prep materials for coaching clients.</p>
                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-surface-border">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Bulk upload (up to 10 at once)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Custom white-label study plans</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> 100% client confidentiality compliance</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Export to Markdown &amp; PDF</li>
                </ul>
              </div>
              <Link href="/register" className="w-full text-center py-2 rounded-lg bg-surface border border-surface-border text-xs font-semibold hover:border-slate-500 transition-colors">
                Scale Your Coaching
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-border py-8 text-center text-xs text-slate-500 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold text-slate-400">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>PrepMe &bull; Open-Source AI Interview Preparation Platform</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-accent" /> Powered by Google Gemma 2</span>
            <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-accent" /> MongoDB Atlas</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
