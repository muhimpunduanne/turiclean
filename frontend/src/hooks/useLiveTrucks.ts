import { useEffect, useMemo, useState } from 'react';
import { Truck, TruckStatus } from '@/types';

export function useLiveTrucks(source: Truck[]) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 2500);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => source.map((truck) => {
    if (truck.status !== TruckStatus.ACTIVE || !truck.latitude || !truck.longitude) return truck;
    const offset = Math.sin(tick / 4 + truck.licensePlate.length) * 0.001;
    return { ...truck, latitude: truck.latitude + offset, longitude: truck.longitude + offset / 2, lastUpdated: new Date().toISOString() };
  }), [source, tick]);
}
