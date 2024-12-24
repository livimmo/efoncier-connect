import { useRef, useState } from 'react';
import { ParcelInfo } from './ParcelInfo';
import { Parcel } from '@/utils/mockData/types';
import { cn } from "@/lib/utils";
import { ParcelInfoHeader } from './parcel-info/ParcelInfoHeader';
import { MinimizedParcelInfo } from './parcel-info/MinimizedParcelInfo';
import { useMediaQuery } from "@/hooks/use-media-query";
import { useParcelPosition } from './parcel-info/useParcelPosition';
import { useToast } from "@/hooks/use-toast";

interface DraggableParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  markerPosition: { x: number; y: number };
  className?: string;
}

export const DraggableParcelInfo = ({ 
  parcel, 
  onClose, 
  markerPosition,
  className 
}: DraggableParcelInfoProps) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();

  const { position, isDragging, handleMouseDown } = useParcelPosition({
    markerPosition,
    isMinimized,
    containerRef,
  });

  const handleClose = () => {
    if (onClose) {
      onClose();
      toast({
        title: "Fenêtre fermée",
        description: "Vous pouvez toujours cliquer sur le marqueur pour la réouvrir",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed z-[9999] transition-all duration-200 ease-out",
        isDragging ? "cursor-grabbing scale-[0.98] opacity-90" : !isMobile && "cursor-grab",
        "hover:shadow-lg",
        isMobile ? "w-[95vw] max-w-[400px] left-1/2 -translate-x-1/2 bottom-0" : "w-[260px]",
        !isMobile && "absolute",
        className
      )}
      style={!isMobile ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)',
      } : undefined}
    >
      <ParcelInfoHeader
        title={parcel.title}
        isMinimized={isMinimized}
        isDragging={isDragging}
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
        onClose={handleClose}
        onMouseDown={handleMouseDown}
      />

      {!isMobile && (
        <div 
          className="absolute left-1/2 bottom-0 w-px h-4 bg-primary/50 
                     transform translate-x-[-50%] translate-y-[100%]"
        />
      )}

      <div className={cn(
        "transform-gpu transition-all duration-300 ease-in-out origin-top",
        "bg-background/95 backdrop-blur-sm",
        "border border-border/50 border-t-0",
        "rounded-b-lg shadow-lg",
        isMinimized ? "scale-y-0 h-0" : "scale-y-100"
      )}>
        <ParcelInfo 
          parcel={parcel}
          onClose={handleClose}
          className="rounded-t-none border-t-0"
        />
      </div>

      {isMinimized && <MinimizedParcelInfo parcel={parcel} />}
    </div>
  );
};