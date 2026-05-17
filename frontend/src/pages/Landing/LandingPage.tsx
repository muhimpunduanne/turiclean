import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, BarChart3, Bell, Building2, CheckCircle2, CreditCard,
  FileText, Lock, MapPin, Recycle, Route, Shield, Smartphone,
  Star, Truck, Users, Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ─── Data ─────────────────────────────────────────────────────────────── */

const navLinks = ['Platform', 'Solutions', 'How it works', 'Analytics'];

const trustedBy = ['Gasabo District', 'Nyarugenge', 'Kicukiro', 'REMA Rwanda', 'Kigali City'];

const heroStats = [
  { value: '3,284', label: 'Households registered' },
  { value: '94%',   label: 'Collection coverage' },
  { value: '18min', label: 'Avg. response time' },
  { value: '12K+',  label: 'Reports resolved' },
];

const bigFeatures = [
  {
    icon: <MapPin size={24} />,
    color: 'emerald',
    title: 'Live GPS fleet tracking',
    text: 'Every truck on a real-time operational map. See active routes, ETAs, sector zones, and driver status from a single command view.',
    points: [
      '2.5-second position refresh rate',
      'Multi-truck route visualization',
      'Automated arrival alerts to households',
      'Historical trip playback & audit log',
    ],
  },
  {
    icon: <FileText size={24} />,
    color: 'sky',
    title: 'Citizen waste reporting',
    text: 'Full bins, missed pickups, and urgent requests — each captured with GPS location, timestamp, and a full audit trail.',
    points: [
      'Three report types with priority levels',
      'Auto-assigned to nearest operator',
      'Status updates push to resident\'s phone',
      'District-level hotspot analytics',
    ],
  },
];

const miniFeatures = [
  { icon: <CreditCard size={18} />, color: 'amber',  title: 'Digital payments',       text: 'Mobile Money, card, and bank billing. Auto-generated invoices and transaction history.' },
  { icon: <BarChart3 size={18} />, color: 'purple', title: 'Authority analytics',     text: 'Operator scorecards, district heatmaps, SLA compliance, and city-wide dashboards.' },
  { icon: <Bell     size={18} />, color: 'emerald', title: 'Push notifications',      text: 'WebSocket-powered alerts: truck ETA, report resolved, payment confirmed.' },
  { icon: <Shield   size={18} />, color: 'sky',     title: 'Role-based access',       text: 'Separate secure portals for households, companies, and government authorities.' },
];

