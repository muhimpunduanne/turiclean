import { FormEvent, useMemo, useState } from 'react';
import { CalendarDays, Check, CheckCircle2, CreditCard, Receipt, ShieldCheck, Smartphone, Wallet } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Select } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import DataTable from '@/components/data/DataTable';
import { StatusBadge } from '@/components/data/status';
import { mockPayments, servicePlans } from '@/data/mockPayments';
import { PaymentMethod } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency, formatDateTime } from '@/lib/utils';

export default function PaymentPage() {
  const { user } = useAuth();
  const [planId, setPlanId] = useState(servicePlans[1].id);
  const [method, setMethod] = useState(PaymentMethod.MOMO);
  const [paid, setPaid] = useState(false);
  const plan = useMemo(() => servicePlans.find((item) => item.id === planId) || servicePlans[0], [planId]);
  const userPayments = mockPayments.filter((payment) => payment.userId === user?.id);
  const successfulPayments = userPayments.filter((payment) => payment.status === 'COMPLETED');
  const totalPaid = successfulPayments.reduce((sum, payment) => sum + payment.amount, 0);

  function submit(event: FormEvent) {
    event.preventDefault();
    setPaid(true);
  }

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Digital payments"
        title="Pay for waste collection services"
        description="Choose a service plan, confirm the collection fee, and complete a secure mock transaction for your household."
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-emerald-500/12 text-emerald-300"><Wallet size={20} /></span>
            <div>
              <p className="text-sm text-slate-400">Total paid</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(totalPaid)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-sky-500/12 text-sky-300"><Receipt size={20} /></span>
            <div>
              <p className="text-sm text-slate-400">Transactions</p>
              <p className="text-2xl font-bold text-white">{userPayments.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-amber-500/12 text-amber-300"><CalendarDays size={20} /></span>
            <div>
              <p className="text-sm text-slate-400">Current plan</p>
              <p className="text-2xl font-bold text-white">{plan.name}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle>Complete payment</CardTitle>
            <p className="mt-1 text-sm text-slate-400">Mobile Money and card payments are mocked for the presentation environment.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Service plan</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {servicePlans.map((item) => {
                    const selected = item.id === planId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPlanId(item.id)}
                        className={`focus-ring rounded-lg border p-4 text-left transition hover:-translate-y-0.5 ${
                          selected ? 'border-emerald-400/60 bg-emerald-500/10 shadow-lg shadow-emerald-500/10' : 'border-white/10 bg-white/[0.035] hover:border-white/20'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-white">{item.name}</span>
                          {selected ? <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white"><Check size={14} /></span> : item.popular ? <Badge tone="emerald">Popular</Badge> : null}
                        </span>
                        <span className="mt-2 block text-2xl font-bold text-white">{formatCurrency(item.price)}</span>
                        <span className="text-xs text-slate-500">{item.frequency}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Payment method</label>
                  <Select value={method} onChange={(e) => setMethod(e.target.value as PaymentMethod)}>
                    <option value={PaymentMethod.MOMO}>MTN/Airtel Mobile Money</option>
                    <option value={PaymentMethod.CARD}>Card</option>
                    <option value={PaymentMethod.BANK_TRANSFER}>Bank transfer</option>
                  </Select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Account</label>
                  <Input placeholder="Payment phone or account" defaultValue={user?.phone} />
                </div>
              </div>

              <div className="rounded-lg border border-emerald-400/20 bg-emerald-500/[0.055] p-4">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/15 text-emerald-300">
                    {method === PaymentMethod.MOMO ? <Smartphone size={18} /> : <CreditCard size={18} />}
                  </span>
                  <div>
                    <p className="font-semibold text-white">Payment summary</p>
                    <p className="text-xs text-slate-400">Secure mock checkout for {user?.fullName}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex justify-between gap-4"><span>Service</span><span className="font-medium text-slate-200">{plan.name}</span></div>
                  <div className="flex justify-between gap-4"><span>Billing</span><span className="font-medium text-slate-200">{plan.frequency}</span></div>
                  <div className="flex justify-between gap-4"><span>Method</span><span className="font-medium text-slate-200">{method.replace('_', ' ')}</span></div>
                </div>
                <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-xl font-bold text-white"><span>Total</span><span>{formatCurrency(plan.price)}</span></div>
              </div>
              {paid && <p className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300"><CheckCircle2 size={16} /> Payment submitted successfully. A digital receipt is ready.</p>}
              <Button type="submit" className="w-full" size="lg"><ShieldCheck size={18} /> Confirm and pay</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {servicePlans.map((item) => (
              <Card key={item.id} className={`p-4 ${item.id === planId ? 'ring-1 ring-emerald-400/30' : ''}`}>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-white">{item.name}</p>
                  {item.popular && <Badge tone="emerald">Popular</Badge>}
                </div>
                <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">{formatCurrency(item.price)}</p>
                    <p className="text-xs text-slate-500">{item.frequency}</p>
                  </div>
                  <Button type="button" size="sm" variant={item.id === planId ? 'primary' : 'outline'} onClick={() => setPlanId(item.id)}>
                    {item.id === planId ? 'Selected' : 'Choose'}
                  </Button>
                </div>
                <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
                  {item.features.slice(0, 3).map((feature) => (
                    <p key={feature} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 size={14} className="text-emerald-300" /> {feature}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Transaction history</h2>
              <Badge tone="sky">{userPayments.length} records</Badge>
            </div>
            <DataTable columns={['Description', 'Amount', 'Method', 'Status', 'Date']} data={userPayments} renderRow={(payment) => (
              <tr key={payment.id} className="text-slate-300">
                <td className="px-5 py-4"><span className="flex items-center gap-2 font-medium text-white"><Receipt size={16} /> {payment.description}</span></td>
                <td className="px-5 py-4 font-semibold text-white">{formatCurrency(payment.amount)}</td>
                <td className="px-5 py-4">{payment.method.replace('_', ' ')}</td>
                <td className="px-5 py-4"><StatusBadge value={payment.status} /></td>
                <td className="px-5 py-4">{formatDateTime(payment.createdAt)}</td>
              </tr>
            )} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
