import { useState, useEffect } from "react";
import { MapView } from "./MapView";
import { MapFilters } from "./MapFilters";
import { MobileFiltersSheet } from "./MobileFiltersSheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { mockParcels } from "@/utils/mockData/parcels";
import { MapSettings, MapFilters as MapFiltersType, UserRole } from "./types";
import { useMediaQuery } from "@/hooks/use-media-query";

interface MapContainerProps {
  userRole: UserRole;
}

export const MapContainer = ({ userRole }: MapContainerProps) => {
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [settings] = useState<MapSettings>({
    theme: 'light',
    unit: 'metric',
  });

  const [filters, setFilters] = useState<MapFiltersType>({
    search: "",
    priceRange: [0, 10000],
    surfaceRange: [0, 10000],
    status: [],
    type: [],
    date: undefined,
  });

  const filteredParcels = mockParcels.filter(parcel => {
    if (filters.search && !parcel.titleDeedNumber.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status.length > 0 && !filters.status.includes(parcel.status)) {
      return false;
    }
    if (filters.type.length > 0 && !filters.type.includes(parcel.type)) {
      return false;
    }
    const price = parcel.tnbInfo.pricePerMeter;
    if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
      return false;
    }
    if (parcel.surface < filters.surfaceRange[0] || parcel.surface > filters.surfaceRange[1]) {
      return false;
    }
    return true;
  });

  const selectedParcel = selectedParcelId 
    ? mockParcels.find(p => p.id === selectedParcelId) 
    : null;

  const handleParcelSelect = (parcelId: string | null, position?: { x: number; y: number }) => {
    setSelectedParcelId(parcelId);
    if (position) {
      setMarkerPosition(position);
    } else {
      setMarkerPosition(null);
    }
  };

  return (
    <div className="relative h-[calc(100vh-64px)]">
      <MobileFiltersSheet
        filters={filters}
        setFilters={setFilters}
        filteredParcelsCount={filteredParcels.length}
        userRole={userRole}
        open={showMobileFilters}
        onOpenChange={setShowMobileFilters}
      />

      {isMobile ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMobileFilters(true)}
          className="absolute top-4 right-4 z-10"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
      ) : (
        <div className="absolute top-4 left-4 z-10 w-[300px]">
          <MapFilters
            filters={filters}
            setFilters={setFilters}
            onApplyFilters={() => {}}
            userRole={userRole}
          />
        </div>
      )}

      <MapView 
        selectedParcel={selectedParcel}
        markerPosition={markerPosition}
        onParcelSelect={(parcel, position) => {
          if (parcel) {
            handleParcelSelect(parcel.id, position);
          } else {
            handleParcelSelect(null);
          }
        }}
        filteredParcels={filteredParcels}
        settings={settings}
        mapInstance={mapInstance}
        setMapInstance={setMapInstance}
        userRole={userRole}
      />
    </div>
  );
};