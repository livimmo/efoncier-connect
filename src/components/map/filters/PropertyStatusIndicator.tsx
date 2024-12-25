import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, X } from "lucide-react";

interface PropertyStatusIndicatorProps {
  status: string;
  showIcon?: boolean;
  size?: "sm" | "default";
}

export const PropertyStatusIndicator = ({ 
  status, 
  showIcon = true,
  size = "default" 
}: PropertyStatusIndicatorProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return {
          label: "Disponible",
          color: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
          icon: Check
        };
      case 'IN_TRANSACTION':
        return {
          label: "En Transaction",
          color: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
          icon: AlertTriangle
        };
      case 'SOLD':
        return {
          label: "Vendu",
          color: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
          icon: X
        };
      default:
        return {
          label: "Indisponible",
          color: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
          icon: AlertTriangle
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Badge 
      variant="secondary"
      className={`${config.color} ${size === "sm" ? "text-xs py-0" : ""}`}
    >
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {config.label}
    </Badge>
  );
};