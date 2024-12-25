import { useState, useEffect } from "react";
import { ParcelInfo } from "./ParcelInfo";
import { Parcel } from "@/utils/mockData/types";
import { useParcelPosition } from "./parcel-info/useParcelPosition";
import { UserRole } from "./types";

interface DraggableParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  className?: string;
  userRole: UserRole;
}

export const DraggableParcelInfo = ({ 
  parcel, 
  onClose,
  className,
  userRole 
}: DraggableParcelInfoProps) => {
  const { position, updatePosition } = useParcelPosition();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      updatePosition({ x: newX, y: newY });
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
  }, [isDragging, dragOffset, updatePosition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('.no-drag')) {
      return;
    }
    
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        zIndex: 50,
      }}
      onMouseDown={handleMouseDown}
    >
      <ParcelInfo 
        parcel={parcel} 
        onClose={onClose} 
        className="w-[300px]"
        userRole={userRole}
      />
    </div>
  );
};