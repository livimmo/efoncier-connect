import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Home, Building2 } from "lucide-react";

interface AccountTypeSelectProps {
  form: any;
  onRoleChange: (role: string) => void;
}

export function AccountTypeSelect({ form, onRoleChange }: AccountTypeSelectProps) {
  return (
    <FormField
      control={form.control}
      name="role"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type de compte</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                onRoleChange(value);
              }}
              defaultValue={field.value}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez votre type de compte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="taxpayer" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>Propriétaire</span>
                </SelectItem>
                <SelectItem value="developer" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span>Promoteur</span>
                </SelectItem>
                <SelectItem value="commune" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Commune</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
