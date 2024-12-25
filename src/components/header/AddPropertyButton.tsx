import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { AddPropertyDialog } from "@/components/property/AddPropertyDialog";

export const AddPropertyButton = () => {
  const [open, setOpen] = useState(false);
  const { profile } = useAuth();

  if (profile?.role !== "owner") {
    return null;
  }

  return (
    <>
      <Button 
        onClick={() => setOpen(true)}
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