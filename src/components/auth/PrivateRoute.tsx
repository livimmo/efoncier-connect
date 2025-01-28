import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/private-login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};