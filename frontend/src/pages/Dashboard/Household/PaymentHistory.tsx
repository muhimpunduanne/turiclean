import { Link } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import DataTable from '@/components/data/DataTable';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/data/status';
import { mockPayments } from '@/data/mockPayments';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency, formatDateTime } from '@/lib/utils';

export default function PaymentHistory() {
  const { user } = useAuth();
  const payments = mockPayments.filter((payment) => payment.userId === user?.id);
  return (
    <DashboardLayout>
      <PageHeader title="Payment history" description="Review invoices, digital transactions, service plans, and receipts." actions={<Button asChild><Link to="/dashboard/payments/new"><CreditCard size={16} /> Make payment</Link></Button>} />
      <DataTable columns={['Description', 'Amount', 'Method', 'Status', 'Reference', 'Date']} data={payments} renderRow={(payment) => (
        <tr key={payment.id} className="text-slate-300">
          <td className="px-5 py-4 font-medium text-white">{payment.description}</td>
          <td className="px-5 py-4">{formatCurrency(payment.amount)}</td>
          <td className="px-5 py-4">{payment.method}</td>
          <td className="px-5 py-4"><StatusBadge value={payment.status} /></td>
          <td className="px-5 py-4">{payment.transactionRef}</td>
          <td className="px-5 py-4">{formatDateTime(payment.createdAt)}</td>
        </tr>
      )} />
    </DashboardLayout>
  );
}
