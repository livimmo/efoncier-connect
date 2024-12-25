import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const NotificationsHeader = () => {
  const { toast } = useToast();

  const handleMarkAllAsRead = () => {
    toast({
      title: "Succès",
      description: "Toutes les notifications ont été marquées comme lues",
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Actualisation",
      description: "Les notifications ont été actualisées",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export",
      description: "L'export des notifications est en cours...",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">📢 Centre de Notifications</h1>
        <p className="text-muted-foreground mt-1">
          Restez informé des dernières mises à jour, interactions et alertes importantes
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Tout marquer comme lu
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
        >
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>
    </div>
  );
};