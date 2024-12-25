import { ReactNode } from "react";
import { MapFilters } from "./MapFilters";
import { cn } from "@/lib/utils";

interface MapLayoutProps {
  children: ReactNode;
  className?: string;
  showFilters?: boolean;
}

export const MapLayout = ({
  children,
  className,
  showFilters = true,
}: MapLayoutProps) => {
  return (
    <div className={cn("flex h-full", className)}>
      {showFilters && (
        <div className="w-80 border-r">
          <MapFilters />
        </div>
      )}
      <div className="flex-1 relative">
        {children}
      </div>
    </div>
  );
};