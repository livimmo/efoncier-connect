import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { Header } from "@/components/Header";
import { DashboardTab } from "@/components/profile/tabs/DashboardTab";

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && profile) {
      switch (profile.role) {
        case "owner":
          navigate("/owner/dashboard", { replace: true });
          break;
        case "developer":
          navigate("/developer/dashboard", { replace: true });
          break;
        case "commune":
          navigate("/commune/dashboard", { replace: true });
          break;
        case "admin":
          navigate("/admin/dashboard", { replace: true });
          break;
        default:
          break;
      }
    } else if (!loading && !profile) {
      navigate("/login", { replace: true });
    }
  }, [profile, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return null;
};

export default Dashboard;