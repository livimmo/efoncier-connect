import { Header } from "@/components/Header";
import { Footer } from "@/components/home/Footer";

const Legal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-16">
        <article className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mentions Légales – eFoncier</h1>
          
          <section className="mb-8">
            <h2>ARTICLE 1 – ÉDITEUR DU SITE</h2>
            <ul>
              <li>Nom de l'entreprise : eFoncier</li>
              <li>Statut juridique : [Statut juridique, ex : SARL]</li>
              <li>Adresse : [Adresse complète]</li>
              <li>RC : [Numéro de Registre de Commerce]</li>
              <li>ICE : [Numéro ICE]</li>
              <li>Email : support@efoncier.ma</li>
              <li>Téléphone : +212 5 22 123 456</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 2 – HÉBERGEUR DU SITE</h2>
            <ul>
              <li>Nom de l'hébergeur : [Nom de l'hébergeur]</li>
              <li>Adresse : [Adresse complète]</li>
              <li>Téléphone : [Numéro de contact]</li>
              <li>Email : [Email de support technique]</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 3 – RESPONSABILITÉ</h2>
            <p>L'éditeur n'est pas responsable des dommages directs ou indirects résultant de l’utilisation du site. Les liens hypertextes présents sur le site peuvent rediriger vers d'autres sites, dont le contenu n'engage pas la responsabilité de eFoncier.</p>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 4 – PROPRIÉTÉ INTELLECTUELLE</h2>
            <p>L'ensemble du contenu du site est protégé par les lois relatives à la propriété intellectuelle. Toute reproduction totale ou partielle est interdite sans autorisation écrite préalable.</p>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 5 – CONTACT</h2>
            <ul>
              <li>Email : support@efoncier.ma</li>
              <li>Téléphone : +212 5 22 123 456</li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
