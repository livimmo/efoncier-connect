import { Button } from "@/components/ui/button";
import {
  Navigation,
  Download,
  Box,
  History,
  Filter,
  Layers,
  Ruler,
  Map as MapIcon
} from "lucide-react";

interface MapToolbarProps {
  onToggleMapType: () => void;
  isMapSatellite: boolean;
}

export const MapToolbar = ({ onToggleMapType, isMapSatellite }: MapToolbarProps) => {
  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 flex flex-col gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleMapType}
        title={isMapSatellite ? "Vue carte" : "Vue satellite"}
      >
        <MapIcon className="h-4 w-4" />
      </Button>
      
      <Button variant="ghost" size="icon" title="Mesurer une distance">
        <Ruler className="h-4 w-4" />
      </Button>
      
      <Button variant="ghost" size="icon" title="Vue 3D">
        <Box className="h-4 w-4" />
      </Button>
      
      <Button variant="ghost" size="icon" title="Itinéraire">
        <Navigation className="h-4 w-4" />
      </Button>
      
      <Button variant="ghost" size="icon" title="Calques">
        <Layers className="h-4 w-4" />
      </Button>
      
      <Button variant="ghost" size="icon" title="Télécharger">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};