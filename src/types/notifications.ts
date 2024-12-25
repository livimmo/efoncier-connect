export type NotificationType = 
  | "PAYMENT"
  | "PAYMENT_DUE"
  | "FISCAL_STATUS"
  | "MESSAGE"
  | "DOCUMENT"
  | "DOCUMENT_RECEIVED"
  | "URGENT"
  | "PROPERTY"
  | "REPORT"
  | "PROPERTY_UPDATE"
  | "NEW_PROPERTY"
  | "STATUS_UPDATE";

export type NotificationPriority = "HIGH" | "MEDIUM" | "LOW";

export type NotificationStatus = "READ" | "UNREAD";

export interface NotificationMetadata {
  titleDeedNumber?: string;
  amount?: number;
  dueDate?: string;
  documentUrl?: string;
  documentType?: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  message: string;
  date: string;
  read: boolean;
  metadata?: NotificationMetadata;
}

export interface NotificationFilter {
  search?: string;
  type?: NotificationType | "all";
  status?: "read" | "unread" | "all";
  priority?: NotificationPriority | "all";
}