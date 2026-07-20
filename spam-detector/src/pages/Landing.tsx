import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ScanSearch,
  Zap,
  BarChart3,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  UploadCloud,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import Button from '@/components/ui/Button';

const FEATURES = [
  {
    icon: ScanSearch,
    title: 'Real-time detection',
    desc: 'Paste or upload any email and get a verdict in under two seconds, no waiting on a queue.',
  },
  {
    icon: BarChart3,
    title: 'Explainable results',
    desc: 'Every prediction ships with the exact reasons behind it — links, tone, and keyword signals.',
  },
  {
    icon: Zap,
    title: 'Built for speed',
    desc: 'A lightweight scanning pipeline that keeps your dashboard responsive at any volume.',
  },
  {
    icon: Lock,
    title: 'Privacy-first',
    desc: 'Emails are analyzed in memory and never stored longer than needed to show your history.',
  },
];

const STEPS = [
  { icon: Mail, title: 'Paste your email', desc: 'Drop in raw text or upload a .txt export — no formatting required.' },
  { icon: Cpu, title: 'AI scans the content', desc: 'Our model checks language patterns, links, and urgency signals.' },
  { icon: ShieldCheck, title: 'Get a clear verdict', desc: 'See prediction, confidence score, risk level, and the reasons why.' },
];

export default function Landing() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="bg-grid relative">
        <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-signal-400/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-28 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="glass mb-5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-signal-600 dark:text-signal-400">
              <Sparkles className="h-3.5 w-3.5" />
              AI-powered inbox protection
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem] dark:text-mist-50">
              Detect Spam Emails <span className="text-gradient">Instantly</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-700/70 sm:text-lg dark:text-mist-100/60">
              Paste any email and get an instant, explainable verdict — prediction, confidence score, and the exact signals that gave it away.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register">
                <Button size="lg" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right" fullWidth>
                  Get Started
                </Button>
              </Link>
              <Link to="/detect">
                <Button size="lg" variant="outline" fullWidth>
                  Try a Live Demo
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-ink-700/60 dark:text-mist-100/50">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-safe-500" /> 97.4% accuracy
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-safe-500" /> No credit card
              </div>
            </div>
          </motion.div>

          {/* AI illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="animate-float relative">
              <div className="glass relative overflow-hidden rounded-3xl p-6 shadow-2xl shadow-signal-500/10">
                <div className="absolute inset-x-0 top-0 h-1 overflow-hidden">
                  <div className="animate-scan h-24 w-full bg-gradient-to-b from-signal-400/60 to-transparent" />
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-signal-500 to-violet-600">
                    <Mail className="h-4 w-4 text-white" />
                  </span>
                  <div className="flex-1">
                    <div className="h-2.5 w-28 rounded-full bg-ink-900/10 dark:bg-white/15" />
                    <div className="mt-1.5 h-2 w-20 rounded-full bg-ink-900/5 dark:bg-white/10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 w-full rounded-full bg-ink-900/5 dark:bg-white/10" />
                  <div className="h-2.5 w-11/12 rounded-full bg-ink-900/5 dark:bg-white/10" />
                  <div className="h-2.5 w-4/5 rounded-full bg-ink-900/5 dark:bg-white/10" />
                </div>
                <div className="mt-5 flex items-center justify-between rounded-2xl bg-gradient-to-br from-spam-500/10 to-rose-500/5 p-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-spam-500" />
                    <span className="text-sm font-semibold text-ink-900 dark:text-mist-50">Spam · 96%</span>
                  </div>
                  <span className="rounded-full bg-spam-100 px-2.5 py-1 text-xs font-semibold text-spam-500 dark:bg-spam-500/10">
                    High risk
                  </span>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="glass absolute -left-8 -top-6 flex items-center gap-2 rounded-2xl px-3.5 py-2.5 shadow-lg"
              >
                <ShieldCheck className="h-4 w-4 text-safe-500" />
                <span className="text-xs font-semibold text-ink-900 dark:text-mist-50">Safe · 99%</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="glass absolute -bottom-5 -right-6 flex items-center gap-2 rounded-2xl px-3.5 py-2.5 shadow-lg"
              >
                <ScanSearch className="h-4 w-4 text-signal-500" />
                <span className="text-xs font-semibold text-ink-900 dark:text-mist-50">Scanning…</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl dark:text-mist-50">
            Everything you need to stay ahead of spam
          </h2>
          <p className="mt-3 text-ink-700/60 dark:text-mist-100/50">
            A focused toolkit for scanning, understanding, and tracking spam across every email you check.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 shadow-sm shadow-ink-950/5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-signal-500 to-violet-600 shadow-md shadow-signal-500/20">
                <f.icon className="h-5 w-5 text-white" />
              </span>
              <h3 className="mt-4 font-display font-semibold text-ink-900 dark:text-mist-50">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-700/60 dark:text-mist-100/50">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-grid relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl dark:text-mist-50">How it works</h2>
            <p className="mt-3 text-ink-700/60 dark:text-mist-100/50">Three steps between a suspicious email and a clear answer.</p>
          </div>

          <div className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-signal-400/40 to-transparent md:block" />
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                className="relative text-center"
              >
                <div className="glass relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-signal-500 to-violet-600 shadow-lg shadow-signal-500/25">
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mt-5 font-display font-semibold text-ink-900 dark:text-mist-50">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-700/60 dark:text-mist-100/50">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-signal-500 to-violet-600 px-8 py-14 text-center shadow-2xl shadow-signal-500/30"
        >
          <UploadCloud className="mx-auto h-10 w-10 text-white/80" />
          <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
            Ready to clean up your inbox?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/80">
            Create a free account and start scanning emails in under a minute.
          </p>
          <Link to="/register" className="mt-6 inline-block">
            <Button variant="secondary" size="lg" className="bg-white text-signal-700 hover:bg-white/90">
              Create free account
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
