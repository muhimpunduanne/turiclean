import { Link } from 'react-router-dom';
import { Bell, Calendar, CreditCard, FileText, Plus, ArrowRight } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import MetricGrid from '@/components/data/MetricGrid';
import PageHeader from '@/components/data/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { useMyReports } from '@/hooks/useReports';
import { useLiveTrucks } from '@/hooks/useLiveTrucks';
import { ReportStatus } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import SmartMap from '@/components/maps/SmartMap';
import { StatusBadge, reportTypeLabel } from '@/components/data/status';

export default function HouseholdDashboard() {
  const { user } = useAuth();
  const { notifications } = useNotifications();
  const { reports, isLoading } = useMyReports();
  const trucks = useLiveTrucks();

  const firstName = user?.fullName?.split(' ')[0] || 'Resident';

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Household dashboard"
        title={`Good day, ${firstName}`}
        description="Track your pickups, report waste issues, follow nearby trucks, and manage service payments."
        actions={
          <Button asChild size="sm" className="gap-1.5">
            <Link to="/dashboard/reports/new"><Plus size={14} /> New report</Link>
          </Button>
        }
      />

      {/* Stats */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
      ) : (
        <MetricGrid metrics={[
          { title: 'Total reports',   value: reports.length, subtitle: 'Submitted by you', icon: <FileText />, color: 'emerald', index: 0 },
          { title: 'Pending issues',  value: reports.filter((r) => r.status === ReportStatus.PENDING).length, subtitle: 'Awaiting assignment', icon: <Bell />, color: 'amber', index: 1 },
          { title: 'Next pickup',     value: 'Monday',       subtitle: '07:00 – 09:00 AM', icon: <Calendar />, color: 'blue',   index: 2 },
          { title: 'Amount due',      value: formatCurrency(0), subtitle: 'Current invoice',  icon: <CreditCard />, color: 'purple', index: 3 },
        ]} />
      )}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        {/* Map */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Live trucks near your sector</CardTitle>
            <Link to="/dashboard/track" className="flex items-center gap-1 text-xs font-semibold text-emerald-400 transition hover:text-emerald-300">
              Full map <ArrowRight size={12} />
            </Link>
          </CardHeader>
          <CardContent>
            <SmartMap trucks={trucks} reports={reports.slice(0, 3)} showRoute height="360px" />
          </CardContent>
        </Card>

        {/* Side column */}
        <div className="space-y-6">
          {/* Recent reports */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent reports</CardTitle>
              <Link to="/dashboard/reports" className="flex items-center gap-1 text-xs font-semibold text-emerald-400 transition hover:text-emerald-300">
                View all <ArrowRight size={12} />
              </Link>
            </CardHeader>
            <CardContent className="space-y-2">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-14 rounded-lg" />)
                : reports.length === 0
                  ? (
                    <div className="empty-state py-8">
                      <div className="empty-state-icon"><FileText size={20} /></div>
                      <p className="text-sm">No reports yet.</p>
                      <Link to="/dashboard/reports/new" className="text-xs font-semibold text-emerald-400 hover:text-emerald-300">Submit your first report →</Link>
                    </div>
                  )
                  : reports.slice(0, 4).map((report) => (
                      <div key={report.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">{reportTypeLabel(report.type)}</p>
                          <p className="truncate text-xs text-slate-500">{report.address}</p>
                        </div>
                        <StatusBadge value={report.status} />
                      </div>
                    ))}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {notifications.length === 0
                ? (
                  <div className="empty-state py-6">
                    <div className="empty-state-icon"><Bell size={18} /></div>
                    <p className="text-sm">No notifications yet.</p>
                  </div>
                )
                : notifications.slice(0, 3).map((item) => (
                    <div key={item.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{item.message}</p>
                      <p className="mt-2 text-[11px] text-slate-600">{formatDate(item.createdAt)}</p>
                    </div>
                  ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
