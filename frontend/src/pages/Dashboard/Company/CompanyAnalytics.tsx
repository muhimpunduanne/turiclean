import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const response = [{ name: 'Week 1', value: 82 }, { name: 'Week 2', value: 88 }, { name: 'Week 3', value: 91 }, { name: 'Week 4', value: 94 }];
const mix = [{ name: 'Full bins', value: 46 }, { name: 'Missed pickups', value: 29 }, { name: 'Urgent', value: 25 }];
const colors = ['#10b981', '#0ea5e9', '#f59e0b'];

export default function CompanyAnalytics() {
  return (
    <DashboardLayout>
      <PageHeader title="Company analytics" description="Operational performance, request mix, response time, and collection trends." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card><CardHeader><CardTitle>Response rate</CardTitle></CardHeader><CardContent className="h-80"><ResponsiveContainer><LineChart data={response}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" /><XAxis dataKey="name" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip contentStyle={{ background: '#0f1336', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} /><Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} /></LineChart></ResponsiveContainer></CardContent></Card>
        <Card><CardHeader><CardTitle>Request mix</CardTitle></CardHeader><CardContent className="h-80"><ResponsiveContainer><PieChart><Pie data={mix} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110}>{mix.map((entry, index) => <Cell key={entry.name} fill={colors[index]} />)}</Pie><Tooltip contentStyle={{ background: '#0f1336', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} /></PieChart></ResponsiveContainer></CardContent></Card>
      </div>
    </DashboardLayout>
  );
}
