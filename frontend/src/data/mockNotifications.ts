import { Notification, NotificationType } from '@/types';

export const mockNotifications: Notification[] = [
  { id:'ntf-001', type:NotificationType.TRUCK_ARRIVING, title:'Truck Arriving Soon', message:'Collection truck RAD 200A is 5 minutes away from your location.', read:false, userId:'usr-001', createdAt:'2026-05-16T10:30:00Z' },
  { id:'ntf-002', type:NotificationType.REPORT_UPDATE, title:'Report Status Updated', message:'Your report #rpt-001 has been assigned to COTRACO Ltd.', read:false, userId:'usr-001', createdAt:'2026-05-16T09:15:00Z' },
  { id:'ntf-003', type:NotificationType.PICKUP_SCHEDULED, title:'Pickup Scheduled', message:'Your next waste collection is scheduled for tomorrow at 8:00 AM.', read:true, userId:'usr-001', createdAt:'2026-05-15T18:00:00Z' },
  { id:'ntf-004', type:NotificationType.PAYMENT_RECEIVED, title:'Payment Confirmed', message:'Your payment of RWF 5,000 for May collection has been received.', read:true, userId:'usr-001', createdAt:'2026-05-14T12:00:00Z' },
  { id:'ntf-005', type:NotificationType.SYSTEM_ALERT, title:'Service Update', message:'Collection schedule change: Friday pickups in Gasabo moved to Saturday this week.', read:false, userId:'usr-001', createdAt:'2026-05-16T07:00:00Z' },
  { id:'ntf-006', type:NotificationType.NEW_ASSIGNMENT, title:'New Pickup Request', message:'New urgent pickup request from Kacyiru area. Assign a truck.', read:false, userId:'cmp-001', createdAt:'2026-05-16T10:05:00Z' },
  { id:'ntf-007', type:NotificationType.REPORT_UPDATE, title:'Report Resolved', message:'Report #rpt-003 has been marked as resolved by Agruni Waste Solutions.', read:true, userId:'adm-001', createdAt:'2026-05-14T16:05:00Z' },
  { id:'ntf-008', type:NotificationType.SYSTEM_ALERT, title:'Performance Alert', message:'Baheza Clean Services response rate dropped below 80% this week.', read:false, userId:'adm-001', createdAt:'2026-05-16T08:00:00Z' },
];
