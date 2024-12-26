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
  const [surfaceRange, setSurfaceRange] = useState<[number, number]>([0, 15000]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000]);
  const [filteredData, setFilteredData] = useState(data);

  const handleRegionChange = (regionId: string) => {
    const selectedRegion = REGIONS.find(r => r.id === regionId);
    if (selectedRegion && mapInstance) {
      mapInstance.panTo({ lat: selectedRegion.center.lat, lng: selectedRegion.center.lng });
      mapInstance.setZoom(10);
    }
  };

  const handleSurfaceChange = (range: [number, number]) => {
    setSurfaceRange(range);
    filterData(range, priceRange);
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
    filterData(surfaceRange, range);
  };

  const filterData = (surface: [number, number], price: [number, number]) => {
    const filtered = data.filter(parcel => 
      parcel.surface >= surface[0] && 
      parcel.surface <= surface[1] &&
      parcel.price >= price[0] &&
      parcel.price <= price[1]
    );
    setFilteredData(filtered);
  };

  return (
    <div className="grid lg:grid-cols-[300px,1fr] gap-6">
      <DeveloperPropertiesFilters 
        onRegionChange={handleRegionChange}
        onSurfaceChange={handleSurfaceChange}
        onPriceChange={handlePriceChange}
        surfaceRange={surfaceRange}
        priceRange={priceRange}
      />
      
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
          <DeveloperPropertiesTable data={filteredData} />
        ) : (
          <Card className="h-[600px]">
            <DeveloperPropertiesMap 
              parcels={filteredData} 
              onMapLoad={setMapInstance}
            />
          </Card>
        )}
      </div>
    </div>
  );
};