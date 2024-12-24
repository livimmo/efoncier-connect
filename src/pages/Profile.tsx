import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/components/auth/AuthProvider";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { ProfileNavigation } from "@/components/profile/ProfileNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";

export default function Profile() {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";
  const { profile } = useAuth();

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6 pt-24">
          <div className="max-w-7xl mx-auto space-y-8">
            <ProfileHeader profile={profile} />
            <ProfileStats profile={profile} />
            <ProfileNavigation />

            <Tabs value={currentTab} className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="properties">Mes Biens</TabsTrigger>
                <TabsTrigger value="stats">Statistiques</TabsTrigger>
                <TabsTrigger value="settings">Paramètres</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                {/* Will be implemented in next iteration */}
                <div className="text-muted-foreground">
                  Vue d'ensemble à venir...
                </div>
              </TabsContent>

              <TabsContent value="properties">
                {/* Will be implemented in next iteration */}
                <div className="text-muted-foreground">
                  Gestion des biens à venir...
                </div>
              </TabsContent>

              <TabsContent value="stats">
                {/* Will be implemented in next iteration */}
                <div className="text-muted-foreground">
                  Statistiques à venir...
                </div>
              </TabsContent>

              <TabsContent value="settings">
                {/* Will be implemented in next iteration */}
                <div className="text-muted-foreground">
                  Paramètres à venir...
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}