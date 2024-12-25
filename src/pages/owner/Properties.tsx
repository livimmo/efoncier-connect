import { useState } from "react";
import { DeveloperPropertiesTable } from "@/components/developer/properties/DeveloperPropertiesTable";
import { mockParcels } from "@/utils/mockData/parcels";
import type { Property } from "@/types";

const Properties = () => {
  const [selectedParcelId, setSelectedParcelId] = useState<string>("");

  return (
    <div className="container mx-auto p-4">
      <DeveloperPropertiesTable 
        data={mockParcels as Property[]} 
      />
    </div>
  );
};

export default Properties;