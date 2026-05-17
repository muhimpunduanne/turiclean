import { AlertTriangle, CheckCircle2, FileText, Radio, Truck } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SmartMap from '@/components/maps/SmartMap';
import { StatusBadge, reportTypeLabel } from '@/components/data/status';
import { useAllReports } from '@/hooks/useReports';
import { useLiveTrucks } from '@/hooks/useLiveTrucks';
import { ReportStatus } from '@/types';
import { cn } from '@/lib/utils';

export default function CityMonitoring() {
  const { reports } = useAllReports();
  const trucks = useLiveTrucks();

  const active    = trucks.filter((t) => t.status === 'ACTIVE').length;
  const pending   = reports.filter((r) => r.status === ReportStatus.PENDING).length;
  const urgent    = reports.filter((r) => r.type === 'URGENT_PICKUP' && r.status !== ReportStatus.RESOLVED).length;
  const resolved  = reports.filter((r) => r.status === ReportStatus.RESOLVED).length;

  const statStrip = [
    { label: 'Live trucks',     value: active,   icon: <Truck size={15} />,         color: 'emerald' },
    { label: 'Open reports',    value: pending,   icon: <FileText size={15} />,      color: 'amber'   },
    { label: 'Urgent incidents',value: urgent,    icon: <AlertTriangle size={15} />, color: 'red'     },
    { label: 'Resolved today',  value: resolved,  icon: <CheckCircle2 size={15} />,  color: 'sky'     },
  ];

  const colorMap: Record<string, string> = {
    emerald: 'text-emerald-400 bg-emerald-500/10',
    amber:   'text-amber-400   bg-amber-500/10',
    red:     'text-red-400     bg-red-500/10',
    sky:     'text-sky-400     bg-sky-500/10',
  };

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Live operations"
        title="City monitoring"
        description="Real-time view of trucks, report hotspots, missed pickup clusters, and active route paths across Kigali."
      />

      {/* Live stats strip */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {statStrip.map(({ label, value, icon, color }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/2 px-4 py-3"
          >
            <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', colorMap[color])}>
              {icon}
            </span>
            <div>
              <p className="text-lg font-black text-white">{value}</p>
              <p className="text-[11px] text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Map + sidebar */}
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <CardTitle>Kigali live operations map</CardTitle>
            <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
              <Radio size={10} className="animate-pulse" /> Live
            </span>
          </CardHeader>
          <CardContent>
            <SmartMap trucks={trucks} reports={reports} showRoute height="560px" />
          </CardContent>
        </Card>

        {/* Recent incidents sidebar */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Recent incidents</p>
          {reports.length === 0 ? (
            <div className="empty-state py-10">
              <div className="empty-state-icon"><FileText size={20} /></div>
              <p className="text-sm">No reports yet.</p>
            </div>
          ) : (
            reports.slice(0, 10).map((r) => (
              <div
                key={r.id}
                className="rounded-xl border border-white/6 bg-white/2 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-white leading-snug">{reportTypeLabel(r.type)}</p>
                  <StatusBadge value={r.status} />
                </div>
                <p className="mt-1.5 text-xs text-slate-500 truncate">{r.address}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
