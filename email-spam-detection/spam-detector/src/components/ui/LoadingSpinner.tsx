import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export function LoadingSpinner({ label = 'Analyzing…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-signal-500/20 animate-pulse-ring" />
        <span className="absolute inset-0 rounded-full bg-violet-500/10 animate-pulse-ring [animation-delay:0.4s]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-signal-500 to-violet-600 shadow-lg shadow-signal-500/30"
        >
          <ShieldCheck className="h-6 w-6 text-white" strokeWidth={2.2} />
        </motion.div>
      </div>
      <p className="text-sm font-medium text-ink-700 dark:text-mist-100">{label}</p>
    </div>
  );
}

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gradient-to-r from-ink-900/5 via-ink-900/10 to-ink-900/5 bg-[length:200%_100%] dark:from-white/5 dark:via-white/10 dark:to-white/5 ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass rounded-2xl p-5">
      <Skeleton className="mb-3 h-4 w-24" />
      <Skeleton className="mb-2 h-8 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}
