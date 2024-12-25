import { Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { NotificationList } from "@/components/notifications/NotificationList";
import { useAuth } from "@/components/auth/AuthProvider";
import type { Notification } from "@/types/notifications";

const getNotificationsByRole = (role?: string): Notification[] => {
  switch (role) {
    case "owner":
      return [
        {
          id: "1",
          type: "PAYMENT_DUE",
          priority: "HIGH",
          status: "UNREAD",
          title: "Paiement TNB en attente",
          message: "Votre taxe TNB pour le terrain TF-12345 est due avant le 30 Juin 2024",
          date: new Date().toISOString(),
          read: false,
          metadata: {
            titleDeedNumber: "TF-12345",
            amount: 5000,
            dueDate: "2024-06-30"
          }
        },
        {
          id: "2",
          type: "STATUS_UPDATE",
          priority: "MEDIUM",
          status: "READ",
          title: "Mise à jour de statut",
          message: "Le statut de votre bien TF-67890 est passé à 'En Transaction'",
          date: new Date(Date.now() - 86400000).toISOString(),
          read: true,
          metadata: {
            titleDeedNumber: "TF-67890"
          }
        }
      ];
    case "developer":
      return [
        {
          id: "1",
          type: "NEW_PROPERTY",
          priority: "HIGH",
          status: "UNREAD",
          title: "Nouveau bien disponible",
          message: "Un nouveau terrain est disponible dans votre région cible",
          date: new Date().toISOString(),
          read: false,
          metadata: {
            titleDeedNumber: "TF-45678"
          }
        },
        {
          id: "2",
          type: "DOCUMENT_RECEIVED",
          priority: "MEDIUM",
          status: "READ",
          title: "Nouveau document disponible",
          message: "Le plan cadastral du bien TF-89012 est maintenant disponible",
          date: new Date(Date.now() - 86400000).toISOString(),
          read: true,
          metadata: {
            titleDeedNumber: "TF-89012",
            documentType: "Plan cadastral"
          }
        }
      ];
    case "commune":
      return [
        {
          id: "1",
          type: "PAYMENT",
          priority: "HIGH",
          status: "UNREAD",
          title: "Alertes de non-paiement",
          message: "15 propriétaires n'ont pas payé leur taxe TNB cette année",
          date: new Date().toISOString(),
          read: false
        },
        {
          id: "2",
          type: "REPORT",
          priority: "MEDIUM",
          status: "READ",
          title: "Rapport mensuel disponible",
          message: "Le rapport mensuel des statuts fiscaux est prêt à être consulté",
          date: new Date(Date.now() - 86400000).toISOString(),
          read: true
        }
      ];
    default:
      return [];
  }
};

export const NotificationsArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useAuth();
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = getNotificationsByRole(profile?.role);
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const handleMessageClick = (messageId: string) => {
    setIsMessagesOpen(false);
    navigate("/messages");
    toast({
      title: "Messages",
      description: "Redirection vers la conversation...",
    });
  };

  const handleNotificationClick = (notification: Notification) => {
    setIsNotificationsOpen(false);
    
    switch (notification.type) {
      case "PAYMENT_DUE":
        navigate(`/payment/${notification.metadata?.titleDeedNumber}`);
        break;
      case "NEW_PROPERTY":
        navigate(`/map?property=${notification.metadata?.titleDeedNumber}`);
        break;
      case "DOCUMENT_RECEIVED":
        navigate(`/documents/${notification.metadata?.titleDeedNumber}`);
        break;
      default:
        navigate("/notifications");
    }

    toast({
      title: "Notification",
      description: "Redirection en cours...",
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsNotificationsOpen(true)}
      >
        <Bell className="h-5 w-5" />
        {unreadNotificationsCount > 0 && (
          <Badge 
            variant="default"
            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary"
          >
            {unreadNotificationsCount}
          </Badge>
        )}
      </Button>

      {/* Notifications Sheet */}
      <Sheet open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-100px)] mt-4">
            <div className="space-y-4">
              <NotificationList 
                notifications={notifications}
                onClick={handleNotificationClick}
              />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};