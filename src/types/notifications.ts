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
  | "PAYMENT_DUE" 
  | "DOCUMENT_RECEIVED" 
  | "STATUS_UPDATE";

export type NotificationPriority = "HIGH" | "MEDIUM" | "LOW";
export type NotificationStatus = "READ" | "UNREAD";

export interface NotificationMetadata {
  propertyId?: string;
  documentId?: string;
  paymentId?: string;
  amount?: number;
  dueDate?: string;
  location?: string;
  titleDeedNumber?: string;
  documentType?: string;
  documentUrl?: string;
  surface?: number;
  price?: number;
}

export interface NotificationAction {
  label: string;
  icon?: React.ReactNode;
  action: () => void;
}

export interface NotificationFilter {
  type: string;
  status: string;
  priority: string;
  date: string | null;
  location: string;
  search: string;
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
  actions?: {
    primary?: NotificationAction;
    secondary?: NotificationAction;
  };
  location?: {
    city?: string;
    district?: string;
  };
}