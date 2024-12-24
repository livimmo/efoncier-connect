import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { PropertyType } from "@/utils/mockData/types";
import { MapPin, Upload, Save, Eye, RotateCcw } from "lucide-react";
import { PropertyPreview } from "./PropertyPreview";

const propertyFormSchema = z.object({
  titleDeedNumber: z.string().min(1, "Le numéro de titre foncier est requis"),
  type: z.enum(["RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL", "AGRICULTURAL", "SEASIDE"] as const),
  city: z.string().min(1, "La ville est requise"),
  district: z.string().min(1, "Le quartier est requis"),
  street: z.string().min(1, "La rue est requise"),
  surface: z.string().min(1, "La superficie est requise"),
  tnbPrice: z.string(),
  status: z.enum(["AVAILABLE", "DISPUTED", "UNAVAILABLE", "IN_TRANSACTION"] as const),
  fiscalStatus: z.enum(["PAID", "UNPAID", "PARTIALLY_PAID"] as const),
  bank: z.string().optional(),
  ownerName: z.string().optional(),
  ownerEmail: z.string().email().optional(),
  ownerPhone: z.string().optional(),
  description: z.string().max(500, "La description ne doit pas dépasser 500 caractères"),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

export function AddPropertyForm() {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      type: "RESIDENTIAL",
      status: "AVAILABLE",
      fiscalStatus: "PAID",
      description: "",
    },
  });

  const onSubmit = (data: PropertyFormValues) => {
    toast({
      title: "Bien ajouté avec succès",
      description: "Le bien a été enregistré dans la base de données.",
    });
    console.log(data);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Ajouter un Nouveau Bien Foncier</h2>
      <p className="text-muted-foreground mb-8">
        Remplissez les informations détaillées pour enregistrer votre bien.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Informations Générales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations Générales</h3>
            
            <FormField
              control={form.control}
              name="titleDeedNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de Titre Foncier</FormLabel>
                  <FormControl>
                    <Input placeholder="TF123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de Terrain</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="RESIDENTIAL">Résidentiel</SelectItem>
                      <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                      <SelectItem value="INDUSTRIAL">Industriel</SelectItem>
                      <SelectItem value="AGRICULTURAL">Agricole</SelectItem>
                      <SelectItem value="SEASIDE">Balnéaire</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ville</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quartier</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rue</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="surface"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Superficie (m²)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tnbPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix Estimatif TNB (DHS/m²)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Photo du Terrain</FormLabel>
              <div className="flex items-center gap-4">
                <Button type="button" variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Téléverser une image
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {selectedImage && (
                  <img src={selectedImage} alt="Aperçu" className="h-20 w-20 object-cover rounded" />
                )}
              </div>
            </div>
          </div>

          {/* Statut du Bien */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Statut du Bien</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut Général</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="AVAILABLE">Disponible</SelectItem>
                        <SelectItem value="DISPUTED">En Litige</SelectItem>
                        <SelectItem value="UNAVAILABLE">Indisponible</SelectItem>
                        <SelectItem value="IN_TRANSACTION">En Transaction</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fiscalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut Fiscal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PAID">Payé</SelectItem>
                        <SelectItem value="UNPAID">Impayé</SelectItem>
                        <SelectItem value="PARTIALLY_PAID">Partiellement Payé</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banque Associée</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une banque" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="attijariwafa">Attijariwafa Bank</SelectItem>
                        <SelectItem value="bmce">BMCE Bank</SelectItem>
                        <SelectItem value="bp">Banque Populaire</SelectItem>
                        <SelectItem value="sgmb">Société Générale</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Coordonnées du Propriétaire */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Coordonnées du Propriétaire</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom Complet</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ownerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ownerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description du Bien</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez votre bien..." 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">
                    {field.value.length}/500 caractères
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Enregistrer le Bien
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowPreview(true)}>
              <Eye className="mr-2 h-4 w-4" />
              Prévisualiser
            </Button>
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Réinitialiser
            </Button>
            <Button type="button" variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              Localiser sur la Carte
            </Button>
          </div>
        </form>
      </Form>

      {showPreview && (
        <PropertyPreview
          data={form.getValues()}
          image={selectedImage}
          onClose={() => setShowPreview(false)}
        />
      )}
    </Card>
  );
}