import { useState } from 'react';
import { MapContainer } from './map/MapContainer';
import { Header } from './Header';
import { useAuth } from './auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Map as MapIcon, List } from 'lucide-react';
import { DeveloperPropertiesTable } from './developer/properties/DeveloperPropertiesTable';
import { cn } from '@/lib/utils';
import { mockParcels } from '@/utils/mockData/parcels';
import { Property } from '@/types';

const Map = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // Convert mockParcels to Property type for the table view
  const properties: Property[] = mockParcels.map(parcel => ({
    id: parcel.id,
    title: parcel.titleDeedNumber,
    description: parcel.address,
    property_type: parcel.type.toLowerCase(),
    surface_area: parcel.surface,
    location: parcel.location,
    fiscal_status: parcel.taxStatus === "PAID" ? "compliant" : "non_compliant",
    status: parcel.status.toLowerCase(),
    is_for_sale: false,
    price: parcel.tnbInfo.pricePerMeter * parcel.surface,
    owner_id: parcel.owner,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));

  const handleParcelSelect = (parcelId: string) => {
    if (!profile) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour accéder à plus de détails.",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-4 flex-1">
        <div className="flex justify-end gap-2 mb-4">
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('map')}
            className="gap-2"
          >
            <MapIcon className="h-4 w-4" />
            Vue Carte
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="gap-2"
          >
            <List className="h-4 w-4" />
            Vue Liste
          </Button>
        </div>

        <div className={cn(
          "transition-all duration-300",
          viewMode === 'list' ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        )}>
          <DeveloperPropertiesTable 
            data={properties}
            isLoading={false}
          />
        </div>

        <div className={cn(
          "transition-all duration-300",
          viewMode === 'map' ? "opacity-100 flex-1" : "opacity-0 h-0 overflow-hidden"
        )}>
          <MapContainer 
            userRole={profile?.role || 'developer'} 
            onParcelSelect={handleParcelSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default Map;