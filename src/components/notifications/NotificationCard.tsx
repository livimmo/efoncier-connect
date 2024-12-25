import { 
  Bell, 
  MessageCircle, 
  CreditCard, 
  Building2, 
  AlertTriangle, 
  Calendar, 
  RefreshCw,
  FileText 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NotificationType, NotificationPriority } from "./types";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  date: string;
  read: boolean;
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
  actions,
  onClick,
}: NotificationCardProps) => {
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "message":
        return <MessageCircle className="h-5 w-5" />;
      case "fiscal":
        return <CreditCard className="h-5 w-5" />;
      case "property":
        return <Building2 className="h-5 w-5" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5" />;
      case "reminder":
        return <Calendar className="h-5 w-5" />;
      case "transaction":
        return <RefreshCw className="h-5 w-5" />;
      case "document":
        return <FileText className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
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
          {actions && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {actions.primary && (
                <Button size="sm" onClick={(e) => {
                  e.stopPropagation();
                  actions.primary?.action();
                }}>
                  {actions.primary.label}
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
                  {actions.secondary.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};