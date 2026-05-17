import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { Role } from '@/types';
import { cn, getInitials } from '@/lib/utils';
import {
  LayoutDashboard, FileText, Plus, Calendar, Truck, CreditCard, Bell, User,
  Building2, ClipboardList, Map, BarChart3, Users, MapPin, LogOut, Menu, X,
  Sun, Moon, Recycle, Shield, ChevronRight,
} from 'lucide-react';

interface NavItem { label: string; path: string; icon: React.ReactNode; badge?: number; }

const householdNav: NavItem[] = [
  { label: 'Dashboard',    path: '/dashboard',                icon: <LayoutDashboard size={18} /> },
  { label: 'My Reports',   path: '/dashboard/reports',        icon: <FileText size={18} /> },
  { label: 'New Report',   path: '/dashboard/reports/new',    icon: <Plus size={18} /> },
  { label: 'Schedule',     path: '/dashboard/schedule',       icon: <Calendar size={18} /> },
  { label: 'Track Truck',  path: '/dashboard/track',          icon: <Truck size={18} /> },
  { label: 'Payments',     path: '/dashboard/payments',       icon: <CreditCard size={18} /> },
  { label: 'Notifications',path: '/dashboard/notifications',  icon: <Bell size={18} /> },
  { label: 'Profile',      path: '/dashboard/profile',        icon: <User size={18} /> },
];

const companyNav: NavItem[] = [
  { label: 'Dashboard',        path: '/company',           icon: <LayoutDashboard size={18} /> },
  { label: 'Pickup Requests',  path: '/company/requests',  icon: <ClipboardList size={18} /> },
  { label: 'Fleet',            path: '/company/fleet',     icon: <Truck size={18} /> },
  { label: 'Routes',           path: '/company/routes',    icon: <Map size={18} /> },
  { label: 'Reports',          path: '/company/reports',   icon: <FileText size={18} /> },
  { label: 'Analytics',        path: '/company/analytics', icon: <BarChart3 size={18} /> },
];

const adminNav: NavItem[] = [
  { label: 'Dashboard',     path: '/admin',              icon: <LayoutDashboard size={18} /> },
  { label: 'City Monitor',  path: '/admin/monitoring',   icon: <MapPin size={18} /> },
  { label: 'Analytics',     path: '/admin/analytics',    icon: <BarChart3 size={18} /> },
  { label: 'All Reports',   path: '/admin/reports',      icon: <FileText size={18} /> },
  { label: 'Companies',     path: '/admin/companies',    icon: <Building2 size={18} /> },
  { label: 'Districts',     path: '/admin/districts',    icon: <Users size={18} /> },
];

const roleConfig = {
  [Role.HOUSEHOLD]: { nav: householdNav, label: 'Household', icon: <Recycle size={12} />, color: 'text-emerald-400' },
  [Role.COMPANY]:   { nav: companyNav,   label: 'Company',   icon: <Building2 size={12} />, color: 'text-sky-400' },
  [Role.ADMIN]:     { nav: adminNav,     label: 'Admin',     icon: <Shield size={12} />,  color: 'text-purple-400' },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = user?.role ?? Role.HOUSEHOLD;
  const { nav, label, icon, color } = roleConfig[role] ?? roleConfig[Role.HOUSEHOLD];
  const initials = getInitials(user?.fullName || 'U');

  const navItemsWithBadge = nav.map((item) =>
    item.label === 'Notifications' ? { ...item, badge: unreadCount } : item
  );

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  return (
    <div className="dashboard-shell flex h-screen overflow-hidden">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ──────────────────────────────────────────────────── */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 flex w-64 flex-col transition-transform duration-300 ease-out',
        'border-r border-white/[0.06] bg-[#07091a]',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-white/[0.06] px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/30">
            <Recycle size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-[15px] font-bold text-white">Turiclean</h1>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Smart Waste</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-slate-500 hover:text-white transition lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Role badge */}
        <div className="border-b border-white/[0.06] px-4 py-3">
          <div className={cn('inline-flex items-center gap-1.5 rounded-full border bg-white/[0.03] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em]',
            role === Role.ADMIN ? 'border-purple-500/25 text-purple-400' :
            role === Role.COMPANY ? 'border-sky-500/25 text-sky-400' :
            'border-emerald-500/25 text-emerald-400'
          )}>
            {icon} {label} workspace
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {navItemsWithBadge.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'nav-item-active'
                    : 'text-slate-500 hover:bg-white/[0.04] hover:text-slate-200'
                )}
              >
                <span className={cn('transition', isActive ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-300')}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.badge ? (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-white">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                ) : isActive ? (
                  <ChevronRight size={14} className="text-emerald-500/60" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-white/[0.06] p-3">
          <div className="surface-panel mb-2 flex items-center gap-3 p-3">
            <div className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white ring-1',
              role === Role.ADMIN ? 'bg-gradient-to-br from-purple-500 to-purple-700 ring-purple-500/30' :
              role === Role.COMPANY ? 'bg-gradient-to-br from-sky-500 to-sky-700 ring-sky-500/30' :
              'bg-gradient-to-br from-emerald-500 to-emerald-700 ring-emerald-500/30'
            )}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-white">{user?.fullName}</p>
              <p className="truncate text-[11px] text-slate-500">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={toggle}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-medium text-slate-500 transition hover:bg-white/[0.05] hover:text-slate-200"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
              {isDark ? 'Light' : 'Dark'}
            </button>
            <button
              onClick={handleLogout}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-medium text-slate-500 transition hover:bg-red-500/[0.08] hover:text-red-400"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────── */}
      <main className="flex flex-1 flex-col overflow-hidden lg:ml-64">
        {/* Topbar */}
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-white/[0.06] bg-[#07091a]/95 px-5 backdrop-blur lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl border border-white/[0.08] p-2 text-slate-400 transition hover:border-white/20 hover:text-white lg:hidden"
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <div className="hidden items-center gap-2 text-sm lg:flex">
            <span className="text-slate-600">Turiclean</span>
            <ChevronRight size={14} className="text-slate-700" />
            <span className="font-medium text-slate-300">{label}</span>
            <ChevronRight size={14} className="text-slate-700" />
            <span className="font-semibold text-white">
              {navItemsWithBadge.find((n) => n.path === location.pathname)?.label ?? 'Dashboard'}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Theme */}
            <button
              onClick={toggle}
              className="hidden h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-slate-400 transition hover:border-white/20 hover:text-white lg:flex"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Notifications */}
            <Link
              to={role === Role.HOUSEHOLD ? '/dashboard/notifications' : '#'}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-slate-400 transition hover:border-white/20 hover:text-white"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-black text-white ring-2 ring-[#07091a]">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>

            {/* User avatar */}
            <div className={cn(
              'hidden h-9 w-9 items-center justify-center rounded-xl text-xs font-black text-white ring-1 lg:flex',
              role === Role.ADMIN ? 'bg-gradient-to-br from-purple-500 to-purple-700 ring-purple-500/40' :
              role === Role.COMPANY ? 'bg-gradient-to-br from-sky-500 to-sky-700 ring-sky-500/40' :
              'bg-gradient-to-br from-emerald-500 to-emerald-700 ring-emerald-500/40'
            )}>
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-5 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
