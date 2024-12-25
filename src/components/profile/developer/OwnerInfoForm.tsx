import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, CreditCard, Mail, Phone, MapPin, Building } from "lucide-react";

const ownerFormSchema = z.object({
  fullName: z.string().min(2, "Le nom complet est requis"),
  cin: z.string().length(8, "Le CIN doit contenir 8 caractères"),
  cc: z.string().min(1, "Le compte courant est requis"),
  address: z.string().min(1, "L'adresse est requise"),
  commune: z.string().min(1, "La commune est requise"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(/^\+212[0-9]{9}$/, "Format: +212XXXXXXXXX"),
});

type OwnerFormValues = z.infer<typeof ownerFormSchema>;

export function OwnerInfoForm() {
  const { toast } = useToast();

  const form = useForm<OwnerFormValues>({
    resolver: zodResolver(ownerFormSchema),
    defaultValues: {
      fullName: "",
      cin: "",
      cc: "",
      address: "",
      commune: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(data: OwnerFormValues) {
    toast({
      title: "Informations enregistrées",
      description: "Les informations du propriétaire ont été mises à jour.",
    });
    console.log(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Informations du Propriétaire
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom Complet</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" placeholder="Nom et prénom" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CIN</FormLabel>
                    <FormControl>
                      <Input placeholder="Carte d'identité nationale" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compte Courant Bancaire</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" placeholder="Numéro de compte" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Personnel</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" type="email" placeholder="email@exemple.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone Personnel</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" placeholder="+212XXXXXXXXX" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="commune"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commune</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <Building className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Sélectionner une commune" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="casablanca">Casablanca</SelectItem>
                        <SelectItem value="rabat">Rabat</SelectItem>
                        <SelectItem value="marrakech">Marrakech</SelectItem>
                        <SelectItem value="agadir">Agadir</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse Personnelle</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="Adresse complète" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button type="submit">
                Enregistrer les modifications
              </Button>
              <Button type="button" variant="outline">
                Télécharger les Documents
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}