import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const PropertiesHeader = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Mes Biens Fonciers</h1>
          <p className="text-muted-foreground">
            Liste de vos terrains enregistrés avec leurs détails complets
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Rechercher par numéro de titre foncier, typologie ou statut fiscal..." 
          className="pl-10"
        />
      </div>
    </div>
  );
};