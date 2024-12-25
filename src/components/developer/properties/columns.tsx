import { ColumnDef } from "@tanstack/react-table";
import { Parcel } from "@/utils/mockData/types";
import { PropertyStatusIndicator } from "@/components/map/filters/PropertyStatusIndicator";

export const columns: ColumnDef<Parcel>[] = [
  {
    accessorKey: "titleDeedNumber",
    header: "N° Titre Foncier",
  },
  {
    accessorKey: "surface",
    header: "Surface (m²)",
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <PropertyStatusIndicator 
        status={row.original.status as 'AVAILABLE' | 'IN_TRANSACTION' | 'SOLD'} 
        size="sm" 
      />
    ),
  },
  {
    accessorKey: "zone",
    header: "Zone",
  },
  {
    accessorKey: "city",
    header: "Ville",
  },
];