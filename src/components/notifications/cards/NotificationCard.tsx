import { useState } from "react";
import { cn } from "@/lib/utils";
import { NotificationIcon } from "./NotificationIcon";
import { NotificationActions } from "./NotificationActions";
import { PaymentDialog } from "../dialogs/PaymentDialog";
import { DocumentDialog } from "../dialogs/DocumentDialog";
import { MessageDialog } from "../dialogs/MessageDialog";
import { Badge } from "@/components/ui/badge";
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
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const handleActionClick = (actionType: string) => {
    switch (actionType) {
      case "payment":
        setIsPaymentOpen(true);
        break;
      case "document":
        setIsDocumentOpen(true);
        break;
      case "message":
        setIsMessageOpen(true);
        break;
    }
  };

  return (
    <>
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

            <NotificationActions 
              notification={notification} 
              onActionClick={handleActionClick}
            />
          </div>
        </div>
      </div>

      <PaymentDialog
        open={isPaymentOpen}
        onOpenChange={setIsPaymentOpen}
        titleDeedNumber={metadata?.titleDeedNumber}
        amount={metadata?.amount}
      />

      <DocumentDialog
        open={isDocumentOpen}
        onOpenChange={setIsDocumentOpen}
        titleDeedNumber={metadata?.titleDeedNumber}
        documentType={metadata?.documentType}
        documentUrl={metadata?.documentUrl}
      />

      <MessageDialog
        open={isMessageOpen}
        onOpenChange={setIsMessageOpen}
        title={title}
      />
    </>
  );
};