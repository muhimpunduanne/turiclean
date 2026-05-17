import { Calendar, CheckCircle2, Clock, Truck } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Badge } from '@/components/ui/badge';
import { mockSchedules } from '@/data/mockPayments';
import { cn } from '@/lib/utils';

export default function CollectionSchedule() {
  const upcoming = mockSchedules.filter((s) => s.status !== 'completed');
  const completed = mockSchedules.filter((s) => s.status === 'completed');

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Schedule"
        title="Collection schedule"
        description="Upcoming and past pickup windows for your sector, with truck and company assignments."
      />

      {/* Next pickup highlight */}
      {upcoming[0] && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-emerald-500/20 bg-linear-to-r from-emerald-500/10 to-emerald-500/5">
          <div className="flex items-center gap-5 p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
              <Calendar size={26} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-400">Next pickup</p>
              <h2 className="mt-1 text-xl font-black text-white">{upcoming[0].day} · {upcoming[0].time}</h2>
              <p className="text-sm text-slate-400">{upcoming[0].sector}, {upcoming[0].district} — {upcoming[0].companyName}</p>
            </div>
            <Badge tone="emerald" dot>Scheduled</Badge>
          </div>
        </div>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="mb-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Upcoming pickups</p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {upcoming.map((schedule) => (
              <ScheduleCard key={schedule.id} schedule={schedule} />
            ))}
          </div>
        </section>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <section>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Completed</p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 opacity-60">
            {completed.map((schedule) => (
              <ScheduleCard key={schedule.id} schedule={schedule} />
            ))}
          </div>
        </section>
      )}
    </DashboardLayout>
  );
}

function ScheduleCard({ schedule }: { schedule: (typeof mockSchedules)[0] }) {
  const done = schedule.status === 'completed';

  return (
    <div className={cn(
      'glass-card overflow-hidden',
      done ? 'border-white/5' : 'border-white/10',
    )}>
      {/* Top accent */}
      <div className={cn('h-0.5', done ? 'bg-slate-700' : 'bg-emerald-500')} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
            done ? 'bg-slate-500/10 text-slate-500' : 'bg-emerald-500/10 text-emerald-400',
          )}>
            {done ? <CheckCircle2 size={18} /> : <Calendar size={18} />}
          </div>
          <Badge tone={done ? 'slate' : 'emerald'} dot>{schedule.status}</Badge>
        </div>

        {/* Time */}
        <h3 className="text-lg font-bold text-white">{schedule.day}</h3>
        <p className={cn('flex items-center gap-1.5 mt-1 text-sm', done ? 'text-slate-500' : 'text-slate-300')}>
          <Clock size={13} /> {schedule.time}
        </p>

        {/* Location */}
        <div className="mt-4 border-t border-white/6 pt-4">
          <p className="text-sm font-semibold text-white">{schedule.sector}</p>
          <p className="text-xs text-slate-500">{schedule.district} District</p>
        </div>

        {/* Truck */}
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/3 border border-white/5 px-3 py-2.5">
          <Truck size={14} className={done ? 'text-slate-600' : 'text-sky-400'} />
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-300">{schedule.companyName}</p>
            <p className="text-[11px] text-slate-600">Plate: {schedule.truckPlate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
