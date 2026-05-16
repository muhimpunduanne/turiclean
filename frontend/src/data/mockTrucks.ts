import { Truck, TruckStatus } from '@/types';
import { mockUsers } from './mockUsers';

const companies = mockUsers.filter((u) => u.role === 'COMPANY');

export const mockTrucks: Truck[] = [
  { id:'trk-001', licensePlate:'RAD 200A', capacity:8000, latitude:-1.9403, longitude:29.8739, status:TruckStatus.ACTIVE, company:companies[0], companyId:companies[0].id, driverName:'Emmanuel Niyonzima', currentRoute:'Kimironko-Remera', speed:25, fuelLevel:78, lastUpdated:'2026-05-16T10:30:00Z', createdAt:'2025-01-10T08:00:00Z', updatedAt:'2026-05-16T10:30:00Z' },
  { id:'trk-002', licensePlate:'RAD 301B', capacity:6000, latitude:-1.9536, longitude:29.8468, status:TruckStatus.ACTIVE, company:companies[0], companyId:companies[0].id, driverName:'Claude Mugisha', currentRoute:'Nyarugenge-Muhima', speed:18, fuelLevel:55, lastUpdated:'2026-05-16T10:28:00Z', createdAt:'2025-02-15T08:00:00Z', updatedAt:'2026-05-16T10:28:00Z' },
  { id:'trk-003', licensePlate:'RAE 450C', capacity:10000, latitude:-1.9578, longitude:29.8562, status:TruckStatus.ACTIVE, company:companies[1], companyId:companies[1].id, driverName:'Pacifique Habineza', currentRoute:'Kicukiro-Kanombe', speed:30, fuelLevel:90, lastUpdated:'2026-05-16T10:32:00Z', createdAt:'2025-03-20T08:00:00Z', updatedAt:'2026-05-16T10:32:00Z' },
  { id:'trk-004', licensePlate:'RAE 512D', capacity:5000, latitude:-1.9456, longitude:29.8623, status:TruckStatus.MAINTENANCE, company:companies[1], companyId:companies[1].id, driverName:'Innocent Uwizeye', currentRoute:'N/A', speed:0, fuelLevel:40, lastUpdated:'2026-05-15T16:00:00Z', createdAt:'2025-04-10T08:00:00Z', updatedAt:'2026-05-15T16:00:00Z' },
  { id:'trk-005', licensePlate:'RAF 678E', capacity:8000, latitude:-1.9401, longitude:29.8512, status:TruckStatus.ACTIVE, company:companies[2], companyId:companies[2].id, driverName:'Eric Ndayisaba', currentRoute:'Nyabugogo-Gitega', speed:22, fuelLevel:65, lastUpdated:'2026-05-16T10:25:00Z', createdAt:'2025-05-05T08:00:00Z', updatedAt:'2026-05-16T10:25:00Z' },
  { id:'trk-006', licensePlate:'RAF 789F', capacity:12000, latitude:-1.9348, longitude:29.8701, status:TruckStatus.ACTIVE, company:companies[2], companyId:companies[2].id, driverName:'Theogene Bizimana', currentRoute:'Kibagabaga-Gisozi', speed:15, fuelLevel:82, lastUpdated:'2026-05-16T10:31:00Z', createdAt:'2025-06-01T08:00:00Z', updatedAt:'2026-05-16T10:31:00Z' },
  { id:'trk-007', licensePlate:'RAD 890G', capacity:6000, latitude:-1.9683, longitude:29.8345, status:TruckStatus.INACTIVE, company:companies[0], companyId:companies[0].id, driverName:'N/A', currentRoute:'N/A', speed:0, fuelLevel:10, lastUpdated:'2026-05-14T12:00:00Z', createdAt:'2025-07-15T08:00:00Z', updatedAt:'2026-05-14T12:00:00Z' },
  { id:'trk-008', licensePlate:'RAE 345H', capacity:8000, latitude:-1.952, longitude:29.859, status:TruckStatus.ACTIVE, company:companies[1], companyId:companies[1].id, driverName:'Jean-Paul Kamana', currentRoute:'Convention Centre Loop', speed:20, fuelLevel:70, lastUpdated:'2026-05-16T10:29:00Z', createdAt:'2025-08-20T08:00:00Z', updatedAt:'2026-05-16T10:29:00Z' },
];

// Kigali route points for animation
export const kigaliRoutePoints = [
  { lat: -1.9403, lng: 29.8739, name: 'Kimironko' },
  { lat: -1.9440, lng: 29.8700, name: 'Remera Junction' },
  { lat: -1.9480, lng: 29.8650, name: 'Kisimenti' },
  { lat: -1.9520, lng: 29.8590, name: 'Convention Centre' },
  { lat: -1.9536, lng: 29.8468, name: 'City Centre' },
  { lat: -1.9500, lng: 29.8520, name: 'KBC Junction' },
  { lat: -1.9456, lng: 29.8623, name: 'Kacyiru' },
  { lat: -1.9401, lng: 29.8512, name: 'Nyabugogo' },
  { lat: -1.9348, lng: 29.8701, name: 'Kibagabaga' },
  { lat: -1.9380, lng: 29.8780, name: 'Gisozi' },
  { lat: -1.9578, lng: 29.8562, name: 'Kicukiro Centre' },
  { lat: -1.9612, lng: 29.8478, name: 'Sonatubes' },
  { lat: -1.9683, lng: 29.8345, name: 'Gikondo' },
  { lat: -1.9720, lng: 29.8890, name: 'Kanombe' },
];
