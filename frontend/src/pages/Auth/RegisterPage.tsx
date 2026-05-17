import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Home, Shield, CheckCircle2 } from 'lucide-react';
import AuthShell from './AuthShell';
import { Button } from '@/components/ui/button';
import { Input, Select } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/types';
import { cn } from '@/lib/utils';

const roles = [
  {
    value: Role.HOUSEHOLD,
    label: 'Household',
    icon: <Home size={18} />,
    description: 'Report issues & track pickups',
    color: 'emerald',
  },
  {
    value: Role.COMPANY,
    label: 'Company',
    icon: <Building2 size={18} />,
    description: 'Manage fleet & dispatch',
    color: 'sky',
  },
  {
    value: Role.ADMIN,
    label: 'Government',
    icon: <Shield size={18} />,
    description: 'City-wide oversight',
    color: 'purple',
  },
];

const roleColor: Record<string, string> = {
  emerald: 'border-emerald-500/40 bg-emerald-500/[0.08] text-emerald-300 ring-emerald-500/30',
  sky:     'border-sky-500/40     bg-sky-500/[0.08]     text-sky-300     ring-sky-500/30',
  purple:  'border-purple-500/40  bg-purple-500/[0.08]  text-purple-300  ring-purple-500/30',
};

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(Role.HOUSEHOLD);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError('');
    try {
      await register({ ...form, role: selectedRole });
      navigate(selectedRole === Role.COMPANY ? '/company' : selectedRole === Role.ADMIN ? '/admin' : '/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || (err instanceof Error ? err.message : 'Unable to register. Please try again.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join Rwanda's connected waste management network. It's free to get started."
    >
      {/* Role picker */}
      <div className="mb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">I am registering as</p>
        <div className="grid grid-cols-3 gap-2">
          {roles.map((role) => {
            const active = selectedRole === role.value;
            return (
              <button
                key={role.value}
                type="button"
                onClick={() => setSelectedRole(role.value)}
                className={cn(
                  'relative flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center transition-all duration-150',
                  active
                    ? `${roleColor[role.color]} ring-1`
                    : 'border-white/10 bg-white/3 text-slate-500 hover:border-white/20 hover:text-slate-300',
                )}
              >
                {active && (
                  <CheckCircle2 size={12} className="absolute right-2 top-2 text-current opacity-70" />
                )}
                <span>{role.icon}</span>
                <span className="text-xs font-bold">{role.label}</span>
                <span className="text-[10px] leading-tight opacity-70">{role.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-5 h-px bg-white/[0.07]" />

      {/* Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-400">
            {selectedRole === Role.COMPANY ? 'Organization name' : 'Full name'}
          </label>
          <Input
            placeholder={selectedRole === Role.COMPANY ? 'e.g. COTRACO Waste Solutions' : 'Jean Uwimana'}
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />
        </div>

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
          <label className="mb-1.5 block text-xs font-semibold text-slate-400">Phone number <span className="font-normal text-slate-600">(optional)</span></label>
          <Input
            placeholder="+250 7XX XXX XXX"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-400">Password</label>
          <Input
            type="password"
            placeholder="Minimum 8 characters"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={8}
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <Button type="submit" className="mt-2 w-full" size="lg" isLoading={loading} loadingText="Creating account...">
          Create account
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-emerald-400 transition hover:text-emerald-300">Sign in</Link>
      </p>
    </AuthShell>
  );
}
