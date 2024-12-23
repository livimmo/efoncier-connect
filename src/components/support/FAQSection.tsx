import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const faqItems = [
  {
    question: "Comment payer ma taxe TNB en ligne ?",
    answer: "Pour payer votre taxe TNB en ligne, connectez-vous à votre compte, accédez à la section 'Paiements', sélectionnez la taxe à payer et suivez les instructions pour effectuer le paiement sécurisé."
  },
  {
    question: "Où puis-je télécharger mon reçu fiscal ?",
    answer: "Les reçus fiscaux sont disponibles dans la section 'Documents' de votre tableau de bord. Cliquez sur 'Reçus Fiscaux' et sélectionnez l'année concernée pour télécharger votre document."
  },
  {
    question: "Comment contacter directement un promoteur ?",
    answer: "Dans la section 'Annuaire', vous pouvez rechercher un promoteur et utiliser le bouton 'Contacter' pour lui envoyer un message direct via la plateforme."
  },
  {
    question: "Comment mettre à jour mes informations personnelles ?",
    answer: "Accédez à votre profil en cliquant sur votre avatar en haut à droite, puis sélectionnez 'Paramètres'. Vous pourrez y modifier vos informations personnelles."
  }
];

export const FAQSection = () => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Questions Fréquentes (FAQ)</h2>
      
      <div className="relative mb-6">
        <Input
          type="search"
          placeholder="Rechercher dans la FAQ..."
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      </div>

      <Accordion type="single" collapsible className="mb-6">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="outline" className="w-full">
        <FileDown className="mr-2 h-4 w-4" />
        Télécharger la FAQ Complète (PDF)
      </Button>
    </div>
  );
};