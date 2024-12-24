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
import { useToast } from "@/hooks/use-toast";
import { Parcel } from "@/utils/mockData/types";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface ContactDirectFormProps {
  parcel: Parcel;
  onBack: () => void;
  onClose: () => void;
}

export const ContactDirectForm = ({ parcel, onBack, onClose }: ContactDirectFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Formulaire envoyé",
      description: "Votre demande a été soumise avec succès. Vous recevrez une réponse sous 48 heures.",
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="mb-2"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>

      <div className="space-y-2">
        <Input
          placeholder="Votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Select value={type} onValueChange={setType} required>
          <SelectTrigger>
            <SelectValue placeholder="Type de demande" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="regularisation">Régularisation de Taxe</SelectItem>
            <SelectItem value="information">Demande d'Informations</SelectItem>
            <SelectItem value="autre">Autre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder="Votre message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="min-h-[100px]"
        />
      </div>

      <Button type="submit" className="w-full">
        Envoyer la demande
      </Button>
    </form>
  );
};