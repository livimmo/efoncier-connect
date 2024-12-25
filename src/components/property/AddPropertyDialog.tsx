import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PROPERTY_TYPES, ZONE_TYPES } from "@/components/map/filters/constants";
import { REGIONS } from "@/utils/mockData/locations";
import { Upload, Save, Eye, RotateCcw, MapPin, X } from "lucide-react";
import { AddressSearchField } from "./AddressSearchField";

const propertyFormSchema = z.object({
  titleDeedNumber: z.string().min(1, "Le numéro de titre foncier est requis"),
  type: z.string().min(1, "Le type de bien est requis"),
  city: z.string().min(1, "La ville est requise"),
  region: z.string().min(1, "La région est requise"),
  commune: z.string().min(1, "La commune est requise"),
  address: z.string().min(1, "L'adresse est requise"),
  location: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional(),
  surface: z.string().min(1, "La superficie est requise"),
  status: z.string().min(1, "Le statut est requis"),
  description: z.string().max(500, "La description ne doit pas dépasser 500 caractères"),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

interface AddPropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPropertyDialog({ open, onOpenChange }: AddPropertyDialogProps) {
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      type: "",
      status: "AVAILABLE",
      description: "",
    },
  });

  const onSubmit = (data: PropertyFormValues) => {
    console.log(data);
    toast({
      title: "Bien ajouté avec succès",
      description: "Le bien a été enregistré dans la base de données.",
    });
    onOpenChange(false);
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

  const selectedRegionData = REGIONS.find(r => r.id === selectedRegion);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un Nouveau Bien Foncier</DialogTitle>
          <DialogDescription>
            Veuillez renseigner les informations suivantes pour ajouter votre bien.
          </DialogDescription>
        </DialogHeader>

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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Région</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedRegion(value);
                        }} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une région" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {REGIONS.map((region) => (
                            <SelectItem key={region.id} value={region.id}>
                              {region.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une commune" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedRegionData?.communes.map((commune) => (
                            <SelectItem key={commune} value={commune}>
                              {commune}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <AddressSearchField form={form} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut Général</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AVAILABLE">Disponible</SelectItem>
                          <SelectItem value="IN_TRANSACTION">En Transaction</SelectItem>
                          <SelectItem value="UNAVAILABLE">Indisponible</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Documents</h3>
              
              <div className="space-y-2">
                <FormLabel>Documents Requis</FormLabel>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="outline" onClick={() => document.getElementById('document-upload')?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Ajouter des Documents
                  </Button>
                  <input
                    id="document-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    multiple
                    onChange={handleImageUpload}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Formats acceptés : PDF, JPG, PNG
                </p>
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
      </DialogContent>
    </Dialog>
  );
}
