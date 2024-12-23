import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Payment {
  date: string;
  reference: string;
  parcelId: string;
  location: string;
  amount: string;
  status: "paid" | "overdue" | "pending";
  receiptUrl?: string;
}

const getStatusBadge = (status: Payment["status"]) => {
  switch (status) {
    case "paid":
      return <Badge variant="success">Payé</Badge>;
    case "overdue":
      return <Badge variant="destructive">En Retard</Badge>;
    case "pending":
      return <Badge variant="warning">En Attente</Badge>;
  }
};

export const PaymentHistory = () => {
  const navigate = useNavigate();

  // Mock data - à remplacer par les vraies données
  const payments: Payment[] = [
    {
      date: "15/06/2024",
      reference: "TX2024-001",
      parcelId: "TF#123456",
      location: "Casablanca, Maarif",
      amount: "25 000 MAD",
      status: "paid",
      receiptUrl: "/receipt/TX2024-001"
    },
    {
      date: "10/03/2024",
      reference: "TX2024-002",
      parcelId: "TF#789012",
      location: "Rabat, Agdal",
      amount: "15 000 MAD",
      status: "paid",
      receiptUrl: "/receipt/TX2024-002"
    },
    {
      date: "05/12/2023",
      reference: "TX2023-003",
      parcelId: "TF#345678",
      location: "Tanger, Centre",
      amount: "20 000 MAD",
      status: "overdue"
    }
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Référence</TableHead>
            <TableHead>N° Titre Foncier</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.reference}>
              <TableCell>{payment.date}</TableCell>
              <TableCell>{payment.reference}</TableCell>
              <TableCell>{payment.parcelId}</TableCell>
              <TableCell>{payment.location}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{getStatusBadge(payment.status)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {payment.receiptUrl && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(payment.receiptUrl!)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Reçu
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/map?parcel=${payment.parcelId}`)}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Voir sur la carte
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};