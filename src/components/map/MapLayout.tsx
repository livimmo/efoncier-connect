import { ReactNode, useState } from "react";
import { MapFilters } from "./MapFilters";
import { cn } from "@/lib/utils";
import { MapFilters as MapFiltersType } from "./types";
import { useAuth } from "@/components/auth/AuthProvider";

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
  const { profile } = useAuth();
  const [filters, setFilters] = useState<MapFilters>({
    region: '',
    commune: '',
    propertyType: '',
    zoneType: '',
    size: [0, 15000],
    status: '',
    ownerName: '',
    titleDeedNumber: '',
    lastPaymentDate: null,
    fiscalStatus: '',
    maxPrice: 0,
    tnbReference: '',
    searchQuery: '',
    zoning: '',
    paymentStatus: '',
    tnbStatus: ''
  });

  return (
    <div className={cn("flex h-full", className)}>
      {showFilters && profile?.role && (
        <div className="w-80 border-r">
          <MapFilters 
            filters={filters}
            setFilters={setFilters}
            onApplyFilters={() => {
              console.log("Filters applied:", filters);
            }}
            userRole={profile.role}
          />
        </div>
      )}
      <div className="flex-1 relative">
        {children}
      </div>
    </div>
  );
};