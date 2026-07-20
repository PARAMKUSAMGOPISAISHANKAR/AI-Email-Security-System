import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import Button from '@/components/ui/Button';

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/#features' },
  { label: 'How It Works', to: '/#how-it-works' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-sm shadow-ink-950/5' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-signal-500 to-violet-600 shadow-md shadow-signal-500/30">
            <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.4} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink-900 dark:text-mist-50">
            SpamShield<span className="text-gradient">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.to}
              className="text-sm font-medium text-ink-700 transition hover:text-signal-600 dark:text-mist-100/80 dark:hover:text-signal-400"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-full p-2 text-ink-700 transition hover:bg-ink-900/5 dark:text-mist-100 dark:hover:bg-white/10"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
            Log In
          </Button>
          <Button size="sm" onClick={() => navigate('/register')}>
            Get Started
          </Button>
        </div>

        <button
          className="p-2 text-ink-900 md:hidden dark:text-mist-50"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-4 pt-2">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-900/5 dark:text-mist-100 dark:hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-2">
                <Button variant="outline" size="sm" fullWidth onClick={() => navigate('/login')}>
                  Log In
                </Button>
                <Button size="sm" fullWidth onClick={() => navigate('/register')}>
                  Get Started
                </Button>
              </div>
              <button
                onClick={toggleTheme}
                className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-900/5 dark:text-mist-100 dark:hover:bg-white/5"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
