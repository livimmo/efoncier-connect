import { Card } from "@/components/ui/card";
import { Building2, CreditCard, MapPin } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: "parcels" | "payments" | "locations";
}

const StatCard = ({ title, value, description, icon }: StatCardProps) => {
  const Icon = {
    parcels: Building2,
    payments: CreditCard,
    locations: MapPin,
  }[icon];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};

export const StatsWidget = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Parcelles"
        value="3"
        description="2 payées, 1 en attente"
        icon="parcels"
      />
      <StatCard
        title="Paiements"
        value="25 000 MAD"
        description="Montant total dû"
        icon="payments"
      />
      <StatCard
        title="Emplacements"
        value="4"
        description="Dans 3 villes différentes"
        icon="locations"
      />
    </div>
  );
};