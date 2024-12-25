import { Button } from "@/components/ui/button";
import { MapIcon, List } from "lucide-react";

interface DeveloperPropertiesHeaderProps {
  currentView: 'list' | 'map';
  onViewChange: (view: 'list' | 'map') => void;
}

export const DeveloperPropertiesHeader = ({
  currentView,
  onViewChange,
}: DeveloperPropertiesHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Mes Biens</h2>
      <div className="flex gap-2">
        <Button
          variant={currentView === 'map' ? 'default' : 'outline'}
          onClick={() => onViewChange('map')}
        >
          <MapIcon className="h-4 w-4 mr-2" />
          Carte
        </Button>
        <Button
          variant={currentView === 'list' ? 'default' : 'outline'}
          onClick={() => onViewChange('list')}
        >
          <List className="h-4 w-4 mr-2" />
          Liste
        </Button>
      </div>
    </div>
  );
};