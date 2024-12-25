import { Parcel } from "@/utils/mockData/types";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/format";

interface PropertyActionsProps {
  parcel: Parcel;
  profile: any;
  paymentStatus: {
    buttonVariant: "default" | "destructive";
    buttonText: string;
    buttonClass: string;
  };
  onRegisterClick: () => void;
  onPaymentClick: () => void;
  onDetailsClick: () => void;
}

export const PropertyActions = ({
  parcel,
  profile,
  paymentStatus,
  onRegisterClick,
  onPaymentClick,
  onDetailsClick
}: PropertyActionsProps) => {
  return (
    <div className="text-right shrink-0">
      <div className="text-sm font-semibold whitespace-nowrap">
        {formatCurrency(parcel.tnbInfo.totalAmount)} DHS
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {profile ? (
          <>
            <Button 
              variant={paymentStatus.buttonVariant}
              size="sm"
              onClick={onPaymentClick}
              className={`w-full ${paymentStatus.buttonClass}`}
            >
              {paymentStatus.buttonText}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onDetailsClick}
            >
              Voir détails
            </Button>
          </>
        ) : (
          parcel.status === 'AVAILABLE' && (
            <>
              <Button
                size="sm"
                onClick={onRegisterClick}
                className="bg-primary hover:bg-primary/90"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Créer un compte promoteur
              </Button>
              <Badge 
                variant="secondary" 
                className="mt-2 py-2 text-base font-semibold bg-background border-2 border-secondary text-secondary"
              >
                {formatCurrency(parcel.price)} DHS
              </Badge>
            </>
          )
        )}
      </div>
    </div>
  );
};