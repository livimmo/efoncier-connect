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
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast({
        title: "Erreur",
        description: "Veuillez accepter les termes et conditions.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    setProgress(0);
    
    // Simuler un envoi de formulaire avec une barre de progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // Simuler une attente de 2 secondes
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message envoyé",
      description: "Nous reviendrons vers vous dans les plus brefs délais.",
    });
    
    setIsSubmitting(false);
    setProgress(0);
    
    // Reset form
    (e.target as HTMLFormElement).reset();
    setAcceptTerms(false);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">
            Nom Complet <span className="text-destructive">*</span>
          </Label>
          <Input id="name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Adresse Email <span className="text-destructive">*</span>
          </Label>
          <Input id="email" type="email" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Numéro de Téléphone (optionnel)
          </Label>
          <Input id="phone" type="tel" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">
            Objet de la Demande <span className="text-destructive">*</span>
          </Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un sujet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Assistance Technique</SelectItem>
              <SelectItem value="general">Question Générale</SelectItem>
              <SelectItem value="problem">Signalement d'un Problème</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">
            Message <span className="text-destructive">*</span>
          </Label>
          <Textarea 
            id="message" 
            required 
            className="min-h-[100px]"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground">Maximum 500 caractères</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="attachment">
            Pièces Jointes (facultatif)
          </Label>
          <Input 
            id="attachment" 
            type="file" 
            accept=".pdf,.jpg,.png"
          />
          <p className="text-xs text-muted-foreground">
            Formats acceptés : PDF, JPG, PNG (max 5 Mo)
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
          />
          <Label 
            htmlFor="terms" 
            className="text-sm"
          >
            J'accepte les termes et conditions
          </Label>
        </div>

        {isSubmitting && (
          <Progress value={progress} className="w-full" />
        )}

        <div className="flex gap-4">
          <Button 
            type="submit" 
            className="flex-1"
            disabled={isSubmitting || !acceptTerms}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer le Message"}
          </Button>
          <Button 
            type="reset"
            variant="outline"
            disabled={isSubmitting}
          >
            Réinitialiser
          </Button>
        </div>
      </form>
    </Card>
  );
};