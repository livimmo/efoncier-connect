import { useState, useEffect, useRef } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddressSearchFieldProps {
  form: any;
}

export const AddressSearchField = ({ form }: AddressSearchFieldProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (window.google && inputRef.current) {
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "MA" },
        fields: ["formatted_address", "geometry"],
      });

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.formatted_address) {
          form.setValue("address", place.formatted_address);
          if (place.geometry?.location) {
            form.setValue("location", {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            });
          }
        }
      });
    }
  }, [form]);

  const getCurrentLocation = () => {
    setIsLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.VITE_GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();
            if (data.results[0]) {
              form.setValue("address", data.results[0].formatted_address);
              form.setValue("location", {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            }
          } catch (error) {
            toast({
              title: "Erreur",
              description: "Impossible de récupérer votre position",
              variant: "destructive",
            });
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          toast({
            title: "Erreur",
            description: "Impossible d'accéder à votre position",
            variant: "destructive",
          });
          setIsLoading(false);
        }
      );
    }
  };

  return (
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Adresse Précise</FormLabel>
          <div className="flex gap-2">
            <FormControl>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  className="pl-9"
                  placeholder="Rechercher une adresse..."
                  {...field}
                />
              </div>
            </FormControl>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={getCurrentLocation}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};