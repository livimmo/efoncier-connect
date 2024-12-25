import { Parcel } from "@/utils/mockData/types";
import { formatCurrency } from "@/utils/format";
import { BlurredField } from "../BlurredField";
import { ParcelStatusInfo } from "../ParcelStatusInfo";
import { useAuth } from "@/components/auth/AuthProvider";

interface PropertyHeaderProps {
  parcel: Parcel;
  handleLoginClick: () => void;
}

export const PropertyHeader = ({ parcel, handleLoginClick }: PropertyHeaderProps) => {
  const { profile } = useAuth();

  return (
    <div className="flex-1 min-w-0">
      <div className="flex flex-col">
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <span>{parcel.surface} m² •</span>
          <span>Zone {parcel.zone}</span>
        </div>
        <div className="text-sm font-medium text-green-600 mt-1">
          {profile ? (
            `${formatCurrency(parcel.price)} DHS`
          ) : (
            <span 
              className="blur-sm select-none cursor-pointer"
              onClick={handleLoginClick}
            >
              {formatCurrency(parcel.price)} DHS
            </span>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          TF: <BlurredField value={parcel.titleDeedNumber} />
        </div>
        <div className="mt-1">
          <ParcelStatusInfo 
            status={parcel.status}
            fiscalStatus={parcel.fiscalStatus}
            taxStatus={parcel.taxStatus}
          />
        </div>
      </div>
    </div>
  );
};