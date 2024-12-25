import { Header } from "@/components/Header";
import { DashboardTab } from "@/components/profile/tabs/DashboardTab";

const OwnerDashboard = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto p-6 mt-16">
        <h1 className="text-2xl font-bold mb-6">Tableau de Bord Propriétaire</h1>
        <DashboardTab />
      </div>
    </>
  );
};

export default OwnerDashboard;