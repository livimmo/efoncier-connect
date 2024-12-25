import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, MapPin, Download } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GoogleMap } from "@/components/map/GoogleMap";
import type { Parcel } from "@/utils/mockData/types";
import { PropertyDocuments } from "@/components/map/property-popup/PropertyDocuments";

interface DeveloperPropertiesTableProps {
  data: Parcel[];
}

export const DeveloperPropertiesTable = ({ data }: DeveloperPropertiesTableProps) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showDocuments, setShowDocuments] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);

  const handleLocationClick = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
  };

  const handleDocumentsClick = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setShowDocuments(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre Foncier</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Surface (m²)</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((parcel) => (
            <TableRow key={parcel.id}>
              <TableCell>{parcel.titleDeedNumber}</TableCell>
              <TableCell>{parcel.address}</TableCell>
              <TableCell>{parcel.surface}</TableCell>
              <TableCell>{parcel.type}</TableCell>
              <TableCell>{parcel.status}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLocationClick(parcel.location)}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Localisation
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDocumentsClick(parcel)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog pour la carte */}
      <Dialog open={!!selectedLocation} onOpenChange={() => setSelectedLocation(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Localisation du Bien</DialogTitle>
          </DialogHeader>
          <div className="h-[400px] relative">
            {selectedLocation && (
              <GoogleMap
                parcels={[]}
                onMarkerClick={() => {}}
                theme="light"
                setMapInstance={() => {}}
                center={selectedLocation}
                zoom={15}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog pour les documents */}
      <Dialog open={showDocuments} onOpenChange={setShowDocuments}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Documents du Bien</DialogTitle>
          </DialogHeader>
          {selectedParcel && <PropertyDocuments parcel={selectedParcel} />}
        </DialogContent>
      </Dialog>
    </>
  );
};