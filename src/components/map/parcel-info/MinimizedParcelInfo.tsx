import { Parcel } from "@/utils/mockData/types";
import { formatCurrency } from "@/utils/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { PropertyPopup } from "../property-popup/PropertyPopup";
import { cn } from "@/lib/utils";

interface MinimizedParcelInfoProps {
  parcel: Parcel;
}

export const MinimizedParcelInfo = ({ parcel }: MinimizedParcelInfoProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const getStatusBadge = () => {
    const statusConfig = {
      AVAILABLE: {
        label: "Disponible",
        class: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
        icon: "🟢"
      },
      SOLD: {
        label: "Vendu",
        class: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
        icon: "🔴"
      },
      UNAVAILABLE: {
        label: "Indisponible",
        class: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
        icon: "🟡"
      }
    };

    const status = parcel.status === "approved" && !parcel.is_for_sale ? "SOLD" :
                  parcel.status === "approved" ? "AVAILABLE" : "UNAVAILABLE";

    const config = statusConfig[status];

    return (
      <Badge 
        variant="secondary" 
        className={cn(
          "absolute top-2 left-2",
          config.class
        )}
        aria-label={`Statut du bien : ${config.label}`}
      >
        {config.icon} {config.label}
      </Badge>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'OVERDUE':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      default:
        return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'Payé';
      case 'OVERDUE':
        return 'En retard';
      default:
        return 'En attente';
    }
  };

  return (
    <>
      <PropertyPopup 
        parcel={parcel}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      <div className="bg-background/95 backdrop-blur-sm p-4 rounded-b-lg border border-t-0 border-border/50 min-w-[300px] relative">
        {getStatusBadge()}
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{parcel.surface_area} m² •</span>
                  <span>Zone {parcel.location?.zone || "N/A"}</span>
                </div>
                <div className="text-xs font-medium text-red-600 dark:text-red-500">
                  {formatCurrency(parcel.price)} DHS/m²
                </div>
                <Badge 
                  variant="secondary" 
                  className={`mt-1 w-fit ${getStatusColor(parcel.fiscal_status)}`}
                >
                  {getStatusText(parcel.fiscal_status)}
                </Badge>
                <div className="text-xs text-muted-foreground mt-1">
                  TF: {parcel.id}
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-semibold whitespace-nowrap">
                {formatCurrency(parcel.price * parcel.surface_area)} DHS
              </div>
              <div className="text-xs font-medium whitespace-nowrap text-muted-foreground">
                {parcel.owner_id}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2"
                onClick={() => setDialogOpen(true)}
              >
                Voir détails
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};