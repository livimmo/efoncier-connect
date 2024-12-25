import { Parcel } from "@/utils/mockData/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PropertyStatusIndicator } from "../filters/PropertyStatusIndicator";
import { Building2, MapPin, Scale, FileCheck, Info, AlertTriangle, Check, Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { ZONING_TYPES } from "../filters/constants";
import { PriceDistributionChart } from "./PriceDistributionChart";
import { Badge } from "@/components/ui/badge";
import { RegisterDialog } from "@/components/auth/RegisterDialog";

interface MinimizedParcelInfoProps {
  parcel: Parcel;
}

export const MinimizedParcelInfo = ({ parcel }: MinimizedParcelInfoProps) => {
  const [priceRange, setPriceRange] = useState([1200, 1800]);
  const maxPrice = 2500;
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const getTNBStatusConfig = (status: string) => {
    switch (status) {
      case 'PAID':
        return {
          label: "TNB payée",
          color: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
          icon: Check
        };
      case 'OVERDUE':
        return {
          label: "TNB en retard",
          color: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
          icon: AlertTriangle
        };
      default:
        return {
          label: "TNB en traitement",
          color: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
          icon: Clock
        };
    }
  };

  const tnbStatus = getTNBStatusConfig(parcel.taxStatus);
  const TNBIcon = tnbStatus.icon;

  // Données mockées pour la distribution des prix
  const priceDistribution = [
    { range: "1200-1500 DH", percentage: 60, price: 1350 },
    { range: "1500-1800 DH", percentage: 30, price: 1650 },
    { range: ">1800 DH", percentage: 10, price: 1900 },
  ];

  return (
    <>
      <Card className="p-4 space-y-4 bg-background/95 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <PropertyStatusIndicator status={parcel.status} size="sm" />
            <Badge variant="outline" className="text-xs">
              15 biens similaires analysés
            </Badge>
          </div>
          
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{parcel.surface} m²</p>
                <p className="text-xs text-muted-foreground">Superficie</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <p className="text-xs text-muted-foreground">Prix moyen au m² (DH)</p>
                <Info className="h-3 w-3 text-muted-foreground" />
              </div>
              <Slider
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                max={maxPrice}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{priceRange[0].toLocaleString()} DH/m²</span>
                <span>{priceRange[1].toLocaleString()} DH/m²</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <div className="w-full">
                <Select value={parcel.zone} disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner un zonage" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ZONING_TYPES).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Zonage</p>
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
              <FileCheck className="w-4 h-4 text-muted-foreground" />
              <div className="w-full">
                <Badge 
                  variant="secondary"
                  className={`${tnbStatus.color} mb-2`}
                >
                  <TNBIcon className="w-3 h-3 mr-1" />
                  {tnbStatus.label}
                </Badge>
                <p className="text-xs text-muted-foreground">Statut fiscal</p>
              </div>
            </div>
          </div>

          <PriceDistributionChart data={priceDistribution} />

          <p className="text-xs text-muted-foreground text-center">
            Cette estimation est basée sur une analyse des biens similaires disponibles dans un rayon de 1 km
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            variant="destructive"
            className="w-full"
            onClick={() => setIsRegisterOpen(true)}
          >
            Payer la TNB
          </Button>
          <Button 
            className="w-full"
            onClick={() => setIsRegisterOpen(true)}
          >
            Créer un Compte Promoteur
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Inscrivez-vous pour accéder aux documents officiels et contacter le propriétaire
          </p>
        </div>
      </Card>

      <RegisterDialog 
        open={isRegisterOpen} 
        onOpenChange={setIsRegisterOpen}
      />
    </>
  );
};