import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Property } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";

export const PropertyList = () => {
  const mockProperties: Property[] = [
    {
      id: "1",
      title: "Villa Moderne",
      location: {
        address: "123 Rue des Jardins",
        city: "Casablanca",
        lat: 33.5731,
        lng: -7.5898
      },
      price: 2500000,
      type: "RESIDENTIAL",
      status: "AVAILABLE",
      zone: "E3",
      surface: 250,
      owner: "user-1",
      titleDeedNumber: "TF-123456",
      ownerName: "John Doe",
      fiscalStatus: "COMPLIANT",
      taxStatus: "PAID",
      tnbInfo: {
        pricePerMeter: 10,
        totalAmount: 2500,
        status: "PAID"
      }
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return <Badge variant="success">Disponible</Badge>;
      case "IN_TRANSACTION":
        return <Badge variant="warning">En Transaction</Badge>;
      case "SOLD":
        return <Badge variant="destructive">Vendu</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Mes Biens</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {mockProperties.map((property) => (
            <div
              key={property.id}
              className="mb-4 p-4 border rounded-lg space-y-2 last:mb-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{property.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {property.location.address}, {property.location.city}
                  </p>
                </div>
                {getStatusBadge(property.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Surface:</span>{" "}
                  {property.surface} m²
                </div>
                <div>
                  <span className="text-muted-foreground">Zone:</span>{" "}
                  {property.zone}
                </div>
                <div>
                  <span className="text-muted-foreground">N° TF:</span>{" "}
                  {property.titleDeedNumber}
                </div>
                <div>
                  <span className="text-muted-foreground">TNB:</span>{" "}
                  {property.tnbInfo.totalAmount} MAD
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Voir
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};