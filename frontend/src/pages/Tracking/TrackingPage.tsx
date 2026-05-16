import { useEffect, useMemo, useState } from 'react';
import { Clock, Navigation, Radio, Truck } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import SmartMap from '@/components/maps/SmartMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockTrucks } from '@/data/mockTrucks';
import { Truck as TruckType } from '@/types';

function moveTruck(truck: TruckType, tick: number): TruckType {
  if (!truck.latitude || !truck.longitude || truck.status !== 'ACTIVE') return truck;
  const offset = Math.sin(tick / 4 + truck.id.length) * 0.0012;
  return { ...truck, latitude: truck.latitude + offset, longitude: truck.longitude + offset / 2, lastUpdated: new Date().toISOString() };
}

export default function TrackingPage() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 2500);
    return () => window.clearInterval(timer);
  }, []);
  const trucks = useMemo(() => mockTrucks.map((truck) => moveTruck(truck, tick)), [tick]);
  const active = trucks.filter((truck) => truck.status === 'ACTIVE');

  return (
    <DashboardLayout>
      <PageHeader eyebrow="Real-time tracking" title="Live truck tracking" description="Interactive GPS map showing truck locations, route paths, estimated arrival times, and live status from mock GPS data." />
      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
        <Card><CardHeader><CardTitle>Rwanda smart collection map</CardTitle></CardHeader><CardContent><SmartMap trucks={trucks} showRoute height="620px" /></CardContent></Card>
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between"><p className="text-sm text-slate-400">GPS feed</p><Badge tone="emerald"><Radio size={12} /> Live</Badge></div>
            <p className="mt-3 text-3xl font-bold text-white">{active.length} trucks online</p>
            <p className="mt-1 text-sm text-slate-500">Updated every 2.5 seconds</p>
          </Card>
          {active.slice(0, 6).map((truck, index) => (
            <Card key={truck.id} className="p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/12 text-emerald-300"><Truck size={18} /></span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">{truck.licensePlate}</p>
                  <p className="truncate text-sm text-slate-400">{truck.currentRoute}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Navigation size={13} /> {truck.speed} km/h</span>
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
