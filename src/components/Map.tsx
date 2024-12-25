import { useState } from 'react';
import { MapContainer } from './map/MapContainer';
import { Header } from './Header';
import { useAuth } from './auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { DeveloperPropertiesTable } from './developer/properties/DeveloperPropertiesTable';
import { Button } from './ui/button';
import { Map as MapIcon, List } from 'lucide-react';
import { mockParcels } from '@/utils/mockData/parcels';
import { MapFilters } from './map/MapFilters';
import { REGIONS } from '@/utils/mockData/locations';

const Map = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

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

  const handleRegionChange = (regionId: string) => {
    const region = REGIONS.find(r => r.id === regionId);
    if (region && mapInstance) {
      mapInstance.panTo({ lat: region.center.lat, lng: region.center.lng });
      mapInstance.setZoom(7); // Zoom adapté pour une région
    }
  };

  const handleCityChange = (cityName: string) => {
    // Simulons des coordonnées pour les villes (à remplacer par des vraies données)
    const cityCoordinates = {
      'Casablanca': { lat: 33.5731, lng: -7.5898 },
      'Rabat': { lat: 34.0209, lng: -6.8416 },
      'Marrakech': { lat: 31.6295, lng: -7.9811 },
      // Ajoutez d'autres villes selon vos besoins
    };

    if (mapInstance && cityCoordinates[cityName as keyof typeof cityCoordinates]) {
      mapInstance.panTo(cityCoordinates[cityName as keyof typeof cityCoordinates]);
      mapInstance.setZoom(12); // Zoom adapté pour une ville
    }
  };

  const handleDistrictChange = (districtName: string) => {
    if (mapInstance) {
      // Ici vous pouvez ajouter la logique pour zoomer sur le quartier
      // Pour l'instant, on zoom juste un peu plus
      mapInstance.setZoom(14); // Zoom adapté pour un quartier
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
        
        <div className="flex-1 p-4">
          {viewMode === 'map' ? (
            <div className="grid lg:grid-cols-[300px,1fr] gap-4 h-full">
              <MapFilters 
                onRegionChange={handleRegionChange}
                onCityChange={handleCityChange}
                onDistrictChange={handleDistrictChange}
              />
              <div className="h-[600px] relative">
                <MapContainer 
                  userRole={profile?.role} 
                  onParcelSelect={handleParcelSelect}
                  setMapInstance={setMapInstance}
                />
              </div>
            </div>
          ) : (
            <DeveloperPropertiesTable data={mockParcels} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;