import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, RefreshCcw } from "lucide-react";

export const MessagesSearch = () => {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, ID, sujet..."
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtres
        </Button>
        <Button variant="ghost" size="icon">
          <RefreshCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};