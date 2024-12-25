import { Badge } from "@/components/ui/badge";
import { Check, X, AlertTriangle } from "lucide-react";

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
      default:
        return {
          color: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
          text: 'Indisponible',
          icon: AlertTriangle
        };
    }
  };

  const getFiscalStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLIANT':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'NON_COMPLIANT':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      default:
        return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20';
    }
  };

  const getPaymentStatusInfo = (status: string) => {
    switch (status) {
      case 'PAID':
        return {
          color: 'text-green-600 dark:text-green-500',
          text: 'Payé',
          buttonVariant: 'default' as const,
          buttonText: 'Reçu',
          buttonClass: 'bg-green-600 hover:bg-green-700'
        };
      case 'OVERDUE':
        return {
          color: 'text-red-600 dark:text-red-500',
          text: 'En retard',
          buttonVariant: 'destructive' as const,
          buttonText: 'Payer la TNB',
          buttonClass: ''
        };
      default:
        return {
          color: 'text-orange-600 dark:text-orange-500',
          text: 'En attente',
          buttonVariant: 'destructive' as const,
          buttonText: 'Payer la TNB',
          buttonClass: ''
        };
    }
  };

  const statusInfo = getStatusInfo(status);
  const StatusIcon = statusInfo.icon;
  const paymentStatus = getPaymentStatusInfo(taxStatus);

  return (
    <>
      <Badge 
        variant="secondary"
        className={`mb-2 ${statusInfo.color}`}
        aria-label={`Statut du bien : ${statusInfo.text}`}
      >
        <StatusIcon className="w-3 h-3 mr-1" />
        {statusInfo.text}
      </Badge>
      <Badge 
        variant="secondary" 
        className={`mt-1 w-fit ${getFiscalStatusColor(fiscalStatus)}`}
      >
        <span className={paymentStatus.color}>{paymentStatus.text}</span>
      </Badge>
    </>
  );
};