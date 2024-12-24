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
  const [isMinimized, setIsMinimized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset position when marker position changes
  useEffect(() => {
    if (!isDragging) {
      setPosition(markerPosition);
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
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Check if window should snap back to marker
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow(rect.left - markerPosition.x, 2) + 
        Math.pow(rect.top - markerPosition.y, 2)
      );
      
      // If window is within 100px of marker, snap back
      if (distance < 100) {
        setPosition(markerPosition);
      }
    }
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
        "absolute z-50 transition-all duration-200",
        isDragging ? "cursor-grabbing" : "",
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
          "bg-primary/10 p-2 rounded-t-lg cursor-grab flex justify-between items-center",
          isDragging ? "cursor-grabbing" : ""
        )}
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-medium">
          {parcel.title}
        </span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
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
        isMinimized ? "scale-y-0 h-0" : "scale-y-100"
      )}>
        <ParcelInfo 
          parcel={parcel}
          onClose={onClose}
          className="rounded-t-none"
        />
      </div>

      {/* Minimized view */}
      {isMinimized && (
        <div className="bg-background/95 backdrop-blur-sm p-4 rounded-b-lg border-t border-primary/10">
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