import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Demande envoyée",
      description: "Vous recevrez une réponse sous 24 heures.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Contactez notre Équipe Support</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nom Complet
          </label>
          <Input id="name" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Adresse Email
          </label>
          <Input id="email" type="email" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Numéro de Téléphone (optionnel)
          </label>
          <Input id="phone" type="tel" />
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Sujet de la Demande
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un sujet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="payment">Paiement</SelectItem>
              <SelectItem value="map">Carte Interactive</SelectItem>
              <SelectItem value="account">Compte</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Description du Problème
          </label>
          <Textarea id="message" required className="min-h-[100px]" />
        </div>

        <div className="space-y-2">
          <label htmlFor="attachment" className="text-sm font-medium">
            Pièces Jointes (facultatif)
          </label>
          <Input id="attachment" type="file" accept=".pdf,.jpg,.png" />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Envoyer ma Demande"}
        </Button>
      </form>
    </div>
  );
};