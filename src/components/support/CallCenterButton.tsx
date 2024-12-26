import { useState } from "react";
import { Headset, Phone, Mail, MessageSquare, Bot, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ChatWindow } from "../chat/ChatWindow";

interface CallCenterButtonProps {
  variant?: "header" | "floating";
  className?: string;
}

export const CallCenterButton = ({ variant = "floating", className }: CallCenterButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showChat, setShowChat] = useState(false);
  const { toast } = useToast();
  const isAgentAvailable = true;

  const handleCall = () => {
    window.location.href = "tel:+212522123456";
  };

  const handleCallbackRequest = () => {
    if (!phoneNumber) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre numéro de téléphone",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Demande envoyée",
      description: "Un agent vous rappellera dans les plus brefs délais",
    });
    setPhoneNumber("");
    setIsOpen(false);
  };

  const handleEmailSupport = () => {
    window.location.href = "mailto:support@efoncier.ma";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size={variant === "header" ? "icon" : "lg"}
          className={cn(
            variant === "floating" && "fixed bottom-20 right-4 z-50 rounded-full shadow-lg",
            "group",
            className
          )}
        >
          {variant === "header" ? (
            <Headset className="h-5 w-5" />
          ) : (
            <div className="flex items-center gap-2">
              <Headset className="h-6 w-6" />
              <span className="hidden group-hover:inline-block">
                Support Client
              </span>
            </div>
          )}
          {isAgentAvailable && (
            <Badge 
              variant="default" 
              className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500 p-0"
            />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        {!showChat ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Headset className="h-5 w-5 text-primary" />
                Contactez notre support client
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {isAgentAvailable ? (
                <p className="text-sm text-green-600 flex items-center gap-2">
                  <Badge variant="default" className="h-2 w-2 rounded-full bg-green-500 p-0" />
                  Nos agents sont disponibles pour vous aider
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Tous nos agents sont actuellement occupés
                </p>
              )}

              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="default" 
                  className="w-full justify-start gap-2"
                  onClick={() => setShowChat(true)}
                >
                  <Bot className="h-4 w-4" />
                  Parler avec l'assistant virtuel
                </Button>

                <Button 
                  variant="default" 
                  className="w-full justify-start gap-2"
                  onClick={handleCall}
                >
                  <Phone className="h-4 w-4" />
                  Appeler maintenant
                  <span className="ml-auto text-xs text-muted-foreground">
                    +212 5 22 123 456
                  </span>
                </Button>

                <div className="space-y-2">
                  <Label htmlFor="phone">Demander un rappel</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Votre numéro de téléphone"
                      type="tel"
                    />
                    <Button 
                      variant="secondary"
                      size="icon"
                      onClick={handleCallbackRequest}
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={handleEmailSupport}
                >
                  <Mail className="h-4 w-4" />
                  Envoyer un email
                  <span className="ml-auto text-xs text-muted-foreground">
                    support@efoncier.ma
                  </span>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Assistant eFoncier
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChat(false)}
                >
                  Retour
                </Button>
              </DialogTitle>
            </DialogHeader>
            <ChatWindow />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};