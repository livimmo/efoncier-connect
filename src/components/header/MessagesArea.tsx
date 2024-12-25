import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { MessageList } from "@/components/messages/MessagesList";
import { MessageDetail } from "@/components/messages/MessageDetail";

// Mock data for demonstration
const getMessagesByRole = (role?: string) => {
  switch (role) {
    case "owner":
      return [
        {
          id: "1",
          subject: "Question sur votre terrain",
          participant: "Groupe Al Omrane",
          type: "Promoteur",
          location: "Casablanca",
          status: "unread",
          lastMessage: "15/06/2024",
        },
        {
          id: "2",
          subject: "Demande de visite",
          participant: "Addoha Immobilier",
          type: "Promoteur",
          location: "Rabat",
          status: "unread",
          lastMessage: "14/06/2024",
        },
        {
          id: "3",
          subject: "Proposition d'achat",
          participant: "Alliance Immobilier",
          type: "Promoteur",
          location: "Tanger",
          status: "read",
          lastMessage: "13/06/2024",
        },
        {
          id: "4",
          subject: "Documents cadastraux",
          participant: "Service Cadastre",
          type: "Administration",
          location: "Marrakech",
          status: "read",
          lastMessage: "12/06/2024",
        },
        {
          id: "5",
          subject: "Mise à jour TNB",
          participant: "Service Municipal",
          type: "Administration",
          location: "Agadir",
          status: "read",
          lastMessage: "11/06/2024",
        },
        {
          id: "6",
          subject: "Projet résidentiel",
          participant: "Palmeraie Développement",
          type: "Promoteur",
          location: "Marrakech",
          status: "read",
          lastMessage: "10/06/2024",
        },
        {
          id: "7",
          subject: "Étude de faisabilité",
          participant: "Bureau d'études ABC",
          type: "Consultant",
          location: "Casablanca",
          status: "read",
          lastMessage: "09/06/2024",
        },
        {
          id: "8",
          subject: "Demande d'information",
          participant: "Groupe Jamai",
          type: "Promoteur",
          location: "Fès",
          status: "read",
          lastMessage: "08/06/2024",
        },
        {
          id: "9",
          subject: "Proposition de partenariat",
          participant: "Marina Development",
          type: "Promoteur",
          location: "Tanger",
          status: "read",
          lastMessage: "07/06/2024",
        },
        {
          id: "10",
          subject: "Régularisation administrative",
          participant: "Service Urbanisme",
          type: "Administration",
          location: "Rabat",
          status: "read",
          lastMessage: "06/06/2024",
        }
      ];
    case "developer":
      return [
        {
          id: "1",
          subject: "RE: Terrain TF#12345",
          participant: "Ahmed El Fassi",
          type: "Propriétaire",
          location: "Casablanca",
          status: "unread",
          lastMessage: "15/06/2024",
        },
        {
          id: "2",
          subject: "Documents disponibles",
          participant: "Service Urbanisme",
          type: "Administration",
          location: "Tanger",
          status: "read",
          lastMessage: "13/06/2024",
        }
      ];
    case "commune":
      return [
        {
          id: "1",
          subject: "Rappel: Paiement TNB",
          participant: "Mohammed Alami",
          type: "Propriétaire",
          location: "Casablanca",
          status: "unread",
          lastMessage: "15/06/2024",
        },
        {
          id: "2",
          subject: "Mise à jour cadastrale",
          participant: "Service Cadastre",
          type: "Administration",
          location: "Rabat",
          status: "read",
          lastMessage: "12/06/2024",
        }
      ];
    default:
      return [];
  }
};

export const MessagesArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useAuth();
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const messages = getMessagesByRole(profile?.role);
  const unreadMessagesCount = messages.filter(m => m.status === "unread").length;

  const handleMessageClick = (messageId: string) => {
    setSelectedMessage(messageId);
    toast({
      title: "Message ouvert",
      description: "Chargement de la conversation...",
    });
  };

  const handleCloseMessage = () => {
    setSelectedMessage(null);
  };

  const handleViewAllMessages = () => {
    setIsMessagesOpen(false);
    navigate("/messages");
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
        {unreadMessagesCount > 0 && (
          <Badge 
            variant="default"
            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary"
          >
            {unreadMessagesCount}
          </Badge>
        )}
      </Button>

      <Sheet open={isMessagesOpen} onOpenChange={setIsMessagesOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] sm:max-w-none">
          <SheetHeader>
            <SheetTitle>Messages</SheetTitle>
          </SheetHeader>
          <div className="mt-4 h-[calc(100vh-100px)] flex flex-col">
            {selectedMessage ? (
              <MessageDetail
                conversationId={selectedMessage}
                onClose={handleCloseMessage}
              />
            ) : (
              <ScrollArea className="flex-1">
                <div className="space-y-4">
                  <MessageList 
                    messages={messages}
                    onMessageSelect={handleMessageClick}
                  />
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={handleViewAllMessages}
                  >
                    Voir tous les messages
                  </Button>
                </div>
              </ScrollArea>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
