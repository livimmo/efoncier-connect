import { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

export const useParcelPosition = (initialPosition?: Position) => {
  const [position, setPosition] = useState<Position>(
    initialPosition || { x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 200 }
  );

  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  return {
    position,
    setPosition,
  };
};