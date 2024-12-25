export type NotificationType = "PAYMENT_DUE" | "DOCUMENT_RECEIVED" | "MESSAGE" | "STATUS_UPDATE" | "PROPERTY_UPDATE";
export type NotificationPriority = "HIGH" | "MEDIUM" | "LOW";
export type NotificationStatus = "READ" | "UNREAD";

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  message: string;
  timestamp: string;
  metadata?: {
    propertyId?: string;
    documentId?: string;
    paymentId?: string;
    amount?: number;
    dueDate?: string;
    location?: string;
  };
  actions?: {
    primary?: {
      label: string;
      action: string;
    };
    secondary?: {
      label: string;
      action: string;
    };
  };
}

export interface NotificationFilter {
  type: string;
  priority: string;
  status: string;
  search: string;
}