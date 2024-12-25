import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./auth/PrivateRoute";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Properties from "@/pages/owner/Properties";
import Payment from "@/pages/Payment";
import { UserRole } from "@/types/auth";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/properties"
        element={
          <PrivateRoute allowedRoles={[UserRole.OWNER, UserRole.ADMIN]}>
            <Properties />
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
    </Routes>
  );
};