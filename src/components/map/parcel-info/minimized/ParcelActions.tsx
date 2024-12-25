import { Button } from "@/components/ui/button";
import { UserPlus, MessageSquare } from "lucide-react";
import { Parcel } from "@/utils/mockData/types";
import { UserRole } from "@/types/auth";

interface ParcelActionsProps {
  parcel: Parcel;
  userRole?: UserRole;
  onPaymentClick: () => void;
  onDialogOpen: () => void;
  onRegisterOpen: () => void;
  onContactClick?: () => void;
}

export const ParcelActions = ({
  parcel,
  userRole,
  onPaymentClick,
  onDialogOpen,
  onRegisterOpen,
  onContactClick,
}: ParcelActionsProps) => {
  if (!userRole) {
    return parcel.status === 'AVAILABLE' ? (
      <Button
        size="sm"
        onClick={onRegisterOpen}
        className="bg-primary hover:bg-primary/90"
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Créer un compte promoteur
      </Button>
    ) : null;
  }

  if (userRole === "owner") {
    return (
      <div className="flex flex-col gap-2">
        <Button 
          variant={parcel.taxStatus === 'PAID' ? 'default' : 'destructive'}
          size="sm"
          onClick={onPaymentClick}
          className={parcel.taxStatus === 'PAID' ? 'bg-green-600 hover:bg-green-700' : ''}
        >
          {parcel.taxStatus === 'PAID' ? 'Reçu' : 'Payer la TNB'}
        </Button>
        {onContactClick && (
          <Button 
            variant="default" 
            size="sm"
            onClick={onContactClick}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Contacter le Promoteur
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button 
        variant={parcel.taxStatus === 'PAID' ? 'default' : 'destructive'}
        size="sm"
        onClick={onPaymentClick}
        className={parcel.taxStatus === 'PAID' ? 'bg-green-600 hover:bg-green-700' : ''}
      >
        {parcel.taxStatus === 'PAID' ? 'Reçu' : 'Payer la TNB'}
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onDialogOpen}
      >
        Voir détails
      </Button>
    </div>
  );
};