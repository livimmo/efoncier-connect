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
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);
  const [filters, setFilters] = useState<MapFiltersType>({
    region: '',
    commune: '',
    city: '',
    propertyType: '',
    zoneType: '',
    size: [0, 15000],
    status: '',
    ownerName: '',
    titleDeedNumber: '',
    lastPaymentDate: null,
    fiscalStatus: '',
    maxPrice: 0,
    minPrice: 0,
    tnbReference: '',
    searchQuery: '',
    zoning: '',
    paymentStatus: '',
    tnbStatus: '',
    propertyStatus: ''
  });

  const handleRegionChange = (regionId: string) => {
    console.log("Region changed:", regionId);
  };

  const handleCityChange = (cityName: string) => {
    console.log("City changed:", cityName);
  };

  const handleDistrictChange = (districtName: string) => {
    console.log("District changed:", districtName);
  };

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
            onRegionChange={handleRegionChange}
            onCityChange={handleCityChange}
            onDistrictChange={handleDistrictChange}
            mapInstance={null}
            isCollapsed={isFiltersCollapsed}
            onToggleCollapse={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
          />
        </div>
      )}
      <div className="flex-1 relative">
        {children}
      </div>
    </div>
  );
};