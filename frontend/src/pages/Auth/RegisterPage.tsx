import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from './AuthShell';
import { Button } from '@/components/ui/button';
import { Input, Select } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/types';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', role: Role.HOUSEHOLD });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(form);
      navigate(form.role === Role.COMPANY ? '/company' : form.role === Role.ADMIN ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to register');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Create your account" subtitle="Choose your role and join Rwanda's connected waste management network.">
      <form onSubmit={submit} className="mt-6 space-y-4">
        <Input placeholder="Full name or organization" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>
          <option value={Role.HOUSEHOLD}>Household user</option>
          <option value={Role.COMPANY}>Waste collection company</option>
          <option value={Role.ADMIN}>Government administrator</option>
        </Select>
        <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-400">Already registered? <Link to="/login" className="font-semibold text-emerald-300">Sign in</Link></p>
    </AuthShell>
  );
}
