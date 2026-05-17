import { useState, useEffect, useCallback } from 'react';
import { Truck } from '@/types';
import { trucksApi } from '@/services/api';

export function useMyTrucks() {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await trucksApi.getMyTrucks();
      setTrucks(data);
    } catch {
      setError('Failed to load trucks');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { trucks, isLoading, error, refetch: fetch };
}
