export type NotificationType = 
  | "new_property"    // Nouveaux biens disponibles
  | "property_update" // Mises à jour des biens suivis
  | "message"        // Messages des propriétaires
  | "document"       // Nouveaux documents disponibles
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