import { Parcel } from "@/utils/mockData/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PropertyStatusIndicator } from "../filters/PropertyStatusIndicator";
import { useNavigate } from "react-router-dom";

interface MinimizedParcelInfoProps {
  parcel: Parcel;
}

export const MinimizedParcelInfo = ({ parcel }: MinimizedParcelInfoProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-4 space-y-4 bg-background/95 backdrop-blur-sm">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <PropertyStatusIndicator status={parcel.status} size="sm" />
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Superficie</p>
            <p className="font-medium">{parcel.surface} m²</p>
          </div>
          <div>
            <p className="text-muted-foreground">Zone</p>
            <p className="font-medium">{parcel.zone}</p>
          </div>
        </div>
      </div>

      <Button 
        className="w-full"
        onClick={() => navigate("/register")}
      >
        Créer un Compte Promoteur pour Débloquer les Informations Complètes
      </Button>
    </Card>
  );
};