import {
  Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
  PieChart, Pie, Legend,
} from 'recharts';
import { BarChart3, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import MetricGrid from '@/components/data/MetricGrid';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const responseTrend = [
  { name: 'Week 1', rate: 82 },
  { name: 'Week 2', rate: 88 },
  { name: 'Week 3', rate: 91 },
  { name: 'Week 4', rate: 94 },
];

const requestMix = [
  { name: 'Full bins',      value: 46, fill: '#10b981' },
  { name: 'Missed pickups', value: 29, fill: '#0ea5e9' },
  { name: 'Urgent',         value: 25, fill: '#f59e0b' },
];

const tooltipStyle = {
  background: '#0c1024',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: 10,
  fontSize: 12,
};

export default function CompanyAnalytics() {
  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Analytics"
        title="Company performance"
        description="Response rates, request mix, collection trends, and SLA compliance for your operation."
      />

      {/* Metric strip */}
      <MetricGrid metrics={[
        { title: 'Response rate',   value: '94%',  subtitle: 'Week 4 — up from 82%', icon: <BarChart3 />,    color: 'emerald', index: 0, trend: { value: 12, label: 'this month' } },
        { title: 'Collections done',value: '312',  subtitle: 'This billing cycle',    icon: <CheckCircle2 />, color: 'blue',    index: 1 },
        { title: 'Avg response',    value: '17m',  subtitle: 'Target: 15 minutes',   icon: <Clock />,        color: 'amber',   index: 2 },
        { title: 'SLA compliance',  value: '96%',  subtitle: 'Above district avg',   icon: <TrendingUp />,   color: 'purple',  index: 3 },
      ]} />

      {/* Charts */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Line chart */}
        <Card>
          <CardHeader>
            <CardTitle>Response rate trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTrend} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#475569" tick={{ fontSize: 11 }} domain={[70, 100]} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v: number) => [`${v}%`, 'Response rate']}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: '#34d399' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie chart */}
        <Card>
          <CardHeader>
            <CardTitle>Request mix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={requestMix}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                  />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, '']} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12, color: '#94a3b8', paddingTop: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SLA breakdown */}
      <Card className="mt-6">
        <CardHeader><CardTitle>SLA performance by request type</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Full bins',       target: '2h',  actual: '1h 44m', rate: 96, color: 'emerald' },
              { label: 'Missed pickups',  target: '24h', actual: '18h 20m',rate: 98, color: 'sky'     },
              { label: 'Urgent pickups',  target: '15m', actual: '13m',    rate: 91, color: 'amber'   },
            ].map(({ label, target, actual, rate, color }) => (
              <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
                <p className="mb-4 font-semibold text-white">{label}</p>
                <dl className="space-y-3 text-sm">
                  <div className="info-row"><dt>SLA target</dt><dd>{target}</dd></div>
                  <div className="info-row"><dt>Avg actual</dt><dd>{actual}</dd></div>
                </dl>
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Compliance</span>
                    <span className="font-bold text-white">{rate}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/[0.07]">
                    <div
                      className={`h-full rounded-full ${color === 'emerald' ? 'bg-emerald-500' : color === 'sky' ? 'bg-sky-500' : 'bg-amber-500'}`}
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
