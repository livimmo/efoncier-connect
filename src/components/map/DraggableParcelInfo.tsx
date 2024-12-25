import { useRef, useState } from 'react';
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
  const [isMinimized, setIsMinimized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { position, isDragging, handleMouseDown } = useParcelPosition({
    markerPosition,
    isMinimized,
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
        transform: `translate(-50%, ${isMinimized ? '-50%' : '-100%'})`,
      } : undefined}
    >
      <div className={cn(
        "bg-background border border-border rounded-lg shadow-lg overflow-hidden",
        "transition-all duration-300",
        isMinimized ? "max-h-[60px]" : "max-h-[600px]"
      )}>
        <ParcelInfoHeader
          title={parcel.title}
          ownerName={parcel.ownerName}
          isMinimized={isMinimized}
          isDragging={isDragging}
          onToggleMinimize={() => setIsMinimized(!isMinimized)}
          onClose={handleClose}
          onMouseDown={handleMouseDown}
        />

        {!isMinimized && (
          <div className="max-h-[500px] overflow-y-auto">
            <ParcelInfo 
              parcel={parcel}
              onClose={handleClose}
              className="rounded-t-none border-t-0"
              userRole={userRole}
            />
          </div>
        )}

        {isMinimized && <MinimizedParcelInfo parcel={parcel} />}
      </div>

      {!isMobile && !isMinimized && (
        <div className={cn(
          "absolute left-1/2 bottom-0 w-px h-4 bg-primary/50",
          "transform -translate-x-1/2 translate-y-[100%]",
          "transition-opacity duration-300"
        )} />
      )}
    </div>
  );
};