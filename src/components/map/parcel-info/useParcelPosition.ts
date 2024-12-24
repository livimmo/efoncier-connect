import { useState, useEffect } from 'react';
import { useMediaQuery } from "@/hooks/use-media-query";

interface Position {
  x: number;
  y: number;
}

interface UseParcelPositionProps {
  markerPosition: Position;
  isMinimized: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const useParcelPosition = ({ 
  markerPosition, 
  isMinimized, 
  containerRef 
}: UseParcelPositionProps) => {
  const [position, setPosition] = useState(markerPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const isMobile = useMediaQuery("(max-width: 768px)");

  const adjustPosition = (pos: Position, forceUpdate = false) => {
    if (!containerRef.current) return pos;

    const rect = containerRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const totalHeight = isMinimized ? 120 : rect.height;
    
    let newX = pos.x;
    let newY = pos.y;

    const isFullscreen = document.fullscreenElement !== null;
    const fullscreenElement = document.fullscreenElement as HTMLElement | null;
    const containerWidth = isFullscreen && fullscreenElement ? fullscreenElement.offsetWidth : windowWidth;
    const containerHeight = isFullscreen && fullscreenElement ? fullscreenElement.offsetHeight : windowHeight;

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

  return {
    position,
    isDragging,
    handleMouseDown,
  };
};