import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  CreditCard,
  FileText,
  MapPin,
  Route,
  Recycle,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: <MapPin size={20} />, title: 'Live truck visibility', text: 'Track active trucks, route progress, ETAs, and service areas from one operational map.' },
  { icon: <FileText size={20} />, title: 'Structured citizen reports', text: 'Capture full bins, missed pickups, and urgent requests with location and status history.' },
  { icon: <CreditCard size={20} />, title: 'Digital service payments', text: 'Support household billing, Mobile Money workflows, service plans, and transaction records.' },
  { icon: <BarChart3 size={20} />, title: 'Authority analytics', text: 'Monitor district coverage, response quality, operator performance, and unresolved hotspots.' },
];

const stakeholders = [
  { icon: <Users size={21} />, title: 'Households', text: 'Report waste issues, request pickups, view schedules, receive live alerts, and pay service fees.' },
  { icon: <Building2 size={21} />, title: 'Collection companies', text: 'Manage requests, assign drivers, optimize routes, monitor trucks, and review customer reports.' },
  { icon: <Shield size={21} />, title: 'Government authorities', text: 'Oversee districts, compare operator performance, inspect heatmaps, and export city reports.' },
];

const steps = [
  'A household submits a report or pickup request with location details.',
  'The assigned company dispatches a driver and updates service status.',
  'Authorities monitor performance, coverage, and district-level service quality.',
];

const metrics = [
  ['12', 'active trucks monitored'],
  ['48', 'reports today'],
  ['94%', 'Gasabo coverage'],
  ['18m', 'average response ETA'],
];

