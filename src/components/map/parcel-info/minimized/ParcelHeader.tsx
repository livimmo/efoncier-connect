import { FavoriteButton } from "../FavoriteButton";
import { UserRole } from "@/types/auth";
import { Parcel } from "@/utils/mockData/types";
import { formatCurrency } from "@/utils/format";

interface ParcelHeaderProps {
  parcel: Parcel;
  userRole?: UserRole;
  onLoginClick?: () => void;
}

export const ParcelHeader = ({ parcel, userRole, onLoginClick }: ParcelHeaderProps) => {
  const showFavoriteButton = userRole === "developer" || userRole === "owner";

  return (
    <div className="flex justify-between items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex flex-col">
          <div className="text-xs text-muted-foreground flex flex-col">
            <span>{parcel.surface} m²</span>
            <span>Zone {parcel.zone}</span>
          </div>
          <div className="text-sm font-medium text-green-600 mt-1">
            {formatCurrency(parcel.price)} DHS
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            TF: {parcel.titleDeedNumber}
          </div>
        </div>
      </div>
      {showFavoriteButton && (
        <FavoriteButton parcelId={parcel.id} />
      )}
    </div>
  );
};