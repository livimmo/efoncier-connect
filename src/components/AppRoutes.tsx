import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./auth/PrivateRoute";
import PrivateLogin from "@/pages/PrivateLogin";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Map from "@/components/Map";
import Dashboard from "@/pages/Dashboard";
import Register from "@/pages/Register";
import GuestPayment from "@/pages/GuestPayment";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Legal from "@/pages/Legal";
import DeveloperDashboard from "@/pages/developer/Dashboard";
import DeveloperProperties from "@/pages/developer/Properties";
import DeveloperFavorites from "@/pages/developer/Favorites";
import CommuneDashboard from "@/pages/commune/Dashboard";
import CommuneNotifications from "@/pages/commune/Notifications";
import OwnerDashboard from "@/pages/owner/Dashboard";
import OwnerProperties from "@/pages/owner/Properties";
import AdminDashboard from "@/pages/admin/Dashboard";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Notifications from "@/pages/Notifications";
import Messages from "@/pages/Messages";
import Support from "@/pages/Support";
import Payment from "@/pages/Payment";
import History from "@/pages/History";
import { UserRole } from "@/types/auth";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/private-login" element={<PrivateLogin />} />
      
      {/* Protected Routes */}
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
      <Route path="/map" element={<PrivateRoute><Map /></PrivateRoute>} />
      <Route path="/register" element={<PrivateRoute><Register /></PrivateRoute>} />
      <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />
      <Route path="/guest-payment" element={<PrivateRoute><GuestPayment /></PrivateRoute>} />
      <Route path="/privacy" element={<PrivateRoute><Privacy /></PrivateRoute>} />
      <Route path="/terms" element={<PrivateRoute><Terms /></PrivateRoute>} />
      <Route path="/legal" element={<PrivateRoute><Legal /></PrivateRoute>} />
      
      {/* Common Dashboard Route - Will redirect to role-specific dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Developer Routes */}
      <Route
        path="/developer/dashboard"
        element={
          <PrivateRoute>
            <DeveloperDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/developer/properties"
        element={
          <PrivateRoute>
            <DeveloperProperties />
          </PrivateRoute>
        }
      />
      <Route
        path="/developer/favorites"
        element={
          <PrivateRoute>
            <DeveloperFavorites />
          </PrivateRoute>
        }
      />

      {/* Commune Routes */}
      <Route
        path="/commune/dashboard"
        element={
          <PrivateRoute>
            <CommuneDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/commune/notifications"
        element={
          <PrivateRoute>
            <CommuneNotifications />
          </PrivateRoute>
        }
      />

      {/* Owner Routes */}
      <Route
        path="/owner/dashboard"
        element={
          <PrivateRoute>
            <OwnerDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/owner/properties"
        element={
          <PrivateRoute>
            <OwnerProperties />
          </PrivateRoute>
        }
      />
      <Route
        path="/owner/payment"
        element={
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      {/* Common Protected Routes */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <PrivateRoute>
            <Messages />
          </PrivateRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};