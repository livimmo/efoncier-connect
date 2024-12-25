import { useState, useMemo } from 'react';
import { MapView } from './MapView';
import { MobileFiltersSheet } from './MobileFiltersSheet';
import { PartnersCarousel } from './PartnersCarousel';
import { WelcomeDialog } from './WelcomeDialog';
import { MapFilters as MapFiltersType } from './types';
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
  mapInstance: google.maps.Map | null;
  setMapInstance: (map: google.maps.Map) => void;
}

export const MapContainer = ({ userRole, onParcelSelect, mapInstance, setMapInstance }: MapContainerProps) => {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
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
    lastPaymentDate: null,
    fiscalStatus: '',
    maxPrice: 0,
    tnbReference: '',
    searchQuery: '',
    zoning: '',
    paymentStatus: '',
    tnbStatus: '',
    propertyStatus: '' // Added this field with empty string as default
  });

  const filteredParcels = useMemo(() => {
    let filtered = mockParcels;

    switch (userRole) {
      case 'owner':
        filtered = filtered.filter(parcel => parcel.status === 'AVAILABLE');
        break;
      case 'developer':
        filtered = filtered.filter(parcel => 
          ['AVAILABLE', 'IN_TRANSACTION'].includes(parcel.status));
        break;
      case 'commune':
        break;
      default:
        filtered = filtered.filter(parcel => parcel.status === 'AVAILABLE');
    }

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

  const settings = {
    center: { lat: 31.7917, lng: -7.0926 }, // Centre du Maroc
    zoom: 6,
    showLabels: true,
    showBoundaries: true,
    showTerrain: false,
    show3D: false,
    theme: 'light' as const,
    unit: 'metric' as const
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-background">
      <WelcomeDialog />
      
      <div className="flex-1 relative">
        <MapView 
          selectedParcel={selectedParcel}
          markerPosition={markerPosition}
          onParcelSelect={handleParcelSelect}
          filteredParcels={filteredParcels}
          settings={settings}
          mapInstance={mapInstance}
          setMapInstance={setMapInstance}
          userRole={userRole}
        />
      </div>

      {isMobile && (
        <div className="fixed bottom-16 left-0 right-0 bg-background/95 backdrop-blur-sm border-t">
          <PartnersCarousel compact={true} />
        </div>
      )}
    </div>
  );
};