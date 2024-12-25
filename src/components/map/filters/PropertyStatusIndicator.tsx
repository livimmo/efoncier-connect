import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, X } from "lucide-react";

interface PropertyStatusIndicatorProps {
  status: string;
  tnbStatus?: string;
  showIcon?: boolean;
  size?: "sm" | "default";
}

export const PropertyStatusIndicator = ({ 
  status, 
  tnbStatus,
  showIcon = true,
  size = "default" 
}: PropertyStatusIndicatorProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return {
          label: "Disponible",
          color: "bg-green-500 text-white hover:bg-green-600",
          icon: Check
        };
      case 'IN_TRANSACTION':
        return {
          label: "En Transaction",
          color: "bg-orange-500 text-white hover:bg-orange-600",
          icon: AlertTriangle
        };
      case 'SOLD':
        return {
          label: "Vendu",
          color: "bg-red-500 text-white hover:bg-red-600",
          icon: X
        };
      default:
        return {
          label: "Indisponible",
          color: "bg-gray-500 text-white hover:bg-gray-600",
          icon: AlertTriangle
        };
    }
  };

  const getTNBStatusConfig = (status: string) => {
    switch (status) {
      case 'PAID':
        return {
          color: "text-green-500"
        };
      case 'PENDING':
        return {
          color: "text-orange-500"
        };
      case 'UNPAID':
        return {
          color: "text-red-500"
        };
      default:
        return null;
    }
  };

  const config = getStatusConfig(status);
  const tnbConfig = tnbStatus ? getTNBStatusConfig(tnbStatus) : null;
  const Icon = config.icon;

  return (
    <Badge 
      variant="secondary"
      className={`${config.color} ${size === "sm" ? "text-xs py-0" : ""}`}
    >
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {config.label}
      {tnbConfig && (
        <span className={`ml-1 ${tnbConfig.color}`}>•</span>
      )}
    </Badge>
  );
};