import { MapPin, CreditCard, BarChart, Bell, Shield } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Carte Interactive Dynamique",
    description: "Explorez et filtrez les parcelles en temps réel.",
  },
  {
    icon: CreditCard,
    title: "Paiements Simplifiés",
    description: "Réglez vos taxes foncières en quelques clics.",
  },
  {
    icon: BarChart,
    title: "Tableau de Bord Personnalisé",
    description: "Suivez vos transactions et paiements en un seul endroit.",
  },
  {
    icon: Bell,
    title: "Notifications Intelligentes",
    description: "Restez informé de vos échéances et nouvelles opportunités.",
  },
  {
    icon: Shield,
    title: "Sécurité et Confidentialité",
    description: "Toutes vos données sont sécurisées et protégées.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">
          Pourquoi Choisir eFoncier ?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 bg-background rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};