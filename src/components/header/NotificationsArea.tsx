import { Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
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

  const handleMessageClick = (messageId: string) => {
    // Marquer comme lu
    toast({
      title: "Message marqué comme lu",
      description: "Redirection vers la conversation...",
    });
    navigate(`/messages?message=${messageId}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <MessageSquare className="h-5 w-5" />
            <Badge 
              variant="default"
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary"
            >
              {mockMessages.filter(m => m.unread).length}
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          {mockMessages.map((message) => (
            <DropdownMenuItem
              key={message.id}
              className="flex flex-col items-start p-3 cursor-pointer"
              onClick={() => handleMessageClick(message.id)}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">{message.title}</span>
                <span className="text-xs text-muted-foreground">{message.time}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                {message.preview}
              </p>
              {message.unread && (
                <Badge variant="secondary" className="mt-2">Nouveau</Badge>
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem
            className="flex justify-center font-medium p-2 cursor-pointer"
            onClick={() => navigate("/messages")}
          >
            Voir tous les messages
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => navigate("/notifications")}
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