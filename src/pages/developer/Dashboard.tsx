import { Header } from "@/components/Header";
import { StatsWidget } from "@/components/dashboard/StatsWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { MapPin, Building2, Star } from "lucide-react";
import { mockParcels } from "@/utils/mockData/parcels";
import { Property } from "@/types";

const DeveloperDashboard = () => {
  const { profile } = useAuth();
  const properties = mockParcels as unknown as Property[];

  const stats = {
    available: properties.filter(p => p.status === "AVAILABLE").length,
    inTransaction: properties.filter(p => p.status === "IN_TRANSACTION").length,
    favorites: properties.filter(p => p.isFavorite).length,
  };

  const propertyTypes = {
    residential: properties.filter(p => p.type === "RESIDENTIAL").length,
    commercial: properties.filter(p => p.type === "COMMERCIAL").length,
    industrial: properties.filter(p => p.type === "INDUSTRIAL").length,
    agricultural: properties.filter(p => p.type === "AGRICULTURAL").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6 space-y-6 pt-24">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Tableau de Bord - {profile?.first_name} {profile?.last_name}
            </h1>
            <p className="text-muted-foreground mt-2">
              Gérez vos opportunités d'investissement et suivez vos transactions
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Biens Disponibles
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.available}</div>
              <p className="text-xs text-muted-foreground">
                {stats.inTransaction} en transaction
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Emplacements
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.values(propertyTypes).reduce((a, b) => a + b, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Dans différentes régions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Biens Favoris
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.favorites}</div>
              <p className="text-xs text-muted-foreground">
                Opportunités sauvegardées
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Distribution par Type de Bien</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(propertyTypes).map(([type, count]) => (
                  <div key={type} className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium capitalize">
                          {type}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {count}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{
                            width: `${(count / properties.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-accent">
                🔍 Rechercher des Biens
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-accent">
                ⭐ Voir mes Favoris
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-accent">
                💬 Messages Récents
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-accent">
                📊 Générer un Rapport
              </button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DeveloperDashboard;