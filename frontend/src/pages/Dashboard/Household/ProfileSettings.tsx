import { FormEvent, useState } from 'react';
import { Save } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileSettings() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  function submit(event: FormEvent) {
    event.preventDefault();
    setSaved(true);
  }
  return (
    <DashboardLayout>
      <PageHeader title="Profile settings" description="Manage household identity, contact information, address, and notification preferences." />
      <Card className="max-w-2xl">
        <CardHeader><CardTitle>Account information</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <Input defaultValue={user?.fullName} placeholder="Full name" />
            <Input defaultValue={user?.email} placeholder="Email" />
            <Input defaultValue={user?.phone} placeholder="Phone" />
            <Input defaultValue="Kimironko, Gasabo District" placeholder="Collection address" />
            {saved && <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">Profile changes saved locally.</p>}
            <Button type="submit"><Save size={16} /> Save changes</Button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
