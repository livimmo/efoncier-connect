import { useState, useRef, useEffect } from 'react';
import { ParcelInfo } from './ParcelInfo';
import { Parcel } from '@/utils/mockData/types';
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '../ui/button';

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
  const [position, setPosition] = useState(markerPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true); // Démarrer en mode réduit
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Ajuster la position pour rester dans les limites de la fenêtre
  const adjustPosition = (pos: { x: number, y: number }) => {
    if (!containerRef.current) return pos;

    const rect = containerRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let newX = pos.x;
    let newY = pos.y;

    // Ajuster horizontalement
    if (newX - rect.width/2 < 0) {
      newX = rect.width/2;
    } else if (newX + rect.width/2 > windowWidth) {
      newX = windowWidth - rect.width/2;
    }

    // Ajuster verticalement
    const totalHeight = isMinimized ? 150 : rect.height; // Hauteur estimée en mode réduit
    if (newY - totalHeight < 0) {
      newY = totalHeight;
    } else if (newY > windowHeight - 20) {
      newY = windowHeight - 20;
    }

    return { x: newX, y: newY };
  };

  // Reset position when marker position changes
  useEffect(() => {
    if (!isDragging) {
      const adjustedPosition = adjustPosition({
        x: markerPosition.x,
        y: markerPosition.y - 20
      });
      setPosition(adjustedPosition);
    }
  }, [markerPosition, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newPosition = adjustPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
      setPosition(newPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute z-50 transition-all duration-200 ease-out",
        isDragging ? "cursor-grabbing scale-[0.98] opacity-90" : "cursor-grab",
        "hover:shadow-lg",
        className
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)',
      }}
    >
      {/* Draggable header */}
      <div 
        className={cn(
          "bg-background/95 backdrop-blur-sm p-2 rounded-t-lg",
          "border border-border/50",
          "flex justify-between items-center",
          "shadow-sm",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-medium text-foreground/90">
          {parcel.title}
        </span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-background/80"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-background/80"
            onClick={onClose}
          >
            ×
          </Button>
        </div>
      </div>

      {/* Connection line to marker */}
      <div 
        className="absolute left-1/2 bottom-0 w-px h-4 bg-primary/50 
                   transform translate-x-[-50%] translate-y-[100%]"
      />

      {/* Parcel info content */}
      <div className={cn(
        "transform-gpu transition-all duration-300 ease-in-out origin-top",
        "bg-background/95 backdrop-blur-sm",
        "border border-border/50 border-t-0",
        "rounded-b-lg shadow-lg",
        isMinimized ? "scale-y-0 h-0" : "scale-y-100"
      )}>
        <ParcelInfo 
          parcel={parcel}
          onClose={onClose}
          className="rounded-t-none border-t-0"
        />
      </div>

      {/* Minimized view */}
      {isMinimized && (
        <div className="bg-background/95 backdrop-blur-sm p-4 rounded-b-lg border-t border-primary/10 shadow-lg">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className={`text-sm font-medium ${
                parcel.taxStatus === 'PAID' 
                  ? 'text-green-600' 
                  : parcel.taxStatus === 'OVERDUE' 
                  ? 'text-red-600' 
                  : 'text-orange-600'
              }`}>
                {parcel.taxStatus === 'PAID' 
                  ? 'Payé' 
                  : parcel.taxStatus === 'OVERDUE' 
                  ? 'En retard' 
                  : 'En attente'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Localisation</span>
              <span className="text-sm font-medium">{parcel.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">N° Titre</span>
              <span className="text-sm font-medium">{parcel.titleDeedNumber}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};