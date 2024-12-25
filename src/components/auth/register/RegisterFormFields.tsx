import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Smartphone, MapPin, User, Building2, FileText, Landmark } from "lucide-react";
import type { RegisterFormData, UserRole } from "@/types/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegisterFormFieldsProps {
  form: UseFormReturn<RegisterFormData>;
  selectedRole: UserRole;
}

export const RegisterFormFields = ({ form, selectedRole }: RegisterFormFieldsProps) => {
  return (
    <div className="space-y-4">
      {/* Champs communs */}
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

      {/* Champs spécifiques au propriétaire */}
      {selectedRole === "owner" && (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="cin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CIN</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="AB123456" {...field} />
                    <FileText className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse complète</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="123 Rue Example" {...field} />
                    <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      {/* Champs spécifiques au promoteur */}
      {selectedRole === "developer" && (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de la société</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Société Example SARL" {...field} />
                    <Building2 className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="ice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ICE</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="000000000000000" {...field} />
                      <FileText className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RC</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="123456" {...field} />
                      <FileText className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="companyAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse du siège social</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="123 Zone Industrielle" {...field} />
                    <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      {/* Champs spécifiques à la commune */}
      {selectedRole === "commune" && (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="communeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de la commune</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Commune Example" {...field} />
                    <Landmark className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

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