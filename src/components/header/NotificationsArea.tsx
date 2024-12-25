import { Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data pour la démonstration
const mockMessages = [
  {
    id: "1",
    title: "Nouveau message de Ahmed",
    preview: "Concernant la parcelle TF#12345...",
    time: "Il y a 5 min",
    unread: true,
  },
  {
    id: "2",
    title: "Réponse de la commune",
    preview: "Votre demande a été traitée...",
    time: "Il y a 1 heure",
    unread: true,
  },
];

const mockNotifications = [
  {
    id: "1",
    title: "Mise à jour de statut",
    message: "Le statut de votre parcelle a été mis à jour",
    time: "Il y a 10 min",
    unread: true,
  },
  {
    id: "2",
    title: "Nouveau document disponible",
    message: "Un nouveau document a été ajouté à votre dossier",
    time: "Il y a 2 heures",
    unread: true,
  },
  {
    id: "3",
    title: "Rappel de paiement",
    message: "N'oubliez pas d'effectuer votre paiement avant le 30",
    time: "Il y a 1 jour",
    unread: false,
  },
];

export const NotificationsArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleMessageClick = (messageId: string) => {
    setIsMessagesOpen(false);
    navigate("/messages");
    toast({
      title: "Messages",
      description: "Redirection vers la conversation...",
    });
  };

  const handleNotificationClick = (notificationId: string) => {
    setIsNotificationsOpen(false);
    toast({
      title: "Notification",
      description: "Notification marquée comme lue",
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsMessagesOpen(true)}
      >
        <MessageSquare className="h-5 w-5" />
        <Badge 
          variant="default"
          className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary"
        >
          {mockMessages.filter(m => m.unread).length}
        </Badge>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsNotificationsOpen(true)}
      >
        <Bell className="h-5 w-5" />
        <Badge 
          variant="default"
          className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary"
        >
          {mockNotifications.filter(n => n.unread).length}
        </Badge>
      </Button>

      {/* Messages Sheet */}
      <Sheet open={isMessagesOpen} onOpenChange={setIsMessagesOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Messages</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-100px)] mt-4">
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => handleMessageClick(message.id)}
                  className="p-4 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">{message.title}</h3>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{message.preview}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Notifications Sheet */}
      <Sheet open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-100px)] mt-4">
            <div className="space-y-4">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className="p-4 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">{notification.title}</h3>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  {notification.unread && (
                    <Badge variant="default" className="mt-2">Nouveau</Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};