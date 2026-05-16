import { Link } from 'react-router-dom';
import { Bell, Calendar, CreditCard, FileText, Plus, Truck } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import MetricGrid from '@/components/data/MetricGrid';
import PageHeader from '@/components/data/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockReports } from '@/data/mockReports';
import { mockSchedules, mockPayments } from '@/data/mockPayments';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { ReportStatus } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import SmartMap from '@/components/maps/SmartMap';
import { mockTrucks } from '@/data/mockTrucks';
import { StatusBadge, reportTypeLabel } from '@/components/data/status';

export default function HouseholdDashboard() {
  const { user } = useAuth();
  const { notifications } = useNotifications();
  const reports = mockReports.filter((report) => report.reporterId === user?.id);
  const due = mockPayments.filter((payment) => payment.userId === user?.id && payment.status === 'PENDING').reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Household dashboard"
        title={`Welcome, ${user?.fullName?.split(' ')[0] || 'Resident'}`}
        description="Track pickups, report waste issues, follow nearby trucks, and keep service payments up to date."
        actions={<Button asChild><Link to="/dashboard/reports/new"><Plus size={16} /> New report</Link></Button>}
      />
      <MetricGrid metrics={[
        { title: 'Total reports', value: reports.length, subtitle: 'Submitted by your household', icon: <FileText />, color: 'emerald' },
        { title: 'Pending issues', value: reports.filter((r) => r.status === ReportStatus.PENDING).length, subtitle: 'Awaiting assignment', icon: <Bell />, color: 'amber' },
        { title: 'Next pickup', value: 'Monday', subtitle: mockSchedules[0].time, icon: <Calendar />, color: 'blue' },
        { title: 'Amount due', value: formatCurrency(due), subtitle: 'June service invoice', icon: <CreditCard />, color: 'purple' },
      ]} />
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader><CardTitle>Live truck near your sector</CardTitle></CardHeader>
          <CardContent><SmartMap trucks={mockTrucks.slice(0, 4)} reports={reports.slice(0, 3)} showRoute height="390px" /></CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Recent reports</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {reports.slice(0, 4).map((report) => (
                <div key={report.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center justify-between gap-3"><p className="font-medium text-white">{reportTypeLabel(report.type)}</p><StatusBadge value={report.status} /></div>
                  <p className="mt-1 text-xs text-slate-400">{report.address}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Live notifications</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {notifications.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-lg bg-white/[0.04] p-3">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{item.message}</p>
                  <p className="mt-2 text-[11px] text-slate-500">{formatDate(item.createdAt)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
