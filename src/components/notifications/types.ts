export type NotificationType = "message" | "payment" | "property" | "document" | "system" | "warning" | "reminder" | "transaction";
export type NotificationPriority = "high" | "medium" | "low";

export interface NotificationFilter {
  type: string;
  status: string;
  date: Date | null;
  search: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  date: string;
  read: boolean;
  actions?: {
    primary?: {
      label: string;
      action: () => void;
    };
    secondary?: {
      label: string;
      action: () => void;
    };
  };
}