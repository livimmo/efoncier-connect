export type NotificationType = 
  | "payment"        // Paiements TNB
  | "fiscal_status"  // Statut fiscal
  | "message"        // Messages des promoteurs/propriétaires
  | "document"       // Documents disponibles
  | "system"         // Notifications système
  | "urgent"         // Notifications urgentes
  | "property"       // Notifications liées aux biens
  | "report"         // Rapports et statistiques
  | "property_update" // Mises à jour des biens
  | "new_property";   // Nouveaux biens disponibles

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