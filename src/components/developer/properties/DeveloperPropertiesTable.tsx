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
import { Eye, Star, BarChart2, Download } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { PropertyChat } from "@/components/chat/PropertyChat";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import type { Parcel } from "@/utils/mockData/types";

export interface DeveloperPropertiesTableProps {
  data: Parcel[];
}

export const DeveloperPropertiesTable = ({ data }: DeveloperPropertiesTableProps) => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);

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
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((parcel) => (
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
                <div className="flex justify-end gap-2">
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