import { NotificationCard } from "./NotificationCard";
import type { Notification, NotificationFilter } from "./types";

interface NotificationListProps {
  notifications: Notification[];
  filters?: NotificationFilter;
  onClick?: (notification: Notification) => void;
}

export const NotificationList = ({ notifications, filters, onClick }: NotificationListProps) => {
  // Filter notifications based on search and other criteria
  const filteredNotifications = notifications.filter(notification => {
    if (!filters) return true;
    
    const matchesSearch = filters.search 
      ? notification.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        notification.message.toLowerCase().includes(filters.search.toLowerCase())
      : true;

    const matchesType = filters.type === "all" || notification.type === filters.type;
    const matchesStatus = filters.status === "all" || 
      (filters.status === "unread" ? !notification.read : notification.read);

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {filteredNotifications.map((notification) => (
        <div key={notification.id} onClick={() => onClick?.(notification)}>
          <NotificationCard {...notification} />
        </div>
      ))}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Aucune notification ne correspond à vos critères.
        </div>
      )}
    </div>
  );
};