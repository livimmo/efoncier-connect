import { useState } from "react";
import { Phone, MessageSquare, Clock, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AgentContactButtonProps {
  variant?: "header" | "floating" | "inline";
  className?: string;
}

export const AgentContactButton = ({ variant = "inline", className }: AgentContactButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const { toast } = useToast();
  const isAgentAvailable = true; // À connecter à un vrai service de disponibilité

  const handleCall = () => {
    window.location.href = "tel:+212522123456";
    toast({
      title: "Appel en cours",
      description: "Vous allez être mis en relation avec un agent.",
    });
  };

  const handleChat = () => {
    toast({
      title: "Chat en cours d'ouverture",
      description: "Un agent va prendre en charge votre demande.",
    });
    // Implémenter la logique d'ouverture du chat
  };

  const handleCallback = () => {
    if (!phoneNumber || !timeSlot) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Demande envoyée",
      description: "Un agent vous rappellera au créneau choisi",
    });
    setPhoneNumber("");
    setTimeSlot("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant === "header" ? "ghost" : "default"}
          size={variant === "header" ? "icon" : "lg"}
          className={cn(
            variant === "floating" && "fixed bottom-20 right-4 z-50 rounded-full shadow-lg",
            "group relative",
            isAgentAvailable ? "bg-green-500 hover:bg-green-600" : "bg-gray-400",
            className
          )}
        >
          {variant === "header" ? (
            <Headset className="h-5 w-5" />
          ) : (
            <div className="flex items-center gap-2">
              <Headset className="h-6 w-6" />
              <span className="hidden group-hover:inline-block whitespace-nowrap">
                {isAgentAvailable ? "Parler avec un Agent" : "Demander un Rappel"}
              </span>
            </div>
          )}
          {isAgentAvailable && (
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Headset className="h-5 w-5 text-primary" />
            Contacter un Agent
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {isAgentAvailable ? (
            <p className="text-sm text-green-600 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
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
              onClick={handleCall}
            >
              <Phone className="h-4 w-4" />
              Appeler un Agent Maintenant
              <span className="ml-auto text-xs text-muted-foreground">
                +212 5 22 123 456
              </span>
            </Button>

            <Button 
              variant="default" 
              className="w-full justify-start gap-2"
              onClick={handleChat}
            >
              <MessageSquare className="h-4 w-4" />
              Discuter avec un Agent en Temps Réel
            </Button>

            <div className="space-y-2">
              <Label>Demander à être Rappelé</Label>
              <div className="space-y-2">
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Votre numéro de téléphone"
                  type="tel"
                />
                <Select value={timeSlot} onValueChange={setTimeSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un créneau horaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Matin (9h - 12h)</SelectItem>
                    <SelectItem value="afternoon">Après-midi (14h - 17h)</SelectItem>
                    <SelectItem value="evening">Soir (17h - 19h)</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="secondary"
                  className="w-full gap-2"
                  onClick={handleCallback}
                >
                  <Clock className="h-4 w-4" />
                  Envoyer la Demande
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};