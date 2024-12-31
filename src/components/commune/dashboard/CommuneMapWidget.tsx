import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Maximize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CommuneMapWidget = () => {
  const navigate = useNavigate();

  return (
    <Card className="col-span-2">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Carte des Biens</h3>
            <p className="text-sm text-muted-foreground">Vue d'ensemble des biens de la commune</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/commune/properties")}
          >
            <Maximize2 className="h-4 w-4 mr-2" />
            Voir en plein écran
          </Button>
        </div>
        
        <div className="relative h-[300px] bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Carte en cours de chargement...</p>
          </div>
        </div>
      </div>
    </Card>
  );
};