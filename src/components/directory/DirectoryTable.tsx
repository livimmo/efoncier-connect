import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

interface DirectoryTableProps {
  searchQuery: string;
  filters: {
    type: string;
    status: string;
    location: string;
  };
}

export function DirectoryTable({ searchQuery, filters }: DirectoryTableProps) {
  // Exemple de données (à remplacer par les vraies données)
  const entries = [
    {
      id: "#C12345",
      name: "Ahmed El Fassi",
      location: "Casablanca",
      status: "regular",
      type: "owner",
      parcels: 3,
      lastPayment: "01/05/2024",
    },
    {
      id: "#P67890",
      name: "Promocasa SARL",
      location: "Rabat",
      status: "late",
      type: "developer",
      parcels: 5,
      lastPayment: "15/04/2024",
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nom / Entreprise</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Statut Fiscal</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Parcelles</TableHead>
            <TableHead>Dernier Paiement</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{entry.id}</TableCell>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.location}</TableCell>
              <TableCell>
                <Badge variant={entry.status === "regular" ? "success" : "destructive"}>
                  {entry.status === "regular" ? "À jour" : "En retard"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {entry.type === "owner" ? "Propriétaire" : "Promoteur"}
                </Badge>
              </TableCell>
              <TableCell>{entry.parcels}</TableCell>
              <TableCell>{entry.lastPayment}</TableCell>
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