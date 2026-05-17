import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DashboardLayout from '@/components/shared/DashboardLayout';
import MetricGrid from '@/components/data/MetricGrid';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, CheckCircle2, Clock, Users } from 'lucide-react';
import { useAllReports } from '@/hooks/useReports';
import { useAllUsers } from '@/hooks/useUsers';
import { Role, ReportStatus } from '@/types';

const responseTrend = [
  { name: 'Week 1', value: 82 }, { name: 'Week 2', value: 88 },
  { name: 'Week 3', value: 91 }, { name: 'Week 4', value: 94 },
];

export default function PerformanceAnalytics() {
  const { reports, isLoading } = useAllReports();
  const { users } = useAllUsers();
  const companies = users.filter((u) => u.role === Role.COMPANY);

  const totalReports = reports.length;
  const resolvedReports = reports.filter((r) => r.status === ReportStatus.RESOLVED).length;
  const resolutionRate = totalReports > 0 ? Math.round((resolvedReports / totalReports) * 100) : 0;

  const requestMix = [
    { name: 'Full bins',     value: reports.filter((r) => r.type === 'FULL_BIN').length     || 1, fill: '#10b981' },
    { name: 'Missed pickups',value: reports.filter((r) => r.type === 'MISSED_PICKUP').length || 1, fill: '#0ea5e9' },
    { name: 'Urgent',        value: reports.filter((r) => r.type === 'URGENT_PICKUP').length || 1, fill: '#f59e0b' },
  ];

  const companyScorecard = companies.map((c) => {
    const assigned = reports.filter((r) => r.assignedToId === c.id);
    const resolved = assigned.filter((r) => r.status === ReportStatus.RESOLVED).length;
    const response = assigned.length > 0 ? Math.round((resolved / assigned.length) * 100) : 0;
    return { name: c.fullName.split(' ')[0], response, coverage: Math.min(100, response + 8) };
  });

  return (
    <DashboardLayout>
      <PageHeader
        title="Performance analytics"
        description="Compare operator response rates, coverage, missed pickup risk, and SLA compliance."
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
      ) : (
        <MetricGrid metrics={[
          { title: 'Total reports', value: totalReports, subtitle: 'Platform-wide', icon: <BarChart3 />, color: 'blue' },
          { title: 'Resolved', value: resolvedReports, subtitle: `${resolutionRate}% resolution rate`, icon: <CheckCircle2 />, color: 'emerald' },
          { title: 'Active companies', value: companies.length, subtitle: 'Licensed operators', icon: <Users />, color: 'purple' },
          { title: 'Avg response', value: '18m', subtitle: 'Target 15m', icon: <Clock />, color: 'amber' },
        ]} />
      )}

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Company scorecard</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer>
              <BarChart data={companyScorecard.length > 0 ? companyScorecard : [{ name: 'No data', response: 0, coverage: 0 }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#0f1336', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                <Bar dataKey="response" fill="#10b981" radius={[6, 6, 0, 0]} name="Response rate %" />
                <Bar dataKey="coverage" fill="#0ea5e9" radius={[6, 6, 0, 0]} name="Coverage %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Request mix</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={requestMix} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} />
                <Tooltip contentStyle={{ background: '#0f1336', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader><CardTitle>Response rate trend</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer>
              <LineChart data={responseTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#0f1336', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
