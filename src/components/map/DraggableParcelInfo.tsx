import { useRef, useState } from 'react';
import { ParcelInfo } from './ParcelInfo';
import { Parcel } from '@/utils/mockData/types';
import { cn } from "@/lib/utils";
import { ParcelInfoHeader } from './parcel-info/ParcelInfoHeader';
import { MinimizedParcelInfo } from './parcel-info/MinimizedParcelInfo';
import { useMediaQuery } from "@/hooks/use-media-query";
import { useParcelPosition } from './parcel-info/useParcelPosition';
import { UserRole } from '@/types/auth';
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: isMobile ? '-50%' : position.x,
          y: isMobile ? 0 : position.y,
        }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", duration: 0.5 }}
        className={cn(
          "fixed transition-all duration-300 ease-out",
          isDragging ? "cursor-grabbing scale-[0.98] opacity-90" : !isMobile && "cursor-grab",
          "hover:shadow-lg will-change-transform",
          isMobile ? "w-[95vw] max-w-[400px] left-1/2 bottom-24" : "w-[400px]",
          !isMobile && "absolute",
          isMinimized ? "z-[40]" : "z-[100]",
          className
        )}
        style={!isMobile ? {
          maxHeight: isMinimized ? 'auto' : '80vh',
          overflow: isMinimized ? 'visible' : 'auto'
        } : undefined}
      >
        <motion.div
          layout
          className="bg-background rounded-lg shadow-lg border border-border"
        >
          <ParcelInfoHeader
            title={parcel.title}
            ownerName={parcel.ownerName}
            isMinimized={isMinimized}
            isDragging={isDragging}
            onToggleMinimize={() => setIsMinimized(!isMinimized)}
            onClose={handleClose}
            onMouseDown={handleMouseDown}
          />

          {!isMobile && (
            <div 
              className={cn(
                "absolute left-1/2 bottom-0 w-px h-4 bg-primary/50",
                "transform translate-x-[-50%] translate-y-[100%]",
                "transition-opacity duration-300",
                isMinimized ? "opacity-0" : "opacity-100"
              )}
            />
          )}

          <motion.div
            layout
            className={cn(
              "transform-gpu transition-all duration-300 ease-in-out origin-top",
              "bg-background/95 backdrop-blur-sm",
              "border-t-0",
              "rounded-b-lg",
              isMinimized ? "scale-y-0 h-0" : "scale-y-100"
            )}
          >
            <ParcelInfo 
              parcel={parcel}
              onClose={handleClose}
              className="rounded-t-none border-t-0"
              userRole={userRole}
            />
          </motion.div>

          {isMinimized && <MinimizedParcelInfo parcel={parcel} />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};