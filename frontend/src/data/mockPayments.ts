import { Payment, PaymentStatus, PaymentMethod, ServicePlan, CollectionSchedule } from '@/types';

export const mockPayments: Payment[] = [
  { id:'pay-001', amount:5000, status:PaymentStatus.COMPLETED, method:PaymentMethod.MOMO, description:'Monthly waste collection - May 2026', userId:'usr-001', transactionRef:'TXN-2026051001', servicePlan:'Basic', createdAt:'2026-05-10T09:00:00Z' },
  { id:'pay-002', amount:5000, status:PaymentStatus.COMPLETED, method:PaymentMethod.MOMO, description:'Monthly waste collection - April 2026', userId:'usr-001', transactionRef:'TXN-2026041001', servicePlan:'Basic', createdAt:'2026-04-08T10:00:00Z' },
  { id:'pay-003', amount:12000, status:PaymentStatus.COMPLETED, method:PaymentMethod.BANK_TRANSFER, description:'Quarterly waste collection - Q1 2026', userId:'usr-001', transactionRef:'TXN-2026010501', servicePlan:'Standard', createdAt:'2026-01-05T08:00:00Z' },
  { id:'pay-004', amount:2000, status:PaymentStatus.COMPLETED, method:PaymentMethod.MOMO, description:'Urgent pickup - Special request', userId:'usr-001', transactionRef:'TXN-2026050801', servicePlan:'On-demand', createdAt:'2026-05-08T14:00:00Z' },
  { id:'pay-005', amount:5000, status:PaymentStatus.PENDING, method:PaymentMethod.MOMO, description:'Monthly waste collection - June 2026', userId:'usr-001', transactionRef:'TXN-2026060101', servicePlan:'Basic', createdAt:'2026-05-16T08:00:00Z' },
  { id:'pay-006', amount:8000, status:PaymentStatus.FAILED, method:PaymentMethod.CARD, description:'Premium service upgrade attempt', userId:'usr-002', transactionRef:'TXN-2026051201', servicePlan:'Premium', createdAt:'2026-05-12T11:00:00Z' },
];

export const servicePlans: ServicePlan[] = [
  { id:'plan-001', name:'Basic', description:'Essential waste collection for households', price:5000, frequency:'Monthly', features:['Weekly pickup (1x)', 'Basic bin provided', 'SMS notifications', 'Report issues'], popular:false },
  { id:'plan-002', name:'Standard', description:'Enhanced collection with recycling support', price:8000, frequency:'Monthly', features:['Twice weekly pickup (2x)', 'Recycling bins included', 'SMS + App notifications', 'Priority issue resolution', 'Recycling reports'], popular:true },
  { id:'plan-003', name:'Premium', description:'Full-service waste management solution', price:15000, frequency:'Monthly', features:['Daily pickup', 'Premium bin set (3 types)', 'Real-time tracking', '24/7 support', 'Monthly analytics report', 'Special waste handling'], popular:false },
  { id:'plan-004', name:'On-Demand', description:'Pay per pickup for occasional needs', price:2000, frequency:'Per Pickup', features:['Single pickup request', 'Same-day service', 'GPS tracking', 'Digital receipt'], popular:false },
];

export const mockSchedules: CollectionSchedule[] = [
  { id:'sch-001', day:'Monday', time:'07:00 - 09:00', district:'Gasabo', sector:'Kimironko', companyName:'COTRACO Ltd', truckPlate:'RAD 200A', status:'upcoming' },
  { id:'sch-002', day:'Monday', time:'09:00 - 11:00', district:'Gasabo', sector:'Remera', companyName:'COTRACO Ltd', truckPlate:'RAD 301B', status:'upcoming' },
  { id:'sch-003', day:'Tuesday', time:'07:00 - 09:00', district:'Kicukiro', sector:'Kicukiro Centre', companyName:'Agruni Waste Solutions', truckPlate:'RAE 450C', status:'upcoming' },
  { id:'sch-004', day:'Wednesday', time:'07:00 - 09:00', district:'Nyarugenge', sector:'Muhima', companyName:'Baheza Clean Services', truckPlate:'RAF 678E', status:'upcoming' },
  { id:'sch-005', day:'Wednesday', time:'10:00 - 12:00', district:'Gasabo', sector:'Kacyiru', companyName:'COTRACO Ltd', truckPlate:'RAD 200A', status:'upcoming' },
  { id:'sch-006', day:'Thursday', time:'07:00 - 09:00', district:'Gasabo', sector:'Kibagabaga', companyName:'Baheza Clean Services', truckPlate:'RAF 789F', status:'upcoming' },
  { id:'sch-007', day:'Friday', time:'07:00 - 09:00', district:'Kicukiro', sector:'Kanombe', companyName:'Agruni Waste Solutions', truckPlate:'RAE 345H', status:'upcoming' },
  { id:'sch-008', day:'Saturday', time:'08:00 - 10:00', district:'Gasabo', sector:'Gisozi', companyName:'Baheza Clean Services', truckPlate:'RAF 789F', status:'completed' },
];
