import { Badge } from "@/components/ui/badge";

interface ParcelStatusBadgesProps {
  status: string;
  fiscalStatus: string;
  taxStatus: string;
}

export const ParcelStatusBadges = ({ status, taxStatus }: ParcelStatusBadgesProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return <Badge variant="success">Disponible</Badge>;
      case "SOLD":
        return <Badge variant="destructive">Vendu</Badge>;
      case "IN_TRANSACTION":
        return <Badge variant="warning">En Transaction</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTaxStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge variant="success">TNB Payée</Badge>;
      case "OVERDUE":
        return <Badge variant="destructive">TNB En retard</Badge>;
      case "PENDING":
        return <Badge variant="warning">TNB En attente</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="flex gap-2">
      {getStatusBadge(status)}
      {getTaxStatusBadge(taxStatus)}
    </div>
  );
};