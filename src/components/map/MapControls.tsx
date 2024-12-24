import { Button } from "@/components/ui/button";
import { 
  ZoomIn, 
  ZoomOut, 
  Locate, 
  RotateCcw, 
  Box, 
  History,
  Sun,
  Moon
} from "lucide-react";
import { MapControls as MapControlsType, MapSettings } from "./types";
import { useToast } from "@/hooks/use-toast";

interface MapControlsProps {
  controls: MapControlsType;
  settings: MapSettings;
  onControlChange: (control: keyof MapControlsType) => void;
  onSettingChange: (setting: keyof MapSettings, value: any) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onLocateMe: () => void;
}

export const MapControls = ({
  controls,
  settings,
  onControlChange,
  onSettingChange,
  onZoomIn,
  onZoomOut,
  onReset,
  onLocateMe
}: MapControlsProps) => {
  const { toast } = useToast();

  const handleLocateMe = async () => {
    try {
      await onLocateMe();
      toast({
        title: "Localisation",
        description: "Votre position a été trouvée",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de vous localiser",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="absolute right-4 bottom-4 flex flex-col gap-2">
      <div className="flex flex-col gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-lg">
        <Button
          variant="outline"
          size="icon"
          onClick={onZoomIn}
          className="h-8 w-8"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onZoomOut}
          className="h-8 w-8"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-lg">
        <Button
          variant="outline"
          size="icon"
          onClick={handleLocateMe}
          className="h-8 w-8"
        >
          <Locate className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          className="h-8 w-8"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onControlChange('show3DView')}
          className={`h-8 w-8 ${controls.show3DView ? 'bg-accent' : ''}`}
        >
          <Box className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onControlChange('showHistory')}
          className={`h-8 w-8 ${controls.showHistory ? 'bg-accent' : ''}`}
        >
          <History className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onSettingChange('theme', settings.theme === 'light' ? 'dark' : 'light')}
          className="h-8 w-8"
        >
          {settings.theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};