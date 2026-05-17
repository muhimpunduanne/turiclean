import { ArrowRight, Building2, FileText, Truck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DashboardLayout from '@/components/shared/DashboardLayout';
import MetricGrid from '@/components/data/MetricGrid';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import SmartMap from '@/components/maps/SmartMap';
import { StatusBadge, reportTypeLabel } from '@/components/data/status';
import { useAdminDashboard } from '@/hooks/useDashboard';
import { useAllReports } from '@/hooks/useReports';
import { useLiveTrucks } from '@/hooks/useLiveTrucks';
import { formatDate } from '@/lib/utils';

const trend = [
  { name: 'Jan', value: 520 }, { name: 'Feb', value: 640 }, { name: 'Mar', value: 710 },
  { name: 'Apr', value: 780 }, { name: 'May', value: 850 },
];

const tooltipStyle = { background: '#0c1024', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, fontSize: 12 };

export default function AdminDashboard() {
  const { stats, isLoading: statsLoading } = useAdminDashboard();
  const { reports, isLoading: reportsLoading } = useAllReports();
  const trucks = useLiveTrucks();
  const isLoading = statsLoading || reportsLoading;

  const recent = reports.slice(0, 5);

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Government oversight"
        title="Rwanda waste command center"
        description="Monitor city-wide services, operator performance, district coverage, and live incident heatmaps in real time."
      />

      {/* KPI strip */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
      ) : (
        <MetricGrid metrics={[
          { title: 'Households',    value: (stats?.users?.households ?? 0).toLocaleString(), subtitle: 'Registered accounts',   icon: <Users />,    color: 'emerald', index: 0 },
          { title: 'Companies',     value: stats?.users?.companies ?? 0,                     subtitle: 'Licensed operators',    icon: <Building2 />,color: 'blue',    index: 1 },
          { title: 'Open reports',  value: stats?.reports?.pending ?? reports.filter((r) => r.status !== 'RESOLVED').length, subtitle: 'Across districts', icon: <FileText />, color: 'amber', index: 2 },
          { title: 'Active trucks', value: trucks.filter((t) => t.status === 'ACTIVE').length, subtitle: 'GPS online now',       icon: <Truck />,    color: 'purple', index: 3 },
        ]} />
      )}

      {/* Main grid */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        {/* Map */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>City-wide heatmap & live trucks</CardTitle>
            <Link to="/admin/monitoring" className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300">
              Full map <ArrowRight size={12} />
            </Link>
          </CardHeader>
          <CardContent>
            <SmartMap trucks={trucks} reports={reports} showRoute height="380px" />
          </CardContent>
        </Card>

        {/* Right panel */}
        <div className="space-y-6">
          {/* Coverage chart */}
          <Card>
            <CardHeader><CardTitle>Coverage trend</CardTitle></CardHeader>
            <CardContent>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trend} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <defs>
                      <linearGradient id="cov" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}   />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#475569" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area dataKey="value" stroke="#10b981" fill="url(#cov)" strokeWidth={2.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent incidents */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent incidents</CardTitle>
              <Link to="/admin/reports" className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300">
                All <ArrowRight size={12} />
              </Link>
            </CardHeader>
            <CardContent className="space-y-2">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 rounded-lg" />)
                : recent.length === 0
                  ? <p className="py-4 text-center text-sm text-slate-500">No reports yet.</p>
                  : recent.map((r) => (
                      <div key={r.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">{reportTypeLabel(r.type)}</p>
                          <p className="truncate text-xs text-slate-500">{r.address} · {formatDate(r.createdAt)}</p>
                        </div>
                        <StatusBadge value={r.status} />
                      </div>
                    ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
