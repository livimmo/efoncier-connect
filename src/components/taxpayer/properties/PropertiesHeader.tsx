import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PropertiesHeader() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Mes Biens Foncier</h1>
          <p className="text-muted-foreground">
            Liste de vos terrains enregistrés avec leurs détails complets
          </p>
        </div>
        <Button 
          onClick={() => navigate("/property/add")}
          className="shrink-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un Terrain
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par numéro de titre foncier, typologie ou statut fiscal..."
          className="pl-10"
        />
      </div>
    </div>
  );
}