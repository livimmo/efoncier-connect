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
import { Eye, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CommunePropertiesTableProps {
  searchQuery: string;
  filters: {
    propertyType: string;
    status: string;
    fiscalStatus: string;
    zone: string;
    dateRange: any;
    surface: number[];
  };
}

export const CommunePropertiesTable = ({
  searchQuery,
  filters,
}: CommunePropertiesTableProps) => {
  const { toast } = useToast();

  const mockData = [
    {
      id: "1",
      tf: "TF-123456",
      type: "RESIDENTIAL",
      surface: 250,
      status: "AVAILABLE",
      fiscalStatus: "PAID",
      dateAdded: "2024-03-15",
      owner: "John D.",
    },
    {
      id: "2",
      tf: "TF-789012",
      type: "COMMERCIAL",
      surface: 500,
      status: "IN_TRANSACTION",
      fiscalStatus: "PENDING",
      dateAdded: "2024-03-14",
      owner: "Jane S.",
    },
    {
      id: "3",
      tf: "TF-345678",
      type: "INDUSTRIAL",
      surface: 1000,
      status: "SOLD",
      fiscalStatus: "OVERDUE",
      dateAdded: "2024-03-13",
      owner: "Bob M.",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return <Badge variant="success">Disponible</Badge>;
      case "IN_TRANSACTION":
        return <Badge variant="warning">En Transaction</Badge>;
      case "SOLD":
        return <Badge variant="destructive">Vendu</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getFiscalStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge variant="success">Payé</Badge>;
      case "PENDING":
        return <Badge variant="warning">En Attente</Badge>;
      case "OVERDUE":
        return <Badge variant="destructive">En Retard</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Bien supprimé",
      description: `Le bien ${id} a été supprimé avec succès.`,
    });
  };

  return (
    <div className="rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° TF</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Surface (m²)</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Statut Fiscal</TableHead>
            <TableHead>Date d'Ajout</TableHead>
            <TableHead>Propriétaire</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">{property.tf}</TableCell>
              <TableCell>{property.type}</TableCell>
              <TableCell>{property.surface}</TableCell>
              <TableCell>{getStatusBadge(property.status)}</TableCell>
              <TableCell>{getFiscalStatusBadge(property.fiscalStatus)}</TableCell>
              <TableCell>{new Date(property.dateAdded).toLocaleDateString()}</TableCell>
              <TableCell>{property.owner}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(property.id)}
                  >
                    <Trash2 className="h-4 w-4" />
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