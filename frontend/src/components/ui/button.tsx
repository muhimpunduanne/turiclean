import { Slot } from '@radix-ui/react-slot';
import { type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/20',
  secondary: 'bg-sky-500 text-white hover:bg-sky-400 shadow-lg shadow-sky-500/20',
  ghost: 'bg-transparent text-slate-300 hover:bg-white/[0.06] hover:text-white',
  danger: 'bg-red-500 text-white hover:bg-red-400 shadow-lg shadow-red-500/20',
  outline: 'border border-white/10 bg-white/[0.035] text-slate-200 hover:border-emerald-400/30 hover:bg-white/[0.08]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
  icon: 'h-10 w-10 p-0',
};

export function Button({ asChild, variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all disabled:pointer-events-none disabled:opacity-50',
        'focus-ring active:scale-[0.98] hover:-translate-y-0.5',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
