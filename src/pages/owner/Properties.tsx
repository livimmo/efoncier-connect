import { useState } from "react";
import { MapLayout } from "@/components/map/MapLayout";
import { MapView } from "@/components/map/MapView";
import { mockParcels } from "@/utils/mockData/parcels";
import { useAuth } from "@/components/auth/AuthProvider";
import { MapSettings } from "@/components/map/types";
import { DeveloperPropertiesTable } from "@/components/developer/properties/DeveloperPropertiesTable";
import { Button } from "@/components/ui/button";
import { Map as MapIcon, List } from "lucide-react";
import { Parcel } from "@/utils/mockData/types";

const Properties = () => {
  const { profile } = useAuth();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);

  const mapSettings: MapSettings = {
    center: { lat: 31.7917, lng: -7.0926 },
    zoom: 5,
    theme: "light",
    unit: "metric",
    showLabels: true,
    showBoundaries: true,
    showTerrain: false,
    show3D: false
  };

  const handleParcelSelect = (parcel: Parcel, position?: { x: number; y: number }) => {
    setSelectedParcelId(parcel.id);
    if (position) {
      setMarkerPosition(position);
    }
  };

  const filteredParcels = mockParcels.filter(parcel => {
    if (profile?.role === 'owner') {
      return parcel.owner === profile.id;
    }
    return true;
  });

  const selectedParcel = selectedParcelId ? mockParcels.find(p => p.id === selectedParcelId) : null;

  return (
    <div className="min-h-screen">
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
      <MapLayout>
        <div className="h-[600px]">
          {viewMode === 'map' ? (
            <MapView
              selectedParcel={selectedParcel}
              markerPosition={markerPosition}
              onParcelSelect={handleParcelSelect}
              filteredParcels={filteredParcels}
              settings={mapSettings}
              mapInstance={mapInstance}
              setMapInstance={setMapInstance}
              userRole={profile?.role}
            />
          ) : (
            <DeveloperPropertiesTable data={filteredParcels} />
          )}
        </div>
      </MapLayout>
    </div>
  );
};

export default Properties;