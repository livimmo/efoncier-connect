import { useState, useRef, useEffect } from 'react';
import { ParcelInfo } from './ParcelInfo';
import { Parcel } from '@/utils/mockData/types';
import { cn } from "@/lib/utils";
import { ParcelInfoHeader } from './parcel-info/ParcelInfoHeader';
import { MinimizedParcelInfo } from './parcel-info/MinimizedParcelInfo';
import { useMediaQuery } from "@/hooks/use-media-query";

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
  const isMobile = useMediaQuery("(max-width: 768px)");

  const adjustPosition = (pos: { x: number, y: number }, forceUpdate = false) => {
    if (!containerRef.current) return pos;

    const rect = containerRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const totalHeight = isMinimized ? 120 : rect.height;
    
    let newX = pos.x;
    let newY = pos.y;

    // Ajustement pour le mode plein écran
    const isFullscreen = document.fullscreenElement !== null;
    const container = isFullscreen ? document.fullscreenElement as HTMLElement : window;
    const containerWidth = isFullscreen ? container.offsetWidth || windowWidth : windowWidth;
    const containerHeight = isFullscreen ? container.offsetHeight || windowHeight : windowHeight;

    if (isMobile) {
      newX = containerWidth / 2;
      newY = containerHeight - (isMinimized ? 80 : 20);
    } else {
      if (newX < rect.width/2) {
        newX = rect.width/2;
      } else if (newX + rect.width/2 > containerWidth) {
        newX = containerWidth - rect.width/2;
      }

      if (newY - totalHeight < 0) {
        newY = totalHeight;
      } else if (newY > containerHeight - 20) {
        newY = containerHeight - 20;
      }

      if (!isMinimized || forceUpdate) {
        const minY = totalHeight + 20;
        if (newY < minY) {
          newY = minY;
        }
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

  useEffect(() => {
    const newPosition = adjustPosition(position, true);
    setPosition(newPosition);
  }, [isMinimized]);

  // Gérer les changements de mode plein écran
  useEffect(() => {
    const handleFullscreenChange = () => {
      const newPosition = adjustPosition(position, true);
      setPosition(newPosition);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    
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
        onClose={onClose}
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
          onClose={onClose}
          className="rounded-t-none border-t-0"
        />
      </div>

      {isMinimized && <MinimizedParcelInfo parcel={parcel} />}
    </div>
  );
};