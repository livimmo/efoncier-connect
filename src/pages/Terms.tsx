import { Header } from "@/components/Header";
import { Footer } from "@/components/home/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-16">
        <article className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert mx-auto">
          <h1 className="text-3xl font-bold mb-8">Conditions d'Utilisation – eFoncier</h1>
          
          <section className="mb-8">
            <h2>ARTICLE 1 – OBJET</h2>
            <p>Les présentes Conditions d'Utilisation ont pour objet de définir les modalités et conditions d'accès et d'utilisation du site eFoncier. En accédant au site, l'utilisateur accepte sans réserve les présentes Conditions.</p>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 2 – ACCÈS AU SITE</h2>
            <p>L'accès au site est gratuit pour les utilisateurs enregistrés ou visiteurs. Certains services sont toutefois réservés aux utilisateurs ayant créé un compte (Propriétaire, Promoteur, Commune).</p>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 3 – CRÉATION ET GESTION DES COMPTES</h2>
            <p>Chaque utilisateur doit fournir des informations exactes lors de son inscription. Les identifiants sont strictement personnels et confidentiels. Tout accès non autorisé doit être signalé immédiatement à eFoncier.</p>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 4 – ENGAGEMENTS DE L’UTILISATEUR</h2>
            <p>L’utilisateur s’engage à : Utiliser le site conformément aux lois et réglementations en vigueur. Ne pas porter atteinte aux systèmes informatiques du site. Ne pas diffuser de contenus illégaux ou préjudiciables.</p>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 5 – RESPONSABILITÉ DE L’ADMINISTRATEUR</h2>
            <p>eFoncier s’engage à : Fournir un accès continu au site, sauf en cas de maintenance ou d’événements imprévus. Assurer la sécurité des données collectées. Ne pas être tenu responsable des dommages liés à l’utilisation du site.</p>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 6 – PROPRIÉTÉ INTELLECTUELLE</h2>
            <p>Tous les contenus présents sur le site (textes, images, logos, graphiques) sont protégés par les droits de propriété intellectuelle. Toute reproduction non autorisée est strictement interdite.</p>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 7 – MODIFICATION DES CONDITIONS</h2>
            <p>eFoncier se réserve le droit de modifier les présentes Conditions d'Utilisation à tout moment.</p>
          </section>

          <section className="mb-8">
            <h2>ARTICLE 8 – LOI APPLICABLE ET JURIDICTION</h2>
            <p>Tout litige relatif à l’utilisation du site sera soumis au droit marocain et porté devant les tribunaux compétents.</p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
