import { ScrollArea } from "@/components/ui/scroll-area";

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-center mb-8">Politique de Confidentialité – eFoncier</h1>
          
          <section>
            <p className="text-muted-foreground mb-4">
              Bienvenue sur <strong>eFoncier</strong>. La protection de vos données personnelles est une priorité pour nous. 
              Cette <strong>Politique de Confidentialité</strong> explique comment nous collectons, utilisons, stockons et 
              protégeons vos informations personnelles lorsque vous utilisez notre site web <strong>www.efoncier.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <div className="space-y-2">
              <p>La présente <strong>Politique de Confidentialité</strong> décrit :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Les types d'informations collectées</li>
                <li>La finalité de leur utilisation</li>
                <li>Les mesures de sécurité pour les protéger</li>
                <li>Vos droits concernant vos données personnelles</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Informations Collectées</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium">2.1. Données Personnelles Collectées</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Informations d'identité : Nom, prénom, CIN</li>
                <li>Coordonnées : Adresse e-mail, numéro de téléphone</li>
                <li>Informations professionnelles : Nom de l'entreprise, identifiant commercial</li>
                <li>Identifiants de connexion : Nom d'utilisateur, mot de passe</li>
                <li>Informations de paiement : Détails de transactions financières</li>
                <li>Localisation : Adresse géographique liée aux biens fonciers</li>
              </ul>
            </div>
          </section>

          {/* Continue with other sections following the same pattern */}
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Contact</h2>
            <div className="space-y-2">
              <p>Pour toute question relative à cette <strong>Politique de Confidentialité</strong>, vous pouvez nous contacter :</p>
              <ul className="list-none space-y-2">
                <li>📧 Email : dpo@efoncier.com</li>
                <li>📞 Téléphone : +212 5 22 00 00 00</li>
                <li>📍 Adresse : Avenue Mohammed V, Rabat, Maroc</li>
              </ul>
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Privacy;