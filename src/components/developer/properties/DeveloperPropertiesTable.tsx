import { Button } from "@/components/ui/button";
import { FileText, MapPin, Download, MessageSquare, Search } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import GoogleMap from "@/components/map/GoogleMap";
import type { Parcel } from "@/utils/mockData/types";
import { PropertyDocuments } from "@/components/map/property-popup/PropertyDocuments";
import { PropertyChat } from "@/components/chat/PropertyChat";
import { DownloadPropertyDialog } from "./DownloadPropertyDialog";

const DeveloperPropertiesTable = ({ data }: { data: Parcel[] }) => {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleParcelSelect = (parcel: Parcel) => {
    setSelectedParcel(parcel);
  };

  return (
    <div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Titre Foncier</th>
            <th className="px-4 py-2">Adresse</th>
            <th className="px-4 py-2">Superficie</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(parcel => (
            <tr key={parcel.id}>
              <td className="border px-4 py-2">{parcel.titleDeedNumber}</td>
              <td className="border px-4 py-2">{parcel.address}</td>
              <td className="border px-4 py-2">{parcel.surface} m²</td>
              <td className="border px-4 py-2">
                <Button onClick={() => handleParcelSelect(parcel)}>
                  <MapPin className="mr-2" /> Voir sur la carte
                </Button>
                <Button onClick={() => setIsDownloadDialogOpen(true)}>
                  <Download className="mr-2" /> Télécharger
                </Button>
                <Button onClick={() => setIsChatOpen(true)}>
                  <MessageSquare className="mr-2" /> Chat
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedParcel && (
        <GoogleMap
          onMarkerClick={(parcel) => handleParcelSelect(parcel)}
          parcels={[selectedParcel]}
          theme="light"
          setMapInstance={() => {}}
        />
      )}

      <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Télécharger les documents</DialogTitle>
          </DialogHeader>
          <PropertyDocuments parcel={selectedParcel} />
        </DialogContent>
      </Dialog>

      {isChatOpen && (
        <PropertyChat parcel={selectedParcel} onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  );
};

export default DeveloperPropertiesTable;
