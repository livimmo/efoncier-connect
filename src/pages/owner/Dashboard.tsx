import { Header } from "@/components/Header";
import { StatsWidget } from "@/components/dashboard/StatsWidget";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ParcelList } from "@/components/owner/ParcelList";
import { PaymentHistory } from "@/components/owner/PaymentHistory";
import { AddPropertyButton } from "@/components/header/AddPropertyButton";

const OwnerDashboard = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto p-6 mt-16 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tableau de Bord – Propriétaire</h1>
            <p className="text-muted-foreground mt-1">
              Gérez vos biens fonciers, suivez vos paiements TNB et restez informé en temps réel.
            </p>
          </div>
          <AddPropertyButton />
        </div>

        <StatsWidget />
        
        <div className="grid gap-6 md:grid-cols-2">
          <RecentActivity />
          <PaymentHistory />
        </div>

        <ParcelList />
      </div>
    </>
  );
};

export default OwnerDashboard;