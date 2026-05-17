import StatsCard from '@/components/shared/StatsCard';
import { type ReactNode } from 'react';

export interface Metric {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  color: 'emerald' | 'blue' | 'amber' | 'red' | 'purple';
  trend?: { value: number; label: string };
}

export default function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, i) => <StatsCard key={metric.title} index={i} {...metric} />)}
    </div>
  );
}
