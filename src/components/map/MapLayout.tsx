import { useState } from 'react';
import { MapFilters } from './MapFilters';
import { MapView } from './MapView';
import { MapMobileControls } from './MapMobileControls';
import { PartnersCarousel } from './PartnersCarousel';
import { useMediaQuery } from "@/hooks/use-media-query";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, MapPin } from "lucide-react";
import type { Parcel } from '@/utils/mockData/types';
import type { MapFilters as MapFiltersType, MapSettings } from './types';
import { useToast } from "@/hooks/use-toast";

export const MapLayout = () => {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();
  
  const [filters, setFilters] = useState<MapFiltersType>({
    city: '',
    propertyType: '',
    zoneType: '',
    size: [0, 15000],
    status: '',
  });

  const [settings, setSettings] = useState<MapSettings>({
    theme: 'light',
    unit: 'metric',
  });

  const handleApplyFilters = () => {
    toast({
      title: "Filtres appliqués",
      description: "Les résultats ont été mis à jour selon vos critères",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex flex-col lg:flex-row relative">
        {isMobile ? (
          <div className="absolute top-4 left-4 z-10">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm" className="shadow-lg">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] sm:w-[385px] p-4">
                <MapFilters 
                  filters={filters}
                  setFilters={setFilters}
                  onApplyFilters={handleApplyFilters}
                />
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="w-full lg:w-1/4 p-4 bg-background/95 backdrop-blur-sm border-r">
            <MapFilters 
              filters={filters}
              setFilters={setFilters}
              onApplyFilters={handleApplyFilters}
            />
          </div>
        )}

        <div className="flex-1 relative">
          <MapView
            filters={filters}
            settings={settings}
            onParcelSelect={(parcel, position) => {
              setSelectedParcel(parcel);
              setMarkerPosition(position);
            }}
            selectedParcel={selectedParcel}
            markerPosition={markerPosition}
          />
        </div>
      </div>

      <div className="bg-background/95 backdrop-blur-sm border-t">
        <PartnersCarousel />
      </div>
    </div>
  );
};