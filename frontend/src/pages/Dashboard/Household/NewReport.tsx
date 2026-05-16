import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, MapPin } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Select, Textarea } from '@/components/ui/input';
import { ReportType } from '@/types';

export default function NewReport() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => navigate('/dashboard/reports'), 900);
  }

  return (
    <DashboardLayout>
      <PageHeader title="Create report" description="Submit a full bin, missed pickup, or urgent pickup request with location details." />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader><CardTitle>Report details</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <Select required defaultValue={ReportType.FULL_BIN}><option value={ReportType.FULL_BIN}>Full waste bin</option><option value={ReportType.MISSED_PICKUP}>Missed pickup</option><option value={ReportType.URGENT_PICKUP}>Urgent pickup</option></Select>
              <Input placeholder="Address or landmark" required />
              <div className="grid gap-3 sm:grid-cols-2"><Input placeholder="Latitude" defaultValue="-1.9506" /><Input placeholder="Longitude" defaultValue="29.8619" /></div>
              <Textarea placeholder="Describe the issue, waste type, access notes, or urgency level" required />
              {saved && <p className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300"><CheckCircle2 size={16} /> Report submitted successfully</p>}
              <Button type="submit"><AlertTriangle size={16} /> Submit report</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Smart routing tip</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-400">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-emerald-500/12 text-emerald-300"><MapPin /></div>
            <p>Adding a precise location helps collection companies assign the nearest truck and improves district-level heatmaps for city authorities.</p>
            <p className="rounded-lg bg-white/[0.04] p-3 text-slate-300">Expected response: 15 minutes for urgent pickup, 2 hours for full bins, next working day for missed pickups.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
