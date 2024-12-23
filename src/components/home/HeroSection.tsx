import { MapPin, CreditCard, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-hero-pattern bg-cover bg-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="container relative z-10 mx-auto px-4 text-center space-y-8 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          Bienvenue sur eFoncier
          <span className="block text-2xl md:text-3xl mt-4 text-muted-foreground">
            Votre Plateforme Foncier Numérique au Maroc
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Simplifiez vos recherches, vos transactions et vos paiements fonciers avec une expérience fluide et transparente.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="group">
            <Link to="/map">
              <MapPin className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Explorer la Carte Interactive
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="group">
            <Link to="/payment">
              <CreditCard className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Effectuer un Paiement
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="group">
            <Link to="/about">
              <Info className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              En Savoir Plus
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};