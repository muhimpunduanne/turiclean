import { Calendar } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockSchedules } from '@/data/mockPayments';

export default function CollectionSchedule() {
  return (
    <DashboardLayout>
      <PageHeader title="Collection schedule" description="Upcoming household pickup windows by district, sector, company, and truck." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockSchedules.map((schedule) => (
          <Card key={schedule.id} className="p-5">
            <div className="flex items-start justify-between gap-3"><Calendar className="text-emerald-300" /><Badge tone={schedule.status === 'completed' ? 'emerald' : 'sky'}>{schedule.status}</Badge></div>
            <h3 className="mt-4 text-lg font-semibold text-white">{schedule.day}, {schedule.time}</h3>
            <p className="mt-2 text-sm text-slate-400">{schedule.sector}, {schedule.district}</p>
            <p className="mt-4 text-sm text-slate-300">{schedule.companyName}</p>
            <p className="text-xs text-slate-500">Truck {schedule.truckPlate}</p>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
