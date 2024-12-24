import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

// Public Pages
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// Protected Pages
import Dashboard from "@/pages/Dashboard";
import TaxpayerDashboard from "@/pages/taxpayer/Dashboard";
import Properties from "@/pages/taxpayer/Properties";
import DeveloperDashboard from "@/pages/developer/Dashboard";
import AdminDashboard from "@/pages/admin/Dashboard";
import Notifications from "@/pages/Notifications";
import Payment from "@/pages/Payment";
import Directory from "@/pages/Directory";
import Messages from "@/pages/Messages";
import Support from "@/pages/Support";
import History from "@/pages/History";
import Map from "@/components/Map";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }: { children: React.ReactNode, requiredRole?: string | null }) => {
  const { profile, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && profile.role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    switch (profile.role) {
      case "taxpayer":
        return <Navigate to="/taxpayer/dashboard" replace />;
      case "developer":
        return <Navigate to="/developer/dashboard" replace />;
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export const AppRoutes = () => {
  const { profile } = useAuth();

  // Function to redirect based on user role
  const getDefaultRoute = () => {
    if (!profile) return "/login";
    
    switch (profile.role) {
      case "taxpayer":
        return "/taxpayer/dashboard";
      case "developer":
        return "/developer/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/dashboard";
    }
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        profile ? <Navigate to={getDefaultRoute()} replace /> : <Home />
      } />
      <Route path="/map" element={<Map />} />
      <Route path="/search" element={<Search />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/login" element={
        profile ? <Navigate to={getDefaultRoute()} replace /> : <Login />
      } />
      <Route path="/register" element={
        profile ? <Navigate to={getDefaultRoute()} replace /> : <Register />
      } />
      
      {/* Protected Routes */}
      <Route path="/notifications" element={
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      } />
      <Route path="/payment" element={
        <ProtectedRoute>
          <Payment />
        </ProtectedRoute>
      } />
      <Route path="/directory" element={
        <ProtectedRoute>
          <Directory />
        </ProtectedRoute>
      } />
      <Route path="/messages" element={
        <ProtectedRoute>
          <Messages />
        </ProtectedRoute>
      } />
      <Route path="/support" element={
        <ProtectedRoute>
          <Support />
        </ProtectedRoute>
      } />
      <Route path="/history" element={
        <ProtectedRoute>
          <History />
        </ProtectedRoute>
      } />
      
      {/* Role-Specific Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/taxpayer/*" element={
        <ProtectedRoute requiredRole="taxpayer">
          <TaxpayerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/taxpayer/properties" element={
        <ProtectedRoute requiredRole="taxpayer">
          <Properties />
        </ProtectedRoute>
      } />
      <Route path="/developer/*" element={
        <ProtectedRoute requiredRole="developer">
          <DeveloperDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/*" element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />

      {/* Catch all route - redirect to appropriate dashboard or home */}
      <Route path="*" element={<Navigate to={profile ? getDefaultRoute() : "/"} replace />} />
    </Routes>
  );
};