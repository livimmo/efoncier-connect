import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MapPin, MessageSquare, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { formatCurrency } from "@/utils/format";
import { PropertyChat } from "@/components/chat/PropertyChat";
import { DocumentsDialog } from "./DocumentsDialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PropertyLocationMap } from "./PropertyLocationMap";
import type { Parcel } from "@/utils/mockData/types";

interface DeveloperPropertiesTableProps {
  data: Parcel[];
}

export const DeveloperPropertiesTable = ({ data }: DeveloperPropertiesTableProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useAuth();
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  const handleViewDetails = (parcelId: string) => {
    navigate(`/property/${parcelId}`);
  };

  const handleViewOnMap = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setLocationOpen(true);
  };

  const handleViewDocuments = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setDocumentsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return <Badge variant="success" className="inline-flex items-center">🟢 <span className="ml-1">Disponible</span></Badge>;
      case 'UNAVAILABLE':
        return <Badge variant="destructive" className="inline-flex items-center">🔴 <span className="ml-1">Indisponible</span></Badge>;
      case 'IN_TRANSACTION':
        return <Badge variant="warning" className="inline-flex items-center">🟡 <span className="ml-1">En Transaction</span></Badge>;
      default:
        return null;
    }
  };

  const getFiscalStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLIANT':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 inline-flex items-center">✅ <span className="ml-1">Payé</span></Badge>;
      case 'NON_COMPLIANT':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 inline-flex items-center">❌ <span className="ml-1">Impayé</span></Badge>;
      case 'UNDER_REVIEW':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 inline-flex items-center">⏳ <span className="ml-1">En révision</span></Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      {selectedParcel && (
        <>
          <Dialog open={locationOpen} onOpenChange={setLocationOpen}>
            <DialogContent className="max-w-3xl">
              <PropertyLocationMap parcel={selectedParcel} />
            </DialogContent>
          </Dialog>

          <DocumentsDialog
            open={documentsOpen}
            onOpenChange={setDocumentsOpen}
            parcelId={selectedParcel.id}
          />
        </>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Statut</TableHead>
              <TableHead>Titre Foncier</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Surface</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Prix TNB</TableHead>
              <TableHead>Statut Fiscal</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((parcel) => (
              <TableRow key={parcel.id}>
                <TableCell>{getStatusBadge(parcel.status)}</TableCell>
                <TableCell>{parcel.titleDeedNumber}</TableCell>
                <TableCell>
                  {parcel.city}, {parcel.address}
                </TableCell>
                <TableCell>{parcel.surface} m²</TableCell>
                <TableCell>{parcel.type}</TableCell>
                <TableCell>{formatCurrency(parcel.tnbInfo.totalAmount)} DHS</TableCell>
                <TableCell>{getFiscalStatusBadge(parcel.fiscalStatus)}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleViewDetails(parcel.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleViewOnMap(parcel)}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleViewDocuments(parcel)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <PropertyChat
                      propertyId={parcel.id}
                      propertyTitle={parcel.title}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
