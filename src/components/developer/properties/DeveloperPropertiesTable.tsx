import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MapPin, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { RegisterDialog } from "@/components/auth/RegisterDialog";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { formatCurrency } from "@/utils/format";
import type { Parcel } from "@/utils/mockData/types";

interface DeveloperPropertiesTableProps {
  data: Parcel[];
}

export const DeveloperPropertiesTable = ({ data }: DeveloperPropertiesTableProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useAuth();
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleViewDetails = (parcelId: string) => {
    if (!profile) {
      setRegisterOpen(true);
      return;
    }
    navigate(`/property/${parcelId}`);
  };

  const handleViewOnMap = (parcelId: string) => {
    if (!profile) {
      setRegisterOpen(true);
      return;
    }
    navigate(`/map?parcel=${parcelId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return <Badge variant="success" className="whitespace-nowrap">🟢 Disponible</Badge>;
      case 'UNAVAILABLE':
        return <Badge variant="destructive" className="whitespace-nowrap">🔴 Indisponible</Badge>;
      case 'IN_TRANSACTION':
        return <Badge variant="warning" className="whitespace-nowrap">🟡 En Transaction</Badge>;
      default:
        return null;
    }
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <RegisterDialog open={registerOpen} onOpenChange={setRegisterOpen} />
      
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((parcel) => (
              <TableRow key={parcel.id}>
                <TableCell>{getStatusBadge(parcel.status)}</TableCell>
                <TableCell>
                  {profile ? parcel.titleDeedNumber : 'XX-XXXXX'}
                </TableCell>
                <TableCell>
                  {profile ? parcel.address : `${parcel.city} (Connectez-vous pour plus de détails)`}
                </TableCell>
                <TableCell>{parcel.surface} m²</TableCell>
                <TableCell>{parcel.type}</TableCell>
                <TableCell>{formatCurrency(parcel.tnbInfo.totalAmount)} DHS</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    {profile ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(parcel.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewOnMap(parcel.id)}
                        >
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      parcel.status === 'AVAILABLE' && (
                        <Button
                          size="sm"
                          onClick={() => setRegisterOpen(true)}
                          className="gap-2"
                        >
                          <UserPlus className="h-4 w-4" />
                          Créer un compte investisseur
                        </Button>
                      )
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Aucun bien trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};