import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import EmailForm from '@/components/dashboard/EmailForm';
import PredictionCard from '@/components/dashboard/PredictionCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { analyzeEmail, simulateNetworkDelay } from '@/services/mockApi';
import { useToast } from '@/hooks/useToast';
import type { DetectionResult } from '@/types';

export default function Detect() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const { showToast } = useToast();

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setResult(null);
    await simulateNetworkDelay(1400 + Math.random() * 600);
    const res = analyzeEmail(content);
    setResult(res);
    setLoading(false);
    showToast(
      res.prediction === 'spam' ? 'Spam detected — review the reasons below.' : 'This email looks safe.',
      res.prediction === 'spam' ? 'error' : 'success'
    );
  };

  const handleClear = () => {
    setContent('');
    setResult(null);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <EmailForm value={content} onChange={setContent} onAnalyze={handleAnalyze} onClear={handleClear} loading={loading} />

      <AnimatePresence mode="wait">
        {loading && <LoadingSpinner label="Scanning content for spam signals…" />}
        {!loading && result && <PredictionCard result={result} />}
      </AnimatePresence>

      {!loading && !result && (
        <div className="glass rounded-3xl p-10 text-center">
          <p className="text-sm text-ink-700/50 dark:text-mist-100/40">
            Paste an email above and click <span className="font-semibold">Analyze Email</span> to see your result here.
          </p>
        </div>
      )}
    </div>
  );
}
