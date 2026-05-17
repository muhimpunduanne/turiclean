import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, Clock, MapPin, Package, ArrowRight } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { ReportType } from '@/types';
import { reportsApi } from '@/services/api';
import { cn } from '@/lib/utils';

const reportTypes = [
  {
    value: ReportType.FULL_BIN,
    icon: <Package size={22} />,
    label: 'Full waste bin',
    description: 'Bin is overflowing and needs collection',
    response: 'Response: within 2 hours',
    color: 'amber',
  },
  {
    value: ReportType.MISSED_PICKUP,
    icon: <Clock size={22} />,
    label: 'Missed pickup',
    description: 'Scheduled collection did not happen',
    response: 'Response: next working day',
    color: 'sky',
  },
  {
    value: ReportType.URGENT_PICKUP,
    icon: <AlertTriangle size={22} />,
    label: 'Urgent pickup',
    description: 'Public health risk — immediate action needed',
    response: 'Response: within 15 minutes',
    color: 'red',
  },
];

const typeColor: Record<string, string> = {
  amber: 'border-amber-500/40 bg-amber-500/[0.07] text-amber-300 ring-amber-500/30',
  sky:   'border-sky-500/40   bg-sky-500/[0.07]   text-sky-300   ring-sky-500/30',
  red:   'border-red-500/40   bg-red-500/[0.07]   text-red-300   ring-red-500/30',
};

export default function NewReport() {
  const navigate = useNavigate();
  const [type, setType] = useState<ReportType>(ReportType.FULL_BIN);
  const [form, setForm] = useState({ address: '', latitude: '-1.9506', longitude: '29.8619', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError('');
    try {
      await reportsApi.create({
        type,
        address: form.address,
        description: form.description,
        latitude: parseFloat(form.latitude) || undefined,
        longitude: parseFloat(form.longitude) || undefined,
      });
      setSaved(true);
      setTimeout(() => navigate('/dashboard/reports'), 1400);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (saved) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 ring-4 ring-emerald-500/20">
              <CheckCircle2 size={40} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-black text-white">Report submitted!</h2>
            <p className="mt-3 text-slate-400">Your report has been received. A collection company will be assigned shortly.</p>
            <p className="mt-2 text-sm text-slate-500">Redirecting to your reports…</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="New report"
        title="Submit a waste report"
        description="Reports are routed to the nearest licensed company. Urgent pickups are prioritised automatically."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Main form */}
        <div className="space-y-6">
          {/* Step 1 — Type picker */}
          <Card>
            <CardHeader>
              <CardTitle>Step 1 — Choose report type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3">
                {reportTypes.map((rt) => {
                  const active = type === rt.value;
                  return (
                    <button
                      key={rt.value}
                      type="button"
                      onClick={() => setType(rt.value)}
                      className={cn(
                        'relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all duration-150',
                        active
                          ? `${typeColor[rt.color]} ring-1`
                          : 'border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200',
                      )}
                    >
                      {active && <CheckCircle2 size={12} className="absolute right-3 top-3 text-current opacity-70" />}
                      <span className={active ? 'text-current' : 'text-slate-500'}>{rt.icon}</span>
                      <div>
                        <p className="font-bold text-white text-sm">{rt.label}</p>
                        <p className="mt-0.5 text-xs leading-5 text-slate-400">{rt.description}</p>
                        <p className={cn('mt-2 text-[10px] font-semibold', active ? 'text-current' : 'text-slate-600')}>{rt.response}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Step 2 — Location & details */}
          <Card>
            <CardHeader>
              <CardTitle>Step 2 — Location & details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-400">Street address or landmark <span className="text-red-400">*</span></label>
                  <Input
                    placeholder="e.g. KG 123 St, Kimironko, Gasabo"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-400">Latitude <span className="font-normal text-slate-600">(optional)</span></label>
                    <Input
                      placeholder="-1.9506"
                      value={form.latitude}
                      onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-400">Longitude <span className="font-normal text-slate-600">(optional)</span></label>
                    <Input
                      placeholder="29.8619"
                      value={form.longitude}
                      onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-400">Description <span className="text-red-400">*</span></label>
                  <Textarea
                    placeholder="Describe the waste issue — type, access instructions, nearby landmarks, or any safety concerns…"
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <Button type="submit" size="lg" isLoading={loading} loadingText="Submitting report…" className="gap-2">
                  Submit report <ArrowRight size={16} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>How it works</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { step: '1', text: 'You submit this report with location details.' },
                { step: '2', text: 'The system finds the nearest licensed company.' },
                { step: '3', text: 'A truck is dispatched and you can track it live.' },
                { step: '4', text: 'You receive a push notification when service is done.' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[11px] font-black text-emerald-400 ring-1 ring-emerald-500/20">
                    {step}
                  </span>
                  <p className="text-sm leading-6 text-slate-400">{text}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-3 p-5">
              <MapPin size={18} className="mt-0.5 shrink-0 text-sky-400" />
              <p className="text-sm leading-6 text-slate-400">
                Adding GPS coordinates improves district heatmaps and helps authorities identify waste hotspots faster.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
