import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, X } from "lucide-react";

interface PropertyStatusIndicatorProps {
  status: 'AVAILABLE' | 'IN_TRANSACTION' | 'SOLD';
  size?: 'sm' | 'default';
}

export const PropertyStatusIndicator = ({ status, size = 'default' }: PropertyStatusIndicatorProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return {
          color: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
          icon: Check,
          text: 'Disponible'
        };
      case 'IN_TRANSACTION':
        return {
          color: 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20',
          icon: AlertTriangle,
          text: 'En Transaction'
        };
      case 'SOLD':
        return {
          color: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
          icon: X,
          text: 'Vendu'
        };
      default:
        return {
          color: 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20',
          icon: AlertTriangle,
          text: 'Indisponible'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Badge 
      variant="secondary"
      className={`${config.color} ${size === 'sm' ? 'text-xs py-0' : ''}`}
    >
      <Icon className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} mr-1`} />
      {config.text}
    </Badge>
  );
};