import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = sessionStorage.getItem("isPrivateAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/private-login" replace />;
  }

  return <>{children}</>;
};