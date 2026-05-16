import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/types';
import ProtectedRoute from './ProtectedRoute';

// Lazy load pages
import { lazy, Suspense } from 'react';

const LandingPage = lazy(() => import('@/pages/Landing/LandingPage'));
const LoginPage = lazy(() => import('@/pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/Auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/Auth/ForgotPasswordPage'));

// Household
const HouseholdDashboard = lazy(() => import('@/pages/Dashboard/Household/HouseholdDashboard'));
const MyReports = lazy(() => import('@/pages/Dashboard/Household/MyReports'));
const NewReport = lazy(() => import('@/pages/Dashboard/Household/NewReport'));
const CollectionSchedule = lazy(() => import('@/pages/Dashboard/Household/CollectionSchedule'));
const TrackTruck = lazy(() => import('@/pages/Dashboard/Household/TrackTruck'));
const PaymentHistory = lazy(() => import('@/pages/Dashboard/Household/PaymentHistory'));
const MakePayment = lazy(() => import('@/pages/Dashboard/Household/MakePayment'));
const MyNotifications = lazy(() => import('@/pages/Dashboard/Household/MyNotifications'));
const ProfileSettings = lazy(() => import('@/pages/Dashboard/Household/ProfileSettings'));

// Company
const CompanyDashboard = lazy(() => import('@/pages/Dashboard/Company/CompanyDashboard'));
const PickupRequests = lazy(() => import('@/pages/Dashboard/Company/PickupRequests'));
const FleetManagement = lazy(() => import('@/pages/Dashboard/Company/FleetManagement'));
const RouteManagement = lazy(() => import('@/pages/Dashboard/Company/RouteManagement'));
const CustomerReports = lazy(() => import('@/pages/Dashboard/Company/CustomerReports'));
const CompanyAnalytics = lazy(() => import('@/pages/Dashboard/Company/CompanyAnalytics'));

// Admin
const AdminDashboard = lazy(() => import('@/pages/Dashboard/Admin/AdminDashboard'));
const CityMonitoring = lazy(() => import('@/pages/Dashboard/Admin/CityMonitoring'));
const PerformanceAnalytics = lazy(() => import('@/pages/Dashboard/Admin/PerformanceAnalytics'));
const AllReports = lazy(() => import('@/pages/Dashboard/Admin/AllReports'));
const CompanyManagement = lazy(() => import('@/pages/Dashboard/Admin/CompanyManagement'));
const DistrictOverview = lazy(() => import('@/pages/Dashboard/Admin/DistrictOverview'));

// Shared
const TrackingPage = lazy(() => import('@/pages/Tracking/TrackingPage'));
const PaymentPage = lazy(() => import('@/pages/Payment/PaymentPage'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-dark-primary)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export default function AppRouter() {
  const { isAuthenticated, user } = useAuth();

  const getDefaultDashboard = () => {
    if (!user) return '/login';
    switch (user.role) {
      case Role.HOUSEHOLD: return '/dashboard';
      case Role.COMPANY: return '/company';
      case Role.ADMIN: return '/admin';
      default: return '/dashboard';
    }
  };

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to={getDefaultDashboard()} replace /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to={getDefaultDashboard()} replace /> : <RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Household */}
        <Route path="/dashboard" element={<ProtectedRoute roles={[Role.HOUSEHOLD]}><HouseholdDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/reports" element={<ProtectedRoute roles={[Role.HOUSEHOLD]}><MyReports /></ProtectedRoute>} />
        <Route path="/dashboard/reports/new" element={<ProtectedRoute roles={[Role.HOUSEHOLD]}><NewReport /></ProtectedRoute>} />
        <Route path="/dashboard/schedule" element={<ProtectedRoute roles={[Role.HOUSEHOLD]}><CollectionSchedule /></ProtectedRoute>} />
        <Route path="/dashboard/track" element={<ProtectedRoute roles={[Role.HOUSEHOLD]}><TrackTruck /></ProtectedRoute>} />
        <Route path="/dashboard/payments" element={<ProtectedRoute roles={[Role.HOUSEHOLD]}><PaymentHistory /></ProtectedRoute>} />
        <Route path="/dashboard/payments/new" element={<ProtectedRoute roles={[Role.HOUSEHOLD]}><MakePayment /></ProtectedRoute>} />
        <Route path="/dashboard/notifications" element={<ProtectedRoute roles={[Role.HOUSEHOLD]}><MyNotifications /></ProtectedRoute>} />
        <Route path="/dashboard/profile" element={<ProtectedRoute roles={[Role.HOUSEHOLD]}><ProfileSettings /></ProtectedRoute>} />

        {/* Company */}
        <Route path="/company" element={<ProtectedRoute roles={[Role.COMPANY]}><CompanyDashboard /></ProtectedRoute>} />
        <Route path="/company/requests" element={<ProtectedRoute roles={[Role.COMPANY]}><PickupRequests /></ProtectedRoute>} />
        <Route path="/company/fleet" element={<ProtectedRoute roles={[Role.COMPANY]}><FleetManagement /></ProtectedRoute>} />
        <Route path="/company/routes" element={<ProtectedRoute roles={[Role.COMPANY]}><RouteManagement /></ProtectedRoute>} />
        <Route path="/company/reports" element={<ProtectedRoute roles={[Role.COMPANY]}><CustomerReports /></ProtectedRoute>} />
        <Route path="/company/analytics" element={<ProtectedRoute roles={[Role.COMPANY]}><CompanyAnalytics /></ProtectedRoute>} />

        {/* Admin */}
        <Route path="/admin" element={<ProtectedRoute roles={[Role.ADMIN]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/monitoring" element={<ProtectedRoute roles={[Role.ADMIN]}><CityMonitoring /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute roles={[Role.ADMIN]}><PerformanceAnalytics /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute roles={[Role.ADMIN]}><AllReports /></ProtectedRoute>} />
        <Route path="/admin/companies" element={<ProtectedRoute roles={[Role.ADMIN]}><CompanyManagement /></ProtectedRoute>} />
        <Route path="/admin/districts" element={<ProtectedRoute roles={[Role.ADMIN]}><DistrictOverview /></ProtectedRoute>} />

        {/* Shared */}
        <Route path="/tracking" element={<ProtectedRoute><TrackingPage /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
