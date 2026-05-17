import { useState } from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import DataTable from '@/components/data/DataTable';
import { Button } from '@/components/ui/button';
import { StatusBadge, reportTypeLabel } from '@/components/data/status';
import { useAllReports } from '@/hooks/useReports';
import { reportsApi } from '@/services/api';
import { formatDateTime } from '@/lib/utils';

export default function AllReports() {
  const { reports, isLoading, error, refetch } = useAllReports();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function deleteReport(id: string) {
    if (!window.confirm('Delete this report permanently?')) return;
    setDeleting(id);
    try {
      await reportsApi.remove(id);
      refetch();
    } finally {
      setDeleting(null);
    }
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="All citizen reports"
        description="Government-level visibility into reports, assignments, resolution state, and district demand."
      />

      {error && <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>}

      <DataTable
        columns={['Type', 'Address', 'Reporter', 'Assigned company', 'Status', 'Created', '']}
        data={reports}
        isLoading={isLoading}
        emptyMessage="No reports submitted yet."
        renderRow={(report) => (
          <tr key={report.id} className="text-slate-300">
            <td className="px-5 py-4 font-medium text-white">{reportTypeLabel(report.type)}</td>
            <td className="px-5 py-4">{report.address}</td>
            <td className="px-5 py-4">{report.reporter?.fullName ?? '—'}</td>
            <td className="px-5 py-4">{report.assignedTo?.fullName || 'Unassigned'}</td>
            <td className="px-5 py-4"><StatusBadge value={report.status} /></td>
            <td className="px-5 py-4">{formatDateTime(report.createdAt)}</td>
            <td className="px-5 py-4">
              <Button
                size="sm"
                variant="danger"
                isLoading={deleting === report.id}
                onClick={() => deleteReport(report.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        )}
      />
    </DashboardLayout>
  );
}
