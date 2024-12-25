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
    question: "Comment accéder aux détails d'un terrain ?",
    answer: "Inscrivez-vous en tant que Promoteur pour débloquer les informations complètes des biens."
  },
  {
    question: "Comment signaler un problème technique ?",
    answer: "Utilisez le formulaire ci-dessus ou contactez notre support technique directement par email."
  },
  {
    question: "Puis-je prendre rendez-vous avec un conseiller ?",
    answer: "Oui, vous pouvez nous contacter par téléphone ou remplir le formulaire avec le sujet 'Rendez-vous'."
  },
  {
    question: "Comment payer ma taxe TNB en ligne ?",
    answer: "Pour payer votre taxe TNB en ligne, connectez-vous à votre compte, accédez à la section 'Paiements' et suivez les instructions."
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