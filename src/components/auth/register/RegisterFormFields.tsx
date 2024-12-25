import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Smartphone, MapPin, User } from "lucide-react";
import type { RegisterFormData } from "@/types/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegisterFormFieldsProps {
  form: UseFormReturn<RegisterFormData>;
}

export const RegisterFormFields = ({ form }: RegisterFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="John" {...field} />
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="Doe" {...field} />
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <div className="relative">
                <Input placeholder="john.doe@example.com" {...field} />
                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="password" {...field} />
                  <Lock className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="password" {...field} />
                  <Lock className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="+212 6XX XXX XXX" {...field} />
                  <Smartphone className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ville</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="Casablanca" {...field} />
                  <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type de compte</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre type de compte" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="taxpayer">Contribuable</SelectItem>
                <SelectItem value="developer">Promoteur</SelectItem>
                <SelectItem value="commune">Commune</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="acceptTerms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                J'accepte les conditions d'utilisation
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};