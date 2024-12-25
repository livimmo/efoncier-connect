import { useState } from 'react';

export const useParcelMinimize = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return {
    isMinimized,
    toggleMinimize
  };
};