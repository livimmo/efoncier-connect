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
import { PaymentDialog } from "@/components/map/parcel-info/dialogs/PaymentDialog";
import { useState } from "react";
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
  const [paymentOpen, setPaymentOpen] = useState(false);

  if (!notification) return null;

  const { type, priority, status, title, message, date, metadata } = notification;

  const handleAction = (actionType: string) => {
    switch (actionType) {
      case "payment":
        if (metadata?.titleDeedNumber) {
          setPaymentOpen(true);
        }
        break;
      case "property_details":
        if (metadata?.titleDeedNumber) {
          navigate(`/map?property=${metadata.titleDeedNumber}`);
        }
        break;
      case "chat":
        if (metadata?.titleDeedNumber) {
          navigate(`/messages?property=${metadata.titleDeedNumber}`);
        }
        break;
      case "document":
        if (metadata?.documentUrl) {
          window.open(metadata.documentUrl, '_blank');
        } else {
          toast({
            title: "Document non disponible",
            description: "Le document n'est pas encore disponible au téléchargement.",
            variant: "destructive",
          });
        }
        break;
      default:
        onClick?.();
    }
  };

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

  const getActionButtons = () => {
    switch (type) {
      case "PAYMENT_DUE":
        return (
          <Button size="sm" onClick={() => handleAction("payment")}>
            <DollarSign className="h-4 w-4 mr-2" />
            Payer maintenant
          </Button>
        );
      case "PROPERTY_UPDATE":
      case "NEW_PROPERTY":
        return (
          <Button size="sm" onClick={() => handleAction("property_details")}>
            <Eye className="h-4 w-4 mr-2" />
            Voir les détails
          </Button>
        );
      case "MESSAGE":
        return (
          <Button size="sm" onClick={() => handleAction("chat")}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Répondre
          </Button>
        );
      case "DOCUMENT_RECEIVED":
        return (
          <Button size="sm" onClick={() => handleAction("document")}>
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <>
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
            
            <div className="flex gap-2 mt-3">
              {getActionButtons()}
            </div>
          </div>
        </div>
      </div>

      {metadata?.titleDeedNumber && (
        <PaymentDialog
          open={paymentOpen}
          onOpenChange={setPaymentOpen}
          parcelId={metadata.titleDeedNumber}
        />
      )}
    </>
  );
};