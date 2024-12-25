export type NotificationType = 
  | "PAYMENT_DUE" 
  | "DOCUMENT_RECEIVED" 
  | "MESSAGE" 
  | "STATUS_UPDATE" 
  | "PROPERTY_UPDATE" 
  | "NEW_PROPERTY" 
  | "FISCAL_STATUS" 
  | "REPORT" 
  | "URGENT";

export type NotificationPriority = "HIGH" | "MEDIUM" | "LOW";
export type NotificationStatus = "READ" | "UNREAD";

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  message: string;
  date: string;
  read: boolean;
  metadata?: {
    propertyId?: string;
    documentId?: string;
    paymentId?: string;
    amount?: number;
    dueDate?: string;
    location?: string;
    titleDeedNumber?: string;
    documentType?: string;
    documentUrl?: string;
  };
  actions?: {
    primary?: {
      label: string;
      icon?: React.ReactNode;
      action: () => void;
    };
    secondary?: {
      label: string;
      icon?: React.ReactNode;
      action: () => void;
    };
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

export interface MapFilters {
  region: string;
  commune: string;
  propertyType: string;
  zoneType: string;
  size: [number, number];
  status: string;
  ownerName: string;
  titleDeedNumber: string;
  lastPaymentDate: Date | null;
  fiscalStatus: string;
  maxPrice: number;
  tnbReference: string;
  searchQuery: string;
  zoning: string;
  paymentStatus: string;
  tnbStatus: string;
}