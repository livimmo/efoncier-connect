import { Plus, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AddPropertyDialog } from "@/components/property/AddPropertyDialog";
import { useState } from "react";

export const OwnerActions = () => {
  const navigate = useNavigate();
  const [showAddProperty, setShowAddProperty] = useState(false);

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
        onClick={() => setShowAddProperty(true)}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">Ajouter un Bien</span>
      </Button>

      <AddPropertyDialog 
        open={showAddProperty}
        onOpenChange={setShowAddProperty}
      />
    </>
  );
};