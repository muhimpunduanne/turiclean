import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'COTRACO', response: 93, coverage: 89 },
  { name: 'Agruni', response: 88, coverage: 84 },
  { name: 'Baheza', response: 79, coverage: 81 },
];

export default function PerformanceAnalytics() {
  return (
    <DashboardLayout>
      <PageHeader title="Performance analytics" description="Compare operator response rates, coverage, missed pickup risk, and SLA compliance." />
      <Card><CardHeader><CardTitle>Company scorecard</CardTitle></CardHeader><CardContent className="h-[480px]"><ResponsiveContainer><BarChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" /><XAxis dataKey="name" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip contentStyle={{ background: '#0f1336', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} /><Bar dataKey="response" fill="#10b981" radius={[6, 6, 0, 0]} /><Bar dataKey="coverage" fill="#0ea5e9" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></CardContent></Card>
    </DashboardLayout>
  );
}
