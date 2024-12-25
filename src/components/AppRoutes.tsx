import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import Home from "@/pages/Home";
import Map from "@/components/Map";
import DeveloperDashboard from "@/pages/developer/Dashboard";
import DeveloperProperties from "@/pages/developer/Properties";
import DeveloperFavorites from "@/pages/developer/Favorites";
import CommuneDashboard from "@/pages/commune/Dashboard";
import CommuneProperties from "@/pages/commune/Properties";
import OwnerDashboard from "@/pages/owner/Dashboard";
import OwnerProperties from "@/pages/owner/Properties";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminProperties from "@/pages/admin/Properties";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Notifications from "@/pages/Notifications";
import Messages from "@/pages/Messages";
import Support from "@/pages/Support";
import Payment from "@/pages/Payment";
import History from "@/pages/History";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      
      {/* Developer Routes */}
      <Route
        path="/developer/dashboard"
        element={
          <PrivateRoute allowedRoles={["developer"]}>
            <DeveloperDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/developer/properties"
        element={
          <PrivateRoute allowedRoles={["developer"]}>
            <DeveloperProperties />
          </PrivateRoute>
        }
      />
      <Route
        path="/developer/favorites"
        element={
          <PrivateRoute allowedRoles={["developer"]}>
            <DeveloperFavorites />
          </PrivateRoute>
        }
      />

      {/* Commune Routes */}
      <Route
        path="/commune/dashboard"
        element={
          <PrivateRoute allowedRoles={["commune"]}>
            <CommuneDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/commune/properties"
        element={
          <PrivateRoute allowedRoles={["commune"]}>
            <CommuneProperties />
          </PrivateRoute>
        }
      />

      {/* Owner Routes */}
      <Route
        path="/owner/dashboard"
        element={
          <PrivateRoute allowedRoles={["owner"]}>
            <OwnerDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/owner/properties"
        element={
          <PrivateRoute allowedRoles={["owner"]}>
            <OwnerProperties />
          </PrivateRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/properties"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminProperties />
          </PrivateRoute>
        }
      />

      {/* Common Protected Routes */}
      <Route
        path="/profile"
        element={
          <PrivateRoute allowedRoles={["owner", "developer", "commune", "admin"]}>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute allowedRoles={["owner", "developer", "commune", "admin"]}>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <PrivateRoute allowedRoles={["owner", "developer", "commune", "admin"]}>
            <Notifications />
          </PrivateRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <PrivateRoute allowedRoles={["owner", "developer", "commune", "admin"]}>
            <Messages />
          </PrivateRoute>
        }
      />
      <Route
        path="/support"
        element={
          <PrivateRoute allowedRoles={["owner", "developer", "commune", "admin"]}>
            <Support />
          </PrivateRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <PrivateRoute allowedRoles={["owner", "developer", "commune"]}>
            <Payment />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute allowedRoles={["owner", "developer", "commune", "admin"]}>
            <History />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;