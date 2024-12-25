import { StatsWidget } from "@/components/dashboard/StatsWidget";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export const DashboardTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <StatsWidget />
      <div className="grid gap-6 md:grid-cols-2">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  );
};