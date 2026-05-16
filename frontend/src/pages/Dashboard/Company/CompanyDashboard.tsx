import { BarChart3, CheckCircle2, ClipboardList, Truck } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DashboardLayout from '@/components/shared/DashboardLayout';
import MetricGrid from '@/components/data/MetricGrid';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockReports } from '@/data/mockReports';
import { mockTrucks } from '@/data/mockTrucks';
import { useAuth } from '@/contexts/AuthContext';
import SmartMap from '@/components/maps/SmartMap';

const weekly = [{ name: 'Mon', value: 42 }, { name: 'Tue', value: 55 }, { name: 'Wed', value: 48 }, { name: 'Thu', value: 61 }, { name: 'Fri', value: 70 }, { name: 'Sat', value: 36 }];

export default function CompanyDashboard() {
  const { user } = useAuth();
  const reports = mockReports.filter((report) => report.assignedToId === user?.id || !report.assignedToId);
  const trucks = mockTrucks.filter((truck) => truck.companyId === user?.id);
  return (
    <DashboardLayout>
      <PageHeader eyebrow="Company operations" title={user?.fullName || 'Company dashboard'} description="Manage incoming requests, fleet movement, route performance, and customer service reports." />
      <MetricGrid metrics={[
        { title: 'Incoming requests', value: reports.filter((r) => r.status === 'PENDING').length, subtitle: 'Need dispatcher review', icon: <ClipboardList />, color: 'amber' },
        { title: 'Active trucks', value: trucks.filter((t) => t.status === 'ACTIVE').length, subtitle: `${trucks.length} in fleet`, icon: <Truck />, color: 'emerald' },
        { title: 'Resolved reports', value: reports.filter((r) => r.status === 'RESOLVED').length, subtitle: 'This service cycle', icon: <CheckCircle2 />, color: 'blue' },
        { title: 'Response rate', value: '91%', subtitle: 'Target 95%', icon: <BarChart3 />, color: 'purple', trend: { value: 7, label: 'vs last week' } },
      ]} />
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card><CardHeader><CardTitle>Fleet tracking</CardTitle></CardHeader><CardContent><SmartMap trucks={trucks} reports={reports.slice(0, 5)} showRoute height="380px" /></CardContent></Card>
        <Card><CardHeader><CardTitle>Collections completed</CardTitle></CardHeader><CardContent className="h-[380px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={weekly}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" /><XAxis dataKey="name" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip contentStyle={{ background: '#0f1336', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} /><Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></CardContent></Card>
      </div>
    </DashboardLayout>
  );
}
