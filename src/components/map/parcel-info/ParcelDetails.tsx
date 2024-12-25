import { Property } from "@/types";
import { formatCurrency } from "@/utils/format";

interface ParcelDetailsProps {
  parcel: Property;
  compact?: boolean;
}

export const ParcelDetails = ({ parcel, compact = false }: ParcelDetailsProps) => {
  const getTaxStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'text-green-600';
      case 'UNPAID':
      case 'OVERDUE':
        return 'text-red-600';
      default:
        return 'text-orange-600';
    }
  };

  if (compact) {
    return (
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Surface</span>
          <span className="font-medium">{parcel.surface_area} m²</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Zone</span>
          <span className="font-medium">{parcel.property_type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Prix moyen</span>
          <span className="font-medium">{formatCurrency(parcel.price)} DH/m²</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Statut fiscal</span>
          <span className={`font-medium ${getTaxStatusColor(parcel.taxStatus)}`}>
            {parcel.taxStatus === 'PAID' 
              ? 'Payé' 
              : parcel.taxStatus === 'UNPAID' || parcel.taxStatus === 'OVERDUE'
              ? 'Non payé'
              : 'En attente'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-muted-foreground">N° Titre Foncier</span>
        <span className="font-medium">{parcel.titleDeedNumber}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Propriétaire</span>
        <span className="font-medium">{parcel.ownerName}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Surface</span>
        <span className="font-medium">{parcel.surface} m²</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Type</span>
        <span className="font-medium">{parcel.type}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Zone</span>
        <span className="font-medium">{parcel.zone}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Statut</span>
        <span className={`text-sm font-medium ${getTaxStatusColor(parcel.taxStatus)}`}>
          {parcel.taxStatus === 'PAID' 
            ? 'Payé' 
            : parcel.taxStatus === 'UNPAID' || parcel.taxStatus === 'OVERDUE'
            ? 'Non payé' 
            : 'En attente'}
        </span>
      </div>

      <div className="pt-2 border-t">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Prix TNB</span>
          <span className={`text-sm font-medium ${getTaxStatusColor(parcel.tnbInfo.status)}`}>
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