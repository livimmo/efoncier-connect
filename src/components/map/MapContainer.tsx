import { useState, useMemo } from 'react';
import { MapFilters } from './MapFilters';
import { MapView } from './MapView';
import { MobileFiltersSheet } from './MobileFiltersSheet';
import { PartnersCarousel } from './PartnersCarousel';
import { WelcomeDialog } from './WelcomeDialog';
import { MapFilters as MapFiltersType, MapSettings } from './types';
import { mockParcels } from '@/utils/mockData/parcels';
import type { Parcel } from '@/utils/mockData/types';
import { useMediaQuery } from "@/hooks/use-media-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRole } from '@/types/auth';

interface MapContainerProps {
  userRole?: UserRole;
  onParcelSelect: (parcelId: string) => void;
}

export const MapContainer = ({ userRole, onParcelSelect }: MapContainerProps) => {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();
  
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

  const filteredParcels = useMemo(() => {
    let filtered = mockParcels;

    // Filtrage selon le rôle utilisateur
    switch (userRole) {
      case 'owner':
        filtered = filtered.filter(parcel => parcel.status === 'AVAILABLE');
        break;
      case 'developer':
        filtered = filtered.filter(parcel => 
          ['AVAILABLE', 'IN_TRANSACTION'].includes(parcel.status));
        break;
      case 'commune':
        // La commune voit tous les biens
        break;
      default:
        // Visiteur non connecté : uniquement les biens disponibles
        filtered = filtered.filter(parcel => parcel.status === 'AVAILABLE');
    }

    // Application des filtres standards
    return filtered.filter(parcel => {
      if (filters.commune && parcel.city.toLowerCase() !== filters.commune.toLowerCase()) return false;
      if (filters.propertyType && parcel.type !== filters.propertyType) return false;
      if (filters.zoneType && parcel.zone !== filters.zoneType) return false;
      if (filters.status && parcel.taxStatus !== filters.status) return false;
      if (parcel.surface < filters.size[0] || parcel.surface > filters.size[1]) return false;
      if (filters.ownerName && !parcel.ownerName.toLowerCase().includes(filters.ownerName.toLowerCase())) return false;
      if (filters.titleDeedNumber && !parcel.titleDeedNumber.toLowerCase().includes(filters.titleDeedNumber.toLowerCase())) return false;
      return true;
    });
  }, [filters, userRole]);

  const handleParcelSelect = (parcel: Parcel | null, position?: { x: number; y: number }) => {
    setSelectedParcel(parcel);
    if (position) {
      setMarkerPosition(position);
    }
    if (parcel) {
      onParcelSelect(parcel.id);
    }
  };

  const toggleFilters = () => {
    setIsFiltersCollapsed(!isFiltersCollapsed);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-background">
      <WelcomeDialog />
      
      <div className="flex-1 flex relative">
        {isMobile ? (
          <MobileFiltersSheet 
            filters={filters}
            setFilters={setFilters}
            filteredParcelsCount={filteredParcels.length}
            userRole={userRole}
          />
        ) : (
          <>
            <div 
              className={cn(
                "bg-background/95 backdrop-blur-sm border-r h-full transition-all duration-300 ease-in-out",
                isFiltersCollapsed ? "w-0 -translate-x-full" : "w-80"
              )}
            >
              <MapFilters 
                filters={filters}
                setFilters={setFilters}
                onApplyFilters={() => {
                  toast({
                    title: "Filtres appliqués",
                    description: `${filteredParcels.length} parcelles trouvées`,
                  });
                }}
                userRole={userRole}
              />
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleFilters}
              className={cn(
                "fixed left-0 top-1/2 -translate-y-1/2 z-10 shadow-lg transition-all duration-300 ease-in-out",
                isFiltersCollapsed ? "translate-x-0" : "translate-x-80",
                "h-12 w-6 rounded-r-full rounded-l-none border-l-0"
              )}
            >
              {isFiltersCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </>
        )}

        <div className="flex-1 relative">
          <MapView 
            selectedParcel={selectedParcel}
            markerPosition={markerPosition}
            onParcelSelect={handleParcelSelect}
            filteredParcels={filteredParcels}
            settings={{ theme: 'light', unit: 'metric' }}
            mapInstance={mapInstance}
            setMapInstance={setMapInstance}
            userRole={userRole}
          />
        </div>
      </div>

      {isMobile && (
        <div className="fixed bottom-16 left-0 right-0 bg-background/95 backdrop-blur-sm border-t">
          <PartnersCarousel compact={true} />
        </div>
      )}
    </div>
  );
};