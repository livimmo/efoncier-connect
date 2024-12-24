import { Parcel } from "@/utils/mockData/types";
import { formatCurrency } from "@/utils/format";

interface MinimizedParcelInfoProps {
  parcel: Parcel;
}

export const MinimizedParcelInfo = ({ parcel }: MinimizedParcelInfoProps) => {
  return (
    <div className="bg-background/95 backdrop-blur-sm p-4 rounded-b-lg border border-t-0 border-border/50">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <div className="text-sm font-medium truncate">{parcel.title}</div>
          <div className="text-xs text-muted-foreground truncate">{parcel.address}</div>
        </div>
        <div className="text-right ml-4">
          <div className="text-sm font-medium">
            {formatCurrency(parcel.tnbInfo.totalAmount)} DHS
          </div>
          <div className={`text-xs ${
            parcel.taxStatus === 'PAID' 
              ? 'text-green-600' 
              : parcel.taxStatus === 'OVERDUE' 
              ? 'text-red-600' 
              : 'text-orange-600'
          }`}>
            {parcel.taxStatus === 'PAID' 
              ? 'Payé' 
              : parcel.taxStatus === 'OVERDUE' 
              ? 'En retard' 
              : 'En attente'}
          </div>
        </div>
      </div>
    </div>
  );
};