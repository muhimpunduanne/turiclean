import { Link } from 'react-router-dom';
import { Recycle } from 'lucide-react';
import { type ReactNode } from 'react';

export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="grid min-h-screen bg-[#0a0e27] text-white lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="hidden border-r border-white/10 bg-white/[0.03] p-10 lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500"><Recycle /></span>
          <span className="font-bold">Turiclean</span>
        </Link>
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">Rwanda Smart Waste</p>
          <h1 className="max-w-lg text-4xl font-black leading-tight">Cleaner city operations from household report to authority insight.</h1>
          <p className="mt-5 max-w-md text-slate-400">Use demo credentials from the README or register a new mock account to explore the complete investor-ready flow.</p>
        </div>
      </aside>
      <main className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500"><Recycle /></span>
            <span className="font-bold">Turiclean</span>
          </Link>
          <div className="glass-card p-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
