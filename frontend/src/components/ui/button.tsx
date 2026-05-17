import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import { type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:   'bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-400/20',
  secondary: 'bg-sky-500 text-white hover:bg-sky-400 shadow-lg shadow-sky-500/25 ring-1 ring-sky-400/20',
  success:   'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-600/20',
  ghost:     'bg-transparent text-slate-300 hover:bg-white/[0.06] hover:text-white',
  danger:    'bg-red-500 text-white hover:bg-red-400 shadow-lg shadow-red-500/25 ring-1 ring-red-400/20',
  outline:   'border border-white/[0.10] bg-white/[0.03] text-slate-200 hover:border-emerald-400/30 hover:bg-white/[0.07] hover:text-white',
};

const sizes: Record<ButtonSize, string> = {
  sm:   'h-8 px-3 text-xs gap-1.5',
  md:   'h-10 px-4 text-sm',
  lg:   'h-12 px-6 text-base',
  icon: 'h-10 w-10 p-0',
};

export function Button({
  asChild,
  variant = 'primary',
  size = 'md',
  isLoading,
  loadingText,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150',
        'focus-ring active:scale-[0.97]',
        !isLoading && !disabled && 'hover:-translate-y-px',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 size={size === 'lg' ? 18 : 14} className="animate-spin" />
          {loadingText ?? children}
        </>
      ) : children}
    </Comp>
  );
}
