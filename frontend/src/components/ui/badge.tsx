import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const toneMap = {
  emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  sky:     'bg-sky-500/10 text-sky-300 border-sky-500/20',
  amber:   'bg-amber-500/10 text-amber-300 border-amber-500/20',
  red:     'bg-red-500/10 text-red-300 border-red-500/20',
  purple:  'bg-purple-500/10 text-purple-300 border-purple-500/20',
  slate:   'bg-slate-500/10 text-slate-300 border-slate-500/20',
};

const dotColor = {
  emerald: 'bg-emerald-400',
  sky:     'bg-sky-400',
  amber:   'bg-amber-400',
  red:     'bg-red-400',
  purple:  'bg-purple-400',
  slate:   'bg-slate-400',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: keyof typeof toneMap;
  dot?: boolean;
}

export function Badge({ tone = 'slate', dot, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        toneMap[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dotColor[tone])} />}
      {children}
    </span>
  );
}
