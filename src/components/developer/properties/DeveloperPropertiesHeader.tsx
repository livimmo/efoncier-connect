import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, RefreshCw } from "lucide-react";

interface DeveloperPropertiesHeaderProps {
  onExport: () => void;
}

export const DeveloperPropertiesHeader = ({ onExport }: DeveloperPropertiesHeaderProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">🏗️ Mes Biens – Promoteur</h1>
        <p className="text-muted-foreground mt-2">
          Accédez, consultez et gérez les biens fonciers disponibles et vos terrains suivis.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Rechercher par localisation, numéro TF, superficie..." 
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="whitespace-nowrap">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
          <Button variant="outline" className="whitespace-nowrap" onClick={onExport}>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>
    </div>
  );
};