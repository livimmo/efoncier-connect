import { Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// Pages (temporarily unprotected)
import Dashboard from "@/pages/Dashboard";
import OwnerDashboard from "@/pages/owner/Dashboard";
import Properties from "@/pages/owner/Properties";
import DeveloperDashboard from "@/pages/developer/Dashboard";
import AdminDashboard from "@/pages/admin/Dashboard";
import Notifications from "@/pages/Notifications";
import Payment from "@/pages/Payment";
import Directory from "@/pages/Directory";
import Messages from "@/pages/Messages";
import Support from "@/pages/Support";
import History from "@/pages/History";
import Map from "@/components/Map";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/search" element={<Search />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Temporarily Unprotected Routes */}
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/directory" element={<Directory />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/support" element={<Support />} />
      <Route path="/history" element={<History />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/owner/*" element={<OwnerDashboard />} />
      <Route path="/owner/properties" element={<Properties />} />
      <Route path="/developer/*" element={<DeveloperDashboard />} />
      <Route path="/admin/*" element={<AdminDashboard />} />

      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};