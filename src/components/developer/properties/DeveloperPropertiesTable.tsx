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
import { mockParcels } from "@/utils/mockData/parcels";
import { formatCurrency } from "@/utils/format";
import { PropertyChat } from "@/components/chat/PropertyChat";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { PropertyLocationDialog } from "./PropertyLocationDialog";
import { PropertyDocumentsDialog } from "./PropertyDocumentsDialog";
import { Property } from "@/types";

export const DeveloperPropertiesTable = () => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [showDocumentsDialog, setShowDocumentsDialog] = useState(false);

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

  const showDetails = (parcelId: string) => {
    toast({
      title: "Détails du bien",
      description: "Affichage des détails en cours...",
    });
  };

  const showHistory = (parcelId: string) => {
    toast({
      title: "Historique",
      description: "Affichage de l'historique en cours...",
    });
  };

  const handleDownload = (parcel: any) => {
    // Simuler le téléchargement d'un fichier
    toast({
      title: "Téléchargement en cours",
      description: "La fiche du bien va être téléchargée",
    });
  };

  const showDocuments = (parcel: any) => {
    const property: Property = {
      id: parcel.id,
      title: parcel.titleDeedNumber,
      description: parcel.address,
      property_type: parcel.type.toLowerCase(),
      surface_area: parcel.surface,
      location: parcel.location,
      fiscal_status: "under_review",
      status: "pending",
      is_for_sale: false,
      price: parcel.tnbInfo.pricePerMeter * parcel.surface,
      owner_id: parcel.owner,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setSelectedProperty(property);
    setShowDocumentsDialog(true);
  };

  const showLocation = (parcel: any) => {
    const property: Property = {
      id: parcel.id,
      title: parcel.titleDeedNumber,
      description: parcel.address,
      property_type: parcel.type.toLowerCase(),
      surface_area: parcel.surface,
      location: parcel.location,
      fiscal_status: "under_review",
      status: "pending",
      is_for_sale: false,
      price: parcel.tnbInfo.pricePerMeter * parcel.surface,
      owner_id: parcel.owner,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
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
            {mockParcels.map((parcel) => (
              <TableRow key={parcel.id}>
                <TableCell className="font-medium">{parcel.titleDeedNumber}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 text-primary hover:text-primary"
                    onClick={() => showLocation(parcel)}
                  >
                    <MapPin className="h-4 w-4" />
                    {parcel.address}
                  </Button>
                </TableCell>
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
                    <Button variant="outline" size="icon" onClick={() => showDetails(parcel.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <PropertyChat propertyId={parcel.id} propertyTitle={parcel.titleDeedNumber} />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => toggleFavorite(parcel.id)}
                    >
                      <Star 
                        className={`h-4 w-4 ${favorites.includes(parcel.id) ? "fill-yellow-400" : ""}`} 
                      />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => showHistory(parcel.id)}>
                      <BarChart2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDownload(parcel)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => showDocuments(parcel)}>
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
        </>
      )}
    </>
  );
};