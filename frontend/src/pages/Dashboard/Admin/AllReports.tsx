import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import DataTable from '@/components/data/DataTable';
import { StatusBadge, reportTypeLabel } from '@/components/data/status';
import { mockReports } from '@/data/mockReports';
import { formatDateTime } from '@/lib/utils';

export default function AllReports() {
  return (
    <DashboardLayout>
      <PageHeader title="All citizen reports" description="Government-level visibility into reports, assignments, resolution state, and district demand." />
      <DataTable columns={['Type', 'Address', 'Reporter', 'Assigned company', 'Status', 'Created']} data={mockReports} renderRow={(report) => (
        <tr key={report.id} className="text-slate-300">
          <td className="px-5 py-4 font-medium text-white">{reportTypeLabel(report.type)}</td>
          <td className="px-5 py-4">{report.address}</td>
          <td className="px-5 py-4">{report.reporter.fullName}</td>
          <td className="px-5 py-4">{report.assignedTo?.fullName || 'Unassigned'}</td>
          <td className="px-5 py-4"><StatusBadge value={report.status} /></td>
          <td className="px-5 py-4">{formatDateTime(report.createdAt)}</td>
        </tr>
      )} />
    </DashboardLayout>
  );
}
