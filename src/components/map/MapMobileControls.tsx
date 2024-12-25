import { Button } from "@/components/ui/button";
import { Sun, Moon, Ruler, Filter, ZoomIn, ZoomOut, Locate } from "lucide-react";
import type { MapMobileControlsProps } from './types';
import { Badge } from "@/components/ui/badge";

export const MapMobileControls = ({
  settings,
  onSettingChange,
  onFilterClick,
  onZoomIn,
  onZoomOut,
  onLocateMe,
}: MapMobileControlsProps) => {
  return (
    <>
      {/* Filter button positioned on the left middle */}
      {onFilterClick && (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10 md:hidden">
          <Button
            variant="secondary"
            size="lg"
            className="relative rounded-full shadow-lg bg-background/95 backdrop-blur-sm hover:bg-accent"
            onClick={onFilterClick}
          >
            <Filter className="h-5 w-5" />
            <Badge 
              variant="secondary" 
              className="absolute -top-2 -right-2 px-2 py-0.5 bg-primary text-primary-foreground"
            >
              Filtres
            </Badge>
          </Button>
        </div>
      )}

      {/* Other controls on the right */}
      <div className="fixed bottom-20 right-4 z-10 flex flex-col gap-2 md:hidden">
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
    </>
  );
};
