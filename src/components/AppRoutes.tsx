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
import OwnerDashboard from "@/pages/owner/Dashboard";
import OwnerProfile from "@/pages/owner/Profile";
import OwnerProperties from "@/pages/owner/Properties";
import { PrivateRoute } from "@/components/auth/PrivateRoute";

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

      {/* Routes protégées */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />

      {/* Routes spécifiques aux propriétaires */}
      <Route path="/owner">
        <Route path="dashboard" element={<PrivateRoute><OwnerDashboard /></PrivateRoute>} />
        <Route path="profile" element={<PrivateRoute><OwnerProfile /></PrivateRoute>} />
        <Route path="properties" element={<PrivateRoute><OwnerProperties /></PrivateRoute>} />
      </Route>
    </Routes>
  );
};