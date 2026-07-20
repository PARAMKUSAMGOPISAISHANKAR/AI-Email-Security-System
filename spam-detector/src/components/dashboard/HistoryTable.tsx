import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Trash2, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import type { HistoryItem, Prediction } from '@/types';

const PAGE_SIZE = 8;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function HistoryTable({
  data,
  onView,
  onDelete,
}: {
  data: HistoryItem[];
  onView: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | Prediction>('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return data.filter((d) => {
      const matchesQuery = d.subject.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === 'all' || d.prediction === filter;
      return matchesQuery && matchesFilter;
    });
  }, [data, query, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changeQuery = (v: string) => {
    setQuery(v);
    setPage(1);
  };
  const changeFilter = (v: 'all' | Prediction) => {
    setFilter(v);
    setPage(1);
  };

  return (
    <div className="glass rounded-3xl p-5 shadow-sm shadow-ink-950/5 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/30 dark:text-mist-50/30" />
          <input
            value={query}
            onChange={(e) => changeQuery(e.target.value)}
            placeholder="Search by subject…"
            className="w-full rounded-xl border border-ink-900/10 bg-white/70 py-2.5 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-900/30 focus:border-signal-400 focus:outline-none focus:ring-4 focus:ring-signal-400/15 dark:border-white/10 dark:bg-ink-900/40 dark:text-mist-50 dark:placeholder:text-mist-50/25"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-ink-900/40 dark:text-mist-50/40" />
          {(['all', 'spam', 'safe'] as const).map((f) => (
            <button
              key={f}
              onClick={() => changeFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                filter === f
                  ? 'bg-gradient-to-r from-signal-500 to-violet-600 text-white shadow-sm'
                  : 'bg-ink-900/5 text-ink-700 hover:bg-ink-900/10 dark:bg-white/5 dark:text-mist-100/70 dark:hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-ink-900/10 text-left text-xs uppercase tracking-wide text-ink-900/40 dark:border-white/10 dark:text-mist-50/40">
              <th className="pb-3 pr-4 font-semibold">Date</th>
              <th className="pb-3 pr-4 font-semibold">Email Subject</th>
              <th className="pb-3 pr-4 font-semibold">Prediction</th>
              <th className="pb-3 pr-4 font-semibold">Confidence</th>
              <th className="pb-3 pr-4 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((row, i) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-ink-900/5 last:border-0 hover:bg-ink-900/[0.02] dark:border-white/5 dark:hover:bg-white/[0.02]"
              >
                <td className="whitespace-nowrap py-3.5 pr-4 text-ink-700/70 dark:text-mist-100/60">{formatDate(row.date)}</td>
                <td className="max-w-xs truncate py-3.5 pr-4 font-medium text-ink-900 dark:text-mist-50">{row.subject}</td>
                <td className="py-3.5 pr-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                      row.prediction === 'spam'
                        ? 'bg-spam-100 text-spam-500 dark:bg-spam-500/10'
                        : 'bg-safe-100 text-safe-500 dark:bg-safe-500/10'
                    }`}
                  >
                    {row.prediction}
                  </span>
                </td>
                <td className="py-3.5 pr-4 text-ink-700 dark:text-mist-100/70">{row.confidence}%</td>
                <td className="py-3.5 pr-4">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onView(row)}
                      className="rounded-lg p-1.5 text-ink-700/60 transition hover:bg-signal-500/10 hover:text-signal-600 dark:text-mist-100/50"
                      aria-label="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(row.id)}
                      className="rounded-lg p-1.5 text-ink-700/60 transition hover:bg-spam-500/10 hover:text-spam-500 dark:text-mist-100/50"
                      aria-label="Delete entry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {paged.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-900/40 dark:text-mist-50/40">No results found.</p>
        )}
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {paged.map((row) => (
          <div key={row.id} className="rounded-2xl border border-ink-900/5 p-4 dark:border-white/5">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-ink-900 dark:text-mist-50">{row.subject}</p>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                  row.prediction === 'spam' ? 'bg-spam-100 text-spam-500 dark:bg-spam-500/10' : 'bg-safe-100 text-safe-500 dark:bg-safe-500/10'
                }`}
              >
                {row.prediction}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-ink-700/60 dark:text-mist-100/50">
              <span>{formatDate(row.date)} · {row.confidence}% confidence</span>
              <div className="flex items-center gap-2">
                <button onClick={() => onView(row)} className="text-signal-600 dark:text-signal-400">
                  <Eye className="h-4 w-4" />
                </button>
                <button onClick={() => onDelete(row.id)} className="text-spam-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {paged.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-900/40 dark:text-mist-50/40">No results found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-5 flex items-center justify-between border-t border-ink-900/5 pt-4 text-sm dark:border-white/5">
        <p className="text-ink-700/50 dark:text-mist-100/40">
          Page {page} of {totalPages} · {filtered.length} results
        </p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg p-1.5 text-ink-700 transition hover:bg-ink-900/5 disabled:opacity-30 dark:text-mist-100 dark:hover:bg-white/5"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-lg p-1.5 text-ink-700 transition hover:bg-ink-900/5 disabled:opacity-30 dark:text-mist-100 dark:hover:bg-white/5"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
