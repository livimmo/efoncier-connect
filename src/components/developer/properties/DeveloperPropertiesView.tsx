import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Map, List } from "lucide-react";
import { DeveloperPropertiesTable } from "./DeveloperPropertiesTable";
import { DeveloperPropertiesMap } from "./DeveloperPropertiesMap";
import { DeveloperPropertiesFilters } from "./DeveloperPropertiesFilters";
import { mockParcels } from "@/utils/mockData/parcels";
import { REGIONS } from "@/utils/mockData/locations";
import type { Parcel } from "@/utils/mockData/types";

interface DeveloperPropertiesViewProps {
  viewMode: "map" | "table";
  onViewModeChange: (mode: "map" | "table") => void;
  data?: Parcel[];
}

export const DeveloperPropertiesView = ({
  viewMode,
  onViewModeChange,
  data = mockParcels,
}: DeveloperPropertiesViewProps) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const handleRegionChange = (regionId: string) => {
    const selectedRegion = REGIONS.find(r => r.id === regionId);
    if (selectedRegion && mapInstance) {
      mapInstance.panTo({ lat: selectedRegion.center.lat, lng: selectedRegion.center.lng });
      mapInstance.setZoom(10);
    }
  };

  return (
    <div className="grid lg:grid-cols-[300px,1fr] gap-6">
      <DeveloperPropertiesFilters onRegionChange={handleRegionChange} />
      
      <div className="space-y-4">
        <div className="flex justify-end gap-2">
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("table")}
          >
            <List className="w-4 h-4 mr-2" />
            Tableau
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("map")}
          >
            <Map className="w-4 h-4 mr-2" />
            Carte
          </Button>
        </div>

        {viewMode === "table" ? (
          <DeveloperPropertiesTable data={data} />
        ) : (
          <Card className="h-[600px]">
            <DeveloperPropertiesMap 
              parcels={data} 
              onMapLoad={setMapInstance}
            />
          </Card>
        )}
      </div>
    </div>
  );
};