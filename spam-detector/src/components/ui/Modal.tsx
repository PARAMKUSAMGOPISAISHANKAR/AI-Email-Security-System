import { type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="glass relative z-10 w-full max-w-md rounded-3xl p-6 shadow-2xl shadow-ink-950/20"
          >
            <div className="mb-4 flex items-center justify-between">
              {title && <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-mist-50">{title}</h3>}
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="ml-auto rounded-full p-1.5 text-ink-900/50 transition hover:bg-ink-900/5 hover:text-ink-900 dark:text-mist-50/50 dark:hover:bg-white/10 dark:hover:text-mist-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
