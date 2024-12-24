import { useEffect } from "react";
import { Header } from "@/components/Header";
import { useAuth } from "@/components/auth/AuthProvider";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { ProfileNavigation } from "@/components/profile/ProfileNavigation";
import { DashboardTab } from "@/components/profile/tabs/DashboardTab";
import { PropertiesTab } from "@/components/profile/tabs/PropertiesTab";
import { StatsTab } from "@/components/profile/tabs/StatsTab";
import { SettingsTab } from "@/components/profile/tabs/SettingsTab";
import { NotificationList as TaxpayerNotificationList } from "@/components/taxpayer/NotificationList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentTab = searchParams.get("tab") || "overview";
  const { profile } = useAuth();

  useEffect(() => {
    if (!searchParams.get("tab")) {
      setSearchParams({ tab: "overview" });
    }
  }, [searchParams, setSearchParams]);

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <ProfileHeader profile={profile} />
          <ProfileStats profile={profile} />
          <ProfileNavigation />

          <Tabs value={currentTab} className="space-y-6">
            <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto bg-transparent">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
                onClick={() => navigate("?tab=overview")}
              >
                Vue d'ensemble
              </TabsTrigger>
              <TabsTrigger
                value="properties"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
                onClick={() => navigate("?tab=properties")}
              >
                Mes Biens
              </TabsTrigger>
              <TabsTrigger
                value="stats"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
                onClick={() => navigate("?tab=stats")}
              >
                Statistiques
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
                onClick={() => navigate("?tab=notifications")}
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
                onClick={() => navigate("?tab=settings")}
              >
                Paramètres
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="animate-fade-in">
              <DashboardTab />
            </TabsContent>

            <TabsContent value="properties" className="animate-fade-in">
              <PropertiesTab />
            </TabsContent>

            <TabsContent value="stats" className="animate-fade-in">
              <StatsTab />
            </TabsContent>

            <TabsContent value="notifications" className="animate-fade-in">
              <TaxpayerNotificationList />
            </TabsContent>

            <TabsContent value="settings" className="animate-fade-in">
              <SettingsTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}