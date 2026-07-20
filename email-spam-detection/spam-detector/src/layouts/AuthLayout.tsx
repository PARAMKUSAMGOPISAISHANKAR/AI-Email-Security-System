import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-mist-50 px-4 py-10 dark:bg-ink-950">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-signal-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-signal-500 to-violet-600 shadow-md shadow-signal-500/30">
            <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.4} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ink-900 dark:text-mist-50">
            SpamShield<span className="text-gradient">AI</span>
          </span>
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
