import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";
import { ContactEmailForm } from "./ContactEmailForm";
import { ContactDirectForm } from "./ContactDirectForm";
import { useToast } from "@/hooks/use-toast";
import { Parcel } from "@/utils/mockData/types";

interface ContactPromoteurDialogProps {
  parcel: Parcel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ContactMethod = "email" | "chat" | "whatsapp" | null;

export const ContactPromoteurDialog = ({
  parcel,
  open,
  onOpenChange,
}: ContactPromoteurDialogProps) => {
  const [contactMethod, setContactMethod] = useState<ContactMethod>(null);
  const { toast } = useToast();

  const handleWhatsAppClick = () => {
    // Simuler l'ouverture de WhatsApp avec un message pré-rempli
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé par le bien ${parcel.titleDeedNumber}. Pourrions-nous en discuter ?`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
    onOpenChange(false);
    
    toast({
      title: "WhatsApp ouvert",
      description: "Une nouvelle fenêtre WhatsApp a été ouverte avec votre message.",
    });
  };

  const handleBack = () => {
    setContactMethod(null);
  };

  const renderContent = () => {
    if (!contactMethod) {
      return (
        <div className="space-y-4 p-4">
          <div className="grid gap-4">
            <Button
              variant="outline"
              className="flex items-center justify-start gap-2 h-auto py-4"
              onClick={() => setContactMethod("email")}
            >
              <Mail className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Par Email</div>
                <div className="text-sm text-muted-foreground">
                  Envoyez un email détaillé au promoteur
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-start gap-2 h-auto py-4"
              onClick={() => setContactMethod("chat")}
            >
              <MessageSquare className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Chat Direct</div>
                <div className="text-sm text-muted-foreground">
                  Démarrez une conversation en temps réel
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-start gap-2 h-auto py-4"
              onClick={handleWhatsAppClick}
            >
              <Phone className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Via WhatsApp</div>
                <div className="text-sm text-muted-foreground">
                  Continuez la discussion sur WhatsApp
                </div>
              </div>
            </Button>
          </div>
        </div>
      );
    }

    if (contactMethod === "email") {
      return (
        <ContactEmailForm
          parcel={parcel}
          onBack={handleBack}
          onClose={() => onOpenChange(false)}
        />
      );
    }

    if (contactMethod === "chat") {
      return (
        <ContactDirectForm
          parcel={parcel}
          onBack={handleBack}
          onClose={() => onOpenChange(false)}
        />
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contacter le Promoteur Intéressé</DialogTitle>
          <DialogDescription>
            Choisissez votre méthode de contact préférée pour discuter de ce bien avec le promoteur.
          </DialogDescription>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};