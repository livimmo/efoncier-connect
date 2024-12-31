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
import { NotificationType, NotificationPriority, Notification } from "@/types/notifications";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export interface NotificationCardProps {
  notification: Notification;
  onClick?: () => void;
}

export const NotificationCard = ({
  notification,
  onClick,
}: NotificationCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!notification) return null;

  const { type, priority, status, title, message, date, metadata } = notification;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "PAYMENT":
      case "PAYMENT_DUE":
        return <CreditCard className="h-5 w-5" />;
      case "FISCAL_STATUS":
        return <Shield className="h-5 w-5" />;
      case "MESSAGE":
        return <MessageCircle className="h-5 w-5" />;
      case "DOCUMENT":
      case "DOCUMENT_RECEIVED":
        return <FileText className="h-5 w-5" />;
      case "URGENT":
        return <AlertTriangle className="h-5 w-5" />;
      case "PROPERTY":
        return <Building className="h-5 w-5" />;
      case "REPORT":
        return <FileBarChart className="h-5 w-5" />;
      case "PROPERTY_UPDATE":
      case "NEW_PROPERTY":
        return <Home className="h-5 w-5" />;
      case "STATUS_UPDATE":
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "MEDIUM":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
      case "LOW":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
    }
  };

  const handleAction = (actionType: string) => {
    switch (actionType) {
      case "payment":
        navigate("/payment", { 
          state: { 
            titleDeedNumber: metadata?.titleDeedNumber,
            amount: metadata?.amount
          }
        });
        break;
      case "history":
        navigate("/history");
        break;
      case "document":
        if (metadata?.documentUrl) {
          window.open(metadata.documentUrl, '_blank');
        } else {
          navigate("/documents");
        }
        break;
      case "property":
        navigate(`/map?property=${metadata?.titleDeedNumber}`);
        break;
      case "message":
        navigate("/messages");
        break;
      case "fiscal":
        navigate(`/owner/properties?tf=${metadata?.titleDeedNumber}`);
        break;
      default:
        onClick?.();
    }
  };

  const getDefaultActions = (type: NotificationType) => {
    switch (type) {
      case "PAYMENT":
      case "PAYMENT_DUE":
        return {
          primary: {
            label: "Payer maintenant",
            icon: <DollarSign className="h-4 w-4" />,
            action: () => handleAction("payment")
          },
          secondary: {
            label: "Voir l'historique",
            icon: <Eye className="h-4 w-4" />,
            action: () => handleAction("history")
          }
        };
      case "FISCAL_STATUS":
        return {
          primary: {
            label: "Voir les détails",
            icon: <Eye className="h-4 w-4" />,
            action: () => handleAction("fiscal")
          }
        };
      case "MESSAGE":
        return {
          primary: {
            label: "Répondre",
            icon: <MessageSquare className="h-4 w-4" />,
            action: () => handleAction("message")
          }
        };
      case "DOCUMENT":
      case "DOCUMENT_RECEIVED":
        return {
          primary: {
            label: "Télécharger",
            icon: <Download className="h-4 w-4" />,
            action: () => handleAction("document")
          },
          secondary: {
            label: "Aperçu",
            icon: <Eye className="h-4 w-4" />,
            action: () => handleAction("document")
          }
        };
      case "PROPERTY":
      case "PROPERTY_UPDATE":
      case "NEW_PROPERTY":
        return {
          primary: {
            label: "Voir sur la carte",
            icon: <MapPin className="h-4 w-4" />,
            action: () => handleAction("property")
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
        status === "UNREAD" ? "bg-blue-50/50 dark:bg-blue-950/20" : "bg-background",
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
            {defaultActions.primary && (
              <Button 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  defaultActions.primary.action();
                }}
              >
                {defaultActions.primary.icon}
                <span className="ml-2">{defaultActions.primary.label}</span>
              </Button>
            )}
            
            {defaultActions.secondary && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  defaultActions.secondary.action();
                }}
              >
                {defaultActions.secondary.icon}
                <span className="ml-2">{defaultActions.secondary.label}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};