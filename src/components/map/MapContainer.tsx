import { useState } from 'react';
import { GoogleMap } from './GoogleMap';
import { MapFilters } from './MapFilters';
import { MapControls } from './MapControls';
import { ParcelInfo } from './ParcelInfo';
import { WelcomeDialog } from './WelcomeDialog';
import { PartnersCarousel } from './PartnersCarousel';
import { MapFilters as MapFiltersType, MapControls as MapControlsType, MapSettings } from './types';
import { mockParcels } from '@/utils/mockData/parcels';
import type { Parcel } from '@/utils/mockData/types';
import { useToast } from "@/hooks/use-toast";

export const MapContainer = () => {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const { toast } = useToast();
  
  const [filters, setFilters] = useState<MapFiltersType>({
    city: '',
    propertyType: '',
    zoneType: '',
    size: [0, 15000],
    status: '',
  });

  const [controls, setControls] = useState<MapControlsType>({
    showFilters: false,
    show3DView: false,
    showComparison: false,
    showHistory: false,
  });

  const [settings, setSettings] = useState<MapSettings>({
    theme: 'light',
    unit: 'metric',
  });

  const handleControlChange = (control: keyof MapControlsType) => {
    setControls(prev => ({
      ...prev,
      [control]: !prev[control]
    }));
  };

  const handleSettingChange = (setting: keyof MapSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const filterParcels = () => {
    const filteredParcels = mockParcels.filter(parcel => {
      if (filters.city && parcel.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      if (filters.propertyType && parcel.type !== filters.propertyType) return false;
      if (filters.zoneType && parcel.zone !== filters.zoneType) return false;
      if (filters.status && parcel.taxStatus !== filters.status) return false;
      if (parcel.surface < filters.size[0] || parcel.surface > filters.size[1]) return false;
      return true;
    });
    
    toast({
      title: "Filtres appliqués",
      description: `${filteredParcels.length} parcelles trouvées`,
    });

    return filteredParcels;
  };

  const handleParcelSelect = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    toast({
      title: "Parcelle sélectionnée",
      description: `${parcel.title} - ${parcel.surface}m²`,
    });
  };

  const filteredParcels = filterParcels();

  return (
    <div className="h-screen flex flex-col">
      <WelcomeDialog />
      
      <div className="flex-1 relative">
        <MapFilters 
          filters={filters}
          setFilters={setFilters}
          onApplyFilters={filterParcels}
        />

        <div className="flex-1 relative">
          <GoogleMap 
            onMarkerClick={handleParcelSelect}
            parcels={filteredParcels}
            theme={settings.theme}
          />

          <MapControls
            controls={controls}
            settings={settings}
            onControlChange={handleControlChange}
            onSettingChange={handleSettingChange}
          />

          {selectedParcel && (
            <ParcelInfo 
              parcel={selectedParcel}
              onClose={() => setSelectedParcel(null)}
            />
          )}
        </div>
      </div>

      <PartnersCarousel />
    </div>
  );
};