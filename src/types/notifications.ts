export type NotificationType = 
  | "PAYMENT" 
  | "DOCUMENT" 
  | "MESSAGE" 
  | "STATUS_UPDATE" 
  | "PROPERTY_UPDATE" 
  | "NEW_PROPERTY" 
  | "FISCAL_STATUS" 
  | "REPORT" 
  | "URGENT"
  | "PROPERTY";

export type NotificationPriority = "HIGH" | "MEDIUM" | "LOW";
export type NotificationStatus = "READ" | "UNREAD";

export interface NotificationMetadata {
  propertyId?: string;
  documentId?: string;
  paymentId?: string;
  amount?: number;
  dueDate?: string;
  location?: {
    city?: string;
    district?: string;
  };
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
}

export interface NotificationFilter {
  type: string;
  status: string;
  priority: string;
  search: string;
  date: Date | null;
  location: string;
  titleDeedNumber?: string;
}