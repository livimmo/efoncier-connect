import { Plus, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const OwnerActions = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/stats")}
        className="relative"
      >
        <BarChart2 className="h-5 w-5" />
      </Button>
      <Button
        onClick={() => navigate("/property/add")}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">Ajouter un Bien</span>
      </Button>
    </>
  );
};