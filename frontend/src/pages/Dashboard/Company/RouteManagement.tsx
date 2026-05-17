import { Map, Route } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import SmartMap from '@/components/maps/SmartMap';
import { Badge } from '@/components/ui/badge';
import { useMyTrucks } from '@/hooks/useTrucks';
import { useLiveTrucks } from '@/hooks/useLiveTrucks';

export default function RouteManagement() {
  const { trucks: raw, isLoading } = useMyTrucks();
  const trucks = useLiveTrucks(raw);

  return (
    <DashboardLayout>
      <PageHeader
        title="Route management"
        description="Optimize active routes, monitor ETAs, and balance driver workload."
      />
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader><CardTitle>Route paths</CardTitle></CardHeader>
          <CardContent><SmartMap trucks={trucks} showRoute height="480px" /></CardContent>
        </Card>

        <div className="space-y-4">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)
            : trucks.length === 0
              ? <p className="text-sm text-slate-500">No trucks in fleet yet.</p>
              : trucks.map((truck) => (
                  <Card key={truck.id} className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-white">{truck.currentRoute || 'Route not set'}</p>
                      <Badge tone="emerald">ETA {truck.speed ? Math.max(7, 38 - truck.speed) : 45}m</Badge>
                    </div>
                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                      <Route size={16} /> {truck.licensePlate}
                      {truck.driverName && ` — ${truck.driverName}`}
                    </p>
                  </Card>
                ))}
          <Card className="p-4 text-sm text-slate-400">
            <Map className="mb-3 text-sky-300" />
            Smart route sequencing prioritizes urgent pickups, full bin clusters, and district service windows.
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
