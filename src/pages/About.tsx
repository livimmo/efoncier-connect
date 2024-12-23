import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Building, Shield, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            À Propos d'eFoncier
          </h1>
          
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
            <p className="text-gray-600 mb-6">
              eFoncier est une initiative gouvernementale marocaine visant à moderniser
              et digitaliser la gestion du foncier. Notre plateforme facilite
              l'identification des terrains non bâtis, le recouvrement fiscal et
              la mise en relation entre propriétaires et promoteurs.
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Sécurité</h3>
              <p className="text-gray-600">
                Protection des données et transactions sécurisées
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Transparence</h3>
              <p className="text-gray-600">
                Accès équitable aux informations foncières
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <Building className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Technologies modernes au service du foncier
              </p>
            </Card>
          </div>

          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Nos Partenaires</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                • Ministère de l'Intérieur
              </p>
              <p className="text-gray-600">
                • Direction Générale des Impôts
              </p>
              <p className="text-gray-600">
                • Agence Nationale de la Conservation Foncière
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;