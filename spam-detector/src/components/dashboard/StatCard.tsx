import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
  accent?: 'signal' | 'spam' | 'safe' | 'violet';
  index?: number;
}

const ACCENTS = {
  signal: 'from-signal-500 to-signal-600',
  violet: 'from-violet-500 to-violet-600',
  spam: 'from-spam-500 to-rose-600',
  safe: 'from-safe-500 to-emerald-600',
};

export default function StatCard({ label, value, icon, trend, accent = 'signal', index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ y: -3 }}
      className="glass group relative overflow-hidden rounded-2xl p-5 shadow-sm shadow-ink-950/5 transition-shadow hover:shadow-lg hover:shadow-signal-500/10"
    >
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${ACCENTS[accent]} opacity-10 blur-xl transition-opacity group-hover:opacity-20`} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-ink-700/70 dark:text-mist-100/60">{label}</p>
          <p className="mt-2 font-display text-2xl font-bold text-ink-900 sm:text-3xl dark:text-mist-50">{value}</p>
        </div>
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${ACCENTS[accent]} text-white shadow-md`}>
          {icon}
        </span>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1 text-xs font-medium">
          {trend.positive ? (
            <ArrowUpRight className="h-3.5 w-3.5 text-safe-500" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5 text-spam-500" />
          )}
          <span className={trend.positive ? 'text-safe-500' : 'text-spam-500'}>{trend.value}</span>
          <span className="text-ink-700/50 dark:text-mist-100/40">vs last week</span>
        </div>
      )}
    </motion.div>
  );
}
