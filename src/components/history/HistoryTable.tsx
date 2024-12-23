import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface HistoryTableProps {
  filters: {
    period: string;
    activityType: string;
    status: string;
    amount: number[];
    reference: string;
  };
}

export function HistoryTable({ filters }: HistoryTableProps) {
  // Exemple de données (à remplacer par les vraies données)
  const activities = [
    {
      id: 1,
      date: "15/06/2024 - 14h30",
      reference: "TX2024-001",
      type: "payment",
      location: "Casablanca, Maarif",
      amount: 25000,
      status: "confirmed",
    },
    {
      id: 2,
      date: "10/06/2024 - 11h15",
      reference: "MSG-5678",
      type: "message",
      location: "Rabat, Agdal",
      amount: null,
      status: "read",
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>📅 Date/Heure</TableHead>
            <TableHead>🆔 Référence</TableHead>
            <TableHead>🏷️ Type</TableHead>
            <TableHead>📍 Localisation</TableHead>
            <TableHead>💰 Montant</TableHead>
            <TableHead>✅ Statut</TableHead>
            <TableHead>⚡ Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>{activity.date}</TableCell>
              <TableCell className="font-medium">{activity.reference}</TableCell>
              <TableCell>
                {activity.type === "payment" ? "💳 Paiement" : "💬 Message"}
              </TableCell>
              <TableCell>{activity.location}</TableCell>
              <TableCell>
                {activity.amount ? `${activity.amount} MAD` : "—"}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    activity.status === "confirmed"
                      ? "success"
                      : activity.status === "read"
                      ? "secondary"
                      : "default"
                  }
                >
                  {activity.status === "confirmed"
                    ? "Confirmé"
                    : activity.status === "read"
                    ? "Lu"
                    : activity.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Voir Détails
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}