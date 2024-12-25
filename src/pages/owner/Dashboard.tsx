import { Header } from "@/components/Header";
import { StatsWidget } from "@/components/dashboard/StatsWidget";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ParcelList } from "@/components/owner/ParcelList";
import { PaymentHistory } from "@/components/owner/PaymentHistory";
import { NotificationList } from "@/components/owner/NotificationList";

const OwnerDashboard = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto p-6 mt-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">🏠 Tableau de Bord – Propriétaire</h1>
            <p className="text-muted-foreground">
              Gérez vos biens, suivez vos paiements et restez informé en temps réel.
            </p>
          </div>

          <StatsWidget />
          
          <div className="grid gap-8 md:grid-cols-2">
            <QuickActions />
            <RecentActivity />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Mes Biens</h2>
                <ParcelList />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Mes Paiements</h2>
                <PaymentHistory />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Notifications Importantes</h2>
                <NotificationList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerDashboard;