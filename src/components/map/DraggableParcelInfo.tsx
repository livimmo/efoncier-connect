import { useRef } from 'react';
import { ParcelInfo } from './ParcelInfo';
import { Parcel } from '@/utils/mockData/types';
import { cn } from "@/lib/utils";
import { ParcelInfoHeader } from './parcel-info/ParcelInfoHeader';
import { MinimizedParcelInfo } from './parcel-info/MinimizedParcelInfo';
import { useMediaQuery } from "@/hooks/use-media-query";
import { useParcelPosition } from './parcel-info/useParcelPosition';
import { UserRole } from '@/types/auth';

interface DraggableParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  markerPosition: { x: number; y: number };
  className?: string;
  userRole?: UserRole;
}

export const DraggableParcelInfo = ({ 
  parcel, 
  onClose, 
  markerPosition,
  className,
  userRole
}: DraggableParcelInfoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { position, isDragging, handleMouseDown } = useParcelPosition({
    markerPosition,
    isMinimized: false,
    containerRef,
  });

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed transition-all duration-300 ease-out",
        isDragging ? "cursor-grabbing scale-[0.98] opacity-90" : !isMobile && "cursor-grab",
        "hover:shadow-lg will-change-transform",
        isMobile ? "w-[95vw] max-w-[400px] left-1/2 -translate-x-1/2 bottom-[4.5rem]" : "w-[400px]",
        !isMobile && "absolute",
        "z-[100]",
        className
      )}
      style={!isMobile ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        maxHeight: '80vh',
        overflow: 'auto'
      } : undefined}
    >
      <ParcelInfoHeader
        title={parcel.title}
        ownerName={parcel.ownerName}
        onClose={handleClose}
        onMouseDown={handleMouseDown}
      />

      <div className={cn(
        "transform-gpu",
        "bg-background/95 backdrop-blur-sm",
        "border border-border/50 border-t-0",
        "rounded-b-lg shadow-lg",
      )}>
        <ParcelInfo 
          parcel={parcel}
          onClose={handleClose}
          className="rounded-t-none border-t-0"
          userRole={userRole}
        />
      </div>
    </div>
  );
};