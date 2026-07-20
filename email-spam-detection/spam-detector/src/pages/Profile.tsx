import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, Shield, Bell, Moon, KeyRound, Save } from 'lucide-react';
import { mockStats } from '@/services/mockApi';
import Button from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/useAuth';

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-gradient-to-r from-signal-500 to-violet-600' : 'bg-ink-900/15 dark:bg-white/15'}`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm ${checked ? 'left-[22px]' : 'left-0.5'}`}
      />
    </button>
  );
}

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || 'User');
  const [email, setEmail] = useState(user?.email || 'user@example.com');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoScan, setAutoScan] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const initials = useMemo(() => (user?.name || 'User').split(' ').map((n) => n[0]).join(''), [user?.name]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = () => {
    updateUser({ name, email });
    showToast('Profile updated successfully.', 'success');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass flex flex-col items-center gap-4 rounded-3xl p-6 text-center sm:flex-row sm:text-left"
      >
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-signal-500 to-violet-600 font-display text-2xl font-bold text-white shadow-lg shadow-signal-500/25">
          {initials}
        </div>
        <div className="flex-1">
          <h2 className="font-display text-xl font-bold text-ink-900 dark:text-mist-50">{user.name}</h2>
          <p className="text-sm text-ink-700/60 dark:text-mist-100/50">{user.email}</p>
        </div>
        <div className="flex gap-6 sm:gap-8">
          <div>
            <p className="font-display text-lg font-bold text-ink-900 dark:text-mist-50">{user.totalEmails.toLocaleString()}</p>
            <p className="text-xs text-ink-700/50 dark:text-mist-100/40">Total Emails</p>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-ink-900 dark:text-mist-50">{mockStats.accuracy}%</p>
            <p className="text-xs text-ink-700/50 dark:text-mist-100/40">Accuracy</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="glass rounded-3xl p-6 shadow-sm shadow-ink-950/5">
          <h3 className="mb-4 font-display font-semibold text-ink-900 dark:text-mist-50">Account details</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-mist-50">Full name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-ink-900/10 bg-white/70 px-4 py-2.5 text-sm text-ink-900 focus:border-signal-400 focus:outline-none focus:ring-4 focus:ring-signal-400/15 dark:border-white/10 dark:bg-ink-900/40 dark:text-mist-50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-mist-50">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/30 dark:text-mist-50/30" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-ink-900/10 bg-white/70 py-2.5 pl-10 pr-4 text-sm text-ink-900 focus:border-signal-400 focus:outline-none focus:ring-4 focus:ring-signal-400/15 dark:border-white/10 dark:bg-ink-900/40 dark:text-mist-50"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-700/50 dark:text-mist-100/40">
              <Calendar className="h-3.5 w-3.5" /> Joined {new Date(user.joined).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <Button onClick={handleSave} icon={<Save className="h-4 w-4" />} fullWidth>
              Save changes
            </Button>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 shadow-sm shadow-ink-950/5">
          <h3 className="mb-4 font-display font-semibold text-ink-900 dark:text-mist-50">Account settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-ink-900/10 p-3.5 dark:border-white/10">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-signal-500" />
                <div>
                  <p className="text-sm font-medium text-ink-900 dark:text-mist-50">Email alerts</p>
                  <p className="text-xs text-ink-700/50 dark:text-mist-100/40">Get notified on high-risk spam</p>
                </div>
              </div>
              <Toggle checked={emailAlerts} onChange={() => setEmailAlerts((v) => !v)} />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-ink-900/10 p-3.5 dark:border-white/10">
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-signal-500" />
                <div>
                  <p className="text-sm font-medium text-ink-900 dark:text-mist-50">Auto-scan inbox</p>
                  <p className="text-xs text-ink-700/50 dark:text-mist-100/40">Automatically scan new emails</p>
                </div>
              </div>
              <Toggle checked={autoScan} onChange={() => setAutoScan((v) => !v)} />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-ink-900/10 p-3.5 dark:border-white/10">
              <div className="flex items-center gap-3">
                <Moon className="h-4 w-4 text-signal-500" />
                <div>
                  <p className="text-sm font-medium text-ink-900 dark:text-mist-50">Dark mode</p>
                  <p className="text-xs text-ink-700/50 dark:text-mist-100/40">Toggle the interface theme</p>
                </div>
              </div>
              <Toggle checked={theme === 'dark'} onChange={toggleTheme} />
            </div>

            <button
              onClick={() => showToast('Password reset link sent to your email.', 'info')}
              className="flex w-full items-center gap-3 rounded-xl border border-ink-900/10 p-3.5 text-left text-sm font-medium text-ink-900 transition hover:border-signal-400 dark:border-white/10 dark:text-mist-50"
            >
              <KeyRound className="h-4 w-4 text-signal-500" />
              Change password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
