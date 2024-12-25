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
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  const navigate = useNavigate();
  const { toast } = useToast();

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
    {
      id: 3,
      date: "05/06/2024 - 09h45",
      reference: "TX2024-002",
      type: "payment",
      location: "Tanger, Centre",
      amount: 15000,
      status: "pending",
    },
  ];

  const handleViewDetails = (id: number) => {
    toast({
      title: "Détails de l'activité",
      description: `Consultation des détails de l'activité ${id}`,
    });
    navigate(`/history/${id}`);
  };

  const filteredActivities = activities.filter(activity => {
    if (filters.reference && !activity.reference.toLowerCase().includes(filters.reference.toLowerCase())) {
      return false;
    }
    if (filters.activityType !== "all" && activity.type !== filters.activityType) {
      return false;
    }
    if (filters.status !== "all" && activity.status !== filters.status) {
      return false;
    }
    if (activity.amount && filters.amount.length === 2) {
      if (activity.amount < filters.amount[0] || activity.amount > filters.amount[1]) {
        return false;
      }
    }
    return true;
  });

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
          {filteredActivities.map((activity) => (
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
                      : activity.status === "pending"
                      ? "warning"
                      : "default"
                  }
                >
                  {activity.status === "confirmed"
                    ? "Confirmé"
                    : activity.status === "read"
                    ? "Lu"
                    : activity.status === "pending"
                    ? "En attente"
                    : activity.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(activity.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Voir Détails
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {filteredActivities.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                Aucune activité trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}