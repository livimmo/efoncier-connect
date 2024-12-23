import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Prêt à Transformer Votre Gestion Fiscale et Foncier ?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="group hover:scale-105 transition-transform"
          >
            <Link to="/register">
              Créer un Compte Gratuitement
            </Link>
          </Button>
          
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group hover:scale-105 transition-transform"
          >
            <Link to="/contact">
              <MessageSquare className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Parler à un Conseiller
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};