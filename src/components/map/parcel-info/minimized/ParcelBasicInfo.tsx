import { Parcel } from "@/utils/mockData/types";
import { formatCurrency } from "@/utils/format";
import { BlurredField } from "./BlurredField";

interface ParcelBasicInfoProps {
  parcel: Parcel;
  onBlurredClick: () => void;
}

export const ParcelBasicInfo = ({ parcel, onBlurredClick }: ParcelBasicInfoProps) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex flex-col">
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <span>{parcel.surface} m² •</span>
          <span>Zone {parcel.zone}</span>
        </div>
        <BlurredField
          value={`${formatCurrency(parcel.tnbInfo.pricePerMeter)} DHS/m²`}
          onBlurredClick={onBlurredClick}
          className="text-xs font-medium text-red-600 dark:text-red-500"
        />
        <div className="text-xs text-muted-foreground mt-1">
          <BlurredField
            value={`TF: ${parcel.titleDeedNumber}`}
            onBlurredClick={onBlurredClick}
          />
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