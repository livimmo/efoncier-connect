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
import { Property } from "@/types";

const PropertiesPage = () => {
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [settings] = useState<MapSettings>({
    theme: 'light',
    unit: 'metric',
    showLabels: true,
    showBoundaries: true,
    showTerrain: false,
    show3D: false
  });

  // Transform mockParcels to match Property type
  const properties: Property[] = mockParcels.map(parcel => ({
    id: parcel.id,
    title: parcel.title,
    description: parcel.description || '',
    property_type: parcel.type,
    surface_area: parcel.surface,
    location: parcel.location,
    fiscal_status: parcel.fiscal_status || "under_review",
    status: parcel.status || "PENDING",
    is_for_sale: false,
    price: parcel.price || 0,
    owner_id: parcel.owner_id || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    titleDeedNumber: parcel.titleDeedNumber || '',
    ownerName: parcel.ownerName || '',
    address: parcel.address || '',
    city: parcel.city || '',
    zone: parcel.zone,
    type: parcel.type,
    surface: parcel.surface,
    taxStatus: parcel.taxStatus,
    tnbInfo: parcel.tnbInfo
  }));

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
        <PropertiesStats data={properties} />
        
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="space-y-4">
            <PropertiesTable 
              data={properties}
              isLoading={isLoading}
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