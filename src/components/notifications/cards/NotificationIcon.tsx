import { CreditCard, Shield, MessageCircle, FileText, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NotificationType, NotificationPriority } from "@/types/notifications";

interface NotificationIconProps {
  type: NotificationType;
  priority: NotificationPriority;
}

export const NotificationIcon = ({ type, priority }: NotificationIconProps) => {
  const getIcon = () => {
    switch (type) {
      case "payment":
        return <CreditCard className="h-5 w-5" />;
      case "fiscal_status":
        return <Shield className="h-5 w-5" />;
      case "message":
        return <MessageCircle className="h-5 w-5" />;
      case "document":
        return <FileText className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getPriorityColor = () => {
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
    <div className={cn("p-2 rounded-full", getPriorityColor())}>
      {getIcon()}
    </div>
  );
};