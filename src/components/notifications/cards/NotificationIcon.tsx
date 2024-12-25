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
      case "PAYMENT":
        return <CreditCard className="h-5 w-5" />;
      case "FISCAL_STATUS":
        return <Shield className="h-5 w-5" />;
      case "MESSAGE":
        return <MessageCircle className="h-5 w-5" />;
      case "DOCUMENT":
        return <FileText className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "MEDIUM":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
      case "LOW":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
    }
  };

  return (
    <div className={cn("p-2 rounded-full", getPriorityColor())}>
      {getIcon()}
    </div>
  );
};