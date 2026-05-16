import { useMemo } from 'react';
import { WasteReport } from '@/types';

export function useFilteredReports(reports: WasteReport[], query: string, status = 'ALL') {
  return useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return reports
      .filter((report) => status === 'ALL' || report.status === status)
      .filter((report) => !normalized || `${report.address} ${report.description} ${report.reporter.fullName}`.toLowerCase().includes(normalized));
  }, [reports, query, status]);
}
