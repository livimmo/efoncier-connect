import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationCard } from "./cards/NotificationCard";
import type { NotificationFilter, Notification } from "@/types/notifications";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "payment",
    priority: "high",
    status: "unread",
    title: "Paiement TNB en attente",
    message: "Votre TNB pour le bien TF-12345 est due avant le 30 juin 2024",
    date: new Date().toISOString(),
    metadata: {
      titleDeedNumber: "TF-12345",
      amount: 5000,
      dueDate: "2024-06-30",
    },
  },
  {
    id: "2",
    type: "fiscal_status",
    priority: "medium",
    status: "read",
    title: "Mise à jour du statut fiscal",
    message: "Le statut fiscal du bien TF-67890 est passé à 'Payé'",
    date: new Date(Date.now() - 86400000).toISOString(),
    metadata: {
      titleDeedNumber: "TF-67890",
    },
  },
];

interface NotificationsListProps {
  filters: NotificationFilter;
}

export const NotificationsList = ({ filters }: NotificationsListProps) => {
  const { toast } = useToast();

  const filteredNotifications = mockNotifications.filter((notification) => {
    if (filters.type !== "all" && notification.type !== filters.type) return false;
    if (filters.status !== "all" && notification.status !== filters.status) return false;
    if (filters.titleDeedNumber && !notification.metadata?.titleDeedNumber?.includes(filters.titleDeedNumber)) return false;
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