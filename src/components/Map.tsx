import { MapContainer } from './map/MapContainer';
import { Header } from './Header';
import { useAuth } from './auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

const Map = () => {
  const { profile } = useAuth();
  const { toast } = useToast();

  const handleParcelSelect = (parcelId: string) => {
    if (!profile) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour accéder à plus de détails.",
        variant: "warning",
      });
      return;
    }
    // Logique de sélection de parcelle selon le type d'utilisateur
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <MapContainer 
          userRole={profile?.role} 
          onParcelSelect={handleParcelSelect}
        />
      </div>
    </div>
  );
};

export default Map;