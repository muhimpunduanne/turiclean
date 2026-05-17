import axios from 'axios';
import type {
  User,
  WasteReport,
  Truck,
  Notification,
  CreateReportData,
  AdminDashboardStats,
  CompanyDashboardStats,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '@/types';

const http = axios.create({
  baseURL: '/',
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (v: any) => void; reject: (e: any) => void }> = [];

function processQueue(error: any, token: string | null) {
  failedQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve(token)));
  failedQueue = [];
}

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return http(originalRequest);
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        isRefreshing = false;
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(error);
      }
      try {
        const { data } = await axios.post('/auth/refresh', {}, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        processQueue(null, data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return http(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

// ── Auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
  login: (data: LoginCredentials) =>
    http.post<AuthResponse>('/auth/login', data).then((r) => r.data),

  register: (data: RegisterData) =>
    http.post<AuthResponse>('/auth/register', data).then((r) => r.data),

  logout: () =>
    http.post('/auth/logout').catch(() => null),

  getMe: () =>
    http.get<User>('/users/me').then((r) => r.data),
};

// ── Waste Reports ─────────────────────────────────────────────────────────────

export const reportsApi = {
  getMyReports: () =>
    http.get<WasteReport[]>('/waste-reports/my-reports').then((r) => r.data),

  getAll: (params?: { status?: string; type?: string; assignedToId?: string }) =>
    http.get<WasteReport[]>('/waste-reports', { params }).then((r) => r.data),

  getOne: (id: string) =>
    http.get<WasteReport>(`/waste-reports/${id}`).then((r) => r.data),

  create: (data: CreateReportData) =>
    http.post<WasteReport>('/waste-reports', data).then((r) => r.data),

  updateStatus: (id: string, status: string) =>
    http.patch<WasteReport>(`/waste-reports/${id}/status`, { status }).then((r) => r.data),

  assign: (id: string, assignedToId: string) =>
    http.patch<WasteReport>(`/waste-reports/${id}/assign`, { assignedToId }).then((r) => r.data),

  remove: (id: string) =>
    http.delete(`/waste-reports/${id}`).then((r) => r.data),

  getDashboard: () =>
    http.get('/waste-reports/dashboard').then((r) => r.data),
};

// ── Trucks ────────────────────────────────────────────────────────────────────

export const trucksApi = {
  getActiveTrucks: () =>
    http.get<Truck[]>('/trucks/active').then((r) => r.data),

  getMyTrucks: () =>
    http.get<Truck[]>('/trucks').then((r) => r.data),

  create: (data: { licensePlate: string; capacity: number; driverName?: string }) =>
    http.post<Truck>('/trucks', data).then((r) => r.data),

  updateLocation: (id: string, data: { latitude: number; longitude: number }) =>
    http.patch<Truck>(`/trucks/${id}/location`, data).then((r) => r.data),
};

// ── Users ─────────────────────────────────────────────────────────────────────

export const usersApi = {
  getAll: () =>
    http.get<User[]>('/users').then((r) => r.data),

  getOne: (id: string) =>
    http.get<User>(`/users/${id}`).then((r) => r.data),

  updateMe: (data: { fullName?: string; phone?: string }) =>
    http.patch<User>('/users/me', data).then((r) => r.data),

  update: (id: string, data: Partial<User>) =>
    http.patch<User>(`/users/${id}`, data).then((r) => r.data),

  remove: (id: string) =>
    http.delete(`/users/${id}`).then((r) => r.data),
};

// ── Dashboards ────────────────────────────────────────────────────────────────

export const dashboardsApi = {
  getAdmin: () =>
    http.get<AdminDashboardStats>('/dashboards/admin').then((r) => r.data),

  getCompany: () =>
    http.get<CompanyDashboardStats>('/dashboards/company').then((r) => r.data),
};

// ── Notifications ─────────────────────────────────────────────────────────────

export const notificationsApi = {
  getAll: () =>
    http.get<Notification[]>('/notifications').then((r) => r.data),

  markAsRead: (id: string) =>
    http.patch(`/notifications/${id}/read`).then((r) => r.data),

  markAllAsRead: () =>
    http.patch('/notifications/mark-all-read').then((r) => r.data),
};

export default http;
