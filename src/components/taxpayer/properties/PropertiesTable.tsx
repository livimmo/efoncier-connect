import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, CreditCard } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { Loader2 } from "lucide-react";

interface PropertiesTableProps {
  properties: any[];
  isLoading: boolean;
}

export function PropertiesTable({ properties, isLoading }: PropertiesTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Numéro TF</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Superficie (m²)</TableHead>
            <TableHead>Typologie</TableHead>
            <TableHead>Statut Fiscal</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Aucun bien enregistré
              </TableCell>
            </TableRow>
          ) : (
            properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell>{property.title}</TableCell>
                <TableCell>
                  {(property.location as { address: string }).address}
                </TableCell>
                <TableCell>{property.surface_area} m²</TableCell>
                <TableCell>{property.property_type}</TableCell>
                <TableCell>
                  <Badge 
                    variant={property.fiscal_status === 'compliant' ? "success" : "destructive"}
                  >
                    {property.fiscal_status === 'compliant' ? 'Payé' : 'Impayé'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {property.fiscal_status !== 'compliant' && (
                      <Button variant="outline" size="sm">
                        <CreditCard className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}