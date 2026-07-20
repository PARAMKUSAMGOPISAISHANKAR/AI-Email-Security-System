import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { DetectionResult } from '@/types';

const RISK_STYLES: Record<string, string> = {
  Low: 'bg-safe-100 text-safe-500 dark:bg-safe-500/10',
  Medium: 'bg-warn-100 text-warn-500 dark:bg-warn-500/10',
  High: 'bg-spam-100 text-spam-500 dark:bg-spam-500/10',
};

export default function PredictionCard({ result }: { result: DetectionResult }) {
  const isSpam = result.prediction === 'spam';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="glass overflow-hidden rounded-3xl shadow-sm shadow-ink-950/5"
    >
      <div
        className={`flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between ${
          isSpam
            ? 'bg-gradient-to-br from-spam-500/10 to-rose-500/5'
            : 'bg-gradient-to-br from-safe-500/10 to-emerald-500/5'
        }`}
      >
        <div className="flex items-center gap-4">
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ${
              isSpam ? 'bg-gradient-to-br from-spam-500 to-rose-600 shadow-spam-500/30' : 'bg-gradient-to-br from-safe-500 to-emerald-600 shadow-safe-500/30'
            }`}
          >
            {isSpam ? (
              <ShieldAlert className="h-7 w-7 text-white" />
            ) : (
              <ShieldCheck className="h-7 w-7 text-white" />
            )}
          </span>
          <div>
            <p className="font-display text-2xl font-bold text-ink-900 dark:text-mist-50">
              {isSpam ? 'Spam Detected' : 'Looks Safe'}
            </p>
            <p className="text-sm text-ink-700/60 dark:text-mist-100/50">{result.subject || 'Untitled email'}</p>
          </div>
        </div>
        <span className={`w-fit rounded-full px-3.5 py-1.5 text-xs font-semibold ${RISK_STYLES[result.riskLevel]}`}>
          Risk: {result.riskLevel}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium text-ink-700 dark:text-mist-100/70">Spam Probability</span>
            <span className="font-bold text-ink-900 dark:text-mist-50">{result.spamProbability}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink-900/10 dark:bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.spamProbability}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full rounded-full ${isSpam ? 'bg-gradient-to-r from-spam-500 to-rose-500' : 'bg-gradient-to-r from-safe-500 to-emerald-500'}`}
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium text-ink-700 dark:text-mist-100/70">Confidence Score</span>
            <span className="font-bold text-ink-900 dark:text-mist-50">{result.confidence}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink-900/10 dark:bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.confidence}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="h-full rounded-full bg-gradient-to-r from-signal-500 to-violet-600"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-ink-900/5 px-6 py-5 dark:border-white/5">
        <p className="mb-3 text-sm font-semibold text-ink-900 dark:text-mist-50">Reason for detection</p>
        <ul className="space-y-2">
          {result.reasons.map((reason, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="flex items-start gap-2.5 text-sm text-ink-700 dark:text-mist-100/75"
            >
              {isSpam ? (
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-spam-500" />
              ) : (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-safe-500" />
              )}
              {reason}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
