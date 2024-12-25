import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./auth/PrivateRoute";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Map from "@/components/Map";
import Dashboard from "@/pages/Dashboard";
import Register from "@/pages/Register";
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
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/map" element={<Map />} />
      <Route path="/register" element={<Register />} />
      
      {/* Common Dashboard Route - Will redirect to role-specific dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute allowedRoles={["owner", "developer", "commune", "admin"] as UserRole[]}>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Developer Routes */}
      <Route
        path="/developer/dashboard"
        element={
          <PrivateRoute allowedRoles={["developer"] as UserRole[]}>
            <DeveloperDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/developer/properties"
        element={
          <PrivateRoute allowedRoles={["developer"] as UserRole[]}>
            <DeveloperProperties />
          </PrivateRoute>
        }
      />
      <Route
        path="/developer/favorites"
        element={
          <PrivateRoute allowedRoles={["developer"] as UserRole[]}>
            <DeveloperFavorites />
          </PrivateRoute>
        }
      />

      {/* Commune Routes */}
      <Route
        path="/commune/dashboard"
        element={
          <PrivateRoute allowedRoles={["commune"] as UserRole[]}>
            <CommuneDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/commune/notifications"
        element={
          <PrivateRoute allowedRoles={["commune"] as UserRole[]}>
            <CommuneNotifications />
          </PrivateRoute>
        }
      />

      {/* Owner Routes */}
      <Route
        path="/owner/dashboard"
        element={
          <PrivateRoute allowedRoles={["owner"] as UserRole[]}>
            <OwnerDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/owner/properties"
        element={
          <PrivateRoute allowedRoles={["owner"] as UserRole[]}>
            <OwnerProperties />
          </PrivateRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute allowedRoles={["admin"] as UserRole[]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      {/* Common Protected Routes */}
      <Route
        path="/profile"
        element={
          <PrivateRoute allowedRoles={["owner", "developer", "commune", "admin"] as UserRole[]}>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute allowedRoles={["owner", "developer", "commune", "admin"] as UserRole[]}>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <PrivateRoute allowedRoles={["owner", "developer", "commune", "admin"] as UserRole[]}>
            <Notifications />
          </PrivateRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <PrivateRoute allowedRoles={["owner", "developer", "commune", "admin"] as UserRole[]}>
            <Messages />
          </PrivateRoute>
        }
      />
      <Route
        path="/support"
        element={
          <PrivateRoute allowedRoles={["owner", "developer", "commune", "admin"] as UserRole[]}>
            <Support />
          </PrivateRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <PrivateRoute allowedRoles={["owner", "developer", "commune"] as UserRole[]}>
            <Payment />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute allowedRoles={["owner", "developer", "commune", "admin"] as UserRole[]}>
            <History />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};