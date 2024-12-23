import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Layers, 
  Ruler, 
  Navigation, 
  Download, 
  Cube, 
  History,
  Filter,
  Map as MapIcon
} from "lucide-react";

interface MapToolbarProps {
  onToggleFilters: () => void;
  onToggleLegend: () => void;
  onToggleView: () => void;
  isSatelliteView: boolean;
}

export const MapToolbar = ({
  onToggleFilters,
  onToggleLegend,
  onToggleView,
  isSatelliteView
}: MapToolbarProps) => {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 bg-white p-2 rounded-lg shadow-lg">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onToggleFilters}>
              <Filter className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Filtres</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onToggleLegend}>
              <Layers className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Légende</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onToggleView}>
              <MapIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isSatelliteView ? 'Vue Carte' : 'Vue Satellite'}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ruler className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mesurer</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Navigation className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Itinéraire</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Cube className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Vue 3D</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Exporter</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <History className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Historique</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};