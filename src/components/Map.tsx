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
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <MapContainer 
          userRole={profile?.role || 'developer'} 
          onParcelSelect={handleParcelSelect}
        />
      </div>
    </div>
  );
};

export default Map;