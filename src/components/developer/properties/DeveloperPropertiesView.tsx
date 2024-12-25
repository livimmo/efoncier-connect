import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Map, List, Filter } from "lucide-react";
import { DeveloperPropertiesTable } from "./DeveloperPropertiesTable";
import { DeveloperPropertiesMap } from "./DeveloperPropertiesMap";
import { DeveloperPropertiesFilters } from "./DeveloperPropertiesFilters";
import { useProperties } from "./useProperties";
import { cn } from "@/lib/utils";

interface DeveloperPropertiesViewProps {
  viewMode: "map" | "table";
  onViewModeChange: (mode: "map" | "table") => void;
}

export const DeveloperPropertiesView = ({
  viewMode,
  onViewModeChange,
}: DeveloperPropertiesViewProps) => {
  const { properties, filters, setFilters } = useProperties();
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="relative">
      <div className="flex justify-end gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden"
        >
          <Filter className="w-4 h-4 mr-2" />
          {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
        </Button>
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

      <div className="grid gap-6 relative">
        <div className={cn(
          "lg:grid lg:grid-cols-[300px,1fr] gap-6",
          !showFilters && "lg:grid-cols-[0,1fr]"
        )}>
          <div className={cn(
            "transition-all duration-300",
            showFilters ? "block" : "hidden lg:block lg:w-0 lg:overflow-hidden"
          )}>
            <DeveloperPropertiesFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          <div>
            {viewMode === "table" ? (
              <DeveloperPropertiesTable data={properties} />
            ) : (
              <Card className="h-[600px]">
                <DeveloperPropertiesMap properties={properties} />
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};