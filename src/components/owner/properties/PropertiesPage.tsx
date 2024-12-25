import { useState } from "react";
import { PropertiesHeader } from "./PropertiesHeader";
import { PropertiesStats } from "./PropertiesStats";
import { PropertiesTable } from "./PropertiesTable";
import { MapView } from "@/components/map/MapView";
import { Parcel } from "@/utils/mockData/types";
import { MapSettings } from "@/components/map/types";

export const PropertiesPage = () => {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
  const [filteredParcels, setFilteredParcels] = useState<Parcel[]>([]);
  const [settings, setSettings] = useState<MapSettings>({ theme: "light", unit: "metric" });
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const handleParcelSelect = (parcel: Parcel | null, position?: { x: number; y: number }) => {
    setSelectedParcel(parcel);
    if (position) {
      setMarkerPosition(position);
    } else {
      setMarkerPosition(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        <PropertiesHeader />
        <PropertiesStats />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <MapView
              selectedParcel={selectedParcel}
              markerPosition={markerPosition}
              onParcelSelect={handleParcelSelect}
              filteredParcels={filteredParcels}
              settings={settings}
              mapInstance={mapInstance}
              setMapInstance={setMapInstance}
              mapCenter={{ lat: 33.5731, lng: -7.5898, zoom: 10 }}
            />
          </div>
          <div>
            <PropertiesTable />
          </div>
        </div>
      </div>
    </div>
  );
};
