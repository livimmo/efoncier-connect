import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import Support from "@/pages/Support";
import Map from "@/components/Map";
import Messages from "@/pages/Messages";
import Dashboard from "@/pages/Dashboard";
import History from "@/pages/History";
import Payment from "@/pages/Payment";
import Notifications from "@/pages/Notifications";
import OwnerDashboard from "@/pages/owner/Dashboard";
import OwnerProfile from "@/pages/owner/Profile";
import OwnerProperties from "@/pages/owner/Properties";
import DeveloperDashboard from "@/pages/developer/Dashboard";
import DeveloperProperties from "@/pages/developer/Properties";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { AddPropertyForm } from "@/components/property/AddPropertyForm";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/support" element={<Support />} />
      <Route path="/map" element={<Map />} />

      {/* Routes protégées communes */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
      <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
      <Route path="/payments" element={<PrivateRoute><Payment /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />

      {/* Routes spécifiques aux propriétaires */}
      <Route path="/owner">
        <Route path="dashboard" element={<PrivateRoute><OwnerDashboard /></PrivateRoute>} />
        <Route path="profile" element={<PrivateRoute><OwnerProfile /></PrivateRoute>} />
        <Route path="properties" element={<PrivateRoute><OwnerProperties /></PrivateRoute>} />
        <Route path="payments" element={<PrivateRoute><Payment /></PrivateRoute>} />
      </Route>

      {/* Route pour ajouter un bien */}
      <Route path="/property/add" element={<PrivateRoute><AddPropertyForm /></PrivateRoute>} />

      {/* Routes spécifiques aux promoteurs */}
      <Route path="/developer">
        <Route path="dashboard" element={<PrivateRoute><DeveloperDashboard /></PrivateRoute>} />
        <Route path="properties" element={<PrivateRoute><DeveloperProperties /></PrivateRoute>} />
      </Route>
    </Routes>
  );
};