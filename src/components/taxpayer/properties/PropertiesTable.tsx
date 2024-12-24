import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, CreditCard } from "lucide-react";
import { mockParcels } from "@/utils/mockData/parcels";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/format";

interface PropertiesTableProps {
  onParcelSelect: (parcelId: string) => void;
  selectedParcelId: string | null;
}

export const PropertiesTable = ({ onParcelSelect, selectedParcelId }: PropertiesTableProps) => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Numéro TF</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead className="text-right">Superficie</TableHead>
            <TableHead>Typologie</TableHead>
            <TableHead>Statut Fiscal</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockParcels.map((parcel) => (
            <TableRow 
              key={parcel.id}
              className={cn(
                "cursor-pointer transition-colors hover:bg-muted/50",
                selectedParcelId === parcel.id && "bg-muted"
              )}
              onClick={() => onParcelSelect(parcel.id)}
            >
              <TableCell className="font-medium">
                {parcel.titleDeedNumber}
              </TableCell>
              <TableCell>{parcel.address}</TableCell>
              <TableCell className="text-right">
                {parcel.surface.toLocaleString()} m²
              </TableCell>
              <TableCell>{parcel.type}</TableCell>
              <TableCell>
                <Badge 
                  variant={parcel.taxStatus === 'PAID' ? 'success' : 'destructive'}
                  className="capitalize"
                >
                  {parcel.taxStatus === 'PAID' ? 'Payé' : 'Impayé'}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
                {parcel.taxStatus !== 'PAID' && (
                  <Button variant="ghost" size="icon">
                    <CreditCard className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};