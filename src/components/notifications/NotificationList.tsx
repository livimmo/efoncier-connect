import { NotificationCard } from "./NotificationCard";
import type { Notification } from "./types";

interface NotificationListProps {
  notifications: Notification[];
  onClick?: () => void;
}

export const NotificationList = ({ notifications, onClick }: NotificationListProps) => {
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