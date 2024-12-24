import { useState } from "react";
import { MapContainer } from "./MapContainer";
import { MapControls } from "./MapControls";
import { MapFilters } from "./MapFilters";
import { MapControls as MapControlsType, MapFilters as MapFiltersType } from "./types";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MapMobileControls } from "./MapMobileControls";
import { MobileFiltersSheet } from "./MobileFiltersSheet";

export const MapLayout = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<MapFiltersType>({
    region: '',
    commune: '',
    propertyType: '',
    zoneType: '',
    size: [0, 15000],
    status: '',
    ownerName: '',
    titleDeedNumber: '',
    lastPaymentDate: null,
    propertyStatus: '' // Added missing propertyStatus
  });

  const [controls, setControls] = useState<MapControlsType>({
    showFilters: false,
    show3DView: false,
    showComparison: false,
    showHistory: false,
  });

  const handleControlChange = (control: keyof MapControlsType) => {
    setControls(prev => ({ ...prev, [control]: !prev[control] }));
  };

  const handleSettingChange = (setting: 'theme' | 'unit', value: any) => {
    // Handle setting change logic here
  };

  const handleZoomIn = () => {
    // Handle zoom in logic here
  };

  const handleZoomOut = () => {
    // Handle zoom out logic here
  };

  const handleReset = () => {
    // Handle reset logic here
  };

  const handleLocateMe = () => {
    // Handle locate me logic here
  };

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      {!isMobile ? (
        <div className="absolute top-4 left-4 z-10">
          <MapFilters
            filters={filters}
            setFilters={setFilters}
            onApplyFilters={() => {}}
          />
        </div>
      ) : (
        <MobileFiltersSheet
          filters={filters}
          setFilters={setFilters}
          filteredParcelsCount={0}
        />
      )}

      {!isMobile ? (
        <div className="absolute top-4 right-4 z-10">
          <MapControls
            controls={controls}
            settings={{ theme: 'light', unit: 'metric' }}
            onControlChange={handleControlChange}
            onSettingChange={handleSettingChange}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleReset}
            onLocateMe={handleLocateMe}
          />
        </div>
      ) : (
        <MapMobileControls
          settings={{ theme: 'light', unit: 'metric' }}
          onSettingChange={handleSettingChange}
          onFilterClick={() => setShowFilters(true)}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onLocateMe={handleLocateMe}
        />
      )}

      <MapContainer />
    </div>
  );
};
