// ─── User ───────────────────────────────────────────
export enum Role {
  HOUSEHOLD = 'HOUSEHOLD',
  COMPANY = 'COMPANY',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  phone?: string;
  provider: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  role: Role;
}

// ─── Waste Reports ──────────────────────────────────
export enum ReportType {
  FULL_BIN = 'FULL_BIN',
  MISSED_PICKUP = 'MISSED_PICKUP',
  URGENT_PICKUP = 'URGENT_PICKUP',
}

export enum ReportStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
}

export interface WasteReport {
  id: string;
  type: ReportType;
  status: ReportStatus;
  description: string;
  latitude?: number;
  longitude?: number;
  address: string;
  reporter: User;
  reporterId: string;
  assignedTo?: User;
  assignedToId?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportData {
  type: ReportType;
  description: string;
  latitude?: number;
  longitude?: number;
  address: string;
}

// ─── Trucks ─────────────────────────────────────────
export enum TruckStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
}

export interface Truck {
  id: string;
  licensePlate: string;
  capacity: number;
  latitude?: number;
  longitude?: number;
  status: TruckStatus;
  company: User;
  companyId: string;
  driverName?: string;
  currentRoute?: string;
  speed?: number;
  fuelLevel?: number;
  lastUpdated?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Notifications ──────────────────────────────────
export enum NotificationType {
  REPORT_UPDATE = 'REPORT_UPDATE',
  PICKUP_SCHEDULED = 'PICKUP_SCHEDULED',
  TRUCK_ARRIVING = 'TRUCK_ARRIVING',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  SYSTEM_ALERT = 'SYSTEM_ALERT',
  NEW_ASSIGNMENT = 'NEW_ASSIGNMENT',
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  userId: string;
  createdAt: string;
}

// ─── Payments ───────────────────────────────────────
export enum PaymentStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  MOMO = 'MOMO',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CARD = 'CARD',
  CASH = 'CASH',
}

export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  description: string;
  userId: string;
  transactionRef: string;
  servicePlan?: string;
  createdAt: string;
}

export interface ServicePlan {
  id: string;
  name: string;
  description: string;
  price: number;
  frequency: string;
  features: string[];
  popular?: boolean;
}

// ─── Schedules ──────────────────────────────────────
export interface CollectionSchedule {
  id: string;
  day: string;
  time: string;
  district: string;
  sector: string;
  companyName: string;
  truckPlate: string;
  status: 'upcoming' | 'completed' | 'missed';
}

// ─── Dashboard Stats ────────────────────────────────
export interface AdminDashboardStats {
  users: { total: number; companies: number; households: number };
  reports: { total: number; pending: number; resolved: number; inProgress: number; rejected: number };
  trucks: { total: number; active: number; inactive: number; maintenance: number };
  collections: { today: number; thisWeek: number; thisMonth: number };
  revenue: { thisMonth: number; lastMonth: number; growth: number };
}

export interface CompanyDashboardStats {
  reports: { pending: number; resolved: number; inProgress: number; total: number };
  trucks: { total: number; active: number };
  collections: { today: number; thisWeek: number };
  revenue: { thisMonth: number; growth: number };
  responseRate: number;
  avgResponseTime: string;
}

export interface HouseholdDashboardStats {
  totalReports: number;
  pendingReports: number;
  resolvedReports: number;
  nextPickup: string;
  paymentsDue: number;
}

// ─── District Data ──────────────────────────────────
export interface DistrictData {
  name: string;
  reports: number;
  resolved: number;
  population: number;
  coverage: number;
  companies: number;
}

// ─── Chart Data ─────────────────────────────────────
export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
}

// ─── Route ──────────────────────────────────────────
export interface RoutePoint {
  lat: number;
  lng: number;
  name: string;
}

export interface TruckRoute {
  id: string;
  name: string;
  truckId: string;
  points: RoutePoint[];
  status: 'active' | 'completed' | 'scheduled';
  estimatedTime: string;
  district: string;
}
