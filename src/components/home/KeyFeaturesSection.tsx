import { MapPin, CreditCard, Bell, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: MapPin,
    title: "Carte Interactive",
    description: "Visualisez les parcelles en temps réel avec des filtres avancés.",
  },
  {
    icon: CreditCard,
    title: "Paiement Sécurisé",
    description: "Réglez vos taxes en ligne avec des reçus instantanés.",
  },
  {
    icon: Bell,
    title: "Notifications Intelligentes",
    description: "Restez informé grâce aux alertes automatisées.",
  },
  {
    icon: BarChart,
    title: "Tableau de Bord",
    description: "Gérez vos transactions et vos informations en un seul endroit.",
  },
];

export const KeyFeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">
          Nos Fonctionnalités Principales
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 bg-accent/5 rounded-lg hover:bg-accent/10 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="group">
            <Link to="/about">
              Découvrir Toutes les Fonctionnalités
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};