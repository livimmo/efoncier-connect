import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/Dashboard";
import Map from "@/pages/Map";
import Properties from "@/pages/Properties";
import Property from "@/pages/Property";
import Documents from "@/pages/Documents";
import Payments from "@/pages/Payments";
import Settings from "@/pages/Settings";
import Messages from "@/pages/Messages";
import NotificationsPage from "@/pages/notifications/NotificationsPage";
import CommuneNotifications from "@/pages/commune/Notifications";
import OwnerNotifications from "@/pages/owner/Notifications";

export const AppRoutes = () => {
  const { isAuthenticated, profile } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  const NotificationsComponent = () => {
    switch (profile?.role) {
      case "commune":
        return <CommuneNotifications />;
      case "owner":
        return <OwnerNotifications />;
      default:
        return <NotificationsPage />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/map" element={<Map />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/property/:id" element={<Property />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/notifications" element={<NotificationsComponent />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};