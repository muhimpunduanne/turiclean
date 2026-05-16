import { MapPin } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const districts = [
  { name: 'Gasabo', reports: 42, resolved: 31, coverage: 91, companies: 3 },
  { name: 'Kicukiro', reports: 28, resolved: 23, coverage: 87, companies: 2 },
  { name: 'Nyarugenge', reports: 35, resolved: 27, coverage: 84, companies: 3 },
  { name: 'Musanze', reports: 18, resolved: 15, coverage: 78, companies: 1 },
  { name: 'Huye', reports: 16, resolved: 12, coverage: 74, companies: 1 },
  { name: 'Rubavu', reports: 21, resolved: 16, coverage: 76, companies: 2 },
];

export default function DistrictOverview() {
  return (
    <DashboardLayout>
      <PageHeader title="District-level oversight" description="Coverage, report load, company allocation, and resolution performance by district." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {districts.map((district) => (
          <Card key={district.name} className="p-5">
            <div className="flex items-start justify-between"><MapPin className="text-sky-300" /><Badge tone={district.coverage > 85 ? 'emerald' : 'amber'}>{district.coverage}% coverage</Badge></div>
            <h3 className="mt-4 text-xl font-bold text-white">{district.name}</h3>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-white/[0.04] p-3"><p className="font-bold text-white">{district.reports}</p><p className="text-xs text-slate-500">reports</p></div>
              <div className="rounded-lg bg-white/[0.04] p-3"><p className="font-bold text-white">{district.resolved}</p><p className="text-xs text-slate-500">resolved</p></div>
              <div className="rounded-lg bg-white/[0.04] p-3"><p className="font-bold text-white">{district.companies}</p><p className="text-xs text-slate-500">firms</p></div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
