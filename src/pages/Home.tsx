import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, CreditCard, Users, BarChart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Terrains Identifiés", value: "12,000+" },
    { label: "MAD Collectés", value: "500M+" },
    { label: "Taux de Recouvrement", value: "80%" },
  ];

  const features = [
    {
      icon: MapPin,
      title: "Identification Précise",
      description: "Localisez et identifiez vos terrains avec précision"
    },
    {
      icon: CreditCard,
      title: "Paiement Sécurisé",
      description: "Réglez vos taxes en ligne en toute sécurité"
    },
    {
      icon: Users,
      title: "Mise en Relation",
      description: "Connectez-vous avec des promoteurs qualifiés"
    },
    {
      icon: BarChart,
      title: "Tableau de Bord",
      description: "Suivez vos transactions et paiements en temps réel"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-5xl font-bold mb-6">
            eFoncier – Gérez vos Terrains, Vos Taxes et Vos Transactions
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Une solution numérique moderne pour un foncier plus accessible et plus transparent
          </p>
          <div className="flex gap-4">
            <Button 
              size="lg"
              onClick={() => navigate("/map")}
              className="bg-primary hover:bg-primary/90"
            >
              Explorer la Carte Interactive
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 hover:bg-white/20 border-white"
              onClick={() => navigate("/dashboard")}
            >
              Payer vos Taxes
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-geometric-pattern bg-fixed">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Fonctionnalités Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">
            Rejoignez dès aujourd'hui la plateforme eFoncier
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Pour une gestion simplifiée de vos biens fonciers
          </p>
          <Button 
            size="lg"
            variant="outline"
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => navigate("/register")}
          >
            Créer un Compte Gratuitement
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12 text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">À Propos</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:underline">À Propos de Nous</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
                <li><a href="/faq" className="hover:underline">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Légal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="hover:underline">Politique de Confidentialité</a></li>
                <li><a href="/terms" className="hover:underline">Conditions d'Utilisation</a></li>
                <li><a href="/mentions" className="hover:underline">Mentions Légales</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary">Facebook</a>
                <a href="#" className="hover:text-primary">LinkedIn</a>
                <a href="#" className="hover:text-primary">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <p>&copy; 2024 eFoncier. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;