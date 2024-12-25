import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pin, Archive, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface MessagesListProps {
  onSelectConversation: (id: string) => void;
  selectedConversationId: string | null;
}

// Mock data for demonstration
const mockConversations = [
  {
    id: "1",
    subject: "Achat Parcelle TF#12345",
    participant: "Ahmed El Fassi",
    location: "Casablanca",
    status: "unread",
    lastMessage: "15/06/2024",
  },
  {
    id: "2",
    subject: "Offre Terrain PR#67890",
    participant: "Promocasa SARL",
    location: "Rabat",
    status: "read",
    lastMessage: "14/06/2024",
  },
  {
    id: "3",
    subject: "Question Statut Fiscal",
    participant: "Youssef Ben Ali",
    location: "Tanger",
    status: "pending",
    lastMessage: "12/06/2024",
  },
];

export const MessagesList = ({ onSelectConversation, selectedConversationId }: MessagesListProps) => {
  const { toast } = useToast();

  const handlePin = (id: string) => {
    toast({
      title: "Message épinglé",
      description: "Le message a été épinglé avec succès.",
    });
  };

  const handleArchive = (id: string) => {
    toast({
      title: "Message archivé",
      description: "Le message a été archivé avec succès.",
    });
  };

  const handleFlag = (id: string) => {
    toast({
      title: "Message signalé",
      description: "Le message a été signalé avec succès.",
    });
  };

  return (
    <div className="space-y-4">
      {mockConversations.map((conversation) => (
        <div
          key={conversation.id}
          className={cn(
            "p-4 rounded-lg border transition-colors cursor-pointer",
            selectedConversationId === conversation.id
              ? "bg-accent"
              : "hover:bg-accent/50"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div 
              className="min-w-0 flex-1"
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold truncate">{conversation.subject}</h3>
                <Badge
                  variant={
                    conversation.status === "unread"
                      ? "secondary"
                      : conversation.status === "pending"
                      ? "outline"
                      : "default"
                  }
                >
                  {conversation.status === "unread"
                    ? "Non Lu"
                    : conversation.status === "pending"
                    ? "En Attente"
                    : "Lu"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {conversation.participant}
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <span>{conversation.location}</span>
                <span>•</span>
                <span>{conversation.lastMessage}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onSelectConversation(conversation.id)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handlePin(conversation.id)}
              >
                <Pin className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleArchive(conversation.id)}
              >
                <Archive className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleFlag(conversation.id)}
              >
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};