import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { DashboardTab } from "@/components/profile/tabs/DashboardTab";
import { Header } from "@/components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && profile) {
      switch (profile.role) {
        case "owner":
          navigate("/owner/dashboard");
          break;
        case "developer":
          navigate("/developer/dashboard");
          break;
        case "commune":
          navigate("/commune/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        default:
          // If no specific role or unknown role, show default dashboard
          return;
      }
    } else if (!loading && !profile) {
      // If not logged in, redirect to login
      navigate("/login");
    }
  }, [profile, loading, navigate]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">Chargement...</div>
      </>
    );
  }

  // If no specific role or waiting for redirect, show default dashboard
  return (
    <>
      <Header />
      <div className="container mx-auto p-6 mt-16">
        <h1 className="text-2xl font-bold mb-6">Tableau de Bord</h1>
        <DashboardTab />
      </div>
    </>
  );
};

export default Dashboard;