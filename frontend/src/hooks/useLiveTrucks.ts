import { useEffect, useMemo, useState } from 'react';
import { Truck, TruckStatus } from '@/types';
import { trucksApi } from '@/services/api';

/** Accepts an optional external source array (company-owned trucks).
 *  When no source is passed, fetches all active trucks from the backend. */
export function useLiveTrucks(source?: Truck[]) {
  const [fetched, setFetched] = useState<Truck[]>([]);
  const [tick, setTick] = useState(0);

  // Fetch all active trucks when no external source is provided
  useEffect(() => {
    if (source) return;
    let cancelled = false;
    trucksApi.getActiveTrucks()
      .then((data) => { if (!cancelled) setFetched(data); })
      .catch(() => null);
    return () => { cancelled = true; };
  }, [source]);

  // Animate truck positions every 2.5 s
  useEffect(() => {
    const timer = window.setInterval(() => setTick((v) => v + 1), 2500);
    return () => window.clearInterval(timer);
  }, []);

  const base = source ?? fetched;

  return useMemo(() => base.map((truck) => {
    if (truck.status !== TruckStatus.ACTIVE || !truck.latitude || !truck.longitude) return truck;
    const offset = Math.sin(tick / 4 + truck.licensePlate.length) * 0.001;
    return {
      ...truck,
      latitude: truck.latitude + offset,
      longitude: truck.longitude + offset / 2,
      lastUpdated: new Date().toISOString(),
    };
  }), [base, tick]);
}
