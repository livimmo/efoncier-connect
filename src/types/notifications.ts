export type NotificationType = 
  | "PAYMENT_DUE"
  | "PAYMENT_RECEIVED"
  | "DOCUMENT_UPLOADED"
  | "STATUS_CHANGE"
  | "MESSAGE_RECEIVED"
  | "SYSTEM";

export type NotificationPriority = "LOW" | "MEDIUM" | "HIGH";

export type NotificationStatus = "PENDING" | "COMPLETED" | "CANCELLED";

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  message: string;
  date: string;
  link?: string;
  read: boolean;
}

export interface NotificationCardProps extends Notification {
  onClick: () => void;
}