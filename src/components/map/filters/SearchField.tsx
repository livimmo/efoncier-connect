import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, User, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  type: "owner" | "title";
  placeholder: string;
}

export const SearchField = ({ value, onChange, type, placeholder }: SearchFieldProps) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!value || value.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        let query;
        if (type === "owner") {
          const { data: profiles } = await supabase
            .from('profiles')
            .select('id, first_name, last_name')
            .or(`first_name.ilike.%${value}%,last_name.ilike.%${value}%`)
            .limit(5);

          if (profiles) {
            setSuggestions(
              profiles.map(profile => ({
                value: `${profile.first_name} ${profile.last_name}`,
                label: `${profile.first_name} ${profile.last_name}`
              }))
            );
          }
        } else {
          const { data: properties } = await supabase
            .from('properties')
            .select('id, title')
            .ilike('title', `%${value}%`)
            .limit(5);

          if (properties) {
            setSuggestions(
              properties.map(property => ({
                value: property.title,
                label: property.title
              }))
            );
          }
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [value, type]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="pl-8"
          />
          {type === "owner" ? (
            <User className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-500" />
          ) : (
            <FileText className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-500" />
          )}
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="absolute right-0 top-0 h-full px-2"
            onClick={() => setOpen(!open)}
          >
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={`Rechercher un ${type === "owner" ? "propriétaire" : "titre"}...`} />
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          <CommandGroup>
            {suggestions.map((suggestion) => (
              <CommandItem
                key={suggestion.value}
                value={suggestion.value}
                onSelect={(currentValue) => {
                  onChange(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === suggestion.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {suggestion.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};