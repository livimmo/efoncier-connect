import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Building2, Users, FileText, MapPin } from "lucide-react";
import { StatsWidget } from "@/components/dashboard/StatsWidget";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";

const DeveloperDashboard = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-6 mt-16 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tableau de Bord Promoteur</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Projets en cours</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Propriétaires contactés</p>
                <h3 className="text-2xl font-bold mt-1">45</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Propositions</p>
                <h3 className="text-2xl font-bold mt-1">28</h3>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="md:col-span-4">
            <RecentActivity />
          </div>
          <div className="md:col-span-3">
            <QuickActions />
          </div>
        </div>
      </main>
    </>
  );
};

export default DeveloperDashboard;