const modules = [
  ['Report intake', 'Bin overflow, missed pickup, urgent pickup, and location-based service requests.'],
  ['Dispatch console', 'Assign trucks and drivers, inspect route status, and prioritize urgent work.'],
  ['Public oversight', 'Review district coverage, company response quality, and unresolved hotspots.'],
  ['Billing records', 'Track service plans, payment receipts, and household transaction history.'],
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-600 text-white">
              <Recycle size={22} />
            </span>
            <span>
              <span className="block text-lg font-bold tracking-tight">Turiclean</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-700">Rwanda Smart Waste</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a href="#platform" className="hover:text-emerald-700">Platform</a>
            <a href="#stakeholders" className="hover:text-emerald-700">Users</a>
            <a href="#workflow" className="hover:text-emerald-700">Workflow</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Login</Link>
            <Button asChild><Link to="/register">Get started</Link></Button>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col justify-center">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
                <Shield size={16} /> Digital infrastructure for cleaner Rwandan cities
              </div>
              <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 lg:text-5xl">
                Smart Waste Management for Cleaner Cities in Rwanda
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 lg:text-lg">
                Turiclean connects households, licensed waste collection companies, and public authorities in one accountable system for reporting, dispatch, tracking, payments, and oversight.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg"><Link to="/register">Create account <ArrowRight size={18} /></Link></Button>
                <Button asChild size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-50">
                  <Link to="/login">Open demo dashboard</Link>
                </Button>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-slate-200 rounded-lg border border-slate-200 bg-slate-50">
                {[
                  ['3', 'user portals'],
                  ['GPS', 'truck tracking'],
                  ['RWF', 'digital billing'],
                ].map(([value, label]) => (
                  <div key={label} className="px-4 py-3">
                    <p className="text-lg font-bold text-slate-950">{value}</p>
                    <p className="text-xs font-medium text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="lg:pl-4">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/80">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-950 px-5 py-4 text-white">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-600"><Recycle size={18} /></span>
                    <div>
                      <p className="text-sm font-semibold">Operations Command Center</p>
                      <p className="text-xs text-slate-400">Kigali collection network</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">Live</span>
                </div>

                <div className="grid min-h-[430px] bg-slate-100 lg:grid-cols-[180px_1fr]">
                  <aside className="hidden border-r border-slate-200 bg-white p-4 lg:block">
                    <div className="space-y-2">
                      {[
                        ['Overview', 'bg-emerald-50 text-emerald-700'],
                        ['Reports', 'text-slate-500'],
                        ['Routes', 'text-slate-500'],
                        ['Payments', 'text-slate-500'],
                      ].map(([label, className]) => (
                        <div key={label} className={`rounded-lg px-3 py-2 text-sm font-semibold ${className}`}>{label}</div>
                      ))}
                    </div>
                    <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">SLA today</p>
                      <p className="mt-2 text-2xl font-bold text-slate-950">91%</p>
                      <p className="text-xs text-slate-500">response compliance</p>
                    </div>
                  </aside>

                  <div className="p-4">
                    <div className="grid gap-3 sm:grid-cols-4">
                      {metrics.map(([value, label]) => (
                        <div key={label} className="rounded-lg border border-slate-200 bg-white p-3">
                          <p className="text-xl font-bold text-slate-950">{value}</p>
                          <p className="mt-1 text-[11px] font-medium leading-4 text-slate-500">{label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                      <div className="rounded-lg border border-slate-200 bg-white p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-950">Route performance</p>
                            <p className="text-xs text-slate-500">Completed pickups by district</p>
                          </div>
                          <Route size={18} className="text-emerald-600" />
                        </div>
                        <div className="flex h-48 items-end gap-3">
                          {[68, 84, 56, 92, 74, 88, 63].map((height, index) => (
                            <div key={index} className="flex flex-1 flex-col items-center gap-2">
                              <div className="w-full rounded-t-md bg-emerald-500" style={{ height: `${height}%` }} />
                              <span className="text-[10px] font-semibold text-slate-400">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <p className="text-sm font-semibold text-slate-950">Live activity</p>
                            <span className="text-xs font-semibold text-emerald-700">Updated now</span>
                          </div>
                          {[
                            ['Urgent pickup assigned', <Route size={15} className="text-emerald-600" />],
                            ['Kimironko route 72% complete', <TrendingUp size={15} className="text-sky-600" />],
                            ['Payment receipt issued', <Smartphone size={15} className="text-emerald-600" />],
                          ].map(([item, icon]) => (
                            <div key={item} className="flex items-center gap-3 border-t border-slate-100 py-3 text-sm text-slate-700 first:border-t-0 first:pt-0">
                              <span className="grid h-7 w-7 place-items-center rounded-md bg-slate-50">{icon}</span>
                              {item}
                            </div>
                          ))}
                        </div>

                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                          <p className="text-sm font-semibold text-slate-950">Open reports</p>
                          <div className="mt-3 space-y-2">
                            {['Full bin - Gasabo', 'Missed pickup - Muhima', 'Urgent pickup - Kacyiru'].map((item) => (
                              <div key={item} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-600">
                                <span>{item}</span>
                                <span className="font-semibold text-sky-700">Review</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
            {modules.map(([title, text]) => (
              <div key={title} className="border-l-2 border-emerald-500 pl-4">
                <h3 className="font-semibold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="platform" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 grid gap-4 lg:grid-cols-[0.7fr_1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Platform capabilities</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Built for operational clarity.</h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-slate-600">
              The interface is designed for repeated daily use by residents, dispatch teams, and decision-makers who need reliable data instead of disconnected calls and paper reports.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-emerald-50 text-emerald-700">{feature.icon}</div>
                <h3 className="font-semibold text-slate-950">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="stakeholders" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-700">Connected stakeholders</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">One system for every role in the service chain.</h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {stakeholders.map((item) => (
                <div key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-sky-50 text-sky-700">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Service workflow</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">From citizen report to verified resolution.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">Every report has ownership, status, route context, and an auditable timeline.</p>
            </div>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">{index + 1}</span>
                  <p className="pt-2 text-sm font-medium leading-6 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 text-white sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <h2 className="text-2xl font-bold">Ready to operate a cleaner city network?</h2>
              <p className="mt-2 text-sm text-slate-300">Explore the household, company, and government dashboards with demo accounts.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild><Link to="/register">Create account</Link></Button>
              <Button asChild variant="outline"><Link to="/login">View demos</Link></Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
