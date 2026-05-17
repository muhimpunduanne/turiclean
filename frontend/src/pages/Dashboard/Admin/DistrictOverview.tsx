import { MapPin, TrendingUp } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAllReports } from '@/hooks/useReports';
import { useAllUsers } from '@/hooks/useUsers';
import { Role, ReportStatus } from '@/types';
import { cn } from '@/lib/utils';

const DISTRICTS = [
  { name: 'Gasabo',     coverage: 91, color: 'emerald' },
  { name: 'Kicukiro',  coverage: 87, color: 'emerald' },
  { name: 'Nyarugenge',coverage: 84, color: 'sky'     },
  { name: 'Musanze',   coverage: 78, color: 'amber'   },
  { name: 'Rubavu',    coverage: 76, color: 'amber'   },
  { name: 'Huye',      coverage: 74, color: 'amber'   },
];

const barColor: Record<string, string> = {
  emerald: 'bg-emerald-500',
  sky:     'bg-sky-500',
  amber:   'bg-amber-500',
};

const badgeTone: Record<string, 'emerald' | 'sky' | 'amber'> = {
  emerald: 'emerald',
  sky:     'sky',
  amber:   'amber',
};

export default function DistrictOverview() {
  const { reports } = useAllReports();
  const { users } = useAllUsers();
  const companies = users.filter((u) => u.role === Role.COMPANY);

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="District overview"
        title="District-level oversight"
        description="Coverage rates, report volume, resolution performance, and company allocation by district."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {DISTRICTS.map((d) => {
          const districtReports = reports.filter((r) =>
            r.address?.toLowerCase().includes(d.name.toLowerCase())
          );
          const resolved  = districtReports.filter((r) => r.status === ReportStatus.RESOLVED).length;
          const pending   = districtReports.filter((r) => r.status === 'PENDING').length;
          const resolRate = districtReports.length > 0
            ? Math.round((resolved / districtReports.length) * 100)
            : 0;

          return (
            <Card key={d.name} className="overflow-hidden">
              {/* Color top bar */}
              <div className={cn('h-1', barColor[d.color])} />
              <CardContent className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                      d.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                      d.color === 'sky'     ? 'bg-sky-500/10 text-sky-400' :
                                              'bg-amber-500/10 text-amber-400',
                    )}>
                      <MapPin size={16} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{d.name}</h3>
                      <p className="text-xs text-slate-500">Kigali, Rwanda</p>
                    </div>
                  </div>
                  <Badge tone={badgeTone[d.color]} dot>{d.coverage}% coverage</Badge>
                </div>

                {/* Coverage bar */}
                <div className="mt-5">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Collection coverage</span>
                    <span className="text-xs font-bold text-white">{d.coverage}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/[0.07]">
                    <div
                      className={cn('h-full rounded-full transition-all', barColor[d.color])}
                      style={{ width: `${d.coverage}%` }}
                    />
                  </div>
                </div>

                {/* Stats grid */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                    <p className="text-lg font-black text-white">{districtReports.length}</p>
                    <p className="text-[10px] font-medium text-slate-500">Reports</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                    <p className="text-lg font-black text-emerald-400">{resolved}</p>
                    <p className="text-[10px] font-medium text-slate-500">Resolved</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                    <p className="text-lg font-black text-amber-400">{pending}</p>
                    <p className="text-[10px] font-medium text-slate-500">Pending</p>
                  </div>
                </div>

                {/* Resolution rate */}
                {districtReports.length > 0 && (
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <TrendingUp size={12} /> Resolution rate
                    </span>
                    <span className={cn(
                      'text-xs font-bold',
                      resolRate >= 70 ? 'text-emerald-400' : resolRate >= 40 ? 'text-amber-400' : 'text-red-400'
                    )}>
                      {resolRate}%
                    </span>
                  </div>
                )}

                <p className="mt-4 text-xs text-slate-600">{companies.length} active operator{companies.length !== 1 ? 's' : ''}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
