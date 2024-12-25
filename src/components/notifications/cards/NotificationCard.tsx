import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NotificationIcon } from "./NotificationIcon";
import { NotificationActions } from "./NotificationActions";
import type { Notification } from "@/types/notifications";

interface NotificationCardProps {
  notification: Notification;
  onClick?: () => void;
}

export const NotificationCard = ({
  notification,
  onClick,
}: NotificationCardProps) => {
  const { type, priority, status, title, message, date, metadata } = notification;

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 rounded-lg border cursor-pointer transition-colors duration-200",
        status === "unread" ? "bg-blue-50/50 dark:bg-blue-950/20" : "bg-background",
        "hover:bg-accent"
      )}
    >
      <div className="flex items-start gap-4">
        <NotificationIcon type={type} priority={priority} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="font-semibold">{title}</h3>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mt-1 break-words">
            {message}
          </p>
          
          {metadata?.titleDeedNumber && (
            <Badge variant="outline" className="mt-2">
              TF: {metadata.titleDeedNumber}
            </Badge>
          )}

          <NotificationActions notification={notification} />
        </div>
      </div>
    </div>
  );
};