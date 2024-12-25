import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, MapPin, Download, MessageSquare, Search } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GoogleMap } from "@/components/map/GoogleMap";
import type { Parcel } from "@/utils/mockData/types";
import { PropertyDocuments } from "@/components/map/property-popup/PropertyDocuments";
import { PropertyChat } from "@/components/chat/PropertyChat";
import { DownloadPropertyDialog } from "./DownloadPropertyDialog";
import { Input } from "@/components/ui/input";

interface DeveloperPropertiesTableProps {
  data: Parcel[];
}

export const DeveloperPropertiesTable = ({ data }: DeveloperPropertiesTableProps) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLocationClick = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
  };

  const handleDocumentsClick = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setShowDocuments(true);
  };

  const handleDownloadClick = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setShowDownload(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return <span className="text-green-600">🟢 Disponible</span>;
      case 'UNAVAILABLE':
        return <span className="text-red-600">🔴 Indisponible</span>;
      default:
        return <span className="text-orange-600">🟡 En Transaction</span>;
    }
  };

  const filteredData = data.filter(parcel => {
    const searchLower = searchQuery.toLowerCase();
    return (
      parcel.titleDeedNumber.toLowerCase().includes(searchLower) ||
      parcel.address.toLowerCase().includes(searchLower) ||
      parcel.type.toLowerCase().includes(searchLower) ||
      parcel.status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par titre foncier, adresse, type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

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
            {filteredData.map((parcel) => (
              <TableRow key={parcel.id}>
                <TableCell>{parcel.titleDeedNumber}</TableCell>
                <TableCell>{parcel.address}</TableCell>
                <TableCell>{parcel.surface}</TableCell>
                <TableCell>{parcel.type}</TableCell>
                <TableCell>{getStatusBadge(parcel.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDocumentsClick(parcel)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Documents
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLocationClick(parcel.location)}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Localisation
                    </Button>
                    <PropertyChat 
                      propertyId={parcel.id}
                      propertyTitle={parcel.title}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadClick(parcel)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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

      {/* Dialog pour le téléchargement */}
      <DownloadPropertyDialog
        parcel={selectedParcel}
        open={showDownload}
        onOpenChange={setShowDownload}
      />
    </>
  );
};