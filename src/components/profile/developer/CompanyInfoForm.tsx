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
import { useToast } from "@/hooks/use-toast";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

const companyFormSchema = z.object({
  companyName: z.string().min(2, "La raison sociale est requise"),
  rcNumber: z.string().min(1, "Le numéro RC est requis"),
  iceNumber: z.string().length(15, "L'ICE doit contenir 15 caractères"),
  address: z.string().min(1, "L'adresse est requise"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(/^\+212[0-9]{9}$/, "Format: +212XXXXXXXXX"),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;

export function CompanyInfoForm() {
  const { toast } = useToast();

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: "",
      rcNumber: "",
      iceNumber: "",
      address: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(data: CompanyFormValues) {
    toast({
      title: "Informations enregistrées",
      description: "Les informations de l'entreprise ont été mises à jour.",
    });
    console.log(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Informations de l'Entreprise
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raison Sociale</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" placeholder="Nom de l'entreprise" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rcNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro RC</FormLabel>
                    <FormControl>
                      <Input placeholder="Numéro du registre du commerce" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="iceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ICE</FormLabel>
                    <FormControl>
                      <Input placeholder="Identifiant Commun de l'Entreprise" {...field} />
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
                    <FormLabel>Email Professionnel</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" type="email" placeholder="email@entreprise.com" {...field} />
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
                    <FormLabel>Téléphone</FormLabel>
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
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse du Siège Social</FormLabel>
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