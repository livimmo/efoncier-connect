import { useState, useRef, useEffect } from 'react';
import { ParcelInfo } from './ParcelInfo';
import { Parcel } from '@/utils/mockData/types';
import { cn } from "@/lib/utils";
import { ParcelInfoHeader } from './parcel-info/ParcelInfoHeader';
import { MinimizedParcelInfo } from './parcel-info/MinimizedParcelInfo';

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
  const [isMinimized, setIsMinimized] = useState(true);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const adjustPosition = (pos: { x: number, y: number }, forceUpdate = false) => {
    if (!containerRef.current) return pos;

    const rect = containerRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const totalHeight = isMinimized ? 120 : rect.height;
    
    let newX = pos.x;
    let newY = pos.y;

    // Ajustement horizontal
    if (newX < rect.width/2) {
      newX = rect.width/2;
    } else if (newX + rect.width/2 > windowWidth) {
      newX = windowWidth - rect.width/2;
    }

    // Ajustement vertical avec prise en compte de l'état minimisé/développé
    if (newY - totalHeight < 0) {
      newY = totalHeight;
    } else if (newY > windowHeight - 20) {
      newY = windowHeight - 20;
    }

    // Si la fenêtre est développée, assurons-nous qu'elle reste visible
    if (!isMinimized || forceUpdate) {
      const minY = totalHeight + 20; // Marge supplémentaire en haut
      if (newY < minY) {
        newY = minY;
      }
    }

    return { x: newX, y: newY };
  };

  useEffect(() => {
    if (!isDragging) {
      const adjustedPosition = adjustPosition({
        x: markerPosition.x,
        y: markerPosition.y - 20
      });
      setPosition(adjustedPosition);
    }
  }, [markerPosition, isDragging]);

  // Ajuster la position lors du changement d'état minimisé/développé
  useEffect(() => {
    const newPosition = adjustPosition(position, true);
    setPosition(newPosition);
  }, [isMinimized]);

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
        "hover:shadow-lg w-[260px]",
        className
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <ParcelInfoHeader
        title={parcel.title}
        isMinimized={isMinimized}
        isDragging={isDragging}
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
        onClose={onClose}
        onMouseDown={handleMouseDown}
      />

      <div 
        className="absolute left-1/2 bottom-0 w-px h-4 bg-primary/50 
                   transform translate-x-[-50%] translate-y-[100%]"
      />

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

      {isMinimized && <MinimizedParcelInfo parcel={parcel} />}
    </div>
  );
};