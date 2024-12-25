import { useState } from "react";
import { DeveloperFavoritesMap } from "./DeveloperFavoritesMap";
import { DeveloperFavoritesTable } from "./DeveloperFavoritesTable";
import { DeveloperFavoritesFilters } from "./DeveloperFavoritesFilters";
import { Button } from "@/components/ui/button";
import { Map, Table2 } from "lucide-react";
import { useFavorites } from "./useFavorites";

interface DeveloperFavoritesViewProps {
  viewMode: "map" | "table";
  onViewModeChange: (mode: "map" | "table") => void;
}

export const DeveloperFavoritesView = ({
  viewMode,
  onViewModeChange,
}: DeveloperFavoritesViewProps) => {
  const { favorites, filters, setFilters } = useFavorites();

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 flex-shrink-0">
          <DeveloperFavoritesFilters filters={filters} onChange={setFilters} />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex justify-end gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => onViewModeChange("table")}
            >
              <Table2 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="icon"
              onClick={() => onViewModeChange("map")}
            >
              <Map className="h-4 w-4" />
            </Button>
          </div>
          {viewMode === "map" ? (
            <DeveloperFavoritesMap favorites={favorites} />
          ) : (
            <DeveloperFavoritesTable favorites={favorites} />
          )}
        </div>
      </div>
    </div>
  );
};