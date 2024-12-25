import { NotificationCard } from "./NotificationCard";
import type { Notification, NotificationFilter } from "./types";

interface NotificationListProps {
  notifications: Notification[];
  filters?: NotificationFilter;
  onClick?: () => void;
}

export const NotificationList = ({ notifications, filters, onClick }: NotificationListProps) => {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div key={notification.id} onClick={onClick}>
          <NotificationCard {...notification} />
        </div>
      ))}
    </div>
  );
};