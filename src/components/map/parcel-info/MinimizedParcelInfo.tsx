import { Parcel } from "@/utils/mockData/types";

interface MinimizedParcelInfoProps {
  parcel: Parcel;
}

export const MinimizedParcelInfo = ({ parcel }: MinimizedParcelInfoProps) => {
  return (
    <div className="bg-background/95 backdrop-blur-sm p-2 rounded-b-lg border-t border-primary/10 shadow-lg">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">Status</span>
          <span className={`text-xs font-medium ${
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
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">Localisation</span>
          <span className="text-xs font-medium truncate max-w-[140px]">{parcel.address}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">N° Titre</span>
          <span className="text-xs font-medium">{parcel.titleDeedNumber}</span>
        </div>
      </div>
    </div>
  );
};