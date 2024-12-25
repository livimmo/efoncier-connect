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
    const padding = 20;
    const totalHeight = isMinimized ? 120 : rect.height;
    
    let newX = pos.x;
    let newY = pos.y;

    // Handle fullscreen mode
    const isFullscreen = document.fullscreenElement !== null;
    const fullscreenElement = document.fullscreenElement as HTMLElement | null;
    const containerWidth = isFullscreen && fullscreenElement ? fullscreenElement.offsetWidth : windowWidth;
    const containerHeight = isFullscreen && fullscreenElement ? fullscreenElement.offsetHeight : windowHeight;

    if (isMobile) {
      // Mobile positioning - fixed at bottom
      newX = containerWidth / 2;
      newY = containerHeight - (isMinimized ? 80 : totalHeight / 2);
    } else {
      // Desktop positioning - adjust to prevent overflow
      const minX = rect.width/2 + padding;
      const maxX = containerWidth - rect.width/2 - padding;
      const minY = totalHeight + padding;
      const maxY = containerHeight - padding;

      // Horizontal adjustment
      if (newX < minX) newX = minX;
      if (newX > maxX) newX = maxX;

      // Vertical adjustment
      if (newY - totalHeight < padding) {
        // If too close to top, position below the marker
        newY = markerPosition.y + 50;
      } else if (newY > maxY) {
        newY = maxY;
      }

      // Additional check for minimized state
      if (!isMinimized || forceUpdate) {
        const minY = totalHeight + padding;
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