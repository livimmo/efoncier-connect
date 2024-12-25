import { Button } from "@/components/ui/button";
import { FileDown, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DeveloperFavoritesHeader = () => {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Export en cours",
      description: "Le fichier sera bientôt disponible au téléchargement",
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Actualisation en cours",
      description: "La liste des favoris est en cours d'actualisation",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">⭐ Mes Biens Favoris</h1>
          <p className="text-muted-foreground">
            Retrouvez ici vos biens fonciers favoris pour un accès rapide et simplifié.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button onClick={handleExport}>
            <FileDown className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>
    </div>
  );
};