import { ReportStatus, ReportType, TruckStatus, PaymentStatus } from '@/types';
import { Badge } from '@/components/ui/badge';

export function statusTone(status: string) {
  if ([ReportStatus.RESOLVED, TruckStatus.ACTIVE, PaymentStatus.COMPLETED].includes(status as never)) return 'emerald';
  if ([ReportStatus.IN_PROGRESS, PaymentStatus.PENDING].includes(status as never)) return 'sky';
  if ([TruckStatus.MAINTENANCE].includes(status as never)) return 'amber';
  if ([ReportStatus.REJECTED, TruckStatus.INACTIVE, PaymentStatus.FAILED].includes(status as never)) return 'red';
  return 'slate';
}

export function humanize(value: string) {
  return value.toLowerCase().replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function StatusBadge({ value }: { value: string }) {
  return <Badge tone={statusTone(value)}>{humanize(value)}</Badge>;
}

export function reportTypeLabel(type: ReportType) {
  switch (type) {
    case ReportType.FULL_BIN:
      return 'Full bin';
    case ReportType.MISSED_PICKUP:
      return 'Missed pickup';
    case ReportType.URGENT_PICKUP:
      return 'Urgent pickup';
    default:
      return humanize(type);
  }
}
