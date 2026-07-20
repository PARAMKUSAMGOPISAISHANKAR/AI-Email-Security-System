import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ShieldAlert, ShieldCheck, Target, ArrowRight, ScanSearch } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { SpamTrendChart } from '@/components/charts/Charts';
import { mockStats, historyData, spamTrend } from '@/services/mockApi';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  const recent = historyData.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass flex flex-col gap-4 rounded-3xl bg-gradient-to-br from-signal-500 to-violet-600 p-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-sm text-white/80">Welcome back</p>
          <h2 className="font-display text-2xl font-bold text-white">{(user?.name || 'User').split(' ')[0]} 👋</h2>
          <p className="mt-1 text-sm text-white/75">Your inbox has been {mockStats.accuracy}% accurately protected this month.</p>
        </div>
        <Link to="/detect">
          <Button variant="secondary" className="bg-white text-signal-700 hover:bg-white/90" icon={<ScanSearch className="h-4 w-4" />}>
            Analyze new email
          </Button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          index={0}
          label="Total Emails Scanned"
          value={mockStats.totalScanned.toLocaleString()}
          icon={<Mail className="h-5 w-5" />}
          accent="signal"
          trend={{ value: '+12.4%', positive: true }}
        />
        <StatCard
          index={1}
          label="Spam Emails"
          value={mockStats.spamCount.toLocaleString()}
          icon={<ShieldAlert className="h-5 w-5" />}
          accent="spam"
          trend={{ value: '+3.1%', positive: false }}
        />
        <StatCard
          index={2}
          label="Safe Emails"
          value={mockStats.safeCount.toLocaleString()}
          icon={<ShieldCheck className="h-5 w-5" />}
          accent="safe"
          trend={{ value: '+9.8%', positive: true }}
        />
        <StatCard
          index={3}
          label="Model Accuracy"
          value={`${mockStats.accuracy}%`}
          icon={<Target className="h-5 w-5" />}
          accent="violet"
          trend={{ value: '+0.6%', positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="glass rounded-3xl p-5 shadow-sm shadow-ink-950/5 sm:p-6 lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-display font-semibold text-ink-900 dark:text-mist-50">Weekly detection trend</h3>
            <Link to="/analytics" className="flex items-center gap-1 text-xs font-semibold text-signal-600 hover:underline dark:text-signal-400">
              Full analytics <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <SpamTrendChart data={spamTrend} />
        </div>

        <div className="glass rounded-3xl p-5 shadow-sm shadow-ink-950/5 sm:p-6">
          <h3 className="mb-4 font-display font-semibold text-ink-900 dark:text-mist-50">Recent detections</h3>
          <div className="space-y-3">
            {recent.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-ink-900/[0.02] dark:hover:bg-white/[0.03]"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    item.prediction === 'spam' ? 'bg-spam-100 text-spam-500 dark:bg-spam-500/10' : 'bg-safe-100 text-safe-500 dark:bg-safe-500/10'
                  }`}
                >
                  {item.prediction === 'spam' ? <ShieldAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-900 dark:text-mist-50">{item.subject}</p>
                  <p className="text-xs text-ink-700/50 dark:text-mist-100/40">{item.confidence}% confidence</p>
                </div>
              </motion.div>
            ))}
          </div>
          <Link to="/history">
            <Button variant="ghost" size="sm" fullWidth className="mt-4">
              View all history
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
