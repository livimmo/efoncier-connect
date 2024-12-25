import { RefreshCw, CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";

export const NotificationsHeader = () => {
  const { toast } = useToast();
  const { profile } = useAuth();

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

  const getHeaderTitle = () => {
    switch (profile?.role) {
      case "developer":
        return "🔔 Notifications Promoteur";
      case "owner":
        return "🔔 Notifications Propriétaire";
      case "commune":
        return "🔔 Notifications Commune";
      case "admin":
        return "🔔 Notifications Admin";
      default:
        return "🔔 Notifications";
    }
  };

  const getHeaderDescription = () => {
    switch (profile?.role) {
      case "developer":
        return "Suivez les mises à jour des biens, les messages des propriétaires et les opportunités d'investissement.";
      case "owner":
        return "Restez informé des alertes fiscales, des paiements et des communications concernant vos biens fonciers.";
      case "commune":
        return "Gérez les notifications relatives aux statuts fiscaux et aux mises à jour administratives.";
      case "admin":
        return "Supervisez toutes les notifications système et les alertes importantes.";
      default:
        return "Gérez vos notifications et restez informé.";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{getHeaderTitle()}</h1>
          <p className="text-muted-foreground mt-1">
            {getHeaderDescription()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex"
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
            <RefreshCw className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Actualiser</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Exporter</span>
          </Button>
        </div>
      </div>
    </div>
  );
};