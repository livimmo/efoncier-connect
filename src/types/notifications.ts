export type NotificationStatus = "read" | "unread";
export type NotificationPriority = "high" | "medium" | "low";
export type NotificationCategory = "payment" | "document" | "property" | "system" | "message";
export type NotificationType = 
  | "PAYMENT" 
  | "FISCAL_STATUS" 
  | "MESSAGE" 
  | "DOCUMENT" 
  | "URGENT" 
  | "PROPERTY" 
  | "REPORT" 
  | "PROPERTY_UPDATE" 
  | "NEW_PROPERTY" 
  | "STATUS_UPDATE"
  | "PAYMENT_DUE"
  | "DOCUMENT_RECEIVED"
  | "SYSTEM";

export interface NotificationAction {
  label: string;
  icon?: React.ReactNode;
  action: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export interface NotificationActions {
  primary?: NotificationAction;
  secondary?: NotificationAction;
}

export interface NotificationMetadata {
  titleDeedNumber?: string;
  amount?: number;
  dueDate?: string;
  documentType?: string;
  documentUrl?: string;
}

export interface NotificationLocation {
  city: string;
  district: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  status: NotificationStatus;
  priority: NotificationPriority;
  category: NotificationCategory;
  type: NotificationType;
  createdAt: string;
  read: boolean;
  metadata?: NotificationMetadata;
  location?: NotificationLocation;
  actions?: NotificationActions;
}

export interface NotificationFilter {
  status: NotificationStatus | "all";
  priority: NotificationPriority | "all";
  category?: NotificationCategory;
  type: NotificationType | "all";
  date?: string | null;
  location: string | "all";
  search: string;
  titleDeedNumber?: string;
}