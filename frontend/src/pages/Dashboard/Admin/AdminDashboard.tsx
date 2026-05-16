import { Building2, FileText, MapPin, Truck, Users } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DashboardLayout from '@/components/shared/DashboardLayout';
import MetricGrid from '@/components/data/MetricGrid';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SmartMap from '@/components/maps/SmartMap';
import { mockReports } from '@/data/mockReports';
import { mockTrucks } from '@/data/mockTrucks';
import { mockUsers } from '@/data/mockUsers';

const trend = [{ name: 'Jan', value: 520 }, { name: 'Feb', value: 640 }, { name: 'Mar', value: 710 }, { name: 'Apr', value: 780 }, { name: 'May', value: 850 }];

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <PageHeader eyebrow="Government oversight" title="Rwanda waste management command center" description="Monitor city-wide waste services, company performance, district coverage, and live incident heatmaps." />
      <MetricGrid metrics={[
        { title: 'Households', value: mockUsers.filter((u) => u.role === 'HOUSEHOLD').length.toLocaleString(), subtitle: 'Mock registered accounts', icon: <Users />, color: 'emerald' },
        { title: 'Companies', value: mockUsers.filter((u) => u.role === 'COMPANY').length, subtitle: 'Licensed operators', icon: <Building2 />, color: 'blue' },
        { title: 'Open reports', value: mockReports.filter((r) => r.status !== 'RESOLVED').length, subtitle: 'Across districts', icon: <FileText />, color: 'amber' },
        { title: 'Active trucks', value: mockTrucks.filter((t) => t.status === 'ACTIVE').length, subtitle: 'GPS online', icon: <Truck />, color: 'purple' },
      ]} />
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card><CardHeader><CardTitle>City-wide heatmap and trucks</CardTitle></CardHeader><CardContent><SmartMap trucks={mockTrucks} reports={mockReports} showRoute height="430px" /></CardContent></Card>
        <Card><CardHeader><CardTitle>Coverage trend</CardTitle></CardHeader><CardContent className="h-[430px]"><ResponsiveContainer><AreaChart data={trend}><defs><linearGradient id="coverage" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.45}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" /><XAxis dataKey="name" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip contentStyle={{ background: '#0f1336', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} /><Area dataKey="value" stroke="#10b981" fill="url(#coverage)" strokeWidth={3} /></AreaChart></ResponsiveContainer></CardContent></Card>
      </div>
    </DashboardLayout>
  );
}
