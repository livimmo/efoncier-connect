import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, Paperclip, Clock, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PropertyChatProps {
  propertyId: string;
  propertyTitle: string;
}

const QUICK_MESSAGES = [
  "Je suis intéressé par votre terrain, pouvons-nous discuter ?",
  "Pouvez-vous me fournir plus de détails sur ce bien ?",
  "Avez-vous d'autres documents disponibles pour ce terrain ?",
  "Quel est le meilleur moment pour vous contacter ?",
];

export const PropertyChat = ({ propertyId, propertyTitle }: PropertyChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'bot' | 'conditions' | 'chat'>('bot');
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleAcceptConditions = () => {
    setStep('chat');
    toast({
      title: "Conditions acceptées",
      description: "Vous pouvez maintenant discuter avec le propriétaire.",
    });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    toast({
      title: "Message envoyé",
      description: "Votre message a été transmis au propriétaire.",
    });
    setMessage("");
  };

  const handleQuickMessage = (msg: string) => {
    setMessage(msg);
  };

  const renderContent = () => {
    switch (step) {
      case 'bot':
        return (
          <div className="space-y-4 p-4">
            <p className="text-center text-muted-foreground">
              Bonjour ! Je suis votre assistant virtuel. Souhaitez-vous discuter avec le propriétaire du bien <span className="font-semibold text-foreground">{propertyTitle}</span> ?
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Non, annuler
              </Button>
              <Button onClick={() => setStep('conditions')}>
                Oui, continuer
              </Button>
            </div>
          </div>
        );
      case 'conditions':
        return (
          <div className="space-y-4 p-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Pour assurer la qualité des échanges, une commission sera appliquée :
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Commission de mise en relation : <strong>1-2%</strong></li>
                <li>Accès aux coordonnées du propriétaire</li>
                <li>Assistance pendant les négociations</li>
              </ul>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Refuser
              </Button>
              <Button onClick={handleAcceptConditions}>
                Accepter les conditions
              </Button>
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="flex flex-col h-[500px]">
            <div className="border-b p-3">
              <div className="flex items-center gap-2">
                <Avatar>
                  <User className="h-5 w-5" />
                </Avatar>
                <div>
                  <h4 className="text-sm font-medium">Propriétaire</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      En ligne
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                  <p className="text-sm">Bonjour, je suis le propriétaire. Comment puis-je vous aider ?</p>
                  <span className="text-xs text-muted-foreground">14:30</span>
                </div>
              </div>
            </ScrollArea>

            <div className="p-4 border-t space-y-4">
              <ScrollArea className="w-full">
                <div className="flex gap-2 pb-2">
                  {QUICK_MESSAGES.map((msg, index) => (
                    <Button
                      key={index}
                      variant="secondary"
                      size="sm"
                      className="whitespace-nowrap"
                      onClick={() => handleQuickMessage(msg)}
                    >
                      {msg}
                    </Button>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          setIsOpen(true);
          setStep('bot');
        }}
      >
        <MessageSquare className="h-4 w-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Discussion - {propertyTitle}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          {renderContent()}
        </DialogContent>
      </Dialog>
    </>
  );
};
