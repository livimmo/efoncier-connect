import { Card, CardContent } from "@/components/ui/card";
import { StatsWidget } from "@/components/dashboard/StatsWidget";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export const DashboardTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatsWidget />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <QuickActions />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};