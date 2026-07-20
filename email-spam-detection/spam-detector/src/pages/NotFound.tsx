import { Link } from 'react-router-dom';
import { ShieldQuestion } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="bg-grid flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <ShieldQuestion className="h-16 w-16 text-signal-500" />
      <h1 className="mt-4 font-display text-3xl font-bold text-ink-900 dark:text-mist-50">404 — Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-700/60 dark:text-mist-100/50">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-6">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
