import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";

interface MobileSearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  onShowFilters: () => void;
}

export const MobileSearchBar = ({
  query,
  setQuery,
  onSearch,
  onShowFilters,
}: MobileSearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher par titre foncier, propriétaire..."
          className="pl-9"
        />
      </div>
      <Button type="button" variant="outline" size="icon" onClick={onShowFilters}>
        <Filter className="h-4 w-4" />
      </Button>
    </form>
  );
};