import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Locate } from "lucide-react";
import type { MapMobileControlsProps } from "./types";

export const MapMobileControls = ({
  onZoomIn,
  onZoomOut,
  onLocate
}: MapMobileControlsProps) => {
  return (
    <div className="fixed bottom-20 right-4 flex flex-col gap-2">
      <Button variant="secondary" size="icon" onClick={onZoomIn}>
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button variant="secondary" size="icon" onClick={onZoomOut}>
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button variant="secondary" size="icon" onClick={onLocate}>
        <Locate className="h-4 w-4" />
      </Button>
    </div>
  );
};