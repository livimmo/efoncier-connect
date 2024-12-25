import { useState } from "react";
import { Property } from "@/types";
import { mockParcels } from "@/utils/mockData/parcels";

export interface FavoriteFilters {
  search: string;
  region: string;
  city: string;
  minSurface: number;
  maxSurface: number;
  minPrice: number;
  maxPrice: number;
  status: string;
  sortBy: "date" | "price" | "surface";
  sortOrder: "asc" | "desc";
}

const initialFilters: FavoriteFilters = {
  search: "",
  region: "",
  city: "",
  minSurface: 0,
  maxSurface: 10000,
  minPrice: 0,
  maxPrice: 10000,
  status: "",
  sortBy: "date",
  sortOrder: "desc",
};

export const useFavorites = () => {
  const [filters, setFilters] = useState<FavoriteFilters>(initialFilters);

  // Ensure mockParcels exists and has elements before trying to slice
  const validParcels = Array.isArray(mockParcels) ? mockParcels : [];
  console.log('Valid parcels count:', validParcels.length);

  // Convert valid parcels to favorites
  const favorites: Property[] = validParcels.slice(0, 5).map(parcel => ({
    id: parcel.id,
    title: parcel.titleDeedNumber,
    description: parcel.address,
    property_type: parcel.type.toLowerCase(),
    surface_area: parcel.surface,
    location: parcel.location,
    fiscal_status: parcel.taxStatus === "PAID" ? "compliant" : "non_compliant",
    status: parcel.status.toLowerCase(),
    is_for_sale: false,
    price: parcel.tnbInfo?.pricePerMeter * parcel.surface || 0,
    owner_id: parcel.owner,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));

  console.log('Converted favorites count:', favorites.length);

  return {
    favorites,
    filters,
    setFilters,
  };
};