import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar } from "lucide-react";
import { SelectFilter } from "@/components/map/filters/SelectFilter";

export const PropertySelection = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <Label>Numéro TF</Label>
          <div className="relative">
            <Input placeholder="Ex: TF-12345" />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Localisation</Label>
          <SelectFilter
            value=""
            onChange={() => {}}
            options={[
              { value: "casablanca", label: "Casablanca" },
              { value: "rabat", label: "Rabat" },
              { value: "tanger", label: "Tanger" },
            ]}
            placeholder="Sélectionner une ville"
          />
        </div>

        <div className="space-y-2">
          <Label>Statut</Label>
          <SelectFilter
            value=""
            onChange={() => {}}
            options={[
              { value: "unpaid", label: "Impayé" },
              { value: "partial", label: "Partiellement payé" },
              { value: "paid", label: "Payé" },
            ]}
            placeholder="Filtrer par statut"
          />
        </div>

        <div className="space-y-2">
          <Label>Année Fiscale</Label>
          <SelectFilter
            value=""
            onChange={() => {}}
            options={[
              { value: "2024", label: "2024" },
              { value: "2023", label: "2023" },
              { value: "2022", label: "2022" },
            ]}
            placeholder="Sélectionner l'année"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Biens à Payer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "TF-00123",
                location: "Casablanca",
                year: "2024",
                amount: 5000,
                status: "unpaid"
              },
              {
                id: "TF-00567",
                location: "Rabat",
                year: "2023",
                amount: 3200,
                status: "partial"
              }
            ].map((property) => (
              <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">{property.id}</div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Année {property.year}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="font-bold">{property.amount} DHS</div>
                  <Badge variant={property.status === "unpaid" ? "destructive" : "warning"}>
                    {property.status === "unpaid" ? "Impayé" : "Partiellement payé"}
                  </Badge>
                  <div>
                    <Button size="sm">
                      Payer
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};