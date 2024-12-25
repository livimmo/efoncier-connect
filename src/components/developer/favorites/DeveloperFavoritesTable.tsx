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
import { Eye, MessageSquare, Download, Star } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { Property } from "@/types";
import { useState } from "react";
import { PropertyChat } from "@/components/chat/PropertyChat";
import { PropertyDetailsDialog } from "../properties/PropertyDetailsDialog";
import { PropertyDocumentsDialog } from "../properties/PropertyDocumentsDialog";
import { useToast } from "@/hooks/use-toast";

interface DeveloperFavoritesTableProps {
  favorites: Property[];
}

export const DeveloperFavoritesTable = ({ favorites }: DeveloperFavoritesTableProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDocumentsDialog, setShowDocumentsDialog] = useState(false);
  const { toast } = useToast();

  const handleRemoveFromFavorites = (propertyId: string) => {
    toast({
      title: "Retiré des favoris",
      description: "Le bien a été retiré de vos favoris",
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Numéro TF</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead className="text-right">Superficie</TableHead>
            <TableHead className="text-right">Prix au m²</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date d'ajout</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {favorites.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">{property.title}</TableCell>
              <TableCell>{property.description}</TableCell>
              <TableCell className="text-right">
                {property.surface_area.toLocaleString()} m²
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(property.price)} DHS
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    property.status === "available"
                      ? "success"
                      : property.status === "unavailable"
                      ? "destructive"
                      : "warning"
                  }
                >
                  {property.status === "available"
                    ? "Disponible"
                    : property.status === "unavailable"
                    ? "Indisponible"
                    : "En Transaction"}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(property.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSelectedProperty(property);
                      setShowDetailsDialog(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <PropertyChat
                    propertyId={property.id}
                    propertyTitle={property.title}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSelectedProperty(property);
                      setShowDocumentsDialog(true);
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveFromFavorites(property.id)}
                  >
                    <Star className="h-4 w-4 fill-primary" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedProperty && (
        <>
          <PropertyDetailsDialog
            property={selectedProperty}
            open={showDetailsDialog}
            onOpenChange={setShowDetailsDialog}
          />
          <PropertyDocumentsDialog
            property={selectedProperty}
            open={showDocumentsDialog}
            onOpenChange={setShowDocumentsDialog}
          />
        </>
      )}
    </>
  );
};