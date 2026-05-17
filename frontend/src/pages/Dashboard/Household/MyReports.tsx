import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Search } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import DataTable from '@/components/data/DataTable';
import { Button } from '@/components/ui/button';
import { Input, Select } from '@/components/ui/input';
import { StatusBadge, reportTypeLabel } from '@/components/data/status';
import { useMyReports } from '@/hooks/useReports';
import { formatDateTime } from '@/lib/utils';

export default function MyReports() {
  const { reports, isLoading, error } = useMyReports();
  const [query, setQuery]   = useState('');
  const [status, setStatus] = useState('ALL');

  const filtered = useMemo(() =>
    reports
      .filter((r) => status === 'ALL' || r.status === status)
      .filter((r) => `${r.address} ${r.description ?? ''}`.toLowerCase().includes(query.toLowerCase())),
    [reports, query, status],
  );

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Reports"
        title="My reports"
        description="Search and filter your full bin, missed pickup, and urgent pickup reports."
        actions={
          <Button asChild size="sm" className="gap-1.5">
            <Link to="/dashboard/reports/new"><Plus size={14} /> New report</Link>
          </Button>
        }
      />

      {/* Filter bar */}
      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_200px]">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <Input
            className="pl-9"
            placeholder="Search by address or description…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ALL">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="REJECTED">Rejected</option>
        </Select>
      </div>

      {error && (
        <p className="mb-4 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">{error}</p>
      )}

      <DataTable
        columns={['Type', 'Location', 'Status', 'Submitted', 'Assigned to']}
        data={filtered}
        isLoading={isLoading}
        emptyMessage={query || status !== 'ALL' ? 'No reports match your filters.' : 'No reports submitted yet.'}
        emptyIcon={<FileText size={22} />}
        renderRow={(report) => (
          <tr key={report.id} className="text-slate-300">
            <td className="px-5 py-4 font-semibold text-white">{reportTypeLabel(report.type)}</td>
            <td className="px-5 py-4 max-w-52 truncate">{report.address}</td>
            <td className="px-5 py-4"><StatusBadge value={report.status} /></td>
            <td className="px-5 py-4 tabular-nums">{formatDateTime(report.createdAt)}</td>
            <td className="px-5 py-4">{report.assignedTo?.fullName ?? <span className="text-slate-600">Unassigned</span>}</td>
          </tr>
        )}
      />
    </DashboardLayout>
  );
}
