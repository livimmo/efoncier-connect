import { useState } from 'react';
import { ParcelInfo } from './ParcelInfo';
import type { Parcel } from '@/utils/mockData/types';
import { UserRole } from '@/types/auth';

export interface DraggableParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  markerPosition?: { x: number; y: number };
  className?: string;
  userRole?: UserRole;
  onMinimize?: () => void;
}

export const DraggableParcelInfo = ({
  parcel,
  onClose,
  markerPosition,
  className,
  userRole,
  onMinimize
}: DraggableParcelInfoProps) => {
  const [position, setPosition] = useState(markerPosition || { x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.pageX - position.x;
    const startY = e.pageY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.pageX - startX,
        y: e.pageY - startY
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 1000 : 100
      }}
      onMouseDown={handleMouseDown}
      className={className}
    >
      <ParcelInfo 
        parcel={parcel} 
        onClose={onClose} 
        onMinimize={onMinimize}
        userRole={userRole}
      />
    </div>
  );
};