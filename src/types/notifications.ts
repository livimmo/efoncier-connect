export type NotificationType = 
  | "payment"
  | "fiscal_status"
  | "message"
  | "document"
  | "property_update"
  | "urgent";

export type NotificationPriority = "high" | "medium" | "low";

export type NotificationStatus = "read" | "unread";

export interface NotificationMetadata {
  titleDeedNumber?: string;
  surface?: number;
  price?: number;
  documentUrl?: string;
  documentType?: string;
  dueDate?: string;
  amount?: number;
  paymentStatus?: string;
  location?: {
    city: string;
    district: string;
  };
}

export interface NotificationAction {
  label: string;
  action: () => void;
  icon?: React.ReactNode;
}

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  message: string;
  date: string;
  metadata?: NotificationMetadata;
  actions?: {
    primary?: NotificationAction;
    secondary?: NotificationAction;
  };
}

export interface NotificationFilter {
  type: string;
  status: string;
  date: string | null;
  location: string;
  search: string;
  titleDeedNumber: string;
}