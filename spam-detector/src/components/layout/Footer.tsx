import { ShieldCheck, GitFork, Mail, Globe } from 'lucide-react';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Get Started', href: '/register' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'GitHub', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-900/5 bg-mist-50 dark:border-white/5 dark:bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-signal-500 to-violet-600">
                <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.4} />
              </span>
              <span className="font-display text-lg font-bold text-ink-900 dark:text-mist-50">
                SpamShield<span className="text-gradient">AI</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-700/70 dark:text-mist-100/60">
              Real-time AI email analysis that flags spam before it reaches your focus.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/5 text-ink-700 transition hover:bg-signal-500 hover:text-white dark:bg-white/5 dark:text-mist-100"
              >
                <GitFork className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Website"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/5 text-ink-700 transition hover:bg-signal-500 hover:text-white dark:bg-white/5 dark:text-mist-100"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/5 text-ink-700 transition hover:bg-signal-500 hover:text-white dark:bg-white/5 dark:text-mist-100"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-ink-900 dark:text-mist-50">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-ink-700/70 transition hover:text-signal-600 dark:text-mist-100/60 dark:hover:text-signal-400"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink-900/5 pt-6 text-xs text-ink-700/50 sm:flex-row dark:border-white/5 dark:text-mist-100/40">
          <p>© {new Date().getFullYear()} SpamShieldAI. All rights reserved.</p>
          <p>Built for demonstration purposes — frontend only.</p>
        </div>
      </div>
    </footer>
  );
}
