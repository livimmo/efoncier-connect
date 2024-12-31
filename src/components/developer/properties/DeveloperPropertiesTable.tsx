import { Property } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/utils/format";
import { BlurredField } from "@/components/map/parcel-info/BlurredField";
import { useAuth } from "@/components/auth/AuthProvider";
import { Badge } from "@/components/ui/badge";

interface DeveloperPropertiesTableProps {
  data: Property[];
}

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'AVAILABLE':
      return 'success';
    case 'SOLD':
      return 'destructive';
    case 'IN_TRANSACTION':
      return 'warning';
    default:
      return 'secondary';
  }
};

const getFiscalStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'PAID':
      return 'success';
    case 'PENDING':
      return 'warning';
    case 'OVERDUE':
      return 'destructive';
    default:
      return 'secondary';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'AVAILABLE':
      return 'Disponible';
    case 'SOLD':
      return 'Vendu';
    case 'IN_TRANSACTION':
      return 'En Transaction';
    default:
      return status;
  }
};

const getFiscalStatusLabel = (status: string) => {
  switch (status) {
    case 'PAID':
      return 'Payé';
    case 'PENDING':
      return 'En Attente';
    case 'OVERDUE':
      return 'En Retard';
    default:
      return status;
  }
};

export const DeveloperPropertiesTable = ({ data }: DeveloperPropertiesTableProps) => {
  const { profile } = useAuth();
  const isAuthenticated = !!profile;

  const getMockCity = (index: number) => {
    const cities = [
      'Casablanca',
      'Rabat',
      'Marrakech',
      'Tanger',
      'Agadir',
      'Fès',
      'Meknès',
      'Oujda'
    ];
    return cities[index % cities.length];
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ville</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Zonage</TableHead>
            <TableHead>Surface (m²)</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Titre Foncier</TableHead>
            <TableHead>Statut du bien</TableHead>
            <TableHead>Statut fiscal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((property, index) => (
            <TableRow key={property.id}>
              <TableCell>{property.location.city || getMockCity(index)}</TableCell>
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
              <TableCell>
                <Badge variant={getStatusBadgeVariant(property.status)}>
                  {getStatusLabel(property.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getFiscalStatusBadgeVariant(property.fiscalStatus)}>
                  {getFiscalStatusLabel(property.fiscalStatus)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};