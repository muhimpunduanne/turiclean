import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: 'emerald' | 'blue' | 'amber' | 'red' | 'purple';
  trend?: { value: number; label: string };
  index?: number;
}

const colorMap = {
  emerald: {
    bg: 'bg-gradient-to-br from-emerald-500/20 to-emerald-500/5',
    text: 'text-emerald-400',
    line: 'from-emerald-400 via-emerald-500 to-emerald-400',
    glow: 'shadow-emerald-500/20',
    ring: 'ring-emerald-500/20',
  },
  blue: {
    bg: 'bg-gradient-to-br from-sky-500/20 to-sky-500/5',
    text: 'text-sky-400',
    line: 'from-sky-400 via-sky-500 to-sky-400',
    glow: 'shadow-sky-500/20',
    ring: 'ring-sky-500/20',
  },
  amber: {
    bg: 'bg-gradient-to-br from-amber-500/20 to-amber-500/5',
    text: 'text-amber-400',
    line: 'from-amber-300 via-amber-400 to-amber-300',
    glow: 'shadow-amber-500/20',
    ring: 'ring-amber-500/20',
  },
  red: {
    bg: 'bg-gradient-to-br from-red-500/20 to-red-500/5',
    text: 'text-red-400',
    line: 'from-red-400 via-red-500 to-red-400',
    glow: 'shadow-red-500/20',
    ring: 'ring-red-500/20',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-500/20 to-purple-500/5',
    text: 'text-purple-400',
    line: 'from-purple-400 via-purple-500 to-purple-400',
    glow: 'shadow-purple-500/20',
    ring: 'ring-purple-500/20',
  },
};

export default function StatsCard({ title, value, subtitle, icon, color, trend, index = 0 }: StatsCardProps) {
  const c = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card relative flex items-start gap-4 overflow-hidden p-5"
    >
      {/* Top gradient line */}
      <span className={cn('absolute inset-x-0 top-0 h-px bg-gradient-to-r', c.line)} />

      {/* Icon */}
      <div className={cn(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 shadow-lg',
        c.bg, c.text, c.ring, c.glow,
      )}>
        <span className="[&>svg]:h-5 [&>svg]:w-5">{icon}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 mb-1">{title}</p>
        <p className="text-3xl font-black leading-none text-white tabular-nums">{value}</p>
        {subtitle && <p className="mt-1.5 text-xs text-slate-500 truncate">{subtitle}</p>}
        {trend && (
          <div className={cn(
            'mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold',
            trend.value >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
          )}>
            {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
          </div>
        )}
      </div>

      {/* Background decoration */}
      <div className={cn('absolute -right-4 -bottom-4 h-20 w-20 rounded-full opacity-5 blur-xl', c.bg)} />
    </motion.div>
  );
}
