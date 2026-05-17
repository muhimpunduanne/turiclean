import { Bell, CheckCheck, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/contexts/NotificationContext';
import { formatDateTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function MyNotifications() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Inbox"
        title="Notifications"
        description="Live pickup alerts, payment receipts, route updates, and report status changes."
        actions={
          unreadCount > 0 ? (
            <Button variant="outline" size="sm" onClick={markAllAsRead} className="gap-1.5">
              <CheckCheck size={14} /> Mark all read
            </Button>
          ) : undefined
        }
      />

      {notifications.length === 0 ? (
        <div className="empty-state mt-12">
          <div className="empty-state-icon">
            <Bell size={22} />
          </div>
          <p className="font-semibold text-slate-300">You're all caught up</p>
          <p className="text-sm text-slate-500">Notifications about pickups, payments, and reports will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Unread section */}
          {unreadCount > 0 && (
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
              Unread · {unreadCount}
            </p>
          )}
          {notifications.filter((n) => !n.read).map((n) => (
            <button
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className="group w-full text-left"
            >
              <div className="flex items-start gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/[0.07]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Bell size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">{n.title}</p>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                  </div>
                  <p className="mt-1 text-sm leading-5 text-slate-400">{n.message}</p>
                  <p className="mt-2 text-[11px] text-slate-600">{formatDateTime(n.createdAt)}</p>
                </div>
                <span className="shrink-0 text-[10px] font-semibold text-emerald-500 opacity-0 transition-opacity group-hover:opacity-100">
                  Mark read
                </span>
              </div>
            </button>
          ))}

          {/* Read section */}
          {notifications.some((n) => n.read) && (
            <>
              <p className="mb-2 mt-5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-600">Read</p>
              {notifications.filter((n) => n.read).map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    'flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4',
                    'opacity-70',
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-500/10 text-slate-500">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-300">{n.title}</p>
                    <p className="mt-1 text-sm leading-5 text-slate-500">{n.message}</p>
                    <p className="mt-2 text-[11px] text-slate-600">{formatDateTime(n.createdAt)}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
