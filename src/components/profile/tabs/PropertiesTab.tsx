import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Trash2, Edit, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PropertiesTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le bien",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Le bien a été supprimé",
      });
    }
  };

  const filteredProperties = properties?.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.property_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Mes Biens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un bien..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-4">Chargement...</div>
          ) : (
            <div className="space-y-4">
              {filteredProperties?.map((property) => (
                <Card key={property.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{property.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {property.property_type} - {property.surface_area} m²
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          Voir sur la carte
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(property.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};