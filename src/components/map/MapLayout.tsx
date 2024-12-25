import React from "react";

export interface MapLayoutProps {
  children?: React.ReactNode;
}

export const MapLayout = ({ children }: MapLayoutProps) => {
  return (
    <div className="h-screen w-full">
      {children}
    </div>
  );
};