import { Building2 } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import DataTable from '@/components/data/DataTable';
import { Badge } from '@/components/ui/badge';
import { mockUsers } from '@/data/mockUsers';
import { Role } from '@/types';

export default function CompanyManagement() {
  const companies = mockUsers.filter((user) => user.role === Role.COMPANY);
  return (
    <DashboardLayout>
      <PageHeader title="Company management" description="Licensed waste collection companies, contacts, coverage role, and performance status." />
      <DataTable columns={['Company', 'Contact', 'Phone', 'License', 'Status']} data={companies} renderRow={(company) => (
        <tr key={company.id} className="text-slate-300">
          <td className="px-5 py-4"><span className="flex items-center gap-2 font-medium text-white"><Building2 size={16} /> {company.fullName}</span></td>
          <td className="px-5 py-4">{company.email}</td>
          <td className="px-5 py-4">{company.phone}</td>
          <td className="px-5 py-4">RWA-WASTE-{company.id.slice(-3).toUpperCase()}</td>
          <td className="px-5 py-4"><Badge tone="emerald">Compliant</Badge></td>
        </tr>
      )} />
    </DashboardLayout>
  );
}
