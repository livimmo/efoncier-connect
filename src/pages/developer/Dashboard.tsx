import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, FileText, MapPin } from "lucide-react";
import { StatsWidget } from "@/components/dashboard/StatsWidget";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";

const DeveloperDashboard = () => {
  const stats = [
    {
      title: "Projets en cours",
      value: "12",
      icon: Building,
      description: "Projets immobiliers actifs",
    },
    {
      title: "Propriétaires contactés",
      value: "45",
      icon: Users,
      description: "Dans les 30 derniers jours",
    },
    {
      title: "Propositions envoyées",
      value: "28",
      icon: FileText,
      description: "En attente de réponse",
    },
    {
      title: "Zones d'intérêt",
      value: "8",
      icon: MapPin,
      description: "Zones surveillées",
    },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto p-6 mt-16 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tableau de Bord Promoteur</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Activités Récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <QuickActions />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default DeveloperDashboard;