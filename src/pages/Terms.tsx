import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-8 text-center">Conditions Générales d'Utilisation – eFoncier</h1>
          
          <ScrollArea className="h-[calc(100vh-300px)] pr-4">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Présentation du Site Web</h2>
                <p className="text-muted-foreground mb-4">
                  eFoncier est une plateforme numérique permettant :
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Aux <strong>Propriétaires</strong> : De gérer leurs biens fonciers, vérifier leur statut fiscal et effectuer les paiements associés.</li>
                  <li>Aux <strong>Promoteurs</strong> : D'identifier et de négocier les terrains disponibles.</li>
                  <li>Aux <strong>Communes</strong> : De superviser les statuts fiscaux des biens fonciers et générer des rapports administratifs.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Acceptation des Conditions</h2>
                <p className="text-muted-foreground mb-4">
                  En accédant ou en utilisant eFoncier, l'utilisateur accepte pleinement et entièrement les présentes Conditions Générales d'Utilisation (CGU).
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le site.</li>
                  <li>Les présentes CGU peuvent être modifiées à tout moment. Les utilisateurs seront notifiés des mises à jour.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Accès et Inscription au Site</h2>
                <h3 className="text-xl font-medium mb-3">3.1. Accès Libre</h3>
                <p className="text-muted-foreground mb-4">
                  Certaines parties du site sont accessibles sans inscription, notamment :
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                  <li>La visualisation générale de la carte interactive.</li>
                  <li>L'exploration des biens en vente.</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">3.2. Création de Compte</h3>
                <p className="text-muted-foreground mb-4">
                  Pour accéder aux fonctionnalités avancées, l'utilisateur doit créer un compte selon son profil :
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Propriétaire</strong> : Gestion des biens fonciers, suivi des paiements TNB.</li>
                  <li><strong>Promoteur</strong> : Consultation et négociation des terrains disponibles.</li>
                  <li><strong>Commune</strong> : Supervision des statuts fiscaux.</li>
                </ul>
              </section>

              {/* ... Continue with other sections following the same pattern */}
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">13. Contact</h2>
                <p className="text-muted-foreground mb-4">
                  Pour toute question ou assistance :
                </p>
                <ul className="list-none space-y-2 text-muted-foreground">
                  <li>📧 Email : support@efoncier.com</li>
                  <li>📞 Téléphone : +212 5 22 00 00 00</li>
                  <li>📍 Adresse : Avenue Mohammed V, Rabat, Maroc.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">14. Acceptation des CGU</h2>
                <p className="text-muted-foreground">
                  En utilisant le site eFoncier, l'utilisateur reconnaît avoir lu, compris et accepté les présentes Conditions Générales d'Utilisation.
                </p>
              </section>
            </div>
          </ScrollArea>
        </Card>
      </main>
    </div>
  );
};

export default Terms;