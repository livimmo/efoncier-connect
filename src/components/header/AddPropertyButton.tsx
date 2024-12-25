import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { AddPropertyDialog } from "@/components/property/AddPropertyDialog";
import { useNavigate } from "react-router-dom";

export const AddPropertyButton = () => {
  const [open, setOpen] = useState(false);
  const { profile } = useAuth();
  const navigate = useNavigate();

  if (profile?.role !== "owner") {
    return null;
  }

  const handleClick = () => {
    // Vous pouvez choisir d'utiliser soit le dialogue, soit la navigation
    // Pour cet exemple, j'utilise le dialogue
    setOpen(true);
    // Ou décommentez la ligne suivante pour utiliser la navigation à la place
    // navigate("/property/add");
  };

  return (
    <>
      <Button 
        onClick={handleClick}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">Ajouter un Bien</span>
      </Button>

      <AddPropertyDialog 
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};