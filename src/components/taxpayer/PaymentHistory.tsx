import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

export const PaymentHistory = () => {
  const payments = [
    {
      date: "01/03/2024",
      amount: "10 000 MAD",
      status: "Payé",
      method: "Carte Bancaire",
      reference: "#TX1234",
    },
    {
      date: "15/01/2024",
      amount: "5 000 MAD",
      status: "Payé",
      method: "Mobile Banking",
      reference: "#TX5678",
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Mode de Paiement</TableHead>
            <TableHead>Référence</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.reference}>
              <TableCell>{payment.date}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>
                <Badge variant="success">{payment.status}</Badge>
              </TableCell>
              <TableCell>{payment.method}</TableCell>
              <TableCell>{payment.reference}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Reçu
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};