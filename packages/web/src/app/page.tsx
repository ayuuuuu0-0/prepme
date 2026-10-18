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
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-12">
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-semibold tracking-wide">
            <Zap className="w-3.5 h-3.5 fill-accent" />
            <span>100% LOCAL &bull; RUNS ON YOUR LAPTOP &bull; OPEN-SOURCE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.15]">
            AI-Powered Interview Prep Kits from{" "}
            <span className="text-accent">Any Job Posting</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Generate custom interview prep kits from any job posting using <strong>Qwen 2.5 Coder 7B</strong> running 100% locally.
            Zero API costs, complete data privacy, verbatim evidence grounding. Upgrade to cloud models for 10x faster generation.
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

        {/* Why Open Innovation Matters */}
        <div className="pt-6">
          <div className="text-left mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-accent">Why Open-Source AI</h2>
            <p className="text-lg font-semibold text-slate-200">Built for privacy, control, and zero ongoing costs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-3 relative overflow-hidden group hover:border-accent/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-accent">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base">Zero API Costs (Free Tier)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Run <strong>Qwen 2.5 Coder 7B</strong> locally via Ollama with $0 per-token costs. Upgrade to cloud-hosted models for 10x faster generation (2-3 min → 10-20 sec) while keeping your local option available anytime.
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

        {/* Pricing Plans */}
        <div className="pt-6">
          <div className="text-center mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-accent">Flexible Plans</h2>
            <p className="text-2xl font-bold text-slate-100 mt-1">Choose the plan that fits your needs</p>
            <p className="text-xs text-slate-400 mt-1">From free local use to professional coaching features</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">100% Local</span>
                <h3 className="text-xl font-bold text-slate-100">Open Source</h3>
                <div className="text-3xl font-extrabold text-slate-100">$0 <span className="text-xs text-slate-400 font-normal">/ forever</span></div>
                <p className="text-xs text-slate-400">Run Llama 3.1 8B locally via Ollama. Your data never leaves your laptop.</p>
                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-surface-border">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Unlimited prep kits</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Local Qwen 2.5 Coder (2-3 min/kit)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Full privacy &amp; offline mode</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Practice &amp; flashcards</li>
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
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/20 text-accent">Cloud-Powered</span>
                <h3 className="text-xl font-bold text-slate-100">Pro</h3>
                <div className="text-3xl font-extrabold text-slate-100">$19 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                <p className="text-xs text-slate-400">10x faster generation with cloud-hosted Llama 3.3 70B + Groq inference.</p>
                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-surface-border">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Everything in Free</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Cloud models (10-20 sec/kit)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Higher quality questions</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Advanced company research</li>
                </ul>
              </div>
              <Link href="/register" className="w-full text-center py-2 rounded-lg bg-accent text-black text-xs font-bold hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20">
                Start Pro Trial
              </Link>
            </div>

            <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300">Professional</span>
                <h3 className="text-xl font-bold text-slate-100">Career Coach</h3>
                <div className="text-3xl font-extrabold text-slate-100">$49 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                <p className="text-xs text-slate-400">For coaches generating professional prep materials for clients.</p>
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
            <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-accent" /> Powered by Qwen 2.5 Coder 7B</span>
            <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-accent" /> MongoDB Atlas</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
