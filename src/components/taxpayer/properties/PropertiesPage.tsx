import { useState } from 'react';
import { Header } from "@/components/Header";
import { PropertiesHeader } from './PropertiesHeader';
import { PropertiesStats } from './PropertiesStats';
import { PropertiesTable } from './PropertiesTable';
import { MapView } from '@/components/map/MapView';
import { MapSettings } from '@/components/map/types';
import { mockParcels } from '@/utils/mockData/parcels';
import { useMediaQuery } from "@/hooks/use-media-query";
import { useToast } from "@/hooks/use-toast";

const PropertiesPage = () => {
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();

  const [settings] = useState<MapSettings>({
    theme: 'light',
    unit: 'metric',
  });

  const selectedParcel = selectedParcelId 
    ? mockParcels.find(p => p.id === selectedParcelId) 
    : null;

  const handleParcelSelect = (parcelId: string, position?: { x: number; y: number }) => {
    setSelectedParcelId(parcelId);
    if (position) {
      setMarkerPosition(position);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <PropertiesHeader />
        <PropertiesStats />
        
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="space-y-4">
            <PropertiesTable 
              onParcelSelect={(parcelId) => {
                const parcel = mockParcels.find(p => p.id === parcelId);
                if (parcel) {
                  handleParcelSelect(parcelId);
                  toast({
                    title: "Parcelle sélectionnée",
                    description: `${parcel.title} a été sélectionné`,
                  });
                }
              }}
              selectedParcelId={selectedParcelId}
            />
          </div>

          <div className="h-[600px] relative rounded-lg border">
            <MapView 
              selectedParcel={selectedParcel}
              markerPosition={markerPosition}
              onParcelSelect={(parcel, position) => {
                if (parcel) {
                  handleParcelSelect(parcel.id, position);
                }
              }}
              filteredParcels={mockParcels}
              settings={settings}
              mapInstance={mapInstance}
              setMapInstance={setMapInstance}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertiesPage;