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
          title: "Échéance TNB proche",
          message: "La date limite de paiement de votre TNB approche (30 juin 2024)",
          status: "unread",
          priority: "high",
          category: "payment",
          createdAt: new Date().toISOString(),
          location: "Casablanca"
        },
        {
          id: "2",
          title: "Nouveau document disponible",
          message: "Le certificat de propriété a été mis à jour",
          status: "unread",
          priority: "medium",
          category: "document",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          location: "Rabat"
        },
        {
          id: "3",
          title: "Demande de visite",
          message: "Un promoteur souhaite visiter votre terrain",
          status: "unread",
          priority: "medium",
          category: "property",
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          location: "Tanger"
        },
        {
          id: "4",
          title: "Mise à jour cadastrale",
          message: "Une mise à jour du plan cadastral est disponible",
          status: "read",
          priority: "low",
          category: "document",
          createdAt: new Date(Date.now() - 259200000).toISOString(),
          location: "Marrakech"
        },
        {
          id: "5",
          title: "Proposition reçue",
          message: "Nouvelle proposition d'achat pour votre terrain",
          status: "unread",
          priority: "high",
          category: "property",
          createdAt: new Date(Date.now() - 345600000).toISOString(),
          location: "Agadir"
        },
        {
          id: "6",
          title: "Rappel maintenance",
          message: "Inspection annuelle de votre propriété recommandée",
          status: "read",
          priority: "low",
          category: "system",
          createdAt: new Date(Date.now() - 432000000).toISOString(),
          location: "Fès"
        },
        {
          id: "7",
          title: "Nouveau message",
          message: "Message important du service urbanisme",
          status: "unread",
          priority: "medium",
          category: "message",
          createdAt: new Date(Date.now() - 518400000).toISOString(),
          location: "Meknès"
        },
        {
          id: "8",
          title: "Changement réglementaire",
          message: "Nouvelle réglementation urbaine dans votre zone",
          status: "read",
          priority: "medium",
          category: "system",
          createdAt: new Date(Date.now() - 604800000).toISOString(),
          location: "Oujda"
        },
        {
          id: "9",
          title: "Confirmation de paiement",
          message: "Votre paiement TNB a été reçu et traité",
          status: "read",
          priority: "low",
          category: "payment",
          createdAt: new Date(Date.now() - 691200000).toISOString(),
          location: "Tétouan"
        },
        {
          id: "10",
          title: "Alerte sécurité",
          message: "Activité inhabituelle détectée sur votre compte",
          status: "unread",
          priority: "high",
          category: "system",
          createdAt: new Date(Date.now() - 777600000).toISOString(),
          location: "Kénitra"
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