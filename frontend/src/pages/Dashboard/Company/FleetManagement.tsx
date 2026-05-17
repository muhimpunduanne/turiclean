import { useState } from 'react';
import { Fuel, Gauge, Plus, Truck } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { StatusBadge } from '@/components/data/status';
import { useMyTrucks } from '@/hooks/useTrucks';
import { trucksApi } from '@/services/api';

export default function FleetManagement() {
  const { trucks, isLoading, refetch } = useMyTrucks();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ licensePlate: '', capacity: '1000', driverName: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function addTruck() {
    setSaving(true);
    setError('');
    try {
      await trucksApi.create({
        licensePlate: form.licensePlate,
        capacity: parseInt(form.capacity),
        driverName: form.driverName || undefined,
      });
      setAdding(false);
      setForm({ licensePlate: '', capacity: '1000', driverName: '' });
      refetch();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to add truck');
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Fleet management"
        description="Truck status, driver assignment, speed, fuel level, and current route."
        actions={
          <Button onClick={() => setAdding((v) => !v)}>
            <Plus size={16} /> {adding ? 'Cancel' : 'Add truck'}
          </Button>
        }
      />

      {adding && (
        <div className="mb-6 rounded-xl border border-white/10 bg-white/3 p-5">
          <p className="mb-4 text-sm font-semibold text-white">Register new truck</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Input
              placeholder="License plate (e.g. RAB 123A)"
              value={form.licensePlate}
              onChange={(e) => setForm({ ...form, licensePlate: e.target.value })}
            />
            <Input
              placeholder="Capacity (kg)"
              type="number"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            />
            <Input
              placeholder="Driver name (optional)"
              value={form.driverName}
              onChange={(e) => setForm({ ...form, driverName: e.target.value })}
            />
          </div>
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          <Button className="mt-4" onClick={addTruck} isLoading={saving} disabled={!form.licensePlate} loadingText="Saving...">
            Save truck
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-44 rounded-xl" />)}
        </div>
      ) : trucks.length === 0 ? (
        <p className="text-sm text-slate-500">No trucks registered yet. Add your first truck above.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trucks.map((truck) => (
            <Card key={truck.id} className="p-5">
              <div className="flex items-start justify-between">
                <Truck className="text-emerald-300" />
                <StatusBadge value={truck.status} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-white">{truck.licensePlate}</h3>
              <p className="text-sm text-slate-400">{truck.driverName || 'No driver assigned'}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {truck.speed != null && (
                  <p className="flex items-center gap-2 text-slate-300"><Gauge size={16} /> {truck.speed} km/h</p>
                )}
                {truck.fuelLevel != null && (
                  <p className="flex items-center gap-2 text-slate-300"><Fuel size={16} /> {truck.fuelLevel}%</p>
                )}
              </div>
              {truck.currentRoute && (
                <p className="mt-4 rounded-lg bg-white/4 p-3 text-sm text-slate-300">{truck.currentRoute}</p>
              )}
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
