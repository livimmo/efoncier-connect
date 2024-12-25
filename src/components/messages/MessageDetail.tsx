import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Download, Flag, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MessageDetailProps {
  conversationId: string;
  onClose: () => void;
}

// Mock data for demonstration
const mockConversation = {
  id: "1",
  subject: "Achat Parcelle TF#12345",
  participant: "Ahmed El Fassi",
  type: "Contribuable",
  location: "Casablanca, Maarif",
  status: "active",
  lastMessage: "15/06/2024",
  messages: [
    {
      id: "1",
      content: "Bonjour, je souhaite discuter de la vente du terrain TF#12345.",
      sender: "Promocasa SARL",
      timestamp: "15/06/2024, 10:30",
    },
    {
      id: "2",
      content: "Bonjour, quelles sont vos conditions de vente ?",
      sender: "Ahmed El Fassi",
      timestamp: "15/06/2024, 11:00",
    },
  ],
};

export const MessageDetail = ({ conversationId, onClose }: MessageDetailProps) => {
  const { toast } = useToast();
  
  const handleSendMessage = () => {
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Téléchargement",
      description: "La conversation sera bientôt disponible au téléchargement.",
    });
  };

  const handleFlag = () => {
    toast({
      title: "Message signalé",
      description: "Le message a été signalé avec succès.",
    });
  };

  const handleNotification = () => {
    toast({
      title: "Notifications activées",
      description: "Vous recevrez des notifications pour cette conversation.",
    });
  };

  return (
    <div className="border rounded-lg">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold truncate">{mockConversation.subject}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground">
                {mockConversation.participant}
              </span>
              <Badge variant="outline">{mockConversation.type}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleFlag}>
              <Flag className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNotification}>
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
          <span>{mockConversation.location}</span>
          <span>•</span>
          <span>Dernier message : {mockConversation.lastMessage}</span>
        </div>
      </div>

      <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
        {mockConversation.messages.map((message) => (
          <div
            key={message.id}
            className="flex flex-col gap-1"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium">{message.sender}</span>
              <span className="text-sm text-muted-foreground">
                {message.timestamp}
              </span>
            </div>
            <p className="text-sm">{message.content}</p>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-3">
          <Textarea
            placeholder="Tapez votre message..."
            className="min-h-[80px]"
          />
          <Button className="self-end" onClick={handleSendMessage}>
            <Send className="h-4 w-4 mr-2" />
            Envoyer
          </Button>
        </div>
      </div>
    </div>
  );
};