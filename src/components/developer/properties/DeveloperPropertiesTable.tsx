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
import { Eye, Star, BarChart2, Download, MapPin, FileText } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { PropertyChat } from "@/components/chat/PropertyChat";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { PropertyLocationDialog } from "./PropertyLocationDialog";
import { PropertyDocumentsDialog } from "./PropertyDocumentsDialog";
import { PropertyDetailsDialog } from "./PropertyDetailsDialog";
import { Property } from "@/types";

interface DeveloperPropertiesTableProps {
  data: Property[];
}

export const DeveloperPropertiesTable = ({ data }: DeveloperPropertiesTableProps) => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [showDocumentsDialog, setShowDocumentsDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const toggleFavorite = (parcelId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(parcelId)
        ? prev.filter(id => id !== parcelId)
        : [...prev, parcelId];
      
      toast({
        title: prev.includes(parcelId) ? "Retiré des favoris" : "Ajouté aux favoris",
        description: prev.includes(parcelId) 
          ? "Le bien a été retiré de vos favoris"
          : "Le bien a été ajouté à vos favoris",
      });
      
      return newFavorites;
    });
  };

  const showDetails = (property: Property) => {
    setSelectedProperty(property);
    setShowDetailsDialog(true);
  };

  const showHistory = (parcelId: string) => {
    toast({
      title: "Historique",
      description: "Affichage de l'historique en cours...",
    });
  };

  const handleDownload = (parcel: Property) => {
    toast({
      title: "Téléchargement en cours",
      description: "La fiche du bien va être téléchargée",
    });
  };

  const showDocuments = (property: Property) => {
    setSelectedProperty(property);
    setShowDocumentsDialog(true);
  };

  const showLocation = (property: Property) => {
    setSelectedProperty(property);
    setShowLocationDialog(true);
  };

  return (
    <>
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
            {data.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.title}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 text-primary hover:text-primary"
                    onClick={() => showLocation(property)}
                  >
                    <MapPin className="h-4 w-4" />
                    {property.description}
                  </Button>
                </TableCell>
                <TableCell>{property.surface_area.toLocaleString()} m²</TableCell>
                <TableCell>{formatCurrency(property.price)} DHS</TableCell>
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
                  <Badge
                    variant={property.fiscal_status === "compliant" ? "success" : "destructive"}
                  >
                    {property.fiscal_status === "compliant" ? "Payé" : "Impayé"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => showDetails(property)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <PropertyChat propertyId={property.id} propertyTitle={property.title} />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => toggleFavorite(property.id)}
                    >
                      <Star 
                        className={`h-4 w-4 ${favorites.includes(property.id) ? "fill-yellow-400" : ""}`} 
                      />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => showHistory(property.id)}>
                      <BarChart2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDownload(property)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => showDocuments(property)}>
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedProperty && (
        <>
          <PropertyLocationDialog
            property={selectedProperty}
            open={showLocationDialog}
            onOpenChange={setShowLocationDialog}
          />
          <PropertyDocumentsDialog
            property={selectedProperty}
            open={showDocumentsDialog}
            onOpenChange={setShowDocumentsDialog}
          />
          <PropertyDetailsDialog
            property={selectedProperty}
            open={showDetailsDialog}
            onOpenChange={setShowDetailsDialog}
          />
        </>
      )}
    </>
  );
};