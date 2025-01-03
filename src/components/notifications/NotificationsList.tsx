import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationCard } from "./NotificationCard";
import type { NotificationFilter, Notification } from "@/types/notifications";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";

interface NotificationsListProps {
  filters: NotificationFilter;
}

export const NotificationsList = ({ filters }: NotificationsListProps) => {
  const { toast } = useToast();
  const { profile } = useAuth();

  const getDeveloperNotifications = (): Notification[] => [
    {
      id: "1",
      type: "NEW_PROPERTY",
      priority: "HIGH",
      status: "UNREAD",
      title: "Nouveau bien disponible",
      message: "Un nouveau bien correspondant à vos critères est disponible",
      date: new Date().toISOString(),
      read: false,
      metadata: {
        titleDeedNumber: "TF-45678",
      },
    },
    {
      id: "2",
      type: "PROPERTY_UPDATE",
      priority: "MEDIUM",
      status: "READ",
      title: "Mise à jour de prix",
      message: "Le prix d'un bien que vous suivez a été mis à jour",
      date: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      metadata: {
        titleDeedNumber: "TF-89012",
      },
    },
  ];

  const getOwnerNotifications = (): Notification[] => [
    {
      id: "1",
      type: "PAYMENT",
      priority: "HIGH",
      status: "UNREAD",
      title: "Paiement TNB en attente",
      message: "Votre TNB pour le bien TF-12345 est due avant le 30 juin 2024",
      date: new Date().toISOString(),
      read: false,
      metadata: {
        titleDeedNumber: "TF-12345",
        amount: 5000,
        dueDate: "2024-06-30",
      },
    },
    {
      id: "2",
      type: "FISCAL_STATUS",
      priority: "MEDIUM",
      status: "READ",
      title: "Mise à jour du statut fiscal",
      message: "Le statut fiscal du bien TF-67890 est passé à 'Payé'",
      date: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      metadata: {
        titleDeedNumber: "TF-67890",
      },
    },
  ];

  const getRoleSpecificNotifications = () => {
    switch (profile?.role) {
      case "developer":
        return getDeveloperNotifications();
      case "owner":
        return getOwnerNotifications();
      default:
        return [];
    }
  };

  const notifications = getRoleSpecificNotifications();

  const filteredNotifications = notifications.filter((notification) => {
    if (filters.type !== "all" && notification.type !== filters.type) return false;
    if (filters.status !== "all" && 
        (filters.status === "unread" ? notification.read : !notification.read)) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        notification.title.toLowerCase().includes(searchLower) ||
        notification.message.toLowerCase().includes(searchLower) ||
        notification.metadata?.titleDeedNumber?.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const handleNotificationClick = (notification: Notification) => {
    toast({
      title: "Notification",
      description: "Redirection vers les détails de la notification...",
    });
  };

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-4 pr-4">
        {filteredNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onClick={() => handleNotificationClick(notification)}
          />
        ))}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Aucune notification ne correspond à vos critères.
          </div>
        )}
      </div>
    </ScrollArea>
  );
};