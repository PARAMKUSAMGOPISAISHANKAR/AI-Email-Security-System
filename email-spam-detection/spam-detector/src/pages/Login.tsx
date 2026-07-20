import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login, loginWithGoogle } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(email.trim() || 'User', email.trim() || 'user@example.com');
      showToast('Welcome back! Logged in successfully.', 'success');
      navigate('/dashboard');
    }, 1100);
  };

  const handleGoogleLogin = () => {
    const fallbackEmail = email.trim() || 'user@gmail.com';
    const fallbackName = email.trim().split('@')[0] || 'Google User';
    loginWithGoogle(fallbackName, fallbackEmail);
    showToast('Signed in with Google.', 'success');
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-3xl p-7 shadow-xl shadow-ink-950/10 sm:p-9"
    >
      <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-mist-50">Welcome back</h1>
      <p className="mt-1.5 text-sm text-ink-700/60 dark:text-mist-100/50">Log in to keep scanning your inbox for spam.</p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-mist-50">
            Email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/30 dark:text-mist-50/30" />
            <input
              id="email"
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
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-mist-50">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/30 dark:text-mist-50/30" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-ink-900/10 bg-white/70 py-2.5 pl-10 pr-10 text-sm text-ink-900 placeholder:text-ink-900/30 focus:border-signal-400 focus:outline-none focus:ring-4 focus:ring-signal-400/15 dark:border-white/10 dark:bg-ink-900/40 dark:text-mist-50 dark:placeholder:text-mist-50/25"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-900/30 hover:text-ink-900/60 dark:text-mist-50/30 dark:hover:text-mist-50/60"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-ink-700 dark:text-mist-100/70">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-ink-900/20 text-signal-600 focus:ring-signal-400"
            />
            Remember me
          </label>
          <a href="#" className="font-medium text-signal-600 hover:underline dark:text-signal-400">
            Forgot password?
          </a>
        </div>

        <Button type="submit" fullWidth loading={loading} icon={<LogIn className="h-4 w-4" />}>
          Log In
        </Button>

        <div className="relative py-2 text-center text-xs text-ink-900/40 dark:text-mist-50/40">
          <span className="relative z-10 bg-transparent px-2">or continue with</span>
          <div className="absolute inset-x-0 top-1/2 -z-0 h-px bg-ink-900/10 dark:bg-white/10" />
        </div>

        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={handleGoogleLogin}
          icon={
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0012 23z" />
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 010-4.2V7.05H2.18a11 11 0 000 9.9l3.66-2.85z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 00-9.82 6.05l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z" />
            </svg>
          }
        >
          Continue with Google
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-ink-700/60 dark:text-mist-100/50">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-signal-600 hover:underline dark:text-signal-400">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
}
