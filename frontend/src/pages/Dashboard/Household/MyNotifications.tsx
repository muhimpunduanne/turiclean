import { Bell, CheckCheck } from 'lucide-react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import PageHeader from '@/components/data/PageHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNotifications } from '@/contexts/NotificationContext';
import { formatDateTime } from '@/lib/utils';

export default function MyNotifications() {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  return (
    <DashboardLayout>
      <PageHeader title="Notifications" description="Live pickup alerts, payment receipts, route changes, and report status updates." actions={<Button variant="outline" onClick={markAllAsRead}><CheckCheck size={16} /> Mark all read</Button>} />
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card key={notification.id} className="p-4">
            <button onClick={() => markAsRead(notification.id)} className="flex w-full items-start gap-4 text-left">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/12 text-emerald-300"><Bell size={18} /></span>
              <span className="flex-1">
                <span className="flex items-center gap-2 text-sm font-semibold text-white">{notification.title}{!notification.read && <span className="h-2 w-2 rounded-full bg-emerald-400" />}</span>
                <span className="mt-1 block text-sm text-slate-400">{notification.message}</span>
                <span className="mt-2 block text-xs text-slate-500">{formatDateTime(notification.createdAt)}</span>
              </span>
            </button>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
