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
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@/utils/mockData/types";

const PropertiesPage = () => {
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();

  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', user.data.user.id);

      if (error) {
        toast({
          title: "Error fetching properties",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      return data as Property[];
    },
  });

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
        <PropertiesStats data={properties || []} />
        
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="space-y-4">
            <PropertiesTable 
              data={properties || []}
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