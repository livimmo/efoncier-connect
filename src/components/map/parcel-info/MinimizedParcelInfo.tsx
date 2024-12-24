import { Parcel } from "@/utils/mockData/types";
import { formatCurrency } from "@/utils/format";

interface MinimizedParcelInfoProps {
  parcel: Parcel;
}

export const MinimizedParcelInfo = ({ parcel }: MinimizedParcelInfoProps) => {
  return (
    <div className="bg-background/95 backdrop-blur-sm p-3 rounded-b-lg border border-t-0 border-border/50">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="text-sm font-medium truncate">{parcel.title}</div>
            <div className="text-xs text-muted-foreground truncate">
              N° {parcel.titleDeedNumber}
            </div>
          </div>
          <div className="text-right ml-4">
            <div className="text-sm font-medium">
              {formatCurrency(parcel.tnbInfo.totalAmount)} DHS
            </div>
            <div className={`text-xs ${
              parcel.taxStatus === 'PAID' 
                ? 'text-green-600 dark:text-green-500' 
                : parcel.taxStatus === 'OVERDUE' 
                ? 'text-red-600 dark:text-red-500' 
                : 'text-orange-600 dark:text-orange-500'
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
    </div>
  );
};