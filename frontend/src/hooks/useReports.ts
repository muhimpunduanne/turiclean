import { useState, useEffect, useCallback } from 'react';
import { WasteReport } from '@/types';
import { reportsApi } from '@/services/api';

export function useMyReports() {
  const [reports, setReports] = useState<WasteReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await reportsApi.getMyReports();
      setReports(data);
    } catch {
      setError('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { reports, isLoading, error, refetch: fetch };
}

export function useAllReports(params?: { status?: string; type?: string; assignedToId?: string }) {
  const [reports, setReports] = useState<WasteReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await reportsApi.getAll(params);
      setReports(data);
    } catch {
      setError('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => { fetch(); }, [fetch]);

  return { reports, isLoading, error, refetch: fetch };
}
