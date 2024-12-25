import { useState } from "react";
import { Property } from "@/types";
import { mockParcels } from "@/utils/mockData/parcels";

export interface PropertyFilters {
  region: string;
  titleDeedNumber: string;
  status: string;
  fiscalStatus: string;
  surfaceRange: [number, number];
  fiscalYear: string;
}

export const useProperties = () => {
  const [filters, setFilters] = useState<PropertyFilters>({
    region: "",
    titleDeedNumber: "",
    status: "",
    fiscalStatus: "",
    surfaceRange: [0, 15000],
    fiscalYear: "",
  });

  // Transform mockParcels to Property type
  const properties: Property[] = mockParcels.map(parcel => ({
    id: parcel.id,
    title: parcel.titleDeedNumber,
    description: parcel.address,
    property_type: parcel.type.toLowerCase(),
    surface_area: parcel.surface,
    location: parcel.location,
    fiscal_status: parcel.taxStatus === "PAID" ? "compliant" : "non_compliant",
    status: parcel.status.toLowerCase(),
    is_for_sale: false,
    price: parcel.tnbInfo.pricePerMeter * parcel.surface,
    owner_id: parcel.owner,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));

  const filteredProperties = properties.filter(property => {
    if (filters.titleDeedNumber && !property.title.toLowerCase().includes(filters.titleDeedNumber.toLowerCase())) {
      return false;
    }
    if (filters.status && property.status !== filters.status) {
      return false;
    }
    if (filters.fiscalStatus && property.fiscal_status !== filters.fiscalStatus) {
      return false;
    }
    if (property.surface_area < filters.surfaceRange[0] || property.surface_area > filters.surfaceRange[1]) {
      return false;
    }
    return true;
  });

  return {
    properties: filteredProperties,
    filters,
    setFilters,
  };
};