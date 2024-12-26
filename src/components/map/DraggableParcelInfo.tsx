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
  const [isMinimized, setIsMinimized] = useState(true);
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
        isMobile ? "w-[95vw] max-w-[400px] left-1/2 -translate-x-1/2 bottom-24" : "w-[400px]",
        !isMobile && "absolute",
        isMinimized ? "z-[40]" : "z-[100]",
        className
      )}
      style={!isMobile ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      } : undefined}
    >
      {isMinimized ? (
        <MinimizedParcelInfo 
          parcel={parcel}
          onClose={handleClose}
          onExpand={() => setIsMinimized(false)}
          isDragging={isDragging}
          onMouseDown={handleMouseDown}
        />
      ) : (
        <ParcelInfo 
          parcel={parcel}
          onClose={handleClose}
          className="rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          userRole={userRole}
          isExpanded={!isMinimized}
          onToggleExpand={() => setIsMinimized(!isMinimized)}
        />
      )}
    </div>
  );
};