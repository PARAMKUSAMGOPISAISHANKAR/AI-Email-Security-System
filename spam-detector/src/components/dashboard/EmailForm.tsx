import { useRef, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Upload, Eraser, ScanSearch } from 'lucide-react';
import Button from '@/components/ui/Button';

interface EmailFormProps {
  value: string;
  onChange: (val: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  loading: boolean;
}

const SAMPLE_SPAM = `Subject: Congratulations! You've WON a $1,000 Gift Card!!!

Dear Winner,

You have been randomly selected to receive a FREE $1,000 Walmart gift card. This is a limited time offer that will expire TODAY. Click here now to claim: http://free-rewards-now.xyz/claim

Act now, this offer won't last! No purchase necessary. 100% guaranteed.

Unsubscribe here.`;

export default function EmailForm({ value, onChange, onAnalyze, onClear, loading }: EmailFormProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result ?? ''));
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-5 shadow-sm shadow-ink-950/5 sm:p-7"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-mist-50">Paste email content</h2>
          <p className="text-sm text-ink-700/60 dark:text-mist-100/50">
            Our model scans wording, links, and tone to flag spam in seconds.
          </p>
        </div>
        <button
          onClick={() => onChange(SAMPLE_SPAM)}
          className="text-xs font-semibold text-signal-600 hover:underline dark:text-signal-400"
        >
          Load sample
        </button>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your email content here..."
          rows={10}
          className="w-full resize-none rounded-2xl border border-ink-900/10 bg-white/70 p-4 text-sm leading-relaxed text-ink-900 placeholder:text-ink-900/30 transition focus:border-signal-400 focus:outline-none focus:ring-4 focus:ring-signal-400/15 dark:border-white/10 dark:bg-ink-900/40 dark:text-mist-50 dark:placeholder:text-mist-50/25"
        />
        <span className="absolute bottom-3 right-4 text-xs text-ink-900/30 dark:text-mist-50/30">
          {value.length.toLocaleString()} characters
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={onAnalyze}
          loading={loading}
          disabled={!value.trim()}
          icon={<ScanSearch className="h-4 w-4" />}
          fullWidth
        >
          {loading ? 'Analyzing…' : 'Analyze Email'}
        </Button>
        <Button variant="outline" onClick={onClear} icon={<Eraser className="h-4 w-4" />}>
          Clear
        </Button>
        <Button variant="secondary" onClick={() => fileRef.current?.click()} icon={<Upload className="h-4 w-4" />}>
          Upload .txt
        </Button>
        <input ref={fileRef} type="file" accept=".txt" className="hidden" onChange={handleFile} />
      </div>
    </motion.div>
  );
}
