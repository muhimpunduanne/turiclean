import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthShell from './AuthShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <AuthShell title="Recover password" subtitle="Enter your email and we will send a secure password reset link.">
      {sent ? (
        <div className="mt-6 rounded-lg bg-emerald-500/10 p-4 text-sm text-emerald-200">Password reset instructions have been queued for this mock account.</div>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-4">
          <Input type="email" placeholder="Email address" required />
          <Button type="submit" className="w-full">Send reset link</Button>
        </form>
      )}
      <p className="mt-5 text-center text-sm text-slate-400"><Link to="/login" className="font-semibold text-emerald-300">Back to login</Link></p>
    </AuthShell>
  );
}
