import { useState } from 'react';
import { Header } from "@/components/Header";
import { PropertiesHeader } from '@/components/owner/properties/PropertiesHeader';
import { PropertiesStats } from '@/components/owner/properties/PropertiesStats';
import { PropertiesTable } from '@/components/owner/properties/PropertiesTable';
import { MapView } from '@/components/map/MapView';
import { MapSettings } from '@/components/map/types';
import { mockParcels } from '@/utils/mockData/parcels';
import { useMediaQuery } from "@/hooks/use-media-query";
import { useToast } from "@/hooks/use-toast";
import { Property } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddPropertyDialog } from "@/components/property/AddPropertyDialog";

const PropertiesPage = () => {
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [showAddProperty, setShowAddProperty] = useState(false);
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
    fiscal_status: parcel.fiscalStatus,
    status: parcel.status,
    is_for_sale: false,
    price: parcel.price || 0,
    owner_id: parcel.owner || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    titleDeedNumber: parcel.titleDeedNumber,
    ownerName: parcel.ownerName,
    address: parcel.address,
    city: parcel.city,
    zone: parcel.zone,
    type: parcel.type,
    surface: parcel.surface,
    taxStatus: parcel.taxStatus,
    tnbInfo: parcel.tnbInfo
  }));

  const selectedParcel = selectedParcelId 
    ? properties.find(p => p.id === selectedParcelId) 
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <PropertiesHeader />
          <Button
            onClick={() => setShowAddProperty(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Ajouter un Terrain</span>
          </Button>
        </div>
        
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
                } else {
                  handleParcelSelect(null);
                }
              }}
              filteredParcels={properties}
              settings={settings}
              mapInstance={mapInstance}
              setMapInstance={setMapInstance}
            />
          </div>
        </div>

        <AddPropertyDialog 
          open={showAddProperty}
          onOpenChange={setShowAddProperty}
        />
      </main>
    </div>
  );
};

export default PropertiesPage;