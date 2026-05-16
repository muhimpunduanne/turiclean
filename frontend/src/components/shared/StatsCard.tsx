import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: 'emerald' | 'blue' | 'amber' | 'red' | 'purple';
  trend?: { value: number; label: string };
}

const colorMap = {
  emerald: { bg: 'bg-emerald-500/12', text: 'text-emerald-400', line: 'from-emerald-400 to-emerald-600' },
  blue: { bg: 'bg-sky-500/12', text: 'text-sky-400', line: 'from-sky-400 to-sky-600' },
  amber: { bg: 'bg-amber-500/12', text: 'text-amber-400', line: 'from-amber-300 to-amber-500' },
  red: { bg: 'bg-red-500/12', text: 'text-red-400', line: 'from-red-300 to-red-500' },
  purple: { bg: 'bg-purple-500/12', text: 'text-purple-400', line: 'from-purple-300 to-purple-500' },
};

export default function StatsCard({ title, value, subtitle, icon, color, trend }: StatsCardProps) {
  const c = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card relative flex items-start gap-4 p-5"
    >
      <span className={cn('absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r', c.line)} />
      <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ring-1 ring-white/10', c.bg, c.text)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-400 mb-1">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        {trend && (
          <p className={cn('text-xs mt-1 font-medium', trend.value >= 0 ? 'text-emerald-400' : 'text-red-400')}>
            {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
          </p>
        )}
      </div>
    </motion.div>
  );
}
