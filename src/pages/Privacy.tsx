import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Politique de Confidentialité
          </h1>
          
          <Card className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Protection des Données</h2>
              <p className="text-gray-600">
                eFoncier s'engage à protéger la confidentialité de vos données personnelles
                conformément aux lois en vigueur. Cette politique explique comment nous
                collectons, utilisons et protégeons vos informations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Collecte des Données</h2>
              <p className="text-gray-600">
                Nous collectons uniquement les données nécessaires à la gestion de vos
                propriétés foncières et au traitement de vos paiements. Ces informations
                incluent :
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li>Informations d'identification</li>
                <li>Coordonnées de contact</li>
                <li>Données relatives aux propriétés</li>
                <li>Historique des transactions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Utilisation des Données</h2>
              <p className="text-gray-600">
                Vos données sont utilisées exclusivement pour :
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li>La gestion de vos propriétés</li>
                <li>Le traitement des paiements</li>
                <li>La communication administrative</li>
                <li>L'amélioration de nos services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Sécurité</h2>
              <p className="text-gray-600">
                Nous mettons en œuvre des mesures de sécurité techniques et
                organisationnelles pour protéger vos données contre tout accès non
                autorisé, modification, divulgation ou destruction.
              </p>
            </section>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Privacy;