import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import DataTable from '@/components/data/DataTable';
import { Button } from '@/components/ui/button';
import { Input, Select } from '@/components/ui/input';
import { StatusBadge, reportTypeLabel } from '@/components/data/status';
import { mockReports } from '@/data/mockReports';
import { useAuth } from '@/contexts/AuthContext';
import { formatDateTime } from '@/lib/utils';

export default function MyReports() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('ALL');
  const reports = useMemo(() => mockReports
    .filter((report) => report.reporterId === user?.id)
    .filter((report) => status === 'ALL' || report.status === status)
    .filter((report) => `${report.address} ${report.description}`.toLowerCase().includes(query.toLowerCase())), [query, status, user?.id]);

  return (
    <DashboardLayout>
      <PageHeader title="My reports" description="Search and filter your full bin, missed pickup, and urgent pickup reports." actions={<Button asChild><Link to="/dashboard/reports/new"><Plus size={16} /> New report</Link></Button>} />
      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px]">
        <div className="relative"><Search size={16} className="absolute left-3 top-3.5 text-slate-500" /><Input className="pl-9" placeholder="Search reports" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}><option value="ALL">All statuses</option><option value="PENDING">Pending</option><option value="IN_PROGRESS">In progress</option><option value="RESOLVED">Resolved</option><option value="REJECTED">Rejected</option></Select>
      </div>
      <DataTable columns={['Type', 'Location', 'Status', 'Created', 'Company']} data={reports} renderRow={(report) => (
        <tr key={report.id} className="text-slate-300">
          <td className="px-5 py-4 font-medium text-white">{reportTypeLabel(report.type)}</td>
          <td className="px-5 py-4">{report.address}</td>
          <td className="px-5 py-4"><StatusBadge value={report.status} /></td>
          <td className="px-5 py-4">{formatDateTime(report.createdAt)}</td>
          <td className="px-5 py-4">{report.assignedTo?.fullName || 'Unassigned'}</td>
        </tr>
      )} />
    </DashboardLayout>
  );
}
