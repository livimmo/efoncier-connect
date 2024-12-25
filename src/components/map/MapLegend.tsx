import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapLegendProps {
  className?: string;
  onStatusFilter?: (status: string | null) => void;
  activeStatus: string | null;
}

export const MapLegend = ({ className, onStatusFilter, activeStatus }: MapLegendProps) => {
  const statuses = [
    {
      label: "Disponible",
      color: "text-green-500",
      description: "Terrain prêt pour la transaction",
      icon: CheckCircle,
      value: "AVAILABLE"
    },
    {
      label: "En Transaction",
      color: "text-orange-500",
      description: "Vente en cours, pas encore finalisée",
      icon: AlertTriangle,
      value: "IN_TRANSACTION"
    },
    {
      label: "Vendu",
      color: "text-red-500",
      description: "Terrain déjà acquis",
      icon: XCircle,
      value: "SOLD"
    }
  ];

  return (
    <Card className={cn(
      "absolute bottom-4 right-4 p-4 bg-background/95 backdrop-blur-sm",
      "w-64 shadow-lg z-10",
      "lg:block", // Always visible on desktop
      className
    )}>
      <div className="space-y-2">
        {statuses.map((status) => {
          const Icon = status.icon;
          const isActive = activeStatus === status.value;
          return (
            <button
              key={status.label}
              onClick={() => onStatusFilter?.(isActive ? null : status.value)}
              className={cn(
                "flex items-center gap-2 w-full p-2 rounded-lg transition-colors",
                "hover:bg-accent",
                isActive && "bg-accent"
              )}
            >
              <Icon className={cn("h-4 w-4", status.color)} />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">{status.label}</p>
                <p className="text-xs text-muted-foreground">{status.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};