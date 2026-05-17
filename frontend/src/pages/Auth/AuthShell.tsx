import { Link } from 'react-router-dom';
import { CheckCircle2, Recycle } from 'lucide-react';
import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

const highlights = [
  'Real-time GPS truck tracking across Kigali',
  'Citizen waste reporting with live status updates',
  'Digital payment and billing management',
  'Government-level district analytics and oversight',
];

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-[#060a18] text-white lg:grid-cols-[1fr_1fr]">

      {/* ── Left — Brand panel ─────────────────────────────────────────── */}
      <div className="relative hidden overflow-hidden border-r border-white/[0.06] lg:flex lg:flex-col">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#071a12] via-[#060a18] to-[#060e1f]" />
        <div className="glow-orb glow-orb-emerald absolute -top-20 -left-20 h-[500px] w-[500px]" />
        <div className="glow-orb glow-orb-blue absolute bottom-0 right-0 h-[400px] w-[400px]" style={{ animationDelay: '2s' }} />
        <div className="dot-grid absolute inset-0 opacity-20" />

        <div className="relative flex flex-1 flex-col justify-between p-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group w-fit">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/40 transition group-hover:shadow-emerald-500/60">
              <Recycle size={20} className="text-white" />
            </span>
            <div>
              <span className="block text-base font-bold text-white">Turiclean</span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-emerald-400">Rwanda Smart Waste</span>
            </div>
          </Link>

          {/* Main content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="pill-tag mb-5 inline-flex">Trusted by Kigali districts</span>
              <h1 className="text-4xl font-black leading-tight text-white xl:text-5xl">
                Cleaner cities start with{' '}
                <span className="gradient-text">smarter data.</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
                From the first household report to government-level oversight — one connected platform for Rwanda's waste management future.
              </p>
              <ul className="mt-8 space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Testimonial */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 backdrop-blur">
            <p className="text-sm leading-6 text-slate-400 italic">
              "Turiclean has transformed how we coordinate waste collection across Gasabo District — real-time reporting finally gives us the data to act fast."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-400">
                RN
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Rwanda District Office</p>
                <p className="text-xs text-slate-500">Gasabo District, Kigali</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right — Form panel ─────────────────────────────────────────── */}
      <div className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <Link to="/" className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500">
              <Recycle size={18} className="text-white" />
            </span>
            <span className="text-base font-bold text-white">Turiclean</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="mb-7">
              <h2 className="text-2xl font-black text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{subtitle}</p>
            </div>

            {/* Form card */}
            <div className="glass-card p-7">
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