const colorMap: Record<string, { border: string; icon: string; bg: string }> = {
  emerald: { border: 'border-emerald-500/20', icon: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  sky:     { border: 'border-sky-500/20',     icon: 'text-sky-400',     bg: 'bg-sky-500/10'     },
  amber:   { border: 'border-amber-500/20',   icon: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  purple:  { border: 'border-purple-500/20',  icon: 'text-purple-400',  bg: 'bg-purple-500/10'  },
};

const stakeholders = [
  {
    color: 'emerald',
    icon: <Users size={22} />,
    role: 'Households & Residents',
    tagline: 'Your waste, your way.',
    items: [
      'Report full bins in under 30 seconds',
      'Track your nearest collection truck live',
      'Receive push notifications on truck arrival',
      'Pay service fees via Mobile Money or card',
      'Access full report history and status',
    ],
    cta: 'Register as household',
  },
  {
    color: 'sky',
    icon: <Truck size={22} />,
    role: 'Collection Companies',
    tagline: 'Operate smarter.',
    items: [
      'Receive dispatch requests in real time',
      'Manage your fleet with live GPS tracking',
      'Optimize routes with AI-assisted planning',
      'Review resident feedback and SLA scores',
      'Access revenue and service analytics',
    ],
    cta: 'Join as operator',
  },
  {
    color: 'purple',
    icon: <Shield size={22} />,
    role: 'Government Authorities',
    tagline: 'Govern with data.',
    items: [
      'Monitor all districts on a live city map',
      'Compare and score operator performance',
      'Export sanitation compliance reports',
      'Track SLA adherence across the network',
      'Inform smart city and waste policy decisions',
    ],
    cta: 'Request government access',
  },
];

const steps = [
  {
    n: '01',
    title: 'Resident submits a report',
    text: 'Household opens Turiclean, selects report type, and the GPS coordinates are captured automatically.',
  },
  {
    n: '02',
    title: 'Operator receives the alert',
    text: 'The nearest licensed company gets a real-time dispatch notification and assigns the closest truck.',
  },
  {
    n: '03',
    title: 'Resident tracks the truck',
    text: 'Live map shows ETA. A push notification confirms when the truck is 5 minutes away and when service is done.',
  },
  {
    n: '04',
    title: 'Government reviews performance',
    text: 'Dashboard shows operator SLA compliance, district coverage gaps, and unresolved hotspot reports.',
  },
];

const testimonials = [
  {
    quote: 'Turiclean transformed how we coordinate collection in Gasabo. Real-time data means we can act on hotspots before they become public health issues.',
    name: 'District Coordinator',
    title: 'Gasabo District, Kigali',
    initials: 'GD',
    color: 'emerald',
  },
  {
    quote: 'Our fleet dispatch time dropped by 40% in three months. The route optimization alone paid back the platform cost in the first quarter.',
    name: 'Operations Manager',
    title: 'COTRACO Waste Solutions',
    initials: 'OM',
    color: 'sky',
  },
  {
    quote: 'I can report a full bin from my phone in seconds. The notification when the truck arrives is what impressed me most — finally a service that communicates.',
    name: 'Resident',
    title: 'Kimironko, Gasabo',
    initials: 'JU',
    color: 'purple',
  },
];

const compliance = [
  { icon: <Lock  size={16} />, label: 'Bank-level TLS encryption',   text: 'All data in transit and at rest' },
  { icon: <Shield size={16} />, label: 'Role-based access control',  text: 'Enforced at the API layer'       },
  { icon: <Zap   size={16} />, label: '99.9% uptime SLA',           text: 'Monitored 24 / 7'                },
  { icon: <Star  size={16} />, label: 'Rwanda data residency',       text: 'Hosted within RURA guidelines'   },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
});

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
});

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#060a18] text-slate-100 overflow-x-hidden">

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#060a18]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/30 transition group-hover:shadow-emerald-500/50">
              <Recycle size={18} className="text-white" />
            </span>
            <div>
              <span className="block text-[15px] font-bold tracking-tight text-white">Turiclean</span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400">Rwanda Smart Waste</span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-slate-300 transition hover:text-white sm:block">
              Sign in
            </Link>
            <Button asChild size="sm" className="gap-1.5">
              <Link to="/register">Get started <ArrowRight size={14} /></Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="glow-orb glow-orb-emerald absolute -top-40 left-1/4 h-[700px] w-[700px] opacity-60" />
        <div className="glow-orb glow-orb-blue   absolute top-10  right-0   h-[500px] w-[500px] opacity-50" style={{ animationDelay: '2s' }} />
        <div className="dot-grid absolute inset-0 opacity-25" />

        <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-16 lg:px-8 lg:pt-28 lg:pb-20">
          <div className="mx-auto max-w-4xl text-center">

            {/* Pill */}
            <motion.div {...fade(0)} className="mb-6 flex justify-center">
              <span className="pill-tag">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live across Kigali · Rwanda Smart Waste
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 {...fade(0.06)} className="text-5xl font-black leading-[1.06] tracking-tight lg:text-[4.5rem]">
              <span className="text-white">Smart waste management</span>
              <br />
              <span className="gradient-text">built for Rwanda's cities.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p {...fade(0.14)} className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400">
              One platform connecting{' '}
              <span className="font-semibold text-white">households</span>,{' '}
              <span className="font-semibold text-white">collection operators</span>, and{' '}
              <span className="font-semibold text-white">government authorities</span>{' '}
              — from the first report to city-wide analytics.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fade(0.22)} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="px-8 gap-2">
                <Link to="/register">Start for free <ArrowRight size={16} /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/login">Explore live dashboard</Link>
              </Button>
            </motion.div>

            {/* Trusted by */}
            <motion.div {...fade(0.3)} className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-600">Trusted by</span>
              {trustedBy.map((name) => (
                <span key={name} className="text-sm font-medium text-slate-500 transition hover:text-slate-300">{name}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Hero stats ──────────────────────────────────────────────────── */}
      <section className="border-b border-white/[0.06] bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-white/[0.06] md:grid-cols-4">
            {heroStats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                {...inView(i * 0.07)}
                className="flex flex-col items-center gap-1 px-6 py-8"
              >
                <span className="text-3xl font-black text-white lg:text-4xl">{value}</span>
                <span className="text-xs font-medium text-slate-500">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard preview ───────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-emerald-500/8 via-sky-500/6 to-purple-500/8 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f23] shadow-2xl shadow-black/70">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#080c1e] px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/60" />
              <span className="h-3 w-3 rounded-full bg-amber-500/60" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
              <div className="mx-4 flex flex-1 max-w-xs items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> app.turiclean.rw
              </div>
              <span className="ml-auto text-[11px] text-slate-600">Rwanda Waste Platform</span>
            </div>
            {/* App shell */}
            <div className="grid lg:grid-cols-[220px_1fr]" style={{ minHeight: 380 }}>
              {/* Sidebar */}
              <aside className="hidden border-r border-white/[0.06] bg-[#080b1c] p-4 lg:block">
                <div className="mb-5 flex items-center gap-2 px-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-500">
                    <Recycle size={13} className="text-white" />
                  </span>
                  <span className="text-sm font-bold text-white">Turiclean</span>
                </div>
                <div className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">Admin portal</div>
                <div className="space-y-0.5">
                  {['Overview', 'City Monitor', 'All Reports', 'Companies', 'Analytics', 'Districts'].map((label, i) => (
                    <div key={label} className={`rounded-xl px-3 py-2 text-xs font-medium ${i === 0 ? 'bg-emerald-500/12 text-emerald-300 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}>
                      {label}
                    </div>
                  ))}
                </div>
              </aside>
              {/* Main */}
              <div className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Kigali · Government oversight</p>
                    <p className="text-sm font-bold text-white">Command Center</p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-4 mb-4">
                  {[
                    { label: 'Households', value: '3,284', color: 'text-emerald-400', bg: 'bg-emerald-500/8 border-emerald-500/15' },
                    { label: 'Companies',  value: '12',    color: 'text-sky-400',     bg: 'bg-sky-500/8 border-sky-500/15'         },
                    { label: 'Open reports',value: '47',   color: 'text-amber-400',   bg: 'bg-amber-500/8 border-amber-500/15'     },
                    { label: 'Active trucks',value: '9',   color: 'text-purple-400',  bg: 'bg-purple-500/8 border-purple-500/15'   },
                  ].map(({ label, value, color, bg }) => (
                    <div key={label} className={`rounded-xl border px-4 py-3 ${bg}`}>
                      <p className={`text-xl font-black ${color}`}>{value}</p>
                      <p className="mt-0.5 text-[10px] font-semibold text-slate-500">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="grid gap-3 lg:grid-cols-[1fr_0.9fr]">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                    <p className="mb-3 text-xs font-bold text-white">Weekly collection performance</p>
                    <div className="flex h-24 items-end gap-1.5">
                      {[68, 84, 56, 92, 74, 88, 63].map((h, i) => (
                        <div key={i} className="flex flex-1 flex-col items-center gap-1">
                          <div className="w-full rounded-t-md bg-gradient-to-t from-emerald-700 to-emerald-400" style={{ height: `${h}%` }} />
                          <span className="text-[8px] font-semibold text-slate-600">{['M','T','W','T','F','S','S'][i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { text: 'Urgent pickup — Kimironko',  status: 'Dispatched', dot: 'bg-emerald-400', tone: 'text-emerald-400' },
                      { text: 'Full bin — Kacyiru, Gasabo', status: 'Pending',    dot: 'bg-amber-400',   tone: 'text-amber-400'   },
                      { text: 'Missed — Muhima, Nyarugenge',status: 'In progress',dot: 'bg-sky-400',     tone: 'text-sky-400'     },
                    ].map(({ text, status, dot, tone }) => (
                      <div key={text} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                        <span className="text-[11px] text-slate-400 truncate">{text}</span>
                        <span className={`flex items-center gap-1.5 ml-3 shrink-0 text-[10px] font-bold ${tone}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />{status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section id="platform" className="border-y border-white/[0.06] bg-white/[0.015] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 text-center">
            <span className="pill-tag mx-auto mb-5 inline-flex">Platform capabilities</span>
            <h2 className="text-4xl font-black tracking-tight text-white lg:text-5xl">
              Everything in <span className="gradient-text">one system.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
              Purpose-built for Rwanda's waste infrastructure — from household reporting to government-level oversight.
            </p>
          </div>

          {/* Two large feature cards */}
          <div className="mb-5 grid gap-5 lg:grid-cols-2">
            {bigFeatures.map((f, i) => {
              const c = colorMap[f.color];
              return (
                <motion.div
                  key={f.title}
                  {...inView(i * 0.1)}
                  className="glass-card group relative overflow-hidden p-8"
                >
                  <span className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${f.color === 'emerald' ? 'via-emerald-500' : 'via-sky-500'} to-transparent`} />
                  <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border ${c.bg} ${c.border} ${c.icon}`}>
                    {f.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{f.title}</h3>
                  <p className="mb-6 text-sm leading-7 text-slate-400">{f.text}</p>
                  <ul className="space-y-2.5">
                    {f.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 size={15} className={`mt-0.5 shrink-0 ${c.icon}`} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Four smaller feature cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {miniFeatures.map((f, i) => {
              const c = colorMap[f.color];
              return (
                <motion.div
                  key={f.title}
                  {...inView(i * 0.08)}
                  className="glass-card group p-6 transition-all hover:-translate-y-1"
                >
                  <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border ${c.bg} ${c.border} ${c.icon}`}>
                    {f.icon}
                  </div>
                  <h3 className="mb-2 font-bold text-white">{f.title}</h3>
                  <p className="text-sm leading-6 text-slate-400">{f.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stakeholders ────────────────────────────────────────────────── */}
      <section id="solutions" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="mb-14 text-center">
          <span className="pill-tag mx-auto mb-5 inline-flex" style={{ borderColor: 'rgba(14,165,233,0.3)', background: 'rgba(14,165,233,0.07)', color: '#38bdf8' }}>
            Connected stakeholders
          </span>
          <h2 className="text-4xl font-black tracking-tight text-white lg:text-5xl">
            One platform. <span className="gradient-text">Three portals.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Each role gets a secure, dedicated workspace designed around their specific responsibilities and workflows.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {stakeholders.map((s, i) => {
            const c = colorMap[s.color];
            return (
              <motion.div
                key={s.role}
                {...inView(i * 0.1)}
                className="glass-card relative flex flex-col overflow-hidden p-8"
              >
                <span className={`absolute inset-x-0 top-0 h-0.5 ${s.color === 'emerald' ? 'bg-emerald-500' : s.color === 'sky' ? 'bg-sky-500' : 'bg-purple-500'}`} />
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border ${c.bg} ${c.border} ${c.icon}`}>
                  {s.icon}
                </div>
                <p className={`mb-1 text-xs font-bold uppercase tracking-[0.15em] ${c.icon}`}>{s.tagline}</p>
                <h3 className="mb-5 text-xl font-bold text-white">{s.role}</h3>
                <ul className="flex-1 space-y-3">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                      <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${c.icon}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-white/[0.07]">
                  <Link
                    to="/register"
                    className={`inline-flex items-center gap-2 text-sm font-bold transition hover:gap-3 ${c.icon}`}
                  >
                    {s.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Workflow ─────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="border-y border-white/[0.06] bg-white/[0.015] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 text-center">
            <span className="pill-tag mx-auto mb-5 inline-flex">How it works</span>
            <h2 className="text-4xl font-black tracking-tight text-white lg:text-5xl">
              Report to resolution <span className="gradient-text">in minutes.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Every report has a clear owner, a live status, and a full audit trail from submission to service completion.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                {...inView(i * 0.1)}
                className="glass-card relative p-7"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-5xl font-black text-white/[0.06]">{step.n}</span>
                  {i < steps.length - 1 && (
                    <div className="hidden h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] xl:flex">
                      <ArrowRight size={11} className="text-slate-500" />
                    </div>
                  )}
                </div>
                <h3 className="mb-3 font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="mb-14 text-center">
          <span className="pill-tag mx-auto mb-5 inline-flex" style={{ borderColor: 'rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.07)', color: '#a78bfa' }}>
            What they say
          </span>
          <h2 className="text-4xl font-black tracking-tight text-white lg:text-5xl">
            Trusted by the people <span className="gradient-text">who run Kigali.</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => {
            const c = colorMap[t.color];
            return (
              <motion.div
                key={t.name}
                {...inView(i * 0.1)}
                className="glass-card flex flex-col p-8"
              >
                {/* Stars */}
                <div className="mb-6 flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {/* Quote */}
                <blockquote className="flex-1 text-sm leading-7 text-slate-300 italic">
                  "{t.quote}"
                </blockquote>
                {/* Author */}
                <div className="mt-7 flex items-center gap-4 border-t border-white/[0.07] pt-6">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-black ${c.bg} ${c.border} ${c.icon}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Security / compliance bar ────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-white/[0.02] py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
            Security & compliance
          </p>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {compliance.map(({ icon, label, text }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-emerald-400">{icon}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{label}</p>
                  <p className="text-xs text-slate-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section id="analytics" className="relative overflow-hidden border-b border-white/[0.06] py-24">
        <div className="glow-orb glow-orb-emerald absolute -bottom-20 left-1/2 h-[600px] w-[600px] -translate-x-1/2 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="glass-card overflow-hidden">
            <div className="grid items-center gap-12 p-10 lg:grid-cols-[1fr_auto] lg:p-14">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Open to all of Rwanda</p>
                <h2 className="text-3xl font-black text-white lg:text-4xl">
                  Ready to build a cleaner, smarter city?
                </h2>
                <p className="mt-4 max-w-lg text-base text-slate-400">
                  Join households, collection companies, and district authorities already using Turiclean to transform Rwanda's waste services.
                </p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {[
                    'Free to register', 'No setup fees', 'Live in under 24h',
                    'Dedicated onboarding', 'Real-time GPS included', 'Government-level analytics',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-start gap-4 lg:items-center">
                <Button asChild size="lg" className="w-full gap-2 px-10 lg:w-auto">
                  <Link to="/register">Create account <ArrowRight size={16} /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full lg:w-auto">
                  <Link to="/login">Explore demo</Link>
                </Button>
                <p className="text-xs text-slate-600 text-center">No credit card required</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] bg-[#040812]">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/20 border border-emerald-500/20">
                  <Recycle size={16} className="text-emerald-400" />
                </span>
                <span className="font-bold text-white">Turiclean</span>
              </div>
              <p className="text-sm leading-7 text-slate-500 max-w-xs">
                Rwanda's smart waste management platform connecting communities, operators, and government for cleaner cities.
              </p>
              <div className="mt-5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-emerald-400">Live across Kigali</span>
              </div>
            </div>

            {/* Platform */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Platform</p>
              <ul className="space-y-3 text-sm text-slate-500">
                {['GPS Tracking', 'Waste Reporting', 'Digital Payments', 'Push Notifications', 'Route Optimization'].map((l) => (
                  <li key={l}><Link to="/register" className="transition hover:text-slate-300">{l}</Link></li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Solutions</p>
              <ul className="space-y-3 text-sm text-slate-500">
                {['Households', 'Collection Companies', 'City Government', 'District Analytics', 'Smart City Policy'].map((l) => (
                  <li key={l}><Link to="/register" className="transition hover:text-slate-300">{l}</Link></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Company</p>
              <ul className="space-y-3 text-sm text-slate-500">
                {[['Sign in', '/login'], ['Create account', '/register'], ['Forgot password', '/forgot-password']].map(([label, to]) => (
                  <li key={label}><Link to={to} className="transition hover:text-slate-300">{label}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-slate-600 sm:flex-row">
            <span>© {new Date().getFullYear()} Turiclean · Rwanda Smart Waste Management</span>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Lock size={11} /> Secured with TLS 1.3
              </span>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
