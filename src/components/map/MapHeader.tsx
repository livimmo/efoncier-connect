import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const MapHeader = () => {
  return (
    <div className="p-6 border-b">
      <h1 className="text-2xl font-bold mb-2">
        🗺️ Carte Interactive des Terrains
      </h1>
      <p className="text-muted-foreground mb-4">
        📊 Explorez et analysez les terrains disponibles avec des informations détaillées en temps réel.
      </p>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Rechercher par titre foncier, propriétaire, localisation..."
          className="pl-10"
        />
      </div>
    </div>
  );
};