import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, CircleCheck, CircleSlash } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapLegendProps {
  className?: string;
}

export const MapLegend = ({ className }: MapLegendProps) => {
  const statuses = [
    {
      label: "Disponible",
      color: "text-green-500",
      description: "Terrain ouvert à l'achat ou à la location",
      icon: CircleCheck
    },
    {
      label: "En Transaction",
      color: "text-orange-500",
      description: "En cours de négociation",
      icon: MapPin
    },
    {
      label: "Vendu",
      color: "text-red-500",
      description: "Terrain déjà acquis",
      icon: CircleSlash
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
          return (
            <div key={status.label} className="flex items-center gap-2">
              <Icon className={cn("h-4 w-4", status.color)} />
              <div className="flex-1">
                <p className="text-sm font-medium">{status.label}</p>
                <p className="text-xs text-muted-foreground">{status.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};