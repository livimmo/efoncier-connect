import { Parcel } from "@/utils/mockData/types";
import { UserRole } from "@/types/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/utils/format";
import { MapPin, User, Ruler, CreditCard, FileText, Building } from "lucide-react";

export interface ParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  className?: string;
  userRole?: UserRole;
}

export const ParcelInfo = ({ parcel, onClose, className, userRole }: ParcelInfoProps) => {
  return (
    <Card className={`overflow-hidden animate-fade-in ${className}`}>
      <ScrollArea className="h-[calc(100vh-200px)] px-6 py-4">
        <div className="space-y-6">
          {/* En-tête */}
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">{parcel.title}</h3>
              <Badge variant="outline" className="ml-2">
                {parcel.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Référence: {parcel.titleDeedNumber}
            </p>
          </div>

          {/* Informations principales */}
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{parcel.address}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{parcel.ownerName}</span>
            </div>

            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{parcel.surface} m²</span>
            </div>

            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{formatCurrency(parcel.price)} DHS</span>
            </div>

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
        </div>
      </ScrollArea>
    </Card>
  );
};