import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./auth/PrivateRoute";
import Home from "@/pages/Home";
import Map from "@/components/Map";
import DeveloperDashboard from "@/pages/developer/Dashboard";
import DeveloperProperties from "@/pages/developer/Properties";
import DeveloperFavorites from "@/pages/developer/Favorites";
import CommuneDashboard from "@/pages/commune/Dashboard";
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
      <Route path="/map" element={<Map />} />
      
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
        path="/support"
        element={
          <PrivateRoute>
            <Support />
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