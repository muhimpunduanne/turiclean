import { Clock, Navigation, Radio, Truck } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import SmartMap from '@/components/maps/SmartMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useLiveTrucks } from '@/hooks/useLiveTrucks';

export default function TrackingPage() {
  const trucks = useLiveTrucks();
  const active = trucks.filter((t) => t.status === 'ACTIVE');

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Real-time tracking"
        title="Live truck tracking"
        description="Interactive GPS map showing truck locations, route paths, and estimated arrival times."
      />
      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
        <Card>
          <CardHeader><CardTitle>Rwanda smart collection map</CardTitle></CardHeader>
          <CardContent><SmartMap trucks={trucks} showRoute height="620px" /></CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">GPS feed</p>
              <Badge tone="emerald"><Radio size={12} /> Live</Badge>
            </div>
            <p className="mt-3 text-3xl font-bold text-white">{active.length} trucks online</p>
            <p className="mt-1 text-sm text-slate-500">Updated every 2.5 seconds</p>
          </Card>

          {trucks.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                </Card>
              ))
            : active.slice(0, 6).map((truck, index) => (
                <Card key={truck.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/12 text-emerald-300">
                      <Truck size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white">{truck.licensePlate}</p>
                      <p className="truncate text-sm text-slate-400">{truck.currentRoute || 'En route'}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                        {truck.speed != null && (
                          <span className="flex items-center gap-1"><Navigation size={13} /> {truck.speed} km/h</span>
                        )}
                        <span className="flex items-center gap-1"><Clock size={13} /> ETA {8 + index * 3}m</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
