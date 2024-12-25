import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Map, List } from "lucide-react";
import { DeveloperPropertiesTable } from "./DeveloperPropertiesTable";
import { DeveloperPropertiesMap } from "./DeveloperPropertiesMap";
import { DeveloperPropertiesFilters } from "./DeveloperPropertiesFilters";
import { useProperties } from "./useProperties";

interface DeveloperPropertiesViewProps {
  viewMode: "map" | "table";
  onViewModeChange: (mode: "map" | "table") => void;
}

export const DeveloperPropertiesView = ({
  viewMode,
  onViewModeChange,
}: DeveloperPropertiesViewProps) => {
  const { properties, filters, setFilters } = useProperties();

  return (
    <div className="grid lg:grid-cols-[300px,1fr] gap-6">
      <DeveloperPropertiesFilters filters={filters} onFiltersChange={setFilters} />
      
      <div className="space-y-4">
        <div className="flex justify-end gap-2">
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("table")}
          >
            <List className="w-4 h-4 mr-2" />
            Tableau
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("map")}
          >
            <Map className="w-4 h-4 mr-2" />
            Carte
          </Button>
        </div>

        {viewMode === "table" ? (
          <DeveloperPropertiesTable data={properties} />
        ) : (
          <Card className="h-[600px]">
            <DeveloperPropertiesMap properties={properties} />
          </Card>
        )}
      </div>
    </div>
  );
};