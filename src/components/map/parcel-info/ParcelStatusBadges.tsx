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
        return <Badge variant="success" className="w-full justify-center mb-2">Disponible</Badge>;
      case "SOLD":
        return <Badge variant="destructive" className="w-full justify-center mb-2">Vendu</Badge>;
      case "IN_TRANSACTION":
        return <Badge variant="warning" className="w-full justify-center mb-2">En Transaction</Badge>;
      default:
        return <Badge variant="secondary" className="w-full justify-center mb-2">{status}</Badge>;
    }
  };

  const getTaxStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge variant="success" className="w-full justify-center">TNB Payée</Badge>;
      case "OVERDUE":
        return <Badge variant="destructive" className="w-full justify-center">TNB En retard</Badge>;
      case "PENDING":
        return <Badge variant="warning" className="w-full justify-center">TNB En attente</Badge>;
      default:
        return <Badge variant="secondary" className="w-full justify-center">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col w-full gap-1">
      {getStatusBadge(status)}
      {getTaxStatusBadge(taxStatus)}
    </div>
  );
};