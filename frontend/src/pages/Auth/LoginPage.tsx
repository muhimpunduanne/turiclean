import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Home, Shield } from 'lucide-react';
import AuthShell from './AuthShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/types';

const demos = [
  { label: 'Household', icon: <Home size={16} />, email: 'jean.uwimana@gmail.com', password: 'password123' },
  { label: 'Company', icon: <Building2 size={16} />, email: 'info@cotraco.rw', password: 'password123' },
  { label: 'Admin', icon: <Shield size={16} />, email: 'admin@rema.gov.rw', password: 'admin123' },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: demos[0].email, password: demos[0].password });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form);
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      navigate(stored.role === Role.COMPANY ? '/company' : stored.role === Role.ADMIN ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to manage waste collection, reports, payments, and monitoring.">
      <div className="mt-5 grid grid-cols-3 gap-2">
        {demos.map((demo) => (
          <button key={demo.label} onClick={() => setForm({ email: demo.email, password: demo.password })} className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-3 text-xs text-slate-300 hover:border-emerald-400/40">
            <span className="mx-auto mb-1 flex justify-center text-emerald-300">{demo.icon}</span>
            {demo.label}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</Button>
      </form>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
        <Link to="/forgot-password" className="hover:text-emerald-300">Forgot password?</Link>
        <Link to="/register" className="font-semibold text-emerald-300">Create account</Link>
      </div>
    </AuthShell>
  );
}
