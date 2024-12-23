import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ParcelList = () => {
  const parcels = [
    {
      id: "TF#12345",
      location: "Maarif, Casa",
      surface: "500 m²",
      type: "Résidentiel",
      status: "Impayé",
      amount: "25 000 MAD",
      deadline: "30/06/2024",
    },
    {
      id: "TF#67890",
      location: "Agdal, Rabat",
      surface: "1 200 m²",
      type: "Commercial",
      status: "Payé",
      amount: "0 MAD",
      deadline: "-",
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Parcelle</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Superficie</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Statut Fiscal</TableHead>
            <TableHead>Montant Dû</TableHead>
            <TableHead>Échéance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parcels.map((parcel) => (
            <TableRow key={parcel.id}>
              <TableCell>{parcel.id}</TableCell>
              <TableCell>{parcel.location}</TableCell>
              <TableCell>{parcel.surface}</TableCell>
              <TableCell>{parcel.type}</TableCell>
              <TableCell>
                <Badge variant={parcel.status === "Payé" ? "success" : "destructive"}>
                  {parcel.status}
                </Badge>
              </TableCell>
              <TableCell>{parcel.amount}</TableCell>
              <TableCell>{parcel.deadline}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Détails
                  </Button>
                  {parcel.status === "Impayé" && (
                    <Button size="sm">
                      Payer
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};