import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ScanSearch,
  History,
  BarChart3,
  UserCircle,
  LogOut,
  ShieldCheck,
  Home,
  X,
} from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/useAuth';

const NAV = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Detect Spam', to: '/detect', icon: ScanSearch },
  { label: 'History', to: '/history', icon: History },
  { label: 'Analytics', to: '/analytics', icon: BarChart3 },
  { label: 'Profile', to: '/profile', icon: UserCircle },
];

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    showToast('You have been logged out', 'info');
    onCloseMobile();
    navigate('/login');
  };

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-signal-500 to-violet-600 shadow-md shadow-signal-500/30">
          <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.4} />
        </span>
        <span className="font-display text-lg font-bold tracking-tight text-ink-900 dark:text-mist-50">
          SpamShield<span className="text-gradient">AI</span>
        </span>
        <button onClick={onCloseMobile} className="ml-auto p-1 text-ink-900/60 lg:hidden dark:text-mist-50/60">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-signal-500 to-violet-600 text-white shadow-md shadow-signal-500/25'
                  : 'text-ink-700 hover:bg-ink-900/5 dark:text-mist-100/80 dark:hover:bg-white/5'
              }`
            }
          >
            <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-ink-900/5 px-3 py-4 dark:border-white/5">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-spam-500 transition hover:bg-spam-100/60 dark:hover:bg-spam-500/10"
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={2} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="glass sticky top-0 hidden h-screen w-64 shrink-0 border-r border-ink-900/5 lg:block dark:border-white/5">
        {content}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[80] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="glass relative z-10 h-full w-72 shadow-2xl"
            >
              {content}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
