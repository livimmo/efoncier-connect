import { Header } from "@/components/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";

const Search = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 md:p-8 pt-20 md:pt-24">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">
              Recherche de Parcelles
            </h1>
            {profile?.role === "developer" && (
              <p className="text-muted-foreground">
                Trouvez des opportunités d'investissement en filtrant par localisation, surface et statut fiscal.
              </p>
            )}
            {profile?.role === "owner" && (
              <p className="text-muted-foreground">
                Gérez vos biens et consultez les informations cadastrales.
              </p>
            )}
            {!profile && (
              <p className="text-muted-foreground">
                Connectez-vous pour accéder à plus de fonctionnalités de recherche.
              </p>
            )}
          </div>

          <Card>
            <CardHeader className={isMobile ? "px-4 py-4" : "px-6"}>
              <CardTitle>Recherche Avancée</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? "px-4 pb-4" : "px-6"}>
              <SearchBar />
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-muted-foreground">
            <p>Commencez votre recherche en utilisant les filtres ci-dessus.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;