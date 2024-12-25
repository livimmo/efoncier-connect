import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, Paperclip } from "lucide-react";

interface PropertyChatProps {
  propertyId: string;
  propertyTitle: string;
}

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

  const renderContent = () => {
    switch (step) {
      case 'bot':
        return (
          <div className="space-y-4 p-4">
            <p>Bonjour ! Je suis votre assistant virtuel. Souhaitez-vous discuter avec le propriétaire du bien {propertyTitle} ?</p>
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
            <p>Une commission comprise entre <strong>1% et 2%</strong> sera appliquée pour cette mise en relation. Souhaitez-vous continuer ?</p>
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
          <div className="flex flex-col h-[400px]">
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                <p className="text-sm">Bonjour, je suis le propriétaire. Comment puis-je vous aider ?</p>
              </div>
            </div>
            <div className="border-t p-4">
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
          <DialogHeader>
            <DialogTitle>Discussion - {propertyTitle}</DialogTitle>
          </DialogHeader>
          {renderContent()}
        </DialogContent>
      </Dialog>
    </>
  );
};