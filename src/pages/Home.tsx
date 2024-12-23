import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Building, MapPin, Users, ChartBar } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Terrains Répertoriés",
      value: "15,234",
      icon: MapPin,
    },
    {
      label: "Taxes Recouvrées",
      value: "25M MAD",
      icon: ChartBar,
    },
    {
      label: "Promoteurs Actifs",
      value: "342",
      icon: Building,
    },
    {
      label: "Propriétaires Enregistrés",
      value: "8,721",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl font-bold mb-6">
              Plateforme Nationale de Gestion du Foncier
            </h1>
            <p className="text-xl mb-8">
              Identifiez, gérez et valorisez vos terrains en toute simplicité
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/search")}
              >
                Explorer la Carte
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate("/dashboard")}
              >
                Accéder à Mon Espace
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6">
                <stat.icon className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Services Principaux
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <MapPin className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-4">
                Identification des Terrains
              </h3>
              <p className="text-gray-600">
                Localisez et identifiez facilement les terrains non bâtis sur notre carte interactive
              </p>
            </Card>
            <Card className="p-6">
              <ChartBar className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-4">
                Gestion Fiscale
              </h3>
              <p className="text-gray-600">
                Suivez et réglez vos taxes foncières en ligne en toute sécurité
              </p>
            </Card>
            <Card className="p-6">
              <Building className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-4">
                Mise en Relation
              </h3>
              <p className="text-gray-600">
                Connectez-vous avec des promoteurs immobiliers qualifiés
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;