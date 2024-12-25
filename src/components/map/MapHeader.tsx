import { Button } from "@/components/ui/button";
import { Map as MapIcon, List } from "lucide-react";

interface MapHeaderProps {
  viewMode: 'map' | 'list';
  onViewModeChange: (mode: 'map' | 'list') => void;
}

export const MapHeader = ({ viewMode, onViewModeChange }: MapHeaderProps) => {
  return (
    <div className="p-4 flex justify-end gap-2">
      <Button
        variant={viewMode === 'map' ? 'default' : 'outline'}
        onClick={() => onViewModeChange('map')}
      >
        <MapIcon className="h-4 w-4 mr-2" />
        Carte
      </Button>
      <Button
        variant={viewMode === 'list' ? 'default' : 'outline'}
        onClick={() => onViewModeChange('list')}
      >
        <List className="h-4 w-4 mr-2" />
        Liste
      </Button>
    </div>
  );
};