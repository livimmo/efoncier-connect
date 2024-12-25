export type NotificationType = 
  | "fiscal" 
  | "property" 
  | "message" 
  | "document" 
  | "system" 
  | "warning" 
  | "reminder" 
  | "transaction";

export type NotificationPriority = "high" | "medium" | "low";

export interface NotificationFilter {
  type: string;
  status: string;
  date: string | null;
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

export interface NotificationGroup {
  title: string;
  notifications: Notification[];
}