import { Building2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import DataTable from '@/components/data/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAllUsers } from '@/hooks/useUsers';
import { usersApi } from '@/services/api';
import { Role } from '@/types';
import { getInitials } from '@/lib/utils';

export default function CompanyManagement() {
  const { users, isLoading, error, refetch } = useAllUsers();
  const [deleting, setDeleting] = useState<string | null>(null);
  const companies = users.filter((u) => u.role === Role.COMPANY);

  async function removeCompany(id: string) {
    if (!window.confirm('Remove this company account permanently?')) return;
    setDeleting(id);
    try {
      await usersApi.remove(id);
      refetch();
    } finally {
      setDeleting(null);
    }
  }

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Admin"
        title="Company management"
        description="Licensed waste collection companies, contacts, license numbers, compliance status, and accounts."
      />

      {error && <p className="mb-4 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">{error}</p>}

      <DataTable
        columns={['Company', 'Email', 'Phone', 'License ID', 'Status', '']}
        data={companies}
        isLoading={isLoading}
        emptyMessage="No companies registered yet."
        emptyIcon={<Building2 size={22} />}
        renderRow={(company) => (
          <tr key={company.id} className="text-slate-300">
            <td className="px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-xs font-black text-sky-400 ring-1 ring-sky-500/20">
                  {getInitials(company.fullName)}
                </div>
                <span className="font-semibold text-white">{company.fullName}</span>
              </div>
            </td>
            <td className="px-5 py-4 text-slate-400">{company.email}</td>
            <td className="px-5 py-4">{company.phone ?? <span className="text-slate-600">—</span>}</td>
            <td className="px-5 py-4 font-mono text-xs text-slate-400">RWA-{company.id.slice(-6).toUpperCase()}</td>
            <td className="px-5 py-4"><Badge tone="emerald" dot>Compliant</Badge></td>
            <td className="px-5 py-4">
              <Button
                size="sm"
                variant="danger"
                isLoading={deleting === company.id}
                onClick={() => removeCompany(company.id)}
              >
                <Trash2 size={13} />
              </Button>
            </td>
          </tr>
        )}
      />
    </DashboardLayout>
  );
}
