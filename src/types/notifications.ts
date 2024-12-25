export type NotificationStatus = "unread" | "read";
export type NotificationPriority = "low" | "medium" | "high";
export type NotificationCategory = "payment" | "document" | "property" | "system" | "message";

export interface NotificationAction {
  label: string;
  action: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  status: NotificationStatus;
  priority: NotificationPriority;
  category: NotificationCategory;
  createdAt: string;
  actions?: NotificationAction[];
  location?: string;
}

export interface NotificationFilter {
  status?: NotificationStatus;
  priority?: NotificationPriority;
  category?: NotificationCategory;
  date?: string;
  location?: string;
}