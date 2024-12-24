import { Property } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

interface PropertiesTableProps {
  data: Property[];
  isLoading: boolean;
}

export const PropertiesTable = ({ data, isLoading }: PropertiesTableProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Titre</TableHead>
          <TableHead>Type de propriété</TableHead>
          <TableHead>Superficie</TableHead>
          <TableHead>Statut fiscal</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((property) => (
          <TableRow key={property.id}>
            <TableCell>{property.id}</TableCell>
            <TableCell>{property.title}</TableCell>
            <TableCell>{property.property_type}</TableCell>
            <TableCell>{property.surface_area} m²</TableCell>
            <TableCell>{property.fiscal_status}</TableCell>
            <TableCell>
              {/* Actions can be added here */}
            </TableCell>
          </TableRow>
        ))}
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Aucune propriété trouvée
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
