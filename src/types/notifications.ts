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

export interface NotificationFilter {
  type: string;
  status: string;
  priority: string;
  date: string | null;
  location: string;
  search: string;
  titleDeedNumber?: string;
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