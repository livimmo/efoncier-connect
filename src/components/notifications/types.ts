export type NotificationType = "message" | "payment" | "property" | "warning" | "reminder" | "transaction" | "system";
export type NotificationPriority = "high" | "medium" | "low";

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