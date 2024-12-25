import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockParcels } from "@/utils/mockData/parcels";
import { Property } from "@/types";
import { PropertiesHeader } from "@/components/owner/properties/PropertiesHeader";
import { PropertiesStats } from "@/components/owner/properties/PropertiesStats";
import { PropertiesTable } from "@/components/owner/properties/PropertiesTable";

const Properties = () => {
  const navigate = useNavigate();
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);

  const properties: Property[] = mockParcels.map(parcel => ({
    id: parcel.id,
    title: parcel.title,
    description: parcel.description || '',
    property_type: parcel.type,
    surface_area: parcel.surface,
    location: parcel.location,
    fiscal_status: parcel.fiscal_status || "compliant",
    status: parcel.status || "AVAILABLE",
    is_for_sale: false,
    price: parcel.price || 0,
    owner_id: parcel.owner_id || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    titleDeedNumber: parcel.titleDeedNumber || '',
    ownerName: parcel.ownerName || '',
    address: parcel.address || '',
    city: parcel.city || '',
    zone: parcel.zone,
    type: parcel.type,
    surface: parcel.surface,
    taxStatus: parcel.taxStatus,
    tnbInfo: parcel.tnbInfo
  }));

  return (
    <div className="container mx-auto p-4 space-y-6">
      <PropertiesHeader />
      <PropertiesStats data={properties} />
      <PropertiesTable 
        data={properties}
        onParcelSelect={setSelectedParcelId}
      />
    </div>
  );
};

export default Properties;