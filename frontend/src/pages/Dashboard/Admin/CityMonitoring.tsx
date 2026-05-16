import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SmartMap from '@/components/maps/SmartMap';
import { mockReports } from '@/data/mockReports';
import { mockTrucks } from '@/data/mockTrucks';

export default function CityMonitoring() {
  return (
    <DashboardLayout>
      <PageHeader title="City monitoring" description="Live map of trucks, report hotspots, missed pickup clusters, and active route paths." />
      <Card><CardHeader><CardTitle>Kigali live operations map</CardTitle></CardHeader><CardContent><SmartMap trucks={mockTrucks} reports={mockReports} showRoute height="620px" /></CardContent></Card>
    </DashboardLayout>
  );
}
