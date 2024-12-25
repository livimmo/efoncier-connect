import { Parcel } from "@/utils/mockData/types";
import { UserRole } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Receipt, MessageSquare } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

export interface ParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  className?: string;
  userRole?: UserRole;
}

export const ParcelInfo = ({ parcel, onClose, className, userRole }: ParcelInfoProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Payé</Badge>;
      case 'OVERDUE':
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">En retard</Badge>;
      default:
        return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">En attente</Badge>;
    }
  };

  return (
    <div className={`flex flex-col bg-black/95 text-white p-6 rounded-lg ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">{parcel.title}</h2>
          <p className="text-gray-400">{parcel.address}</p>
        </div>

        {/* Main Info Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-gray-400 text-sm">N° Titre Foncier</p>
              <p className="font-medium">{parcel.titleDeedNumber}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Propriétaire</p>
              <p className="font-medium">{parcel.ownerName}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Surface</p>
              <p className="font-medium">{parcel.surface} m²</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Type</p>
              <p className="font-medium">{parcel.type}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Zone</p>
              <p className="font-medium">{parcel.zone}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Statut</p>
              <div className="mt-1">
                {getStatusBadge(parcel.taxStatus)}
              </div>
            </div>
          </div>

          {/* TNB Information */}
          <div className="pt-4 border-t border-gray-800">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Prix TNB</span>
                <span className="text-green-500 font-medium">
                  {formatCurrency(parcel.tnbInfo.pricePerMeter)} DHS/m²
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Total TNB Annuel</span>
                <span className="font-medium">
                  {formatCurrency(parcel.tnbInfo.totalAmount)} DHS
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-right mt-2">
              Dernière mise à jour : {format(new Date(parcel.tnbInfo.lastUpdate), 'd MMMM yyyy', { locale: fr })}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button 
            className="flex-1 bg-red-600 hover:bg-red-700"
            onClick={() => console.log("Download receipt")}
          >
            <Receipt className="w-5 h-5 mr-2" />
            Reçu
          </Button>
          <Button 
            variant="outline"
            className="flex-1 border-gray-700 hover:bg-gray-800"
            onClick={() => console.log("Contact")}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Contacter
          </Button>
        </div>
      </div>
    </div>
  );
};