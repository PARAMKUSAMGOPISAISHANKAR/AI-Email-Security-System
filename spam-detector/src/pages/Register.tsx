import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, CheckCircle2, XCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/useAuth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();

  const passwordsMatch = confirm.length > 0 && password === confirm;
  const passwordsMismatch = confirm.length > 0 && password !== confirm;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      showToast('Passwords do not match.', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(name.trim() || 'User', email.trim() || 'user@example.com');
      showToast('Account created! Welcome to SpamShieldAI.', 'success');
      navigate('/dashboard');
    }, 1100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-3xl p-7 shadow-xl shadow-ink-950/10 sm:p-9"
    >
      <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-mist-50">Create your account</h1>
      <p className="mt-1.5 text-sm text-ink-700/60 dark:text-mist-100/50">Start detecting spam in less than a minute.</p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-mist-50">
            Full Name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/30 dark:text-mist-50/30" />
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ananya Rao"
              className="w-full rounded-xl border border-ink-900/10 bg-white/70 py-2.5 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-900/30 focus:border-signal-400 focus:outline-none focus:ring-4 focus:ring-signal-400/15 dark:border-white/10 dark:bg-ink-900/40 dark:text-mist-50 dark:placeholder:text-mist-50/25"
            />
          </div>
        </div>

        <div>
          <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-mist-50">
            Email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/30 dark:text-mist-50/30" />
            <input
              id="reg-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-ink-900/10 bg-white/70 py-2.5 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-900/30 focus:border-signal-400 focus:outline-none focus:ring-4 focus:ring-signal-400/15 dark:border-white/10 dark:bg-ink-900/40 dark:text-mist-50 dark:placeholder:text-mist-50/25"
            />
          </div>
        </div>

        <div>
          <label htmlFor="reg-password" className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-mist-50">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/30 dark:text-mist-50/30" />
            <input
              id="reg-password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full rounded-xl border border-ink-900/10 bg-white/70 py-2.5 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-900/30 focus:border-signal-400 focus:outline-none focus:ring-4 focus:ring-signal-400/15 dark:border-white/10 dark:bg-ink-900/40 dark:text-mist-50 dark:placeholder:text-mist-50/25"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-mist-50">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/30 dark:text-mist-50/30" />
            <input
              id="confirm"
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter your password"
              className={`w-full rounded-xl border bg-white/70 py-2.5 pl-10 pr-10 text-sm text-ink-900 placeholder:text-ink-900/30 focus:outline-none focus:ring-4 dark:bg-ink-900/40 dark:text-mist-50 dark:placeholder:text-mist-50/25 ${
                passwordsMismatch
                  ? 'border-spam-500/50 focus:ring-spam-400/15'
                  : 'border-ink-900/10 focus:border-signal-400 focus:ring-signal-400/15 dark:border-white/10'
              }`}
            />
            {confirm.length > 0 && (
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
                {passwordsMatch ? (
                  <CheckCircle2 className="h-4 w-4 text-safe-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-spam-500" />
                )}
              </span>
            )}
          </div>
          {passwordsMismatch && <p className="mt-1.5 text-xs text-spam-500">Passwords don't match yet.</p>}
        </div>

        <Button type="submit" fullWidth loading={loading} icon={<UserPlus className="h-4 w-4" />}>
          Create Account
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-ink-700/60 dark:text-mist-100/50">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-signal-600 hover:underline dark:text-signal-400">
          Log in
        </Link>
      </p>
    </motion.div>
  );
}
