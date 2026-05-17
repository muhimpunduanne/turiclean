import { useState } from 'react';
import { KeyRound, Save, User } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { usersApi } from '@/services/api';
import { getInitials } from '@/lib/utils';

export default function ProfileSettings() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ fullName: user?.fullName ?? '', phone: user?.phone ?? '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const updated = await usersApi.updateMe({ fullName: form.fullName, phone: form.phone });
      setUser(updated);
      setSaved(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  }

  const initials = getInitials(user?.fullName || 'U');
  const roleLabel = user?.role === 'COMPANY' ? 'Company' : user?.role === 'ADMIN' ? 'Admin' : 'Household';
  const roleColor = user?.role === 'COMPANY' ? 'from-sky-500 to-sky-700' : user?.role === 'ADMIN' ? 'from-purple-500 to-purple-700' : 'from-emerald-500 to-emerald-700';

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Account"
        title="Profile settings"
        description="Update your name, contact information, and account preferences."
      />

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Avatar panel */}
        <Card>
          <CardContent className="flex flex-col items-center gap-5 p-8 text-center">
            <div className={`flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br ${roleColor} text-2xl font-black text-white shadow-xl`}>
              {initials}
            </div>
            <div>
              <p className="text-lg font-bold text-white">{user?.fullName}</p>
              <p className="text-sm text-slate-400">{user?.email}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                <User size={11} /> {roleLabel} account
              </span>
            </div>
            <div className="w-full border-t border-white/[0.07] pt-4 text-left">
              <dl className="space-y-3">
                <div className="info-row">
                  <dt>Member since</dt>
                  <dd>{new Date().getFullYear()}</dd>
                </div>
                <div className="info-row">
                  <dt>Role</dt>
                  <dd>{roleLabel}</dd>
                </div>
                <div className="info-row" style={{ borderBottom: 'none' }}>
                  <dt>Status</dt>
                  <dd className="text-emerald-400">Active</dd>
                </div>
              </dl>
            </div>
          </CardContent>
        </Card>

        {/* Form panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Personal information</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-400">Full name</label>
                  <Input
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-400">
                    Email address
                    <span className="font-normal text-slate-600">Cannot be changed</span>
                  </label>
                  <Input
                    value={user?.email ?? ''}
                    disabled
                    className="cursor-not-allowed opacity-40"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-400">
                    Phone number <span className="font-normal text-slate-600">(optional)</span>
                  </label>
                  <Input
                    placeholder="+250 7XX XXX XXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">{error}</div>
                )}
                {saved && (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-3 text-sm text-emerald-300">
                    Profile updated successfully.
                  </div>
                )}

                <Button type="submit" isLoading={saving} loadingText="Saving…" className="gap-2">
                  <Save size={15} /> Save changes
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Password card */}
          <Card>
            <CardHeader><CardTitle>Password & security</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-500/10 text-slate-400">
                <KeyRound size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Change password</p>
                <p className="text-xs text-slate-500">Password changes are handled via email reset for security.</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="/forgot-password">Reset</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
