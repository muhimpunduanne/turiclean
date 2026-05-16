import { Fuel, Gauge, Truck } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/data/status';
import { mockTrucks } from '@/data/mockTrucks';
import { useAuth } from '@/contexts/AuthContext';

export default function FleetManagement() {
  const { user } = useAuth();
  const fleet = mockTrucks.filter((truck) => truck.companyId === user?.id);
  return (
    <DashboardLayout>
      <PageHeader title="Fleet management" description="Truck status, driver assignment, speed, fuel level, and current route." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {fleet.map((truck) => (
          <Card key={truck.id} className="p-5">
            <div className="flex items-start justify-between"><Truck className="text-emerald-300" /><StatusBadge value={truck.status} /></div>
            <h3 className="mt-4 text-xl font-bold text-white">{truck.licensePlate}</h3>
            <p className="text-sm text-slate-400">{truck.driverName}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <p className="flex items-center gap-2 text-slate-300"><Gauge size={16} /> {truck.speed} km/h</p>
              <p className="flex items-center gap-2 text-slate-300"><Fuel size={16} /> {truck.fuelLevel}%</p>
            </div>
            <p className="mt-4 rounded-lg bg-white/[0.04] p-3 text-sm text-slate-300">{truck.currentRoute}</p>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
