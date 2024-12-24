import { Button } from "@/components/ui/button";
import { Sun, Moon, Ruler } from "lucide-react";
import type { MapSettings } from './types';

interface MapMobileControlsProps {
  settings: MapSettings;
  onSettingChange: (key: keyof MapSettings, value: any) => void;
}

export const MapMobileControls = ({
  settings,
  onSettingChange,
}: MapMobileControlsProps) => {
  return (
    <div className="fixed bottom-20 right-4 z-10 flex flex-col gap-2 md:hidden">
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full shadow-lg"
        onClick={() => onSettingChange('theme', settings.theme === 'light' ? 'dark' : 'light')}
      >
        {settings.theme === 'light' ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
      
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full shadow-lg"
        onClick={() => onSettingChange('unit', settings.unit === 'metric' ? 'imperial' : 'metric')}
      >
        <Ruler className="h-4 w-4" />
      </Button>
    </div>
  );
};