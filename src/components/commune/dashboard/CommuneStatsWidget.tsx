import { Card } from "@/components/ui/card";
import { Building2, CreditCard, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: "properties" | "payments" | "alerts";
  trend?: {
    value: number;
    label: string;
  };
}

const StatCard = ({ title, value, description, icon, trend }: StatCardProps) => {
  const Icon = {
    properties: Building2,
    payments: CreditCard,
    alerts: AlertTriangle,
  }[icon];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          {trend && (
            <p className={cn(
              "text-xs mt-2",
              trend.value > 0 ? "text-green-600" : "text-red-600"
            )}>
              {trend.value > 0 ? "+" : ""}{trend.value}% {trend.label}
            </p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};

export const CommuneStatsWidget = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Biens Fonciers"
        value="156"
        description="42 en attente de régularisation"
        icon="properties"
        trend={{
          value: 12,
          label: "ce mois"
        }}
      />
      <StatCard
        title="Paiements TNB"
        value="2.4M MAD"
        description="850K MAD en attente"
        icon="payments"
        trend={{
          value: -5,
          label: "vs mois dernier"
        }}
      />
      <StatCard
        title="Alertes Critiques"
        value="8"
        description="3 nécessitent une action immédiate"
        icon="alerts"
      />
    </div>
  );
};