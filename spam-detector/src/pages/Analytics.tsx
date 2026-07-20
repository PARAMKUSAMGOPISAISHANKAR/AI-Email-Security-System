import { motion } from 'framer-motion';
import { SpamTrendChart, MonthlyBarChart, SpamPieChart } from '@/components/charts/Charts';
import { spamTrend, monthlyReports, distribution, mockStats } from '@/services/mockApi';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function Analytics() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-ink-900 dark:text-mist-50">Analytics</h2>
        <p className="text-sm text-ink-700/60 dark:text-mist-100/50">Trends and reports across all scanned emails.</p>
      </div>

      <motion.div variants={cardVariants} custom={0} initial="hidden" animate="show" className="glass rounded-3xl p-5 shadow-sm shadow-ink-950/5 sm:p-6">
        <h3 className="mb-1 font-display font-semibold text-ink-900 dark:text-mist-50">Spam Detection Trend</h3>
        <p className="mb-4 text-xs text-ink-700/50 dark:text-mist-100/40">Spam vs. safe emails detected over the last 7 days.</p>
        <SpamTrendChart data={spamTrend} />
      </motion.div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <motion.div variants={cardVariants} custom={1} initial="hidden" animate="show" className="glass rounded-3xl p-5 shadow-sm shadow-ink-950/5 sm:p-6">
          <h3 className="mb-1 font-display font-semibold text-ink-900 dark:text-mist-50">Monthly Reports</h3>
          <p className="mb-4 text-xs text-ink-700/50 dark:text-mist-100/40">Total emails scanned vs. spam flagged per month.</p>
          <MonthlyBarChart data={monthlyReports} />
        </motion.div>

        <motion.div variants={cardVariants} custom={2} initial="hidden" animate="show" className="glass rounded-3xl p-5 shadow-sm shadow-ink-950/5 sm:p-6">
          <h3 className="mb-1 font-display font-semibold text-ink-900 dark:text-mist-50">Spam vs Safe Distribution</h3>
          <p className="mb-4 text-xs text-ink-700/50 dark:text-mist-100/40">Overall share of all {mockStats.totalScanned.toLocaleString()} scanned emails.</p>
          <SpamPieChart data={distribution} />
        </motion.div>
      </div>
    </div>
  );
}
