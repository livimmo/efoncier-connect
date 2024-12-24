import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

export const AddPropertyButton = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  if (profile?.role !== "taxpayer") {
    return null;
  }

  return (
    <Button 
      onClick={() => navigate("/property/add")}
      className="gap-2"
    >
      <Plus className="h-4 w-4" />
      <span className="hidden sm:inline">Ajouter un Bien</span>
    </Button>
  );
};