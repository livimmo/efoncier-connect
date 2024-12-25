import { useState, useEffect } from "react";
import { MinimizedParcelInfo } from "./parcel-info/MinimizedParcelInfo";
import { ParcelInfo } from "./ParcelInfo";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Parcel } from "@/utils/mockData/types";

interface DraggableParcelInfoProps {
  parcel: Parcel;
  onClose?: () => void;
  className?: string;
}

export const DraggableParcelInfo = ({ 
  parcel,
  onClose,
  className 
}: DraggableParcelInfoProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        setPosition(prev => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY
        }));
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMobile) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      className={cn(
        "fixed transition-all duration-300 ease-out",
        isDragging ? "cursor-grabbing scale-[0.98] opacity-90" : !isMobile && "cursor-grab",
        "hover:shadow-lg will-change-transform",
        isMobile ? "w-[95vw] max-w-[400px] left-1/2 -translate-x-1/2 bottom-24" : "w-[400px]",
        !isMobile && "absolute",
        isMinimized ? "z-[40]" : "z-[100]",
        className
      )}
      style={!isMobile ? {
        left: `${position.x}px`,
        top: isMinimized ? `${position.y + 60}px` : `${position.y}px`,
        transform: isMinimized 
          ? 'translate(-50%, -50%)'
          : 'translate(-50%, -50%)',
      } : undefined}
    >
      {isMinimized ? (
        <MinimizedParcelInfo 
          parcel={parcel}
          onClose={onClose}
        />
      ) : (
        <ParcelInfo 
          parcel={parcel}
          onClose={onClose}
          onMinimize={() => setIsMinimized(true)}
        />
      )}
    </div>
  );
};