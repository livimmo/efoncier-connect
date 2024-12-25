export type NotificationType = 
  | "payment"        // Paiements TNB
  | "fiscal_status"  // Statut fiscal
  | "message"        // Messages des promoteurs
  | "document"       // Documents disponibles
  | "system"         // Notifications système
  | "urgent";        // Notifications urgentes

export type NotificationPriority = "high" | "medium" | "low";

export interface NotificationFilter {
  type: string;
  status: string;
  date: string | null;
  location: string;
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
  propertyId?: string;
  location?: {
    region?: string;
    city?: string;
    district?: string;
  };
  metadata?: {
    titleDeedNumber?: string;
    surface?: number;
    price?: number;
    documentUrl?: string;
    documentType?: string;
    dueDate?: string;
    amount?: number;
    paymentStatus?: string;
  };
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