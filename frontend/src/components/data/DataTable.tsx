import { type ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface DataTableProps<T> {
  columns: string[];
  data: T[];
  renderRow: (item: T) => ReactNode;
}

export default function DataTable<T>({ columns, data, renderRow }: DataTableProps<T>) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wider text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-5 py-3 font-semibold">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">{data.map(renderRow)}</tbody>
        </table>
      </div>
    </Card>
  );
}
