import { Property } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MapPin, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export interface PropertiesTableProps {
  data: Property[];
  isLoading: boolean;
}

export const PropertiesTable = ({ data, isLoading }: PropertiesTableProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = (propertyId: string) => {
    // Simulation de suppression
    toast({
      title: "Bien supprimé",
      description: "Le bien a été supprimé avec succès",
    });
  };

  const getFiscalStatusBadge = (status: string) => {
    const statusConfig = {
      compliant: { label: "Conforme", variant: "success" },
      non_compliant: { label: "Non conforme", variant: "destructive" },
      under_review: { label: "En révision", variant: "warning" },
    } as const;

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.under_review;
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

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
            <TableHead>Titre</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Surface</TableHead>
            <TableHead>Statut fiscal</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">{property.title}</TableCell>
              <TableCell>{property.property_type}</TableCell>
              <TableCell>{property.surface_area} m²</TableCell>
              <TableCell>{getFiscalStatusBadge(property.fiscal_status)}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate(`/property/${property.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate(`/map?property=${property.id}`)}
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate(`/property/edit/${property.id}`)}
                  >
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
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Aucune propriété trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};