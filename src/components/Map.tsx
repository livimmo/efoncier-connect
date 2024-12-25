import { useState } from 'react';
import { MapContainer } from './map/MapContainer';
import { Header } from './Header';
import { useAuth } from './auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { DeveloperPropertiesTable } from './developer/properties/DeveloperPropertiesTable';
import { Button } from './ui/button';
import { Map as MapIcon, List } from 'lucide-react';
import { mockParcels } from '@/utils/mockData/parcels';

const Map = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

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
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex justify-end gap-2">
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            onClick={() => setViewMode('map')}
          >
            <MapIcon className="h-4 w-4 mr-2" />
            Carte
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4 mr-2" />
            Liste
          </Button>
        </div>
        
        <div className="flex-1">
          {viewMode === 'map' ? (
            <MapContainer 
              userRole={profile?.role} 
              onParcelSelect={handleParcelSelect}
            />
          ) : (
            <div className="p-4">
              <DeveloperPropertiesTable data={mockParcels} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;