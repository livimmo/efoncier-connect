import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Parcel } from "@/utils/mockData/types";

interface ParcelActionsProps {
  parcel: Parcel;
  onPaymentClick: () => void;
  onDetailsClick: () => void;
  onRegisterClick: () => void;
  paymentStatus: {
    buttonVariant: "default" | "destructive";
    buttonText: string;
    buttonClass: string;
  };
}

export const ParcelActions = ({
  parcel,
  onPaymentClick,
  onDetailsClick,
  onRegisterClick,
  paymentStatus
}: ParcelActionsProps) => {
  const { profile } = useAuth();

  return (
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
          <Button
            size="sm"
            onClick={onRegisterClick}
            className="bg-primary hover:bg-primary/90"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Créer un compte promoteur
          </Button>
        )
      )}
    </div>
  );
};