import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Phone, MessageSquare, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactEmailForm } from "./ContactEmailForm";
import { ContactDirectForm } from "./ContactDirectForm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Parcel } from "@/utils/mockData/types";

interface ContactDialogProps {
  parcel: Parcel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactDialog = ({ parcel, open, onOpenChange }: ContactDialogProps) => {
  const [activeForm, setActiveForm] = useState<"email" | "direct" | null>(null);
  const { toast } = useToast();

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Bonjour, je souhaite obtenir plus d'informations concernant le bien foncier [Titre Foncier : ${parcel.titleDeedNumber}] situé à ${parcel.address}. Merci de me recontacter.`
    );
    window.open(`https://wa.me/${parcel.phone}?text=${message}`, "_blank");
    toast({
      title: "Redirection WhatsApp",
      description: "Vous allez être redirigé vers WhatsApp",
    });
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${parcel.phone}`;
    toast({
      title: "Appel téléphonique",
      description: "Lancement de l'application d'appel",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choisissez votre méthode de contact préférée</DialogTitle>
        </DialogHeader>

        {!activeForm ? (
          <div className="grid gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setActiveForm("email")}
            >
              <Mail className="w-4 h-4" />
              Envoyer un Email
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="w-4 h-4" />
              Contacter via WhatsApp
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handlePhoneClick}
            >
              <Phone className="w-4 h-4" />
              Appeler Directement
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setActiveForm("direct")}
            >
              <MessageSquare className="w-4 h-4" />
              Remplir un Formulaire
            </Button>
          </div>
        ) : activeForm === "email" ? (
          <ContactEmailForm
            parcel={parcel}
            onBack={() => setActiveForm(null)}
            onClose={() => onOpenChange(false)}
          />
        ) : (
          <ContactDirectForm
            parcel={parcel}
            onBack={() => setActiveForm(null)}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};