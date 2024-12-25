import { Parcel } from "@/utils/mockData/types";
import { UserRole } from "@/types/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/utils/format";
import { MapPin, User, Ruler, CreditCard, FileText, Building, Lock } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { useState } from "react";

export interface ParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  className?: string;
  userRole?: UserRole;
}

export const ParcelInfo = ({ parcel, onClose, className, userRole }: ParcelInfoProps) => {
  const { profile } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const isAuthenticated = !!profile;

  const handleLoginClick = () => {
    setLoginOpen(true);
    onClose(); // Ferme la fenêtre d'info quand on ouvre la connexion
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return <Badge variant="success">Disponible</Badge>;
      case "SOLD":
        return <Badge variant="destructive">Vendu</Badge>;
      case "IN_TRANSACTION":
        return <Badge variant="warning">En Transaction</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getFiscalStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLIANT":
        return <Badge variant="success">En règle</Badge>;
      case "NON_COMPLIANT":
        return <Badge variant="destructive">Non conforme</Badge>;
      case "UNDER_REVIEW":
        return <Badge variant="warning">En révision</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <>
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      <Card className={`overflow-hidden animate-fade-in ${className}`}>
        <ScrollArea className="h-[calc(100vh-200px)] px-6 py-4">
          <div className="space-y-4">
            {/* En-tête */}
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{parcel.title}</h3>
                <div className="flex gap-2">
                  {getStatusBadge(parcel.status)}
                  {getFiscalStatusBadge(parcel.fiscalStatus)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground relative">
                {isAuthenticated ? (
                  `Référence: ${parcel.titleDeedNumber}`
                ) : (
                  <>
                    <span className="blur-sm select-none">Référence: {parcel.titleDeedNumber}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity"
                      onClick={handleLoginClick}
                    >
                      <Lock className="w-4 h-4" />
                      Connectez-vous pour voir
                    </Button>
                  </>
                )}
              </p>
            </div>

            {/* Informations principales */}
            <div className="grid gap-4">
              <div className="flex items-center gap-2 relative">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                {isAuthenticated ? (
                  <span className="text-sm">{parcel.address}</span>
                ) : (
                  <>
                    <span className="text-sm blur-sm select-none">{parcel.address}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity"
                      onClick={handleLoginClick}
                    >
                      <Lock className="w-4 h-4" />
                      Connectez-vous pour voir
                    </Button>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-2 relative">
                <User className="w-4 h-4 text-muted-foreground" />
                {isAuthenticated ? (
                  <span className="text-sm">{parcel.ownerName}</span>
                ) : (
                  <>
                    <span className="text-sm blur-sm select-none">{parcel.ownerName}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity"
                      onClick={handleLoginClick}
                    >
                      <Lock className="w-4 h-4" />
                      Connectez-vous pour voir
                    </Button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{parcel.surface} m²</span>
              </div>

              {parcel.price && (
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-green-600">
                    Prix de vente: {formatCurrency(parcel.price)} DHS
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Statut Fiscal: {parcel.taxStatus}</span>
              </div>

              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Type: {parcel.type}</span>
              </div>
            </div>

            {/* Actions */}
            {!isAuthenticated && (
              <div className="pt-4 border-t">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={handleLoginClick}
                >
                  Se connecter pour voir plus de détails
                </Button>
              </div>
            )}

            {isAuthenticated && (
              <div className="space-y-3 pt-4 border-t">
                {userRole === "owner" && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => console.log("Contact Owner")}
                  >
                    Contacter le Propriétaire
                  </Button>
                )}
                
                {userRole === "developer" && (
                  <Button 
                    variant="default"
                    className="w-full"
                    onClick={() => console.log("View Details")}
                  >
                    Voir les détails complets
                  </Button>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>
    </>
  );
};