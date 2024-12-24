import { Parcel } from "@/utils/mockData/types";
import { formatCurrency } from "@/utils/format";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { ParcelDetails } from "./ParcelDetails";
import { ParcelActions } from "./ParcelActions";
import { Badge } from "@/components/ui/badge";

interface MinimizedParcelInfoProps {
  parcel: Parcel;
}

export const MinimizedParcelInfo = ({ parcel }: MinimizedParcelInfoProps) => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTitleClick = () => {
    navigate(`/taxpayer/properties/${parcel.id}`);
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
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{parcel.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <ParcelDetails parcel={parcel} />
            <ParcelActions 
              parcel={parcel}
              onPaymentClick={() => {}}
              onReceiptClick={() => {}}
              onContactClick={() => {}}
              onCalculatorClick={() => {}}
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-background/95 backdrop-blur-sm p-4 rounded-b-lg border border-t-0 border-border/50 min-w-[300px]">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <div 
                className="text-sm font-medium hover:text-primary cursor-pointer"
                onClick={handleTitleClick}
              >
                {parcel.title}
              </div>
              <div className="flex flex-col">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{parcel.surface} m² •</span>
                  <span>Zone {parcel.zone}</span>
                </div>
                <div className="text-xs font-medium text-red-600 dark:text-red-500">
                  {formatCurrency(parcel.tnbInfo.pricePerMeter)} DHS/m²
                </div>
                <Badge 
                  variant="secondary" 
                  className={`mt-1 w-fit ${getStatusColor(parcel.taxStatus)}`}
                >
                  {getStatusText(parcel.taxStatus)}
                </Badge>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-semibold whitespace-nowrap">
                {formatCurrency(parcel.tnbInfo.totalAmount)} DHS
              </div>
              <div className="text-xs font-medium whitespace-nowrap text-muted-foreground">
                {parcel.ownerName}
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