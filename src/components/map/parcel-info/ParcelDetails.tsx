import { Parcel } from "@/utils/mockData/types";
import { formatCurrency } from "@/utils/format";

interface ParcelDetailsProps {
  parcel: Parcel;
}

export const ParcelDetails = ({ parcel }: ParcelDetailsProps) => {
  const getTNBStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'text-green-600';
      case 'LOW':
        return 'text-green-600';
      case 'AVERAGE':
        return 'text-yellow-600';
      case 'HIGH':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">N° Titre Foncier</span>
        <span className="text-sm font-medium">{parcel.titleDeedNumber}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Propriétaire</span>
        <span className="text-sm font-medium">{parcel.ownerName}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Surface</span>
        <span className="text-sm font-medium">{parcel.surface} m²</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Type</span>
        <span className="text-sm font-medium">{parcel.type}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Zone</span>
        <span className="text-sm font-medium">{parcel.zone}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Statut</span>
        <span className={`text-sm font-medium ${getTNBStatusColor(parcel.tnbInfo.status)}`}>
          {parcel.tnbInfo.status}
        </span>
      </div>

      <div className="pt-2 border-t">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Prix TNB</span>
          <span className={`text-sm font-medium ${getTNBStatusColor(parcel.tnbInfo.status)}`}>
            {formatCurrency(parcel.tnbInfo.pricePerMeter)} DHS/m²
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Total TNB Annuel</span>
          <span className="text-sm font-medium">
            {formatCurrency(parcel.tnbInfo.totalAmount)} DHS
          </span>
        </div>
        <div className="text-xs text-muted-foreground text-right mt-1">
          Dernière mise à jour : {new Date(parcel.tnbInfo.lastUpdate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};