import { useState } from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import DataTable from '@/components/data/DataTable';
import { StatusBadge, reportTypeLabel } from '@/components/data/status';
import { Button } from '@/components/ui/button';
import { useAllReports } from '@/hooks/useReports';
import { reportsApi } from '@/services/api';

export default function PickupRequests() {
  const { reports, isLoading, error, refetch } = useAllReports();
  const [updating, setUpdating] = useState<string | null>(null);

  async function markInProgress(id: string) {
    setUpdating(id);
    try {
      await reportsApi.updateStatus(id, 'IN_PROGRESS');
      refetch();
    } finally {
      setUpdating(null);
    }
  }

  async function markResolved(id: string) {
    setUpdating(id);
    try {
      await reportsApi.updateStatus(id, 'RESOLVED');
      refetch();
    } finally {
      setUpdating(null);
    }
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Incoming pickup requests"
        description="Dispatcher queue for urgent pickups, missed pickups, and overflowing bin reports."
      />

      {error && <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>}

      <DataTable
        columns={['Request', 'Address', 'Reporter', 'Status', 'Action']}
        data={reports}
        isLoading={isLoading}
        emptyMessage="No pickup requests yet."
        renderRow={(report) => (
            <tr key={report.id} className="text-slate-300">
              <td className="px-5 py-4 font-medium text-white">{reportTypeLabel(report.type)}</td>
              <td className="px-5 py-4">{report.address}</td>
              <td className="px-5 py-4">{report.reporter?.fullName ?? '—'}</td>
              <td className="px-5 py-4"><StatusBadge value={report.status} /></td>
              <td className="px-5 py-4 flex gap-2">
                {report.status === 'PENDING' && (
                  <Button
                    size="sm"
                    variant="outline"
                    isLoading={updating === report.id}
                    onClick={() => markInProgress(report.id)}
                  >
                    Accept
                  </Button>
                )}
                {report.status === 'IN_PROGRESS' && (
                  <Button
                    size="sm"
                    isLoading={updating === report.id}
                    onClick={() => markResolved(report.id)}
                  >
                    Resolve
                  </Button>
                )}
              </td>
            </tr>
          )}
        />
    </DashboardLayout>
  );
}
