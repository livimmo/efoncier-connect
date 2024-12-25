import { MainLayout } from "@/components/layout/MainLayout";

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">À propos de eFoncier</h1>
        <p className="text-lg mb-4">
          eFoncier est une plateforme innovante dédiée à la gestion et au suivi des biens fonciers au Maroc.
        </p>
        <p className="text-lg mb-4">
          Notre mission est de simplifier le processus de gestion foncière pour les propriétaires, les développeurs et les collectivités.
        </p>
        <p className="text-lg mb-4">
          Grâce à notre interface conviviale et à nos outils avancés, nous permettons à nos utilisateurs de suivre leurs biens, de gérer les paiements et d'accéder à des informations précieuses sur le marché foncier.
        </p>
        <p className="text-lg mb-4">
          Rejoignez-nous dans notre mission de rendre la gestion foncière plus accessible et efficace pour tous.
        </p>
      </div>
    </MainLayout>
  );
};

export default About;
