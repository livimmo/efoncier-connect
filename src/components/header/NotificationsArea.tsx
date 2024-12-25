import { Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export const NotificationsArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleMessageClick = () => {
    navigate("/messages");
    toast({
      title: "Messages",
      description: "Redirection vers vos messages...",
    });
  };

  const handleNotificationsClick = () => {
    navigate("/notifications");
    toast({
      title: "Notifications",
      description: "Redirection vers vos notifications...",
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={handleMessageClick}
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
        onClick={handleNotificationsClick}
      >
        <Bell className="h-5 w-5" />
        <Badge 
          variant="default"
          className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary"
        >
          3
        </Badge>
      </Button>
    </>
  );
};