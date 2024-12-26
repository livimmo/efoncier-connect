import { Phone, Mail, Bot, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CallOptionsProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  onCall: () => void;
  onEmailSupport: () => void;
  onCallbackRequest: () => void;
  onChatStart: () => void;
  isAgentAvailable: boolean;
}

export const CallOptions = ({
  phoneNumber,
  setPhoneNumber,
  onCall,
  onEmailSupport,
  onCallbackRequest,
  onChatStart,
  isAgentAvailable,
}: CallOptionsProps) => {
  const { toast } = useToast();

  const handleCallbackRequest = () => {
    if (!phoneNumber) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre numéro de téléphone",
        variant: "destructive",
      });
      return;
    }
    onCallbackRequest();
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      <Button 
        variant="default" 
        className="w-full justify-start gap-2"
        onClick={onChatStart}
      >
        <Bot className="h-4 w-4" />
        Parler avec l'assistant virtuel
      </Button>

      <Button 
        variant="default" 
        className="w-full justify-start gap-2"
        onClick={onCall}
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
        onClick={onEmailSupport}
      >
        <Mail className="h-4 w-4" />
        Envoyer un email
        <span className="ml-auto text-xs text-muted-foreground">
          support@efoncier.ma
        </span>
      </Button>
    </div>
  );
};