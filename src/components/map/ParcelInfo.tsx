import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Parcel } from "@/utils/mockData/types";
import { FileText, MessageSquare, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  className?: string;
}

export const ParcelInfo = ({ parcel, onClose, className }: ParcelInfoProps) => {
  return (
    <Card className={cn("absolute top-4 right-4 w-80 p-4 space-y-4", className)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{parcel.title}</h3>
          <p className="text-sm text-muted-foreground">{parcel.address}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
        >
          ×
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">N° Titre Foncier</span>
          <span className="text-sm font-medium">{parcel.titleDeedNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Propriétaire</span>
          <span className="text-sm font-medium">{parcel.ownerName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Surface</span>
          <span className="text-sm font-medium">{parcel.surface} m²</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Type</span>
          <span className="text-sm font-medium">{parcel.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Zone</span>
          <span className="text-sm font-medium">{parcel.zone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Statut</span>
          <span className={`text-sm font-medium ${
            parcel.taxStatus === 'PAID' 
              ? 'text-green-600' 
              : parcel.taxStatus === 'OVERDUE' 
              ? 'text-red-600' 
              : 'text-orange-600'
          }`}>
            {parcel.taxStatus === 'PAID' 
              ? 'Payé' 
              : parcel.taxStatus === 'OVERDUE' 
              ? 'En retard' 
              : 'En attente'}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          className="flex-1"
          onClick={() => window.location.href = parcel.taxStatus === 'PAID' 
            ? `/receipt/${parcel.id}`
            : `/payment/${parcel.id}`
          }
        >
          {parcel.taxStatus === 'PAID' ? (
            <>
              <Receipt className="w-4 h-4 mr-2" />
              Reçu
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 mr-2" />
              Payer
            </>
          )}
        </Button>
        <Button 
          variant="outline"
          className="flex-1"
          onClick={() => window.location.href = `/contact/${parcel.owner}`}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Contacter
        </Button>
      </div>
    </Card>
  );
};