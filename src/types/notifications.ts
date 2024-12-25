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

export type NotificationStatus = "read" | "unread";

export interface NotificationMetadata {
  titleDeedNumber?: string;
  surface?: number;
  price?: number;
  documentUrl?: string;
  documentType?: string;
  dueDate?: string;
  amount?: number;
  paymentStatus?: string;
  location?: {
    city: string;
    district: string;
  };
}

export interface NotificationAction {
  label: string;
  action: () => void;
  icon?: React.ReactNode;
}

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  status?: NotificationStatus;
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
  date: string | null;
  location: string;
  search: string;
  titleDeedNumber?: string;
}

export interface NotificationCardProps extends Notification {
  onClick?: () => void;
}