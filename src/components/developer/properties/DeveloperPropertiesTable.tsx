import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, Download } from "lucide-react";
import { mockParcels } from "@/utils/mockData/parcels";
import { formatCurrency } from "@/utils/format";

export const DeveloperPropertiesTable = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Numéro TF</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Superficie (m²)</TableHead>
            <TableHead>Prix (DHS/m²)</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Statut Fiscal</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockParcels.map((parcel) => (
            <TableRow key={parcel.id}>
              <TableCell className="font-medium">{parcel.titleDeedNumber}</TableCell>
              <TableCell>{parcel.address}</TableCell>
              <TableCell>{parcel.surface.toLocaleString()} m²</TableCell>
              <TableCell>{formatCurrency(parcel.tnbInfo.pricePerMeter)} DHS</TableCell>
              <TableCell>
                <Badge
                  variant={
                    parcel.status === "AVAILABLE"
                      ? "success"
                      : parcel.status === "UNAVAILABLE"
                      ? "destructive"
                      : "warning"
                  }
                >
                  {parcel.status === "AVAILABLE"
                    ? "Disponible"
                    : parcel.status === "UNAVAILABLE"
                    ? "Indisponible"
                    : "En Transaction"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={parcel.taxStatus === "PAID" ? "success" : "destructive"}
                >
                  {parcel.taxStatus === "PAID" ? "Payé" : "Impayé"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};