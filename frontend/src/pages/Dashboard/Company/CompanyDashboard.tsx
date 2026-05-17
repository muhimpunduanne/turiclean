import { BarChart3, CheckCircle2, ClipboardList, Truck } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DashboardLayout from '@/components/shared/DashboardLayout';
import MetricGrid from '@/components/data/MetricGrid';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useAllReports } from '@/hooks/useReports';
import { useMyTrucks } from '@/hooks/useTrucks';
import { useLiveTrucks } from '@/hooks/useLiveTrucks';
import { useCompanyDashboard } from '@/hooks/useDashboard';
import SmartMap from '@/components/maps/SmartMap';

const weekly = [
  { name: 'Mon', value: 42 }, { name: 'Tue', value: 55 }, { name: 'Wed', value: 48 },
  { name: 'Thu', value: 61 }, { name: 'Fri', value: 70 }, { name: 'Sat', value: 36 },
];

export default function CompanyDashboard() {
  const { user } = useAuth();
  const { reports, isLoading: reportsLoading } = useAllReports();
  const { trucks: rawTrucks, isLoading: trucksLoading } = useMyTrucks();
  const { stats } = useCompanyDashboard();
  const trucks = useLiveTrucks(rawTrucks);
  const isLoading = reportsLoading || trucksLoading;

  const pending = stats?.reports?.pending ?? reports.filter((r) => r.status === 'PENDING').length;
  const resolved = stats?.reports?.resolved ?? reports.filter((r) => r.status === 'RESOLVED').length;
  const activeTrucks = trucks.filter((t) => t.status === 'ACTIVE').length;

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Company operations"
        title={user?.fullName || 'Company dashboard'}
        description="Manage incoming requests, fleet movement, route performance, and customer service reports."
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
      ) : (
        <MetricGrid metrics={[
          { title: 'Incoming requests', value: pending,      subtitle: 'Need dispatcher review', icon: <ClipboardList />, color: 'amber',  index: 0 },
          { title: 'Active trucks',     value: activeTrucks, subtitle: `${trucks.length} in fleet`, icon: <Truck />,    color: 'emerald', index: 1 },
          { title: 'Resolved reports',  value: resolved,     subtitle: 'This service cycle',    icon: <CheckCircle2 />, color: 'blue',    index: 2 },
          { title: 'Response rate',     value: '91%',        subtitle: 'Target 95%',            icon: <BarChart3 />,   color: 'purple',  index: 3, trend: { value: 7, label: 'vs last week' } },
        ]} />
      )}

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Fleet tracking</CardTitle></CardHeader>
          <CardContent>
            <SmartMap trucks={trucks} reports={reports.slice(0, 5)} showRoute height="380px" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Collections completed</CardTitle></CardHeader>
          <CardContent>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekly} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#475569" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: '#0c1024', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, fontSize: 12 }} />
                  <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} name="Collections" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
