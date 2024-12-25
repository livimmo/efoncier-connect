import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PropertyStatusIndicator } from "@/components/map/filters/PropertyStatusIndicator";
import { formatCurrency } from "@/utils/format";
import { Property } from "@/types";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { RegisterDialog } from "@/components/auth/RegisterDialog";
import { Eye, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeveloperPropertiesTableProps {
  data: Property[];
}

export function DeveloperPropertiesTable({ data }: DeveloperPropertiesTableProps) {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);

  const handleViewDetails = (propertyId: string) => {
    if (!profile) {
      setShowLoginDialog(true);
      return;
    }
    navigate(`/properties/${propertyId}`);
  };

  const maskText = (text: string) => {
    if (!profile) {
      return text.slice(0, 3) + "•".repeat(text.length - 3);
    }
    return text;
  };

  const maskLocation = (city: string, address: string) => {
    if (!profile) {
      return `${city} (Localisation exacte masquée)`;
    }
    return `${city}, ${address}`;
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeader>Titre Foncier</TableHeader>
              <TableHeader>Localisation</TableHeader>
              <TableHeader>Surface</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Statut</TableHeader>
              <TableHeader>Prix/m²</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {maskText(property.titleDeedNumber)}
                    {!profile && <Lock className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </TableCell>
                <TableCell>
                  {maskLocation(property.city, property.address)}
                </TableCell>
                <TableCell>{property.surface_area} m²</TableCell>
                <TableCell>{property.property_type}</TableCell>
                <TableCell>
                  <PropertyStatusIndicator 
                    status={property.status} 
                    tnbStatus={property.taxStatus}
                  />
                </TableCell>
                <TableCell>
                  {formatCurrency(property.price)} DH/m²
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(property.id)}
                    className={cn(
                      "flex items-center gap-2",
                      !profile && "text-primary hover:text-primary"
                    )}
                  >
                    {profile ? (
                      <>
                        <Eye className="h-4 w-4" />
                        Détails
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        S'inscrire pour voir
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {!profile && (
          <div className="p-4 bg-primary/5 border-t">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Inscrivez-vous en tant que Promoteur pour accéder aux informations complètes
                et à la localisation exacte des biens.
              </p>
              <Button
                onClick={() => setShowRegisterDialog(true)}
                className="bg-primary hover:bg-primary/90"
              >
                Créer un Compte Promoteur
              </Button>
            </div>
          </div>
        )}
      </div>

      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog} 
      />
      
      <RegisterDialog
        open={showRegisterDialog}
        onOpenChange={setShowRegisterDialog}
      />
    </>
  );
}