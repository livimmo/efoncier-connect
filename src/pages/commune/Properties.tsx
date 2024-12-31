import { Header } from "@/components/Header";
import { CommunePropertiesHeader } from "@/components/commune/properties/CommunePropertiesHeader";
import { CommunePropertiesTable } from "@/components/commune/properties/CommunePropertiesTable";
import { CommunePropertiesFilters } from "@/components/commune/properties/CommunePropertiesFilters";
import { useState } from "react";
import { Property } from "@/types";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const CommuneProperties = () => {
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    propertyType: "",
    status: "",
    fiscalStatus: "",
    zone: "",
    dateRange: null,
    surface: [0, 1000],
  });
  
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6 space-y-6 pt-24">
        <CommunePropertiesHeader 
          onSearch={setSearchQuery}
          onExport={() => {}}
          onViewMap={() => {}}
        />
        
        <div className="flex gap-6 relative">
          <CommunePropertiesFilters
            filters={selectedFilters}
            setFilters={setSelectedFilters}
            isCollapsed={isFiltersCollapsed}
            onToggleCollapse={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
          />
          
          <div className={cn(
            "flex-1 transition-all duration-300",
            isFiltersCollapsed ? "ml-[60px]" : "ml-[300px]",
            isMobile && "ml-0"
          )}>
            <CommunePropertiesTable
              searchQuery={searchQuery}
              filters={selectedFilters}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommuneProperties;