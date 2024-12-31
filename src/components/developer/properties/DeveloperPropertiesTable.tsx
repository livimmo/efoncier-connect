import { Property } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/utils/format";
import { BlurredField } from "@/components/map/parcel-info/BlurredField";
import { useAuth } from "@/components/auth/AuthProvider";

interface DeveloperPropertiesTableProps {
  data: Property[];
}

export const DeveloperPropertiesTable = ({ data }: DeveloperPropertiesTableProps) => {
  const { profile } = useAuth();
  const isAuthenticated = !!profile;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Localisation</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Zonage</TableHead>
            <TableHead>Surface (m²)</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Titre Foncier</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((property) => (
            <TableRow key={property.id}>
              <TableCell>{`${property.location.address}, ${property.city || 'N/A'}`}</TableCell>
              <TableCell>{property.type}</TableCell>
              <TableCell>{property.zone}</TableCell>
              <TableCell>{property.surface}</TableCell>
              <TableCell>{formatCurrency(property.price)}</TableCell>
              <TableCell>
                {isAuthenticated ? (
                  property.titleDeedNumber
                ) : (
                  <BlurredField value={property.titleDeedNumber} />
                )}
              </TableCell>
              <TableCell>{property.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};