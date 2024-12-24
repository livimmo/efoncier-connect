import { Header } from "@/components/Header";
import { PropertiesHeader } from "@/components/taxpayer/properties/PropertiesHeader";
import { PropertiesTable } from "@/components/taxpayer/properties/PropertiesTable";
import { PropertiesStats } from "@/components/taxpayer/properties/PropertiesStats";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/utils/mockData/types";

export default function Properties() {
  const { toast } = useToast();

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger vos biens",
          variant: "destructive",
        });
        throw error;
      }
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <PropertiesHeader />
        <div className="grid gap-6 mt-8">
          <PropertiesStats data={properties || []} />
          <PropertiesTable 
            data={properties || []} 
            isLoading={isLoading} 
          />
        </div>
      </main>
    </div>
  );
}