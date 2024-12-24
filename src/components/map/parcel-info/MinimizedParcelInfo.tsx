import { Parcel } from "@/utils/mockData/types";
import { formatCurrency } from "@/utils/format";

interface MinimizedParcelInfoProps {
  parcel: Parcel;
}

export const MinimizedParcelInfo = ({ parcel }: MinimizedParcelInfoProps) => {
  return (
    <div className="bg-background/95 backdrop-blur-sm p-4 rounded-b-lg border border-t-0 border-border/50 min-w-[300px]">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate mb-0.5">{parcel.title}</div>
            <div className="text-xs text-muted-foreground">
              N° {parcel.titleDeedNumber}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-semibold whitespace-nowrap">
              {formatCurrency(parcel.tnbInfo.totalAmount)} DHS
            </div>
            <div className={`text-xs font-medium whitespace-nowrap ${
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