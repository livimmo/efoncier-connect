import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Map, Search, Settings } from "lucide-react";

interface CommunePropertiesHeaderProps {
  onSearch: (query: string) => void;
  onExport: () => void;
  onViewMap: () => void;
}

export const CommunePropertiesHeader = ({
  onSearch,
  onExport,
  onViewMap,
}: CommunePropertiesHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Biens - Commune</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onExport}>
            <FileText className="h-4 w-4 mr-2" />
            Exporter le Rapport
          </Button>
          <Button onClick={onViewMap}>
            <Map className="h-4 w-4 mr-2" />
            Voir sur la Carte
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par titre foncier, propriétaire, zone..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};