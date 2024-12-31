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
        return <Badge variant="success" className="justify-center">Disponible</Badge>;
      case "SOLD":
        return <Badge variant="destructive" className="justify-center">Vendu</Badge>;
      case "IN_TRANSACTION":
        return <Badge variant="warning" className="justify-center">En Transaction</Badge>;
      default:
        return <Badge variant="secondary" className="justify-center">{status}</Badge>;
    }
  };

  const getTaxStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge variant="success" className="justify-center">TNB Payée</Badge>;
      case "OVERDUE":
        return <Badge variant="destructive" className="justify-center">TNB En retard</Badge>;
      case "PENDING":
        return <Badge variant="warning" className="justify-center">TNB En attente</Badge>;
      default:
        return <Badge variant="secondary" className="justify-center">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {getStatusBadge(status)}
      {getTaxStatusBadge(taxStatus)}
    </div>
  );
};