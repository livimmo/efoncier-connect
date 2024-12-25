import { useState } from "react";
import { MapView } from "@/components/map/MapView";
import { MapSettings } from "@/components/map/types";
import { Parcel } from "@/utils/mockData/types";
import { mockParcels } from "@/utils/mockData/parcels";

const Properties = () => {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 33.5731, lng: -7.5898, zoom: 6 });

  const [settings] = useState<MapSettings>({
    theme: 'light',
    unit: 'metric',
  });

  const handleParcelSelect = (parcel: Parcel | null, position?: { x: number; y: number }) => {
    setSelectedParcel(parcel);
    if (position) {
      setMarkerPosition(position);
    }
  };

  return (
    <div className="h-full">
      <MapView
        selectedParcel={selectedParcel}
        markerPosition={markerPosition}
        onParcelSelect={handleParcelSelect}
        filteredParcels={mockParcels}
        settings={settings}
        mapInstance={mapInstance}
        setMapInstance={setMapInstance}
        mapCenter={mapCenter}
      />
    </div>
  );
};

export default Properties;