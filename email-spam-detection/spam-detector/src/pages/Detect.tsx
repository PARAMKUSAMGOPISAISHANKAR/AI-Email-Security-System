import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import EmailForm from '@/components/dashboard/EmailForm';
import PredictionCard from '@/components/dashboard/PredictionCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useToast } from '@/hooks/useToast';
import type { DetectionResult } from '@/types';

// Render Backend API URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://ai-email-security-system.onrender.com';

export default function Detect() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const { showToast } = useToast();

  const handleAnalyze = async () => {
    if (!content.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/analyze/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Analysis failed');
      }

      const mappedResult: DetectionResult = {
        id: `res-${Date.now()}`,
        prediction: data.prediction === 'spam' ? 'spam' : 'safe',
        confidence: Number(data.confidence || 0),
        spamProbability: Number(data.confidence || 0),
        riskLevel:
          data.risk_level === 'High'
            ? 'High'
            : data.risk_level === 'Medium'
              ? 'Medium'
              : 'Low',
        reasons: data.reasons || [],
        subject: data.subject || 'Untitled email',
        snippet: data.snippet || '',
        date: new Date().toISOString(),
      };

      setResult(mappedResult);

      showToast(
        mappedResult.prediction === 'spam'
          ? 'Spam detected — review the reasons below.'
          : 'This email looks safe.',
        mappedResult.prediction === 'spam' ? 'error' : 'success'
      );
    } catch (error) {
      console.error('API Error:', error);

      showToast(
        error instanceof Error
          ? error.message
          : 'Unable to analyze email',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setContent('');
    setResult(null);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <EmailForm
        value={content}
        onChange={setContent}
        onAnalyze={handleAnalyze}
        onClear={handleClear}
        loading={loading}
      />

      <AnimatePresence mode="wait">
        {loading && (
          <LoadingSpinner label="Scanning content for spam signals…" />
        )}

        {!loading && result && (
          <PredictionCard result={result} />
        )}
      </AnimatePresence>

      {!loading && !result && (
        <div className="glass rounded-3xl p-10 text-center">
          <p className="text-sm text-ink-700/50 dark:text-mist-100/40">
            Paste an email above and click{' '}
            <span className="font-semibold">
              Analyze Email
            </span>{' '}
            to see your result here.
          </p>
        </div>
      )}
    </div>
  );
}