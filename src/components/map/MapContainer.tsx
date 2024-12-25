import { useState, useEffect } from "react";
import { MapView } from "./MapView";
import { MapFilters } from "./MapFilters";
import { MobileFiltersSheet } from "./MobileFiltersSheet";
import { Button } from "@/components/ui/button";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { mockParcels } from "@/utils/mockData/parcels";
import { MapSettings, MapFilters as MapFiltersType } from "./types";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { REGIONS } from "@/utils/mockData/locations";

interface MapContainerProps {
  userRole: string;
  onParcelSelect: (parcelId: string) => void;
}

const REGION_COORDINATES: Record<string, { lat: number; lng: number; zoom: number }> = {
  "casablanca-settat": { lat: 33.5731, lng: -7.5898, zoom: 10 },
  "rabat-sale": { lat: 34.0209, lng: -6.8416, zoom: 10 },
  "tanger-tetouan": { lat: 35.7595, lng: -5.8330, zoom: 10 },
  "marrakech-safi": { lat: 31.6295, lng: -7.9811, zoom: 10 },
  // Add coordinates for other regions...
};

const CITY_COORDINATES: Record<string, { lat: number; lng: number; zoom: number }> = {
  "Casablanca": { lat: 33.5731, lng: -7.5898, zoom: 12 },
  "Rabat": { lat: 34.0209, lng: -6.8416, zoom: 12 },
  "Tanger": { lat: 35.7595, lng: -5.8330, zoom: 12 },
  "Marrakech": { lat: 31.6295, lng: -7.9811, zoom: 12 },
  // Add coordinates for other cities...
};

export const MapContainer = ({ userRole, onParcelSelect }: MapContainerProps) => {
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isFiltersPanelCollapsed, setIsFiltersPanelCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number; zoom: number }>({ 
    lat: 33.5731, 
    lng: -7.5898, 
    zoom: 6 
  });

  const [settings] = useState<MapSettings>({
    theme: 'light',
    unit: 'metric',
  });

  const [filters, setFilters] = useState<MapFiltersType>({
    search: "",
    region: "",
    commune: "",
    propertyType: "",
    zoneType: "",
    size: [0, 15000],
    status: "",
    type: [],
    ownerName: "",
    titleDeedNumber: "",
    lastPaymentDate: null,
    priceRange: [0, 10000],
    surfaceRange: [0, 10000],
    date: undefined,
  });

  useEffect(() => {
    if (filters.region && REGION_COORDINATES[filters.region]) {
      setMapCenter(REGION_COORDINATES[filters.region]);
    }
  }, [filters.region]);

  useEffect(() => {
    if (filters.commune) {
      const cityCoords = CITY_COORDINATES[filters.commune];
      if (cityCoords) {
        setMapCenter(cityCoords);
      }
    }
  }, [filters.commune]);

  const filteredParcels = mockParcels.filter(parcel => {
    if (filters.search && !parcel.titleDeedNumber.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status && parcel.taxStatus !== filters.status) {
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
      {isMobile ? (
        <MobileFiltersSheet
          filters={filters}
          setFilters={setFilters}
          filteredParcelsCount={filteredParcels.length}
          open={showMobileFilters}
          onOpenChange={setShowMobileFilters}
        />
      ) : (
        <div className={cn(
          "absolute top-4 left-4 z-10 transition-all duration-300",
          isFiltersPanelCollapsed ? "w-12" : "w-[300px]"
        )}>
          <div className="relative">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsFiltersPanelCollapsed(!isFiltersPanelCollapsed)}
              className="absolute -right-4 top-2 z-20 rounded-full shadow-lg"
            >
              {isFiltersPanelCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
            <div className={cn(
              "bg-background rounded-lg shadow-lg transition-all duration-300 overflow-hidden",
              isFiltersPanelCollapsed ? "w-0 opacity-0" : "w-[300px] opacity-100"
            )}>
              <MapFilters
                filters={filters}
                setFilters={setFilters}
                onApplyFilters={() => {}}
              />
            </div>
          </div>
        </div>
      )}

      {isMobile && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMobileFilters(true)}
          className="absolute top-4 right-4 z-10"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
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
        mapCenter={mapCenter}
      />
    </div>
  );
};
