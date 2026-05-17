import { type ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface DataTableProps<T> {
  columns: string[];
  data: T[];
  renderRow: (item: T, index: number) => ReactNode;
  isLoading?: boolean;
  skeletonRows?: number;
  emptyMessage?: string;
  emptyIcon?: ReactNode;
}

export default function DataTable<T>({
  columns,
  data,
  renderRow,
  isLoading,
  skeletonRows = 5,
  emptyMessage = 'No data found.',
  emptyIcon,
}: DataTableProps<T>) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-160 text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.07] bg-white/2.5">
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          {isLoading ? (
            <tbody>
              {Array.from({ length: skeletonRows }).map((_, i) => (
                <tr key={i} className="border-b border-white/4">
                  {columns.map((col) => (
                    <td key={col} className="px-5 py-4">
                      <Skeleton className="h-4 w-full max-w-32 rounded" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : data.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    {emptyIcon && <span className="text-slate-600">{emptyIcon}</span>}
                    <p className="text-sm text-slate-500">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="divide-y divide-white/5 *:transition-colors *:duration-100 hover:*:bg-white/2.5">
              {data.map((item, i) => renderRow(item, i))}
            </tbody>
          )}
        </table>
      </div>
    </Card>
  );
}
