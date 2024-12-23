import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DirectorySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function DirectorySearch({ value, onChange }: DirectorySearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher par nom, ID, ou localisation..."
        className="pl-10"
      />
    </div>
  );
}