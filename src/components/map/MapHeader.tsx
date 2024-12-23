import { Button } from "@/components/ui/button";
import { MapIcon, Filter, History, LayoutDashboard } from "lucide-react";

export const MapHeader = () => {
  return (
    <div className="p-6 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <MapIcon className="h-6 w-6 text-primary" />
              Carte Interactive des Terrains
            </h1>
            <p className="text-muted-foreground mt-1">
              Explorez et analysez les terrains disponibles avec des informations détaillées en temps réel.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
            <Button variant="outline" size="sm">
              <History className="h-4 w-4 mr-2" />
              Historique
            </Button>
            <Button variant="outline" size="sm">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Tableau de Bord
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};