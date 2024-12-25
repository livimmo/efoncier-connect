import { Parcel } from "@/utils/mockData/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PropertyStatusIndicator } from "../filters/PropertyStatusIndicator";
import { useNavigate } from "react-router-dom";
import { Building2, MapPin, Scale } from "lucide-react";

interface MinimizedParcelInfoProps {
  parcel: Parcel;
}

export const MinimizedParcelInfo = ({ parcel }: MinimizedParcelInfoProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-4 space-y-4 bg-background/95 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <PropertyStatusIndicator status={parcel.status} size="sm" />
        </div>
        
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{parcel.surface} m²</p>
              <p className="text-xs text-muted-foreground">Superficie</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{parcel.zone}</p>
              <p className="text-xs text-muted-foreground">Zonage</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{parcel.city}</p>
              <p className="text-xs text-muted-foreground">Ville</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${parcel.taxStatus === 'PAID' ? 'bg-green-500' : parcel.taxStatus === 'PENDING' ? 'bg-yellow-500' : 'bg-red-500'}`} />
            <div>
              <p className="text-sm font-medium">
                {parcel.taxStatus === 'PAID' ? 'TNB Payée' : parcel.taxStatus === 'PENDING' ? 'TNB En attente' : 'TNB Non payée'}
              </p>
              <p className="text-xs text-muted-foreground">Statut fiscal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button 
          className="w-full"
          onClick={() => navigate("/register")}
        >
          Créer un Compte Promoteur
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Inscrivez-vous pour accéder aux documents officiels et contacter le propriétaire
        </p>
      </div>
    </Card>
  );
};