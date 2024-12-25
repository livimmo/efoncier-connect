import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle } from "lucide-react";

interface NotificationHeaderProps {
  onMarkAllAsRead: () => void;
  onRefresh: () => void;
  unreadCount: number;
}

export const NotificationHeader = ({
  onMarkAllAsRead,
  onRefresh,
  unreadCount,
}: NotificationHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Restez informé en temps réel sur vos biens, transactions et obligations fiscales
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
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        {unreadCount} notification{unreadCount !== 1 ? 's' : ''} non lue{unreadCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
};