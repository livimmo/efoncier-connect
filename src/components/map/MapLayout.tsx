import { ReactNode, useState } from "react";
import { MapFilters } from "./MapFilters";
import { cn } from "@/lib/utils";
import { MapFilters as MapFiltersType } from "./types";

interface MapLayoutProps {
  children: ReactNode;
  className?: string;
  showFilters?: boolean;
}

export const MapLayout = ({
  children,
  className,
  showFilters = true,
}: MapLayoutProps) => {
  const [filters, setFilters] = useState<MapFiltersType>({
    region: '',
    commune: '',
    propertyType: '',
    zoneType: '',
    size: [0, 15000],
    status: '',
    ownerName: '',
    titleDeedNumber: '',
    lastPaymentDate: null
  });

  return (
    <div className={cn("flex h-full", className)}>
      {showFilters && (
        <div className="w-80 border-r">
          <MapFilters 
            filters={filters}
            setFilters={setFilters}
            onApplyFilters={() => {
              console.log("Filters applied:", filters);
            }}
          />
        </div>
      )}
      <div className="flex-1 relative">
        {children}
      </div>
    </div>
  );
};