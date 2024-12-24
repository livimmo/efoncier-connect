import { Button } from "@/components/ui/button";
import { Sun, Moon, Ruler, Filter, ZoomIn, ZoomOut, Locate } from "lucide-react";
import type { MapMobileControlsProps } from './types';

export const MapMobileControls = ({
  settings,
  onSettingChange,
  onFilterClick,
  onZoomIn,
  onZoomOut,
  onLocateMe,
}: MapMobileControlsProps) => {
  return (
    <div className="fixed bottom-20 right-4 z-10 flex flex-col gap-2 md:hidden">
      {onFilterClick && (
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-lg"
          onClick={onFilterClick}
        >
          <Filter className="h-4 w-4" />
        </Button>
      )}

      {onZoomIn && (
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-lg"
          onClick={onZoomIn}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      )}

      {onZoomOut && (
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-lg"
          onClick={onZoomOut}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      )}

      {onLocateMe && (
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-lg"
          onClick={onLocateMe}
        >
          <Locate className="h-4 w-4" />
        </Button>
      )}

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