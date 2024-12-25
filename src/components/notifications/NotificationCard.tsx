import { 
  CreditCard, 
  MessageCircle, 
  FileText, 
  AlertTriangle,
  Eye,
  MapPin,
  Download,
  MessageSquare,
  Shield,
  DollarSign,
  Building,
  FileBarChart,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NotificationType, NotificationPriority } from "@/types/notifications";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  date: string;
  read: boolean;
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
  onClick?: () => void;
}

export const NotificationCard = ({
  type,
  priority,
  title,
  message,
  date,
  read,
  metadata,
  actions,
  onClick,
}: NotificationCardProps) => {
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "payment":
        return <CreditCard className="h-5 w-5" />;
      case "fiscal_status":
        return <Shield className="h-5 w-5" />;
      case "message":
        return <MessageCircle className="h-5 w-5" />;
      case "document":
        return <FileText className="h-5 w-5" />;
      case "urgent":
        return <AlertTriangle className="h-5 w-5" />;
      case "property":
        return <Building className="h-5 w-5" />;
      case "report":
        return <FileBarChart className="h-5 w-5" />;
      case "property_update":
        return <Home className="h-5 w-5" />;
      case "new_property":
        return <Building className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
    }
  };

  const getDefaultActions = (type: NotificationType) => {
    switch (type) {
      case "payment":
        return {
          primary: {
            label: "Payer maintenant",
            icon: <DollarSign className="h-4 w-4" />
          },
          secondary: {
            label: "Voir l'historique",
            icon: <Eye className="h-4 w-4" />
          }
        };
      case "fiscal_status":
        return {
          primary: {
            label: "Voir les détails",
            icon: <Eye className="h-4 w-4" />
          }
        };
      case "message":
        return {
          primary: {
            label: "Répondre",
            icon: <MessageSquare className="h-4 w-4" />
          }
        };
      case "document":
        return {
          primary: {
            label: "Télécharger",
            icon: <Download className="h-4 w-4" />
          },
          secondary: {
            label: "Aperçu",
            icon: <Eye className="h-4 w-4" />
          }
        };
      default:
        return {};
    }
  };

  const defaultActions = getDefaultActions(type);

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 rounded-lg border cursor-pointer transition-colors duration-200",
        read ? "bg-background" : "bg-blue-50 dark:bg-blue-900/20",
        "hover:bg-accent"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn("p-2 rounded-full", getPriorityColor(priority))}>
          {getNotificationIcon(type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="font-semibold">{title}</h3>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1 break-words">{message}</p>
          
          {metadata?.titleDeedNumber && (
            <Badge variant="outline" className="mt-2">
              TF: {metadata.titleDeedNumber}
            </Badge>
          )}

          {metadata?.dueDate && (
            <Badge variant="outline" className="mt-2 ml-2">
              Échéance: {new Date(metadata.dueDate).toLocaleDateString()}
            </Badge>
          )}
          
          <div className="flex gap-2 mt-3 flex-wrap">
            {(actions?.primary || defaultActions.primary) && (
              <Button size="sm" onClick={(e) => {
                e.stopPropagation();
                actions?.primary?.action?.();
              }}>
                {defaultActions.primary?.icon}
                <span className="ml-2">{actions?.primary?.label || defaultActions.primary?.label}</span>
              </Button>
            )}
            
            {(actions?.secondary || defaultActions.secondary) && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  actions?.secondary?.action?.();
                }}
              >
                {defaultActions.secondary?.icon}
                <span className="ml-2">{actions?.secondary?.label || defaultActions.secondary?.label}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};