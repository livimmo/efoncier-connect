import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const getStatusColor = (status: string) => {
  switch (status) {
    case "En Cours de Traitement":
      return "bg-green-500";
    case "En Attente d'Information":
      return "bg-yellow-500";
    case "Résolu":
      return "bg-blue-500";
    case "Fermé":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};

export const TicketTracker = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suivi de vos Demandes</CardTitle>
        <CardDescription>
          Suivez l'état de vos tickets d'assistance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Entrez votre ID de Ticket ici..." />
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Suivre
            </Button>
          </div>

          <div className="space-y-2">
            {["En Cours de Traitement", "En Attente d'Information", "Résolu", "Fermé"].map(
              (status) => (
                <div
                  key={status}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <span>{status}</span>
                  <Badge className={getStatusColor(status)}>
                    {status === "En Cours de Traitement" && "🟢"}
                    {status === "En Attente d'Information" && "🟡"}
                    {status === "Résolu" && "✅"}
                    {status === "Fermé" && "❌"}
                  </Badge>
                </div>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};