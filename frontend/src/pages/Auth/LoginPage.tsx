import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Home, Shield } from 'lucide-react';
import AuthShell from './AuthShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/types';
import { cn } from '@/lib/utils';

const demos = [
  { label: 'Household', icon: <Home size={15} />, email: 'jean.uwimana@gmail.com', password: 'password123', color: 'emerald' },
  { label: 'Company',   icon: <Building2 size={15} />, email: 'info@cotraco.rw',     password: 'password123', color: 'sky'     },
  { label: 'Admin',     icon: <Shield size={15} />,    email: 'admin@rema.gov.rw',   password: 'admin123',    color: 'purple'  },
];

const demoColor: Record<string, string> = {
  emerald: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/[0.06] hover:bg-emerald-500/[0.12] hover:border-emerald-500/50',
  sky:     'border-sky-500/30     text-sky-300     bg-sky-500/[0.06]     hover:bg-sky-500/[0.12]     hover:border-sky-500/50',
  purple:  'border-purple-500/30  text-purple-300  bg-purple-500/[0.06]  hover:bg-purple-500/[0.12]  hover:border-purple-500/50',
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: demos[0].email, password: demos[0].password });
  const [activeDemo, setActiveDemo] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function pickDemo(i: number) {
    setActiveDemo(i);
    setForm({ email: demos[i].email, password: demos[i].password });
    setError('');
  }

  async function handleSubmit() {
    setLoading(true);
    setError('');
    try {
      await login(form);
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      navigate(stored.role === Role.COMPANY ? '/company' : stored.role === Role.ADMIN ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage waste collection, reports, payments, and monitoring."
    >
      {/* Demo account picker */}
      <div className="mb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Try a demo account</p>
        <div className="grid grid-cols-3 gap-2">
          {demos.map((demo, i) => (
            <button
              key={demo.label}
              onClick={() => pickDemo(i)}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-semibold transition-all duration-150',
                activeDemo === i
                  ? demoColor[demo.color]
                  : 'border-white/10 bg-white/3 text-slate-500 hover:border-white/20 hover:text-slate-300',
              )}
            >
              <span>{demo.icon}</span>
              {demo.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 h-px bg-white/[0.07]" />

      {/* Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-400">Email address</label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-400">Password</label>
            <Link to="/forgot-password" className="text-xs text-slate-500 transition hover:text-emerald-400">
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <Button type="submit" className="mt-2 w-full" size="lg" isLoading={loading} loadingText="Signing in...">
          Sign in
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-emerald-400 transition hover:text-emerald-300">
          Create one free
        </Link>
      </p>
    </AuthShell>
  );
}
