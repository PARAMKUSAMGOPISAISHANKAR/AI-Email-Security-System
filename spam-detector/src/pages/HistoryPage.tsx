import { useState } from 'react';
import HistoryTable from '@/components/dashboard/HistoryTable';
import Modal from '@/components/ui/Modal';
import { historyData as initialData } from '@/services/mockApi';
import { useToast } from '@/hooks/useToast';
import type { HistoryItem } from '@/types';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export default function HistoryPage() {
  const [data, setData] = useState<HistoryItem[]>(initialData);
  const [selected, setSelected] = useState<HistoryItem | null>(null);
  const { showToast } = useToast();

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((d) => d.id !== id));
    showToast('Entry removed from history.', 'info');
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-ink-900 dark:text-mist-50">Detection History</h2>
        <p className="text-sm text-ink-700/60 dark:text-mist-100/50">Every email you've scanned, searchable and filterable.</p>
      </div>

      <HistoryTable data={data} onView={setSelected} onDelete={handleDelete} />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Detection details">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  selected.prediction === 'spam' ? 'bg-spam-100 text-spam-500 dark:bg-spam-500/10' : 'bg-safe-100 text-safe-500 dark:bg-safe-500/10'
                }`}
              >
                {selected.prediction === 'spam' ? <ShieldAlert className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
              </span>
              <div>
                <p className="font-semibold capitalize text-ink-900 dark:text-mist-50">{selected.prediction}</p>
                <p className="text-xs text-ink-700/50 dark:text-mist-100/40">
                  {new Date(selected.date).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="rounded-xl bg-ink-900/5 p-3 text-sm text-ink-700 dark:bg-white/5 dark:text-mist-100/70">
              {selected.subject}
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-ink-900/10 p-3 dark:border-white/10">
                <p className="text-xs text-ink-700/50 dark:text-mist-100/40">Confidence</p>
                <p className="font-semibold text-ink-900 dark:text-mist-50">{selected.confidence}%</p>
              </div>
              <div className="rounded-xl border border-ink-900/10 p-3 dark:border-white/10">
                <p className="text-xs text-ink-700/50 dark:text-mist-100/40">Risk Level</p>
                <p className="font-semibold text-ink-900 dark:text-mist-50">{selected.riskLevel}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
