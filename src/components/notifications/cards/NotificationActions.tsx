import { Button } from "@/components/ui/button";
import type { Notification } from "@/types/notifications";
import { CreditCard, Eye, Download, MessageSquare } from "lucide-react";

interface NotificationActionsProps {
  notification: Notification;
  onActionClick: (actionType: string) => void;
}

export const NotificationActions = ({ notification, onActionClick }: NotificationActionsProps) => {
  const getDefaultActions = () => {
    switch (notification.type) {
      case "PAYMENT":
        return {
          primary: {
            label: "Payer maintenant",
            icon: <CreditCard className="h-4 w-4" />,
            action: () => onActionClick("payment"),
          },
          secondary: {
            label: "Voir les détails",
            icon: <Eye className="h-4 w-4" />,
            action: () => onActionClick("payment_details"),
          },
        };
      case "DOCUMENT":
        return {
          primary: {
            label: "Télécharger",
            icon: <Download className="h-4 w-4" />,
            action: () => onActionClick("document"),
          },
          secondary: {
            label: "Aperçu",
            icon: <Eye className="h-4 w-4" />,
            action: () => onActionClick("document"),
          },
        };
      case "MESSAGE":
        return {
          primary: {
            label: "Répondre",
            icon: <MessageSquare className="h-4 w-4" />,
            action: () => onActionClick("message"),
          },
        };
      default:
        return {};
    }
  };

  const actions = notification.actions || getDefaultActions();

  if (!actions.primary && !actions.secondary) return null;

  return (
    <div className="flex gap-2 mt-3 flex-wrap">
      {actions.primary && (
        <Button size="sm" onClick={(e) => {
          e.stopPropagation();
          actions.primary?.action();
        }}>
          {actions.primary.icon}
          <span className="ml-2">{actions.primary.label}</span>
        </Button>
      )}
      
      {actions.secondary && (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            actions.secondary?.action();
          }}
        >
          {actions.secondary.icon}
          <span className="ml-2">{actions.secondary.label}</span>
        </Button>
      )}
    </div>
  );
};