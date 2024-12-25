import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationHeaderProps {
  onMarkAllAsRead: () => void;
  onRefresh: () => void;
  onExport: () => void;
  unreadCount: number;
}

export const NotificationHeader = ({
  onMarkAllAsRead,
  onRefresh,
  onExport,
  unreadCount,
}: NotificationHeaderProps) => {
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">🔔 Notifications Promoteur</h1>
          <p className="text-muted-foreground mt-1">
            Restez informé des nouveaux biens disponibles, des mises à jour importantes et des échanges avec les propriétaires
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex"
            onClick={onMarkAllAsRead}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Tout marquer comme lu
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
          >
            <RefreshCw className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Actualiser</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
          >
            <Download className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Exporter</span>
          </Button>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        {unreadCount} notification{unreadCount !== 1 ? 's' : ''} non lue{unreadCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
};