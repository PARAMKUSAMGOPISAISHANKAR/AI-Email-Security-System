import { useState } from 'react';
import { Menu, Sun, Moon, Bell, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';

interface AppTopbarProps {
  title: string;
  onOpenSidebar: () => void;
}

export default function AppTopbar({ title, onOpenSidebar }: AppTopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const initials = (user?.name || 'User')
    .split(' ')
    .map((n) => n[0])
    .join('');

  const notifications = [
    { id: 1, title: 'Spam alert', detail: '3 suspicious emails flagged today', time: '2m ago' },
    { id: 2, title: 'Profile saved', detail: 'Your account settings were updated', time: '1h ago' },
    { id: 3, title: 'New scan ready', detail: 'You can analyze another email now', time: 'Today' },
  ];

  return (
    <header className="glass sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-ink-900/5 px-4 sm:px-6 dark:border-white/5">
      <button
        onClick={onOpenSidebar}
        className="rounded-lg p-2 text-ink-700 hover:bg-ink-900/5 lg:hidden dark:text-mist-100 dark:hover:bg-white/5"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="font-display text-lg font-semibold text-ink-900 sm:text-xl dark:text-mist-50">{title}</h1>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="relative">
          <button
            onClick={() => setShowNotifications((v) => !v)}
            className="relative rounded-full p-2 text-ink-700 transition hover:bg-ink-900/5 dark:text-mist-100 dark:hover:bg-white/5"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-spam-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 z-40 w-72 rounded-2xl border border-ink-900/10 bg-white p-3 shadow-xl shadow-ink-950/10 dark:border-white/10 dark:bg-ink-900">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-ink-900 dark:text-mist-50">Notifications</p>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="rounded-full p-1 text-ink-700 hover:bg-ink-900/5 dark:text-mist-100 dark:hover:bg-white/5"
                  aria-label="Close notifications"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                {notifications.map((item) => (
                  <div key={item.id} className="rounded-xl border border-ink-900/10 bg-ink-950/[0.02] p-2.5 dark:border-white/10 dark:bg-white/[0.04]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-ink-900 dark:text-mist-50">{item.title}</p>
                        <p className="mt-0.5 text-xs text-ink-700/60 dark:text-mist-100/50">{item.detail}</p>
                      </div>
                      <span className="text-[11px] text-ink-700/50 dark:text-mist-100/40">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="rounded-full p-2 text-ink-700 transition hover:bg-ink-900/5 dark:text-mist-100 dark:hover:bg-white/5"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-signal-500 to-violet-600 text-sm font-semibold text-white shadow-md shadow-signal-500/25"
          aria-label="Open profile"
        >
          {initials}
        </button>
      </div>
    </header>
  );
}
