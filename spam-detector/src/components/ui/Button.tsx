import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-signal-500 to-violet-600 text-white shadow-lg shadow-signal-500/25 hover:shadow-xl hover:shadow-signal-500/30 hover:brightness-105',
  secondary:
    'bg-signal-50 text-signal-700 hover:bg-signal-100 dark:bg-white/5 dark:text-signal-400 dark:hover:bg-white/10',
  ghost: 'text-ink-700 hover:bg-ink-900/5 dark:text-mist-100 dark:hover:bg-white/5',
  outline:
    'border border-ink-900/10 text-ink-900 hover:border-signal-400 hover:text-signal-600 dark:border-white/10 dark:text-mist-50 dark:hover:border-signal-400',
  danger: 'bg-spam-500 text-white shadow-lg shadow-spam-500/25 hover:brightness-105',
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-7 text-base gap-2.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.015 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...(props as HTMLMotionProps<'button'>)}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        icon && iconPosition === 'left' && icon
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </motion.button>
  );
}
