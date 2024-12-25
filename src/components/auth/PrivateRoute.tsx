import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { profile, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};