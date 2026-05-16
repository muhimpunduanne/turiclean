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
  Sun, Moon, Recycle, Shield, Search, Activity
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const householdNav: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'My Reports', path: '/dashboard/reports', icon: <FileText size={20} /> },
  { label: 'New Report', path: '/dashboard/reports/new', icon: <Plus size={20} /> },
  { label: 'Schedule', path: '/dashboard/schedule', icon: <Calendar size={20} /> },
  { label: 'Track Truck', path: '/dashboard/track', icon: <Truck size={20} /> },
  { label: 'Payments', path: '/dashboard/payments', icon: <CreditCard size={20} /> },
  { label: 'Notifications', path: '/dashboard/notifications', icon: <Bell size={20} /> },
  { label: 'Profile', path: '/dashboard/profile', icon: <User size={20} /> },
];

const companyNav: NavItem[] = [
  { label: 'Dashboard', path: '/company', icon: <LayoutDashboard size={20} /> },
  { label: 'Pickup Requests', path: '/company/requests', icon: <ClipboardList size={20} /> },
  { label: 'Fleet', path: '/company/fleet', icon: <Truck size={20} /> },
  { label: 'Routes', path: '/company/routes', icon: <Map size={20} /> },
  { label: 'Reports', path: '/company/reports', icon: <FileText size={20} /> },
  { label: 'Analytics', path: '/company/analytics', icon: <BarChart3 size={20} /> },
];

const adminNav: NavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
  { label: 'City Monitor', path: '/admin/monitoring', icon: <MapPin size={20} /> },
  { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 size={20} /> },
  { label: 'All Reports', path: '/admin/reports', icon: <FileText size={20} /> },
  { label: 'Companies', path: '/admin/companies', icon: <Building2 size={20} /> },
  { label: 'Districts', path: '/admin/districts', icon: <Users size={20} /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = user?.role === Role.COMPANY ? companyNav : user?.role === Role.ADMIN ? adminNav : householdNav;
  const roleLabel = user?.role === Role.COMPANY ? 'Company' : user?.role === Role.ADMIN ? 'Administrator' : 'Household';
  const roleIcon = user?.role === Role.COMPANY ? <Building2 size={14} /> : user?.role === Role.ADMIN ? <Shield size={14} /> : <Recycle size={14} />;

  return (
    <div className="dashboard-shell flex h-screen overflow-hidden text-slate-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:static inset-y-0 left-0 z-50 w-[260px] flex flex-col transition-transform duration-300',
        'border-r border-slate-800 bg-slate-950 shadow-xl shadow-black/15',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
            <Recycle size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">Turiclean</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500">Smart Waste</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                )}
              >
                <span className={cn(isActive && 'text-emerald-400')}>{item.icon}</span>
                <span>{item.label}</span>
                {item.label === 'Notifications' && unreadCount > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-slate-800 p-3">
          <div className="surface-panel flex items-center gap-3 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white ring-1 ring-slate-700">
              {getInitials(user?.fullName || 'U')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.fullName}</p>
              <p className="flex items-center gap-1 text-[11px] text-slate-500">{roleIcon} {roleLabel}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <button onClick={toggle} className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white">
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
              {isDark ? 'Light' : 'Dark'}
            </button>
            <button onClick={() => { logout(); navigate('/'); }} className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs text-slate-400 transition-colors hover:bg-red-500/[0.08] hover:text-red-400">
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 items-center gap-4 border-b border-slate-800 bg-slate-950/95 px-4 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="focus-ring rounded-lg p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white lg:hidden">
            <Menu size={22} />
          </button>
          <div className="hidden items-center gap-3 md:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/12 text-emerald-300">
              <Activity size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{roleLabel} workspace</p>
              <p className="text-xs text-slate-500">Operations overview</p>
            </div>
          </div>
          <div className="ml-auto hidden max-w-sm flex-1 items-center rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-500 lg:flex">
            <Search size={16} />
            <span className="ml-2 text-sm">Search reports, routes, payments...</span>
          </div>
          <button onClick={toggle} className="focus-ring hidden h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white lg:flex">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to={user?.role === Role.HOUSEHOLD ? '/dashboard/notifications' : '#'} className="focus-ring relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white">
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 text-[9px] font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
