import { Header } from "@/components/Header";
import { Footer } from "@/components/home/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-16">
        <article className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert mx-auto">
          <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité – eFoncier</h1>
          
          <section className="mb-8">
            <h2>ARTICLE 1 – OBJET</h2>
            <p>La présente Politique de Confidentialité a pour objectif d'informer les utilisateurs du site eFoncier sur la manière dont leurs données personnelles sont collectées, utilisées et protégées, conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.</p>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 2 – DONNÉES COLLECTÉES</h2>
            <p>Dans le cadre de l'utilisation du site eFoncier, les données suivantes peuvent être collectées :</p>
            <ul>
              <li>Identité : Nom, Prénom, CIN.</li>
              <li>Coordonnées : Adresse e-mail, numéro de téléphone, adresse postale.</li>
              <li>Données techniques : Adresse IP, type de navigateur, système d'exploitation.</li>
              <li>Données financières : Informations bancaires pour les paiements.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 3 – FINALITÉS DU TRAITEMENT</h2>
            <p>Les données collectées sont utilisées pour les finalités suivantes :</p>
            <ul>
              <li>Gestion des comptes utilisateurs et accès aux services personnalisés.</li>
              <li>Traitement des paiements et transactions sécurisées.</li>
              <li>Communication et assistance client.</li>
              <li>Amélioration de l’expérience utilisateur.</li>
              <li>Respect des obligations légales et réglementaires.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 4 – PARTAGE DES DONNÉES</h2>
            <p>Les données personnelles peuvent être partagées avec :</p>
            <ul>
              <li>Les prestataires techniques intervenant dans le traitement des données.</li>
              <li>Les autorités administratives ou judiciaires conformément à la loi.</li>
              <li>Les partenaires contractuels autorisés.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 5 – DROITS DES UTILISATEURS</h2>
            <p>Conformément à la législation en vigueur, chaque utilisateur dispose des droits suivants :</p>
            <ul>
              <li>Droit d’accès à ses données personnelles.</li>
              <li>Droit de rectification et d’effacement.</li>
              <li>Droit à la limitation du traitement.</li>
              <li>Droit d’opposition.</li>
              <li>Droit à la portabilité des données.</li>
            </ul>
            <p>Ces droits peuvent être exercés en envoyant une demande à :</p>
            <p>📧 Email : support@efoncier.ma</p>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 6 – SÉCURITÉ DES DONNÉES</h2>
            <p>eFoncier met en place toutes les mesures techniques et organisationnelles appropriées pour assurer la sécurité et la confidentialité des données personnelles des utilisateurs.</p>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 7 – COOKIES</h2>
            <p>Des cookies peuvent être utilisés pour améliorer la navigation sur le site. L’utilisateur peut gérer les préférences de cookies via les paramètres de son navigateur.</p>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 8 – MODIFICATION DE LA POLITIQUE</h2>
            <p>eFoncier se réserve le droit de modifier cette Politique de Confidentialité à tout moment. Les utilisateurs seront notifiés de toute mise à jour importante.</p>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 9 – CONTACT</h2>
            <p>Pour toute question relative à cette Politique, vous pouvez contacter :</p>
            <p>📧 Email : support@efoncier.ma</p>
            <p>📍 Adresse : [Adresse de l'entreprise]</p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
