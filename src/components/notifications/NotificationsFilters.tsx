import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectFilter } from "@/components/map/filters/SelectFilter";

export const NotificationsFilters = () => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <Label>Catégorie</Label>
          <SelectFilter
            value=""
            onChange={() => {}}
            options={[
              { value: "payment", label: "Paiements TNB" },
              { value: "fiscal", label: "Statut Fiscal" },
              { value: "message", label: "Messages" },
              { value: "document", label: "Documents" },
            ]}
            placeholder="Toutes les catégories"
          />
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
            placeholder="Toutes les villes"
          />
        </div>

        <div className="space-y-2">
          <Label>Statut</Label>
          <SelectFilter
            value=""
            onChange={() => {}}
            options={[
              { value: "unread", label: "Non lu" },
              { value: "read", label: "Lu" },
              { value: "urgent", label: "Urgent" },
            ]}
            placeholder="Tous les statuts"
          />
        </div>

        <div className="space-y-2">
          <Label>Recherche</Label>
          <Input placeholder="Rechercher..." />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Réinitialiser</Button>
        <Button>Appliquer</Button>
      </div>
    </div>
  );
};