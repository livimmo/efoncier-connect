import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  useEffect(() => {
    if (profile) {
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
      }
    }
  }, [profile, navigate]);

  return null;
};

export default Dashboard;