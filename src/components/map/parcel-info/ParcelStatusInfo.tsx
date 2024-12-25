import { Badge } from "@/components/ui/badge";
import { Check, X, AlertTriangle, Clock } from "lucide-react";

interface ParcelStatusInfoProps {
  status: string;
  fiscalStatus: string;
  taxStatus: string;
}

export const ParcelStatusInfo = ({ status, fiscalStatus, taxStatus }: ParcelStatusInfoProps) => {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return {
          color: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
          text: 'Disponible',
          icon: Check
        };
      case 'SOLD':
        return {
          color: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
          text: 'Vendu',
          icon: X
        };
      case 'IN_TRANSACTION':
        return {
          color: 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20',
          text: 'En Transaction',
          icon: Clock
        };
      default:
        return {
          color: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
          text: 'Indisponible',
          icon: AlertTriangle
        };
    }
  };

  const getPaymentStatusInfo = (status: string) => {
    switch (status) {
      case 'PAID':
        return {
          color: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
          text: 'TNB Payée',
          icon: Check
        };
      case 'OVERDUE':
        return {
          color: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
          text: 'TNB En retard',
          icon: X
        };
      default:
        return {
          color: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
          text: 'TNB En attente',
          icon: Clock
        };
    }
  };

  const statusInfo = getStatusInfo(status);
  const paymentInfo = getPaymentStatusInfo(taxStatus);
  const StatusIcon = statusInfo.icon;
  const PaymentIcon = paymentInfo.icon;

  return (
    <div className="flex gap-2 items-center">
      <Badge 
        variant="secondary"
        className={statusInfo.color}
      >
        <StatusIcon className="w-3 h-3 mr-1" />
        {statusInfo.text}
      </Badge>
      <Badge 
        variant="secondary" 
        className={paymentInfo.color}
      >
        <PaymentIcon className="w-3 h-3 mr-1" />
        {paymentInfo.text}
      </Badge>
    </div>
  );
};