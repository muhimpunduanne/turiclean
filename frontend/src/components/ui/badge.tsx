import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const toneMap = {
  emerald: 'bg-emerald-500/12 text-emerald-300 border-emerald-500/20',
  sky: 'bg-sky-500/12 text-sky-300 border-sky-500/20',
  amber: 'bg-amber-500/12 text-amber-300 border-amber-500/20',
  red: 'bg-red-500/12 text-red-300 border-red-500/20',
  slate: 'bg-slate-500/12 text-slate-300 border-slate-500/20',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: keyof typeof toneMap;
}

export function Badge({ tone = 'slate', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold', toneMap[tone], className)}
      {...props}
    />
  );
}
