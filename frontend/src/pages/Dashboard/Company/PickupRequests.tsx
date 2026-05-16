import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import DataTable from '@/components/data/DataTable';
import { StatusBadge, reportTypeLabel } from '@/components/data/status';
import { Button } from '@/components/ui/button';
import { mockReports } from '@/data/mockReports';
import { useAuth } from '@/contexts/AuthContext';

export default function PickupRequests() {
  const { user } = useAuth();
  const requests = mockReports.filter((report) => report.assignedToId === user?.id || !report.assignedToId);
  return (
    <DashboardLayout>
      <PageHeader title="Incoming pickup requests" description="Dispatcher queue for urgent pickups, missed pickups, and overflowing bin reports." />
      <DataTable columns={['Request', 'Address', 'Reporter', 'Status', 'Action']} data={requests} renderRow={(report) => (
        <tr key={report.id} className="text-slate-300">
          <td className="px-5 py-4 font-medium text-white">{reportTypeLabel(report.type)}</td>
          <td className="px-5 py-4">{report.address}</td>
          <td className="px-5 py-4">{report.reporter.fullName}</td>
          <td className="px-5 py-4"><StatusBadge value={report.status} /></td>
          <td className="px-5 py-4"><Button size="sm" variant="outline">Assign driver</Button></td>
        </tr>
      )} />
    </DashboardLayout>
  );
}
